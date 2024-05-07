/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-19 11:48:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-17 10:08:37
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/consultantEntryManage/consultantEntryManage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
