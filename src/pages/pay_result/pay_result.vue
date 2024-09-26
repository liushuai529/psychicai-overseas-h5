<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-02-05 13:48:49
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-02-05 14:33:50
 * @Description: 支付结果页
-->
<template>
  <div class="pay_result">
    <div class="content">
      <img v-if="status==='FAIL'" src="../../assets/img/result/fail.webp" alt />
      <div v-if="status==='FAIL'" class="text">{{ returnMsg }}</div>
      <div v-if="status==='FAIL'" class="btn" @click="jump">
        返回
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../../libs/utils';
// import AppRedirect from '../../libs/redirect'
import { resultCheckAPI } from '../../api/api';
import { Indicator } from 'mint-ui';

export default {
  name: 'payResult',
  data() {
    return {
      order_id: utils.getQueryString('order_id') || 0,
      status: utils.getQueryString('status'),
      returnMsg: utils.getQueryString('returnMsg'),
      callback_url: utils.getQueryString('callback_url'),
      pay_type: utils.getQueryString('pay_type'),
    };
  },
  created() {
    document.title = this.$t('dom-title');
  },
  mounted() {
    if (this.pay_type === 'payer_max_pay') {
      this.order_id && this.checkResult();
    } else if(this.pay_type ==='my_card') {
      this.jump()
    }
  },
  methods: {

    jump() {
      if(1==1) {
        this.urlJump();
      } else {
        this.schemeJump();
      }
    },

    urlJump() {
      location.href = this.callback_url
    },

    schemeJump() {
      AppRedirect.redirect({
        iosApp: 'fb://feed',
        // iosAppStore: 'https://itunes.apple.com/il/app/twitter/id333903271?mt=8&message=',
        // For this, your app need to have category filter: android.intent.category.BROWSABLE
        // android: {
        //   'host': 'post/?payResult=success',
        //   // 'action': '', // Equivalent to ACTION in INTENTs
        //   // 'category': '', // Equivalent to CATEGORY in INTENTs
        //   // 'component': '', // Equivalent to COMPONENT in INTENTs
        //   'scheme': 'mlxz', // Scheme part in a custom scheme URL
        //   // 'package': 'com.twitter.android', // Package name in Play store
        //   // 'fallback': 'https://play.google.com/store/apps/details?id=com.twitter.android&hl=en&message=' + qs['message']
        // },

        android: {
          'host':  `post/?message=${encodeURIComponent(this.callback_url)}&result=${this.status}`,
          'scheme': 'mlxz'
        },

        // After not recognizing any iOS or Android, you can set an overall Fallback like this. Maybe used for general app information on kinda landingpage
        // overallFallback: 'https://baidu.com'

      });
    },


    /**
     * @description: 更新支付结果
     * @return {*}
     */
    async checkResult() {
      Indicator.open(this.$t('pay-check'));
      let data = {
        order_id: +this.order_id,
        pkg: "''",
        receipt: '',
        transaction_id: '',
        version_name: '',
      };

      const res = await resultCheckAPI(data);
      Indicator.close();
      if (res.status === 1000) {
        this.status = res.data.status;
        if (!['PAYED', 'CANCELED', 'FAIL', 'SUCCESS'].includes(this.status)) {
          this.status = 'FAIL';
        }
      } else {
        this.status = 'FAIL';
      }
      if (utils.isAndroid()) {
        window.psychicai_client.onWebPayResult(this.status);
      } else {
        let params = {
          status: this.status
        };
        console.log('开始调用onWebPayResult========>params:', params)
        // IOS原生方法调用
        window.prompt('onWebPayResult', JSON.stringify(params));
      }

    },
  },
};
</script>

<style scoped lang="less">
.pay_result {
  width: 100vw;
  min-height: 100vh;
  // background: #222;
  font-size: 0.32rem;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 1.6rem;
      margin-bottom: 0.5rem;
    }
    .text {
      font-size: 0.32rem;
      line-height: 1;
      height: 0.48rem;
      color: #7dada5;
      text-align: center;
      margin-bottom: 0.6rem;
      overflow: hidden;
      width:90%;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .btn {
      width: 4.9rem;
      border-radius: 0.16rem;
      color: #fef8eb;
      background-color: #af742e;
      background-image: linear-gradient(to bottom, #f47553, #e92424);
      border: 0.02rem solid #ffd192;
      font-size: 0.28rem;
      line-height: 0.88rem;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
