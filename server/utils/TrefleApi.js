require("dotenv").config();

class TrefleApi {
  constructor() {
    this.url = "https://trefle.io/api/v1/";
    this.key = process.env.TREFLE_TOKEN;
  }

  async getSomePlants(page) {
    try {
      const response = await fetch(
        `${this.url}/plants?token=${this.key}&page=${page}`
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.err({ message: err });
    }
  }
}

module.exports = TrefleApi;
