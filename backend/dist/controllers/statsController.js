"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = void 0;
const Menu_1 = __importDefault(require("../models/Menu"));
const Event_1 = __importDefault(require("../models/Event"));
const Reservation_1 = __importDefault(require("../models/Reservation"));
const getStats = async (req, res) => {
    try {
        const totalMenu = await Menu_1.default.countDocuments();
        const totalEvents = await Event_1.default.countDocuments();
        const totalReservations = await Reservation_1.default.countDocuments();
        const pendingReservations = await Reservation_1.default.countDocuments({ status: "pending" });
        res.json({
            menu: totalMenu,
            events: totalEvents,
            reservations: totalReservations,
            pending: pendingReservations,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch sanctuary vitals" });
    }
};
exports.getStats = getStats;
