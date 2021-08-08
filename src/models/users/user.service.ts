import { AuthenticationError } from 'apollo-server-errors';
import { ConfigService } from '@nestjs/config';
import { LoginInput, LoginOutput } from './dto/login-user-dto';
import { CreateUser } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, USER_NAME } from './user.schema';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User } from './dto/user-dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MSG_LOGIN_ERROR } from 'src/common/valid_message';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_NAME) public userModel: Model<UserDocument>,
    private configService: ConfigService,
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

  async login(LoginInput: LoginInput): Promise<LoginOutput> {
    let user = await this.findOne(LoginInput.credential);
    if (!user) {
      throw new AuthenticationError(MSG_LOGIN_ERROR);
    }
    return { user, token: this.createToken(user) };
  }

  // async list(): Promise<User[]> {
  //     return this.userModel.find();
  // }

  // async initDataByUser(): Promise<User[]> {
  //     this.eventEmitter.emit(EVENT_ITEM.CREATE, {});
  //     return this.userModel.find();
  // }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
