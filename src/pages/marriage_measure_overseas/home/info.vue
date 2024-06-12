<template>
  <div class="form">
    <!-- <img
      class="title"
      src="../../../assets/img/mlxz/bzhh/ziliao_word.png"
      alt=""
    /> -->

    <img v-if="language === 'zh-CN'" class="title" src="./../../../assets/img/mlxz/bzhh/user-info-title.png" />
    <img v-else class="title" src="./../../../assets/img/tw_mlxz/bazihehun/home/user-info-title.png" />
    <!-- 男方 -->


    <div class="input-box">
      <div class="left">
        <img class="left" style="width: 1.22rem;height: 1.22rem;margin-right: 0.2rem;" src="./../../../assets/img/bzhh_v2/man-icon.png" />
      </div>
      <div class="right">
        <div class="input-item">
          {{ maleusername }}
          <div class="input-label">姓名：</div>
          <input class="input" id="maleusername" :placeholder="$t('name-placeholder')" v-model="maleusername" />
        </div>
        <div class="input-item">
          <div class="input-label">生日：</div>
          <div class="input" :style="{ color: maledate ? '#333' : 'rgba(51, 51, 51, 0.5)' }" @click="maleopenPicker">
            {{ maledate || $t('birth-placeholder') }}
          </div>
     
        </div>
      </div>

    </div>



    <!-- 女方 -->
    <div class="input-box">

      <div class="left">
        <img class="left" style="width: 1.22rem;height: 1.22rem;margin-right: 0.2rem;" src="./../../../assets/img/bzhh_v2/fman-icon.png" />
      </div>
      <div class="right">
        <div class="input-item">
          <div class="input-label">姓名：</div>
          <input class="input" id="femaleusername" :placeholder="$t('name-placeholder')" v-model="femaleusername" />
        </div>
        <div class="input-item">
          <div class="input-label">生日：</div>
          <div class="input" :style="{ color: femaledate ? '#333' : 'rgba(51, 51, 51, 0.5)' }"
            @click="femaleopenPicker">
            {{ femaledate || $t('birth-placeholder') }}
          </div>
     
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
export default {
  props: [
    'malename',
    'femalename',
    'maledate',
    'femaledate',
    'malehour',
    'femalehour',
  ],
  data() {
    return {
      choose_male: true,
      maleusername: '',
      femaleusername: '',

      width: 0,
      height: 0,
      language: utils.getLanguage(),
    };
  },
  watch: {
    malename(val) {
      console.log('val', val);
      this.maleusername = val;
      if (val) {
        let new_ = val.trim();
        let regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.maleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.maleusername = new_.slice(0, 20);
        }
      }
    },
    femalename(val) {
      this.femaleusername = val;
      if (val) {
        let new_ = val.trim();
        let regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.femaleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.femaleusername = new_.slice(0, 20);
        }
      }
    },
    sex(newV, oldV) {
      if (newV == '1') {
        this.choose_male = true;
      } else {
        this.choose_male = false;
      }
    },
    maleusername(newV, oldV) {
      console.log('newv', newV);
      // this.$parent.male.username = newV;
      if (newV) {
        let new_ = newV.trim();
        let regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.$parent.male.username = new_.replace(
            /[^\u4E00-\u9FA5A-Za-z0-9]/g,
            ''
          );
          this.maleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.$parent.male.username = new_.slice(0, 20);
          this.maleusername = new_.slice(0, 20);
        } else {
          this.$parent.male.username = newV;
          this.maleusername = newV;
        }
      } else {
        this.$parent.male.username = newV;
        this.maleusername = newV;
      }
    },
    femaleusername(newV, oldV) {
      // this.$parent.female.username = newV;
      if (newV) {
        let new_ = newV.trim();
        let regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.$parent.female.username = new_.replace(
            /[^\u4E00-\u9FA5A-Za-z0-9]/g,
            ''
          );
          this.femaleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.$parent.female.username = new_.slice(0, 20);
          this.femaleusername = new_.slice(0, 20);
        } else {
          this.$parent.female.username = newV;
          this.femaleusername = newV;
        }
      } else {
        this.$parent.female.username = newV;
        this.femaleusername = newV;
      }
    },
  },
  created() {
    this.width = window.screen.width > 750 ? 750 : window.screen.width;
  },
  mounted() { },
  destroyed() {
    localStorage.removeItem('bazi_count');
  },
  methods: {
    maleopenPicker() {
      this.$parent.openPicker('1');
    },
    femaleopenPicker() {
      this.$parent.openPicker('0');
    },
    maleopenHourPicker() {
      this.$parent.openHourPicker('1');
    },
    femaleopenHourPicker() {
      this.$parent.openHourPicker('0');
    },
    toResult() {
      this.$parent.toResult();
    },
    chooseMale() {
      this.choose_male = true;
      this.$parent.sex = '1';
    },
    chooseFemale() {
      this.choose_male = false;
      this.$parent.sex = '0';
    },
  },
};
</script>

<style scoped>
.form {
  position: relative;
  width: 7.3rem;
  height: 4.86rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  box-sizing: border-box;
  padding: 0.24rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: #FFEDD8;
  border: 0.09rem solid #B70E08;
  border-radius: 0.2rem;
}

.title {
  /* position: absolute;
  top: 0.4rem;
  left: 50%;
  margin-left: -1.5rem; */
  width: 7.5rem;
  height: 1.32rem;
}

.input-box {
  width: 100%;
  /* border: 0.02rem solid #e89b8a; */
  box-sizing: border-box;
  padding: 0 0.1rem;
  margin-bottom: 0.24rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #FFF5E9;
  border-radius: 0.08rem;

  .left {
    width: 1.22rem;
    height: 1.22rem;
    margin-right: 0.2rem;
  }
}

.input-box:last-child {
  margin: 0;
}

.input-item {
  position: relative;
  padding: 0.2rem 0;
  border-bottom: 0.02rem solid #d4cbb5;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.input-item:last-child {
  border-bottom: none;
}

.arrow {
  width: 0.12rem;
  height: 0.2rem;
  position: absolute;
  right: 0;
  font-size: 0.32rem;
}

.input-label {
  font-size: 0.32rem;
  line-height: 0.34rem;
  color: #9f2127;
  flex: none;
}

.input {
  flex: auto;
  font-size: 0.32rem;
  line-height: 0.34rem;
  color: #333;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
}

.input::input-placeholder {
  color: rgba(51, 51, 51, 0.5);
}

.input::-webkit-input-placeholder {
  color: rgba(51, 51, 51, 0.5);
}

.input::-moz-placeholder {
  color: rgba(51, 51, 51, 0.5);
}

.input::-moz-placeholder {
  color: rgba(51, 51, 51, 0.5);
}

.input::-ms-input-placeholder {
  color: rgba(51, 51, 51, 0.5);
}



</style>
