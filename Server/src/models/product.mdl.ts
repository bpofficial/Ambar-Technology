import * as mongoose from "mongoose";
import * as UniqueValidator from "mongoose-unique-validator";

const ProductSchema = new mongoose.Schema({
    id          :   { type: mongoose.Types.ObjectId, required: false },
    name        :   { type: String, required: true }, 
    sku         :   { type: String, required: true, unique: true }, 
    details     :   { type: String, required: true },
    short       :   { type: String, required: true },
    price       :   { type: Number, required: true },
    gst         :   { type: Number, required: false, default: function() { return 0.1 * this.price } },
    available   :   { type: String, required: false, default: 'In Stock' },
    category    :   { type: String, required: false, default: 'Uncategorised'},
    stock: {
        available: {
            type: Number,
            required: false,
            default: 0
        },
        allocated: {
            type: Number,
            required: false,
            default: 0
        }

    }
});

ProductSchema.plugin(UniqueValidator)
export default mongoose.model("product", ProductSchema);
