
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/emotion_marriages/home/index.vue';
import detail from '../pages/emotion_marriages/detail/index.vue';
import result from '../pages/emotion_marriages/result/index.vue';
import order from '../pages/emotion_marriages/order/index.vue';
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
