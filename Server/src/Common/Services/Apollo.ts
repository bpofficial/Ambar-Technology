import AuthenticationService from "./Auth";
import { ApolloServer } from "apollo-server-express";
import { GraphQLError, GraphQLSchema } from "graphql";

export default (Schema: GraphQLSchema) => {
    return new ApolloServer({
        schema: Schema,
        playground: process.env.MODE == "development",
        tracing: process.env.MODE == "development",
        formatError: (err): GraphQLError => {
            return new GraphQLError(err.message);
        },
        context: ({ req }) => {
            return AuthenticationService.context(req);
        }
    })
}