var GLOBAL_CONFIG = require('../../global-config');

module.exports = function () {
    return function tracker(req, res, next) {
        if(startsWith(req.url, GLOBAL_CONFIG.config.restApiRoot)) {
            console.log('Request tracking middleware triggered on \'%s\'', req.url);

            var start = process.hrtime();

            res.once('finish', function () {
                var diff = process.hrtime(start);
                var ms = diff[0] * 1e3 + diff[1] * 1e-6;

                console.log('The request \'%s\' processing time is %d ms.', res.req.originalUrl, ms);
            });
        }

        next();
    };
}

function startsWith(a, str) {
    return a.slice(0, str.length) == str;
}