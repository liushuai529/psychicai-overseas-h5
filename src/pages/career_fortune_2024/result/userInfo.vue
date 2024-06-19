<template>
  <div class="user-info">
    <div class="new-pay-box">
      <div class="title-box">
        <img :src="is_cn ? cn_info_title : tw_info_title" />
      </div>
      <div class="top-one"></div>
      <div class="center-one">
        <img class="word3" :src="is_cn ? cn_word3 : tw_word3" alt="" />

        <BaziTable
          :sex="extra_ce_suan.sex"
          :is_result="true"
          :username="extra_ce_suan.name"
          :gongli_nongli="gongli_nongli"
          :picker_date_yangli="picker_date_yangli"
          :picker_date_nongli="picker_date_nongli"
          :gan="gan"
          :zhi="zhi"
          :nayin="nayin"
          :cai_bo_num="cai_bo_num"
          :gui_ren_num="gui_ren_num"
          :hun_yin_num="hun_yin_num"
          :ming_ge="ming_ge"
          :riyuanqiangruo="riyuanqiangruo"
          :shi_ye_num="shi_ye_num"
          :wuxingqiang="wuxingqiang"
          text_color="#E34A42"
          minge_color="#E34A42"
          :show_daji="false"
          :change_color="false"
          :is_career="true"
        ></BaziTable>
      </div>
      <div class="bottom-one"></div>
    </div>
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import content_bg_1 from './../../../assets/img/wealth_boutique_overseas/detail/content_bg_1.webp';
import bg from './../../../assets/img/wealth_boutique_overseas/detail/user_info_bg.webp';
import Clipboard from 'clipboard';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import { getBaziAPI } from '../../../api/api';
import cn_info_title from '../../../assets/img/mlxz/career_2024/detail/yu_img_title.webp';
import tw_info_title from '../../../assets/img/tw_mlxz/career_24/info_title.webp';
import BaziTable from '../../../components/baziTable.vue';
import cn_word3 from '../../../assets/img/mlxz/career_2024/detail/img_word3.webp';
import tw_word3 from '../../../assets/img/tw_mlxz/career_24/tw_word3.webp';
export default {
  props: ['orderId', 'extra_ce_suan', 'result'],
  components: {
    BaziTable,
  },
  data() {
    return {
      gongli_nongli_string: '',
      content_bg_1,
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      cn_info_title,
      tw_info_title,
      language: utils.getLanguage(),
      cn_word3,
      tw_word3,
      gan: ['-', '-', '-', '-'],
      zhi: ['-', '-', '-', '-'],
      nayin: ['？', '？', '？', '？'],
      cai_bo_num: 0,
      gui_ren_num: 0,
      hun_yin_num: 0,
      ming_ge: '',
      riyuanqiangruo: '',
      shi_ye_num: 0,
      wuxingqiang: '',
    };
  },
  created() {
    var clipboard = new Clipboard('.copy');
    clipboard.on('success', function (e) {
      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  },
  computed: {
    bgc() {
      return 'url("' + bg + '")';
    },
    is_cn() {
      return this.language === 'zh-CN';
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
    // 获取用户八字
    async getUserBazi() {
      if (this.result && this.result.bazi) {
        this.getMinggeInfo(this.result.bazi);

        return;
      }
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
        leap_month: '0',
        gender: this.sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;

      this.getMinggeInfo(data);
    },

    // 格式化用户信息
    formateQueryUserInfo() {
      let { birth_hour, birth_year, birth_month, birth_date, is_gongli } =
        this.extra_ce_suan;
      this.gongli_nongli = +is_gongli;
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
     * @description: 解析命格信息
     * @param {*} data
     * @return {*}
     */
    getMinggeInfo(data) {
      const {
        gan,
        zhi,
        nayin,
        cai_bo_num,
        gui_ren_num,
        hun_yin_num,
        ming_ge,
        riyuanqiangruo,
        shi_ye_num,
        wuxingqiang,
      } = data;
      this.gan = gan;
      this.zhi = zhi;
      this.nayin = nayin;
      this.cai_bo_num = cai_bo_num;
      this.gui_ren_num = gui_ren_num;
      this.hun_yin_num = hun_yin_num;
      this.ming_ge = ming_ge;
      this.riyuanqiangruo = riyuanqiangruo;
      this.shi_ye_num = shi_ye_num;
      this.wuxingqiang = wuxingqiang;
    },

    // 八字颜色
    styleColor(val) {
      return utils.getBaziStyleColor(val);
    },
  },
};
</script>

<style scoped lang="less">
.new-pay-box {
  width: 7.1rem;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .title-box {
    position: absolute;
    top: -0.13rem;
    width: 100%;
    height: 0.76rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    img {
      width: 4.66rem;
      height: 100%;
    }
  }
  .top-one {
    width: 100%;
    height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_top.webp')
      no-repeat;
    background-size: 100% 100%;
  }
  .center-one {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_mid.webp')
      no-repeat;
    background-size: 100% 100%;
    margin-top: -0.3rem;
    position: relative;
    z-index: 100;
    padding-bottom: 0.1rem;
    .word3 {
      width: 3.61rem;
      height: 0.53rem;
    }
  }
  .bottom-one {
    width: 100%;
    height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_bot.webp')
      no-repeat;
    background-size: 100% 100%;
    margin-top: -1rem;
    margin-bottom: 0.2rem;
    position: relative;
    z-index: 1;
  }
}
.user-info {
  width: 100%;
  min-height: 4.95rem;
  padding: 0.3rem 0.2rem 0.2rem;
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
  /* width:1px;
        height:1px; */
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
