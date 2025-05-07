const Analysis = require('../models/Analysis');

exports.createAnalysis = async (req, res) => {
  try {
    const analysis = new Analysis({
      ...req.body,
      user: req.user._id
    });
    await analysis.save();
    res.status(201).json(analysis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id });
    res.json(analyses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json(analysis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json({ message: 'Analysis deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};