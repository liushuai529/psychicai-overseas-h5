<template>
  <div class="comments">
    <img
      class="title"
      src="./../../../assets/img/mlxz/lucky_year_report/home/comments_title.png"
      alt=""
    />
    <div class="content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in stars" :key="item.index">
            <!-- <div class="comments-item"> -->
            <div class="desc">
              <div class="desc">
                <span class="name">{{ item.name }}</span>
                <div class="star">
                  <img
                    v-for="item in getStarts(item.star)"
                    :src="item"
                    alt=""
                    :key="item.index"
                  />
                </div>
              </div>
              <p class="comment">{{ item.comment }}</p>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="box-shadow"></div>
    </div>
  </div>
</template>

<script>
import solidStar from './../../../assets/img/mlxz/lucky_year_report/home/star_light.png';
import dashedStar from './../../../assets/img/mlxz/lucky_year_report/home/star_gray.png';
import request from './../../../libs/request.js';
export default {
  data() {
    return {
      stars: [],
      swiper: null,
    };
  },
  mounted() {
    this.getYearComments();
  },
  updated() {
    this.initSwiper();
  },
  methods: {
    getYearComments() {
      let that = this;
      request.getWealthBoutiqueComments(this).then(function (res) {
        let data = res.body;
        that.$store.commit('setYearUser', data.people);
        data.comments.forEach(element => {
          that.stars.push(element);
        });
      });
    },
    getStarts(star) {
      let starts = [dashedStar, dashedStar, dashedStar, dashedStar, dashedStar];
      for (var i = 0; i < star; i++) {
        starts.unshift(solidStar);
      }
      starts.length = 5;
      return starts;
    },
    initSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        direction: 'vertical',
        autoplay: 2000,
        loop: true,
        noSwiping: true,
      });
    },
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 8.2rem;
}
.swiper-slide {
  height: auto;
}
.comments {
  margin-top: 0.4rem;
  padding-bottom: 0.4rem;
}
.title {
  width: 3.4rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.4rem;
}
.content {
  height: 8.6rem;
  background-color: #fdf2d2;
  -webkit-border-radius: 0.2rem;
  border-radius: 0.2rem;
  font-size: 0.28rem;
  padding: 0.2rem;
  position: relative;
}
.desc {
  overflow: hidden;
  font-size: 0.3rem;
}

.desc .name {
  color: #e48f5d;
}
.desc .star {
  float: right;
  width: 1.6rem;
}
.desc .star img {
  width: 18%;
  vertical-align: middle;
  margin-left: 2%;
}
.box-shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
</style>
