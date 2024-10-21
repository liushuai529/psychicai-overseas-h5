/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 18:55:15
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-07 18:55:15
 * @Description:
 */
import axios from 'axios';
import { testBaseURL, prodBaseURL, devBaseUrl } from './baseURL';
import { Toast, Indicator } from 'mint-ui';
import utils from '../libs/utils';
import { addOutParams } from './outer_sign';

let baseURL;
let originUrl = window.location.href;

const projectEnv = env => {
  return originUrl.indexOf(env) > -1 ? true : false;
};
if (projectEnv('192.168') || projectEnv('172.19') || projectEnv('10.') || projectEnv('localhost')) {
  baseURL = devBaseUrl;
} else if (projectEnv('test')) {
  baseURL = testBaseURL;
} else {
  baseURL = prodBaseURL;
}

const service = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 60000, // 超时时间
});
service.interceptors.request.use(config => {
  config = addOutParams(config);
  return config;
});

service.interceptors.response.use(res => {
  return res.data;
});

/**
 * @description: 请求接口
 * @param {string} url
 * @param {Method} method
 * @param {object} data
 * @return {*}
 */
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    let params = Object.assign({}, method === 'GET' ? data : {});
    let options = {
      method: method,
      url: url,
      params: params,
    };

    if (method === 'POST') {
      options.data = data;
    }

    service(options)
      .then(res => {
        if (res.status === 1000) {
          resolve(res);
        } else {
          Toast(res.desc);
          Indicator.close();
          reject(res);
        }
      })
      .catch(err => {
        if (err && err.code === 1008) {
          Indicator.close();
        } else {
          if(err === 'Network Error') {
          } else {
            Toast(err);
          }
          Indicator.close();
          reject(err);
        }
      });
  });
};

export default request;
