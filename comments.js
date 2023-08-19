// Create web server application
// Import Express module
const express = require('express');
// Import Body Parser module
const bodyParser = require('body-parser');
// Import path module
const path = require('path');
// Import Node.js file system module
const fs = require('fs');
// Import JSON file
const comments = require('./comments.json');

// Create app
const app = express();

// Set port
const port = 3000;

// Use Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'pug');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set route for index page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Comments',
    comments: comments.comments,
  });
});

// Set route for new comment page
app.get('/new-comment', (req, res) => {
  res.render('new-comment', {
    title: 'New Comment',
  });
});

// Set route for new comment page
app.post('/new-comment', (req, res) => {
  // Get data from form
  const data = req.body;
  // Get date
  const date = new Date();
  // Create new comment object
  const newComment = {
    id: comments.comments.length + 1,