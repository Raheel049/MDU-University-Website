import mongoose from "mongoose";
import { validate } from "uuid";

const arryLimit = (val) => {
    return val.length === 4;
}

const questionSchema = new mongoose.Schema({
    questionText : {
        type : String,
        required : true,
        trim : true,
    },

    options : {
        type : [String],
        required : true,
        validate : [arryLimit, "{PATH must be 4 options}"],
    },

    correctAns : {
        type : String,
        required : true
    },

    marks : {
        type : Number,
        default : 0,
    }
}, {timestamps : true});

const questionSchemaModel = mongoose.model("question", questionSchema);

export default questionSchemaModel