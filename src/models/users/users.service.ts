import { AuthenticationError } from 'apollo-server-errors';
import { ConfigService } from '@nestjs/config';
import { LoginUserDTO } from './dto/login-user-dto';
import { CreateUserDTO } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>, private configService: ConfigService) {}

  // createToken({ _id, email, userName, fullName, roles }: User) {
  //     const userRegisToken = { _id, email, userName, fullName, roles };
  //     const secret = this.configService.get('JWT_SECRET');
  //     return jwt.sign(userRegisToken, secret);
  // }

  // async create(createUserDto: CreateUserDTO): Promise<User> {
  //     const createdUser = new this.userModel(createUserDto);
  //     const data = await createdUser.save();
  //     // this.eventEmitter.emit(EVENT_ITEM.CREATE, data);
  //     return data;
  // }

  // async login(loginUserDTO: LoginUserDTO): Promise<string> {
  //     let user = await this.findOne(loginUserDTO.credential);
  //     if (!user) {
  //         throw new AuthenticationError("Username or password is incorrect");
  //     }
  //     return this.createToken(user);
  // }

  // async list(): Promise<User[]> {
  //     return this.userModel.find();
  // }

  async findOne(userName: string): Promise<User> {
    return this.userModel.findOne({ userName });
  }
}
