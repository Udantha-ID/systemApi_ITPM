const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  soilData: {
    phLevel: Number,
    texture: String,
    nutrients: String,
    quality: String
  },
  fertilizerSchedules: [{
    type: { type: String, required: true },
    date: { type: Date, required: true },
    quantity: { type: String, required: true },
    method: String,
    reminder: Boolean
  }],
  pestControls: [{
    method: String,
    frequency: String,
    product: String,
    date: Date,
    reminder: Boolean
  }]
}, { timestamps: true });

module.exports = mongoose.model('Planning', planningSchema);