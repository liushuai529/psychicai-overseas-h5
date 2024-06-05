<style lang="less" scoped>
.modal-box {
  width: 7.5rem;
  height: 11rem;
  position: relative;
  overflow: hidden;
  .title-box {
    height: 0.96rem;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.2rem 0.2rem 0 0;
    font-weight: 600;
    font-size: 0.28rem;
    color: #314a46;
    .left {
      margin-left: 0.3rem;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 0.28rem;
      color: #314A46;
      line-height: 0.36rem;
    }
    .center {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 0.36rem;
      color: black;
      line-height: 0.36rem;
    }
    .right{
      height: 0.64rem;
      margin-right: 0.3rem;
      padding: 0 0.12rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      background: linear-gradient(180deg, #f47553 0%, #e92424 99%);
      border-radius: 0.16rem;
      border: 0.02rem solid #FFD192;
      .btn {
        font-size: 0.28rem;
        font-weight: 600;
        color: #FFFFFF;
      }
    }
    .disable-right {
      background: linear-gradient(180deg, #fbc8ba 0%, #f6a8a8 100%);
      .btn {
        border: 0.02rem solid #ffedd3;
        color: #fef8eb;
      }
    }
  }
  .content-box {
    width: 100%;
    height: 10.04rem;
    margin-top: 0.96rem;
    overflow-y: scroll;
    background-color: #EC436B;
    &>.show-list{
      display: flex;
      flex-direction: column;
      &>.show-item{
        width: 100%;
        box-sizing: border-box;
        padding: 0.2rem 0.2rem 0 0.2rem;
        &>.show-img{
          width: 100%;
          vertical-align: middle;
        }
      }
    }
    
  }
}
</style>
<template>
    <mt-popup
      v-model="show"
      :closeOnClickModal="false"
      position="bottom"
    >
      <div class="modal-box">
        <div class="title-box">
          <div @click="close" class="left">关闭</div>
          <div class="center">2024年事业运势</div>
          <div
            class="right right-check"
          >
            <div class="btn" @click="callback">选择报告</div>
          </div>
        </div>
        <div class="content-box">
          <div class="show-list">
            <div class="show-item" v-for="item,idx in [0,1,2,3,4,5,6]" :key='idx' >
              <img  src="../../../assets/img/yuncheng_banner.png" class="show-img"/>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
</template>

<script>
import utils from '../../../libs/utils';
export default {
  name: 'SaleDetailModal',
  model:{
    prop: 'show',
    event: 'close'
  },

  props:{
      show:{
          type:Boolean,
          default:false
      },
      callback:{
          type:Function,
          default:function(){console.log('callback')}
      },
  },

  data(){
  },
  methods:{
    close(){
        this.$emit('close',false)
    },
  }
}
</script>
