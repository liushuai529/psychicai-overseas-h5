<template>
  <div class="user-info">
    <div class="top">
      <div
        class="title"
        v-if="user_info.sex == '0'"
        :style="{ backgroundImage: 'url(' + title_nan_bg + ')' }"
      ></div>
      <div
        class="title"
        v-if="user_info.sex != '0'"
        :style="{ backgroundImage: 'url(' + title_nv_bg + ')' }"
      ></div>
      <div class="detail">
        <p class="name">
          <span class="sub-title">姓名：</span>
          {{ user_info.name | filter_name }}
        </p>
        <!-- 公历生日 -->
        <p class="birthday" v-if="user_info.is_gongli == '1'">
          <span class="sub-title">生日：</span>
          公历{{ user_info.birth_year }}年{{ user_info.birth_month }}月{{
            user_info.birth_date
          }}日
        </p>
        <!-- 农历生日 -->
        <p class="birthday" v-if="user_info.is_gongli == '0'">
          <span class="sub-title">生日：</span>
          农历{{ user_info.birth_year }}年{{
            user_info.birth_month | filterNongliMonth
          }}{{ user_info.birth_date | filterNongliDate }}
        </p>
        <p>
          <span class="sub-title">时辰：</span>
          {{ user_info.birth_hour | filter_hour }}
        </p>
      </div>
    </div>
    <div class="middle">
      <p>
        <span>
          <span class="subtitle">农历年份：</span>
          <span>{{ data.nl }}</span>
        </span>
        <span class="fl-right">
          <span class="subtitle">太岁名称：</span>
          <span>{{ data.tsm }}</span>
        </span>
      </p>
      <p>
        <span>
          <span class="subtitle">流年纳音：</span>
          <span>{{ data.ny }}</span>
        </span>
        <span class="fl-right">
          <span class="subtitle">太岁方位：</span>
          <span>{{ data.tsfw }}</span>
        </span>
      </p>
      <p>
        <span>
          <span class="subtitle">干支纪年：</span>
          <span>{{ data.gz }}</span>
        </span>
        <span class="fl-right">
          <span class="subtitle">岁破方位：</span>
          <span>{{ data.sp }}</span>
        </span>
      </p>
    </div>
    <div class="bottom">
      <p>
        <span class="subtitle">命犯太岁：</span>
        <span>{{ data.mf }}</span>
      </p>
      <p>
        <span class="subtitle">宅犯太岁：</span>
        <span>{{ data.zf }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import title_nan_bg from './../../../assets/img/mlxz/career/result/ziliao.webp';
import title_nv_bg from './../../../assets/img/mlxz/career/result/ziliao.webp';
export default {
  props: ['userInfo', 'data'],
  data() {
    return {
      title_nan_bg: title_nan_bg,
      title_nv_bg: title_nv_bg,
      user_info: {},
    };
  },
  mounted() {
    this.user_info = this.userInfo;
  },
  filters: {
    filter_name(val) {
      if (val) {
        return utils.decodeUnicode(val);
      }
    },
    filter_gong_nongli(val) {
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
  width: 100%;
  padding: 0 0.3rem;
  margin: 0 auto;
  background-color: #fdf5dd;
  font-size: 0.3rem;
  -webkit-border-radius: 0.12rem;
  border-radius: 0.12rem;
  margin-bottom: 0.64rem;
  margin-top: 0.2rem;
  color: #d13c3e;
}

.title {
  width: 1.6rem;
  height: 1.6rem;
  margin: 0.2rem;
  float: left;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-align: center;
  margin-right: 0.5rem;
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

.top {
  overflow: hidden;
}

.middle {
  padding: 0.2rem;
  border-top: 0.02rem solid #000;
  border-bottom: 0.02rem solid #000;
}
.bottom {
  padding: 0.2rem;
}
.subtitle {
  font-weight: bold;
}
.fl-right {
  width: 3rem;
  float: right;
  overflow: hidden;
  white-space: nowrap;
}
</style>
