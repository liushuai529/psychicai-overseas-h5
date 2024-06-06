<style lang="less" scoped>
.modal-box {
  width: 7.5rem;
  height: 11.18rem;
  position: relative;
  overflow: hidden;
  .title-box {
    height: 0.96rem;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.2rem 0.2rem 0 0;
    font-weight: 600;
    font-size: 0.28rem;
    color: #314a46;
    .left {
      margin-left: 0.3rem;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 0.28rem;
      color: #314A46;
      line-height: 0.36rem;
    }
    .center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 0.36rem;
      color: black;
      line-height: 0.36rem;
    }
    .right{
      height: 0.64rem;
      margin-right: 0.3rem;
      padding: 0 0.12rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
      border-radius: 0.16rem;
      border: 0.02rem solid #FFD192;
      .btn {
        font-size: 0.28rem;
        font-weight: 600;
        color: #FFFFFF;
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
  .content-box {
    width: 100%;
    height: 10.84rem;
    margin-top: 0.96rem;
    overflow-y: scroll;
    background-color: var(--bgc-color);
    &>.show-list{
      display: flex;
      flex-direction: column;
      &>.show-item{
        width: 100%;
        box-sizing: border-box;
        padding: 0.2rem 0.2rem 0 0.2rem;
        &>.show-img{
          width: 100%;
          vertical-align: middle;
        }
      }
    }
    
  }
}
.modal-box{
  --bgc-color-h5_marriage: #f197ad;
  --bgc-color-year_of_lucky_2024: #ffaa41;
  --bgc-color-h5_bai_gua: #e2d0ba;
  --bgc-color-h5_weigh_bone: #515fad;
  --bgc-color-h5_emotion2024: #EC436B;
  --bgc-color-h5_career2024 :#f7dbaf;
  --bgc-color-h5_wealth2024: #f197ad;
}
#h5_marriage{
  --bgc-color: var(--bgc-color-h5_marriage);
}
#year_of_lucky_2024{
  --bgc-color: var(--bgc-color-year_of_lucky_2024);
}
#h5_bai_gua{
  --bgc-color: var(--bgc-color-h5_bai_gua);
}
#h5_weigh_bone{
  --bgc-color: var(--bgc-color-h5_weigh_bone);
  .show-item{
    padding: 0 ;
  }
}
#h5_emotion2024{
  --bgc-color: var(--bgc-color-h5_emotion2024);
}
#h5_career2024{
  --bgc-color: var(--bgc-color-h5_career2024);
}
#h5_wealth2024{
  --bgc-color: var(--bgc-color-h5_wealth2024);
}

</style>
<template>
    <mt-popup
      v-model="show"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div v-if="product_key"  class="modal-box" >
        <div class="title-box">
          <div @click="close" class="left">关闭</div>
          <div class="center">
            {{reportName[product_key][is_cn?'cn':'tw']}}
          </div>
          <div
            class="right right-check"
          >
            <div class="btn" @click="selectReport">选择报告</div>
          </div>
        </div>
        <div class="content-box" :id="product_key">
          <div class="show-list">
            <div class="show-item" v-for="item,idx in imgMap[product_key][is_cn?'cn':'tw']" :key='idx' >
              <img  :src='item' class="show-img"/>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
</template>

<script>
//  2024年爱情运势
import cn_icon_1_h5_emotion2024 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home1.png';
import cn_icon_2_h5_emotion2024 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home2.png';
import cn_icon_3_h5_emotion2024 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home3.png';
import cn_icon_4_h5_emotion2024 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home4.png';
import cn_icon_5_h5_emotion2024 from '../../../assets/img/emotion_v2/new/cn/ganqing_img_home5.png';

import tw_icon_1_h5_emotion2024 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home1_fanti.png';
import tw_icon_2_h5_emotion2024 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home2_fanti.png';
import tw_icon_3_h5_emotion2024 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home3_fanti.png';
import tw_icon_4_h5_emotion2024 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home4_fanti.png';
import tw_icon_5_h5_emotion2024 from '../../../assets/img/emotion_v2/new/tw/ganqing_img_home5_fanti.png';

// 2024年财运
import cn_card1_h5_wealth2024 from '../../../assets/img/mlxz/lucky_year_report/1.png';
import tw_card1_h5_wealth2024 from '../../../assets/img/tw_mlxz/wealth_24/home/1.png';

