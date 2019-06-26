import Product from "./Class";
import CRUDBaseService from "../Base/CRUD";
import { NewProductInput, EditProductInput } from "./IO";
import { GraphQLError } from "graphql";
import { ERR_UNAUTHORISED } from "../../Common/Constants/Errors";
import { ProductModel } from "./Class";

export default class ProductService implements CRUDBaseService {

    public static async findOne(sku: string, ctx: any): Promise<Product | Error> {
        return new Promise<Product | Error>(async (resolve: Function, reject: Function): Promise<void> => {

            // Execute query based on sku provided, if not logged in, hide the price.
            await ProductModel.findOne({ sku: sku }, !('email' in ctx) ? '-price' : undefined).exec(
                async (err, res): Promise<void> => {

                    // Reject on error, else resolve document found.
                    if (err) await reject(err); else await resolve(res);
                });
        }).catch(
            (err) => {
                console.warn('CAUGHT: [product] ~ then...catch \n', err)
                return new GraphQLError(err.message);
            }
        )
    }

    public static async find(args?: { [key: string]: any }, ctx?: any): Promise<Product[] | Error> {
        let filter: any = {
            $or: []
        }, sort: any = {};
        if ('orderBy' in args) {
            let subject: string[] = args.orderBy.split('_');
            sort = {
                [subject[0]]: subject[1].toLowerCase() == 'asc' ? 1 : -1
            }
        }

        if ('search' in args) {
            args.search.replace('-', ' ').split(' ').map(
                (keyword: string) => {
                    ['details', 'short', 'name', 'sku', 'category'].map((field: string) => {
                        filter.$or.push({
                            [field]: {
                                $regex: keyword,
                                $options: 'i'
                            }
                        })
                    })
                }
            )
        }

        return new Promise<Product[] | Error>(async (resolve: Function, reject: Function): Promise<void> => {

            // Execute query based on parameters (search) provided, if not logged in, hide the price.
            ProductModel.find(
                'search' in args ? filter : {},
                !ctx || !ctx.logged ? '-price' : null,
                'orderBy' in args ? Object.keys(sort).length > 0 ? { sort: sort } : {} : {}
            ).exec(async (err: Error, res: any): Promise<void> => {
                err ? await reject(err) : await resolve(res);
            });
        }).catch(
            (err) => {
                console.warn('CAUGHT: [product] ~ then...catch \n')
                return new GraphQLError(err.message);
            }
        )
    }

    public static async add(args: NewProductInput, ctx: any): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            try {

                // Check whether user is logged in or whether they are logged in but unauthorized to delete products.
                if (!('email' in ctx || ('_perm' in ctx && typeof ctx._perm == 'string' && ctx._perm == "all"))) await reject(ERR_UNAUTHORISED);

                // Open details and convert from markdown to html.
                // args.details = converter.makeHtml(args.details)
                const newProduct = new ProductModel(args)
                await newProduct.save(async (err: Error, product: any): Promise<void> => {
                    err ? await reject(err) : await resolve(!!product);
                });
            } catch (err) {
                console.warn('CAUGHT: [addProduct] ~ try...catch \n')
                await reject(err);
            }
        }).catch(
            (err) => {
                console.warn('CAUGHT: [addProduct] ~ then...catch \n', err.message)
                return new GraphQLError(err.message)
            }
        )
    }

    /**
     * 
     * @param Product \{ Product to edit, Sku to search for \}.
     * @param ctx Custom GraphQL context object of user (derived from token).
     */
    public static async edit({ args, sku }: { args: EditProductInput, sku?: string }, ctx: any): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<any> => {
            try {

                // Check whether user is logged in or whether they are logged in but unauthorized to delete products.
                if (!('email' in ctx || ('_perm' in ctx && typeof ctx._perm == 'string' && ctx._perm == "all"))) await reject(ERR_UNAUTHORISED);

                // If sku exists (current sku to search for) then use that to find the product, where the new sku will be args.sku.
                let searchSku: string = sku || args.sku;

                // Execute the query
                return await ProductModel.findOneAndUpdate({ sku: searchSku }, { $set: { ...args } }).exec(
                    async (err: Error, res: any): Promise<void> => {
                        err ? await reject(err) : await resolve(!!res);
                    }
                );
            } catch (err) {
                console.warn('CAUGHT: [addProduct] ~ try...catch \n')
                throw err;
            }
        }).catch(
            (err) => {
                console.warn('CAUGHT: [addProduct] ~ then...catch \n')
                return new GraphQLError(err.message)
            }
        )
    }

    public static async delete(sku: string, ctx: any): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<any> => {
            try {

                // Check whether user is logged in (context._id not null) or whether they are logged in but unauthorized to delete products.
                if (!('email' in ctx || ('_perm' in ctx && typeof ctx._perm == 'string' && ctx._perm == "all"))) await reject(ERR_UNAUTHORISED);

                return await ProductModel.findOneAndDelete({ sku: sku }).exec(async (err: Error, res): Promise<void> => {
                    err ? await reject(err) : await resolve(!!res);
                });
            } catch (err) {
                await reject(err);
            }
        }).catch(
            (err) => {
                console.warn('CAUGHT: [ProductServ::delete] ~ then...catch \n')
                return new GraphQLError(err.message)
            }
        )
    }

}