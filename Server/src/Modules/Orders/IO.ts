import Order from "./Class";
import { Field, InputType, ArgsType, ObjectType } from "type-graphql";
import { prop } from "typegoose";
import { Types } from "mongoose";
import Shipment from "../Shipment/Class";
import Payment from "../Payment/Class";
import Product from "../Products/Class";
import { Min, MaxLength, MinLength } from "class-validator";




@InputType()
export class NewOrderInput extends Order {
    @Field({ description: "Items consituting order.", nullable: true })
    @prop({ required: true })
    items: {
        sku: String;
        amount: Number;
        cost: Number;
    };
}

@InputType()
export class EditOrderInput implements Partial<Order> {

    @Field(type => String, { description: "Order number.", nullable: true })
    orderid: Types.ObjectId;

    @Field(type => [Product], { description: "Items consituting order.", nullable: true })
    @prop({ required: true })
    items?: [Product];

    @Field(type => Shipment, { description: "Shipping details.", nullable: true })
    @prop({ required: false })
    shipping?: Shipment;

    @Field(type => String, { description: "Status of order.", nullable: true })
    @prop({
        required: false, default: 'Placed', enum: [
            'Placed',
            'Processing',
            'Awaiting Payment',
            'Awaiting Confirmation',
            'Awaiting Pickup',
            'In Transit',
            'Shipped',
            'Parked',
            'Backordered'
        ]
    })
    status?: string;

    @Field(type => Payment, { description: "Payment of order.", nullable: true })
    @prop({ required: false })
    payment?: Payment;

}