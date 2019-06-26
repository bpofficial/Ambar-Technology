import { GraphQLError } from "graphql";
import Order from "../Orders/Class";
import { Model, Document } from "mongoose";
import { InstanceType } from "typegoose";

export default class CRUDBaseService {

    public static async findOne<Class>(model: Model<InstanceType<Class>, {}> & Class, args: { [id: string]: any }): Promise<Class & Document> {
        return new Promise<Class & Document>(async (resolve: Function, reject: Function): Promise<void> => {
            await model.findOne({ ...args }).exec(async (err: Error, res: InstanceType<Class>) => {
                err ? await reject(err) : await resolve(res);
            }).catch(err => new GraphQLError(err.message))
        })
    }

    public static async find<Class, Arg>(module, args?: Arg): Promise<Class[] | Error> {
        return new Promise<Class[] | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            const model = new module().getModelForClass(module);

            // Implement $graphLookup with 1 step (depth) to ensure decent data collection
            await model.find({ ...args }).exec(async (err: Error, res) => {
                err ? await reject(err) : await resolve(res);
            }).catch(err => new GraphQLError(err.message))
        })
    }

    public static async add<Arg>(module, args: Arg): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            const model = new module().getModelForClass(module);
            await model.create(args).exec(async (err: Error, res) => {
                err ? await reject(err) : await resolve(res);
            }).catch(err => new GraphQLError(err.message))
        })
    }

    public static async edit<Arg>(module, args: Arg): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            const model = new module().getModelForClass(module);
            await model.findOneAndUpdate({ ...args['id'] }, args).exec(async (err: Error, res) => {
                err ? await reject(err) : await resolve(res);
            }).catch(err => new GraphQLError(err.message))
        })
    }

    public static async delete<Arg>(module, args: Arg): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            const model = new module().getModelForClass(module);
            await model.findOneAndDelete({ ...args }).exec(async (err: Error, res) => {
                err ? await reject(err) : await resolve(res);
            }).catch(err => new GraphQLError(err.message))
        })
    }

}