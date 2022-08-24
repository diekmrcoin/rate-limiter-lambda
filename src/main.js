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
    return httpResponse.methodNotAllowed();
  }
  const sourceIp = getRequesterIp(event);
  const allowed = await limiter.consume(`default-${sourceIp}`);
  if (!allowed) {
    console.log(`Ip ${sourceIp} blocked`);
    return httpResponse.tooManyRequest();
  }
  try {
    const response = await proxyData(getBody(event));
    console.log("Resolved ok");
    return httpResponse.success({ msg: response });
  } catch (err) {
    console.log("Resolved ko");
    return httpResponse.internalServerError();
  }
};

async function proxyData(body) {
  return new Promise((resolve, reject) => {
    return axios({
      method: "post",
      url: process.env.REMOTE_URL,
      data: JSON.parse(body),
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log("ERROR:", JSON.stringify(error, null, 2));
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
