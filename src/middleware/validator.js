'use strict';

module.exports = (req, res, next) => {
    if (req.query.name === 'Roary') {
        next();
    } else {
        next('You didn\'t say Roary...');
    }
};