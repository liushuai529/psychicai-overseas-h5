<template>
  <div class="user-info">
    <div class="top-bg">
      <img class="top-bg" src="../../../assets/img/emotion_fate/xinxi_img_bj_shang.webp" />
    </div>
    <div :class="['info-content']">
      <div class="user-info">
        <div class="name">
          <div class="left">姓名：{{ username | filter_name }}</div>
          <div class="right">性别：{{ sex ? '女' : '男' }}</div>
        </div>
        <div class="name">
          <div class="left-birth">出生时间：{{ picker_date_yangli }}</div>
          <div></div>
        </div>
        <div>农历：{{ picker_date_nongli }}</div>
        <!-- 11|1|1|1995|1|1|-1| -->
      </div>
      <div class="img-container">
        <img :src="is_cn ? cn_tag1 : tw_tag1" />
        <img :src="is_cn ? cn_tag2 : tw_tag2" />
        <img :src="is_cn ? cn_tag3 : tw_tag3" />
        <img :src="is_cn ? cn_tag4 : tw_tag4" />
      </div>

    </div>
    <div class="top-bg">
      <img class="top-bg" src="../../../assets/img/emotion_fate/xinxi_img_bj_xia.webp" />
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
import cn_pay_title1 from '../../../assets/img/emotion/pay_title1.webp';
import tw_pay_title1 from '../../../assets/img/tw_mlxz/emotion/result/pay_title1.webp';
import cn_tag1 from '../../../assets/img/emotion_fate/cn/img_paypage_tag_01_cn.webp';
import cn_tag2 from '../../../assets/img/emotion_fate/cn/img_paypage_tag_02_cn.webp';
import cn_tag3 from '../../../assets/img/emotion_fate/cn/img_paypage_tag_03_cn.webp';
import cn_tag4 from '../../../assets/img/emotion_fate/cn/img_paypage_tag_04_cn.webp';
import tw_tag1 from '../../../assets/img/emotion_fate/tw/img_paypage_tag_01_tw.webp';
import tw_tag2 from '../../../assets/img/emotion_fate/tw/img_paypage_tag_02_tw.webp';
import tw_tag3 from '../../../assets/img/emotion_fate/tw/img_paypage_tag_03_tw.webp';
import tw_tag4 from '../../../assets/img/emotion_fate/tw/img_paypage_tag_04_tw.webp';
export default {
  props: [
    'username',
    'sex',
    'picker_date_yangli',
    'picker_date_nongli',
  ],
  data() {
    return {
      cn_tag1,
      cn_tag2,
      cn_tag3,
      cn_tag4,
      tw_tag1,
      tw_tag2,
      tw_tag3,
      tw_tag4,
      cn_pay_title1,
      tw_pay_title1,
      language: utils.getLanguage(),
    };
  },
  created() { },
  computed: {
    is_cn() {
      return this.language === 'zh-CN';
    },
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
  },
  methods: {

  },
};
</script>

<style scoped lang="less">
.user-info {
  width: 7.1rem;
  height: 4.4rem;
  display: flex;
  flex-direction: column;

  .top-bg {
    width: 7.1rem;
    height: 0.4rem;
    display: flex;

  }

  .info-content {
    background: url('../../../assets/img/emotion_fate/xinxi_img_bj_zhong.webp') no-repeat;
    width: 7.1rem;
    // height: 3.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-between;
    padding: 0 0.22rem;
    background-size: cover;

    .user-info {
      width: 6.5rem;
      height: 2.06rem;
      min-height: 2.06rem;
      background: #FFFBEF;
      border: 0.01rem solid #FEE2B4;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      font-weight: 500;
      font-size: 0.28rem;
      color: #3A0922;
      line-height: 0.42rem;
      text-align: center;
      font-style: normal;

      .name {
        position: relative;
        display: flex;
        justify-content: space-between;

        .left-birth {
          display: flex;
          justify-content: center;
          flex: 1;
        }

        .left {
          display: flex;
          flex: 1;
          width: 3.25rem;
          // width: 50%;
          justify-content: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          display: -webkit-box;
        }

        .right {
          display: flex;
          flex: 1;
          width: 3.25rem;
          // width: 50%;
          justify-content: center;
        }

        .left::after {
          content: ''; // 必须
          position: absolute;
          left: 3.25rem;
          top: -0.2rem;
          right: 0;
          width: 0.01rem;
          height: 0.69rem;
          background-color: #FEE2B4;
        }

      }

      .name::after {
        content: ''; // 必须
        position: absolute;
        left: 0px;
        top: 0.48rem;
        right: 0;
        width: 6.5rem;
        height: 0.01rem;
        background-color: #FEE2B4;
      }

    }

    .img-container {
      display: flex;
      justify-content: space-between;
      margin-top: 0.25rem;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
}
</style>
