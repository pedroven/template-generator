import axios from "axios";
import { useAuth } from "../hooks/auth";
require("dotenv").config();

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});

api.interceptors.request.use(async config => {
  const { getToken } = useAuth();
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
