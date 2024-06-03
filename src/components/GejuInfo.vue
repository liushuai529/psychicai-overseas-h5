<style lang="less" scoped>
.main {
    width: 7.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-radius: 16px;
    background-color: #FFFAFA;
    &>.header_img {
        width: 6.68rem;
        height: 0.9rem;
        margin-top:-0.13rem;
        margin-bottom: 0.2rem;
        display: flex;
        justify-content: center;
        img {
            height: 100%;
        }
    }
    &>.nav_item {
        width: 6.5rem;
        padding: 0.10rem 0 0.3rem;
        .nav_header{
            height: 0.32rem;
            margin-bottom: 0.2rem;
            display: flex;
            justify-content: center;
            font-size: 0.32rem;
            line-height: 0.32rem;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            color: #EC436B;
            align-items: center;
            img {
                height: 100%;
            }
            span{
                padding-left: 0.1rem;
                padding-right: 0.1rem;
            }
        }
        .nav_desc{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 0.28rem;
            color: #5F170B;
            line-height: 0.33rem;
            text-align: center;
            font-style: normal;
        }
    }
}
#mode_middle{
    background-color: #FBF8ED;
    border: 6px solid #D19A47;
    &>.header_img{
        margin-top:-0.44rem;
    }
    &>.nav_item {
        .nav_header{
            color: #E13D3C;
        }
        .nav_desc{
            color: #5F170B;
        }
    }
}

</style>
<template>
    <div :id="mode !== 'default' ? 'mode_middle' : ''" class="main">
         <div class="header_img">
            <img v-if="mode === 'default'" src="../assets/img/geju/tittle_img_gejujiedu_jian.png" alt="">
            <img v-else src='../assets/img/geju/img_title_jian.png' alt="">
         </div>
         <div class="nav_item">
            <div class="nav_header">
                {{user_desc}}
            </div>
            <div class="nav_desc" v-html="renderData.all">
            </div>
         </div>
         <div class="nav_item">
            <div class="nav_header" v-if="mode==='default'">
                <img src="../assets/img/geju/left_heart.png" alt="">
                <span>感情方面</span>
                <img src="../assets/img/geju/right_heart.png" alt="">
            </div>
            <div class="nav_header" v-else>
                <img src="../assets/img/geju/left_bird.png" alt="">
                <span>感情方面</span>
                <img src="../assets/img/geju/right_bird.png" alt="">
            </div>
            <div class="nav_desc" v-html="renderData.love">
            </div>
         </div>
         <div class="nav_item">
            <div class="nav_header" v-if="mode==='default'">
                <img src="../assets/img/geju/left_heart.png" alt="">
                <span>{{is_cn ? "事业方面 ": "事業方面"}}</span>
                <img src="../assets/img/geju/right_heart.png" alt="">
            </div>
            <div class="nav_header" v-else>
                <img src="../assets/img/geju/left_bird.png" alt="">
                <span>{{is_cn ? "事业方面 ": "事業方面"}}</span>
                <img src="../assets/img/geju/right_bird.png" alt="">
            </div>
            <div class="nav_desc" v-html="renderData.cause">
                
            </div>
         </div>
    </div>
 
</template>

<script>
import utils from '../libs/utils';
/**
 * props传入: 
 * dataList：需展示数据
 * mode:default或其他(不同风格)
 * user_desc：用户简略描述
 */
export default {
    props:{
        dataList:{
            type:Array,
            default:[]
        },
        mode:{
            type:String,
            default:'default'
        },
        user_desc:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            renderData:{}      
        }
    },
    computed:{
        is_cn() {
            return utils.getLanguage() === 'zh-CN';
        },
    },
    methods:{
        dataFormat(data){
            const dataByFormat = data.reduce((acc,cur)=>{
               acc[cur.key] = cur.content
               return acc
            },{})
            this.renderData = dataByFormat
        }
    },
    created(){
        this.dataList.length>0 && this.dataFormat(this.dataList)
    }
}
</script>
