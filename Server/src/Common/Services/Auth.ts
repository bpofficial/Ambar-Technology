import {
    LOGGED_IN_ADMIN,
    LOGGED_IN_USER,
    PUBLIC,
    HIDDEN,
    UNKNOWN
} from "../../Common/Constants/index";
import {
    ERR_LOGGED_IN,
    ERR_NO_TOKEN,
    ERR_TOKEN_EMPTY,
    ERR_USR_NOT_FOUND,
    ERR_INVALID_DETAILS,
    ERR_UNAUTHORISED
} from "../Constants/Errors"
import * as crypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import User from "../../Modules/Users/Class";
import { client as redis } from "./Redis";
const UserModel = new User().getModelForClass(User)

export default class AuthenticatorService {

    /**
     * The 'checkRole' method looks through redis for a client that has logged in
     * and whether the user object saved under the userId (_id) has a _perm.role 
     * property. If so, the method will return an appropriate constant (admin, user, unknown).
     * 
     * @param headers Request headers from Express
     */
    public static async checkRole(ctx: any): Promise<string | Error> {
        try {
            try {
                if ('token'! in ctx) throw ERR_NO_TOKEN;
                await this.decode(ctx.token).then(
                    (token) => {
                        return redis.get(token.id.toString(), (err, res) => {
                            res = JSON.parse(res);
                            // Throw error if there is one.
                            if (err) throw err;

                            // Throw error if there's no permissions saved for this user.
                            if (!("_perm" in res)) throw ERR_USR_NOT_FOUND(token.id);

                            // If there's a role saved in the object, find whether it's an admin or not.
                            if ("role" in res._perm) {
                                switch (res._perm.role) {
                                    case "admin":
                                        // Return the admin constant for matching.
                                        return LOGGED_IN_ADMIN
                                    default:
                                        // Return the user constant for matching.
                                        return LOGGED_IN_USER
                                }
                            }
                            // Return the unknown constant, analogous with an unauthenticated user.
                            return UNKNOWN
                        });
                    }
                ).catch(
                    (err) => {
                        throw err;
                    }
                );
            } catch (err) {
                console.warn("CAUGHT: [AuthServ::checkRole] ~ try...catch [2]\n", err.message)
                return UNKNOWN
            }
        } catch (err) {
            console.warn("CAUGHT: [AuthServ::checkRole] ~ try...catch [1]\n", err.message)
            return UNKNOWN;
        }
    }

