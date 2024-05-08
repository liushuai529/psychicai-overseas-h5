<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-02-05 13:48:49
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-08 18:54:26
 * @Description: 支付结果页
-->
<template>
  <div class="main"></div>
</template>
<script>
import utils from '../../libs/utils';
import { resultCheckAPI } from '../../api/api';
import { Indicator } from 'mint-ui';

export default {
  name: 'payResult',
  data() {
    return {
      order_id: utils.getQueryString('order_id') || 0,
      status: '',
    };
  },
  created() {
    document.title = this.$t('dom-title');
  },
  mounted() {
    this.order_id && this.checkResult();
  },
  methods: {
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
    },
  },
};
</script>

<style scoped lang="less">
.main {
  width: 100vw;
  min-height: 100vh;
  // background: #222;
}
</style>
