import {
    Resolver,
    Query,
    Arg,
    Args,
    Mutation,
    Ctx,
    Authorized,
} from "type-graphql";
import {
    LOGGED_IN_USER,
    LOGGED_IN_ADMIN
} from "../../Common/Constants";
import {
    ERR_UNAUTHORISED
} from "../../Common/Constants/Errors";
import User from "./Class";
import UserService from "./Service";
import { Context } from "apollo-server-core";
import { NewUserInput, EditUserInput } from "./IO";
import { GraphQLError } from "graphql";

@Resolver(User)
export class UserResolver {

    @Authorized(LOGGED_IN_USER)
    @Query(returns => User, { nullable: true })
    async user(@Arg("email", type => String, { description: "Email of user." }) email: string, @Ctx() ctx: any): Promise<User | Error> {
        if ('email' in ctx && ctx.email !== email) throw new GraphQLError(ERR_UNAUTHORISED.message);
        return UserService.findOne(email, ctx)
    }

    @Authorized(LOGGED_IN_ADMIN)
    @Query(returns => [User], { nullable: true })
    async users(
        @Arg("orderBy", type => String, { nullable: true, description: "*field*_asc or *field*_dsc" }) orderBy?: string,
        @Arg("search", type => String, { nullable: true }) search?: string,
        @Ctx() ctx?: Context): Promise<User[] | Error> {
        let args = orderBy !== undefined && search !== undefined ? { orderBy, search } : orderBy !== undefined ? { orderBy } : search !== undefined ? { search } : {}
        return UserService.find(args, ctx)
    }

    @Mutation(returns => User)
    async addUser(user: NewUserInput, @Ctx() ctx: Context): Promise<User | Error> {
        return UserService.add(user, ctx)
    }

    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => User)
    async editUser(@Arg("user") user: EditUserInput, @Ctx() ctx: Context): Promise<User | Error> {
        return UserService.edit(user, ctx)
    }

    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean)
    async removeUser(@Arg("email", type => String) email: string, @Ctx() ctx: any): Promise<Boolean | Error> {
        if ('email' in ctx && ctx.email !== email) throw new GraphQLError(ERR_UNAUTHORISED.message);
        return UserService.delete(email, ctx)
    }

    @Mutation(returns => User)
    async login(
        @Arg("email", type => String) email: User["email"],
        @Arg("password", type => String) password: User["password"],
        @Ctx() ctx: Context): Promise<User | Error> {
        return UserService.login(email, password, ctx);
    }

    @Authorized(LOGGED_IN_ADMIN)
    @Mutation(returns => Boolean)
    async logout(@Ctx() ctx: any): Promise<any> {
        return UserService.logout(ctx)
    }

}