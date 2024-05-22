<template>
  <div class="bazi">
    <div class="line">
      <div class="label">生肖</div>
      <div :class="`left circle ${getAnimal(shengxiao.male)}`">
        {{ shengxiao.male }}
      </div>
      <div :class="`center ${relStyle(shengxiao.rel)}`">
        >
        <span>{{ shengxiao.rel }}</span>
        <
      </div>
      <div :class="`right circle ${getAnimal(shengxiao.female)}`">
        {{ shengxiao.female }}
      </div>
    </div>
    <div class="line">
      <div class="label">日元</div>
      <div :class="`left circle ${styleColor(riyuan.male)}`">
        {{ riyuan.male }}
      </div>
      <div :class="`center ${relStyle(riyuan.rel)}`">
        >
        <span>
          {{ riyuan.rel }}
        </span>
        <
      </div>
      <div :class="`right circle ${styleColor(riyuan.female)}`">
        {{ riyuan.female }}
      </div>
    </div>
    <div class="line">
      <div class="label">夫妻宫</div>
      <div :class="`left circle ${styleColor(fuqigong.male)}`">
        {{ fuqigong.male }}
      </div>
      <div :class="`center ${relStyle(fuqigong.rel)}`">
        >
        <span>
          {{ fuqigong.rel }}
        </span>
        <
      </div>
      <div :class="`right circle ${styleColor(fuqigong.female)}`">
        {{ fuqigong.female }}
      </div>
    </div>
    <div class="line">
      <div class="label">子女宫</div>
      <div :class="`left circle ${styleColor(zinvgong.male)}`">
        {{ zinvgong.male }}
      </div>
      <div :class="`center ${relStyle(zinvgong.rel)}`">
        >
        <span>
          {{ zinvgong.rel }}
        </span>
        <
      </div>
      <div :class="`right circle ${styleColor(zinvgong.female)}`">
        {{ zinvgong.female }}
      </div>
    </div>
    <div class="line">
      <div class="label">桃花星</div>
      <div class="left circle star-box">
        {{ is_result ? taohua.male : '?' }}颗
      </div>
      <div class="center visibility-h">
        >
        <span> - </span>
        <
      </div>
      <div class="right circle star-box">
        {{ is_result ? taohua.female : '?' }}颗
      </div>
    </div>
    <div class="line">
      <div class="label">姻缘星</div>
      <div class="left circle star-box">
        {{ is_result ? hunyin.male : '?' }}颗
      </div>
      <div class="center visibility-h">
        >
        <span> - </span>
        <
      </div>
      <div class="right circle star-box">
        {{ is_result ? hunyin.female : '?' }}颗
      </div>
    </div>
  </div>
</template>

<script>
import { getBaziAPI, getBazihehunAPI } from '../../../api/api';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import utils from '../../../libs/utils';
export default {
  name: 'Bazi',
  props: {
    male_str: {
      type: String,
      default: '',
    },
    female_str: {
      type: String,
      default: '',
    },
    is_result: {
      type: Boolean,
      default: false,
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
      shengxiao: {
        male: '？',
        female: '？',
        rel: '？',
      },
      riyuan: { male: '？', female: '？', rel: '？' },
      fuqigong: { male: '？', female: '？', rel: '？' },
      zinvgong: { male: '？', female: '？', rel: '？' },
      taohua: {
        male: '？',
        female: '？',
      },
      hunyin: {
        male: '？',
        female: '？',
      },
    };
  },

  created() {
    this.getHeHunInfo();
  },
  mounted() {},
  methods: {
    /**
     * @description: 获取合婚信息
     * @return {*}
     */
    async getHeHunInfo() {
      let male_arr = this.male_str.split('|');
      let female_arr = this.female_str.split('|');
      let male_name = male_arr[0];
      let male_is_gongli = +male_arr[2];
      let male_birth_year = male_arr[3];
      let male_birth_month = male_arr[4];
      let male_birth_date = male_arr[5];
      let male_birth_hour = male_arr[6];

      let female_name = female_arr[0];
      let female_is_gongli = +female_arr[2];
      let female_birth_year = female_arr[3];
      let female_birth_month = female_arr[4];
      let female_birth_date = female_arr[5];
      let female_birth_hour = female_arr[6];
      let params = {
        male_name,
        male_is_gongli,
        male_birth_year,
        male_birth_month,
        male_birth_date,
        male_birth_hour,
        female_name,
        female_is_gongli,
        female_birth_year,
        female_birth_month,
        female_birth_date,
        female_birth_hour,
      };

      const res = await getBazihehunAPI(params);
      if (res.status !== 1000) return;
      const { shengxiao, riyuan, fuqigong, zinvgong, maleinfo, femaleinfo } =
        res.data;
      this.shengxiao = shengxiao;
      this.riyuan = riyuan;
      this.fuqigong = fuqigong;
      this.zinvgong = zinvgong;
      this.taohua = {
        male: maleinfo.tao_hua_num,
        female: femaleinfo.tao_hua_num,
      };
      this.hunyin = {
        male: maleinfo.hun_yin_num,
        female: femaleinfo.hun_yin_num,
      };
    },
    /**
     * @description: 八字颜色
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
        leap_month: is_leap ? '1' : '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
    },

    /**
     * @description: 合冲样式
     * @param {*} val
     * @return {*}
     */
    relStyle(val) {
      return val === '冲' ? 'chong' : 'he';
    },

    /**
     * @description: 获取动物
     * @param {*} val
     * @return {*}
     */
    getAnimal(val) {
      return utils.getAnimalColor(val);
    },

    /**
     * @description: 八字颜色
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
.nian-jin {
  border: 0.02rem solid #fb9400;
}
.nian-huo {
  border: 0.02rem solid #f33f3f;
}
.nian-shui {
  border: 0.02rem solid #0f71d2;
}
.nian-mu {
  border: 0.02rem solid #19be1d;
}
.nian-tu {
  border: 0.02rem solid #9a7a4b;
}
.chong {
  border: 0.02rem solid #ef533f;
  color: #ef533f;
}
.he {
  border: 0.02rem solid #19be1d;
  color: #19be1d;
}
.bazi {
  display: flex;
  flex-direction: column;
  .line {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-size: 0.28rem;
    margin-bottom: 0.24rem;
    width: 100%;
    .label {
      color: #6f3300;
      width: 1rem;
      position: absolute;
      left: 0.26rem;
    }
    .center {
      width: 0.98rem;
      height: 0.38rem;
      border-radius: 0.12rem;
      margin: 0 0.64rem;
      font-size: 0.3rem;
      white-space: nowrap;
      padding-left: 0.15rem;
      padding-right: 0.15rem;
      .flex-row;
      span {
        line-height: 0.38rem;
      }
    }
    .circle {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      font-size: 0.3rem;
      // padding-left: 0.15rem;
      .flex-row;
    }
  }
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.visibility-h {
  visibility: hidden;
}
.star-box {
  width: 0.8rem;
  height: 0.8rem;
  background: #fbf8ed;
  border: 0.02rem solid #6f3300;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.3rem;
  color: #6f3300;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
