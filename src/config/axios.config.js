import axios from "axios";

const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: 1000,
});

export default request;
