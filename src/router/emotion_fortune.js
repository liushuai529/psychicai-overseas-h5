/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-22 10:10:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-22 15:39:14
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from './../pages/emotion_fortune/home/index.vue';
import detail from './../pages/emotion_fortune/detail/index.vue';
import result from './../pages/emotion_fortune/result/index.vue';
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
