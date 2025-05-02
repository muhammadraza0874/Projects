function makeResponse(data, message, status_code) {
  var response = data;
  response = {
    Status: status_code,
    Message: message,
    Data: data ? data : [],
  };

  return response;
}

module.exports = {
  makeResponse,
};
