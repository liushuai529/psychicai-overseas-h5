<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-25 14:39:07
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-22 14:24:02
 * @Description: 历史订单
-->
<template>
  <div class="main">
    <div class="top-box"></div>
    <div
      v-infinite-scroll="() => loadMore()"
      :infinite-scroll-immediate-check="true"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      :class="['container', is_android ? 'android-container' : 'ios-container']"
    >
      <div class="content">
        <div class="tab-list hidden">
          <div
            v-for="(tab, k) in status_options"
            :key="'tab' + k"
            @click="active_tab = tab.v"
            :class="{
              item: true,
              'active-tab': active_tab === tab.v ? true : false,
            }"
          >
            {{ tab.k }}
          </div>
        </div>
        <div v-if="!list.length && is_empty" class="empty-list">
          <img
            src="../../assets/img/mlxz/quesheng_no_nothinh.png"
            class="nothing-icon"
            alt=""
          />
          <div class="tips">{{ $t('tips-3') }}</div>
          <div class="ad-list">
            <img
              v-for="(it, k) in ad_list"
              :key="'ad' + k"
              class="it"
              :src="it.icon"
              @click="jumpUrl(it.url)"
              alt=""
            />
          </div>
        </div>
        <div v-else class="order-list">
          <div class="item" v-for="(item, k) in list" :key="'order' + k">
            <div class="title-box">
              <div class="left">
                <img :src="icon_arr[item.product_key]" alt="" />
                <div class="title">{{ item.product_name }}</div>
              </div>
              <div class="right">{{ $t('tips-4') }}{{ item.id }}</div>
            </div>
            <div class="divider"></div>
            <div class="info">
              <div v-if="item.ext.name || item.ext.male_name" class="left">
                <div v-if="item.ext.name" class="one">
                  <div class="name">
                    <span>{{ item.ext.name | filterName }}</span>
                    <span>，</span>
                    <span v-if="item.ext.sex">{{
                      ['1', 'male'].includes(item.ext.sex) ? '男' : '女'
                    }}</span>
                  </div>
                  <div class="time">
                    {{
                      formateTime(
                        item.ext.is_gongli,
                        item.ext.birth_year,
                        item.ext.birth_month,
                        item.ext.birth_date,
                        item.ext.birth_hour
                      )
                    }}
                  </div>
                </div>
                <div v-else>
                  <div class="name">
                    <span>{{ item.ext.male_name | filterName }}</span>
                    <span>男</span>
                    <span>{{
                      formateTime(
                        item.ext.male_is_gongli,
                        item.ext.male_birth_year,
                        item.ext.male_birth_month,
                        item.ext.male_birth_date,
                        item.ext.male_birth_hour
                      )
                    }}</span>
                  </div>
                  <div class="name">
                    <span>{{ item.ext.female_name | filterName }}</span>
                    <span>女</span>
                    <span>{{
                      formateTime(
                        item.ext.female_is_gongli,
                        item.ext.female_birth_year,
                        item.ext.female_birth_month,
                        item.ext.female_birth_date,
                        item.ext.female_birth_hour
                      )
                    }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="left">
                <div class="name color-999">{{ $t('tips-5') }}</div>
                <div class="time color-999">{{ $t('tips-6') }}</div>
              </div>

              <div
                @click="handleJump(item)"
                :class="[
                  'right',
                  `${
                    item.status === 'FAIL'
                      ? 'right-2'
                      : ['CANCELED'].includes(item.status)
                      ? 'cancel-btn'
                      : item.status === 'PAYED' &&
                        (item.ext.name || item.ext.male_name)
                      ? 'right-1'
                      : 'right-2'
                  }`,
                ]"
              >
                {{ statusShow(item) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['kefu', is_android ? 'android-kefu' : 'ios-kefu']">
      客服{{ $t('tips-13') }}方式：plum7server@wekoi.cn
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { Indicator, InfiniteScroll, Toast } from 'mint-ui';
import utils from '@/libs/utils';
import { path_enums } from '../../libs/enum';
import { getHistoryOrderAPI } from '../../api/api';
import zongheyunshi from '../../assets/img/mlxz/index/24-zongheyunshi.png';
import banner_ganqing from '../../assets/img/mlxz/index/banner_ganqing.png';
import gif_nianyun from '../../assets/img/mlxz/index/gif/24年运-简体.gif';
import gif_ganqing from '../../assets/img/mlxz/index/gif/感情运势-简体.gif';
import { getHistoryOrderImg } from '../../libs/enum';

const all_status_enums = () => {
  return { 0: '去支付', 1: '查看', 2: '去添加' };
};

const ad_list = [
  {
    id: 80009,
    icon: gif_nianyun,
    name: '2024年年运',
    url: 'year_of_lucky_2024',
  },
  {
    id: 80010,
    icon: gif_ganqing,
    name: '24年感情运',
    url: 'emotion_fortune',
  },
];

const query_enums = {
  1: '',
  2: 'CREATED',
  3: 'PAYED',
};

const page_enums = {
  h5_wealth2024: 'lucky_year_report',
  h5_career: 'career_divination_overseas',
  h5_marriage: 'marriage_measure_overseas',
  h5_love: 'marriage_divination_overseas',
  h5_fortune2023: 'new_year_luck_overseas',
  h5_wealth2023: 'wealth_boutique_overseas',
  h5_weigh_bone: 'weigh_bone',
  h5_bai_gua: 'guiguzi_fortune',
  h5_annual2024: 'year_of_lucky_2024',
};

export default {
  data() {
    return {
      status_options: [
        {
          k: '全部订单',
          v: 1,
        },
        {
          k: '待支付',
          v: 2,
        },
        {
          k: '已支付',
          v: 3,
        },
      ],
      active_tab: 3, // 当前tab
      has_next: false,
      query: {
        status: '',
        page: 1,
        page_size: 10,
      },
      list: [], // 列表数据
      status_enum: all_status_enums(),
      ad_list: ad_list,
      is_empty: false,
      show_kf: true,
      jump_loading: false,
      is_android: false,
      icon_arr: getHistoryOrderImg,
    };
  },
  computed: {},
  filters: {
    filterName(val) {
      return utils.getShortStr(val, 4);
    },
  },
  created() {
    window.Adjust &&
      window.Adjust.trackEvent({
        eventToken: 'afs3pr',
      });
    console.log('Adjust', 'afs3pr');

    utils.firebaseLogEvent(
      '10015',
      '-10001',
      'page_view_report_history',
      'page_view',
      {
        args_name: 'page_view_report_history',
      }
    );

    document.title = '历史订单';
    this.is_android = utils.isAndroid();
  },
  async mounted() {
    this.getData();
  },
  watch: {
    active_tab(val) {
      this.query.page = 1;
      this.list = [];
      this.getData();
    },
  },

  methods: {
    /**
     * @description: 订单数据获取
     * @return {*}
     */
    async getData() {
      Indicator.open('加载中...');
      this.show_kf = false;
      this.query.status = query_enums[this.active_tab] || '';
      const { status, data } = await getHistoryOrderAPI(this.query);
      if (status !== 1000) return;
      this.list =
        this.query.page === 1
          ? data.data_list
          : [...this.list, ...data.data_list];
      this.has_next = data.page_no >= data.total_page ? false : true;

      this.is_empty = !this.list.length ? true : false;
      this.show_kf = true;

      Indicator.close();
    },

    /**
     * @description: 加载更多
     * @return {*}
     */
    loadMore() {
      if (this.has_next) {
        this.query.page++;
        this.getData();
      }
    },

    /**
     * @description: 格式化时间
     * @param {*} val
     * @return {*}
     */
    formateTime(is_gongli, year, month, date, hour) {
      if (is_gongli == '1') {
        return `${year}年${month}月${date}日${
          hour === '-1'
            ? `未知${this.$t('tips-11')}辰`
            : hour + this.$t('tips-11')
        }`;
      } else {
        return `${year}年${utils.nongliMonthEnum()[+month - 1]}${
          utils.nongliDayEnum()[+date - 1]
        }${
          hour === '-1'
            ? `未知${this.$t('tips-11')}辰`
            : utils.nongliHourEnum()[+hour / 2]
        }`;
      }
    },

    /**
     * @description: 跳转即时测算
     * @param {*} url
     * @return {*}
     */
    jumpUrl(url) {
      location.href = `${url}.html`;
    },

    /**
     * @description: 跳转测算报告页
     * @param {*} item
     * @return {*}
     */
    handleJump(item) {
      // 2秒的防抖
      if (this.jump_loading) return;
      this.jump_loading = true;
      setTimeout(() => {
        this.jump_loading = false;
      }, 2000);
      let can_continue = ['CREATED', 'PAYED', 'FAIL'].includes(item.status)
        ? true
        : false;
      if (!can_continue) {
        return;
      }
      let url = path_enums[item.product_key];
      if (item.status === 'PAYED') {
        if (item.ext.name || item.ext.male_name) {
          // 跳转详情页
          location.href = `${url}.html#/result?order_id=${item.id}&status=${item.status}`;
        } else {
          // 跳转添加信息页
          location.href = `${url}.html#/?has_pay=SUCCESS&order_id=${item.id}&product_key=${item.product_key}`;
        }
      } else {
        // 待支付直接调用item.pay_url
        // 支付失败跳转测算报告首页
        if (item.status === 'CREATED') {
          location.href = item.pay_url;
        } else if (item.status === 'FAIL') {
          setTimeout(() => {
            location.href = `${url}.html`;
          }, 1000);
        }
        return;

        // 跳转支付页
        if (item.ext.name) {
          location.href = `${url}.html#/${this.singleParams(
            item.ext
          )}&order_id=${item.id}`;
        } else {
          location.href = `${url}.html#/${this.coupleParams(
            item.ext
          )}&order_id=${item.id}`;
        }
      }
    },

    /**
     * @description: 状态展示
     * @param {*} it
     * @return {*}
     */
    statusShow(it) {
      if (it.status === 'PAYED') {
        return it.ext.name || it.ext.male_name ? '查看' : '去添加';
      } else if (it.status === 'CREATED') {
        return '去支付';
      } else if (it.status === 'CANCELED') {
        return '已取消';
      } else if (it.status === 'FAIL') {
        return '支付失败';
      } else if (it.status === 'REFUNDED') {
        return '已退款';
      } else {
        return '未知状态';
      }
    },

    /**
     * @description: 单人测算信息
     * @param {*} item
     * @return {*}
     */
    singleParams(item) {
      const {
        name,
        sex,
        is_gongli,
        birth_year,
        birth_month,
        birth_hour,
        birth_date,
      } = item;
      let querystring = '';
      querystring += name;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += is_gongli;
      querystring += '|';
      querystring += birth_year;
      querystring += '|';
      querystring += birth_month;
      querystring += '|';
      querystring += birth_date;
      querystring += '|';
      querystring += birth_hour;
      return 'detail?querystring=' + querystring;
    },

    /**
     * @description: 双人测算信息
     * @param {*} item
     * @return {*}
     */
    coupleParams(item) {
      const {
        male_name,
        male_is_gongli,
        male_birth_year,
        male_birth_month,
        male_birth_hour,
        male_birth_date,
        female_name,
        female_is_gongli,
        female_birth_year,
        female_birth_month,
        female_birth_hour,
        female_birth_date,
      } = item;
      let querystring = '';
      querystring += male_name;
      querystring += '|';
      querystring += female_name;
      querystring += '|';
      querystring += male_birth_year;
      querystring += '|';
      querystring += male_birth_month;
      querystring += '|';
      querystring += male_birth_date;
      querystring += '|';
      querystring += female_birth_year;
      querystring += '|';
      querystring += female_birth_month;
      querystring += '|';
      querystring += female_birth_date;
      querystring += '|';
      querystring += male_birth_hour;
      querystring += '|';
      querystring += female_birth_hour;
      querystring += '|';
      querystring += male_is_gongli;
      querystring += '|';
      querystring += female_is_gongli;
      querystring += '|';
      querystring += '0';
    },

    /**
     * @description: 格式化名字
     * @param {*} str 姓名
     * @param {*} start 开始位置
     * @param {*} end 截止位置
     * @return {*}
     */
    formateName(str, start, end) {
      return str.substring(start, end) + '...';
    },
  },
};
</script>

<style lang="less" scoped>
.empty-list {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 2.4rem;
  flex-direction: column;
  .nothing-icon {
    width: 1.84rem;
    height: 1.84rem;
  }
  .tips {
    width: 100%;
    height: 0.33rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: #999999;
    line-height: 0.33rem;
    margin-top: 0.2rem;
    text-align: center;
  }
  .ad-list {
    display: flex;
    flex-direction: column;
    margin-top: 2.8rem;
    img {
      width: 7.1rem;
      height: 2.06rem;
      margin-bottom: 0.24rem;
      border-radius: 0.2rem;
    }
  }
}
.main {
  width: 7.5rem;
  height: 100vh;
}
.top-box {
  width: 100%;
  height: 0.26rem;
}
.container {
  width: 100%;
  // background: #f3ede5;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  // padding-top: 0.26rem;

  .header-box {
    width: 7.5rem;
    height: 1.52rem;
    background: url('../../assets/img/mlxz/cesuan_home/history_bg.png')
      no-repeat;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back-icon {
      width: 0.44rem;
      height: 0.44rem;
      margin-left: 0.3rem;
    }
    .title {
      font-size: 0.36rem;
      font-weight: 600;
      color: #222222;
      line-height: 0.36rem;
    }
    .ji-icon {
      width: 0.44rem;
      height: 0.44rem;
      margin-right: 0.3rem;
    }
  }
  .hidden {
    display: none !important;
  }
  .content {
    // margin-top: 0.26rem;
    // width: 100%;
    // height: 100%;
    .tab-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.69rem;
      .item {
        font-size: 0.28rem;
        font-weight: 700;
        color: #222222;
        line-height: 0.28rem;
        width: 1.2rem;
        text-align: center;
      }
      .active-tab {
        font-weight: 600;
        color: #ef4c32;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .active-tab::after {
        content: '';
        display: block;
        width: 0.8rem;
        height: 3px;
        background: #ef4c32;
        border-radius: 0.25rem;
        position: absolute;
        bottom: -0.2rem;
      }
    }
    .order-list {
      margin: 0.5rem 0.2rem 0;
      .item {
        width: 7.1rem;
        min-height: 2.39rem;
        background: #ffffff;
        border-radius: 0.24rem;
        margin-bottom: 0.24rem;
        overflow-x: hidden;
        .title-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0.2rem 0.3rem;
          .left {
            display: flex;
            align-items: center;
            img {
              width: 0.4rem;
              height: 0.4rem;
              border-radius: 0.08rem;
              margin-right: 0.16rem;
            }
            .title {
              width: 1.8rem;
              font-size: 0.28rem;
              font-weight: 600;
              color: #222222;
              line-height: 0.28rem;
              // overflow: hidden;
              // text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .right {
            font-size: 0.24rem;
            font-weight: 400;
            color: #999999;
            line-height: 0.24rem;
          }
        }
        .divider {
          width: 6.5rem;
          height: 0.01rem;
          background: #eaeaea;
          margin: 0 0.3rem;
        }
        .info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0.47rem 0.3rem 0;
          .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name {
              font-size: 0.28rem;
              font-weight: 500;
              color: #333333;
              line-height: 0.28rem;
              margin-bottom: 0.18rem;
            }
            .time {
              font-size: 0.24rem;
              font-weight: 400;
              color: #333333;
              line-height: 0.24rem;
            }
          }
          .right {
            width: 1.2rem;
            height: 0.64rem;
            border-radius: 0.32rem;
            font-size: 0.26rem;
            font-weight: 500;
            color: #ffffff;
            line-height: 0.26rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
.android-container {
  height: 94%;
}
.ios-container {
  height: 92%;
}

.kefu {
  width: 100%;
  height: 8%;
  text-align: center;
  font-size: 0.24rem;
  font-weight: 400;
  color: #999999;
  line-height: 0.24rem;
  margin-top: 0.2rem;
}
.ios-kefu {
  height: 8%;
}
.android-kefu {
  height: 0.6rem;
}
.right-1 {
  background: #cb7e38;
}
.right-0,
.right-2 {
  background: #ef4c32;
}

.color-999 {
  color: #999999 !important;
}

.cancel-btn {
  background: #f2e7d8;
  color: #ffffff;
}
</style>
