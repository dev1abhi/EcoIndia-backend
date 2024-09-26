// const db = require('../db');
const User = require('../db/models/user');
const ScheduledRequest = require('../db/models/scheduledrequests');

const createScheduledRequest = async (req, res) => {
    try {
        const { email, scheduledTime } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newScheduledRequest = new ScheduledRequest({
            email: user.email,
            scheduledTime,
        });

        await newScheduledRequest.save();
        res.status(201).json({ message: 'Scheduled request created successfully', scheduledRequest: newScheduledRequest });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating scheduled request' });
    }
}

const getRequests = async (req, res) => {
    try {
        const requests = await ScheduledRequest.find();
        res.status(200).json({ requests });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching scheduled requests' });
    }
}
const getRequest = async (req, res) => {
    try {
        const { email } = req.params;
        const request = await Scheduled
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching scheduled request' });
    }
}

const deleteRequest = async (req, res) => {
    try {
        const { email } = req.params;
        await ScheduledRequest.findByIdAndDelete(email);
        res.status(200).json({ message: 'Scheduled request for user deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting scheduled request' });
    }
}

module.exports = {
    createScheduledRequest,
    getRequests,
    deleteRequest,
    getRequest
};