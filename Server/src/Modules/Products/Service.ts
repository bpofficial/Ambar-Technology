import Product from "./Class";
import CRUDBaseService from "../Base/CRUD";
import { NewProductInput, EditProductInput } from "./IO";
interface Ctx {
    [key: string]: any
}
//import { GraphQLError } from "graphql";

const ProductModel = new Product().getModelForClass(Product)

export default class ProductService implements CRUDBaseService {

    public static async findOne(args: string, ctx: Ctx): Promise<Product | Error> {
        return new Promise<Product | Error>(async (resolve: Function, reject: Function): Promise<void> => {

            // Execute query based on sku provided, if not logged in, hide the price.
            await ProductModel.findOne({ sku: args }, !ctx || !ctx.logged ? '-price' : '').exec((err, res): void => {

                // Reject on error, else resolve document found.
                if (err) reject(err); else resolve(res);
            });
        }).catch(
            (err) => {
                console.warn('CAUGHT: [product] ~ then...catch \n', err)
                return err;
            }
        )
    }

    public static async find(args?: { [key: string]: any }, ctx?: Ctx): Promise<Product[] | Error> {
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

        return new Promise<Product[] | Error>(async (resolve: Function, reject: Function): Promise<Product[] | Error> => {

            // Execute query based on parameters (search) provided, if not logged in, hide the price.
            return await ProductModel.find(
                'search' in args ? filter : {},
                !ctx || !ctx.logged ? '-price' : null,
                'orderBy' in args ? Object.keys(sort).length > 0 ? { sort: sort } : {} : {}
            ).exec((err: Error, res: any): void => {
                if (err) reject(err); else resolve(res);
            });
        }).catch(
            (err) => {
                console.warn('CAUGHT: [product] ~ then...catch \n', err)
                return err;
            }
        )
    }

    public static async add(args: NewProductInput, ctx: Ctx): Promise<Product | Error> {
        return
    }

    public static async edit(args: EditProductInput, ctx: Ctx): Promise<Product | Error> {
        return
    }

    public static async delete(args: Product["sku"], ctx: Ctx): Promise<Boolean | Error> {
        return
    }

}