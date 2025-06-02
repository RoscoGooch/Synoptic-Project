const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login'); 
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.send('User not found. <a href="/login">Try again</a>');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send('Incorrect password. <a href="/login">Try again</a>');
    }

    req.session.username = user.username;
    res.redirect('/dashboard');

  } catch (err) {
    console.error(err);
    res.send('Something went wrong. <a href="/login">Try again</a>');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('index');
  });
});

module.exports = router;
