import userModel from "../models/user.model.js"
import foodPartnerModel from "../models/foodpartner.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// for simple user who can watch order and scroll

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginUser = async (req,res)=>{
    const { email, password}=req.body
    const user= await userModel.findOne({email})
     if(!user){
    return res.status(400).send("invalid email or password")
   }

   const isPasswordValid = await bcrypt.compare(password, user.password)

   if(!isPasswordValid){
     return res.status(400).send("invalid email or password")
   }

   const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

   res.cookie("token",token)

   res.status(201).json({
    message:"user logged in successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
   })
}

export const logoutUser=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"user logged out successfully"
    })
}


// for that user who can upload food item video or anything

export const registerFoodPartnerUser=async(req,res)=>{
    const {businessName, email, password,phone,address,contactName}=req.body
    
   const isUserAlreadyExists= await userModel.findOne({email})

   if(isUserAlreadyExists){
    return res.status(400).send("user already exists")
   }

   const hashPassword = await bcrypt.hash(password,10)
   
   const FoodUser=foodPartnerModel.create({businessName,email,password:hashPassword,phone,address,contactName})

  const token=jwt.sign({id:FoodUser._id},process.env.JWT_SECRET)

   res.cookie("token",token)

   res.status(201).json({
    message:"FoodUser registered successfully",
    user:{
        _id:FoodUser._id,
        email:FoodUser.email,
        businessName:FoodUser.businessName
    }
   })
}

export const loginFoodPartnerUser = async (req,res)=>{
    const { email, password}=req.body
    const user= await foodPartnerModel.findOne({email})
     if(!user){
    return res.status(400).send("invalid email or password")
   }

   const isPasswordValid = await bcrypt.compare(password, user.password)

   if(!isPasswordValid){
     return res.status(400).send("invalid email or password")
   }

   const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

     res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", // or "Strict" or "None" depending on frontend/backend setup
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

   res.status(201).json({
    message:"user logged in successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
   })
}

export const logoutFoodPartnerUser=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"Fooduser logged out successfully"
    })
}
