/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:28
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-09 15:23:40
 * @Description: api参数  签名
 */
import crypto from 'crypto';
import utils from '../libs/utils';
const { getRequestParams, getLanguage } = utils;

let isAndroid = utils.isAndroid();

/**
 * @description: 签名
 * @param {*} config
 * @return {*}
 */
export const getAppSign = config => {
  let app_sign = '';
  let app_secret = getRequestParams('app_secret') || '';
  let { method = 'GET', url, params = {}, data = {} } = config;
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

  method === 'POST' && (str += `#${bodyStr}`);
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
export const addParams = config => {
  config.params = config.params || {};
  config.params.app_key = isAndroid ? 20002001 : 20002002;
  config.params.app_ts = new Date().getTime();
  config.params.app_nonce = utils.generateUUID();
  config.params.open_uid = getRequestParams('open_uid') || '';
  config.params.access_token = getRequestParams('access_token') || '';
  config.params.up = getRequestParams('up')
    ? getRequestParams('up')
    : getRequestParams('os')
    ? getRequestParams('os').toUpperCase()
    : '';
  config.params.channel = getRequestParams('channel') || '';
  config.params.ver_code = getRequestParams('ver_code') || '';
  config.params.ver_name = getRequestParams('ver_name') || '';
  config.params.pkg = getRequestParams('pkg') || '';
  config.params.device_id = getRequestParams('device_id') || '';
  config.params.df_id = getRequestParams('df_id') || '';
  config.params.osv = getRequestParams('osv') || '';
  config.params.os = getRequestParams('os') || '';
  config.params.vendor = getRequestParams('vendor') || '';
  config.params.model = getRequestParams('model') || '';
  config.params.gid = getRequestParams('gid') || '';
  config.params.oaid = getRequestParams('oaid') || '';
  config.params.imei = getRequestParams('imei') || '';
  config.params.android_id = getRequestParams('android_id') || '';
  config.params.idfa = getRequestParams('idfa') || '';
  config.params.mac = getRequestParams('mac') || '';
  config.params.language = getLanguage();
  config.params.ad_channel = getRequestParams('ad_channel') || '';
  config.params.app_sign = getAppSign(config);
  return config;
};
