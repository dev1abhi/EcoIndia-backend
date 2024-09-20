const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Replace with your actual API key

const getDistanceMatrix = async (req, res) => {
  try {
    const { origins, destinations } = req.query;

    console.log('origins:', origins);
    console.log('destinations:', destinations);

    // Fetch data from Google Maps Distance Matrix API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${API_KEY}`
    );

    console.log('Distance Matrix response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    res.status(500).send('Error fetching distance matrix');
  }
};

module.exports = { getDistanceMatrix };
