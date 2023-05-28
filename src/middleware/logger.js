'use strict';

const logger = (req, res, next) => {
    console.log('The lumberjack is here!', 'request path:', req.path, 'request method:', req.method);
    next();
};

module.exports = logger;