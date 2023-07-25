// require mongoose and the mongoose classes connection. 
const { connect, connection } = require('mongoose');
// connect to the local host and use thoughtDB
connect('mongodb://127.0.0.1:27017/thoughtDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) 
// export mongoose.connection module. 
module.exports = connection; 