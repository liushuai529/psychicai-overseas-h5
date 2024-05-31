/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-02-28 16:49:35
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-31 11:11:31
 * @Description: 工具函数
 */
import moment from 'moment';

/**
 * @description: 获取FB代理渠道
 * @return {*}
 */
const getFBChannel = () => {
  let url = location.href;

  if (url.indexOf('enjoy01') > -1) {
    return 'enjoy01';
  } else if (url.indexOf('nova01') > -1) {
    return 'nova01';
  } else if (url.indexOf('panda01') > -1) {
    return 'panda01';
  } else if (url.indexOf('panda02') > -1) {
    return 'panda02';
  } else if (url.indexOf('enjoy02') > -1) {
    return 'enjoy02';
  } else if (url.indexOf('enjoy03') > -1) {
    return 'enjoy03';
  } else if (url.indexOf('panda03') > -1) {
    return 'panda03';
  } else {
    return 'own';
  }
};
/**
 * @description: 是否是生产环境
 * @return {*}
 */
const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * @description: 是否是测试环境
 * @return {*}
 */
const isTest = () => {
  return process.env.NODE_ENV === 'test';
};

/**
 * @description: 是否是开发环境
 * @return {*}
 */
const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

/**
 * @description: 获取UA信息
 * @return {*}
 */
const user_agent = () => navigator.userAgent;
console.log('user_agent', user_agent());

/**
 * @description: 格式化时间
 * @param {*} date
 * @param {*} pattern
 * @param {*} is12System
 * @return {*}
 */
const formatDate = function (date, pattern, is12System) {
  if (date == undefined) {
    date = new Date();
  }
  if (pattern == undefined) {
    pattern = 'yyyy-MM-dd hh:mm:ss';
  }
  if (is12System == undefined) {
    is12System = false;
  }
  return format(date, pattern, is12System);

  function format(dateTime, format, is12System) {
    var date = new Date(dateTime);
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+':
        is12System && date.getHours() > 12
          ? date.getHours() - 12
          : date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }

    if (is12System) {
      format += date.getHours() > 12 ? ' PM' : ' AM';
    }

    return format;
  }
};

/**
 * @description: 获取随机字符串
 * @param {*} length
 * @return {*}
 */
const getRandomString = function (length = 10) {
  let key = '';
  let ascTable =
    '0123456789abcdefghijklmhopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ascTable = ascTable.split('');
  for (let i = 0; i < length; ++i) {
    key += ascTable[parseInt(Math.random() * 62)].toString();
  }
  return key;
};

/**
 * @description: 获取0到N的随机整数(小于N)
 * @param {int} 随机范围 默认100
 * @return {int} 随机正整数
 */
const getRandom = r => {
  r = r ? Math.floor(Math.abs(r)) : 100;
  return Math.floor(Math.random() * r);
};

/**
 * @description: 生成uuid
 * @return {*}
 */
function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

/**
 * @description: 获取ua参数
 * @param {*} param 参数
 * @return {*}
 */
function getUAParam(param) {
  var res = '';
  var po = user_agent().indexOf(`${param}=`);
  if (po > -1) {
    var theStr = user_agent().substring(
      po + param.length + 1,
      user_agent().length
    );
    po = theStr.indexOf(';');
    if (po > -1) {
      res = theStr.substring(0, po);
    } else {
      po = theStr.indexOf('}');
      if (po > -1) {
        suid = theStr.substring(0, po);
      }
    }
  }
  return res;
}

/**
 * @description: 获取设备devid 从ua中取devid，没有的情况取device_id
 * @return {*}
 */
function getDevid() {
  let devid = getDeviceId();

  return devid;
}

/**
 * @description: 获取设备device_id
 * @return {*}
 */
function getDeviceId() {
  let device_id;
  device_id =
    window.localStorage.getItem('psychicai_device_id') ||
    hex_md5(generateUUID());
  window.localStorage.setItem('psychicai_device_id', device_id);
  return device_id;
}

/**
 * @description: 是否是万年历app内
 * @return {*}
 */
const isZhwnl = function () {
  return /ecalendar/g.test(user_agent());
};

/**
 * @description: 滚动动画
 * @param {*} currentY
 * @param {*} targetY
 * @return {*}
 */
