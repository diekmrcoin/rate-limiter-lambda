const axios = require("axios");
require("dotenv").config();
const RateLimiter = require("./rate-limiter");
const HttpResponse = require("./http-response");
const httpResponse = new HttpResponse();
const limiter = new RateLimiter();

// Lambda default handler export
exports.handler = async function (event, context) {
  const method = getMethod(event);
  if (method !== "POST") {
    console.log(`Bad method ${method}`);
    return httpResponse.methodNotAllowed(method);
  }
  const sourceIp = getRequesterIp(event);
  const allowed = await limiter.consume(`default-${sourceIp}`);
  if (!allowed) {
    console.log(`Ip ${sourceIp} blocked`);
    return httpResponse.tooManyRequest();
  }
  const body = getBody(event);
  if (!body) throw httpResponse.badRequest("Body is empty");
  try {
    const response = await proxyData(body);
    console.log("Resolved ok");
    return httpResponse.success({ msg: response });
  } catch (err) {
    console.log("Resolved ko");
    console.log("Body used: ", JSON.stringify(body, null, 2));
    return httpResponse.internalServerError("Error calling the form receiver");
  }
};

async function proxyData(body) {
  let bodyParsed = JSON.parse(body);
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: process.env.REMOTE_URL,
      data: bodyParsed,
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Request made and server responded");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("The request was made but no response was received");
          console.log(error.request);
        } else {
          console.log("Error:", error.message);
        }
        reject(error);
      });
  });
}

function getRequesterIp(event) {
  return event.requestContext.http.sourceIp;
}

function getMethod(event) {
  return event.requestContext.http.method;
}
function getBody(event) {
  return event.body;
}
