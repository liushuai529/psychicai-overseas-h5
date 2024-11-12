<template>
  <div>
    <div :class="{
      container: true,
      'fix-box': choose_time ? true : false,
    }">

      <audio ref="audioPlayer"
        src="https://psychicai-static.psychicai.pro/files/241124a310d464a846d79d03349c2a1e314c.mp3"
        @ended="onEnded"></audio>
      <confirm @close-confirm="closeConfirm" :show="showConfirm" />
      <canvas class="canvas-bg1" id="canvas1" @click="handleAction"></canvas>
      <canvas class="canvas-bg2" id="canvas2" @click="handleAction"></canvas>
      <img :class="['banner', banner_status ? 'fadein_animation' : '']"
        :src="is_cn ? home_img_zixunpush_cn : home_img_zixunpush_tw" @click="handleAction" />
      <img class="nav" :src="is_cn ? home_img_nav_cn : home_img_nav_tw" @click="handleAction" />
      <img class="music" :src="is_cn ? home_img_voice_cn : home_img_voice_tw" @click="handleAction" />
      <img class="textbj" :src="is_cn ? home_img_textbj_cn : home_img_textbj_tw" @click="handleAction" />
      <img class="card" :src="is_cn ? home_img_bazixinxi_cn : home_img_bazixinxi_tw" />

      <div class="bottom-container">
        <div class="top">
          <div class="left" ref="scrollContainer">
            <div class="item" v-for="item in message_list"><span>情感老师</span>{{ item }}</div>

          </div>
          <div class="right">
            <div>
              <img class="emo-btn" :src="is_cn ? home_img_lianmai_cn : home_img_lianmai_tw"
                @click="handleAction('Connecting')" />
              <div class="btn" @click="toOrder">
                <p>{{ is_cn ? '历史订单' : '歷史訂單' }}</p>
                <img src="../../../assets/img/emotion_voice/home_img_more.webp" />
              </div>
            </div>
          </div>
        </div>
        <img class="bottom" :src="is_cn ? home_img_gongneng_cn : home_img_gongneng_tw" @click="handleAction" />
      </div>


      <!-- 時间选择控件 -->
      <DatetimePicker start="1900" end="2050" :year="year" :month="month" :date="date" :birth_hour="birth_hour"
        v-show="choose_time && !show_nongli"></DatetimePicker>
      <NongliPicker start="1900" end="2050" :year="year" :month="month" :date="date" :birth_hour="birth_hour"
        v-show="choose_time && show_nongli"></NongliPicker>

      <van-action-sheet v-model:show="show_sheet" :title="is_cn ? '立即获得咨询师详解' : '立即獲得咨詢師詳解'" style="height: 7.1rem;">
        <div class="item-container">
          <div class="info-item">
            <div class="left input-container">
              <div>姓名：</div>
              <div class="info-input">
                <input type="text" id="username" v-model="username" :placeholder="$t('name-placeholder')" />
              </div>

            </div>
            <!-- <div class="sex-container">
                <img :src="sex == 1 ? boy : girl" @click="changeSex()" />
              </div> -->
          </div>


          <div class="info-item">
            <div class="left input-container">
              <div>性别：</div>
            </div>
            <div class="sex-container">
              <div :class="['unselect', sex == 1 ? 'select' : '']" @click="changeSex(1)">男</div>
              <div :class="['unselect', sex == 0 ? 'select' : '']" @click="changeSex(0)">女</div>
              <!-- <img :src="sex == 1 ? boy : girl" @click="changeSex()" />
                <img :src="sex == 1 ? boy : girl" @click="changeSex()" /> -->
            </div>
          </div>

          <div class="info-item">
            <div class="left input-container">
              <div>生辰：</div>
              <div class="info-input">
                <div class="info-birth" :style="{
                  color: picker_date ? '#333' : 'rgba(51, 51, 51, 0.5)',
                }" @click="openPicker">
                  {{ picker_date || $t('birth-placeholder') }}
                </div>
              </div>

            </div>
            <div class="birth-container">
              <img src="../../../assets/img/emotion_voice/icon_rili.webp" @click="openPicker" />
            </div>
          </div>
        </div>



        <div class="info-bottom">
          <img v-if="privacyChecked" class="info-check" src="../../../assets/img/emotion_voice/icon_choose_seleted.webp"
            @click="privacyChecked = !privacyChecked" />
          <img v-else class="info-check" src="../../../assets/img/emotion_voice/icon_choose_normal.webp"
            @click="privacyChecked = !privacyChecked" />
          {{ $t('check-label') }}
          <span @click="link('user_agreement.html')">{{ $t('user-agreement') }} </span>{{ $t('and') }}
          <span @click="link('privacy.html')">{{
            $t('privacy-policy')
            }}</span>
        </div>
        <div id="info-btn" :class="['btn', 'emo-btn', btn_status ? 'btn-check' : '']" @click="check">
          立即提交
        </div>
      </van-action-sheet>

      <NewFooter type="emotion_marriages" v-if="showFixedBtn" product_key="consult_time" />

    </div>
  </div>