const scrollAnimation = (currentY, targetY) => {
  let needScrollTop = targetY - currentY;
  let _currentY = currentY;
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10);
    _currentY += dist;
    window.scrollTo(_currentY, currentY);
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY);
    } else {
      window.scrollTo(_currentY, targetY);
    }
  }, 1);
};

/**
 * @description: 格式化农历月份
 * @param {*} month
 * @return {*}
 */
const formateNongliMonth = function (month) {
  let result = '';
  let m = parseInt(month);
  switch (m) {
    case 1:
      result = '正月';
      break;
    case 2:
      result = '二月';
      break;
    case 3:
      result = '三月';
      break;
    case 4:
      result = '四月';
      break;
    case 5:
      result = '五月';
      break;
    case 6:
      result = '六月';
      break;
    case 7:
      result = '七月';
      break;
    case 8:
      result = '八月';
      break;
    case 9:
      result = '九月';
      break;
    case 10:
      result = '十月';
      break;
    case 11:
      result = '冬月';
      break;
    case 12:
      result = '腊月';
      break;
  }
  if (getLanguage() === 'zh-TW' && m === 12) {
    result = '臘月';
  }
  return result;
};

/**
 * @description: 格式化农历日期
 * @param {*} date
 * @return {*}
 */
const formateNongliDate = function (date) {
  let result = '';
  let d = parseInt(date);
  switch (d) {
    case 1:
      result = '初一';
      break;
    case 2:
      result = '初二';
      break;
    case 3:
      result = '初三';
      break;
    case 4:
      result = '初四';
      break;
    case 5:
      result = '初五';
      break;
    case 6:
      result = '初六';
      break;
    case 7:
      result = '初七';
      break;
    case 8:
      result = '初八';
      break;
    case 9:
      result = '初九';
      break;
    case 10:
      result = '初十';
      break;
    case 11:
      result = '十一';
      break;
    case 12:
      result = '十二';
      break;
    case 13:
      result = '十三';
      break;
    case 14:
      result = '十四';
      break;
    case 15:
      result = '十五';
      break;
    case 16:
      result = '十六';
      break;
    case 17:
      result = '十七';
      break;
    case 18:
      result = '十八';
      break;
    case 19:
      result = '十九';
      break;
    case 20:
      result = '二十';
      break;
    case 21:
      result = '廿一';
      break;
    case 22:
      result = '廿二';
      break;
    case 23:
      result = '廿三';
      break;
    case 24:
      result = '廿四';
      break;
    case 25:
      result = '廿五';
      break;
    case 26:
      result = '廿六';
      break;
    case 27:
      result = '廿七';
      break;
    case 28:
      result = '廿八';
      break;
    case 29:
      result = '廿九';
      break;
    case 30:
      result = '三十';
      break;
  }
  return result;
};

/**
 * @description: 格式化农历时辰
 * @param {*} hour
 * @return {*}
 */
const formateNongliHour = function (hour) {
  let shichen = '';
  let h = parseInt(hour);
  let language = getLanguage();
  if (language === 'zh-TW') {
    return TW_formateNongliHour(h);
  }
  switch (h) {
    case 23:
      shichen = '23时子';
      break;
    case 0:
      shichen = '0时子';
      break;
    case 1:
      shichen = '1时丑';
      break;
    case 2:
      shichen = '2时丑';
      break;
    case 3:
      shichen = '3时寅';
      break;
    case 4:
      shichen = '4时寅';
      break;
    case 5:
      shichen = '5时卯';
      break;
    case 6:
      shichen = '6时卯';
      break;
    case 7:
      shichen = '7时辰';
      break;
    case 8:
      shichen = '8时辰';
      break;
    case 9:
      shichen = '9时巳';
      break;
    case 10:
      shichen = '10时巳';
      break;
    case 11:
      shichen = '11时午';
      break;
    case 12:
      shichen = '12时午';
      break;
    case 13:
      shichen = '13时未';
      break;
    case 14:
      shichen = '14时未';
      break;
    case 15:
      shichen = '15时申';
      break;
    case 16:
      shichen = '16时申';
      break;
    case 17:
      shichen = '17时酉';
      break;
    case 18:
      shichen = '18时酉';
      break;
    case 19:
      shichen = '19时戌';
      break;
    case 20:
      shichen = '20时戌';
      break;
    case 21:
      shichen = '21时亥';
      break;
    case 22:
      shichen = '22时亥';
      break;
    default:
      shichen = '未知时辰';
  }
  return shichen;
};

