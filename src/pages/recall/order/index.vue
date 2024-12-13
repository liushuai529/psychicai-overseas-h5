<template>
  <div>
    <div v-if="head_url" class="head" @click="downApp(0)">
      <img :src="head_url" class="head" />
    </div>
    <div :class="['result', is_cn ? 'cn-bg' : 'tw-bg']">


      <div class="info-box">
        <div class="card">
          <img :src="is_cn ? home_img_tittle_xinxi_cn_1x : home_img_tittle_xinxi_tw_1x" />
          <UserInfo :username=username :sex=sex :gongli_nongli=gongli_nongli :picker_date_yangli=picker_date_yangli
            :picker_date_nongli=picker_date_nongli :gan="gan" :zhi="zhi" :nayin="nayin" :cai_bo_num="cai_bo_num"
            :gui_ren_num="gui_ren_num" :hun_yin_num="hun_yin_num" :ming_ge="ming_ge" :riyuanqiangruo="riyuanqiangruo"
            :shi_ye_num="shi_ye_num" :wuxingqiang="wuxingqiang" :is_result="true" :is_exp="true" />
        </div>
      </div>

      <contentDetail v-if="fortune.whole2024" :result="fortune" :item_index="1" />
      <contentDetail v-if="fortune.guide2024direction" :result="fortune" :baoshi_icon="baoshi_icon" :item_index="2" />
      <contentDetail v-if="fortune.xinggedesc" :result="fortune" :item_index="3" />
      <contentDetail v-if="fortune.taisuititle" :result="fortune" :item_index="4" />
      <!--年度事业分析-->
      <contentDetail v-if="fortune.career2024" :result="fortune.career2024" :item_index="5" />
      <!--年度财运分析-->
      <contentDetail v-if="fortune.wealth2024" :result="fortune.wealth2024" :item_index="6" />
      <!--年度感情分析-->
      <contentDetail v-if="fortune.emotion2024" :result="fortune.emotion2024" :item_index="7" />
      <!--年度健康提示-->
      <contentDetail v-if="fortune.health2024" :result="fortune.health2024" :item_index="8" />
      <!--特别提示-->
      <contentDetail v-if="fortune.gold2024content" :result="fortune.gold2024content" :item_index="9" />
      <!--每月运势-->
      <contentDetail style="margin-bottom: 2rem;" v-if="fortune.scores2024" :result="fortune"
        :content_arr="fortune.scores2024content" :item_index="10" />
      <div class="btn-modal" @click="downApp(1)">
        <img :src="bottom_url" />
      </div>

    </div>
  </div>

</template>

