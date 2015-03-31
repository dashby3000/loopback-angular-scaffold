//console.log("Using PRODUCTION Config");

var GLOBAL_CONFIG = require('../global-config');

module.exports = {
    isDevEnv: false,
    port: GLOBAL_CONFIG.config.port,
    host: GLOBAL_CONFIG.config.host,
    restApiRoot: GLOBAL_CONFIG.config.restApiRoot,
    indexFile: require.resolve(GLOBAL_CONFIG.config.production.indexFile),
    routes: require.resolve(GLOBAL_CONFIG.config.production.routes)
};
