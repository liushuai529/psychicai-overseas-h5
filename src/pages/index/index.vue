<template>
  <div :class="['container', fix_pop ? 'fix-pop' : '']">
    <img
      @click="
        jumpUrl('history_order', '-10010', 'click_main_history', 'dvtjq2')
      "
      class="history-order"
      :src="is_cn ? cn_order_btn : tw_order_btn"
      alt=""
    />
    <div class="header-box">
      <mt-swipe :auto="3000" :showIndicators="true" class="swiper-contain">
        <mt-swipe-item
          v-for="(item, k) in header_list"
          :key="'swiper' + k"
          class="swiper-item"
        >
          <img
            @click="handleReport(item, 5)"
            :src="is_cn ? item.cn_icon : item.tw_icon"
            alt=""
          />
        </mt-swipe-item>
      </mt-swipe>
      <!-- 用户已购买数据走马灯 -->
      <div @click="jumpPage(mock_report_list[cur_index].id)" class="buy-list">
        <img
          class="laba"
          src="https://psychicai-static.psychicai.pro/imgs/2404148caf3a4f6e4194ba7c5431e81fa82a.png"
          alt=""
        />
        <van-swipe
          class="swiper-buy"
          :autoplay="2000"
          :show-indicators="false"
          vertical
          @change="getReportItem"
        >
          <van-swipe-item
            ref="swiper"
            class="swiper-slide"
            v-for="(it, j) in buy_list"
            :key="j"
          >
            <div class="flex-row">
              <span>{{ it }}</span>
              <span class="link-url">{{ mock_report_list[j].name }}</span>
              <span>{{ score_list[j] }}</span>
            </div>
          </van-swipe-item>
        </van-swipe>
        <img
          class="arrow"
          src="https://psychicai-static.psychicai.pro/imgs/2404fe7affcbeb894bd99695760f5bd315d1.png"
          alt=""
        />
      </div>
    </div>
    <CalculateBar
      v-if="comboAttachData && is_show_combination"
      style="margin-top: 0.1rem;" 
      :is_home="true"
      product_key="h5_marriage"
      :call_back="startCalculateClick"
    />
    <!-- 新版多买多折扣 -->
    <van-swipe
      v-if="is_show_combine"
      :loop="false"
      :show-indicators="false"
      :stop-propagation="false"
      class="discount-box"
      @change="getCombineIndex"
    >
      <div
        :style="{
          height: '100%',
          width: scrollStyle,
          transition: 'width 0.3s',
        }"
      ></div>
      <van-swipe-item
        v-if="payed_order_three_list.length"
        :class="{
          'sale-item': true,
          // 'ml-100': combine_index === 0,
          // 'ml-170': combine_index === 1,
        }"
      >
        <div class="item">
          <div class="order-title">已解锁报告，快来查看！</div>

          <!-- 新版 商品选择 -->
          <div
            class="three-list"
            :style="{
              'margin-top': payed_order_three_list.length
                ? '0.34rem'
                : '0.96rem',
            }"
          >
            <div
              v-for="(it, k) in payed_order_three_list.length
                ? payed_order_three_list
                : ['', '', '']"
              :key="'three' + k"
              :class="['it', it.product_key ? '' : 'no-it', `it${k + 1}`]"
            >
              <img
                :src="!is_cn ? it.cn_check_icon : it.tw_check_icon"
                class="check-icon"
                alt=""
              />
              <div v-if="payed_order_three_list.length" class="tag get-tag">
                已解锁
              </div>
              <div :class="`status-${it.status} status-common`">
                <div @click="toWriteInfo(it)" class="text">
                  {{ it.status ? "查看结果" : "开始测算" }}
                </div>
              </div>
              <div class="tips-ce">{{ it.status ? "已测算" : "还未测算" }}</div>
            </div>
            <div class="divider-line-left">
              <div class="one"></div>
              <div class="two"></div>
            </div>
            <div class="divider-line-right">
              <div class="one"></div>
              <div class="two"></div>
              <div class="three"></div>
            </div>
          </div>
        </div>
      </van-swipe-item>

      <van-swipe-item
        :class="{
          'sale-item': true,
          // 'ml-100': !payed_order_three_list.length && combine_index !== 0,
        }"
      >
        <div class="item">
          <div class="item-price-box">
            <div class="sale-title">多买多折扣</div>
            <div v-if="combine_info.price" class="new-price">
              <span class="one">{{
                combine_info.unit
                  ? `${combine_info.unit + combine_info.origin_price_str}`
                  : "RM-"
              }}</span>
              <span class="two">-42%</span>
              <span class="large">{{
                combine_info.unit
                  ? `${combine_info.unit + combine_info.price}`
                  : "RM-"
              }}</span>
            </div>
            <img
              v-else
              src="../../assets/img/new_combine/home_tag_58_big.png"
              class="zhekou-icon discount-tag"
              alt=""
            />
          </div>

          <!-- 新版 商品选择 -->
          <div class="three-list">
            <div
              @click="showModal()"
              v-for="(it, k) in three_list.length ? three_list : ['', '', '']"
              :key="'three' + k"
              :class="['it']"
            >
              <img
                v-if="three_list.length"
                :src="!is_cn ? it.cn_check_icon : it.tw_check_icon"
                class="check-icon"
                alt=""
              />
              <img
                v-else
                src="../../assets/img/new_combine/home_btn_add.png"
                class="check-icon"
                alt=""
              />
              <div v-if="three_list.length" class="tag">待解锁</div>
            </div>
            <div class="divider-line-left">
              <div class="one"></div>
              <div class="two"></div>
            </div>
            <div class="divider-line-right">
              <div class="one"></div>
              <div class="two"></div>
              <div class="three"></div>
            </div>
          </div>
          <div
            @click="changeSale(0)"
            class="pick-btn"
            :style="{ 'margin-top': three_list.length ? '0.3rem' : '0.52rem' }"
          >
            {{ !three_list.length ? "选择组合" : "解锁命运密码" }}
            <img
              v-if="three_list.length"
              src="../../assets/img/new_combine/home_tag_58_big.png"
              class="absolute-zhe discount-tag"
              alt=""
            />
          </div>
          <div
            v-show="three_list.length"
            class="reset-select"
            @click="restartChoose()"
          >
            重新选择
          </div>
        </div>
      </van-swipe-item>
      <!-- 两项选择 -->
      <van-swipe-item
        :class="{
          'sale-item': true,
        }"
      >
        <div class="item" id="card-item">
          <div class="item-price-box">
            <div class="sale-title">多买多折扣</div>
            <div v-if="combine_info2.price" class="new-price">
              <span class="one">{{
                combine_info2.unit
                  ? `${combine_info2.unit + combine_info2.origin_price_str}`
                  : "RM-"
              }}</span>
              <span class="two">-42%</span>
              <span class="large">{{
                combine_info2.unit
                  ? `${combine_info2.unit + combine_info2.price}`
                  : "RM-"
              }}</span>
            </div>
            <img
              v-else
              src="../../assets/img/new_combine/home_tag_68_big.png"
              class="zhekou-icon discount-tag"
              alt=""
            />
          </div>

          <!-- 新版 商品选择 -->
          <div class="three-list">
            <div
              @click="showModal2()"
              v-for="(it, k) in two_list.length ? two_list : ['', '']"
              :key="'three' + k"
              :class="['it']"
            >
              <img
                v-if="two_list.length"
                :src="!is_cn ? it.cn_check_icon : it.tw_check_icon"
                class="check-icon"
                alt=""
              />
              <img
                v-else
                src="../../assets/img/new_combine/home_btn_add.png"
                class="check-icon"
                alt=""
              />
              <div v-if="two_list.length" class="tag">待解锁</div>
            </div>
            <div class="divider-line-left">
              <div class="one"></div>
              <div class="two"></div>
            </div>
            <div class="divider-line-right" style="display: none">
              <div class="one"></div>
              <div class="two"></div>
              <div class="three"></div>
            </div>
          </div>
          <div
            @click="changeSale(2)"
            class="pick-btn"
            :style="{ 'margin-top': two_list.length ? '0.3rem' : '0.48rem' }"
          >
            {{ !two_list.length ? "选择组合" : "解锁命运密码" }}
            <img
              v-if="two_list.length"
              src="../../assets/img/new_combine/home_tag_68_big.png"
              class="absolute-zhe discount-tag"
              alt=""
            />
          </div>
          <div
            v-show="two_list.length"
            class="reset-select"
            @click="restartChoose(2)"
          >
            重新选择
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- banner位 -->
    <div class="report-container">
      <div
        v-for="(item, index) in banner_list"
        :key="index"
        @click="
          jumpUrl(
            item.url,
            item.e_id,
            item.e_name,
            item.ad_e,
            item.report_id,
            item.product_key
          )
        "
        :class="[item.is_big ? 'big-item' : 'normal-item']"
      >
        <!-- // item.is_big
            //   ? is_cn
            //     ? item.icon_item.big.cn
            //     : item.icon_item.big.tw
            //   : is_cn
            //   ? item.icon_item.small.cn
            //   : item.icon_item.small.tw -->
        <img
          :src="getBannerIcon(item)"
          :class="[item.is_big ? 'big-icon' : 'normal-icon']"
          alt=""
        />
        <div v-if="item.is_big" class="big-box">
          <div class="left">
            <div style="-webkit-box-orient: vertical" class="text">
              {{ is_cn ? item.cn_desc : item.tw_desc }}
            </div>
            <div class="tips flex-start">
              <div class="buy-num">{{ item.buy_num }}{{ $t("tips-5") }}</div>
              <div class="review-num ml-40">
                {{ item.review_num }}{{ $t("tips-4") }}
              </div>
            </div>
          </div>
          <img
            class="right-btn"
            :src="is_cn ? cn_right_pay : tw_right_pay"
            alt=""
          />
        </div>
        <div v-else class="normal-box">
          <div style="-webkit-box-orient: vertical" class="text">
            {{ is_cn ? item.cn_desc : item.tw_desc }}
          </div>
          <div class="tips">
            <div class="buy-num">{{ item.buy_num }}{{ $t("tips-5") }}</div>
            <div class="review-num">
              {{ item.review_num }}{{ $t("tips-4") }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 多买多折扣 -->
    <div style="display: none" class="sale-box">
      <div class="title-box">
        <div class="left">{{ $t("buy-zhekou") }}</div>
        <div class="right">
          <div v-if="zhekouList[zhekou].total" class="total">
            {{ zhekouList[zhekou].total }}RM
          </div>
          <div v-if="zhekouList[zhekou].percent" class="percent">
            {{ zhekouList[zhekou].percent }}
          </div>
          <div class="price">{{ zhekouList[zhekou].price }}RM</div>
        </div>
      </div>
      <div class="sale-list">
        <div
          @click="showPop()"
          v-for="(it, k) in checked_list"
          :key="'sale' + k"
          class="item"
        >
          <img v-if="it.check_icon" :src="it.check_icon" class="icon" alt="" />
          <img
            v-if="!it.check_icon"
            src="../../assets/img/mlxz/index/ce_btn_jia.png"
            class="add-icon"
            alt=""
          />
        </div>
      </div>
      <div @click="payModal()" class="lock-btn">
        {{ $t("order-btn") }}
        <img
          v-show="zhekou === 2"
          class="btn-icon"
          src="../../assets/img/mlxz/cold_start/cesuan_img_tag2@3x.png"
          alt=""
        />
        <img
          v-show="zhekou === 1"
          class="btn-icon"
          src="../../assets/img/mlxz/cold_start/cesuan_img_tag@3x.png"
          alt=""
        />
      </div>
      <div @click="showPop()" class="change-btn">
        {{ $t("change-btn") }}
      </div>
    </div>
    <!-- 爆款推荐 -->
    <div class="hot-product hidden">
      <img
        class="title"
        src="../../assets/img/mlxz/index/ce_img_bao.png"
        alt=""
      />
      <div class="product-list">
        <img
          v-for="(it, k) in recommend_list"
          :key="'reco' + k"
          class="item"
          :src="it.icon"
          @click="handleReport(it, 2)"
          alt=""
        />
      </div>
    </div>

    <!-- 广告位 -->
    <div class="ad-list hidden">
      <img
        v-for="(ad, k) in ad_list"
        @click="handleReport(ad, 3)"
        :key="'ad' + k"
        class="item"
        :src="ad.icon"
      />
    </div>

    <!-- 选择商品弹窗 -->
    <mt-popup
      v-model="sale_visible"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div class="pop-box">
        <div class="pop-header">
          <div class="left">
            {{ $t("get-three") }}
          </div>
          <img
            @click="closeSalePop()"
            src="../../assets/img/mlxz/cesuan_home/icon_close2.png"
            class="close"
            alt=""
          />
        </div>
        <div class="pop-content">
          <div
            v-for="(it, k) in pop_list"
            :key="'sale-' + k"
            @click="chooseSale(it, k)"
            :class="{
              item: true,
              'normal-item': true,
              'forbidden-item': !can_choose && !it.checked,
            }"
          >
            <img
              v-if="it.checked"
              class="check-icon"
              src="../../assets/img/mlxz/index/checked_icon.png"
              alt=""
            />
            <img
              v-else
              class="check-icon"
              src="../../assets/img/mlxz/index/no_check_icon.png"
              alt=""
            />
            <img class="top-icon" :src="it.icon" alt="" />

            <div :id="`text-${k}`" v-if="measureProduct[k]" class="bottom-box">
              {{ measureProduct[k].tips }}
            </div>
          </div>
        </div>
        <!-- 确认 -->

        <div
          :class="{
            'confirm-box': true,
            'disabled-confirm': !can_submit ? true : false,
          }"
          @click="handleConfirm()"
        >
          {{ $t("confirm-btn") }}
        </div>
      </div>
    </mt-popup>
    <!-- 调起支付页-->
    <PayPopup
      :visible="pay_visible"
      :is_combine="true"
      :total_money="zhekouList[zhekou].price"
      :checked_list="checked_list"
      :all_list="all_list"
      :combine_ids="combine_ids"
      @update-visible="pay_visible = false"
    ></PayPopup>
    <!-- 支付成功弹窗 -->
    <PopResult
      :visible="pay_result_visible"
      :result_list="result_list"
      :sub_orders="sub_orders"
      :pop_list="pop_list"
      @handleReport="hasPayReport"
      @update-visible="pay_result_visible = false"
    ></PopResult>

    <!-- 新版选择弹窗 -->
    <mt-popup
      v-model="new_sale_modal"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div class="modal-box">
        <div class="title-box">
          <div @click="new_sale_modal = false" class="left">取消</div>
          <div class="center">任选三项享特惠</div>
          <div
            v-if="pick_list.length === 3"
            @click="submitPopList()"
            class="right-common right-check"
          >
            <div class="btn">确定</div>
          </div>
          <div
            v-else
            @click="ToastSubmit('三')"
            class="right-common disable-right"
          >
            <div class="btn">确定</div>
          </div>
        </div>

        <div class="modal-list">
          <div
            v-for="(item, k) in new_pop_list"
            @click="chooseNewSale(item, k)"
            :key="k"
            :class="{
              item: true,
              'item-checked': item.checked,
              'opacity-20': pick_list.length >= 3 && !item.checked,
              'item-normal': !item.checked,
            }"
          >
            <img
              :src="item.checked ? checkIcon : noCheckIcon"
              class="check-icon"
              alt=""
            />
            <img
              :src="is_cn ? item.cn_pop_icon : item.tw_pop_icon"
              class="icon"
              alt=""
            />
            <div class="desc" style="-webkit-box-orient: vertical">
              {{ is_cn ? item.cn_desc : item.tw_desc }}
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="new_sale_modal2"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div class="modal-box">
        <div class="title-box">
          <div @click="new_sale_modal2 = false" class="left">取消</div>
          <div class="center">任选两项享特惠</div>
          <div
            v-if="pick_list2.length === 2"
            @click="submitPopList(2)"
            class="right-common right-check"
          >
            <div class="btn">确定</div>
          </div>
          <div
            v-else
            @click="ToastSubmit('两')"
            class="right-common disable-right"
          >
            <div class="btn">确定</div>
          </div>
        </div>

        <div class="modal-list">
          <div
            v-for="(item, k) in new_pop_list"
            @click="chooseNewSale(item, k, 2, 'pick_list2')"
            :key="k"
            :class="{
              item: true,
              'item-checked': item.checked,
              'opacity-20': pick_list2.length >= 2 && !item.checked,
              'item-normal': !item.checked,
            }"
          >
            <img
              :src="item.checked ? checkIcon : noCheckIcon"
              class="check-icon"
              alt=""
            />
            <img
              :src="is_cn ? item.cn_pop_icon : item.tw_pop_icon"
              class="icon"
              alt=""
            />
            <div class="desc" style="-webkit-box-orient: vertical">
              {{ is_cn ? item.cn_desc : item.tw_desc }}
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
    <PayModal
      :visible="pay_modal"
      :combine_info="combine_info"
      @close="pay_modal = false"
      @resetInfo="combine_info = {}"
      @logEvent="logEventForSort"
      :pay_index="3"
      key_store="mlxz_web_select_list"
    />
    <PayModal
      :visible="pay_modal2"
      :combine_info="combine_info2"
      @close="pay_modal2 = false"
      @resetInfo="combine_info2 = {}"
      @logEvent="logEventForSort"
      :pay_index="2"
      key_store="mlxz_web_select_list_two"
    />

    <ResultPop v-if="show_result" @close="show_result = false" />
    <FixedOrder
      v-if="show_fixed_order"
      :title="local_title"
      :new_order_key="new_order_key"
      name="local"
      top="4.7rem"
      :time="local_time"
      @payOrder="checkOrder"
      @jumpDetail="jumpOrder"
    />
    <FixedOrder
      v-if="show_api_order"
      :title="last_title"
      :last_order="last_order"
      name="api"
      top="6.7rem"
      :time="api_time"
      @payOrder="checkOrder"
      @jumpDetail="jumpOrder"
    />
  </div>
