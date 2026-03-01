import express from "express";
import { upload } from "../services/cloudinary";
import Gallery from "../models/Gallery";
import { getAll, create, update, remove } from "../controllers/crudController";

const router = express.Router();

router.get("/", getAll(Gallery));
router.post("/", upload.single("image"), create(Gallery));
router.put("/:id", upload.single("image"), update(Gallery));
router.delete("/:id", remove(Gallery));

export default router;
