<template>
  <div class="card-list">
    <div class="item" v-for="item in is_async? card_list: list">
      <img class="card-img" :src="is_async?item.image_url: item.card.image_url" />
      <div class="card-tag">
        <img class="icon-img" src="../../../assets/img/tarot/right-icon.webp" />
        <div class="img-bg">{{ `${is_async?item.card_name: item.card.name_cn} ${item.upright? '正': '逆'}` }}</div>
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

  components: {
  },

  props: {
    is_async: {
      default: '',
    },
    card_list: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      list: []
    };
  },
  computed: {

  },
  methods: {
    //监听localStorage数据变化
    startWatching(key) {
      setInterval(() => {
        const currentStorage = JSON.parse(localStorage.getItem(key)) || {};
        if (JSON.stringify(this.storage) !== JSON.stringify(currentStorage)) {
          this.storage = currentStorage;
          this.localStorageChanged();
        }
      }, 1000);
    },
    localStorageChanged() {
      if(localStorage.getItem('selected_card_list')) {
        this.list = JSON.parse(localStorage.getItem('selected_card_list'))
      }
    }
  },
  watch: {},

  mounted() {
    console.log('is_async', this.is_async)
    if(this.is_async) {
     
    } else {
      this.startWatching('selected_card_list');
    }
    
  },

};
</script>

<style scoped lang="less">
.card-list {
  width: 7.02rem;
  // width: 100%;
  // height: 3.1rem;
  display: flex;
  justify-content: space-between;
  padding-left: 0.62rem;
  padding-right: 0.62rem;
  padding-top: 0.3rem;

  .item {
    display: flex;
    flex-direction: column;
    // width: 100%; //固定卡片的宽度，tag字数过多UI会异常
    height: 100%;
    align-items: center;

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
        width: 100%;
      }
    }
  }
}
</style>
