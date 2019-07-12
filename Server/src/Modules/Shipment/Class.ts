import { Typegoose, prop } from "typegoose";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType({ description: "Shipping details." })
@InputType()
export default class Shipment extends Typegoose {

    @Field(type => Number, { description: "Cost of shipment (total)" })
    @prop({ required: false })
    cost?: number;

    @Field(type => String, { description: "Courier of shipment." })
    @prop({ required: false })
    courier?: string;

    @Field(type => String, { description: "Method of shipment." })
    @prop({ required: false })
    method?: string;

    @Field(type => String, { description: "Details of shipment." })
    @prop({ required: false })
    details?: string;

}