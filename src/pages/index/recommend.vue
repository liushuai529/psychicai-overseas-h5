<!--
 * @Author: ZhaoZhiqi
 * @Date: 2022-12-13 15:50:34
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-05-31 16:38:39
 * @Description: 推荐
 * @FilePath: \find-future-overseas\src\pages\index2\recommend.vue
-->
<template>
  <div class="recommend-container">
    <!-- 优惠组合 -->
    <div class="title">
      优惠组合
      <img src="../../assets/img/3.0/fire4.png" />
    </div>
    <div
      ref="combine"
      class="combine"
      :style="{
        marginLeft: scrollLeft + 'px',
        transitionDuration: hasTouch ? '0s' : '0.2s',
      }"
    >
      <div class="combine-box" :class="{ animation: !hasScroll }">
        <!-- 组合三 -->
        <div class="combine-card" style="margin-right: 0.2rem">
          <!-- 占位图片 -->
          <div class="combine-top">
            <div class="combine-info">
              <div
                v-if="combineOrder3 && combineOrder3.sub_orders"
                class="combine-info-left"
              >
                已成功解锁，快去体验吧
              </div>
              <template v-else>
                <div class="combine-info-left">
                  任选三个享特价<img
                    src="../../assets/img/3.0/combine-price3.png"
                    alt=""
                  />
                </div>
                <div class="combine-info-right">原价204RM，立减96RM</div>
              </template>
            </div>
          </div>
          <template v-if="!combineLoading">
            <!-- 产品图片 -->
            <div class="combine-products">
              <template v-if="showCombine3">
                <div
                  v-for="(item, index) in combineArr3"
                  class="combine-product"
                  :class="['prod_' + item]"
                  @click="
                    showGroupPopup3(
                      !combineOrder3 || !combineOrder3.sub_orders,
                      'card'
                    )
                  "
                >
                  <img
                    v-if="!combineOrder3 || !combineOrder3.sub_orders"
                    class="unlock"
                    src="../../assets/img/3.0/unlcok.png"
                  />
                </div>
              </template>
              <template v-else>
                <img
                  v-for="item in 3"
                  src="../../assets/img/3.0/combine-placeholder.png"
                  class="combine-placeholder"
                  @click="showGroupPopup3(true, 'card')"
                />
              </template>
            </div>
            <div class="combine-bottom">
              <!-- 已付款 -->
              <div
                class="combine-order"
                v-if="combineOrder3 && combineOrder3.sub_orders"
              >
                <div
                  class="combine-order-item"
                  v-for="item in combineOrder3.sub_orders"
                >
                  <div
                    class="combine-order-btn"
                    :class="{ done: item.order_id }"
                    @click="toResult(item, combineOrder3.order_id)"
                  >
                    {{ item.order_id ? '查看结果' : '开始测算' }}
                  </div>
                  <div class="combine-order-state">
                    {{ item.order_id ? '已测算' : '还未测算' }}
                  </div>
                </div>
              </div>
              <!-- 已选择 -->
              <template v-else-if="showCombine3">
                <div
                  class="combine-select"
                  style="margin-bottom: 0.22rem"
                  @click="pay(6)"
                >
                  108RM 立即支付
                </div>
                <div
                  class="combine-change"
                  @click="showGroupPopup3(true, 'change')"
                >
                  更改选项
                </div>
              </template>
              <!-- 未选择 -->
              <div
                v-else
                class="combine-select scale"
                @click="showGroupPopup3(true, 'select')"
              >
                选择组合
              </div>
            </div>
          </template>
          <div v-else class="combine-loading">
            <img src="../../assets/img/index/loading.png" alt="" />
          </div>
        </div>
        <!-- 组合二 -->
        <div class="combine-card" style="margin-right: 0.2rem">
          <!-- 占位图片 -->
          <div class="combine-top">
            <div class="combine-info">
              <div
                v-if="combineOrder2 && combineOrder2.sub_orders"
                class="combine-info-left"
              >
                已成功解锁，快去体验吧
              </div>
              <template v-else>
                <div class="combine-info-left">
                  任选两个享特价<img
                    src="../../assets/img/3.0/combine-price2.png"
                    alt=""
                  />
                </div>
                <div class="combine-info-right">原价138RM，立减48RM</div>
              </template>
            </div>
          </div>
          <template v-if="!combineLoading">
            <!-- 产品图片 -->
            <div class="combine-products" style="justify-content: center">
              <template v-if="showCombine2">
                <div
                  v-for="item in combineArr2"
                  class="combine-product"
                  :class="['prod_' + item]"
                  style="margin: 0 0.12rem"
                  @click="
                    showGroupPopup2(
                      !combineOrder2 || !combineOrder2.sub_orders,
                      'card'
                    )
                  "
                >
                  <img
                    v-if="!combineOrder2 || !combineOrder2.sub_orders"
                    class="unlock"
                    src="../../assets/img/3.0/unlcok.png"
                  />
                </div>
              </template>
              <template v-else>
                <img
                  v-for="item in 2"
                  src="../../assets/img/3.0/combine-placeholder.png"
                  class="combine-placeholder"
                  style="margin: 0 0.12rem"
                  @click="showGroupPopup2(true, 'card')"
                />
              </template>
            </div>
            <div class="combine-bottom">
              <!-- 已付款 -->
              <div
                class="combine-order"
                style="justify-content: center"
                v-if="combineOrder2 && combineOrder2.sub_orders"
              >
                <div
                  class="combine-order-item"
                  style="margin: 0 0.12rem"
                  v-for="item in combineOrder2.sub_orders"
                >
                  <div
                    class="combine-order-btn"
                    :class="{ done: item.order_id }"
                    @click="toResult(item, combineOrder2.order_id)"
                  >
                    {{ item.order_id ? '查看结果' : '开始测算' }}
                  </div>
                  <div class="combine-order-state">
                    {{ item.order_id ? '已测算' : '还未测算' }}
                  </div>
                </div>
              </div>
              <!-- 已选择 -->
              <template v-else-if="showCombine2">
                <div
                  class="combine-select"
                  style="margin-bottom: 0.22rem"
                  @click="pay(7)"
                >
                  88RM 立即支付
                </div>
                <div
                  class="combine-change"
                  @click="showGroupPopup2(true, 'change')"
                >
                  更改选项
                </div>
              </template>
              <!-- 未选择 -->
              <div
                v-else
                class="combine-select scale"
                @click="showGroupPopup2(true, 'select')"
              >
                选择组合
              </div>
            </div>
          </template>
          <div v-else class="combine-loading">
            <img src="../../assets/img/index/loading.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 本月爆品 -->
    <div class="title">
      本月爆品
      <img src="../../assets/img/3.0/fire3.png" />
    </div>
    <div class="list">
      <div
        v-for="item in list"
        class="card-box"
        @click="link(item.url, item.item_id)"
      >
        <div class="card">
          <div class="top" :class="['prod-banner_' + item.item_id]"></div>
          <div class="bottom">
            <div class="info">
              <div class="card-title">
                {{ item.title
                }}<span class="price"
                  >RM<span class="price-num">{{ item.price }}</span></span
                >
              </div>
              <div class="desc">{{ item.desc }}</div>
            </div>
            <div class="btn">立即解锁</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fb-footer">
      <div class="fb" style="margin-top: 0.36rem; margin-bottom: 0.3rem">
        更多詳細信息請訪問
        <div
          @click="
            toFb('https://www.facebook.com/profile.php?id=100086957902199')
          "
        >
          <img src="../../assets/img/index/fb.png" alt="" /><span class="link"
            >FB關注[linghit]</span
          >
        </div>
      </div>
      <div>
        如需幫助可發送郵件至 yangyaping@weli.cn
        <!-- <span class="link">yangyaping@weli.cn</span> -->
      </div>
      <div style="margin-bottom: 0.3rem">客服會盡快恢復您的問題</div>
      <div style="margin-bottom: 0.3rem">
        <span @click="toPage('service.html')">《通用服務條款及隱私政策》</span>
      </div>
    </div>
    <!-- 组合抽屉 -->
    <GroupPopup
      :list="list1"
      :visible="visible1"
      :maxNum="3"
      @update-visible="visible1 = false"
      @update-check="updateCheck1"
      @confirm-combine="confirmCombine3"
    ></GroupPopup>
    <GroupPopup
      :list="list2"
      :visible="visible2"
      :maxNum="2"
      @update-visible="visible2 = false"
      @update-check="updateCheck2"
      @confirm-combine="confirmCombine2"
    ></GroupPopup>
    <!-- 支付抽屉 -->
    <PayPopup
      :visible="visible"
      :product_id="product_id"
      :is_combine="true"
      :combine_ids="combine_ids"
      @update-visible="visible = false"
    ></PayPopup>
  </div>
