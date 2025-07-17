// server/controllers/userController.js

const User = require("../models/User"); // Correct import

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load profile." });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const { name, age, bloodGroup } = req.body;
    user.name = name || user.name;
    user.age = age || user.age;
    user.bloodGroup = bloodGroup || user.bloodGroup;

    const updated = await user.save();
    res.status(200).json({
      _id: updated._id,
      name: updated.name,
      age: updated.age,
      bloodGroup: updated.bloodGroup,
      email: updated.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile." });
  }
};
