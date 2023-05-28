import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const myAxios = axios.create({
  baseURL: process.env.AUTH_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});
