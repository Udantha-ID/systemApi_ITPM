const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createAnalysis,
  getUserAnalyses,
  getAnalysis,
  deleteAnalysis
} = require('../controllers/AnalysisController');

// Protected routes - require authentication
router.post('/', protect, createAnalysis);
router.get('/', protect, getUserAnalyses);
router.get('/:id', protect, getAnalysis);
router.delete('/:id', protect, deleteAnalysis);

module.exports = router; 