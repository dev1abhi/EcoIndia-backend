const express = require('express');
const router = express.Router();
const Event = require('./models/Event');  // Path to Event model

// Create a new Event
const eventAdd = async (req, res) => {
    try {
        const { title, description, date, location, regcount } = req.body;
        const event = new Event({ title, description, date, location, regcount });
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};

// Delete an Event by ID
const eventDelete = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting event', error });
    }
};

module.exports = {eventAdd, eventDelete};
