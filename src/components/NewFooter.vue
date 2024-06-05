<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-05-30 18:31:51
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-30 18:34:29
 * @Description: 底部遮罩层
-->
<template>
  <div class="new-footer"></div>
</template>

<script>
export default {
  name: "NewFooter",
};
</script>

<style scoped lang="less">
.new-footer {
  position: fixed;
  background: #000;
  opacity: 0.5;
  width: 100%;
  height: 2.8rem;
  z-index: 98;
  bottom: 0;
}
</style>