/**
 * @description: 繁体化农历时辰
 * @param {*} h
 * @return {*}
 */
const TW_formateNongliHour = function (h) {
  let shichen = '';
  switch (h) {
    case 23:
      shichen = '23時子';
      break;
    case 0:
      shichen = '0時子';
      break;
    case 1:
      shichen = '1時醜';
      break;
    case 2:
      shichen = '2時醜';
      break;
    case 3:
      shichen = '3時寅';
      break;
    case 4:
      shichen = '4時寅';
      break;
    case 5:
      shichen = '5時卯';
      break;
    case 6:
      shichen = '6時卯';
      break;
    case 7:
      shichen = '7時辰';
      break;
    case 8:
      shichen = '8時辰';
      break;
    case 9:
      shichen = '9時巳';
      break;
    case 10:
      shichen = '10時巳';
      break;
    case 11:
      shichen = '11時午';
      break;
    case 12:
      shichen = '12時午';
      break;
    case 13:
      shichen = '13時未';
      break;
    case 14:
      shichen = '14時未';
      break;
    case 15:
      shichen = '15時申';
      break;
    case 16:
      shichen = '16時申';
      break;
    case 17:
      shichen = '17時酉';
      break;
    case 18:
      shichen = '18時酉';
      break;
    case 19:
      shichen = '19時戌';
      break;
    case 20:
      shichen = '20時戌';
      break;
    case 21:
      shichen = '21時亥';
      break;
    case 22:
      shichen = '22時亥';
      break;
    default:
      shichen = '未知時辰';
  }
  return shichen;
};

/**
 * @description: 是否是微信小程序
 * @return {*}
 */
const isMiniProgram = () => {
  return window.__wxjs_environment === 'miniprogram';
};

/**
 * @description: 小程序跳转
 * @param {*} url
 * @return {*}
 */
const miniProgramNavigateTo = url => {
  wx.miniProgram.navigateTo({
    url: url,
  });
};

/**
 * @description: 是否是微信想
 * @return {*}
 */
const isWechat = () => {
  return /micromessenger/i.test(user_agent());
};

/**
 * @description: 是否是支付宝
 * @return {*}
 */
const isAlipay = () => {
  return /alipay/i.test(user_agent());
};

/**
 * @description: 获取请求参数
 * @param {*} key
 * @return {*}
 */
const getQueryString = function (key) {
  return new URLSearchParams(location.search).get(key);
};

/**
 * @description: 请求参数
 * @param {*} key
 * @return {*}
 */
const getQueryStr = function (key) {
  if (typeof window !== 'undefined') {
    let url = location.hash;
    let theRequest = new Object();
    if (url.indexOf('?') != -1) {
      let str = url.substr(1).split('?')[1];
      let strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
      }
    }
    return theRequest[key] == null ? '' : theRequest[key];
  }
};

/**
 * @description:跳转订单页
 * @return {*}
 */
const toOrder = () => {
  location.href = 'order.html';
};

/**
 * @description: 获取渠道
 * @return {*}
 */
const getChannel = () => {
  var channel_key = 'etouch_channel';
  //读取url参数
  var channel = getQueryString('channel') || '';
  if (channel) {
    var channel_entry = {
      expires: new Date().getTime(),
      value: channel,
    };
    window.localStorage.setItem(channel_key, JSON.stringify(channel_entry));
  }

  //读取本地缓存
  if (!channel) {
    var channel_entry = window.localStorage.getItem(channel_key);
    if (channel_entry) {
      channel_entry = JSON.parse(channel_entry);
      if (
        channel_entry.expires >=
        new Date().getTime() - 1000 * 60 * 60 * 24 * 2
      ) {
        channel = channel_entry.value;
      }
    }
  }

  //设置默认值
  if (!channel) {
    channel = 'own';
  }

  return channel;
};

/**
 * @description: 获取UID
 * @return {*}
 */
const getUid = function () {
  var suid = '';
  var po = user_agent().indexOf('suid=');
  if (po > -1) {
    var theStr = user_agent().substring(po + 5, user_agent().length);
    po = theStr.indexOf(';');
    if (po > -1) {
      suid = theStr.substring(0, po);
    } else {
      po = theStr.indexOf('}');
      if (po > -1) {
        suid = theStr.substring(0, po);
      }
    }
  }
  return suid;
};
/**
 * @description: 点击复制到剪贴板 异步
 * @param {String} text 复制文本
 * @return {Boolean} 是否复制成功
 */
