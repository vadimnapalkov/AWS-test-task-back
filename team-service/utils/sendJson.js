module.exports = function sendJson(message, code) {
  return {
    statusCode: code,
    body: JSON.stringify(message)
  };
};
