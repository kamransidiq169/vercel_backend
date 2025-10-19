import { Router } from "express";
import * as authController from '../controllers/auth.controller.js';
const router=Router()
// for user
router.post("/user/register",authController.registerUser)
router.post("/user/login",authController.loginUser)
router.get("/user/logout",authController.logoutUser)

// for foodUser 

router.post("/fooduser/register",authController.registerFoodPartnerUser)
router.post("/fooduser/login",authController.loginFoodPartnerUser)
router.get("/fooduser/logout",authController.logoutFoodPartnerUser)

export default router