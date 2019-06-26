import Product from "./Class";
import {
    Field,
    InputType,
} from "type-graphql";
import { Min, MaxLength, MinLength } from "class-validator";

@InputType()
export class NewProductInput implements Partial<Product> {

    @Field(type => String, { description: "Name of the product." })
    @MinLength(2, { message: "Produt name too short." })
    @MaxLength(64, { message: "Product name too long." })
    name: string;

    @Field(type => String, { description: "Stock keeping unit." })
    @MinLength(2)
    @MaxLength(16)
    sku: string;

    @Field(type => String, { description: "Long details (HTML, Markdown, text)." })
    @MinLength(2)
    @MaxLength(2048)
    details: string;

    @Field(type => String, { description: "Snippet of 'details' (text).", nullable: true })
    @MaxLength(512)
    short?: string;

    @Field(type => Number, { description: "Price of the product in AUD." })
    @Min(0.0001)
    price: number;

    @Field(type => Number, { nullable: true, description: "Current unallocated stock count.", defaultValue: 0 })
    @Min(0)
    available?: number;

    @Field(type => String, { nullable: true, description: "Category of product.", defaultValue: "Uncategorised" })
    @MaxLength(32)
    category?: string;

}

@InputType()
export class EditProductInput implements Partial<Product> {

    @Field(type => String, { description: "Name of the product.", nullable: true })
    @MinLength(2, { message: "Produt name too short." })
    @MaxLength(64, { message: "Product name too long." })
    name?: string;

    @Field(type => String, { description: "Stock keeping unit." })
    @MinLength(2)
    @MaxLength(16)
    sku: string;

    @Field(type => String, { description: "Long details (HTML, Markdown, text).", nullable: true })
    @MinLength(2)
    @MaxLength(2048)
    details?: string;

    @Field(type => String, { description: "Snippet of 'details' (text).", nullable: true })
    @MaxLength(512)
    short?: string;

    @Field(type => Number, { description: "Price of the product in AUD.", nullable: true })
    @Min(0.0001)
    price?: number;

    @Field(type => Number, { description: "Current unallocated stock count.", defaultValue: 0, nullable: true })
    @Min(0)
    available?: number;

    @Field(type => String, { description: "Category of product.", defaultValue: "Uncategorised", nullable: true })
    @MaxLength(32)
    category?: string;

}