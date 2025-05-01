const express = require('express');
const router = express.Router();

// Import controller (to be created)
const landBoundaryController = require('../controllers/landBoundaryController');

// GET all land boundaries
router.get('/', landBoundaryController.getAllLandBoundaries);

// GET single land boundary by ID
router.get('/:id', landBoundaryController.getLandBoundaryById);

// POST create new land boundary
router.post('/', landBoundaryController.createLandBoundary);

// PUT update land boundary
router.put('/:id', landBoundaryController.updateLandBoundary);

// DELETE land boundary
router.delete('/:id', landBoundaryController.deleteLandBoundary);

module.exports = router;