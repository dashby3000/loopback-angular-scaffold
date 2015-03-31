module.exports = function (app) {

    var routes = require(app.get('routes'));

    Object
        .keys(routes)
        .forEach(function (route) {
            app.get(route, function (req, res) {
                res.sendFile(app.get('indexFile'));
            });
        });
};
