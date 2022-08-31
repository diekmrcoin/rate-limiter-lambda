class HttpResponse {
  constructor() {}

  success(body) {
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
  badRequest(message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: message }),
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
  methodNotAllowed(method) {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: `The method ${method} is not allowed` }),
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
  tooManyRequest() {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: "Too many requests" }),
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
  internalServerError(message) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message || "Internal server error" }),
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
}

module.exports = HttpResponse;
