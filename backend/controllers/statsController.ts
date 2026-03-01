import { Request, Response } from "express";
import Menu from "../models/Menu";
import Event from "../models/Event";
import Reservation from "../models/Reservation";

export const getStats = async (req: Request, res: Response) => {
    try {
        const totalMenu = await Menu.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalReservations = await Reservation.countDocuments();
        const pendingReservations = await Reservation.countDocuments({ status: "pending" });

        res.json({
            menu: totalMenu,
            events: totalEvents,
            reservations: totalReservations,
            pending: pendingReservations,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch sanctuary vitals" });
    }
};
