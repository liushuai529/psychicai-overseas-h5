/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang
 * @LastEditTime: 2023-10-23 17:37:53
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/marriage_measure_overseas/home/index.vue';
import detail from '../pages/marriage_measure_overseas/detail/index.vue';
import result from '../pages/marriage_measure_overseas/result/index.vue';

Vue.use(Router);

const router = new Router({
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

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
	console.log('前置路由守卫',to,from)
	next()
})

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
// router.afterEach((to,from)=>{
// 	console.log('后置路由守卫',to,from)
// 	document.title = to.meta.title || '硅谷系统'//修改网页标题
// })

export default router
