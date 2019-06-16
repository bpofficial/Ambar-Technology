import {
    Field,
    ObjectType,
    Authorized
} from "type-graphql";
import { prop, Typegoose, pre, plugin } from "typegoose";
import * as UniqueValidator from "mongoose-unique-validator";
import { LOGGED_IN_USER, HIDDEN } from "../../Common/Constants/index";

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
@plugin(UniqueValidator)
export default class User extends Typegoose {

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's first name." })
    @prop({ required: true })
    first: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's last name." })
    @prop({ required: true })
    last: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's email address." })
    @prop({ required: true, unique: true })
    email: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's phone number." })
    @prop({ required: true })
    phone: string;

    @Authorized(HIDDEN)
    @Field({ description: "User's encrypted password.", nullable: true })
    @prop({ required: true })
    password: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's company name." })
    @prop({ required: true })
    company: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's company's ABN." })
    @prop({ required: false })
    abn?: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's postal address." })
    @prop({ required: true })
    post_address: string;

    @Authorized(LOGGED_IN_USER)
    @Field({ description: "User's billing address." })
    @prop({ required: false })
    bill_address?: string;

    @Authorized(HIDDEN)
    @Field({ description: "User's current token" })
    token?: string;

}
