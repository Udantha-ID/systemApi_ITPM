// systemApi/models/LandBoundary.js
import { Schema, model } from 'mongoose';

const landBoundarySchema = new Schema({
  userId: String, // or ObjectId if you have users
  coordinates: Array, // e.g., [{lat: ..., lng: ...}, ...]
  totalArea: Number,        // in your preferred units (e.g., square meters)
  plantableArea: Number,    // in your preferred units
  treeSpacing: Number,      // in meters (or your preferred unit)
  totalTrees: Number,
  createdAt: { type: Date, default: Date.now }
});

export default model('LandBoundary', landBoundarySchema);