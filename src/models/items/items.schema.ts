import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
@ObjectType()
@Schema()
export class Item {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => String)
    @Prop()
    title: string;

    @Field(() => Number)
    @Prop()
    price: number;

    @Field(() => String)
    @Prop()
    description: string;

    @Field(() => String)
    @Prop()
    email: string;
}

export type ItemDocument = Item & Document;

export const ItemSchema = SchemaFactory.createForClass(Item);
