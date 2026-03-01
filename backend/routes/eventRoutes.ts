import express from "express";
import { upload } from "../services/cloudinary";
import Event from "../models/Event";
import { getAll, create, update, remove } from "../controllers/crudController";

const router = express.Router();

router.get("/", getAll(Event));
router.post("/", upload.single("image"), create(Event));
router.put("/:id", upload.single("image"), update(Event));
router.delete("/:id", remove(Event));

export default router;
