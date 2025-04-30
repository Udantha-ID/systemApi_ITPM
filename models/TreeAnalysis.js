// systemApi/models/TreeAnalysis.js
import { Schema, model } from 'mongoose';

const treeAnalysisSchema = new Schema({
  userId: String,
  landId: String, // reference to LandBoundary
  analysisResult: Object, // e.g., {treeCount: 10, healthy: 8, ...}
  createdAt: { type: Date, default: Date.now }
});

export default model('TreeAnalysis', treeAnalysisSchema);