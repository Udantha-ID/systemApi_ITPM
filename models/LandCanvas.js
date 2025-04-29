// systemApi/models/LandCanvas.js
const mongoose = require('mongoose');

const landCanvasSchema = new mongoose.Schema({
  userId: String,
  landId: String,
  canvasData: Object, // e.g., drawing data, annotations
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LandCanvas', landCanvasSchema);