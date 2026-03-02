import express from "express";
import { uploadImageMiddleware } from "../services/cloudinary";
import Gallery from "../models/Gallery";
import { getAll, create, update, remove } from "../controllers/crudController";

const router = express.Router();

router.get("/", getAll(Gallery));
router.post("/", uploadImageMiddleware, create(Gallery));
router.put("/:id", uploadImageMiddleware, update(Gallery));
router.delete("/:id", remove(Gallery));

export default router;
