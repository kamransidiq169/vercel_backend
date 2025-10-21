import foodPartnerModel from "../models/foodpartner.model.js";
//import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const authFoodPartnerMiddleware=async(req,res,next)=>{
const token=req.cookies.token

if(!token){
    return res.status(401).json({
        message:"Please login first"
    })
}

try {
    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    const foodPartner= await foodPartnerModel.findById(decoded.id)
        if (!foodPartner) {
      return res.status(401).json({ message: "Food partner not found" });
    }

    req.user=foodPartner
    next()
} catch (error) {
     return res.status(401).json({
        message:"Invalid token"
    })
}
}
export const authFoodUserMiddleware=async(req,res,next)=>{
const token=req.cookies.token

if(!token){
    return res.status(401).json({
        message:"Please login first"
    })
}

try {
    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    const foodUser= await foodPartnerModel.findById(decoded.id)
        if (!foodUser) {
      return res.status(401).json({ message: "User not found" });
    }


    req.user=foodUser
    next()
} catch (error) {
     return res.status(401).json({
        message:"Invalid token"
    })
}
}

