<style lang="less" scoped>
.calculate-bar {
    width: 7.5rem;
    height: 1.2rem;
    box-sizing: border-box;
    padding:0 0.44rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image:url("../assets/img/home_img_card/home_img_card_tongzhi.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    &>.detail{
        display: flex;
        justify-content: center;
        &>.detail_img{
            width: 0.88rem;
            height:0.88rem;
        }
        &>.detail_desc{
           padding-left: 0.16rem;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: start;
           &>.desc_content{
            margin-top: 0.14rem;
            height: 0.26rem;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 0.26rem;
            color: #8DA5A1;
            line-height: 0.26rem;
           }
           &>.desc_header{
                display: flex;
                justify-content: center;
                &>.header_left{
                    color: #314A46;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 600;
                    font-size: 0.32rem;
                    line-height: 0.32rem;
                }
                &>.header_right{
                    height: 0.36rem;
                    margin-left: 0.1rem;
                    padding-inline:0.08rem;
                    text-align: center;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 0.22rem;
                    line-height: 0.36rem;
                    background: linear-gradient( 180deg, #5DE3A8 0%, #22BA77 100%);
                    border-radius: 0.08rem;
                    color: #FFFFFF;
                }
           }
        }
    }
    &>.calculate{
        height:0.68rem;
        padding: 0 0.16rem; 
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border: 0.02rem solid #E79999;
        border-radius: 0.16rem;
        &>.calculate_text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            font-size: 0.28rem;
            color: #E3453D;
            }
        }
    
}
#not_home {
    padding:0 0.24rem;
    background: #fff;
}
</style>
<template>
  <div class="calculate-bar" :id="is_home || 'not_home'">
    <div class="detail">
        <img :src="show_imgSrc" class="detail_img">
        <div class="detail_desc">
            <div class="desc_header">
                <span class="header_left">{{ show_title }}</span>
                <span class="header_right">已解锁</span>
            </div>
            <div class="desc_content">填写信息开始测算</div>
        </div>
    </div>
    <div class="calculate" @click="call_back()">
        <span class="calculate_text">开始测算</span>
    </div>
  </div>
</template>

<script>

import cn_small_bzhh from "../assets/img/common/banner/small/cn/h5_fang_jian_bazihehun.png";
import tw_small_bzhh from "../assets/img/common/banner/small/tw/h5_fang_fan_bazihhehun.png";
import new_ganqing_small from "../assets/img/emotion_v2/new/banner_ganqing_fang.png";
import utils from '../libs/utils';
export default {
    props:{
        product_key: {
        type: String,
        default: "h5_marriage",//八字合婚
        //h5_emotion2024//大揭秘
        },
        is_home:{
            type:Boolean,
            default:true
        },
        call_back: {
            type: Function,
        }
    },
    data(){
        return{
            imgMap:{
                "h5_marriage":{
                    "cn":cn_small_bzhh,
                    "tw":tw_small_bzhh
                },
                "h5_emotion2024":{
                    "cn":new_ganqing_small,
                    "tw":new_ganqing_small
                }
            },
            titleMap:{
                "h5_marriage":{
                    "cn":'八字合婚',
                    "tw":'八字合婚'
                },
                "h5_emotion2024":{
                    "cn":'感情运',
                    "tw":'感情運'
                }
            },
            show_imgSrc:cn_small_bzhh,//默认第一张
            show_title: '',
        }
    },
    computed:{
        is_cn() {
            return utils.getLanguage() === 'zh-CN';
        },
    },
    methods:{
        imgSrcVerify(){
            const src = this.imgMap[this.product_key][this.is_cn ? 'cn' : 'tw']
            src && (this.show_imgSrc = src)
            const title = this.titleMap[this.product_key][this.is_cn ? 'cn' : 'tw']
            title && (this.show_title = title)

        }
    },
    created() {
        this.imgSrcVerify()
    },
    
}
</script>

