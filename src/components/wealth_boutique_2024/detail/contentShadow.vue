<template>
  <div class="shadow">
    <img
      class="desc-btn"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/detail_desc_unlock.png"
      alt=""
    />

    <!-- <img class="title" style="width: 2.49rem;height: 0.6rem" src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_1.png" alt="">
        <div class="content content-1" :style="{backgroundImage:content_bg_1}">
            <div class="content-main" @click="checkResult">
                <img class="content-btn" src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_1.png" alt="">
            </div>
        </div> -->

    <img
      class="title"
      style="width: 4.53rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_2.png"
      alt=""
    />
    <div class="content content-2" :style="{ backgroundImage: content_bg_2 }">
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_2.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_2.png"
          alt=""
        />
      </div>
    </div>

    <img
      class="title"
      style="width: 4.53rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_3.png"
      alt=""
    />
    <div class="content content-3" :style="{ backgroundImage: content_bg_3 }">
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_3.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_1.png"
          alt=""
        />
      </div>
    </div>

    <img
      class="title"
      style="width: 4.71rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_4.png"
      alt=""
    />
    <div
      class="content content-4"
      :style="{ backgroundImage: content_bg_4 }"
    ></div>

    <div
      class="content content-5"
      style="margin-top: 0.38rem"
      :style="{ backgroundImage: content_bg_5 }"
    >
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_5.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_1.png"
          alt=""
        />
      </div>
    </div>

    <img
      class="title"
      style="width: 4.53rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_6.png"
      alt=""
    />
    <div class="content content-6" :style="{ backgroundImage: content_bg_6 }">
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_6.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_2.png"
          alt=""
        />
      </div>
    </div>

    <img
      class="title"
      style="width: 4.53rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_7.png"
      alt=""
    />
    <div class="content content-7" :style="{ backgroundImage: content_bg_7 }">
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_7.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_2.png"
          alt=""
        />
      </div>
    </div>

    <img
      class="title"
      style="width: 4.53rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_8.png"
      alt=""
    />
    <div class="content content-8" :style="{ backgroundImage: content_bg_8 }">
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_8.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_2.png"
          alt=""
        />
      </div>
    </div>

    <img
      class="title"
      style="width: 4.53rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_9.png"
      alt=""
    />
    <div class="content content-9" :style="{ backgroundImage: content_bg_9 }">
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_9.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_1.png"
          alt=""
        />
      </div>
    </div>

    <img
      class="title"
      style="width: 4.53rem"
      src="./../../../assets/img/mlxz/lucky_year_report/detail/content_title_10.png"
      alt=""
    />
    <div class="content content-10" :style="{ backgroundImage: content_bg_9 }">
      <div class="content-main" @click="checkResult">
        <img
          class="content-detail"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_desc_10.png"
          alt=""
        />
        <img
          class="content-btn"
          src="./../../../assets/img/mlxz/lucky_year_report/detail/content_button_2_1.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import content_bg_1 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_1.png';
import content_bg_2 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_2.png';
import content_bg_3 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_3.png';
import content_bg_4 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_4.png';
import content_bg_5 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_5.png';
import content_bg_6 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_6.png';
import content_bg_7 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_7.png';
import content_bg_8 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_8.png';
import content_bg_9 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_9.png';
import content_bg_10 from './../../../assets/img/mlxz/lucky_year_report/detail/content_bg_10.png';

export default {
  data() {
    return {};
  },
  computed: {
    content_bg_1() {
      return 'url("' + content_bg_1 + '")';
    },
    content_bg_2() {
      return 'url("' + content_bg_2 + '")';
    },
    content_bg_3() {
      return 'url("' + content_bg_3 + '")';
    },
    content_bg_4() {
      return 'url("' + content_bg_4 + '")';
    },
    content_bg_5() {
      return 'url("' + content_bg_5 + '")';
    },
    content_bg_6() {
      return 'url("' + content_bg_6 + '")';
    },
    content_bg_7() {
      return 'url("' + content_bg_7 + '")';
    },
    content_bg_8() {
      return 'url("' + content_bg_8 + '")';
    },
    content_bg_9() {
      return 'url("' + content_bg_9 + '")';
    },
    content_bg_10() {
      return 'url("' + content_bg_10 + '")';
    },
  },
  methods: {
    checkResult() {
      this.$parent.autoUnlock();
    },
  },
};
</script>

<style scoped>
.shadow {
  margin-top: 0.4rem;
  text-align: center;
}
.desc-btn {
  width: 5.32rem;
  vertical-align: top;
  margin-top: 0.28rem;
}
.title {
  width: 6.74rem;
  vertical-align: top;
  margin-top: 0.4rem;
}
.content {
  background-position: center center;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 100%;
}
.content-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
}
.content-detail {
  margin: 0 auto;
  vertical-align: top;
  display: block;
}
.content-btn {
  width: 1.84rem;
  margin-top: 0.3rem;
  vertical-align: top;
}

.content-1 {
  height: 1.37rem;
}
.content-1 .content-btn {
  width: 3.24rem;
  height: 0.66rem;
}

.content-2 {
  height: 3.45rem;
}
.content-2 .content-detail {
  width: 4.71rem;
  height: 1.58rem;
  margin-top: 0.64rem;
}

.content-3 {
  height: 2.72rem;
}
.content-3 .content-detail {
  width: 4.71rem;
  margin-top: 0.35rem;
}
.content-3 .content-btn {
  margin-top: 0.25rem;
}

.content-4 {
  height: 2.28rem;
}

.content-5 {
  height: 2.76rem;
}
.content-5 .content-detail {
  width: 4.71rem;
  margin-top: 0.38rem;
}

.content-6 {
  height: 7.3rem;
}
.content-6 .content-detail {
  width: 4.71rem;
  margin-top: 2.42rem;
}

.content-7 {
  height: 3.1rem;
}
.content-7 .content-detail {
  width: 4.71rem;
  margin-top: 0.37rem;
}

.content-8 {
  height: 3.75rem;
}
.content-8 .content-detail {
  width: 4.71rem;
  margin-top: 0.85rem;
}

.content-9 {
  height: 2.85rem;
}
.content-9 .content-detail {
  width: 4.71rem;
  margin-top: 0.39rem;
}
.content-9 .content-btn {
  margin-top: 0.18rem;
}

.content-10 {
  height: 3.91rem;
}
.content-10 .content-detail {
  width: 4.71rem;
  margin-top: 0.82rem;
}
</style>
