const startJourney = (req, res) => {
    const io = req.app.get('socketio'); // Get the socket.io instance
    io.emit('startJourney', { message: 'Truck journey started!' });
    res.send('Journey started signal sent.');
  };
  
  module.exports = { startJourney };
  