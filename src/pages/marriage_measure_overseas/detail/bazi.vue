<template>
  <div class="bazi">
    <div class="name c-zhu">
      <div>年</div>
      <div>月</div>
      <div>日</div>
      <div>时</div>
    </div>
    <div class="v-zhu">
      <div v-for="(it, k) in gan" :key="'gan' + k" :class="styleColor(it)">
        {{ it }}
      </div>
    </div>
    <div class="v-zhu">
      <div v-for="(it, k) in zhi" :key="'zhi' + k" :class="styleColor(it)">
        {{ it }}
      </div>
    </div>
  </div>
</template>

<script>
import { getBaziAPI } from '../../../api/api';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import utils from '../../../libs/utils';
export default {
  name: 'Bazi',
  props: {
    user_info: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      gan: ['？', '？', '？', '？'],
      zhi: ['？', '？', '？', '？'],
    };
  },

  async created() {},
  async mounted() {
    await this.formateQueryUserInfo(this.user_info);
    this.getUserBazi();
    // Code to run when the component is mounted
  },
  methods: {
    /**
     * @description: 获取八字颜色
     * @param {*} val
     * @return {*}
     */
    styleColor(val) {
      return utils.getBaziStyleColor(val);
    },
    /**
     * @description: 格式化用户信息
     * @param {*} string
     * @return {*}
     */
    async formateQueryUserInfo(string) {
      let arr = string.split('|');
      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];
      this.sex = +arr[1];
      this.gongli_nongli = +arr[2];
      this.picker_hour = utils.formateNongliHour(arr[6]);
      let android_date = `${this.year}-${this.month}-${this.date}`;
      let ios_date = `${this.year}/${this.month}/${this.date}`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? android_date : ios_date)
      );
      let lunar = solar.getLunar();
      this.picker_date_nongli = +this.gongli_nongli
        ? `${lunar.getYear()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${
            this.picker_hour
          }`
        : `${this.year}年${utils.formateNongliMonth(
            this.month
          )}${utils.formateNongliDate(this.date)} ${this.picker_hour}`;
      this.picker_date_yangli = +this.gongli_nongli
        ? `${this.year}-${this.month}-${this.date} ${this.picker_hour}`
        : `${Lunar.fromYmd(+this.year, +this.month, +this.date)
            .getSolar()
            .toString()} ${this.picker_hour}`;
    },
    /**
     * @description: 获取用户八字
     * @return {*}
     */
    async getUserBazi() {
      let hour_ = this.birth_hour === '-1' ? '12' : this.birth_hour;
      let str_date = `${this.year}-${this.month}-${this.date} ${hour_}:00:00`;
      let ios_date = `${this.year}/${this.month}/${this.date} ${hour_}:00:00`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? str_date : ios_date)
      );
      let lunar = solar.getLunar();
      let lunarMonth = LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      let is_leap = lunarMonth.isLeap();
      let data_ = {
        year: this.year,
        month: this.month,
        day: this.date,
        hour: this.birth_hour,
        minute: '0',
        is_gongli: this.gongli_nongli,
        leap_month: '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;
      this.$emit('get_user_info', this.sex, res.data.gejujiedu)
      this.gan = data.gan;
      this.zhi = data.zhi;
    },
  },
};
</script>

<style scoped lang="less">
.bazi {
  display: flex;
  flex-direction: column;
  // width: 2.25rem;
  height: 1.28rem;
  margin-top: 0.3rem;
  .c-zhu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 0.24rem;
    font-weight: 600;
    font-size: 0.22rem;
    color: #333333;
    opacity: 0.5;
    margin-bottom: 0.08rem;
  }
  .v-zhu {
    height: 0.42rem;
    font-weight: 600;
    font-size: 0.24rem;
    line-height: 0.42rem;
    display: flex;
    justify-content: space-around;
  }
}
.bottom-12 {
  margin-bottom: 0.12rem;
}
</style>
