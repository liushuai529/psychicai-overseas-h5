<template>
  <div class="pay-item">
    <div class="pay-contaienr">
      <div class="left">
        <div class="title">您有待支付订单</div>
        <div class="desc">已根据您的八字信息成功生成「报告」</div>
      </div>
      <div class="right" @click="pay">立即支付</div>
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
import { Indicator, Toast } from 'mint-ui';
import { getLastOrderGetAPI } from '../api/api';

import { path_enums } from '../libs/enum';
import { payOrderAPI } from '../api/api';

const lang = utils.getLanguage();
const show_info = {
  h5_wealth2024: { module: 10005, 'content_id': -10020, 'event_name': 'view_2024wealty_download', type: 'view' }, // 2024年财运
  h5_annual2024: { module: 10003, 'content_id': -10020, 'event_name': 'view_2024report_download', type: 'view' }, // 2024年年运
  h5_weigh_bone: { module: 10009, 'content_id': -10020, 'event_name': 'view_chenggu_download', type: 'view' }, // 袁天罡秤骨
  h5_bai_gua: { module: 10008, 'content_id': -10020, 'event_name': 'view_64gua_download', type: 'view' }, // 鬼谷子
  h5_emotion2024: { module: 10006, 'content_id': -10029, 'event_name': 'view_2024lovely_download', type: 'view' }, // 2024年爱情运势
  h5_marriage: { module: 10007, 'content_id': -10031, 'event_name': 'view_marriage_download', type: 'view' }, //合婚
  h5_career2024: { module: 10004, 'content_id': -10020, 'event_name': 'view_2024career_download', type: 'view' }, // 2024年事业运势 
}
const event_enums = {
  h5_wealth2024: {
    c_id: '-10005',
    c_name: 'click_history_2024wealty_repay',
  },
  h5_career2024: {
    c_id: '-10006',
    c_name: 'click_history_2024career_repay',
  },
  h5_marriage: {
    c_id: '-10007',
    c_name: 'click_histroy_marriage_repay',
  },
  h5_weigh_bone: {
    c_id: '-10009',
    c_name: 'click_history_chenggu_repay',
  },
  h5_bai_gua: {
    c_id: '-10008',
    c_name: 'click_history_64gua_repay',
  },
  h5_annual2024: {
    c_id: '-10003',
    c_name: 'click_history_2024report_repay',
  },
  h5_emotion2024: {
    c_id: '-10004',
    c_name: 'click_history_2024lovely_repay',
  },
};
import { CountDown } from 'vant';
export default {
  components: {
    CountDown,
  },
  data() {
    return {
      time: localStorage.getItem(`mlxz_count_pay_item_${this.product_key}`) || 30 * 60 * 1000,
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
    this.$store.dispatch('common/getProduction');
    const res = await getLastOrderGetAPI();
    if (res.status !== 1000) return;
    this.last_order = res.data;
  },

  computed: {
    productList() {
      return this.$store.state.common.productList;
    },
  },
  methods: {
    getTime(val) {
      const { minutes, seconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000;
      localStorage.setItem(`mlxz_count_pay_item_${this.product_key}`, time_);
    },
    async pay() {
      Indicator.open('订单创建中');
      const {
        status,
        payment,
        pay_method,
        product_key,
        product_id,
        ext,
        trade_pay_type,
        trade_target_org,
        combine_product_ids,
      } = this.last_order;
      let url = path_enums[product_key];
      
      if (combine_product_ids && combine_product_ids.length) {
        let length_ = combine_product_ids.length;
        let params = {
          pay_method,
          product_key,
          product_id,
          platform: 'WEB',
          extra_ce_suan: {},
          trade_pay_type,
          trade_target_org,
          combine_product_ids: combine_product_ids,
          fb_param: {
            fbc: utils.getcookieInfo('_fbc'),
            fbp: utils.getcookieInfo('_fbp'),
            external_id: localStorage.getItem('mlxz_outer_visitor_id'),
          },
        };
        if (product_key === 'h5_combo2_attach') {
          let same_product = this.productList.find(
            item => item.product_id === combine_product_ids[0]
          );
          const back_url = path_enums[same_product.product_key];
          params.extra_ce_suan = ext;
          params.callback_url = `${location.origin
            }/${utils.getFBChannel()}/${back_url}.html#/result?path=${path_enums[same_product.product_key]
            }&report_price=${payment}&repay=3`;

          let e_name =
            same_product.product_key === 'h5_emotion2024'
              ? 'click_history_2024lovelymarriage_repay'
              : 'click_history_marriage2024lovely_repay';
          let e_id =
            same_product.product_key === 'h5_emotion2024'
              ? '-10030'
              : '-10031';
          utils.firebaseLogEvent('10002', e_id, e_name, 'click', {
            args_name: e_name,
            channel: utils.getFBChannel(),
          });
        } else {
          utils.firebaseLogEvent(
            '10002',
            length_ === 2 ? '-10010' : '-10011',
            length_ === 2
              ? 'click_history_report2_repay'
              : 'click_history_report3_repay',
            'click',
            {
              args_name:
                length_ === 2
                  ? 'click_history_report2_repay'
                  : 'click_history_report3_repay',
              channel: utils.getFBChannel(),
            }
          );
          params.callback_url =
            location.origin +
            `/${utils.getFBChannel()}/` +
            'index.html' +
            '?pay_index=' +
            length_ +
            '&report_price=' +
            payment +
            '&repay=1';
        }

        const res = await payOrderAPI(params);

        Indicator.close();

        if (res.status !== 1000) return;
        localStorage.setItem('mlxz_reload_page_history', 1);

        location.href = res.data.pay_url;
        // 组合下单结束
        return;
      }

      // utils.firebaseLogEvent(
      //     '10002',
      //     event_enums[product_key].c_id,
      //     event_enums[product_key].c_name,
      //     'click',
      //     {
      //       args_name: event_enums[product_key].c_name,
      //       channel: utils.getFBChannel(),
      //     }
      //   );
        let params = {
          pay_method,
          product_key,
          product_id,
          platform: 'WEB',
          extra_ce_suan: ext,
          trade_pay_type,
          trade_target_org,
          fb_param: {
            fbc: utils.getcookieInfo('_fbc'),
            fbp: utils.getcookieInfo('_fbp'),
            external_id: localStorage.getItem('mlxz_outer_visitor_id'),
          },
        };

        params.callback_url = `${
          location.origin
        }/${utils.getFBChannel()}/${url}.html#/result?path=${
          path_enums[product_key]
        }&report_price=${payment}&repay=1`;
        const res = await payOrderAPI(params);

        Indicator.close();

        if (res.status !== 1000) return;


        location.href = res.data.pay_url;
    }
  }
}
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
