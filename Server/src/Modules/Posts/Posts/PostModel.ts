import * as mongoose from "mongoose";
import * as UniqueValidator from "mongoose-unique-validator";

const PostSchema = new mongoose.Schema({
    id              :   { type: mongoose.Schema.Types.ObjectId, required: false }, //_id
    title           :   { type: String, required: true },
    editor_content  :   { type: String, required: false },
    markup_content  :   { type: String, required: false },
    status          :   { type: String, required: true },
    public          :   { type: Boolean, required: true },
    password        :   { type: String, required: false }
});

PostSchema.plugin(UniqueValidator);
export default mongoose.model("post", PostSchema);