/*
 * -- TEST MODULE OUTLINE --
 * Try to login (valid)
 * Try to login (!valid)
 * Try to login (logged-in)
 * Try to logout (logged-in)
 * Try to logout (!logged-in)
 * Try to addUser (valid)
 * Try to addUser (!valid)
 * Try to editUser (valid, auth'd)
 * Try to editUser (valid, !auth'd)
 * Try to editUser (!valid, auth'd)
 * Try to editUser (!valid, !auth'd)
 * Try to delUser (auth'd)
 * Try to delUser (!auth'd)
 * Try to query user (logged-in)
 * Try to query user (!logged-in)
 * Try to query users (logged-in, admin)
 * Try to query users (logged-in, !admin)
 * Try to query users (!logged-in, admin)
 * Try to query users (!logged-in, !admin) Essentially the same as the previous test.
 */
import User from "../Class";
import ApolloServer from "../../../Common/Services/__tests__/apolloServer";
import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-core";
import db from "../../../Common/Services/Mongoose";
import { client } from "../../../Common/Services/Redis";
const mockServer = ApolloServer(false);

describe('User service', () => {
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

    afterAll(() => {
        connection.close();
        client.close();
    })

    it('should try to login (valid)', async () => {
        const { mutate } = createTestClient(await mockServer)
        const userCredentials = {
            email: 'bpofficial@icloud.com',
            pass: '$$!Alicia0128!$'
        }
        return mutate({
            mutation: gql`
                mutation loginTest($email: String!, $pass: String!) {
                    login(email: $email, password: $pass) {
                        email,
                        token
                    }
                }
            `,
            variables: { ...userCredentials }
        }).then(
            (res) => {
                expect(res.errors).toBeFalsy();
                expect(res.data.login.email).toBe(userCredentials.email)
                expect(res.data.login.token).toBeTruthy();
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    });
    it('should try to login (!valid)', async () => {
        try {
            const { mutate } = createTestClient(await mockServer)
            const userCredentials = {
                email: 'doesnt@exist.com',
                pass: 'password'
            }
            return mutate({
                mutation: gql`
                    mutation loginTest($email: String!, $pass: String!) {
                        login(email: $email, password: $pass) {
                            email,
                            token
                        }
                    }
                `,
                variables: { ...userCredentials }
            }).then(
                ({ data, errors }) => {
                    console.log(data, errors)
                    //expect(errors[0].message).toBeTruthy();
                    //expect(data).toBeFalsy();
                }
            ).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    })
    it('should try to login (logged-in)', async () => {

    })
    it('should try to logout (logged-in', async () => {

    })
    it('should try to logout (!logged-in', async () => {

    })
    it('should try to addUser (valid)', async () => {
        const { mutate } = createTestClient(await mockServer);
        const user: Partial<User> = {
            first: 'Test',
            last: 'Jest_0',
            email: 'test@jest',
            password: 'test',
            phone: '',
            company: 'testing',
            post_address: 'tested'
        }
        const { data, errors } = await mutate({
            mutation: gql`
                mutation addUserTest( $user: NewUserInput! ) {
                    addUser(User: $user) {
                        token
                    }
                }
            `,
            variables: { user: user }
        })
        console.log(data, errors)
        expect('Test test').toBe('Test test');
    })
    it('should try to addUser (!valid)', () => {

    })
    it('should try to editUser (valid, auth\'d)', async () => {

    })
    it('should try to editUser (valid, !auth\'d)', async () => {

    })
    it('should try to editUser (!valid, auth\'d)', async () => {

    })
    it('should try to editUser (!valid, !auth\'d)', async () => {

    })
    it('should try to delUser (auth\'d)', async () => {

    })
    it('should try to delUser (!auth\'d)', async () => {

    })
    it('should try to query user (logged-in)', async () => {

    })
    it('should try to query user (!logged-in)', async () => {

    })
    it('should try to query users (logged-in, admin)', async () => {

    })
    it('should try to query users (logged-in, !admin)', async () => {

    })
    it('should try to query users (!logged-in, admin)', async () => {

    })
    it('should try to query users (!logged-in, !admin)', async () => {

    })
})
