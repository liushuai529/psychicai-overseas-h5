/*
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-25 16:40:26
 * @LastEditors: wujiang
 * @LastEditTime: 2023-11-15 10:23:36
 * @Description: 游客登录接口
 */
import axios from 'axios';
import { devBaseUrl, testBaseURL, prodBaseURL } from './baseURL';
import { addParams } from './sign';
import { Toast } from 'mint-ui';

let baseURL;
let originUrl = window.location.href;

const projectEnv = env => {
  return originUrl.indexOf(env) > -1 ? true : false;
};
if (projectEnv('192.168') || projectEnv('localhost')) {
  baseURL = devBaseUrl;
} else if (projectEnv('test')) {
  baseURL = testBaseURL;
} else {
  baseURL = prodBaseURL;
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 60000, // 请求超時時间
});

instance.interceptors.response.use(config => {
  return config.data;
});

/**
 * @description: 游客登录
 * @return {*}
 */
const loginAPI = () => {
  return new Promise((resolve, reject) => {
    let params = addParams({
      method: 'POST',
      url: '/h5/login/visitor',
      params: {},
      data: {},
    });

    instance(params)
      .then(res => {
        console.log('login', res.data);
        if (res.status === 1000) {
          // 存储token作为游客唯一标识
          localStorage.setItem('suishen_overseas_token', res.data.access_token);
          localStorage.setItem('suishen_overseas_open_uid', res.data.open_uid);

          resolve(res);
        } else {
          Toast(res);
          reject(res);
        }
      })
      .catch(err => {
        console.log('login err', err);
        Toast(err);
        reject(err);
      });
  });
};

/**
 * @description: 地区初始化
 * @return {*}
 */
const init = () => {
  let params = addParams({
    method: 'GET',
    url: '/h5/init/info',
    params: {},
    data: {},
  });
  instance(params)
    .then(res => {
      if (res.status === 1000) {
        let { country_code } = res.data;
        localStorage.setItem('suishen_overseas_country_code', country_code);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export default () => {
  let token = localStorage.getItem('suishen_overseas_token');
  let open_uid = localStorage.getItem('suishen_overseas_open_uid');
  let uid = localStorage.getItem('suishen_overseas_uid');

  // 已注册登录
  if (uid && token && open_uid) {
    return Promise.resolve('isLogin');
  }
  // 游客
  else if (token && open_uid) {
    return Promise.resolve('noLogin');
  }
  // 无游客身份
  else {
    init();
    return loginAPI();
  }
};
