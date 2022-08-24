const handler = require("../../src/main");
const axios = require("axios");
require("dotenv").config();
describe("e2e main suite", () => {
  it("Should fail on GET call", async () => {
    let response;
    try {
      response = await axios({
        method: "get",
        url: process.env.LAMBDA_URL,
      });
    } catch (error) {
      expect(error.response.status).toBe(405);
    }
    expect(response).toBeUndefined();
  });

  it("Should ok on POST call", async () => {
    const response = await axios({
      method: "post",
      url: process.env.LAMBDA_URL,
      data: {
        ticket: "Example test",
        description: "Example description",
        user: "Example email",
      },
    });
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
  });
});
