import * as mongoose from "mongoose";
import * as UniqueValidator from "mongoose-unique-validator";

const ProductSchema = new mongoose.Schema({
    id          :   { type: mongoose.Types.ObjectId, required: false },
    name        :   { type: String, required: true }, 
    sku         :   { type: String, required: true, unique: true }, 
    details     :   { type: String, required: true },                                   // Html
    short       :   { type: String, required: true },                                   // String
    price       :   { type: String, required: true },
    stock       :   { type: String, required: false, default: 'In Stock' },
    assets      :   { type: String, required: false, default: '' },
    category    :   { type: String, required: false, default: 'Uncategorised'}
});

ProductSchema.plugin(UniqueValidator)
export default mongoose.model("product", ProductSchema);
