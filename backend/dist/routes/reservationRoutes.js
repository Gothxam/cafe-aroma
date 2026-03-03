"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Reservation_1 = __importDefault(require("../models/Reservation"));
const emailService_1 = require("../services/emailService");
const router = express_1.default.Router();
// Get all reservations (for admin)
router.get("/", async (req, res) => {
    try {
        const reservations = await Reservation_1.default.find().sort({ createdAt: -1 });
        res.json(reservations);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a new reservation
router.post("/", async (req, res) => {
    try {
        const newReservation = new Reservation_1.default(req.body);
        await newReservation.save();
        // Send request received email (non-blocking to prevent frontend timeouts)
        console.log(`[EMAIL TRIGGER] Invoking request email for: ${newReservation.email}`);
        (0, emailService_1.sendReservationRequestEmail)(newReservation).catch(err => {
            console.error(`[EMAIL FATAL] Failed asynchronous dispatch:`, err);
        });
        res.status(201).json(newReservation);
    }
    catch (err) {
        console.error("Reservation Creation Error:", err.message);
        res.status(400).json({ message: err.message });
    }
});
// Update reservation status
router.put("/:id", async (req, res) => {
    try {
        console.log(`Updating reservation ${req.params.id} with status: ${req.body.status}`);
        const updated = await Reservation_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If status changed to confirmed or cancelled, send decision email
        if (updated && (req.body.status === "confirmed" || req.body.status === "cancelled")) {
            console.log(`[EMAIL TRIGGER] Invoking decision email for ${updated.email}...`);
            (0, emailService_1.sendReservationDecisionEmail)(updated).catch(err => {
                console.error(`[EMAIL FATAL] Failed asynchronous dispatch:`, err);
            });
        }
        res.json(updated);
    }
    catch (err) {
        console.error("Reservation Update Error:", err.message);
        res.status(400).json({ message: err.message });
    }
});
exports.default = router;
