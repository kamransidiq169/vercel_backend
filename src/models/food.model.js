import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,  //? "Ye field sirf usi document ka ID accept karegi jo foodpartner model se belong karta ho."
        ref:"foodpartner"
    },
    likeCount:{
        type:Number,
        default:0
    },
    saveCount:{
        type:Number,
        default:0
    }
    
})

const foodModel=mongoose.model("food",foodSchema)
export default foodModel
