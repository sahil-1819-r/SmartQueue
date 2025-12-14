import mongoose from "mongoose";
const Schema = mongoose.Schema;
import organisation from './organisation.js'

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
    },
    registeredOrgs:[{
        type:Schema.Types.ObjectId,
        ref:"Organisations"
    }]
})


module.exports(mongoose.model("User",userSchema));