const axios = require('axios');

const bins = [
  { address: "Bin 1 Address", lat: 12.968230392971455, lng: 77.5951199077175 },
  { address: "Bin 2 Address", lat: 12.9722, lng: 77.5950 },
  { address: "Bin 3 Address", lat: 12.9722, lng: 77.5954 },
  { address: "Bin 4 Address", lat: 12.961956862413377, lng: 77.59475020864278 },
];

const addBins = async () => {
  for (const bin of bins) {
    try {
      const response = await axios.post('http://localhost:5000/bins/add-bin', bin, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Added: ${bin.address}`, response.data);
    } catch (error) {
      console.error(`Failed to add ${bin.address}`, error.message);
    }
  }
};

addBins();
