/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-19 11:48:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-01-04 10:11:35
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/user_agreement/index.vue';

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
