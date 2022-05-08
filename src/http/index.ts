// http/index.js
import axios from "axios";
//创建axios的一个实例
var instance = axios.create({
  baseURL: "http://localhost:8080", //接口统一域名
  timeout: 6000, //设置超时
  headers: {
    "Content-Type": "application/json;charset=UTF-8;",
  },
});

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === "POST") {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) =>
    // 对请求错误做些什么
    Promise.reject(error)
);

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    //响应成功
    return response.data;
  },
  (error) => {
    console.log(error);
    //响应错误
    if (error.response && error.response.status) {
      let message;
      const status = error.response.status;
      switch (status) {
        case 400:
          message = "请求错误";
          break;
        case 401:
          message = "请求错误";
          break;
        case 404:
          message = "请求地址出错";
          break;
        case 408:
          message = "请求超时";
          break;
        case 500:
          message = "服务器内部错误!";
          break;
        case 501:
          message = "服务未实现!";
          break;
        case 502:
          message = "网关错误!";
          break;
        case 503:
          message = "服务不可用!";
          break;
        case 504:
          message = "网关超时!";
          break;
        case 505:
          message = "HTTP版本不受支持";
          break;
        default:
          message = "请求失败";
      }
      console.error(message);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
