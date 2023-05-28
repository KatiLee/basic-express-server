'use strict';


const express = require('express');
const cors = require('cors');
// const first = require('./middleware/first');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const err404 = require('./error-handlers/404');
const err500 = require('./error-handlers/500');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(first);
app.use(logger);

app.get('/', (req, res, next) => {
    res.status(200).send('one small step for the server');
});

// query
app.get('/person', validator, (req, res, next) => {
    let name = req.query.name;
    res.status(200).json({name});
});

// URL parameters
app.get('/hello/userName', (req, res, next) => {
    console.log('params', req.params);
    res.status(200).send('Greeting from the way');
});

app.get('/winning', (req, res, next) => {
    res.status(200).send('We are WINNING!');
});

app.get('/tangy', (req, res, next) => {
    next('That is tangy in a bad way!');
});

app.use('*', err404);

app.use(err500);

// app.use(('*'), (req, res, next) => {
//     res.status(404).send('The tennis ball is under the couch my guy, not found!');
// });

const start = (port) => app.listen(port, () => console.log('attentively heeding on port:', port));

module.exports = { start, app }