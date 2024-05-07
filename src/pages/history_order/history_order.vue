<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-31 11:28:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-07 19:08:37
 * @Description: 
-->
<template>
  <div :class="'out-box'">
    <outerOrder />
  </div>
</template>

<script>
import outerOrder from './outer_order.vue';
export default {
  name: 'HistoryOrder',
  components: {
    outerOrder,
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    document.title = this.$t('page-title');
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.app-box {
  background: #f3ede5;
}
.out-box {
  background: #d2e7de;
  height: 100vh;
  overflow-y: hidden;
}
/* Your component styles go here */
</style>
