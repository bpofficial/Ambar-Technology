import Order from "./Class";
import { Field, InputType, ArgsType, ObjectType } from "type-graphql";
import { prop } from "typegoose";
import { Types } from "mongoose";
import Shipment from "../Shipment/Class";
import Payment from "../Payment/Class";

@InputType('OrderItemInput')
@ObjectType({ description: 'Class representing a single product in an order.' })
export class OrderItem {

    @Field(type => String, { description: "Product SKU." })
    @prop({ required: true })
    sku: string;

    @Field(type => Number, { description: "# ordered." })
    @prop({ required: true })
    count: number;

    @Field(type => Number, { description: "Cost of item." })
    @prop({ required: true })
    cost: number;

}

@ArgsType()
export class OrderInput implements Partial<Order> {

    @Field(type => String, { description: "Order number.", nullable: true })
    orderid?: Types.ObjectId;

    @Field(type => [OrderItem], { description: "Items consituting order." })
    items: OrderItem[];

    @Field(type => Shipment, { description: "Shipping details.", nullable: true })
    shipping?: Shipment;

    @Field(type => String, { description: "Status of order.", nullable: true })
    status?: string;

    @Field(type => Payment, { description: "Payment of order.", nullable: true })
    payment?: Payment;

}