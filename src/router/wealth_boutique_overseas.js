import Vue from 'vue';
import Router from 'vue-router';

import index from '../pages/wealth_boutique_overseas/home/index.vue';
import detail from '../pages/wealth_boutique_overseas/detail/index.vue';
import result from '../pages/wealth_boutique_overseas/result/index.vue';

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
