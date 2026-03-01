import express from "express";
import { upload } from "../services/cloudinary";
import Menu from "../models/Menu";
import { getAll, create, update, remove } from "../controllers/crudController";

const router = express.Router();

router.get("/", getAll(Menu));
router.post("/", upload.single("image"), create(Menu));
router.put("/:id", upload.single("image"), update(Menu));
router.delete("/:id", remove(Menu));

export default router;
