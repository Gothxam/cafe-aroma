import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Sanitize Gmail App Password (remove spaces if present)
const rawPass = process.env.EMAIL_PASS || "";
const sanitizedPass = rawPass.replace(/\s/g, "");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: sanitizedPass,
  },
  tls: {
    rejectUnauthorized: false, // Helps with some cloud provider network restrictions
  },
});

// Verify connection configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("CRITICAL: Email Transporter Verification Failed!");
    console.error("Error Message:", error.message);
  } else {
    console.log("Email Transporter is ready to deliver messages.");
  }
});

export const sendReservationRequestEmail = async (reservation: any) => {
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
    console.log(`[EMAIL DISPATCH] Attempting to send reservation request email to: ${reservation.email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SUCCESS] Reservation request email sent successfully! MessageID: ${info.messageId}`);
  } catch (error: any) {
    console.error(`[EMAIL ERROR] CRITICAL: Failed to send reservation request email to ${reservation.email}.`);
    console.error(`[EMAIL ERROR] Message: ${error.message}`);
    console.error(`[EMAIL ERROR] Stack: ${error.stack}`);
  }
};

export const sendReservationDecisionEmail = async (reservation: any) => {
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
    console.log(`[EMAIL DISPATCH] Attempting to send reservation ${reservation.status} email to: ${reservation.email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SUCCESS] Reservation ${reservation.status} email sent successfully! MessageID: ${info.messageId}`);
  } catch (error: any) {
    console.error(`[EMAIL ERROR] CRITICAL: Failed to send reservation ${reservation.status} email to ${reservation.email}.`);
    console.error(`[EMAIL ERROR] Message: ${error.message}`);
    console.error(`[EMAIL ERROR] Stack: ${error.stack}`);
  }
};
