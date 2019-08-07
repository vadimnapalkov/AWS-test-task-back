const sendJson = require('./sendJson');

module.exports = function sendError(error, code) {
  const body = { error: error.message };
  return sendJson(body, code);
};
