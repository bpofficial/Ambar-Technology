import * as mongoose from "mongoose";
import * as UniqueValidator from "mongoose-unique-validator";
import { GraphQLError } from "graphql";

const ItemSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: [true, 'Item SKU required.']
    },
    count: {
        type: Number,
        required: [true, 'Item amount required.']
    },
    cost: {
        type: Number,
        required: false
    }
})

const OrderSchema = new mongoose.Schema({
    number: { type: Number, required: false, unique: true },                 // 1 or 41471 etc.
    creator: { type: mongoose.Schema.Types.ObjectId, required: true },                               // ObjectID of creator.
    date: { type: String, required: false, default: Date.now() },         // Unix since epoch.
    items: [ItemSchema],
    shipping: {
        cost: { type: Number, required: false, default: 0 },
        courier: { type: String, required: false, default: '' },
        method: { type: String, required: false, default: 'Freight', enum: ['Freight', 'Pickup', 'Post', 'Dropoff'] },
        details: { type: String, required: false, default: '' }
    },
    gtotal: { type: Number, required: false, default: 0 },
    gst: { type: Number, required: false, default: 0 },
    status: { type: String, required: false, enum: ['Paid', 'Processing', 'Assembled', 'Awaiting Confirmation', 'Shipped'], default: 'Processing' },
    payment: { type: String, required: false, default: '' }
});

interface TOrder {
    number: number;
    creator: string;
    date: string;
}

/*
    Autoincrement order 'number'
*/
OrderSchema.pre('save', function (next): void {
    var newOrder: any = this;
    new Promise(async (resolve): Promise<void> => {
        await Order.findOne().sort('-number').exec(async (err, res): Promise<void> => {
            if (err) throw err; resolve(res);
        })
    }).then(
        (order: TOrder): void => {

            // Increment order number
            newOrder.number = order.number + 1;

            // Add total together
            newOrder.gtotal = 0;
            for (let item of newOrder.items) {
                newOrder.gtotal += item.cost;
            }

            // Check whether there is shipping in the new order and 
            if ('shipping' in newOrder && 'cost' in newOrder.shipping && newOrder.shipping.cost > 0) {
                newOrder.gtotal += Number(order.shipping.cost)
            }
            newOrder.gst = 0.1 * newOrder.gtotal;
            next();
        }
    ).catch(
        (err): void => {
            throw new GraphQLError(err.message);
        }
    );
})

// Pre-update hook
OrderSchema.pre('update', function (next): void {
    var newOrder: any = this;
    new Promise(async (resolve, _reject) => {
        return await Order.findOne({ _id: newOrder._id }).exec(async (err, res) => {
            if (err) throw err; resolve(res);
        })
    }).then(
        (order: any) => {

            // Check whether there is shipping in the update and add it to the grand total (gtotal)
            if ('shipping' in newOrder && 'cost' in newOrder.shipping && newOrder.shipping.cost > 0) {
                newOrder.gtotal += Number(order.shipping.cost)
            }
            newOrder.gst = 0.1 * newOrder.gtotal;
            next();
        }
    ).catch(
        (err) => {
            throw new GraphQLError(err.message);
        }
    );
})

OrderSchema.plugin(UniqueValidator);
const Order = mongoose.model("order", OrderSchema);

export default Order;