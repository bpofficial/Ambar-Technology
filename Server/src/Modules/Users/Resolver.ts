import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Ctx,
    Authorized,
} from "type-graphql";
import {
    LOGGED_IN_USER,
    LOGGED_IN_ADMIN,
    PUBLIC
} from "../../Common/Constants";
import User from "./Class";
import UserService from "./Service";
import { Context } from "apollo-server-core";
import { NewUserInput, EditUserInput } from "./IO";

@Resolver(User)
export class UserResolver {

    // Untested
    @Authorized(LOGGED_IN_USER)
    @Query(returns => User, { nullable: true })
    async user(@Arg("email", type => String, { description: "Email of user." }) email: string, @Ctx() ctx: any): Promise<User | Error> {
        return UserService.findOne(email, ctx)
    }

    // Untested
    @Authorized(LOGGED_IN_ADMIN)
    @Query(returns => [User], { nullable: true })
    async users(
        @Arg("orderBy", type => String, { nullable: true, description: "*field*_asc or *field*_dsc" }) orderBy?: string,
        @Arg("search", type => String, { nullable: true }) search?: string,
        @Ctx() ctx?: Context): Promise<User[] | Error> {
        let args = orderBy !== undefined && search !== undefined ? { orderBy, search } : orderBy !== undefined ? { orderBy } : search !== undefined ? { search } : {}
        return UserService.find(args, ctx)
    }

    // Untested
    @Authorized(PUBLIC)
    @Mutation(returns => User)
    async addUser(user: NewUserInput, @Ctx() ctx: Context): Promise<User | Error> {
        return UserService.add(user, ctx)
    }

    // Untested
    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => User)
    async editUser(@Arg("user") user: EditUserInput, @Ctx() ctx: Context): Promise<User | Error> {
        return UserService.edit(user, ctx)
    }

    // Untested
    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean)
    async removeUser(@Arg("email", type => String) email: string, @Ctx() ctx: any): Promise<Boolean | Error> {
        return UserService.delete(email, ctx)
    }

    // Mostly works, run tests.
    @Authorized(PUBLIC)
    @Mutation(returns => User)
    async login(
        @Arg("email", type => String) email: User["email"],
        @Arg("password", type => String) password: User["password"],
        @Ctx() ctx: Context): Promise<User | Error> {
        return UserService.login(email, password, ctx);
    }

    // TODO: Doesn't authorise when logging out, as if the context is deleted before this is complete. Bloody annoying.
    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async logout(@Ctx() ctx: any): Promise<Boolean | Error> {
        return UserService.logout(ctx)
    }

}