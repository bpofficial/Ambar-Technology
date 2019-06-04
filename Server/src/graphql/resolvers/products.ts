import Product from "../../models/product.mdl";
import { LoggedInOnly } from '../types/products';
import { GraphQLError } from "graphql";
//const converter = new (require('showdown').Converter())

export interface IO {
    [index: string]: string;
}

export default {
    Query: {
        product: ( _root: string, args: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {

                // Change 'id' to '_id' for compatability with MongoDB indexing.
                if ( 'id' in args ) args._id = args.id; delete args.id;

                // Execute query based on arguments provided.
                return await Product.findOne( args ).exec( ( err: Error, res: IO ): void => {

                    // Reject on error, else resolve document found.
                    if ( err ) reject( err ); else resolve( res );
                });
            }).then(
                ( product: any ) => {
                    
                    // Define new product object
                    let newData = {};

                    try {
                        // Loop through keys of the product document
                        Object.keys( product._doc ).map( ( val ) => {
                            
                            // Check whether a key is '_id' (mongo) and change it to 'id' (defined)
                            if ( val == '_id' ) newData['id'] = product._doc._id; delete product._doc._id;

                            // Check whether the user is logged in, or whether not logged in but the key isn't in a 'logged in only' array.
                            if ( context.logged || !context.logged && !LoggedInOnly.includes( val ) ) {
                                // Append the corresponding key from the returned document to the new product object.
                                newData[val] = product._doc[val]
                            } else {
                                // If the key is in the 'logged in only' array, set the value to a string, prompting to login.
                                newData[val] = `Please login to see ${val}.`
                            }
                        });
                    } catch( err ) {
                        console.warn('CAUGHT: [product] ~ try...catch \n', err)
                    }
                    return newData
                }
            ).catch(
                ( err ) => {
                    console.warn('CAUGHT: [product] ~ then...catch \n', err)
                    return err;
                }
            )
        },
        products: ( _root: string, args: any, context: any ): Promise<any[]> | Error => {
            let filter: any = {
                $or: []
            }, sort: any = {};
            if ( 'orderBy' in args) {
                let subject: Array<string> = args.orderBy.split('_');
                sort = {
                    [subject[0]]: subject[1].toLowerCase() == 'asc' ? 1 : -1
                }
            }
            if ( 'search' in args ) {
                let string: Array<string> = args.search.split(' ');
                let searchKeys = ['details', 'short', 'name', 'sku', 'category']
                for( let keyword of string ) {
                    for ( let key of searchKeys ) {
                        filter.$or.push({
                            [key]: {
                                $regex: keyword,
                                $options: 'i'
                            }
                        })
                    }
                }
            }
            if ( 'category' in args ) {
                filter.$and = [{ category: args.category }]
            }
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {
                return await Product.find(
                    args ? filter : {},
                    null, 
                    args ? Object.keys(sort).length > 0 ? { sort: sort } : {} : {}
                ).exec( ( err: Error, res: any ): void => {
                    if ( err ) reject( err ); else resolve( res );
                });
            })
            .then(
                ( data: Array<any> ) => {
                    var newData: Array<any> = [];
                    try {
                        for( let product of data ) {
                            if ( '_doc' in product) product = product._doc;
                            let filteredProduct = {}
                            Object.keys( product ).map( ( val ) => {
                                if ( val == '_id' ) filteredProduct['id'] = product._id;
                                if ( context._id || !context._id && !LoggedInOnly.includes( val ) ) {
                                    filteredProduct[val] = product[val]
                                } else {
                                    filteredProduct[val] = `Please login to see ${val}.`
                                }
                            });
                            newData.push(filteredProduct)
                        }
                        return newData
                    } catch ( err ) {
                        console.warn('CAUGHT: [products] ~ try...catch \n', err)
                        return []
                    }
                }
            ).catch( 
                ( err ) => {
                    console.warn('CAUGHT: [products] ~ then...catch \n', err)
                    return err;
                }
            )
        }
    },
    Mutation: {
        addProduct: ( _root: string, args: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {

                // Check whether user is logged in (context._id not null) or whether they are logged in but unauthorized to create products.
                if ( !context._id || !context._perm.product.canCreate ) reject(new Error('Unauthorized to create products.'));

                try {
                    // Open details and convert from markdown to html.
                    //args.details = converter.makeHtml(args.details)
                    const newProduct = new Product( args )
                    return await newProduct.save( ( err: Error, product: any ): void => {
                        if ( err ) reject( err ); else resolve( product );
                    });
                } catch ( err ) {
                    console.warn('CAUGHT: [addProduct] ~ try...catch \n', err.message)
                    throw err;
                }
            }).then(
                ( confirmation: any ) => {
                    return confirmation
                }
            ).catch(
                ( err ) => {
                    console.warn('CAUGHT: [addProduct] ~ then...catch \n', err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        editProduct: ( _root: string, args: IO, context: any ): Promise<object> | Error =>{
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {

                // Check whether user is logged in (context._id not null) or whether they are logged in but unauthorized to edit products.
                if ( !context._id || !context._perm.product.canEdit ) reject(new Error('Unauthorized to edit products.'));

                try {
                    let index: any;
                    if ( 'id' in args ) {
                        index = { _id: args.id }; 
                        delete args.id;
                    } else if ( 'sku' in args ) {
                        index = { sku: args.sku };
                    } else {
                        if ( !( 'id' in args || 'sku' in args ) ) throw new Error('No identifier provided. Use \'id\' or \'sku\'.');
                    }
                    return await Product.findOneAndUpdate( {...index}, { $set: {...args} }).exec(
                        ( err: Error, res: any ): void => {
                            err ? reject( err ) : resolve( res );
                        }
                    );
                } catch ( err ) {
                    console.warn('CAUGHT: [addProduct] ~ try...catch \n', err.message)
                    throw err;
                }
            }).then(
                ( confirmation: any ) => {
                    return confirmation
                }
            ).catch(
                ( err ) => {
                    console.warn('CAUGHT: [addProduct] ~ then...catch \n', err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        deleteProduct: ( _root: string, args: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {

                // Check whether user is logged in (context._id not null) or whether they are logged in but unauthorized to delete products.
                if ( !context._id || !context._perm.product.canDestroy ) reject(new Error('Unauthorized to remove products.'));

                try {
                    let index: any;
                    if ( 'id' in args ) {
                        index = { _id: args.id }; 
                        delete args.id;
                    } else if ( 'sku' in args ) {
                        index = { sku: args.sku };
                    } else {
                        if ( !( 'id' in args || 'sku' in args ) ) throw new Error('No identifier provided. Use \'id\' or \'sku\'.');
                    }
                    return await Product.findOneAndRemove( {...index} ).exec( ( err: Error, res: IO ): void => {
                        err ? reject( err ) : resolve( res );
                    });
                } catch ( err ) {
                    console.warn('CAUGHT: [addProduct] ~ try...catch \n', err.message)
                    throw err;
                }
            }).then(
                ( confirmation: any ) => {
                    return confirmation
                }
            ).catch(
                ( err ) => {
                    console.warn('CAUGHT: [addProduct] ~ then...catch \n', err.message)
                    throw new GraphQLError(err.message)
                }
            )
        }
    }
}