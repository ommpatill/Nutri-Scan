const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendOTP");
const { validateSignup, validatePasswordReset } = require("../utils/validateInput");


// In-memory OTP store (can be replaced with DB/Redis)
const otpStore = {};

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.signup = async (req, res) => {
    const { name, age, bloodGroup, email, password } = req.body;
    const error = validateSignup(req.body);
    if (error) return res.status(400).json({ message: error });
    
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    const newUser = new User({
      name,
      age,
      bloodGroup,
      email,
      password,
      isVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const sent = await sendOTP(email, otp);
    if (!sent) return res.status(500).json({ message: "OTP email failed." });

    await newUser.save();
    res.status(200).json({ success: true, message: "Signup successful. OTP sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = otpStore[email];
  if (!storedOtp || storedOtp !== parseInt(otp)) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  try {
    await User.findOneAndUpdate({ email }, { isVerified: true });
    delete otpStore[email];
    res.status(200).json({ success: true, message: "OTP verified successfully." });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};

exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { name: identifier }],
    });

    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: "Invalid credentials." });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email first." });

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed." });
  }
};

exports.requestPasswordReset = async (req, res) => {
    const error = validatePasswordReset(req.body);
    if (error) return res.status(400).json({ message: error });
    

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found." });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  const sent = await sendOTP(email, otp);
  if (!sent) return res.status(500).json({ message: "Failed to send OTP." });

  res.status(200).json({ success: true, message: "OTP sent to email." });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otpStore[email] !== parseInt(otp))
    return res.status(400).json({ message: "Invalid OTP." });

  try {
    const user = await User.findOne({ email });
    user.password = newPassword;
    await user.save();
    delete otpStore[email];
    res.status(200).json({ success: true, message: "Password reset successful." });
  } catch (err) {
    res.status(500).json({ message: "Reset failed." });
  }
};
