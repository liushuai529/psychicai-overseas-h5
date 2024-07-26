<template>
  <div class="main">
    <div v-infinite-scroll="() => loadMore()" :infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading"
      infinite-scroll-distance="10" :class="['container']">
      <div class="new-tab">
        <img @click="backPage" src="../../../assets/img/tarot/dingdan_icon_back-left.webp" class="back" alt="" />
        {{ is_cn? '我的提问': '我的提問' }}
      </div>
      <div class="top-box">
        {{ is_cn ? '咨询过程中遇到问题请联系：plum7server@wekoi.cn' : '咨詢過程中遇到問題請聯系：plum7server@wekoi.cn' }}
      </div>
      <div class="content">
        <div class="tab-list hidden">
          <div v-for="(tab, k) in status_options" :key="'tab' + k" @click="active_tab = tab.v" :class="{
            item: true,
            'active-tab': active_tab === tab.v ? true : false,
          }">
            {{ tab.k }}
          </div>
        </div>
        <div v-if="!list.length && is_empty" class="empty-list">
          <img src="../../../assets/img/tarot/dayi_img_wait.webp" class="nothing-icon" alt="" />
          <div class="tips">{{ is_cn ? '暂无数据' : '暫無數據' }}</div>

        </div>
        <div v-else class="order-list">
          <div :class="{
            item: true,
            'bg-1-nopay': true
          }" v-for="(item, k) in list" :key="'order' + k">
            <div class="title-box">
              <div class="left">
                <img :src="icon_arr[item.product_key || 'master_tarot']" alt="" />
                <div class="title">
                  {{ is_cn ? '真人塔罗答疑解惑' : '真人塔羅答疑解惑' }}

                </div>
              </div>
              <div class="right">{{ is_cn ? '订单编号：' : '訂單編號：' }}{{ item.order_id }}</div>
            </div>


            <div :class="['info']">
              <div class="left" style="-webkit-box-orient: vertical;">
                <div class="text">{{ item.question }}的撒地方撒方式水电费水电费水电费水电费水电费撒的发生的</div>
              </div>
              <div class="right">
                <div class="pay" v-if="item.order_status !== 'PAYED'" @click="handleJump(item)">支付</div>
                <div class="search" v-if="item.order_status === 'PAYED'" @click="handleJump(item)">查看</div>
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>

    <FixDowonLoad/>
    <CodePop m_id="20004" v-if="code_modal" @close="code_modal = false" />
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import utils from '@/libs/utils';
import { path_enums } from '../../../libs/enum';
import { getTarotHistoryOrderAPI, payTarotOrderAPI } from '../../../api/api';
import { getHistoryOrderImg } from '../../../libs/enum';
import CodePop from '../../../components/CodePop.vue';
import FixDowonLoad from '../components/FixDowonLoad.vue';
import tw_title from '../../../assets/img/mlxz/downloadBtn/tw/h5_img_dingdantittle_fan.webp';
const all_status_enums = () => {
  return { 0: '去支付', 1: '查看', 2: '去添加' };
};


const query_enums = {
  1: '',
  2: 'CREATED',
  3: 'PAYED',
};


