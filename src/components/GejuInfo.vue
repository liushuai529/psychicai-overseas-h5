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
        margin-top: -0.13rem;
        margin-bottom: 0.2rem;
        display: flex;
        justify-content: center;

        img {
            height: 100%;
        }
    }

    .header_img-bzhh {
        width: 7.5rem;
        height: 1.32rem;
        margin-top: -0.13rem;
        margin-bottom: 0.2rem;
        display: flex;
        justify-content: center;

        img {
            height: 100%;
        }
    }

    .nav_item {
        width: 6.5rem;
        padding: 0.10rem 0 0.3rem;

        .nav_header {
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

            span {
                padding-left: 0.1rem;
                padding-right: 0.1rem;
            }
        }

        .nav_desc {
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

#mode_middle {
    background-color: #FFEDD8;
    border: 0.09rem solid #B70E08;

    .header_img {
        margin-top: -0.44rem;
    }

    .nav_item {
        .nav_header {
            color: #E13D3C;
        }
        .nav_desc {
            color: #6F3719;
        }
        .nav_line {
            width: 100%;
            height: 0.02rem;
            background-color: #D19A47 ;
            transform:scaleY(0.5)
        }
    }
}

</style>
<template>
    <div :id="product_key !== 'h5_emotion2024' ? 'mode_middle' : ''" class="main">
        <div class="header_img" v-if="product_key === 'h5_emotion2024'">
            <img  src="../assets/img/geju/tittle_img_gejujiedu_jian.webp" alt="">   
        </div>

        <div class="header_img-bzhh" v-else>
            <img src='../assets/img/geju/img_title_jian.webp' alt="">
        </div>



        <div v-for="item,idx in renderData" :key="idx">
            <div class="nav_item" >
                <div class="nav_header">
                    {{ item.user_desc }}
                </div>
                <div class="nav_desc" v-html="item.all">
                </div>
            </div>
            <div class="nav_item">
                <div class="nav_header" v-if="product_key === 'h5_emotion2024'">
                    <img src="../assets/img/geju/left_heart.webp" alt="">
                    <span>感情方面</span>
                    <img src="../assets/img/geju/right_heart.webp" alt="">
                </div>
                <div class="nav_header" v-else>
                    <img src="../assets/img/geju/left_bird.webp" alt="">
                    <span>感情方面</span>
                    <img src="../assets/img/geju/right_bird.webp" alt="">
                </div>
                <div class="nav_desc" v-html="item.love">
                </div>
            </div>
            <div class="nav_item">
                <div class="nav_header" v-if="product_key === 'h5_emotion2024'">
                    <img src="../assets/img/geju/left_heart.webp" alt="">
                    <span>{{ is_cn ? "事业方面 " : "事業方面" }}</span>
                    <img src="../assets/img/geju/right_heart.webp" alt="">
                </div>
                <div class="nav_header" v-else>
                    <img src="../assets/img/geju/left_bird.webp" alt="">
                    <span>{{ is_cn ? "事业方面 " : "事業方面" }}</span>
                    <img src="../assets/img/geju/right_bird.webp" alt="">
                </div>
                <div class="nav_desc" v-html="item.cause">

                </div>
            </div>
            <div class="nav_item" v-if="(product_key !== 'h5_emotion2024') && (idx !== renderData.length - 1)">
                <div class="nav_line"></div>
            </div>
        </div>
    </div>

</template>

<script>
import utils from '../libs/utils';
/**
 * props传入: 
 * dataList：需展示数据
 * product_key
 * user_desc：用户简略描述
 */
export default {
    props: {
        dataList: {
            type: Array,
            default: []
        },
        product_key: {
            type: String,
            default: 'h5_emotion2024'
        },
        user_desc: {
            type: Array,
            default: ''
        }
    },
    data() {
        return {
            renderData: []
        }
    },
    watch: {
        dataList(newVal) {
            if (newVal.length) {
                const dataByFormat = newVal.map((item,index)=>{
                    let result =  item.reduce((acc, cur) => {
                        acc[cur.key] = cur.content
                        return acc
                    }, {})
                    result.user_desc = this.user_desc[index]
                    return result
                }
            )
                this.renderData = dataByFormat
            }
        },
    },
    computed: {
        is_cn() {
            return utils.getLanguage() === 'zh-CN';
        },
    }
}
</script>
