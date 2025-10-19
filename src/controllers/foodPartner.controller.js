import foodPartnerModel from "../models/foodpartner.model.js";
import foodModel from "../models/food.model.js";
export const getFoodPartnerById=async(req,res)=>{
    const foodPartnerId=req.params.id

    const foodPartner= await foodPartnerModel.findById(foodPartnerId)
    const foodItemsbyFoodPartner=await foodModel.find({foodPartner:foodPartnerId})
     if(!foodPartner){
        return res.status(404).json({
            message:"food partner not found"
        })
     }

     res.status(200).json({
        message:"food partner fetched successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsbyFoodPartner
        }
     }) 
}