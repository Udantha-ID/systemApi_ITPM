const express = require('express');
const router = express.Router();
const {
  createPlanning,
  getPlanning,
  getAllPlannings,
  updatePlanning,
  deletePlanning
} = require('../controllers/PlantationPlanController');

router.get('/', getAllPlannings);
router.post('/', createPlanning);
router.get('/:id', getPlanning);
router.put('/:id', updatePlanning);
router.delete('/:id', deletePlanning);

module.exports = router;