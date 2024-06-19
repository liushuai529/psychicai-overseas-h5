<!--
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-21 15:18:20
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-06-05 11:43:19
 * @Description: 订单结果查询
 * @FilePath: \find-future-overseas\src\pages\result\result.vue
-->
<template>
  <div class="container">
    <!-- <div v-if="!loading && hasData" @click="toPage">成功</div>
        <div v-else-if="!loading" @click="back">返回</div>-->
    <div class="content" v-if="!loading">
      <img v-if="hasData" src="../../assets/img/result/success.webp" alt />
      <img v-else src="../../assets/img/result/fail.webp" alt />
      <div class="text">{{ hasData ? '訂單支付成功' : '訂單支付失败' }}</div>
      <div class="btn" @click="toPage">
        {{ hasData ? '點擊查看' : '點擊返回' }}
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import { getResultAPI } from '../../api/api';
import utils from '../../libs/utils';

export default {
  data() {
    return {
      loading: false,
      hasData: false,
      order_id: 0,
      count: 0, // 輪詢次數
      path: '', // 结果页路径
      is_combine: false,
    };
  },
  created() {
    document.title = '订单查询';

    this.order_id = utils.getQueryString('order_id');
    this.path = utils.getQueryString('path');
    this.index = utils.getQueryString('index'); // 运势订单用
    this.fortune_index = utils.getQueryString('fortune_index'); // 运势订单用
    this.is_combine = utils.getQueryString('is_combine'); // 组合测算订单用
    this.combine_type = utils.getQueryString('combine_type'); // 组合测算类型 1组合三 2组合二

    this.query();
  },
  methods: {
    query() {
      this.count++;
      this.loading = true;
      Indicator.open('結果查詢中...');
      getResultAPI({ order_id: this.order_id }).then(res => {
        if (res.data.status === 'PAYED') {
          if (
            this.fortune_index == 0 ||
            this.fortune_index == 1 ||
            this.fortune_index == 2
          ) {
            try {
              fbq('trackCustom', 'CustomPurchase', {
                product_id:
                  this.fortune_index == 0
                    ? 103
                    : this.fortune_index == 1
                    ? 101
                    : 102,
              });
            } catch (err) {
              console.log('no fbq:', err);
            }

            // 运势 今日运势订单成功支付事件 action
            tStatistic.send({
              event: 'action',
              md: 2,
              c_id: 107,
              args: {
                type:
                  this.fortune_index == 0 ? 1 : this.fortune_index == 1 ? 2 : 3,
                origin: location.origin,
                channel: localStorage.getItem('suishen_overseas_channel'),
              },
            });
          } else if (this.combine_type) {
            try {
              fbq('trackCustom', 'CustomPurchase', {
                product_id: this.combine_type == 1 ? 6 : 7,
              });
            } catch (err) {
              console.log('no fbq:', err);
            }

            // 测测 成功支付组合商品
            tStatistic.send({
              event: 'action',
              md: 10,
              c_id: 117,
              args: {
                type: this.combine_type,
                origin: location.origin,
                channel: localStorage.getItem('suishen_overseas_channel'),
              },
            });
          } else {
            let typeMap = {
              marriage_measure_overseas: '1',
              new_year_luck_overseas: '2',
              marriage_divination_overseas: '3',
              wealth_boutique_overseas: '4',
              career_divination_overseas: '5',
            };

            try {
              fbq('trackCustom', 'CustomPurchase', {
                product_id: typeMap[this.path],
              });
            } catch (err) {
              console.log('no fbq:', err);
            }

            // 测算详情 订单成功支付事件
            tStatistic.send({
              event: 'action',
              md: 13,
              c_id: 104,
              args: {
                type: typeMap[this.path],
                origin: location.origin,
                channel: localStorage.getItem('suishen_overseas_channel'),
              },
            });
          }

          try {
            let currency = localStorage.getItem('fb_currency');
            let price = localStorage.getItem('fb_price');
            if (currency && price) {
              fbq('track', 'Purchase', { currency, value: price });
              localStorage.removeItem('fb_currency');
              localStorage.removeItem('fb_price');
            } else {
              console.log('no currency or price');
            }
          } catch (err) {
            console.log('no fbq:', err);
          }

          this.loading = false;
          this.hasData = true;
          Indicator.close();
        } else if (this.count < 6) {
          // 訂單狀態不為PAYED時，輪詢5次
          setTimeout(() => {
            this.query();
          }, 1000);
        } else {
          this.loading = false;
          Indicator.close();
          Toast('訂單支付失敗');
        }
      });
    },
    toPage() {
      let fbPath = localStorage.getItem('suishen_overseas_fb_path');
      let channel = localStorage.getItem('suishen_overseas_channel');
      if (this.hasData) {
        let url = '';
        // 组合测算
        if (this.is_combine) {
          url = `${location.origin}/${fbPath}/index2.html?channel=${channel}`;
        }
        // 运势
        else if (this.path === 'index' || this.path === 'index2') {
          url = `${location.origin}/${fbPath}/${this.path}.html?index=${this.index}&fortune_index=${this.fortune_index}&channel=${channel}`;
        }
        // 测算
        else {
          url = `${location.origin}/${fbPath}/${this.path}.html#/result?order_id=${this.order_id}&channel=${channel}`;
        }
        location.replace(url);
      } else {
        location.replace(`/${fbPath}/index2.html?channel=${channel}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  background-color: #eaf3e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      color: #7dada5;
      text-align: center;
      margin-bottom: 0.6rem;
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
