import mongoose from "mongoose"

const examSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true
    },

    obtainMarks : {
        type : Number,
        required : true
    },

    totalMarks : {
        type : Number,
        required : true

    },

    percentage : {
        type : Number,
        required : true

    }
},{timestamps : true});

const examResultModel = mongoose.model("examResult", examSchema);

export default examResultModel