// Need to use the ApolloServerBase from Apollo-server-testing module to eliminate type issues.
import { ApolloServerBase } from "apollo-server-testing/node_modules/apollo-server-core/";
import { GraphQLError } from "graphql";
import { buildSchema } from "type-graphql";
import AuthenticationService from "../Auth";
import * as path from "path";

export default async (auth?: boolean) => {
    const Schema = await buildSchema({
        resolvers: [path.resolve(__dirname + "../../../Modules/**/Resolver.ts")],
        authChecker: auth ? AuthenticationService.check : () => true
    });
    return new ApolloServerBase({
        schema: Schema,
        formatError: (err): GraphQLError => {
            return new GraphQLError(err.message);
        },
        context: ({ req }) => {
            return AuthenticationService.context(req);
        }
    })
}