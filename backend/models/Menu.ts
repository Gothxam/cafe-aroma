import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    active: boolean;
}

const MenuSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Menu || mongoose.model<IMenuItem>("Menu", MenuSchema);