</template>

<script>
import FixedOrder from "../../components/FixedOrder.vue";
// @ts-ignore
import Recommend from "./recommend.vue";
// @ts-ignore
import Fortune from "./fortune.vue";
import utils from "../../libs/utils";
import PayPopup from "../../components/PayPopup.vue";
import {
  banner_enums,
  reportName,
  path_enums,
  maidianEnum,
} from "../../libs/enum";
import { Toast, Indicator } from "mint-ui";

import PopResult from "./pay_result.vue";
import { getProductions } from "../../libs/common_api";
import {
  getProductionsAPI,
  getComboListAPI,
  getComboAttachAPI,
  reportEventAPI,
  sortProductsAPI,
  getResultAPI,
  checkSendEventApi,
  sendEventApi,
  getLastOrderAPI,
  payOrderAPI,
  reportBuryingEventAPI,
} from "../../api/api";

import longnianImg from "../../assets/img/mlxz/cold_start/banner-2024caiyun@3x.png";
import career_2024 from "../../assets/img/mlxz/index/banner_shiyeyunshi.png";

import bzhh from "../../assets/img/mlxz/index/bahh.png";
import nianyun_24 from "../../assets/img/mlxz/index/2024-nianyun.png";
import ganqqingyun_24 from "../../assets/img/mlxz/index/24-ganqqingyun.png";
import caiyun_24 from "../../assets/img/mlxz/index/2024-caiyun.png";
import zongheyunshi from "../../assets/img/mlxz/index/24-zongheyunshi.png";
import banner_ganqing from "../../assets/img/mlxz/index/banner_ganqing.png";
import top_caiyun from "../../assets/img/mlxz/index/top-caiyun.png";
import top_shiye from "../../assets/img/mlxz/index//top-shiye.png";
import xiabanner_bazi from "../../assets/img/mlxz/index/xiabanner_bazi_jianti.png";
import banner_yuantiangang from "../../assets/img/mlxz/index/banner-yuantiangang.png";
import gif_nianyun from "../../assets/img/mlxz/index/gif/24年运-简体.gif";
import gif_ganqing from "../../assets/img/mlxz/index/gif/感情运势-简体.gif";
import gif_guiguzi from "../../assets/img/mlxz/index/gif/鬼谷子-简体.gif";
import gif_yuantiangang from "../../assets/img/mlxz/index/gif/袁天罡-简体.gif";

import tw_bzhh from "../../assets/img/mlxz/index/tw/bzhh.png";
import tw_wealth24 from "../../assets/img/mlxz/index/tw/wealth24.png";
import tw_year24 from "../../assets/img/mlxz/index/tw/year24.png";
import tw_web from "../../assets/img/mlxz/index/tw/web.png";

import tw_wealth24_banner from "../../assets/img/mlxz/index/tw/wealth24_banner.png";
import tw_year24_banner from "../../assets/img/mlxz/index/tw/year24_banner.png";
import tw_bzhh_banner from "../../assets/img/mlxz/index/tw/bzhh_banner.png";
import tw_emotion from "../../assets/img/mlxz/index/tw/emotion24_banner.png";
import tw_career from "../../assets/img/mlxz/index/tw/career24_banner.png";
import tw_ggz from "../../assets/img/mlxz/index/tw/ggz_banner.png";
import tw_weigh from "../../assets/img/mlxz/index/tw/weigh_banner.png";

import tw_order_btn from "../../assets/img/mlxz/index/tw/history_order.png";
import tw_right_pay from "../../assets/img/mlxz/index/tw/right_pay.png";

import cn_banner_ganqin from "../../assets/img/mlxz/new_banner/h5_img_topbanner_ganqing_jian.png";
import tw_banner_ganqin from "../../assets/img/mlxz/new_banner/h5_img_topbanner_ganqing_fan.png";

import cn_modal_bzhh from "../../assets/img/new_combine/sale_big/h5_zuhe_big_jian_bazihehun.png";
import cn_modal_ggz from "../../assets/img/new_combine/sale_big/h5_zuhe_big_jian_guiguzi.png";
import cn_modal_weigh from "../../assets/img/new_combine/sale_big/h5_zuhe_big_jian_yuantiangang.png";
import cn_modal_emotion from "../../assets/img/new_combine/sale_big/h5_zuhe_big_jian_ganqing.png";
import cn_modal_career from "../../assets/img/new_combine/sale_big/h5_zuhe_big_jian_shiye.png";
import cn_modal_wealth from "../../assets/img/new_combine/sale_big/h5_zuhe_big_jian_caiyun.png";
import cn_modal_year from "../../assets/img/new_combine/sale_big/h5_zuhe_big_jian_nianyun.png";
import tw_modal_bzhh from "../../assets/img/new_combine/sale_big/h5_zuhe_big_fan_bazihehun.png";
import tw_modal_ggz from "../../assets/img/new_combine/sale_big/h5_zuhe_big_fan_guiguzi.png";
import tw_modal_weigh from "../../assets/img/new_combine/sale_big/h5_zuhe_big_fan_yuantiangang.png";
import tw_modal_emotion from "../../assets/img/new_combine/sale_big/h5_zuhe_big_fan_ganqing.png";
import tw_modal_career from "../../assets/img/new_combine/sale_big/h5_zuhe_big_fan_shiye.png";
import tw_modal_wealth from "../../assets/img/new_combine/sale_big/h5_zuhe_big_fan_caiyun.png";
import tw_modal_year from "../../assets/img/new_combine/sale_big/h5_zuhe_big_fan_nianyun.png";
import checkIcon from "../../assets/img/new_combine/zuhe_btn_choose_selected.png";
import noCheckIcon from "../../assets/img/new_combine/zuhe_btn_choose_normal.png";

import cn_check_icon_bzhh from "../../assets/img/new_combine/sale_small/h5_zuhe_small_fan_bazihehun.png";
import cn_check_icon_ggz from "../../assets/img/new_combine/sale_small/h5_zuhe_small_fan_guiguzi.png";
import cn_check_icon_weigh from "../../assets/img/new_combine/sale_small/h5_zuhe_small_fan_yuantiangang.png";
import cn_check_icon_emotion from "../../assets/img/new_combine/sale_small/h5_zuhe_small_fan_ganqing.png";
import cn_check_icon_career from "../../assets/img/new_combine/sale_small/h5_zuhe_small_fan_shiye.png";
import cn_check_icon_wealth from "../../assets/img/new_combine/sale_small/h5_zuhe_small_fan_caiyun.png";
import cn_check_icon_year from "../../assets/img/new_combine/sale_small/h5_zuhe_small_fan_nianyun.png";
import tw_check_icon_bzhh from "../../assets/img/new_combine/sale_small/h5_zuhe_small_jian_bazihehun.png";
import tw_check_icon_ggz from "../../assets/img/new_combine/sale_small/h5_zuhe_small_jian_guiguzi.png";
import tw_check_icon_weigh from "../../assets/img/new_combine/sale_small/h5_zuhe_small_jian_yuantiangang.png";
import tw_check_icon_emotion from "../../assets/img/new_combine/sale_small/h5_zuhe_small_jian_ganqing.png";
import tw_check_icon_career from "../../assets/img/new_combine/sale_small/h5_zuhe_small_jian_shiye.png";
import tw_check_icon_wealth from "../../assets/img/new_combine/sale_small/h5_zuhe_small_jian_caiyun.png";
import tw_check_icon_year from "../../assets/img/new_combine/sale_small/h5_zuhe_small_jian_nianyun.png";

import PayModal from './components/payModal.vue';
import ResultPop from '../../components/ResultPop.vue';
import CalculateBar from '../../components/CalculateBar.vue';

import tStatistic from 'tstatistic';
tStatistic.init({
  app_key: 20002003,
  channel: utils.getFBChannel(),
});

const tipsArr5 = {
  "zh-CN": "订单创建中...",
  "zh-TW": "訂單創建中...",
};
const hotRecommendProduction = [
  //  {
  //   name:'良缘合婚',
  // content:'',
  //   url:'',
  //  },
  //  {
  //   name:'姓名风水',
  // content:'',
  //   url:'',
  //  },
  {
    id: 1,
    name: "瞬时卦",
    url: "mlxz://time/calculate",
    content: "这是瞬时卦",
  },
  {
    id: 2,
    name: "号码测测运",
    url: "mlxz://numbermoney/calculate",
    content: "这是号码测测运",
  },
  {
    id: 3,
    name: "数字风水",
    url: "mlxz://phonenumber/calculate",
    content: "这是数字风水",
  },
];

let index = utils.getQueryString("index") || 0;
let channel = utils.getQueryString("channel");

localStorage.setItem("suishen_overseas_channel", channel || "");

