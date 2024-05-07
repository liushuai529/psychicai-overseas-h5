<template>
  <div class="form">
    <div class="main-title">
      <img
        src="./../../../assets/img/mlxz/lucky_year_report/home/info_title.png"
      />
    </div>
    <div class="main-content">
      <div class="info-item">
        <label class="title" for="">姓名</label>
        <div class="content">
          <input
            class="name"
            type="text"
            placeholder="请输入姓名"
            v-model="username"
          />
        </div>
      </div>
      <div class="info-item">
        <label class="title" for="">性别</label>
        <div class="content">
          <div class="male" @click="chooseMale">
            <span class="sex-cricle">
              <span
                class="sex-dot"
                :class="{ 'selected-dot': choose_male }"
              ></span>
            </span>
            <span class="sex">男</span>
          </div>
          <div class="female" @click="chooseFemale">
            <span class="sex-cricle">
              <span
                class="sex-dot"
                :class="{ 'selected-dot': !choose_male }"
              ></span>
            </span>
            <span>女</span>
          </div>
        </div>
      </div>
      <div class="info-item" @click="openPicker">
        <label class="title" for="">生日</label>
        <div class="content">
          <input
            style="width: 200px"
            type="text"
            v-model="date"
            placeholder="请选择出生日期"
            disabled
          />
        </div>
        <div
          class="arrow"
          :style="{ backgroundImage: 'url(' + arrowImg + ')' }"
        ></div>
      </div>
      <div class="info-item" @click="openHourPicker">
        <label class="title" for="">时辰</label>
        <div class="content">
          <input
            type="text"
            v-model="hour"
            placeholder="不清楚出生时间"
            disabled
          />
          <!-- <span>{{hour}}</span> -->
        </div>
        <div
          class="arrow"
          :style="{ backgroundImage: 'url(' + arrowImg + ')' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import arrowImg from './../../../assets/img/gossip/home/down_arrow.png';
import main_title_bg from './../../../assets/img/year/bjmy0@2x.png';

export default {
  props: ['name', 'sex', 'date', 'hour'],
  data() {
    return {
      arrowImg: arrowImg,
      main_title_bg: main_title_bg,
      choose_male: true,
      username: '',
    };
  },
  watch: {
    name(newV, oldV) {
      this.username = newV;
    },
    sex(newV, oldV) {
      if (newV == 'male') {
        this.choose_male = true;
      } else {
        this.choose_male = false;
      }
    },

    username(newV, oldV) {
      this.$parent.username = newV;
    },
  },
  methods: {
    openPicker() {
      this.$parent.openPicker();
    },
    openHourPicker() {
      this.$parent.openHourPicker();
    },
    toResult() {
      this.$parent.toResult();
    },
    chooseMale() {
      this.choose_male = true;
      this.$parent.sex = 'male';
    },
    chooseFemale() {
      this.choose_male = false;
      this.$parent.sex = 'female';
    },
  },
};
</script>

<style scoped>
.form {
  padding-top: 0.4rem;
}

.main-title {
  width: 70%;
  text-align: center;
  font-size: 0.32rem;
  margin: 0 auto;
  margin-bottom: 0.44rem;
}

.main-title img {
  width: 100%;
}

.main-content {
  background-color: #fdf3cf;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  margin-bottom: 0.12rem;
  font-size: 0.28rem;
  padding: 0.2rem 0.24rem;
  border: 0.02rem solid #deb782;
}

.content {
  background-color: #fdf3cf;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  margin-bottom: 0.12rem;
  font-size: 0.28rem;
  padding: 0 0.24rem;
}
input {
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
* {
  -webkit-tap-highlight-color: transparent !important;
}
input[disabled] {
  color: #000 !important;
  opacity: 1 !important;
  font-weight: 500;
  background: transparent !important;
  -webkit-tap-highlight-color: transparent !important;
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  -webkit-appearance: none;
  outline: none;
  border: none;
}
.info {
  margin: 0.2rem 0.15rem 0.81rem;
  font-size: 0.34rem;
  color: #000;
}
.info-title {
  width: 100%;
  margin-bottom: 0.52rem;
}
.info-box {
  border: 1px solid #f7bd61;
  -webkit-border-radius: 0.06rem;
  border-radius: 0.06rem;
  padding: 0.44rem;
  background-color: #fff;
}
.info-item {
  height: 0.82rem;
  line-height: 0.82rem;
  border-bottom: 1px dashed #cfcfcf;
  overflow: hidden;
  padding: 0 0.2rem;
}

.info-item .title {
  float: left;
  font-weight: bold;
  font-size: 0.28rem;
  color: #deb782;
  margin-right: 0.4rem;
}
.info-item .name {
  padding: 0.1rem;
  border: 0.02rem solid #eedbc0;
  border-radius: 0.14rem;
  background-color: #fdf3cf;
}
.info-item .content {
  float: left;
  height: 100%;
  color: #000;
}
.info-item .content .male {
  float: left;
}
.info-item .content div .select-img {
  float: left;
  width: 0.32rem;
  height: 0.88rem;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 0.14rem;
}
.info-item .content .male span {
  vertical-align: middle;
  float: left;
}
.info-item .content .female {
  float: left;
  margin-left: 1.4rem;
}
.info-item .content .female span {
  vertical-align: middle;
  float: left;
}
.arrow {
  width: 0.34rem;
  height: 100%;
  float: right;
  -webkit-background-size: 0.34rem 0.2rem;
  background-size: 0.34rem 0.2rem;
  background-position: center center;
  background-repeat: no-repeat;
}
.button {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: #da3834;
  color: #fff;
  -webkit-border-radius: 0.4rem;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 0px 1px #b51712;
  margin-top: 0.64rem;
}

.sex-cricle {
  display: inline-block;
  height: 0.4rem;
  width: 0.4rem;
  border: 0.02rem solid #eedbc0;
  border-radius: 100%;
  position: relative;
  margin-top: 0.18rem;
  margin-right: 0.14rem;
}
.sex-dot {
  width: 0.2rem;
  height: 0.2rem;
  background-color: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 100%;
}
.selected-dot {
  background-color: #000;
}
.mail-input {
  width: 4.8rem;
  height: 0.52rem;
  border: 1px solid #edcda4;
  font-size: 0.24rem;
  color: #000;
  margin-left: 0.26rem;
  padding-left: 0.2rem;
}
</style>
