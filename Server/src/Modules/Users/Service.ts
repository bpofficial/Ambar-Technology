interface Ctx {
    [key: string]: any
}
import {
    ERR_LOGGED_IN
} from "../../Common/Constants/Errors"
import User from "./Class";
import CRUDBaseService from "../Base/index";
import AuthenticationService from "../../Common/Services/Auth";
import { NewUserInput, EditUserInput } from "./IO";
import { GraphQLError } from "graphql";
export const UserModel = new User().getModelForClass(User)

export default class UserService implements CRUDBaseService {

    public static async findOne(args: string, ctx: Ctx): Promise<User | Error> {
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
    public static async find(args?: { [key: string]: any }, ctx?: Ctx): Promise<User[] | Error> {
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

        return new Promise<User[] | Error>(async (resolve: Function, reject: Function): Promise<User[] | Error> => {

            // Execute query based on parameters (search) provided, if not logged in, hide the price.
            return await UserModel.find(
                'search' in args ? filter : {},
                !ctx || !ctx.logged ? '-price' : null,
                'orderBy' in args ? Object.keys(sort).length > 0 ? { sort: sort } : {} : {}
            ).exec((err: Error, res: any): void => {
                if (err) reject(err); else resolve(res);
            });
        }).catch(
            (err) => {
                console.warn('CAUGHT: [User] ~ then...catch \n', err)
                return err;
            }
        )
    }

    public static async add(args: NewUserInput, ctx: Ctx): Promise<User | Error> {
        return
    }

    public static async edit(args: EditUserInput, ctx: Ctx): Promise<User | Error> {
        return new GraphQLError("Editing :)")
    }

    public static async delete(args: User["email"], ctx: Ctx): Promise<Boolean | Error> {
        return
    }

    public static async login(email: User["email"], password: User["password"], ctx: Ctx): Promise<User | Error> {
        try {
            if (Object.keys(ctx).length > 0 && 'id' in ctx) throw ERR_LOGGED_IN;
            return AuthenticationService.login(email, password);
        } catch (err) {
            console.log("CAUGHT: [UserServ::login] ~ try...catch\n", err);
            return err;
        }
    }

    public static async logout(ctx: any): Promise<Boolean> {
        try {
            return AuthenticationService.logout(ctx)
        } catch (err) {
            console.log("CAUGHT: [UserServ::logout] ~ try...catch\n", err);
            return err;
        }
    }

}