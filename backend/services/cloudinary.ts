import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "cafe-aroma",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    } as any,
});

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export const uploadImageMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const singleUpload = upload.single("image");
    singleUpload(req, res, (err: any) => {
        if (err) {
            console.error("Cloudinary Upload Error:", err);

            // Check if Multer caught a file size limit error natively
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    message: "File Too Large",
                    error: "The selected image exceeds the 10MB limit. Please compress it or choose a smaller image."
                });
            }

            // Fallback for Cloudinary's own rejection or other errors
            if (err.message && err.message.includes("File size too large")) {
                return res.status(400).json({
                    message: "File Too Large",
                    error: "The selected image is too large for the current Cloudinary plan. Please compress it under 10MB."
                });
            }

            return res.status(500).json({
                message: "Image Upload Failed",
                error: err.message || err.toString()
            });
        }
        next();
    });
};

export default cloudinary;
