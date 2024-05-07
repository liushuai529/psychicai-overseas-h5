<template>
  <div class="pay-outer">
    <div class="pay-outer-top">
      已有
      <span class="color-red">{{ user_number }}</span
      >人進行了測算，
      <span>99%</span>的用戶認為分析準確，幫他們解决心中疑惑，指明人生前程！
    </div>
    <div class="pay-outer-price">
      RM
      <span>{{ price }}</span>
    </div>
    <div class="pay-outer-btn" @click="toCheckstand">去支付</div>
  </div>
</template>

<script>
import tStatistic from 'tstatistic';
tStatistic.init({
  app_key: 92440113,
});

export default {
  data() {
    return {};
  },
  props: {
    type: {
      default: '',
      type: String,
    },
    checkstand_url: {
      default: '',
      type: String,
    },
    currency: {
      default: '$',
      type: String,
    },
    price: {
      default: '-',
      type: String | Number,
    },
  },

  computed: {
    user_number() {
      return this.$store.state.year_user;
    },
  },
  methods: {
    toCheckstand() {
      try {
        fbq('track', 'InitiateCheckout');
      } catch (err) {
        console.log('no fbq:', err);
      }

      if (this.checkstand_url) {
        location.href = this.checkstand_url;
      }
    },
    // 跑马灯
    runMarquee() {
      this.curMarqueeText = mockUserArr[getRandom(mockUserArr.length)];
      setInterval(() => {
        this.nextMarqueeText = mockUserArr[getRandom(mockUserArr.length)];
        this.scrollMarquee = true;

        setTimeout(() => {
          this.curMarqueeText = this.nextMarqueeText;
          this.nextMarqueeText = '';
          this.scrollMarquee = false;
        }, 500);
      }, 2500);
    },
  },
};
</script>

<style scoped lang="less">
.pay-outer {
  margin-top: 0.64rem;
  border-radius: 0.12rem;
  font-size: 0.25rem;
  padding: 0.4rem 0.55rem;
  color: #7f7d76;
  background-color: #fdf5e0;
  box-sizing: border-box;
  border: 2px solid #f8da85;
  box-shadow: 0px 0px 8px #aaaaaa;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pay-outer-top {
    .color-red {
      color: #c31a26;
    }
  }
  .pay-outer-price {
    color: #333;
    font-size: 0.36rem;
    font-weight: bold;
    margin: 0.28rem 0 0.4rem;
    span {
      font-size: 0.72rem;
    }
  }
  .pay-outer-btn {
    width: 5.7rem;
    height: 0.96rem;
    color: #fdf5dd;
    font-size: 0.36rem;
    line-height: 0.96rem;
    background-color: #e13d3c;
    border-radius: 0.12rem;
    text-align: center;
    font-weight: bold;
  }
}
</style>
