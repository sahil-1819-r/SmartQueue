import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    queueId:{
        type:Schema.Types.ObjectId,
        ref:"Service"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    position:{
        type:Number,
    },
    joinedAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("Ticket",ticketSchema);