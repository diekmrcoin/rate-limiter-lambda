const { RateLimiterMemory } = require("rate-limiter-flexible");

class RateLimiter {
  constructor() {
    this.options = {
      points: 2, // 2 points
      duration: 60, // seconds
      blockDuration: 30, // seconds
    };
    this.limiter = new RateLimiterMemory(this.options);
  }
  async consume(id) {
    return new Promise((resolve) => {
      this.limiter
        .consume(id, 1)
        .then((rateLimiterRes) => {
          resolve(true);
        })
        .catch((rateLimiterRes) => {
          resolve(false);
        });
    });
  }
}

module.exports = RateLimiter;
