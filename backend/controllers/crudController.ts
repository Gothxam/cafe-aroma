import { Request, Response } from "express";
import { Model } from "mongoose";

export const getAll = (model: Model<any>) => async (req: Request, res: Response) => {
    try {
        const items = await model.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const create = (model: Model<any>) => async (req: Request, res: Response) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = (req.file as any).path; // Cloudinary URL
        }
        const newItem = new model(data);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const update = (model: Model<any>) => async (req: Request, res: Response) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = (req.file as any).path;
        }
        const updatedItem = await model.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedItem);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const remove = (model: Model<any>) => async (req: Request, res: Response) => {
    try {
        await model.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
