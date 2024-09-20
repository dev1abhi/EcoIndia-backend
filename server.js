const express = require("express");
const axios = require("axios");

const port = 5000; // Backend will run on this port
const cors = require("cors");
const bodyParser = require('body-parser');

const http = require('http');
const { Server } = require('socket.io'); 

const truckRoutes = require('./routes/truckRoutes');
const mapRoutes = require('./routes/mapRoutes');
const litterLogRoutes = require('./routes/litterLogRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
require('./db/db');  //mongodb connection



const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Pass the server to socket.io



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Middleware to use routes
app.use('/map', mapRoutes);
app.use('/truck', truckRoutes);
app.use('/events', eventRoutes); 
app.use('/litterlogs', litterLogRoutes);
app.use('/users', userRoutes);

// Socket.io instance to be used in the controllers
app.set('socketio', io);

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});


