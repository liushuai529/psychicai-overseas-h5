import Vue from 'vue';
import Router from 'vue-router';
import order from '../pages/recall/order/index.vue';
import utils from '../libs/utils';


Vue.use(Router);



export default new Router({
  routes: [
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
