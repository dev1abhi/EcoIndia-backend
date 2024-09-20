const startJourney = (req, res) => {
    try {
      const io = req.app.get('socketio'); // Get the socket.io instance
  
      if (!io) {
        return res.status(500).send('Socket.io instance not available.');
      }
  
      // Emit the 'startJourney' event to all connected clients
      io.emit('startJourney', { message: 'Truck journey started!' });
  
      console.log('Truck journey started signal emitted.');
  
      // Send a success response to the client
      res.status(200).send('Journey started signal sent successfully.');
    } catch (error) {
      console.error('Error emitting startJourney event:', error);
      res.status(500).send('Error starting truck journey.');
    }
  };
  
  module.exports = { startJourney };
  