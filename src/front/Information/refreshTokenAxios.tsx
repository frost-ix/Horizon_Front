import axios from 'axios';
const refreshTokenAxiosConfig = axios.create();

refreshTokenAxiosConfig.interceptors.request.use(
  function(config) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      config.headers.Authorization = refreshToken;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);


export default refreshTokenAxiosConfig;