import cn_card2_h5_wealth2024 from '../../../assets/img/mlxz/lucky_year_report/2.png';
import tw_card2_h5_wealth2024 from '../../../assets/img/tw_mlxz/wealth_24/home/2.png';

import cn_card3_h5_wealth2024 from '../../../assets/img/mlxz/lucky_year_report/3.png';
import tw_card3_h5_wealth2024 from '../../../assets/img/tw_mlxz/wealth_24/home/3.png';

import cn_card4_h5_wealth2024 from '../../../assets/img/mlxz/lucky_year_report/4.png';
import tw_card4_h5_wealth2024 from '../../../assets/img/tw_mlxz/wealth_24/home/4.png';
 // 2024年事业运势
 import cn_card_1_h5_career2024 from '../../../assets/img/mlxz/career_2024/home_img_mokuai2.png';
import cn_card_2_h5_career2024 from '../../../assets/img/mlxz/career_2024/home_img_mokuai3.png';
import cn_card_3_h5_career2024 from '../../../assets/img/mlxz/career_2024/pignjia.png';

import tw_card_1_h5_career2024 from '../../../assets/img/tw_mlxz/career_24/card_1.png';
import tw_card_2_h5_career2024 from '../../../assets/img/tw_mlxz/career_24/card_2.png';
import tw_card_3_h5_career2024 from '../../../assets/img/tw_mlxz/career_24/card_3.png';
//八字合婚
import cn_card1_h5_marriage from './../../../assets/img/mlxz/bzhh/card1.png';
import cn_card2_h5_marriage from './../../../assets/img/mlxz/bzhh/card2.png';
import cn_card3_h5_marriage from './../../../assets/img/mlxz/bzhh/card3.png';
import cn_card4_h5_marriage from './../../../assets/img/mlxz/bzhh/card4.png';
import cn_card5_h5_marriage from './../../../assets/img/mlxz/bzhh/card5.png';

import tw_card1_h5_marriage from './../../../assets/img/tw_mlxz/bazihehun/home/card1.png';
import tw_card2_h5_marriage from './../../../assets/img/tw_mlxz/bazihehun/home/card2.png';
import tw_card3_h5_marriage from './../../../assets/img/tw_mlxz/bazihehun/home/card3.png';
import tw_card4_h5_marriage from './../../../assets/img/tw_mlxz/bazihehun/home/card4.png';
import tw_card5_h5_marriage from './../../../assets/img/tw_mlxz/bazihehun/home/card5.png';
// 2024年年运

import cn_card_1_year_of_lucky_2024 from '../../../assets/img/mlxz/year_of_lucky_2024/home_img_mokuai1.png';
import tw_card_1_year_of_lucky_2024 from '../../../assets/img/tw_mlxz/year_24/home_img_mokuai1.png';

import cn_card_2_year_of_lucky_2024 from '../../../assets/img/mlxz/year_of_lucky_2024/home_img_mokuai2.png';
import tw_card_2_year_of_lucky_2024 from '../../../assets/img/tw_mlxz/year_24/home_img_mokuai2.png';

import cn_card_3_year_of_lucky_2024 from '../../../assets/img/mlxz/year_of_lucky_2024/card_2_cn.png';
import tw_card_3_year_of_lucky_2024 from '../../../assets/img/mlxz/year_of_lucky_2024/card_2_tw.png';

import cn_card_4_year_of_lucky_2024 from '../../../assets/img/mlxz/year_of_lucky_2024/card_4_cn.png';
import tw_card_4_year_of_lucky_2024 from '../../../assets/img/mlxz/year_of_lucky_2024/card_4_tw.png';

import cn_card_5_year_of_lucky_2024 from '../../../assets/img/mlxz/year_of_lucky_2024/home_img_mokuai5.png';
import tw_card_5_year_of_lucky_2024 from '../../../assets/img/tw_mlxz/year_24/home_img_mokuai5.png';
//袁天罡秤骨
import tw_card_1_h5_weigh_bone from '../../../assets/img/weigh_bone/yulan_yuantiangang_top_fan.jpg';
import cn_card_1_h5_weigh_bone from '../../../assets/img/weigh_bone/yulan_yuantiangang_top_jian.jpg';

