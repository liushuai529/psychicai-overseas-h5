/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 13:51:13
 * @LastEditors: wujiang
 * @LastEditTime: 2023-10-30 10:27:48
 * @Description:2024年财运
 */
import Vue from 'vue';
import Router from 'vue-router';

import index from '../pages/tarot/home/index.vue';
import read from '../pages/tarot/read/index.vue';
import detail from '../pages/tarot/detail/index.vue';
import result from '../pages/tarot/result/index.vue';
import order from '../pages/tarot/order/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/read',
      name: 'read',
      component: read,
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
    },
    {
      path: '/result',
      name: 'result',
      component: result,
    },
    {
      path: '/order',
      name: 'order',
      component: order,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
