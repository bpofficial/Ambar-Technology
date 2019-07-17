/**
 * Mocking client-server processing
 */
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: `${process.env.PUBLIC_URL}/api`
});

export default {
    getProducts: async (cb) => {
        await client.query({
            query: gql`
                query getProducts {
                    products {
                        name,
                        sku,
                        details,
                        short,
                        price,
                        gst,
                        stock,
                        category,
                        assets,
                        discount,
                        variations,
                        rating,
                        onSale,
                        isNew
                }
            `
        })
            .then(data => cb(data))
            .catch(error => console.error(error), cb(null));
    },
    buyProducts: (payload, cb) => {
        await client.query({
            mutation: gql`
                mutation buyProducts($items: [String!]!) {
                    addOrder(items: $items) {

                    }
                }
            `,
            variables: payload
        })
            .then(data => cb(data))
            .catch(error => console.error(error), cb(null));
    },
    getCategories: (cb, timeout) => setTimeout(() => cb([
        'Regulators',
        'Kegerators'
    ]), timeout || TIMEOUT)
}