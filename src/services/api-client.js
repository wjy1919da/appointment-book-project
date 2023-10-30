import axios, { AxiosRequestConfig } from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://api-dev.charm-life.com/'
   //baseURL: 'http://localhost:8080/'
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
    return axiosInstance.post(this.endpoint, data, config).then((response) => response);
  }
  get(params) {
    const config = {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : undefined,
      },
      params,
    };
    return axiosInstance.get(this.endpoint, config).then((response) => response);
  } 
}
export default APIClient;
