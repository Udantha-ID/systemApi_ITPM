const TreeVisualization = require('../models/TreeVisualization');

exports.createTreeVisualization = async (req, res) => {
  try {
    const visualization = new TreeVisualization(req.body);
    await visualization.save();
    res.status(201).json(visualization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTreeVisualizations = async (req, res) => {
  const { userId, landId } = req.query;
  const filter = {};
  if (userId) filter.userId = userId;
  if (landId) filter.landId = landId;
  try {
    const visualizations = await TreeVisualization.find(filter);
    res.json(visualizations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};