/*
 * -- TEST MODULE OUTLINE --
 * Try to addUser (valid)
 * Try to addUser (!valid)
 * Try to login (valid)
 * Try to login (!valid)
 * Try to login (logged-in)
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
 * Try to query users (!logged-in)
 * Try to logout (logged-in)
 * Try to logout (!logged-in)
 */
import { NewUserInput, EditUserInput } from "../IO"
import ApolloServer from "../../../Common/Services/__tests__/apolloServer";
import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-core";
import db from "../../../Common/Services/Mongoose";
import { client } from "../../../Common/Services/Redis";
import { ValidationError } from "class-validator";

var state = {
    user: {
        first: 'Test',
        last: 'Jest0',
        email: 'validtest@jest.com',
        password: 'testtestestest',
        phone: '0000000000',
        company: 'TEST_TEST_TEST',
        post_address: 'testedjjgjhgjh',
        token: ''
    }
}

xdescribe('User service', () => {
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

    it('should try to addUser (valid) ', async (done) => {
        console.log('\n\n\n-------------------should try to addUser (valid)--------------------')
        const { mutate } = await createTestClient(await ApolloServer(false));
        const token = state.user.token; delete state.user.token;
        const user = { ...state.user };
        state.user.token = token;
        return await mutate({
            mutation: gql`
                mutation addUserTest( $user: NewUserInput! ) {
                    addUser(User: $user)
                }
            `,
            variables: { user: user }
        }).then(
            async ({ data, errors }) => {
                expect(data.addUser).toBe(true);
                expect(errors).toBeFalsy();
                if (data.addUser && !errors) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                // Wait 5000ms to ensure enough time for the document to be added to the DB;
                await new Promise(() => setTimeout(() => done(), 5000));
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }, 10000)
    it('should try to addUser (!valid)', async (done) => {
        console.log('\n\n\n-------------------should try to addUser (!valid)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false));
        const user: NewUserInput = {
            first: '',
            last: '',
            email: 'invalidemail',
            password: 'test',
            phone: '',
            company: '',
            post_address: ''
        }
        return await mutate({
            mutation: gql`
                mutation addUserTest( $user: NewUserInput! ) {
                    addUser(User: $user)
                }
            `,
            variables: { user: user }
        }).then(
            ({ data, errors }) => {
                expect(data).toBeFalsy();
                expect(errors).toBeTruthy();
                if (!data && errors) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch(
            (err) => {
                console.log(err)
                console.log('F A I L E D')
                done();
            }
        )
    })
    it('should try to login (valid)', async (done) => {
        console.log('\n\n\n-------------------should try to login (valid)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false))
        return mutate({
            mutation: gql`
                mutation loginTest($email: String!, $pass: String!) {
                    login(email: $email, password: $pass) {
                        email,
                        token
                    }
                }
            `,
            variables: { email: String(state.user.email || ''), pass: String(state.user.password || '') }
        }).then(
            ({ data, errors }) => {
                if (!!errors) console.log('Valid login: Errors', ...errors);
                expect(errors).toBeFalsy();
                expect(data.login.email).toBe(state.user.email)
                expect(data.login.token).toBeTruthy();
                if (data.login && !errors) {
                    state.user.token = data.login.token;
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D');
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    }, 10000);
    it('should try to login (!valid)', async (done) => {
        console.log('\n\n\n-------------------should try to login (!valid)--------------------')
        try {
            const { mutate } = createTestClient(await ApolloServer(false))
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
                    expect(errors[0].message).toBeTruthy();
                    expect(errors[0].message).toBe(`User with identifier '${userCredentials.email}' not found.`)
                    expect(data).toBeFalsy();
                    if (!data && errors[0].message == `User with identifier '${userCredentials.email}' not found.`) {
                        console.log('P A S S E D');
                    } else {
                        console.log('F A I L E D');
                    }
                    done();
                }
            ).catch((err) => {
                console.log(err)
                console.log('F A I L E D')
                done();
            })
        } catch (err) {
            console.log(err)
            console.log('F A I L E D')
            done();
        }
    })
    it('should try to login (logged-in)', async (done) => {
        console.log('\n\n\n-------------------should try to login (logged-in)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }));
        return mutate({
            mutation: gql`
                mutation loginTest($email: String!, $pass: String!) {
                    login(email: $email, password: $pass) {
                        email,
                        token
                    }
                }
            `,
            variables: { email: String(state.user.email || ''), pass: String(state.user.password || '') }
        }).then(
            ({ errors }) => {
                expect(errors[0].message).toBe('Already logged in.')
                if (errors[0].message == 'Already logged in.') {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to editUser (valid, auth\'d)', async (done) => {
        console.log('\n\n\n-------------------should try to editUser (valid, auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }));
        const { token, password } = state.user; delete state.user.token; delete state.user.password;
        const editUser: EditUserInput = {
            ...state.user,
            email: 'EDITEDvalidtest@jest.com'
        }
        state.user.token = token;
        state.user.password = password;
        state.user.email = 'EDITEDvalidtest@jest.com';
        return mutate({
            mutation: gql`
                mutation editUserTest($user: EditUserInput!) {
                    editUser( User: $user ) {
                        email
                    }
                }
            `,
            variables: { user: editUser }
        }).then(
            ({ data, errors }) => {
                expect(data.editUser.email).toBe(editUser.email);
                expect(errors).toBeFalsy()
                if (!errors && data.editUser.email == editUser.email) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to editUser (valid, !auth\'d)', async (done) => {
        console.log('\n\n\n-------------------should try to editUser (valid, !auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false));
        const { token, password } = state.user; delete state.user.token; delete state.user.password;
        const editUser: EditUserInput = {
            ...state.user,
            email: 'EDITEDvalidtest@jest.com'
        }
        state.user.token = token;
        state.user.password = password;
        return mutate({
            mutation: gql`
                mutation editUserTest($user: EditUserInput!) {
                    editUser( User: $user ) {
                        email
                    }
                }
            `,
            variables: { user: editUser }
        }).then(
            ({ data, errors }) => {
                expect(data).toBeFalsy();
                expect(errors[0].message).toBe('Unauthorised to perform this action.')
                if (!data && errors[0].message == 'Unauthorised to perform this action.') {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to editUser (!valid, auth\'d)', async (done) => {
        console.log('\n\n\n-------------------should try to editUser (!valid, auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }));
        const { token, password } = state.user; delete state.user.token; delete state.user.password;
        const editUser: EditUserInput = {
            ...state.user,
            email: '',
            phone: ''
        }
        state.user.token = token;
        state.user.password = password;
        return mutate({
            mutation: gql`
                mutation editUserTest($user: EditUserInput!) {
                    editUser( User: $user ) {
                        email
                    }
                }
            `,
            variables: { user: editUser }
        }).then(
            ({ data, errors }) => {
                expect(data).toBeFalsy();
                expect(errors[0].extensions.exception.validationErrors[0]).toBeInstanceOf(ValidationError);
                expect(errors[0].extensions.exception.validationErrors[1]).toBeInstanceOf(ValidationError);
                if (!data && errors[0].extensions.exception.validationErrors[0] instanceof ValidationError && errors[0].extensions.exception.validationErrors[1] instanceof ValidationError) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to editUser (!valid, !auth\'d)', async (done) => {
        console.log('\n\n\n-------------------should try to editUser (!valid, !auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false));
        const { token, password } = state.user; delete state.user.token; delete state.user.password;
        const editUser: EditUserInput = {
            ...state.user,
            email: '',
            phone: ''
        }
        state.user.token = token;
        state.user.password = password;
        return mutate({
            mutation: gql`
                mutation editUserTest($user: EditUserInput!) {
                    editUser( User: $user ) {
                        email
                    }
                }
            `,
            variables: { user: editUser }
        }).then(
            ({ data, errors }) => {
                expect(data).toBeFalsy();
                expect(errors[0].extensions.exception.validationErrors[0]).toBeInstanceOf(ValidationError);
                expect(errors[0].extensions.exception.validationErrors[1]).toBeInstanceOf(ValidationError);
                if (!data && errors[0].extensions.exception.validationErrors[0] instanceof ValidationError && errors[0].extensions.exception.validationErrors[1] instanceof ValidationError) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to query user (logged-in)', async (done) => {
        console.log('\n\n\n-------------------should try to query user (logged-in)--------------------')
        const { query } = createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
        if (!(state || 'login' in state)) return false;
        return query({
            query: gql`
                query queryUserTest {
                    user {
                        email,
                        first
                    }
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data.user.email).toBe(state.user.email);
                expect(data.user.first).toBe(state.user.first);
                if (data.user.email == state.user.email && data.user.first == state.user.first && !errors) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D');
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to query user (!logged-in)', async (done) => {
        console.log('\n\n\n-------------------should try to query user (!logged-in)--------------------')
        const { query } = createTestClient(await ApolloServer(false))
        if (!(state || 'login' in state)) return false;
        return query({
            query: gql`
                query queryUserTest {
                    user {
                        email,
                        first
                    }
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data.user).toBeFalsy();
                expect(errors[0].message).toBe('Unauthorised to perform this action.')
                if (!data.user && errors[0].message == 'Unauthorised to perform this action.') {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D');
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to query users (logged-in, admin)', async (done) => {
        console.log('\n\n\n-------------------should try to query users (logged-in, admin)--------------------')
        const { mutate } = await createTestClient(await ApolloServer(false))
        const token: string = await mutate({
            mutation: gql`
                mutation loginAdminTest($email: String!, $pass: String!) {
                    login(email: $email, password: $pass) {
                        email,
                        token
                    }
                }
            `,
            variables: { email: String('admin_validtest@jest.com'), pass: String(state.user.password || '') }
        }).then(
            ({ data, errors }) => {
                if ('login' in data && 'token' in data.login) {
                    return data.login.token;
                } else {
                    console.log('Had trouble logging into the admin account.')
                    return ''
                }
            }
        ).catch((err) => {
            console.log(err)
        });
        const { query } = await createTestClient(await ApolloServer(false, { headers: { authorization: token } }))
        return await query({
            query: gql`
                query queryUsersTest {
                    users {
                        email,
                        first
                    }
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data.users.length).toBeTruthy();
                expect(errors).toBeFalsy();
                if (data.users.length && !errors) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D');
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to query users (logged-in, !admin)', async (done) => {
        console.log('\n\n\n-------------------should try to query users (logged-in, !admin)--------------------')
        const { query } = await createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }))
        return await query({
            query: gql`
                query queryUsersTest {
                    users {
                        email,
                        first
                    }
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data.users).toBeFalsy();
                expect(errors[0].message).toBe('Unauthorised to perform this action.')
                if (!data.users && errors[0].message == 'Unauthorised to perform this action.') {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D');
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to query users (!logged-in)', async (done) => {
        console.log('\n\n\n-------------------should try to query users (!logged-in)--------------------')
        const { query } = await createTestClient(await ApolloServer(false))
        return await query({
            query: gql`
                query queryUsersTest {
                    users {
                        email,
                        first
                    }
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data.users).toBeFalsy();
                expect(errors[0].message).toBe('Unauthorised to perform this action.')
                if (!data.users && errors[0].message == 'Unauthorised to perform this action.') {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D');
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to delUser (auth\'d)', async (done) => {
        console.log('\n\n\n-------------------should try to delUser (auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }));
        return mutate({
            mutation: gql`
                mutation delUserTest {
                    delUser
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data.delUser).toBeTruthy()
                expect(errors).toBeFalsy()
                if (data.delUser && !errors) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to delUser (!auth\'d)', async (done) => {
        console.log('\n\n\n-------------------should try to delUser (!auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false));
        return mutate({
            mutation: gql`
                mutation delUserTest {
                    delUser
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data).toBeFalsy()
                expect(errors[0].message).toBe('Unauthorised to perform this action.')
                if (!data && errors[0].message == 'Unauthorised to perform this action.') {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to logout (logged-in)', async (done) => {
        console.log('\n\n\n-------------------should try to logout (auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false, { headers: { authorization: state.user.token } }));
        return mutate({
            mutation: gql`
                mutation logoutTest {
                    logout
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data.logout).toBeTruthy()
                expect(errors).toBeFalsy()
                if (data.logout && !errors) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
    it('should try to logout (!logged-in)', async (done) => {
        console.log('\n\n\n-------------------should try to logout (auth\'d)--------------------')
        const { mutate } = createTestClient(await ApolloServer(false));
        return mutate({
            mutation: gql`
                mutation logoutTest {
                    logout
                }
            `
        }).then(
            ({ data, errors }) => {
                expect(data).toBeFalsy()
                expect(errors[0].message).toBe('No token provided.')
                if (!data && errors) {
                    console.log('P A S S E D');
                } else {
                    console.log('F A I L E D')
                }
                done();
            }
        ).catch((err) => {
            console.log(err)
            console.log('F A I L E D')
            done();
        });
    })
})
