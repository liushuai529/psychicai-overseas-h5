/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-02-06 16:45:56
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-30 20:16:12
 * @Description:
 */
export * from './fortune';
export * from './combine';
import request from './request';
import utils from '../libs/utils';

/**
 * @description: 查询测算商品列表
 * @param {string} id 商品id
 * @return {*}
 */
export const getGoodsListAPI = data => {
  return request('/h5/product/cesuan', 'GET', data);
};

/**
 * @description: 下单
 * @param {string} pay_channel 支付方式
 * @param {string} good_id 商品id
 * @param {string} callback_url 回调地址
 * @param {string} extra 测算信息
 * @return {*}
 */
export const orderAPI = data => {
  return request('/h5/auth/order', 'POST', data);
};

/**
 * @description: 查询订单列表
 * @return {*}
 */
export const getOrderListAPI = data => {
  return request(`/h5/auth/order`, 'GET', data);
};

/**
 * @description: 事件上报
 * @return {*}
 */
export const eventReportAPI = data => {
  return request(`/h5/event/report`, 'POST', data);
};

// 命里寻真

/**
 * @description: 查询订单结果
 * @param {string} order_id 订单id
 * @return {*}
 */
export const getResultAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/${data.order_id}`, 'GET', data);
};

// 商品查询
export const getProductionsAPI = async productGroup => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/products/${productGroup}`, 'GET');
};

// 查询历史订单
export const getHistoryOrderAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/ce_suan`, 'GET', data);
};

// 下单
export const payOrderAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/ce_suan`, 'POST', data);
};

// 查询已支付订单填充信息
export const getPayOrderInfoAPI = async (order_id, data) => {
  await visitorLoginAPI();

  return request(
    `/web/auth/trade/orders/contract/cesuan/${order_id}`,
    'POST',
    data
  );
};

// 订单结果校验
export const resultCheckAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/verify`, 'POST', data);
};

// 查询八字
export const getBaziAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/bazi/info`, 'GET', data);
};

// 查询支付方式
export const getPayMethodsAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/pay_methods`, 'GET', data);
};

// 查询八字合婚信息
export const getBazihehunAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/bazi/hehun`, 'POST', data);
};

// 游客注册登录
export const visitorLoginAPI = async data => {
  if (
    localStorage.getItem('mlxz_outer_open_uid') ||
    localStorage.getItem('mlxz_outer_access_token') ||
    localStorage.getItem('mlxz_outer_visitor_id') ||
    localStorage.getItem('mlxz_get_visitor')
  ) {
    console.log('已登录');
    return true;
  }
  localStorage.setItem('mlxz_get_visitor', 1);

  const res = await request('/web/login/visitor', 'POST', data);
  if (res.status !== 1000) return;
  localStorage.setItem('mlxz_outer_open_uid', res.data.open_uid);
  localStorage.setItem('mlxz_outer_access_token', res.data.access_token);
  localStorage.setItem('mlxz_outer_visitor_id', res.data.visitor_id);
  console.log('首次登录');

  return true;
};

// 已支付待填写子订单查询
export const getComboListAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/cesuan/combo`, 'GET', data);
};

// 事件上报
export const reportEventAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/event/report`, 'POST', data);
};

// 埋点事件上报
export const reportBuryingEventAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/event/report_burying`, 'POST', data);
};

// 排序事件
export const sortByEvent = async data => {
  await visitorLoginAPI();
  return request(`/web/event/products/sort`, 'GET', data);
};

// 校验是否上报了埋点
export const checkSendEventApi = async data => {
  await visitorLoginAPI();
  return request(`/web/attribution/report/${data.order_id}`, 'GET', data);
};

// 上报埋点
export const sendEventApi = async data => {
  await visitorLoginAPI();
  return request(`/web/attribution/report/${data.order_id}`, 'POST', data);
};

// 测算商品排序
export const sortProductsAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/event/products/sort`, 'GET', data);
};

// 查询最近一笔订单
export const getLastOrderAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/ce_suan/recent`, 'POST', data);
};