</template>
<script>
import FbShareNotice from '../../../components/FbShareNotice.vue';
import FixedOrder from '../../../components/FixedOrder.vue';
import HomeFooter from '../../../components/HomeFooter.vue';
import { Toast, Indicator } from 'mint-ui';
import { showToast } from 'vant';
import utils from '../../../libs/utils.js';
import {
  getPayOrderInfoAPI,
  payOrderAPI,
  getLastOrderAPI,
  getComboAttachAPI,
  reportBuryingEventAPI,
} from '../../../api/api.js';
import moment from 'dayjs';
// @ts-ignore

import DatetimePicker from '../../../components/DatetimePicker';
import NongliPicker from '../../../components/NongliPicker';
import {
  reportEnum,
  reportName,
  path_enums,
  maidianEnum,
} from '../../../libs/enum.js';



import combinePayPop from '../../../components/combinePayPop.vue';
import confirm from './confirm.vue';
import { Downloader, Parser, Player } from 'svga.lite';

import home_img_nav_tw from '../../../assets/img/emotion_voice/tw/home_img_nav_tw.webp'
import home_img_nav_cn from '../../../assets/img/emotion_voice/cn/home_img_nav_cn.webp'

import home_img_zixunpush_tw from '../../../assets/img/emotion_voice/tw/home_img_zixunpush_tw.webp'
import home_img_zixunpush_cn from '../../../assets/img/emotion_voice/cn/home_img_zixunpush_cn.webp'

import home_img_voice_tw from '../../../assets/img/emotion_voice/tw/home_img_voice_tw.webp'
import home_img_voice_cn from '../../../assets/img/emotion_voice/cn/home_img_voice_cn.webp'

import home_img_textbj_tw from '../../../assets/img/emotion_voice/tw/home_img_textbj_tw.webp'
import home_img_textbj_cn from '../../../assets/img/emotion_voice/cn/home_img_textbj_cn.webp'



import home_img_bazixinxi_tw from '../../../assets/img/emotion_voice/tw/home_img_bazixinxi_tw.webp'
import home_img_bazixinxi_cn from '../../../assets/img/emotion_voice/cn/home_img_bazixinxi_cn.webp'

import home_img_lianmai_tw from '../../../assets/img/emotion_voice/tw/home_img_lianmai_tw.webp'
import home_img_lianmai_cn from '../../../assets/img/emotion_voice/cn/home_img_lianmai_cn.webp'

import home_img_gongneng_tw from '../../../assets/img/emotion_voice/tw/home_img_gongneng_tw.webp'
import home_img_gongneng_cn from '../../../assets/img/emotion_voice/cn/home_img_gongneng_cn.webp'







import PopNotice from '../../../components/PopNotice.vue';



import boy from '../../../assets/img/emotion_remarriage/img_boy.webp';
import girl from '../../../assets/img/emotion_remarriage/img_girl.webp';


import NewFooter from '../../../components/NewFooter.vue';



