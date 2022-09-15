import axios from "axios";

export function request(config){

  const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});


// 请求拦截
instance.interceptors.request.use(
  config => {
    if (!config.headers["Authorization"]) {
      //带token
      if (localStorage.token) {
        config.headers["Authorization"] = localStorage.token;
      }
    }
    return config;
  },
  error => {
    iView.Message.error("请求超时！");
    return Promise.reject(error);
  }
);
return instance (config)
}

