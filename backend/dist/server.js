"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./configs/db"));
// Routes
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const galleryRoutes_1 = __importDefault(require("./routes/galleryRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const statsRoutes_1 = __importDefault(require("./routes/statsRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect Database
(0, db_1.default)();
// API Routes
app.get("/", (req, res) => {
    res.send("Café Aroma API is running...");
});
app.use("/api/menu", menuRoutes_1.default);
app.use("/api/gallery", galleryRoutes_1.default);
app.use("/api/events", eventRoutes_1.default);
app.use("/api/reservations", reservationRoutes_1.default);
app.use("/api/stats", statsRoutes_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Backend Global Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {}
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