<script>
import contentDetail from './content_detail.vue';
import utils from '../../../libs/utils.js';
import UserInfo from '../detail/user_info.vue';
import CodePop from '../../../components/CodePop.vue';
import CopyCode from '../../../components/CopyCode.vue';
import home_img_tittle_xinxi_cn_1x from './../../../assets/img/year_of_lucky_2025/cn/home_img_tittle_xinxi_cn_1x.webp';
import home_img_tittle_xinxi_tw_1x from './../../../assets/img/year_of_lucky_2025/tw/home_img_tittle_xinxi_tw_1x.webp';
import img_top_freebtn_malaysia_cn from './../../../assets/img/recall/cn/img_top_freebtn_malaysia_cn.webp';
import img_top_freebtn_taiwan_cn from './../../../assets/img/recall/cn/img_top_freebtn_taiwan_cn.webp';
import img_top_freebtn_hongkong_cn from './../../../assets/img/recall/cn/img_top_freebtn_hongkong_cn.webp';
import img_top_freebtn_singapore_cn from './../../../assets/img/recall/cn/img_top_freebtn_singapore_cn.webp';
import btn_backapp_cn from './../../../assets/img/recall/cn/btn_backapp_cn.webp';
import img_top_freebtn_malaysia_tw from './../../../assets/img/recall/tw/img_top_freebtn_malaysia_tw.webp';
import img_top_freebtn_taiwan_tw from './../../../assets/img/recall/tw/img_top_freebtn_taiwan_tw.webp';
import img_top_freebtn_hongkong_tw from './../../../assets/img/recall/tw/img_top_freebtn_hongkong_tw.webp';
import img_top_freebtn_singapore_tw from './../../../assets/img/recall/tw/img_top_freebtn_singapore_tw.webp';
import btn_backapp_tw from './../../../assets/img/recall/tw/btn_backapp_tw.webp';
export default {
  components: { contentDetail, UserInfo, CodePop, CopyCode, },
  data() {
    return {
      img_top_freebtn_hongkong_cn,
      img_top_freebtn_singapore_cn,
      img_top_freebtn_hongkong_tw,
      img_top_freebtn_singapore_tw,
      btn_backapp_cn,
      btn_backapp_tw,
      img_top_freebtn_malaysia_cn,
      img_top_freebtn_taiwan_cn,
      img_top_freebtn_malaysia_tw,
      img_top_freebtn_taiwan_tw,
      home_img_tittle_xinxi_cn_1x,
      home_img_tittle_xinxi_tw_1x,
      loading: false,
      hasData: false,
      "fortune": {
        "gejuall": "你为人端庄，行事正直，外表较严肃，对人讲信用诚信，作风较温和，易得人敬重信任。做事情喜欢缓慢进行，安于本位，不会随便擅离职守，重视现实生活。不足之处是，常常会因为过于保守及优柔寡断，临事犹豫不决，错失良机。",
        "nianscore": 50,
        "guide2024direction": "东方",
        "guide2024color": "褐色",
        "guide2024decoration": "黄水晶",
        "guide2024decorationkey": "Citrine",
        "taisuititle": "生肖虎-害太岁",
        "taisuidesc": "25年你害太岁，建议小心谨慎为宜，低调做人做事。\n首先，要注意身体健康或亲朋好友可能会有人生病，也需要注意交通出行安全，开车要保持良好心态，不可较劲儿冲动；其次，要小心被他人误解或陷害，或者有被朋友出卖、与人合作破财等情况出现；最后，遇见看起来很不错的机会要三思，避免上当受骗。",
        "gold2024": "交际",
        "gold2024content": "25年你可能会想在学业或技能方面有一定的提升，你也会遇到良师给你一定的帮助和指导，要抓住机会和贵人。25年你可能会在心理、命理、玄学方面有更多的兴趣，也有可能会花时间对此深究，学有所成。25年你在感情上会有比较丰富的体验，单身的话你会有机会遇到愿意共度一生的人，但非单身的要多关注家庭，避免烂桃花。",
        "whole2024": "25年你作为坚实可靠的代表，将迎来充满机遇和挑战的一年，你会有更多发展机会和变革可能，整体运势方面有望在事业和财富领域获得稳步发展。乙木和巳火的搭配为你注入了更多活力和灵感，适合尝试新的项目和方向，拓展人际关系，开拓海外事业，或者移居海外，实现事业上的突破或人生的新开始。通过细心规划和坚定执行，你可以取得实质性进展，获取更多的人生收益和财富回报。",
        "career2024": "25年对你来说事业上容易遇到不错的机遇，这些可能是赏识你的上司或者长辈提供给你的，但是很可惜的是，你可能会由于自身能力或者学识等多方面问题导致你判断失误，错失机会，所以你需要注重不断提升自身学识或专业技能；或者也有可能是因为抓住机会后需要你承担过多的责任或压力，你产生强烈的逃避想法，如果可以，建议你尽量坚持，努力承担责任，直面压力，会对你的能力和地位有非常大的提升。",
        "wealth2024": "你在过去几年可能经历了财运上的挑战，感觉付出了努力却难以获得相应的回报。然而，在25年情况有望得到显著改善，你可能会遇到一些贵人，他们在事业和财务上会给予你极大支持和帮助。此外，25年也是你事业和财运的转机之年，你可能会发现自己在工作上的表现更加出色，获得晋升或加薪的机会。同时，在投资理财方面，可能也会有不错的收益，但需注意谨慎决策，避免盲目跟风或冲动投资。",
        "emotion2024": "25年对你来说的感情运势相对较好，可能会遇到更多的感情机遇。正官乙木的到来，为你带来了结识新伴侣的可能性，尤其是那些与你性格相投、能够相互理解和支持的异性。非单身的话，感情会比较稳定，你们也会考虑将关系更进一步，比如结婚或做父母。不过尽管你的感情运势较好，但你仍然需要注意自己的沟通表达能力，你需要学会更加开放和坦诚地表达自己的内心感受，以促进与伴侣之间的沟通和理解。",
        "health2024": "25年你要关注身体四肢方面的问题，要注意避免意外受伤、磕碰等情况出现；同时要注意关节炎症或肌肉劳损等问题出现。",
        "scores2024": [
          83,
          32,
          32,
          74,
          62,
          59,
          71,
          44,
          44,
          77,
          41,
          44
        ],
        "scores2024content": [
          {
            "month": 1,
            "score": 83,
            "content": "这个月你会发挥创造力，寻找非传统的解决方案。这种过程不仅锻炼了你的应变能力，还让你发现自己在解决问题方面的潜力。你开始意识到，即使在逆境中，也总有办法找到出路，这种信念将伴随你走过未来的每一个挑战。"
          },
          {
            "month": 2,
            "score": 32,
            "content": "这个月你会感受到前所未有的压力与紧迫感。无论是工作上的挑战、人际关系的紧张，还是生活中的种种不如意，都仿佛汇聚成一股强大的力量，让你感到难以承受。你开始担心自己的能力和应对能力是否足够，未来是否会更加艰难。"
          }
        ],
        "bazi": {
          "wuxingqiang": "木",
          "riyuanqiangruo": "弱",
          "gui_ren_num": 2,
          "hun_yin_num": 5,
          "cai_bo_num": 0,
          "shi_ye_num": 5,
          "tao_hua_num": 6,
          "fuqigong": "平",
          "ming_ge": "正官格",
          "gan": [
            "戊",
            "乙",
            "戊",
            "乙"
          ],
          "zhi": [
            "寅",
            "卯",
            "辰",
            "卯"
          ],
          "nayin": [
            "城头土",
            "大溪水",
            "大林木",
            "大溪水"
          ],
          "yizhu": "\"你为人稳重，性格豁达，贵气天成，处事有分寸，进取心强，精神饱满，充满朝气，善于交际。\n感情方面：你在感情中常常给予对方实质的关心和照顾，也期待对方给予正反馈。\n事业方面：你善于理财，能持续的积蓄财富，一生行运顺畅，衣食无忧。\"",
          "gejujiedu": [
            {
              "key": "all",
              "content": "你为人端庄，行事正直，外表较严肃，对人讲信用诚信，作风较温和，易得人敬重信任。做事情喜欢缓慢进行，安于本位，不会随便擅离职守，重视现实生活。不足之处是，常常会因为过于保守及优柔寡断，临事犹豫不决，错失良机。"
            },
            {
              "key": "love",
              "content": "你对待感情务实有原则，往往是对家庭负责任，用情专一。但建议与伴侣相处时，要懂得沟通，不时制造点浪漫和惊喜，让自己和对方都处在放松的状态中。"
            },
            {
              "key": "cause",
              "content": "你在求学阶段自律且专注能看进去书，往往是学霸级的人物。工作中具有领导管理能力，官运亨通，有社会责任感，爱参与公益活动。"
            }
          ]
        },
        "xinggetitle": "青山碧水承众生——叠峦之土",
        "xinggedesc": "你是戊土日主，戊土为大地之土，包容憨厚，给人信任感，脚踏实地，重视家庭，孝顺有礼。务实理性，尊重规则，也懂得审时度势。你要努力的去发挥自己的好人缘，拓展高质量人脉圈，让自己多些友人助力。也可以通过学习和进修提升自己的思考力和眼界，走向更大的人生舞台。"
      },
      advice: {},
      count: 0,
      status: '',
      is_finish: false,
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '李元彤',
      sex: 0,
      gongli_nongli: 1,
      picker_hour: '',
      picker_date_yangli: '1998-3-22 6时卯',
      picker_date_nongli: '1998年二月廿四 6时卯',
      gan: ['戊', '乙', '戊', '乙'],
      zhi: ['寅', '卯', '辰', '卯'],
      extra_ce_suan: {},
      baoshi_icon: 'https://psychicai-static.psychicai.pro/imgs/2311b8932b4150fc44bb8785ae919f752c23.png',
      nayin: ['城头土', '大溪水', '大林木', '大溪水'],
      cai_bo_num: 0,
      gui_ren_num: 2,
      hun_yin_num: 5,
      ming_ge: '正官格',
      riyuanqiangruo: '弱',
      shi_ye_num: 5,
      wuxingqiang: '木',
      type: '',
      iso_code: '',
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    head_url() {
      if (utils.getLanguage() === 'zh-CN') {
        if (this.iso_code === 'TW') {
          return img_top_freebtn_taiwan_cn;
        } else if (this.iso_code === 'MY') {
          return img_top_freebtn_malaysia_cn;
        } else if (this.iso_code === 'HK') {
          return img_top_freebtn_hongkong_cn;
        } else if (this.iso_code === 'SG') {
          return img_top_freebtn_singapore_cn;
        }
      } else {
        if (this.iso_code === 'TW') {
          return img_top_freebtn_taiwan_tw;
        } else if (this.iso_code === 'MY') {
          return img_top_freebtn_malaysia_tw;
        } else if (this.iso_code === 'HK') {
          return img_top_freebtn_hongkong_tw;
        } else if (this.iso_code === 'SG') {
          return img_top_freebtn_singapore_tw;
        }
      }
    },
    bottom_url() {
      if (utils.getLanguage() === 'zh-CN') {
        return btn_backapp_cn;
      } else {
        return btn_backapp_tw;
      }
    }
  },
  async mounted() {
    this.type = this.$route.query.type;
    this.iso_code = this.$route.query.iso_code;
    console.log('this.type', this.type)
    utils.firebaseLogEvent(
      '10018',
      '-10001',
      'view_year_middle',
      'page_view',
      {
        type: this.type,
      }
    );


  },
  watch: {},
  methods: {
    downApp(num) {
      location.href = `mlxz://recall/report?channel=${this.type}`;
      if (num === 0) {
        utils.firebaseLogEvent(
          '10018',
          '-10002',
          'click_year_middle_top_button',
          'click',
          {
            type: this.type,
          }
        );
      } else {
        utils.firebaseLogEvent(
          '10018',
          '-10003',
          'click_year_middle_bottom_button',
          'click',
          {
            type: this.type,
          }
        );
      }
    }

  },
};
</script>

<style scoped lang="less">
.cn-bg {
  background: url('../../../assets/img/year_of_lucky_2025/cn/mig_img_topbj_cn_1x.webp') no-repeat;
  background-size: contain;
  width: 7.5rem;
  height: 12rem;
}

.tw-bg {
  background: url('../../../assets/img/year_of_lucky_2025/tw/mig_img_topbj_tw_1x.webp') no-repeat;
  background-size: contain;
  width: 7.5rem;
  height: 12rem;
}

.head {
  width: 7.5rem;
  height: 1.28rem;
}

.result {
  background-color: #B5291E;
  padding: 0.1rem 0.2rem 0.3rem;

  .info-box {
    display: flex;
    flex-direction: column;
    width: 7.1rem;
    margin-top: 1.32rem;

    .card {
      width: 7.1rem;
      height: 7.19rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.49rem;
      background: url('../../../assets/img/year_of_lucky_2025/img_cardbj_xinxi.webp') no-repeat;
      background-size: cover;

      img {
        width: 7.1rem;
        height: 1rem;
      }
    }

    .top {
      height: 0.99rem;

      .title {
        position: absolute;
        top: 0;
        left: 0.23rem;

        img {
          width: 7.1rem;
          height: 1rem;
        }
      }

      img {
        width: 7.1rem;
        height: 1rem;
      }
    }

    .middle {
      height: 5.19rem;

      img {
        width: 7.1rem;
        height: 5.19rem;
      }
    }

    .bottom {
      height: 1rem;
      line-height: 1;

      img {
        width: 7.1rem;
        height: 1rem;
      }
    }
  }

  .btn-modal {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    width: 7.5rem;
    height: 1.96rem;
    background: url('../../../assets/img/recall/nianyun_img_btnmengban.webp');
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 5.7rem;
      height: 0.96rem;
      object-fit: contain;
    }
  }
}

