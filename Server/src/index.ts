import * as bodyParser from "body-parser"; 
import * as express from "express";
import * as path from "path";
import * as pino from "express-pino-logger";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as helmet from "helmet";
import { ApolloServer } from "apollo-server-express";
import GQSchema from "./graphql/";
import { GraphQLError } from "graphql";
import * as jwt from "jsonwebtoken";
import User from "./models/user.mdl";

try {
    require("dotenv").config({ path: "../.env" });
    mongoose.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_TABLE, { 
        useFindAndModify: false, 
        useCreateIndex: true, 
        useNewUrlParser: true 
    });

    mongoose.connection.on("connected", () => {
        console.log(`Connection to database ${process.env.DB_TABLE} at ${process.env.DB_HOST}:${process.env.DB_PORT} established.`)
    });

    mongoose.connection.on("error", ( err ) => {
        console.warn(`MongoDB Error: ${err}`);
    })

    /**
     * Intialise App & Middleware
     */
    const app = express(); 
    app.use( helmet() );
    app.use( cors() );
    app.use( pino() ); 
    app.use( bodyParser.json() ); 
    app.use( express.static ( path.resolve( __dirname + "dist" ) ) );
    /**
     * Intialiase Apollo GraphQL
     */
    new ApolloServer({ 
        schema: GQSchema,
        playground: process.env.MODE == "development",
        tracing: process.env.MODE == "development",
        formatError: (err): GraphQLError => {
            return new GraphQLError( err.message );
        },
        context: async ({ req }) => {
            try {
                if ( "authorization" in req.headers ) {
                    var token: {[index: string]: any} = <{[index: string]: any}>jwt.verify(<string>req.headers.authorization, process.env.JWT_SECRET || "");
                    if ( Object.keys(token).length < 2 && "iat" in token ) throw new Error( "No payload in token provided." );
                } else {
                    throw new Error( "No token provided." );
                }
                // Check redis first.
                /*
                try {
                    const user = client.get(token.id, ( err, res ) => {
                        if ( err ) throw err;
                        if ( !( "_perm" in res ) ) throw new Error("No permissions found with userID: " + token.id);
                        return res
                    });
                    return user
                } catch ( err ) {
                    console.warn("CAUGHT: [context:redis] ~ try...catch \n", err.message)
                }

                */

                // Check mongo second.
                return new Promise<object>( async ( resolve: Function, reject: Function ): Promise<any> => {
                    return await User.findOne({ _id: token.id }).exec( ( err: Error, res: any ): void => {
                        if ( err || !res ) {
                            reject( err == null ? new Error("No account found with userID: " + token.id) : err );
                        } else {
                            resolve( res );
                        }
                    });
                }).then(
                    ( user: any ) => {
                        return user._doc;
                    }
                ).catch(
                    ( err ) => {
                        console.warn("CAUGHT: [context:mongo] ~ then...catch \n", err.message)
                        return err;
                    }
                );
            } catch ( err ) {
                console.warn("CAUGHT: [context:mon] ~ try...catch \n", err.message)
                return err;
            }
        }
    }).applyMiddleware({ 
        app, 
        path: "/api"
    });

    /**
     * Respond with nothing to a direct uri connection
     * Later respond with actual website
     */
    app.get( "/", ( _req: express.Request, res: express.Response ): void => { 
        res.status(200).send().end();
    }); 

    // Server rendered for browsers with js disabled.
    app.get( "/nojs", ( req: express.Request, res: express.Response ): void => {
        res.status(403).send().end();
    })

    app.listen( process.env.SERVER_PORT, ( svrErr: Error ): void => {
        if ( svrErr ) throw svrErr; else console.log( "Server is running at " + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT )
    }); 

} catch ( Err ) {
    console.log("Failed to initialise server: " + Err.message )
} 

