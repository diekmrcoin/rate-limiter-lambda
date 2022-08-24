class HttpResponse {
  constructor() {}

  success(body) {
    return {
      statusCode: 200,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
  badRequest(body) {
    return {
      statusCode: 400,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
  methodNotAllowed() {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
    };
  }
}

module.exports = HttpResponse;
