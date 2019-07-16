import * as express from "express";
import * as path from "path";
import Server from "./Common/Services/Express";
import ApolloServer from "./Common/Services/Apollo";
import Database from "./Common/Services/Mongoose";
import Authenticator from "./Common/Services/Auth";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./Modules";
import "reflect-metadata";

try {
    var dev;
    if (!('MONGODB_URI' in process.env)) {
        require("dotenv").config({ path: "../.env" });
        dev = true;
    } else {
        dev = false;
    }
    (async () => {
        dev ?
            await Database({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                table: process.env.DB_TABLE
            }) :
            await Database(process.env.MONGODB_URI)

        /**
         * Intialiase Apollo GraphQL Service
         */
        const Schema = await buildSchema({
            resolvers: Resolvers,
            authChecker: Authenticator.check
        });
        ApolloServer(Schema, dev).applyMiddleware({
            app: Server,
            path: "/api"
        })
    })();

    // Set static files (&client) to Public/
    Server.use(express.static(path.resolve('../Build/Public/')));

    // Server endpoint matches anything but api or nojs
    Server.get(/\/(?!.*(api|nojs)).*/g, (_req: express.Request, res: express.Response): void => {
        res.status(200).sendFile(path.resolve('../Build/Public/index.html'));
    });

    // Server rendered for browsers with js disabled.
    Server.get("/nojs", (_req: express.Request, res: express.Response): void => {
        res.status(403).send().end();
    });

    Server.listen(process.env.PORT || process.env.SERVER_PORT, (svrErr: Error): void => {
        if (svrErr) throw svrErr; else console.log("Server is running at " + process.env.SERVER_HOST + ":" + process.env.PORT || process.env.SERVER_PORT)
    });

} catch (Err) {
    console.log("Failed to initialise server: " + Err.message)
}
