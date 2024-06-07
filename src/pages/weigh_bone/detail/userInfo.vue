<template>
  <div class="info">
    <img
      :src="is_result ? resultPageTitle : detailTitleImg"
      :class="[is_result ? 'result-img' : 'detail-img']"
    />
    <img
      v-if="!is_result"
      class="img-line"
      src="../../../assets/img/mlxz/weigh_bone/img_line.png"
      alt=""
    />
    <div class="user">
      <div class="c-row">
        <div class="left">
          <span class="label">您的姓名：</span>
          <span class="value">{{ user_info.name | filter_name }}</span>
        </div>
        <div class="right">
          <span class="label">您的性别：</span>
          <span class="value">{{ user_info.sex | filter_sex }}</span>
        </div>
      </div>
      <div class="c-row">
        <span class="label">出生日期：</span>
        <span class="value">
          {{ picker_date_yangli }}
        </span>
      </div>
      <div class="c-row">
        <span class="label l-hidden">出生日期：</span>
        <span class="value">
          {{ picker_date_nongli }}
        </span>
      </div>
      <div class="row-4 c-row mb-0">
        <span class="h-label c-label">您的八字：</span>
        <span class="zhu-label">年柱</span>
        <span class="zhu-label">月柱</span>
        <span class="zhu-label">日柱</span>
        <span class="zhu-label">时柱</span>
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
      <div v-show="!is_result" class="pay-btn">
        <img :src="is_cn ? cn_btn : tw_btn" @click="showPayModal" alt="" />
      </div>
    </div>

    <payModal
      :product_key="product_key"
      v-model="pay_modal"
      :bg="modal_bg"
      :query_user_string="query_user_string"
      title="袁天罡称骨论命"
      title_style="color:#000"
      @close="pay_modal = false"
      e_view_id="10009"
      c_view_id="-10005"
      e_view_name="view_chenggu_pay"
      a_view_token="99oosg"
      c_click_id="-10006"
      e_click_name="click_chenggu_pay"
      a_click_token="20fbsi"
    />
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';
import { getBaziAPI } from '../../../api/api';
import payModal from '../../../components/PayModal.vue';
import cn_btn from '../../../assets/img/mlxz/weigh_bone/lock_btn.png';
import tw_btn from '../../../assets/img/mlxz/weigh_bone/tw/tw_lock_btn.png';
import cn_detail_img from '../../../assets/img/mlxz/weigh_bone/img_title2.png';
import tw_detail_img from '../../../assets/img/mlxz/weigh_bone/tw/img_title2.png';
import cn_result_title from '../../../assets/img/mlxz/weigh_bone/img_title3.png';
import tw_result_title from '../../../assets/img/mlxz/weigh_bone/tw/img_title3_fanti.png';
import { report_id_arr } from '../../../libs/enum';
export default {
  props: [
    'user_detail',
    'is_result',
    'product_key',
    'query_user_string',
    'username_title',
    'logEvent',
  ],
  components: {
    payModal,
  },
  data() {
    return {
      cn_btn,
      tw_btn,
      detailTitleImg:
        utils.getLanguage() === 'zh-CN' ? cn_detail_img : tw_detail_img,
      resultPageTitle:
        utils.getLanguage() === 'zh-CN' ? cn_result_title : tw_result_title,
      user_info: {
        name: '',
        sex: '1',
        is_gongli: '1',
        birth_year: '',
        birth_month: '',
        birth_date: '',
        birth_hour: '',
      },
      picker_hour: '',
      picker_date_nongli: '',
      picker_date_yangli: '',
      gan: [],
      zhi: [],
      pay_modal: false, //支付弹窗
      modal_bg:
        'https://psychicai-static.psychicai.pro/imgs/2404e1b3ae5294794c66a8af8e4cf5ffd666.png',
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  created() {
    let pay_modal = this.$route.query.pay_modal;
    if (pay_modal) {
      this.pay_modal = true;
    }
    let arr = this.user_detail.split('|');

    let [
      name,
      sex,
      is_gongli,
      birth_year,
      birth_month,
      birth_date,
      birth_hour,
    ] = arr;

    this.user_info = {
      name,
      sex,
      is_gongli,
      birth_year,
      birth_month,
      birth_date,
      birth_hour,
    };
    this.picker_hour = utils.formateNongliHour(arr[6]);
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
    this.getUserBazi();
  },
  filters: {
    filter_name(val) {
      return utils.getShortStr(val, 4);
    },
    filter_sex(val) {
      if (val) {
        return +val ? '男' : '女';
      }
    },
    filterNongliMonth(val) {
      return utils.formateNongliMonth(val);
    },
    filterNongliDate(val) {
      return utils.formateNongliDate(val);
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
  methods: {
    /**
     * @description: 获取用户八字
     * @return {*}
     */
    async getUserBazi() {
      const {
        is_gongli,
        birth_year,
        birth_month,
        birth_date,
        birth_hour,
        sex,
      } = this.user_info;
      let hour_ = birth_hour === '-1' ? '12' : birth_hour;
      let str_date = `${birth_year}-${birth_month}-${birth_date} ${hour_}:00:00`;
      let ios_date = `${birth_year}/${birth_month}/${birth_date} ${hour_}:00:00`;
      let solar = Solar.fromDate(
        new Date(utils.isAndroid() ? str_date : ios_date)
      );
      let lunar = solar.getLunar();
      let lunarMonth = LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      let is_leap = lunarMonth.isLeap();
      let data_ = {
        year: birth_year,
        month: birth_month,
        day: birth_date,
        hour: birth_hour,
        minute: '0',
        is_gongli: +is_gongli,
        leap_month: '0',
        gender: sex,
      };
      const { status, data } = await getBaziAPI(data_);
      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
    },
    /**
     * @description: 获取八字属性颜色
     * @param {*} val
     * @return {*}
     */
    styleColor(val) {
      return utils.getBaziStyleColor(val);
    },

    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    showPayModal() {
      this.$emit('logEvent');
      utils.firebaseLogEvent('10009', '-10004', 'click_chenggu_mid', 'click', {
        args_name: 'click_chenggu_mid',
        channel: utils.getFBChannel(),
      });
      this.pay_modal = true;
    },
  },
};
</script>

<style scoped lang="less">
.info {
  font-family: PingFang SC;
  width: 7.1rem;
  min-height: 3.57rem;
  border-radius: 0.2rem;
  background-image: url('../../../assets/img/mlxz/weigh_bone/img_mokuai_bg.png');
  background-color: #37438a;
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 1.23rem;
  margin-bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.2rem;
  .detail-img {
    width: 5.44rem;
    height: 1.41rem;
    margin-top: 0.4rem;
  }
  .img-line {
    width: 5.46rem;
    height: 0.17rem;
    margin: 0.51rem auto 0.3rem;
  }
  .user {
    display: flex;
    flex-direction: column;
    font-size: 0.3rem;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.42rem;
    .c-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 0.2rem;
      .label {
        color: #ffffff80;
      }
      .l-hidden {
        visibility: hidden;
      }
      .right {
        margin-left: 0.5rem;
      }
    }
  }
}
.result-img {
  width: 3.64rem;
  height: 0.81rem;
  margin: 0.4rem 0;
}
.mt-40 {
  margin-top: 0.4rem;
}
.mb-0 {
  margin-bottom: 0 !important;
}

.c-row {
  display: flex;
}
.c-label {
  font-size: 0.3rem;
  color: rgb(255 255 255 / 50%);
}
.c-mb {
  margin-bottom: 0.2rem;
}
.c-value {
  color: rgb(255 255 255 / 50%) !important;
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
  font-weight: 600;
  color: rgb(255 255 255 / 50%);
  line-height: 0.24rem;
  text-align: center;
  margin-right: 0.5rem;
  white-space: nowrap;
}
.zhu-value {
  width: 0.5rem;
  height: 0.42rem;
  font-size: 0.3rem;
  font-weight: 600;
  line-height: 0.42rem;
  text-align: center;
  margin-right: 0.5rem;
  white-space: nowrap;
}
.pay-btn {
  width: 100%;
  height: 1rem;
  margin-top: 0.3rem;
  text-align: center;
  margin-bottom: 0.3rem;
  img {
    width: 5.12rem;
    height: 100%;
    animation: scaleBtn 1s infinite ease-in-out alternate;
  }
}
</style>
