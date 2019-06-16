import {
    LOGGED_IN_ADMIN,
    LOGGED_IN_USER,
    UNKNOWN
} from "../Constants/";
import {
    ERR_LOGGED_IN,
    ERR_NO_TOKEN,
    ERR_TOKEN_EMPTY,
    ERR_USR_NOT_FOUND
} from "../Constants/Errors"
import * as crypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import User from "../../Modules/Users/Class";
import { client as redis, client } from "./Redis";
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

    // Look into this function and it's necessity.
    public static async checkPerm(check: string, headers: { [index: string]: any }): Promise<any> {
        try {
            if ("authorization" in headers) {
                var token: { [index: string]: any } = <{ [index: string]: any }>jwt.verify(<string>headers.authorization, process.env.JWT_SECRET || "");
                if (Object.keys(token).length < 2 && "iat" in token) throw new Error("No payload in token provided.");
            } else {
                throw ERR_NO_TOKEN;
            }
            try {
                const user = redis.get(token.id, (err, res) => {
                    if (err) throw err;
                    if (!("_perm" in res)) throw ERR_USR_NOT_FOUND(token.id);
                    return res
                });
                return user
            } catch (err) {
                console.warn("CAUGHT: [context:redis] ~ try...catch \n", err.message)
            }
        } catch (err) {
            console.warn("CAUGHT: [context:mon] ~ try...catch \n", err.message)
            return '';
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
    public static async login(email: string, password: string): Promise<User | Error> {
        return new Promise<User | Error>((resolve: Function, reject: Function): void => {
            try {
                UserModel.findOne({ email }).exec((err: Error, res: any): void => {
                    err ? reject(err) : false;

                    // Look in redis to find whether the user is already logged in (res._id is a key)
                    client.get(res._id.toString(), async (REDISErr: Error, REDISRes: any) => {
                        REDISErr || REDISErr !== null ? reject(REDISErr) : false;
                        REDISRes = JSON.parse(REDISRes);

                        // REDISRes is null if there's no keys found. Reject if a key is found.
                        if (REDISRes !== null && 'token' in REDISRes) {
                            await jwt.verify(REDISRes.token, process.env.JWT_SECRET, (JWTError: Error) => {
                                // If there's an error, token has expired (allow to login). Otherwise, user is already logged in.
                                JWTError ? resolve(res) : reject(ERR_LOGGED_IN)
                            })
                        } else {
                            // Allow user to login. No errors and not in redis.
                            resolve(res)
                        }
                    })
                });
            } catch (err) {
                console.warn('CAUGHT: [AuthServ::login] ~ try...catch \n')
                throw err;
            }
        }).then(
            async ({ _doc }: any): Promise<any> => {
                try {
                    let user = _doc;
                    const match: boolean = crypt.compareSync(password, user.password)
                    delete user.password;
                    if (!match) throw new Error('Invalid password.')
                    user.token = await jwt.sign({
                        id: user._id
                    },
                        process.env.JWT_SECRET || '',
                        { expiresIn: '7d' }
                    )
                    // Expires in 30 days
                    client.set(user._id.toString(), JSON.stringify(user), 'EX', 60 * 60 * 24 * 7);
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
     * The 'logout' method will attempt to find the id of a user from a provided token
     * and subsequently delete the record (id as key) from redis.
     * 
     * @param ctx Apollo context object
     */
    public static async logout(ctx: any): Promise<Boolean> {
        // TODO: Currently, all token's are still 'valid' and thus using an old one is fine. Need to fix that.
        return new Promise<boolean>(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                if (!('token' in ctx)) throw ERR_NO_TOKEN;
                await this.decode(ctx.token).then(
                    (token) => {
                        redis.del(token.id, (err: Error) => {
                            err ? reject(false) : resolve(true)
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
}