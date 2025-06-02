const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/trash2cash', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const express = require('express');
const path = require('path');

const app = express();

const session = require('express-session');

// Set up session middleware
app.use(session({
  secret: 'your-secret-key', // change this!
  resave: false,
  saveUninitialized: true
}));

// Make username available to templates
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  next();
});


// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse HTML form data
app.use(express.urlencoded({ extended: true }));

// Use HTML files as views
app.engine('html', require('ejs').renderFile);
// Use EJS templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const loginRouter = require('./routes/login');
app.use('/', loginRouter);

const registerRouter = require('./routes/register');
app.use('/', registerRouter);

const dashboardRouter = require('./routes/dashboard');
app.use('/dashboard', dashboardRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
