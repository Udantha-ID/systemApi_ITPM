// systemApi/models/TreeAnalysis.js
const mongoose = require('mongoose');

const treeAnalysisSchema = new mongoose.Schema({
  userId: String,
  landId: String, // reference to LandBoundary
  analysisResult: Object, // e.g., {treeCount: 10, healthy: 8, ...}
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TreeAnalysis', treeAnalysisSchema);