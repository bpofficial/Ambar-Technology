import * as mongoose from "mongoose";
var db: any;

export default function ({ host, port, table }) {
    db = { host, port, table };
    return mongoose.connect("mongodb://" + host + ":" + port + "/" + table, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    });
}

mongoose.connection.on("connected", () => {
    console.log(`Connection to database ${db.table} at ${db.host}:${db.port} established.`)
});

mongoose.connection.on("error", (err) => {
    console.warn(`MongoDB Error: ${err}`);
})