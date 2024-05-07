/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-19 11:48:01
 * @LastEditors: wujiang
 * @LastEditTime: 2023-10-19 11:49:25
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/career_divination_overseas/home/index.vue';
import detail from '../pages/career_divination_overseas/detail/index.vue';
import result from '../pages/career_divination_overseas/result/index.vue';

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
