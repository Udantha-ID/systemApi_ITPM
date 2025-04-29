import LandCanvas, { find } from '../models/LandCanvas';

export async function createLandCanvas(req, res) {
  try {
    const canvas = new LandCanvas(req.body);
    await canvas.save();
    res.status(201).json(canvas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getLandCanvases(req, res) {
  const { userId, landId } = req.query;
  const filter = {};
  if (userId) filter.userId = userId;
  if (landId) filter.landId = landId;
  try {
    const canvases = await find(filter);
    res.json(canvases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}