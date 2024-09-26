// controllers/binController.js
const Bin = require('../db/models/bin');
const User = require('../db/models/user');
const notificationapi = require('notificationapi-node-server-sdk').default



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

const deleteallbins = async (req, res) => {
  try {
    await Bin.deleteMany({}); // Delete all bins from the database
    res.status(200).json({ message: 'All bins deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all bins', error });
  }
};

const notifyBin = async (req, res) => {
  try {
    const { lat, lng } = req.body;  // Get lat/lng from the request body

    // Find the bin with matching coordinates (you might want to handle precision issues here)
    const bin = await Bin.findOne({
      lat: lat,
      lng: lng,
    });

    if (!bin) {
      return res.status(404).json({ message: 'No bin found with matching coordinates' });
    }

     // Find the user who owns the bin by matching the bin's number with the user's number
     const user = await User.findOne({ number: bin.number });

     if (!user) {
       return res.status(404).json({ message: 'User not found for this bin' });
     }


     // Prepend "+91" to the user's number (if not already there)
    const userNumber = user.number.toString().startsWith('+91') ? user.number : `+91${user.number}`;

    await notificationapi.init(
      process.env.NOTI_API_CLIENTID, // clientId
      process.env.NOTI_API_CLIENTSEC// clientSecret
    )

    // Send a notification to the bin's number , bin.number
    const notificationResponse = await notificationapi.send({
      notificationId: 'review_required',
      user: {
        id: user.email, //user.mail
        email: user.email, //user.mail
        number: userNumber // user.number
      },
      mergeTags: {
        "comment": "testComment",
        "commentId": "testCommentId"
      }
    })


     // After notifying, delete the bin from the database
     await Bin.findOneAndDelete({ lat: lat, lng: lng });

     // Emit a "binsUpdated" event to notify clients that a bin has been deleted
     io.emit('binsUpdated', { message: 'A bin has been deleted after notification' });

    res.status(200).json({ message: 'Notification sent successfully', bin});
  } catch (error) {
    console.error('Error notifying bin:', error);
    res.status(500).json({ message: 'Error notifying bin' });
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

//bin delete by an user
// Controller to delete a bin by user email and matching location
const deleteBinByUserLocation = async (req, res, io) => {
  try {
    const { email } = req.body;  // Assume email is passed in the request body

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract user's latitude and longitude from deflocation
    const [lng, lat] = user.deflocation.coordinates;

    // Find the bin that matches the user's latitude and longitude
    const bin = await Bin.findOne({ lat, lng });

    if (!bin) {
      return res.status(404).json({ message: 'No bin found at the user\'s location' });
    }

    // Delete the found bin
    await Bin.findOneAndDelete({ lat, lng });

    // Emit a "binsUpdated" event to notify clients that a bin has been deleted
    io.emit('binsUpdated', { message: 'A bin has been deleted' });

    res.status(200).json({ message: 'Bin deleted successfully' });
  } catch (error) {
    console.error('Error deleting bin:', error);
    res.status(500).json({ message: 'Error deleting bin' });
  }
};

module.exports = { createBin, getAllBins ,notifyBin , deleteBinByUserLocation, deleteallbins};
