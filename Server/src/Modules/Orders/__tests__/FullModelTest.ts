import Order from "../Class";
import { Types } from "mongoose";
import ApolloServer from "../../../Common/Services/__tests__/apolloServer";
import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-core";
import db from "../../../Common/Services/Mongoose";
import { client } from "../../../Common/Services/Redis";

describe('Order Service', () => {

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
    });

    xit('should create a new order object', async () => {
        const model = new Order().getModelForClass(Order);
        model.create({
            creator: new Types.ObjectId(),
            items: []
        });
    })

    it('should try to find orders', async (done) => {
        try {
            const { mutate } = await createTestClient(await ApolloServer(false))
            await mutate({
                mutation: gql`
                    mutation findOrders() {
                        order(id: "5d121e8da6c5a21378e1e8c7") {
                            items
                        }
                    }
                `
            }).then(
                ({ data, errors }) => {
                    console.log(data, errors)
                    throw errors;
                }
            ).catch((err) => { console.log(err); throw ''; }
            )
        } catch (err) {
            throw err;
            done();
        }
    })

})