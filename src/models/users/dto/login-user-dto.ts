import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class LoginUserDTO {
    @Field()
    readonly credential: string;

    @Field()
    readonly password: string;

}
