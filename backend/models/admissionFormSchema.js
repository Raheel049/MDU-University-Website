import mongoose from "mongoose"

const admissionFormSchema = new mongoose.Schema({
    name : {
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
    fatherName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    province : {
        type : String,
        required : true
    },
    matricTotal : {
        type : Number,
        required : true
    },
    matricObtained : {
        type : Number,
        required : true
    },
    matricPercentage : {
        type : Number,
        required : true
    },
    interTotal : {
        type : Number,
        required : true
    },
    interObtained : {
        type : Number,
        required : true
    },
    interPercentage : {
        type : Number,
        required : true
    },
    departments: [{ type: String }],
    status: { type: Boolean, default: false },
}, {timestamps : true})

const admissionFormModel = mongoose.model("admissionForm", admissionFormSchema)

export default admissionFormModel