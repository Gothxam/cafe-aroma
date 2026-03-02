import express from "express";
import { uploadImageMiddleware } from "../services/cloudinary";
import Event from "../models/Event";
import { getAll, create, update, remove } from "../controllers/crudController";

const router = express.Router();

router.get("/", getAll(Event));
router.post("/", uploadImageMiddleware, create(Event));
router.put("/:id", uploadImageMiddleware, update(Event));
router.delete("/:id", remove(Event));

export default router;
