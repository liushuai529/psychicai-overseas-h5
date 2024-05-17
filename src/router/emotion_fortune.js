/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-12 14:10:43
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-17 11:29:19
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
