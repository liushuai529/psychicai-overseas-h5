<template>
  <div class="piece-box new-pay-box">
    <div class="title-box">
      <img :src="title_index === 55 ? title_55 : title_url" />
    </div>
    <div class="top-one"></div>
    <div class="center-one">
      <div v-if="title_index === 1" class="box-1">
        <div v-if="result.fang_wei" class="common-one left-box">
          <div class="title">开运方位</div>
          <img :src="getDirection(result.fang_wei)" class="icon" alt="" />
          <div class="direction">
            {{ result.fang_wei }}
          </div>
        </div>
        <div v-if="result.zhi_nan_meta.decoration" class="common-one right-box">
          <div class="title">幸运饰品</div>
          <img :src="getBaoshi(result.zhi_nan_meta)" class="icon" alt="" />
          <div class="direction">
            {{ result.zhi_nan_meta.decoration }}
          </div>
        </div>
      </div>
      <!-- 开运指南 -->
      <div v-else-if="title_index === 2" class="box-2">
        {{ result.zhi_nan }}
      </div>
      <!-- 太岁值守 -->
      <div v-else-if="title_index === 3" class="box-2">
        {{ result.tai_sui }}
      </div>
      <!-- 事业运解析 -->
      <div v-else-if="title_index === 4" class="box-2 box-4">
        <div class="year-title">
          {{ result.ding_yu }}
        </div>
        <div>
          {{ result.ding_yu_desc }}
        </div>
        <!-- 职场发展 -->
        <img
          v-if="result.work_fa_zhan"
          :src="is_cn ? cn_title_8 : tw_title_8"
          class="work-title"
          alt=""
        />
        <div v-if="result.work_fa_zhan">
          {{ result.work_fa_zhan }}
        </div>
        <!-- 职场关系 -->
        <img
          v-if="result.work_guan_xi"
          :src="is_cn ? cn_title_5 : tw_title_5"
          class="work-title"
          alt=""
        />
        <div v-if="result.work_guan_xi">
          {{ result.work_guan_xi }}
        </div>
        <!-- 机遇与挑战 -->
        <img
          v-if="result.challenge.length"
          :src="is_cn ? cn_title_6 : tw_title_6"
          class="work-title"
          alt=""
        />
        <div v-if="result.challenge.length">
          <div v-if="isString(result.challenge)">
            {{ result.challenge }}
          </div>
          <div v-else v-for="(it, k) in result.challenge">
            {{ it }}
          </div>
        </div>
        <!-- 季度提示 -->
        <div v-if="result.season_tip" class="flex-box">
          <img :src="title_7" class="work-title" alt="" />
          <img :src="spring" class="season" alt="" />
          <div>{{ result.season_tip.spring }}</div>
          <img :src="summer" class="season" alt="" />
          <div>{{ result.season_tip.summer }}</div>
          <img :src="autumn" class="season" alt="" />
          <div>{{ result.season_tip.autumn }}</div>
          <img :src="winter" class="season" alt="" />
          <div>{{ result.season_tip.winter }}</div>
        </div>
      </div>
      <CopyCode
        v-else
        tips1_color="#B2663E"
        code_color="#B2663E"
        :transfer_code="result.transfer_code"
        codeClass="career-code"
        :code_btn="is_cn ? cn_code_btn : tw_code_btn"
        code_text_style="margin:.3rem auto .39rem;color:#6E6E6E"
        @showModal="code_modal = true"
      />
    </div>

    <div class="bottom-one"></div>
    <CodePop v-if="code_modal" :is_report="true" @close="code_modal = false" />
  </div>
</template>

<script>
import cn_title_1 from '../../../assets/img/mlxz/career_2024/result/title-4.png';
import cn_title_2 from '../../../assets/img/mlxz/career_2024/result/title-1.png';
import cn_title_3 from '../../../assets/img/mlxz/career_2024/result/title-2.png';
import cn_title_4 from '../../../assets/img/mlxz/career_2024/result/title-3.png';
import title_55 from '../../../assets/img/mlxz/career_2024/result/yu_img_title.png';

import cn_title_5 from '../../../assets/img/mlxz/career_2024/result/title-5.png';
import cn_title_6 from '../../../assets/img/mlxz/career_2024/result/title-6.png';
import title_7 from '../../../assets/img/mlxz/career_2024/result/title-7.png';
import cn_title_8 from '../../../assets/img/mlxz/career_2024/result/title-8.png';

