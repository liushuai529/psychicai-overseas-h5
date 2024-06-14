<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-25 11:49:39
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-01-20 18:23:38
 * @Description: 支付结果弹窗
-->
<template>
  <div>
    <mt-popup
      v-model="pop_visible"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div class="pop-box">
        <img
          @click="pop_visible = false"
          src="../../assets/img/mlxz/cesuan_home/icon_close2.png"
          class="close"
          alt=""
        />
        <div class="pay-result">
          <img
            src="../../assets/img/mlxz/cesuan_home/pay_success.png"
            class="icon"
            alt=""
          />
          <div class="status">{{ $t('pay-success') }}</div>
          <div @click="jumpHistory()" class="report">
            {{ $t('check-report') }}
          </div>
          <!-- 购买的报告 -->
          <div class="report-list">
            <div v-for="(item, index) in result_list" :key="index">
              <div v-if="item.id" class="item">
                <div class="title">
                  <div class="left">
                    <img :src="item.icon" alt="" />
                    <div class="name">
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="right">{{ sub_orders[index].order_id }}</div>
                </div>
                <div class="divider"></div>
                <div class="info">
                  <div v-if="!item.status" class="empty-left">
                    <div class="name">{{ $t('no-add-info') }}</div>
                    <div class="tip">{{ $t('add-info-tips') }}</div>
                  </div>
                  <div v-else class="left">
                    <div class="user-name">{{ item.user_name }}</div>
                    <div class="time">{{ formateTime(item.create_time) }}</div>
                  </div>
                  <div
                    @click="changeReport(item, index)"
                    :class="[
                      'right',
                      'result-btn-0',
                      `result-btn-${item.status}`,
                    ]"
                  >
                    <!-- {{ item.status ? '查看' : '去添加' }} -->
                    {{ $t('to-add') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Popup } from 'mint-ui';
import moment from 'dayjs';
import utils from '../../libs/utils';

let order_id = utils.getQueryString('order_id');

export default {
  components: { Popup },
  data() {
    return {
      pop_visible: false,
    };
  },
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    result_list: {
      default: () => [],
      type: Array,
    },
    handleReport: {
      default: () => {},
      type: Function,
    },
    pop_list: {
      default: () => [],
      type: Array,
    },
    sub_orders: {
      default: () => [],
      type: Array,
    },
  },
  watch: {
    visible(val) {
      this.pop_visible = val;
    },
    pop_visible(val) {
      if (!val) {
        this.$emit('update-visible', val);
      }
    },
  },
  computed: {},
  created() {},
  mounted() {},

  methods: {
    /**
     * @description: 格式化时间
     * @param {*} val
     * @return {*}
     */
    formateTime(val) {
      return moment(val).format('YYYY.MM.DD HH:mm');
    },
    /**
     * @description: 查看、添加信息
     * @param {*} item
     * @return {*}
     */
    changeReport(item, index) {
      let it = this.pop_list.find(it => it.product_key === item.product_key);
      it.order_id = this.sub_orders[index].order_id;
      this.$emit('handleReport', it);
    },

    /**
     * @description: 查看历史订单
     * @return {*}
     */
    jumpHistory() {
      location.href = 'mlxz://h5order?type=1';
    },
  },
};
</script>
<style scoped lang="less">
.pop-box {
  width: 7.5rem;
  height: 11rem;
  background: #000;
  border-radius: 0.4rem 0.4rem 0 0;
  position: relative;
  font-family: PingFangSC-Semibold, PingFang SC;
  .close {
    position: absolute;
    top: 0.44rem;
    right: 0.5rem;
    width: 0.28rem;
    height: 0.28rem;
  }
  .pay-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #fff;
    .icon {
      width: 1.86rem;
      height: 1.18rem;
      margin: 0.41rem 2.82rem 0.1rem;
    }
    .status {
      font-size: 0.36rem;
      margin-bottom: 0.16rem;
    }
    .report {
      font-size: 0.24rem;
      margin-bottom: 0.5rem;
    }
    .report-list {
      height: 7.9rem;
      overflow-y: auto;
      .item {
        width: 7.1rem;
        height: 2.39rem;
        background: #222;
        border-radius: 0.24rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.24rem;
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.2rem 0.3rem;
          .left {
            display: flex;
            align-items: center;
            img {
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.16rem;
              border-radius: 0.08rem;
            }
            .name {
              width: 2.8rem;
              font-size: 0.28rem;
              font-weight: 600;
              color: #fff;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .right {
            font-size: 0.24rem;
            font-weight: 400;
            color: #999;
          }
        }
        .divider {
          width: 6.5rem;
          height: 0.01rem;
          background: #383838;
          margin: 0 0.3rem;
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.47rem 0.3rem 0;
          .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #333;
            .user-name {
              font-size: 0.28rem;
              font-weight: 600;
              margin-bottom: 0.18rem;
              line-height: 0.28rem;
            }
            .time {
              font-size: 0.24rem;
              font-weight: 400;
              line-height: 0.24rem;
            }
          }
          .empty-left {
            display: flex;
            flex-direction: column;
            color: #999;
            .name {
              font-weight: 500;
              margin-bottom: 0.18rem;
              font-size: 0.28rem;
              line-height: 0.28rem;
            }
            .tip {
              font-weight: 400;
              font-size: 0.24rem;
              line-height: 0.24rem;
            }
          }
          .right {
            width: 1.2rem;
            height: 0.64rem;
            border-radius: 0.32rem;
            font-size: 0.26rem;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
.result-btn-1 {
  background: #cb7e38;
}
.result-btn-0 {
  background: #ef5c36;
}
</style>
