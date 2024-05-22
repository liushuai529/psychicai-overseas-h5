/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-22 10:10:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-22 10:10:40
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from './../pages/emotion_fortune_v2/home/index.vue';
import detail from './../pages/emotion_fortune_v2/detail/index.vue';
import result from './../pages/emotion_fortune_v2/result/index.vue';
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
