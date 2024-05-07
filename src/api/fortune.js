/*
 * @Author: ZhaoZhiqi
 * @Date: 2022-12-14 18:08:23
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-04-17 17:47:54
 * @Description: 运势API
 * @FilePath: \find-future-overseas\src\api\fortune.js
 */
import request from "./request";

/**
 * @description: 邮箱注册
 * @param {string} birth_date 出生日期 ,
 * @param {number} birth_time 出生时间，未知是 -1 ,
 * @param {string} email 邮箱 ,
 * @param {string} email_code 验证码 ,
 * @param {number} leap_month 是否是闰月, 1是, 0否 ,
 * @param {number} normal 1 公历 0 农历 ,
 * @param {string} real_name 姓名 ,
 * @param {number} sex 1 男 0 女
 * @return {*}
 */
export const registerAPI = (data) => {
    return request('/h5/login/email', 'POST', data)
}

/**
 * @description: 邮箱登录
 * @param {string} email 邮箱 ,
 * @param {string} email_code 验证码 ,
 * @return {*}
 */
export const loginAPI = (data) => {
    return request('/h5/login/email/only', 'POST', data)
}

/**
 * @description: 邮箱验证码
 * @param {string} email 邮箱 ,
 * @return {*}
 */
export const getVercodeAPI = (data) => {
    return request('/h5/email/code', 'POST', data)
}

/**
 * @description: 查询运势商品
 * @return {*}
 */
export const getFortuneGoodsListAPI = (data) => {
    return request('/h5/product/fortune', 'GET', data)
}

/**
 * @description: 查询运势信息
 * @return {*}
 */
export const getFortuneAPI = (data) => {
    return request('/h5/auth/fortune/base', 'GET', data)
}

/**
 * @description: 查询用户信息
 * @return {*}
 */
export const getUserInfoAPI = (data) => {
    return request('/h5/auth/user/info', 'GET', data)
}

/**
 * @description: 传入uuid注册
 * @return {*}
 */
export const registerByUUIDAPI  = (data) => {
    return request('/h5/login/device/register_login', 'POST', data)
}

/**
 * @description: 更新用户信息
 * @return {*}
 */
export const updateUserInfoAPI = (data) => {
    return request('/h5/auth/user/info', 'POST', data)
}