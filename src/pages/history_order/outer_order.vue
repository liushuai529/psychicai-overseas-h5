<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-25 14:39:07
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-21 11:15:29
 * @Description: 历史订单
-->
<template>
  <div class="main">
    <div
      v-infinite-scroll="() => loadMore()"
      :infinite-scroll-immediate-check="true"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      :class="['container']"
    >
      <div class="new-tab">
        <img
          @click="backPage"
          src="../../assets/img/common/dingdan_icon_back.png"
          class="back"
          alt=""
        />
        历史订单
      </div>
      <div class="top-box">
        <!-- <img class="order-icon" :src="is_cn ? cn_title : tw_title" alt="" /> -->

        <div class="text">
          {{ $t('tips-1')
          }}<span class="download" @click="openApp()">{{ $t('tips-2') }} </span>
        </div>
      </div>
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
          <div
            :class="{
              item: true,
              'two-bg': item.product_key === 'h5_marriage' && !item.can_write,
              'write-bg': item.can_write,
              'one-bg': item.product_key !== 'h5_marriage' && !item.can_write,
            }"
            v-for="(item, k) in list"
            :key="'order' + k"
          >
            <div class="title-box">
              <div class="left">
                <img :src="icon_arr[item.product_key]" alt="" />
                <div class="title">{{ item.product_name }}</div>
              </div>
              <div class="right">{{ $t('tips-4') }}{{ item.id }}</div>
            </div>
            <div
              :class="{
                info: !item.can_write,
                'two-info':
                  item.product_key === 'h5_marriage' && !item.can_write,
                'one-info': item.product_key !== 'h5_marriage',
              }"
            >
              <div v-if="item.ext.name || item.ext.male_name" class="left">
                <div v-if="item.ext.name" class="one">
                  <div class="name">
                    <span>{{ item.ext.name | filterName }}</span>
                    <span class="birth">{{
                      formateTime(
                        item.ext.is_gongli,
                        item.ext.birth_year,
                        item.ext.birth_month,
                        item.ext.birth_date,
                        item.ext.birth_hour
                      )
                    }}</span>
                    <img
                      v-if="item.ext.sex"
                      class="sex"
                      :src="
                        ['1', 'male'].includes(item.ext.sex)
                          ? male_icon
                          : female_icon
                      "
                      alt=""
                    />
                  </div>
                </div>
                <div v-else>
                  <div class="name">
                    <span>{{ item.ext.male_name | filterName }}</span>
                    <span class="birth">{{
                      formateTime(
                        item.ext.male_is_gongli,
                        item.ext.male_birth_year,
                        item.ext.male_birth_month,
                        item.ext.male_birth_date,
                        item.ext.male_birth_hour
                      )
                    }}</span>
                    <img class="sex" :src="male_icon" alt="" />
                  </div>
                  <div class="name mt-28">
                    <span>{{ item.ext.female_name | filterName }}</span>

                    <span class="birth">{{
                      formateTime(
                        item.ext.female_is_gongli,
                        item.ext.female_birth_year,
                        item.ext.female_birth_month,
                        item.ext.female_birth_date,
                        item.ext.female_birth_hour
                      )
                    }}</span>
                    <img class="sex" :src="female_icon" alt="" />
                  </div>
                </div>
              </div>
              <div v-else class="no-user">
                <div class="left-box">
                  <div class="one">{{ $t('tips-5') }}</div>
                  <div class="tag">已解锁</div>
                </div>
                <div @click="handleJump(item)" class="right-btn">
                  <div class="text">开始测算</div>
                </div>
              </div>
              <!-- <div v-else class="left">
                <div class="name color-999">{{ $t('tips-5') }}</div>
                <div class="time color-999">{{ $t('tips-6') }}</div>
              </div> -->
            </div>
            <div v-if="!item.can_write" class="code-box">
              <div
                :class="['left', item.transfer_code ? '' : ' visible-hidden']"
              >
                <span>{{ $t('tips-7') }}{{ item.transfer_code || '-' }}</span>
                <span @click="copyCode(item.transfer_code)" class="copy">{{
                  $t('tips-8')
                }}</span>
              </div>

              <div
                @click="handleJump(item)"
                :class="[
                  'right-btn',
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

    <CodePop m_id="20004" v-if="code_modal" @close="code_modal = false" />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import utils from '@/libs/utils';
