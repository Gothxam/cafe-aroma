import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
    name: string;
    email: string;
    phone?: string;
    date: string;
    time: string;
    guests: number;
    preferences?: string;
    status: "pending" | "confirmed" | "cancelled";
}

const ReservationSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    preferences: { type: String },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Reservation || mongoose.model<IReservation>("Reservation", ReservationSchema);
