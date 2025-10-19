import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        unique: true,
    },

    address: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
},)

const foodPartnerModel = mongoose.model("foodpartner", userSchema)
export default foodPartnerModel