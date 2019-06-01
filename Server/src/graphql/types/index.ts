import { mergeTypes } from 'merge-graphql-schemas';

import User from './users';
import Post from './posts';
import Product from './products';

const typeDefs = [
    User,
    Post,
    Product
];

export default mergeTypes(typeDefs, { all: true });