const initCheck = [{ value: "" }, { value: "" }, { value: "" }];

const eventProductKey = {
  h5_wealth2024: "2024_wealty_report",
  h5_career: "profession_bazi_report",
  h5_marriage: "marriage_contract_report",
  h5_love: "emotion_report",
  h5_fortune2023: "2023_report",
  h5_wealth2023: "2023_wealty_report",
};

const eventProductValue = {
  "2024_wealty_report": "80001",
  profession_bazi_report: "80004",
  marriage_contract_report: "80005",
  emotion_report: "80006",
  "2023_report": "80007",
  "2023_wealty_report": "80008",
};

const user_name_arr = [
  "林**",
  "王*",
  "朱*",
  "刘**",
  "刘*",
  "张**",
  "韩*",
  "陈**",
  "孙*",
  "乔**",
  "陈*",
  "祝**",
];

const time_arr = ["1", "2", "3"];

const report_arr = [
  {
    "zh-CN": "2024年流年运势",
    "zh-TW": "2024年流年運勢",
  },
  {
    "zh-CN": "2024年财运",
    "zh-TW": "2024年財運",
  },
  {
    "zh-CN": "2024年感情运势",
    "zh-TW": "2024年感情運勢",
  },
  {
    "zh-CN": "2024年事业运势",
    "zh-TW": "2024年事業運勢",
  },
  {
    "zh-CN": "八字合婚",
    "zh-TW": "八字合婚",
  },
  {
    "zh-CN": "袁天罡推背称骨",
    "zh-TW": "袁天罡推背稱骨",
  },
  {
    "zh-CN": "鬼谷子百卦论命",
    "zh-TW": "鬼谷子百卦論命",
  },
  {
    "zh-CN": "六爻财运神卦",
    "zh-TW": "六爻財運神卦",
  },
  {
    "zh-CN": "八字流年",
    "zh-TW": "八字流年",
  },
  {
    "zh-CN": "今生缘分揭秘",
    "zh-TW": "今生緣分揭秘",
  },
];

const e_id_arr = [
  "60009",
  "60001",
  "60010",
  "60011",
  "60005",
  "60002",
  "60003",
  "60001",
  "60009",
  "60005",
];

const product_key_arr = [
  "h5_annual2024",
  "h5_wealth2024",
  "h5_emotion2024",
  "h5_career2024",
  "h5_marriage",
  "h5_weigh_bone",
  "h5_bai_gua",
  "h5_wealth2024",
  "h5_annual2024",
  "h5_marriage",
];

const report_url = [
  "year_of_lucky_2024",
  "lucky_year_report",
  "emotion_fortune",
  "career_fortune_2024",
  "marriage_measure_overseas",
  "weigh_bone",
  "guiguzi_fortune",
  "lucky_year_report",
  "year_of_lucky_2024",
  "marriage_measure_overseas",
];

const score_arr = ["96", "97", "98", "99", "100"];

const new_pop_list = [
  {
    id: 1,
    name: "鬼谷子",
    url: "guiguzi_fortune",
    product_key: "h5_bai_gua",
    cn_desc: "64卦预见人生，审慎应对风波，谨防危机潜伏",
    tw_desc: "64卦預見人生，審慎應對風波，謹防危機潛伏",
    cn_pop_icon: cn_modal_ggz,
    tw_pop_icon: tw_modal_ggz,
    cn_check_icon: cn_check_icon_ggz,
    tw_check_icon: tw_check_icon_ggz,
    checked: false,
  },
  {
    id: 2,
    name: "袁天罡",
    url: "weigh_bone",
    product_key: "h5_weigh_bone",
    cn_desc: "称骨论命，揭露宿命重负，应对多舛命途",
    tw_desc: "稱骨論命，揭露宿命重負，應對多舛命途",
    cn_pop_icon: cn_modal_weigh,
    tw_pop_icon: tw_modal_weigh,
    cn_check_icon: cn_check_icon_weigh,
    tw_check_icon: tw_check_icon_weigh,
    checked: false,
  },
  {
    id: 3,
    name: "八字合婚",
    url: "marriage_measure_overseas",
    product_key: "h5_marriage",
    cn_desc: "揭示姻缘宿命，戒备潜藏危机，慎选伴侣之道",
    tw_desc: "揭示姻緣宿命，戒備潛藏危機，慎選伴侶之道",
    cn_pop_icon: cn_modal_bzhh,
    tw_pop_icon: tw_modal_bzhh,
    cn_check_icon: cn_check_icon_bzhh,
    tw_check_icon: tw_check_icon_bzhh,
    checked: false,
  },
  {
    id: 4,
    name: "感情运",
    url: "emotion_fortune",
    product_key: "h5_emotion2024",
    cn_desc: "感情运势早知道，和合美满还是遗憾分手",
    tw_desc: "感情運勢早知道，和合美滿還是遺憾分手",
    cn_pop_icon: cn_modal_emotion,
    tw_pop_icon: tw_modal_emotion,
    cn_check_icon: cn_check_icon_emotion,
    tw_check_icon: tw_check_icon_emotion,
    checked: false,
  },
  {
    id: 5,
    name: "2024年运",
    url: "year_of_lucky_2024",
    product_key: "h5_annual2024",
    cn_desc: "你的2024年如何度过？大师为你解读年度运势",
    tw_desc: "你的2024年如何度過？大師為你解讀年度運勢",
    cn_pop_icon: cn_modal_year,
    tw_pop_icon: tw_modal_year,
    cn_check_icon: cn_check_icon_year,
    tw_check_icon: tw_check_icon_year,
    checked: false,
  },
  {
    id: 6,
    name: "2024财运",
    url: "lucky_year_report",
    product_key: "h5_wealth2024",
    cn_desc: "预警财务危机，洞悉关键时刻，避免潜在财富风险。",
    tw_desc: "預警財務危機，洞悉關鍵時刻，避免潛在財富風險。",
    cn_pop_icon: cn_modal_wealth,
    tw_pop_icon: tw_modal_wealth,
    cn_check_icon: cn_check_icon_wealth,
    tw_check_icon: tw_check_icon_wealth,
    checked: false,
  },
  {
    id: 7,
    name: "事业运势",
    url: "career_fortune_2024",
    product_key: "h5_career2024",
    cn_desc: "前途迷雾重重，挑战接踵而至，开创事业新章",
    tw_desc: "前途迷霧重重，挑戰接踵而至，開創事業新章",
    cn_pop_icon: cn_modal_career,
    tw_pop_icon: tw_modal_career,
    cn_check_icon: cn_check_icon_career,
    tw_check_icon: tw_check_icon_career,
    checked: false,
  },
];

