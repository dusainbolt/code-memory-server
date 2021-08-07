import { ConfigService } from '@nestjs/config';
import { UserService } from '../models/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private configService: ConfigService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  validateToken(auth: string) {
    if (auth?.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException();
    }
    const token = auth.split(' ')[1];
    try {
      const secret = this.configService.get('JWT_SECRET');
      return jwt.verify(token, secret);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
