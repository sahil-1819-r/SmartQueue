import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;


const orgSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    services:[ {
        type:Schema.Types.ObjectId,
        ref:"Service"
    }]
})


module.exports(mongoose.model("Organisation",orgSchema));