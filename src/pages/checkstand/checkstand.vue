<!--
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-24 15:53:13
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-04-24 14:42:09
 * @Description: 收银台
 * @FilePath: \find-future-overseas\src\pages\checkstand\index.vue
-->
<template>
    <div class="container">
        <template v-if="!loading">
            <div class="price">
                <!-- {{product.currency || '-'}} -->
                RM
                <span>{{ product.price || "-" }}</span>
            </div>
            <div class="good-name">“{{ name }}”測算服務費用</div>
            <div class="checkstand">
                <img src="../../assets/img/checkstand/bg-top.png" alt />
                <div class="wrapper">
                    <div class="title">請選擇支付方式</div>
                    <div class="item" v-for="(item, i) in list" @click="index = i">
                        <div class="left">
                            <div class="icon" :class="getPayIcon(item.payment_name)"></div>
                            <div class="name">{{ item.name }}</div>
                            <div class="refund">{{ canRefund(item.payment_name) }}</div>
                        </div>
                        <img class="check" v-if="index === i" src="../../assets/img/checkstand/checked.png" alt />
                        <img class="check" v-else src="../../assets/img/checkstand/unchecked.png" alt />
                    </div>
                </div>
                <img style="margin-top: -1px" src="../../assets/img/checkstand/bg-bottom.png" alt />
            </div>
            <div class="btn" @click="pay">去支付</div>
        </template>
    </div>
</template>

<script>
import moment from "moment";
import { Indicator } from "mint-ui";
import { getGoodsListAPI, getFortuneGoodsListAPI, orderAPI } from "../../api/api";
import { product_enums, path_enums } from "../../libs/enum";

// 名称映射
const payMethodsMap = {
    NET_BANKING: "FPX",
    AXIATABOOST: "Boost",
    TNG: "Touch'n Go",
    GRABPAY: "Grabpay",
    MAYBANK: "Maybank QR",
};

