import { Router } from "express";
const router=Router()
import * as foodController from "../controllers/food.controller.js";
import * as foodPartnerController from "../controllers/foodPartner.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

import multer from 'multer'

const upload = multer({
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});
// POST /api/food/ [protected]
router.post("/",authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood)
// GET /api/food/ [protected]
router.get("/",authMiddleware.authFoodUserMiddleware,foodController.getFoodItems)

router.post("/like",authMiddleware.authFoodUserMiddleware,foodController.likeFoodItem)
router.post("/save",authMiddleware.authFoodUserMiddleware,foodController.SaveFoodItem)
router.post("/saved",authMiddleware.authFoodUserMiddleware,foodController.SavedFoodItems)

// for foodpartner only

// /api/food/foodPartner/:id
router.get("/:id",authMiddleware.authFoodUserMiddleware,foodPartnerController.getFoodPartnerById)
export  default router