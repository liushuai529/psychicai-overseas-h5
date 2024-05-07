<template>
  <div class="user-info" :style="{ backgroundImage: bgc }">
    <img
      class="title"
      src="./../../../assets/img/wealth_boutique_overseas/detail/user_info_title.png"
      alt
    />
    <div class="content">
      <p class="name">
        <span class="sub-title">姓名：</span>
        {{ user_info.name | filter_name }}
      </p>
      <!-- 公曆 -->
      <p class="birthday" v-if="user_info.is_gongli == '1'">
        <span class="sub-title">生日：</span>
        公曆{{ user_info.birth_year }}年{{ user_info.birth_month }}月{{
          user_info.birth_date
        }}日
      </p>
      <!-- 農曆 -->
      <p class="birthday" v-if="user_info.is_gongli == '0'">
        <span class="sub-title">生日：</span>
        農曆{{ user_info.birth_year }}年{{
          user_info.birth_month | filterNongliMonth
        }}{{ user_info.birth_date | filterNongliDate }}
      </p>
      <p>
        <span class="sub-title">时辰：</span>
        {{ user_info.birth_hour | filter_hour }}
      </p>
    </div>
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import bg from './../../../assets/img/wealth_boutique_overseas/detail/user_info_bg.jpg';
export default {
  props: ['userInfoStr', 'userInfo'],
  data() {
    return {
      user_info: {},
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
    bgc() {
      return 'url("' + bg + '")';
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
    filterNongliHour(val) {
      return utils.formateNongliHour(val);
    },
    filter_hour(val) {
      let result = '不清楚具体时间';
      switch (val) {
        case '0':
          result = '子时(23:00 - 00:59)';
          break;
        case '1':
          result = '丑时(01:00 - 02:59)';
          break;
        case '2':
          result = '丑时(01:00 - 02:59)';
          break;
        case '3':
          result = '寅时(03:00 - 04:59)';
          break;
        case '4':
          result = '寅时(03:00 - 04:59)';
          break;
        case '5':
          result = '卯时(05:00 - 06:59)';
          break;
        case '6':
          result = '卯时(05:00 - 06:59)';
          break;
        case '7':
          result = '辰时(07:00 - 08:59)';
          break;
        case '8':
          result = '辰时(07:00 - 08:59)';
          break;
        case '9':
          result = '巳时(09:00 - 10:59)';
          break;
        case '10':
          result = '巳时(09:00 - 10:59)';
          break;
        case '11':
          result = '午时(11:00 - 12:59)';
          break;
        case '12':
          result = '午时(11:00 - 12:59)';
          break;
        case '13':
          result = '未时(13:00 - 14:59)';
          break;
        case '14':
          result = '未时(13:00 - 14:59)';
          break;
        case '15':
          result = '申时(15:00 - 16:59)';
          break;
        case '16':
          result = '申时(15:00 - 16:59)';
          break;
        case '17':
          result = '酉时(17:00 - 18:59)';
          break;
        case '18':
          result = '酉时(17:00 - 18:59)';
          break;
        case '19':
          result = '戌时(19:00 - 20:59)';
          break;
        case '20':
          result = '戌时(19:00 - 20:59)';
          break;
        case '21':
          result = '亥时(21:00 - 22:59)';
          break;
        case '22':
          result = '亥时(21:00 - 22:59)';
          break;
        case '23':
          result = '子时(23:00 - 00:59)';
          break;
      }
      return result;
    },
  },
};
</script>

<style scoped>
.user-info {
  background-image: url('http://img4.imgtn.bdimg.com/it/u=3813655879,3975954109&fm=27&gp=0.jpg');
  background-color: #d71618;
  background-repeat: repeat-y;
  -webkit-background-size: 100%;
  background-size: 100%;
}
.user-info .content {
  width: 90%;
  margin: 0.4rem auto;
  padding: 0.2rem 0.6rem;
  height: 2rem;
  background-color: #f9eabb;
  font-size: 0.3rem;
  -webkit-border-radius: 0.12rem;
  border-radius: 0.12rem;
  margin-bottom: 0.64rem;
  color: #d13c3e;
}

.title {
  width: 80%;
  display: block;
  text-align: center;
  margin-left: 10%;
}

.title .sex {
  margin-top: 0.34rem;
}

.detail {
  padding-top: 0.28rem;
}

.name {
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.birthday {
  margin: 0.08rem 0;
}
</style>
