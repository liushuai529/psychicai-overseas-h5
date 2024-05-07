/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:36:10
 * @LastEditors: wujiang
 * @LastEditTime: 2023-11-15 11:36:34
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/year_of_lucky_2024/home/index.vue';
import detail from '../pages/year_of_lucky_2024/detail/index.vue';
import result from '../pages/year_of_lucky_2024/result/index.vue';

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
