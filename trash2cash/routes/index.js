const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index'); // or res.send('Hello from Trash2Cash!');
});

module.exports = router;
