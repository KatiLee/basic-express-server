'use strict';

require('dotenv').config(); 
const { launch } = require('./src/server');
const PORT = process.env.PORT;

launch(PORT);