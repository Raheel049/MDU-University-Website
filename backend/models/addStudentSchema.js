import mongoose from "mongoose";

const addStudentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    fatherName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    phone : {
        type : Number,
        required : true
    },

    studentID : {
        type : String,
        required : true,
        unique : true
    },

    department : {
        type : String,
        required : true
    },

    batch : {
        type : Number,
        required : true
    },

    semester : {
        type : Number,
        required : true
    },

    password : {
        type : String,
        required : true
    },


}, {timestamps : true})

const addStudentModel = mongoose.model("student", addStudentSchema);

export default addStudentModel;

