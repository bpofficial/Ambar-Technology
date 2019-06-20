import User from "./Class";
import {
    Field,
    InputType
} from "type-graphql";
import { MaxLength, IsEmail, MinLength } from "class-validator";

@InputType()
export class NewUserInput implements Partial<User> {

    @Field(type => String, { description: "User's first name." })
    @MinLength(1, { message: "First name too short." })
    @MaxLength(20, { message: "First name too long." })
    first: string;

    @Field(type => String, { description: "User's last name." })
    @MinLength(1, { message: "Last name too short." })
    @MaxLength(30, { message: "Last name too long." })
    last: string;

    @Field(type => String, { description: "User's email address." })
    @IsEmail({}, { message: "Invalid email." })
    email: string;

    @Field(type => String, { description: "User's phone number." })
    @MinLength(6, { message: "Phone number too short." })
    @MaxLength(12, { message: "Phone number too long." })
    phone: string;

    @Field(type => String, { description: "User's encrypted password." })
    @MinLength(8, { message: "Password too short." })
    password: string;

    @Field(type => String, { description: "User's company name." })
    @MinLength(2, { message: "Company name too short." })
    company: string;

    @Field(type => String, { description: "User's company's ABN.", nullable: true })
    @MinLength(6, { message: "ABN invalid." })
    abn?: string;

    @Field(type => String, { description: "User's postal address." })
    @MinLength(6, { message: "Postal address invalid." })
    post_address: string;

    @Field(type => String, { description: "User's billing address.", nullable: true })
    @MinLength(6, { message: "Billing address invalid." })
    bill_address?: string;

}

@InputType()
export class EditUserInput implements Partial<User> {

    @Field(type => String, { description: "User's first name.", nullable: true })
    @MinLength(1, { message: "First name too short." })
    @MaxLength(20, { message: "First name too long." })
    first?: string;

    @Field(type => String, { description: "User's last name.", nullable: true })
    @MinLength(1, { message: "Last name too short." })
    @MaxLength(30, { message: "Last name too long." })
    last?: string;

    @Field(type => String, { description: "User's email address.", nullable: true })
    @IsEmail({}, { message: "Invalid email." })
    email?: string;

    @Field(type => String, { description: "User's phone number.", nullable: true })
    @MinLength(6, { message: "Phone number too short." })
    @MaxLength(12, { message: "Phone number too long." })
    phone?: string;

    @Field(type => String, { description: "User's encrypted password.", nullable: true })
    @MinLength(8, { message: "Password too short." })
    password?: string;

    @Field(type => String, { description: "User's company name.", nullable: true })
    @MinLength(2, { message: "Company name too short." })
    company?: string;

    @Field(type => String, { description: "User's company's ABN.", nullable: true })
    @MinLength(6, { message: "ABN invalid." })
    abn?: string;

    @Field(type => String, { description: "User's postal address.", nullable: true })
    @MinLength(6, { message: "Postal address invalid." })
    post_address?: string;

    @Field(type => String, { description: "User's billing address.", nullable: true })
    @MinLength(6, { message: "Billing address invalid." })
    bill_address?: string;

}