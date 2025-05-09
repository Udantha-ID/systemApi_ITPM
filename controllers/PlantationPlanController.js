const Planning = require('../models/PlantationPlanModel');
const mongoose = require('mongoose');

// Create new planning
const createPlanning = async (req, res) => {
  try {
    const { projectId, soilData, fertilizerSchedules, pestControls } = req.body;
    
    // Validate required fields
    if (!projectId || !soilData) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPlanning = await Planning.create({
      projectId,
      soilData,
      fertilizerSchedules: fertilizerSchedules || [],
      pestControls: pestControls || []
    });
    
    res.status(201).json(newPlanning);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all planning
const getAllPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find();
    res.json(plannings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get planning by ID
const getPlanning = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    if (!planning) return res.status(404).json({ message: 'Planning not found' });
    res.json(planning);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update planning
const updatePlanning = async (req, res) => {
  try {
    const updatedPlanning = await Planning.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlanning) return res.status(404).json({ message: 'Planning not found' });
    res.json(updatedPlanning);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete planning
const deletePlanning = async (req, res) => {
  try {
    const deletedPlanning = await Planning.findByIdAndDelete(req.params.id);
    if (!deletedPlanning) return res.status(404).json({ message: 'Planning not found' });
    res.json({ message: 'Planning deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlanning,
  getPlanning,
  getAllPlannings,
  updatePlanning,
  deletePlanning
};