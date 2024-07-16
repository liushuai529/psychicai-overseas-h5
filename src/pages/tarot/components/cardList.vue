<template>
  <div class="card-list">
    <div class="item">
      <img class="card-img" src="../../../assets/img/tarot/paimian.webp" />
      <div class="card-tag">
        <img class="icon-img" src="../../../assets/img/tarot/right-icon.webp" />
        <div class="img-bg">战车 正</div>
        <img class="icon-img" src="../../../assets/img/tarot/left-icon.webp" />
      </div>
    </div>
    <div class="item">
      <img class="card-img" src="../../../assets/img/tarot/paimian.webp" />
      <div class="card-tag">
        <img class="icon-img" src="../../../assets/img/tarot/right-icon.webp" />
        <div class="img-bg">战车 正</div>
        <img class="icon-img" src="../../../assets/img/tarot/left-icon.webp" />
      </div>
    </div>
    <div class="item">
      <img class="card-img" src="../../../assets/img/tarot/paimian.webp" />
      <div class="card-tag">
        <img class="icon-img" src="../../../assets/img/tarot/right-icon.webp" />
        <div class="img-bg">战车 正</div>
        <img class="icon-img" src="../../../assets/img/tarot/left-icon.webp" />
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils';


export default {
  components: {},
  name: 'CardList',
  props: {

    list: {
      type: Array,
      default: () => [1, 2, 3],
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
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
.card-list {
  // width: 7.5rem;
  width: 100%;
  height: 3.1rem;
  display: flex;
  justify-content: space-between;
  padding-left: 0.62rem;
  padding-right: 0.62rem;

  .item {
    display: flex;
    flex-direction: column;
    height: 100%;

    .card-img {
      width: 1.44rem;
      height: 2.46rem;
    }

    .card-tag {
      height: 0.36rem;
      display: flex;
      margin-top: 0.3rem;

      .icon-img {
        width: 0.24rem;
        height: 0.36rem;
      }

      .img-bg {
        background-image: url('../../../assets/img/tarot/tag-bg.webp');
        font-weight: 600;
        font-size: 0.24rem;
        color: #FFFFFF;
        line-height: 0.24rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.06rem;
        padding-bottom: 0.06rem;
      }

    }

  }
}
</style>
