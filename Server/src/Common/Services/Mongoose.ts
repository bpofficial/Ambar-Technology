import * as mongoose from "mongoose";

export default function (args: { host: string, port: string, table: string } | string) {
    if (typeof args !== 'string') {
        return mongoose.connect("mongodb://" + args.host + ":" + args.port + "/" + args.table, {
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true
        });
    } else {
        return mongoose.connect(args, {
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true
        });
    }
}

mongoose.connection.on("connected", () => {
    console.log(`Connection to database established.`)
});

mongoose.connection.on("error", (err) => {
    console.warn(`MongoDB Error: ${err}`);
})