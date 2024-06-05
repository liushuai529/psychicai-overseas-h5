<template>
  <div class="group-purchase">
    <div class="product-container">
      <div
        :class="[
          selectIndex ? 'left-product' : 'left-product-select',
          'both-product-container',
        ]"
        :style="getLeftBg()"
        @click="changeComboHandle(0)"
      >
        <img
          v-if="selectIndex === 0"
          src="../assets/img/img_buy_choose.png"
          class="check_icon"
        />
        <div :class="['title', this.selectIndex ? 'title-unselect' : null]">
          单项购买
        </div>
        <div class="image-contaier-left">
          <img
            class="icon"
            :src="
              product_key === 'h5_marriage'
                ? getH5MarriageIcon
                : new_ganqing_small
            "
          />
          <div class="desc">
            {{ product_key === "h5_marriage" ? "八字合婚" : "2024年感情运势" }}
          </div>
        </div>
        <div
          class="bottom-container"
          :style="{ background: this.selectIndex ? '#DFDFDF' : '#E24C2E' }"
        >
          <div class="left">{{ this.now_price }}</div>
          <div class="right">{{ this.origin_price }}</div>
        </div>
      </div>
      <div
        :class="[
          selectIndex ? 'right-product-select' : 'right-product',
          'both-product-container',
        ]"
        :style="getRightBg()"
        @click="changeComboHandle(1)"
      >
        <img
          v-if="selectIndex === 1"
          src="../assets/img/img_buy_choose.png"
          class="check_icon"
        />
        <div :class="['title', this.selectIndex ? null : 'title-unselect']">
          超值套餐
        </div>

        <div class="image-contaier-right">
          <div class="image-item-contaier">
            <img
              class="icon"
              :src="
                product_key === 'h5_marriage'
                  ? getH5MarriageIcon
                  : new_ganqing_small
              "
            />
            <div class="desc">
              {{
                product_key === "h5_marriage" ? "八字合婚" : "2024年感情运势"
              }}
            </div>
          </div>

          <img class="icon-plus" src="../assets/img/img_buy_add_seleted.png" />

          <div class="image-item-contaier">
            <img
              class="icon"
              :src="
                product_key === 'h5_marriage'
                  ? new_ganqing_small
                  : getH5MarriageIcon
              "
            />
            <div class="desc">
              {{
                product_key === "h5_marriage" ? "2024年感情运势" : "八字合婚"
              }}
            </div>
          </div>
        </div>

        <div
          class="bottom-container"
          :style="{ background: this.selectIndex ? '#E24C2E' : '#DFDFDF' }"
        >
          <div class="left">{{ this.now_price_combo }}</div>
          <div class="right">{{ this.origin_price_combo }}</div>
        </div>
      </div>
    </div>
    <div class="time-container">
      <div class="left-container">
        <img src="../assets/img/buy_icon_daojishi.png" />
        <div class="desc">限时优惠倒计时</div>
      </div>
      <div class="right-container">
        <count-down
          ref="countDown"
          :time="time"
          millisecond
          class="time-box"
          @change="getTime"
        >
          <template #default="timeData">
            <span
              :class="{
                block: true,
                'rgb-light': is_show_shandong,
              }"
              >{{ timeData.minutes | filterTime }}</span
            >
            <span :class="{ colon: true, 'rgb-color': is_show_shandong }"
              >:</span
            >
            <span
              :class="{
                block: true,
                'rgb-light': is_show_shandong,
              }"
              >{{ timeData.seconds | filterTime }}</span
            >
            <span :class="{ colon: true, 'rgb-color': is_show_shandong }"
              >:</span
            >

            <span
              :class="{
                block: true,
                'rgb-light': is_show_shandong,
              }"
            >
              <span :class="{ mill: time === 1 }">
                {{ timeData.milliseconds | filterTime }}
              </span></span
            >
          </template>
        </count-down>
      </div>
    </div>
  </div>
</template>

<script>
import { CountDown } from "vant";
import { banner_enums } from "../libs/enum";
import utils from "../libs/utils";
import buy_choose from "../assets/img/img_buy_choose.png";
import cn_small_bzhh from "../assets/img/common/banner/small/cn/h5_fang_jian_bazihehun.png";
import tw_small_bzhh from "../assets/img/common/banner/small/tw/h5_fang_fan_bazihhehun.png";
import new_ganqing_small from "../assets/img/emotion_v2/new/banner_ganqing_fang.png";

