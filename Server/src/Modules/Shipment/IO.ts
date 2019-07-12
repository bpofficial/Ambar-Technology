import { Typegoose, prop } from "typegoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class ShipmentInput extends Typegoose {

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