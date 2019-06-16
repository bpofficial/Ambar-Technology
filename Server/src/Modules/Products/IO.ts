import Product from "./Class";
import {
    Field,
    InputType,
} from "type-graphql";
import { Min, Max } from "class-validator";

@InputType()
export class NewProductInput implements Partial<Product> {

    @Field({ description: "Name of the product." })
    name: string;

    @Field({ description: "Stock keeping unit." })
    sku: string;

    @Field({ description: "Long details (HTML, Markdown, text)." })
    details: string;

    @Field({ description: "Snippet of 'details' (text).", nullable: true })
    short?: string;

    @Field({ description: "Price of the product in AUD." })
    @Min(1)
    @Max(9999)
    price: number;

    @Field({ nullable: true, description: "Current unallocated stock count.", defaultValue: 0 })
    @Min(-9999)
    @Max(9999)
    available?: number;

    @Field({ nullable: true, description: "Category of product.", defaultValue: "Uncategorised" })
    category?: string;

}

export class EditProductInput implements Partial<Product> {

    @Field({ description: "Name of the product.", nullable: true })
    name?: string;

    @Field({ description: "Stock keeping unit." })
    sku: string;

    @Field({ description: "Long details (HTML, Markdown, text).", nullable: true })
    details?: string;

    @Field({ description: "Snippet of 'details' (text).", nullable: true })
    short?: string;

    @Field({ description: "Price of the product in AUD.", nullable: true })
    @Min(1)
    @Max(9999)
    price?: number;

    @Field({ description: "Current unallocated stock count.", defaultValue: 0, nullable: true })
    @Min(-9999)
    @Max(9999)
    available?: number;

    @Field({ description: "Category of product.", defaultValue: "Uncategorised", nullable: true })
    category?: string;

}