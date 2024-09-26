const mongoose = require('mongoose');

const scheduledRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
    scheduledTime: {
        type: Date,
        required: true,
    },
    });

module.exports = mongoose.model('ScheduledRequest', scheduledRequestSchema);