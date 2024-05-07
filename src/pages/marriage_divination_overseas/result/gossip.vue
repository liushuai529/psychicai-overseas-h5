<template>
  <div class="gossip">
    <img
      class="title"
      src="./../../../assets/img/mlxz/career/result/result_content_title.png"
      alt=""
    />
    <div class="content guaxiang" :style="{ backgroundImage: guaxiang_bg }">
      <p class="guaxiang-title">
        <span v-if="data.g">{{ data.g }}：{{ data.t }}</span>
        <span v-if="data.c">（{{ data.c }}）</span>
      </p>
      <div class="guaxiang-content">
        <div
          class="guaxiang-item"
          v-for="(item, index) in data.list"
          :key="index"
        >
          <span class="first">{{ item[1] }}</span>
          <img
            v-if="item[2] == 1"
            src="./../../../assets/img/marriage_divination_overseas/result/one_white_03.jpg"
          />
          <img
            v-if="item[2] == 2"
            src="./../../../assets/img/marriage_divination_overseas/result/two_white_03.jpg"
          />
          <span class="second">{{ item[3] }} {{ item[4] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from './../../../assets/img/marriage_divination_overseas/result/result_border_top.png';
import middle from './../../../assets/img/marriage_divination_overseas/result/result_border_middle.png';
import bottom from './../../../assets/img/marriage_divination_overseas/result/result_border_bottom.png';
import guaxiang_bg from './../../../assets/img/marriage_divination_overseas/result/guaxiang_bg.jpg';

export default {
  name: 'gossip',
  props: ['data'],
  data() {
    return {};
  },
  computed: {
    top() {
      return 'url("' + top + '")';
    },
    middle() {
      return 'url("' + middle + '")';
    },
    bottom() {
      return 'url("' + bottom + '")';
    },
    guaxiang_bg() {
      return 'url("' + guaxiang_bg + '")';
    },
  },
};
</script>

<style scoped>
.gossip {
  text-align: center;
}

.title {
  width: 100%;
  display: block;
  margin-top: 0.65rem;
  margin-bottom: 0.68rem;
}

.content {
  position: relative;
  height: 4.2rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.top,
.middle,
.bottom {
  width: 6.72rem;
  height: 0.72rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
}

.top {
  top: 0;
}

.middle {
  top: 0.72rem;
  height: auto;
  overflow: hidden;
}

.bottom {
  bottom: 0;
}

.guaxiang {
  color: #fdf5dd;
  font-size: 0.28rem;
}

.guaxiang-title {
  font-size: 0.32rem;
  padding: 0.2rem 0;
}

.guaxiang-item {
  height: 0.3rem;
  line-height: 0.3rem;
  margin-bottom: 0.25rem;
}

.guaxiang-item .first {
  float: left;
  width: 22%;
  height: 0.28rem;
  line-height: 0.28rem;
  text-align: right;
}

.guaxiang-item .second {
  float: left;
  height: 0.28rem;
  line-height: 0.28rem;
}

.guaxiang-item img {
  width: 30%;
  height: 0.25rem;
  float: left;
  vertical-align: middle;
  margin-left: 0.2rem;
  margin-right: 0.4rem;
  margin-top: 0.02rem;
}
</style>