const event_enums = {
  master_tarot: {
    c_id: '-10020',
    c_name: 'click_history_tarot_repay',
  },

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
      active_tab: 1, // 当前tab
      has_next: false,
      query: {
        // status: '',
        // page: 1,
        // page_size: 50,
        offset: 0,
        limit: 100,
      },
      list: [], // 列表数据
      status_enum: all_status_enums(),
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
    FixDowonLoad,
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    productList() {
      return this.$store.state.common.tarotProductList;
    },

  },
  filters: {
    filterName(val) {
      return utils.getShortStr(val, 4);
    },
  },
  created() {
    this.$store.dispatch('common/getTarotProduction');

    setInterval(() => {
      let is_reload = localStorage.getItem('mlxz_reload_page_history');
      if (is_reload) {
        this.query.offset = 0;
        this.list = [];
        this.getData();
      }
    }, 2000);
  },

  mounted() {
    // utils.firebaseLogEvent(
    //   '10002',
    //   '-10001',
    //   'page_view_history',
    //   'page_view',
    //   {
    //     args_name: 'page_view_history',
    //     channel: utils.getFBChannel(),
    //   }
    // );

    this.is_android = utils.isAndroid();
    this.getData();
  },
  watch: {
    active_tab(val) {
      this.query.offset = 0;
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
      // this.query.status = query_enums[this.active_tab] || '';
      const { status, data } = await getTarotHistoryOrderAPI(this.query);
      localStorage.removeItem('mlxz_reload_page_history');

      Indicator.close();
      if (status !== 1000) return;
      this.list =
        this.query.offset === 0
          ? data.list
          : [...this.list, ...data.list];
      this.has_next = data.has_more ? true : false;
      console.log('this.list', this.list)
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
        this.query.offset += this.query.limit;
        this.getData();
      }
    },





    async openApp() {
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
    async handleJump(item) {
      // 2秒的防抖
      if (this.jump_loading) return;
      this.jump_loading = true;
      setTimeout(() => {
        this.jump_loading = false;
      }, 2000);
      // let can_continue = ['CREATED', 'PAYED', 'FAIL'].includes(item.status)
      //   ? true
      //   : false;
      // if (!can_continue) {
      //   return;
      // }
      let url = path_enums[item.product_key || 'master_tarot'];
      if (item.order_status === 'PAYED') {
        localStorage.setItem('mlxz_reload_page_history', 1);
        localStorage.setItem('mlxz_reload_page_home', 1);
        // 跳转添加信息页
        this.$router.push({
          path: 'result',
          query: { order_id: item.order_id, status: 'SUCCESS', product_key: item.product_key || 'master_tarot' },
        });
      } else {
        let same_product = this.productList.find(
          i => i.product_id === item.product_id
        );
        if(!same_product) return
        Indicator.open('支付中...');

        const {
          order_status,
          pay_method,
          product_key,
          product_id,
          trade_pay_type,
          trade_target_org,
        } = item;
        utils.firebaseLogEvent(
          '10010',
          event_enums[product_key || 'master_tarot'].c_id,
          event_enums[product_key || 'master_tarot'].c_name,
          'click',
          {
            args_name: event_enums[product_key || 'master_tarot'].c_name,
            channel: utils.getFBChannel(),
            // pay_type:trade_pay_type 
          }
        );
        let params = {
          pay_method,
          product_key,
          product_id,
          platform: 'WEB',
          trade_pay_type,
          trade_target_org,
          fb_param: {
            fbc: utils.getcookieInfo('_fbc'),
            fbp: utils.getcookieInfo('_fbp'),
            external_id: localStorage.getItem('mlxz_outer_visitor_id'),
          },
          question: item.question,
          question_tarot: {
            array_type: 'timeline',
            ask_type: 'array',
            items: item.tarot.items
          },
        };

        params.callback_url = `${location.origin
          }/${utils.getFBChannel()}/${url}.html#/result?path=${path_enums[product_key || 'master_tarot']
          }&report_price=${same_product.price}&repay=1`;
        const res = await payTarotOrderAPI(params);

        Indicator.close();

        if (res.status !== 1000) return;
        localStorage.setItem('mlxz_reload_page_history', 1);

        location.href = res.data.pay_url;


      }
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
    width: 2.6rem;
    height: 2.6rem;
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
  font-weight: 400;
  font-size: 0.26rem;
  color: #FFFFFF;
  line-height: 0.39rem;
  margin-top: 0.24rem;
  margin-bottom: 0.24rem;
  opacity: 0.5;
}

.container {
  width: 100%;
  height: 100%;
  background: #0F031A;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  


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
      background: url('https://psychicai-static.psychicai.pro/imgs/240404d44820f30143cc9ee32b6002252eaa.png') no-repeat;
    }

    .two-bg {
      height: 3.36rem;
      background: url('https://psychicai-static.psychicai.pro/imgs/240458bae33f18e2408dacdf40a83f6d0069.png') no-repeat;
    }

    .order-list {
      margin: 0 0.2rem;
      margin-bottom: 2rem;

      .item {
        width: 7.1rem;
        background-size: 100% 100%;
        margin-bottom: 0.24rem;
        overflow-x: hidden;
        height: 100%;
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
              font-size: 0.3rem;
              font-weight: 600;
              color: #FFFFFF;
              white-space: nowrap;
              display: flex;
              align-items: center;
            }
          }

          .right {
            font-size: 0.24rem;
            font-weight: 400;
            color: #FFFFFF;
            opacity: 0.4;
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
          justify-content: space-between;
          border-radius: 0.12rem;
          padding: 0 0.24rem;
          width: 100%;
          // height: 1.04rem;
          max-height: 1.04rem;
          height: 100%;
          padding-bottom: 0.24rem;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; // 限制为两行
          text-overflow: ellipsis;

          .left {
            display: flex;
            flex-direction: column;
            width: 4.9rem;
            max-height: 100%;
            border-radius: 0.12rem;
            background: #2C263B;
            padding: 0.1rem 0.24rem;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; // 限制为两行
            text-overflow: ellipsis;

            .text{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; // 限制为两行
              font-size: 0.28rem;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #FFFFFF;
            }
          }

          .right {
            width: 1.44rem;
            height: 0.68rem;
            font-weight: 600;
            font-size: 0.28rem;
            color: #FFFFFF;
            line-height: 0.28rem;

            .pay {
              width: 100%;
              height: 100%;
              background: linear-gradient(180deg, #A136DE 0%, #5C15AC 100%);
              border-radius: 0.16rem;
              border: 0.02rem solid #E585FF;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .search {
              width: 100%;
              height: 100%;
              border-radius: 0.16rem;
              border: 0.02rem solid #4C256B;
              display: flex;
              justify-content: center;
              align-items: center;

              color: #B65AFF;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-btn {
  width: 100%;
  height: 100%;
  border-radius: 0.16rem;
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
  background: url('../../../assets/img/common/home_img_card_dingdan.webp') no-repeat;
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
    border-radius: 0.16rem;
    font-weight: 600;
    font-size: 0.28rem;
    color: #e3453d;
    margin-left: 0.24rem;
    background: transparent;
    border: 0.02rem solid #e79999;

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
  background: #1E0A2D;
  font-weight: 500;
  font-size: 0.34rem;
  color: #FFFFFF;
  text-align: center;
  line-height: 0.88rem;
  position: sticky;
  top: 0;
  z-index: 2;

  .back {
    width: 0.44rem;
    height: 0.44rem;
    position: absolute;
    z-index: 2;
    left: 0.25rem;
    top: 0.22rem;
  }
}

.btn-common {
  width: 0.82rem;
  height: 0.36rem;
  border-radius: 0.08rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.22rem;
  color: #fef8eb;
  margin-left: 0.1rem;
}

.btn-CREATED,
.btn-CANCELED,
.btn-FAIL {
  background: linear-gradient(180deg, #ffb07d 0%, #ff5048 100%);
}

.btn-unlock {
  background: linear-gradient(180deg, #5de3a8 0%, #22ba77 100%);
}

.status-PAYED {
  background: #dcece5;
  border: 0.02rem solid #b0d5cf;
  border-radius: 0.16rem;
  color: #314a46;
}

.status-other {
  border-radius: 0.16rem;
  border: 0.02rem solid #ffd192;

  .status-text {
    color: #fef8eb;
    border-radius: 0.16rem;
    background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
  }
}

.bg-2-nopay {
  width: 7.1rem;
  height: 2.44rem;
  background: url('../../../assets/img/pop/status-bg-2.webp') no-repeat;
  background-size: contain;
  position: relative;
}

.bg-4-nopay {
  width: 7.1rem;
  height: 2.44rem;
  background: url('../../../assets/img/pop/status-bg-2.webp') no-repeat;
  background-size: contain;
  position: relative;
}

.bg-1-nopay {
  height: 1.92rem;
  background: rgba(32, 26, 47, 1);
  border-radius: 0.2rem;
  position: relative;
}

// .no-pay-1 {
//   width: 4.4rem;
//   height: 0.76rem;
//   border-radius: 0.12rem;
// }

.hidden-btn {
  display: none;
}

.no-pay-btn1 {
  position: absolute;
  right: 0.2rem;
  top: 0.9rem;
}

.hidden-one {
  white-space: nowrap;
  overflow: hidden;
  width: 2.4rem;
  text-overflow: ellipsis;
}

.w-140 {
  width: 1.4rem;
}

.combine-whole {
  width: 4.4rem;
  height: 1.8rem;
}

.combine-box {
  width: 4.4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #dcece5;
  border-radius: 0.12rem;
  padding: 0 0.24rem;
  font-size: 0.28rem;
  font-weight: 400;
  color: #314a46;
  white-space: nowrap;

  .one {
    height: 0.28rem;
    line-height: 0.28rem;
    // margin-bottom: 0.12rem;
  }
}

.ab-3 {
  position: absolute;
}

.ml-24 {
  margin-left: 0.24rem;
}

.bg-3-nopay {
  height: 2.96rem;
  background: url('../../../assets/img/emotion_v2/new/home_img_card_dingdan.webp') no-repeat;
  background-size: contain;
  position: relative;
}
</style>
