import express from "express";
import { getUser, login, logout, register } from "../controllers/auth.controller.js";
import { protectRotue } from "../lib/middleware.js";

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

router.get("/profile",protectRotue,getUser)

export default router