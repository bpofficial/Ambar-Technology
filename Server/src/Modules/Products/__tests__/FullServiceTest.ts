import ApolloServer from "../../../Common/Services/__tests__/apolloServer";
import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-core";
import db from "../../../Common/Services/Mongoose";
import { client } from "../../../Common/Services/Redis";

var state = {
    user: {
        first: 'Test',
        last: 'Jest0',
        email: 'validtest@jest.com',
        password: 'admin_testtestestest',
        phone: '0000000000',
        company: 'TEST_TEST_TEST',
        post_address: 'testedjjgjhgjh',
        token: ''
    },
    product: {

    }
}

xdescribe('Product Service', () => {
    let connection;

    beforeAll(async () => {
        try {
            connection = await db({
                host: '127.0.0.1',
                port: '27017',
                table: 'ambar'
            });
            await client.flushdb()
        } catch (err) {
            console.log(err);
        }
    })

    afterAll(async () => {
        connection.close();
        client.close();
    })

    it.todo('should try to login (valid, admin).', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });
    it.todo('should try to addProduct (valid, logged in).', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });
    it.todo('should try to addProduct (!valid, logged in).', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });
    it.todo('should try to query Product (valid, previously created, logged in).', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });
    it.todo('should try to query Product (valid, !logged in) and have no price.', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });
    it.todo('should try to query Product (!valid, logged in).', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });
    it.todo('should try to editProduct (valid, previously create, logged in).', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });
    it.todo('should try to editProduct (!valid, logged in).', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
            await mutate({
                mutation: gql`
                    mutation unnamedTest() {

                    }
                `,
                variables: {}
            }).then(
                ({ data, errors }) => {

                }
            ).catch((err) => { console.log(err); done(); }
            )
        } catch (err) {
            done();
        }
    });

})