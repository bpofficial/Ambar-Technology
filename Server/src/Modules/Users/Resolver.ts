import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Ctx,
    Authorized,
    InputType,
} from "type-graphql";
import {
    LOGGED_IN_USER,
    LOGGED_IN_ADMIN,
    PUBLIC,
    NULLABLE
} from "../../Common/Constants";
import User from "./Class";
import UserService from "./Service";
import { Context } from "apollo-server-core";

@Resolver(User)
export default class UserResolver {

    // Testing
    @Authorized(LOGGED_IN_USER)
    @Query(returns => User, NULLABLE)
    async user(@Ctx() ctx: any): Promise<User | Error> {
        return UserService.findOne(ctx)
    }

    @Authorized(PUBLIC)
    @Query(returns => Boolean)
    async checkEmail(@Arg("email", _ => String) email: string, @Ctx() ctx: any): Promise<Boolean | Error> {
        return UserService.checkEmail(email, ctx)
    }

    // Untested
    @Authorized(LOGGED_IN_ADMIN)
    @Query(returns => [User], NULLABLE)
    async users(
        @Arg("orderBy", _ => String, { nullable: true, description: "*field*_asc or *field*_dsc" }) orderBy?: string,
        @Arg("search", _ => String, NULLABLE) search?: string,
        @Ctx() ctx?: Context): Promise<User[] | Error> {
        let args = orderBy !== undefined && search !== undefined ? { orderBy, search } : orderBy !== undefined ? { orderBy } : search !== undefined ? { search } : {}
        return UserService.find(ctx, args)
    }

    // Untested
    @Authorized(PUBLIC)
    @Mutation(returns => Boolean || Error)
    async addUser(@Arg("User") user: User, @Ctx() ctx: any): Promise<Boolean | Error> {
        const res = UserService.add(user, ctx)
        if (res instanceof Error) return new Error(res.message);
        return !!res;
    }

    // Working / Tested
    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => User)
    async editUser(@Arg("User") user: User, @Ctx() ctx: any): Promise<User | Error> {
        return UserService.edit(user, ctx)
    }

    // Untested
    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean)
    async delUser(
        @Ctx() ctx: any,
        @Arg("email",
            _ => String, {
                nullable: true
            }) email?: string
    ): Promise<Boolean | Error> {
        return UserService.delete(ctx, email)
    }

    // Working / Tested
    @Authorized(PUBLIC)
    @Mutation(returns => User)
    async login(
        @Arg("email", _ => String) email: User["email"],
        @Arg("password", _ => String) password: User["password"],
        @Ctx() ctx: Context): Promise<User | Error> {
        return UserService.login(email, password, ctx);
    }

    // Working (TODO: test)
    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async logout(@Ctx() ctx: any): Promise<Boolean | Error> {
        return UserService.logout(ctx)
    }

}