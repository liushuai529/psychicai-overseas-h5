/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-01 10:59:17
 * @LastEditors: wujiang
 * @LastEditTime: 2023-11-10 18:44:09
 * @Description:
 */
import { getProductionsAPI } from '../api/api';

export const getProductions = async () => {
  const res = await getProductionsAPI('ceh5');
  if (res.status === 1000) {
    return res.data;
  }
};
