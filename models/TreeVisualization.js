// systemApi/models/TreeVisualization.js
const mongoose = require('mongoose');

const treeVisualizationSchema = new mongoose.Schema({
  userId: String,
  landId: String,
  visualizationData: Object, // e.g., {trees: [{x, y, type}, ...]}
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TreeVisualization', treeVisualizationSchema);