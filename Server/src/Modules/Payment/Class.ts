import { Typegoose, prop } from "typegoose";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType({ description: "Class representing Payment." })
@InputType()
export default class Payment extends Typegoose {

    @Field(type => String)
    @prop({ required: true })
    provider: string;

}