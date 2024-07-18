
<template>
  <div :class="['main', {'rise_move':rise_move}]" >
    <div :class="['dealing-area',{'dealing-area_sink':hands_show},{'rise_fadeout':rise_transparent}]" >
      <div class="card_area">
        <img class="card" :src="paimian_img" 
        v-for="num,idx in customData.card_num"  
        :key="num"
        :style="{ transform: `rotate(${rotate_deg(num)}deg)` }"
         v-show="cardList[idx].show"
         @click="card_clicked(idx,$event)"
        />        
        <!-- <img class="card card_v" :src="paimian_img" 
         ref="card_v"
         v-if="currentImageIndex < customData.card_num"
        /> -->
      </div>
      <!-- <div class = 'arm_area'>
        <img class="arm_v" 
          :src="arm_img"
          ref="arm_v"
        />
      </div> -->
    </div>
    <!-- <div :class="['hands_area',{'rise_fadeout':rise_transparent}]" >
      <img :class="['hands',{'hands_show':hands_show}]" :src="hands_img" />
    </div> -->
    <div :class="['text_area',{'rise_fadeout':rise_transparent}]" >
      <img :src="shouzhi_img" :class='["shouzhi_img","pointer_animation",{"transparent":card_animation}]' ref="shouzhi_img"/>
      <img class="text_img"
      :src="is_cn?cn_xipai_text_img:tw_xipai_text_img"
      ref="text_img"
      />
    </div>
    <div class="card_selection_area" ref="card_selection_area" style="opacity: 1;">
      <div 
        v-for="item,idx in selected_card_list"
        :key="idx" 
        class="card_wrapper">
        <img :src="item.img_url" :class="['card_img',{flipped:isFlipped}]" v-show="item.show"/>
        <img :class="['flip_card',{flip_card_show:flip_show}]"  :src="item.flip_img_url"/>
        <div :class="['card_desc',{flip_card_show:flip_show}]">
          <img :src="card_desc_right" class="icon_left"/>
          <div class="text" :style="tagBgStyle">{{ item.desc }}</div>
          <img :src="card_desc_left" class="icon_right" />
        </div>
      </div>
    </div>
    <!-- <div :class="['effect_area',{'rise_fadeout':rise_transparent}]" ref="effect_area">
      <img class="effect_card" :src="paimian_img" 
        />
    </div> -->
    <div :class="['effect_area']" ref="effect_area">
      <img class="effect_card" :src="paimian_img" 
        />
    </div>
  </div>
