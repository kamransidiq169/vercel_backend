import foodModel from "../models/food.model.js";
import { uploadfile } from "../services/storage.service.js";
import { v4 as uuidv4 } from 'uuid';
import likeModel from "../models/likes.model.js";

import saveModel from "../models/save.model.js";
export const createFood = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized: food partner not found" });
  }

  const fileUploadResult = await uploadfile(req.file.buffer, uuidv4());
  console.log(fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.user._id,
  });

  res.status(201).json({
    message: "food created successfully",
    food: foodItem,
  });
};

// export const getFoodItems = async (req, res) => {
//    const foodItems = await foodModel.find({})
//    res.status(200).json({
//       message: "food items fetched successfully",
//       foodItems
//    })
// }
export const getFoodItems = async (req, res) => {
  const userId = req.user?._id;

  const foodItems = await foodModel.find().lean(); // all food
  const likes = await likeModel.find({ user: userId }).select("food");
  const saves = await likeModel.find({ user: userId }).select("food");

  const likedIds = new Set(likes.map((l) => l.food.toString()));
  const savedIds = new Set(saves.map((s) => s.food.toString()));

  const enriched = await Promise.all(
    foodItems.map(async (item) => {
      const likeCount = await likeModel.countDocuments({ food: item._id });
      const saveCount = await saveModel.countDocuments({ food: item._id });

      return {
        ...item,
        likeCount,
        saveCount,
        isLikedByUser: likedIds.has(item._id.toString()),
        isSavedByUser: savedIds.has(item._id.toString()),
      };
    })
  );

  res.status(200).json({ foodItems: enriched });
};


// export const likeFoodItem = async (req, res) => {
//    const { foodId } = req.body
//    const user = req.user
//    if (!user || !user._id) {
//       return res.status(401).json({ message: "Unauthorized: user not found" });
//    }

//    const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId })


//    if (isAlreadyLiked) {
//       await likeModel.deleteOne({ user: user._id, food: foodId })
//       return res.status(200).json({ message: "food unliked" })
//    }

//    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } })

//    const like = await likeModel.create({
//       user: user._id,
//       food: foodId
//    })

//    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } })  //? likeCount ko 1 se increment kar do.

//    res.status(201).json({ message: "food liked successfully", like })
// }
export const likeFoodItem = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  if (!user || !user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const existingLike = await likeModel.findOne({ user: user._id, food: foodId });

  let isLiked = false;

  if (existingLike) {
    await likeModel.deleteOne({ user: user._id, food: foodId });
    isLiked = false;
  } else {
    await likeModel.create({ user: user._id, food: foodId });
    isLiked = true;
  }

  const likeCount = await likeModel.countDocuments({ food: foodId });

  res.status(200).json({
    like: isLiked,
    likeCount
  });
};


export const SaveFoodItem = async (req, res) => {
   const { foodId } = req.body
   const user = req.user
   const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId })


   if (isAlreadySaved) {
      await saveModel.deleteOne({ user: user._id, food: foodId })
      return res.status(200).json({ message: "food unliked" })
   }

   await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: -1 } })

   const save = await saveModel.create({
      user: user._id,
      food: foodId
   })

   await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: 1 } })  //? likeCount ko 1 se increment kar do.

   res.status(201).json({ message: "food liked successfully", save })

}

export const SavedFoodItems = async (req, res) => {
   const user = req.user;  
   const savedFoods=await saveModel.find({user:user._id}).populate('food');

   if(!savedFoods){
      return  res.status(404).json({message:"no saved food items found"})
   }

   res.status(200).json({
      message:"saved food items fetched successfully",
      savedFoods
   })

}