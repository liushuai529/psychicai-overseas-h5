<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-04-08 11:37:29
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-21 15:17:07
 * @Description: 支付弹窗
-->
<template>
  <mt-popup v-model="show" position="bottom" class="pay-modal">
    <div class="pay-content">
      <img
        @click="closeModal"
        class="close"
        src="https://psychicai-static.psychicai.pro/imgs/240484f905eb6e7b49f19988b0f94f83c430.png"
        alt=""
      />
      <div :style="title_style" class="username">
        {{ title }}
      </div>
      <div v-if="product_key === 'h5_marriage'" class="modal-bg">
        <img :src="bg" class="init-bg" alt="" />
        <canvas id="bg"></canvas>
      </div>
      <img v-else class="bg" :src="bg" alt="" />
      <div class="pay-method">
        <div v-if="!pay_methods.length && loading" class="no-empty">
          <mt-spinner type="fading-circle" :size="60"></mt-spinner>
        </div>
        <div v-else class="pay-list">
          <!-- 限时优惠 -->
          <div class="discount">
            <div class="left">
              <img
                :src="is_new_user ? new_user_icon : xsyh_icon"
                class="xsyh"
                alt=""
              />
              <div class="price-box">
                <div class="now-price">{{ now_price }}</div>
                <div class="origin-price">{{ origin_price }}</div>
              </div>
            </div>
            <div class="right">
              <div class="title">{{ tips1 }}</div>
              <div class="desc">
                <!-- {{ time_str }} millisecond -->
                <count-down :time="time" format="mm:ss" />
              </div>
            </div>
          </div>
          <div class="buy-people">
            今日已有<span>{{ buy_people }}</span
            >{{ tips2 }}
          </div>
          <!-- 支付方式 -->
          <div class="method-list">
            <div
              v-for="(it, k) in pay_methods"
              @click="check_index = k"
              :key="k"
              class="item"
            >
              <div class="left">
                <img :src="it.icon" alt="" />
                <div class="name">{{ it.title }}</div>
              </div>
              <img
                class="right"
                :src="check_index === k ? checked_icon : no_check_icon"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 支付按钮 -->

      <div v-if="pay_methods.length" @click="payMoney()" class="pay-btn">
        {{ tips3 }}<span>{{ now_price }}</span
        >{{ tips4 }}
      </div>
    </div>
  </mt-popup>
</template>

<script>
import { Indicator } from 'mint-ui';
import {
  getPayMethodsAPI,
  getProductionsAPI,
  payOrderAPI,
  reportEventAPI,
} from '../api/api';
import utils from '../libs/utils';
import { path_enums } from '../libs/enum';
import { CountDown } from 'vant';
import { Downloader, Parser, Player } from 'svga.lite';
import cn_bazi_modal from '../assets/img/mlxz/svga/bzhh/cn_modal.svga';
import tw_bazi_modal from '../assets/img/mlxz/svga/bzhh/tw_modal.svga';
const e_id_arr = {
  h5_wealth2024: '60001',
  h5_weigh_bone: '60002',
  h5_bai_gua: '60003',
  h5_marriage: '60005',
  h5_annual2024: '60009',
  h5_emotion2024: '60010',
  h5_career2024: '60011',
};

const tipsArr1 = {
  'zh-CN': '优惠倒计时',
  'zh-TW': '優惠倒計時',
};
const tipsArr2 = {
  'zh-CN': '人购买当前报告',
  'zh-TW': '人購買當前報告',
};

const tipsArr3 = {
  'zh-CN': '结缘价 ',
  'zh-TW': '結緣價 ',
};
const tipsArr4 = {
  'zh-CN': ' 立即解锁内容',
  'zh-TW': ' 立即解鎖內容',
};

const originPriceArr = {
  'zh-CN': '原价 ',
  'zh-TW': '原價 ',
};

const tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};
const tipsArr6 = {
  'zh-CN': '请稍等...',
  'zh-TW': '請稍等...',
};
export default {
  data() {
    return {
      tips1: tipsArr1[utils.getLanguage()],
      tips2: tipsArr2[utils.getLanguage()],
      tips3: tipsArr3[utils.getLanguage()],
      tips4: tipsArr4[utils.getLanguage()],
      parser: null,
      player: null,
      cn_bazi_modal,
      tw_bazi_modal,
      show: false,
      pay_methods: [],
      loading: false,
      xsyh_icon:
        'https://psychicai-static.psychicai.pro/imgs/24049b44461fceb64a04b15edd6b2a8bb79e.png',
      new_user_icon:
        'https://psychicai-static.psychicai.pro/imgs/24040fcec5baef7f4fcea5a1eed3552d734e.png',
      time: 30 * 60 * 1000,
      time_str: '',
      product: null,
      is_new_user: false, // 是否是新用户
      check_index: 0, //选中支付方式
      checked_icon:
        'https://psychicai-static.psychicai.pro/imgs/24048e756ae2d40f436184b0bc8018199fbb.png',
      no_check_icon:
        'https://psychicai-static.psychicai.pro/imgs/2404f091a163349f45d3909f82e4660cc3c6.png',
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    close: {
      type: Function,
      default: () => {},
    },
    product_key: {
      type: String,
      default: '',
    },
    pay_modal: {
      type: Boolean,
      default: false,
    },
    query_user_string: {
      default: '',
      type: String,
    },
    title_style: {
      type: String,
      default: 'color:#222',
    },
    e_view_id: {
      type: String,
      default: '',
    },
    c_view_id: {
      type: String,
      default: '',
    },
    e_view_name: {
      type: String,
      default: '',
    },
    a_view_token: {
      type: String,
      default: '',
    },
    e_click_name: {
      type: String,
      default: '',
    },
    c_click_id: {
      type: String,
      default: '',
    },
    a_click_token: {
      type: String,
      default: '',
    },
  },
  components: {
    CountDown,
  },

  computed: {
    buy_people() {
      const buyList = {
        h5_marriage: '87',
        h5_wealth2024: '142',
        h5_career2024: '103',
        h5_emotion2024: '98',
        h5_annual2024: '193',
        h5_bai_gua: '146',
        h5_weigh_bone: '138',
      };
      return buyList[this.product_key];
    },
    now_price() {
      return this.product
        ? this.product.unit + ' ' + this.product.price_str
        : '-';
    },
    origin_price() {
      return this.product
        ? originPriceArr[utils.getLanguage()] +
            this.product.unit +
            ' ' +
            this.product.origin_price_str
        : '-';
    },

    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  created() {},

  watch: {
    value: {
      handler: function (val) {
        this.show = val;
        if (val) {
          this.getProductionList();
          this.getPayMethod();
          if (this.product_key === 'h5_marriage') {
            this.loadBg(
              '#bg',
              this.is_cn ? this.cn_bazi_modal : this.tw_bazi_modal
            );
          }

          utils.firebaseLogEvent(
            this.e_view_id,
            this.c_view_id,
            this.e_view_name,
            'view',
            {
              args_name: this.e_view_name,
              channel: utils.getFBChannel(),
            }
          );
          // window.Adjust &&
          //   window.Adjust.trackEvent({
          //     eventToken: this.a_view_token,
          //   });
        } else {
          if (this.parser) {
            this.parser.destroy();
          }
          if (this.player) {
            this.player.destroy();
          }
        }
      },
      deep: true,
      immediate: true,
    },
    show(val) {
      if (!val) {
        this.closeModal();
      }
    },
  },

  methods: {
    // 端内加载背景SVGA动画
    loadBg(dom, url, is_loop = true) {
      const downloader = new Downloader();
      // 默认调用 WebWorker 线程解析
      // 可配置 new Parser({ disableWorker: true }) 禁止
      this.parser = new Parser();
      // #canvas 是 HTMLCanvasElement
      this.player = new Player(dom);

      (async () => {
        const fileData = await downloader.get(url);
        const svgaData = await this.parser.do(fileData);

        this.player.set({ loop: is_loop });

        await this.player.mount(svgaData);

        // 开始播放动画
        this.player.start();
      })();
    },

    closeModal() {
      this.show = false;
      this.$emit('close', false);
      this.$emit('update:value', false);
    },

    /**
     * @description: 获取当前商品信息
     * @return {*}
     */
    async getProductionList() {
      this.product = null;
      const { status, data } = await getProductionsAPI('ceh5');
      if (status === 1000) {
        this.product = data.find(item => item.product_key === this.product_key);
        this.is_new_user = this.product
          ? this.product.tags
            ? this.product.tags.includes('newcomer_discount')
            : false
          : false;
      }
    },
    /**
     * @description: 获取支付方式列表
     * @return {*}
     */
    async getPayMethod() {
      this.loading = true;

      try {
        const res = await getPayMethodsAPI();
        this.loading = false;
        if (res.status === 1000) {
          this.pay_methods = res.data;
        }
      } catch (e) {
        this.loading = false;
        this.closeModal();
      }
    },
    isShowBannerSort() {
      let channel = utils.getFBChannel();
      return ['enjoy02', 'panda02'].includes(channel) ? false : true;
    },
    // 事件排序
    async logEventForSort(it) {
      if (!this.isShowBannerSort()) return;
      try {
        const res = await reportEventAPI({
          event_name: it.e_name,
          product_id: it.product_id,
        });
        if (res.status !== 1000) return;
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * @description: 创建订单 支付
     * @return {*}
     */
    async payMoney() {
      // window.Adjust &&
      //   window.Adjust.trackEvent({
      //     eventToken: this.a_click_token,
      //   });
      if (utils.isProd()) {
        Indicator.open(tipsArr6[utils.getLanguage()]);
        await utils.checkFB();
        Indicator.close();
        try {
          fbq('track', 'AddToCart');
        } catch (err) {
          console.error('AddToCart error message:', err);
        }
      }
      this.logEventForSort({
        e_name: 'pay_click',
        product_id: this.product.product_id,
      });
      utils.firebaseLogEvent(
        this.e_view_id,
        this.c_click_id,
        this.e_click_name,
        'click',
        {
          args_name: this.e_click_name,
          pay_type: this.pay_methods[this.check_index].title,
          channel: utils.getFBChannel(),
        }
      );

      localStorage.setItem('report_price', this.product.price);

      Indicator.open(tipsArr5[utils.getLanguage()]);
      let pick_method = this.pay_methods[this.check_index];
      const { pay_method, trade_pay_type, trade_target_org } = pick_method;
      let params = {
        pay_method: pay_method,
        product_key: this.product_key,
        product_id: this.product.product_id,
        platform: 'WEB',
        extra_ce_suan: utils.getExtraParams(
          this.product_key,
          this.query_user_string
        ),
      };

      if (pay_method === 'google_pay') {
        const res = await payOrderAPI(params);
        Indicator.close();
        localStorage.removeItem('mlxz_set_event_times');
        if (res.status !== 1000) return;
        localStorage.setItem('report_order_id', res.data.id);
      } else {
        let pay_max_params = Object.assign({}, params, {
          trade_pay_type,
          trade_target_org,
        });
        pay_max_params.callback_url = `${location.origin}${
          location.pathname
        }#/result?path=${path_enums[this.product_key]}&report_price=${
          this.product.price
        }`;
        const res = await payOrderAPI(pay_max_params);
        Indicator.close();
        localStorage.removeItem('mlxz_set_event_times');

        if (res.status !== 1000) return;
        await utils.asleep(1000);
        location.href = res.data.pay_url;
      }
    },
  },
};
</script>

<style lang="less">
.mint-indicator-wrapper {
  z-index: 1000;
}
.mint-popup {
  background: transparent !important;
}
.v-modal {
  z-index: 3 !important;
}
// .van-count-down {
//   font-family: 'Courier New', Courier, monospace;
// }
</style>
<style scoped lang="less">
.modal-bg {
  width: 7.5rem;
  height: 6.6rem;
  position: relative;
  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .init-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
.pay-method {
  height: 4rem;
  overflow-y: auto;
}
.pay-modal {
  width: 7.5rem;
  // height: 100vh;
  height: 12rem;
  font-family: system-ui, sans-serif;
  z-index: 999 !important;
  .pay-content {
    width: 100%;
    // max-height: 13.2rem;
    // min-height: 10rem;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    border-radius: 0.4rem 0.4rem 0 0;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
  .bg {
    width: 7.5rem;
    height: 6.6rem;
  }
  .close {
    position: fixed;
    width: 0.44rem;
    height: 0.44rem;
    top: 0.36rem;
    right: 0.36rem;
    z-index: 10;
  }
  .username {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 0.36rem;
    font-weight: 600;
    font-size: 0.36rem;
    line-height: 0.36rem;
    margin-top: 0.4rem;
    z-index: 3;
  }
}

.no-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.pay-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.discount {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  margin-top: 0.3rem;
  .left {
    display: flex;
    align-items: center;
    .xsyh {
      width: 0.84rem;
      height: 0.84rem;
      margin-right: 0.2rem;
    }
    .price-box {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      font-weight: 600;
      .now-price {
        height: 0.36rem;
        font-size: 0.36rem;
        color: #e24c2e;
        line-height: 0.36rem;
        margin-bottom: 0.1rem;
      }
      .origin-price {
        height: 0.22rem;
        font-size: 0.22rem;
        color: #99999a;
        line-height: 0.22rem;
        text-decoration-line: line-through;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    font-weight: 600;
    font-size: 0.24rem;
    color: #e24c2e;
    div {
      height: 0.24rem;
      line-height: 0.24rem;
    }
  }
  .right div:first-child {
    margin-bottom: 0.12rem;
  }
}
.buy-people {
  width: 100%;
  height: 0.26rem;
  font-weight: 400;
  font-size: 0.26rem;
  color: #99999a;
  line-height: 0.26rem;
  text-align: center;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
  span {
    color: #e24c2e;
  }
}
.method-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0.5rem;
  width: 100%;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 0.48rem;
        height: 0.48rem;
        margin-right: 0.2rem;
      }
      .name {
        height: 0.26rem;
        font-weight: 600;
        font-size: 0.26rem;
        color: #5d5d5e;
        line-height: 0.26rem;
      }
    }
    .right {
      width: 0.36rem;
      height: 0.36rem;
    }
  }
}
.pay-btn {
  width: 6.3rem;
  height: 0.88rem;
  background: #e24c2e;
  border-radius: 0.44rem;
  font-weight: 600;
  font-size: 0.32rem;
  color: #fff;
  line-height: 0.32rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0.2rem;
  left: 0.6rem;
  z-index: 99;
  span {
    margin: 0 0.1rem;
  }
}
</style>
