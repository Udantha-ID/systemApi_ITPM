// systemApi/models/LandBoundary.js
const mongoose = require('mongoose');

const landBoundarySchema = new mongoose.Schema({
  userId: String, // or ObjectId if you have users
  coordinates: Array, // e.g., [{lat: ..., lng: ...}, ...]
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LandBoundary', landBoundarySchema);