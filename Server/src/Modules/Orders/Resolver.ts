import {
    Resolver,
    Authorized,
    Mutation,
    Query,
    Arg,
    Ctx
} from "type-graphql";
import Order from "./Class";
import OrderService from "./Service";
import { NewOrderInput, EditOrderInput } from "./IO";
import { LOGGED_IN_USER, PUBLIC } from "../../Common/Constants";
import { default as repository } from "../Base/CRUD";
import { OrderModel as model } from "./Class";

@Resolver()
export default class OrderResolver {

    @Authorized(PUBLIC) // Usually LOGGED_IN_USER
    @Query(returns => Order || Error, { nullable: true })
    async order(
        @Arg("ID", type => String, {
            description: "Order Number"
        }) id: string,
        @Ctx() ctx: any
    ): Promise<Order | Error | void> {
        const order = await repository.findOne<Order>(model, { number: id });
        console.log(order)
    }

    @Authorized(LOGGED_IN_USER)
    @Query(returns => [Order] || Error, { nullable: true })
    async orders(
        @Arg("orderBy",
            type => String, {
                nullable: true,
                description: "*field*_asc or *field*_dsc"
            }) orderBy?: string,
        @Arg("search",
            type => String, {
                nullable: true
            }) search?: string,
        @Ctx() ctx?: any
    ): Promise<Order[] | Error> {
        let args = orderBy !== undefined && search !== undefined ? { orderBy, search } : orderBy !== undefined ? { orderBy } : search !== undefined ? { search } : {}
        return await OrderService.find(args, ctx)
    }

    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async addOrder(
        @Arg("NewOrder", {
            description: "Order object to save."
        }) order: NewOrderInput,
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return await OrderService.add(order, ctx)
    }

    /*@Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async editOrder(
        @Arg("EditOrder", type => EditOrderInput, {
            description: "Updated version of order. Can't change order number."
        }) order: EditOrderInput,
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return //await OrderService.edit({ args: order }, ctx)
    }*/

    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async removeOrder(
        @Arg("SKU", type => String, {
            description: "SKU of order to delete."
        }) sku: string,
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return await OrderService.delete(sku, ctx)
    }

}