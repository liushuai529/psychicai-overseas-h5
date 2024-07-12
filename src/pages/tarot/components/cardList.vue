
<template>
  <div class="card-list">
    <div class="item" >
      <img class="card-img" src="../../../assets/img/tarot/paimian.webp"/>
      
    </div>
    <div class="item" >
      <img class="card-img" src="../../../assets/img/tarot/paimian.webp"/>
     
    </div>
    <div class="item" >
      <img class="card-img" src="../../../assets/img/tarot/paimian.webp"/>
     
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';

const tipsArr1 = {
  'zh-CN': '优惠倒计时',
  'zh-TW': '優惠倒計時',
};
export default {
  name: 'CardList',
  props: {
   
    list: {
      type: Array,
      default: () => [1,2,3],
    },

    
  },
  components: {
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
    filterTime(val_) {
      let val = val_.toString();
      if (val.length === 1) {
        return '0' + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  watch: {},
  mounted() {},
  methods: {
    
  },
};
</script>

<style scoped lang="less">
.card-list {
  width: 7.5rem;
  height: 3.1rem;
  display: flex;
  justify-content: space-between;
  padding-left: 0.86rem;
  padding-right: 0.86rem;
  .item {
    display: flex;
    flex-direction: column;
    height: 100%;
   
    .card-img {
      width: 1.44rem;
      height: 2.46rem;
    }
    
  }
}
</style>
