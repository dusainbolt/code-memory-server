import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@ObjectType()
export class ItemDTO {
    @Field(() => ID)
    readonly id?: string;

    @Field()
    @IsNotEmpty()
    readonly title: string;

    @Field(() => Int)
    readonly price: number;

    @Field()
    readonly description: string;

    @Field()
    readonly email: string;
}
