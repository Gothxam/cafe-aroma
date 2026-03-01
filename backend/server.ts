import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./configs/db";

// Routes
import menuRoutes from "./routes/menuRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import eventRoutes from "./routes/eventRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import statsRoutes from "./routes/statsRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.get("/", (req, res) => {
    res.send("Café Aroma API is running...");
});

app.use("/api/menu", menuRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
