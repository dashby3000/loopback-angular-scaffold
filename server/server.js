var loopback = require('loopback');
var boot = require('loopback-boot');
var cluster = require('cluster');
var control = require('strong-cluster-control');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.

boot(app, __dirname);

app.disable('x-powered-by');

app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started');

        if (cluster.isWorker) {
            console.log('Worker id: ' + cluster.worker.id + ': { pid: ' + cluster.worker.process.pid + ' }' + ' is started');
            console.log('Worker id: ' + cluster.worker.id + ': Web server listening at: %s', app.get('url'));

            cluster.worker.process.on('uncaughtException', function (err) {
                console.log('Process caught exception: ' + err);

                var timeout = setTimeout(function () {
                    cluster.worker.kill();
                }, 30000);
            });
        } else {
            console.log('Web server listening at: %s', app.get('url'));
        }
    });
};

// start the server if `$ node server.js`
if (require.main === module) {
    if (shouldCluster()) {
        control.start({
            size: control.CPUS
        }).on('error', function (er) {
            console.error(er);
        });

        if (cluster.isMaster) {
            console.log('Master pid: ' + process.pid);
        }

        if (cluster.isWorker) {
            app.start();
        }
    } else {
        app.start();
    }
}

function shouldCluster() {
    return app.get('runClustered');
}
