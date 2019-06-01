export default `
    type Post {
        id: String!
        title: String!
        editor_content: String
        markup_content: String
        status: String!
        public: Boolean!
        password: String
    }
    type Query {
        post(id: String!): Post
        posts: [Post]
    }
    type Mutation {
        addPost(title: String!, editor_content: String!, status: String!, public: String, password: String): Post
        editPost(id: String!, editor_content: String, status: String, public: String, password: String): Post
        deletePost(id: String!): Post
    }
`;

export interface Post {
    id: string
    title: string
    editor_content?: string
    markup_content?: string
    status?: string
    public: boolean
    password?: string
}