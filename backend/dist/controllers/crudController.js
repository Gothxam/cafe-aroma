"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = void 0;
const getAll = (model) => async (req, res) => {
    try {
        const items = await model.find().sort({ createdAt: -1 });
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAll = getAll;
const create = (model) => async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = req.file.path; // Cloudinary URL
        }
        const newItem = new model(data);
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.create = create;
const update = (model) => async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = req.file.path;
        }
        const updatedItem = await model.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedItem);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.update = update;
const remove = (model) => async (req, res) => {
    try {
        await model.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.remove = remove;
