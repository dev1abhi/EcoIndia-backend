const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000; // Backend will run on this port
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Add your Google Maps API Key here



// Endpoint to fetch Distance Matrix data
app.get("/api/distancematrix", async (req, res) => {
  try {
    const { origins, destinations } = req.query;

    console.log("origins:", origins);
    console.log("destinations:", destinations);

    // Fetch data from Google Maps Distance Matrix API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${API_KEY}`
    );

    console.log("Distance Matrix response:", response.data);
    // Send the Google API response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching distance matrix:", error);
    res.status(500).send("Error fetching distance matrix");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});


