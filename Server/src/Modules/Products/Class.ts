import {
    Field,
    ObjectType
} from "type-graphql";
import { prop, Typegoose, pre } from "typegoose";
import { Min, MinLength, MaxLength } from "class-validator";

@pre<Product>('save', (next) => {
    // Pre-save hook
    next();
})

@pre<Product>('update', (next) => {
    // Pre-update hook
    next();
})

@ObjectType({ description: "Class object representing Product stock." })
class Stock {

    @Field({ description: "Current available stock." })
    @prop({ required: false, default: 0 })
    @Min(0)
    available: number;

    @Field({ description: "Current allocated stock." })
    @prop({ required: false, default: 0 })
    @Min(0)
    allocated: number;
}

@ObjectType({ description: "Class object representing a Product." })
export default class Product extends Typegoose {

    @Field({ description: "Name of the product." })
    @prop({ required: true })
    @MinLength(2, { message: "Produt name too short." })
    @MaxLength(64, { message: "Product name too long." })
    name: string;

    @Field({ description: "Stock keeping unit." })
    @prop({ index: true, unique: true, required: true })
    @MinLength(2)
    @MaxLength(16)
    sku: string;

    @Field({ description: "Long details (HTML, Markdown, text)." })
    @prop({ required: true })
    @MinLength(2)
    @MaxLength(2048)
    details: string;

    @Field({ description: "Snippet of 'details' (text)." })
    @prop({ required: true })
    @MaxLength(512)
    short: string;

    @Field({ nullable: true, description: "Price of the product in AUD." })
    @prop({ required: true })
    @Min(0.0001)
    price: number;

    @Field({ nullable: true, description: "GST Of the product." })
    @prop({ required: false, default: function () { return (0.1 * this.price || 0) } })
    @Min(0.000001)
    gst?: number | null;

    @Field({ nullable: true, description: "Current stock count." })
    @prop({ required: false })
    stock?: Stock;

    @Field({ nullable: true, description: "Category of product." })
    @prop({ required: false })
    @MaxLength(32)
    category?: string;

    count: number;
}

export const ProductModel = new Product().getModelForClass(Product)