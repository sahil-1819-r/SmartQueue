import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


module.exports(mongoose.model("User",userSchema));