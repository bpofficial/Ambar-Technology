import { mergeResolvers } from "merge-graphql-schemas";

import User from "./users";
import Post from './posts';
import Product from './products';
import Order from './orders';

const resolvers = [
    User,
    Post,
    Product,
    Order
];

export default mergeResolvers(resolvers);