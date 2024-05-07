/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-19 11:48:01
 * @LastEditors: wujiang
 * @LastEditTime: 2023-11-10 15:25:32
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/weigh_bone/home/index.vue';
import detail from '../pages/weigh_bone/detail/index.vue';
import result from '../pages/weigh_bone/result/index.vue';

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
