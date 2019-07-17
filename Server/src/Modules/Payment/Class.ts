import { Typegoose, prop } from "typegoose";
import { ObjectType, Field, InputType } from "type-graphql";


@InputType('PaymentInput')
@ObjectType({ description: "Class representing Payment." })
export default class Payment extends Typegoose {

    @Field(_ => String)
    @prop({ required: true })
    provider: string;

}