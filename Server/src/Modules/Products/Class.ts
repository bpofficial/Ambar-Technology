import {
    Field,
    ObjectType,
    InputType
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

@InputType('StockInput')
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

    @Field(type => String, { description: "Name of the product." })
    @prop({ required: true })
    @MinLength(2, { message: "Produt name too short." })
    @MaxLength(64, { message: "Product name too long." })
    name: string;

    @Field(type => String, { description: "Stock keeping unit." })
    @prop({ index: true, unique: true, required: true })
    @MinLength(2)
    @MaxLength(16)
    sku: string;

    @Field(type => String, { description: "Long details (HTML, Markdown, text)." })
    @prop({ required: true })
    @MinLength(2)
    @MaxLength(2048)
    details: string;

    @Field(type => String, { description: "Snippet of 'details' (text)." })
    @prop({ required: true })
    @MaxLength(512)
    short: string;

    @Field(type => Number, { nullable: true, description: "Price of the product in AUD." })
    @prop({ required: true })
    @Min(0.0001)
    price: number;

    @Field(type => Number, { nullable: true, description: "GST Of the product." })
    @prop({ required: false, default: function () { return (0.1 * this.price || 0) } })
    @Min(0.000001)
    gst?: number;

    @Field(type => Stock, { nullable: true, description: "Current stock count." })
    @prop({ required: false })
    stock?: Stock;

    @Field(type => String, { nullable: true, description: "Category of product." })
    @prop({ required: false })
    @MaxLength(32)
    category?: string;

}

export const ProductModel = new Product().getModelForClass(Product)