import axios from 'axios';
import Session from "supertokens-auth-react/recipe/session";

const baseURL = process.env.REACT_APP_RUBUS_BAKCEND_BASE_URL;

const CustomAxios = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  Session.addAxiosInterceptors(instance);

  instance.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    return Promise.reject(error);
  });

  return {
    get: (url, config = {}) => instance.get(url, config),
    post: (url, data, config = {}) => instance.post(url, data, config),
    put: (url, data, config = {}) => instance.put(url, data, config),
    patch: (url, data, config = {}) => instance.patch(url, data, config),
    delete: (url, data = {}, config = {}) => instance.delete(url, { ...{ data }, ...config }),
  };
};

export default CustomAxios;
