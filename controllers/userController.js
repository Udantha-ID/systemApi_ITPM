const User = require('../models/User');
const { createJWT } = require('../utils/jwt');

// Register user
exports.register = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    // Create user
    const user = await User.create(req.body);
    
    // Generate JWT token
    const token = createJWT({ payload: { userId: user._id, email: user.email } });
    
    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json({ user: userObject, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = createJWT({ payload: { userId: user._id, email: user.email } });
    
    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({ user: userObject, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { fullName, address, phoneNumber, paymentInfo } = req.body;
    
    // Fields that can be updated
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (address) updateData.address = address;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (paymentInfo) updateData.paymentInfo = paymentInfo;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide old and new password' });
    }
    
    const user = await User.findById(req.user.userId);
    
    // Check old password
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid old password' });
    }
    
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
