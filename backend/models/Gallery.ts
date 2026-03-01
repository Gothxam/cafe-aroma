import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
    title: string;
    subtitle: string;
    image: string;
    category: string;
    active: boolean;
}

const GallerySchema: Schema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, default: "Atmosphere" },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model<IGalleryItem>("Gallery", GallerySchema);
