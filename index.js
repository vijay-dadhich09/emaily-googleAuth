const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const password = require('passport');
const appKeys = require('./config/keys');
require('./models/User');
require('./services/password');

// const mongoURI =  'mongodb://usersdb:password1@ds121652.mlab.com:21652/mongodb-emaily-dev';
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}
// mongoose.connect('mongodb://vijayddev:password1@ds121652.mlab.com:21652/mongodb-emaily-dev', options);
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  // mongoose.connection.close();
  mongoose.connect("mongodb://vijayddev:password1@ds121652.mlab.com:21652/mongodb-emaily-dev", options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 2000)
  })
}

connectWithRetry()
const app = express();
app.use(
  cookieSession({
    maxAge: 20 * 20 * 24 * 60 * 60 * 1000,
    keys: [appKeys.cookieKey],
  })
);
app.use(password.initialize());
app.use(password.session());
require('./routes/authRoutes')(app);

// add dynamic port for the production like heruku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('server running on port no: ' + PORT);
