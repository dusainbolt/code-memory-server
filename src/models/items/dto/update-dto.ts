import { MaxLength, IsOptional, Length } from 'class-validator';
import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class ItemUpdateDTO {
    @Field()
    @MaxLength(30)
    readonly title: string;

    @Field(() => Int)
    readonly price: number;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    readonly description?: string;
}
