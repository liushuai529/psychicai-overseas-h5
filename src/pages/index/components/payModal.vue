<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-15 14:18:24
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-06-05 16:52:43
 * @Description: 
-->
<template>
  <mt-popup v-model="pop_modal" position="bottom">
    <div class="pay-modal">
      <div class="title">选择支付方式</div>
      <img
        @click="pop_modal = false"
        src="../../../assets/img/new_combine/icon_close2.png"
        class="close"
        alt=""
      />
      <div class="price">
        <div class="unit">
          {{ combine_info.unit }}
        </div>
        <div class="num">
          {{ combine_info.price }}
        </div>
      </div>
      <div class="pay-list">
        <div v-if="!pay_methods.length && loading" class="no-empty">
          <mt-spinner type="fading-circle" :size="60"></mt-spinner>
        </div>
        <div
          class="pay-item"
          v-for="(item, index) in pay_methods"
          @click="check_index = index"
          :key="index"
        >
          <div class="left">
            <img :src="item.icon" class="logo" alt="" />
            <div class="name">{{ item.title }}</div>
          </div>
          <img
            :src="check_index === index ? checked : noChecked"
            class="check"
            alt=""
          />
        </div>
      </div>
      <div @click="payMoney()" class="pay-btn">
        <div class="text">立即支付</div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
import { getPayMethodsAPI, payOrderAPI } from '../../../api/api';
import checked from '../../../assets/img/new_combine/img_choose2.png';
import noChecked from '../../../assets/img/new_combine/img_choose1.png';
import { Indicator } from 'mint-ui';
import utils from '../../../libs/utils';
export default {
  name: 'PayModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    combine_info: {
      type: Object,
      default: () => {
        return {
          price: 0,
          unit: 'RM',
        };
      },
    },
    key_store: {
      type: String,
      default: '',
    },
    logEvent: {
      type: Function,
      default: () => {},
    },
    pay_index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pop_modal: false,
      pay_methods: [],
      loading: false,
      check_index: 0,
      checked,
      noChecked,
    };
  },
  watch: {
    visible(val) {
      this.pop_modal = val;
    },
    pop_modal(val) {
      if (!val) {
        this.$emit('close', false);
      } else {
        this.getPayMethod();
      }
    },
  },
  computed: {
    channel03() {
      return utils.getFBChannel().indexOf('03') > -1;
    },
  },
  created() {},
  methods: {
    async getPayMethod() {
      this.loading = true;
      try {
        const res = await getPayMethodsAPI();
        this.loading = false;
        if (res.status === 1000) {
          this.pay_methods = res.data;
          // this.pay_methods = [...res.data,...res.data,...res.data];
        }
      } catch (e) {
        this.loading = false;
      }
    },
    eventSend(index, title) {
      if (!index) return;
      try {
        fbq('track', 'AddToCart');
      } catch (err) {
        console.error('error message:', err);
      }
      if (index === 2) {
        utils.firebaseLogEvent(
          '10001',
          '-10022',
          'click_choise2_pay',
          'click',
          {
            args_name: 'click_choise2_pay',
            channel: utils.getFBChannel(),
            pay_type: title,
          }
        );
      } else {
        utils.firebaseLogEvent(
          '10001',
          '-10021',
          'click_choise3_pay',
          'click',
          {
            args_name: 'click_choise3_pay',
            channel: utils.getFBChannel(),
            pay_type: title,
          }
        );
      }
    },

    async payMoney() {
      Indicator.open('支付中...');

      const { pay_method, trade_pay_type, trade_target_org, title } =
        this.pay_methods[this.check_index];
      const { price, unit, product_key, product_id, combine_product_ids } =
        this.combine_info;

      this.eventSend(combine_product_ids.length, title);
      let item_ = {
        e_name: 'pay_click',
        product_id,
      };
      this.$emit('logEvent', item_);
      if(1===2) {
        Toast(this.is_cn?'请选择其他支付方式':'請選擇其他支付方式')
        return
      }

      let params = {
        pay_method,
        product_key,
        product_id,
        platform: 'WEB',
        extra_ce_suan: {},
        trade_pay_type,
        trade_target_org,
        combine_product_ids: combine_product_ids,
        callback_url:
          location.origin +
          location.pathname +
          '?pay_index=' +
          this.pay_index +
          '&report_price=' +
          price,
      };
      const res = await payOrderAPI(params);

      localStorage.setItem('mlxz_remove_flag', 2);
      Indicator.close();
      if (res.status !== 1000) return;
      await utils.asleep(1000);
      this.pop_modal = false;
      if (this.channel03) {
        localStorage.removeItem(
          combine_product_ids.length === 3 ? 'mlxz_combine_3' : 'mlxz_combine_2'
        );
      }

      location.href = res.data.pay_url;
    },
  },
};
</script>

<style scoped lang="less">
.pay-modal {
  width: 7.5rem;
  height: 7.8rem;
  background: linear-gradient(180deg, #d2e7de 0%, #ffffff 100%);
  border-radius: 0.4rem 0.4rem 0 0;
  position: relative;
  overflow: hidden;
  .title {
    width: 100%;
    height: 0.36rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.36rem;
    color: #314a46;
    line-height: 0.36rem;
    margin-top: 0.4rem;
  }
  .close {
    position: absolute;
    width: 0.28rem;
    height: 0.28rem;
    top: 0.44rem;
    right: 0.4rem;
  }
  .price {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: #e3453d;
    margin-top: 0.5rem;
    font-weight: 600;

    .unit {
      font-size: 0.32rem;
      height: 0.32rem;
      line-height: 0.32rem;
      margin-right: 0.1rem;
      margin-bottom: -0.02rem;
    }
    .num {
      font-size: 0.6rem;
      height: 0.6rem;
    }
  }
  .pay-list {
    height: 4.0rem;
    overflow-y: auto;
    padding: 0.6rem 0.4rem 0;
    .no-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 5.6rem;
    }
    .pay-item {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      font-weight: 600;
      font-size: 0.28rem;
      color: #314a46;
      margin-bottom: 0.48rem;
      .left {
        display: flex;
        .logo {
          width: 0.48rem;
          height: 0.48rem;
          margin-right: 0.2rem;
        }
        .name {
          display: flex;
          align-items: center;
        }
      }
      .check {
        width: 0.36rem;
        height: 0.36rem;
      }
    }
    .pay-item:last-child {
      margin-bottom: 0.6rem;
    }
  }
  .pay-btn {
    width: 6.3rem;
    height: 0.88rem;
    margin: 0.2rem auto 0.4rem;
    border-radius: 0.24rem;
    border: 0.02rem solid #ffd192;
    .text {
      width: 100%;
      height: 100%;
      border-radius: 0.24rem;
      background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
      font-weight: 600;
      font-size: 0.32rem;
      color: #fef8eb;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
