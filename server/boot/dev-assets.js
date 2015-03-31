var path = require('path');

module.exports = function(app) {
  if (app.get('isDevEnv')) {
      var serveDir = app.loopback.static;

      app.use(serveDir(projectPath('.tmp')));
      app.use('/bower_components', serveDir(projectPath('bower_components')));
  }
};

function projectPath(relative) {
  return path.resolve(__dirname, '../..', relative);
}
