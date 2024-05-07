<template>
  <div
    class="form"
    :style="{
      width: width * 0.95 + 'px',
      height: (width * 0.95 * 5) / 7 + 'px',
    }"
  >
    <img
      class="title"
      src="../../../assets/img/mlxz/bzhh/ziliao_word.png"
      alt=""
    />
    <!-- 男方 -->
    <div class="input-box">
      <div class="input-item">
        <div class="input-label">男方姓名：</div>
        <input
          class="input"
          :placeholder="$t('name-placeholder')"
          v-model="maleusername"
        />
      </div>
      <div class="input-item">
        <div class="input-label">男方生日：</div>
        <div
          class="input"
          :style="{ color: maledate ? '#333' : 'rgba(51, 51, 51, 0.5)' }"
          @click="maleopenPicker"
        >
          {{ maledate || $t('birth-placeholder') }}
        </div>
        <img class="arrow" src="../../../assets/img/mlxz/bzhh/arrow.png" />
      </div>
    </div>
    <!-- 女方 -->
    <div class="input-box">
      <div class="input-item">
        <div class="input-label">女方姓名：</div>
        <input
          class="input"
          :placeholder="$t('name-placeholder')"
          v-model="femaleusername"
        />
      </div>
      <div class="input-item">
        <div class="input-label">女方生日：</div>
        <div
          class="input"
          :style="{ color: femaledate ? '#333' : 'rgba(51, 51, 51, 0.5)' }"
          @click="femaleopenPicker"
        >
          {{ femaledate || $t('birth-placeholder') }}
        </div>
        <img class="arrow" src="../../../assets/img/mlxz/bzhh/arrow.png" />
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  watch: {
    malename(newV, oldV) {
      this.maleusername = newV;
    },
    femalename(newV, oldV) {
      this.femaleusername = newV;
    },
    sex(newV, oldV) {
      if (newV == '1') {
        this.choose_male = true;
      } else {
        this.choose_male = false;
      }
    },
    maleusername(newV, oldV) {
      this.$parent.male.username = newV;
    },
    femaleusername(newV, oldV) {
      this.$parent.female.username = newV;
    },
  },
  created() {
    this.width = window.screen.width > 750 ? 750 : window.screen.width;
  },
  mounted() {},
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
  width: 7.02rem;
  height: 5rem;
  background-image: url('../../../assets/img/mlxz/bzhh/ziliao_bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  box-sizing: border-box;
  padding: 0.24rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.title {
  position: absolute;
  top: 0.4rem;
  left: 50%;
  margin-left: -1.5rem;
  width: 3rem;
}

.input-box {
  width: 100%;
  border: 0.02rem solid #e89b8a;
  box-sizing: border-box;
  padding: 0 0.2rem;
  margin-bottom: 0.24rem;
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
