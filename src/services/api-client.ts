import axios, { AxiosRequestConfig } from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://api-dev.charm-life.com/'
});
class APIClient<T> {
    endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }
  
    // GET
    get = (id: number | string, params?: Record<string, any>) => {
      const config: AxiosRequestConfig = {
        params,
      };
      return axiosInstance
        .get<T>(`${this.endpoint}/${id}`, config)
        .then((res) => res.data);
    };
  
    // POST
    post = (data: T) => {
      return axiosInstance
        .post<T>(this.endpoint, data)
        .then((response) => response.data);
    };
  
    // GET with params
    getWithParams = (params?: Record<string, any>) => {
      const config: AxiosRequestConfig = {
        params,
      };
      return axiosInstance
        .get<T>(this.endpoint, config)
        .then((res) => res.data);
    };
  }
export default APIClient;
