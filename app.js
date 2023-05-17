'use strict';

require('dotenv').config(); 
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).send('one small step for the server');
});

app.listen(PORT, () => console.log('attentively heeding on port:', PORT));