//鬼谷子
import cn_card_2_h5_bai_gua from '../../../assets/img/mlxz/guiguzi/home_img_mo2@2x.png';
import tw_card_2_h5_bai_gua from '../../../assets/img/tw_mlxz/guiguzi/home_img_mo2.png';
import { Toast } from 'mint-ui';




import utils from '../../../libs/utils';
import {reportName} from '../../../libs/enum'
export default {
  name: 'SaleDetailModal',
  data(){
    return{
      reportName,
      imgMap:{
        h5_emotion2024: {// 2024年爱情运势
          cn:[
            cn_icon_1_h5_emotion2024,
            cn_icon_2_h5_emotion2024,
            cn_icon_3_h5_emotion2024,
            cn_icon_4_h5_emotion2024,
            cn_icon_5_h5_emotion2024
          ],
          tw:[
            tw_icon_1_h5_emotion2024,
            tw_icon_2_h5_emotion2024,
            tw_icon_3_h5_emotion2024,
            tw_icon_4_h5_emotion2024,
            tw_icon_5_h5_emotion2024
          ]
        },
        h5_wealth2024: {
          cn:[
            cn_card1_h5_wealth2024,
            cn_card2_h5_wealth2024,
            cn_card3_h5_wealth2024,
            cn_card4_h5_wealth2024
          ],
          tw:[
            tw_card1_h5_wealth2024,
            tw_card2_h5_wealth2024,
            tw_card3_h5_wealth2024,
            tw_card4_h5_wealth2024
          ]
        }, // 2024年财运
        h5_annual2024: {
          cn:[
            cn_card_1_year_of_lucky_2024,
            cn_card_2_year_of_lucky_2024,
            cn_card_3_year_of_lucky_2024,
            cn_card_4_year_of_lucky_2024,
            cn_card_5_year_of_lucky_2024
          ],
          tw:[
            tw_card_1_year_of_lucky_2024,
            tw_card_2_year_of_lucky_2024,
            tw_card_3_year_of_lucky_2024,
            tw_card_4_year_of_lucky_2024,
            tw_card_5_year_of_lucky_2024
          ]
        }, // 2024年年运
        h5_weigh_bone: {
          cn:[
              cn_card_1_h5_weigh_bone
          ],
          tw:[
              tw_card_1_h5_weigh_bone
          ]
        }, // 袁天罡秤骨
        h5_bai_gua: {
          cn:[
              // 'https://psychicai-static.psychicai.pro/imgs/24048f0d358d051f4890abe8ad40ec6cbe48.png',
              'https://psychicai-static.psychicai.pro/imgs/24044c3c7ad56f9f4e08a25d585164be739f.png',
              cn_card_2_h5_bai_gua
          ],
          tw:[
              // 'https://psychicai-static.psychicai.pro/imgs/24048f0d358d051f4890abe8ad40ec6cbe48.png',
              'https://psychicai-static.psychicai.pro/imgs/24045923298c6eff48f1ac256edf9ed6d17d.png',
              tw_card_2_h5_bai_gua
          ],

        }, // 鬼谷子
        h5_marriage: {
          cn:[
            cn_card1_h5_marriage,
            cn_card2_h5_marriage,
            cn_card3_h5_marriage,
            cn_card4_h5_marriage,
            cn_card5_h5_marriage,
          ],
          tw:[
            tw_card1_h5_marriage,
            tw_card2_h5_marriage,
            tw_card3_h5_marriage,
            tw_card4_h5_marriage,
            tw_card5_h5_marriage,
          ]
        },
        h5_career2024: {
          cn:[
            cn_card_1_h5_career2024,
            cn_card_2_h5_career2024,
            cn_card_3_h5_career2024
          ],
          tw:[
            tw_card_1_h5_career2024,
            tw_card_2_h5_career2024,
            tw_card_3_h5_career2024
          ]
         // 2024年事业运势
        },
      },
    }
  },
  model:{
    prop: 'show',
    event: 'close'
  },


  props:{
    selected_list: {
      type: Array,
      default: [],
    },
    show:{
        type:Boolean,
        default:false
    },
    callback:{
        type:Function,
        default:function(){console.log('callback')}
    },
    product_key:{
        type:String,
        default:'h5_emotion2024'
    },
    size: {
      type: Number,
      default:3
    },
  },
  methods:{
    close(){
        this.$emit('close',false)
    },
    selectReport() {
      console.log('选择报告',this.size, this.product_key);
      if (this.size === 2) {
        switch (this.product_key) {
          case 'h5_marriage': utils.firebaseLogEvent('10001', '-10057', 'click_detail_marriage2', 'click',
            {
              args_name: 'click_detail_marriage2',
              channel: utils.getFBChannel(),
            })
            break;

          case 'h5_emotion2024': utils.firebaseLogEvent('10001', '-10054', 'click_detail_2024lovely2', 'click',
            {
              args_name: 'click_detail_2024lovely2',
              channel: utils.getFBChannel(),
            })
            break;

          case 'h5_annual2024': utils.firebaseLogEvent('10001', '-10053', 'click_detail_2024report2', 'click',
            {
              args_name: 'click_detail_2024report2',
              channel: utils.getFBChannel(),
            })
            break;

          case 'h5_wealth2024': utils.firebaseLogEvent('10001', '-10056', 'click_detail_2024wealty2', 'click',
            {
              args_name: 'click_detail_2024wealty2',
              channel: utils.getFBChannel(),
            })
            break;

          case 'h5_career2024': utils.firebaseLogEvent('10001', '-10055', 'click_detail_2024career2', 'click',
            {
              args_name: 'click_detail_2024career2',
              channel: utils.getFBChannel(),
            })
            break;

          case 'h5_bai_gua': utils.firebaseLogEvent('10001', '-10059', 'click_detail_64gua2', 'click',
            {
              args_name: 'click_detail_64gua2',
              channel: utils.getFBChannel(),
            })
            break;

          case 'h5_weigh_bone': utils.firebaseLogEvent('10001', '-10058', 'click_detail_chenggu2', 'click',
            {
              args_name: 'click_detail_chenggu2',
              channel: utils.getFBChannel(),
            })
            break;

        }
      } else {
        switch (this.product_key) {
          case 'h5_marriage': utils.firebaseLogEvent('10001', '-10050', 'click_detail_marriage3', 'click',
            {
              args_name: 'click_detail_marriage3',
              channel: utils.getFBChannel(),
            });
            break;

          case 'h5_emotion2024': utils.firebaseLogEvent('10001', '-10047', 'click_detail_2024lovely3', 'click',
            {
              args_name: 'click_detail_2024lovely3',
              channel: utils.getFBChannel(),
            });
            break;

          case 'h5_annual2024': utils.firebaseLogEvent('10001', '-10046', 'click_detail_2024report3', 'click',
            {
              args_name: 'click_detail_2024report3',
              channel: utils.getFBChannel(),
            });
            break;

          case 'h5_wealth2024': utils.firebaseLogEvent('10001', '-10049', 'click_detail_2024wealty3', 'click',
            {
              args_name: 'click_detail_2024wealty3',
              channel: utils.getFBChannel(),
            });
            break;

          case 'h5_career2024': utils.firebaseLogEvent('10001', '-10048', 'click_detail_2024career3', 'click',
            {
              args_name: 'click_detail_2024career3',
              channel: utils.getFBChannel(),
            });
            break;

          case 'h5_bai_gua': utils.firebaseLogEvent('10001', '-10052', 'click_detail_64gua3', 'click',
            {
              args_name: 'click_detail_64gua3',
              channel: utils.getFBChannel(),
            });
            break;

          case 'h5_weigh_bone': utils.firebaseLogEvent('10001', '-10051', 'click_detail_chenggu3', 'click',
            {
              args_name: 'click_detail_chenggu3',
              channel: utils.getFBChannel(),
            });

            break;
        }
      }
      let obj = this.selected_list.find(item=> item.product_key === this.product_key);
      let length = this.selected_list.length;
      if(this.size === length) {
        !obj &&  Toast(`最多选择${this.size ===2 ? '两' : '三'}项报告`);
      } else {
        if(!obj) {
          this.callback()
        }
      }
      this.close()
    }
  },
  computed:{
    is_cn() {
      console.log('xxx', this.selected_list);
      return utils.getLanguage() === 'zh-CN';
    }
  }
}
</script>
