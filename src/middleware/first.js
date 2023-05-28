'use strict';

const first = (req, res, next) => {
    console.log('we lookin at middleware numba one!');
    next();
};

module.exports = first;