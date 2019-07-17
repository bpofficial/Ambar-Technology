import {
    Resolver,
    Authorized,
    Mutation,
    Query,
    Arg,
    Ctx
} from "type-graphql";
import Order, { OrderItem } from "./Class";
//import OrderService from "./Service";
import { LOGGED_IN_USER, PUBLIC, NULLABLE } from "../../Common/Constants";
import { default as repository } from "../Base/CRUD";
import { OrderModel as model } from "./Class";

@Resolver()
export default class OrderResolver {

    @Authorized(PUBLIC) // Usually LOGGED_IN_USER
    @Query(returns => Order || Error, NULLABLE)
    async order(
        @Arg("ID", _ => String) id: string,
        @Ctx() ctx: any
    ): Promise<Order | Error | void> {
        const order = await repository.findOne<Order>(model, { number: id });
    }

    @Authorized(LOGGED_IN_USER)
    @Query(returns => [Order] || Error, NULLABLE)
    async orders(
        @Arg("orderBy", _ => String, NULLABLE) orderBy?: string,
        @Arg("search", _ => String, NULLABLE) search?: string,
        @Ctx() ctx?: any
    ): Promise<Order[] | Error> {
        let args = orderBy !== undefined && search !== undefined ? { orderBy, search } : orderBy !== undefined ? { orderBy } : search !== undefined ? { search } : {}
        return //await OrderService.find(args, ctx)
    }

    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async addOrder(
        @Arg("order", _ => [OrderItem]) order: [OrderItem],
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return //await OrderService.add(order, ctx)
    }

    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async editOrder(
        @Arg("sku", _ => String) sku: string,
        @Arg("order", _ => Order) order: Partial<Order>,
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return //await OrderService.edit(order, ctx)
    }

    @Authorized(LOGGED_IN_USER)
    @Mutation(returns => Boolean || Error)
    async removeOrder(
        @Arg("OrderID", _ => String) id: string,
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return //await OrderService.delete(sku, ctx)
    }

}