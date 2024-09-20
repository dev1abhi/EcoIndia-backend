const mongoose = require('mongoose');

// Create a schema for LitterLogs
const litterLogSchema = new mongoose.Schema({
    imageUrl: {
        type: String,  // URL of the image
        required: true
    },
    location: {
        coordinates: {
            type: [Number],  // Array of numbers: [longitude, latitude]
            required: true
        }
    },
    timestamp: {
        type: Date,  // Time when the image was taken
        default: Date.now  // Defaults to current date/time
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


const LitterLog = mongoose.model('LitterLog', litterLogSchema);

module.exports = LitterLog;
