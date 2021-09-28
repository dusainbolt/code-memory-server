import { UserSkillData } from './../../dto/user/SkillUserDTO';
import { TAG_NAME } from './../tag/tag.schema';
import { FindUserInput } from './../../dto/user/UserDTO';
import { GraphQLError } from 'graphql';
import { UserSkillStatus } from '../../dto/user/UserEnum';
import { AppLogger } from './../../logs/logs.service';
import { EVENT } from './../../common/contant';
import { AuthenticationError } from 'apollo-server-errors';
import { LoginInput, LoginOutput, QueryFindUser } from '../../dto/user/LoginUserDTO';
import { CreateUser } from '../../dto/user/CreateUserDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, USER_NAME } from './user.schema';
import { Model } from 'mongoose';
import { User } from '../../dto/user/UserDTO';
import { OnEvent } from '@nestjs/event-emitter';
import { MSG_SYSTEM } from 'src/common/valid_message';
import { HashService } from 'src/hash/hash.service';
import { helperService } from 'src/common/HelperService';
import { UserSkill } from 'src/dto/user/SkillUserDTO';
@Injectable()
export class UserService {
  constructor(@InjectModel(USER_NAME) public userModel: Model<UserDocument>, private hashService: HashService, private appLogger: AppLogger) {
    this.appLogger.setContext(UserService.name);
  }

  // Create token for user
  createToken({ id, email, firstName, lastName, roles }: User) {
    return this.hashService.signJWT({ id, email, firstName, lastName, roles });
  }

  async create(createUser: CreateUser): Promise<User> {
    const createdUser = new this.userModel(createUser);
    const data = await createdUser.save();
    return data;
  }

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    // Check is exist user
    let user = await this.findOne(loginInput.credential);
    if (!user) {
      throw new AuthenticationError(MSG_SYSTEM.MSG_LOGIN_ERROR);
    }
    // Check password
    const isMatchPassword = await this.hashService.matchBcrypt(loginInput.password, user.password);
    // return result
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
    const query: QueryFindUser = { username: {}, email: {} };
    // Find by email
    query.email.$eq = credential;
    // Find by username
    query.username.$eq = credential;
    // Query find by email or username
    return this.userModel.findOne({ $or: [{ username: query.username }, { email: query.email }] });
  }

  async listSkill({ credential }: FindUserInput): Promise<UserSkillData[]> {
    const user = (await this.findOne(credential)) as UserDocument;
    // const data = user.populate({ path: 'skills.tagId' });
    const data = await user.populate({ path: 'skills.tagId', model: TAG_NAME }).execPopulate();
    // Convert to user skill data
    return data.skills.map(item => ({
      percent: item.percent,
      status: item.status,
      tagData: item.tagId,
    }));
  }

  async addSkill(skills: UserSkill[], user: UserDocument, isCheckDiff: boolean = true): Promise<Boolean> {
    // Check skill id duplicate
    if (isCheckDiff) {
      const arrSkill = helperService.getDiffArrayWithObjArray([skills[0].tagId], user.skills, 'tagId');
      if (!arrSkill.length) {
        throw new GraphQLError(MSG_SYSTEM.ADD_SKILL_NOT_DIFF);
      }
    }
    // Add skill id  and save
    user.skills = user.skills.concat(skills);
    await user.save();
    // Return a skill user
    return true;
  }

  async updateSkill(skills: UserSkill[], user: UserDocument): Promise<Boolean> {
    user.skills = skills;
    await user.save();
    // Check skill id duplicate
    return true;
  }

  //   Update user skills by project techs
  @OnEvent(EVENT.CHANGE_USER_SKILL)
  async changeSkillByProject({ user, skillData }: { user: UserDocument; skillData: UserSkill[] }) {
    this.appLogger.verbose(`EVENT ==============> ${EVENT.CHANGE_USER_SKILL} by ${user.username}`);
    // Filter skill id duplicate
    const arrSkill = helperService.getDiffArrayWithObjArray(skillData, user.skills, 'tagId');
    // Create data skill default for user skill
    const dataSkill: UserSkill[] = arrSkill.map(tagId => ({
      tagId,
      percent: 0,
      status: UserSkillStatus.INACTIVE,
    }));
    await this.addSkill(dataSkill, user, false);
  }
}
