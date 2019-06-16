import {
    Field,
    ObjectType
} from "type-graphql";
import { prop, Typegoose, pre, plugin } from "typegoose";
import * as UniqueValidator from "mongoose-unique-validator";

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

    @Field()
    @prop({ required: false, default: 0 })
    available: number;

    @Field()
    @prop({ required: false, default: 0 })
    allocated: number;
}

@ObjectType({ description: "Class object representing a Product." })
@plugin(UniqueValidator)
export default class Product extends Typegoose {

    @Field({ description: "Unique ID key of product." })
    id: string;

    @Field({ description: "Name of the product." })
    @prop()
    name: string;

    @Field({ description: "Stock keeping unit." })
    @prop({ required: true, unique: true })
    sku: string;

    @Field({ description: "Long details (HTML, Markdown, text)." })
    @prop({ required: true })
    details: string;

    @Field({ description: "Snippet of 'details' (text)." })
    @prop({ required: true })
    short: string;

    @Field({ nullable: true, description: "Price of the product in AUD." })
    @prop({ required: true })
    price: number;

    @Field({ nullable: true, description: "GST Of the product." })
    @prop({ required: false, default: function () { return (0.1 * this.price || 0) } })
    gst: number | null;

    @Field({ nullable: true, description: "Current stock count." })
    @prop({ required: false })
    stock: Stock;

    @Field({ nullable: true, description: "Category of product." })
    @prop()
    category: string;

}
