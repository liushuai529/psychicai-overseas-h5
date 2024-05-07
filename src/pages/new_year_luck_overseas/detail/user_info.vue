<template>
  <div class="user-info">
    <img
      class="title"
      v-if="user_info.sex == '1'"
      src="../../../assets/img/icon_man.png"
      alt
    />
    <img
      class="title"
      v-if="user_info.sex == '0'"
      src="../../../assets/img/icon_woman.png"
      alt
    />
    <div class="detail">
      <p class="info-title">测算项目：全年运势</p>
      <p class="name">
        <span class="sub-title">姓名：</span>
        {{ user_info.name | filter_name }}
      </p>
      <p class="info-sex">性別：{{ user_info.sex == '1' ? '男' : '女' }}</p>
      <!-- 公历 -->
      <p class="birthday" v-if="user_info.is_gongli == '1'">
        <span class="sub-title">出生年月：</span>
        公历{{ user_info.birth_year }}年{{ user_info.birth_month }}月{{
          user_info.birth_date
        }}日
      </p>
      <!-- 農历 -->
      <p class="birthday" v-if="user_info.is_gongli == '0'">
        <span class="sub-title">出生年月：</span>
        农历{{ user_info.birth_year }}年{{
          user_info.birth_month | filterNongliMonth
        }}{{ user_info.birth_date | filterNongliDate }}
      </p>
    </div>
  </div>
</template>

<script>
import utils from '../../../libs/utils.js';

export default {
  props: ['userInfoStr', 'userInfo'],
  data() {
    return {
      user_info: { name: '' },
      gongli_nongli_string: '',
    };
  },
  created() {
    if (this.userInfo) {
      this.user_info = this.userInfo;
    } else {
      let query_user_string_array = this.userInfoStr.split('|');
      let [
        name,
        sex,
        is_gongli,
        birth_year,
        birth_month,
        birth_date,
        birth_hour,
      ] = query_user_string_array;

      this.user_info = {
        name,
        sex,
        is_gongli,
        birth_year,
        birth_month,
        birth_date,
        birth_hour,
      };
    }
  },
  computed: {
    bg() {
      return 'url(' + user_bg + ')';
    },
  },
  filters: {
    filter_name(val) {
      if (val) {
        return utils.decodeUnicode(val);
      }
    },
    filterNongliMonth(val) {
      return utils.formateNongliMonth(val);
    },
    filterNongliDate(val) {
      return utils.formateNongliDate(val);
    },
  },
};
</script>

<style scoped>
.user-info {
  font-size: 0.28rem;
  border-radius: 0.15rem;
  background-size: 100% 100%;
  text-align: center;
  color: rgb(132, 85, 50);
  padding: 0.2rem;
  overflow: hidden;
  line-height: 1.714;
  background-image: url('../../../assets/img/new_year_luck_overseas/result/detail_1.png');
}

.title {
  width: 1.5rem;
  height: 1.5rem;
  float: left;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-align: center;
  margin-right: 0.2rem;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
}

.title .sex {
  margin-top: 0.24rem;
}

.detail {
  text-align: left;
  float: left;
}

.birthday {
  white-space: nowrap;
  /* margin: 0.1rem 0; */
}
</style>
