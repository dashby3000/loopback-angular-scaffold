module.exports = function mountLoopBackExplorer(server) {
    var cluster = require('cluster');
    var explorer;
    try {
        explorer = require('loopback-explorer');
    } catch (err) {
        // Print the message only when the app was started via `server.listen()`.
        // Do not print any message when the project is used as a component.
        server.once('started', function (baseUrl) {
            console.log(
                'Run `npm install loopback-explorer` to enable the LoopBack explorer'
            );
        });
        return;
    }

    var restApiRoot = server.get('restApiRoot');

    var explorerApp = explorer(server, { basePath: restApiRoot, uiDirs: [__dirname + '/../explorer']});

    var auth = require('http-auth');
    var basic = auth.basic({
            realm: server.get('explorer').realm
        }, function (username, password, cb) { // Custom authentication method.
            cb(username === server.get('explorer').user && password === server.get('explorer').auth);
        }
    );

    server.get('/explorer/*', auth.connect(basic), function(req, res, next) {
        next();
    });

    server.use('/explorer', explorerApp);
    server.once('started', function () {
        var baseUrl = server.get('url').replace(/\/$/, '');
        // express 4.x (loopback 2.x) uses `mountpath`
        // express 3.x (loopback 1.x) uses `route`
        var explorerPath = explorerApp.mountpath || explorerApp.route;

        if(cluster.isWorker) {
            console.log('Worker id: ' + cluster.worker.id + ': Browse your REST API at %s%s', baseUrl, explorerPath);
        } else {
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};