export default {
    data() {
        return {
            loading: false,
            product_id: "",
            product: {},
            payment_details: [],
            index: 0,
            paying: false,
        };
    },
    computed: {
        // 商品名称
        name() {
            return product_enums[this.product_id] || "-";
        },
        // 支付列表
        list() {
            let list = [];
            this.payment_details.forEach((item) => {
                if (item.payment_target_orgs.length) {
                    item.payment_target_orgs.forEach((item2) => {
                        list.push({
                            payment_name: item2,
                            name: payMethodsMap[item2],
                            payment_target_org: item2,
                            payment_type: item.payment_type,
                        });
                    });
                } else {
                    list.push({
                        payment_name: item.payment_type,
                        name: payMethodsMap[item.payment_type],
                        payment_target_org: null,
                        payment_type: item.payment_type,
                    });
                }
            });
            return list;
        },
        isFortune() {
            return this.product_id == 101 || this.product_id == 102;
        },
    },
    created() {
        document.title = "收銀台";
        this.query();
    },
    methods: {
        // 能否退款文本
        canRefund(type) {
            return type === "NET_BANKING" ? "不支持退款" : "支持退款";
        },
        // 获取图标
        getPayIcon(type) {
            return {
                [type]: true,
            };
        },
        // 请求支付类型
        query() {
            let product_id = new URLSearchParams(location.search).get("product_id");
            this.product_id = product_id;

            this.loading = true;
            Indicator.open("收銀台加載中...");

            // 区分运势商品和测算商品
            let api = this.isFortune ? getFortuneGoodsListAPI : getGoodsListAPI;

            api({ product_id })
                .then((res) => {
                    let products = res.data.products || [];
                    this.product = products[0] || {};
                    this.payment_details = this.product.payment_details || {};
                    this.loading = false;
                    Indicator.close();
                })
                .catch((err) => {
                    this.loading = false;
                    Indicator.close();
                });
        },
        // 解析参数字符串
        getExtra() {
            let params = null;
            let query_user_string = new URLSearchParams(location.search).get("query_user_string");
            let query_user_string_array = query_user_string.split("|");

            // 八字合婚 双人信息
            if (this.product_id == 1) {
                let [male_name, female_name, male_birth_year, male_birth_month, male_birth_date, female_birth_year, female_birth_month, female_birth_date, male_birth_hour, female_birth_hour, male_is_gongli, female_is_gongli, sex] = query_user_string_array;

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
                };
            }
            // 其他 单人信息
            else {
                let [name, sex, is_gongli, birth_year, birth_month, birth_date, birth_hour] = query_user_string_array;

                params = {
                    name,
                    sex,
                    is_gongli,
                    birth_year,
                    birth_month,
                    birth_date,
                    birth_hour,
                    date: moment(`${birth_year}/${birth_month}/${birth_date}`).format("YYYYMMDD"),
                };
            }
            return params;
        },
        // 支付
        pay() {
            // 支付公共参数
            let params = {
                payment_currency: this.product.currency,
                payment_target_org: this.list[this.index].payment_target_org,
                payment_type: this.list[this.index].payment_type,
                product_id: this.product_id,
            };

            // 区分处理运势和测算的 callback和extra
            // if (this.isFortune) {
            //     params.callback_url = `${location.origin}/index.html?index=1&fortune_index=${this.product_id == 101 ? 1 : 2}`
            // } else {
            //     params.callback_url = `${location.origin}/${
            //         path_enums[this.product_id]
            //     }.html#/result`;
            //     params.extra = this.getExtra();
            // }

            let fbPath = localStorage.getItem("suishen_overseas_fb_path");
            
            if (this.isFortune) {
                params.callback_url = `${location.origin}/${fbPath}/result.html?path=index&index=1&fortune_index=${this.product_id == 101 ? 1 : 2}`;
            } else {
                params.callback_url = `${location.origin}/${fbPath}/result.html?path=${path_enums[this.product_id]}`;
                params.extra = this.getExtra();
            }

            if (this.paying) return false;

            let { currency, price } = this.product;
            localStorage.setItem('fb_currency', currency);
            localStorage.setItem('fb_price', price);

            this.paying = true;
            Indicator.open("訂單創建中...");
            orderAPI(params).then((res) => {
                let redirect_url = res.data.redirect_url;
                location.href = redirect_url;
                Indicator.close();
                this.paying = false;
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./../../less/pay.less";

.container {
    min-height: 100vh;
    background-color: #EAF3E9;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    .price {
        color: #cc4b44;
        font-size: 0.36rem;
        font-weight: bold;
        margin: 0.6rem 0 0.25rem;
        span {
            font-size: 0.72rem;
            margin-top: 2px;
        }
    }
    .good-name {
        color: rgba(91, 65, 13, 0.5);
        font-size: 0.28rem;
        margin-bottom: 0.35rem;
    }
    .checkstand {
        margin-bottom: 0.6rem;
        width: 100%;
        img {
            display: block;
            width: 100%;
        }
        .wrapper {
            margin-top: -1px;
            box-sizing: border-box;
            padding: 0 0.7rem;
            background-image: url("../../assets/img/checkstand/bg-line.png");
            background-repeat: repeat;
            background-position: center;
            background-size: contain;
            .title {
                color: rgba(91, 65, 13, 0.5);
                font-size: 0.3rem;
                margin-bottom: 0.3rem;
            }
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.4rem;
                &:last-child {
                    margin: 0;
                }
                .left {
                    display: flex;
                    align-items: center;
                    .icon {
                        width: 0.56rem;
                        height: 0.56rem;
                        background-color: #fff;
                        margin-right: 0.16rem;
                        border-radius: 50%;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-position: center;
                    }
                    .name {
                        color: #222222;
                        font-size: 0.32rem;
                        font-weight: bold;
                    }
                    .refund {
                        color: rgba(91, 65, 13, 0.5);
                        font-size: 0.24rem;
                        margin-left: 0.2rem;
                    }
                }
                .check {
                    width: 0.36rem;
                    height: 0.36rem;
                }
            }
        }
    }
    .btn {
        margin: 0 auto;
        width: 6.3rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.36rem;
        color: #fff;
        background-color: #af742e;
        border-radius: 0.08rem;
        text-align: center;
        font-weight: bold;
    }
}
</style>