</template>

<script>
import {
  getCombineGoodsListAPI,
  getCombineOrderAPI,
  getGoodsListAPI,
} from '../../api/api';
import GroupPopup from '../../components/GroupPopup';
import PayPopup from '../../components/PayPopup.vue';
import { path_enums } from '../../libs/enum';

const productsMap = {
  1: {
    item_id: 1,
    title: '八字合婚',
    desc: '合八字測姻緣，專業分析婚配指數，擁有更加幸福美滿的婚姻！',
    url: 'marriage_measure_overseas',
    check: false,
  },
  2: {
    item_id: 2,
    title: '全年運勢',
    desc: '預知運勢順遂，預測好運、危機出現月份，助你把握流年機遇！',
    url: 'new_year_luck_overseas',
    check: false,
  },
  3: {
    item_id: 3,
    title: '婚缘心卦',
    desc: '姻緣分析，知己知彼，為你掃除情感障礙，幫你打造天賜良緣！',
    url: 'marriage_divination_overseas',
    check: false,
  },
  4: {
    item_id: 4,
    title: '財運精批',
    desc: '把握財運先機，揭曉財富運程，助你財運亨通，財源滾滾！',
    url: 'wealth_boutique_overseas',
    check: false,
  },
  5: {
    item_id: 5,
    title: '事業精批',
    desc: '預知事業低谷，成功時機，把握你的先天優勢，讓你的事業一帆風順！',
    url: 'career_divination_overseas',
    check: false,
  },
};

