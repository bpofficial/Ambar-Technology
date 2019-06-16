import { client as redis } from "./Redis";
import AuthenticationService from "./Auth";
import { ApolloServer } from "apollo-server-express";
import { GraphQLError, GraphQLSchema } from "graphql";
import { ERR_NO_TOKEN } from "../Constants/Errors";

export default (Schema: GraphQLSchema) => {
    return new ApolloServer({
        schema: Schema,
        playground: process.env.MODE == "development",
        tracing: process.env.MODE == "development",
        formatError: (err): GraphQLError => {
            return new GraphQLError(err.message);
        },
        context: ({ req }) => {
            return new Promise<any>(async (resolve: Function, reject: Function): Promise<void> => {
                try {
                    if ("authorization" in req.headers && req.headers.authorization.length > 1) {
                        return AuthenticationService.decode(req.headers.authorization).then(
                            (decToken: any) => {
                                if (decToken instanceof Error || decToken instanceof GraphQLError) reject(decToken);
                                redis.get(String(decToken.id), (err: Error, res: any) => {
                                    if (err) reject(err);
                                    resolve(JSON.parse(res))
                                });
                            }
                        ).catch(
                            (err) => {
                                console.warn("CAUGHT: [context] ~ then...catch \n", err.message)
                                reject(err);
                            }
                        );
                    } else {
                        resolve({});
                    }
                } catch (err) {
                    console.warn("CAUGHT: [context] ~ try...catch \n", err.message)
                    reject(err);
                }
            }).catch((err) => {
                console.warn("CAUGHT: [context] ~ then...catch \n", err.message)
                throw new GraphQLError(err.message)
            });
        }
    })
}