const copyToClipboard = text => {
  try {
    if (window.clipboardData) {
      window.clipboardData.setData('text', text);
    } else {
      (function (text) {
        document.oncopy = function (e) {
          e.clipboardData.setData('text', text);
          e.preventDefault();
          document.oncopy = null;
        };
      })(text);
      document.execCommand('Copy');
    }
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * @description: 判断是否是生产环境
 * @return {*}
 */
const isProd = () => {
  // return true;
  return ['192.168', 'localhost', 'test', '10.1.9', '10.206.0.133'].every(
    item => {
      return window.location.href.indexOf(item) < 0;
    }
  );
};

//获取UA信息返回数组
const getDataArrayFromUserAgent = () => {
  return {};
};

/**
 * @description: 是否安卓系统
 * @return {*}
 */
const isAndroid = () => {
  let ua = user_agent().toLowerCase();
  return /android/i.test(ua);
};

/**
 * @description: 获取请求参数
 * @param {*} key 参数key
 * @param {*} index  数据的下标
 * @return {*}
 */
const getRequestParams = key => {
  let array = getDataArrayFromUserAgent();
  if (array && array[key]) {
    return array[key];
  }
  return '';
};

/**
 * 获取app版本
 */
export const getVersion = ver_name => {
  let array = getDataArrayFromUserAgent();
  return array['ver_name'];
};

/**
 * @description: 客户端版本号
 * @param {*} ver_code
 * @return {*}
 */
const getVerCode = () => {
  let array = getDataArrayFromUserAgent();
  return array['ver_code'];
};

/**
 * 判断当前版本号是否大于传入的版本号
 * 大于 return true
 * 小于或等于 return false
 */
export const isVersionMoreThan = (v = '1.0.0') => {
  let current_version_ = getVersion();
  if (!current_version_) return false;
  let array = current_version_.split('.');
  let v_1 = +array.join('');
  let com_version = +v.split('.').join('');
  return v_1 > com_version;
};

// 获取客户端默认用户信息
export const getInitUserInfo = () => {
  let initUserInfo = {
    //?name=Moses&sex=0&nongli=1&date=19890321&shic=-1
    name: getQueryStr('name') || null,
    sex: getQueryStr('sex') || null,
    nongli: getQueryStr('nongli') || null,
    date: getQueryStr('date') || null,
    shic: getQueryStr('shic') || null,
  };
  return initUserInfo;
};

/**
 * @description: 设置用户信息
 * @param {*} vm
 * @return {*}
 */
export const setInitUserinfo = vm => {
  let initUserInfo = getInitUserInfo();
  if (initUserInfo.name) vm.username = initUserInfo.name;
  if (initUserInfo.sex) vm.sex = (initUserInfo.sex == 1 && 'female') || 'male';
  if (initUserInfo.nongli) {
    vm.show_nongli = initUserInfo.nongli == 0;
    if (initUserInfo.date) {
      let str = initUserInfo.date + '';
      let y = str.substring(0, 4);
      let m = parseInt(str.substring(4, 6));
      let d = str.substring(6, 8);
      if (initUserInfo.nongli == 0) {
        // 農曆
        vm.picker_date =
          '农历' +
          ' ' +
          y +
          '年' +
          formateNongliMonth(m) +
          formateNongliDate(d);
      } else {
        // 公曆
        vm.picker_date = '公历' + ' ' + y + '年' + m + '月' + d + '日';
      }
      // 生日实际传值
      let pick_date = {
        year: y,
        month: m,
        date: d,
      };
      vm.picker_date_obj = pick_date;
    }
  }
  if (initUserInfo.shic) vm.picker_hour = formateNongliHour(initUserInfo.shic);
};

// UTF8转汉字
function revertUTF8(szInput) {
  var x,
    wch,
    wch1,
    wch2,
    uch = '',
    szRet = '';
  for (x = 0; x < szInput.length; x++) {
    if (szInput.charAt(x) == '%') {
      wch = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
      if (!wch) {
        break;
      }
      if (!(wch & 0x80)) {
        wch = wch;
      } else if (!(wch & 0x20)) {
        x++;
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        wch = (wch & 0x1f) << 6;
        wch1 = wch1 & 0x3f;
        wch = wch + wch1;
      } else {
        x++;
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        x++;
        wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        wch = (wch & 0x0f) << 12;
        wch1 = (wch1 & 0x3f) << 6;
        wch2 = wch2 & 0x3f;
        wch = wch + wch1 + wch2;
      }
      szRet += String.fromCharCode(wch);
    } else {
      szRet += szInput.charAt(x);
    }
  }
  return szRet;
}

/**
 * @description: 复制文本
 * @param {*} text
 * @return {*}
 */
function copyText(text) {
  // text是复制文本
  // 创建input元素
  const el = document.createElement('input');
  // 给input元素赋值需要复制的文本
  el.setAttribute('value', text);
  // 将input元素插入页面
  document.body.appendChild(el);
  // 选中input元素的文本
  el.select();
  // 复制内容到剪贴板
  document.execCommand('copy');
  // 删除input元素
  document.body.removeChild(el);
}

/**
 * @description: unicode解码
 * @param {string} str
 * @return {string}
 */
const decodeUnicode = str => {
  str = str.replace(/\\/g, '%');
  return unescape(str);
};

/**
 * @description: unicode编码
 * @param {string} str
 * @return {string}
 */
const encodeUnicode = str => {
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return '\\u' + res.join('\\u');
};

/**
 * @description: 判断是否是IOS系统
 * @return {*}
 */
const isIos = () => {
  let lower = user_agent().toLowerCase();
  return /iphone/i.test(lower) || /ipad/i.test(lower) || /ios/i.test(lower);
};

/**
 * @description: 获取UP
 * @return {*}
 */
const getUp = () => {
  return /ipad/i.test(user_agent) ? 'IPAD' : '';
};

/**
 * @description: 农历月份枚举
 * @return {*}
 */
const nongliMonthEnum = () => {
  return [
    '正月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '冬月',
    '腊月',
  ];
};

/**
 * @description: 农历日期枚举
 * @return {*}
 */
const nongliDayEnum = () => {
  return [
    '初一',
    '初二',
    '初三',
    '初四',
    '初五',
    '初六',
    '初七',
    '初八',
    '初九',
    '初十',
    '十一',
    '十二',
    '十三',
    '十四',
    '十五',
    '十六',
    '十七',
    '十八',
    '十九',
    '二十',
    '廿一',
    '廿二',
    '廿三',
    '廿四',
    '廿五',
    '廿六',
    '廿七',
    '廿八',
    '廿九',
    '三十',
  ];
};

/**
 * @description: 农历时辰枚举
 * @return {*}
 */
const nongliHourEnum = () => {
  return [
    '子时',
    '丑时',
    '寅时',
    '卯时',
    '辰时',
    '巳时',
    '午时',
    '未时',
    '申时',
    '酉时',
    '戌时',
    '亥时',
  ];
};

// firebase配置
const firebaseConfig = {
  apiKey: 'AIzaSyChp9xDmbKGXP831CKgtRsjy6RBYeQfI00',
  authDomain: 'psychic-fortune.firebaseapp.com',
  projectId: 'psychic-fortune',
  storageBucket: 'psychic-fortune.appspot.com',
  messagingSenderId: '391425422960',
  appId: '1:391425422960:web:7fd76da07aaab6390766b5',
  measurementId: 'G-43C3GF0Z45',
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
// 埋点上报function
const firebaseLogEvent = (
  module_id,
  content_id,
  event_name,
  event_type,
  args
) => {
  let args_ = JSON.stringify(args);
  let outer_obj = {
    module: module_id,
    content_id: content_id,
    event_name: event_name,
    event_type: event_type,
    app_key: '20002003',
    uid: localStorage.getItem('mlxz_outer_visitor_id') || '',
    visitor_id: localStorage.getItem('mlxz_outer_visitor_id') || '',
    open_uid: localStorage.getItem('mlxz_outer_open_uid') || '',
    device_id: getDeviceId() || '',
    args: args_,
  };
  console.log('----firebase start-----');
  console.log('这是firebase埋点', JSON.stringify(outer_obj));
  console.log('----firebase end-----');
  if (!isProd()) {
    return true;
  }
  analytics.logEvent(event_name, outer_obj);

  // return new Promise((resolve, reject) => {
  //   try {
  //     analytics.logEvent(event_name, outer_obj);
  //     console.log('firebase埋点上报执行');
  //     resolve();
  //   } catch (e) {
  //     reject(e);
  //   }
  // });
};

// 判断字符串是否大于四位，如果超出四位，截取第一二位和最后两位，中间用...代替
const getShortStr = (str, len = 4) => {
  if (!str) return '';
  if (str.length > len) {
    return str.substring(0, 2) + '...' + str.substring(str.length - 2);
  } else {
    return str;
  }
};

// 获取语言
const getLanguage = () => {
  // return 'zh-TW';
  let now_lang =
    navigator.language.indexOf('zh-') > -1 ? navigator.language : 'zh-CN';
  return getRequestParams('language') || now_lang;
};

// 延迟函数
const asleep = delay => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
/**
 * @description: 用户信息格式化
 * @param {*} product_key 产品key
 * @param {*} querystring 用户信息
 * @return {*}
 */
const getExtraParams = (product_key, querystring) => {
  let params = null;
  let query_user_string = querystring;
  let query_user_string_array = query_user_string.split('|');

  // 八字合婚 双人信息
  if (product_key === 'h5_marriage') {
    let [
      male_name,
      female_name,
      male_birth_year,
      male_birth_month,
      male_birth_date,
      female_birth_year,
      female_birth_month,
      female_birth_date,
      male_birth_hour,
      female_birth_hour,
      male_is_gongli,
      female_is_gongli,
      sex,
    ] = query_user_string_array;

    params = {
      male_name,
      female_name,
      male_birth_year,
      male_birth_month,
      male_birth_date,
      female_birth_year,
      female_birth_month,
      female_birth_date,
      male_birth_hour,
      female_birth_hour,
      male_is_gongli,
      female_is_gongli,
      sex,
    };
  }
  // 其他 单人信息
  else {
    let [
      name,
      sex,
      is_gongli,
      birth_year,
      birth_month,
      birth_date,
      birth_hour,
    ] = query_user_string_array;

    params = {
      name,
      sex,
      is_gongli,
      birth_year,
      birth_month,
      birth_date,
      birth_hour,
      date: moment(
        `${birth_year}${+birth_month < 10 ? '0' + birth_month : birth_month}${
          +birth_date < 10 ? '0' + birth_date : birth_date
        }`
      ).format('YYYYMMDD'),
    };
  }

  return params;
};

// 按钮是否出现在可视区域
const isElementInViewport = el => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * @description: 打开app
 * @return {*}
 */
const openApp = () => {
  openAdjustApp();
  return;
  location.href =
    // 'https://play.google.com/store/apps/details?id=com.psychicai.fortune';
    'https://www.psychicai.pro/';
};

/**
 * @description: 获取八字五行颜色
 * @param {*} val
 * @return {*}
 */
const getBaziStyleColor = val => {
  let mu_arr = ['甲', '乙', '寅', '卯'];
  let huo_arr = ['丙', '丁', '巳', '午'];
  let tu_arr = ['戊', '己', '辰', '戌', '丑', '未', '醜'];
  let jin_arr = ['庚', '辛', '申', '酉'];
  let shui_arr = ['壬', '癸', '亥', '子'];
  if (mu_arr.includes(val)) {
    return 'nian-mu';
  } else if (huo_arr.includes(val)) {
    return 'nian-huo';
  } else if (tu_arr.includes(val)) {
    return 'nian-tu';
  } else if (jin_arr.includes(val)) {
    return 'nian-jin';
  } else {
    return 'nian-shui';
  }
};

/**
 * @description: 八字合婚动物颜色
 * @param {*} val
 * @return {*}
 */
const getAnimalColor = val => {
  let mu_arr = ['虎', '兔'];
  let huo_arr = ['蛇', '马', '馬'];
  let tu_arr = ['龙', '狗', '牛', '羊', '龍'];
  let jin_arr = ['猴', '鸡', '雞'];
  let shui_arr = ['鼠', '猪', '豬'];
  if (mu_arr.includes(val)) {
    return 'nian-mu';
  } else if (huo_arr.includes(val)) {
    return 'nian-huo';
  } else if (tu_arr.includes(val)) {
    return 'nian-tu';
  } else if (jin_arr.includes(val)) {
    return 'nian-jin';
  } else {
    return 'nian-shui';
  }
};

/**
 * @description: 复制码事件上报
 * @param {*} val
 * @return {*}
 */
const logCopyEvent = val => {
  if (val) {
    firebaseLogEvent('20003', '-10006', 'click_interpretation_copy', 'click', {
      args_name: 'click_interpretation_copy',
    });
  } else {
    firebaseLogEvent('20003', '-10005', 'click_interpretation_link', 'click', {
      args_name: 'click_interpretation_link',
    });
  }
};

/**
 * @description: 复制事件上报
 * @return {*}
 */
const logCopyOther = () => {
  firebaseLogEvent('20003', '-10003', 'view_interpretation_copy', 'view', {
    args_name: 'view_interpretation_copy',
  });
};

/**
 * @description: 跳转历史订单
 * @return {*}
 */
const jumpToOrder = () => {
  location.href = 'history_order.html';
};

/**
 * @description: fb埋点函数
 * @param {*} p0
 * @param {*} p1
 * @param {*} p2
 * @param {*} p3
 * @param {*} p4
 * @param {*} p5
 * @param {*} p6
 * @param {*} fbclid
 * @param {*} fbpid
 * @return {*}
 */
const buildURL = (p0, p1, p2, p3, p4, p5, p6, fbclid, fbpid) => {
  if (!p0) {
    return null;
  }
  tracker_token = p0;
  if (p1 || p2) {
    campaign = p1 + '(' + p2 + ')';
  } else {
    campaign = '';
  }
  if (p3 || p4) {
    adgroup = p3 + '(' + p4 + ')';
  } else {
    adgroup = '';
  }
  if (p5 || p6) {
    creative = p5 + '(' + p6 + ')';
  } else {
    creative = '';
  }
  if (!fbclid) {
    fbclid = '';
  }
  if (!fbpid) {
    fbpid = '';
  }
  // build a tracker URL
  let params = { campaign, adgroup, creative, fbclid, fbpid };
  let newURL =
    'https://app.adjust.com/' +
    tracker_token +
    '?' +
    Object.keys(params)
      .map(key => key + '=' + encodeURIComponent(params[key]))
      .join('&');
  return newURL;
};

/**
 * @description: 获取fb pid
 * @return {*}
 */
const getFbPid = () => {
  let fbPid = document.cookie.match(/(^|;) ?_fbp=([^;]*)(;|$)/);
  if (fbPid) {
    return fbPid[2];
  } else {
    return null;
  }
};

/**
 * @description: fb 打开 下载app
 * @return {*}
 */
const openAdjustApp = () => {
  const urlParams = new URLSearchParams(window.location.search);
  console.log('urlParams', urlParams);
  if (!urlParams.get('p0')) {
    window.open(
      'https://play.google.com/store/apps/details?id=com.psychicai.fortune'
    );
    return;
  }
  //p0 = urlParams.get("p0") and fallback to "default"
  p0 = urlParams.get('p0');
  p1 = urlParams.get('p1');
  p2 = urlParams.get('p2');
  p3 = urlParams.get('p3');
  p4 = urlParams.get('p4');
  p5 = urlParams.get('p5');
  p6 = urlParams.get('p6');
  fbPid = getFbPid();
  fbClickId = urlParams.get('fbclid');
  url = buildURL(p0, p1, p2, p3, p4, p5, p6, fbClickId, fbPid);
  console.log('adjust url', url);
  window.open(
    url
      ? url
      : 'https://play.google.com/store/apps/details?id=com.psychicai.fortune'
  );
};

/**
 * @description: 客户端结果页提示 并重置URL 不刷新
 * @return {*}
 */
const resetResultUrl = (order_id, status, is_home_page = false) => {
  // 自己添加的stop 否则会一直调用该方法
  const new_url = window.location.href + '&stop=1';
  if (isAndroid()) {
    // 安卓原生方法 String url, Boolean  true:测算主页 false:非主页
    window.psychicai_client &&
      window.psychicai_client.onWebPayResult(new_url, is_home_page);
  } else {
    let params = {
      url: new_url,
      main_page: is_home_page ? 1 : 0,
    };
    // IOS原生方法调用
    window.prompt('onWebPayResult', JSON.stringify(params));
  }
  // 重置URL
  let url = new URL(window.location.href);
  let newUrl = url.origin + url.pathname;
  history.pushState(
    null,
    '',
    `${newUrl}#/result?order_id=${order_id}&status=${status}&stop=1`
  );
};

// import { fb } from 'facebook-pixel';
const channel_obj = {
  own: '709060547838898',
  nova01: '718889796870693',
  enjoy01: '1122026312239443',
  panda01: '798187135579003',
};
// fb.config({
//   autoPageView: true,
//   pixel: channel_obj[getFBChannel()],
//   disabled: !isProd(),
// });

const fbEvent = () => {
  return 1;
  return fb;
};

let timer = null;
const checkFB = () => {
  const has_fb = typeof fbq === 'function';
  console.log('has_fb', has_fb);
  // 如果有fb就触发事件 ，没有就每秒轮询，有fb就触发,没有就5秒后重置
  if (has_fb) {
    if (timer) {
      clearInterval(timer);
    }
    return Promise.resolve(true);
  } else {
    return new Promise((resolve, reject) => {
      let i = 0;
      let count = 0;
      timer = setInterval(() => {
        i++;
        if (i > 5) {
          console.log(count);
          // clearInterval(timer);
          if (count > 5) {
            clearInterval(timer);
            reject('fbq is not a function after 5 times check');
          } else {
            count++;
            resetInitFB();
          }
        }
        if (typeof fbq === 'function') {
          clearInterval(timer);
          resolve(true);
        }
      }, 1000);
    });
  }
};
const resetInitFB = () => {
  let script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', ${channel_obj[getFBChannel()]});
    fbq('track', 'PageView');
  `;
  document.body.appendChild(script);

  let noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <img height="1" width="1" style="display:none" 
         src="https://www.facebook.com/tr?id=${
           channel_obj[getFBChannel()]
         }&ev=PageView&noscript=1"/>
  `;
  document.body.appendChild(noscript);
  checkFB();
};

const copyResultCode = text => {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      // console.log('copy success');
    })
    .catch(function (err) {
      console.error('copy error', err);
    });
};

const getUrlParams = () => {
  let url = window.location.href;
  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
    let str = url.substr(url.indexOf('?') + 1);
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
  }
  return theRequest;
};