// 组合测算相关参数
let is_combine = utils.getQueryString('is_combine');
const tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...',
};
export default {
  components: {
    DatetimePicker,
    NongliPicker,
    combinePayPop,
    confirm,
    HomeFooter,
    PopNotice,
    FixedOrder,
    NewFooter,
    FbShareNotice,
  },
  data() {
    return {
      boy,
      girl,
      home_img_nav_tw,
      home_img_nav_cn,
      home_img_zixunpush_cn,
      home_img_zixunpush_tw,
      home_img_voice_tw,
      home_img_voice_cn,
      home_img_textbj_cn,
      home_img_textbj_tw,
      home_img_bazixinxi_tw,
      home_img_bazixinxi_cn,
      home_img_lianmai_tw,
      home_img_lianmai_cn,
      home_img_gongneng_tw,
      home_img_gongneng_cn,
      utils,
      privacyChecked: true, // 同意隐私协议
      showFixedBtn: false,
      sex: '0',
      year: '2000',
      month: '',
      date: '',
      birth_hour: '-1',
      username: '',
      email: '',
      picker_date: '',
      picker_date_obj: null,
      picker_hour: '',
      gongli_nongli: '1',
      choose_time: false,
      show_nongli: false,
      // 底部弹出popup版本所需数据
      visible: false,
      product_id: 2,
      product_key: 'consult_time',
      query_user_string: '',
      is_combine,
      has_pay: '',
      showFixedBtn: false,
      //
      language: utils.getLanguage(),
      cn_voice_svga:
        'https://psychicai-static.psychicai.pro/imgs/241163f31c3e28f04512b627922694f29e89.svga',
      tw_voice_svga:
        'https://psychicai-static.psychicai.pro/imgs/241106114ba742054231b588194dcc70e352.svga',
      cn_text_svga:
        'https://psychicai-static.psychicai.pro/imgs/2411e27b33d4a9b24fcfa745f48993b6734c.svga',
      tw_text_svga:
        'https://psychicai-static.psychicai.pro/imgs/2411ca0f8cf332f9430992cbc214e6afc030.svga',

      is_show_btn: true,
      pay_modal: false,
      product_price: '',

      count_down: 0, // 挽留弹窗倒计时
      fix_order_info: null, //最新一个订单信息
      new_order_key: '',
      reportName,
      show_api_order: false,
      last_order: null,
      api_time: 0,
      local_time: 0,
      last_title: '',
      timer: null,
      comboAttachData: null, //套餐未使用报告信息
      duration_time: {
        entry_time: 0,
        entry_time1: 0,
        exit_time: 0,
      },
      showConfirm: false,
      show_sheet: false,
      message_list: [],
      message_index: 0,
      banner_status: false,
      banner_status1: false,

    };
  },
  computed: {
    btn_status() {
      return this.privacyChecked && this.picker_date_obj != null && this.username.length > 0
    },
    is_show_fb_notice() {
      return utils.isFBContainer();
    },
    productList() {
      return this.$store.state.common.productList;
    },
    is_cn() {
      return this.language === 'zh-CN';
    },


    local_title() {
      return utils.getTitle(this.new_order_key);
    },
  },
  watch: {

    message_index(val) {
      console.log('val事件', val)
      if (val === 5 || val === 15 || val === 30 || val === 60 || val === 90 || val === 120) {
        this.banner_status = true
        setTimeout(() => {
          this.banner_status = false
        }, 8000);
      }
    },
    showConfirm(val) {
      if (!val) {
        this.timer = setInterval(this.messageHandle, 1000);
      }
    },

    show_sheet(val) {
      if (!val) {
        this.playSound()

      }
    },

    username(val) {
      if (val) {
        let new_ = val.trim();
        let regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.username = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.username = new_.slice(0, 20);
        }
      }
    },

  },
  created() {
    this.showConfirm = true
    this.$store.dispatch('common/getProduction', 'consult_time');
    utils.firebaseLogEvent(
      '10016',
      '-10001',
      'page_view_love_voice_join_main',
      'page_view',
      {
        channel: utils.getFBChannel(),
      }
    );
    const { has_pay } = this.$route.query;
    this.has_pay = has_pay ? has_pay : '';
    // 埋点事件上传
    // reportBuryingEventAPI({
    //   event: 'page_view_marriages_main',
    //   channel: utils.getFBChannel(),
    // })
    //   .then()
    //   .catch(err => {
    //     console.warn(`埋点事件上传失败${err}`);
    //   });
  },
  beforeDestroy() {
    alert('测试关闭')
    this.$refs.audioPlayer && this.$refs.audioPlayer.pause()
  },
  mounted() {
    this.duration_time.entry_time = new Date().getTime()
    if (!localStorage.getItem('current_play_position')) {
      localStorage.setItem('current_play_position', 0)
    }
    const audioPlayer = this.$refs.audioPlayer;
    audioPlayer.addEventListener('timeupdate', function () {
      // console.log('Current playback position: ' + audioPlayer.currentTime + ' seconds');
      localStorage.setItem('current_play_position', audioPlayer.currentTime)
    });
    //svga动画加载
    this.loadSVGA()
    if (utils.isProd()) {
      try {
        utils.getFBChannel().indexOf('google') < 0 && fbq && fbq('trackCustom', 'CustomChannel', {
          channel: `pageview_main_${utils.getFBChannel()}`,
        });
        utils.gcyLog(`感情运首页`, {
          mlxz_action_desc: '查看感情运首页FB渠道上报',
          mlxz_action_type: 'view',
          mlxz_channel: `pageview_main_${utils.getFBChannel()}`,
        });
      } catch (err) {
        console.log('no fbq:', err);
      }
    }
    // this.showNoticePop();

    // 赋默认值
    let storaged_userInfo = window.localStorage.getItem(
      '_emotion_voice'
    );
    if (storaged_userInfo) {
      let arr = storaged_userInfo.split('|');

      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.email = (arr[7] == '' || arr[7] == 'undefined') ? '' : arr[7];
      this.username = arr[0];
      this.sex = arr[1] + '';
      this.gongli_nongli = arr[2];
      this.picker_hour = utils.formateNongliHour(arr[6]);
      // 生日默认值
      if (arr[2] == '1') {
        this.show_nongli = false;
        this.picker_date = `${arr[3]}年${arr[4]}月${arr[5]}日 ${this.picker_hour}`;
      } else {
        this.show_nongli = true;
        this.picker_date = `${arr[3]}年${utils.formateNongliMonth(
          arr[4]
        )}${utils.formateNongliDate(arr[5])} ${this.picker_hour}`;
      }
      // 生日实际传值
      let pick_date = {
        year: arr[3],
        month: arr[4],
        date: arr[5],
        birth_hour: arr[6],
      };
      this.picker_date_obj = pick_date;
    }
    let self = this;

    let screenH = window.screen.height;

    let btn = document.getElementById('info-btn');
    document.addEventListener('scroll', e => {
      let flag = utils.isElementInViewport(btn);
      let scroll_distance =
        window.pageYOffset || document.documentElement.scrollTop;
      if (!self.is_show_btn || scroll_distance < 100) {
        self.showFixedBtn = false;
        return;
      }
      if (!flag) {
        self.showFixedBtn = true;
      } else {
        self.showFixedBtn = false;
      }
    });
    let initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      self.is_show_btn =
        initialWindowHeight > window.innerHeight ? false : true;
    });
  },
  destroyed() {
    this.duration_time.exit_time = new Date().getTime();
    if (this.duration_time.entry_time) {
      utils.firebaseLogEvent(
        '10016',
        '-10002',
        'view_love_voice_join_main',
        'view',
        {
          channel: utils.getFBChannel(),
          time: (this.duration_time.exit_time - this.duration_time.entry_time) / 1000
        }
      );

      utils.firebaseLogEvent(
        '10016',
        '-10004',
        'view_love_voice_main',
        'view',
        {
          channel: utils.getFBChannel(),
          time: (this.duration_time.exit_time - this.duration_time.entry_time1) / 1000
        }
      );
    }
  },
  methods: {
    messageHandle() {
      this.message_index = this.message_index + 1;
      if (this.message_index < 11) {
        this.message_list.push(this.message_index + '情感導師：老師，我和男朋友一直異國戀，昨天晚上，他電話那邊有別的女生聲音，後來聊了幾分鐘，就掛斷了，我後面問他是誰，他只是說同學來宿舍拿東西，我現在特別焦慮，能幫我看看嗎？')
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
      console.log('this.message_index', this.message_index)
      if (this.message_index > 120) {
        console.log('执行定时器')
        clearInterval(this.timer)
      }
    },
    /**
    * @description: 跳转历史订单页
    * @return {*}
    */
    toOrder() {
      this.$router.push({
        path: 'order',
      });
    },
    loadSVGA() {
      this.loadSvgaBg('#canvas1', this.is_cn ? this.cn_voice_svga : this.tw_voice_svga);
      this.loadSvgaBg('#canvas2', this.is_cn ? this.cn_text_svga : this.tw_text_svga);
    },
    // 端内加载背景SVGA动画
    loadSvgaBg(dom, url, is_loop = true) {
      const downloader = new Downloader();
      // 默认调用 WebWorker 线程解析
      // 可配置 new Parser({ disableWorker: true }) 禁止
      const parser = new Parser();
      // #canvas 是 HTMLCanvasElement
      const player = new Player(dom);

      (async () => {
        const fileData = await downloader.get(url);
        const svgaData = await parser.do(fileData);

        player.set({ loop: is_loop });

        await player.mount(svgaData);

        // 开始播放动画
        player.start();
      })();
    },
    onEnded() {
      localStorage.removeItem('current_play_position');
      this.show_sheet = true
      console.log('声音播放结束');
    },
    playSound() {
      if (localStorage.getItem('current_play_position')) {
        this.$refs.audioPlayer.currentTime = parseFloat(localStorage.getItem('current_play_position'))
        this.$refs.audioPlayer.play();
      }
    },
    scrollToBottom() {
      let container = this.$refs.scrollContainer;
      container.scrollTop = container.scrollHeight;
    },
    /**
     * 关闭弹窗，开始播放音乐
     */
    closeConfirm() {
      this.duration_time.entry_time1 = new Date().getTime()
      this.showConfirm = false
      this.playSound();
      utils.firebaseLogEvent(
        '10016',
        '-10003',
        'page_view_love_voice_main',
        'page_view',
        {
          channel: utils.getFBChannel(),
        }
      );

    },
    showEmail() {
      return utils.showEmail();
    },
    setAnimation() {
      localStorage.setItem('mlxz_outer_animation', '1');
    },
    async preloadSVGA() {
      var svgaUrl = 'https://psychicai-static.psychicai.pro/imgs/2406c6f666683c824312b07e66feb0c73ad2.svga'; // 替换为你的SVGA文件路径
      var image = new Image();
      image.src = svgaUrl;
      image.onload = function () {
        console.log('SVGA preloaded successfully');
      };
      image.onerror = function () {
        console.error('Failed to preload SVGA');
      };
    },
    //顶部引导横幅，开始测算
    async startCalculateClick() {
      //顶部套餐报告与当前报告不同
      // if(this.comboAttachData.product_key !== this.product_key) {
      //   location.href = `${path_enums[product_key]}.html#/?has_pay=SUCCESS&order_id=${this.comboAttachData.order_id}&product_key=${this.comboAttachData.product_key}`;
      // } else {

      // }
      location.href = `${path_enums[this.comboAttachData.product_key]
        }.html#/?has_pay=SUCCESS&order_id=${this.comboAttachData.order_id
        }&product_key=${this.comboAttachData.product_key}`;
    },
    //请求接口，是否展示引导标识
    async showComboAttach() {
      const res = await getComboAttachAPI();
      if (res.status !== 1000) return;
      if (res.data && res.data.combine) {
        //组合套餐中未测算的报告
        let sub_orders = res.data.combine.sub_orders.find(
          item => !item.extra_ce_suan
        );
        //获取到未测算的报告信息
        this.comboAttachData = {
          product_id: sub_orders.product_id,
          order_id: sub_orders.order_id,
          product_key: sub_orders.product_key,
        };
      } else {
        this.comboAttachData = null;
      }
    },
    // 获取订单ID
    getOrderId(val) {
      this.order_id = val;
    },
    // 协议
    link(url) {
      let username = this.username;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let email = this.email;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        location.href = url;
        return;
      }
      if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
        location.href = url;
        return;
      }
      if (time_obj == null) {
        location.href = url;
        return;
      }
      if (email == '') {
        location.href = url;
        return;
      }

      let querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';
      querystring += '|';
      querystring += email;
      window.localStorage.setItem('_emotion_voice', querystring);
      location.href = url;
    },
    /**
     * @description: 跳转历史订单页
     * @return {*}
     */
    toOrder() {
      this.$router.push({
        path: 'order',
      });
    },

    /**
     * @description: 选择性别 这里用于在跳转协议页面返回后清空姓名问题
     * @param {*} val
     * @return {*}
     */
    changeSex(val) {


      this.sex = val + '';
    },


    /**
     * @description: 跳转协议页面
     * @param {*} url
     * @return {*}
     */
    toPrivacy(url) {
      this.storeUserInfo(url);
    },

    /**
     * @description: 打开时间选择器
     * @return {*}
     */
    openPicker() {
      this.choose_time = true;
    },

    /**
     * @description: 关闭时间选择器
     * @return {*}
     */
    closePicker() {
      this.choose_time = false;
    },

    /**
     * @description: 跳转协议页面时 如已填充信息 则缓存到本地
     * @param {*} url
     * @return {*}
     */
    storeUserInfo(url) {
      let username = this.username;
      let email = this.email;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        location.href = url;
        return;
      }
      // if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
      //   location.href = url;
      //   return;
      // }
      if (time_obj == null) {
        location.href = url;
        return;
      }
      let querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';
      querystring += '|';
      querystring += email;

      window.localStorage.setItem('_emotion_voice', querystring);
      location.href = url;
    },

    handleAction(val) {
      this.show_sheet = true
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.pause();
      //连麦操作
      if (val === 'Connecting') {
        utils.firebaseLogEvent(
          '10016',
          '-10005',
          'click_love_voice_main',
          'view',
          {
            channel: utils.getFBChannel(),
          }
        );
      }
    },

    /**
     * @description: 跳转到支付页
     * @return {*}
     */
    async check() {

      let username = this.username;
      let email = this.email;
      let sex = this.sex;
      let gongli_nongli = this.gongli_nongli;
      let time_obj = this.picker_date_obj;
      if (username == '') {
        utils.firebaseLogEvent(
          '10016',
          '-10006',
          'click_love_voice_submit',
          'click',
          {
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('name-tips'));
        let dom = document.getElementById('username');
        dom.focus();
        return;
      }

      // if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
      //   Toast(this.$t('name-tips-2'));
      //   return;
      // }
      if (time_obj == null) {
        utils.firebaseLogEvent(
          '10016',
          '-10006',
          'click_love_voice_submit',
          'click',
          {
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('birth-tips'));
        return;
      }
      if (!this.privacyChecked) {
        utils.firebaseLogEvent(
          '10016',
          '-10006',
          'click_love_voice_submit',
          'click',
          {
            channel: utils.getFBChannel(),
            click_type: 'error',
          }
        );
        Toast(this.$t('xieyi-tips'));
        return;
      }

      let querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';
      querystring += '|';
      querystring += email;
      //设置过渡动画标识
      this.setAnimation();
      window.localStorage.setItem('_emotion_voice', querystring);
      let path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;
      utils.firebaseLogEvent(
        '10016',
        '-10006',
        'click_love_voice_submit',
        'click',
        {
          channel: utils.getFBChannel(),
          click_type: 'screen_tracking',
        }
      );
      if (utils.isProd()) {
        try {
          utils.getFBChannel().indexOf('google') < 0 && fbq && fbq('track', 'Lead');
        } catch (err) {
          console.error('Lead  error message:', err);
        }
        let same_ = this.productList.find(
          item => item.product_key === this.product_key
        );
        const { price, currency_type } = same_;
        utils.getFBChannel().indexOf('google') > -1 && gtag && gtag("event", "generate_lead", {
          currency: currency_type,
          value: price,
        });
      }
      let { has_pay, order_id, product_key } = this.$route.query;

      if (has_pay) {
        if (has_pay === 'SUCCESS') {
          getPayOrderInfoAPI(
            order_id,
            this.getExtra(product_key, querystring)
          ).then(res => {
            if (res.data) {
              this.$router.push({
                path: 'result',
                query: { order_id: order_id, status: 'SUCCESS' },
              });
            }
          });
        }
      } else {
        let same_ = this.productList.find(
          item => item.product_key === this.product_key
        );
        const { price, unit, product_id, google_goods_id, product_key } = same_;
        // 缓存最新一个订单信息
        // localStorage.setItem('mlxz_fixed_order_info', querystring);
        // localStorage.setItem('mlxz_fixed_order_key', this.product_key);
        // localStorage.setItem(
        //   `mlxz_new_time_down_${this.product_key}`,
        //   15 * 60 * 1000
        // );

        // localStorage.setItem(
        //   `mlxz_user_info_${this.product_key}`,
        //   JSON.stringify({
        //     user_info: querystring,
        //     product_key: this.product_key,
        //   })
        // );
        // let num_ = localStorage.getItem(`mlxz_show_notice_${this.product_key}`);
        // localStorage.setItem(
        //   `mlxz_show_notice_${this.product_key}`,
        //   num_ ? 2 : 1
        // );
        this.product_price = price || '-';
        this.$router.push({ path });
        return;
        if (utils.isVersionMoreThan('1.1.1')) {
          this.pay_modal = true;
          return;
        }

        let params = {
          pay_method: 'google_pay',
          product_key: product_key,
          platform: 'ANDROID',
          product_id: product_id,
          extra_ce_suan: this.getExtra(product_key, querystring),
        };
        payOrderAPI(params).then(res => {
          if (res.status === 1000) {
            Indicator.close();
            this.order_id = res.data.id;
            window.psychicai_client.onWebPayDialog(
              res.data.id,
              price + '',
              unit,
              google_goods_id,
              reportEnum[product_key]
            );
          }
        });
        return;
        this.$router.push({ path });
      }
    },

    /**
     * @description: 解析用户信息
     * @param {*} product_key 商品key
     * @param {*} querystring 用户信息拼接string
     * @return {*}
     */
    getExtra(product_key, querystring) {
      let params = null;
      let query_user_string = querystring;
      let query_user_string_array = query_user_string.split('|');

      // 八字合婚 双人信息
      if (product_key === 'h5_marriage') {
        let [
          male_name,
          female_name,
          male_birth_year,
          male_birth_month,
          male_birth_date,
          female_birth_year,
          female_birth_month,
          female_birth_date,
          male_birth_hour,
          female_birth_hour,
          male_is_gongli,
          female_is_gongli,
          sex,
          email,
        ] = query_user_string_array;

        params = {
          male_name,
          female_name,
          male_birth_year,
          male_birth_month,
          male_birth_date,
          female_birth_year,
          female_birth_month,
          female_birth_date,
          male_birth_hour,
          female_birth_hour,
          male_is_gongli,
          female_is_gongli,
          sex,
          email: email === undefined || !this.showEmail() ? '' : email,
        };
      }
      // 其他 单人信息
      else {
        let [
          name,
          sex,
          is_gongli,
          birth_year,
          birth_month,
          birth_date,
          birth_hour,
          email,
        ] = query_user_string_array;
        params = {
          name,
          sex,
          is_gongli,
          birth_year,
          birth_month,
          birth_date,
          birth_hour,
          email: email === undefined || !this.showEmail() ? '' : email,
          date: moment(
            `${birth_year}${+birth_month < 10 ? '0' + birth_month : birth_month
            }${+birth_date < 10 ? '0' + birth_date : birth_date}`
          ).format('YYYYMMDD'),
        };
      }

      return params;
    },








  },
};
</script>
<style>
.mint-toast {
  z-index: 999999;
}
</style>
<style scoped lang="less">
.fix-box {
  position: fixed !important;
}

