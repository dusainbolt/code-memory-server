import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum StatusUser {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PAUSE = 'pause',
  BLOCK = 'block',
}

export enum GenderUser {
  MALE = 'male',
  FEMALE = 'female',
}
@Schema({ timestamps: true })
export class User {
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
  gender: GenderUser;

  @Prop()
  facebook: string;

  @Prop({ default: [Role.USER] })
  roles: Role[];

  @Prop({ default: StatusUser.ACTIVE })
  status: StatusUser;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
