import { IsEmail } from 'class-validator';
import { Schema } from 'mongoose';
import { StoreContact, StoreSocial, PackageTypeStore } from './../stores.schema';
import { ID, ObjectType, Field, InputType } from '@nestjs/graphql';
import { UserDTO } from 'src/models/users/dto/user-dto';
@ObjectType()
export class StoreDTO {
  @Field(() => ID)
  readonly id?: string;

  @Field()
  readonly email: string;

  @Field()
  readonly name: string;

  @Field()
  readonly logo: string;

  @Field()
  readonly avatar: string;

  @Field()
  readonly logoText: string;

  @Field()
  readonly descriptionLogo: string;

  @Field()
  readonly storeContact: StoreContact;

  @Field()
  readonly storeSocial: StoreSocial;

  @Field()
  readonly owner: Schema.Types.ObjectId | UserDTO;

  @Field()
  readonly theme: Schema.Types.ObjectId;

  @Field()
  readonly package: PackageTypeStore;

  @Field()
  readonly status: string;

  @Field()
  readonly trial: boolean;
}

@InputType()
export class InitStoreDTO {
  @IsEmail()
  email: string;

  @Field()
  name: string;

  @Field()
  logo: string;

  @Field()
  logoText: string;

  @Field()
  descriptionLogo: string;

  @Field()
  storeContact: StoreContact;

  @Field()
  storeSocial: StoreSocial;

  @Field()
  owner: Schema.Types.ObjectId;

  @Field()
  theme: Schema.Types.ObjectId;

  @Field()
  package: PackageTypeStore;

  @Field()
  status: string;

  @Field()
  trial: boolean;
}
