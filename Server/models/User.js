const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otpToken: { type: String },
  otpExpires: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
