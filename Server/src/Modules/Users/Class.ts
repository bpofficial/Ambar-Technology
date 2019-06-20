import {
    Field,
    ObjectType,
    Authorized
} from "type-graphql";
import { prop, Typegoose, pre, plugin } from "typegoose";
import { LOGGED_IN_USER, HIDDEN, PUBLIC } from "../../Common/Constants/index";
import { MaxLength, IsEmail, MinLength } from "class-validator";
import mongooseUniqueValidator = require("mongoose-unique-validator");

@pre<User>('save', (next) => {
    // Pre-save hook
    // Add default permissions to object (_perm = {...} or _perm = 'all')
    next();
})

@pre<User>('update', (next) => {
    // Pre-update hook
    next();
})

@ObjectType({ description: "Class object representing a User." })
@plugin(mongooseUniqueValidator)
export default class User extends Typegoose {

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's first name." })
    @prop({ required: true })
    @MinLength(1, { message: "First name too short." })
    @MaxLength(20, { message: "First name too long." })
    first: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's last name." })
    @prop({ required: true })
    @MinLength(1, { message: "Last name too short." })
    @MaxLength(30, { message: "Last name too long." })
    last: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's email address." })
    @prop({ index: true, required: true })
    @IsEmail(null, { message: "Invalid email." })
    email: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's phone number." })
    @prop({ required: true })
    @MinLength(6, { message: "Phone number too short." })
    @MaxLength(12, { message: "Phone number too long." })
    phone: string;

    @Authorized(HIDDEN)
    @Field({ description: "User's encrypted password.", nullable: true })
    @prop({ required: true })
    @MinLength(8, { message: "Password too short." })
    password: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's company name." })
    @prop({ required: true })
    @MinLength(2, { message: "Company name too short." })
    company: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's company's ABN." })
    @prop({ required: false })
    @MinLength(6, { message: "ABN invalid." })
    abn?: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's postal address." })
    @prop({ required: true })
    @MaxLength(6, { message: "Postal address invalid." })
    post_address: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's billing address." })
    @prop({ required: false })
    @MaxLength(6, { message: "Billing address invalid." })
    bill_address?: string;

    @Authorized(PUBLIC)
    @Field({ description: "User's current token" })
    token?: string;

}
