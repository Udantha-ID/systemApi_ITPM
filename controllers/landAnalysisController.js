// controllers/landAnalysisController.js
const LandAnalysis = require('../models/LandAnalysis');

exports.saveAnalysis = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { totalArea, plantableArea, spacing, totalTrees } = req.body;

    const analysis = new LandAnalysis({
      user: req.user._id,
      totalArea,
      plantableArea,
      treeSpacingHorizontal: spacing.horizontal,
      treeSpacingVertical: spacing.vertical,
      totalTrees
    });

    await analysis.save();

    res.status(201).json({
      message: 'Analysis saved successfully',
      data: analysis
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving analysis', error: error.message });
  }
};

exports.getUserAnalyses = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const analyses = await LandAnalysis.find({ user: req.user._id }).sort('-createdAt');

    res.json({
      message: 'Analyses fetched successfully',
      data: analyses
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analyses', error: error.message });
  }
};