import spring from '../../../assets/img/mlxz/career_2024/result/result_siji_chun.png';
import summer from '../../../assets/img/mlxz/career_2024/result/result_siji_xia.png';
import autumn from '../../../assets/img/mlxz/career_2024/result/result_siji_qiu.png';
import winter from '../../../assets/img/mlxz/career_2024/result/result_siji_dong.png';

import directionIcon1 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_1@3x.png';
import directionIcon2 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_2@3x.png';
import directionIcon3 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_3@3x.png';
import directionIcon4 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_4@3x.png';
import directionIcon5 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_5@3x.png';
import directionIcon6 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_6@3x.png';
import directionIcon7 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_7@3x.png';
import directionIcon8 from './../../../assets/img/mlxz/year_of_lucky_2024/yun_location_yell_8@3x.png';
import { color_enums, icon_enums, commonBaoshi } from '../../../libs/enum';
import utils from '../../../libs/utils';
import CodePop from '../../../components/CodePop.vue';
import { Toast } from 'vant';
import CopyCode from '../../../components/CopyCode.vue';
import tw_title_3 from '../../../assets/img/tw_mlxz/career_24/result/taisui.png';
import tw_title_4 from '../../../assets/img/tw_mlxz/career_24/result/shiyejiexi.png';
import tw_title_1 from '../../../assets/img/tw_mlxz/career_24/result/shiyefangwei.png';
import tw_title_2 from '../../../assets/img/tw_mlxz/career_24/result/kaiyunzhinan.png';
import tw_title_5 from '../../../assets/img/tw_mlxz/career_24/result/zcgx.png';
import tw_title_6 from '../../../assets/img/tw_mlxz/career_24/result/jyytz.png';
import tw_title_8 from '../../../assets/img/tw_mlxz/career_24/result/zcfz.png';
import tw_code_btn from '../../../assets/img/mlxz/downloadBtn/tw/career24.png';

