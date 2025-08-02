const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.requestOtp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.json({ success: false, message: 'Invalid credentials' });
  }
  const otp = generateOTP();
  const otpToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: '10m' });
  user.otpToken = otpToken;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();
  await sendEmail(email, 'Your OTP for NEXIN Login', `Your OTP is: ${otp}`);
  res.json({ success: true, otpToken });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp, otpToken } = req.body;
  try {
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET);
    if (decoded.email !== email || decoded.otp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }
    const user = await User.findOne({ email });
    if (!user || user.otpToken !== otpToken || user.otpExpires < Date.now()) {
      return res.json({ success: false, message: 'OTP expired or invalid' });
    }
    // Success: generate login token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch {
    res.json({ success: false, message: 'OTP verification failed' });
  }
};
