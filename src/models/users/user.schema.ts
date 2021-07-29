import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender, Role, UserStatus } from './dto/user-enum';
// import { Gender, Role, UserStatus } from './dto/user-enum';

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ unique: true, required: true })
  email: string;

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

  @Prop({ default: Role.USER })
  role: Role;

  @Prop({ default: UserStatus.ACTIVE })
  status: UserStatus;
}

export type UserDocument = UserModel & Document;

export const USER_NAME = 'User';

export const UserSchema = SchemaFactory.createForClass(UserModel);
