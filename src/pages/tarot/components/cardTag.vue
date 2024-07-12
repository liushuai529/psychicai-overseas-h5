
<template>
  <div class="card-tag">
    <img class="icon-img" src="../../../assets/img/tarot/left-icon.webp"/>
    <div class="img-bg"></div>
    <img src="../../../assets/img/tarot/right-icon.webp"/>
  </div>
</template>

<script>
import utils from '../../../libs/utils';


export default {
  name: 'CardTag',
  props: {
   
    name: {
      type: String,
      default: '',
    },

    
  },
  components: {
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
.card-tag {
  height: 0.36rem;
  display: flex;
  .icon-img {
    width: 0.24rem;
    height: 0.36rem;
  }
  .img-bg {
    height: 0.24rem;
    font-size: 0.24rem;
    color: #FFFFFF;
    background-image: url('../../../assets/img/tarot/tag-bg.webp');
  }
  
}
</style>