    /**
     * The 'login' method will find a user with a matching email in Mongo and attempt to
     * match the password. If successful, the user object (minus password property) will
     * be added to redis.
     * 
     * @param email User's un-validated email.
     * @param password User's "plaintext" password.
     */
    public static async login(email: string, password: string, ctx: any): Promise<User | Error> {
        return new Promise<User | Error>((resolve: Function, reject: Function): void => {
            try {
                UserModel.findOne({ email }).exec((err: Error, res: any): void => {

                    // If there's an error with query, reject.
                    if (err) reject(err);

                    // If context exists and is not empty, reject.
                    if ('email' in ctx && ctx.email == email || '_id' in ctx) reject(ERR_LOGGED_IN);

                    // If there's no context and no instance of user in redis, resolve.
                    redis.get(res._id.toString(), (er: Error, re: any) => {
                        er ? reject(er) : re ? reject(ERR_LOGGED_IN) : resolve(res);
                    })
                });
            } catch (err) {
                console.warn('CAUGHT: [AuthServ::login] ~ try...catch \n')
                throw err;
            }
        }).then(
            async ({ _doc }: any): Promise<any> => {
                try {
                    let user: User = _doc;
                    const match: boolean = crypt.compareSync(password, user.password)
                    delete user.password;
                    if (!match) throw ERR_INVALID_DETAILS
                    user.token = <string>await jwt.sign({
                        id: user._id,
                        // E.g. John D
                        //name: `${user.first.charAt(0).toUpperCase() + user.first.slice(1)} ${user.last.charAt(0).toUpperCase()}`
                    },
                        process.env.JWT_SECRET,
                        // Expires in 8 hours
                        { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 8) }
                    )
                    // Expires in 8 hours
                    redis.set(user._id.toString(), JSON.stringify(user), 'EX', 60 * 60 * 8, (err: Error) => {
                        if (err) throw err;
                    });
                    return user;
                } catch (err) {
                    console.warn('CAUGHT: [AuthServ::login] ~ token try...catch \n')
                    throw err;
                }
            }
        ).catch((err) => {
            console.warn('CAUGHT: [AuthServ::login] ~ then...catch \n')
            throw new GraphQLError(err.message)
        })
    }

    /**
     * The 'logout' method will attempt to verify a user token and then append the current token
     * to the blacklist of tokens, subsequently removing the whitelisted token.
     * 
     * @param ctx Apollo context object
     */
    public static async logout(ctx: any): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            try {

                // If there's no token in context, throw ERR_NO_TOKEN (maybe better to use ERR_NOT_LOGGED_IN)
                if (!('token' in ctx)) throw ERR_NO_TOKEN;

                // Decode the token using the local static decode (verify) method.
                await this.decode(ctx.token).then(
                    (token) => {

                        // Check whether token is an instance of an Error
                        if (token instanceof GraphQLError || token instanceof Error) reject(false);

                        // Remove the current user from redis (using token)
                        redis.del(token.id.toString(), (err: Error) => {

                            // Reject on redis error.
                            if (err) reject(false);

                            // Resolve otherwise
                            resolve(true)
                        })
                    }
                ).catch(
                    (err) => {
                        throw err;
                    }
                );
            } catch (err) {
                reject(err);
            }
        }).catch(
            (err) => {
                console.warn("CAUGHT: [AuthServ::logout] ~ then...catch\n", err.stack.split("\n", 2).join(""))
                return false;
            }
        )
    }

    /**
     * The 'decode' method will decode a provided JWT token and return the payload, if any.
     * If there is no payload this function will throw ERR_TOKEN_EMPTY, to be caught in the
     * caller.
     * 
     * @param token Encoded (decrypted) token string.
     */
    public static async decode(token: string): Promise<any> {
        return new Promise<any>((resolve: Function, reject: Function): void => {
            try {
                return jwt.verify(token, process.env.JWT_SECRET, (err: Error, res: any) => {
                    if (err) reject(err);
                    if (!('id' in res)) throw ERR_TOKEN_EMPTY;
                    resolve(res)
                })
            } catch (err) {
                throw err;
            }
        }).catch(
            (err) => {
                return new GraphQLError(err.message);
            }
        )
    }

    public static async context(Request: any): Promise<any> {
        return new Promise<any>(async (resolve: Function, reject: Function): Promise<void> => {
            try {

                // Check whether there is an authorization token in the headers.
                if ("authorization" in Request.headers && Request.headers.authorization.length > 1) {

                    // If there's a token, decode it.
                    return this.decode(Request.headers.authorization).then(
                        (decToken: any) => {

                            // AuthService.decode can return an error, if so, reject.
                            if (decToken instanceof Error || decToken instanceof GraphQLError) reject(decToken);

                            // Check redis for the user object in this token.
                            redis.get(String(decToken.id), (err: Error, res: any) => {
                                console.log(err, res)
                                // Reject on error.
                                if (err) { reject(err); return };

                                // Resolve empty context object if no key is found with provided id.
                                if (res == null) { resolve({}); return }

                                // Parse the user object from stringified JSON.
                                const user = JSON.parse(res)

                                // Check whether the token matches the current token, if not, reject.
                                user.token !== Request.headers.authorization ? reject(ERR_UNAUTHORISED) : resolve(user);

                                // Default, resolve empty context.
                                resolve({})
                                return
                            });
                        }
                    ).catch(
                        (err) => {
                            console.warn("CAUGHT: [context] ~ then...catch [2]\n", err.message)
                            reject(err);
                        }
                    );
                } else {
                    // Resolve empty context.
                    resolve({});
                }
            } catch (err) {
                console.warn("CAUGHT: [context] ~ try...catch \n", err.message)
                reject(err);
            }
        }).catch((err) => {
            console.warn("CAUGHT: [context] ~ then...catch [1]\n", err.message)
            throw new GraphQLError(err.message)
        });
    }

    public static check({ context }: any, role): boolean {
        switch (role[0]) {
            case LOGGED_IN_USER:
                // If there's a user currently logged in (in context = verified) then return true.
                if ('email' in context) {
                    return true;
                }
                return false;
            case LOGGED_IN_ADMIN:
                // Check the user is an admin (_perm = 'all'), return true, else false.
                if ('_perm' in context && typeof context._perm == "string" && context._perm == 'all') {
                    return true;
                }
                return false;
            case HIDDEN:
                // Disable viewing of this field completely.
                return false;
            case PUBLIC:
                // Publically veiwable field.
                return true;
            default:
                // Default to true otherwise.
                return true;
        }
    }
}