.pay-box {
  width: 7.1rem;
  height: 7.61rem;
  margin-bottom: 0.21rem;
  background: url('https://psychicai-static.psychicai.pro/imgs/24043fd43250af19446888c2b6c6723ebf4f.png') no-repeat;
  background-size: 100% 100%;
  padding: 0.01rem 0.01rem 0.4rem;
}

.download-box {
  min-width: 6.9rem;
  min-height: 4.84rem;
  background: url('../../../assets/img/mlxz/year_of_lucky_2024/result_img_bg.webp') no-repeat;
  background-size: 100% 100%;
  margin: 0.2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 4.2rem;
    height: 0.8rem;
    margin-top: 0.29rem;
  }

  .logo {
    margin-top: 0.5rem;
    width: 3.05rem;
    height: 0.82rem;
    margin-bottom: 0.32rem;
  }

  .tip {
    height: 0.28rem;
    font-weight: 400;
    font-size: 0.28rem;
    color: #222222;
    line-height: 0.28rem;
    margin-bottom: 0.2rem;
  }

  .code {
    min-width: 4.56rem;
    height: 1.04rem;
    background: url('https://psychicai-static.psychicai.pro/imgs/24045e9023a6becb465f92ee2c83d1d73bd9.png') no-repeat;
    background-size: 100% 100%;
    font-weight: 600;
    font-size: 0.32rem;
    color: #ee5050;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    white-space: nowrap;
    padding: 0 0.2rem;

    span {
      margin-left: 0.1rem;
      color: #222222;
      text-decoration: underline;
    }
  }

  .desc {
    margin-bottom: 0.2rem;
    color: #999;
    font-size: 0.24rem;
  }

  .copy {
    width: 5.19rem;
    height: 1.03rem;
    margin-bottom: 0.3rem;
    margin-top: 0.2rem;
  }
}
</style>
