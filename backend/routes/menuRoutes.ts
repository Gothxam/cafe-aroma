import express from "express";
import { uploadImageMiddleware } from "../services/cloudinary";
import Menu from "../models/Menu";
import { getAll, create, update, remove } from "../controllers/crudController";

const router = express.Router();

router.get("/", getAll(Menu));
router.post("/", uploadImageMiddleware, create(Menu));
router.put("/:id", uploadImageMiddleware, update(Menu));
router.delete("/:id", remove(Menu));

export default router;
