module.exports = function sendError(err, code) {
  return {
    statusCode: code,
    error: String(err)
  };
};