@keyframes scaleBtn {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.96);
  }

  100% {
    transform: scale(1.04);
  }
}



#bg-svga {
  position: absolute;
  width: 7.5rem;
  height: 9rem;
  top: 0;
}

.container {
  width: 7.5rem;
  height: 100vh;
  background-image: url('../../../assets/img/emotion_voice/home_img_backdrop.webp');
  background-size: cover;
  position: relative;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  .canvas-bg1 {
    position: absolute;
    top: 1.12rem;
    left: 0.24rem;
    width: 7.02rem;
    height: 2.48rem;
    z-index: 2;
  }

  .canvas-bg2 {
    position: absolute;
    top: 1.12rem;
    left: 0rem;
    width: 7.5rem;
    height: 4.42rem;
    z-index: 2;
  }



  .nav {
    width: 7.5rem;
    height: 1.12rem;
  }

  .banner {
    position: absolute;
    top: 7.52rem;
    left: -6.08rem;
    width: 6.08rem;
    height: 1.04rem;
  }

  .fadein_animation {
    animation: fadein 7.5s;
  }


  @keyframes fadein {
    0% {
      left: -6.08rem;
    }

    20% {
      left: 0rem;
    }

    40% {
      left: 0rem;
    }

    60% {
      left: 0rem;
    }

    80% {
      left: 0rem;
    }

    100% {
      left: -6.08rem;
    }

  }




  .music {
    width: 7.02rem;
    height: 2.48rem;
  }

  .textbj {
    width: 7.5rem;
    height: 4.42rem;
    margin-top: -2.5rem;
  }

  .card {
    width: 7.02rem;
    height: 3.77rem;
    // margin-top: 4rem;
  }

  .bottom-container {
    width: 7.02rem;
    height: calc(100vh - 9rem);


    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top {
      display: flex;

      height: 100%;
      max-height: calc(100vh - 8rem);

      .left {
        width: 5.24rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        max-height: calc(100vh - 8rem);

        .item {
          width: 5.24rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.26rem;
          padding: 0.16rem;
          font-weight: 400;
          font-size: 0.26rem;
          color: #fff;
          line-height: 0.3rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-bottom: 0.12rem;

          span {
            color: #6CE0FF;
          }
        }


      }

      .right {
        display: flex;
        flex-direction: column;
        margin-left: 0.3rem;
        justify-content: flex-end;

        img {
          width: 1.48rem;
          height: 1.26rem;
          align-self: flex-end;
        }

        .btn {
          width: 1.48rem;
          height: 0.56rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.16rem;
          // padding: 0.15rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.24rem;
          color: #FFFFFF;
          line-height: 0.24rem;

          img {
            width: 0.22rem;
            height: 0.22rem;
            margin-bottom: 0.15rem;
          }
        }
      }

    }

    .bottom {
      width: 7.02rem;
      height: 0.76rem;
    }
  }


  .item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;

    .info-item {
      width: 6.7rem;
      height: 1.05rem;
      margin-bottom: 0.2rem;
      border-radius: 0.24rem;
      background: #F6F7F8;
      padding: 0.3rem;
      line-height: 0.82rem;
      overflow: hidden;
      // border: 1px solid red;
      align-items: center;
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: 0.3rem;
      color: #07060F;
      line-height: 0.48rem;
      text-align: justify;
      font-style: normal;

      .left {
        display: flex;
        margin-top: 0.1rem;
      }

      .input-container {
        flex: auto;
        height: 0.92rem;
        // background-color: #fff;
        border-radius: 0.12rem;
        display: flex;
        box-sizing: border-box;
        padding: 0.06rem;
        align-items: center;

        input {
          // width: 100%;
          width: 3.2rem;
          font-size: 0.3rem;
          line-height: 0.42rem;
          outline: none;
          border: none;
          background-color: transparent;
          padding: 0;
          // margin: 0 0.3rem;

          &::input-placeholder {
            color: rgba(51, 51, 51, 0.5);
          }

          &::-webkit-input-placeholder {
            color: rgba(51, 51, 51, 0.5);
          }

          &::-moz-placeholder {
            color: rgba(51, 51, 51, 0.5);
          }

          &::-moz-placeholder {
            color: rgba(51, 51, 51, 0.5);
          }

          &::-ms-input-placeholder {
            color: rgba(51, 51, 51, 0.5);
          }
        }
      }

      .sex-container {
        display: flex;
        width: 5rem;
        height: 0.6rem;
        margin-top: 0.1rem;

        .unselect {
          width: 1.08rem;
          height: 0.65rem;
          background: #FFFFFF;
          border-radius: 0.65rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          font-size: 0.3rem;
          color: #ABADB4;
          line-height: 0.45rem;
          text-align: left;
          font-style: normal;
          text-transform: none;

        }

        .select {
          width: 1.08rem;
          height: 0.65rem;
          background: #6677FF;
          border-radius: 0.65rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          font-size: 0.3rem;
          color: #FFFFFF;
          line-height: 0.45rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        img {
          width: 1.7rem;
          height: 0.6rem;
        }
      }

      .birth-container {
        margin-right: 0.13rem;
        display: flex;
        width: 0.46rem;
        height: 0.46rem;
        margin-top: 0.1rem;

        img {
          width: 0.46rem;
          height: 0.46rem;
        }
      }
    }
  }




  .btn {
    display: flex;
    margin: auto;
    margin-top: 0.4rem;
    width: 5.9rem;
    height: 0.92rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, rgba(251, 76, 146, 0.4) 0%, rgba(255, 90, 79, 0.4) 100%);
    border-radius: 1rem;
    font-weight: 600;
    font-size: 0.32rem;
    color: #FFFFFF;
    line-height: 0.32rem;
  }

  .btn-check {
    background: linear-gradient(90deg, #FB4C92 0%, #FF5A4F 100%);
  }

  .info-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #95979F;
    font-size: 0.22rem;
    line-height: 0.3rem;
    margin-top: 0.3rem;

    img {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.12rem;
    }

    span {
      color: #F8446A;
    }
  }

















  .info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 7.1rem;
    // height: 6.34rem;
    margin-top: 8rem;



    .info-content {
      // background: url('../../../assets/img/emotion_remarriage/xinxi_img_bj_zhong.webp') no-repeat;
      background-size: cover;
      width: 7.1rem;
      // height: 4.54rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.34rem 0.4rem;
      height: 5.4rem;
      background-color: #FFF3F3;
      border-radius: 0.3rem;
      border: 0.06rem solid #FFBBBB;

      .title {
        width: 6.1rem;
        height: 0.7rem;
        display: flex;

        img {
          width: 6.1rem;
          height: 0.7rem;
        }
      }

      // .item-container {
      //   display: flex;
      //   flex-direction: column;
      //   align-items: center;
      //   margin-top: 0.2rem;

      //   .info-item {
      //     width: 6.3rem;
      //     height: 0.82rem;
      //     line-height: 0.82rem;
      //     overflow: hidden;
      //     // border: 1px solid red;
      //     align-items: center;
      //     display: flex;
      //     justify-content: space-between;
      //     font-weight: 400;
      //     font-size: 0.32rem;
      //     color: #3A0922;
      //     line-height: 0.48rem;
      //     text-align: justify;
      //     font-style: normal;

      //     .left {
      //       display: flex;
      //       margin-top: 0.1rem;
      //     }

      //     .input-container {
      //       flex: auto;
      //       height: 0.92rem;
      //       // background-color: #fff;
      //       border-radius: 0.12rem;
      //       display: flex;
      //       box-sizing: border-box;
      //       padding: 0.06rem;
      //       align-items: center;

      //       input {
      //         // width: 100%;
      //         width: 3.2rem;
      //         font-size: 0.3rem;
      //         line-height: 0.42rem;
      //         outline: none;
      //         border: none;
      //         background-color: transparent;
      //         padding: 0;
      //         // margin: 0 0.3rem;

      //         &::input-placeholder {
      //           color: rgba(51, 51, 51, 0.5);
      //         }

      //         &::-webkit-input-placeholder {
      //           color: rgba(51, 51, 51, 0.5);
      //         }

      //         &::-moz-placeholder {
      //           color: rgba(51, 51, 51, 0.5);
      //         }

      //         &::-moz-placeholder {
      //           color: rgba(51, 51, 51, 0.5);
      //         }

      //         &::-ms-input-placeholder {
      //           color: rgba(51, 51, 51, 0.5);
      //         }
      //       }
      //     }

      //     .sex-container {
      //       display: flex;
      //       width: 1.7rem;
      //       height: 0.6rem;
      //       margin-top: 0.1rem;

      //       img {
      //         width: 1.7rem;
      //         height: 0.6rem;
      //       }
      //     }

      //     .birth-container {
      //       margin-right: 0.13rem;
      //       display: flex;
      //       width: 0.46rem;
      //       height: 0.46rem;
      //       margin-top: 0.1rem;

      //       img {
      //         width: 0.46rem;
      //         height: 0.46rem;
      //       }
      //     }
      //   }
      // }



      // .btn {
      //   display: flex;
      //   margin-top: 0.4rem;
      //   width: 5.9rem;
      //   height: 0.92rem;

      //   img {
      //     width: 5.9rem;
      //     height: 0.92rem;
      //   }
      // }

      .info-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #95979F;
        font-size: 0.22rem;
        line-height: 0.3rem;
        margin-top: 0.3rem;

        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.12rem;
        }

        span {
          color: rgba(202, 134, 23, 1);
        }
      }
    }

    .info-height {
      // height: 5.4rem;
    }

  }





  // .card {
  //   width: 7.1rem;
  //   // margin-bottom: 0.36rem;
  //   margin-top: 0.24rem;
  // }
}

