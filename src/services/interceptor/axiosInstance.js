import axios from "axios";
import { setupInterceptors } from "./interceptor";

const apiInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(apiInstance);

export default apiInstance;
