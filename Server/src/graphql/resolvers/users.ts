import User from "../../models/user.mdl";
import * as crypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import { GraphQLError } from "graphql";

export interface IO {
    [index: string]: string;
}

interface JWT {
    token: string,
    user: IO
}

export default {
    Query: {
        

        //Currently, no reason for anyone to be able to query users.

        user: ( _root: string, args: IO ): Promise<object> | Error => {
            return new Promise<object>( ( resolve: Function, reject: Function ): void => {
                if( 'id' in args ) args = { ...args, _id: args.id }; delete args.id
                User.findOne ( args ).exec( ( err: Error, res: IO ): void => {
                    err ? reject( err ) : resolve( res );
                });
            });
        },
        users: ( _root: string, _args: IO ): Promise<object> | Error => {

            // User not in Apollo context, assume unauthenticated, return error.
            //if (!context.user) return new Error('User not authenticated.');
            return new Promise<object>( ( resolve: Function, reject: Function ): void => {
                User.find().exec( ( err: Error, res: IO[] ): void => {
                    for ( let product in res ) {
                        if ( '_id' in res[product] ) {
                            res[product].id = res[product]._id;
                        }
                    }                
                    err ? reject( err ) : resolve( res );
                });
            });
        },
        checkEmail: ( _root: string, { email }: IO ): Promise<object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {
                try {
                    return await User.findOne({ email: email }).exec( ( err: Error, exists: any ): void => {
                        if ( err ) reject(err); else resolve( exists ? {result:true} : {result:false});
                    });
                } catch( err ) {
                    reject(err);
                }
            }).then(
                ( result: any ) => {
                    return result
                }
            ).catch(
                ( err ) => {
                    throw new GraphQLError(err.message)
                }
            )
        }
    },
    Mutation: {
        addUser: ( _root: string, args: IO ): Promise<any> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {
                try {
                    args.password = crypt.hashSync( args.password, crypt.genSaltSync(8) );
                    const newUser = new User( args )
                    return await newUser.save( ( err: Error, user: any ): void => {
                        if ( err ) { reject( new GraphQLError(err.message)); return } 
                        const userPermission = {
                            user: {
                                canCreate: false,
                                canEdit: [user._id],
                                canDestroy: [user._id]
                            }
                        }
                        User.findOneAndUpdate(
                            { _id: user._id }, 
                            { $set: { _perm: {...userPermission } }  },
                            { new: true }
                        ).exec( ( err: Error, newUser: any ): void => {
                            if ( err ) {
                                throw err
                            } else {
                                newUser.password = null
                                resolve(newUser);
                            }
                        });
                    });
                } catch ( err ) {
                    console.warn('CAUGHT: [addUser] ~ try...catch \n', err.message)
                    throw err;
                }
            }).catch(
                ( err ) => {
                    console.warn('CAUGHT: [addUser] ~ then...catch \n', err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        editUser: ( _root: string, args: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( (resolve: Function, reject: Function ): void => {
                try {
                    if ( !context.logged || !context._perm.user.canEdit.includes( args.id ) ) 
                        reject(new Error('Unauthorized to edit this user.'));
                    User.findOneAndUpdate( { _id: args.id }, { $set: {...args} } ).exec(
                        ( err: Error, res: IO ): void => {
                            err ? reject( err ) : resolve( res );
                        }
                    );
                    } catch( err ) {
                        console.warn('CAUGHT: [editUser] ~ try...catch \n', err.message)
                        throw err;
                    }
            }).then(
                ( confirmation ) => {
                    return confirmation
                }
            ).catch(
                ( err ) => {
                    console.warn('CAUGHT: [editUser] ~ then...catch \n', err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        deleteUser: ( _root: string, { userId }: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {
                try {
                    // Check whether the user isn't logged in or doesn't have rights to remove the requested user.
                    if ( !context.logged || !context._perm.user.canDestroy.includes( userId ) ) 
                        reject(new Error(`Unauthorized to remove user with id: \'${userId}\'.`));
                    return await User.findOneAndRemove( { _id: userId } ).exec( ( err: Error, res: IO ): void => {
                        err ? reject( err ) : resolve( res );
                    });
                } catch ( err ) {
                    console.warn('CAUGHT: [deleteUser] ~ try...catch \n', err.message)
                    throw err;
                }
            }).then(
                ( confirmation: any ) => {
                    return confirmation
                }
            ).catch(
                ( err ) => {
                    console.warn('CAUGHT: [deleteUser] ~ then...catch \n', err.message)
                    throw new GraphQLError(err.message)
                }
            )
        },
        loginUser: ( _root: string, { email, password }: IO, context: any ): Promise<object> | Error => {
            return new Promise<object>( ( resolve: Function, reject: Function ): void => {
                try {
                    if ( context._id ) throw new Error('Already logged in.')
                    User.findOne ( { email } ).exec( ( err: Error, res: IO ): void => {
                        err ? reject( err ) : resolve( res );
                    });
                } catch( err ) {
                    console.warn('CAUGHT: [loginUser] ~ try...catch \n', err.message)
                    throw err;
                }
            }).then(
                ( user: IO ): any => {
                    try {
                        const match: boolean = crypt.compareSync( password, user.password )
                        if ( !match ) throw new Error( 'Invalid password.' )
                        user.token = JWT.sign({
                                id: user._id
                            },
                            process.env.JWT_SECRET || '',
                            { expiresIn: '30d' }
                        )
                        return user
                    } catch ( err ) {
                        console.warn('CAUGHT: [loginUser] ~ token try...catch \n', err.message)
                        throw err;
                    }
                }
            ).catch( 
                ( err ) => {
                    console.warn('CAUGHT: [loginUser] ~ then...catch \n', err.message)
                    throw new GraphQLError('Invalid email or password.')
                }
            )
        }
    }
};