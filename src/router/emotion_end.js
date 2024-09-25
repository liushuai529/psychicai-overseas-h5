
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/emotion_end/home/index.vue';
import detail from '../pages/emotion_end/detail/index.vue';
import result from '../pages/emotion_end/result/index.vue';
import order from '../pages/emotion_end/order/index.vue';
import {getBaseInfoAPI} from '../api/api';
Vue.use(Router);

const checkCurrentCountry = async (callback) => {
  if (localStorage.getItem('current_country')) {
    callback && callback();
  } else {
    callback && callback(); 
    setTimeout(async () => {
      const res = await getBaseInfoAPI();
      if (res.status !== 1000) return;
      localStorage.setItem('current_country', JSON.stringify({area_code: res.data.current_country.code, iso_code: res.data.current_country.iso_code}))
    }, 3000);
  }
 
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      beforeEnter: (to, from, next) => {
        checkCurrentCountry(next)
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      beforeEnter: (to, from, next) => {
        checkCurrentCountry(next)
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      beforeEnter: (to, from, next) => {
        checkCurrentCountry(next)
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      beforeEnter: (to, from, next) => {
        checkCurrentCountry(next)
      }
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
