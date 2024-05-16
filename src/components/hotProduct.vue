<template>
  <div class="hot-main">
    <div class="header-box">
      <img :src="is_cn ? cn_title : tw_title" class="title" alt="" />
    </div>
    <div class="list">
      <div
        v-for="(item, k) in show_list"
        :key="k"
        @click="jumpPage(item)"
        class="item"
      >
        <img :src="is_cn ? item.zh_icon : item.tw_icon" class="icon" alt="" />
        <div class="right">
          <div class="name">{{ is_cn ? item.name : item.name }}</div>
          <div class="desc" style="-webkit-box-orient: vertical">
            {{ is_cn ? item.cn_desc : item.tw_desc }}
          </div>
          <div class="buy">
            <div>
              <span class="num">{{ item.buy_num }}</span>
              <span> {{ str_list1[lang] }}</span>
            </div>
            <div class="ml-40">
              <span class="num">{{ item.review_num }}</span>
              <span> {{ str_list2[lang] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cn_bzhh from '../assets/img/common/small/h5_fang_jian_bazihehun.png';
import cn_emotion from '../assets/img/common/small/h5_fang_jian_ganqing.png';
import cn_career from '../assets/img/common/small/h5_fang_jian_shiye.png';
import cn_wealth from '../assets/img/common/small/h5_fang_jian_caiyun.png';
import cn_year from '../assets/img/common/small/h5_fang_jian_nianyun.png';
import cn_weight from '../assets/img/common/small/h5_fang_jian_yuantiangang.png';
import cn_ggz from '../assets/img/common/small/h5_fang_jian_guiguzi.png';

import tw_bzhh from '../assets/img/common/small/h5_fang_fan_bazihhehun.png';
import tw_emotion from '../assets/img/common/small/h5_fang_fan_ganqing.png';
import tw_career from '../assets/img/common/small/h5_fang_fan_shiye.png';
import tw_wealth from '../assets/img/common/small/h5_fang_fan_caiyun.png';
import tw_year from '../assets/img/common/small/h5_fang_fan_nianyun.png';
import tw_weight from '../assets/img/common/small/h5_fang_fan_yuantiangang.png';
import tw_ggz from '../assets/img/common/small/h5_fang_fan_guiguzi.png';

import cn_title from '../assets/img/common/ganqing_tittle_baokuan_jian.png';
import tw_title from '../assets/img/common/ganqing_tittle_baokuan_fan.png';
import utils from '../libs/utils';

const all_list = [
  {
    id: 7,
    name: '八字合婚',
    cn_desc: '揭示姻缘宿命，戒备潜藏危机，慎选伴侣之道',
    tw_desc: '揭示姻緣宿命，戒備潛藏危機，慎選伴侶之道',
    url: 'marriage_measure_overseas',
    zh_icon: cn_bzhh,
    tw_icon: tw_bzhh,
    buy_num: '6324',
    review_num: '6185',
    e_id: '-10007',
    e_name: 'click_report_marriage',
    ad_e: '8g4xt8',
    report_id: '60005',
  },
  {
    id: 4,
    name: '24年感情运',
    cn_desc: '感情运势早知道，和合美满还是遗憾分手',
    tw_desc: '感情運勢早知道，和合美滿還是遺憾分手',
    url: 'emotion_fortune',
    zh_icon: cn_emotion,
    tw_icon: tw_emotion,
    buy_num: '3492',
    review_num: '3441',
    e_id: '-10006',
    e_name: 'click_report_2024lovely',
    ad_e: 'efy9t0',
    report_id: '60010',
  },
  {
    id: 3,
    name: '24年年运',
    cn_desc: '你的2024年如何度过？大师为你解读年度运势',
    tw_desc: '你的2024年如何度過？大師為你解讀年度運勢',
    url: 'year_of_lucky_2024',
    zh_icon: cn_year,
    tw_icon: tw_year,
    buy_num: '8321',
    review_num: '8238',
    is_big: true,
    e_id: '-10003',
    e_name: 'click_report_2024report',
    ad_e: 'oqfzzs',
    report_id: '60009',
  },
  {
    id: 6,
    name: '24年财运',
    cn_desc: '预警财务危机，洞悉关键时刻，避免潜在财富风险。',
    tw_desc: '預警財務危機，洞悉關鍵時刻，避免潛在財富風險。',
    url: 'lucky_year_report',
    zh_icon: cn_wealth,
    tw_icon: tw_wealth,
    buy_num: '7315',
    review_num: '7044',
    e_id: '-10005',
    e_name: 'click_report_2024wealty',
    ad_e: 'egm8a2',
    report_id: '60001',
  },
  {
    id: 5,
    name: '24年事业运',
    cn_desc: '前途迷雾重重，挑战接踵而至，开创事业新章',
    tw_desc: '前途迷霧重重，挑戰接踵而至，開創事業新章',
    url: 'career_fortune_2024',
    zh_icon: cn_career,
    tw_icon: tw_career,
    buy_num: '8314',
    review_num: '8090',
    e_id: '-10004',
    e_name: 'click_report_2024career',
    ad_e: 'tzsnzi',
    report_id: '60011',
  },
  {
    id: 2,
    name: '鬼谷子',
    cn_desc: '64卦预见人生，审慎应对风波，谨防危机潜伏',
    tw_desc: '64卦預見人生，審慎應對風波，謹防危機潛伏',
    url: 'guiguzi_fortune',
    zh_icon: cn_ggz,
    tw_icon: tw_ggz,
    buy_num: '9522',
    review_num: '9277',
    e_id: '-10008',
    e_name: 'click_report_64gua',
    ad_e: 'jd4oen',
    report_id: '60003',
  },
  {
    id: 1,
    name: '袁天罡',
    cn_desc: '称骨论命，揭露宿命重负，应对多舛命途',
    tw_desc: '稱骨論命，揭露宿命重負，應對多舛命途',
    url: 'weigh_bone',
    zh_icon: cn_weight,
    tw_icon: tw_weight,
    buy_num: '6752',
    review_num: '6518',
    e_id: '-10009',
    e_name: 'click_report_chenggu',
    ad_e: 'kajqs3',
    report_id: '60002',
  },
];

const str_list1 = {
  'zh-CN': '人已购买',
  'zh-TW': '人已購買',
};
const str_list2 = {
  'zh-CN': '好评',
  'zh-TW': '好評',
};
export default {
  name: 'HotProduct',
  props: {
    product_key: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cn_title,
      tw_title,
      str_list1,
      str_list2,
      lang: utils.getLanguage(),
    };
  },
  computed: {
    show_list() {
      return all_list.filter(item => item.url !== this.url);
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  methods: {
    // Your methods go here
    jumpPage(item) {
      location.href = item.url + '.html';
    },
  },
  mounted() {
    console.log(this.show_list);
    // Code to run when the component is mounted goes here
  },
};
</script>

<style scoped lang="less">
.hot-main {
  width: 7.1rem;
  min-height: 16.03rem;
  background: #fff9fc;
  border-radius: 0.2rem;
  margin: 0.1rem auto 1.96rem;
  .header-box {
    width: 7.1rem;
    height: 1.1rem;
    background: #f96cb7;
    border-radius: 0.2rem 0.2rem 0 0;
    border: 0.04rem solid #fff9fc;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      width: 3.1rem;
      height: 0.78rem;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6.62rem;
    margin: 0.24rem auto;
    .item {
      display: flex;
      border-bottom: 1px solid rgb(0 0 0 / 10%);

      padding-bottom: 0.24rem;
      margin-bottom: 0.24rem;
      .icon {
        width: 2rem;
        height: 2rem;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        margin-left: 0.24rem;
        .name {
          font-size: 0.36rem;
          color: #040404;
          height: 0.36rem;
          line-height: 0.36rem;
          font-weight: 700;
        }
        .desc {
          font-size: 0.3rem;
          line-height: 0.4rem;
          color: #4e4e4e;
          .hidden-2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            word-break: break-all;
            word-wrap: break-word;
            -webkit-box-orient: vertical;
          }
        }
        .buy {
          display: flex;
          height: 0.28rem;
          font-weight: 400;
          font-size: 0.28rem;
          line-height: 0.28rem;
          color: #999;
          align-items: center;
          div {
            white-space: nowrap;
            line-height: 0.28rem;
            height: 0.28rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            span {
              line-height: 0.28rem;
              height: 0.28rem;
            }
          }
          .num {
            color: #e3453d;
          }
        }
      }
    }
    .item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
}

.ml-40 {
  margin-left: 0.4rem;
}

/* Your component-specific styles go here */
</style>
