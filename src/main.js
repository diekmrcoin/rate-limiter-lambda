// const axios = require("axios");

const HttpResponse = require("./http-response");
const httpResponse = new HttpResponse();

// Lambda default handler export
exports.handler = async function (event, context) {
  const method = getMethod(event);
  if (method !== "POST") {
    // TODO: only in prod
    // return httpResponse.methodNotAllowed();
  }
  const sourceIp = getRequesterIp(event);
  return httpResponse.success({ msg: sourceIp });
};

function getRequesterIp(event) {
  return event.requestContext.http.sourceIp;
}

function getMethod(event) {
  return event.requestContext.http.method;
}
