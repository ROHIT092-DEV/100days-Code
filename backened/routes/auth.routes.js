import express from 'express'
import Router from 'express'
import { signUp } from '../controllers/auth.controllers.js';

const router =  Router();

router.get("/auth", signUp)

export default router;