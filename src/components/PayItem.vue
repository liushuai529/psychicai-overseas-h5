<template>
  <div class="pay-item">
    <div class="pay-contaienr">
      <div class="left">
        <div class="title">您有待支付订单</div>
        <div class="desc">已根据您的八字信息成功生成「报告」</div>
      </div>
      <div class="right">立即支付</div>
    </div>
    <div class="time">
      <div>请在</div>
      <count-down :time="time" @change="getTime" />
      <div>内完成支付</div>
    </div>

  </div>

</template>

<script>
import utils from '../libs/utils';
import { getLastOrderGetAPI } from '../api/api';
const lang = utils.getLanguage();
const show_info = {
  h5_wealth2024: {module: 10005, 'content_id': -10020, 'event_name': 'view_2024wealty_download', type: 'view'}, // 2024年财运
  h5_annual2024: {module: 10003, 'content_id': -10020, 'event_name': 'view_2024report_download', type: 'view'}, // 2024年年运
  h5_weigh_bone: {module: 10009, 'content_id': -10020, 'event_name': 'view_chenggu_download', type: 'view'}, // 袁天罡秤骨
  h5_bai_gua: {module: 10008, 'content_id': -10020, 'event_name': 'view_64gua_download', type: 'view'}, // 鬼谷子
  h5_emotion2024: {module: 10006, 'content_id': -10029, 'event_name': 'view_2024lovely_download', type: 'view'}, // 2024年爱情运势
  h5_marriage: {module: 10007, 'content_id': -10031, 'event_name': 'view_marriage_download', type: 'view'}, //合婚
  h5_career2024: {module: 10004, 'content_id': -10020, 'event_name': 'view_2024career_download', type: 'view'}, // 2024年事业运势 
}
import { CountDown } from 'vant';
export default {
  components: {
    CountDown,
  },
  data() {
    return {
      time: 0 * 1 * 60 * 1000,
      last_order: null,
    };
  },
  props: {
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    },
  },

  async created() {
    const res = await getLastOrderGetAPI();
    console.log('res', res)
    if (res.status !== 1000) return;
    this.last_order = res.data;
  },

  computed: {
    user_number() {
      return this.$store.state.year_user;
    },
  },
  methods: {
    getTime(val) {
      const { minutes, seconds } = val;
      let time_ = minutes * seconds * 60 * 1000;
      localStorage.setItem(`mlxz_count_pay_item_${this.product_key}`, time_);
    },
  },
};
</script>

<style scoped lang="less">
.pay-item {
  width: 7.1rem;
  height: 2.04rem;
  background: linear-gradient(180deg, #FDFAEC 0%, #FFF5D8 100%);
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0.24rem;
  padding-right: 0.24rem;
  padding-top: 0.15rem;
  padding-bottom: 0.24rem;
  margin-bottom: 0.37rem;

  .pay-contaienr {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      flex-direction: column;

      .title {
        font-weight: 600;
        font-size: 0.36rem;
        color: #602E03;
        line-height: 0.54rem;
        text-align: left;
        font-style: normal;
      }

      .desc {
        font-weight: 400;
        font-size: 0.26rem;
        color: #602E03;
        line-height: 0.39rem;
        text-align: left;
        font-style: normal;
      }
    }

    .right {
      width: 1.68rem;
      height: 0.74rem;
      background: linear-gradient(180deg, #F47553 0%, #E92424 99%);
      border-radius: 0.2rem;
      border: 0.02rem solid #FFFBED;
      font-weight: 600;
      font-size: 0.3rem;
      color: #FFFAEE;
      line-height: 0.3rem;
      text-align: left;
      font-style: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .time {
    width: 6.62rem;
    height: 0.5rem;
    background: #FFF2CF;
    border-radius: 0.12rem;
    border: 0.01rem solid #F6B87E;
    margin-top: 0.18rem;
    font-weight: 600;
    font-size: 0.26rem;
    color: #E24C2E;
    line-height: 0.26rem;
    text-align: right;
    font-style: normal;
    display: flex;
    justify-content: center;
    align-items: center
  }
}
</style>
