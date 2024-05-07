<template>
  <div class="shadow">
    <img
      class="desc-btn"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_desc_unlock.png"
      alt
    />
    <img
      class="title"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_title_1.png"
      alt
    />
    <div class="content content-1" :style="{ backgroundImage: content_bg }">
      <div class="content-main" @click="toCheckstand">
        <img
          class="content-detail"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_desc_1.png"
          alt
        />
        <img
          class="content-btn"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_btn_red.png"
          alt
        />
      </div>
    </div>
    <img
      class="title"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_title_2.png"
      alt
    />
    <div class="content content-2" :style="{ backgroundImage: content_bg }">
      <div class="content-main" @click="toCheckstand">
        <img
          class="content-detail"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_desc_2.png"
          alt
        />
        <img
          class="content-btn"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_btn_red.png"
          alt
        />
      </div>
    </div>
    <img
      class="title"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_title_3.png"
      alt
    />
    <div class="content content-3" :style="{ backgroundImage: content_bg }">
      <div class="content-main" @click="toCheckstand">
        <img
          class="content-detail"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_desc_3.png"
          alt
        />
        <img
          class="content-btn"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_btn_red.png"
          alt
        />
      </div>
    </div>
    <img
      class="title"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_title_4.png"
      alt
    />
    <div class="content content-4" :style="{ backgroundImage: content_bg }">
      <div class="content-main" @click="toCheckstand">
        <img
          class="content-detail"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_desc_4.png"
          alt
        />
        <img
          class="content-btn"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_btn_red.png"
          alt
        />
      </div>
    </div>
    <img
      class="title"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_title_5.png"
      alt
    />
    <div class="content content-5" :style="{ backgroundImage: content_bg }">
      <div class="content-main" @click="toCheckstand">
        <img
          class="content-detail"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_desc_5.png"
          alt
        />
        <img
          class="content-btn"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_btn_red.png"
          alt
        />
      </div>
    </div>
    <img
      class="title"
      src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_title_6.png"
      alt
    />
    <div class="content content-6" :style="{ backgroundImage: content_bg }">
      <div class="content-main" @click="toCheckstand">
        <img
          class="content-detail"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_desc_6.png"
          alt
        />
        <img
          class="content-btn"
          src="./../../../assets/img/marriage_divination_overseas/detail/detail_content_btn_red.png"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import content_bg from './../../../assets/img/marriage_divination_overseas/detail/detail_content_bg.png';

export default {
  data() {
    return {};
  },
  computed: {
    content_bg() {
      return 'url("' + content_bg + '")';
    },
  },
  methods: {
    toCheckstand() {
      this.$parent.toCheckstand();
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
  width: 90%;
  vertical-align: top;
  margin-top: 0.28rem;
}

.title {
  height: 0.5rem;
  vertical-align: top;
  margin-top: 0.6rem;
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
  height: 3.3rem;
  width: 100%;
}

.content-detail {
  margin: 0 auto;
  vertical-align: top;
  width: 4.8rem;
  height: 2rem;
  display: block;
}

.content-btn {
  width: 3rem;
  margin-top: 0.4rem;
  vertical-align: top;
}

.content-1 {
  /*背景图高度*/
  height: 4.54rem;
}

.content-2 {
  /*背景图高度*/
  height: 4.54rem;
}

.content-3 {
  /*背景图高度*/
  height: 4.54rem;
}

.content-4 {
  /*背景图高度*/
  height: 4.54rem;
}

.content-5 {
  /*背景图高度*/
  height: 4.54rem;
}

.content-6 {
  /*背景图高度*/
  height: 4.54rem;
}
</style>
