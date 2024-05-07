<template>
  <div class="user-info">
    <div class="content">
      <div class="title">
        <img :src="language == 'zh-CN' ? cn_word : tw_word" alt="" />
      </div>
      <div class="info-box">
        <div class="row-1 c-mb c-row">
          <div v-if="extra_ce_suan.name" class="c-label">
            <span>您的名字：</span>
            <span class="c-value mr-50">{{
              extra_ce_suan.name | filter_name
            }}</span>
          </div>
          <div v-if="extra_ce_suan.sex" class="c-label">
            <span>您的性别：</span>
            <span class="c-value">{{ extra_ce_suan.sex | filter_sex }}</span>
          </div>
        </div>
        <div class="row-2 c-mb c-row">
          <span class="c-label">出生日期：</span>
          <span class="c-value">
            {{ picker_date_yangli }}
          </span>
        </div>
        <div class="row-3 c-mb c-row">
          <span class="h-label c-label">出生日期：</span>
          <span class="c-value">
            {{ picker_date_nongli }}
          </span>
        </div>
        <div class="row-4 c-row">
          <span class="h-label c-label">您的八字：</span>
          <span class="zhu-label">年柱</span>
          <span class="zhu-label">月柱</span>
          <span class="zhu-label">日柱</span>
          <span class="zhu-label">{{ $t('shizhu-label') }}</span>
        </div>
        <div v-if="gan.length > 0" class="row-5 c-mb c-row">
          <span class="c-label">您的八字：</span>
          <span
            v-for="(it, k) in gan"
            :key="'gan' + k"
            :class="`zhu-value  ${styleColor(it)}`"
            >{{ it }}</span
          >
        </div>
        <div v-if="zhi.length > 0" class="row-5 c-mb c-row">
          <span class="h-label c-label">您的八字：</span>
          <span
            v-for="(it, k) in zhi"
            :key="'zhi' + k"
            :class="`zhu-value ${styleColor(it)}`"
            >{{ it }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import content_bg_1 from './../../../assets/img/wealth_boutique_overseas/detail/content_bg_1.png';
import bg from './../../../assets/img/wealth_boutique_overseas/detail/user_info_bg.jpg';
import Clipboard from 'clipboard';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import { getBaziAPI } from '../../../api/api';
import cn_word from '../../../assets/img/mlxz/guiguzi/result_img_word.png';
import tw_word from '../../../assets/img/tw_mlxz/guiguzi/detail/result_img_word.png';

export default {
  props: ['orderId', 'extra_ce_suan'],
  data() {
    return {
      gongli_nongli_string: '',
      content_bg_1: content_bg_1,
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      gan: [],
      zhi: [],
      language: utils.getLanguage(),
      cn_word,
      tw_word,
    };
  },
  created() {
    // var clipboard = new Clipboard('.copy');
    // clipboard.on('success', function (e) {
    //   e.clearSelection();
    // });
    // clipboard.on('error', function (e) {
    //   console.error('Action:', e.action);
    //   console.error('Trigger:', e.trigger);
    // });
  },
  computed: {
    bgc() {
      return 'url("' + bg + '")';
    },
  },
  watch: {},
  filters: {
    filter_sex(val) {
      return val === '1' ? '男' : '女';
    },
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
  },
  mounted() {
    this.formateQueryUserInfo();
    this.getUserBazi();
  },
  methods: {
    /**
     * @description: 获取八字信息
     * @return {*}
     */
    async getUserBazi() {
      let { birth_hour, birth_year, birth_month, birth_date, is_gongli, date } =
        this.extra_ce_suan;
      let hour_ = birth_hour === '-1' ? '12' : birth_hour;
      let android_date = `${birth_year}-${birth_month}-${birth_date} ${hour_}:00:00`;
      let ios_date = `${birth_year}/${birth_month}/${birth_date} ${hour_}:00:00`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      var lunarMonth = LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      let is_leap = lunarMonth.isLeap();
      let data_ = {
        year: birth_year,
        month: birth_month,
        day: birth_date,
        hour: birth_hour,
        minute: '0',
        is_gongli: is_gongli,
        leap_month: is_leap ? '1' : '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
    },
    /**
     * @description: 格式化用户信息
     * @return {*}
     */
    formateQueryUserInfo() {
      let { birth_hour, birth_year, birth_month, birth_date, is_gongli } =
        this.extra_ce_suan;
      this.picker_hour = utils.formateNongliHour(birth_hour);
      let android_date = `${birth_year}-${birth_month}-${birth_date}`;
      let ios_date = `${birth_year}/${birth_month}/${birth_date}`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      this.picker_date_nongli = +is_gongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${
            this.picker_hour
          }`
        : `${birth_year}年${utils.formateNongliMonth(
            birth_month
          )}${utils.formateNongliDate(birth_date)} ${this.picker_hour}`;
      this.picker_date_yangli = +is_gongli
        ? `${birth_year}-${birth_month}-${birth_date} ${this.picker_hour}`
        : `${Lunar.fromYmd(+birth_year, +birth_month, +birth_date)
            .getSolar()
            .toString()} ${this.picker_hour}`;
    },

    /**
     * @description: 获取八字样式
     * @param {*} val
     * @return {*}
     */
    styleColor(val) {
      return utils.getBaziStyleColor(val);
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  width: 100%;
  min-height: 4.95rem;
  padding: 0.3rem 0.2rem 0.2rem;
}
.user-info .content {
  width: 7.1rem;
  min-height: 4.95rem;
  background: url('../../../assets/img/mlxz/guiguzi/result_bg.png') no-repeat;
  background-size: 100% 100%;
  font-size: 0.3rem;
  color: #222222;
  padding: 0.4rem 0 0.4rem 0;
}

.title {
  width: 100%;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  margin-bottom: 0.3rem;
  img {
    width: 3.98rem;
    height: 100%;
  }
}
.sex {
  margin-left: 0.3rem;
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
.copyInput {
  opacity: 0;
  position: absolute;
  z-index: -999999;
}

.tip {
  position: fixed;
  top: 0;
  font-size: 0.3rem;
  height: 100%;
  width: 100%;
  z-index: 999999999;
  display: none;
}
.tip div {
  margin: 0 auto;
  max-width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  color: white;
  text-align: center;
  padding: 0.2rem 0;
  top: 40%;
  position: relative;
}

.info-box {
  display: flex;
  flex-direction: column;
  margin: 0 0.09rem;
  padding-left: 0.69rem;
}
.c-row {
  display: flex;
}
.c-label {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #33333380;
  line-height: 0.42rem;
}
.c-mb {
  margin-bottom: 0.2rem;
}
.c-value {
  color: #333333 !important;
  font-size: 0.3rem;
  height: 0.42rem;
  font-weight: 600;
}
.mr-50 {
  margin-right: 0.5rem;
}
.h-label {
  visibility: hidden;
}
.zhu-label {
  width: 0.5rem;
  height: 0.24rem;
  font-size: 0.24rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #33333380;
  line-height: 0.24rem;
  text-align: center;
  margin-right: 0.5rem;
  white-space: nowrap;
}
.zhu-value {
  width: 0.5rem;
  height: 0.42rem;
  font-size: 0.3rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 0.42rem;
  text-align: center;
  margin-right: 0.5rem;
  white-space: nowrap;
}
.nian-huo {
  color: #f33f3f;
}
.nian-shui {
  color: #0f71d2;
}
.nian-mu {
  color: #19be1d;
}
.nian-jin {
  color: #fb9400;
}
.nian-tu {
  color: #9a7a4b;
}
</style>
