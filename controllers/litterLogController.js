const express = require('express');
const router = express.Router();
const LitterLog = require('../db/models/litterlogs');  // Path to LitterLog model

// Create a new LitterLog
const litterLogAdd =  async (req, res) => {
    try {
        const { imageUrl, location } = req.body;
        const litterLog = new LitterLog({ imageUrl, location });
        await litterLog.save();
        res.status(201).json({ message: 'Litter log created successfully', litterLog });
    } catch (error) {
        res.status(400).json({ message: 'Error creating litter log', error });
    }
};

// Delete a LitterLog by ID
const litterLogDelete = async (req, res) => {
    try {
        const litterLog = await LitterLog.findByIdAndDelete(req.params.id);
        if (!litterLog) return res.status(404).json({ message: 'Litter log not found' });
        res.status(200).json({ message: 'Litter log deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting litter log', error });
    }
};

//get all litterlogs

module.exports = {litterLogAdd, litterLogDelete};
