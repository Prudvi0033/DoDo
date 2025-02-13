import express from "express";
import {test} from "../controllers/notes.controller.js";

const router = express.Router()

router.post("/get-response", test)

export default router