import axios from "axios";
import { setupInterceptors } from "./interceptor";

const apiInstance = axios.create({
  baseURL: "http://98.84.176.210:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(apiInstance);

export default apiInstance;
