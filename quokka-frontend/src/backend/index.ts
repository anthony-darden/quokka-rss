import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const backend = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
