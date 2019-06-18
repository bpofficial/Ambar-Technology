import * as mongoose from "mongoose";
var db: any;

const mongoConnect = ({ host, port, table }) => {
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

describe('Database', () => {
    var db;
    it('should connect with correct details', async () => {
        return mongoConnect({ host: '127.0.0.1', port: '27017', table: 'ambar' }).then(
            (res) => {
                expect(res.connections[0]).toBeTruthy();
                expect(res.connections[0].readyState).toBeTruthy();
            }
        );
    })
});