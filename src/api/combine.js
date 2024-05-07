/*
 * @Author: ZhaoZhiqi
 * @Date: 2023-05-15 16:28:42
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-05-17 13:38:45
 * @Description: 组合测算
 * @FilePath: \find-future-overseas\src\api\combine.js
 */
import request from "./request";

/**
 * @description: 查询组合商品
 * @return {*}
 */
export const getCombineGoodsListAPI = (data) => {
    return request("/h5/product/combine_cesuan", "GET", data);
};

/**
 * @description: 查询组合测算订单
 * @return {*}
 */
export const getCombineOrderAPI = (data) => {
    return request("/h5/combine_cesuan", "GET", data);
};