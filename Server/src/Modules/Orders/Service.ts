import CRUDBaseService from "../Base/CRUD";
import Order, { OrderModel } from "./Class";
import { ERR_UNAUTHORISED } from "../../Common/Constants/Errors";
import { GraphQLError } from "graphql";
import Product, { ProductModel } from "../Products/Class";
import { InstanceType } from "typegoose";

export default class OrderService implements CRUDBaseService {

    public static async findOne(id: string, ctx: any): Promise<Order | Error> {
        return new Promise<Order | Error>(async (resolve: Function, reject: Function): Promise<void> => {

            // Execute query based on arguments provided.
            await OrderModel.findOne({ number: id }).exec(async (err: Error, res: any): Promise<void> => {

                // Reject on error, else resolve document found.
                err ? await reject(err) : await resolve(res);
            }).then(
                async (order: any) => {
                    if (ctx._id !== order._doc.creator) await reject(ERR_UNAUTHORISED);
                    await resolve(order);
                }
            ).catch(err => new GraphQLError(err.message))
        })
    }

    public static async find(args: any, ctx: any): Promise<Order[] | Error> {
        return new Promise<Order[] | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            let filter: any = {
                // Use logical AND to ensure that only orders made by the user are returned.
                $and: [{ creator: ctx._id || '' }],
                // Use logical OR to return multiple entities with matching elements (search string)
                $or: []
            }, sort: any = {};
            // Populate the sort object if a sort (orderBy) parameter is present in the arguments.
            if ('orderBy' in args) {

                // Ordering is in the form: XXX_asc or XXX_dsc, where XXX is the field
                // (defined as one of the fields in the User class) to sort by (first, last, etc.).
                let subject: string[] = args.orderBy.split('_');

                // Populate the object. subject[0] is the field, subject[1] is the operator (asc / dsc)
                sort = {
                    [subject[0]]: subject[1].toLowerCase() == 'asc' ? 1 : -1
                }
            }

            // Populate the search object ($or) when a search parameter is present in the arguments.
            if ('search' in args) {

                // Split the string into an array by space characters, searching for individual words.
                args.search.replace('-', ' ').split(' ').map(
                    (keyword: string) => {

                        // Specify the fields to search in the User class.
                        ['number', 'data', 'status'].map((field: string) => {

                            // Push the field regex objects to the $or object.
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
            await OrderModel.find(
                args ? filter : {},
                null,
                args ? Object.keys(sort).length > 0 ? { sort: sort } : {} : {}
            ).exec(async (err: Error, res: any): Promise<void> => {
                // Reject on error, else resolve document found.
                err ? await reject(err) : await resolve(res);
            }).catch(err => new GraphQLError(err.message))
        })
    }

    public static async add(args: Partial<Order>, ctx: any): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {

            //args.creator = ctx._id;
            let order: Partial<Order> = { ...args };

            // Check all the items exist.
            let itemCheck = args.items.filter(item => item.count > 0)
                .map((item, index: number): Promise<any> => {
                    return new Promise((resolve, reject) => {
                        return ProductModel.findOne({ sku: item.sku }).exec(
                            async (err: Error, res: any): Promise<void> => {

                                // If there"s an error, reject the promise.
                                if (err) {
                                    await reject(err);

                                    // If there's no product returned, reject the promise.
                                } else if (!res || Object.keys(res).length < 1) {
                                    await reject(
                                        new Error("Product doesn't exist.")
                                    );

                                    // If there"s not enough stock, reject the promise.
                                } else if (res.stock.available < item.count) {
                                    await reject(
                                        new Error(`Not enough stock to fulfil order. [SKU: ${item.sku}]`)
                                    );
                                }

                                if (res) await resolve(res);
                            }
                        );
                    });
                });

            return await Promise.all(itemCheck).then(
                (values: any): any => {
                    for (let item of args.items) {
                        if (item && item.count < 1) {
                            delete args.items[args.items.indexOf(item)];
                            continue;
                        }
                    }
                    if (args.items.length < 1) reject(new Error("No items in order. Ensure order amount for all items (count) is greater than 0."));

                    return OrderModel.create(order, (err: Error, res: any): void => {
                        if (err) reject(err); else resolve(res);
                    });
                }
            )
        })
    }

    public static async edit(args: Partial<Order>, ctx: any): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            if (!('number' in args)) await reject(new Error("No order number provided."));
            await OrderModel.findOne({ number: args.orderid }).exec(async (err: Error, res: any) => {
                if (err) reject(err);
                if (ctx._id != res.creator) await reject(ERR_UNAUTHORISED);
            });
            // Check all the items exist.
            let itemCheck: Array<Promise<InstanceType<Product>>> = args.items.filter(item => item.count > 0)
                .map((item, index: number): Promise<any> => {
                    return new Promise((resolve, reject) => {
                        return ProductModel.findOne({ sku: item.sku }).exec(
                            async (err: Error, res): Promise<void> => {

                                // If there's an error, reject the promise.
                                if (err) {
                                    await reject(err);

                                    // If there"s no product returned, reject the promise.
                                } else if (!res || Object.keys(res).length < 1) {
                                    await reject(
                                        new Error("No product with provided SKU found.")
                                    );

                                    // If there"s not enough stock, reject the promise.
                                } else if (res.stock.available < item.count) {
                                    await reject(
                                        new Error(`Not enough stock to fulfil order. [SKU: ${item.sku}]`)
                                    );
                                }

                                await resolve(res);
                            });
                    }
                    );
                });

            await Promise.all(itemCheck).then(async values => {

                // Assign args.items to a type-safe variable.
                let order/*: OrderItem[]*/ = args.items

                // Loop through all items in order.
                for (let item of args.items) {

                    // Delete item from order if the count is less than 1.
                    if (item && item.count < 1) {

                        // Remove item from items array.
                        delete args.items[args.items.indexOf(item)];

                        // Skip current iteration to avoid errors (undefined item).
                        continue;
                    }

                    // Get the price of the item.
                    let itemPrice = Number(values[values.map((product: Product) => product.sku).indexOf(item.sku)].price);

                    // Set the total cost of the item ( price * amount ).
                    order[args.items.indexOf(item)].cost = itemPrice * Number(item.count);
                }

                // Remove all <empty> elements from items.
                order = order.filter(item => item && item != null || item != undefined);

                // If there's nothing in items, reject the promise.
                if (args.items.length < 1) await reject(new Error("No items in order. Ensure order amount for all items (count) is greater than 0."))

                // If everything else has gone ok, find the order and try to update it.
                await OrderModel.findOneAndUpdate({ number: args.orderid }, args, async (err: Error, res: any): Promise<void> => {

                    // Reject on error.
                    if (err) await reject(err);

                    // Reject on empty response.
                    if (!res) await reject(new Error("Order not found with provided number."));

                    // Resolve otherwise.
                    await resolve(res);
                });
            })
        })
    }

    // TODO: Finish this
    public static async delete(args: string, ctx: any): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {

        })
    }

}