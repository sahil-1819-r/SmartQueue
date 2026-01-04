import mongoose , {mongo, Schema} from 'mongoose'

const orgSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    services:[
        {
            type:Schema.Types.ObjectId,
            ref:"Service"
        }
    ]

})



export default mongoose.model("Organisation",orgSchema); 