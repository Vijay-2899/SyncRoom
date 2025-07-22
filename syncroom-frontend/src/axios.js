import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://syncroom-backend.onrender.com', // <-- your backend URL
});

export default instance;
