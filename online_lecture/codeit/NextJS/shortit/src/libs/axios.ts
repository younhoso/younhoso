import baseAxios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axios = baseAxios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
