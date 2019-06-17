import User from "../Class";
import ApolloServer from "../../../Common/Services/__tests__/apolloServer";
import { createTestClient } from "apollo-server-testing";


describe('[User]: Method ~ Add', () => {
    it('Attempts to add a valid user', async () => {
        const mockServer = await ApolloServer(false)
        const { mutate } = createTestClient(mockServer);
        const user: Partial<User> = {
            first: 'Test',
            last: 'Jest_0',
            email: 'test@jest',
            password: 'test',
            phone: '',
            company: 'testing',
            post_address: 'tested'
        }
        await mutate({
            mutation: 'add',
            variables: { ...user }
        })
        expect('Test test').toBe('Test test');
    })
})