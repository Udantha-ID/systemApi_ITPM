const LandBoundary = require('../models/LandBoundary');

exports.createLandBoundary = async (req, res) => {
  try {
    const land = new LandBoundary(req.body);
    await land.save();
    res.status(201).json(land);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLandBoundaries = async (req, res) => {
  const { userId } = req.query;
  const filter = userId ? { userId } : {};
  try {
    const lands = await LandBoundary.find(filter);
    res.json(lands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};