/**
 * Mocking client-server processing
 */
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: `${process.env.PUBLIC_URL}/api`
});
import _products from './data.json'
const TIMEOUT = 100

export default {
    getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
    getCategories: (cb, timeout) => setTimeout(() => cb([
        'Regulators',
        'Kegerators'
    ]), timeout || TIMEOUT)
}
