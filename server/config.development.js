//console.log("Using DEVELOPMENT Config");

var GLOBAL_CONFIG = require('../global-config');

module.exports = {
    isDevEnv: true,
    port: GLOBAL_CONFIG.config.port,
    host: GLOBAL_CONFIG.config.host,
    restApiRoot: GLOBAL_CONFIG.config.restApiRoot,
    indexFile: require.resolve(GLOBAL_CONFIG.config.development.indexFile),
    routes: require.resolve(GLOBAL_CONFIG.config.development.routes)
};
