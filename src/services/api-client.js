import axios, { AxiosRequestConfig } from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://api-dev.charm-life.com/'
});
class APIClient {
  constructor(endpoint, token) {
    this.endpoint = endpoint;
    this.token = token;
  }
  post(data) {
    const config = {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : undefined,
      },
    };
    return axiosInstance.post(this.endpoint, data, config).then((response) => response.data);
  }
}
export default APIClient;
