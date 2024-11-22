const { default: axios } = require("axios");

class HttpRequest {
  static async get(endpoint, payload) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/${endpoint}`,
        {
          params: {
            ...payload,
          },
        }
      );

      return response?.data;
    } catch (e) {
      console.error(e);
      return e.response?.error;
    }
  }
}

export default HttpRequest;