export default {
  components: {
    ResultPop,
    Recommend,
    Fortune,
    PayPopup,
    PopResult,
    PayModal,
    FixedOrder,
    CalculateBar,
  },
  data() {
    return {
      cn_order_btn:
        "https://psychicai-static.psychicai.pro/imgs/2404db41abf620c84fbba27927577655e386.png",
      cn_right_pay:
        "https://psychicai-static.psychicai.pro/imgs/24042d415768c8314aad99eb44ebcaeda4d6.png",
      tw_order_btn,
      tw_right_pay,
      index,
      emotion_report: "80001",
      w: 750,
      visible: false,
      //
      zhekou: 2,
      checked_list: initCheck, //已选择的产品
      mySwiper: null,
      sale_visible: false,
      can_choose: true, // 选择商品
      pop_list: [],
      pay_visible: false,
      product_id: 0,
      combine_ids: "",
      pay_result_visible: false, //支付结果弹窗页
      can_submit: true, // 是否可以提交
      hot_product_list: hotRecommendProduction, // 爆款推荐
      all_list: [],
      result_list: [],
      order_id: utils.getQueryString("order_id") || "",
      continue: true,
      sub_orders: [],
      fix_pop: false,
      bzhh,
      nianyun_24,
      ganqqingyun_24,
      caiyun_24,
      zongheyunshi,
      banner_ganqing,
      banner_ganqing,
      xiabanner_bazi,
      top_caiyun,
      top_shiye,
      banner_yuantiangang,

      // 新版
      buy_list: [],
      mock_report_list: [],
      score_list: [],
      cur_index: 0,
      combine_index: 0,
      three_list: [], //三项组合
      new_sale_modal: false,
      new_pop_list,
      checkIcon,
      noCheckIcon,
      pay_modal: false,
      combine_info: {},
      payed_order_three_list: [],
      pick_list: [],
      // 两个
      combine_info2: {},
      two_list: [],
      pick_list2: [],
      item_index: 0,
      new_sale_modal2: false,
      pay_modal2: false,
      width_dom: 0,
      show_result: false,
      order_id: "",
      is_show_combine: false,
      today_sort_list: [],
      banner_list: [],
      payed_combine_price: null,
      // 悬浮订单
      fix_order_info: null, //最新一个订单信息
      new_order_key: "",
      reportName,
      show_api_order: false,
      last_order: null,
      api_time: 0,
      local_time: 0,
      last_title: "",
      timer: null,
      comboAttachData: null,//套餐支付引导标识
    };
  },
  computed: {
    //套餐支付显示逻辑
    is_show_combination() {
      return !["enjoy03", "panda03"].includes(utils.getFBChannel());
    },
    // 顶部广告
    header_list() {
      return [
        // {
        //   id: 1,
        //   cn_icon:
        //     'https://psychicai-static.psychicai.pro/imgs/2404b88f1b070d4542f391d749cf8d5d6c48.png',
        //   tw_icon: tw_wealth24,
        //   name: '2024年财运',
        //   url: 'lucky_year_report',
        //   a_id: '60001',
        //   a_name: '2024_wealty_report',
        // },
        // {
        //   id: 2,
        //   cn_icon:
        //     'https://psychicai-static.psychicai.pro/imgs/2404bfd6c3dce6cc479cb50e999f270358ec.png',
        //   tw_icon: tw_year24,
        //   name: '24年年运',
        //   url: 'year_of_lucky_2024',
        //   a_id: '60009',
        //   a_name: '2024_report',
        // },
        {
          id: 3,
          cn_icon:
            "https://psychicai-static.psychicai.pro/imgs/2404c53a0f34e86c4bbf90b5537bbd4c8fb0.png",
          tw_icon: tw_bzhh,
          name: "八字合婚",
          url: "marriage_measure_overseas",
          a_id: "60005",
          a_name: "marriage_contract_report",
          product_key: "h5_marriage",
        },
        {
          id: 5,
          cn_icon: cn_banner_ganqin,
          tw_icon: tw_banner_ganqin,
          name: "2024感情运势",
          url: "emotion_fortune",
          a_id: "60010",
          a_name: "2024_lovely_report",
          product_key: "h5_emotion2024",
        },
        {
          id: 4,
          cn_icon:
            "https://psychicai-static.psychicai.pro/imgs/2404da455076874c45d689335fbb5fd98c5c.png",
          tw_icon: tw_web,
          name: "命理寻真",
          url: "https://www.psychicai.pro/",
          a_id: "60099",
          a_name: "download",
        },
        // {
        //   id: 80004,
        //   icon: 'https://psychicai-static.psychicai.pro/imgs/231163a3ceab6ba14d97bbca80544b9c3cfd.png',
        //   name: '八字事业详批',
        //   url: 'career_divination_overseas',
        //   ios_id: '',
        //   android_id: '22',
        // },
        // {
        //   id: 80005,
        //   icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png',
        //   name: '袁天罡',
        //   url: 'weigh_bone',
        //   ios_id: '',
        //   android_id: '23',
        // },
        // {
        //   id: 80005,
        //   icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png',
        //   name: '鬼谷子',
        //   url: 'guiguzi_fortune',
        //   ios_id: '',
        //   android_id: '24',
        // },

        // {
        //   id: 80002,
        //   icon: 'http://imgcom.static.suishenyun.net/img_head-5e6238.png',
        //   name: '2024感情运势',
        //   url: 'emotion_fortune',
        //   ios_id: '',
        //   android_id: '',
        // },
        // {
        //   id: 80011,
        //   icon: career_2024,
        //   name: '2024事业运',
        //   url: 'career_fortune_2024',
        //   ios_id: '',
        //   android_id: '',
        // },
        // {
        //   id: 80009,
        //   icon: top_shiye,
        //   name: '2024年运',
        //   url: 'year_of_lucky_2024',
        //   ios_id: '',
        //   android_id: '',
        // },
      ];
    },
    // 推荐
    recommend_list() {
      return [
        {
          id: 80010,
          icon: ganqqingyun_24,
          name: "感情运",
          url: "emotion_fortune",
        },
        {
          id: 80005,
          icon: bzhh,
          name: "八字合婚",
          url: "marriage_measure_overseas",
        },
        {
          id: 80009,
          icon: nianyun_24,
          name: "24年年运",
          url: "year_of_lucky_2024",
        },
        {
          id: 80001,
          icon: caiyun_24,
          name: "24年财运",
          url: "lucky_year_report",
        },
      ];
    },
    // 底部广告
    ad_list() {
      return [
        {
          id: 80009,
          icon: gif_nianyun,
          name: "2024年年运",
          url: "year_of_lucky_2024",
        },
        {
          id: 80010,
          icon: gif_ganqing,
          name: "24年感情运",
          url: "emotion_fortune",
        },
        {
          id: 80002,
          icon: gif_yuantiangang,
          name: "袁天罡推背称骨",
          url: "weigh_bone",
        },
        {
          id: 80003,
          icon: gif_guiguzi,
          name: "鬼谷子",
          url: "guiguzi_fortune",
        },
        {
          id: 80005,
          icon: xiabanner_bazi,
          name: "八字合婚",
          url: "marriage_measure_overseas",
        },
        //
      ];
    },

    // 折扣列表
    zhekouList() {
      return [
        {
          id: 1,
          num: 1,
          total: 0,
          percent: 0,
          price: 68,
        },
        {
          id: 2,
          num: 2,
          total: 138,
          percent: "-37%",
          price: 88,
        },
        {
          id: 3,
          num: 3,
          total: 204,
          percent: "-47%",
          price: 108,
        },
      ];
    },
    // 爆款推荐
    productionList() {
      let arr = [];
      for (let i = 1; i < 11; i++) {
        arr.push({
          id: i,
          checked: false,
          name: "2024财运",
          desc: "預知運勢順遂，預測好運危月份，把握流年機遇！預知運勢順遂，預測好運危月份，把握流年機遇！",
          url: "www.baidu.com",
          icon: "https://psychic-h5.wezhaxi.com/img/prod-combine_5.759e0d4.png",
        });
      }
      return arr;
    },
    // 测算产品
    measureProduct() {
      return [
        {
          id: 21,
          name: "2024年财运",
          banner_id: 80001,
          checked: false,
          icon: "https://psychicai-static.psychicai.pro/imgs/23115681e58a5c544fee8ac8c2f259080607.png",
          url: "lucky_year_report",
          product_key: "h5_wealth2024",
          tips: "2024全景扫描，预知财运高低浮沉，提前为你揭示财富脉络，帮助你致富之道，拥有财富满盈的2024年！",
          check_icon:
            "https://psychicai-static.psychicai.pro/imgs/2311c537595a580c452fb90354ab4244bd78.png",
        },
        {
          id: 22,
          name: "八字事业详批",
          banner_id: 80004,
          checked: false,
          icon: "https://psychicai-static.psychicai.pro/imgs/2311f9a18eab2fba41eb87c6b74a69c112f2.png",
          url: "career_divination_overseas",
          product_key: "h5_career",
          tips: "预知事业低谷，成功时机，把握你的先天优势，让你的事业一帆风顺！",
          check_icon:
            "https://psychicai-static.psychicai.pro/imgs/2311ff0388985646470a8302f1547167ba46.png",
        },
        {
          id: 23,
          name: "八字合婚",
          banner_id: 80005,
          checked: false,
          icon: "https://psychicai-static.psychicai.pro/imgs/2311b43a350070e54399beb014774e98dccd.png",
          url: "marriage_measure_overseas",
          product_key: "h5_marriage",
          tips: "合八字测试姻缘，专业分析婚配指数，拥有更加幸福美满的婚姻！",
          check_icon:
            "https://psychicai-static.psychicai.pro/imgs/2311012132873f174e7ebcd518f2253c909a.png",
        },
        {
          id: 24,
          name: "姻缘分析",
          banner_id: 80006,
          checked: false,
          icon: "https://psychicai-static.psychicai.pro/imgs/231106e4f92e19ab4095b50fcaa5075ad621.png",
          url: "marriage_divination_overseas",
          product_key: "h5_love",
          tips: "姻缘分析，知己知彼，为你扫除情感障碍，帮你打造天赐良缘！",
          check_icon:
            "https://psychicai-static.psychicai.pro/imgs/231184d2494396114e79bdd2f5cdf7ab4f81.png",
        },
        {
          id: 25,
          name: "2023年兔年运程详批",
          banner_id: 80007,
          checked: false,
          icon: "https://psychicai-static.psychicai.pro/imgs/23111d65fa2098a5428fb4cdb8e793a1d3de.png",
          url: "new_year_luck_overseas",
          product_key: "h5_fortune2023",
          tips: "预知运势顺利，预测好运、危机出现月份，助你把握流年机遇！ ",
          check_icon:
            "https://psychicai-static.psychicai.pro/imgs/2311e8b5bdf1352f40ed80ec4239f8246eef.png",
        },
        {
          id: 26,
          name: "2023兔年一生财运",
          banner_id: 80008,
          checked: false,
          icon: "https://psychicai-static.psychicai.pro/imgs/2311dab2e4808856460198f9fb5d00335a02.png",
          url: "wealth_boutique_overseas",
          product_key: "h5_wealth2023",
          tips: "把握财运先机，揭晓财富运程，助你财运亨通，财源滚滚！",
          check_icon:
            "https://psychicai-static.psychicai.pro/imgs/2311451b81975b92422dba50e3ecb43a6c71.png",
        },
        {
          id: 27,
          name: "袁天罡推背称骨",
          banner_id: 80002,
          checked: false,
          icon: "http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png",
          url: "weigh_bone",
          product_key: "h5_weigh_bone",
          tips: "通过袁天罡古老占算法，探究身体骨骼，揭示生命密码，为你清晰了解生涯命运走向，让你事业、爱情、健康三线并进，并在生活中找到最佳平衡！",
          check_icon:
            "http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png",
        },
        {
          id: 28,
          name: "鬼谷子百卦论命",
          banner_id: 80003,
          checked: false,
          icon: "http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png",
          url: "guiguzi_fortune",
          product_key: "h5_bai_gua",
          tips: "关乎命运的百卦，把握生活中的转机与挑战。通过古老的易经知识演绎生活，精准预判运势，解析个性、爱情、职业、健康等生活重要环节，让你能够明察秋毫，走好人生每一步！",
          check_icon:
            "http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png",
        },
        {
          id: 29,
          name: "2024年年运",
          banner_id: 80009,
          checked: false,
          icon: "http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/21fdbe04b4913ca464cc71222552327d.png",
          url: "year_of_lucky_2024",
          product_key: "h5_annual2024",
          tips: "预知全年吉凶，揭示人生起伏，明晰先机，决策无忧，助力你掌握全年运势，开启更好的2024年！",
          check_icon:
            "http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/21fdbe04b4913ca464cc71222552327d.png",
        },
        {
          id: 30,
          name: "2024感情运势",
          banner_id: 12345,
          checked: false,
          icon: "http://imgcom.static.suishenyun.net/img_head-5e6238.png",
          url: "emotion_fortune",
          product_key: "h5_emotion2024",
          tips: "2024感情运势，暂无简介",
          check_icon: "http://imgcom.static.suishenyun.net/img_head-5e6238.png",
        },
        {
          id: 31,
          name: "2024事业运",
          banner_id: 123456,
          checked: false,
          icon: career_2024,
          url: "career_fortune_2024",
          product_key: "h5_career2024",
          tips: "2024年事业运，暂无简介，2024年事业运，暂无简介",
          check_icon: career_2024,
        },
      ];
    },
    longnianBanner() {
      return longnianImg;
    },

    // 改版的报告商品
    sale_list() {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        let num = this.randomNum(6538, 9362);
        arr.push({
          buy_num: num,
          review_num: +(num * (this.randomNum(95, 97) / 100)).toFixed(0),
        });
      }

      let arr2 = [
        {
          id: 7,
          name: "八字合婚",
          cn_desc: "揭示姻缘宿命，戒备潜藏危机，慎选伴侣之道",
          tw_desc: "揭示姻緣宿命，戒備潛藏危機，慎選伴侶之道",
          url: "marriage_measure_overseas",
          zh_icon:
            "https://psychicai-static.psychicai.pro/imgs/24041ad15f947999492aabf1a307f653f794.png",
          tw_icon: tw_bzhh_banner,
          buy_num: "6324",
          review_num: "6185",
          e_id: "-10007",
          e_name: "click_report_marriage",
          ad_e: "8g4xt8",
          report_id: "60005",
          product_key: "h5_marriage",
        },
        {
          id: 4,
          name: "24年感情运",
          cn_desc: "感情运势早知道，和合美满还是遗憾分手",
          tw_desc: "感情運勢早知道，和合美滿還是遺憾分手",
          url: "emotion_fortune",
          zh_icon:
            "https://psychicai-static.psychicai.pro/imgs/240480dc4c244a8e4dafb2c9658a953b2b7d.png",
          tw_icon: tw_emotion,
          buy_num: "3492",
          review_num: "3441",
          e_id: "-10006",
          e_name: "click_report_2024lovely",
          ad_e: "efy9t0",
          report_id: "60010",
          product_key: "h5_emotion2024",
        },
        {
          id: 3,
          name: "24年年运",
          cn_desc: "你的2024年如何度过？大师为你解读年度运势",
          tw_desc: "你的2024年如何度過？大師為你解讀年度運勢",
          url: "year_of_lucky_2024",
          zh_icon:
            "https://psychicai-static.psychicai.pro/imgs/2404e9c969b4e1464e91b6836b7e57b7d346.png",
          tw_icon: tw_year24_banner,
          buy_num: "8321",
          review_num: "8238",
          is_big: false,
          e_id: "-10003",
          e_name: "click_report_2024report",
          ad_e: "oqfzzs",
          report_id: "60009",
          product_key: "h5_annual2024",
        },
        {
          id: 6,
          name: "24年财运",
          cn_desc: "预警财务危机，洞悉关键时刻，避免潜在财富风险。",
          tw_desc: "預警財務危機，洞悉關鍵時刻，避免潛在財富風險。",
          url: "lucky_year_report",
          zh_icon:
            "https://psychicai-static.psychicai.pro/imgs/24048d23afe94dc94781b614ed38300c52d2.png",
          tw_icon: tw_wealth24_banner,
          buy_num: "7315",
          review_num: "7044",
          e_id: "-10005",
          e_name: "click_report_2024wealty",
          ad_e: "egm8a2",
          report_id: "60001",
          product_key: "h5_wealth2024",
        },
        {
          id: 5,
          name: "24年事业运",
          cn_desc: "前途迷雾重重，挑战接踵而至，开创事业新章",
          tw_desc: "前途迷霧重重，挑戰接踵而至，開創事業新章",
          url: "career_fortune_2024",
          zh_icon:
            "https://psychicai-static.psychicai.pro/imgs/24046a9e0acaca504f16b3069e0c06a611df.png",
          tw_icon: tw_career,
          buy_num: "8314",
          review_num: "8090",
          e_id: "-10004",
          e_name: "click_report_2024career",
          ad_e: "tzsnzi",
          report_id: "60011",
          product_key: "h5_career2024",
        },

        {
          id: 1,
          name: "袁天罡",
          cn_desc: "称骨论命，揭露宿命重负，应对多舛命途",
          tw_desc: "稱骨論命，揭露宿命重負，應對多舛命途",
          url: "weigh_bone",
          zh_icon:
            "https://psychicai-static.psychicai.pro/imgs/2404a40011fb74fd44aa9e0bf8eb8ca1dfc3.png",
          tw_icon: tw_weigh,
          buy_num: "6752",
          review_num: "6518",
          e_id: "-10009",
          e_name: "click_report_chenggu",
          ad_e: "kajqs3",
          report_id: "60002",
          product_key: "h5_weigh_bone",
        },
        {
          id: 2,
          name: "鬼谷子",
          cn_desc: "64卦预见人生，审慎应对风波，谨防危机潜伏",
          tw_desc: "64卦預見人生，審慎應對風波，謹防危機潛伏",
          url: "guiguzi_fortune",
          zh_icon:
            "https://psychicai-static.psychicai.pro/imgs/2404090733726e3c4fabb8a756a685bfadbf.png",
          tw_icon: tw_ggz,
          buy_num: "9522",
          review_num: "9277",
          e_id: "-10008",
          e_name: "click_report_64gua",
          ad_e: "jd4oen",
          report_id: "60003",
          product_key: "h5_bai_gua",
        },
      ];

      return arr2;
    },

    is_cn() {
      return utils.getLanguage() === "zh-CN";
    },
    scrollStyle() {
      if (this.payed_order_three_list.length) {
        if (this.combine_index === -1) {
          return "0px";
        } else if (this.combine_index === 0) {
          return "0.8rem";
        } else {
          return "2.05rem";
        }
      } else {
        if (this.combine_index) {
          return this.combine_index !== -1 ? "1.3rem" : "0px";
        } else {
          return "0px";
        }
      }
    },
    show_fixed_order() {
      if (this.last_order) {
        if (
          this.last_order.product_key === this.new_order_key &&
          this.last_order.status !== "PAYED"
        ) {
          return false;
        }
      }

      let flag =
        this.fix_order_info && this.new_order_key !== this.product_key
          ? true
          : false;

      if (flag) {
        const { main_id, click_id, view_id, click_name, view_name } =
          maidianEnum[this.new_order_key];
        utils.firebaseLogEvent(main_id, view_id, view_name, "view", {
          args_name: view_name,
          channel: utils.getFBChannel(),
        });
      }
      return flag;
    },
    local_title() {
      return utils.getTitle(this.new_order_key);
    },
  },
  watch: {
    sale_visible(val) {
      this.fix_pop = val ? true : false;
      if (!val) {
        this.can_choose = true;
      } else {
        this.$nextTick(() => {
          this.pop_list.forEach((it, k) => {
            this.handleText(k);
          });
        });
      }
    },
    pay_visible(val) {
      this.fix_pop = val ? true : false;
    },
    pay_result_visible(val) {
      this.fix_pop = val ? true : false;
    },
    new_sale_modal(val) {
      if (val) {
        // 查看多买多折扣列表3项
        utils.firebaseLogEvent(
          "10001",
          "-10020",
          "view_reportlist_choise3",
          "view",
          {
            args_name: "view_reportlist_choise3",
            channel: utils.getFBChannel(),
          }
        );

        this.getLocalChecked("three_list", "mlxz_web_select_list");
        this.pick_list = JSON.parse(JSON.stringify(this.three_list));
      } else {
        this.pick_list = [];
      }
    },
    new_sale_modal2(val) {
      if (val) {
        // 查看多买多折扣列表2项
        utils.firebaseLogEvent(
          "10001",
          "-10019",
          "view_reportlist_choise2",
          "view",
          {
            args_name: "view_reportlist_choise2",
            channel: utils.getFBChannel(),
          }
        );

        this.getLocalChecked("two_list", "mlxz_web_select_list_two");
        this.pick_list2 = JSON.parse(JSON.stringify(this.two_list));
      } else {
        this.pick_list2 = [];
      }
    },

    combine_index: {
      handler(val) {
        console.log("combine_index", val);
      },
      immediate: true,
    },
    three_list(val) {
      if (val) {
        this.getSelectTagList();
      }
    },
    two_list(val) {
      if (val) {
        this.getSelectTagList(2);
      }
    },
  },
  created() {
    utils.isProd() &&
      tStatistic &&
      tStatistic.send({
        event: 'page_view_h5main',
        md: 10001,
        c_id: -10001,
        args: {
          args_name: 'page_view_h5main',
          channel: utils.getFBChannel(),
        },
      });
    document.title = this.$t('dom-title');
    this.getLastOrder();

    this.is_show_combine =
      ["enjoy03", "panda03"].includes(utils.getFBChannel()) || !utils.isProd();

    let url_query = utils.getUrlParams();
    let order_id = url_query.order_id;
    this.order_id = order_id || "";
    let pay_status = url_query.status;
    let pay_index = +url_query.pay_index;

    let remove_flag = +localStorage.getItem("mlxz_remove_flag"); // 1:已经删除 ,2:未删除

    this.randomBuyList();
    this.getProductSort();
    getProductionsAPI("ceh5").then((res) => {
      this.all_list = res.data;
      if (!this.is_show_combine) return;
      if (order_id && pay_status === "SUCCESS" && remove_flag === 2) {
        localStorage.removeItem(
          pay_index === 3 ? "mlxz_web_select_list" : "mlxz_web_select_list_two"
        );
        localStorage.setItem("mlxz_remove_flag", 1);
      }
      this.getSelectTagList();
      this.getPayedOrderList();
      this.getLocalChecked("three_list", "mlxz_web_select_list");
      this.getLocalChecked("two_list", "mlxz_web_select_list_two");
      this.pop_list = this.mergeArray(this.measureProduct, this.all_list);
    });
  },
  async mounted() {
    this.showComboAttach();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this.showComboAttach();
      }
    });
    if (utils.isProd()) {
      try {
        fbq("trackCustom", "CustomChannel", {
          channel: `pageview_main_${utils.getFBChannel()}`,
        });
        utils.gcyLog(`主页`, {
          mlxz_action_desc: "主页FB渠道上报",
          mlxz_action_type: "view",
          mlxz_channel: `pageview_main_${utils.getFBChannel()}`,
        });
      } catch (err) {
        console.log("no fbq:", err);
      }
    }

    this.showNoticePop();

    utils.firebaseLogEvent("10001", "-10001", "page_view_h5main", "page_view", {
      args_name: "page_view_h5main",
      channel: utils.getFBChannel(),
    });
    if (this.order_id) {
      let check_result = await this.checkWithTimeout();
      if (check_result !== null) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "已经获取了是否上报埋点的状态",
          mlxz_attribution_status: check_result.data.status,
        });
        if (check_result.data.status) {
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: "准备执行上报埋点",
            mlxz_check_status: check_result.data.status,
          });
          this.handleSendEvent();
        }
      }
    }
    // 埋点事件上传
    reportBuryingEventAPI({
      event: "page_view_h5main",
      channel: utils.getFBChannel(),
    })
      .then()
      .catch((err) => {
        console.warn(`埋点事件上传失败${err}`);
      });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    getProductions,
    //开始测算
    async startCalculateClick() {
      let same_ = this.all_list.find(
          (it) => it.product_id === this.comboAttachData.product_id
        );
       let product_key = same_.product_key;
       location.href = `${path_enums[product_key]}.html#/?has_pay=SUCCESS&order_id=${this.comboAttachData.order_id}&product_key=${product_key}`;
    },
    //请求接口，是否展示引导标识
    async showComboAttach() {
      const res = await getComboAttachAPI();
      if (res.status !== 1000) return;
      if(res.data) {
        let sub_orders =  res.data.combine.sub_orders.find(item=>!item.extra_ce_suan);
        //获取到未测算的报告信息，可以与当前页面报告类型比较
        this.comboAttachData = {product_id: sub_orders.product_id, order_id: sub_orders.order_id};
      } else {
        this.comboAttachData = null
      }
    },
    showNoticePop() {
      this.timer = setInterval(() => {
        this.fix_order_info = localStorage.getItem("mlxz_fixed_order_info");
        this.new_order_key = localStorage.getItem("mlxz_fixed_order_key");
        this.local_time =
          +localStorage.getItem("mlxz_fixed_local_order_time") || 0;
        let is_reload = localStorage.getItem("mlxz_reload_page_home");
        if (is_reload) {
          this.payed_order_three_list = [];
          this.getPayedOrderList();
        }
      }, 1000);
    },
    // 获取最新一个订单信息
    async getLastOrder() {
      const res = await getLastOrderAPI();
      if (res.status !== 1000) return;
      this.last_order = res.data;
      this.last_title = utils.getTitle(
        this.last_order ? this.last_order.product_key : ""
      );
      if (
        this.last_order &&
        this.last_order.status !== "PAYED" &&
        this.last_order.product_key !== this.product_key
      ) {
        this.logDiscountEvent();
        //
        if (
          +localStorage.getItem("mlxz_fixed_api_order_id") ===
          this.last_order.id
        ) {
          this.api_time =
            +localStorage.getItem("mlxz_fixed_api_order_time") || 0;
          this.show_api_order = true;
          return;
        }
        this.api_time = 15 * 60 * 1000;
        localStorage.setItem("mlxz_fixed_api_order_id", this.last_order.id);
        this.show_api_order = true;
      } else {
        this.show_api_order = false;
      }
    },
    logDiscountEvent() {
      const { ext, pay_method, product_key, product_id, payment } =
        this.last_order;
      const { main_id, click_id, view_id, click_name, view_name } =
        maidianEnum[product_key];
      utils.firebaseLogEvent(main_id, view_id, view_name, "view", {
        args_name: view_name,
        channel: utils.getFBChannel(),
      });
    },

    // api订单下单
    async checkOrder() {
      const { ext, pay_method, product_key, product_id, payment } =
        this.last_order;
      const { main_id, click_id, view_id, click_name, view_name } =
        maidianEnum[product_key];
      utils.firebaseLogEvent(main_id, click_id, click_name, "click", {
        args_name: click_name,
        channel: utils.getFBChannel(),
      });
      Indicator.open(tipsArr5[utils.getLanguage()]);

      if (this.last_order.status === "PAYED") return;
      let params = {
        pay_method: pay_method,
        product_key: product_key,
        product_id: product_id,
        platform: "WEB",
        extra_ce_suan: ext,
        callback_url: `${location.origin}/${utils.getFBChannel()}/${
          path_enums[product_key]
        }.html#/result?path=${
          path_enums[product_key]
        }&report_price=${payment}&discount_pay=1`,
      };
      const res = await payOrderAPI(params);
      localStorage.removeItem("mlxz_fixed_api_order_id");
      localStorage.removeItem("mlxz_fixed_api_order_time");
      Indicator.close();
      if (res.status !== 1000) return;
      this.show_api_order = false;
      await utils.asleep(1000);
      location.href = res.data.pay_url;
    },
    jumpOrder() {
      const { main_id, click_id, view_id, click_name, view_name } =
        maidianEnum[this.new_order_key];
      utils.firebaseLogEvent(main_id, click_id, click_name, "click", {
        args_name: click_name,
        channel: utils.getFBChannel(),
      });
      if (this.new_order_key === "h5_marriage") {
        let marry_info = JSON.parse(
          localStorage.getItem("mlxz_user_info_h5_marriage")
        );
        let male_str = marry_info.male_str;
        let female_str = marry_info.female_str;
        let path = `detail?querystring=${marry_info.user_info}&male_str=${male_str}&female_str=${female_str}
&pay_modal=1&use_fixed_time=1&discount_pay=1`;
        location.href = `${location.origin}/${utils.getFBChannel()}/${
          path_enums[this.new_order_key]
        }.html#/${path}`;

        return;
      }
      let path =
        "detail?querystring=" +
        this.fix_order_info +
        "&pay_modal=1" +
        "&use_fixed_time=1&discount_pay=1";

      location.href = `${location.origin}/${utils.getFBChannel()}/${
        path_enums[this.new_order_key]
      }.html#/${path}`;
    },
    /**
     * @description: 校验是否上报埋点
     * @return {*}
     */
    async checkWithTimeout() {
      try {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "开始调用校验上报埋点接口",
        });
        const result = await Promise.race([
          checkSendEventApi({ order_id: this.order_id }),
          new Promise((resolve, reject) => {
            setTimeout(() => resolve(null), 6000);
          }),
        ]);

        if (result !== null) {
          // 如果有返回数据，则直接返回
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: "已校验是否上报埋点",
            mlxz_check_result_status: result.data.status,
          });
          return result;
        } else {
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: "接口超时，重新调用校验上报埋点接口",
          });
          // 等待 6 秒后再次调用 checkSendEventApi
          const retryResult = await checkSendEventApi({
            order_id: this.order_id,
          });
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: "接口超时，完成重试调用上报埋点接口",
          });
          return retryResult;
        }
      } catch (error) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "接口报错，停止校验",
        });
        throw error;
      }
    },
    /**
     * @description: 完成上报埋点
     * @return {*}
     */
    async handleSendEvent() {
      let report_price =
        +utils.getQueryString("report_price") || this.payed_combine_price;
      let report_status =
        utils.getQueryString("status") || this.order_id ? "SUCCESS" : "";
      let repay = +utils.getQueryString("repay");

      // let pay_index = +utils.getQueryString('pay_index') ;
      let pay_index;
      if (utils.getQueryString("pay_index")) {
        pay_index = +utils.getQueryString("pay_index");
      } else {
        pay_index = this.payed_order_three_list.length;
      }
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: "准备上报埋点，获取订单状态",
        mlxz_order_status: report_status,
      });
      if (report_status === "SUCCESS" || report_status === "PAYED") {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "开始上报firebase埋点",
          mlxz_order_status: report_status,
        });
        if (repay) {
          utils.firebaseLogEvent(
            "10002",
            pay_index === 2 ? "-10019" : "-10020",

            pay_index === 2
              ? "event_status_report2history_pay_success"
              : "event_status_report3history_pay_success",
            "event_status",
            {
              args_name:
                pay_index === 2
                  ? "event_status_report2history_pay_success"
                  : "event_status_report3history_pay_success",
              channel: utils.getFBChannel(),
            }
          );
        } else {
          utils.firebaseLogEvent(
            "10001",
            pay_index === 2 ? "-10027" : "-10028",
            pay_index === 2
              ? "event_status_report2_pay_success"
              : "event_status_report3_pay_success",
            "event_status",
            {
              args_name:
                pay_index === 2
                  ? "event_status_report2_pay_success"
                  : "event_status_report3_pay_success",

              channel: utils.getFBChannel(),
            }
          );
        }

        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "完成firebase埋点上报",
          mlxz_order_status: report_status,
        });
        if (utils.isProd()) {
          await utils.checkFB();
          try {
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: "开始上报FB埋点，Purchase",
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: "MYR",
              mlxz_order_status: report_status,
            });
            fbq("track", "Purchase", {
              value: report_price.toFixed(2),
              currency: "MYR",
            });
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: "完成FB埋点上报，Purchase",
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: "MYR",
              mlxz_order_status: report_status,
            });
          } catch (err) {
            console.error("error message:", err);
          }
        }
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "完成埋点上报，开始与接口通信，通知完成上报",
        });
        this.sendEvent();
      } else {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "开始上报埋点",
          mlxz_order_status: report_status,
        });
        if (repay) {
          utils.firebaseLogEvent(
            "10002",
            pay_index === 2 ? "-10028" : "-10029",
            pay_index === 2
              ? "event_status_report2history_pay_fail"
              : "event_status_report3history_pay_fail",
            "event_status",
            {
              args_name:
                pay_index === 2
                  ? "event_status_report2history_pay_fail"
                  : "event_status_report3history_pay_fail",
              channel: utils.getFBChannel(),
            }
          );
        } else {
          utils.firebaseLogEvent(
            "10001",
            pay_index === 2 ? "-10029" : "-10030",
            pay_index === 2
              ? "event_status_report2_pay_fail"
              : "event_status_report3_pay_fail",

            "event_status",
            {
              args_name:
                pay_index === 2
                  ? "event_status_report2_pay_fail"
                  : "event_status_report3_pay_fail",

              channel: utils.getFBChannel(),
            }
          );
        }

        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "完成上报埋点",
          mlxz_order_status: report_status,
        });
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "完成埋点上报，开始与接口通信，通知完成上报",
        });
        this.sendEvent();
      }
    },

    async sendEvent() {
      utils.gcyLog(`order_id:${this.order_id}`, {
        mlxz_action_desc: "开始调用接口，通知已上报",
      });
      const res = await sendEventApi({ order_id: this.order_id });
      if (res.status === 1000) {
        utils.gcyLog(`order_id:${this.order_id}`, {
          mlxz_action_desc: "已通知已上报",
          mlxz_attribution_status: res.status,
          mlxz_attribution_desc: res.desc,
        });
      }
    },
    showModal() {
      utils.firebaseLogEvent("10001", "-10017", "click_main_choise3", "click", {
        args_name: "click_main_choise3",
        channel: utils.getFBChannel(),
      });
      this.new_sale_modal = true;
    },
    showModal2() {
      utils.firebaseLogEvent("10001", "-10015", "click_main_choise2", "click", {
        args_name: "click_main_choise2",
        channel: utils.getFBChannel(),
      });
      this.new_sale_modal2 = true;
    },
    // 查询订单支付结果
    async getOrderResult() {
      if (!this.continue || !this.order_id) return;
      Indicator.open(this.$t("order-result-loading"));
      const { status, data } = await getResultAPI({ order_id: this.order_id });
      Indicator.close();
      this.continue = false;
      if (status !== 1000) return;
      return data;
    },

    // 两个数组中的key相同的合并成一个数组
    mergeArray(arr1, arr2) {
      let arr = [];
      arr1.forEach((it) => {
        arr2.forEach((item) => {
          if (it.product_key === item.product_key) {
            arr.push(Object.assign(it, item));
          }
        });
      });
      return arr;
    },

    /**
     * @description: 获取缓存的已选商品
     * @return {*}
     */
    getStoreChecked() {
      let arr = localStorage.getItem("mlxz_checked_list");
      this.checked_list = arr ? JSON.parse(arr) : initCheck;
      let i = 0;
      this.checked_list.forEach((it) => {
        if (it.product_key) {
          i++;
        }
      });
      this.zhekou = i > 0 ? i - 1 : 2;
    },

    /**
     * @description: 初始化勾选的商品
     * @param {*} arr1
     * @param {*} arr2
     * @return {*}
     */
    formatProductList(arr1, arr2) {
      arr1.forEach((it) => {
        arr2.forEach((item) => {
          it.checked = it.product_key === item.product_key ? true : false;
        });
      });
      return arr1;
    },

    /**
     * @description: 开启商品弹窗
     * @return {*}
     */
    showPop() {
      let arr = localStorage.getItem("mlxz_checked_list");
      if (arr) {
        this.checked_list = JSON.parse(arr);
      }
      this.pop_list = this.formatProductList(this.pop_list, this.checked_list);

      let id_arr = [];
      this.checked_list.forEach((it) => {
        if (it.id) {
          id_arr.push(it.id);
        }
      });
      if (!id_arr.length) {
        this.sale_visible = true;
        return;
      }
      id_arr.forEach((it) => {
        this.pop_list.forEach((item) => {
          if (item.id === it) {
            item.checked = true;
          }
        });
      });
      let has_num = this.formatChecked();
      this.can_choose = has_num >= 3 ? false : true;
      this.sale_visible = true;
    },

    /**
     * @description: 选择商品
     * @param {*} it 当前选中
     * @param {*} k
     * @return {*}
     */
    chooseSale(it, k) {
      if (!this.can_choose && !it.checked) {
        return;
      }
      this.pop_list[k].checked = !this.pop_list[k].checked;

      let has_num = this.formatChecked();
      this.can_choose = has_num >= 3 ? false : true;
    },

    /**
     * @description: 校验时候选择了3个商品
     * @return {*}
     */
    formatChecked() {
      let i = 0;
      this.pop_list.forEach((it) => {
        if (it.checked) {
          i++;
        }
      });
      return i;
    },

    closeSalePop() {
      this.getStoreChecked();
      this.sale_visible = false;
    },

    /**
     * @description: 按照ID大小排序
     * @param {*} arr
     * @return {*}
     */
    sortData(arr) {
      return arr.sort((a, b) => {
        return a.id - b.id;
      });
    },

    /**
     * @description: 确认选择的产品
     * @return {*}
     */
    handleConfirm() {
      let i = 0;
      this.pop_list.forEach((it) => {
        if (it.checked) {
          i++;
        }
      });
      if (i < 2) {
        Toast(this.$t("less-get-two-tips"));
        return false;
      }
      this.checked_list = [];
      this.pop_list.forEach((it) => {
        if (it.checked) {
          this.checked_list.push(it);
        }
      });
      if (this.checked_list.length < 3) {
        for (let i = 0; i < 4 - this.checked_list.length; i++) {
          this.checked_list.push({ value: "" });
        }
      }
      let has_num = this.formatChecked();
      this.zhekou = has_num > 0 ? has_num - 1 : 2;
      this.sortData(this.checked_list);
      localStorage.setItem(
        "mlxz_checked_list",
        JSON.stringify(this.checked_list)
      );

      this.sale_visible = false;
    },

    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    payModal() {
      let i = 0;
      this.checked_list.find((it) => {
        if (it.id) {
          i++;
        }
      });
      if (i < 2) {
        Toast(this.$t("less-get-two-tips"));
        return;
      }

      this.pay_visible = true;
    },

    /**
     * @description: 查看报告/或者填写信息
     * @param {*} val
     * @return {*}
     */
    async handleReport(val, index) {
      if (index === 1) {
        console.log("d1cle9");
      }
      if (index === 2) {
        console.log("5ts44a");
      }
      if (index === 3) {
        console.log("vzsv9y");
      }
      if (index === 5) {
        this.logHome();

        utils.firebaseLogEvent(
          "10001",
          "-10002",
          "click_h5main_banner",
          "click",
          {
            args_name: "click_h5main_banner",
            report_id: val.a_id,
            channel: utils.getFBChannel(),
          }
        );
      }
      if (val.product_key) {
        let same_ = this.all_list.find(
          (it) => it.product_key === val.product_key
        );

        await this.logEventForSort({
          e_name: "content_click",
          product_id: same_.product_id,
        });
      }
      await utils.asleep(500);

      location.href = val.id === 4 ? val.url : `${val.url}.html`;
    },

    backUrl() {
      location.href = "mlxz://back";
    },

    hasPayReport(item) {
      setTimeout(() => {
        this.pay_result_visible = false;
      }, 1000);
      location.href = `${item.url}.html#/?has_pay=SUCCESS&order_id=${item.order_id}&product_key=${item.product_key}`;
    },
    handleText(id) {
      // 使用JavaScript截断文本并添加省略号
      const element = document.getElementById(`text-${id}`);
      let lineHeight = parseInt(
        window.getComputedStyle(element).lineHeight,
        10
      );
      let maxHeight = lineHeight * 2; // 两行文本的高度
      if (element.offsetHeight > maxHeight) {
        element.style.webkitLineClamp = "2";
        element.style.webkitBoxOrient = "vertical";
        element.style.display = "-webkit-box";
        element.style.overflow = "hidden";
      }
    },
    hiddenText(text) {
      // return text;
      if (text.length > 23) {
        return text.substring(0, 23) + "......";
      } else {
        return text;
      }
    },

    // 随机走马灯数据
    randomBuyList() {
      for (let i = 0; i < 50; i++) {
        // 0-11随机数
        let num1 = Math.floor(Math.random() * 12);
        let num2 = Math.floor(Math.random() * 3);
        let num3 = Math.floor(Math.random() * 10);
        let num4 = Math.floor(Math.random() * 4);
        this.buy_list.push(
          `${user_name_arr[num1]}${time_arr[num2]}${this.$t(
            "tips-1"
          )}之前${this.$t("tips-2")}了`
        );
        this.mock_report_list.push({
          name: report_arr[num3][utils.getLanguage()],
          id: num3,
        });
        this.score_list.push(
          `，${this.$t("tips-3")}${score_arr[num4]}分${this.$t("tips-4")}`
        );
      }
    },
    async jumpPage(index) {
      if (product_key_arr[index]) {
        let same_ = this.all_list.find(
          (it) => it.product_key === product_key_arr[index]
        );

        await this.logEventForSort({
          e_name: "content_click",
          product_id: same_.product_id,
        });
      }
      await this.logHome();

      utils.firebaseLogEvent(
        "10001",
        "-10011",
        "click_main_scrollbar",
        "click",
        {
          args_name: "click_main_scrollbar",
          report_id: e_id_arr[index],
          channel: utils.getFBChannel(),
        }
      );

      await utils.asleep(500);

      location.href = `${report_url[index]}.html`;
    },
    // 随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    async jumpUrl(url, e_id, e_name, ad_e, report_id, product_key) {
      await this.logHome();

      utils.firebaseLogEvent("10001", e_id, e_name, "click", {
        args_name: e_name,
        channel: utils.getFBChannel(),
      });
      if (product_key) {
        let same_ = this.all_list.find((it) => it.product_key === product_key);
        await this.logEventForSort({
          e_name: "content_click",
          product_id: same_.product_id,
        });
      }

      await utils.asleep(500);
      location.href = `${url}.html`;
    },
    getReportItem(index) {
      this.cur_index = index;
    },

    /**
     * @description: 上报埋点
     * @param {*}
     * @return {*}
     */
    async logHome() {
      if (utils.isProd()) {
        await utils.checkFB();
        try {
          fbq("track", "CompleteRegistration");
        } catch (err) {
          console.error("CompleteRegistration  error message:", err);
        }
      }
    },
    // 切换轮播组
    getCombineIndex(index) {
      this.new_sale_modal = false;
      this.new_sale_modal2 = false;
      if (this.payed_order_three_list.length) {
        this.combine_index = index - 1;
      } else {
        this.combine_index = index;
      }
      this.logPageView(this.combine_index);
    },
    // 打开选择弹窗
    async changeSale(val) {
      if (val) {
        if (this.two_list.length) {
          this.pay_modal2 = true;
          return;
        }

        utils.firebaseLogEvent(
          "10001",
          "-10031",
          "click_main_choise2group",
          "click",
          {
            args_name: "click_main_choise2group",
            channel: utils.getFBChannel(),
          }
        );
        this.new_sale_modal2 = true;

        return;
      }
      if (this.three_list.length) {
        this.pay_modal = true;
        return;
      }

      utils.firebaseLogEvent(
        "10001",
        "-10032",
        "click_main_choise3group",
        "click",
        {
          args_name: "click_main_choise3group",
          channel: utils.getFBChannel(),
        }
      );
      this.new_sale_modal = true;
    },

    // 删除选中的商品
    getDeleteIndex(list, key) {
      return list.findIndex((item) => item.product_key === key);
    },
    ToastSubmit(val) {
      Toast(`请选择${val}项报告`);
    },

    // 选择商品
    chooseNewSale(it, k, val, key = "pick_list") {
      if (this[key].length >= (val ? 2 : 3)) {
        if (!it.checked) {
          Toast(`最多选择${val ? "两" : "三"}项报告`);
          return;
        } else {
          this.new_pop_list[k].checked = !this.new_pop_list[k].checked;
          this[key].splice(this.getDeleteIndex(this[key], it.product_key), 1);
        }
      } else {
        this.new_pop_list[k].checked = !this.new_pop_list[k].checked;
        if (!it.checked) {
          this[key].splice(this.getDeleteIndex(this[key], it.product_key), 1);
        } else {
          this[key].push(it);
        }
      }
    },
    // 提交已选商品
    submitPopList(val) {
      if (val) {
        this.two_list = JSON.parse(JSON.stringify(this.pick_list2));
        this.getSelectTagList(val);
        localStorage.setItem(
          "mlxz_web_select_list_two",
          JSON.stringify(this.two_list)
        );
        utils.firebaseLogEvent(
          "10001",
          "-10025",
          "click_reportlist_check2",
          "click",
          {
            args_name: "click_reportlist_check2",
            channel: utils.getFBChannel(),
          }
        );
        this.new_sale_modal2 = false;
        return;
      }
      this.three_list = JSON.parse(JSON.stringify(this.pick_list));
      this.getSelectTagList();
      localStorage.setItem(
        "mlxz_web_select_list",
        JSON.stringify(this.three_list)
      );
      utils.firebaseLogEvent(
        "10001",
        "-10026",
        "click_reportlist_check3",
        "click",
        {
          args_name: "click_reportlist_check3",
          channel: utils.getFBChannel(),
        }
      );
      this.new_sale_modal = false;
    },
    // 获取本地缓存选择的商品
    getLocalChecked(list, key) {
      this.new_pop_list.forEach((it) => {
        it.checked = false;
      });
      let arr = localStorage.getItem(key);
      this[list] = arr ? JSON.parse(arr) : [];
      this[list].forEach((item) => {
        this.new_pop_list.forEach((it) => {
          if (it.product_key === item.product_key) {
            it.checked = true;
          }
        });
      });
    },
    // 获取组合订单信息
    getSelectTagList(val) {
      if (val > 0) {
        if (!this.two_list.length) return;
      } else {
        if (!this.three_list.length) return;
      }

      if (val > 0) {
        let product_key2 = "h5_combo2";
        let pick_list = this.two_list.map((item) => item.product_key);
        let combine_ids2 = [];

        this.two_list.forEach((it) => {
          this.all_list.forEach((item) => {
            if (it.product_key === item.product_key) {
              combine_ids2.push(item.product_id);
            }
          });
        });
        this.combine_info2 = this.all_list.find(
          (it) =>
            it.product_key === product_key2 &&
            it.tags.length &&
            it.tags.sort().join("").indexOf(pick_list.sort().join("")) > -1
        );
        this.combine_info2.combine_product_ids = combine_ids2;
      } else {
        let product_key = "h5_combo3";
        let pick_list = this.three_list.map((item) => item.product_key);
        let combine_ids = [];

        this.three_list.forEach((it) => {
          this.all_list.forEach((item) => {
            if (it.product_key === item.product_key) {
              combine_ids.push(item.product_id);
            }
          });
        });
        this.combine_info = this.all_list.find(
          (it) =>
            it.product_key === product_key &&
            it.tags.length &&
            it.tags.sort().join("").indexOf(pick_list.sort().join("")) > -1
        );
        this.combine_info.combine_product_ids = combine_ids;
      }
      this.pick_list = JSON.parse(JSON.stringify(this.three_list));
      this.pick_list2 = JSON.parse(JSON.stringify(this.two_list));
    },

    // 获取已下单未填写订单信息
    async getPayedOrderList() {
      this.payed_order_three_list = [];

      const res = await getComboListAPI();
      if (res.data) {
        localStorage.removeItem("mlxz_reload_page_home");
      }
      if (res.status !== 1000 || !res.data.combine) {
        this.payed_order_three_list = [];
        this.combine_index = 0;
        this.logPageView(this.combine_index);
        return;
      }

      const { sub_orders, order_id } = res.data.combine;
      if (sub_orders.length) {
        this.combine_index =
          this.combine_index === -1 ? -1 : this.combine_index - 1;
      }

      this.logPageView(this.combine_index);

      let arr_ = [];
      sub_orders.forEach((item) => {
        this.all_list.forEach((it) => {
          if (it.product_id === item.product_id) {
            arr_.push(it.product_key);
            arr_.push({
              product_key: it.product_key,
              status: item.extra_ce_suan ? 1 : 0, // 0 未填写 ，1 已填写
              product_id: item.product_id,
              order_id: item.order_id,
            });
          }
        });
      });

      arr_.forEach((item) => {
        new_pop_list.forEach((it) => {
          if (it.product_key === item.product_key) {
            let it_ = Object.assign({}, it);
            it_.status = item.status;
            it_.product_id = item.product_id;
            it_.order_id = item.order_id;
            this.payed_order_three_list.push(it_);
          }
        });
      });
      return;
      if (order_id) {
        this.order_id = order_id;
        let payed_key_list = this.payed_order_three_list.map(
          (item) => item.product_key
        );
        let product_key =
          this.payed_order_three_list.length === 3 ? "h5_combo3" : "h5_combo2";
        let pay_combine_info = this.all_list.find(
          (it) =>
            it.product_key === product_key &&
            it.tags.length &&
            it.tags.sort().join("").indexOf(payed_key_list.sort().join("")) > -1
        );
        this.payed_combine_price = pay_combine_info.price;
        let check_result = await this.checkWithTimeout();
        if (check_result !== null) {
          utils.gcyLog(`order_id:${this.order_id}`, {
            mlxz_action_desc: "已经获取了是否上报埋点的状态",
            mlxz_attribution_status: check_result.data.status,
          });
          if (check_result.data.status) {
            utils.gcyLog(`order_id:${this.order_id}`, {
              mlxz_action_desc: "准备执行上报埋点",
              mlxz_check_status: check_result.data.status,
            });
            this.handleSendEvent();
          }
        }
      }
    },
    logPageView(val) {
      let channel = utils.getFBChannel();
      if (!["enjoy03", "panda03"].includes(channel)) {
        return;
      }
      if (val === 0) {
        utils.firebaseLogEvent("10001", "-10012", "view_main_report3", "view", {
          args_name: "view_main_report3",
          channel: utils.getFBChannel(),
        });
      } else if (val > 0) {
        utils.firebaseLogEvent("10001", "-10013", "view_main_report2", "view", {
          args_name: "view_main_report2",
          channel: utils.getFBChannel(),
        });
      } else {
        utils.firebaseLogEvent("10001", "-10014", "view_main_results", "view", {
          args_name: "view_main_results",
          channel: utils.getFBChannel(),
        });
      }
    },

    async toWriteInfo(item) {
      const { status, url, order_id } = item;
      let channle = utils.getFBChannel() === "own" ? "" : utils.getFBChannel();

      localStorage.setItem("mlxz_reload_page_home", 1);
      location.href = `${location.origin}/${channle}/${url}.html#/${
        status ? "result" : ""
      }?has_pay=SUCCESS&order_id=${order_id}&status=SUCCESS`;
    },
    isShowBannerSort() {
      let channel = utils.getFBChannel();
      return ["enjoy02", "panda02"].includes(channel) ? false : true;
    },
    // 事件排序
    async logEventForSort(it) {
      if (!this.isShowBannerSort()) return;
      try {
        const res = await reportEventAPI({
          event_name: it.e_name,
          product_id: it.product_id,
        });
        if (res.status !== 1000) return;
      } catch (e) {
        console.error(e);
      }
    },
    restartChoose(val) {
      if (val) {
        utils.firebaseLogEvent(
          "10001",
          "-10016",
          "click_main_rechoise2",
          "click",
          {
            args_name: "click_main_rechoise2",
            channel: utils.getFBChannel(),
          }
        );
        this.new_sale_modal2 = true;
      } else {
        utils.firebaseLogEvent(
          "10001",
          "-10018",
          "click_main_rechoise3",
          "click",
          {
            args_name: "click_main_rechoise3",
            channel: utils.getFBChannel(),
          }
        );
        this.new_sale_modal = true;
      }
    },

    getSortInitList() {
      this.sale_list.forEach((it) => {
        it.icon_item = banner_enums[it.product_key];

        if (it.product_key === "h5_annual2024") {
          it.is_big = true;
        }
      });
      this.banner_list = JSON.parse(JSON.stringify(this.sale_list));
    },

    // 首页Banner排序
    async getProductSort() {
      if (!this.isShowBannerSort()) {
        this.getSortInitList();
        return;
      }
      const res = await sortProductsAPI();
      if (res.status !== 1000) return;
      // 在接口返回error或者没有排序值的情况下 添加一个默认值大图
      if (res.status !== 1000 || !res.data.length) {
        this.getSortInitList();
      }
      this.today_sort_list = res.data;
      this.sale_list.forEach((item) => {
        item.icon_item = banner_enums[item.product_key];
        // 将第一个置为大图
        item.is_big = item.product_key === this.today_sort_list[0];
      });
      // 给banner_list按照排序值赋值
      this.today_sort_list.forEach((it) => {
        this.banner_list.push(
          this.sale_list.find((item) => item.product_key === it)
        );
      });
      // 将banner_list的第一个放到第三个
      this.banner_list.splice(2, 0, this.banner_list.shift());
    },

    getBannerIcon(item) {
      const { product_key, is_big, icon_item } = item;
      const is_01 = ["enjoy01", "panda01"].includes(utils.getFBChannel());
      if (product_key === "h5_emotion2024") {
        if (is_01) {
          return is_big ? icon_item.new_01.big : icon_item.new_01.small;
        } else {
          return is_big ? icon_item.new_other.big : icon_item.new_other.small;
        }
      } else {
        if (is_big) {
          return this.is_cn ? icon_item.big.cn : icon_item.big.tw;
        } else {
          return this.is_cn ? icon_item.small.cn : icon_item.small.tw;
        }
      }
    },
  },
};
</script>

