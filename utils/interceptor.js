import axios from "axios";
import storage from "../auth/storage";

// Step-1: Create a new Axios instance with a custom config.
const customAxios = axios.create({
  baseURL: `http://192.168.1.108:5000/api/v1`,
  timeout: 10000
});

// Step-2: Create request, response & error handlers
const requestHandler = async (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  request.headers.Authorization = `Bearer ${await storage.getToken()}`;
  return request;
};

const errorHandler = (error) => {
  console.log(error);
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

export default customAxios;