import { path_enums } from '../../libs/enum';
import { getHistoryOrderAPI } from '../../api/api';
import gif_nianyun from '../../assets/img/mlxz/index/gif/24年运-简体.gif';
import gif_ganqing from '../../assets/img/mlxz/index/gif/感情运势-简体.gif';
import { getHistoryOrderImg } from '../../libs/enum';
import CodePop from '../../components/CodePop.vue';
import tw_title from '../../assets/img/mlxz/downloadBtn/tw/h5_img_dingdantittle_fan.png';
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
      cn_title:
        'https://psychicai-static.psychicai.pro/imgs/24044c3bf50f5d8d4ac8b858aa684e0b1d75.png',
      tw_title,
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
      male_icon:
        'https://psychicai-static.psychicai.pro/imgs/24042cba8d2e03aa4538802aa57b2de12259.png',
      female_icon:
        'https://psychicai-static.psychicai.pro/imgs/2404e3255ac4cfa947bf997cd92d39d15a9f.png',

      code_modal: false,
      icon_arr: getHistoryOrderImg,
    };
  },
  components: {
    CodePop,
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  filters: {
    filterName(val) {
      return utils.getShortStr(val, 4);
    },
  },
  created() {
    setInterval(() => {
      let is_reload = localStorage.getItem('mlxz_reload_page_history');
      if (is_reload) {
        this.query.page = 1;
        this.list = [];
        this.getData();
      }
    }, 1000);
  },

  mounted() {
    utils.firebaseLogEvent(
      '10002',
      '-10001',
      'page_view_history',
      'page_view',
      {
        args_name: 'page_view_history',
        channel: utils.getFBChannel(),
      }
    );

    this.is_android = utils.isAndroid();
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
      localStorage.removeItem('mlxz_reload_page_history');

      Indicator.close();
      if (status !== 1000) return;
      this.list =
        this.query.page === 1
          ? data.data_list
          : [...this.list, ...data.data_list];
      this.has_next = data.page_no >= data.total_page ? false : true;

      this.list.forEach(it => {
        if (it.product_key === 'h5_marriage') {
          it.can_write = !it.ext.male_name ? true : false;
        } else {
          it.can_write = !it.ext.name ? true : false;
        }
      });
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

    async openApp() {
      window.Adjust &&
        window.Adjust.trackEvent({
          eventToken: 'u0jp7q',
        });
      utils.firebaseLogEvent(
        '10002',
        '-10002',
        'click_history_download',
        'click',
        {
          args_name: 'click_history_download',
          channel: utils.getFBChannel(),
        }
      );
      await utils.asleep(500);
      utils.openApp();
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
          localStorage.setItem('mlxz_reload_page_history', 1);
          localStorage.setItem('mlxz_reload_page_home', 1);
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

    /**
     * @description: 复制订单识别码
     * @param {*} code
     * @return {*}
     */
    copyCode(code) {
      utils.copyText('mlxz-' + code);
      Toast('复制成功');
      this.code_modal = true;
    },

    backPage() {
      history.back();
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
  font-family: system-ui;
}
.top-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #d2e7de;
  padding-bottom: 0.3rem;
  // padding-top: 0.3rem;
  z-index: 10;
  .order-icon {
    width: 4.16rem;
    height: 0.8rem;
    margin-bottom: 0.3rem;
  }
  .text {
    width: 7.1rem;
    font-weight: 400;
    font-size: 0.28rem;
    color: #314a46;
    text-align: left;
    margin: 0 0.2rem;
    span {
      color: #e3453d;
      text-decoration: underline;
    }
    .download {
      position: relative;
    }
    .download::after {
      content: '';
      width: 0.16rem;
      height: 0.24rem;
      background: url('https://psychicai-static.psychicai.pro/imgs/240412c87e7ec56340849244e4490471de13.png')
        no-repeat;
      background-size: contain;
      margin-left: 0.02rem;
      position: absolute;
      top: 60%;
      transform: translate(0, -50%);
    }
  }
}
.container {
  width: 100%;
  height: 100%;
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
    .one-bg {
      height: 2.84rem;
      background: url('https://psychicai-static.psychicai.pro/imgs/240404d44820f30143cc9ee32b6002252eaa.png')
        no-repeat;
    }
    .two-bg {
      height: 3.36rem;
      background: url('https://psychicai-static.psychicai.pro/imgs/240458bae33f18e2408dacdf40a83f6d0069.png')
        no-repeat;
    }
    .order-list {
      margin: 0 0.2rem;
      .item {
        width: 7.1rem;
        background-size: 100% 100%;
        margin-bottom: 0.2rem;
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
              min-width: 2.8rem;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.32rem;
              font-weight: 600;
              color: #314a46;
              white-space: nowrap;
            }
          }
          .right {
            font-size: 0.24rem;
            font-weight: 400;
            color: #8da5a1;
          }
        }
        .one-info {
          height: 0.76rem;
        }
        .two-info {
          height: 1.28rem;
        }
        .info {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin: 0.24rem;
          background: #dcece5;
          border-radius: 0.12rem;
          padding: 0 0.24rem;
          .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name {
              font-size: 0.28rem;
              display: flex;
              align-items: center;
              font-weight: 500;
              color: #333333;
              line-height: 0.28rem;
              .birth {
                margin-left: 0.24rem;
              }
              .sex {
                width: 0.28rem;
                height: 0.28rem;
                margin-left: 0.12rem;
              }
            }
            .time {
              font-size: 0.24rem;
              font-weight: 400;
              color: #333333;
              line-height: 0.24rem;
            }
          }
        }
      }
    }
  }
}

