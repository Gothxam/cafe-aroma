import express from "express";
import Reservation from "../models/Reservation";
import { sendReservationRequestEmail, sendReservationDecisionEmail } from "../services/emailService";

const router = express.Router();

// Get all reservations (for admin)
router.get("/", async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json(reservations);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new reservation
router.post("/", async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();

        // Send request received email asynchronously
        sendReservationRequestEmail(newReservation);

        res.status(201).json(newReservation);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// Update reservation status
router.put("/:id", async (req, res) => {
    try {
        const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If status changed to confirmed or cancelled, send decision email
        if (updated && (req.body.status === "confirmed" || req.body.status === "cancelled")) {
            sendReservationDecisionEmail(updated);
        }

        res.json(updated);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
