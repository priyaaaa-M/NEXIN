// Utility script to create an initial user for testing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || '';

if (!email || !password) {
  console.log('Usage: node utils/seedUser.js <email> <password> [name]');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash, name });
    await user.save();
    console.log('User created:', email);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
