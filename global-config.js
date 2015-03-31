/*
 * Global configuration shared by Angular & LoopBack
 */
var p = require('./package.json');
var version = p.version.split('.').shift();

var hostIP = '0.0.0.0';
var hostName = "localhost";
var port = '8080';
var restApiRoot = '/api' + (version > 0 ? '/v' + version : '');

exports.config = {
    host: hostIP,
    port: port,
    restApiRoot: restApiRoot,
    development : {
        restApiUrl: 'http://' + hostIP + ":" + port + restApiRoot,
        indexFile: '../client/app/index.html',
        routes: '../client/app/config/routes'
    },
    production : {
        restApiUrl: 'https://' + hostName + restApiRoot,
        indexFile: '../client/dist/index.html',
        routes: '../client/dist/config/routes'
    }
}

exports.middleware = {
    livereload: 35729,
    development : {
        loopBackStaticRoot: '$!../client/app',
        fourOhFourRoot: '$!../client/app/404.html',
        errorHandlerHTML: '$!../client/app/error.html'
    },
    production : {
        loopBackStaticRoot: '$!../client/dist',
        fourOhFourRoot: '$!../client/dist/404.html',
        errorHandlerHTML: '$!../client/dist/error.html'
    }
}




