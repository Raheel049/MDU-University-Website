import mongoose from "mongoose";

const addTeacherSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email: {
        type : String,
        required : true,
        unique : true
    },

    phoneNumber: {
        type : String,
        required : true
    }, 
    designation: {
        type : String,
        required : true
    },
    department: {
        type : String,
        required : true
    },
    qualification: {
        type : String,
        required : true
    },
    experience: {
        type : Number,
        required : true
    },
    joiningDate: {
        type : Date,
        default : Date.now
    },
    salary: {
        type : Number,
        required : true
    }, 
    password: {
        type : String,
        required : true
    }
},{timestamps : true});

const addTeacherModel = mongoose.model("teachers", addTeacherSchema);

export default addTeacherModel