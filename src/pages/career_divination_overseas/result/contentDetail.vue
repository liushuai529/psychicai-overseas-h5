<template>
  <div
    class="shadow"
    :class="{ 'yellow-bg': index == 3 || index == 4 || index == 8 }"
  >
    <img class="title" :src="title_url" alt v-if="index > 1" />
    <div v-if="index != 1 && index != 2 && index != 8" class="content">
      <div class="content-inner" v-html="data"></div>
    </div>
    <div v-if="index == 1" class="content score">
      <div class="content-inner">
        <p
          v-for="(item, index) in data"
          :class="{ 'score-seperate': index == 1 || index == 4 }"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div v-if="index == 2" class="content shengxiao">
      <div class="content-inner">
        <div>
          <span class="lf">三合生肖：{{ data['sh'] }}</span>
          <span>六合生肖：{{ data['lh'] }}</span>
        </div>
        <div>
          <span class="lf">相冲生肖：{{ data['xc'] }}</span>
          <span>相害生肖：{{ data['xh'] }}</span>
        </div>
        <div class="score-seperate">
          <span>相刑生肖：{{ data['xx'] }}</span>
        </div>
        <div>
          <p>生肖详解</p>
          <p v-html="data['xj']"></p>
        </div>
      </div>
    </div>
    <div v-if="index == 8" class="content dianjing">
      <div class="content-inner">
        <div class="dot-item">
          <p>正月</p>
          <p>{{ data['1'] }}</p>
        </div>
        <div class="dot-item">
          <p>二月</p>
          <p>{{ data['2'] }}</p>
        </div>
        <div class="dot-item">
          <p>三月</p>
          <p>{{ data['3'] }}</p>
        </div>
        <div class="dot-item">
          <p>四月</p>
          <p>{{ data['4'] }}</p>
        </div>
        <div class="dot-item">
          <p>五月</p>
          <p>{{ data['5'] }}</p>
        </div>
        <div class="dot-item">
          <p>六月</p>
          <p>{{ data['6'] }}</p>
        </div>
        <div class="dot-item">
          <p>七月</p>
          <p>{{ data['7'] }}</p>
        </div>
        <div class="dot-item">
          <p>八月</p>
          <p>{{ data['8'] }}</p>
        </div>
        <div class="dot-item">
          <p>九月</p>
          <p>{{ data['9'] }}</p>
        </div>
        <div class="dot-item">
          <p>十月</p>
          <p>{{ data['10'] }}</p>
        </div>
        <div class="dot-item">
          <p>冬月</p>
          <p>{{ data['11'] }}</p>
        </div>
        <div class="dot-item">
          <p>臘月</p>
          <p>{{ data['12'] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'index'],
  data() {
    return {};
  },
  computed: {
    title_url() {
      return this['title_' + this.index];
    },
  },
};
</script>

<style scoped>
.shadow {
  margin-top: 0.4rem;
  text-align: center;
}

img.title {
  display: block;
  width: 3.4rem;
  vertical-align: top;
  margin: 0 auto;
  margin-top: 0.4rem;
  margin-bottom: 0.2rem;
}

.content {
  color: #d13c3e;
  font-size: 0.32rem;
  background-color: #fdf5dd;
  padding: 0.2rem;
  border-radius: 0.2rem;
  line-height: 0.54rem;
  text-align: left;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: top center, bottom center;
}

.content-inner {
  height: 100%;
  overflow: hidden;
  padding: 0.4rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: top center, bottom center;
}

.score-seperate {
  margin-bottom: 0.4rem;
}

.shengxiao .lf {
  display: inline-block;
  width: 3.6rem;
}

.dianjing {
  overflow: hidden;
}

.dot-item {
  float: left;
  font-size: 0.28rem;
}

.dot-item:nth-child(even) {
  float: right;
}
</style>
