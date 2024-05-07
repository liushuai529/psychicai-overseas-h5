<template>
    <div>
        <img class="top" src="../../../assets/img/new_year_luck_overseas/result/detail_2.png" alt="">
        <div class="content" :style="{backgroundImage:center_bg}">
            <slot></slot>
        </div> 
        <img class="bottom" src="../../../assets/img/new_year_luck_overseas/result/detail_3.png" alt=""> 
    </div>
</template>
<script>
    import bg from "../../../assets/img/new_year_luck_overseas/result/detail_4.png"
    export default {
        computed: {
            center_bg() {
                return 'url(' + bg + ')'
            }
        }
    }
</script>
<style scoped>
    .content {
        background-size: 100% 100%;
        margin-top: -0.05rem;
        overflow: hidden;
    }
    
    .top,
    .bottom {
        width: 100%;
        margin: 0;
        display: block;
    }
    
    .bottom {
        margin-top: -0.05rem;
    }
</style>