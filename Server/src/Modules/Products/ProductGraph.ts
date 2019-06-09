export default `
    type Product {
        id: String!
        name: String!
        sku: String!
        details: String!
        short: String!
        price: String!
        stock: String
        category: String
    }

    type Query {
        product(id: String!): Product
        products(orderBy: String, search: String, category: String): [Product]
        productCategories: [String]
    }
    type Mutation {
        addProduct(
            name: String!, 
            sku: String!, 
            details: String!, 
            short: String!, 
            price: String!, 
            stock: String, 
            category: String
        ): Product
        editProduct(
            id: String, 
            name: String, 
            sku: String, 
            details: String, 
            short: String, 
            price: String, 
            stock: String,
            category: String
        ): Product
        deleteProduct(
            id: String, 
            sku: String
        ): Product
    }
`;

export const LoggedInOnly = [
    'price'
]

export interface Product {
    id: string;
    name: string;
    sku: string;
    details: string;
    short: string;
    price: string;
    stock: string;
}