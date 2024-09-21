const express = require('express');
const router = express.Router();
const LitterLog = require('../db/models/litterlogs');  // Path to LitterLog model

// Create a new LitterLog
const litterLogAdd =  async (req, res) => {
    try {
        const {  location } = req.body;

         // Ensure location is defined and has latitude and longitude
         if (!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
            return res.status(400).json({ message: 'Invalid location data' });
        }

        console.log(location);

        const litterLog = new LitterLog({
            location: {
                latitude: location.latitude,  // Use latitude from the request body
                longitude: location.longitude  // Use longitude from the request body
            }
        });
        await litterLog.save();

        

        //automatically creating a bin when a litterlog is added
        const newBin = new Bin({
            address: 'Automatically created bin',
            lat: location.latitude,  // Latitude
            lng: location.longitude,  // Longitude
            number: null  // You can omit or add a default value for the number if needed
          });
      
          await newBin.save();
      
       
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
const getAllLitterLogs = async (req, res) => {
    try {
        const litterlogs = await LitterLog.find();
        res.status(200).json(litterlogs);
    } catch (error) {
        res.status(400).json({ message: 'Error getting litter logs', error });
    }
}


module.exports = {litterLogAdd, litterLogDelete, getAllLitterLogs};
