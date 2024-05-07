/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang
 * @LastEditTime: 2023-10-23 17:26:06
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/marriage_divination_overseas/home/index.vue';
import detail from '../pages/marriage_divination_overseas/detail/index.vue';
import result from '../pages/marriage_divination_overseas/result/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
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
      path: '*',
      redirect: '/',
    },
  ],
});
