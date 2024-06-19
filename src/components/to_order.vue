<!--
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-21 15:18:17
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2022-12-08 13:34:08
 * @Description: 跳转订单列表页按钮 组件
 * @FilePath: \find-future-overseas\src\components\to_order.vue
-->
<template>
    <div class="to-order" @click="toOrder">
        <img src="../assets/img/to-order.webp" alt="">
    </div>
</template>
 
<script>
    import utils from '../libs/utils.js'
    export default {
        methods: {
            toOrder () {
                utils.toOrder();
            }
        }
    }
</script>
 
<style scoped>
    .to-order {
        width: 2.2rem;
        position: fixed;
        bottom: 0.6rem;
        right: 0.2rem;
        z-index: 999;
    }
 
    .to-order img {
        display: block;
        width: 100%;
    }
 
    .to-order p {
        line-height: 1.2;
    }
    .first {
        margin-top: 0.08rem;
    }
</style>