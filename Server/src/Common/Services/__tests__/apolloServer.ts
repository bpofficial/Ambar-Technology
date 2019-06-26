// Need to use the ApolloServerBase from Apollo-server-testing module to eliminate type issues.
import { ApolloServerBase } from "apollo-server-core";
import { GraphQLError, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import AuthenticationService from "../Auth";
import { Resolvers as resolvers } from "../../../Modules";
import "reflect-metadata";

describe('Mock Apollo Server', () => {
    var schema;
    xit('Should create a GraphQLSchema schema', async () => {
        schema = await buildSchema({
            resolvers,
            authChecker: AuthenticationService.check
        });
        expect(schema).toBeInstanceOf(GraphQLSchema);
    })
    xit('should create an ApolloBaseServer instance', () => {
        const server = new ApolloServerBase({
            schema,
            formatError: (err): GraphQLError => {
                return err;
            },
            context: ({ req }) => {
                return AuthenticationService.context(req);
            }
        })
        expect(server).toBeInstanceOf(ApolloServerBase);
    })
})

export default async (auth?: boolean, req?: any) => {
    const Schema = await buildSchema({
        resolvers: resolvers,
        authChecker: auth ? AuthenticationService.check : () => true
    });
    return await new ApolloServerBase({
        schema: Schema,
        formatError: (err): GraphQLError => {
            return err;
        },
        context: async () => {
            return await AuthenticationService.context(req)
        }
    })
}
