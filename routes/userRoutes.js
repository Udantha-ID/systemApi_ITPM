const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getCurrentUser, 
  updateUser, 
  updatePassword, 
  deleteUser 
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticateUser, getCurrentUser);
router.patch('/update', authenticateUser, updateUser);
router.patch('/update-password', authenticateUser, updatePassword);
router.delete('/delete', authenticateUser, deleteUser);

module.exports = router;
