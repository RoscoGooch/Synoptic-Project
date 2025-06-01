const express = require('express');
const path = require('path');

const app = express();

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse HTML form data
app.use(express.urlencoded({ extended: true }));

// Use HTML files as views
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
