module.exports = function(options) {
  return function fourOhFourError(req, res, next) {
    res.status(404).sendFile(options.path);
  };
}
