import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
    title: string;
    description: string;
    date: string;
    time: string;
    image?: string;
    tags?: string[];
    active: boolean;
}

const EventSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
