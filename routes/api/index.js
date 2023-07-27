// require express Router, and all api files
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');


// use middleware
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);


// export modules
module.exports = router;