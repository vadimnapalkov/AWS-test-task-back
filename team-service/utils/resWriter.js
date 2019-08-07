module.exports = function resWriter(message, code) {
  return {
    statusCode: code,
    body: JSON.stringify(message)
  };
};
