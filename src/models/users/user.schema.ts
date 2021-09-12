import { UserSkills } from './dto/user-dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Gender, Role, UserStatus, UserSkillStatus } from './dto/user-enum';

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  avatar: string;

  @Prop({ unique: true, required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  gender: Gender;

  @Prop()
  facebook: string;

  @Prop([
    {
      skillId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'tags',
        default: null,
      },
      percent: { type: Number },
      status: { type: Number, enum: UserSkillStatus },
    },
  ])
  skills: UserSkills[];

  @Prop({ type: [], default: [Role.USER] })
  roles: [Role];

  @Prop({ default: UserStatus.ACTIVE })
  status: UserStatus;
}

export type UserDocument = UserModel & Document;

export const USER_NAME = 'User';

export const UserSchema = SchemaFactory.createForClass(UserModel);
