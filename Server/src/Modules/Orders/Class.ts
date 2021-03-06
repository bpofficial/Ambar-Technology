import { ObjectType, Field, InputType } from "type-graphql";
import { Types } from "mongoose";
import Shipment from "../Shipment/Class";
import Payment from "../Payment/Class";
import { MinLength } from "class-validator";
import { pre, Typegoose, prop } from "typegoose";

@pre<Order>('save', (next) => {
    // Pre-save hook
    next();
})

@pre<Order>('update', (next) => {
    // Pre-update hook
    next();
})

@InputType('OrderItemInput')
@ObjectType({ description: 'Class representing a single product in an order.' })
export class OrderItem {

    @Field(_ => String, { description: "Product SKU." })
    @prop({ required: true })
    sku: string;

    @Field(_ => Number, { description: "# ordered." })
    @prop({ required: true })
    count: number;

    @Field(_ => Number, { description: "Cost of item." })
    @prop({ required: true })
    cost: number;

}
@InputType('OrderInput')
@ObjectType({ description: "Class object representing Order." })
export default class Order extends Typegoose {

    @Field(_ => String, { description: "Order number." })
    @prop({ index: true, unique: true, required: true, default: () => new Types.ObjectId() })
    orderid: Types.ObjectId;

    @Field(_ => String, { description: "Creator of order." })
    @prop({ required: true })
    @MinLength(2)
    creator: Types.ObjectId;

    @Field(_ => Date, { description: "Date order created." })
    @prop({ required: true, default: () => Date.now() })
    created_at: Date;

    @Field(_ => [OrderItem], { description: "Items consituting order." })
    @prop({ required: true })
    items: OrderItem[];

    @Field(_ => Shipment, { description: "Shipping details.", nullable: true })
    @prop({ required: false })
    shipping?: Shipment;

    @Field(_ => Number, { description: "Grand total of order.", nullable: true })
    @prop({ required: false, default: function () { return this.items.reduce(({ cost }: { cost: number }, i: number) => i + cost, 0) || 0 } })
    total?: number;

    @Field(_ => Number, { description: "GST of order.", nullable: true })
    @prop({ required: false, default: function () { return 0.1 * this.total } })
    gst?: number;

    @Field(_ => String, { description: "Status of order.", nullable: true })
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

    @Field(_ => Payment, { description: "Payment of order.", nullable: true })
    @prop({ required: false, default: {} })
    payment?: Payment;

}

export const OrderModel = new Order().getModelForClass(Order);