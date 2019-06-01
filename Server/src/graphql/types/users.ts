export default `
    type User {
        id: String!
        first: String
        last: String
        email: String
        password: String
        company: String
        abn: String
        post_street: String
        post_suburb: String
        post_code: String
        billing_street: String
        billing_suburb: String
        billing_code: String
        token: String
    }

    type Check {
        result: Boolean
    }
    type Query {
        user(id: String!): User
        users: [User]
        checkEmail(email: String!): Check
    }
    type Mutation {
        addUser(
            first: String!
            last: String!
            email: String!
            phone: String!
            password: String!
            company: String!
            abn: String
            post_street: String!
            post_suburb: String!
            post_code: String!
            billing_street: String
            billing_suburb: String
            billing_code: String
        ): User
        editUser(
            first: String
            last: String
            email: String
            phone: String
            password: String
            company: String
            abn: String
            post_street: String
            post_suburb: String
            post_code: String
            billing_street: String
            billing_suburb: String
            billing_code: String
        ): User
        deleteUser(
            id: String,
            email: String
        ): User
        loginUser(
            email: String!,
            password: String!
        ): User
    }
`;

export interface User {
    id?: string;
    first?: string;
    last?: string;
    email?: string;
    phone?: string;
    password?: string;
    company?: string;
    abn?: string;
    post_street?: string;
    post_suburb?: string;
    post_code?: string;
    billing_street?: string;
    billing_suburb?: string;
    billing_code?: string;
    token?: string;
}