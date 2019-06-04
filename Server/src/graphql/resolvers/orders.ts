import Order from "../../models/order.mdl";
import Product from "../../models/product.mdl";
import { GraphQLError } from "graphql";

export interface IO {
    [index: string]: string;
}

export default {
    Query: {
        order: ( _root: string, { number }: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {

                // Check whether user is logged in (context._id not null).
                if ( !context._id || !context ) reject(new Error("Unauthorized to view or edit orders."));

                // Execute query based on arguments provided.
                return await Order.findOne({ number: number }).exec( ( err: Error, res: IO ): void => {

                    // Reject on error, else resolve document found.
                    if ( err ) reject( err ); else resolve( res );
                });
            }).then(
                ( order: any ) => {
                    try {
                        if( context._id !== order._doc.creator ) throw new Error("Unauthorized to view this order.")
                        return order;
                    } catch( err ) {
                        console.warn( "CAUGHT: [order] ~ try...catch \n", err )
                        throw err;
                    }
                }
            ).catch(
                ( err ) => {
                    console.warn( "CAUGHT: [order] ~ then...catch \n", err )
                    return err;
                }
            )
        },
        orders: ( _root: string, args: any, context: any ): Promise<any[]> | Error => {
            let filter: any = {
                // Use logical AND to ensure that only orders made by the user are returned.
                $and: [{ creator: context._id }],
                // Use logical OR to return multiple entities with matching elements (search string)
                $or: []
            }, sort: any = {};
            if ( "orderBy" in args) {
                let subject: Array<string> = args.orderBy.split("_");
                sort = {
                    [subject[0]]: subject[1].toLowerCase() == "asc" ? 1 : -1
                }
            }
            if ( "search" in args ) {
                let string: Array<string> = args.search.split(" ");
                let searchKeys = ["number", "date", "status"]
                for( let keyword of string ) {
                    for ( let key of searchKeys ) {
                        filter.$or.push({
                            [key]: {
                                $regex: keyword,
                                $options: "i"
                            }
                        })
                    }
                }
            }
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {
                try {
                    return await Order.find(
                        args ? filter : {},
                        null, 
                        args ? Object.keys(sort).length > 0 ? { sort: sort } : {} : {}
                    ).exec( ( err: Error, res: any ): void => {
                        if ( err ) reject( err ); else resolve( res );
                    });
                } catch ( err ) {
                    console.warn( "CAUGHT: [orders] ~ try...catch \n", err )
                    throw err;
                }
            })
            .then(
                ( confirmation: any ) => {
                    return confirmation;
                }
            ).catch( 
                ( err ) => {
                    console.warn( "CAUGHT: [orders] ~ then...catch \n", err )
                    return new GraphQLError( err.message );
                }
            )
        }
    },
    Mutation: {
        createOrder: ( _root: string, args: any, context: any ): Promise<Object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<Object | Error> => {
                try {
                    args = JSON.parse(JSON.stringify(args));

                    // Check whether user is logged in (context._id not null) or whether they are logged in but unauthorized to create Orders.
                    if ( !context._id ) reject( new Error("Unauthorized to create an order."));

                    args.creator = context._id;

                    // Check all the items exist.
                    let itemCheck = args.items.filter( item => item.count > 0 )
                    .map( ( item, index: number ): Promise<any> => {
                        return new Promise( ( resolve, reject ) => {
                            return Product.findOne({ sku: item.sku }).exec( 
                                ( err: Error, res: any): void => {

                                    // If there"s an error, reject the promise.
                                    if ( err ) {
                                        reject( err ); 

                                    // If there"s no product returned, reject the promise.
                                    } else if ( !res || Object.keys( res ).length < 1 ) {
                                        reject(
                                            new Error("No product with provided SKU found.")
                                        );

                                    // If there"s not enough stock, reject the promise.
                                    } else if ( res.stock.available < item.count ) {
                                        reject(
                                            new Error(`Not enough stock to fulfil order. [SKU: ${item.sku}]`)
                                        );                                     
                                    }
                                    
                                    if ( res ) resolve( res );
                                });
                            }
                        );
                    });

                    return await Promise.all( itemCheck ).then(
                        ( values: any) => {
                            for ( let item of args.items ) {
                                if ( item && item.count < 1 ) {
                                    delete args.items[ args.items.indexOf( item ) ];
                                    continue;
                                }
                                let itemPrice = Number( values[values.map( (product: any ) => product.sku ).indexOf( item.sku )].price );
                                args.items[ args.items.indexOf( item ) ].cost = itemPrice * Number( item.count );
                            }
                            args.items = args.items.filter( item => item && item != null || item != undefined )
                            if ( args.items.length < 1 ) reject( new Error("No items in order. Ensure order amount for all items (count) is greater than 0.") )
                            return new Order( args ).save( ( err: Error, res: any ): void => {
                                if ( err ) reject( err ); else resolve( res );
                            });
                        }
                    )
                } catch ( err ) {
                    console.warn("CAUGHT: [createOrder] ~ try...catch \n", err.message)
                    reject( err );
                }
            }).then(
                async ( order: any ) => {
                    for ( let item of order.items ) {
                        await Product.findOneAndUpdate({ sku: item.sku }, { $inc: { 'stock.available': -1 * item.count, 'stock.allocated': item.count } } ).exec(
                            ( err: Error ) => { if ( err ) throw err; }
                        )
                    }
                    return { complete: true };
                }
            ).catch(
                ( err ) => {
                    console.warn("CAUGHT: [createOrder] ~ then...catch \n", err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        editOrder: ( _root: string, args: any, context: any ): Promise<object> | Error =>{
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {

                // Check whether user is logged in (context._id not null) or whether they are logged in but unauthorized to edit Orders.
                if ( !context._id ) reject( new Error("Unauthorized to edit Orders.") );
                if ( 'number' !in args ) reject( new Error("No order number provided.") );
                await Order.findOne({ number: args.number }).exec( ( err: Error, res: any ) => {
                    if ( err ) reject( err );
                    if ( context._id != res.creator ) reject( new Error("Unauthorized to edit this order.") ); 
                    console.log('Checked & owned.')
                });
                try {
                    for ( let item of args.items ) {

                        // Save the index of the current item to avoid calling multiple times.
                        let index = args.items.indexOf(item);

                        // If there"s no SKU, reject the promise.
                        if ( !item.sku ) reject( new Error("SKU Not provided.") );

                        // Save all item totals into args.items[i].cost for all items until the last, then update the order.
                        args.items[index].cost = await Product.findOne({ sku: item.sku }).exec( async ( err: Error, res: any): Promise<any> => {
                            console.log('Checking items.')

                            // If there"s an error, reject the promise.
                            if ( err ) {
                                reject(
                                    err
                                ); 

                            // If there"s no product returned, reject the promise.
                            } else if ( !res || Object.keys( res ).length < 1 ) {
                                reject(
                                    new Error("No product with provided SKU found.")
                                );

                            // If there"s not enough stock, reject the promise.
                            } else if ( res.stock.available < item.count ) {
                                reject(
                                    new Error(`Not enough stock to fulfil order. [SKU: ${item.sku}]`)
                                );

                            // If the loop is on the final index, save the order.
                            } else if ( Object.keys( args.items ).length - 1 == index ) {

                                // Save total cost.
                                args.items[index].cost = Number(res.price) * Number(item.count);

                                // Save updates to order in database.
                                Order.findOneAndUpdate({ number: args.number }, args, ( err: Error, res: any ): void => {
                                    console.log('saving')
                                    if ( err ) reject( err ); else resolve( res );
                                });

                            // Otherwise, return the total for the current item ( price * amount )
                            } else {
                                return Number(res.price) * Number(item.count);
                            }
                        });
                    }
                } catch ( err ) {
                    console.warn("CAUGHT: [editOrder] ~ try...catch \n", err.message)
                    reject( err );
                }
            }).catch(
                ( err ) => {
                    console.warn("CAUGHT: [editOrder] ~ then...catch \n", err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        cancelOrder: ( _root: string, args: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {

                // Check whether user is logged in (context._id not null) or whether they are logged in but unauthorized to delete Orders.
                if ( !context._id || !context._perm.Order.canDestroy ) reject(new Error("Unauthorized to remove Orders."));

                try {
                    let index: any;
                    if ( "id" in args ) {
                        index = { _id: args.id }; 
                        delete args.id;
                    } else if ( "sku" in args ) {
                        index = { sku: args.sku };
                    } else {
                        if ( !( "id" in args || "sku" in args ) ) throw new Error("No identifier provided. Use \"id\" or \"sku\".");
                    }
                    return await Order.findOneAndRemove( {...index} ).exec( ( err: Error, res: IO ): void => {
                        err ? reject( err ) : resolve( res );
                    });
                } catch ( err ) {
                    console.warn("CAUGHT: [addOrder] ~ try...catch \n", err.message)
                    throw err;
                }
            }).then(
                ( confirmation: any ) => {
                    return confirmation
                }
            ).catch(
                ( err ) => {
                    console.warn("CAUGHT: [addOrder] ~ then...catch \n", err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        completeOrder: ( _root: string, args: any, context: any ): Promise<object> | Error => {
            return
            // Change the order status to complete
            // Generate an invoice?
            // Minus the item order amounts from the allocated field of each item.
        }
    }
}