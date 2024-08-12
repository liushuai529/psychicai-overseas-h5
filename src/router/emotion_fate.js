
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/emotion_fate/home/index.vue';
import detail from '../pages/emotion_fate/detail/index.vue';
import result from '../pages/emotion_fate/result/index.vue';
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
