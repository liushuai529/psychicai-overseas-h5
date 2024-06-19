<template>
  <div>
    <mt-popup
      v-model="popupVisible"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div class="group-popup">
        <div class="group-header">
          <div class="group-title">
            请选择商品组合<span>需选择{{ maxNum }}个商品</span>
          </div>
          <div class="group-close" @click="close">
            <img src="../assets/img/index2/pay-close.webp" />
          </div>
        </div>
        <div class="group-wrapper">
          <div
            class="group-item"
            :class="{ active: item.check, disable: canConfirm && !item.check }"
            v-for="(item, index) in list"
            @click="check(item)"
          >
            <div class="img" :class="[getProdImg(item.item_id)]"></div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
        <div
          class="group-btn"
          :class="{ disable: !canConfirm }"
          @click="confirm"
        >
          确认
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Popup } from 'mint-ui';

export default {
  components: { Popup },
  data() {
    return {
      popupVisible: false,
      loading: false,
      index: 0,
      canConfirm: false,
    };
  },
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    list: {
      default: [],
      type: Array,
    },
    maxNum: {
      default: 3,
      type: Number,
    },
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        let n = 0;
        this.list.forEach(item => {
          if (item.check) n++;
        });
        console.log(n, this.maxNum);
        this.canConfirm = n === this.maxNum;
        this.popupVisible = true;
      }
    },
    popupVisible(newValue) {
      if (!newValue) {
        this.expand = false;
        this.index = 0;
        this.$emit('update-visible', false);
      }
    },
  },
  created() {},
  methods: {
    getProdImg(item_id) {
      return 'prod_' + item_id;
    },
    check(item) {
      if (this.canConfirm && !item.check) return false;
      this.$emit('update-check', item.item_id);
      let n = 0;
      this.list.forEach(it => {
        if (it.check) n++;
      });
      this.canConfirm = n === this.maxNum;
    },
    close() {
      this.popupVisible = false;
    },
    confirm() {
      if (!this.canConfirm) return false;

      let str = '';
      this.list.forEach(item => {
        if (item.check) str += item.item_id;
      });
      localStorage.setItem('suishen_overseas_combine' + this.maxNum, str);
      this.close();
      this.$emit('confirm-combine', str);
    },
  },
};
</script>
<style scoped lang="less">
.group-popup {
  width: 100vw;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  box-sizing: border-box;
  background-image: linear-gradient(to bottom, #d3f2e5, #fff);
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .group-header {
    width: 100%;
    height: 1.16rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .group-title {
      color: #314a46;
      font-size: 0.36rem;
      font-weight: bold;
      line-height: 1;
      span {
        font-size: 0.24rem;
        color: rgba(49, 74, 70, 0.6);
        margin-left: 0.1rem;
      }
    }
    .group-close {
      width: 0.28rem;
      height: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.28rem;
      }
    }
  }
  .group-wrapper {
    width: 100%;
    margin-top: -1px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .group-item {
      width: 6.9rem;
      height: 1.6rem;
      margin-bottom: 0.24rem;
      background-image: url('../assets/img/3.0/select-border.webp');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0 0.2rem;
      .img {
        width: 1.86rem;
        height: 1.2rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        flex: none;
        margin-right: 0.2rem;
      }
      .desc {
        flex: auto;
        color: rgba(49, 74, 70, 0.7);
        font-size: 0.26rem;
        line-height: 0.36rem;
      }
      &.active {
        background-image: url('../assets/img/3.0/select-border_active.webp');
        .desc {
          color: #314a46;
        }
      }
      &.disable {
        opacity: 0.7;
      }
    }
  }
  .group-btn {
    width: 6.3rem;
    height: 0.88rem;
    color: #fef8eb;
    font-size: 0.32rem;
    line-height: 0.88rem;
    background-image: linear-gradient(to bottom, #f47553, #e92424);
    border-radius: 0.24rem;
    text-align: center;
    font-weight: bold;
    margin-top: 0.4rem;
    margin-bottom: 0.6rem;
    border: 0.02rem solid #ffd192;
    &.disable {
      opacity: 0.4;
    }
  }
}
.prod_1 {
  background-image: url('../assets/img/3.0/prod-combine_1.webp');
}
.prod_2 {
  background-image: url('../assets/img/3.0/prod-combine_2.webp');
}
.prod_3 {
  background-image: url('../assets/img/3.0/prod-combine_3.webp');
}
.prod_4 {
  background-image: url('../assets/img/3.0/prod-combine_4.webp');
}
.prod_5 {
  background-image: url('../assets/img/3.0/prod-combine_5.webp');
}
</style>
<style lang="less">
.mint-popup-bottom {
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
}
</style>
