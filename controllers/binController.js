// controllers/binController.js
const Bin = require('../db/models/bin');

// Controller to add a new bin
const addBin = async (req, res) => {
  const { address, lat, lng } = req.body;

  try {
    const newBin = new Bin({ address, lat, lng });
    await newBin.save();
    res.status(201).json({ message: 'Bin added successfully', bin: newBin });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bin', error });
  }
};

// Controller to fetch all bin locations
const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find(); // Fetch all bins from the database
    res.status(200).json({ bins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bins', error });
  }
};

module.exports = { addBin, getAllBins };
