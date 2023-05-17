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

app.get('/winning', (req, res, next) => {
    res.status(200).send('We are WINNING!');
});

app.get('/tangy', (req, res, next) => {
    next('That is tangy in a bad way!');
});

app.use(('*'), (req, res, next) => {
    res.status(404).send('The tennis ball is under the couch my guy, not found!');
});

app.listen(PORT, () => console.log('attentively heeding on port:', PORT));
