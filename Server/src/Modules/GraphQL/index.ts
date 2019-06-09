import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
// Import all Resolvers and Types
import Orders from "../Orders";
import Posts from "../Posts";
import Products from "../Products";
import Users from "../Users";

const typeDefs = mergeTypes( [ Orders.graph, Posts.graph, Products.graph, Users.graph ], { all: true } );
const resolvers = mergeResolvers( [ Orders.resolver, Posts.resolver, Products.resolver, Users.resolver ] );

export default makeExecutableSchema({
    typeDefs,
    resolvers
})