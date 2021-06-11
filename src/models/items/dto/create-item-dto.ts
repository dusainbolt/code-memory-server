import { Length, IsOptional, MaxLength } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateItemDTO {
    @Field()
    @MaxLength(30)
    readonly title: string;

    @Field(() => Int)
    readonly price: number;

    @Field({ nullable: true })
    @IsOptional()
    @Length(5, 255)
    readonly description?: string;
}
