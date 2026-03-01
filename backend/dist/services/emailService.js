"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReservationDecisionEmail = exports.sendReservationRequestEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail", // Or your preferred service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendReservationRequestEmail = async (reservation) => {
    const mailOptions = {
        from: `"Café Aroma" <${process.env.EMAIL_USER}>`,
        to: reservation.email,
        subject: "Reservation Request Received - Café Aroma",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #d4af37; text-transform: uppercase;">Request Received</h2>
        <p>Hello <strong>${reservation.name}</strong>,</p>
        <p>Thank you for choosing Café Aroma. We have received your reservation request and are currently checking our availability for the requested time.</p>
        <div style="background: #fafaf9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${reservation.date}</p>
          <p><strong>Time:</strong> ${reservation.time}</p>
          <p><strong>Guests:</strong> ${reservation.guests}</p>
          <p><strong>Preferences:</strong> ${reservation.preferences || "None"}</p>
        </div>
        <p>You will receive a follow-up email once our team has reviewed your request. This usually takes less than an hour during business hours.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888;">The Sanctuary of Taste | 123 Coffee Lane, Artisan District</p>
      </div>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Reservation request email sent to:", reservation.email);
    }
    catch (error) {
        console.error("Error sending request email:", error);
    }
};
exports.sendReservationRequestEmail = sendReservationRequestEmail;
const sendReservationDecisionEmail = async (reservation) => {
    const isConfirmed = reservation.status === "confirmed";
    const subject = isConfirmed ? "Reservation Confirmed - Café Aroma" : "Reservation Update - Café Aroma";
    const title = isConfirmed ? "Reservation Confirmed" : "Reservation Declined";
    const message = isConfirmed
        ? "Your table at Café Aroma has been successfully booked. We look forward to welcoming you!"
        : "We regret to inform you that we are unable to accommodate your reservation request at this time due to lack of available slots or scheduling conflicts.";
    const mailOptions = {
        from: `"Café Aroma" <${process.env.EMAIL_USER}>`,
        to: reservation.email,
        subject: subject,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: ${isConfirmed ? "#22c55e" : "#ef4444"}; text-transform: uppercase;">${title}</h2>
        <p>Hello <strong>${reservation.name}</strong>,</p>
        <p>${message}</p>
        ${isConfirmed ? `
        <div style="background: #fafaf9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${reservation.date}</p>
          <p><strong>Time:</strong> ${reservation.time}</p>
          <p><strong>Guests:</strong> ${reservation.guests}</p>
        </div>
        ` : ""}
        <p>If you have any questions, please reply to this email or call us directly.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888;">The Sanctuary of Taste | 123 Coffee Lane, Artisan District</p>
      </div>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reservation ${reservation.status} email sent to:`, reservation.email);
    }
    catch (error) {
        console.error("Error sending decision email:", error);
    }
};
exports.sendReservationDecisionEmail = sendReservationDecisionEmail;
