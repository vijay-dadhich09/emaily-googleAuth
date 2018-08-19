const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const password = require('passport');
const appKeys = require('./config/keys');
require('./models/User');
require('./services/password');

// const mongoURI =  'mongodb://usersdb:password1@ds121652.mlab.com:21652/mongodb-emaily-dev';
mongoose.connect(appKeys.mongoURI);
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
