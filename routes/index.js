// require express Router and api folder
const router = require('express').Router();
const apiRoutes = require('./api');

// set up middleware to apiRoutes
router.use('/api', apiRoutes);

// return message if wrong route
router.use((req, res) => {
  return res.send('Wrong route!');
});

// export module router
module.exports = router