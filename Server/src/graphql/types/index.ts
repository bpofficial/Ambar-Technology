import { mergeTypes } from 'merge-graphql-schemas';

import User from './users';
import Post from './posts';
import Product from './products';
import Order from './orders';

const typeDefs = [
    User,
    Post,
    Product,
    Order
];

export default mergeTypes(typeDefs, { all: true });