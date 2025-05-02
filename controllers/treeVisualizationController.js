const TreeVisualization = require('../models/TreeVisualization');

exports.createTreeVisualization = async (req, res) => {
  try {
    const visualization = new TreeVisualization(req.body);
    await visualization.save();
    res.status(201).json(visualization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}