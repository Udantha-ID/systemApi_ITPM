const mongoose = require('mongoose');

const plantationSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Plantation type is required'],
    enum: {
      values: ['coconut', 'mango', 'rambutan', 'pineapple', 'tea'],
      message: 'Invalid plantation type'
    }
  },
  landArea: {
    type: Number,
    required: [true, 'Land area is required'],
    min: [0.1, 'Land area must be at least 0.1 acres']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    validate: {
      validator: function(date) {
        return date > new Date(2000, 0, 1);
      },
      message: 'Invalid start date'
    }
  },
  harvestingDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  employees: {
    type: Number,
    required: [true, 'Employee count is required'],
    min: [1, 'Must have at least 1 employee']
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Plantation', plantationSchema);