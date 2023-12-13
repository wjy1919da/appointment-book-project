import axios, { AxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: "https://api-dev.charm-life.com/",
  // baseURL: "http://localhost:8080/",
});

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  post(data) {
    const token = this.getToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
    return axiosInstance
      .post(this.endpoint, data, config)
      .then((response) => response);
  }

  get(params) {
    const token = this.getToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      params,
    };
    return axiosInstance
      .get(this.endpoint, config)
      .then((response) => response);
  }

  delete(postId) {
    const token = this.getToken();
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
    return axiosInstance
      .delete(`${this.endpoint}/${postId}`, config)
      .then((response) => response);
  }
}

export default APIClient;
