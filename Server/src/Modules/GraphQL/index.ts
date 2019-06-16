import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";

// Import all Resolvers and Types
import Orders from "../Old/Orders/index";
import Posts from "../Old/Posts/index";
import Products from "../Old/Products/index";
import Users from "../Old/Users/index";

// Merge type-defs and resolvers
const typeDefs = mergeTypes([Orders.graph, Posts.graph, Products.graph, Users.graph], { all: true });
const resolvers = mergeResolvers([Orders.resolver, Posts.resolver, Products.resolver, Users.resolver]);

// Export schema
export default makeExecutableSchema({
    typeDefs,
    resolvers
})