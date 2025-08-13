import { Router } from "express";
import { signUp, signIn, getMe, logout } from "../controllers/auth.controllers.js";
import {  protectRoutes } from "../middleware/authMiddleware.js";


const router = Router();

router.post("/auth", signUp);
router.post("/signin", signIn);
router.get("/me",protectRoutes, getMe);
router.post("/logout", logout)

export default router;
