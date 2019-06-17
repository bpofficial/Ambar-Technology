
import User from "./Class";
import {
    ERR_UNAUTHORISED,
    ERR_NOTHING_FOUND,
    ERR_EMAIL_TAKEN
} from "../../Common/Constants/Errors";
import * as crypt from "bcryptjs";
import { GraphQLError } from "graphql";
import CRUDBaseService from "../Base/CRUD";
import { NewUserInput, EditUserInput } from "./IO";
import { client as redis } from "../../Common/Services/Redis";
import AuthenticationService from "../../Common/Services/Auth";

export const UserModel = new User().getModelForClass(User)

export default class UserService implements CRUDBaseService {

    public static async findOne(args: string, ctx: any): Promise<User | Error> {
        return new Promise<User | Error>(async (resolve: Function, reject: Function): Promise<void> => {

            // Execute query based on sku provided, if not logged in, hide the price.
            await UserModel.findOne({ email: args }).exec((err, res): void => {
                // Reject on error, else resolve document found.
                if (err) reject(err); else resolve(res);
            });
        }).catch(
            (err) => {
                console.warn('CAUGHT: [User] ~ then...catch \n', err)
                return err;
            }
        )
    }

    // ADMIN ONLY
    public static async find(ctx: any, args?: any): Promise<User[] | Error> {

        // If not an admin, throw unauthorised error. 
        if (!('_perm' in ctx || ctx._perm == 'all')) throw ERR_UNAUTHORISED;

        // Initialise the filter object. Setting all properties to empty objects.
        let filter: any = {
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
                    ['first', 'last', 'email', '_perm', 'post_address', 'bill_address'].map((field: string) => {

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

        return new Promise<User[] | Error>(async (resolve: Function, reject: Function): Promise<User[] | Error> => {

            // Execute query based on parameters (search) provided, if not logged in, hide the price.
            return await UserModel.find(

                // Populate search conditions if a search parameter is present and the search object's length is not 0.
                'search' in args ? Object.keys(filter.$or).length > 0 ? filter : {} : {},

                // Use projection to hide price for users that are not logged in (no email or token in context).
                !('email' in ctx || 'token' in ctx) ? '-price' : null,

                // Set search options to the sort object if there's a sort parameter in arguments and the object is not empty.
                'orderBy' in args ? Object.keys(sort).length > 0 ? { sort: sort } : {} : {}
            ).exec((err: Error, res: User[]): void => {

                // If there's an error, reject. Otherwise resolve the user documents found in the search, if any.
                err ? reject(err) : res.length > 0 ? resolve(res) : reject(ERR_NOTHING_FOUND);
            });
        }).catch(
            (err: any): GraphQLError => {

                // Warn on error
                console.warn('CAUGHT: [User] ~ then...catch \n', err.message)

                // the GraphQLError instance of the error.
                return new GraphQLError(err.message);
            }
        )
    }

    /**
     * The 'add' method will save a new user to the database (Mongo).
     * 
     * @param args User object.
     * @param ctx Custom GraphQL context object of user (derived from token).
     */
    public static async add(args: NewUserInput, ctx: any): Promise<User | Error> {
        return new Promise<User | Error>(async (resolve: Function, reject: Function): Promise<User | Error> => {
            try {

                // Generate a password and overrite the current password property on the args object.
                args.password = crypt.hashSync(args.password, crypt.genSaltSync(8));

                // Save the new user to the DB.
                return await UserModel.create(args, (err: Error, user: User): void => {

                    // Assuming the most likely instance of an error occuring is an identical email.
                    if (err) reject(ERR_EMAIL_TAKEN);

                    // Resolve otherwise.
                    resolve(user);
                });
            } catch (err) {
                console.warn('CAUGHT: [addUser] ~ try...catch \n', err.message)
                reject(err);
            }
        }).catch(
            (err) => {
                console.warn('CAUGHT: [addUser] ~ then...catch \n', err.message)
                throw new GraphQLError(err.message)
            }
        )
    }

    /**
     * The 'edit' method will update the current logged-in user's details with the
     * provided changes.
     * 
     * @param args Partial User object.
     * @param ctx Custom GraphQL context object of user (derived from token).
     */
    public static async edit(args: EditUserInput, ctx: any): Promise<User | Error> {
        return new Promise<User | Error>((resolve: Function, reject: Function): void => {
            try {

                /* 
                 * Password changes are done in the editPass method and require a special token 
                 * to be authenticated (this will be done via 2FA - email or mobile codes in browser).
                */

                // Reject with unauthorised if the user is not logged in.
                if (!(ctx || 'email' in ctx)) reject(ERR_UNAUTHORISED);

                // check whether there is a new email, and whether anyone else has this email.
                if ('email' in args && args.email !== ctx.email) {
                    UserModel.findOne({ email: args.email }).exec((err: Error, res: User) => {

                        // Not sure if we really care about an error here?
                        if (err) reject(err);

                        // Reject if the email the user is changing to is already taken.
                        if (res) reject(ERR_EMAIL_TAKEN);
                    })
                }

                // Find the current user (by email in context) and use the provided details for updating.
                UserModel.findOneAndUpdate({ email: ctx.email }, { $set: { ...args } }).exec(
                    (err: Error, res: InstanceType<typeof User>): void => {

                        // Reject on error;
                        if (err) reject(err);

                        /*
                         * Update redis with the new user doc. Use spread of ctx then res to ensure the user doc 
                         * overrites matching properties whilst keeping properties such as ctx.token intact.
                        */
                        redis.getset(res._id.toString(), JSON.stringify({ ...ctx, ...res }), (er: Error, re: any): void => {

                            // Reject on error.
                            if (er) reject(er);

                            // Resolve user doc otherwise.
                            resolve(res);
                        });
                    }
                );
            } catch (err) {
                console.warn('CAUGHT: [editUser] ~ try...catch \n', err.message)
                throw err;
            }
        }).catch(
            (err) => {
                console.warn('CAUGHT: [editUser] ~ then...catch \n', err.message)
                throw new GraphQLError(err.message)
            }
        )
    }

    /**
     * The 'delete' method will delete the user matching the provided email if the email matches
     * the current user's (in context) or if the user is an admin (User._perm == 'all'). 
     * 
     * @param args User email address.
     * @param ctx Custom GraphQL context object of user (derived from token).
     */
    public static async delete(args: User["email"], ctx: any): Promise<Boolean | Error> {
        return
    }

    public static async login(email: User["email"], password: User["password"], ctx: any): Promise<User | Error> {
        try {
            return AuthenticationService.login(email, password, ctx);
        } catch (err) {
            console.log("CAUGHT: [UserServ::login] ~ try...catch\n", err);
            return err;
        }
    }

    public static async logout(ctx: any): Promise<Boolean | Error> {
        try {
            return AuthenticationService.logout(ctx) ? true : false;
        } catch (err) {
            console.log("CAUGHT: [UserServ::logout] ~ try...catch\n", err);
            return new GraphQLError(err.message);
        }
    }

    public static async checkEmail(email: string, ctx: any): Promise<Boolean | Error> {
        return
    }

}