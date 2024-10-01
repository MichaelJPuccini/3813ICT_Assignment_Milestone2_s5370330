// const express = require("express");
const model = require("../models/post");

// Get all items
exports.getAll = async (req, res) => {
    try {
        const items = await model.getAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

// Get all items with a filter applied
exports.getAllByFilter = async (req, res) => {
    const filter = req.query;
    try {
        const items = await model.getAllWithFilter(filter);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items with filter" });
    }
};

// Get the last x items
exports.getLatest = async (req, res) => {
    const x = parseInt(req.params.x, 10);
    try {
        const items = await model.getLatest(x);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch latest items" });
    }
};

// Create a new item
exports.createNewItem = async (req, res) => {
    const item = req.body;
    try {
        const result = await model.createNewItem(item);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: "Failed to create item" });
    }
};

// Create multiple new items
exports.createNewItems = async (req, res) => {
    const items = req.body;
    try {
        const result = await model.createNewItems(items);
        res.status(201).json(result.ops);
    } catch (error) {
        res.status(500).json({ error: "Failed to create items" });
    }
};

// Get a single item by ID
exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await model.getById(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch item" });
    }
};

// Delete a post by ID
exports.deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await model.deleteById(id);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Item deleted successfully" });
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete item" });
    }
};

// Update a post by ID
exports.updateById = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const result = await model.updateById(id, updateData);
        if (result.matchedCount === 1) {
            res.status(200).json({ message: "Item updated successfully" });
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update item" });
    }
};
