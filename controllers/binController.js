// controllers/binController.js
const Bin = require('../db/models/bin');
const User = require('../db/models/user');


// Controller to add a new bin
// const addBin = async (req, res) => {
//   const { address, lat, lng } = req.body;

//   try {
//     const newBin = new Bin({ address, lat, lng });
//     await newBin.save();
//     res.status(201).json({ message: 'Bin added successfully', bin: newBin });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding bin', error });
//   }
// };

//bin created by user
const createBin = async (req, res , io ) => {
  try {
    const email = req.body.email;  // Assume email is passed in the request body
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new bin using user's default location and number
    const newBin = new Bin({
      address: `Bin for user ${user.name}`,
      lat: user.deflocation.coordinates[0],  // Latitude
      lng: user.deflocation.coordinates[1],  // Longitude
      number: user.number,
    });
    
     // Emit a "binsUpdated" event to notify clients that a new bin has been added
     io.emit('binsUpdated', { message: 'A new bin has been created' });

    await newBin.save();
    res.status(201).json({ message: 'Bin created successfully', bin: newBin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating bin' });
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

module.exports = { createBin, getAllBins };
