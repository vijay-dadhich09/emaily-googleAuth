const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/password');

mongoose.connect(keys.mongoURI);
const app = express();
require('./routes/authRoutes')(app);

// add dynamic port for the production like heruku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('server running on port no: ' + PORT);