export default {
  props: {
    index: {
      default: 0,
      type: Number,
    },

    product_key: {
      type: String,
      default: "h5_marriage",
      //h5_emotion2024
    },
    //组合两项优惠信息
    h5_combo2_attach: {
      type: Object,
      default: undefined,
    },
    //当前报告信息
    product: {
      type: Object,
      default: {},
    },
    all_product: {
      type: Array,
      default: [],
    },
    
  },
  data() {
    return {
      selectIndex: 1,
      is_show_shandong: false,
      is_show_daoqi: false,
      time: 0,
      new_ganqing_small,
    };
  },
  filters: {
    filterTime(val_) {
      let val = val_.toString();
      if (val.length === 1) {
        return "0" + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    },
  },
  created() {
    // 首次挽留的弹窗计时
    let use_fixed_time = this.$route.query.use_fixed_time;
    if (use_fixed_time) {
      this.time = +localStorage.getItem(`mlxz_fixed_local_order_time`);
      localStorage.removeItem("mlxz_fixed_local_order_time");
    } else {
      this.time = 15 * 60 * 1000;
      // localStorage.removeItem(`mlxz_new_time_down_${this.product_key}`);
    }
  },
  watch: {
    index(val) {
      this.selectIndex = val;
    },
  },
  components: {
    CountDown,
  },

  computed: {
    is_cn() {
      return utils.getLanguage() === "zh-CN";
    },
    is_show_combination() {
      return !["enjoy03", "panda03"].includes(utils.getFBChannel());
    },
    getH5MarriageIcon() {
      if (this.is_cn) {
        return cn_small_bzhh;
      } else {
        return tw_small_bzhh;
      }
    },
    now_price() {
      return this.product
        ? this.product.unit + " " + this.product.price_str
        : "-";
    },
    origin_price() {
      return this.product
        ? this.product.unit + " " + this.product.origin_price_str
        : "-";
    },

    now_price_combo() {
      return this.h5_combo2_attach
        ? this.h5_combo2_attach.unit + " " + this.h5_combo2_attach.price_str
        : "-";
    },
    origin_price_combo() {
      return this.h5_combo2_attach
        ? this.h5_combo2_attach.unit + " " + this.h5_combo2_attach.origin_price_str
        : "-";
    },
  },
  methods: {
    changeComboHandle(type) {
      if(this.selectIndex !== type) {
        this.selectIndex = type;
        if(type === 0) {
          this.$emit('get_combine_product_ids', []);
        } else {
          this.$emit('get_combine_product_ids', this.getCombineProductIds());
        }
      }
    },

    //获取组合套餐商品id集合
    getCombineProductIds() {
      let array = [this.product.product_id];
      let tags = this.h5_combo2_attach.tags;
      let otherProductKey = tags.filter(item=>item !== this.product.product_key)[0];
      let otherProductId = this.all_product.filter(item=>item.product_key === otherProductKey)[0].product_id;
      array.push(otherProductId);
      return array;
    },

    getLeftBg() {
      if (this.selectIndex === 1) {
        if (this.product_key === "h5_marriage") {
          return "background: #FBF8ED;";
        } else {
          return "background: #FFFAFA;";
        }
      }
    },

    getRightBg() {
      if (this.selectIndex === 0) {
        if (this.product_key === "h5_marriage") {
          return "background: #FBF8ED;";
        } else {
          return "background: #FFFAFA;";
        }
      }
    },
    getTime(val) {
      const { minutes, seconds, milliseconds } = val;
      let time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      // 是否展示首次挽留弹窗 0 1展示 2不展示  并缓存当前时间用于弹窗倒计时
      let notice_num = localStorage.getItem(
        `mlxz_show_notice_${this.product_key}`
      );
      if (notice_num) {
        if (+notice_num === 1) {
          localStorage.setItem(`mlxz_count_down_${this.product_key}`, time_);
        }
      } else {
        localStorage.setItem(`mlxz_count_down_${this.product_key}`, time_);
      }
      localStorage.setItem(`mlxz_fixed_local_order_time`, time_);

      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time = 0;
        this.$refs.countDown.pause();
        this.$refs.countDown.reset();
      }
    },
  },
};
</script>

