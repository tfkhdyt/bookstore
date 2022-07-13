import axios from 'axios';

const ENV_MODE = process.env.NEXT_PUBLIC_ENV_MODE;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: ENV_MODE === 'development' ? 'http://localhost:8080' : API_URL,
});