// .mt-180 {
//   margin-top: 0.24rem;
// }

.divider-line {
  width: 6.5rem;
  height: 0.02rem;
  background: #F9E6E6;
  margin-top: 0.12rem;
}

.footer {
  width: 100%;
  height: 1rem;
}

.fix-btn {
  object-fit: contain;
  width: 5.8rem;
  height: 1.34rem;
  position: fixed;
  bottom: 0.2rem;
  z-index: 99;

  // animation: scaleBtn 1s infinite ease-in-out alternate;
}

.order-icon {
  position: fixed;
  right: 0;
  top: 3rem;
  width: 0.44rem;
  height: 1.5rem;
  z-index: 100;
}

.card-box {
  width: 7.06rem;
  height: 4.68rem;
  background: url('../../../assets/img/emotion/new/result_card2.webp') no-repeat;
  background-size: contain;
  margin-bottom: 0.2rem;

  #qian {
    width: 100%;
    height: 100%;
  }
}

.footer-box {
  width: 7.5rem;
  height: 1.6rem;
}

.ab-footer {
  position: fixed;
  background: #000;
  opacity: 0.5;
  width: 100%;
  height: 2.8rem;
  z-index: 1;
  bottom: 0;
}

.back-box {
  position: absolute;
  top: 0.5rem;
  left: 0.2rem;
  width: 1.32rem;
  height: 0.6rem;
  background: url('../../../assets/img/common/baogao_img_btnbj.webp') no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  font-weight: 500;
  font-size: 0.28rem;
  color: #ffffff;

  .left {
    margin-right: 0.08rem;
    width: 0.32rem;
    height: 0.32rem;
  }
}

.back-box-combo {
  top: 0.4rem;
}

@keyframes emoBtn {
  0% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1.1);
  }
}

.emo-btn {
  animation: emoBtn 1s infinite ease-in-out alternate;
}
</style>
