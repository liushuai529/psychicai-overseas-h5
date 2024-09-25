<template>
  <div class="user-info">
    <!-- <div class="top-bg">
      <img class="top-bg" src="../../../assets/img/emotion_fate/xinxi_img_bj_shang.webp" />
    </div> -->
    <div :class="['info-content']">
      <table class="user-table">
        <tr>
          <td style="border-right: 0.01rem solid #F9C3C3;width: 50%;">姓名：{{ username | filter_name }}</td>
          <td >性别：{{ sex==0 ? '女' : '男' }}</td>
         
        </tr>
        <tr>
          <td colspan="2">{{ `${is_cn? '出生时间：': '出生時間：'}${picker_date_yangli}` }}</td>
        </tr>
        <tr>
          <td colspan="2">农历：{{ picker_date_nongli }}</td>
        </tr>
      </table>

    </div>
   
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';
export default {
  props: [
    'username',
    'sex',
    'picker_date_yangli',
    'picker_date_nongli',
  ],
  data() {
    return {

 
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
  height: 2.4rem;
  display: flex;
  flex-direction: column;

  .top-bg {
    width: 7.1rem;
    height: 0.4rem;
    display: flex;

  }

  .info-content {
    // background: url('../../../assets/img/emotion_fate/xinxi_img_bj_zhong.webp') no-repeat;
    width: 7.1rem;
    // height: 3.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-between;
    padding: 0 0.22rem;
    background-size: cover;

    .user-table {
      width: 6.5rem;
      height: 2.06rem;
      min-height: 2.06rem;
      background: #FFE8E8;
      border: 0.01rem solid #F9C3C3;
      font-weight: 500;
      font-size: 0.28rem;
      color: #3A0922;
      line-height: 0.42rem;
      text-align: center;
      font-style: normal;
      tr {
        height: 0.68rem;
        border: 0.01rem solid #F9C3C3;
      }
    }

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
          text-align: center;
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
      margin-top: 0.25rem;
      justify-content: space-evenly;
      width: 100%;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
}
</style>
