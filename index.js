'use strict';

require('dotenv').config(); 
const { start } = require('./src/server');
const PORT = process.env.PORT;

start(PORT);