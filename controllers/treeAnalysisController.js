const TreeAnalysis = require('../models/TreeAnalysis');

exports.createTreeAnalysis = async (req, res) => {
  try {
    const analysis = new TreeAnalysis(req.body);
    await analysis.save();
    res.status(201).json(analysis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTreeAnalyses = async (req, res) => {
  const { userId, landId } = req.query;
  const filter = {};
  if (userId) filter.userId = userId;
  if (landId) filter.landId = landId;
  try {
    const analyses = await TreeAnalysis.find(filter);
    res.json(analyses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};