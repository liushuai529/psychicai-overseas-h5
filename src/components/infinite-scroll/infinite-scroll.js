import Vue from 'vue';
import InfiniteScroll from './directive';

InfiniteScroll.install = function (Vue) {
  Vue.directive('InfiniteScroll', InfiniteScroll);
};

Vue.use(InfiniteScroll);
