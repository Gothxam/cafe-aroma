"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageMiddleware = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: "cafe-aroma",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
});
exports.upload = (0, multer_1.default)({ storage });
const uploadImageMiddleware = (req, res, next) => {
    const singleUpload = exports.upload.single("image");
    singleUpload(req, res, (err) => {
        if (err) {
            console.error("Cloudinary Upload Error:", err);
            return res.status(500).json({
                message: "Image Upload Failed",
                error: err.message || err.toString()
            });
        }
        next();
    });
};
exports.uploadImageMiddleware = uploadImageMiddleware;
exports.default = cloudinary_1.v2;