<style scoped lang="less">
.group-purchase {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .product-container {
    width: 6.5rem;
    height: 3.38rem;
    margin-top: 0.3rem;
    position: relative;
    .left-product-select {
      left: 0;
      top: 0;
      width: 3.45rem;
      height: 3.38rem;
      background: #fff0ec;
      box-shadow: 0px 0px 30px 0px rgba(209, 19, 64, 0.2);
      border-radius: 0.1rem;
      border: 0.03rem solid #e24c2e;
      z-index: 2;
      position: absolute;
    }
    .left-product {
      left: 0;
      top: 0.15rem;
      width: 3.25rem;
      height: 3.08rem;
      background: #fbf8ed;
      border-radius: 0.1rem;
      border: 0.03rem solid #dfdfdf;
      z-index: 1;
      position: absolute;
    }
    .both-product-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      .check_icon {
        position: absolute;
        top: 0;
        right: -0.025rem;
        /* right: 0rem; */
        width: 0.44rem;
        height: 0.44rem;
      }
      .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 0.36rem;
        color: #e24c2e;
        margin-top: 0.2rem;
      }
      .title-unselect {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 0.3rem;
        color: #393939;
        margin-top: 0.16rem;
      }
      .image-contaier-left {
        margin-top: 0.08rem;
        width: 1.16rem;
        height: 1.78rem;
        background: #fff5f3;
        border-radius: 0.1rem;
        border: 0.01rem solid #e24c2e;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 1rem;
          height: 1rem;
          margin-top: 0.08rem;
        }
        .desc {
          width: 0.96rem;
          height: 0.54rem;
          margin-top: 0.08rem;
          font-weight: 400;
          font-size: 0.22rem;
          color: #564c4a;
          text-align: center;
          font-style: normal;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .image-contaier-right {
        margin-top: 0.08rem;
        width: 3.05rem;
        height: 1.78rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 0.24rem;
        color: #564c4a;

        .image-item-contaier {
          margin-top: 0.08rem;
          width: 1.16rem;
          height: 1.78rem;
          background: #fff5f3;
          border-radius: 0.1rem;
          border: 0.01rem solid #e24c2e;
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon {
            width: 1rem;
            height: 1rem;
            margin-top: 0.08rem;
          }
          .desc {
            width: 0.96rem;
            height: 0.54rem;
            margin-top: 0.08rem;
            font-weight: 400;
            font-size: 0.22rem;
            color: #564c4a;
            text-align: center;
            font-style: normal;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .icon-plus {
          width: 0.48rem;
          height: 0.48rem;
        }
      }
      .bottom-container {
        margin-top: 0.2rem;
        width: 100%;
        height: 0.64rem;
        /* background: #e24c2e; */
        border-radius: 0px 0px 0.1rem 0.1rem;
        margin-bottom: 0rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .left {
          font-weight: 600;
          font-size: 0.32rem;
          color: #ffffff;
          text-align: left;
          font-style: normal;
        }
        .right {
          font-weight: 400;
          font-size: 0.26rem;
          color: rgba(255, 255, 255, 0.5);
          font-style: normal;
          text-decoration: line-through;
        }
      }
    }
    .right-product-select {
      /* right: 0; */
      left: 3.05rem;
      top: 0;
      width: 3.45rem;
      height: 3.38rem;
      background: #fff0ec;
      box-shadow: 0px 0px 0.3rem 0px rgba(209, 19, 64, 0.2);
      border-radius: 0.1rem;
      border: 0.03rem solid #e24c2e;
      z-index: 2;
      position: absolute;
    }
    .right-product {
      right: 0;
      top: 0.15rem;
      width: 3.25rem;
      height: 3.08rem;
      background: #fbf8ed;
      border-radius: 0.1rem;
      border: 0.03rem solid #dfdfdf;
      z-index: 1;
      position: absolute;
    }
  }
  .time-container {
    width: 6.5rem;
    height: 0.48rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4rem;
    .left-container {
      font-weight: 600;
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      color: #e24c2e;
      img {
        width: 0.48rem;
        height: 0.48rem;
      }
      .desc {
        font-weight: 600;
        font-size: 0.32rem;
        color: #e24c2e;
        margin-left: 0.1rem;
      }
    }
  }

  .colon {
    margin: 0 0.02rem;
    display: flex;
    align-items: center;
    color: #e24c2e;
  }
  .block {
    width: 0.4rem;
    height: 100%;
    font-size: 0.26rem;
    border-radius: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #e24c2e; /* 初始背景色 */
  }
  .count-down {
    height: 100%;
    display: flex;
  }
  @keyframes noticeTime {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .mill {
    animation: noticeTime 0.24s infinite;
  }
  @keyframes rgb-light {
    0% {
      background-color: #e24c2e;
    }
    33.333% {
      background-color: #f5ae00;
    }
    66.666% {
      background-color: #662cf3;
    }
    100% {
      background-color: #e24c2e;
    }
  }
  .rgb-light {
    animation: rgb-light 720ms infinite linear;
  }

  .rgb-color {
    animation: rgb-text 720ms infinite linear;
  }
  @keyframes rgb-text {
    0% {
      color: #e24c2e;
    }
    33.333% {
      color: #f5ae00;
    }
    66.666% {
      color: #662cf3;
    }
    100% {
      color: #e24c2e;
    }
  }
  .time-box {
    display: flex;
    flex-direction: row;
    height: 0.4rem;
  }
}
</style>
