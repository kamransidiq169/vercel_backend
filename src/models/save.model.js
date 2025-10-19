import mongoose from 'mongoose';
export const saveSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food",
        required:true
    }
})

export const saveModel = mongoose.model("save", saveSchema);
export default saveModel
