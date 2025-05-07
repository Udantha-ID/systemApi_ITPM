// Analysis model
const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  boundary: [{ x: Number, y: Number }],
  treePoints: [{ x: Number, y: Number }],
  spacing: {
    horizontal: Number,
    vertical: Number
  },
  totalArea: Number,
  plantableArea: Number,
  totalTrees: Number,
  metrics: {
    estimatedYield: Number,
    maintenanceCost: Number,
    estimatedRevenue: Number,
    roi: Number,
    waterRequirement: Number,
    carbonSequestration: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analysis', analysisSchema);