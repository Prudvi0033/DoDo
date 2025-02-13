import express from "express";
import {createNotes, deleteNotes, getNotes, improveNotes, summarizeNotes, test, updateNotes} from "../controllers/notes.controller.js";
import {protectRoute} from "../lib/middleware.js"

const router = express.Router()

router.post("/notes",protectRoute,createNotes)
router.get("/notes",protectRoute,getNotes)

router.put("/notes/:id",protectRoute,updateNotes)
router.delete("/notes/:id",protectRoute,deleteNotes)

router.post("/notes/:id/improve",protectRoute,improveNotes)
router.post("/notes/:id/summarize",protectRoute,summarizeNotes)

router.post("/get-response", test)

export default router