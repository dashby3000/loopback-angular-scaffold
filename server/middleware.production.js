//console.log("Using PRODUCTION Middleware");

var GLOBAL_CONFIG = require('../global-config');
var path = require('path');

module.exports = {
    "initial": {
        "connect-livereload": {
            port: GLOBAL_CONFIG.middleware.livereload
        }
    },
    "files": {
        "loopback#static": {
            "params": [GLOBAL_CONFIG.middleware.production.loopBackStaticRoot]
        }
    },
    "final": {
        "./middleware/fourOhFourError": {
            "params": {path: GLOBAL_CONFIG.middleware.production.fourOhFourRoot}
        }
    },
    "final:after": {
        "./middleware/errorHandler": {
            "params": {errorHTML: GLOBAL_CONFIG.middleware.production.errorHandlerHTML}
        }
    }
};

function projectPath(relative) {
    return path.resolve(__dirname, '../..', relative);
}
