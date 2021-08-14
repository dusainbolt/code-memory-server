import { AuthenticationError } from 'apollo-server-errors';
import { ConfigService } from '@nestjs/config';
import { LoginInput, LoginOutput, QueryFindUser } from './dto/login-user-dto';
import { CreateUser } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, USER_NAME } from './user.schema';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User } from './dto/user-dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MSG_SYSTEM } from 'src/common/valid_message';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_NAME) public userModel: Model<UserDocument>,
    private configService: ConfigService,
    private hashService: HashService,
    private eventEmitter: EventEmitter2
  ) {}

  createToken({ id, email, firstName, lastName, roles }: User) {
    const secret = this.configService.get('JWT_SECRET');
    return jwt.sign({ id, email, firstName, lastName, roles }, secret);
  }

  async create(createUser: CreateUser): Promise<User> {
    const createdUser = new this.userModel(createUser);
    const data = await createdUser.save();
    // this.eventEmitter.emit(EVENT_ITEM.CREATE, data);
    return data;
  }

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    let user = await this.findOne(loginInput.credential);
    if (!user) {
      throw new AuthenticationError(MSG_SYSTEM.MSG_LOGIN_ERROR);
    }
    const isMatchPassword = await this.hashService.matchBcrypt(loginInput.password, user.password);
    if (isMatchPassword) {
      return { user, token: this.createToken(user) };
    } else {
      throw new AuthenticationError(MSG_SYSTEM.MSG_LOGIN_ERROR);
    }
  }

  async findOne(credential: string): Promise<User> {
    const query: QueryFindUser = { username: {}, email: {} };
    query.email.$eq = credential;
    query.username.$eq = credential;
    return this.userModel.findOne({ $or: [{ username: query.username }, { email: query.email }] });
  }
}
