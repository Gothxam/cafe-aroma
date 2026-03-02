"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("../services/cloudinary");
const Event_1 = __importDefault(require("../models/Event"));
const crudController_1 = require("../controllers/crudController");
const router = express_1.default.Router();
router.get("/", (0, crudController_1.getAll)(Event_1.default));
router.post("/", cloudinary_1.uploadImageMiddleware, (0, crudController_1.create)(Event_1.default));
router.put("/:id", cloudinary_1.uploadImageMiddleware, (0, crudController_1.update)(Event_1.default));
router.delete("/:id", (0, crudController_1.remove)(Event_1.default));
exports.default = router;
