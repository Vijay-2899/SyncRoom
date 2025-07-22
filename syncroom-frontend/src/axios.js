// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://syncroom-backend.onrender.com', // ✅ your Render backend URL
});

export default instance;