<style lang="less">
.mint-toast {
  z-index: 2200 !important;
}

.v-modal {
  opacity: 0.7 !important;
}
.swiper-buy .van-swipe-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-contain .mint-swipe-indicators {
  bottom: -0.15rem !important;
  .mint-swipe-indicator {
    width: 0.1rem !important;
    height: 0.1rem !important;
    background: #fff !important;
    opacity: 0.4 !important ;
    border-radius: 0.05rem !important;
  }
  .mint-swipe-indicator.is-active {
    width: 0.24rem !important;
    height: 0.1rem !important;
    border-radius: 0.05rem !important;
    opacity: 1 !important;
  }
}
</style>

<style scoped lang="less">
@import "./../../less/reset.less";
@import "./../../less/common.less";

.flex-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-url {
  color: #e3453d;
  text-decoration: underline;
}

.fix-pop {
  position: fixed !important;
  overflow-y: hidden;
}
.history-order {
  width: 0.56rem;
  height: 1.58rem;
  position: fixed;
  right: 0;
  top: 0.6rem;
  z-index: 10;
}

.container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  background: #d2e7de;
  display: flex;
  flex-direction: column;
  align-items: center;
  .index-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .header {
      width: 4.16rem;
      height: 0.8rem;
      margin: 0.3rem auto;
      background-image: url("../../assets/img/3.0/slide.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .slide {
        position: relative;
        width: 3.56rem;
        height: 0.68rem;
        display: flex;
        .slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 1.78rem;
          height: 0.68rem;
          z-index: 1;
          transition-duration: 0.2s;
        }
        .tab {
          position: relative;
          z-index: 2;
          width: 50%;
          font-size: 0.32rem;
          line-height: 0.68rem;
          text-align: center;
          font-weight: bold;
          color: #e6ffff;
          transition-duration: 0.2s;
        }
      }
    }
    .content {
      margin-top: 0.44rem;
    }
  }
}
.header-box {
  width: 7.5rem;
  background: url("https://psychicai-static.psychicai.pro/imgs/24040a66e62f96ec4d54814920ed3dcc4125.png")
    no-repeat;
  background-size: 7.5rem 4.22rem;
  position: relative;
  padding: 0.2rem 0.2rem 0;
  .buy-list {
    width: 7.1rem;
    height: 0.72rem;
    background: url("https://psychicai-static.psychicai.pro/imgs/240498b976e40d914444b775fec84707719e.png")
      no-repeat;
    background-size: contain;
    margin-top: 0.2rem;
    font-weight: 400;
    font-size: 0.24rem;
    color: #314a46;
    line-height: 0.24rem;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
    .swiper-buy {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .laba {
      width: 0.36rem;
      height: 0.36rem;
      left: 0.2rem;
      position: absolute;
    }
    .arrow {
      width: 0.16rem;
      height: 0.24rem;
      right: 0.25rem;
      position: absolute;
      z-index: 2;
    }
  }
}
.swiper-contain {
  height: 2.96em;
  width: 7.1rem;
  .swiper-item {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.hidden {
  display: none !important;
}
.sale-box {
  width: 7.18rem;
  height: 4.75rem;
  background: #222;
  border-radius: 0.24rem;
  margin: 0.24rem auto;
  overflow-x: hidden;
  .title-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0.3rem 0.34rem 0;
    font-family: PingFangSC-Semibold, PingFang SC;
    .left {
      width: 2.52rem;
      height: 0.64rem;
      background: url("../../assets/img/mlxz/index/ce_img_zhekoubg.png")
        no-repeat;
      background-size: contain;
      font-size: 0.32rem;
      font-weight: 600;
      color: #fff;
      line-height: 0.32rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.22rem;
    }
    .right {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
      .total {
        height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
        line-height: 0.24rem;
        text-decoration: line-through;
        margin-right: 0.05rem;
      }
      .percent {
        height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #fff;
        line-height: 0.24rem;
        margin: 0 0.04rem;
      }
      .price {
        height: 0.28rem;
        font-size: 0.32rem;
        font-weight: 700;
        color: #962bd1;
        line-height: 0.28rem;
      }
    }
  }
  .sale-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    .item {
      width: 2.02rem;
      height: 1.3rem;
      background: url("../../assets/img/mlxz/index/check_small.png") no-repeat;
      background-size: contain;
      margin: 0 0.11rem;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 100%;
        height: 100%;
      }
    }
    .add-icon {
      width: 0.52rem;
      height: 0.52rem;
      position: absolute;
      z-index: 10;
    }
  }
  .lock-btn {
    position: relative;
    width: 5.86rem;
    height: 0.96rem;
    background: url("../../assets/img/mlxz/cesuan_home/mymm_btn.png") no-repeat;
    background-size: contain;
    margin: 0.4rem 0.62rem 0.24rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 700;
    font-size: 0.32rem;
    color: #fdf4be;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .change-btn {
    width: 100%;
    height: 0.26rem;
    font-size: 0.26rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #57a38e;
    line-height: 0.26rem;
    text-align: center;
  }
}

