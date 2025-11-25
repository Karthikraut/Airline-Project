import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['customer','admin','flight_company'],
        required:true
    },
    status:{
        type: String,
        enum: ['active','blocked','deleted'],
        default: 'active'
    }

},{timestamps:true})
//Time stamp is used to record timestamp

export const User = mongoose.model('User', userSchema);