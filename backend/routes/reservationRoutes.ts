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

        // Send request received email (non-blocking to prevent frontend timeouts)
        console.log(`[EMAIL TRIGGER] Invoking request email for: ${newReservation.email}`);
        sendReservationRequestEmail(newReservation).catch(err => {
            console.error(`[EMAIL FATAL] Failed asynchronous dispatch:`, err);
        });

        res.status(201).json(newReservation);
    } catch (err: any) {
        console.error("Reservation Creation Error:", err.message);
        res.status(400).json({ message: err.message });
    }
});

// Update reservation status
router.put("/:id", async (req, res) => {
    try {
        console.log(`Updating reservation ${req.params.id} with status: ${req.body.status}`);
        const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If status changed to confirmed or cancelled, send decision email
        if (updated && (req.body.status === "confirmed" || req.body.status === "cancelled")) {
            console.log(`[EMAIL TRIGGER] Invoking decision email for ${updated.email}...`);
            sendReservationDecisionEmail(updated).catch(err => {
                console.error(`[EMAIL FATAL] Failed asynchronous dispatch:`, err);
            });
        }

        res.json(updated);
    } catch (err: any) {
        console.error("Reservation Update Error:", err.message);
        res.status(400).json({ message: err.message });
    }
});

export default router;
