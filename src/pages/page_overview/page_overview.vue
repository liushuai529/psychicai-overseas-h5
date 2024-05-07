<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-30 14:49:51
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-01-15 10:15:16
 * @Description: 测算汇总页
-->
<template>
  <div class="whole">
    <h3>H5 页面汇总</h3>
    <div class="content">
      <ul>
        <li v-for="it in menuList" @click="pageJump(it)">
          {{ it.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const getMenuList = () => {
  return [
    {
      name: '测算主页',
      path: 'index',
    },
    {
      name: '历史订单',
      path: 'history_order',
    },
    {
      name: '即时测算',
      path: 'current_measure',
    },
    {
      name: '2023兔年一生财运',
      path: 'wealth_boutique_overseas',
    },
    {
      name: '2023兔年流年运程详批',
      path: 'new_year_luck_overseas',
    },
    {
      name: '2024龙年财富财运',
      path: 'lucky_year_report',
    },
    {
      name: '八字事业详批',
      path: 'career_divination_overseas',
    },
    {
      name: '姻缘分析',
      path: 'marriage_divination_overseas',
    },
    {
      name: '八字合婚',
      path: 'marriage_measure_overseas',
    },
    {
      name: '鬼谷子百卦',
      path: 'guiguzi_fortune',
    },
    {
      name: '袁天罡称骨',
      path: 'weigh_bone',
    },
    {
      name: '24年感情运',
      path: 'emotion_fortune',
    },
    // {
    //   name:'24年事业运',
    //   path:''
    // },
  ];
};

export default {
  data() {
    return {
      menuList: getMenuList(),
    };
  },
  computed: {},
  methods: {
    pageJump(it) {
      location.href = `/${it.path}.html`;
    },
  },
};
</script>

<style scoped lang="less">
h3 {
  text-align: center;
}
.whole {
  font-size: 0.26rem;
}
.content {
  color: #5f7ddd;
  li {
    margin-bottom: 0.2rem;
  }
}
</style>
