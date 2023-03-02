import logger from '../config/logger.js';

function requestInfo(req, res, next) {
    logger.log('info', `${req.method} request made at ${req.originalUrl}`);
    next();
}

function reqNotImplementedWarn(req, res, next) {
    logger.log(
        'warn',
        `Not implemented ${req.method} request made at ${req.originalUrl}`
    );
    next();
}

export { requestInfo, reqNotImplementedWarn };
