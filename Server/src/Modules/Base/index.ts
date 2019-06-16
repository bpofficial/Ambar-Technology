export default abstract class CRUDBaseService {

    public static async findOne<Class, Arg, Context>(args: Arg, ctx?: Context): Promise<Class | Error> {
        return new Promise<Class | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            throw new Error('Method findOne not inmplimented.')
        })
    }

    public static async find<Class, Arg, Context>(args?: Arg, ctx?: Context): Promise<Class[] | Error> {
        return new Promise<Class[] | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            throw new Error('Method find not inmplimented.')
        })
    }

    public static async add<Class, Arg, Context>(args: Arg, ctx?: Context): Promise<Class | Error> {
        return new Promise<Class | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            throw new Error('Method add not inmplimented.')
        })
    }

    public static async edit<Class, Arg, Context>(args: Arg, ctx?: Context): Promise<Class | Error> {
        return new Promise<Class | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            throw new Error('Method edit not inmplimented.')
        })
    }

    public static async delete<Arg, Context>(args: Arg, ctx?: Context): Promise<Boolean | Error> {
        return new Promise<Boolean | Error>(async (resolve: Function, reject: Function): Promise<void> => {
            throw new Error('Method delete not inmplimented.')
        })
    }

}