</template>
<script>
import {tarotShuffleAPI} from '../../../api/api.js';
import utils from '../../../libs/utils.js';
import paimian_img from '../../../assets/img/tarot/paimian.webp';
import arm_img from '../../../assets/img/tarot/arm.webp';
import hands_img from '../../../assets/img/tarot/hands.webp';
import cn_xipai_text_img from '../../../assets/img/tarot/cn/xipai_text_cn.webp';
import tw_xipai_text_img from '../../../assets/img/tarot/tw/taluo_img_xipai_text_fan.webp';
import cn_choupai_text_img from '../../../assets/img/tarot/cn/choupai_text.webp';
import tw_choupai_text_img from '../../../assets/img/tarot/tw/taluo_img_choupai_text_fan.webp';
import shouzhi_img from '../../../assets/img/tarot/shouzhi.webp';
import card_desc_left from '../../../assets/img/tarot/left-icon.webp';
import card_desc_right from '../../../assets/img/tarot/right-icon.webp';
import tag_bg from '../../../assets/img/tarot/tag-bg.webp';
import { set } from 'vue';
export default {
  props: {
    customData:{
      type: Object,
      default: () => {
        return {
          card_num: 25,
          rotate_left:228,//最左旋转角度
          rotate_right:132,//最右旋转角度
          animation_time:1500, //发牌总时长(毫秒)
        }
      }
    }
  },
  data() {
    return {
      paimian_img,
      arm_img,
      hands_img,
      cn_xipai_text_img,
      tw_xipai_text_img,
      cn_choupai_text_img,
      tw_choupai_text_img,
      shouzhi_img,
      tag_bg,
      card_desc_right,
      card_desc_left,
      currentImageIndex : 0,
      card_animation : true,//铺牌时不可点击
      hands_show:false,//双手展示
      selected_card_list:[],//选择展示的卡牌
      selected_card_num:0,//选择展示的卡牌数量
      cardList:[],//总卡牌列表
      isFlipped:false,//是否选牌
      flip_show:false,//翻牌结束
      rise_move_start:false,//上移开始
      rise_move:false,//整体上移
      rise_move_end:false,//整体上移结束
      rise_transparent:false,//上移透明化
      card_response_loaded:false,//响应时间
    };
  },
  computed: {
    is_cn() {
      return utils.getLanguage() === 'zh-CN';
    },
    // 牌展示延迟
    cardShowDelay(){
      return this.customData.animation_time / (this.customData.card_num - 1 );
    },
    tagBgStyle(){
      return {
        backgroundImage:`url(${tag_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  watch: {
    hands_show(){
     this.hands_show_handel()
    },
    selected_card_num(){
      this.selection_complete_handel()
    }
  },
  created() {
    this.initCardList();
  },
  mounted() {
    //发牌
    this.showNextImage()
    //虚拟牌动画，视觉流畅度
    this.card_v_animation()
      
  },
  methods: {
    /**
     * @description 初始化牌池
     */
    initCardList(){
      this.cardList = Array.from({ length: this.customData.card_num }, (_) => ({
        show: false,
      }));
      this.selected_card_list = Array.from({ length: 3 }, (_) => ({
        show: false,
        card:{},
        img_url:paimian_img,
        flip_img_url:'',
        desc:'',
      }));
      tarotShuffleAPI().then(res => {
        if(res.status === 1000){
          this.card_response_loaded = true;
          const data = res.data;
          this.cardList.forEach((item,index) => {
            item.card = data[index];
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //旋转角度
    rotate_deg(num){
      return this.customData.rotate_right + (this.customData.rotate_left - this.customData.rotate_right) / (this.customData.card_num - 1) * (num - 1);
    },
    /**
     * @description 发牌
     */
    showNextImage() {
      if (this.currentImageIndex < this.customData.card_num) {
        let time = setTimeout(() => {
          clearTimeout(time);
          this.cardList[this.currentImageIndex].show = true
          this.currentImageIndex = this.currentImageIndex + 1;
          this.showNextImage();
        }, this.cardShowDelay);
        return
      }
    },
    /**
     * @description 虚拟牌动画
     */
    card_v_animation(){
      let time = setTimeout(()=>{
        clearTimeout(time);
        // this.$refs.card_v.style.transform = `rotate(${this.rotate_deg(this.customData.card_num)}deg)`;
        // this.$refs.arm_v.classList.add('arm_animation');
        let hands_show_time = setTimeout(()=>{
          clearTimeout(hands_show_time);
          this.hands_show = true;
          this.card_animation = false;
        },2000)
      },0)
    },
    /**
     * @description 选牌
     * @param idx 
     * @param param1 
     */
    card_clicked(idx,{target}){
      if(!this.card_response_loaded){
        return
      }
      if(this.card_animation){
        return
      }
      this.card_animation = true;
      this.cardList[idx].show = false;
      let card = this.cardList[idx].card;
      let targetCardWrapperIdx = this.selected_card_num;
      let targetCardWrapper = this.$refs.card_selection_area.childNodes[targetCardWrapperIdx];
      // 判断左右
      let isLeft = idx >= this.customData.card_num / 2 ;
    
      const currCard = this.selected_card_list[this.selected_card_num]
      currCard.flip_img_url = card.card.image_url;
      //抽牌
      this.card_selection_animation(target.getBoundingClientRect(),targetCardWrapper.getBoundingClientRect(),isLeft,()=>{
        currCard.show = true;
        currCard.card = card;
        currCard.desc = `${card.card.name_cn || ''} ${card.upright ? '正' : '逆'}`;
        this.selected_card_num += 1;
        if(this.selected_card_num >= 3){
          return
        }
        setTimeout(()=>{
          this.card_animation = false;
        },0)
      })
    },
    /**
     * @description 选牌动画
     * @param eventCardRect 
     * @param targetCardWrapperRect 
     * @param isLeft 
     * @param callback 
     */
    card_selection_animation(eventCardRect,targetCardWrapperRect,isLeft,callback){
      // // 展示选中的牌
      // this.card_selection_show(eventCardRect,isLeft)
      // // 动画
      // this.$nextTick(()=>{
      //   const effect_area = this.$refs.effect_area;
      //   let showCardRect = effect_area.getBoundingClientRect()
      //   // 计算距离
      //   let {left,top} = this.distanceCardXY(showCardRect,targetCardWrapperRect)
      //   setTimeout(() => {
      //     effect_area.style.transition = `transform 1s linear`;
      //   }, 0);
      //   let time = setTimeout(() => {
      //     clearTimeout(time);
      //     effect_area.style.transform = `translate(${left}px,${top}px)`;
      //     let timeCallBack =  setTimeout(() => {
      //       clearTimeout(timeCallBack);
      //       callback && callback();
      //       setTimeout(() => {
      //         effect_area.style.transition = 'none';
      //       }, 0);
      //       effect_area.style.transform = '';
      //       effect_area.style.opacity = 0;
      //     }, 1000);
      //   }, 500);
      // })
       callback && callback();
    },
    /**
     * @description 展示选中的牌
     * @param cardRect 
     * @param isLeft 
     */
    card_selection_show(cardRect,isLeft){
      const left = cardRect.left + cardRect.width / 2
      const right = cardRect.left 
      const centerY = cardRect.top + (cardRect.height / 8);
      const effect_area = this.$refs.effect_area
      effect_area.style.top = centerY + 'px';
      isLeft ? effect_area.style.left = left + 'px' : effect_area.style.left = right + 'px';
      effect_area.style.opacity = 1;
    },
    /**
     * @description 计算距离
     * @param centerS 
     * @param centerT 
     */
    distanceCardXY(centerS,centerT ){
      return {
        left:centerT.left - centerS.left,
        top:centerT.top - centerS.top
      }
    },
    /**
     * @description 推手动画
     */
     hands_show_handel(){
      this.$refs.text_img.style.opacity = 0;
      setTimeout(() => {
        this.$refs.text_img.src = this.is_cn? this.cn_choupai_text_img: this.tw_choupai_text_img;
        this.$refs.text_img.style.opacity = 1;
      }, 200);
    },
    /**
     * 翻牌动画
     */
    selection_complete_handel(){
      if(this.selected_card_num === 3){
        localStorage.setItem('selected_card_list', JSON.stringify(this.selected_card_list.map(item=>item.card)))
        this.isFlipped = true;
        setTimeout(()=>{
          this.flip_show = true;
          this.selected_card_list.forEach((item,index)=>{
            item.show = false
          })
          setTimeout(()=>{
            this.rise_move_start = true
            this.rise_move = true
            this.rise_transparent = true
            setTimeout(()=>{
              this.rise_move_end = true
            },2000)
          },600)
        },300)
      }
    },
  },
};
</script>
<style scoped lang="less">
.main { 
  // width: 100%;
  width: 7.5rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: PingFangSC, PingFang SC;
  font-size: 0.24rem;
  color: #FFFFFF;
  line-height: 0.24rem;
  text-align: center;
}
.dealing-area{
  position: relative;
    width: 100%;
    height: 6.38rem;//->6.7264rem
    transition: all 0.7s linear;
    .center{
      width: 0.2rem;
      height: 0.2rem;
      position: absolute;
      left:3.75rem;
      top:0.64rem;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      background-color: #fff;
    }
}
.dealing-area_sink{
  margin-top: 0.35rem;
}
.card {
  width: 1.44rem;
  height: 2.46rem;
  position: absolute;
  left: 3.03rem;
  top: -5.1rem;
  transform-origin: 50% 5.74rem;
}
.card_v {
  z-index: 3;
  transform: rotate(132deg);
  transition: all 1.5s linear;
}
.arm_v {
  width:1.9rem;
  position: absolute;
  z-index: 5;
  top: -0.66rem;
  left:2.9rem;
  transform-origin: 50% 0;
  transform: rotate(-40deg);
}
.hands{
  width: 4rem;
  position: absolute;
  left: 50%;
  top: 0;
  transition: all 1s ;
  transform: translate(-50%,-100%);
}
.hands_show{
  transform: translate(-50%,-0.22rem);
}
.text_area{
  width: 100%;
  margin-top:0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text_img{
    width: 5.2rem;    
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  .shouzhi_img{
    margin-top: 0.1rem;
    width: 1.1rem;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
}
.card_selection_area {
  margin-top: 0.35rem;
  width: 100%;
  display: flex;
  justify-content: center;
  .card_wrapper{
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    width: 1.44rem;
    height: 2.46rem;
    position: relative;
    border: #8364FF solid 0.01rem;
    border-radius: 0.1rem;
    .card_img{
      width: 1.44rem;
      height: 2.46rem;
    }
    .card_desc {
      position: absolute;
      left: 50%;
      bottom: -0.6rem;
      height: 0.36rem;
      transform: translateX(-50%);
      opacity: 0;
      .text{
        font-weight: 600;
        line-height: 0.36rem;
        height: 0.36rem;
        white-space: nowrap;
      }
      .icon_left{
        position: absolute;
        top:0;
        left: -0.24rem;
        width: 0.24rem;
      }
      .icon_right{
        position: absolute;
        top: 0;
        right:-0.24rem;
        width: 0.24rem;
      }
    }
    .flip_card{
      position: absolute;
      left:0;
      top:0;
      opacity: 0;
      width: 1.44rem;
      height: 2.46rem;
    }
    .flip_card_show{
      opacity: 1;
    }
  }
}
.effect_area{
  width: 1.44rem;
  height: 2.46rem;
  position: absolute;
  opacity: 0;
  transition: transform 1s linear;
  .effect_card{
    width: 100%;
  }
}
</style>
<style scoped>
@keyframes arm_v_rotate {
  0% {
    transform: rotate(-40deg);
  }
  75% {
    transform: rotate(40deg) translate(0,-10%);
  }
  80% {
    transform: rotate(40deg) translate(0,-10%);
  }
  100% {
    transform: rotate(40deg) translate(0,-100%);
  }
}
@keyframes flip {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
}
@keyframes rise {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-8.67rem);
  }
}
@keyframes fadeout {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes pointer-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.pointer_animation {
  animation: pointer-pulse 1.5s infinite;
}
.transparent {
  opacity: 0 !important;
}
.rise_fadeout {
  animation: fadeout 1s ease-in-out forwards;
}
.rise_move {
  animation: rise 2s ease-in-out forwards;
}
.flipped {
  animation: flip .6s forwards;
}
.arm_animation{
  animation: arm_v_rotate 2s linear ;
  animation-fill-mode: forwards;
  animation-iteration-count : 1;
}
</style>