.mt-28 {
  margin-top: 0.28rem;
}
.code-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-size: 0.26rem;
  color: #314a46;
  margin: 0 0.24rem;
  .left .copy {
    margin-left: 0.16rem;
    color: #314a46;
    text-decoration-line: underline;
    opacity: 0.5;
  }
}
.right-btn {
  width: 1.44rem;
  height: 0.68rem;
  border-radius: 0.16rem;
  font-size: 0.28rem;
  font-weight: 600;
  color: #fef8eb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.android-container {
  height: 82%;
}
.ios-container {
  height: 81%;
}
.visible-hidden {
  visibility: hidden !important;
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
  border: 0.02rem solid #e79999;
  color: #e3453d;
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

.write-bg {
  width: 7.1rem;
  height: 1.92rem !important;
  background: url('../../assets/img/common/home_img_card_dingdan.png') no-repeat;
  background-size: contain !important;
}

.no-user {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0.3rem;
  .left-box {
    width: 4.4rem;
    height: 0.76rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #dcece5;
    border-radius: 0.12rem;
    padding: 0 0.24rem;
    .one {
      height: 0.28rem;
      font-weight: 400;
      font-size: 0.28rem;
      color: #314a46;
      line-height: 0.28rem;
      opacity: 0.7;
    }
    .tag {
      width: 0.82rem;
      height: 0.36rem;
      background: #34c585;
      font-size: 0.2rem;
      color: #fff;
      border-radius: 0.06rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
  }
  .right-btn {
    width: 1.44rem;
    height: 0.68rem;
    background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
    border-radius: 0.16rem;
    border: 0.02rem solid #ffd192;
    font-weight: 600;
    font-size: 0.28rem;
    color: #fef8eb;
    margin-left: 0.24rem;

    .text {
      width: 100%;
      height: 100%;
      border-radius: 0.16rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.new-tab {
  width: 7.5rem;
  height: 0.88rem;
  background: #bcdacd;
  font-weight: 500;
  font-size: 0.34rem;
  color: #333333;
  text-align: center;
  line-height: 0.88rem;
  margin-bottom: 0.3rem;
  position: sticky;
  top: 0;
  z-index: 2;
  .back {
    width: 0.44rem;
    height: 0.44rem;
    position: absolute;
    z-index: 2;
    left: 0.2rem;
    top: 0.22rem;
  }
}
</style>
