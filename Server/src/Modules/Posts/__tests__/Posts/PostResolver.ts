import Post from "./PostModel";
const ObjectID = require('mongodb').ObjectID;

export interface IO {
    [index: string]: string;
}

export default {
    Query: {
        post: ( _root: string, args: IO ): Promise<object> | Error => {
            return new Promise<object>( ( resolve: Function, reject: Function ): void => {
                if( 'id' in args ) args = { ...args, _id: ObjectID( args.id ) }; delete args.id
                Post.findOne ( args ).exec( ( err: Error, res: IO ): void => {
                    err ? reject( err ) : resolve( res );
                });
            });
        },
        posts: ( _root: string, _args: IO ): Promise<object> | Error => {
            return new Promise<object>( ( resolve: Function, reject: Function ): void => {
                Post.find().exec( ( err: Error, res: any ): void => {
                    for ( let product in res ) {
                        if ( '_id' in res[product] ) {
                            res[product].id = res[product]._id;
                        }
                    }                  
                    err ? reject( err ) : resolve( res );
                });
            });
        }
    }
}