export default {
  props: ['result', 'title_index'],
  data() {
    return {
      cn_title_1,
      cn_title_2,
      cn_title_3,
      cn_title_4,
      tw_title_1,
      tw_title_2,
      tw_title_3,
      tw_title_4,
      cn_title_5,
      cn_title_6,
      title_7,
      cn_title_8,
      tw_title_5,
      tw_title_6,
      tw_title_8,
      title_55,
      direction_arr: [
        {
          k: '北方',
          v: directionIcon1,
        },
        {
          k: '东北方',
          v: directionIcon2,
        },
        {
          k: '東北方',
          v: directionIcon2,
        },
        {
          k: '东方',
          v: directionIcon3,
        },
        {
          k: '東方',
          v: directionIcon3,
        },
        {
          k: '东南方',
          v: directionIcon4,
        },
        {
          k: '東南方',
          v: directionIcon4,
        },
        {
          k: '南方',
          v: directionIcon5,
        },
        {
          k: '西南方',
          v: directionIcon6,
        },
        {
          k: '西方',
          v: directionIcon7,
        },
        {
          k: '西北方',
          v: directionIcon8,
        },
      ],
      spring,
      summer,
      autumn,
      winter,
      code_modal: false,
      cn_code_btn:
        'https://psychicai-static.psychicai.pro/imgs/24044123cda1be5c49dc9a84cf88643865d8.png',
      tw_code_btn,
    };
  },
  components: { CodePop, CopyCode },
  computed: {
    title_url() {
      return this[
        (utils.getLanguage() === 'zh-CN' ? 'cn' : 'tw') +
          '_title_' +
          this.title_index
      ];
    },
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    /**
     * @description: 字符串判断
     * @param {*} val
     * @return {*}
     */
    isString(val) {
      return typeof val === 'string';
    },

    /**
     * @description: 获取宝石颜色
     * @param {*} val
     * @return {*}
     */
    getBaoshi(item) {
      let val = item.decoration;
      if (!val) return;
      if (
        [
          '祖母绿',
          '绿松石',
          '绿碧玺',
          '橄榄石',
          '缅甸玉',
          '沙弗莱',
          '帕拉伊巴',
          '祖母綠',
          '綠松石',
          '綠碧璽',
          '橄欖石',
          '緬甸玉',
          '沙弗萊',
        ].includes(val)
      ) {
        return commonBaoshi[9001];
      } else if (
        [
          '红碧玺',
          '红玛瑙',
          '石榴石',
          '红碧玺',
          '红玉髓',
          '血珀',
          '南红',
          '紅碧璽',
          '紅瑪瑙',
          '紅碧璽',
          '紅玉髓',
          '南紅',
        ].includes(val)
      ) {
        return commonBaoshi[9002];
      } else if (
        [
          '黄碧玺',
          '黄水晶',
          '蜜蜡',
          '黄宝石',
          '菩提子',
          '紫檀手串',
          '黄花梨手串',
          '黃碧璽',
          '黃水晶',
          '蜜蠟',
          '黃寶石',
          '黃花梨手串',
        ].includes(val)
      ) {
        return commonBaoshi[9003];
      } else if (
        [
          '银手镯',
          '白玛瑙',
          '珍珠耳环',
          '黄金手镯',
          '黄金戒指',
          '琉璃手串',
          '珍珠手链',
          '銀手鐲',
          '白瑪瑙',
          '珍珠耳環',
          '黃金手鐲',
          '黃金戒指',
          '珍珠手鏈',
        ].includes(val)
      ) {
        return commonBaoshi[9013];
      } else {
        return commonBaoshi[9102];
      }
    },
    /**
     * @description: 获取开运方位图标
     * @param {*} val
     * @return {*}
     */
    getDirection(val) {
      if (!val) return;
      return this.direction_arr.find(it => it.k === val).v;
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
  margin-bottom: 0.2rem;
  font-family: PingFangSC, PingFang SC;
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
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_top.png')
      no-repeat;
    background-size: 100% 100%;
    margin-bottom: -0.2rem;
  }
  .center-one {
    width: 100%;
    min-height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_mid.png')
      no-repeat;
    background-size: 100% 100%;
    margin-top: -0.02rem;
    position: relative;
    z-index: 100;
    padding-bottom: 0.3rem;
  }
  .bottom-one {
    width: 100%;
    height: 1.2rem;
    background: url('../../../assets/img/mlxz/career_2024/detail/img_kuang_bot.png')
      no-repeat;
    background-size: 100% 100%;
    margin-top: -1rem;
    margin-bottom: 0.2rem;
    position: relative;
    z-index: 1;
  }
}
.box-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  .common-one {
    width: 3rem;
    height: 2.18rem;
    background: url('../../../assets/img/mlxz/career_2024/result/result_img_kuang.png')
      no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 0.15rem;
    .title {
      height: 0.26rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #666666;
      line-height: 0.26rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .icon {
      width: 0.72rem;
      height: 0.72rem;
      margin-top: 0.2rem;
    }
    .direction {
      height: 0.28rem;
      font-size: 0.28rem;
      font-weight: 600;
      color: #333333;
      line-height: 0.28rem;
      margin-top: 0.16rem;
    }
  }
}
.box-2 {
  font-size: 0.28rem;
  font-weight: 500;
  color: #4b2628;
  line-height: 0.4rem;
  margin: -0.2rem 0.4rem 0;
}

.box-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  .year-title {
    width: 5rem;
    height: 1.4rem;
    background: url('../../../assets/img/mlxz/career_2024/result/year-kuang.png')
      no-repeat;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.4rem;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 600;
    color: #a22428;
    line-height: 0.6rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
}
.season {
  width: 1rem;
  height: 1rem;
  margin: 0.2rem auto;
}
.work-title {
  width: 4.2rem;
  height: 0.72rem;
  margin: 0.4rem auto 0.2rem;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.mt-0 {
  margin-top: 0 !important;
}
.mt-20 {
  margin-top: 0.2rem !important;
}

.card-5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
  font-size: 0.28rem;
  color: #b2663e;
  .title-1 {
    width: 3.64rem;
    height: 0.81rem;
    margin: 0.4rem auto 0.5rem;
  }
  .title-2 {
    width: 3.05rem;
    height: 0.82rem;
    margin: 0 auto 0.32rem;
  }
  .title-3 {
    width: 5.12rem;
    height: 1rem;
    margin-top: 0.5rem;
  }
  .code {
    width: 5.56rem;
    height: 1.04rem;
    background: url('../../../assets/img/mlxz/career_2024/result/img_shibiema_card.png')
      no-repeat;
    background-size: contain;
    margin-top: 0.4rem;
    color: #b2663e;
    font-weight: 600;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    span {
      margin-left: 0.1rem;
      text-decoration: underline;
    }
  }
  .desc {
    margin-bottom: 0.2rem;
    color: #333;
    font-size: 0.24rem;
    opacity: 0.6;
  }
}
</style>