const resetPageUrl = (order_id, status) => {
  // 重置URL
  let url = new URL(window.location.href);
  let newUrl = url.origin + url.pathname;
  history.pushState(
    null,
    '',
    `${newUrl}#/result?order_id=${order_id}&status=${status}`
  );
  // history.replaceState('', '', newUrl);
};

// 观测云日志
const gcyLog = (title, args) => {
  let args_ = JSON.parse(JSON.stringify(args));
  args_.mlxz_outer_visitor_id =
    localStorage.getItem('mlxz_outer_visitor_id') || '';
  args_.mlxz_outer_open_uid = localStorage.getItem('mlxz_outer_open_uid') || '';
  window.DATAFLUX_RUM && window.DATAFLUX_RUM.addAction(title, args_);
};
import { reportName } from '../libs/enum';
const getTitle = val => {
  return val
    ? getLanguage() === 'zh-CN'
      ? reportName[val].cn
      : reportName[val].tw
    : '';
};

export default {
  getTitle,
  gcyLog,
  resetPageUrl,
  getUrlParams,
  copyResultCode,
  checkFB,
  fbEvent,
  getFBChannel,
  resetResultUrl,
  openAdjustApp,
  buildURL,
  getFbPid,
  logCopyOther,
  logCopyEvent,
  getAnimalColor,
  jumpToOrder,
  getBaziStyleColor,
  openApp,
  copyToClipboard,
  isElementInViewport,
  isProduction,
  getExtraParams,
  asleep,
  getLanguage,
  formatDate,
  getRandomString,
  getDevid,
  getDeviceId,
  formateNongliMonth,
  formateNongliDate,
  formateNongliHour,
  isMiniProgram,
  miniProgramNavigateTo,
  isWechat,
  isAlipay,
  getQueryString,
  getQueryStr,
  toOrder,
  getChannel,
  getUid,
  isZhwnl,
  isProd,
  scrollAnimation,
  getVersion,
  getVerCode,
  isVersionMoreThan,
  isProduction,
  isTest,
  isDev,
  getInitUserInfo,
  setInitUserinfo,
  getDataArrayFromUserAgent,
  revertUTF8,
  copyText,
  generateUUID,
  decodeUnicode,
  encodeUnicode,
  getRandom,
  isIos,
  getUp,
  getRequestParams,
  isAndroid,
  nongliMonthEnum,
  nongliDayEnum,
  nongliHourEnum,
  firebaseLogEvent,
  getShortStr,
};
