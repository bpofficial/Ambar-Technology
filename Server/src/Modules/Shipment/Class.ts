import { Typegoose, prop } from "typegoose";
import { ObjectType, Field, InputType } from "type-graphql";
@InputType('ShipmentInput')
@ObjectType({ description: "Shipping details." })
export default class Shipment extends Typegoose {

    @Field(_ => Number, { description: "Cost of shipment (total)" })
    @prop({ required: false })
    cost?: number;

    @Field(_ => String, { description: "Courier of shipment." })
    @prop({ required: false })
    courier?: string;

    @Field(_ => String, { description: "Method of shipment." })
    @prop({ required: false })
    method?: string;

    @Field(_ => String, { description: "Details of shipment." })
    @prop({ required: false })
    details?: string;

}