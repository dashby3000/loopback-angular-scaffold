var GLOBAL_CONFIG = require('../../global-config');

module.exports = function () {
    // get environment
    var env = process.env.NODE_ENV || 'development';

    return function tracker(req, res, next) {
        if (startsWith(req.url, GLOBAL_CONFIG.config.restApiRoot)) {
            if(env === "production") {
                console.log("REQ.SECURE: ", req.secure);
                console.log("REQ.PROTOCOL: ", req.protocol);
                if (!req.secure) {
                    var err = new Error("API calls must be made over HTTPS.");
                    err.status = 500;

                    return next(err);
                }
            }
        }
        next();
    };
}

function startsWith(a, str) {
    return a.slice(0, str.length) == str;
}