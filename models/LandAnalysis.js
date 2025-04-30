// models/LandAnalysis.js
const mongoose = require('mongoose');

const LandAnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalArea: {
    type: Number,
    required: true
  },
  plantableArea: {
    type: Number,
    required: true
  },
  treeSpacingHorizontal: {
    type: Number,
    required: true
  },
  treeSpacingVertical: {
    type: Number,
    required: true
  },
  totalTrees: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LandAnalysis', LandAnalysisSchema);