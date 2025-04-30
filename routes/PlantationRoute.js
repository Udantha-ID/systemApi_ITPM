const express = require('express');
const router = express.Router();
const {
  createPlantation,
  getPlantations,
  getSinglePlantation,
  updatePlantation,
  deletePlantation,
  completePlantation,
  getCompletedPlantations
} = require('../controllers/PlantationController');

//Plantations routes
router.post('/', createPlantation);
router.get('/', getPlantations);
router.get('/completed', getCompletedPlantations);
router.get('/:id', getSinglePlantation);
router.put('/:id', updatePlantation);
router.put('/:id/complete', completePlantation);
router.delete('/:id', deletePlantation);

module.exports = router;