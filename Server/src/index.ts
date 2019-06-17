import * as express from "express";
import Server from "./Common/Services/Express";
import ApolloServer from "./Common/Services/Apollo";
import Database from "./Common/Services/Mongoose";
import Authenticator from "./Common/Services/Auth";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

try {
    require("dotenv").config({ path: "../.env" });
    (async _ => {
        await Database({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            table: process.env.DB_TABLE
        });

        /**
         * Intialiase Apollo GraphQL Service
         */
        const Schema = await buildSchema({
            resolvers: [__dirname + "/Modules/**/Resolver.ts"],
            authChecker: Authenticator.check
        });
        ApolloServer(Schema).applyMiddleware({
            app: Server,
            path: "/api"
        });
    })()

    /**
     * Respond with nothing to a direct uri connection
     * TODO: respond with actual client 
     */
    Server.get("/", (_req: express.Request, res: express.Response): void => {
        res.status(200).send().end();
    });

    // Server rendered for browsers with js disabled.
    Server.get("/nojs", (_req: express.Request, res: express.Response): void => {
        res.status(403).send().end();
    })

    Server.listen(process.env.SERVER_PORT, (svrErr: Error): void => {
        if (svrErr) throw svrErr; else console.log("Server is running at " + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT)
    });

} catch (Err) {
    console.log("Failed to initialise server: " + Err.message)
}



