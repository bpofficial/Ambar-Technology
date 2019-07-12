import Order from "./Class";
import { Field, InputType, ArgsType, ObjectType } from "type-graphql";
import { prop } from "typegoose";
import { Types } from "mongoose";
import Shipment from "../Shipment/Class";
import Payment from "../Payment/Class";
import { Type } from "class-transformer";

export class OrderItem {

    @Field(type => String)
    @prop({ required: true })
    sku: string;

    @Field(type => Number)
    @prop({ required: true })
    count: number;

    @Field(type => Number)
    @prop({ required: true })
    cost: number;
}

@ObjectType({ description: "Class object representing an OrderItem (product)." })
export class OrderItemOut {

    @Field(type => String)
    @prop({ required: true })
    sku: string;

    @Field(type => Number)
    @prop({ required: true })
    count: number;

    @Field(type => Number)
    @prop({ required: true })
    cost: number;
}

@InputType()
export class OrderItemIn {

    @Field(type => String)
    @prop({ required: true })
    sku: string;

    @Field(type => Number)
    @prop({ required: true })
    count: number;

    @Field(type => Number)
    @prop({ required: true })
    cost: number;
}

@ArgsType()
export class OrderInput implements Partial<Order> {

    @Field(type => String, { description: "Order number." })
    orderid?: Types.ObjectId;

    @Field(type => OrderItemOut, { description: "Items consituting order." })
    items: OrderItemIn[];

    @Field(type => Shipment, { description: "Shipping details.", nullable: true })
    shipping?: Shipment;

    @Field(type => String, { description: "Status of order.", nullable: true })
    status?: string;

    @Field(type => Payment, { description: "Payment of order.", nullable: true })
    payment?: Payment;

}