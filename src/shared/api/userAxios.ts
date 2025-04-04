import axios from 'axios';

const userAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

userAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('blink-it-token') ?? '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default userAxios;
