<template>
  <div class="container">
    <!-- <div class="header-box">
      <img
        @click="backUrl()"
        src="../../assets/img/mlxz/back_icon.png"
        class="back-icon"
        alt=""
      />
      <div class="title">即时测算</div>
      <img src="../../assets/img/mlxz/me_icon_ji.png" class="ji-icon" alt="" />
    </div> -->
    <div class="content">
      <div class="list">
        <div
          v-for="(item, k) in measure_list"
          :key="'measure' + k"
          @click="jumpMeasure(item)"
          :class="['item', `item-${k + 1}`]"
        >
          <div class="title">
            <!-- <span>{{ item.name }}</span> -->
            <!-- <img
              src="../../assets/img/mlxz/cesuan_home/back_right.webp"
              alt=""
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';

const allMeasure = () => {
  return [
    {
      id: 1,
      name: '瞬时卦',
      url: 'mlxz://time/calculate',
    },
    // {
    //   id: 2,
    //   name: '六爻排盘',
    //   url: 'mlxz://liuyao/calculate',
    // },
    {
      id: 3,
      name: '数字风水',
      url: 'mlxz://phonenumber/calculate',
    },
    {
      id: 4,
      name: '号码测财运',
      url: 'mlxz://numbermoney/calculate',
    },
    {
      id: 5,
      name: '缘分深深',
      url: 'mlxz://intimacy/calculate',
    },
    {
      id: 6,
      name: '塔罗问问',
      url: 'mlxz://tarot/gptchat',
    },
  ];
};

export default {
  data() {
    return {
      measure_list: allMeasure(),
    };
  },
  created() {
    document.title = '即时测算';
  },
  methods: {
    jumpMeasure(item) {
      location.href = item.url;
    },
    backUrl() {
      location.href = 'mlxz://back';
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 7.5rem;
  min-height: 100vh;
  background: #000;
  position: relative;
  overflow-x: hidden;
  .header-box {
    width: 7.5rem;
    height: 1.52rem;
    background: url('../../assets/img/mlxz/cesuan_home/history_bg.webp')
      no-repeat;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back-icon {
      width: 0.44rem;
      height: 0.44rem;
      margin-left: 0.3rem;
    }
    .title {
      font-size: 0.36rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 0.36rem;
    }
    .ji-icon {
      width: 0.44rem;
      height: 0.44rem;
      margin-right: 0.3rem;
      visibility: hidden;
    }
  }
  .content {
    margin-top: 0.26rem;
    .list {
      margin: 0 0.3rem 0.3rem;
      .item {
        width: 6.9rem;
        height: 1.4rem;
        display: flex;
        align-items: center;
        margin-bottom: 0.24rem;
        background-size: contain;
        font-size: 0.3rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 0.3rem;
        position: relative;
        .title {
          display: flex;
          align-items: center;
          position: absolute;
          right: 0.3rem;
          img {
            width: 0.16rem;
            height: 0.28rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
}
.item-1 {
  background: url('../../assets/img/mlxz/cold_start/问答-瞬时卦@3x.webp')
    no-repeat;
}
.item-2 {
  background: url('../../assets/img/mlxz/cold_start/问答-数字风水@3x.webp')
    no-repeat;
}
.item-3 {
  background: url('../../assets/img/mlxz/cold_start/问答-号码测孕@3x.webp')
    no-repeat;
}
.item-4 {
  background: url('../../assets/img/mlxz/cold_start/问答-缘分深深@3x.webp')
    no-repeat;
}
.item-5 {
  background: url('../../assets/img/mlxz/index/img_bg_taluo.webp') no-repeat;
}
</style>
