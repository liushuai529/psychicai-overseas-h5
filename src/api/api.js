/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-02-06 16:45:56
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-31 14:09:03
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

/**
 * @description: 正缘查询订单结果
 * @param {string} order_id 订单id
 * @return {*}
 */
export const getFateResultAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/consult_time/detail`, 'GET', data);
};



// 商品查询
export const getProductionsAPI = async (productGroup, isTarot) => {
  if(!isTarot) {
    await visitorLoginAPI();
  }
  return request(`/web/auth/trade/products/${productGroup}`, 'GET');
};


// 查询历史订单
export const getHistoryOrderAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/ce_suan`, 'GET', data);
};

// 查询塔罗订单
export const getTarotHistoryOrderAPI = async data => {
  return request(`/web/auth/master/questions/paging`, 'GET', data);
};

// 下单
export const payOrderAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/ce_suan`, 'POST', data);
};

// 正缘报告下单
export const payFateOrderAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/consult_time`, 'POST', data);
};

// 塔罗下单
export const payTarotOrderAPI = async data => {
  return request(`/web/auth/trade/orders/master/tarot`, 'POST', data);
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
    localStorage.getItem('mlxz_outer_visitor_id')
  ) {
    console.log('已登录');
    return true;
  }
  // localStorage.setItem('mlxz_get_visitor', 1);

  const res = await request('/web/login/visitor', 'POST', data);
  if (res.status !== 1000) return;
  localStorage.setItem('mlxz_outer_open_uid', res.data.open_uid);
  localStorage.setItem('mlxz_outer_access_token', res.data.access_token);
  localStorage.setItem('mlxz_outer_visitor_id', res.data.visitor_id);
  fbq('init', utils.getFbId()[utils.getFBChannel()], {'external_id': localStorage.getItem('mlxz_outer_visitor_id')|| ''});
  console.log('首次登录');

  return true;
};

// 已支付待填写子订单查询
export const getComboListAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/cesuan/combo`, 'GET', data);
};

// 已支付待填写子订单组合测算查询(附加)
export const getComboAttachAPI = async (data) => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/cesuan/combo_attach`, 'GET', data);
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
  return request(`/web/auth/trade/orders/ce_suan/recent`, 'GET', data);
};

//查询最近一笔订单get请求
export const getLastOrderGetAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/ce_suan/recent/${data}`, 'GET', data);
};

//查询最近一笔订单get请求
export const getTarotLastOrderGetAPI = async data => {
  return request(`/web/auth/master/recent/${data}`, 'GET', data);
};



//查询塔罗牌问题列表
export const getQuestionAPI = async data => {
  return request(`/web/auth/tarot/question`, 'GET', data);
};

//查询塔罗牌全部牌面数据查询
export const getGalleryAPI = async data => {
  return request(`/web/auth/tarot/gallery`, 'GET', data);
};

//塔罗牌洗牌操作
export const tarotShuffleAPI = async data => {
  return request(`/web/auth/tarot/shuffle`, 'POST', data);
};

//大师答疑订单详情查询
export const tarotQuestionsDetailAPI = async data => {
  return request(`/web/auth/master/questions/detail`, 'GET', data);
};

//塔罗用户信息（是否绑定过邮箱）
export const tarotVisitorAPI = async data => {
  return request(`/web/auth/visitor/info`, 'GET', data);
};

//塔罗用户信息（是否绑定过邮箱）
export const bindTarotEmailAPI = async data => {
  return request(`/web/auth/visitor/email`, 'POST', data);
};

//塔罗获取邮箱验证码
export const getTarotEmailCodeAPI = async data => {
  return request(`/web/email/code`, 'POST', data);
};

// 塔罗订单结果校验
export const resultTarotCheckAPI = async data => {
  return request(`/web/auth/trade/orders/verify`, 'POST', data);
};

// 上报埋点
export const sendTarotEventApi = async data => {
  return request(`/web/attribution/report/${data.order_id}`, 'POST', data);
};

// 查询塔罗支付方式
export const getTarotPayMethodsAPI = async data => {
  return request(`/web/auth/trade/pay_methods`, 'GET', data);
};

//查询折扣信息
export const getDiscountGetAPI = async data => {
  await visitorLoginAPI();
  return request(`/web/auth/trade/orders/discount/check/${data}`, 'GET', data);
};

//查询塔罗折扣信息
export const getTarotDiscountGetAPI = async data => {
  return request(`/web/auth/trade/orders/discount/check/${data}`, 'GET', data);
};





