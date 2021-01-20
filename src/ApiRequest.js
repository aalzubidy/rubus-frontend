import axios from 'axios';

const baseURL = 'http://localhost:3030';

const Api = (token) => {
  const defaultOptions = {
    baseURL,
    headers: {
      token
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.response.use(function (response) {
    return response.data.data;
  }, function (error) {
    return Promise.reject(error);
  });

  return {
    get: (url) => instance.get(url),
    post: (url, data) => instance.post(url, data),
    put: (url, data) => instance.put(url, data),
    delete: (url) => instance.delete(url),
  };
};

export default Api;
