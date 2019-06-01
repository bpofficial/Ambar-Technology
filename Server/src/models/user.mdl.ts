import * as mongoose from "mongoose";
import * as UniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
    id              :   { type: mongoose.Schema.Types.ObjectId, required: false },
    first           :   { type: String, required: true },
    last            :   { type: String, required: true },
    phone           :   { type: String, required: true },
    email           :   { type: String, required: true, unique: true },
    password        :   { type: String, required: true },
    company         :   { type: String, required: true },
    abn             :   { type: String, required: false, default: '' },
    post_street     :   { type: String, required: true },
    post_suburb     :   { type: String, required: true },
    post_code       :   { type: String, required: true },
    billing_street  :   { type: String, required: false },
    billing_suburb  :   { type: String, required: false },
    billing_code    :   { type: String, required: false },
    token           :   { type: String, required: false },
    _perm: { 
        product: {
            canEdit     :   { type: Boolean, required: false, default: false },
            canCreate   :   { type: Boolean, required: false, default: false },
            canDestroy  :   { type: Boolean, required: false, default: false }
        },
        post: {
            canEdit     :   { type: Boolean, required: false, default: false },
            canCreate   :   { type: Boolean, required: false, default: false },
            canDestroy  :   { type: Boolean, required: false, default: false }
        },
        user: {
            canEdit     :   { type: Array, required: false, default: [] },
            canCreate   :   { type: Boolean, required: false, default: false },
            canDestroy  :   { type: Array, required: false, default: [] },
        }
    }
});

UserSchema.plugin(UniqueValidator);
export default mongoose.model("user", UserSchema);