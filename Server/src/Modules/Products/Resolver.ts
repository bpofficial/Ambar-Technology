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
import { NewProductInput, EditProductInput } from "./IO";
import { Context } from "apollo-server-core";

@Resolver(Product)
export default class ProductResolver {

    @Query(returns => Product, { nullable: true })
    async product(@Arg("sku", type => String, { description: "SKU of product." }) sku: Product["sku"], @Ctx() ctx: Context): Promise<Product | Error> {
        return ProductService.findOne(sku, ctx)
    }

    @Authorized("yew")
    @Query(returns => [Product], { nullable: true })
    async products(
        @Arg("orderBy", type => String, { nullable: true, description: "*field*_asc or *field*_dsc" }) orderBy?: string,
        @Arg("search", type => String, { nullable: true }) search?: string,
        @Ctx() ctx?: Context): Promise<Product[] | Error> {
        let args = orderBy !== undefined && search !== undefined ? { orderBy, search } : orderBy !== undefined ? { orderBy } : search !== undefined ? { search } : {}
        return ProductService.find(args, ctx)
    }

    @Mutation(returns => Product)
    async addProduct(product: NewProductInput, @Ctx() ctx: Context): Promise<Product | Error> {
        return ProductService.add(product, ctx)
    }

    @Mutation(returns => Product)
    async editProduct(product: EditProductInput, @Ctx() ctx: Context): Promise<Product | Error> {
        return ProductService.edit(product, ctx)
    }

    @Mutation(returns => Boolean)
    async removeProduct(sku: Product["sku"], @Ctx() ctx: Context): Promise<Boolean | Error> {
        return ProductService.delete(sku, ctx)
    }

}