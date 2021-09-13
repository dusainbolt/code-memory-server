import { ConfigService } from '@nestjs/config';
import { HashService } from './../hash/hash.service';
import { Logger } from '@nestjs/common';
import { Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { AuthenticationError } from 'apollo-server-errors';
import { ERROR_CODE_HASH } from 'src/common/valid_message';
import { LOCAL, NODE_ENV } from 'src/common/contant';
import { UserHashToken } from 'src/dto/user/UserDTO';

export const DEC_START_REQUEST = 'START_AT:';
export const DEC_GRAPHQL = 'ACTION:';
export const DEC_END_REQUEST = 'END_BY:';

export type location = {
  ip: string;
  city: string;
  region: string;
  regionCode: string;
  countryCode: string;
  countryName: string;
  latitude: string;
  longitude: string;
  timezone: string;
};

// get duration time request => ms
function getDurationRequest(request): Number {
  return new Date().getTime() - request.timeRequest;
}

//get info user request
function getInfoUserRequest(user: UserHashToken): String {
  return user && `${user.firstName} - ${user.lastName}`;
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(LoggingPlugin.name);
  constructor(private hashService: HashService, private configService: ConfigService) {}
  // get user ip with params headers
  getUserIpAddress(req): String {
    const hashLocation = req.headers['x-forwarded-app'];
    if (!hashLocation) return null;
    // encrypt hash geo data
    const location: location = this.hashService.unHashCryptoAES(hashLocation);
    req.location = location;
    return `${location?.ip} - ${location?.countryCode} - ${location.city} - lat: ${location?.latitude} long: ${location?.longitude}`;
  }

  // validate server hash with MD5
  validateHashServer(headers, timeServer): any {
    const { hash, timestamp } = headers;
    const durationTime = timeServer - timestamp;
    if (hash !== this.hashService.hashMD5Crypto(this.configService.get('API_KEY')) || durationTime > 100) {
      throw new AuthenticationError(ERROR_CODE_HASH);
    }
  }

  requestDidStart(service): GraphQLRequestListener {
    const { req } = service.context;

    // Validate & log request if production
    if (req.headers && this.configService.get(NODE_ENV) !== LOCAL) {
      // get time server
      const timeServer = Math.floor(Date.now() / 1000);
      // handle validate
      this.validateHashServer(req.headers, timeServer);

      // handle log info request
      // const ipAddress = this.getUserIpAddress(req);
      this.logger.debug(`${DEC_START_REQUEST} ${timeServer}`);
    }

    // Set time request
    service.timeRequest = new Date().getTime();

    if (req.body.operationName === 'IntrospectionQuery') {
      return;
    }

    this.logger.debug(`${DEC_GRAPHQL} ${req.body.query}`);
    this.logger.verbose(JSON.stringify(req.body.variables));

    return {
      willSendResponse(requestContext: any) {
        // handle log info when completed request
        const user: UserHashToken = requestContext.context.user;
        new Logger().log(
          `${DEC_END_REQUEST} ${getInfoUserRequest(user) || ''} ${getDurationRequest(requestContext)}ms`
        );
      },
    };
  }
}
