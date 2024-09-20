const mongoose = require('mongoose');

// Define the bin schema
const binSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Create the model
const Bin = mongoose.model('Bin', binSchema);

module.exports = Bin;