export default {
  components: { GroupPopup, PayPopup },
  data() {
    return {
      loading: false,
      list: [],

      // 组合测算相关
      list1: [], // 组合3
      list2: [], // 组合2
      visible1: false, // 组合3
      visible2: false, // 组合3
      showCombine3: false, // 已选组合3
      showCombine2: false, // 已选组合2
      combineArr3: [], // 组合3已选商品id
      combineArr2: [], // 组合2已选商品id
      combineLoading: true,

      // 组合测算支付相关
      product_id: 0, // 当前选择的组合测算的商品id
      visible: false, // 支付抽屉展示
      // combinePrice3: 0,
      // combinePrice2: 0,
      combine_ids: '', // 当前点击支付时的组合测算id
      combineOrder3: null,
      combineOrder2: null,

      // scroll组件相关
      combineDOM: null,
      prevScrollLeft: 0,
      scrollLeft: 0,
      hasTouch: false, // 长按中

      hasScroll: true,
    };
  },
  created() {
    window.addEventListener('pageshow', () => {
      let token = localStorage.getItem('suishen_overseas_token');
      let open_uid = localStorage.getItem('suishen_overseas_open_uid');
      if (token && open_uid) {
        this.getCombineOrder();
      } else {
        this.combineLoading = false;
      }
    });

    window.scrollTo(0, 0);
  },
  mounted() {
    this.hasScroll = localStorage.getItem('suishen_overseas_has_scroll');
    if (!this.hasScroll) {
      setTimeout(() => {
        localStorage.setItem('suishen_overseas_has_scroll', 1);
        this.hasScroll = true;
        this.initScroll();
      }, 3000);
    } else {
      this.initScroll();
    }
  },
  methods: {
    // 初始化滚动效果
    initScroll() {
      let combine = this.$refs.combine;
      let startX = 0;
      let gap = 0;
      let screenW = window.screen.width;
      combine.addEventListener('touchstart', e => {
        gap = 0;
        this.hasTouch = true;
        startX = e.targetTouches[0].clientX;
      });
      combine.addEventListener('touchmove', e => {
        gap = e.targetTouches[0].clientX - startX;
        let positionX = this.prevScrollLeft + gap;
        if (positionX > 0) {
          // 左边界
          this.scrollLeft = 0;
        } else if (positionX < -(660 / 750) * screenW) {
          // 右边界
          this.scrollLeft = -(660 / 750) * screenW;
        } else {
          // 跟随移动
          this.scrollLeft = positionX;
        }
      });
      combine.addEventListener('touchend', e => {
        this.hasTouch = false;
        if (gap < -50) {
          // 右滑成功
          this.scrollLeft = -(660 / 750) * screenW;
        } else if (gap > 50) {
          // 左滑成功
          this.scrollLeft = 0;
        } else {
          // 滑动失败回到初始位置
          this.scrollLeft = this.prevScrollLeft;
        }
        this.prevScrollLeft = this.scrollLeft;
      });
    },
    // 查询组合测算订单
    getCombineOrder() {
      this.combineLoading = true;
      getCombineOrderAPI().then(res => {
        let data = res.data;
        this.combineOrder3 = data.combine_three;
        this.combineOrder2 = data.combine_two;
        this.combineLoading = false;
      });
    },
    // 组合测算查看结果
    toResult(item, main_order_id) {
      if (item.order_id) {
        location.href = `${path_enums[item.product_id]}.html#/result?order_id=${
          item.order_id
        }`;
      } else {
        // 组合测算跳转详情页
        location.href = `${
          path_enums[item.product_id]
        }.html?is_combine=1&main_order_id=${main_order_id}`;
      }
    },
    // 组合测算立即支付
    pay(pid) {
      this.combine_ids =
        pid == 6 ? this.combineArr3.join('') : this.combineArr2.join('');
      this.product_id = pid;

      // 测测 支付抽屉的展示

      this.visible = true;
    },
    // 确认选择组合3
    confirmCombine3(str) {
      this.combineArr3 = str.split('');
      this.showCombine3 = true;
    },
    // 确认选择组合2
    confirmCombine2(str) {
      this.combineArr2 = str.split('');
      this.showCombine2 = true;
    },
    // 打开组合3抽屉
    showGroupPopup3(flag, from) {
      if (!flag) return false; // 已解锁不能再点击

      this.list1.forEach(item => {
        let i = this.combineArr3.find(id => id == item.item_id);
        item.check = i ? true : false;
      });

      this.visible1 = true;
    },
    // 打开组合2抽屉
    showGroupPopup2(flag, from) {
      if (!flag) return false; // 已解锁不能再点击

      this.list2.forEach(item => {
        let i = this.combineArr2.find(id => id == item.item_id);
        item.check = i ? true : false;
      });

      // 测测 商品选择抽屉的浏览

      this.visible2 = true;
    },
    // 更新组合1数据勾选状态
    updateCheck1(pid) {
      this.list1.forEach(item => {
        if (pid === item.item_id) {
          item.check = !item.check;
        }
      });
    },
    // 更新组合1数据勾选状态
    updateCheck2(pid) {
      this.list2.forEach(item => {
        if (pid === item.item_id) {
          item.check = !item.check;
        }
      });
    },
    // 请求数据
    query() {
      this.getGoodsList();
      this.getCombine();
    },
    // 请求组合测算数据
    getCombine() {
      getCombineGoodsListAPI().then(res => {});
    },
    // 请求精选单品数据
    getGoodsList() {
      this.loading = true;
      getGoodsListAPI()
        .then(res => {
          let data = res.data;
          let products = data.products;
          this.list = [];
          products.forEach(item => {
            let obj = productsMap[item.product_id];
            obj.price = item.price;
            this.list.push(obj);
          });
          this.handleCombine();
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 组合卡片数据初始化
    handleCombine() {
      this.list1 = [];
      this.list2 = [];
      this.list.forEach(item => {
        this.list1.push(Object.assign({}, item));
        this.list2.push(Object.assign({}, item));
      });
      let combine3 = localStorage.getItem('suishen_overseas_combine3');
      let combine2 = localStorage.getItem('suishen_overseas_combine2');
      let n1 = 0;
      let n2 = 0;
      if (combine3) {
        this.combineArr3 = combine3.split('');
        this.combineArr3.forEach(id => {
          this.list1.forEach(item => {
            if (item.item_id == id) {
              n1++;
              item.check = true;
            }
          });
        });
      }
      if (combine2) {
        this.combineArr2 = combine2.split('');
        this.combineArr2.forEach(id => {
          this.list2.forEach(item => {
            if (item.item_id == id) {
              n2++;
              item.check = true;
            }
          });
        });
      }
      if (n1 === 3) this.showCombine3 = true;
      if (n2 === 2) this.showCombine2 = true;
    },
    link(url, item_id) {
      // 测测 测算卡片浏览/点击
      tStatistic.send({
        event: 'click',
        md: 10,
        c_id: 102,
        args: {
          name: item_id,
          origin: location.origin,
          channel: localStorage.getItem('suishen_overseas_channel'),
        },
      });
      location.href = url + '.html';
    },
    toPage(url) {
      location.href = url;
    },
    toFb(url) {
      // 测测 FB账号链接点击
      tStatistic.send({
        event: 'click',
        md: 10,
        c_id: 103,
        args: {
          origin: location.origin,
          channel: localStorage.getItem('suishen_overseas_channel'),
        },
      });
      location.href = url;
    },
  },
};
</script>

<style scoped lang="less">
@import './../../less/reset.less';
@import './../../less/common.less';

.recommend-container {
  width: 100%;
  .title {
    font-size: 0.36rem;
    line-height: 1;
    font-weight: bold;
    color: #314a46;
    display: flex;
    align-items: center;
    padding-left: 0.36rem;
    margin-bottom: 0.24rem;
    img {
      height: 0.36rem;
      margin-left: 0.19rem;
    }
  }
  .combine {
    margin-bottom: 0.5rem;
    // overflow: auto;
    .combine-box {
      width: 14.16rem;
      padding: 0 0.2rem;
      display: flex;
      box-sizing: border-box;
      &.animation {
        animation: moveLeft 1.5s ease-in-out 1.5s 1;
      }
      .combine-card {
        width: 6.78rem;
        height: 4.02rem;
        background-image: url('../../assets/img/3.0/combine-bg.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        box-sizing: border-box;
        padding: 0.08rem;
        display: flex;
        flex-direction: column;
        .combine-top {
          flex: none;
          .combine-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.27rem 0.28rem 0.25rem;
            .combine-info-left {
              color: #314a46;
              font-size: 0.28rem;
              line-height: 0.38rem;
              font-weight: bold;
              display: flex;
              align-items: center;
              img {
                width: 1.1rem;
              }
            }
            .combine-info-right {
              color: rgba(49, 74, 70, 0.7);
              font-size: 0.24rem;
              line-height: 1;
            }
          }
        }
        .combine-products {
          flex: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.28rem;
          .combine-product {
            width: 1.86rem;
            height: 1.2rem;
            position: relative;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            .unlock {
              position: absolute;
              top: -0.06rem;
              right: -0.06rem;
              width: 0.82rem;
              height: 0.36rem;
            }
          }
          .combine-placeholder {
            width: 1.86rem;
            height: 1.2rem;
          }
        }
        .combine-bottom {
          flex: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .combine-order {
            width: 100%;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 0.28rem;
            .combine-order-item {
              width: 1.86rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .combine-order-btn {
                width: 1.62rem;
                height: 0.64rem;
                font-size: 0.26rem;
                line-height: 0.64rem;
                text-align: center;
                border-radius: 0.16rem;
                margin-bottom: 0.12rem;
                background-image: linear-gradient(to bottom, #f47553, #e92424);
                border: 0.02rem solid #ffd192;
                color: #fef8eb;
                &.done {
                  color: #e3453d;
                  background-image: none;
                  border: 0.02rem solid #e79999;
                }
              }
              .combine-order-state {
                text-align: center;
                font-size: 0.24rem;
                line-height: 1;
                color: #5b410d;
              }
            }
          }
          .combine-select {
            width: 5.86rem;
            height: 0.96rem;
            color: #fdf4be;
            font-size: 0.32rem;
            line-height: 0.96rem;
            background-image: url('../../assets/img/3.0/btn-big.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            text-align: center;
            font-weight: bold;
            &.scale {
              animation: scale 1.2s linear 0s infinite;
            }
          }
          .combine-change {
            text-align: center;
            color: #5b410d;
            font-size: 0.26rem;
            line-height: 1;
            font-weight: bold;
          }
        }
        .combine-loading {
          flex: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: -0.3rem;
          img {
            width: 0.5rem;
            height: 0.5rem;
            animation-name: loading;
            animation-duration: 1.5s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        }
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    .card-box {
      width: 7.1rem;
      box-sizing: border-box;
      position: relative;
      padding: 0.08rem;
      margin-bottom: 0.2rem;
      background-image: url('../../assets/img/3.0/product-bg.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      .card {
        .top {
          height: 2.3rem;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: top;
        }
        .bottom {
          height: 1.74rem;
          display: flex;
          padding: 0 0.24rem;
          align-items: center;
          .info {
            flex: auto;
            margin-right: 0.35rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .card-title {
              color: #314a46;
              font-size: 0.32rem;
              line-height: 0.44rem;
              font-weight: bold;
              margin-bottom: 0.1rem;
              .price {
                font-size: 0.24rem;
                color: #e3453d;
                margin-left: 0.6rem;
                .price-num {
                  font-size: 0.4rem;
                }
              }
            }
            .desc {
              color: rgba(49, 74, 70, 0.7);
              font-size: 0.26rem;
              line-height: 0.36rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .btn {
            flex: none;
            width: 1.91rem;
            height: 0.72rem;
            line-height: 0.72rem;
            background-image: url('../../assets/img/3.0/btn-small.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            color: #fdf4be;
            font-size: 0.26rem;
            font-weight: bold;
            text-align: center;
          }
        }
      }
    }
  }
}

.prod_1 {
  background-image: url('../../assets/img/3.0/prod-combine_1.png');
}
.prod_2 {
  background-image: url('../../assets/img/3.0/prod-combine_2.png');
}
.prod_3 {
  background-image: url('../../assets/img/3.0/prod-combine_3.png');
}
.prod_4 {
  background-image: url('../../assets/img/3.0/prod-combine_4.png');
}
.prod_5 {
  background-image: url('../../assets/img/3.0/prod-combine_5.png');
}

.prod-banner_1 {
  background-image: url('../../assets/img/3.0/prod-banner_1.png');
}
.prod-banner_2 {
  background-image: url('../../assets/img/3.0/prod-banner_2.png');
}
.prod-banner_3 {
  background-image: url('../../assets/img/3.0/prod-banner_3.png');
}
.prod-banner_4 {
  background-image: url('../../assets/img/3.0/prod-banner_4.png');
}
.prod-banner_5 {
  background-image: url('../../assets/img/3.0/prod-banner_5.png');
}

@keyframes moveLeft {
  0% {
    margin-left: 0;
  }
  50% {
    margin-left: -2rem;
  }
  100% {
    margin-left: 0;
  }
}
@keyframes scale {
  0% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0.98);
  }
}
</style>
