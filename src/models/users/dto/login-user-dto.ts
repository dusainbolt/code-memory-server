import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from './user-dto';
@InputType()
export class LoginInput {
  @Field()
  credential: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginOutput {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
