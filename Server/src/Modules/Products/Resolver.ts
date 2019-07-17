import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Ctx,
    Authorized,
} from "type-graphql";
import Product from "./Class";
import ProductService from "./Service";
import { LOGGED_IN_ADMIN, PUBLIC } from "../../Common/Constants";

@Resolver(Product)
export default class ProductResolver {

    @Authorized(PUBLIC)
    @Query(returns => Product || Error, { nullable: true })
    async product(@Arg("sku",
        type => String, {
            description: "SKU of product."
        }) sku: string,
        @Ctx() ctx: any
    ): Promise<Product | Error> {
        return await ProductService.findOne(sku, ctx)
    }

    @Authorized(PUBLIC)
    @Query(returns => [Product] || Error, { nullable: true })
    async products(
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
    ): Promise<Product[] | Error> {
        let args = orderBy !== undefined && search !== undefined ? { orderBy, search } : orderBy !== undefined ? { orderBy } : search !== undefined ? { search } : {}
        return await ProductService.find(args, ctx)
    }

    @Authorized(LOGGED_IN_ADMIN)
    @Mutation(returns => Boolean || Error)
    async addProduct(
        @Arg("Product", {
            description: "Product object to save."
        }) product: Product,
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return await ProductService.add(product, ctx)
    }

    @Authorized(LOGGED_IN_ADMIN)
    @Mutation(returns => Boolean || Error)
    async editProduct(
        @Arg("Product", {
            description: "Updated version of product."
        }) product: Product,
        @Ctx() ctx: any,
        @Arg("SKU", {
            nullable: true,
            description: "Current SKU of product. Set to change value to SKU in 'product' param."
        }) sku?: string
    ): Promise<Boolean | Error> {
        return await ProductService.edit({ args: product }, ctx)
    }

    @Authorized(LOGGED_IN_ADMIN)
    @Mutation(returns => Boolean || Error)
    async removeProduct(
        @Arg("SKU", {
            description: "SKU of product to delete."
        }) sku: string,
        @Ctx() ctx: any
    ): Promise<Boolean | Error> {
        return await ProductService.delete(sku, ctx)
    }

}