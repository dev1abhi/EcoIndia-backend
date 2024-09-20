const express = require('express');
const router = express.Router();
const User = require('../db/models/user');  // Path to User model

// Create a new User
const userAdd =  async (req, res) => {
    try {
        const { name, email, number, deflocation, regevents, usertype } = req.body;
        const user = new User({ name, email, number, deflocation, regevents, usertype });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// Delete a User by ID
const userDelete = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
};

module.exports = { userAdd, userDelete };
