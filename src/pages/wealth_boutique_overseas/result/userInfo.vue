<template>
  <div>
    <div class="user-info" :style="{ backgroundImage: bgc }">
      <img
        class="title"
        src="./../../../assets/img/wealth_boutique_overseas/detail/user_info_title.png"
        alt=""
      />
      <div class="content">
        <p class="name">
          <span class="sub-title">姓名：</span>{{ decodeUnicode(userInfo.name)
          }}<span class="sex">性別：{{ userInfo.sex }}</span>
        </p>
        <p class="birthday">
          <span class="sub-title">阳历：</span>{{ userInfo.gldate }}
        </p>
        <p class="birthday">
          <span class="sub-title">阴历：</span>{{ userInfo.nldate }}
        </p>
        <p><span class="sub-title">八字：</span>{{ userInfo.bazi }}</p>
        <!-- <p class="copy" @click="copyOrder" data-clipboard-target="#foo">订单号：{{this.orderId}}（点击复制订单号）</p> -->
        <input class="copyInput" type="text" id="foo" :value="this.orderId" />
      </div>
      <img
        v-if="dayun"
        class="title"
        style="width: 2.49rem; margin: 0 auto; height: 0.6rem"
        src="./../../../assets/img/wealth_boutique_overseas/detail/content_title_1.png"
        alt=""
      />
      <div
        v-if="dayun"
        class="content"
        :style="{ backgroundImage: content_bg_1 }"
      >
        <div class="content-main"></div>
      </div>
      <div class="tip" ref="tip">
        <div>订单号已复制到粘贴板</div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from './../../../libs/utils.js';
import content_bg_1 from './../../../assets/img/wealth_boutique_overseas/detail/content_bg_1.png';
import bg from './../../../assets/img/wealth_boutique_overseas/detail/user_info_bg.jpg';
import Clipboard from 'clipboard';
export default {
  props: ['userInfo', 'dayun', 'orderId'],
  data() {
    return {
      gongli_nongli_string: '',
      content_bg_1: content_bg_1,
    };
  },
  created() {
    var clipboard = new Clipboard('.copy');
    clipboard.on('success', function (e) {
      // console.info('Action:', e.action);
      // console.info('Text:', e.text);
      // console.info('Trigger:', e.trigger);

      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  },
  computed: {
    bgc() {
      return 'url("' + bg + '")';
    },
    name_decode() {
      return this.decodeUnicode(this.user_info.name);
    },
  },
  watch: {
    userInfo(newV, oldV) {
      this.user_info = newV;
      this.gongli_nongli_string = newV.gongliOrNongli;
    },
  },
  methods: {
    decodeUnicode(str) {
      str = str.replace(/\\/g, '%');
      return unescape(str);
    },
    copyOrder() {
      this.$refs.tip.style.display = 'block';
      setTimeout(() => {
        this.$refs.tip.style.display = 'none';
      }, 1000);
    },
  },
  filters: {
    filter_sex(val) {
      if (val == '1') {
        return '男';
      } else {
        return '女';
      }
    },
    filterNongliMonth(val) {
      return utils.formateNongliMonth(val);
    },
    filterNongliDate(val) {
      return utils.formateNongliDate(val);
    },
    filterNongliHour(val) {
      return utils.formateNongliHour(val);
    },
    filter_hour(val) {
      let result = '不清楚具体时间';
      switch (val) {
        case '0':
          result = '子时(23:00 - 00:59)';
          break;
        case '1':
          result = '丑时(01:00 - 02:59)';
          break;
        case '2':
          result = '丑时(01:00 - 02:59)';
          break;
        case '3':
          result = '寅时(03:00 - 04:59)';
          break;
        case '4':
          result = '寅时(03:00 - 04:59)';
          break;
        case '5':
          result = '卯时(05:00 - 06:59)';
          break;
        case '6':
          result = '卯时(05:00 - 06:59)';
          break;
        case '7':
          result = '辰时(07:00 - 08:59)';
          break;
        case '8':
          result = '辰时(07:00 - 08:59)';
          break;
        case '9':
          result = '巳时(09:00 - 10:59)';
          break;
        case '10':
          result = '巳时(09:00 - 10:59)';
          break;
        case '11':
          result = '午时(11:00 - 12:59)';
          break;
        case '12':
          result = '午时(11:00 - 12:59)';
          break;
        case '13':
          result = '未时(13:00 - 14:59)';
          break;
        case '14':
          result = '未时(13:00 - 14:59)';
          break;
        case '15':
          result = '申时(15:00 - 16:59)';
          break;
        case '16':
          result = '申时(15:00 - 16:59)';
          break;
        case '17':
          result = '酉时(17:00 - 18:59)';
          break;
        case '18':
          result = '酉时(17:00 - 18:59)';
          break;
        case '19':
          result = '戌时(19:00 - 20:59)';
          break;
        case '20':
          result = '戌时(19:00 - 20:59)';
          break;
        case '21':
          result = '亥时(21:00 - 22:59)';
          break;
        case '22':
          result = '亥时(21:00 - 22:59)';
          break;
        case '23':
          result = '子时(23:00 - 00:59)';
          break;
      }
      return result;
    },
  },
};
</script>

<style scoped>
.user-info {
  background-image: url('http://img4.imgtn.bdimg.com/it/u=3813655879,3975954109&fm=27&gp=0.jpg');
  background-color: #d71618;
  background-repeat: repeat-y;
  -webkit-background-size: 100%;
  background-size: 100%;
}
.user-info .content {
  width: 90%;
  margin: 0.4rem auto;
  padding: 0.2rem 0.6rem;
  background-color: #f4e5c2;
  font-size: 0.3rem;
  -webkit-border-radius: 0.12rem;
  border-radius: 0.12rem;
  margin-bottom: 0;
  color: #d13c3e;
}

.title {
  width: 80%;
  display: block;
  text-align: center;
  margin-left: 10%;
}
.sex {
  margin-left: 0.3rem;
}
.title .sex {
  margin-top: 0.34rem;
}

.detail {
  padding-top: 0.28rem;
}
.name {
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.copyInput {
  opacity: 0;
  position: absolute;
  z-index: -999999;
  /* width:1px;
        height:1px; */
}
.birthday {
  /* margin: 0.08rem 0; */
}
.tip {
  position: fixed;
  top: 0;
  font-size: 0.3rem;
  height: 100%;
  width: 100%;
  z-index: 999999999;
  display: none;
}
.tip div {
  margin: 0 auto;
  max-width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  color: white;
  text-align: center;
  padding: 0.2rem 0;
  top: 40%;
  position: relative;
}
</style>
