/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-04-09 14:58:43
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-15 18:07:26
 * @Description: 外部签名
 */
import crypto from 'crypto';
import utils from '../libs/utils';
const { getRequestParams, getUp, getLanguage } = utils;

let isAndroid = utils.isAndroid();

/**
 * @description: 签名
 * @param {*} config
 * @return {*}
 */
export const getAppSign = config => {
  let app_sign = '';
  let app_secret = 'b5d3b66b99390dd5f0895cb21156a8b9';
  let { method = 'GET', url, params = {}, data } = config;
  method = method.toUpperCase();
  // url参数排序
  let keys = [];
  for (let key in params) {
    keys.push(key);
  }
  keys = keys.sort((x, y) => (x > y ? 1 : x < y ? -1 : 0));

  // 拼接重新排好的参数
  let keysStr = '';
  keys.forEach((item, index) => {
    let value = params[item];
    keysStr += `${item}=${value}&`;
  });

  keysStr = keysStr.slice(0, keysStr.length - 1);

  // 拼接字符串 XXX#XXX#XXX
  let bodyStr = JSON.stringify(data);
  let str = `${method}#/psychicai${url}#${keysStr}`;
  method === 'POST' && data && (str += `#${bodyStr}`);
  str = str + `#${app_secret}`;
  // MD5加密
  let sf = crypto.createHash('md5');
  sf.update(str);
  app_sign = sf.digest('hex');
  return app_sign;
};

/**
 * @description: 拼接url公共参数
 * @param {*} config
 * @return {*}
 */
export const addOutParams = config => {
  config.params = config.params || {};
  config.params.app_key = 20002003;
  config.params.app_ts = new Date().getTime();
  config.params.app_nonce = utils.generateUUID();
  config.params.open_uid = localStorage.getItem('mlxz_outer_open_uid') || '';
  config.params.access_token =
    localStorage.getItem('mlxz_outer_access_token') || '';
  config.params.language = utils.getLanguage();
  config.params.channel = utils.getFBChannel() ? utils.getFBChannel() : '';
  config.params.os = utils.isIos() ? 'IPHONE' : utils.isAndroid()? 'ANDROID': '';
  config.params.device_id = utils.getDeviceId();
  config.params.area_code = utils.getTWChannel()['area_code'] 
  config.params.iso_code = utils.getTWChannel()['iso_code']
  config.params.app_sign = getAppSign(config);

  return config;
};
