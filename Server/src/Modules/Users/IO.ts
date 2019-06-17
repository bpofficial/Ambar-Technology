import User from "./Class";
import {
    Field,
    InputType
} from "type-graphql";

@InputType()
export class NewUserInput extends User {

    @Field({ description: "User's first name." })
    first: string;

    @Field({ description: "User's last name." })
    last: string;

    @Field({ description: "User's email address." })
    email: string;

    @Field({ description: "User's phone number." })
    phone: string;

    @Field({ description: "User's encrypted password." })
    password: string;

    @Field({ description: "User's company name." })
    company: string;

    @Field({ description: "User's company's ABN.", nullable: true })
    abn?: string;

    @Field({ description: "User's postal address." })
    post_address: string;

    @Field({ description: "User's billing address.", nullable: true })
    bill_address?: string;

}

@InputType()
export class EditUserInput implements Partial<User> {

    @Field(type => String, { description: "User's first name.", nullable: true })
    first?: string;

    @Field(type => String, { description: "User's last name.", nullable: true })
    last?: string;

    @Field(type => String, { description: "User's email address.", nullable: true })
    email?: string;

    @Field(type => String, { description: "User's phone number.", nullable: true })
    phone?: string;

    @Field(type => String, { description: "User's company name.", nullable: true })
    company?: string;

    @Field(type => String, { description: "User's postal address.", nullable: true })
    post_address?: string;

    @Field(type => String, { description: "User's billing address.", nullable: true })
    bill_address?: string;

    @Field(type => String, { description: "User's company's ABN.", nullable: true })
    abn?: string

}