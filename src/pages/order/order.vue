<!--
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-21 15:18:20
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-05-17 18:08:02
 * @Description: 订单列表
 * @FilePath: \find-future-overseas\src\pages\order\order.vue
-->
<template>
    <div class="container">
        <img src="../../assets/img/checkstand/bg-top.png" />
        <div class="bg"></div>
        <img src="../../assets/img/checkstand/bg-bottom.png" />
        <div class="wrapper">
            <div class="tabs">
                <div class="tab" :class="{ active: index === 0 }" @click="index = 0">已支付</div>
                <div class="tab" :class="{ active: index === 1 }" @click="index = 1">待支付</div>
                <div class="tab" :class="{ active: index === 2 }" @click="index = 2">已取消</div>
            </div>
            <div v-show="!loading" class="box">
                <div class="scroll" :style="{ width: 100 * list.length + '%', left: -100 * index + '%' }">
                    <div class="content" v-for="(arr, index) in list">
                        <div v-if="arr.length" class="list">
                            <div class="item" v-for="item in arr" @click="toResult(item)">
                                <div class="item-info">
                                    <div class="item-pic" :class="[item.ce_suan_type]"></div>
                                    <div class="item-right">
                                        <div class="item-name">“{{ product_enums[item.ce_suan_type] }}”服務費用</div>
                                        <div class="item-time">{{ item.create_time | timeFilter }}</div>
                                        <div class="item-price">RM{{ item.pay_amount }}</div>
                                    </div>
                                </div>
                                <div v-if="index === 1" class="item-footer">
                                    <div class="deadline">支付剩余時間 {{ item.expire_time | lastTimeFilter }}</div>
                                    <div class="btn" @click="pay(item)">去支付</div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="nodata">
                            <img src="../../assets/img/order/no_order.png" />
                            <div>暫無相關訂單</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { Indicator } from "mint-ui";
import { getOrderListAPI, getResultAPI } from "../../api/api";
import { product_enums, path_enums } from "../../libs/enum";

export default {
    data() {
        return {
            loading: false,
            index: 0,
            list: [[], [], []],
            product_enums,
            path_enums,
        };
    },
    created() {
        document.title = "我的訂單";

        // 进入页面强制刷新
        window.onpageshow = function (e) {
            if (e.persisted) {
                window.location.reload();
            }
        };

        this.query();
    },
    filters: {
        timeFilter(val) {
            return moment(val).format("YYYY.MM.DD HH:mm");
        },
        lastTimeFilter(val) {
            let now = moment();
            if (now.valueOf() >= val) {
                return "00:00";
            } else {
                let lastTime = moment(val).diff(now, "seconds");
                let m = moment.duration(lastTime, "seconds").minutes();
                let s = moment.duration(lastTime, "seconds").seconds();
                return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
            }
        },
    },
    methods: {
        query() {
            this.loading = true;
            Indicator.open("訂單加載中...");
            getOrderListAPI()
                .then((res) => {
                    let list = res.data;
                    list.forEach((item) => {
                        if (item.status === "PAYED") {
                            this.list[0].push(item);
                        } else if (item.status === "CREATED") {
                            this.list[1].push(item);
                        } else if (item.status === "CANCELED") {
                            this.list[2].push(item);
                        }
                    });
                    Indicator.close();
                    this.loading = false;
                })
                .catch((err) => {
                    Indicator.close();
                    this.loading = false;
                });
        },
        toResult(item) {
            if (item.status === "PAYED") {
                location.href = `${path_enums[item.ce_suan_type]}.html#/result?order_id=${item.order_id}`;
            }
        },
        pay(item) {
            getResultAPI({ order_id: item.order_id }).then((res) => {
                if (res.data.redirect_url) {
                    location.href = res.data.redirect_url;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    position: relative;
    height: 100vh;
    background-color: #EAF3E9;
    display: flex;
    flex-direction: column;
    padding: 0.2rem 0;
    box-sizing: border-box;
    img {
        flex: none;
        display: block;
        width: 100%;
    }
    .bg {
        flex: auto;
        background-image: url("../../assets/img/checkstand/bg-line.png");
        background-repeat: repeat;
        background-position: center;
        background-size: contain;
    }
    .wrapper {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0.44rem 0.33rem;
        display: flex;
        flex-direction: column;
        .tabs {
            flex: none;
            display: flex;
            margin-bottom: 0.2rem;
            justify-content: space-around;
            .tab {
                font-weight: bold;
                font-size: 0.32rem;
                line-height: 0.8rem;
                text-align: center;
                color: #314a46;
                width: 2.16rem;
                height: 0.8rem;
                background-image: url("../../assets/img/order/tab.png");
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                &.active {
                    color: #e6ffff;
                background-image: url("../../assets/img/order/tab_active.png");
                }
            }
        }
        .box {
            position: relative;
            flex: auto;
            overflow: hidden;
            .scroll {
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                transition-duration: 0.2s;
                display: flex;
                .content {
                    width: 34%;
                    flex: auto;
                    height: 100%;
                    overflow: auto;
                    box-sizing: border-box;
                    .list {
                        padding: 0 0.2rem 0.2rem;
                        .item {
                            background-color: rgba(255, 255, 255, 0.6);
                            margin-bottom: 0.2rem;
                            padding: 0.2rem;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .item-info {
                                display: flex;
                                .item-pic {
                                    width: 1.4rem;
                                    height: 1.4rem;
                                    border-radius: 0.1rem;
                                    margin-right: 0.2rem;

                                    background-repeat: no-repeat;
                                    background-size: cover;
                                    background-position: center;
                                    &.BA_ZI_HE_HUN {
                                        background-image: url("../../assets/img/order/BA_ZI_HE_HUN.png");
                                    }
                                    &.QUAN_NIAN_YUN_SHI {
                                        background-image: url("../../assets/img/order/QUAN_NIAN_YUN_SHI.png");
                                    }
                                    &.YIN_YUAN_XIN_GUA {
                                        background-image: url("../../assets/img/order/YIN_YUAN_XIN_GUA.png");
                                    }
                                    &.CAI_YUN_JING_PI {
                                        background-image: url("../../assets/img/order/CAI_YUN_JING_PI.png");
                                    }
                                    &.SHI_YE_JING_PI {
                                        background-image: url("../../assets/img/order/SHI_YE_JING_PI.png");
                                    }
                                }
                                .item-right {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-around;
                                    .item-name {
                                        font-size: 0.32rem;
                                        color: #333;
                                        font-weight: bold;
                                    }
                                    .item-time {
                                        font-size: 0.26rem;
                                        color: #999;
                                    }
                                    .item-price {
                                        font-size: 0.32rem;
                                        color: #333;
                                    }
                                }
                            }
                            .item-footer {
                                margin-top: 0.1rem;
                                display: flex;
                                align-items: center;
                                .deadline {
                                    flex: auto;
                                    font-size: 0.28rem;
                                    color: #cc4b44;
                                }
                                .btn {
                                    flex: none;
                                    width: 1.6rem;
                                    height: 0.64rem;
                                    text-align: center;
                                    font-size: 0.28rem;
                                    line-height: 0.72rem;
                                    font-weight: bold;
                                    background-image: linear-gradient(to bottom, #F47553, #E92424);
                                    border: 0.02rem solid #FFD192;
                                    color: #fef8eb;
                                    border-radius: 0.16rem;
                                }
                            }
                        }
                    }
                    .nodata {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        img {
                            width: 2.84rem;
                            margin-bottom: 0.33rem;
                        }
                        div {
                            font-size: 0.32rem;
                            color: #7DADA5;
                        }
                    }
                }
            }
        }
    }
}
</style>
