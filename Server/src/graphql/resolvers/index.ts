import { mergeResolvers } from "merge-graphql-schemas";

import User from "./users";
import Post from './posts';
import Product from './products';

const resolvers = [
    User,
    Post,
    Product
];

export default mergeResolvers(resolvers);