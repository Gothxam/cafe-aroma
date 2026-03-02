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

export const upload = multer({ storage });

export const uploadImageMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const singleUpload = upload.single("image");
    singleUpload(req, res, (err: any) => {
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

export default cloudinary;
