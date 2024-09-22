// controllers/binController.js
const Bin = require('../db/models/bin');
const User = require('../db/models/user');
const notificationapi = require('notificationapi-node-server-sdk').default


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

    await notificationapi.init(
      process.env.NOTI_API_CLIENTID, // clientId
      process.env.NOTI_API_CLIENTSEC// clientSecret
    )

    // Send a notification to the bin's number , bin.number
    const notificationResponse = await notificationapi.send({
      notificationId: 'review_required',
      user: {
        id: "abhilashsarangi222@gmail.com", //user.mail
        email: "abhilashsarangi222@gmail.com", //user.mail
        number: "+917064077209" // user.number
      },
      mergeTags: {
        "comment": "testComment",
        "commentId": "testCommentId"
      }
    })

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

module.exports = { createBin, getAllBins ,notifyBin };
