import axios from "axios";

const API = axios.create({
  baseURL: "http://backend:8000/api",
});

export default API;