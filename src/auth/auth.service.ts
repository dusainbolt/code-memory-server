import { ConfigService } from '@nestjs/config';
import { UsersService } from '../models/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private configService: ConfigService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
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