.hot-product {
  width: 7.18rem;
  min-height: 4.56rem;
  background: #222;
  border-radius: 0.24rem;
  margin: 0 auto 0.24rem;
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Semibold, PingFang SC;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.2rem;
  .title {
    width: 2.45rem;
    height: 0.92rem;
    margin-top: 0.2rem;
  }
  .product-list {
    width: 7.18rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .item {
      width: 3.34rem;
      height: 3.34rem;
      margin: 0.1rem;
    }
  }
}
.text-1 {
  color: #8b4800;
}
.text-2 {
  color: #9b3124;
}
.text-3 {
  color: #250864;
}
.swiper-1 {
  background: #ffeddf;
}
.swiper-2 {
  background: #ffdfe2;
}
.swiper-3 {
  background: #e5dbff;
}
.ask-bg-1 {
  color: #ffeddf;
  background: #8b4800;
}
.ask-bg-2 {
  color: #ffdfe2;
  background: #9b3124;
}
.ask-bg-3 {
  color: #e5dbff;
  background: #250864;
}
.ad-list {
  width: 7.18rem;
  min-height: 4rem;
  background: #222;
  border-radius: 0.24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.12rem;
  margin-bottom: 0.5rem;
  .item {
    width: 100%;
    height: 100%;
    margin-bottom: 0.2rem;
  }
}

