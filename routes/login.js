const express = require('express');
const router = express.Router();

const user = { username: 'admin', password: '1234' };

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    req.session.username = username;
    res.redirect('/');
  } else {
    res.send('Login failed. <a href="/login">Try again</a>.');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
