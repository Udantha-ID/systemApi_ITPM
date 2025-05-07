const Analysis = require('../models/Analysis');
const User = require('../models/User');

// Create a new analysis
exports.createAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming user ID is attached by auth middleware
    
    // Validate user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Extract analysis data from request
    const { 
      boundary,
      spacing,
      totalArea,
      plantableArea, 
      totalTrees,
      treePoints = [], // Optional
      metrics
    } = req.body;

    // Create new analysis document
    const newAnalysis = new Analysis({
      user: userId,
      boundary,
      treePoints,
      spacing,
      totalArea,
      plantableArea,
      totalTrees,
      metrics: {
        estimatedYield: metrics.estimatedYield,
        maintenanceCost: metrics.maintenanceCost,
        estimatedRevenue: metrics.estimatedRevenue,
        roi: metrics.roi,
        waterRequirement: metrics.waterRequirement,
        carbonSequestration: metrics.carbonSequestration
      }
    });

    // Save to database
    await newAnalysis.save();

    res.status(201).json({
      success: true,
      message: 'Analysis saved successfully',
      data: newAnalysis
    });

  } catch (error) {
    console.error('Error creating analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save analysis',
      error: error.message
    });
  }
};

// Get all analyses for a user
exports.getUserAnalyses = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const analyses = await Analysis.find({ user: userId })
      .sort({ createdAt: -1 });  // Most recent first
    
    res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses
    });
    
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analyses',
      error: error.message
    });
  }
};

// Get a single analysis by ID
exports.getAnalysis = async (req, res) => {
  try {
    const analysisId = req.params.id;
    const userId = req.user.id;
    
    const analysis = await Analysis.findOne({ 
      _id: analysisId,
      user: userId 
    });
    
    if (!analysis) {
      return res.status(404).json({ 
        success: false, 
        message: 'Analysis not found or not authorized' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: analysis
    });
    
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analysis',
      error: error.message
    });
  }
};

// Delete an analysis
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysisId = req.params.id;
    const userId = req.user.id;
    
    const analysis = await Analysis.findOneAndDelete({ 
      _id: analysisId,
      user: userId 
    });
    
    if (!analysis) {
      return res.status(404).json({ 
        success: false, 
        message: 'Analysis not found or not authorized' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete analysis',
      error: error.message
    });
  }
};