.hidden-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
}
.pop-box {
  width: 7.5rem;
  height: 10.5rem;
  background: #000;
  border-radius: 0.4rem 0.4rem 0 0;
  border-color: #000;
  padding: 0.4rem 0;
  .pop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangTC-Semibold, PingFangTC;
    margin-bottom: 0.3rem;
    padding: 0 0.3rem;
    width: 100%;
    .left {
      font-size: 0.36rem;
      font-weight: 700;
      color: #fff;
      line-height: 0.36rem;
      height: 0.36rem;
    }
    .close {
      width: 0.28rem;
      height: 0.28rem;
      position: absolute;
      right: 0.2rem;
    }
  }
  .pop-content {
    // height: 9.6rem;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    padding-bottom: 0.6rem;
    height: 8rem;
    width: 100%;
    margin: 0 0.15rem;
    .item {
      width: 3.34rem;
      height: 2.36rem;
      margin: 0 0.13rem 0.3rem;
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-icon {
        width: 100%;
        height: 1.4rem;
      }
      .bottom-box {
        margin-top: 0.1rem;
        font-size: 0.24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        width: 3rem;
        line-height: 0.35rem;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .normal-item {
      background-image: url("../../assets/img/mlxz/cesuan_home/sale_normal_kuang.png");
    }
    .forbidden-item {
      opacity: 0.6;
      // background-image: url('../../assets/img/mlxz/cesuan_home/sale_zhezhao_kuang.png');
    }
    .check-icon {
      width: 0.36rem;
      height: 0.36rem;
      position: absolute;
      right: 0.08rem;
      top: 0.08rem;
    }
  }
  .confirm-box {
    width: 5.34rem;
    height: 0.88rem;
    background: #cc883f;
    border-radius: 0.44rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0.4rem;
    left: 1.08rem;
  }
}

.btn-icon {
  width: 1.08rem;
  height: 0.48rem;
  position: absolute;
  top: -0.2rem;
  right: 0.18rem;
}
.disabled-confirm {
  // opacity: 0.4;
  display: none !important;
}

.report-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 0.2rem;
  .common-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.2rem;
  }
  .normal-item {
    width: 3.46rem;
    height: 4.88rem;
    background: url("https://psychicai-static.psychicai.pro/imgs/2404a1e37968e812485bbeea12aa4254d485.png")
      no-repeat;
    background-size: contain;
    margin: 0 0.09rem;
    .common-item;
    .normal-icon {
      width: 3.34rem;
      height: 3.34rem;
      margin: 0.06rem;
    }
    .normal-box {
      margin-top: 0.1rem;
      .text {
        width: 2.98rem;
        font-weight: 400;
        font-size: 0.28rem;
        color: #314a46;
        .hidden-2;
      }
      .tips {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.16rem;
        height: 0.24rem;
        font-weight: 400;
        font-size: 0.24rem;
        color: #8da5a1;
        line-height: 0.24rem;
      }
    }
  }

  .big-item {
    width: 7.1rem;
    height: 3.62rem;
    background: url("https://psychicai-static.psychicai.pro/imgs/24041489a229d8c545d9bc252e1418de9766.png")
      no-repeat;
    background-size: contain;
    .common-item;
    .big-icon {
      width: 6.98rem;
      height: 2.08rem;
      margin: 0.06rem;
    }
    .big-box {
      display: flex;
      margin-top: 0.1rem;
      align-items: flex-start;
      justify-content: space-around;
      width: 100%;
      .left {
        display: flex;
        flex-direction: column;
        .text {
          width: 4.3rem;
          font-weight: 400;
          font-size: 0.28rem;
          color: #314a46;
          .hidden-2;
        }
        .tips {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 0.24rem;
          font-weight: 400;
          font-size: 0.24rem;
          color: #8da5a1;
          line-height: 0.24rem;
          margin-top: 0.16rem;
        }
      }
      .right-btn {
        width: 1.92rem;
        height: 0.72rem;
        margin-top: 0.15rem;
      }
    }
  }
}

