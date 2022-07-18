const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialMediaApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//export connection
module.exports = connection;