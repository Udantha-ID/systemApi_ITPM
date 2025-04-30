// routes/landAnalysisRoutes.js
const express = require('express');
const router = express.Router();
const landAnalysisController = require('../controllers/landAnalysisController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with authentication middleware
router.post('/', authMiddleware, landAnalysisController.saveAnalysis);
router.get('/', authMiddleware, landAnalysisController.getUserAnalyses);

module.exports = router;