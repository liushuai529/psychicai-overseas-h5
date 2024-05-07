<!--
 * @Author: ZhaoZhiqi
 * @Date: 2023-05-16 18:21:57
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-05-29 17:14:31
 * @Description: TopBar
 * @FilePath: \find-future-overseas\src\components\TopBar.vue
-->
<template>
    <div class="topbar">
        <div class="tab" :class="{ active: i === index }" v-for="(item, i) in list" @click="link(item)">{{ item.title }}</div>
    </div>
</template>

<script>
export default {
    props: {
        index: {
            default: 0,
            type: Number,
        },
    },
    data() {
        return {
            list: [
                {
                    item_id: 5,
                    title: "事業精批",
                    url: "career_divination_overseas",
                },
                {
                    item_id: 1,
                    title: "八字合婚",
                    url: "marriage_measure_overseas",
                },
                {
                    item_id: 3,
                    title: "婚缘心卦",
                    url: "marriage_divination_overseas",
                },
                {
                    item_id: 2,
                    title: "全年運勢",
                    url: "new_year_luck_overseas",
                },
                {
                    item_id: 4,
                    title: "財運精批",
                    url: "wealth_boutique_overseas",
                },
            ],
        };
    },
    methods: {
        link(item) {
            location.replace(item.url + ".html?from_nav=1");
        },
    },
};
</script>

<style scoped lang="less">
.topbar {
    position: relative;
    height: 0.8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #eaf3e9;
    z-index: 2;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0.16rem;
    .tab {
        width: 1.52rem;
        height: 0.52rem;
        line-height: 0.52rem;
        text-align: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        font-size: 0.28rem;
        font-weight: bold;
        color: #314a46;
        &.active {
            color: #fff;
            background-image: url("../assets/img/3.0/topbar-tab.png");
        }
    }
}
</style>
