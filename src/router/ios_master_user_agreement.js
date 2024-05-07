/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-19 11:48:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-03-19 14:47:38
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/ios_master_user_agreement/index.vue';

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
