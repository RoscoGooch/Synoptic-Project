const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.send('Registered! <a href="/login">Login</a>');
  } catch (err) {
    console.error(err);
    res.send('Registration failed. Username might already exist.');
  }
});

module.exports = router;
