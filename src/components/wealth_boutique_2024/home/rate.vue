<template>
  <div class="rate">
    <img
      class="title"
      src="./../../../assets/img/wealth/home/rate_titles.png"
      alt=""
    />
    <div class="content">
      <p>
        本测算一共帮助了<span class="number">{{ user_number }}</span
        >位用户，<span class="percent">99%</span>以上用户测了都觉得准！
      </p>
      <div class="middle">
        <span>评分： 9.99 </span>
        <span class="star-box">
          <img
            class="star"
            src="./../../../assets/img/wealth/home/star_light.png"
            alt=""
          />
          <img
            class="star"
            src="./../../../assets/img/wealth/home/star_light.png"
            alt=""
          />
          <img
            class="star"
            src="./../../../assets/img/wealth/home/star_light.png"
            alt=""
          />
          <img
            class="star"
            src="./../../../assets/img/wealth/home/star_light.png"
            alt=""
          />
          <img
            class="star"
            src="./../../../assets/img/wealth/home/star_gray.png"
            alt=""
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user_number() {
      return this.$store.state.year_user;
    },
    isAndroid() {
      const user_agent = navigator.userAgent.toLocaleLowerCase();
      return /android/i.test(user_agent);
    },
  },
};
</script>

<style scoped>
.rate {
  margin-top: 0.4rem;
}
.title {
  width: 3.4rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.3rem;
}
.content {
  /* height: 3rem; */
  background-color: #fdf2d2;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  padding: 0.32rem;
  font-size: 0.28rem;
}

.number {
  color: #c72f35;
}

.percent {
  color: #000;
}

.middle {
  margin-top: 0.34rem;
  margin-bottom: 0.34rem;
}

.star-box {
  margin-left: 0.2rem;
}

.star {
  width: 0.28rem;
  margin-top: 0.04rem;
  vertical-align: top;
}

.tip {
  -webkit-border-radius: 0.12rem;
  border-radius: 0.12rem;
  display: inline-block;
  width: 1.46rem;
  height: 0.52rem;
  line-height: 0.52rem;
  text-align: center;
}
.tip-android {
  line-height: 0.6rem;
}

.tip-one {
  background-color: rgb(243, 171, 191);
}

.tip-two {
  background-color: rgb(251, 204, 122);
}

.tip-three {
  background-color: rgb(227, 167, 255);
}
</style>
