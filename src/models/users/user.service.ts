import { UserSkillStatus } from './dto/user-enum';
import { AppLogger } from './../../logs/logs.service';
import { EVENT } from './../../common/contant';
import { AuthenticationError } from 'apollo-server-errors';
import { LoginInput, LoginOutput, QueryFindUser } from './dto/login-user-dto';
import { CreateUser } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, USER_NAME } from './user.schema';
import { Model } from 'mongoose';
import { User, UserSkills } from './dto/user-dto';
import { OnEvent } from '@nestjs/event-emitter';
import { MSG_SYSTEM } from 'src/common/valid_message';
import { HashService } from 'src/hash/hash.service';
import { helperService } from 'src/common/HelperService';
// import * as mongoose from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_NAME) public userModel: Model<UserDocument>,
    private hashService: HashService,
    private appLogger: AppLogger
  ) {}

  createToken({ id, email, firstName, lastName, roles }: User) {
    return this.hashService.signJWT({ id, email, firstName, lastName, roles });
  }

  async create(createUser: CreateUser): Promise<User> {
    const createdUser = new this.userModel(createUser);
    const data = await createdUser.save();
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

  async findByIds(ids: string[]): Promise<User[]> {
    return this.userModel.find({ _id: { $in: ids } });
  }

  async findOne(credential: string): Promise<User> {
    const query: QueryFindUser = { username: {}, email: {}, _id: {} };
    query.email.$eq = credential;
    query.username.$eq = credential;
    return this.userModel.findOne({ $or: [{ username: query.username }, { email: query.email }] });
  }

  @OnEvent(EVENT.CHANGE_USER_SKILL)
  async changeUserSkill({ user, skillData }: { user: UserDocument; skillData: UserSkills[] }) {
    this.appLogger.verbose('About to return cats!');

    console.log(`EVENT ==============> ${EVENT.CHANGE_USER_SKILL}`, user, skillData);
    //   Update user skills by project techs
    const arrSkill = helperService.getDiffArrayWithObjArray(skillData, user.skills, 'skillId');
    const dataSkill: UserSkills[] = arrSkill.map(skillId => ({
      skillId,
      percent: 0,
      status: UserSkillStatus.INACTIVE,
    }));
    user.skills = user.skills.concat(dataSkill);
    await (user as UserDocument).save();
  }
}
