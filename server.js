// require express, connection.js, and routes folder
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// set port to 3001
const PORT = 3001;
// create variable for express function
const app = express();
// middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// connect mongo db to port to run
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});