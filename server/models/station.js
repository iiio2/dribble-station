const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  range: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Station', stationSchema);
