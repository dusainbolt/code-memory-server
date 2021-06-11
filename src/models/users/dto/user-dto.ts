import { lengthMessage } from './../../../common/valid_message';
import { IsEmail, Length, MaxLength } from 'class-validator';
import { GenderUser, StatusUser } from './../users.schema';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Role } from '../users.schema';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class UserDTO {
    @Field(() => ID)
    readonly id?: MongooseSchema.Types.ObjectId;

    @Field()
    readonly email: string;

    @Field()
    readonly firstName: string;

    @Field()
    readonly lastName: string;

    @Field()
    readonly avatar: string;

    @Field()
    readonly phone: string;

    @Field()
    readonly facebook: string;

    @Field()
    readonly gender: GenderUser;

    @Field()
    readonly roles: Role[];

    @Field()
    readonly status: StatusUser;
    // @Field(() => [Item])
    // @Field()
    // items: MongooseSchema.Types.ObjectId[] | Item[];
}

@InputType()
export class InitUserDTO {
    @IsEmail()
    email: string;

    @Length(1, 25, { message: lengthMessage })
    firstName: string;

    @Length(1, 25, { message: lengthMessage })
    lastName: string;

    @Field()
    avatar: string;

    @Field()
    password: string;

    @Field()
    phone: string;

    @Field()
    facebook: string;

    @Field()
    gender: string;

    @MaxLength(20, {
        each: true,
    })
    roles: Role[];
}
