<!--
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-31 11:28:50
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-04-11 13:52:39
 * @Description: 
-->
<template>
  <div :class="is_in_app ? 'app-box' : 'out-box'">
    <appOrder v-if="is_in_app" />
    <outerOrder v-else />
  </div>
</template>

<script>
import utils from '../../libs/utils';
import outerOrder from './outer_order.vue';
import appOrder from './app_order.vue';
export default {
  name: 'HistoryOrder',
  components: {
    outerOrder,
    appOrder,
  },
  data() {
    return {
      // Your data properties go here
    };
  },
  computed: {
    is_in_app() {
      return utils.isInApp();
    },
  },
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
