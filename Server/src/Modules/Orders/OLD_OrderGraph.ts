export default `
    input ItemInput {
        sku: String!
        count: Int!
    }

    type ItemOutput {
        sku: String!
        count: Int!
    }

    type OrderStatusOutput {
        complete: Boolean!
    }

    type Order {
        id: String
        number: String
        creator: String
        date: String
        items: [ItemOutput]
        shipping: Float
        gtotal: Float
        status: String!
        payment: String
    }
    type Query {
        order(number: String!): Order
        orders(orderBy: String, search: String): [Order]
    }
    type Mutation {
        createOrder(
            items: [ItemInput!]!
        ): OrderStatusOutput
        editOrder(
            number: String!
            creator: String
            date: String
            items: [ItemInput!]
            shipping: Float
            gtotal: Float
            status: String
            payment: String
        ): Order
        cancelOrder(
            number: String!
        ): OrderStatusOutput
        completeOrder(
            number: String!
        ): OrderStatusOutput
    }
`;

export const ORDER_STATUS_OK = { complete: true }
export const ORDER_STATUS_BAD = { complete: false }

export interface Order {
    id: string;
    number: string;
    creator: string;
    date: string;
    items: [];
    shipping: number;
    gtotal: number;
    status: string;
    payment: string;
}