.ml-40 {
  margin-left: 0.4rem;
}
.flex-start {
  justify-content: flex-start !important;
}

.box1 {
  width: 1px;
  height: 100%;
}

.discount-box {
  width: 7.5rem;
  height: 4.08rem;
  margin: 0.4rem auto 0.2rem;
  // padding-left: 0.2em;
  .sale-item {
    width: 6.54rem !important;
    height: 100%;
    margin-left: 0.2rem;
    .item {
      width: 6.54rem !important;
      height: 4.08rem !important;
      background: url("../../assets/img/new_combine/home_img_headcard.png")
        no-repeat;
      background-size: 100% 100%;
      position: relative;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
.ml-80 {
  margin-left: -0.8rem;
}
.ml-76 {
  margin-left: 0.76rem;
}
.ml-130 {
  margin-left: 1.3rem;
}
.sale-title {
  width: 2rem;
  height: 0.36rem;
  font-weight: 600;
  font-size: 0.36rem;
  color: #314a46;
  line-height: 0.36rem;
  white-space: nowrap;
  // position: absolute;
  // top: 0.3rem;
  // left: 0.24rem;
}
.new-price {
  display: flex;
  height: 0.34rem;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  .one {
    font-weight: 400;
    font-size: 0.24rem;
    color: #8da5a1;
    text-decoration-line: line-through;
  }
  .two {
    font-weight: 400;
    font-size: 0.24rem;
    color: #314a46;
    margin: 0 0.04rem;
  }
  .large {
    font-weight: 600;
    font-size: 0.34rem;
    color: #e3453d;
    line-height: 0.34rem;
  }
}
.zhekou-icon {
  // position: absolute;
  // top: 0.22rem;
  // right: 0.24rem;
  width: 1.54rem;
  height: 0.52rem;
}

.three-list {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
  position: relative;
  .it {
    width: 1.8rem;
    // height: 1.2rem;
    margin: 0 0.12rem;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .tag {
      position: absolute;
      right: -0.05rem;
      top: -0.1rem;
      width: 0.82rem;
      height: 0.36rem;
      background: linear-gradient(180deg, #ff9e64 0%, #ff7a29 100%);
      border-radius: 0.08rem;
      font-size: 0.22rem;
      color: #fff;
      display: flex;
      font-weight: 600;
      align-items: center;
      justify-content: center;
    }
    .check-icon {
      width: 1.86rem;
      height: 1.2rem;
    }
  }
  .no-it {
    background: url("../../assets/img/new_combine/home_btn_add.png") no-repeat;
    background-size: contain;
  }
}

.pick-btn {
  width: 5.86rem;
  height: 0.96rem;
  background: url("../../assets/img/new_combine/button_big.png") no-repeat;
  background-size: contain;
  font-weight: 600;
  font-size: 0.32rem;
  color: #fdf4be;
  line-height: 0.96rem;
  text-align: center;
  position: relative;
}
.absolute-zhe {
  position: absolute;
  top: -0.14rem;
  right: 0.2rem;
  width: 1.3rem;
  height: 0.44rem;
}
.reset-select {
  width: 100%;
  height: 0.26rem;
  font-weight: 400;
  font-size: 0.26rem;
  color: #8da5a1;
  line-height: 0.26rem;
  text-align: center;
  margin-top: 0.2rem;
}
.divider-line-left {
  position: absolute;
  height: 0.04rem;
  top: 0.6rem;
  left: 1.9rem;
  z-index: 1;
  display: flex;
  .one {
    width: 0.1rem;
    height: 100%;
    background: #b0d5cf;
  }
  .two {
    width: 0.05rem;
    height: 100%;
    background: #b0d5cf;
    margin-left: 0.05rem;
  }
}
.divider-line-right {
  position: absolute;
  height: 0.04rem;
  top: 0.6rem;
  right: 1.9rem;
  z-index: 1;
  display: flex;
  .one {
    width: 0.03rem;
    height: 100%;
    background: #b0d5cf;
  }
  .two {
    width: 0.07rem;
    height: 100%;
    background: #b0d5cf;
    margin-left: 0.05rem;
  }
  .three {
    width: 0.06rem;
    height: 100%;
    background: #b0d5cf;
    margin-left: 0.05rem;
  }
}

.modal-box {
  width: 7.5rem;
  height: 11.18rem;
  background: linear-gradient(180deg, #d2e7de 0%, #ffffff 100%);
  border-radius: 0.4rem 0.4rem 0 0;
  overflow-x: hidden;
  .title-box {
    width: 100%;
    height: 0.64rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 0.28rem;
    color: #314a46;
    margin: 0.26rem auto;
    position: relative;
    .left {
      margin-left: 0.3rem;
      z-index: 2;
      opacity: 0.7;
    }
    .center {
      width: 100%;
      text-align: center;
      position: absolute;
      z-index: 1;
      top: 0.1rem;
      height: 0.36rem;
      font-weight: 600;
      font-size: 0.36rem;
      line-height: 0.36rem;
    }
    .right-common {
      width: 1.36rem;
      height: 0.64rem;
      border-radius: 0.16rem;
      margin-right: 0.3rem;
      z-index: 2;
      .btn {
        width: 100%;
        height: 100%;
        font-size: 0.28rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.16rem;
      }
    }
    .right-check {
      background: linear-gradient(180deg, #f47553 0%, #e92424 99%);

      .btn {
        color: #fff;

        border: 0.02rem solid #ffd192;
      }
    }
    .disable-right {
      background: linear-gradient(180deg, #fbc8ba 0%, #f6a8a8 100%);
      .btn {
        border: 0.02rem solid #ffedd3;
        color: #fef8eb;
      }
    }
  }
  .modal-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 0.16rem;
    width: 100%;
    height: 10.1rem;
    overflow-y: auto;
    .item {
      width: 3.35rem;
      height: 2.28rem;
      margin: 0 0.11rem 0.22rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .check-icon {
        width: 0.48rem;
        height: 0.46rem;
        position: absolute;
        top: 0.08rem;
        right: 0.08rem;
      }
      .icon {
        width: 3.31rem;
        height: 1.4rem;
      }
      .desc {
        width: 2.95rem;
        font-weight: 400;
        font-size: 0.24rem;
        color: #314a46;
        margin-top: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        word-break: break-all;
        word-wrap: break-word;
        -webkit-box-orient: vertical;
        opacity: 0.7;
      }
    }
    .item-normal {
      background: url("../../assets/img/new_combine/sale_normal.png") no-repeat;
      background-size: contain;
    }
    .item-checked {
      background: url("../../assets/img/new_combine/sale_checked.png") no-repeat;
      background-size: contain;
    }
    .opacity-20 {
      opacity: 0.5;
    }
  }
}

.order-title {
  width: 100%;
  position: relative;
  text-align: left;
  height: 0.36rem;
  font-weight: 600;
  font-size: 0.36rem;
  color: #314a46;
  line-height: 0.36rem;
  margin-top: 0.3rem;
  padding-left: 0.24rem;
}
.get-tag {
  background: linear-gradient(180deg, #5de3a8 0%, #22ba77 100%) !important;
}

.status-common {
  width: 1.62rem;
  height: 0.64rem;
  border-radius: 0.16rem;
  font-weight: 600;
  font-size: 0.24rem;
  line-height: 0.24rem;
  margin-top: 0.42rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-1 {
  border: 0.02rem solid #e79999;

  color: #e3453d;
}
.status-0 {
  border-radius: 0.16rem;
  border: 0.02rem solid #ffd192;
  background: linear-gradient(180deg, #f47553 0%, #e92424 99%);

  .text {
    color: #fef8eb;
    border-radius: 0.16rem;
  }
}
.tips-ce {
  height: 0.24rem;
  font-weight: 400;
  font-size: 0.24rem;
  color: #8da5a1;
  line-height: 0.24rem;
  text-align: center;
  margin-top: 0.2rem;
}

.w654 {
  width: 6.54rem !important;
}

.ml-0 {
  margin: 0 !important;
}
.pl-90 {
  padding-left: 0 !important;
}

.item-price-box {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 0.24rem;
  align-items: center;
  margin-top: 0.3rem;
}
.show-box1 {
  width: 1.56rem;
  height: 100%;
}
.hid-1 {
  width: 0.8rem;
  transition: width 0.3s;
}
.show-box2 {
  width: 2.3rem;
  height: 100%;
}

.ml-100 {
  margin-left: 1.56rem !important;
  transition: margin-left 0.3s;
}
.ml-170 {
  margin-left: 2.3rem !important;
  // transition: all 0.5s;
  transition: margin-left 0.3s;
}
.empty-loading {
  width: 7.5rem;
  height: 4.08rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes scaleNewBtn {
  0% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1.1);
  }
}
.discount-tag {
  animation: scaleNewBtn 0.6s infinite ease-in-out alternate;
}
</style>
