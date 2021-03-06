import AuthenticationService from "./Auth";
import { ApolloServer } from "apollo-server-express";
import { GraphQLError, GraphQLSchema } from "graphql";

export default (Schema: GraphQLSchema, dev: Boolean) => {
    return new ApolloServer({
        schema: Schema,
        playground: !!dev || false,
        tracing: !!dev || false,
        formatError: (err): GraphQLError => {
            return new GraphQLError(err.message);
        },
        context: async ({ req }) => {
            if (!(req || "headers" in req)) return {};
            const context = await AuthenticationService.context(req);
            if (context instanceof Error || context instanceof GraphQLError) {
                return {}
            } else {
                return context;
            }
        }
    })
}