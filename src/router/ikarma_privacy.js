/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-10 15:52:32
 * @LastEditors: wujiang
 * @LastEditTime: 2024-01-10 15:55:10
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/ikarma_privacy/index.vue';

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
