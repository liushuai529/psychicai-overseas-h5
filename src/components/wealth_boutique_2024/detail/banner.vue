<template>
    <div class="banner" v-show="show_banner" :class="{'iphonex-banner': isIphonex}">
        <img class="btn" @click="checkResult" src="../../../assets/img/gossip/detail/detail_btn_unlock.png" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show_banner: false
            }
        },
        computed: {
            isIphonex () {
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
            }
        },
        methods: {
            checkResult() {
                this.$parent.autoUnlock();
            },
            isIphoneX() {
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            }
        }
    }
</script>

<style scoped>
    .banner {
        width: 100%;
        height: 1.06rem;
        background-color: #fef8ec;
        position: fixed;
        bottom: 0;
        left: 0;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        text-align: center;
    }
    
    .iphonex-banner {
        height: 1.6rem;
    }
    
    .btn {
        width: 2.5rem;
        vertical-align: top;
        margin-top: 0.16rem;
    }
</style>