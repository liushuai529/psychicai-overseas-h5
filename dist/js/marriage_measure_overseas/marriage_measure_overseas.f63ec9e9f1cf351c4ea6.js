webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInitUserinfo = exports.getInitUserInfo = exports.isVersionMoreThan = exports.getVersion = undefined;

var _getTitle$gcyLog$rese;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @Author: wujiang@weli.cn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @Date: 2024-02-28 16:49:35
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @LastEditors: wujiang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @LastEditTime: 2024-06-05 17:30:01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @Description: 工具函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _dayjs = __webpack_require__(11);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _enum = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description: 获取FB代理渠道
 * @return {*}
 */
var getFBChannel = function getFBChannel() {
  var url = location.href;

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
    return 'panda02';
  }
};
/**
 * @description: 是否是生产环境
 * @return {*}
 */
var isProduction = function isProduction() {
  return "production" === 'production';
};

/**
 * @description: 是否是测试环境
 * @return {*}
 */
var isTest = function isTest() {
  return "production" === 'test';
};

/**
 * @description: 是否是开发环境
 * @return {*}
 */
var isDev = function isDev() {
  return "production" === 'development';
};

/**
 * @description: 获取UA信息
 * @return {*}
 */
var user_agent = function user_agent() {
  return navigator.userAgent;
};
console.log('user_agent', user_agent());

/**
 * @description: 格式化时间
 * @param {*} date
 * @param {*} pattern
 * @param {*} is12System
 * @return {*}
 */
var formatDate = function formatDate(date, pattern, is12System) {
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
      'h+': is12System && date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
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
var getRandomString = function getRandomString() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  var key = '';
  var ascTable = '0123456789abcdefghijklmhopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ascTable = ascTable.split('');
  for (var i = 0; i < length; ++i) {
    key += ascTable[parseInt(Math.random() * 62)].toString();
  }
  return key;
};

/**
 * @description: 获取0到N的随机整数(小于N)
 * @param {int} 随机范围 默认100
 * @return {int} 随机正整数
 */
var getRandom = function getRandom(r) {
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
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}

/**
 * @description: 获取ua参数
 * @param {*} param 参数
 * @return {*}
 */
function getUAParam(param) {
  var res = '';
  var po = user_agent().indexOf(param + '=');
  if (po > -1) {
    var theStr = user_agent().substring(po + param.length + 1, user_agent().length);
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
  var devid = getDeviceId();

  return devid;
}

/**
 * @description: 获取设备device_id
 * @return {*}
 */
function getDeviceId() {
  var device_id = void 0;
  device_id = window.localStorage.getItem('psychicai_device_id') || hex_md5(generateUUID());
  window.localStorage.setItem('psychicai_device_id', device_id);
  return device_id;
}

/**
 * @description: 是否是万年历app内
 * @return {*}
 */
var isZhwnl = function isZhwnl() {
  return (/ecalendar/g.test(user_agent())
  );
};

/**
 * @description: 滚动动画
 * @param {*} currentY
 * @param {*} targetY
 * @return {*}
 */
var scrollAnimation = function scrollAnimation(currentY, targetY) {
  var needScrollTop = targetY - currentY;
  var _currentY = currentY;
  setTimeout(function () {
    // 一次调用滑动帧数，每次调用会不一样
    var dist = Math.ceil(needScrollTop / 10);
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
var formateNongliMonth = function formateNongliMonth(month) {
  var result = '';
  var m = parseInt(month);
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
var formateNongliDate = function formateNongliDate(date) {
  var result = '';
  var d = parseInt(date);
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
var formateNongliHour = function formateNongliHour(hour) {
  var shichen = '';
  var h = parseInt(hour);
  var language = getLanguage();
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
var TW_formateNongliHour = function TW_formateNongliHour(h) {
  var shichen = '';
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
var isMiniProgram = function isMiniProgram() {
  return window.__wxjs_environment === 'miniprogram';
};

/**
 * @description: 小程序跳转
 * @param {*} url
 * @return {*}
 */
var miniProgramNavigateTo = function miniProgramNavigateTo(url) {
  wx.miniProgram.navigateTo({
    url: url
  });
};

/**
 * @description: 是否是微信想
 * @return {*}
 */
var isWechat = function isWechat() {
  return (/micromessenger/i.test(user_agent())
  );
};

/**
 * @description: 是否是支付宝
 * @return {*}
 */
var isAlipay = function isAlipay() {
  return (/alipay/i.test(user_agent())
  );
};

/**
 * @description: 获取请求参数
 * @param {*} key
 * @return {*}
 */
var getQueryString = function getQueryString(key) {
  return new URLSearchParams(location.search).get(key);
};

/**
 * @description: 请求参数
 * @param {*} key
 * @return {*}
 */
var getQueryStr = function getQueryStr(key) {
  if (typeof window !== 'undefined') {
    var _url = location.hash;
    var theRequest = new Object();
    if (_url.indexOf('?') != -1) {
      var str = _url.substr(1).split('?')[1];
      var strs = str.split('&');
      for (var i = 0; i < strs.length; i++) {
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
var toOrder = function toOrder() {
  location.href = 'order.html';
};

/**
 * @description: 获取渠道
 * @return {*}
 */
var getChannel = function getChannel() {
  var channel_key = 'etouch_channel';
  //读取url参数
  var channel = getQueryString('channel') || '';
  if (channel) {
    var channel_entry = {
      expires: new Date().getTime(),
      value: channel
    };
    window.localStorage.setItem(channel_key, JSON.stringify(channel_entry));
  }

  //读取本地缓存
  if (!channel) {
    var channel_entry = window.localStorage.getItem(channel_key);
    if (channel_entry) {
      channel_entry = JSON.parse(channel_entry);
      if (channel_entry.expires >= new Date().getTime() - 1000 * 60 * 60 * 24 * 2) {
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
var getUid = function getUid() {
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
var copyToClipboard = function copyToClipboard(text) {
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
var isProd = function isProd() {
  // return true;
  return ['192.168', 'localhost', 'test', '10.1.9', '10.206.0.133', '10.'].every(function (item) {
    return window.location.href.indexOf(item) < 0;
  });
};

//获取UA信息返回数组
var getDataArrayFromUserAgent = function getDataArrayFromUserAgent() {
  return {};
};

/**
 * @description: 是否安卓系统
 * @return {*}
 */
var isAndroid = function isAndroid() {
  var ua = user_agent().toLowerCase();
  return (/android/i.test(ua)
  );
};

/**
 * @description: 获取请求参数
 * @param {*} key 参数key
 * @param {*} index  数据的下标
 * @return {*}
 */
var getRequestParams = function getRequestParams(key) {
  var array = getDataArrayFromUserAgent();
  if (array && array[key]) {
    return array[key];
  }
  return '';
};

/**
 * 获取app版本
 */
var getVersion = exports.getVersion = function getVersion(ver_name) {
  var array = getDataArrayFromUserAgent();
  return array['ver_name'];
};

/**
 * @description: 客户端版本号
 * @param {*} ver_code
 * @return {*}
 */
var getVerCode = function getVerCode() {
  var array = getDataArrayFromUserAgent();
  return array['ver_code'];
};

/**
 * 判断当前版本号是否大于传入的版本号
 * 大于 return true
 * 小于或等于 return false
 */
var isVersionMoreThan = exports.isVersionMoreThan = function isVersionMoreThan() {
  var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1.0.0';

  var current_version_ = getVersion();
  if (!current_version_) return false;
  var array = current_version_.split('.');
  var v_1 = +array.join('');
  var com_version = +v.split('.').join('');
  return v_1 > com_version;
};

// 获取客户端默认用户信息
var getInitUserInfo = exports.getInitUserInfo = function getInitUserInfo() {
  var initUserInfo = {
    //?name=Moses&sex=0&nongli=1&date=19890321&shic=-1
    name: getQueryStr('name') || null,
    sex: getQueryStr('sex') || null,
    nongli: getQueryStr('nongli') || null,
    date: getQueryStr('date') || null,
    shic: getQueryStr('shic') || null
  };
  return initUserInfo;
};

/**
 * @description: 设置用户信息
 * @param {*} vm
 * @return {*}
 */
var setInitUserinfo = exports.setInitUserinfo = function setInitUserinfo(vm) {
  var initUserInfo = getInitUserInfo();
  if (initUserInfo.name) vm.username = initUserInfo.name;
  if (initUserInfo.sex) vm.sex = initUserInfo.sex == 1 && 'female' || 'male';
  if (initUserInfo.nongli) {
    vm.show_nongli = initUserInfo.nongli == 0;
    if (initUserInfo.date) {
      var str = initUserInfo.date + '';
      var y = str.substring(0, 4);
      var m = parseInt(str.substring(4, 6));
      var d = str.substring(6, 8);
      if (initUserInfo.nongli == 0) {
        // 農曆
        vm.picker_date = '农历' + ' ' + y + '年' + formateNongliMonth(m) + formateNongliDate(d);
      } else {
        // 公曆
        vm.picker_date = '公历' + ' ' + y + '年' + m + '月' + d + '日';
      }
      // 生日实际传值
      var pick_date = {
        year: y,
        month: m,
        date: d
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
  var el = document.createElement('input');
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
var decodeUnicode = function decodeUnicode(str) {
  str = str.replace(/\\/g, '%');
  return unescape(str);
};

/**
 * @description: unicode编码
 * @param {string} str
 * @return {string}
 */
var encodeUnicode = function encodeUnicode(str) {
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
var isIos = function isIos() {
  var lower = user_agent().toLowerCase();
  return (/iphone/i.test(lower) || /ipad/i.test(lower) || /ios/i.test(lower)
  );
};

/**
 * @description: 获取UP
 * @return {*}
 */
var getUp = function getUp() {
  return (/ipad/i.test(user_agent) ? 'IPAD' : ''
  );
};

/**
 * @description: 农历月份枚举
 * @return {*}
 */
var nongliMonthEnum = function nongliMonthEnum() {
  return ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
};

/**
 * @description: 农历日期枚举
 * @return {*}
 */
var nongliDayEnum = function nongliDayEnum() {
  return ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
};

/**
 * @description: 农历时辰枚举
 * @return {*}
 */
var nongliHourEnum = function nongliHourEnum() {
  return ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
};

// firebase配置
var firebaseConfig = {
  apiKey: 'AIzaSyChp9xDmbKGXP831CKgtRsjy6RBYeQfI00',
  authDomain: 'psychic-fortune.firebaseapp.com',
  projectId: 'psychic-fortune',
  storageBucket: 'psychic-fortune.appspot.com',
  messagingSenderId: '391425422960',
  appId: '1:391425422960:web:7fd76da07aaab6390766b5',
  measurementId: 'G-43C3GF0Z45'
};

firebase.initializeApp(firebaseConfig);
var analytics = firebase.analytics();
// 埋点上报function
var firebaseLogEvent = function firebaseLogEvent(module_id, content_id, event_name, event_type, args) {
  var args_ = JSON.stringify(args);
  var outer_obj = {
    module: module_id,
    content_id: content_id,
    event_name: event_name,
    event_type: event_type,
    app_key: '20002003',
    uid: localStorage.getItem('mlxz_outer_visitor_id') || '',
    visitor_id: localStorage.getItem('mlxz_outer_visitor_id') || '',
    open_uid: localStorage.getItem('mlxz_outer_open_uid') || '',
    device_id: getDeviceId() || '',
    args: args_
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
var getShortStr = function getShortStr(str) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  if (!str) return '';
  if (str.length > len) {
    return str.substring(0, 2) + '...' + str.substring(str.length - 2);
  } else {
    return str;
  }
};

// 获取语言
var getLanguage = function getLanguage() {
  // return 'zh-TW';
  var now_lang = navigator.language.indexOf('zh-') > -1 ? navigator.language : 'zh-CN';
  return getRequestParams('language') || now_lang;
};

// 延迟函数
var asleep = function asleep(delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
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
var getExtraParams = function getExtraParams(product_key, querystring) {
  var params = null;
  var query_user_string = querystring;
  var query_user_string_array = query_user_string.split('|');

  // 八字合婚 双人信息
  if (product_key === 'h5_marriage') {
    var _query_user_string_ar = _slicedToArray(query_user_string_array, 13),
        male_name = _query_user_string_ar[0],
        female_name = _query_user_string_ar[1],
        male_birth_year = _query_user_string_ar[2],
        male_birth_month = _query_user_string_ar[3],
        male_birth_date = _query_user_string_ar[4],
        female_birth_year = _query_user_string_ar[5],
        female_birth_month = _query_user_string_ar[6],
        female_birth_date = _query_user_string_ar[7],
        male_birth_hour = _query_user_string_ar[8],
        female_birth_hour = _query_user_string_ar[9],
        male_is_gongli = _query_user_string_ar[10],
        female_is_gongli = _query_user_string_ar[11],
        sex = _query_user_string_ar[12];

    params = {
      male_name: male_name,
      female_name: female_name,
      male_birth_year: male_birth_year,
      male_birth_month: male_birth_month,
      male_birth_date: male_birth_date,
      female_birth_year: female_birth_year,
      female_birth_month: female_birth_month,
      female_birth_date: female_birth_date,
      male_birth_hour: male_birth_hour,
      female_birth_hour: female_birth_hour,
      male_is_gongli: male_is_gongli,
      female_is_gongli: female_is_gongli,
      sex: sex
    };
  }
  // 其他 单人信息
  else {
      var _query_user_string_ar2 = _slicedToArray(query_user_string_array, 7),
          name = _query_user_string_ar2[0],
          _sex = _query_user_string_ar2[1],
          is_gongli = _query_user_string_ar2[2],
          birth_year = _query_user_string_ar2[3],
          birth_month = _query_user_string_ar2[4],
          birth_date = _query_user_string_ar2[5],
          birth_hour = _query_user_string_ar2[6];

      params = {
        name: name,
        sex: _sex,
        is_gongli: is_gongli,
        birth_year: birth_year,
        birth_month: birth_month,
        birth_date: birth_date,
        birth_hour: birth_hour,
        date: (0, _dayjs2.default)('' + birth_year + (+birth_month < 10 ? '0' + birth_month : birth_month) + (+birth_date < 10 ? '0' + birth_date : birth_date)).format('YYYYMMDD')
      };
    }

  return params;
};

// 按钮是否出现在可视区域
var isElementInViewport = function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};

/**
 * @description: 打开app
 * @return {*}
 */
var openApp = function openApp() {
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
var getBaziStyleColor = function getBaziStyleColor(val) {
  var mu_arr = ['甲', '乙', '寅', '卯'];
  var huo_arr = ['丙', '丁', '巳', '午'];
  var tu_arr = ['戊', '己', '辰', '戌', '丑', '未', '醜'];
  var jin_arr = ['庚', '辛', '申', '酉'];
  var shui_arr = ['壬', '癸', '亥', '子'];
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
var getAnimalColor = function getAnimalColor(val) {
  var mu_arr = ['虎', '兔'];
  var huo_arr = ['蛇', '马', '馬'];
  var tu_arr = ['龙', '狗', '牛', '羊', '龍'];
  var jin_arr = ['猴', '鸡', '雞'];
  var shui_arr = ['鼠', '猪', '豬'];
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
var logCopyEvent = function logCopyEvent(val) {
  if (val) {
    firebaseLogEvent('20003', '-10006', 'click_interpretation_copy', 'click', {
      args_name: 'click_interpretation_copy'
    });
  } else {
    firebaseLogEvent('20003', '-10005', 'click_interpretation_link', 'click', {
      args_name: 'click_interpretation_link'
    });
  }
};

/**
 * @description: 复制事件上报
 * @return {*}
 */
var logCopyOther = function logCopyOther() {
  firebaseLogEvent('20003', '-10003', 'view_interpretation_copy', 'view', {
    args_name: 'view_interpretation_copy'
  });
};

/**
 * @description: 跳转历史订单
 * @return {*}
 */
var jumpToOrder = function jumpToOrder() {
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
var buildURL = function buildURL(p0, p1, p2, p3, p4, p5, p6, fbclid, fbpid) {
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
  var params = { campaign: campaign, adgroup: adgroup, creative: creative, fbclid: fbclid, fbpid: fbpid };
  var newURL = 'https://app.adjust.com/' + tracker_token + '?' + Object.keys(params).map(function (key) {
    return key + '=' + encodeURIComponent(params[key]);
  }).join('&');
  return newURL;
};

/**
 * @description: 获取fb pid
 * @return {*}
 */
var getFbPid = function getFbPid() {
  var fbPid = document.cookie.match(/(^|;) ?_fbp=([^;]*)(;|$)/);
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
var openAdjustApp = function openAdjustApp() {
  var urlParams = new URLSearchParams(window.location.search);
  console.log('urlParams', urlParams);
  if (!urlParams.get('p0')) {
    window.open('https://play.google.com/store/apps/details?id=com.psychicai.fortune');
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
  window.open(url ? url : 'https://play.google.com/store/apps/details?id=com.psychicai.fortune');
};

/**
 * @description: 客户端结果页提示 并重置URL 不刷新
 * @return {*}
 */
var resetResultUrl = function resetResultUrl(order_id, status) {
  var is_home_page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // 自己添加的stop 否则会一直调用该方法
  var new_url = window.location.href + '&stop=1';
  if (isAndroid()) {
    // 安卓原生方法 String url, Boolean  true:测算主页 false:非主页
    window.psychicai_client && window.psychicai_client.onWebPayResult(new_url, is_home_page);
  } else {
    var params = {
      url: new_url,
      main_page: is_home_page ? 1 : 0
    };
    // IOS原生方法调用
    window.prompt('onWebPayResult', JSON.stringify(params));
  }
  // 重置URL
  var url = new URL(window.location.href);
  var newUrl = url.origin + url.pathname;
  history.pushState(null, '', newUrl + '#/result?order_id=' + order_id + '&status=' + status + '&stop=1');
};

// import { fb } from 'facebook-pixel';
var channel_obj = {
  own: '709060547838898',
  nova01: '718889796870693',
  enjoy01: '1122026312239443',
  panda01: '798187135579003'
};
// fb.config({
//   autoPageView: true,
//   pixel: channel_obj[getFBChannel()],
//   disabled: !isProd(),
// });

var fbEvent = function fbEvent() {
  return 1;
  return fb;
};

var timer = null;
var checkFB = function checkFB() {
  var has_fb = typeof fbq === 'function';
  console.log('has_fb', has_fb);
  // 如果有fb就触发事件 ，没有就每秒轮询，有fb就触发,没有就5秒后重置
  if (has_fb) {
    if (timer) {
      clearInterval(timer);
    }
    return Promise.resolve(true);
  } else {
    return new Promise(function (resolve, reject) {
      var i = 0;
      var count = 0;
      timer = setInterval(function () {
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
var resetInitFB = function resetInitFB() {
  var script = document.createElement('script');
  script.innerHTML = '\n    !function(f,b,e,v,n,t,s)\n    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n    n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';\n    n.queue=[];t=b.createElement(e);t.async=!0;\n    t.src=v;s=b.getElementsByTagName(e)[0];\n    s.parentNode.insertBefore(t,s)}(window, document,\'script\',\n    \'https://connect.facebook.net/en_US/fbevents.js\');\n    fbq(\'init\', ' + channel_obj[getFBChannel()] + ');\n    fbq(\'track\', \'PageView\');\n  ';
  document.body.appendChild(script);

  var noscript = document.createElement('noscript');
  noscript.innerHTML = '\n    <img height="1" width="1" style="display:none" \n         src="https://www.facebook.com/tr?id=' + channel_obj[getFBChannel()] + '&ev=PageView&noscript=1"/>\n  ';
  document.body.appendChild(noscript);
  checkFB();
};

var copyResultCode = function copyResultCode(text) {
  navigator.clipboard.writeText(text).then(function () {
    // console.log('copy success');
  }).catch(function (err) {
    console.error('copy error', err);
  });
};

var getUrlParams = function getUrlParams() {
  var url = window.location.href;
  var theRequest = new Object();
  if (url.indexOf('?') != -1) {
    var str = url.substr(url.indexOf('?') + 1);
    var strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
  }
  return theRequest;
};

var resetPageUrl = function resetPageUrl(order_id, status) {
  // 重置URL
  var url = new URL(window.location.href);
  var newUrl = url.origin + url.pathname;
  history.pushState(null, '', newUrl + '#/result?order_id=' + order_id + '&status=' + status);
  // history.replaceState('', '', newUrl);
};

// 观测云日志
var gcyLog = function gcyLog(title, args) {
  var args_ = JSON.parse(JSON.stringify(args));
  args_.mlxz_outer_visitor_id = localStorage.getItem('mlxz_outer_visitor_id') || '';
  args_.mlxz_outer_open_uid = localStorage.getItem('mlxz_outer_open_uid') || '';
  window.DATAFLUX_RUM && window.DATAFLUX_RUM.addAction(title, args_);
};

var getTitle = function getTitle(val) {
  return val ? getLanguage() === 'zh-CN' ? _enum.reportName[val].cn : _enum.reportName[val].tw : '';
};

exports.default = (_getTitle$gcyLog$rese = {
  getTitle: getTitle,
  gcyLog: gcyLog,
  resetPageUrl: resetPageUrl,
  getUrlParams: getUrlParams,
  copyResultCode: copyResultCode,
  checkFB: checkFB,
  fbEvent: fbEvent,
  getFBChannel: getFBChannel,
  resetResultUrl: resetResultUrl,
  openAdjustApp: openAdjustApp,
  buildURL: buildURL,
  getFbPid: getFbPid,
  logCopyOther: logCopyOther,
  logCopyEvent: logCopyEvent,
  getAnimalColor: getAnimalColor,
  jumpToOrder: jumpToOrder,
  getBaziStyleColor: getBaziStyleColor,
  openApp: openApp,
  copyToClipboard: copyToClipboard,
  isElementInViewport: isElementInViewport,
  isProduction: isProduction,
  getExtraParams: getExtraParams,
  asleep: asleep,
  getLanguage: getLanguage,
  formatDate: formatDate,
  getRandomString: getRandomString,
  getDevid: getDevid,
  getDeviceId: getDeviceId,
  formateNongliMonth: formateNongliMonth,
  formateNongliDate: formateNongliDate,
  formateNongliHour: formateNongliHour,
  isMiniProgram: isMiniProgram,
  miniProgramNavigateTo: miniProgramNavigateTo,
  isWechat: isWechat,
  isAlipay: isAlipay,
  getQueryString: getQueryString,
  getQueryStr: getQueryStr,
  toOrder: toOrder,
  getChannel: getChannel,
  getUid: getUid,
  isZhwnl: isZhwnl,
  isProd: isProd,
  scrollAnimation: scrollAnimation,
  getVersion: getVersion,
  getVerCode: getVerCode,
  isVersionMoreThan: isVersionMoreThan
}, _defineProperty(_getTitle$gcyLog$rese, 'isProduction', isProduction), _defineProperty(_getTitle$gcyLog$rese, 'isTest', isTest), _defineProperty(_getTitle$gcyLog$rese, 'isDev', isDev), _defineProperty(_getTitle$gcyLog$rese, 'getInitUserInfo', getInitUserInfo), _defineProperty(_getTitle$gcyLog$rese, 'setInitUserinfo', setInitUserinfo), _defineProperty(_getTitle$gcyLog$rese, 'getDataArrayFromUserAgent', getDataArrayFromUserAgent), _defineProperty(_getTitle$gcyLog$rese, 'revertUTF8', revertUTF8), _defineProperty(_getTitle$gcyLog$rese, 'copyText', copyText), _defineProperty(_getTitle$gcyLog$rese, 'generateUUID', generateUUID), _defineProperty(_getTitle$gcyLog$rese, 'decodeUnicode', decodeUnicode), _defineProperty(_getTitle$gcyLog$rese, 'encodeUnicode', encodeUnicode), _defineProperty(_getTitle$gcyLog$rese, 'getRandom', getRandom), _defineProperty(_getTitle$gcyLog$rese, 'isIos', isIos), _defineProperty(_getTitle$gcyLog$rese, 'getUp', getUp), _defineProperty(_getTitle$gcyLog$rese, 'getRequestParams', getRequestParams), _defineProperty(_getTitle$gcyLog$rese, 'isAndroid', isAndroid), _defineProperty(_getTitle$gcyLog$rese, 'nongliMonthEnum', nongliMonthEnum), _defineProperty(_getTitle$gcyLog$rese, 'nongliDayEnum', nongliDayEnum), _defineProperty(_getTitle$gcyLog$rese, 'nongliHourEnum', nongliHourEnum), _defineProperty(_getTitle$gcyLog$rese, 'firebaseLogEvent', firebaseLogEvent), _defineProperty(_getTitle$gcyLog$rese, 'getShortStr', getShortStr), _getTitle$gcyLog$rese);

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabEventEnums = exports.url_enums = exports.maidianEnum = exports.reportName = exports.banner_enums = exports.report_id_arr = exports.getHistoryOrderImg = exports.commonBaoshi = exports.reportEnum = exports.icon_enums = exports.color_enums = exports.path_enums = exports.product_enums = undefined;

var _dingdan_img_nianyun = __webpack_require__(57);

var _dingdan_img_nianyun2 = _interopRequireDefault(_dingdan_img_nianyun);

var _dingdan_img_yuantiangang = __webpack_require__(59);

var _dingdan_img_yuantiangang2 = _interopRequireDefault(_dingdan_img_yuantiangang);

var _dingdan_img_guiguzi = __webpack_require__(55);

var _dingdan_img_guiguzi2 = _interopRequireDefault(_dingdan_img_guiguzi);

var _dingdan_img_ganqing = __webpack_require__(54);

var _dingdan_img_ganqing2 = _interopRequireDefault(_dingdan_img_ganqing);

var _dingdan_img_shiye = __webpack_require__(58);

var _dingdan_img_shiye2 = _interopRequireDefault(_dingdan_img_shiye);

var _dingdan_img_caiyun = __webpack_require__(53);

var _dingdan_img_caiyun2 = _interopRequireDefault(_dingdan_img_caiyun);

var _dingdan_img_hehun = __webpack_require__(56);

var _dingdan_img_hehun2 = _interopRequireDefault(_dingdan_img_hehun);

var _dingdan_img_er = __webpack_require__(51);

var _dingdan_img_er2 = _interopRequireDefault(_dingdan_img_er);

var _dingdan_img_san = __webpack_require__(52);

var _dingdan_img_san2 = _interopRequireDefault(_dingdan_img_san);

var _dingdan_img_er3 = __webpack_require__(60);

var _dingdan_img_er4 = _interopRequireDefault(_dingdan_img_er3);

var _h5_fang_jian_bazihehun = __webpack_require__(13);

var _h5_fang_jian_bazihehun2 = _interopRequireDefault(_h5_fang_jian_bazihehun);

var _h5_fang_jian_caiyun = __webpack_require__(36);

var _h5_fang_jian_caiyun2 = _interopRequireDefault(_h5_fang_jian_caiyun);

var _h5_fang_jian_shiye = __webpack_require__(40);

var _h5_fang_jian_shiye2 = _interopRequireDefault(_h5_fang_jian_shiye);

var _h5_fang_jian_ganqing = __webpack_require__(37);

var _h5_fang_jian_ganqing2 = _interopRequireDefault(_h5_fang_jian_ganqing);

var _h5_fang_jian_nianyun = __webpack_require__(39);

var _h5_fang_jian_nianyun2 = _interopRequireDefault(_h5_fang_jian_nianyun);

var _h5_fang_jian_guiguzi = __webpack_require__(38);

var _h5_fang_jian_guiguzi2 = _interopRequireDefault(_h5_fang_jian_guiguzi);

var _h5_fang_jian_yuantiangang = __webpack_require__(41);

var _h5_fang_jian_yuantiangang2 = _interopRequireDefault(_h5_fang_jian_yuantiangang);

var _h5_fang_fan_bazihhehun = __webpack_require__(14);

var _h5_fang_fan_bazihhehun2 = _interopRequireDefault(_h5_fang_fan_bazihhehun);

var _h5_fang_fan_caiyun = __webpack_require__(42);

var _h5_fang_fan_caiyun2 = _interopRequireDefault(_h5_fang_fan_caiyun);

var _h5_fang_fan_shiye = __webpack_require__(46);

var _h5_fang_fan_shiye2 = _interopRequireDefault(_h5_fang_fan_shiye);

var _h5_fang_fan_ganqing = __webpack_require__(43);

var _h5_fang_fan_ganqing2 = _interopRequireDefault(_h5_fang_fan_ganqing);

var _h5_fang_fan_nianyun = __webpack_require__(45);

var _h5_fang_fan_nianyun2 = _interopRequireDefault(_h5_fang_fan_nianyun);

var _h5_fang_fan_guiguzi = __webpack_require__(44);

var _h5_fang_fan_guiguzi2 = _interopRequireDefault(_h5_fang_fan_guiguzi);

var _h5_fang_fan_yuantiangang = __webpack_require__(47);

var _h5_fang_fan_yuantiangang2 = _interopRequireDefault(_h5_fang_fan_yuantiangang);

var _h5_chang_jian_bazihehun = __webpack_require__(22);

var _h5_chang_jian_bazihehun2 = _interopRequireDefault(_h5_chang_jian_bazihehun);

var _h5_chang_jian_caiyun = __webpack_require__(23);

var _h5_chang_jian_caiyun2 = _interopRequireDefault(_h5_chang_jian_caiyun);

var _h5_chang_jian_shiye = __webpack_require__(27);

var _h5_chang_jian_shiye2 = _interopRequireDefault(_h5_chang_jian_shiye);

var _h5_chang_jian_ganqing = __webpack_require__(24);

var _h5_chang_jian_ganqing2 = _interopRequireDefault(_h5_chang_jian_ganqing);

var _h5_chang_jian_nianyun = __webpack_require__(26);

var _h5_chang_jian_nianyun2 = _interopRequireDefault(_h5_chang_jian_nianyun);

var _h5_chang_jian_guiguzi = __webpack_require__(25);

var _h5_chang_jian_guiguzi2 = _interopRequireDefault(_h5_chang_jian_guiguzi);

var _h5_chang_jian_yuantiangang = __webpack_require__(28);

var _h5_chang_jian_yuantiangang2 = _interopRequireDefault(_h5_chang_jian_yuantiangang);

var _h5_chang_fan_bazihehun = __webpack_require__(29);

var _h5_chang_fan_bazihehun2 = _interopRequireDefault(_h5_chang_fan_bazihehun);

var _h5_chang_fan_caiyun = __webpack_require__(30);

var _h5_chang_fan_caiyun2 = _interopRequireDefault(_h5_chang_fan_caiyun);

var _h5_chang_fan_shiye = __webpack_require__(34);

var _h5_chang_fan_shiye2 = _interopRequireDefault(_h5_chang_fan_shiye);

var _h5_chang_fan_ganqing = __webpack_require__(31);

var _h5_chang_fan_ganqing2 = _interopRequireDefault(_h5_chang_fan_ganqing);

var _h5_chang_fan_nianyun = __webpack_require__(33);

var _h5_chang_fan_nianyun2 = _interopRequireDefault(_h5_chang_fan_nianyun);

var _h5_chang_fan_guiguzi = __webpack_require__(32);

var _h5_chang_fan_guiguzi2 = _interopRequireDefault(_h5_chang_fan_guiguzi);

var _h5_chang_fan_yuantiangang = __webpack_require__(35);

var _h5_chang_fan_yuantiangang2 = _interopRequireDefault(_h5_chang_fan_yuantiangang);

var _banner_ganqing_fang = __webpack_require__(15);

var _banner_ganqing_fang2 = _interopRequireDefault(_banner_ganqing_fang);

var _banner_ganqing_chang = __webpack_require__(48);

var _banner_ganqing_chang2 = _interopRequireDefault(_banner_ganqing_chang);

var _banner_ganqing_fang_tag = __webpack_require__(50);

var _banner_ganqing_fang_tag2 = _interopRequireDefault(_banner_ganqing_fang_tag);

var _banner_ganqing_chang_tag = __webpack_require__(49);

var _banner_ganqing_chang_tag2 = _interopRequireDefault(_banner_ganqing_chang_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var product_enums = exports.product_enums = {
  1: '八字合婚',
  2: '全年運勢',
  3: '姻緣心卦',
  4: '財運精批',
  5: '事業精批',
  101: '本周運勢',
  102: '今年運勢',

  BA_ZI_HE_HUN: '八字合婚',
  QUAN_NIAN_YUN_SHI: '全年運勢',
  YIN_YUAN_XIN_GUA: '姻緣心卦',
  CAI_YUN_JING_PI: '財運精批',
  SHI_YE_JING_PI: '事業精批'
};

var path_enums = exports.path_enums = {
  23: 'marriage_measure_overseas',
  25: 'new_year_luck_overseas',
  24: 'marriage_divination_overseas',
  26: 'wealth_boutique_overseas',
  22: 'career_divination_overseas',
  21: 'lucky_year_report',

  h5_marriage: 'marriage_measure_overseas',
  h5_fortune2023: 'new_year_luck_overseas',
  h5_love: 'marriage_divination_overseas',
  h5_wealth2023: 'wealth_boutique_overseas',
  h5_career: 'career_divination_overseas',
  h5_wealth2024: 'lucky_year_report',
  h5_weigh_bone: 'weigh_bone',
  h5_bai_gua: 'guiguzi_fortune',
  h5_annual2024: 'year_of_lucky_2024',
  h5_emotion2024: 'emotion_fortune',
  h5_career2024: 'career_fortune_2024',
  BA_ZI_HE_HUN: 'marriage_measure_overseas',
  QUAN_NIAN_YUN_SHI: 'new_year_luck_overseas',
  YIN_YUAN_XIN_GUA: 'marriage_divination_overseas',
  CAI_YUN_JING_PI: 'wealth_boutique_overseas',
  SHI_YE_JING_PI: 'career_divination_overseas'
};

var color_enums = exports.color_enums = [{
  cn_k: '绿色',
  tw_k: '綠色',
  v: '#20a162'
}, {
  cn_k: '红色',
  tw_k: '紅色',
  v: '#de1c31'
}, {
  cn_k: '黄色',
  tw_k: '黃色',
  v: '#f8df72'
}, {
  cn_k: '白色',
  tw_k: '白色',
  v: '#eef7f2'
}, {
  cn_k: '黑色',
  tw_k: '黑色',
  v: '#0f1423'
}, {
  cn_k: '浅灰色',
  tw_k: '淺灰色',
  v: '#fffefa'
}, {
  cn_k: '墨绿色',
  tw_k: '墨綠色',
  v: '#253d24'
}, {
  cn_k: '酒红色',
  tw_k: '酒紅色',
  v: '#62102e'
}, {
  cn_k: '棕色',
  tw_k: '棕色',
  v: '#592620'
}, {
  cn_k: '灰白色',
  tw_k: '灰白色',
  v: '#f2e7e5'
}, {
  cn_k: '蓝色',
  tw_k: '藍色',
  v: '#2486b9'
}, {
  cn_k: '灰绿色',
  tw_k: '灰綠色',
  v: '#a4cab6'
}, {
  cn_k: '紫色',
  tw_k: '紫色',
  v: '#9b1364'
}, {
  cn_k: '褐色',
  tw_k: '褐色',
  v: '#c09351'
}];
var icon_enums = exports.icon_enums = [{
  cn_k: '祖母绿',
  tw_k: '祖母綠',
  v: '9001',
  // icon: icon1,
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311bcf7015137cd43ae816dd878266897a1.png'
}, {
  cn_k: '黄碧玺',
  tw_k: '黃碧璽',
  v: '9002',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311b8932b4150fc44bb8785ae919f752c23.png'
}, {
  cn_k: '黄水晶',
  tw_k: '黃水晶',
  v: '9002',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311b8932b4150fc44bb8785ae919f752c23.png'
}, {
  cn_k: '红碧玺',
  tw_k: '紅碧璽',
  v: '9003',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311c57bcf45e01c4175acae60b71e67768c.png'
}, {
  cn_k: '绿碧玺',
  tw_k: '綠碧璽',
  v: '9001',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311c7ea71ce9c0e47e4839594d22fd64262.png'
}, {
  cn_k: '蓝碧玺',
  tw_k: '藍碧璽',
  v: '9011',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311e1fd9de6695b4701b06408fbb23b8ccb.png'
},
// {
//   cn_k: '',
//   tw_k:'',
//   v: '9012',
//   icon: 'https://psychicai-static.psychicai.pro/imgs/2311db7ac3a0f8554f4287ce24aa8015dd60.png',
// },
{
  cn_k: '白水晶',
  tw_k: '白水晶',
  v: '9013',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311e04e73729f1e47389f5e21a5a20fd2a7.png'
}, {
  cn_k: '海蓝宝',
  tw_k: '海藍寶',
  v: '9013',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311e04e73729f1e47389f5e21a5a20fd2a7.png'
}, {
  cn_k: '和田玉',
  tw_k: '和田玉',
  v: '9101',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311d95cb5d18eb44042a328d1cbc5789e6a.png'
}, {
  cn_k: '黑曜石',
  tw_k: '黑曜石',
  v: '9102',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311ffec0894244d476799adcc20f0b1987e.png'
},
// {
//   cn_k: '',
//   v: '9111',
//   icon: 'https://psychicai-static.psychicai.pro/imgs/2311bae8c08f7ec74440bbca240477254717.png',
// },
{
  cn_k: '红宝石',
  tw_k: '紅寶石',
  v: '9112',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311a0423798da344379afb87f6767f12276.png'
}, {
  cn_k: '石榴石',
  tw_k: '石榴石',
  v: '9112',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311a0423798da344379afb87f6767f12276.png'
},
// {
//   cn_k: '',
//   v: '9113',
//   icon: 'https://psychicai-static.psychicai.pro/imgs/231177d4824ea1ba4fda82166f29d3f2d28e.png',
// },
{
  cn_k: '绿松石',
  tw_k: '綠松石',
  v: '9201',
  icon: 'https://psychicai-static.psychicai.pro/imgs/23119f8e60ea58b04d19a865f0a7765ff7e8.png'
},
// {
//   cn_k: '',
//   v: '9202',
//   icon: 'https://psychicai-static.psychicai.pro/imgs/2311fc8d34f0d2e147b88c78929ac1bb2b1f.png',
// },
// {
//   cn_k: '',
//   v: '9301',
//   icon: 'https://psychicai-static.psychicai.pro/imgs/2311e8efa5d0a9f848a5aeefbba7a1c2eb73.png',
// },
// {
//   cn_k: '',
//   v: '9401',
//   icon: 'https://psychicai-static.psychicai.pro/imgs/231197a8f9b1ceeb47d2bfe7a5965cecbc15.png',
// },
// {
//   cn_k: '',
//   v: '9402',
//   icon: 'https://psychicai-static.psychicai.pro/imgs/23111445a8830586405e8c0d7d0baed98906.png',
// },
{
  cn_k: '925银',
  tw_k: '925銀',
  v: '9501',
  icon: 'https://psychicai-static.psychicai.pro/imgs/2311f1f91ce0d92447f69db4e56702952425.png'
}, {
  cn_k: '黄金',
  tw_k: '黃金',
  v: '9601',
  icon: 'https://psychicai-static.psychicai.pro/imgs/23111d6767f435d2496292cd92f317894e82.png'
}];

var reportEnum = exports.reportEnum = {
  h5_wealth2024: '2024_wealty_report', // 2024年财运
  h5_annual2024: '2024_report', // 2024年年运
  h5_weigh_bone: 'chenggu_report', // 袁天罡秤骨
  h5_bai_gua: '64gua_report', // 鬼谷子
  h5_emotion2024: '2024_lovely_report', // 2024年爱情运势
  h5_marriage: 'marriage_contract_report',
  h5_career2024: '2024_career_report' // 2024年事业运势
};
var commonBaoshi = exports.commonBaoshi = {
  9001: 'https://psychicai-static.psychicai.pro/imgs/2311bcf7015137cd43ae816dd878266897a1.png',
  9002: 'https://psychicai-static.psychicai.pro/imgs/2311b8932b4150fc44bb8785ae919f752c23.png',
  9003: 'https://psychicai-static.psychicai.pro/imgs/2311c57bcf45e01c4175acae60b71e67768c.png',
  9013: 'https://psychicai-static.psychicai.pro/imgs/2311e04e73729f1e47389f5e21a5a20fd2a7.png',
  9102: 'https://psychicai-static.psychicai.pro/imgs/2311ffec0894244d476799adcc20f0b1987e.png'
};

var getHistoryOrderImg = exports.getHistoryOrderImg = {
  h5_weigh_bone: _dingdan_img_yuantiangang2.default,
  h5_bai_gua: _dingdan_img_guiguzi2.default,
  h5_emotion2024: _dingdan_img_ganqing2.default,
  h5_career2024: _dingdan_img_shiye2.default,
  h5_wealth2024: _dingdan_img_caiyun2.default,
  h5_marriage: _dingdan_img_hehun2.default,
  h5_annual2024: _dingdan_img_nianyun2.default,
  h5_combo3: _dingdan_img_san2.default,
  h5_combo2: _dingdan_img_er2.default,
  h5_combo2_attach: _dingdan_img_er4.default
};

var report_id_arr = exports.report_id_arr = {
  h5_wealth2024: '60001',
  h5_weigh_bone: '60002',
  h5_bai_gua: '60003',
  h5_marriage: '60005',
  h5_annual2024: '60009',
  h5_emotion2024: '60010',
  h5_career2024: '60011'
};

var banner_enums = exports.banner_enums = {
  h5_marriage: {
    big: {
      cn: _h5_chang_jian_bazihehun2.default,
      tw: _h5_chang_fan_bazihehun2.default
    },
    small: {
      cn: _h5_fang_jian_bazihehun2.default,
      tw: _h5_fang_fan_bazihhehun2.default
    }
  },
  h5_emotion2024: {
    big: {
      cn: _h5_chang_jian_ganqing2.default,
      tw: _h5_chang_fan_ganqing2.default
    },
    small: {
      cn: _h5_fang_jian_ganqing2.default,
      tw: _h5_fang_fan_ganqing2.default
    },
    new_other: {
      small: _banner_ganqing_fang2.default,
      big: _banner_ganqing_chang2.default
    },
    new_01: {
      small: _banner_ganqing_fang_tag2.default,
      big: _banner_ganqing_chang_tag2.default
    }
  },
  h5_annual2024: {
    big: {
      cn: _h5_chang_jian_nianyun2.default,
      tw: _h5_chang_fan_nianyun2.default
    },
    small: {
      cn: _h5_fang_jian_nianyun2.default,
      tw: _h5_fang_fan_nianyun2.default
    }
  },
  h5_wealth2024: {
    big: {
      cn: _h5_chang_jian_caiyun2.default,
      tw: _h5_chang_fan_caiyun2.default
    },
    small: {
      cn: _h5_fang_jian_caiyun2.default,
      tw: _h5_fang_fan_caiyun2.default
    }
  },
  h5_career2024: {
    big: {
      cn: _h5_chang_jian_shiye2.default,
      tw: _h5_chang_fan_shiye2.default
    },
    small: {
      cn: _h5_fang_jian_shiye2.default,
      tw: _h5_fang_fan_shiye2.default
    }
  },
  h5_bai_gua: {
    big: {
      cn: _h5_chang_jian_guiguzi2.default,
      tw: _h5_chang_fan_guiguzi2.default
    },
    small: {
      cn: _h5_fang_jian_guiguzi2.default,
      tw: _h5_fang_fan_guiguzi2.default
    }
  },
  h5_weigh_bone: {
    big: {
      cn: _h5_chang_jian_yuantiangang2.default,
      tw: _h5_chang_fan_yuantiangang2.default
    },
    small: {
      cn: _h5_fang_jian_yuantiangang2.default,
      tw: _h5_fang_fan_yuantiangang2.default
    }
  }
};

var reportName = exports.reportName = {
  h5_marriage: {
    cn: '八字合婚',
    tw: '八字合婚'
  },
  h5_emotion2024: {
    cn: '2024感情运势',
    tw: '2024感情运势'
  },
  h5_annual2024: {
    cn: '2024年年运',
    tw: '2024年年運'
  },
  h5_wealth2024: {
    cn: '2024年财运',
    tw: '2024年財運'
  },
  h5_career2024: {
    cn: '2024年事业运势',
    tw: '2024年事業運勢'
  },
  h5_bai_gua: {
    cn: '鬼谷子百卦论命',
    tw: '鬼谷子百卦論命'
  },
  h5_weigh_bone: {
    cn: '袁天罡推背称骨',
    tw: '袁天罡推背稱骨'
  }
};

var maidianEnum = exports.maidianEnum = {
  h5_marriage: {
    main_id: '10007',
    click_id: '-10016',
    view_id: '-10015',
    click_name: 'click_marriage_discount2',
    view_name: 'view_marriage_discount2'
  },
  h5_emotion2024: {
    main_id: '10006',
    click_id: '-10023',
    view_id: '-10022',
    click_name: 'click_2024lovely_discount2',
    view_name: 'view_2024lovely_discount2'
  },
  h5_annual2024: {
    main_id: '10003',
    click_id: '-10016',
    view_id: '-10015',
    click_name: 'click_2024report_discount2',
    view_name: 'view_2024report_discount2'
  },
  h5_wealth2024: {
    main_id: '10005',
    click_id: '-10016',
    view_id: '-10015',
    click_name: 'click_2024wealty_discount2',
    view_name: 'viwe_2024wealty_discount2'
  },
  h5_career2024: {
    main_id: '10004',
    click_id: '-10016',
    view_id: '-10015',
    click_name: 'click_2024career_discount2',
    view_name: 'view_2024career_discount2'
  },
  h5_bai_gua: {
    main_id: '10008',
    click_id: '-10016',
    view_id: '-10015',
    click_name: 'click_64gua_discount2',
    view_name: 'view_64gua_discount2'
  },
  h5_weigh_bone: {
    main_id: '10009',
    click_id: '-10016',
    view_id: '-10015',
    click_name: 'click_chenggu_discount2',
    view_name: 'view_chenggu_discount2'
  }
};
var url_enums = exports.url_enums = {
  h5_marriage: 'marriage_measure_overseas',
  h5_fortune2023: 'new_year_luck_overseas',
  h5_love: 'marriage_divination_overseas',
  h5_wealth2023: 'wealth_boutique_overseas',
  h5_career: 'career_divination_overseas',
  h5_wealth2024: 'lucky_year_report',
  h5_weigh_bone: 'weigh_bone',
  h5_bai_gua: 'guiguzi_fortune',
  h5_annual2024: 'year_of_lucky_2024',
  h5_emotion2024: 'emotion_fortune',
  h5_career2024: 'career_fortune_2024'
};

var tabEventEnums = exports.tabEventEnums = {
  h5_home: {
    c_id: '-10019',
    e_name: 'click_marriage_h5home'
  },
  h5_order: {
    c_id: '-10020',
    e_name: 'click_marriage_history'
  },
  h5_marriage: {
    c_id: '-10027',
    e_name: 'click_marriage_home'
  },
  h5_career2024: {
    c_id: '-10022',
    e_name: 'click_2024career_home'
  },
  h5_wealth2024: {
    c_id: '-10023',
    e_name: 'click_2024wealty_home'
  },
  h5_annual2024: {
    c_id: '-10021',
    e_name: 'click_2024report_home'
  },
  h5_emotion2024: {
    c_id: '-10024',
    e_name: 'click_2024lovely_home'
  },
  h5_bai_gua: {
    c_id: '-10025',
    e_name: 'click_64gua_home'
  },
  h5_weigh_bone: {
    c_id: '-10026',
    e_name: 'click_chenggu_home'
  }
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastOrderAPI = exports.sortProductsAPI = exports.sendEventApi = exports.checkSendEventApi = exports.sortByEvent = exports.reportBuryingEventAPI = exports.reportEventAPI = exports.getComboAttachAPI = exports.getComboListAPI = exports.visitorLoginAPI = exports.getBazihehunAPI = exports.getPayMethodsAPI = exports.getBaziAPI = exports.resultCheckAPI = exports.getPayOrderInfoAPI = exports.payOrderAPI = exports.getHistoryOrderAPI = exports.getProductionsAPI = exports.getResultAPI = exports.eventReportAPI = exports.getOrderListAPI = exports.orderAPI = exports.getGoodsListAPI = undefined;

var _fortune = __webpack_require__(10);

Object.keys(_fortune).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fortune[key];
    }
  });
});

var _combine = __webpack_require__(19);

Object.keys(_combine).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _combine[key];
    }
  });
});

var _request = __webpack_require__(8);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description: 查询测算商品列表
 * @param {string} id 商品id
 * @return {*}
 */
var getGoodsListAPI = exports.getGoodsListAPI = function getGoodsListAPI(data) {
  return (0, _request2.default)('/h5/product/cesuan', 'GET', data);
};

/**
 * @description: 下单
 * @param {string} pay_channel 支付方式
 * @param {string} good_id 商品id
 * @param {string} callback_url 回调地址
 * @param {string} extra 测算信息
 * @return {*}
 */
/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-02-06 16:45:56
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-31 14:09:03
 * @Description:
 */
var orderAPI = exports.orderAPI = function orderAPI(data) {
  return (0, _request2.default)('/h5/auth/order', 'POST', data);
};

/**
 * @description: 查询订单列表
 * @return {*}
 */
var getOrderListAPI = exports.getOrderListAPI = function getOrderListAPI(data) {
  return (0, _request2.default)('/h5/auth/order', 'GET', data);
};

/**
 * @description: 事件上报
 * @return {*}
 */
var eventReportAPI = exports.eventReportAPI = function eventReportAPI(data) {
  return (0, _request2.default)('/h5/event/report', 'POST', data);
};

// 命里寻真

/**
 * @description: 查询订单结果
 * @param {string} order_id 订单id
 * @return {*}
 */
var getResultAPI = exports.getResultAPI = async function getResultAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/orders/' + data.order_id, 'GET', data);
};

// 商品查询
var getProductionsAPI = exports.getProductionsAPI = async function getProductionsAPI(productGroup) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/products/' + productGroup, 'GET');
};

// 查询历史订单
var getHistoryOrderAPI = exports.getHistoryOrderAPI = async function getHistoryOrderAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/orders/ce_suan', 'GET', data);
};

// 下单
var payOrderAPI = exports.payOrderAPI = async function payOrderAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/orders/ce_suan', 'POST', data);
};

// 查询已支付订单填充信息
var getPayOrderInfoAPI = exports.getPayOrderInfoAPI = async function getPayOrderInfoAPI(order_id, data) {
  await visitorLoginAPI();

  return (0, _request2.default)('/web/auth/trade/orders/contract/cesuan/' + order_id, 'POST', data);
};

// 订单结果校验
var resultCheckAPI = exports.resultCheckAPI = async function resultCheckAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/orders/verify', 'POST', data);
};

// 查询八字
var getBaziAPI = exports.getBaziAPI = async function getBaziAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/bazi/info', 'GET', data);
};

// 查询支付方式
var getPayMethodsAPI = exports.getPayMethodsAPI = async function getPayMethodsAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/pay_methods', 'GET', data);
};

// 查询八字合婚信息
var getBazihehunAPI = exports.getBazihehunAPI = async function getBazihehunAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/bazi/hehun', 'POST', data);
};

// 游客注册登录
var visitorLoginAPI = exports.visitorLoginAPI = async function visitorLoginAPI(data) {
  if (localStorage.getItem('mlxz_outer_open_uid') || localStorage.getItem('mlxz_outer_access_token') || localStorage.getItem('mlxz_outer_visitor_id')) {
    console.log('已登录');
    return true;
  }
  // localStorage.setItem('mlxz_get_visitor', 1);

  var res = await (0, _request2.default)('/web/login/visitor', 'POST', data);
  if (res.status !== 1000) return;
  localStorage.setItem('mlxz_outer_open_uid', res.data.open_uid);
  localStorage.setItem('mlxz_outer_access_token', res.data.access_token);
  localStorage.setItem('mlxz_outer_visitor_id', res.data.visitor_id);
  console.log('首次登录');

  return true;
};

// 已支付待填写子订单查询
var getComboListAPI = exports.getComboListAPI = async function getComboListAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/orders/cesuan/combo', 'GET', data);
};

// 已支付待填写子订单组合测算查询(附加)
var getComboAttachAPI = exports.getComboAttachAPI = async function getComboAttachAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/orders/cesuan/combo_attach', 'GET', data);
};

// 事件上报
var reportEventAPI = exports.reportEventAPI = async function reportEventAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/event/report', 'POST', data);
};

// 埋点事件上报
var reportBuryingEventAPI = exports.reportBuryingEventAPI = async function reportBuryingEventAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/event/report_burying', 'POST', data);
};

// 排序事件
var sortByEvent = exports.sortByEvent = async function sortByEvent(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/event/products/sort', 'GET', data);
};

// 校验是否上报了埋点
var checkSendEventApi = exports.checkSendEventApi = async function checkSendEventApi(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/attribution/report/' + data.order_id, 'GET', data);
};

// 上报埋点
var sendEventApi = exports.sendEventApi = async function sendEventApi(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/attribution/report/' + data.order_id, 'POST', data);
};

// 测算商品排序
var sortProductsAPI = exports.sortProductsAPI = async function sortProductsAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/event/products/sort', 'GET', data);
};

// 查询最近一笔订单
var getLastOrderAPI = exports.getLastOrderAPI = async function getLastOrderAPI(data) {
  await visitorLoginAPI();
  return (0, _request2.default)('/web/auth/trade/orders/ce_suan/recent', 'POST', data);
};

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(76);

var _axios2 = _interopRequireDefault(_axios);

var _sign = __webpack_require__(21);

var _baseURL = __webpack_require__(18);

var _mintUi = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _outer_sign = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 18:55:15
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-07 18:55:15
 * @Description:
 */
var baseURL = void 0;
var originUrl = window.location.href;

var projectEnv = function projectEnv(env) {
  return originUrl.indexOf(env) > -1 ? true : false;
};
if (projectEnv('192.168') || projectEnv('localhost')) {
  baseURL = _baseURL.devBaseUrl;
} else if (projectEnv('test')) {
  baseURL = _baseURL.testBaseURL;
} else {
  baseURL = _baseURL.prodBaseURL;
}

var service = _axios2.default.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  },
  timeout: 60000 // 超时时间
});
service.interceptors.request.use(function (config) {
  config = (0, _outer_sign.addOutParams)(config);
  return config;
});

service.interceptors.response.use(function (res) {
  return res.data;
});

/**
 * @description: 请求接口
 * @param {string} url
 * @param {Method} method
 * @param {object} data
 * @return {*}
 */
var request = function request(url, method, data) {
  return new Promise(function (resolve, reject) {
    var params = Object.assign({}, method === 'GET' ? data : {});
    var options = {
      method: method,
      url: url,
      params: params
    };

    if (method === 'POST') {
      options.data = data;
    }

    service(options).then(function (res) {
      if (res.status === 1000) {
        resolve(res);
      } else {
        (0, _mintUi.Toast)(res.desc);
        _mintUi.Indicator.close();
        reject(res);
      }
    }).catch(function (err) {
      if (err === 'Network Error') {} else {
        if (err && err.code === 1008) {
          _mintUi.Indicator.close();
        } else {
          (0, _mintUi.Toast)(err);
          _mintUi.Indicator.close();
          reject(err);
        }
      }
    });
  });
};

exports.default = request;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(97);

var _vuex2 = _interopRequireDefault(_vuex);

var _common = __webpack_require__(62);

var _common2 = _interopRequireDefault(_common);

var _state = __webpack_require__(64);

var _state2 = _interopRequireDefault(_state);

var _mutations = __webpack_require__(63);

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default); /*
                                    * @Author: wujiang@weli.cn
                                    * @Date: 2023-10-18 11:45:29
                                    * @LastEditors: wujiang
                                    * @LastEditTime: 2024-01-13 16:14:18
                                    * @Description:
                                    */
exports.default = new _vuex2.default.Store({
  namespaced: false,
  state: _state2.default,
  mutations: _mutations2.default,
  modules: {
    common: _common2.default
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserInfoAPI = exports.registerByUUIDAPI = exports.getUserInfoAPI = exports.getFortuneAPI = exports.getFortuneGoodsListAPI = exports.getVercodeAPI = exports.loginAPI = exports.registerAPI = undefined;

var _request = __webpack_require__(8);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description: 邮箱注册
 * @param {string} birth_date 出生日期 ,
 * @param {number} birth_time 出生时间，未知是 -1 ,
 * @param {string} email 邮箱 ,
 * @param {string} email_code 验证码 ,
 * @param {number} leap_month 是否是闰月, 1是, 0否 ,
 * @param {number} normal 1 公历 0 农历 ,
 * @param {string} real_name 姓名 ,
 * @param {number} sex 1 男 0 女
 * @return {*}
 */
var registerAPI = exports.registerAPI = function registerAPI(data) {
  return (0, _request2.default)('/h5/login/email', 'POST', data);
};

/**
 * @description: 邮箱登录
 * @param {string} email 邮箱 ,
 * @param {string} email_code 验证码 ,
 * @return {*}
 */
/*
 * @Author: ZhaoZhiqi
 * @Date: 2022-12-14 18:08:23
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-04-17 17:47:54
 * @Description: 运势API
 * @FilePath: \find-future-overseas\src\api\fortune.js
 */
var loginAPI = exports.loginAPI = function loginAPI(data) {
  return (0, _request2.default)('/h5/login/email/only', 'POST', data);
};

/**
 * @description: 邮箱验证码
 * @param {string} email 邮箱 ,
 * @return {*}
 */
var getVercodeAPI = exports.getVercodeAPI = function getVercodeAPI(data) {
  return (0, _request2.default)('/h5/email/code', 'POST', data);
};

/**
 * @description: 查询运势商品
 * @return {*}
 */
var getFortuneGoodsListAPI = exports.getFortuneGoodsListAPI = function getFortuneGoodsListAPI(data) {
  return (0, _request2.default)('/h5/product/fortune', 'GET', data);
};

/**
 * @description: 查询运势信息
 * @return {*}
 */
var getFortuneAPI = exports.getFortuneAPI = function getFortuneAPI(data) {
  return (0, _request2.default)('/h5/auth/fortune/base', 'GET', data);
};

/**
 * @description: 查询用户信息
 * @return {*}
 */
var getUserInfoAPI = exports.getUserInfoAPI = function getUserInfoAPI(data) {
  return (0, _request2.default)('/h5/auth/user/info', 'GET', data);
};

/**
 * @description: 传入uuid注册
 * @return {*}
 */
var registerByUUIDAPI = exports.registerByUUIDAPI = function registerByUUIDAPI(data) {
  return (0, _request2.default)('/h5/login/device/register_login', 'POST', data);
};

/**
 * @description: 更新用户信息
 * @return {*}
 */
var updateUserInfoAPI = exports.updateUserInfoAPI = function updateUserInfoAPI(data) {
  return (0, _request2.default)('/h5/auth/user/info', 'POST', data);
};

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_bazihehun.f916c01.png";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_bazihhehun.b3822e5.png";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_fang.f5b75a8.png";

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var devBaseUrl = exports.devBaseUrl = '/api';
var testBaseURL = exports.testBaseURL = 'https://test-psychicai-api.psychicai.pro/psychicai';
var prodBaseURL = exports.prodBaseURL = 'https://psychicai-api.psychicai.pro/psychicai';

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCombineOrderAPI = exports.getCombineGoodsListAPI = undefined;

var _request = __webpack_require__(8);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description: 查询组合商品
 * @return {*}
 */
var getCombineGoodsListAPI = exports.getCombineGoodsListAPI = function getCombineGoodsListAPI(data) {
  return (0, _request2.default)("/h5/product/combine_cesuan", "GET", data);
};

/**
 * @description: 查询组合测算订单
 * @return {*}
 */
/*
 * @Author: ZhaoZhiqi
 * @Date: 2023-05-15 16:28:42
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2023-05-17 13:38:45
 * @Description: 组合测算
 * @FilePath: \find-future-overseas\src\api\combine.js
 */
var getCombineOrderAPI = exports.getCombineOrderAPI = function getCombineOrderAPI(data) {
  return (0, _request2.default)("/h5/combine_cesuan", "GET", data);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOutParams = exports.getAppSign = undefined;

var _crypto = __webpack_require__(16);

var _crypto2 = _interopRequireDefault(_crypto);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-04-09 14:58:43
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-15 18:07:26
 * @Description: 外部签名
 */
var getRequestParams = _utils2.default.getRequestParams,
    getUp = _utils2.default.getUp,
    getLanguage = _utils2.default.getLanguage;


var isAndroid = _utils2.default.isAndroid();

/**
 * @description: 签名
 * @param {*} config
 * @return {*}
 */
var getAppSign = exports.getAppSign = function getAppSign(config) {
  var app_sign = '';
  var app_secret = 'b5d3b66b99390dd5f0895cb21156a8b9';
  var _config$method = config.method,
      method = _config$method === undefined ? 'GET' : _config$method,
      url = config.url,
      _config$params = config.params,
      params = _config$params === undefined ? {} : _config$params,
      data = config.data;

  method = method.toUpperCase();
  // url参数排序
  var keys = [];
  for (var key in params) {
    keys.push(key);
  }
  keys = keys.sort(function (x, y) {
    return x > y ? 1 : x < y ? -1 : 0;
  });

  // 拼接重新排好的参数
  var keysStr = '';
  keys.forEach(function (item, index) {
    var value = params[item];
    keysStr += item + '=' + value + '&';
  });

  keysStr = keysStr.slice(0, keysStr.length - 1);

  // 拼接字符串 XXX#XXX#XXX
  var bodyStr = JSON.stringify(data);
  var str = method + '#/psychicai' + url + '#' + keysStr;
  method === 'POST' && data && (str += '#' + bodyStr);
  str = str + ('#' + app_secret);
  // MD5加密
  var sf = _crypto2.default.createHash('md5');
  sf.update(str);
  app_sign = sf.digest('hex');
  return app_sign;
};

/**
 * @description: 拼接url公共参数
 * @param {*} config
 * @return {*}
 */
var addOutParams = exports.addOutParams = function addOutParams(config) {
  config.params = config.params || {};
  config.params.app_key = 20002003;
  config.params.app_ts = new Date().getTime();
  config.params.app_nonce = _utils2.default.generateUUID();
  config.params.open_uid = localStorage.getItem('mlxz_outer_open_uid') || '';
  config.params.access_token = localStorage.getItem('mlxz_outer_access_token') || '';
  config.params.language = _utils2.default.getLanguage();
  config.params.channel = _utils2.default.getFBChannel() ? _utils2.default.getFBChannel() : '';
  config.params.os = _utils2.default.isIos() ? 'IPHONE' : _utils2.default.isAndroid() ? 'ANDROID' : '';
  config.params.device_id = _utils2.default.getDeviceId();
  config.params.app_sign = getAppSign(config);

  return config;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addParams = exports.getAppSign = undefined;

var _crypto = __webpack_require__(16);

var _crypto2 = _interopRequireDefault(_crypto);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:28
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-09 15:23:40
 * @Description: api参数  签名
 */
var getRequestParams = _utils2.default.getRequestParams,
    getLanguage = _utils2.default.getLanguage;


var isAndroid = _utils2.default.isAndroid();

/**
 * @description: 签名
 * @param {*} config
 * @return {*}
 */
var getAppSign = exports.getAppSign = function getAppSign(config) {
  var app_sign = '';
  var app_secret = getRequestParams('app_secret') || '';
  var _config$method = config.method,
      method = _config$method === undefined ? 'GET' : _config$method,
      url = config.url,
      _config$params = config.params,
      params = _config$params === undefined ? {} : _config$params,
      _config$data = config.data,
      data = _config$data === undefined ? {} : _config$data;

  method = method.toUpperCase();
  // url参数排序
  var keys = [];
  for (var key in params) {
    keys.push(key);
  }
  keys = keys.sort(function (x, y) {
    return x > y ? 1 : x < y ? -1 : 0;
  });

  // 拼接重新排好的参数
  var keysStr = '';
  keys.forEach(function (item, index) {
    var value = params[item];
    keysStr += item + '=' + value + '&';
  });

  keysStr = keysStr.slice(0, keysStr.length - 1);

  // 拼接字符串 XXX#XXX#XXX
  var bodyStr = JSON.stringify(data);
  var str = method + '#/psychicai' + url + '#' + keysStr;

  method === 'POST' && (str += '#' + bodyStr);
  str = str + ('#' + app_secret);
  // MD5加密
  var sf = _crypto2.default.createHash('md5');
  sf.update(str);
  app_sign = sf.digest('hex');

  return app_sign;
};

/**
 * @description: 拼接url公共参数
 * @param {*} config
 * @return {*}
 */
var addParams = exports.addParams = function addParams(config) {
  config.params = config.params || {};
  config.params.app_key = isAndroid ? 20002001 : 20002002;
  config.params.app_ts = new Date().getTime();
  config.params.app_nonce = _utils2.default.generateUUID();
  config.params.open_uid = getRequestParams('open_uid') || '';
  config.params.access_token = getRequestParams('access_token') || '';
  config.params.up = getRequestParams('up') ? getRequestParams('up') : getRequestParams('os') ? getRequestParams('os').toUpperCase() : '';
  config.params.channel = getRequestParams('channel') || '';
  config.params.ver_code = getRequestParams('ver_code') || '';
  config.params.ver_name = getRequestParams('ver_name') || '';
  config.params.pkg = getRequestParams('pkg') || '';
  config.params.device_id = getRequestParams('device_id') || '';
  config.params.df_id = getRequestParams('df_id') || '';
  config.params.osv = getRequestParams('osv') || '';
  config.params.os = getRequestParams('os') || '';
  config.params.vendor = getRequestParams('vendor') || '';
  config.params.model = getRequestParams('model') || '';
  config.params.gid = getRequestParams('gid') || '';
  config.params.oaid = getRequestParams('oaid') || '';
  config.params.imei = getRequestParams('imei') || '';
  config.params.android_id = getRequestParams('android_id') || '';
  config.params.idfa = getRequestParams('idfa') || '';
  config.params.mac = getRequestParams('mac') || '';
  config.params.language = getLanguage();
  config.params.ad_channel = getRequestParams('ad_channel') || '';
  config.params.app_sign = getAppSign(config);
  return config;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_bazihehun.5e1c44b.png";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_caiyun.5ad8987.png";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_ganqing.0f3869d.png";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_guiguzi.2d29b63.png";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_nianyun.ac4c1ab.png";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_shiye.9f79ca2.png";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_yuantiangang.3c14888.png";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_bazihehun.41cfb6e.png";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_caiyun.aa0ff37.png";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_ganqing.e91bf0d.png";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_guiguzi.736b23a.png";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_nianyun.78b38e7.png";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_shiye.0c8425e.png";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_yuantiangang.586ef3c.png";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_caiyun.3153eca.png";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_ganqing.b2bd698.png";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_guiguzi.189b5d1.png";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_nianyun.fc5ded2.png";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_shiye.20d1375.png";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_yuantiangang.004b412.png";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_caiyun.139eab5.png";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_ganqing.db48c3d.png";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_guiguzi.798e9e8.png";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_nianyun.1a72f63.png";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_shiye.254d4cd.png";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_yuantiangang.a42662d.png";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_chang.d8e289d.png";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_chang_tag.5308e9f.png";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_fang_tag.5810059.png";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dingdan_img_er.d02e972.png";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dingdan_img_san.caafeaa.png";

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABZVBMVEVHcEzYt5Hd0ab97tvf19XPvZa7uaXT0tHQzajb19Vsh3/us5b9+evZ2djnm0TKzsvY1tPV0c361Y/ai2zprZX0vnP3yX7XlFzVxcDbzMX4587zz5/JZTrnxq74xHbqrFrhe1rcp5Hf1MndnIHtt3TnsYvX1tXUgF/jnHrIa0nNelXlpor54bbpbGrjknPho23loYG4XDLsupr45MO0QhzUk4jPg0j0qFXbk3HoplLdilXewrLdlHb1x4r1sYz525v61q/j3df64aXgj0vThGrXuav2w5vljj1cvXr02MDtqn2usI7keT7AxMLmnFL2tWjWsJ6cS7nwnHPihj3mo17ktaT68uHdybtLtGzTc09/sbCkVr6IJhnTdT/ltHyxRznyz7Xwi2DAVieexbuLopOzdK/rr2OVaU+7pYzJsXeDjYPzu1hhgXpNiY7BvZZ0zI+ARy+uiGzewJK4k8C3k3jff3o5X2MDQ/0IAAAADXRSTlMAK9SRK5G8kf7Qk9TUjYpwqQAABdBJREFUOMtFlQlX4soWhatva6v3PiEhATIQQhJCJiRhHsI8yiCigDS2Iji32vZ43+9/J+Dr/lZRVavWrn0ORR0KIWBrZw/b/0MNq43wfZyCKU2L7iOM2tvZQm/swGpk3d4+tX3qoTX6vt4nHh1F3Dju3tlo935brqWRCA4D9fDr4VdExDBYwN2Y2+3+sPatiZijwzeZuN04jWORfez7t4uH749OLhiGg/gIvLfEGkavHdfezqp7DYY/Pny7uPj20Ick3EfAFiSMibO1oROdxpyIMLcnE9M/GFwOBvFvyyVHOeygPZqmZzNwwyPiDxtfGJIhz/ax2SI/7IwHHRd/z3t9PpuyaWwPHVEULc5m3Ez2z+cBLbDGdHVcQ1djMB66+Of69zD/A3ZyODoCtcjJyvwSCFxfpxyuxy6XqzMYdDqufJ7P52FnZrzAkN2yZ7J22WiMM7+1qVSg43I1xoMxiF0O+bDXxdGIs1W9kOeHjcalXgyk4tepOHGdug40OsMx+DdcrpCiKAV/eIm7UUIp8DxoCxkiRqi6EXMGJRazGippNayYBem78nyYpd1uVJjc85NhwW8uZLVoqLJuWIRskbGFrJBkgySsjpN+Z9zhcAwNeX5S6LHRaDRBKokcQQgkkZByCqkVi5af1HM5xxk2vLr3EWh73WQ0WmelQIBQAlMYilJRaEmS2iSbhFooDBv34TC/644gfsIy0XrFFFqE0mzqaaqZtluURFFTQUmPBMlfKBgFmRNZWtxH92wyWmGvLi6utLSWTuMYTcGlojCKwik8sk/ZIk23hJzf9BcEZOTYOnNWoyk8jRm0vb6mf8DsFjEvZBqNYR5+HQSWzBmI8anBiX9u36bZdlrLZEAJp3vP36OLVGp6ViMJiQyR2D5Gc3Dx3twjohS4zJhqrBf2en1erxddXF1NGcOYC6O5gGM4GUrY5GxTMrRA5NRYKKT2SnU4Lo8Ppa40JlEk9Kai5WibIw0jFjJwUNqc/zKmEESMtBJRxiGKrjRFU6yANlc0qSXFVCUhjFr01J6GYoUCSRhcUdMTYg1CiQxKN6+uipKiT3WtRSrFuVqcJquJUAya3ySKhKIQlias61NEZFoy1aYu6ZpGtQSSlHJyRTYUS54rqklKCqk0SWGErf8VUHcp99RiUyI0zV5yzZxhNGUrF1DmGhEOSwSpScJoXZ41sYu6XKJHwtfI6bq3JCVyRSseMIqaasXN57AOCC2oUjxSq9UYR2xCYrJMTp55JU5oUtwyFMXQHHFOicdTcYCg012mixguoeYIVZbbpeAzD8loubxpEUQubnqf+fyk2NTj8WZLFKbMEiU50iw+Pgndbrvs8ei6LHt9cjjsDcfDQV/Qyy5JVX18cnNLrsuBM2kJNy+tZbl8uvJ5fZ5KpVSqQAebgsclsDhdPZzfMEySGyFmmUjcnJ8nyr3T1SDr+Y3PB77Zdhs8Bo83N2JymQAxs6yc3778kq3VapXNQugg6Jxr4z3OZkvgoQ765zditEpO0Vm3W/nx8t+Xm/OFp173HGePg0FQHYNt1uupeIIQ9uV2N1ptkww6Sy5LQc/n/nnf50Q/9tWdLU4fDFYqoF58uX2Eeq6yyzN0xnTZ48kxxA4GIXLQyXbdByGEzxt08im1q9FqlQFxMun5/HQK9HqwHg5DJcPBCRt695+B193d3S+7Z0v0n2j1x8EbMX8GgM68Ozn5dALc9T9uOPzypfsPel+N3h4cjNLp9L+OeLHw+/0ZP4h/3v38efKp//Hw6+HXr474aRttMdWng4N0urkRmyYU/UZ8cne3Fjvqj4e3L0/vEHrfevr3LQ3SdFyBSfrThrvPhxu+9m//dp6rD7f9134/Wm6XfKVwKBRa+bJAG2ahstfHsmyS6fb7/Q+bh3D7dff1lW1XS2ypXe6VT0892axntTqFebXuKVWSLPv6uP3/J/bd9l+7LBsd3bIO7TJb8pR77Xa7WmWj3XOuWvlr+52j+x/Ru16XGk/w2gAAAABJRU5ErkJggg=="

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABWVBMVEVHcEz1k8n8rML6mJrphc38tLzue8/ldtDpk7funMnNicP5iIv+27qTf7PtdtLxhdbvftTxh8rrb870jsv3lsP+pq31lMj9gJ/5pMH9qrfue9T4m8L9iJH0j8nvgdX6kJv93bv9nKS5d+T4mLv+kp795sjxh+j7zrTteczWjPP5rMb8d4P8bnv88/7Wd9v45P78v8P3nMvyjNOrevn7YnX+zlH94L/Fc9v2tpjywfv87t7bzP7kedvmvPv809D4mZF4cKb5uM34mJ/5UWX7trLXpvr8qKbAk/HzbWyOgLDolvXwhL71u039xKf40fznq/nSvfz6mrC8kvypd+35ovSVUDTHpvqxiPfLf+vs3P3Yk776wVv9e5bXlXLYfM6wibHzoXPllkX1mPXakB71rCJlW5D1rffrWlL8xHyyZmvMdY5aUIFtOSjnjq3EfV7wcptUR2m7r8jSzMoZ3JgfAAAADnRSTlMAvNSQkZHU/iv+58jUk5ZUC84AAAUdSURBVDjLVdX3V+JYFAfwzIwOcmbXJJMCGIoJkAYpEDX0EmnSpSOKOvapu/v//7D3BZzyDQke/bzrzXvJeRgG2dt57zk42P8tH/+I/OHdHrbNDkEQB262Eo4/eKdh1nY39k04TGyzGYGOX1ym1apZKtU+uHXDP/NrxG/NdILlRoOpNYLvoF/czcbKMuFegcvgXN9ptYCXy63EHrbL4duEDz5NJkDFyWT/AF1F1Is4+fHUSiQSrafWO+xtgNpi4rFfMNqy2BcNUYbzsY9svy+3np5akdYP+T0WCAQ4vz8FuFBsK5royRY9xkBWsrpR3JcLbWPwkeh0Ou4NYEwARUX6YGHUPbqm6FqbkPW6ocu6stAUeTubCDMu9+N4Wi/WdULR9IW2CHuU5ULWm7qi2fJmcuAGEHY1S+nDpgcnm4Y9HHo8zaEtE9Zonl9aMuHOJcw95jCqGShnJL8ws8aCgNt5a2jr85EljAsFj50fedBsbqYe4wPBo1iyLHkFFDuN24IOJ0oYxwVBD+Ob5QKPMbGj09NWUFJJkky/Bk/j5GbuCXS+Pg4YFUW4LHVEUcSBicBEEr4JHBmYfkLcJ0SZgCFYGun046Sd7Wc/4eRjX2wbExHHs1nxEwRoti/2s48iEQ5j6TTJdoxBu12EP3fa/X57oLUVkmwPCigHsCxZxRgYBQKnMIqiyIJWHGQH2qDgyRrFerGvKKSSHaCPUihkNaWoDTSF9AcQDinZZd2ow9Lpdc0q1utFnYSFrC8XSoeElVTq9UWRhLUAHFrXrdGoac2Wa6FpWNqoOCRDC/gSBEMnrVHTmDWLC1g5BguxIXs+06w8HGSnnh8Z1nKW886WljWfL8fk2p4tbUGzXcyyrJC3tPwwP5uT6/xoOLS0Zk7Iz/P54XA4lu1Z3oKfL9BjgTAtrN0Vo2l7PB7b62azatmdptBsztfjsbDmL4Qx71amaToKHy4KV44t3993WRUVYHOBUokMUSTFBhie56EwjyG6Ccdx0bvp9HuKpsFyajVXDVEoHNOIIctjUTrqhkP59n16dcVxKTrFQfUU23n5HAqFKM5keIaPxTCeOY+iAeWrq28vX79emd/cYRyUZ9np1+lnVF1lkI1g0A4PPNPt3kHVbre7gn/j9yNN09OX6QuF+oa2YxGEHcdp3GZW3dtp9/i42zt+7vVqm9p0Tcq4fVBsNAoac5zMjXN7c7sCuHrOSLUM43f7aJxzUbpWYlmkSYokozHMeb7P9DLQxfHx8bPU87+G40qZmxsp96pRMOem7DRqvWM3K1Dn51vu3N7dSbmcivQWRyBOJFK+QThQ5eG9Odrwq+9395lcLsf+1FgwGInxDhqyWjHVUiJ5dHR6FKj6VX/j1sX/eumfmG80ajXTdCJOQFVLkcRlMgmaqaqQjJT776ziTaHSLj45ieekw57UkyTJNC8vLxNQHL3vPOjV/T+VykUKaVQaOwR8cihJPdABv8/nQ/wIdZ7gq5nyl0rlOgXaLY39dXiCcgi6d37u8205tJ4M8tWLh4fKWQppeFXfY7uH20ATMdf6Ir5gEHgyEaldP3xx+wAcInewvdKrNs1NYV8QpgZ4MhFsXDxA05Xra28KHifY3nbN+KtGLfti2wSTqA9U+uzs7PrapHbcrU0txTd917ZtRFwMpculquq9OEP87M1mI9xVzVI8Hj+Jxw8ZFwdjkRjqI+nAr2HGEf/7dYvd231rlnIuP6nBXQYhCYQzcZSq9+2Oux3/D1FFPWVhqtIJAAAAAElFTkSuQmCC"

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAA0lBMVEXCra3m5OBZIRdcMib08exmPzXx7+rq5t/w6+b7+vXg3df7+/S2paf////v6+T+/Pby7+f28+3///3m49/69/Hf3NlFOzfTz8lkUEBnY2NVJho4MC62sq/DwL2TkY9xRDCempbt7OrY1dGtq6c4JSB0LR94YEcuHBdlLB52dHKONiaHaFXJyMSKh4anoqGzeFdYPjJSUVAgFBGHUjuEfnvEi2maYkeOeGkRCQfcnnbCu7TzxqEKBQS4t7e0Qy7msY2hjHv53b1GIBeZeE2wloi8n4n2CS3NAAAADXRSTlMByMgr1JG8kSuS1LzUs5kj9gAABRNJREFUOMtVlQd74jgQhv3sZTfZvcOyqi33hgvuuBAgBNL+/1+6ESR7e2PAWH71zWhGRdPAHu7vdANMVwa363913Z4Nenf/oH3avWFw9eL28qvD7y4AU934eWN/6AYVijauX4qNm2GdYYyZ6kJ1Pfpx1QWlSU4TVY3YwEmpEOaFg3AZggszzKMIK+0HXTdpE3LHNQxWljjyZcQYQ7z0B4qwiRBiZkiBRg9K2C2FHEoD5NraVW+vFg0RItQ0GSdREuGIkJ/aHcQpnaH0lUdEpe/X6KrWOGKQruvXPKKRDh3JnQaxG67vS58CgqeIxrKMyEk4MhkIQSh2uUeoJyOyQpoatndqk8GtSdycStm4gyTIM0ktCFjdnuqITU+SrIimWG5KRlCZRGhCjcMIxEdWeBjICiwaGt9L3AQeNDVyhhoxCKchJAT3Sm+1qoVjAkpYIsupDPEKYtLYdegrfnJjJUQj7mGsFM1Y/UK+/UHIsqSQcA3Iq9TV5WqFYCxhEq0+jfCwLMsJ/JWmAfDN65fFpXByx1WcMt1tpsl1kzCcZBlr/0MZPwz5drsVESNM16GAYZOYcRy7oecljkb+UH45nvdv+TbPnTBGGOYMNV1PFcLgPMIU/6GMzOPLy3G/OM7gNK6qIjN4rGqFrgwh2u+hrfjxxXh5OXc7sZtcTK5BQ17/80x+K5OEn48vx+O+m6zLe/P5WvFeciOY+aXMLjvvCh+XnVW9tzeYJr4Ug68ySRB3P5XRJcva87KbL9lYWVb1cW3Uo6YcTkZdGzBc8/AFHyzRv5+P+2O33weWZe2g1MSgnMXy5MeeyQE9HK4wMXfCydp5D/A8BtZgVTtKkM45xNEO3ASLY86veb70QmRhKM9mVS2BsN4yiIQzquCQDrC6TepB2hX8bjnCqk5TOs/zmNkiy96yzNph6nFKfdEaRuvjEhY9wK4lrMxqJiutXvjOynPLypT2LmxCVT6YbieflXDXCL70oFNVgRUEB9b2edqnlvUG4g3Mel3nmHDZIDm4RKPeDmKosnHMRLCYVbFNg8BOs6zPwjZsD7UXIyYk9iFnmhnvhMyyqupAvHvvAru35sUOemGFbpK4B6/mvpCJqqnG6UVKyOyYXUZr/7EP+srplr4L8t73wA6xadYcUR8yAQvWVJkTwoJwPj6Oltg5IhOLyPvG5ZC9EDYaChsaRghWyqGtnNRJeysLqo9zEECBxDZ1+nTyeeTXftPEJldbK9NWK3fXOXmair5K+3lO08pRcGfb0o9hf4pPNY/NGJKIFbw8W9s8dZyq6Lu57y0Fj5v1WviJ58WyxWp/5RSDMqugHWCQLIJxKQLhpOl2vXle21mYhHXTUhRhBlGAMlciW0Vnb3M3Lz2g2+3r5nmz7ssw8dqSk5YgZuixxsc12Kttr7vzfh6Xed68wgK313ZRvErpu5Ss2tbza0q59k8AGpsg2HT7877r5m7frQsb2grbtqcpbBPulTLhpk5/ad83m80a2GDez90yAr7fQOzPz9Dl1Q8Bdk0v8T2G9XvtLxuiCBYAitfUHoNl6YL1uDwr6dcwSWB+1FJKCvsiHG/fi/U4PuePT0+PeZ6D8zRfL2OwUXEc6rpOWtc81UydEmDfinHcPN5g+Dw9PYGrAuDiNWYUc1h9Xhzrf98Owu9BUAD8uE1hkoCLR7uwi/W6KHJ+3Ryh2rF5/3XE/vX923b79AhFdED88RESCYmDmKla+gTzX7fj+F9dEdwbrbxbSAAAAABJRU5ErkJggg=="

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABXFBMVEVHcEzWsZXPppX0x8zw4eGVYVDw09Par6W1qYnl086diF7VtqmXjVvv2ND37Oj66/DGbTaIkl3vv7/FbjT9+fL79Oz89vD47eb35eXq187mzMLyx8j2397vubnt3tT68OrhxrrguK706OHw4tv11tL++/fwv77u3N3wra3lg4zz1dvusrPqmqDw1dLojpT0zdHtrJ/ZoobJjXDme3/07PDyyLiHTDjhb3jgY2z10MHro4z24teZYU7dw6pxMiitdmrYRlDw4MW7eVfeV2DTe0+COCj+8ND7uYz4xKNfQ0A9KDF6W1HnyOiaeW/oo6ibWTnotOjhuZP84sO8WVuhRjC+fGqcoXi7kIleKifvnnrWvrrGd5zCuKfvoazfzMjdlWnbihmoak65ZjjIYmG6r5fHbhNJUFjQlMvHq4+ldFV2YqffhGXKmJuGcmuvo27lip7KeXyjlLTblDBPQo9Lz4qNAAAAFHRSTlMAkSuTkPYr/v791LyR1NS8k4/UvGa3tfAAAAXjSURBVDjLNZUHc9tID4aZnCeyc+Vr7OSyi52UREoU1Xvvzb3EJYntNOfu/898oHyHGe0spQcvIOyCwDCwt/95fyjXZFZVOe7IMIzMw8lJO3d0ZDCHeZrOG6n3v73D/rbfpMPLS7bGCILnMYIqMCzLMExNkiRWYmvwOfzO2L+8sr9+Pz6uscyRIAAGsMpIkixJKXnPBjKsRj5P/yth3xwfH1/KiRYjMIyPVIVhE81USoKNDD4Sy+Tz+TJov3s4roHQK2wLftG1rvZ+bJKMrF9JrBuaQNP0O+zgocbKKRZEBcEAEtlW7EFGHCNUBEZAIRteWS6n5NP5A+z3Wi0lpVhHh3+GQscKO5yhqoIee60E9i2/6Mc64/E8+zt2VFutVo7LhUB4Tuz4pqFWVLV4FXIVQXM6Yey61hyi2o8prNJarWpFUy2aChTN8DvFos8rvuWZnbnihsXQ6XBmx/IE9TuDUVRFQLFa0ZtIcYrNuOMgx9Njv+PqnY7u+U03BBcLCapkYARBUJZBUYrVdBHilI6nKN5czSDf90wddfSw47tFKD/PqxiO4yIlgofiAca7TYMQKUU33bDJqbpvKGrH9DsKGBtjeBoncZJMAlCiqMYuBVuRi91mSInwFUEZKLYUCB03sXQ6DTBBeRohirxuIo+CKEo8l+ceTyQiBKWrFMAoTGCcIIzzYtHTQsvdvMwdNDeRIPkvlqNnGNW0/CRNiKLsYVy8PImLVthsWpuXbOi69xvrZbO939xvTC5uNj0IndBYwuKMjGQZ6ciROI5zOA0ezpEsyXJKzyDTZEv8Pp+kGmShXNAIiibFNE3ShEjTadhASJ7AeZImSa2QLZCEmMDAZjWeazaRo+muFRfDmKZcX6S44lyD2+Jn+Eo2BHqvjMpZHn4pogxyOb9YdJu06M8hS9OkLS6O9YqWLb/CJEmibKkiQhppkcdJmiZ5Ms2n4QAoGufTNi8WCmVEpkkCjpvE8YrmaVqJTYwr/W3cvhPZ3S44K5dvgpsaTmAksJA3KSoqcy2dn0vXjApnCw/nYNezaHHXDVYFOegWSGzPJrnsLTn45KpQNCwknv5ajRa37VwtVQ67N2tszxD7hXh1xHHaRAXTpHA83Yiqt9Xqt4Z7Nuje5/YwvVwup3vhvVXMVtRotYBWol40Go9mjd3Zl9x9FwPRpS1JLW+Z/0fY7D+M6/V6y8SlXm80rgY5WQq+BLt7gKda6/B49tBfksS6VKLwSmn9M1Vo9HYFOhXVx9FtkMvlVkFus4HSLfutw5Nvx32bG6we18Mht/75/BPKUM9pl/XTUbWRwCl512hgIm3316mSPOuvh6169Nhfn7Wen782GqnetnJeH49Go8kumHw7CRpVjAC49U2CNAb9Vm7YemwNv/7116zx8nX2Ql2fjiejT5PboPppVqv2MFFc9vvh4OZyPQTt9Ul11r94vrB+WHNfp5T6uHrbCNryyU4uJTCxbH2+6F58lkoDsKdhVbp4dkyT0026QkXjSZALdmxWLhQm2wS+pqcX0+nnwaB81j7tLh6HFd90fWRqJf5kPGnnGu2kHLnoDqPE6Wcgp8v8YHB2021/6Q54ms9wHEKFAn0E1WjfVgM5CIJFF0suwtSeTg2xcgYV+jIsn9E0n9BO1tG1yShaRNvN7il4uhtiSvK6SC4PyN2UszeVQgJrnI6y2XI5e/lpHAEcBJNPXRX7A14JVNJ3vG07Q+iIYQG2GjTvHvYm49PkDBujSe4P7ACkKTphMxmIDU2QZPGq7GazmRlck96i+lTfZg+wdzDJNJ7nbY7LZGzbpveOmsahJGfv5PS03osW7fbi9O4thh0gJ6PZNncFwkDz9HXNoG3Qzth5+a43Anjbbt+0797sRxuy5EzG+cG9EvSlkUxKWsuv/vzw4WN91OttP3Zz7f+9DsJfXP/w8OrKsTk55ViGkKYNI88zTwn7Mapvo237rvvvf0bs2zf/PW5YV4iT5z8sycgXujAlJ7PFB6Cj6iJavH/zNuH+D/Y4WF8KMFB7AAAAAElFTkSuQmCC"

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAxlBMVEWwilCXlWbo1bvEm1y1jE28mVW5rHSqhk25lFSjez3Gn2K8lUa8kU6+lVTNqm3IpGe9ml7/j43CmVXPsHmngUKleja0iEH+0Vj8yVSLklqwgzy4jUelqXe5lFOwl17+iUP+2Vu0j1FPTUrdun6fpXDvqKTcvqf+eT7r1L7+oEnXu47grUf+s01iXlnrkHz51G39m5qWdDn+ZzrTq1vlwGvSk2f+UzWah4KWhUiwnJTouVV/f03ZnnG7qHSHdnMyMTDDkpDRpk82IjtfAAAACnRSTlMB1JP/yytd/ZH5A86sPAAABIhJREFUOMt1lQt3qjgUhbkTu3AFSGICCUIBwQqCj/q2ddre2///p2YHbNd0rZmtyMMvJ5s8znEc6GE8cnuF/y13NH5w7hr7fiCJlfR+aLilOEn518COfP9/6HpZMymXyqs7VY+GuFkAZWhgafIdlnpqCVElcU1lN4ZfGzcFLYQoAym/o1PqyZrRDrfK67ha8gdnTCiXPmOMEvCITilVzMLLWsFvl3aiLkO952zsjBjhJOCSKcWoL0gAuOs6uVyqWqml6vR7qD0v0mz5y4lSCpjphHLFfU64TzlncKu49tKlSj2dhmVeM/E6daJEM8BER5z5fK4GmtDBeSfV0vPCuq7fp9O/HVdHBDYod9FGMUtnlNP7kMDIstNaynzaw6QkgU8E5zzlc0o4aEntkEhPy3rZdZ6XW9TCYZqWWZaVPgkIC+Xp+fl5bqfHXjwfPXRRgnuJXiAnzNJMiAxHQtlxNjOz2ewUkNOs19F6CaMEM0xl6bjAhIBLwTNizKwp0OB4nLVxc2hnpp9LKVmOscoRWWvNbJ9zcTSmKNpLYW43E6/btjDm0zva/06cMcARdBz6PK3MumgORWHi2BRNcYmNWR1hDNZO6D539iJJTdzETbE2Kxu5OMRmZZsdGtArEx/Wh9aY3I7GXvOVaZumLVqzis2hXV9MvFrF6wserWO0urSXg5l99nCkVqZp1vjCaozeizhWPG7XzeGwXvVw0TRmFWjXyRlgvFZToE9xsnZPVFHeXx01ej1cDhdY5MR1XKqOcWsDFvEnp2zei1PK2NFPEi+O28P6EsefInOdUIsghuDvpqmgFIPEGKHYBGkC3dbruG3jW1aWsKF4pvo+bxFgEfR7MbCwrwHrW+9sWBs5TZniXae6KCoxj4MP7AAqtYWTJH9/xOK4w4pTBVwApoLM397e5vbn7Zz2sI72+30UhWUYOjnPoijJVBJF6XY7+ant9uxjNSS+TLGQXCfiPIiiTPj/BndWC2i32O225xQbX1DhYlKs9GR33Syum3rzsbt+TP5Uv6vXCqqrzeZ1sqV2ZQLu2QhhFx+v1fV1UdWbzR3eVJu6wgE7eZlP3akT+valLVwtAX9cr9XvRQ+DrerfNvLkfN9Ww+Ln293H5hU2qs1icZ3sFtVisalw/+fjupicX/bRi4tt5WalxTPy9uMNF+gKL2d/tyTDNFG7+MPUz6x85MT5+cfgbTFyZyIkwTwI1ancKTFXfkDtgvBFFGIKkaHOgGTgI78KxOTqXVnldpw5NiTDNCIxqTlH3qOU9Dkb6wShOFc2lOLvThQEPmCSppT5fUKyqVEO2Zr27Psj9PT4OHXcNEFy5mWgOUNiFDTA39RGpXfxx6dBU2dEA2LhsoQVnwobFy5QNnCy6DuCPtnv0y8kc0IBI6y0yVySb9huANpbsC6gsfOAYpL6Q5noEYxCOpQkkVvk8VsPQwESfQGypCR+auWhvMgstyrLtLTn8VdpC+6lLbDdePhYlVrbbajtktZ69KNowuLwWPe2IBdDFYYJ9mKYjr9K7Fc5DqNv9WV4vx+Or3L8D2xnsBqQdt0vAAAAAElFTkSuQmCC"

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABFFBMVEVHcEzzhDbyaj36jFXyXy/5kFj+qXf4f07+oGjzZjv4fEj2pGP4cUH3qmjwRy36k2b6uG/oOCPyn17/3c74hFD5llnudEDuZzn6r23pa0r0VzT1az7/59zzYjj0fXryYEz7kZHuiU7xZmHxjlP6n171oUnwe0f/28T6pnnmSSPpWED8kqP7q4nvlFr+zs79trD8u4H0dmv90LTwgEz+yKD1kyX9p67znHfrZCL1clX9v5Pwg2XoVjH0dAr/8ezqQTr7uxvxWAf/3dz+17j5zjX3spbse1P3phL5boL+wMj8wLH/yLvvgjX4jQrXOCnTtTX9tH3tQQnzeyf2vkn1sFLxT1LQeE/5iYCzwViZqFmqSzuCUj2/mVWTAAAACnRSTlMAj7z/1MTUK5KRFUiCiQAABZhJREFUOMtFlXl/okgQhtllZpKAgMglipwiCAoBBTHgEe8rJjGHM7vf/3tsNZndff/w18jTL1VdXd0YBrq5+yaVEn/9FJGslVg+rk4M32q2pG93N9hv3cHfonS5iOLnr58nBL+vTh3X7dirN/f+gWgh3X2xf4oDsfv4+jhJOp1PowMS7ZX1MiLz95U9HvHwCUT/WfqKVuf19fXxcfKUDLJkgGTb+WYzMFZJIfHyme1mUrPZBO+bzsB6BHYyeXqaG5OtAbLeZM8bVN+y82wmM1IXlF1OxA32x8AwHh+R79N2bidzC9R/K2ZF9U2eFVmxedBYunG6dLPJH9h3eAkoGG/nq3fb7oMOWcZ6Rrw5n9mZeug1gCbaYvcbZsHLC9gi41WJ9mvO+sJwyzVi5ZE7pmmgGzhTYP0aKHl+ft5u529oXKPq9dFl9PdnN+kCO3ygXHc0prXxmMHK9+Rpu31evVO1Gsy9f7dP9Pmvz67kafnQdXu94XI5HNPjMUbWSFDNtt/JclB7X70ll+Ise3+dPaZet3hmdOBix+k1NAwAiqSod4qiyK+JSZJMstw7n2WmTsJC8gTBH5yl09MwCqEUNX8jfzuTNYYkR8WnJwuCtdHNwYAAvMc5SxejvpTYal4j+6rar8GPDKypGpZlTn056hCgNbeMMci9Wq+TujJdqFaqKL7hT6d7Nd/4UzOT9GmgLNSSjp0lBmy1Wq/5urzw1ampKnKqmlOz+FhMTc3b7/zFzithl3MwIMGZ2mQbJboGsryIZFldzNj9TvnwdrtFsNA9EeiK5sTY/X21tJYCXVYB5iIj4syzH+iKP/swuZTTD1dkTccOdo+sq1R+DE1T4yLVkSNO92amrnP6TE/1NIgic8DjTTbmMOR7XyX14/GYytHxEMkpDPU8147ReiR3o0MhdvhKgx4rHISB5G5kWZb6hiwbliwWXZnJN16+juPDNWQbIFpzFKWM2Sbtkw3Vo2BzQF3qnYzHoSK4MHqI1WjEwB4KFc5xMNGwiiw7iVGnRlJ1VPTaPd7KhH67L+A48Ot1GnIKxzkxg3VZlqVp7yMI/ZQBNFf9kdDQfHWTq6qFG+Z+t0/X8WHY41sYe2Y7QhQE00Xg5xSlBv40Mhp0ut8tFunYGOvTcA8DnqhUKhjLFtVqXw0ANyWhtln4yk6lZ+ZO9f19KJu+4k/9vQdoE+CzVa2S5j7Y781GS91xPhemrBos0mC/M2V/r+yUNNxJFeTcldokle9CDpLwaZMrK0ezqj4LPlJT9FTusNP3nNYEa6xVIfDONUyDo2JqNGsG6hEyZk1YgsMxFUWVUw5QUqmJnBFsiNo11NWNkZmRA1BIm8fwcP2YfcgDTz/OOBOxEDNNN5o8L2rh1SCpU6RHpqZpNN3tanrshNr4qmth7CFfCINGNGFI+piEHjhl6KzqFtnJ6EiFVmw2nuxpmoR8CRyDAwToykDqw76GniVty05sWxBwY9AZMDjPd0QR+fIMjuUS5AOR4O0qagLA2yBBQLXGcYbBcWhXYAkYYdzS0VjIkoe900Ys9T/Mlyw+GuGVCnrElg7n9NYMgWgcb5PIWfhiBcTi7gNoNe8xzSb2MFxyijLNmwjneaH9ZVzG0LapXo9xX4Tq3F6veyPsx8MwjjmlpzUaTZhACFT7v3i38/m6CmfmMzrwer0f2O3Lw3AYQxso6wbdgkzWLo4CQlG5deiM5DV53a5cOEpvsZv6yz2YQyzTSINjGK6aCnyAxyEq92W1nSePk1e4ExiGgevttl7ikCgcSlqDpptf8aAZ7tNkYkMY823CMLfouvpOUfUyFo6bRjTqG7CHghE8LK6AMwIjJBcc//51EYJ3vcSXIVs2WQF4k4CFQAsNZcZxgrj994q9uf1BUiiW4bUXjv/FYZGhdM0W5PH7Ov4HXHsMS2VboWUAAAAASUVORK5CYII="

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABSlBMVEXGxtSbssd2f4AkLz7L2+vR3+w4R1ViboWbsMWlwNutxt7R4O3W4u6eu9dGZ5HZ5e/S4Ozs8vje5/HL2+rB1OYZHSewx99libHG2Ohwk7q6z+OKqcrW0Mnl7fRvbmp+YliehHhSW1vlh0GokYBfZWbrnl98n8bguZCBlKeywMzf2M6duNM6PDbZ5O/IzdHS19zGvragmY3a4unBqJHDlizo5eGpjl/brX1lW1SshjKwpp3yzZ/LpDSDnrvvuILOycMpNEIcJTWUsdDCpWdSUEynwdvwrXNCRkPiz736w4zX4++BfHSIcmRXeKHOxLzawaLieCyVeGRugJHx8O6Si4K3jXhbfqikq6/IqkW4kDOskEfp4dW7trG7nUXcvELjk1fMtFustb1VaoEsRGQtMTCYn6LnyLPOeSW2nme9tKWcdjypeCPLsaLThUnNcK0JAAAAEHRSTlMB8fuRkNTMDiuR1JG8yJGTlohSQQAABdJJREFUOMtNlWd32kgUhnWySU6yVUiyCioIBKqggoRAmGJTDGua6b3YDm5J/v/XvQLnnH2l+TLzzKs7VzN3EAT05Y9PKIrjNE3QOEHQBBElCALHURS7xWkCRdFPH78g7/oHy9yi4VgooAGOwgyYefurH6c/ntk/MdDtqROawdRoGkeBomkUXN67cfzPk2/GrINMu/7ySrz6q2Gv81KvZ+v17cHMHlwTs9263Uc57g+Il8bsN+/70lxsg9196Xsp6K26paV98LzdZuvtDptSaeFJVmrf/4J8JXjzzXv2zMNytdNKwe7Q9YKdY9aXu6VVLy0WtlNabDfrJ6X/EfnL4C0w/m4dlsuduvRKAeV/WL24gbfbbt5Ku63pbw8LE1u30U8Iy2bc4C3wzfp2tRVi3psv+8eRJwXBov7irw4vbtE/uC6GZVAUqbEkZmXNLGax1KxH9aiyQbE1qmaalmXxWQvDeNTiz/lCmoaR4S3ooxmGoRiKUg2WMcoywfM8ZlWzkUgEjfAnYxwho6RWL3lLY7VdDEfbbalU9ocrn2EJPrKx7f7GikTCeVgGR5FouTz3QEJ3EaxULwiWaqkULBy5xvMdIdmIvUZONI/dYghEyayev6/U1W7ZUYPAC0J45dRqND9Jxi+GIrDwhBOQHiWP3p6D5f2Lv1gcfc8LjqVSd3E0WHo8XlcnrYYZiZzNMaQ3Y9SkP/cdSZtLc1+aSMfJRPVrhjXO5XRuI1w9YPx7IABTNUrjMfQWFpwNNypBsLIRJfV2u93fFIuF+D0YD3IRnkRmsxljbNYgTiOwU4oMBnJhPoGUieN00nHIn8tFMjWEoWZU+/KseTnMLiozFEtaT+2nJ3fY6XRarbg1fhlEogYskGIG/55lMz34JFljZbZpuVJ3Oh0Kk25jchyZLseTZLjA8i9Yk+VyliebZM0w7kV3Op36sdgwLvCaapAEmoE8M+ygUrlUBpV/7ymZZbQMHESyqQ3aruIOu8NOsnFk5XK5rM4RiqLKALeVy0pFY2Yyw/A8Qd/iTXs6dX1flJLJeEFla0azVkYYGWKuVAZ5pVK5h6VRlJahGJLHOdH+MRW7AsCCUK6RzWYT9rNcHtzc5OGpzGGx1Gw2gmhY05369lSKdU+wQOM4KSMGCOCT5mDMMLCrWZYtu9WpVJRiIlgnhcY91pRlhCTJ6OAmdalc3tzYkDMZBD+lZuTWtg3sEOBGPC40IQQkLBqXqYqiDFIpPRvWIpqA+biVy3FcV+yKrVYyDtKiJIGEO+Qytb9UlFRqDUUFCwsLnsnq4zHHFYeimP7WCOE57H8Eak/2MpXK1yvgfKo+YS1D7dw6V7UlURIALoD3ByhqCIyH8H6/B5iAyoVn4ASZDsdx1aIoSYV0uhCLCYWCFg1hHOD9DRjvdTwscxiW5YpOn+M2jiRJjRNcSCaPBIHAaFZJpPIQc0IPSyeN5fRXp9ivVh0wHrbSjRio8CCgtwisn1YSP/NKPrHnoqGy7XZxwnF2FVhRaIXGsVijp82z7/BeUfKpRAjTuNnuO51cbgOwKBVa6Vg31i1cP5YxDYESD2Ekfv78mYAw8AzPz/XXySQ37vcBdhutRrfbLVxdP86OPIJDFQd4X0kkEhxsWsxUbafj6OM+JE4sQhTiMHYBcC9uIfBlIp9I5OvKPlElcSyrqu5EeOXG/aIo/phAFFLs4uL6+uoh/gH5Hf5t/i6h5PPPdxyBY3NVlTrJqj3mxOEPvZNOx4AN6ceHz8jX/8Nk9H6kqh2hoFfHelFs63GAL856fPwbrgmazt/dPT8/391VSTKpqmpSENbV3Nhy23Yrnb64/gXD9QbWAN+loFWbo7g6GglCZ81x45zTdoC9OsPXYAz6i4RsJFLQTLU1GsUfhKSjc8VcrtjupL99e4evPp8vwq+kpsGrNdlWcjS6ehAKRb0PcNURgAUY2vVvv67YL19/h+NIso346OEBctQo6lxV13UneYZbn387Xcf/AXPCZCXbugm5AAAAAElFTkSuQmCC"

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABwZJREFUWEfNmXlsFFUcx7+/2aO03S1XIEAEQgAT6R+gHKLQCrQFCxSh3JQjQDmFcIngP8QLjEaOcAhWQBGUUzQaMASJJEQiCMpVBCwgpzFauruztNvtzjzzZmZ3Z6cz2y3H4vtnd+b3js/7vd/v937vDcFQxCW9MomhmBjLI1AbBriNddRnBoDMRQ8hJ0BkwE1GOMwIm93v/1SqHyQyYunITs52bRuvZAyzANhiWIxsSXsmicA2Xr9RsShz78UgB1eAFdjWTQ4ysJxYrXGycDX9//CckyMn0JHrt+4N5NAK8P0FWevA2By96vVKNFv8ZMsFovVpq4/NJXFBr0xBprMMsHH6sM6Men3Sz8QgyTbWmfxzs1YDmG80bD240bOME0uifA3552RdAJAZx90TElGDdFCzp8DK/wKr9CXU5gEqlZJ/dhbv3V3b2cIBxMrZNDkBjtyxcAyaAnI4wSQJoWPfILh/AyBJOiPTh0CjB0T8X5uDpVwk/6zs2NU3Or4x1Br4nWMWwJE9tJayQr8eRfXWtwGZQ+tKffo38XbyzzAAJ7pORHCOXQhH9hClhXTpNIL7N8HeIw+O3FHKOwV6yzuAFAJIADVpDlYdAPyeREepVY/EaS9FNUwAMV2kUB50Kg7LiZBSxGELVNjLZxBYtwSsplpp7xg2Hc78cRHo0G/H4BwyFUKzVgBjkH4/hcDWFWDiPfP+w5hm44vFKnDCns9hJyyCI2uwClt2HoE1rwPVVTEh0VkYhTZTp3yrDFXLZ4Jx7ddjfBKn9FE1HJmNxZbA5RCQMonDDlJhr11EYNVisKrKmPaU0RjOwmI4eg8ESF0h6eIpBL/eCrgbIXXOu4AgoHrXBtQc3qfOJ5HxGYHEyRpwXbkM1+zkxXD0zlcB/ryMwIevgVX61QF5e7sdjrxCOAsmglLTldfy37cR3LURoTPHI4EoZcJ8OPq+AlYponLpBDC/N+FcisRJGnAcN7A90wWOnGGwd8vW4BiCP+wH/Lp4SwLsPftBaNE60hPzlKPm2PdAqEaX2TFQegYc/YerNn7+JKTLZyFfuQDpyrk4FNpCiBP7Mu4I4aWLyRq5Aw0oREpRTJpRZ6cPVIExBD5bhdCPB6JbQnjVdXwkju/LH2OcLuyA/Dftg20QWka19kAwCTaS79zA/aWTIyz6rSvC5CviGtZ6VBxEi2vaf9dH+0EZjRIc8uGqMZ8H/tmFmj3r4paOj3xj+8XLc+Da9FVygWeqtm1VyDe6DuCSJANPrwt4VI4hl9AsWjMgV8k+UENzk6g5eghS2SWkFE0DpabF1QyP1dVflMDWqQscL/YxrauYRDEH5luqeXfkG2EANtRzbbYG9k8fBVZxD86RE5AyalJc4Oq92xHcsw3UvAVcG3aYA3s58Ij4JuEdnqNkC+FQoY8QvKVrizVw4JO1CB76FpSSirQVa2Fr2850MPn2Tdxf+ipYoArOAQVoMG2eNfDUEcbIqkaN8ML7huUq/62K+9O9liYh3/sXlQtnQPb5QBkNkTp3Mexdn492xRhCp0+gasNKMK8H5HIhfeXHEJo1twQWJ4+MkdU6tnmH5qphzeJA595mDcx7Dp0/g6rly8Cqq5RwxLUstO8IMBnSlcuQ795S3pPTidSlb8L+XHdL5fBJiZM0YP1S6/jIOyRPU7D52dj9eXxgPrp0rQyBdauU39ii9im0aYvUeYth6/B0fMfkwBPVXFottRMx8g4OA5tr2b19j6VJxIwuywidO4PQLycg372jgrZqCfuz3WDv2j269cdBVjQ8XgdssurkHaQDjtkUVcW7d+wBNUrSTseBiziwVXZOIG9+/1o+p18I95e7kwfs8UAcNzrurR15XtaAtYTN6H8ZO5ML7Bs72ly/Gh95+g+Im0u4d++CkCSTkLmGR4+Jv3F4ci2ANTNy700y8EgN2MKMyZPzcjifNNys8YkS3Pt2JlfDI/Qarp0Rk6cvB7YurpL1sHVoH3eZHpVQKrsK//T4pxvy9IkC6x0uPDd7r55IW/aGslM9zsKCQVS+9R5Cx3+2jBIKX0V2fuReIry7MC23I/BdmyA0awpbx/Ygm10xG6NcNZ7o7lRvuRSC9MdVsH/K6+yfPFn5vpjvGJHjiIU+n6xcpIpe+Y/kuvVxmouu71KqeCF/NYjmRw+ipvlL9MLN7DZTH4Ieq5ytofLuAzIFm+2s8uXo/1wIkhySOiv6qOgxaB0AJZ6okcJoqNHs4gnK1zc+eWCuAlzaqZOzVXq7gwAiBzzjUSneZYs+c9VPtXY2G2tZ9ZAfuXv/+sDMi9pnrwh0WruVAM1ijFmaR8LXshbmVZ/2RJAA2ni38toiDhsbPrUByjsXZAo2uZgxyoOANmAWn27NDih6yAeXi2C4ScQOy5KwuenZ72I+3f4HN9M2YVLaKT0AAAAASUVORK5CYII="

/***/ }),
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(6);

var _mintUi = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _enum = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-08 18:54:47
 * @Description:
 */

exports.default = {
  namespaced: true,
  state: {
    curLang: 'zh-CN',
    productList: [],
    order_id: ''
  },
  mutations: {
    setData: function setData(state, payload) {
      state[payload.key] = payload.value;
    }
  },
  actions: {
    changeLanguage: function changeLanguage(_ref, payload) {
      var commit = _ref.commit;

      commit('setData', {
        key: 'curLang',
        value: curLang
      });
    },
    getProduction: async function getProduction(_ref2, payload) {
      var commit = _ref2.commit;

      var res = await (0, _api.getProductionsAPI)('ceh5');
      if (res.status === 1000) {
        commit('setData', {
          key: 'productList',
          value: res.data
        });
      }
    },
    reportOrderPay: async function reportOrderPay(_ref3, payload) {
      var commit = _ref3.commit;
      var _payload$same = payload.same,
          price = _payload$same.price,
          unit = _payload$same.unit,
          product_id = _payload$same.product_id,
          google_goods_id = _payload$same.google_goods_id,
          product_key = _payload$same.product_key;

      var params = {
        pay_method: 'google_pay',
        product_key: product_key,
        platform: 'ANDROID',
        product_id: product_id,
        extra_ce_suan: _utils2.default.getExtraParams(product_key, payload.querystring),
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        }
      };

      var res = await (0, _api.payOrderAPI)(params);
      if (res.status === 1000) {
        _mintUi.Indicator.close();
        // this.order_id = res.data.id;
        commit('setData', {
          key: 'order_id',
          value: res.data.id
        });
      }
    }
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  setCurrentInfo: function setCurrentInfo(state, info) {
    if (!info.year || !info.month || !info.date) {
      console.error('update year error');
      return;
    }

    state.current_info.year = info.year;
    state.current_info.month = info.month;
    state.current_info.date = info.date;
    state.current_info.hour = info.hour;
    state.current_info.minute = info.minute;
  },
  setSdate: function setSdate(state, sdate) {
    state.sdate = sdate;
  },
  setEdate: function setEdate(state, edate) {
    state.edate = edate;
  },
  setUser: function setUser(state, user) {
    state.user = user;
  },
  setContentId: function setContentId(state, contentId) {
    state.contentId = contentId;
  },
  setDetail: function setDetail(state, detail) {
    state.detail = detail;
  },
  setAdvance: function setAdvance(state, show_advance) {
    state.show_advance = show_advance;
  },
  setYearUser: function setYearUser(state, year_user) {
    state.year_user = year_user;
  },
  setIsMiniprogram: function setIsMiniprogram(state, is_miniprogram) {
    state.is_miniprogram = is_miniprogram;
  },
  setProductions: function setProductions(state, productions) {
    state.productions = productions;
  }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-10-18 11:45:29
 * @LastEditors: wujiang
 * @LastEditTime: 2024-01-13 15:36:55
 * @Description:
 */
exports.default = {
  current_info: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes()
  },
  // 年运用户
  year_user: 37297520,
  // 時间选择器选择的开始、 结束時间 時间戳
  sdate: 0,
  edate: 0,
  user: {},
  contentId: '',
  detail: {
    title: '',
    sdate: '',
    edate: '',
    advance: 1
  },
  show_advance: false,
  is_miniprogram: false,
  productions: [] // 所有产品
};

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEqADAAQAAAABAAAADAAAAABFeZu2AAAA6ElEQVQoFZWQuw3CQBBEjxMkRISUQAgdQEAFJETktotxZDmGyAkVENCGSyAjR8hmHv6Ij5fPSHN33p19Op9zUpIk4ziOR5z/ETPMMtNL03Su/SBf5E0QBHvtX6W5lUI7eVCW5dJrmeqjLw/lrA7oaKvOZEowM5BnXstWzmUE8CPsAUIWMbv1YRiei6JY1AUaJqwLwiyMHpOIR/PeH3Wc3AvOXbWvmzezIFEUnci3ID4sGD2JN2l/h5s0EJpPIAoGjJYJofkGotgBo4zy15tUZQNEswNmQsh33ogGeoA56yZV8ocVGP4WvQH5/XhiKgAgCQAAAABJRU5ErkJggg=="

/***/ }),
/* 72 */,
/* 73 */
/***/ (function(module, exports) {

module.exports = {"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = {"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = {"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}

/***/ }),
/* 76 */,
/* 77 */
/***/ (function(module, exports) {

module.exports = {"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = {"_from":"elliptic@^6.5.4","_id":"elliptic@6.5.4","_inBundle":false,"_integrity":"sha1-2jfOvTHnmhNn6UG1ku0fvr1Yq7s=","_location":"/elliptic","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"elliptic@^6.5.4","name":"elliptic","escapedName":"elliptic","rawSpec":"^6.5.4","saveSpec":null,"fetchSpec":"^6.5.4"},"_requiredBy":["/browserify-sign","/create-ecdh"],"_resolved":"http://npm.etouch.cn/elliptic/-/elliptic-6.5.4.tgz","_shasum":"da37cebd31e79a1367e941b592ed1fbebd58abbb","_spec":"elliptic@^6.5.4","_where":"/Users/ls/demon/zhwnl/psychicai-overseas-h5/node_modules/browserify-sign","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"bundleDependencies":false,"dependencies":{"bn.js":"^4.11.9","brorand":"^1.1.0","hash.js":"^1.0.0","hmac-drbg":"^1.0.1","inherits":"^2.0.4","minimalistic-assert":"^1.0.1","minimalistic-crypto-utils":"^1.0.1"},"deprecated":false,"description":"EC cryptography","devDependencies":{"brfs":"^2.0.2","coveralls":"^3.1.0","eslint":"^7.6.0","grunt":"^1.2.1","grunt-browserify":"^5.3.0","grunt-cli":"^1.3.2","grunt-contrib-connect":"^3.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^5.0.0","grunt-mocha-istanbul":"^5.0.2","grunt-saucelabs":"^9.0.1","istanbul":"^0.4.5","mocha":"^8.0.1"},"files":["lib"],"homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","name":"elliptic","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"lint":"eslint lib test","lint:fix":"npm run lint -- --fix","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.5.4"}

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = {"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}

/***/ }),
/* 80 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 81 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 82 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 83 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 84 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 85 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 86 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 87 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 88 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 89 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 90 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 91 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 92 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 93 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 94 */,
/* 95 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEUAAACYmJiZmZmYmJiVlZWYmJiYmJifn5+ZmZmZmZmZmZmampqZmZmZmZmVlZWZmZkPlpMwAAAAD3RSTlMAV+eUKTZ3DLr14XlQHhjrSwrhAAAAmklEQVQY033QsQkCQRCF4REUM7EDK5CzBiswtwhNzO1ArMASrgWrMLYFEQ9B4d1j5r3kgptgd4cv+dkYzuzp1+nI43LVNm3XRGBZ6xZdxOKGV2GDP68VuRAbXhOQE98RZmOx0Vxo7oRmoTnRcwDO+XBQpbkWlWb8il3r8qpVuVHlxhAbzfM2MfnDv0os/lEbopgaj3to9rsYnx6722jxhhVjaAAAAABJRU5ErkJggg=="

/***/ }),
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,UklGRgwCAABXRUJQVlA4WAoAAAAQAAAAKQAAIwAAQUxQSEwBAAABkGtr27FHb2wnpTvb6uyktZOSnd2pM2aOwLZt27Y9cwXft77vfY8gIhi4baTIS8d8fYQwVXzWvd/vLJSUyrdAqQoBuwCol2fV9hVDA/tiTYk4DYYc/vI22Jj9yG9MEHNww8FIxi0wxfowTGrYtqw/e2m1XPmPScL/I//jV4VdRl+MWZeFaWo57BTC6R4SavidqqlnIUmMIiMPbtmsKYQ5cUKK2ADNayyf8cH2h5zAvxzXzI5BFnLEbghakwXdsqqhc40nbJLlC1NirTzmmizrv2zVOM9zWeIplzT28UMllTPKNnkiv0k1dOgOtFHhG+9S+BVlnpT+Mpt0X+Z7W5Vfu/N9GbX80f5B5yBRiPArCv7KCtih+9PPXFwtlyX/dEXpcQQmFCaSvZmUO6Uo5TRvrNVEcg7uizWdxjt1mygpFW+AUjWE9+K7Ay7GBFZQOCCaAAAAEAQAnQEqKgAkAD6JNpNHpSMhoTHKAKARCUAW9wawIfSsiBCvgw0mW8AA/vPOI5kPeT8adJzplSXVSILX7lEmMwbjp9iP+g+n/IIcDxvsjzVgCxbSR3v8hQBcApdeMluwAt6BKc1+Vvbfwue5FIw2cXEWTHBJpHyKq2aa/9/bUsgLWgNmsN//5i/WDaQF84uGT/krf/+7yw0AAA=="

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATFJREFUOE+Nk79Kw1AUxr8vpiAhwUUfwE1EJ+dWo6PPoOBSF0s7+CBCcRERfZEMdnHwz6JWnF1E3NIqJt4jN5DSmpubZLuB3++cc79zCQBHrfnln9H3+9kdxvpc5+s0/dX+IH6mhl238Qpg+JvITn8Qf1QInG4YnJM8gKhDtjfgeQvBDcB1EXlUqWxbJBNYgJhIN6mrdZr+kuMyIrlmkczAKdTuaRRfZ4IaEiOsuYnAIvnMZ9Zt55XzwjMCk4TAA8g9E1zowDSO/lcGlwoAOL0wuNSVM4HIi0qlZUqnMIKGp2eGyBvJlbJ0/gsKt+0kGNoinhaURmXbk1xQClftSSbohsGF3m3bbZsi/hKE1K9qruE8VcHGTpQcZx30Qr8NqtuTaHxf5ym3t4JFj9hPHFz9Aa5vAPUbeQf+AAAAAElFTkSuQmCC"

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAANRJREFUOE+lk0EOgjAQRefLUvBMwMqFXgSIwEkQJOpBjEvgSAbZ2jFAQNAGBLroojP/zZ9pC1q4sFBPswGuru0YLzEL4BqqRYQYQD4Z0IjL1pnZmgTwDdUShLieGzthWpxx0NdbgrKK0vw+NFCZuMyHZ24eRKxBsB1kxVUG6YoBto9JcWny8BkIMYjtIOlDPF21GThV1b7E1Vm5ubrqEBABfciYuAXIICxIGarcttDtueuEuXYns93V/FzjP7YHAWXQN7W9EMRh9ryN/ZVJD0kGWwx4A5lDa+Y+vMkGAAAAAElFTkSuQmCC"

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAD1BMVEVHcEyXl5eXl5eYmJiXl5d57kt9AAAABXRSTlMA/TuLx0Mu1CkAAADzSURBVDjLtVRBEoMgDET0AUZ4AI4fEKcPKNP//6mAQi0ke+hMc8NNNksMq1SN7RHIvg7Vh/Z0hnEdFKiEdT1kD6f0FlowQaXR1oAr0V4PI9Gi7qddCUd/T8w05pNnG9WhFvovxjP7KtQfhluhu9ifHTZdCgIxIzwl6EZkkepy+c5gY260cpSRNLEFw2LepnYziw2x4ci2U/n7QI7FEp8gJYvxVsCiRm8ELAJhEbDVQky4XrrgX7BfdaK7o5mhWaN/hP4t2gm0S3AH0e6inUdvRXhjs/g2fZlI/6anmo68AHkI9B7kWamB6HXII6G3Qk/mvPwNbtghQj8VSvgAAAAASUVORK5CYII="

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAJ1BMVEXwYEVHcEzvX0XwYEXwYEX/KSHxYUX////96+fzeGH3qpv6wrbybVRZEEOsAAAAB3RSTlP/ADag0QFke9c/TAAAAWBJREFUOMt9lL1OhEAUhY+AFNIIytZQaM0mPgCJsRci1mjiM4zxBTYmW+wDWNgZn4DGwlJ9Kof5Y5iBeyoyX87eO3fvHKRa+eVVjej6sTEn0B9tBanwwmX3NbSipzlrJ8RhabOsgq2wtFiBuYKJbeDqwbDKY2Gj2Bl8bRXrF1gsWYYllYIViywQrFpk4chaYOVHkd6tsBvO+hUWp8hr9/D3W068gVfuhL2ogvCG8sHYQY4Gp56NsXfxdYzCtykWoPdtz7KZGJVve1WTgbrCm2U7qLVR7Id9uTbOpAZZxLYZ8bO9YzPaie4WbcKwd2y6l2R0/M1tmvFmGNvNq0X67qPRqRaamQ2C2U3GZtaJa+OzvoVlnN3taPpvE/duW0xbPTgjKdGZXUrmNr5L1g5+ujuYnhO7mxE73xFvJafeGPU2qTdNZkFOZAiZPVRm5VTWURmZd5v1bCUzOW1SneUmzP8BfFJtII+N4mUAAAAASUVORK5CYII="

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAA6JJREFUSEudlltsFGUUx//nW4pNq0JqhETRBC8E0kikD3gJRmKM2gegtjtTENid+kC4WLqzQICERxMhys7WChge7OwKYme2FeGhSAiRQFR4KEZDMF4gQSUBYyNKm0LZ79CZnY3bZTs72+9pd75z/r9zm7NLCHBikXCjENTCwCICHnFcGLhKwBkpuTeZzvSXkyE/g5imPCtA+wA8X0boOwlelzTt7yeymxC0SVObGDgAoPZ/Z/4JjJ/d74Q5AM0tEB4iYNVu0zpcClYSFIsoLwhBJwFU58rEfZwVO5Kf9lwsFImtbp1HIfkugZq95yNS8ivJtP1tMeweUHtj431VMx9wBGe7xowtiZT1gV/p4lF1MwjvezaXR6/9N6+rv/9Woc89oHhU3QhCp9fwjw3TWleu0c69rqn7CFjrBdeRSFkf+oM05SxACwH8y0M827DtwUAgRamjWroM4EGAzyVM+7kJQTGtaTpx1SAREQOfG6a1Iggkb6Nr6iEClrNzaLQuaR7+J383rnS6pjwz1tgf3EuJbYm0tasSUDyiboXATm+A5hum/WNJkDdt33h1fieRsvZUBIqqG0D4yI1T8ouF0zcuo/Zo65NVxL/mIpK7DDOzrRKQroV3EsRWx2eU6amuVM9vJTNSFCX0WC1dB1AH5vOJlN1QCSgeVQZAtADA4O9DPMO27WxJkPMwHlUPgLDSzYrl60YqczwITI+GXyMSX3llP5hIWat8x9vZb8QYcCePcUXeHlnYeejINT9Yx4qlM8XU6nNEeDw3cWgo3nslV5CuqXsIWO+IE/iXO1KGO9O9uWksOh2RlvlThMgw6Olcb7HXMK0NxXYlQZq2uLoOM44BeDlXQmRJwALLLyBCuaUqs3NA4k2WUIkQ8oRPDeL6G6b59UggkGO0ZsmSmvsfqvkE4NYgPQKo5+bfw2/vP3p0uJS97++R46C3tS4Dy+0EGrdS8mIMPgsS7xndPV/6BVQWlHfW32p+AlVT1hNhk9s7xm45emev8VnfpSAZlwWtUZRptTVylitG4lUCJXNN5xhYnnA+Dw2LP/bb9o1JZ6RHlEdJ0AUA08pEfYMl1xtp+8+J7HwzikdaFkCEBoKUBjLbkEj3np8UyHEaWytLAar3BOrzWwOMgwCcbJ1CXhhbV0cmXbpix5gWbhYQve5rBNmSNDN9gbJ1X/wKjt4WXkYs3H85TLLJ6M74jnShdEWg9jbl4alMpx2B28QvdXXbfwWN8y66hU4qvWMzIQAAAABJRU5ErkJggg=="

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAA95JREFUSEutll9oHFUUxr/v7mariTTaWhdNwBSr0rxIwYIPWpNAH4piNHQm4p+dTVtLKJY4q1gEkfVJ1DK7qVahNG42qQnZTW0NKCoK6YugJcUHtYJJTRQFE7QmmpYmu/eYu9mUpO5uEuJ5mrlzzv3dOd85915iDXbwyaZqf5lvB0lVcJosAK0veCf6v+QaOIiE7WEAd5SaQ0QkC2xfI8gaBPjgcosl8NiaQNG6Ov+ft23cTKWUTymhyiih7x0I6hfD1wxaPFkUUFOO1QEybMYFmCCwyTz/byADmXTs4yRacnDBt1lKxAd+VhJ0wLJuCJRLo4/qYQ3cBZFbSEwJOAItX2R86HkrkZ7I/xEjYfs4gD3z7/LdpWymobwscCu0fFMU5Ibt1jnhogCCxUQWyCUARypR8eokpt8muHcBorKZhsPdp8Yje5rvKQhyLet6ViABsHkR4BdAzgG4KIIgwftA3LTwXSB/ENyYh3yfvXKlob134HfzXgxE17FSJHfnJ/laQx+Kd/YPLhG8rs4/WRPcTchrAGquAgXn9Yyvvr23Nwcx1vaUdbfPzx/mJZNdufJ2Q1YbFeO5QZGOyrGJ1ujgYKZY6lzL2sByngKxIy9+l5dMOdf6u4798lyKN0yvGznE58KP3kiUDZsUCOSTypr0Q9EodDHIwriJUxI4C2KL6X5R6t54os+kuaAxL/67EMzIbGZrrOeDC8tBFr5HHOsRkB/mNerwOtP7ioMc62OSu0AMeIlU40oheT+j7c8kqwH85nWmqoqCImH7p3lh6XqdfTmdVmNuuLmLkKdNjMrOBk1pF4o3zXYZwHXQ8rjXle5bDcT4Rhz7dRAvmmedZW28u+98YZBjT4C4WUT2xZLpjtWC3LB9lMCBXMVqqY51pX8tDGqxzkG4DYK4l0y5qwVFHPuMKXMBZitHx8uLtQUjjv0miBcAGVs/OrGlVP/8p09CVhXIMRI+EXweS6Z2Fi2GtnDTdh/8X+V2c8GzXjJ1dKV/FQnbJtW5zVRTPxNP9JvNtXAf5QQNW6cBNkJwWals/eHESQMuaa7T3EKKAZkFDv+zbqT22LGh2ZKg559oul0H/GdzB5VgGoJWryt1olBQ1LICUxV8ae4nXjEVbbRBVnbGutNnSq3s6lHeFrLuV+RHJNbPB8iQCN/XyAwp+i5CMwjKAyBDXNhQBRmB3h9L9ieWy8CSO8PBFqvWr9lPYutygRAZzyqG2hOpT5f1nT/Ol5q5cExtDu4Vkf0Q2UbyWp8RrXV3wD/jvfHewN8rgRifkrcgN2RViZI7FbCJ4F+zM3r0SM/JH1c6+WK/fwFbTn9Az25/EQAAAABJRU5ErkJggg=="

/***/ }),
/* 106 */,
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(144)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(132),
  /* template */
  __webpack_require__(178),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(195)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(217),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4f223990",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 113 */,
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(141)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(128),
  /* template */
  __webpack_require__(175),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-76c669bf",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tipsArr1 = {
  'zh-CN': '识别码已复制',
  'zh-TW': '識別碼已復製'
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var tipsArr2 = {
  'zh-CN': '1.打开命理寻真',
  'zh-TW': '1.打開命理尋真'
};
var tipsArr3 = {
  'zh-CN': '2.保存报告',
  'zh-TW': '2.保存報告'
};
var tipsArr4 = {
  'zh-CN': '3.“历史订单”中可重复查看',
  'zh-TW': '3.「歷史訂單」中可重復查看'
};
var tipsArr5 = {
  'zh-CN': '下载',
  'zh-TW': '下載'
};
var tipsArr6 = {
  'zh-CN': '命理寻真',
  'zh-TW': '命理尋真'
};
var language = _utils2.default.getLanguage();
exports.default = {
  name: 'CodePop',
  components: {},
  props: {
    close: {
      type: Function,
      default: function _default() {}
    },
    m_id: {
      type: String,
      default: '20003'
    },
    is_report: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      // Your data properties here
      show: true,
      tips1: tipsArr1[language],
      tips2: tipsArr2[language],
      tips3: tipsArr3[language],
      tips4: tipsArr4[language],
      tips5: tipsArr5[language],
      tips6: tipsArr6[language]
    };
  },

  computed: {},
  created: function created() {},
  mounted: function mounted() {
    var windowHeight = window.innerHeight;
    var dom = document.querySelector('.pop-modal');
    dom.style.height = windowHeight + 'px';
    dom.style.overflow = 'hidden';
  },

  methods: {
    /**
     * @description: 关闭弹窗
     * @return {*}
     */
    closeModal: function closeModal() {
      this.$emit('close');
    },

    /**
     * @description: 下载app
     * @return {*}
     */
    downloadApp: async function downloadApp() {
      _utils2.default.firebaseLogEvent(this.m_id, this.m_id === '20004' ? '-10003' : '-10004', this.m_id === '20004' ? 'click_history_download' : 'click_interpretation_download', 'click', {
        args_name: this.m_id === '20004' ? 'click_history_download' : 'click_interpretation_download'
      });
      await _utils2.default.asleep(200);
      _utils2.default.openApp();
    }
  }
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enum = __webpack_require__(2);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _vant = __webpack_require__(65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FixedOrder',
  components: {
    CountDown: _vant.CountDown
  },
  props: {
    show_pop: {
      type: Boolean,
      default: false
    },
    new_order_key: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '4.7rem'
    },
    name: {
      type: String,
      default: ''
    },
    last_order: {
      type: Object,
      default: function _default() {}
    },
    time: {
      type: Number,
      default: 0
    },
    payOrder: {
      type: Function,
      default: function _default() {}
    },
    jumpDetail: {
      type: Function,
      default: function _default() {}
    },
    is_show_move: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  filters: {
    filterTime: function filterTime(val_) {
      var val = val_.toString();
      if (val.length === 1) {
        return '0' + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    }
  },
  watch: {},
  data: function data() {
    return {
      new_time: 0,
      is_show_shandong: false,
      is_show_daoqi: false,
      second_: null
    };
  },

  computed: {},
  methods: {
    getTitle: function getTitle(val) {
      return val ? _utils2.default.getLanguage() === 'zh-CN' ? _enum.reportName[val].cn : _enum.reportName[val].tw : '';
    },
    getTime: function getTime(val) {
      var minutes = val.minutes,
          seconds = val.seconds,
          milliseconds = val.milliseconds;

      var time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      if (seconds !== this.second_) {
        if (this.name === 'api') {
          localStorage.setItem('mlxz_fixed_api_order_time', time_);
        } else {
          localStorage.setItem('mlxz_fixed_local_order_time', time_);
        }
      }
      this.second_ = seconds;

      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      this.new_time = time_;
      if (!minutes && !seconds && milliseconds < 10) {
        this.new_time = 0;
        if (this.$refs.countDown) {
          this.$refs.countDown.pause();
          this.$refs.countDown.reset();
        }
      }
    },
    orderReport: async function orderReport() {
      if (this.name === 'api') {
        this.$emit('payOrder');
        this.$refs.countDown.pause();
        await _utils2.default.asleep(3000);
        this.new_time = 15 * 60 * 1000;
        this.$refs.countDown.reset();
      } else {
        this.$emit('jumpDetail');
      }
    }
  },
  mounted: function mounted() {
    this.new_time = this.time;
    // setInterval(() => {
    //   if (this.name === 'local') {
    //     this.new_time = +localStorage.getItem('mlxz_fixed_local_order_time');
    //     this.$refs.countDown.reset();
    //   }
    // }, 500);
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductions = undefined;

var _api = __webpack_require__(6);

var getProductions = exports.getProductions = async function getProductions() {
  var res = await (0, _api.getProductionsAPI)('ceh5');
  if (res.status === 1000) {
    return res.data;
  }
}; /*
    * @Author: wujiang@weli.cn
    * @Date: 2023-11-01 10:59:17
    * @LastEditors: wujiang
    * @LastEditTime: 2023-11-10 18:44:09
    * @Description:
    */

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*Edit by LJG
 * 该类只存日历上農曆计算相关的数据和方法
 */
//日期资料
var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, // 1900-1902
0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1903-1909
0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, // 1910-1916
0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, // 1917-1923
0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, // 1924-1930
0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, // 1931-1937
0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, // 1938-1944
0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, // 1945-1951
0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, // 1952-1958
0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, // 1959-1965
0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, // 1966-1972
0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1973-1979
0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, // 1980-1986
0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, // 1987-1993
0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, // 1994-2000
0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, // 2001-2007
0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, // 2008-2014
0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, // 2015-2021
0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, // 2022-2028
0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, // 2029-2035
0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, // 2036-2042
0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2043-2049
0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, // 2050-2057
0x1a6c4, 0x0aae0, 0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, // 2058-2065
0x05d55, 0x056a0, 0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, // 2066-2073
0x0b6a0, 0x0ad50, 0x55a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, // 2074-2080
0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e0, 0x0d160, 0x0e958, // 2081-2090
0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252, 0x0d520, 0x0db27); // 2091-2101
var jieqi = new Array(0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160716, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x07160615, 0x07160716, 0x08180918, 0x09180918, 0x08170817, 0x07150514, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x07160615, 0x07160716, 0x08180918, 0x09180918, 0x08170817, 0x07150514, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x07160615, 0x06160716, 0x08180918, 0x09180918, 0x08170817, 0x07150514, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150515, 0x06160616, 0x08170818, 0x08170918, 0x08170816, 0x06150413, 0x06150515, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x06160615, 0x06160716, 0x08180818, 0x09180918, 0x08170817, 0x06150514, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150515, 0x06150616, 0x08170818, 0x08170918, 0x08170816, 0x06150413, 0x06150515, 0x06160616, 0x08180818, 0x08180918, 0x08170816, 0x06150514, 0x06160615, 0x06160716, 0x08180818, 0x09180918, 0x08170817, 0x06150514, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x08170818, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08180818, 0x08180918, 0x08170816, 0x06150514, 0x06150615, 0x06160716, 0x08180818, 0x09180918, 0x08170817, 0x06150514, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x08170818, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160716, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160716, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x06150615, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x06150514, 0x05150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150515, 0x06160616, 0x08170818, 0x08170918, 0x08170816, 0x06150413, 0x06150515, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x05150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x05140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x08170818, 0x08170918, 0x08170816, 0x06150413, 0x06150515, 0x06160616, 0x08180818, 0x08180918, 0x08170817, 0x06150514, 0x05150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x05140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x08170818, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150514, 0x05140514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x05140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x05140514, 0x05150615, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x05140514, 0x05150615, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08180918, 0x08170816, 0x06150513, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x06150515, 0x06160616, 0x08170818, 0x08170918, 0x08170816, 0x06150513, 0x05140414, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08170716, 0x06150413, 0x06150515, 0x06150616, 0x08170818, 0x08170918, 0x08170816, 0x06150513, 0x05140414, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x08170818, 0x08170918, 0x08170816, 0x06150413, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x05150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x05140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x07170818, 0x08170918, 0x08170716, 0x06150413, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140413, 0x05140514, 0x05150615, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150615, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170918, 0x08170716, 0x06150413, 0x05140414, 0x05150515, 0x07160717, 0x07160817, 0x07160715, 0x05140412, 0x05140414, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08170716, 0x06150413, 0x05140414, 0x05140515, 0x07160717, 0x07160817, 0x07160715, 0x05140412, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x06150514, 0x06150616, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x05140413, 0x05140515, 0x07160717, 0x07160817, 0x07160715, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x05150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140413, 0x05140514, 0x05150615, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170818, 0x08160716, 0x06140413, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x06150615, 0x07170817, 0x08170817, 0x07160716, 0x06140413, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07160817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x05140413, 0x05140515, 0x06160716, 0x07160717, 0x07160615, 0x05140312, 0x05140414, 0x05140515, 0x07160717, 0x07160817, 0x07160715, 0x05140412, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x05140413, 0x05140515, 0x06160716, 0x07160717, 0x07160615, 0x05140312, 0x05140413, 0x05140515, 0x07160717, 0x07160817, 0x07160715, 0x05140412, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x06150514, 0x05150615, 0x07170717, 0x08170817, 0x07160716, 0x06140413, 0x05140413, 0x05140514, 0x06160716, 0x07160717, 0x07150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160715, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x05150514, 0x05150615, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x05140514, 0x06160716, 0x07160717, 0x07150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160715, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x05140514, 0x06160716, 0x07160717, 0x07150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x05140514, 0x06160716, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x05140514, 0x06160716, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x04140514, 0x06160616, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05140515, 0x07160717, 0x07160817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x04140514, 0x06160616, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160717, 0x07160615, 0x05140312, 0x05140414, 0x05140515, 0x07160717, 0x07160817, 0x07160715, 0x05140412, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x04140514, 0x06160616, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160717, 0x07160615, 0x05140312, 0x05140413, 0x05140515, 0x06160717, 0x07160817, 0x07160715, 0x05140412, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x05140413, 0x04140514, 0x06160616, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140514, 0x06160716, 0x07160717, 0x07150615, 0x05140312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160715, 0x05140412, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x04140413, 0x04140514, 0x06160616, 0x06160716, 0x06150615, 0x05130312, 0x05140413, 0x05140514, 0x06160716, 0x07160717, 0x07150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160715, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160716, 0x05140413, 0x04130413, 0x04140414, 0x06160616, 0x06160716, 0x06150615, 0x04130312, 0x05140413, 0x05140514, 0x06160716, 0x07160717, 0x07150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140413, 0x04130413, 0x04140414, 0x06160616, 0x06160716, 0x06150615, 0x04130312, 0x05140413, 0x05140514, 0x06160716, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x04130413, 0x04140414, 0x06160616, 0x06160716, 0x06150615, 0x04130312, 0x05140413, 0x04140514, 0x06160616, 0x07160716, 0x06150615, 0x05130312, 0x05140413, 0x05140515, 0x06160716, 0x07160817, 0x07160615, 0x05140312, 0x05140414, 0x05150515, 0x07160717, 0x07170817, 0x07160715, 0x05140412, 0x05140514, 0x05150515, 0x07170717, 0x07170817, 0x07160716);

var Gan = new Array('甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸');
var Zhi = Array('子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥');
var Animals = new Array('鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪');
var arrayJieqi = new Array('小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至');
var arrayNDate = new Array('初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十');
var arrayNMonth = new Array('正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月');
var weekDays = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');

// 公曆节日 *表示放假日
function getGongliOneDayFestival(year, month, date) {
  var result;
  switch (month) {
    case 1:
      switch (date) {
        case 1:
          result = '元旦';
          break;
      }
      break;
    case 2:
      switch (date) {
        case 10:
          result = '气象节';
          break;
        case 14:
          result = '情人节';
          break;
      }
      break;
    case 3:
      switch (date) {
        case 3:
          result = '爱耳日';
          break;
        case 8:
          result = '妇女节';
          break;
        case 12:
          result = '植树节';
          break;
        case 14:
          result = '国际警察日';
          break;
        case 15:
          result = '消费者权益日';
          break;
        case 23:
          result = '世界气象日';
          break;
      }
      break;
    case 4:
      switch (date) {
        case 1:
          result = '愚人节';
          break;
        case 22:
          result = '地球日';
          break;
      }
      break;
    case 5:
      switch (date) {
        case 1:
          result = '劳动节';
          break;
        case 4:
          result = '青年节';
          break;
        case 12:
          result = '护士节';
          break;
        case 15:
          result = '国际家庭日';
          break;
        case 19:
          result = '中国旅游日';
          break;
        case 31:
          result = '无烟日';
          break;
      }
      break;
    case 6:
      switch (date) {
        case 1:
          result = '儿童节';
          break;
        case 5:
          result = '世界环境日';
          break;
        case 26:
          result = '国际反毒品日';
          break;
      }
      break;
    case 7:
      switch (date) {
        case 1:
          result = '建党节';
          break;
        case 7:
          result = '七七事变';
          break;
        case 11:
          result = '中国航海日';
          break;
      }
      break;
    case 8:
      switch (date) {
        case 1:
          result = '建军节';
          break;
        case 15:
          result = '日本投降日';
          break;
      }
      break;
    case 9:
      switch (date) {
        case 3:
          result = '抗战胜利日';
          break;
        case 10:
          result = '教师节';
          break;
        case 18:
          result = '九·一八事变纪念日';
          break;
        case 20:
          result = '爱牙日';
          break;
        case 30:
          result = '中国烈士纪念日';
          break;
      }
      break;
    case 10:
      switch (date) {
        case 1:
          result = '国庆节';
          break;
        case 8:
          result = '记者节';
          break;
        case 16:
          result = '世界粮食日';
          break;
        case 31:
          result = '万圣节';
          break;
      }
      break;
    case 11:
      switch (date) {
        case 11:
          result = '光棍节';
          break;
        case 17:
          result = '国际大学生节';
          break;
      }
      break;
    case 12:
      switch (date) {
        case 1:
          result = '艾滋病日';
          break;
        case 10:
          result = '世界人权日';
          break;
        case 13:
          result = '南京大屠杀纪念日';
          break;
        case 20:
          result = '澳门回归纪念日';
          break;
        case 24:
          result = '平安夜';
          break;
        case 25:
          result = '圣诞节';
          break;
      }
      break;
  }
  return result;
}
// 農曆节日
function getNongliOneDayFestival(year, month, date) {
  var result;
  switch (month) {
    case 1:
      switch (date) {
        case 1:
          result = '春节';
          break;
        case 15:
          result = '元宵节';
          break;
      }
      break;
    case 2:
      switch (date) {
        case 2:
          result = '龙抬头';
          break;
      }
      break;
    case 5:
      switch (date) {
        case 5:
          result = '端午节';
          break;
      }
      break;
    case 7:
      switch (date) {
        case 7:
          result = '七夕';
          break;
        case 15:
          result = '中元节';
          break;
      }
      break;
    case 8:
      switch (date) {
        case 15:
          result = '中秋节';
          break;
      }
      break;
    case 9:
      switch (date) {
        case 9:
          result = '重阳节';
          break;
      }
      break;
    case 12:
      switch (date) {
        case 8:
          result = '腊八节';
          break;
        case 23:
          result = '北方小年';
          break;
        case 24:
          result = '南方小年';
          break;
        case 29:
          if (monthDays(year, month) == 29) {
            result = '除夕';
          }
          break;
        case 30:
          result = '除夕';
          break;
      }
      break;
  }
  return result;
}
/*处理放假调休信息,-1默认值,0放假,1调休;传入数据为一个月的日历数据,从1号开始*/
function dealMonthDataJiaBan(monthData) {
  if (!monthData || monthData.length < 1) {
    return;
  }
  var year = monthData[0].year,
      month = monthData[0].month;

  if (year == 2016) {
    switch (month) {
      case 1:
        //1月1日~1月3日
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        break;
      case 2:
        //2月7日(除夕）~2月13日	2月6日（周六）、2月14日（周日）上班
        monthData[5].jiaBan = 1;
        monthData[6].jiaBan = 0;
        monthData[7].jiaBan = 0;
        monthData[8].jiaBan = 0;
        monthData[9].jiaBan = 0;
        monthData[10].jiaBan = 0;
        monthData[11].jiaBan = 0;
        monthData[12].jiaBan = 0;
        monthData[13].jiaBan = 1;
        break;
      case 4:
        //4月2日~4月4日,4月30
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 5:
        //	4月30日~5月2日
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        break;
      case 6:
        //6月9日~6月11日 6月12日（周日）上班
        monthData[8].jiaBan = 0;
        monthData[9].jiaBan = 0;
        monthData[10].jiaBan = 0;
        monthData[11].jiaBan = 1;
        break;
      case 9:
        //9月15日~9月17日	9月18（周日）上班
        monthData[14].jiaBan = 0;
        monthData[15].jiaBan = 0;
        monthData[16].jiaBan = 0;
        monthData[17].jiaBan = 1;
        break;
      case 10:
        //10月1日~10月7日	10月8日（周六）、10月9日（周日）上班
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[4].jiaBan = 0;
        monthData[5].jiaBan = 0;
        monthData[6].jiaBan = 0;
        monthData[7].jiaBan = 1;
        monthData[8].jiaBan = 1;
        break;
      case 12:
        monthData[30].jiaBan = 0;
        break;
    }
  } else if (year == 2017) {
    switch (month) {
      case 1:
        //1月1日~1月3日//1月27日(除夕）~2月2日	2月3日、2月4日上班
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[21].jiaBan = 1;
        monthData[26].jiaBan = 0;
        monthData[27].jiaBan = 0;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        monthData[30].jiaBan = 0;
        break;
      case 2:
        //1月27日(除夕）~2月2日	2月3日、2月4日上班
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 1;
        monthData[3].jiaBan = 1;
        break;
      case 4:
        //4月3日~4月5日
        monthData[0].jiaBan = 1;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 5:
        //	5月1日~5月3日，5月28日~5月30日(端午节)
        monthData[0].jiaBan = 0;
        monthData[26].jiaBan = 1;
        monthData[27].jiaBan = 0;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 9:
        monthData[29].jiaBan = 1;
        break;
      case 10:
        //10月1日~10月7日	10月8日（周日）上班
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[4].jiaBan = 0;
        monthData[5].jiaBan = 0;
        monthData[6].jiaBan = 0;
        monthData[7].jiaBan = 0;
        break;
      case 12:
        //12月30，31 放18年元旦假
        monthData[29].jiaBan = 0;
        monthData[30].jiaBan = 0;
        break;
    }
  } else if (year == 2018) {
    switch (month) {
      case 1:
        // 12月30日 - 1月1日 元旦
        monthData[0].jiaBan = 0;
        break;
      case 2:
        // 2月15日-2月21日 过年	2月11日、2月24日上班
        monthData[10].jiaBan = 1;
        monthData[14].jiaBan = 0;
        monthData[15].jiaBan = 0;
        monthData[16].jiaBan = 0;
        monthData[17].jiaBan = 0;
        monthData[18].jiaBan = 0;
        monthData[19].jiaBan = 0;
        monthData[20].jiaBan = 0;
        monthData[23].jiaBan = 1;
        break;
      case 4:
        //4月5日~4月7日 清明 4月8日加班  4月29日-5月1日国庆 4月28日加班
        monthData[4].jiaBan = 0;
        monthData[5].jiaBan = 0;
        monthData[6].jiaBan = 0;
        monthData[7].jiaBan = 1;
        monthData[27].jiaBan = 1;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 5:
        //	4月29日-5月1日国庆 4月28日加班
        monthData[0].jiaBan = 0;
        break;
      case 6:
        //	6月16-6月18日 端午节
        monthData[15].jiaBan = 0;
        monthData[16].jiaBan = 0;
        monthData[17].jiaBan = 0;
        break;
      case 9:
        // 9月22日-9月24日  中秋  9月29日、 9月30日加国庆班
        monthData[21].jiaBan = 0;
        monthData[22].jiaBan = 0;
        monthData[23].jiaBan = 0;
        monthData[28].jiaBan = 1;
        monthData[29].jiaBan = 1;
        break;
      case 10:
        //10月1日~10月7日
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[4].jiaBan = 0;
        monthData[5].jiaBan = 0;
        monthData[6].jiaBan = 0;
        break;
    }
  }
}

function getGongliFestivalInfoByYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();

  if (year === 2018) {
    return [{
      title: '元旦',
      date: '2018-1-1',
      time: '假期：12月30日~1月1日',
      off: '调休：无'
    }, {
      title: '春节',
      date: '2018-2-16',
      time: '假期：2月15日~2月21日',
      off: '调休：2月11日（星期日）上班、2月24日（星期六）上班'
    }, {
      title: '清明节',
      date: '2018-4-5',
      time: '假期：4月5日~4月7日',
      off: '调休：4月8日（星期六）上班'
    }, {
      title: '劳动节',
      date: '2018-5-1',
      time: '假期：4月29日~5月1日',
      off: '调休：4月28日（星期六）上班'
    }, {
      title: '端午节',
      date: '2018-6-18',
      time: '假期：6月16日~6月18日',
      off: '调休：无'
    }, {
      title: '中秋节',
      date: '2018-9-24',
      time: '假期：9月22日~9月24日',
      off: '调休：无'
    }, {
      title: '国庆节',
      date: '2018-10-1',
      time: '假期：10月1日~10月7日',
      off: '调休：9月29日（星期六）上班、9月30日（星期日）上班'
    }];
  }

  return [];
}

function getJieqiInfo(year) {
  var res = [];

  //一年中一共有24个节气
  var sum = 24;
  for (var i = 0; i < sum; i++) {
    var date = getJieqi(year, i);

    res.push({
      title: arrayJieqi[i],
      date: year + '-' + (parseInt(i / 2) + 1) + '-' + date,
      time: year + '年' + (parseInt(i / 2) + 1) + '月' + date + '日'
    });
  }

  return res;
}

function getHotFestival() {
  var sum = 0,
      today = new Date().getTime();

  var res = [];
  var item = void 0,
      day = void 0,
      title = void 0;
  var nowYear = void 0,
      nowMonth = void 0,
      nowDate = void 0;
  while (sum < 365) {
    day = new Date(today);
    nowYear = day.getFullYear();
    nowMonth = day.getMonth() + 1;
    nowDate = day.getDate();
    title = getGongliOneDayFestival(nowYear, nowMonth, nowDate);
    if (title) {
      item = {
        title: title,
        date: nowYear + '-' + nowMonth + '-' + nowDate,
        time: nowYear + '年' + nowMonth + '月' + nowDate + '日'
      };
      res.push(item);
    }

    sum++;
    today += 1000 * 60 * 60 * 24;
  }

  return res;
}

/*******************************************************************************
 * 日期计算
 ******************************************************************************/

// ====================================== 返回農曆 y年的总天数
function lYearDays(y) {
  var i,
      sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) {
    sum += lunarInfo[y - 1900] & i ? 1 : 0;
  }return sum + leapDays(y);
}

// ====================================== 返回農曆 y年闰月的天数
function leapDays(y) {
  if (leapMonth(y)) return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;else return 0;
}

// ====================================== 返回農曆 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
  var lm = lunarInfo[y - 1900] & 0xf;
  return lm == 0xf ? 0 : lm;
}

// ====================================== 返回農曆 y年m月的总天数
function monthDays(y, m) {
  return lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
}
// ====================================== 返回公曆y年m月的总天数
function getGongliOneMonthDays(year, month) {
  if (month == 2) {
    if (isGongliYearIsLeapYear(year)) {
      return 29;
    } else {
      return 28;
    }
  } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    return 31;
  } else {
    return 30;
  }
}
/** 传回農曆y年的生肖 */
function AnimalsYear(y) {
  return Animals[(y - 4) % 12];
}
/** 传入 年、月、日、時的offset，传回干支字符串,0=甲子 */
function cyclicalm(gzNum) {
  return Gan[gzNum % 10] + Zhi[gzNum % 12];
}
/** 传入年份y、第n个节气,传回y年第n个节气的日期，小寒为第一个节气，n从0开始 */
function getJieqi(year, n) {
  var date = 1;
  var position = (year - 1900) * 6 + parseInt(n / 4);
  var position2 = n % 4;
  switch (position2) {
    case 0:
      date = (jieqi[position] & 0xff000000) >> 24;
      break;
    case 1:
      date = (jieqi[position] & 0x00ff0000) >> 16;
      break;
    case 2:
      date = (jieqi[position] & 0x0000ff00) >> 8;
      break;
    case 3:
      date = (jieqi[position] & 0x000000ff) >> 0;
      break;
  }
  return date;
}
/** 传入公曆年份，返回该年是否是闰年 */
function isGongliYearIsLeapYear(year) {
  /** 能被4整除且不能被100整除 或者 能被400整除的就是闰年 */
  if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
    return true;
  } else {
    return false;
  }
}
/**
 * 返回公曆一年的天数
 *
 * @author LJG
 */
function getGongliOneYearDays(year) {
  if (isGongliYearIsLeapYear(year)) {
    return 366;
  } else {
    return 365;
  }
}

function calGongliToNongli(y, m, d) {
  var maxYear = 2100;
  var nongDate = [0, 0, 0, 0, 0, 0, 0];
  var i = 0,
      temp = 0,
      leap = 0;
  var offset = 0;
  /** 为了优化计算速度，2000(含2000年)年以前用1900年1月31日作为起始点计算，2000以后使用2000年2月5日作为起始点计算 */
  if (y <= 2000) {
    nongDate[4] = 13;
    /** 1900年1月31距y年m月d日的天数 */
    offset = 0;
    /** 1900年剩余月份的总天数 */
    offset += getGongliOneYearDays(1900) - 31;
    nongDate[4] += 11; // 1900年1月31時立春未过故加11
    for (i = 1901; i < y; i++) {
      offset += getGongliOneYearDays(i);
      nongDate[4] += 12;
    }
    for (i = 1; i < m; i++) {
      offset += getGongliOneMonthDays(y, i);
      nongDate[4]++;
    }
    offset += d;
    if (d >= getJieqi(y, (m - 1) * 2)) {
      nongDate[4]++;
    }
    nongDate[5] = offset + 40;
    for (i = 1900; i < maxYear; i++) {
      temp = lYearDays(i);
      if (offset >= temp) {
        offset -= temp;
      } else {
        break;
      }
    } // end for
  } else {
    nongDate[4] = 14;
    /** 2000年2月5日距y年m月d日的天数 */
    offset = 0;
    /** 2000年剩余月份的总天数 */
    offset += getGongliOneYearDays(2000) - 36;
    nongDate[4] += 10; // 2000年2月5時立春已过故加10
    for (i = 2001; i < y; i++) {
      offset += getGongliOneYearDays(i);
      nongDate[4] += 12;
    }
    for (i = 1; i < m; i++) {
      offset += getGongliOneMonthDays(y, i);
      nongDate[4]++;
    }
    offset += d;
    if (d >= getJieqi(y, (m - 1) * 2)) {
      nongDate[4]++;
    }
    nongDate[5] = offset + 29;
    for (i = 2000; i < maxYear; i++) {
      temp = lYearDays(i);
      if (offset >= temp) {
        offset -= temp;
      } else {
        break;
      }
    } // end for
  }
  /** 计算年份干支 */
  /**年干支以立春划分开始(1864年为甲子年)*/
  nongDate[3] = y - 1864 - 1;
  var isHasLiChu = false;
  if (m > 2 || m == 2 && d > 12) {
    isHasLiChu = true;
  } else if (m == 2) {
    if (d >= getJieqi(y, (m - 1) * 2)) {
      //立春已过
      isHasLiChu = true;
    }
  }
  if (isHasLiChu) {
    //立春已过则
    nongDate[3]++;
  }
  /**年干支以立春划分结束*/
  /** 農曆年得出 */
  nongDate[0] = i;
  leap = leapMonth(i); // 闰哪个月
  nongDate[6] = 0;
  /** 标示是否已经经过闰月 */
  var isPassLeaoMonth = false;
  for (i = 1; i < 13; i++) {
    if (leap > 0 && i == leap + 1 && !isPassLeaoMonth) {
      temp = leapDays(nongDate[0]);
      if (offset >= temp) {
        offset -= temp;
        i--;
        isPassLeaoMonth = true;
      } else {
        nongDate[6] = 1;
        i--;
        break;
      }
    } else {
      temp = monthDays(nongDate[0], i);
      if (offset >= temp) {
        offset -= temp;
      } else {
        break;
      }
    }
  } // end for
  /** 農曆月得出 */
  nongDate[1] = i;
  /** 農曆日得出 */
  nongDate[2] = offset + 1;
  return nongDate;
}

/**
 * 传入公曆年月,返回该年该月的農曆信息ArrayList<long[]>,详见calGongliToNongli方法
 *
 * @author LJG
 */
function calNongliByMonth(year, month) {
  var list = new Array();
  /** 该月的第一个节气日期 */
  var thisMonthFirstJieqiDate = getJieqi(year, (month - 1) * 2);
  /** 農曆月份的总天数 */
  var thisNongliMonthDays = 0;
  var day = calGongliToNongli(year, month, 1);
  if (day[6] == 1) {
    // 是闰月
    thisNongliMonthDays = leapDays(day[0]);
  } else {
    thisNongliMonthDays = monthDays(day[0], day[1]);
  }
  list.push(day);
  var mDays = getGongliOneMonthDays(year, month);
  var i = 2;
  while (i < mDays + 1) {
    var today = [0, 0, 0, 0, 0, 0, 0];
    /** 在農曆本月份内，并且不是本月第一个节气的后一天，则无需重新计算農曆，日加1即可 */
    if (day[2] < thisNongliMonthDays && i != thisMonthFirstJieqiDate) {
      today[0] = day[0]; // 年
      today[1] = day[1]; // 月
      today[2] = day[2] + 1; // 日
      today[3] = day[3]; // 年 天干地支
      today[4] = day[4]; // 月天干地支
      today[5] = day[5] + 1; // 日天干地支
      today[6] = day[6]; // 是否闰月
    } else {
      today = calGongliToNongli(year, month, i);
      if (day[6] == 1) {
        // 是闰月
        thisNongliMonthDays = leapDays(day[0]);
      } else {
        thisNongliMonthDays = monthDays(day[0], day[1]);
      }
    }
    day = today;
    list.push(day);
    i++;
  } // end while
  return list;
}

/** 获取一个月的公曆、農曆、节日、节气等信息显示信息 */
function getOneMonthData(year, month) {
  var resultList = new Array();
  var date = new Date(year, month - 1, 1);
  var week = date.getDay();
  /** 该月的第一个节气日期 */
  var JieqiDate1 = getJieqi(year, (month - 1) * 2);
  var JieqiDate2 = getJieqi(year, (month - 1) * 2 + 1);
  var nongliData = calNongliByMonth(year, month);
  var length = nongliData.length;
  for (var i = 0; i < length; i++) {
    var temp = nongliData[i];
    var oneDay = new Object();
    oneDay.year = year; //公曆年份
    oneDay.month = month; //公曆月份
    oneDay.date = i + 1; //公曆日期
    oneDay.nyear = temp[0]; //農曆年份，int数字
    oneDay.nmonth = temp[1]; //農曆月份,int数字
    oneDay.ndate = temp[2]; //農曆日期，int数字
    oneDay.isleapMonth = temp[6]; //是否是農曆闰月，0不是，1是
    oneDay.week = (week + i) % 7; // 星期，0-6表示 日-六
    oneDay.nmonthstr = arrayNMonth[oneDay.nmonth - 1]; //農曆月份字符串
    oneDay.ndatestr = arrayNDate[oneDay.ndate - 1]; //農曆日期字符串
    oneDay.nyearcyl = cyclicalm(temp[3]); //農曆年干支
    oneDay.nmonthcyl = cyclicalm(temp[4]); //農曆月干支
    oneDay.ndatecyl = cyclicalm(temp[5]); //農曆日干支
    oneDay.nyearcyl_int = temp[3]; //農曆年干支 int数字
    oneDay.nmonthcyl_int = temp[4]; //農曆月干支 int数字
    oneDay.ndatecyl_int = temp[5]; //農曆日干支 int数字
    /**节日*/
    oneDay.festival = getGongliOneDayFestival(oneDay.year, oneDay.month, oneDay.date); // 当天节日
    if (!oneDay.festival) {
      oneDay.festival = getNongliOneDayFestival(oneDay.nyear, oneDay.nmonth, oneDay.ndate);
    }
    if (i + 1 == JieqiDate1) {
      oneDay.jieqi = arrayJieqi[(month - 1) * 2]; //当天节气信息
    } else if (i + 1 == JieqiDate2) {
      oneDay.jieqi = arrayJieqi[(month - 1) * 2 + 1];
    }
    oneDay.jiaBan = -1; //当天放假调休信息，-1默认值，0放假，1上班
    resultList.push(oneDay);
  } // end for
  if (month == 5) {
    //5月第二个周日母亲节
    var positon = 0;
    if (week == 0) {
      positon = 8 - 1;
    } else {
      positon = 7 - week + 8 - 1;
    }
    resultList[positon].festival = '母亲节';
  } else if (month == 6) {
    //6月第三个首日父亲节
    var positon_ = 0;
    if (week == 0) {
      positon_ = 15 - 1;
    } else {
      positon_ = 7 - week + 15 - 1;
    }
    resultList[positon_].festival = '父亲节';
  }

  dealMonthDataJiaBan(resultList); //统一处理该月的放假调休信息
  return resultList;
}

function getOneMonthShowData(year, month) {
  var resultList = new Array();
  var date = new Date(year, month - 1, 1);
  var week = date.getDay();
  if (week != 0) {
    // 本月第一天不是周日则需要取前一月的数据
    var preYear = year,
        preMonth = month - 1;
    if (preMonth < 1) {
      preYear--;
      preMonth = 12;
    }
    var nongliData = getOneMonthData(preYear, preMonth);
    var length = nongliData.length;
    for (var i = length - week; i < length; i++) {
      resultList.push(nongliData[i]);
    }
  }
  var nongliData_ = getOneMonthData(year, month);
  var length_ = nongliData_.length;
  for (var i = 0; i < length_; i++) {
    resultList.push(nongliData_[i]);
  }
  date = new Date(year, month - 1, getGongliOneMonthDays(year, month));
  week = date.getDay();
  if (week != 6) {
    // 本月最后一天不是周六则需要取后一月的数据
    var nextYear = year,
        nextMonth = month + 1;
    if (nextMonth > 12) {
      nextYear++;
      nextMonth = 1;
    }
    var nongliData_w = getOneMonthData(nextYear, nextMonth);
    var length_w = 6 - week;
    for (var i = 0; i < length_w; i++) {
      resultList.push(nongliData_w[i]);
    }
  }
  return resultList;
}

exports.default = {
  //获取一个月的日历数据(周日为第一天，当月前后月已自动补齐)
  /**
     * function getOneMonthShowData(year, month);
        返回值说明：
        返回值为Array数组，数组中每一个对象的属性有：
        oneDay.year      //公曆年份 int值
        oneDay.month     //公曆月份 int值
        oneDay.date      //公曆日期 int值
        oneDay.nyear     //農曆年份，int值
        oneDay.nmonth    //農曆月份,int值
        oneDay.ndate     //農曆日期，int数字
        oneDay.isleapMonth //是否是農曆闰月，0不是，1是
        oneDay.week      // 星期，0-6表示 日-六
        oneDay.nmonthstr //農曆月份字符串
        oneDay.ndatestr  //農曆日期字符串
        oneDay.nyearcyl  //農曆年干支字符串
        oneDay.nmonthcyl //農曆月干支字符串
        oneDay.ndatecyl  //農曆日干支字符串
        oneDay.festival  //当天节日字符串
        oneDay.jieqi     //当天的节气字符串
        oneDay.jiaBan    //当天放假调休信息，-1默认值，0放假，1上班
     */
  getOneMonthShowData: getOneMonthShowData,

  //获取24节气的日期
  /**
     * 获取24节气的日期
     *
     * function getJieqi(year, n);
        从小寒开始1年24个节气，每个公曆月中2个节气，此方法传入y年的第n个节气，则返回该节气在所再在月的日期。
     */
  getJieqi: getJieqi,

  /**
     * 公曆转農曆
     *
     * function calGongliToNongli(y, m, d);
        返回值说明：
            返回值为长度为7的int数组。其中：
            result[0] 为農曆年份
            result[1] 为農曆月份
            result[2] 为農曆日期
            result[3] 为農曆年干支数字
            result[4] 为農曆月干支数字
            result[5] 为農曆日干支数字
            result[6] 标示農曆月是否是闰月，1是，0不是
     */
  calGongliToNongli: calGongliToNongli,

  /**
     * 获取農曆y年的总天数
     *
     * function lYearDays(y)；
        返回值说明：
            int值，一年总天数
     */
  lYearDays: lYearDays,

  /**
     * 返回農曆y年闰月的天数
     *
     *  function leapDays(y);
        返回值说明：
            int值，如果農曆y年有闰月则返回闰月的天数，否则返回0
     */
  leapDays: leapDays,

  /**
     * 返回農曆y年的闰月份
     *
     *  function leapMonth(y);
        返回值说明：
            int 值，返回農曆y年闰哪个月 1-12 , 没闰返回 0
     */
  leapMonth: leapMonth,

  /**
     * 返回農曆y年m月的总天数
     *
     * function monthDays(y, m);
        返回值说明：
            int 值，返回農曆y年m月总天数
     */
  monthDays: monthDays,

  /**
     * 返回公曆y年m月的总天数
     *
     * function getGongliOneMonthDays(year, month);
        返回值说明：
            int 值，返回公曆y年m月总天数
     */
  getGongliOneMonthDays: getGongliOneMonthDays,

  /**
     * 返回農曆y年的生肖
     *
     *  function AnimalsYear(y);
        返回值说明：
            字符串，返回農曆y年的生肖
     */
  AnimalsYear: AnimalsYear,

  /**
     * 根据干支数字返回干支字符串
     *
     * function cyclicalm(gzNum);
        返回值说明：
            字符串，返回干支数字对应的干支字符串，如丙申、乙未
     */
  cyclicalm: cyclicalm,
  /**
   * 获取节日信息
   */
  getGongliFestivalInfoByYear: getGongliFestivalInfoByYear,
  /**
   * 获取节气列表信息
   */
  getJieqiInfo: getJieqiInfo,
  /**
   * 获取热门节日列表信息
   */
  getHotFestival: getHotFestival,
  getOneMonthData: getOneMonthData,
  arrayNMonth: arrayNMonth,
  arrayNDate: arrayNDate,
  Zhi: Zhi
};

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 120 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAIVBMVEVHcEwiIiLr5NvPycGRkZFRT02Lh4LUzsW+ta/l5eX///92Ym5VAAAACnRSTlMAgHtsq4GAOSvj3hTt8AAAAbRJREFUSMell7FPg0AUxgkd6voqMLeQqmOFiK4d7UZNTRwrMa5EE3Vs6OA/oEtnF/krPYQj3j2O+xK/iSa/fo979+7dw3E0vSehUPLmDGsfpg8bos1tHl4OYEdxmlErP492Jm4cbumPgrAwcFFGivy4gDgTGTNOkBHnnrbUo+BU50Zz6tV6oYERGRSrnLs1gcFUyfQJGXW/gww1ywFDYYkZKpYJDSrpljIbBidyI8tsGPRl7JQsyrHIXWw3s4Ft7Geyqjk/czu4/q3sczt4XECv2L5kSYDOkCzKTM4QcKKv5e5DPl1/aqsZKSV2qJbNg1d9K6W20BZ9qL6ah5UKimW7yrusqsbSq+Q/Wk2dvfJbAvIPna6cF+qxZIb0qKexQZihSOQFcUtuSDesdmqIG4r6YUUmKG4oQLaDXg0u+R7yrV71GP4L7A8NL2aCpwdOOLyFcFHAZQYXLnwU4MMFH1e4AeAtBW5ScNuDGyncmvFmD18fY/RCgq84a+zu0rTF7q5h+GLHRwV4+MDHGXhAgkcufIjDx0KnBAdNMVqDoys+DMPjNT6w458A9fnBPipqvRo+U34A0LwbSo9tt9wAAAAASUVORK5CYII="

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(120)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(115),
  /* template */
  __webpack_require__(125),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-73f459c1",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(119)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(116),
  /* template */
  __webpack_require__(124),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5e0258a6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: {
      'fixed-order': true,
      'move-right': !_vm.is_show_move
    },
    style: ({
      top: _vm.top,
    }),
    on: {
      "click": function($event) {
        return _vm.orderReport()
      }
    }
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("\n    " + _vm._s(_vm.title) + "\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "divider"
  }, _vm._l((30), function(it) {
    return _c('div', {
      key: it,
      staticClass: "line"
    })
  }), 0), _vm._v(" "), _c('div', {
    class: {
      'youhui-tips': true
    }
  }, [_vm._v("限时优惠")]), _vm._v(" "), _c('count-down', {
    ref: "countDown",
    staticClass: "time-box",
    attrs: {
      "time": _vm.new_time,
      "millisecond": ""
    },
    on: {
      "change": _vm.getTime
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(timeData) {
        return [_c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.minutes)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.seconds)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_c('span', [_vm._v("\n          " + _vm._s(_vm._f("filterTime")(timeData.milliseconds)) + "\n        ")])])]
      }
    }])
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pop-box"
  }, [_c('div', {
    staticClass: "pop-modal"
  }, [_c('div', {
    staticClass: "pop-content"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.tips1))]), _vm._v(" "), _c('div', {
    staticClass: "tip"
  }, [_c('img', {
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/24043adaad97dd634308bb4559cebe17b359.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.tips2))])]), _vm._v(" "), _c('div', {
    staticClass: "tip"
  }, [_c('img', {
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/24047fe34d3a15834d3284ed8f7c2743bb69.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.tips3))])]), _vm._v(" "), _c('div', {
    staticClass: "tip"
  }, [_c('img', {
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/24041bc0aa52b05a41e487aee9d574196e27.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.tips4))])]), _vm._v(" "), _c('div', {
    staticClass: "btn",
    on: {
      "click": _vm.downloadApp
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.tips5))]), _vm._v(" "), _c('span', {
    staticClass: "right"
  }, [_vm._v(_vm._s(_vm.tips6))])]), _vm._v(" "), _c('img', {
    staticClass: "close",
    attrs: {
      "src": __webpack_require__(121),
      "alt": ""
    },
    on: {
      "click": _vm.closeModal
    }
  })])])])
},staticRenderFns: []}

/***/ }),
/* 126 */,
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _home_img_logo = __webpack_require__(150);

var _home_img_logo2 = _interopRequireDefault(_home_img_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lang = _utils2.default.getLanguage(); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var tips_arr1 = {
  'zh-CN': '神准测算报告，请下载「命理寻真」',
  'zh-TW': '神準測算報告，請下載「命理尋真」'
};
var tips_arr2 = {
  'zh-CN': '识别码',
  'zh-TW': '識別碼'
};
var tips_arr3 = {
  'zh-CN': '复制',
  'zh-TW': '複製'
};
var tips_arr4 = {
  'zh-CN': '复制成功',
  'zh-TW': '複製成功'
};
var tips_arr5 = {
  'zh-CN': '复制识别码，打开命理寻真，可重复查看您购买的报告',
  'zh-TW': '復製識別碼，打開命理尋真，可重復查看您購買的報告'
};
exports.default = {
  name: 'CopyCode',
  props: {
    className: {
      type: String,
      default: ''
    },
    tips1_color: {
      type: String,
      default: '#000'
    },
    transfer_code: {
      type: String,
      default: ''
    },
    codeClass: {
      type: String,
      default: ''
    },
    tips3_color: {
      type: String,
      default: '#000'
    },
    code_btn: {
      type: String,
      default: ''
    },
    showModal: {
      type: Function,
      default: function _default() {}
    },
    code_color: {
      type: String,
      default: '#000'
    },
    code_text_style: {
      type: String,
      default: 'margin: 0.3rem auto 0.39rem'
    },
    set_title: {
      type: Boolean,
      default: false
    },
    tips5_style: {
      type: String,
      default: 'width: 4.98rem;height: 1rem;'
    },
    title_icon: {
      type: String,
      default: ''
    },
    title_icon_style: {
      type: String,
      default: ''
    },
    is_black_logo: {
      type: Boolean,
      default: true
    },
    e_name: {
      type: String,
      default: ''
    },
    e_id: {
      type: String,
      default: ''
    },
    c_id: {
      type: String,
      default: ''
    },
    a_token: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      tips1: tips_arr1[lang],
      tips2: tips_arr2[lang],
      tips3: tips_arr3[lang],
      tips5: tips_arr5[lang],
      white_logo: 'https://psychicai-static.psychicai.pro/imgs/240401762cbffce2420f95f7b526da19163c.png',
      black_logo: _home_img_logo2.default
    };
  },

  computed: {
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    }
  },
  methods: {
    /**
     * @description: 复制识别码
     * @param {*} val
     * @return {*}
     */
    handleCopyCode: async function handleCopyCode(val) {
      _utils2.default.copyText('mlxz-' + this.transfer_code);
      (0, _mintUi.Toast)(tips_arr4[lang]);

      // utils.logCopyEvent(val);
      if (!val) {
        _utils2.default.firebaseLogEvent(this.e_id, this.c_id, this.e_name, 'click', {
          args_name: this.e_name,
          channel: _utils2.default.getFBChannel()
        });
        await _utils2.default.asleep(1000);
        _utils2.default.openApp();
        return;
      }
      this.$emit('showModal');

      // utils.logCopyOther();
    }
  }
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_mock_users = ['5分钟前 我*** 成功解锁了事业精批的详细解析', '6分钟前 vt*** 成功解锁了事业精批的详细解析', '12分钟前 辣椒***成功解锁了事业精批的详细解析', '2分钟前 14***成功解锁了事业精批的详细解析', '1分钟前 96***成功解锁了事业精批的详细解析', '8分钟前 小***成功解锁了事业精批的详细解析', '7分钟前 il***成功解锁了事业精批的详细解析', '21分钟前 lo***成功解锁了事业精批的详细解析', '4分钟前 2t***成功解锁了事业精批的详细解析']; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    mock_users: {
      default: default_mock_users,
      type: Array
    },
    product_key: {
      default: '',
      type: String
    }
  },
  data: function data() {
    return {
      scrollMarquee: false, // 跑马灯动画
      nextMarqueeText: '', // 下一条跑马灯文案
      curMarqueeText: '', // 当前跑马灯文案
      cur_marry_obj: {},
      next_marry_obj: {}
    };
  },
  created: function created() {
    if (this.product_key) {
      this.marryMock();
    } else {
      this.runMarquee();
    }
  },


  methods: {
    marryMock: function marryMock() {
      var _this = this;

      this.cur_marry_obj = this.mock_users[_utils2.default.getRandom(this.mock_users.length)];
      setInterval(function () {
        _this.next_marry_obj = _this.mock_users[_utils2.default.getRandom(_this.mock_users.length)];
        _this.scrollMarquee = true;

        setTimeout(function () {
          _this.cur_marry_obj = _this.next_marry_obj;
          _this.next_marry_obj = {};
          _this.scrollMarquee = false;
        }, 500);
      }, 4000);
    },
    jumpHome: function jumpHome() {
      location.href = location.origin + location.pathname;
    },
    runMarquee: function runMarquee() {
      var _this2 = this;

      this.curMarqueeText = this.mock_users[_utils2.default.getRandom(this.mock_users.length)];
      setInterval(function () {
        _this2.nextMarqueeText = _this2.mock_users[_utils2.default.getRandom(_this2.mock_users.length)];
        _this2.scrollMarquee = true;

        setTimeout(function () {
          _this2.curMarqueeText = _this2.nextMarqueeText;
          _this2.nextMarqueeText = '';
          _this2.scrollMarquee = false;
        }, 500);
      }, 4000);
    }
  }
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vant = __webpack_require__(65);

var _vant2 = _interopRequireDefault(_vant);

__webpack_require__(108);

var _enum = __webpack_require__(2);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vant2.default); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var tipsArr1 = {
  'zh-CN': '首页',
  'zh-TW': '首頁'
};
var tipsArr2 = {
  'zh-CN': '命理寻真',
  'zh-TW': '命理尋真'
};
var tipsArr3 = {
  'zh-CN': '我的订单',
  'zh-TW': '我的訂單'
};
exports.default = {
  props: {
    callback: Function
  },

  data: function data() {
    return {
      activeKey: '',
      pathname: '',
      origin: '',
      tabList: [],
      channel: _utils2.default.getFBChannel(),
      tips1: tipsArr1[_utils2.default.getLanguage()],
      tips2: tipsArr2[_utils2.default.getLanguage()],
      tips3: tipsArr3[_utils2.default.getLanguage()]
    };
  },
  created: function created() {
    this.dataInit();
    for (var key in _enum.url_enums) {
      if (this.pathname.includes(_enum.url_enums[key])) {
        this.activeKeySync(key);
        return false;
      }
    }
  },

  methods: {
    activeKeySync: function activeKeySync(key) {
      this.activeKey = key;
    },
    dataInit: function dataInit() {
      //待处理语言
      var _location = location,
          pathname = _location.pathname,
          origin = _location.origin;

      this.pathname = pathname.split('/').pop();
      this.origin = origin;
      var languageLower = _utils2.default.getLanguage().toLowerCase();
      var language = languageLower.includes('tw') ? 'tw' : 'cn';
      var list = [];
      for (var key in _enum.reportName) {
        list.push({ key: key, value: _enum.reportName[key][language] });
      }
      this.tabList = list;
    },
    skipPage: async function skipPage() {
      await _utils2.default.asleep(500);
      var _tabEventEnums$active = _enum.tabEventEnums[this.activeKey],
          c_id = _tabEventEnums$active.c_id,
          e_name = _tabEventEnums$active.e_name;

      this.sendEventFbq();
      _utils2.default.firebaseLogEvent('10007', c_id, e_name, 'click', {
        args_name: e_name,
        channel: _utils2.default.getFBChannel()
      });
      var url = this.origin + '/' + this.channel + '/' + _enum.url_enums[this.activeKey] + '.html';
      location.href = url;
    },
    goRoute: function goRoute(routeName, key) {
      var _tabEventEnums$key = _enum.tabEventEnums[key],
          c_id = _tabEventEnums$key.c_id,
          e_name = _tabEventEnums$key.e_name;

      this.sendEventFbq();
      _utils2.default.firebaseLogEvent('10007', c_id, e_name, 'click', {
        args_name: e_name,
        channel: _utils2.default.getFBChannel()
      });
      var url = this.origin + '/' + this.channel + routeName + '.html';
      location.href = url;
    },
    sendEventFbq: async function sendEventFbq() {
      if (_utils2.default.isProd()) {
        await _utils2.default.checkFB();
        try {
          fbq('track', 'CompleteRegistration');
        } catch (err) {
          console.error('CompleteRegistration  error message:', err);
        }
      }
    }
  }
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dayjs = __webpack_require__(11);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _mintUi = __webpack_require__(4);

var _api = __webpack_require__(6);

var _enum = __webpack_require__(2);

var _Marquee = __webpack_require__(114);

var _Marquee2 = _interopRequireDefault(_Marquee);

var _common_api = __webpack_require__(117);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _img_choose = __webpack_require__(151);

var _img_choose2 = _interopRequireDefault(_img_choose);

var _checked = __webpack_require__(148);

var _checked2 = _interopRequireDefault(_checked);

var _unchecked = __webpack_require__(149);

var _unchecked2 = _interopRequireDefault(_unchecked);

var _img_choose3 = __webpack_require__(154);

var _img_choose4 = _interopRequireDefault(_img_choose3);

var _img_choose5 = __webpack_require__(153);

var _img_choose6 = _interopRequireDefault(_img_choose5);

var _result_img_word = __webpack_require__(155);

var _result_img_word2 = _interopRequireDefault(_result_img_word);

var _result_img_word3 = __webpack_require__(161);

var _result_img_word4 = _interopRequireDefault(_result_img_word3);

var _youhui_img_tag_big = __webpack_require__(156);

var _youhui_img_tag_big2 = _interopRequireDefault(_youhui_img_tag_big);

var _youhui_img_tag_big_fan = __webpack_require__(162);

var _youhui_img_tag_big_fan2 = _interopRequireDefault(_youhui_img_tag_big_fan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 名称映射
var payMethodsMap = {
  NET_BANKING: 'FPX',
  AXIATABOOST: 'Boost',
  TNG: "Touch'n Go",
  GRABPAY: 'Grabpay',
  MAYBANK: 'Maybank QR'
};

var newPayMap = {
  1: 'AXIATABOOST',
  2: 'TNG',
  3: 'GRABPAY',
  4: 'MAYBANK'
};

var orderCreateTips = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...'
};

exports.default = {
  components: { Marquee: _Marquee2.default },
  data: function data() {
    return {
      loading: false,
      product: {},
      payment_details: [],
      index: 0,
      paying: false,
      currency: '',
      price: '',
      expand: false,
      list: [],
      product_id: null,
      pay_url: '',
      BoneCheckImg: _img_choose2.default,
      commonCheck: _checked2.default,
      yearCheck: _img_choose4.default,
      commonUncheck: _unchecked2.default,
      yearUncheck: _img_choose6.default,
      language: _utils2.default.getLanguage(),
      order_style: {
        'zh-CN': '请选择支付方式',
        'zh-TW': '請選擇支付方式'
      },
      tips_style_1: {
        'zh-CN': '展开更多',
        'zh-TW': '展開更多'
      },
      unlock_style: {
        'zh-CN': '立即解锁',
        'zh-TW': '立即解鎖'
      },
      cn_pay_type: _result_img_word2.default,
      tw_pay_type: _result_img_word4.default,
      new_pay_methods: [],
      cn_firstOrderTag: _youhui_img_tag_big2.default,
      tw_firstOrderTag: _youhui_img_tag_big_fan2.default,
      is_new_user: false,
      price_desc: {
        'zh-CN': '原价',
        'zh-TW': '原價'
      }
    };
  },

  props: {
    type: {
      default: '',
      type: String | Number
    },
    product_key: {
      default: '',
      type: String
    },
    query_user_string: {
      default: '',
      type: String
    },
    btn_width: {
      default: '6.3rem',
      type: String
    },
    back_url: {
      default: '',
      type: String
    },
    is_show: {
      type: Boolean,
      default: false
    },
    lucky_re_id: {
      type: '',
      default: String
    }
    // getOrderId: {
    //   type: Function,
    //   default: () => {},
    // },
    // product: {
    //   type: Object,
    //   default: () => {},
    // },
    // payment_details: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  computed: {
    user_number: function user_number() {
      return this.$store.state.year_user;
    },
    firstOrderTag: function firstOrderTag() {
      return this.language === 'zh-CN' ? _youhui_img_tag_big2.default : _youhui_img_tag_big_fan2.default;
    }
  },
  created: async function created() {
    var _this = this;

    this.getPayMethods();

    var _ref = await (0, _api.getProductionsAPI)('ceh5'),
        status = _ref.status,
        data = _ref.data;

    if (status === 1000) {
      this.product = data.find(function (it) {
        return it.product_key === _this.product_key;
      });
      this.is_new_user = this.product ? this.product.tags ? this.product.tags.includes('newcomer_discount') : false : false;
      this.payment_details = this.product.payment_details || {};
      this.product_id = this.product.product_id;
    }
    this.pay_url = '';
    if (this.$route.query.order_id) {
      var res = await (0, _api.getResultAPI)({ order_id: this.$route.query.order_id });
      if (res.status !== 1000) return;
      this.pay_url = res.data.pay_url;
    }
  },
  mounted: function mounted() {},

  methods: {
    getProductions: _common_api.getProductions,

    /**
     * @description: 获取支付方式列表
     * @return {*}
     */
    getList: function getList() {
      var list = [];
      console.log(this.payment_details);
      this.payment_details.forEach(function (item) {
        if (item.payment_target_orgs.length) {
          item.payment_target_orgs.forEach(function (item2) {
            list.push({
              payment_name: item2,
              name: payMethodsMap[item2],
              payment_target_org: item2,
              payment_type: item.payment_type
            });
          });
        } else {
          list.push({
            payment_name: item.payment_type,
            name: payMethodsMap[item.payment_type],
            payment_target_org: null,
            payment_type: item.payment_type
          });
        }
      });
      return list;
    },


    /**
     * @description: 展示是否支持退款
     * @param {*} type
     * @return {*}
     */
    canRefund: function canRefund(type) {
      return type === 'NET_BANKING' ? '不支持退款' : '支持退款';
    },


    /**
     * @description: 获取支付方式的Icon
     * @param {*} type
     * @return {*}
     */
    getPayIcon: function getPayIcon(type) {
      return _defineProperty({}, type, true);
    },


    /**
     * @description: 解析用户信息 即额外参数
     * @return {*}
     */
    getExtra: function getExtra() {
      var params = null;
      var query_user_string = this.query_user_string;
      var query_user_string_array = query_user_string.split('|');
      // 八字合婚 双人信息
      if (this.product_key === 'h5_marriage') {
        var _query_user_string_ar = _slicedToArray(query_user_string_array, 13),
            male_name = _query_user_string_ar[0],
            female_name = _query_user_string_ar[1],
            male_birth_year = _query_user_string_ar[2],
            male_birth_month = _query_user_string_ar[3],
            male_birth_date = _query_user_string_ar[4],
            female_birth_year = _query_user_string_ar[5],
            female_birth_month = _query_user_string_ar[6],
            female_birth_date = _query_user_string_ar[7],
            male_birth_hour = _query_user_string_ar[8],
            female_birth_hour = _query_user_string_ar[9],
            male_is_gongli = _query_user_string_ar[10],
            female_is_gongli = _query_user_string_ar[11],
            sex = _query_user_string_ar[12];

        params = {
          male_name: male_name,
          female_name: female_name,
          male_birth_year: male_birth_year,
          male_birth_month: male_birth_month,
          male_birth_date: male_birth_date,
          female_birth_year: female_birth_year,
          female_birth_month: female_birth_month,
          female_birth_date: female_birth_date,
          male_birth_hour: male_birth_hour,
          female_birth_hour: female_birth_hour,
          male_is_gongli: male_is_gongli,
          female_is_gongli: female_is_gongli,
          sex: sex
        };
      }
      // 其他 单人信息
      else {
          var _query_user_string_ar2 = _slicedToArray(query_user_string_array, 7),
              name = _query_user_string_ar2[0],
              _sex = _query_user_string_ar2[1],
              is_gongli = _query_user_string_ar2[2],
              birth_year = _query_user_string_ar2[3],
              birth_month = _query_user_string_ar2[4],
              birth_date = _query_user_string_ar2[5],
              birth_hour = _query_user_string_ar2[6];

          params = {
            name: name,
            sex: _sex,
            is_gongli: is_gongli,
            birth_year: birth_year,
            birth_month: birth_month,
            birth_date: birth_date,
            birth_hour: birth_hour,
            date: (0, _dayjs2.default)('' + birth_year + (+birth_month < 10 ? '0' + birth_month : birth_month) + (+birth_date < 10 ? '0' + birth_date : birth_date)).format('YYYYMMDD')
          };
        }

      return params;
    },


    /**
     * @description: 支付
     * @param {*} re_id
     * @return {*}
     */
    pay: function pay(re_id) {
      var _this2 = this;

      _utils2.default.firebaseLogEvent('20002', '-10002', 'click_report_choice', 'click', {
        args_name: 'click_report_choice',
        // pay_type: newPayMap[this.index],
        pay_type: this.index ? newPayMap[this.index] : 'NET_BANKING',
        report_id: this.lucky_re_id,
        channel: _utils2.default.getFBChannel()
      });

      // 2秒的防抖
      if (this.loading) return false;
      this.loading = true;
      setTimeout(function () {
        _this2.loading = false;
      }, 2000);

      if (this.pay_url) {
        location.href = this.pay_url;
        return;
      }

      var click_ = this.new_pay_methods[this.index];
      localStorage.setItem('report_price', this.product.price);

      _utils2.default.firebaseLogEvent('10060', '-10006', 'event_status_pay_type', 'event_status', {
        args_name: 'event_status_pay_type',
        pay_type: click_.title
      });

      var pay_method = click_.pay_method,
          trade_pay_type = click_.trade_pay_type,
          trade_target_org = click_.trade_target_org;

      if (click_.pay_method === 'google_pay') {
        var params = {
          pay_method: pay_method,
          product_key: this.product_key,
          platform: 'ANDROID',
          product_id: this.product_id,
          extra_ce_suan: this.getExtra(this.product_key, this.query_user_string)
        };
        (0, _api.payOrderAPI)(params).then(function (res) {
          _this2.loading = false;
          if (res.status === 1000) {
            _mintUi.Indicator.close();
            _this2.order_id = res.data.id;
            // this.$emit('getOrderId', res.data.id);
            localStorage.setItem('report_order_id', res.data.id);
          }
        }).catch(function (err) {
          console.log(err);
          _this2.loading = false;
          _mintUi.Indicator.close();
        });
      } else {
        // 支付公共参数
        var _params = {
          pay_method: pay_method,
          platform: _utils2.default.isAndroid() ? 'ANDROID' : 'IPHONE',
          trade_pay_type: trade_pay_type,
          trade_target_org: trade_target_org || null,
          product_id: this.product_id,
          product_key: this.product_key,
          fb_param: {
            fbc: localStorage.getItem('_fbc'),
            fbp: localStorage.getItem('_fbp'),
            external_id: localStorage.getItem('mlxz_outer_visitor_id')
          }
        };
        _params.callback_url = '' + location.origin + location.pathname + '#/result?path=' + _enum.path_enums[this.product_key];
        _params.extra_ce_suan = this.getExtra();
        if (this.paying) return false;
        this.paying = true;
        _mintUi.Indicator.open(orderCreateTips[this.language]);
        (0, _api.payOrderAPI)(_params).then(function (res) {
          if (res.status === 1000) {
            location.href = res.data.pay_url;
            _mintUi.Indicator.close();
          }
          _this2.paying = false;
        });
      }
    },
    getPayMethods: function getPayMethods() {
      var _this3 = this;

      var data = {
        ad_channel: _utils2.default.getRequestParams('ad_channel')
      };
      (0, _api.getPayMethodsAPI)(data).then(function (res) {
        if (res.status === 1000) {
          _this3.new_pay_methods = res.data;
        }
      });
    }
  }
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(4);

var _api = __webpack_require__(6);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _enum = __webpack_require__(2);

var _vant = __webpack_require__(65);

var _svga = __webpack_require__(98);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var e_id_arr = {
  h5_wealth2024: '60001',
  h5_weigh_bone: '60002',
  h5_bai_gua: '60003',
  h5_marriage: '60005',
  h5_annual2024: '60009',
  h5_emotion2024: '60010',
  h5_career2024: '60011'
};

var tipsArr1 = {
  'zh-CN': '优惠倒计时',
  'zh-TW': '優惠倒計時'
};
var tipsArr2 = {
  'zh-CN': '人购买当前报告',
  'zh-TW': '人購買當前報告'
};

var tipsArr3 = {
  'zh-CN': '结缘价 ',
  'zh-TW': '結緣價 '
};
var tipsArr4 = {
  'zh-CN': ' 立即解锁内容',
  'zh-TW': ' 立即解鎖內容'
};

var originPriceArr = {
  'zh-CN': '原价 ',
  'zh-TW': '原價 '
};

var tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...'
};
var tipsArr6 = {
  'zh-CN': '请稍等...',
  'zh-TW': '請稍等...'
};
exports.default = {
  data: function data() {
    return {
      tips1: tipsArr1[_utils2.default.getLanguage()],
      tips2: tipsArr2[_utils2.default.getLanguage()],
      tips3: tipsArr3[_utils2.default.getLanguage()],
      tips4: tipsArr4[_utils2.default.getLanguage()],
      parser: null,
      player: null,

      show: false,
      pay_methods: [],
      loading: false,
      xsyh_icon: 'https://psychicai-static.psychicai.pro/imgs/24049b44461fceb64a04b15edd6b2a8bb79e.png',
      new_user_icon: 'https://psychicai-static.psychicai.pro/imgs/24040fcec5baef7f4fcea5a1eed3552d734e.png',
      time: 0,
      time_str: '',
      product: null,
      is_new_user: false, // 是否是新用户
      check_index: 0, //选中支付方式
      checked_icon: 'https://psychicai-static.psychicai.pro/imgs/24048e756ae2d40f436184b0bc8018199fbb.png',
      no_check_icon: 'https://psychicai-static.psychicai.pro/imgs/2404f091a163349f45d3909f82e4660cc3c6.png',
      is_show_shandong: false,
      is_show_daoqi: false,
      payCanClick: false,
      pay_lock_time: 0
    };
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    bg: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    close: {
      type: Function,
      default: function _default() {}
    },
    product_key: {
      type: String,
      default: ''
    },
    pay_modal: {
      type: Boolean,
      default: false
    },
    query_user_string: {
      default: '',
      type: String
    },
    title_style: {
      type: String,
      default: 'color:#222'
    },
    e_view_id: {
      type: String,
      default: ''
    },
    c_view_id: {
      type: String,
      default: ''
    },
    e_view_name: {
      type: String,
      default: ''
    },
    a_view_token: {
      type: String,
      default: ''
    },
    e_click_name: {
      type: String,
      default: ''
    },
    c_click_id: {
      type: String,
      default: ''
    },
    a_click_token: {
      type: String,
      default: ''
    }
  },
  components: {
    CountDown: _vant.CountDown
  },

  computed: {
    buy_people: function buy_people() {
      var buyList = {
        h5_marriage: '87',
        h5_wealth2024: '142',
        h5_career2024: '103',
        h5_emotion2024: '98',
        h5_annual2024: '193',
        h5_bai_gua: '146',
        h5_weigh_bone: '138'
      };
      return buyList[this.product_key];
    },
    now_price: function now_price() {
      return this.product ? this.product.unit + ' ' + this.product.price_str : '-';
    },
    origin_price: function origin_price() {
      return this.product ? originPriceArr[_utils2.default.getLanguage()] + this.product.unit + ' ' + this.product.origin_price_str : '-';
    },
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    },
    is_android: function is_android() {
      return _utils2.default.isAndroid();
    }
  },
  created: function created() {
    // 首次挽留的弹窗计时
    var use_fixed_time = this.$route.query.use_fixed_time;
    if (use_fixed_time) {
      this.time = +localStorage.getItem('mlxz_fixed_local_order_time');
    } else {
      this.time = 15 * 60 * 1000;
      localStorage.removeItem('mlxz_new_time_down_' + this.product_key);
    }
  },


  watch: {
    value: {
      handler: function handler(val) {
        this.show = val;
        if (val) {
          this.getProductionList();
          this.getPayMethod();
          if (this.product_key === 'h5_marriage') {
            // this.loadBg(
            //   '#bg',
            //   this.is_cn ? this.cn_bazi_modal : this.tw_bazi_modal
            // );
          }

          _utils2.default.firebaseLogEvent(this.e_view_id, this.c_view_id, this.e_view_name, 'view', {
            args_name: this.e_view_name,
            channel: _utils2.default.getFBChannel()
          });
        } else {
          if (this.parser) {
            this.parser.destroy();
          }
          if (this.player) {
            this.player.destroy();
          }
        }
      },
      deep: true,
      immediate: true
    },
    show: function show(val) {
      if (!val) {
        this.closeModal();
      }
    }
  },
  filters: {
    filterTime: function filterTime(val_) {
      var val = val_.toString();
      if (val.length === 1) {
        return '0' + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    }
  },

  methods: {
    getTime: function getTime(val) {
      var minutes = val.minutes,
          seconds = val.seconds,
          milliseconds = val.milliseconds;

      var time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      // 是否展示首次挽留弹窗 0 1展示 2不展示  并缓存当前时间用于弹窗倒计时
      var notice_num = localStorage.getItem('mlxz_show_notice_' + this.product_key);
      if (notice_num) {
        if (+notice_num === 1) {
          localStorage.setItem('mlxz_count_down_' + this.product_key, time_);
        }
      } else {
        localStorage.setItem('mlxz_count_down_' + this.product_key, time_);
      }
      localStorage.setItem('mlxz_fixed_local_order_time', time_);

      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time = 0;
        this.$refs.countDown.pause();
        this.$refs.countDown.reset();
      }
    },

    // 端内加载背景SVGA动画
    loadBg: function loadBg(dom, url) {
      var _this = this;

      var is_loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var downloader = new _svga.Downloader();
      // 默认调用 WebWorker 线程解析
      // 可配置 new Parser({ disableWorker: true }) 禁止
      this.parser = new _svga.Parser();
      // #canvas 是 HTMLCanvasElement
      this.player = new _svga.Player(dom);

      (async function () {
        var fileData = await downloader.get(url);
        var svgaData = await _this.parser.do(fileData);

        _this.player.set({ loop: is_loop });

        await _this.player.mount(svgaData);

        // 开始播放动画
        _this.player.start();
      })();
    },
    closeModal: function closeModal() {
      this.show = false;
      this.$emit('close', false);
      this.$emit('update:value', false);
    },


    /**
     * @description: 获取当前商品信息
     * @return {*}
     */
    getProductionList: async function getProductionList() {
      var _this2 = this;

      this.product = null;

      var _ref = await (0, _api.getProductionsAPI)('ceh5'),
          status = _ref.status,
          data = _ref.data;

      if (status === 1000) {
        this.product = data.find(function (item) {
          return item.product_key === _this2.product_key;
        });
        this.is_new_user = this.product ? this.product.tags ? this.product.tags.includes('newcomer_discount') : false : false;
      }
    },

    /**
     * @description: 获取支付方式列表
     * @return {*}
     */
    getPayMethod: async function getPayMethod() {
      this.loading = true;

      try {
        var res = await (0, _api.getPayMethodsAPI)();
        this.loading = false;
        if (res.status === 1000) {
          this.pay_methods = res.data;
        }
      } catch (e) {
        this.loading = false;
        this.closeModal();
      }
    },
    isShowBannerSort: function isShowBannerSort() {
      var channel = _utils2.default.getFBChannel();
      return ['enjoy02', 'panda02'].includes(channel) ? false : true;
    },

    // 事件排序
    logEventForSort: async function logEventForSort(it) {
      if (!this.isShowBannerSort()) return;
      try {
        var res = await (0, _api.reportEventAPI)({
          event_name: it.e_name,
          product_id: it.product_id
        });
        if (res.status !== 1000) return;
      } catch (e) {
        console.error(e);
      }
    },

    /**
     * @description: 创建订单 支付
     * @return {*}
     */
    payMoney: async function payMoney() {
      var _this3 = this;

      //防抖
      if (this.payCanClick) {
        return false;
      }
      this.payCanClick = true;
      clearTimeout(this.pay_lock_time);
      this.pay_lock_time = setTimeout(function () {
        _this3.payCanClick = false;
      }, 2000);
      if (_utils2.default.isProd()) {
        _mintUi.Indicator.open(tipsArr6[_utils2.default.getLanguage()]);
        await _utils2.default.checkFB();
        _mintUi.Indicator.close();
        try {
          fbq('track', 'AddToCart');
        } catch (err) {
          console.error('AddToCart error message:', err);
        }
      }
      this.logEventForSort({
        e_name: 'pay_click',
        product_id: this.product.product_id
      });
      _utils2.default.firebaseLogEvent(this.e_view_id, this.c_click_id, this.e_click_name, 'click', {
        args_name: this.e_click_name,
        pay_type: this.pay_methods[this.check_index].title,
        channel: _utils2.default.getFBChannel()
      });
      var pick_method = this.pay_methods[this.check_index];
      var pay_method = pick_method.pay_method,
          trade_pay_type = pick_method.trade_pay_type,
          trade_target_org = pick_method.trade_target_org,
          fake = pick_method.fake;

      //假支付

      if (fake) {
        (0, _vant.Toast)(this.is_cn ? '请选择其他支付方式' : '請選擇其他支付方式');
        return;
      }

      localStorage.setItem('report_price', this.product.price);

      _mintUi.Indicator.open(tipsArr5[_utils2.default.getLanguage()]);

      var params = {
        pay_method: pay_method,
        product_key: this.product_key,
        product_id: this.product.product_id,
        platform: 'WEB',
        extra_ce_suan: _utils2.default.getExtraParams(this.product_key, this.query_user_string),
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        }
      };
      var discount_pay = this.$route.query.discount_pay || 0;
      // let user_time = this.$route.query.use_fixed_time;
      var user_time = true;
      var pay_max_params = Object.assign({}, params, {
        trade_pay_type: trade_pay_type,
        trade_target_org: trade_target_org
      });
      pay_max_params.callback_url = '' + location.origin + location.pathname + '#/result?path=' + _enum.path_enums[this.product_key] + '&report_price=' + this.product.price + '&discount_pay=' + discount_pay;
      var res = await (0, _api.payOrderAPI)(pay_max_params);
      _mintUi.Indicator.close();
      localStorage.removeItem('mlxz_set_event_times');

      if (res.status !== 1000) return;
      if (user_time) {
        localStorage.removeItem('mlxz_fixed_order_info');
        localStorage.removeItem('mlxz_fixed_order_key');
        localStorage.removeItem('mlxz_fixed_local_order_time');
        localStorage.removeItem('mlxz_fixed_api_order_time');
      }
      await _utils2.default.asleep(1000);
      location.href = res.data.pay_url;
    }
  }
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'picker',
  data: function data() {
    return {
      id: _utils2.default.getRandomString(10)
    };
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      required: false
    },
    position: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    }
  },

  watch: {
    value: function value(newVal) {
      this.ele && this.ele.mobiscroll('setValue', newVal, true);
    },
    source: function source() {
      var self = this;
      setTimeout(function () {
        self.ele = $('#' + self.id).mobiscroll().select({
          theme: '',
          mode: 'scroller',
          display: 'inline',
          lang: 'en'
        });
        self.ele.mobiscroll('setValue', self.value, true);
      }, 0);
    }
  },
  created: function created() {
    var self = this;
    setTimeout(function () {
      self.ele = $('#' + self.id).mobiscroll().select({
        theme: '',
        mode: 'scroller',
        display: 'inline',
        lang: 'en'
      });
      self.ele.mobiscroll('setValue', self.value, true);
    }, 0);
  },

  computed: {
    source: function source() {
      return this.data;
    }
  },
  // watch : {
  //     source() {
  //         let self = this;
  //         setTimeout(() => {
  //             self.ele = $('#' + self.id).mobiscroll().select({
  //                 theme: "",
  //                 mode: "scroller",
  //                 display: "inline",
  //                 lang: "en"
  //             })
  //             self.ele.mobiscroll('setValue', self.value, true);
  //         }, 0);
  //     }
  // },
  methods: {
    getValue: function getValue() {
      return this.ele.mobiscroll('getValue');
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _vant = __webpack_require__(65);

var _enum = __webpack_require__(2);

var _lunarJavascript = __webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var tipsArr1 = {
  'zh-CN': '您的限时优惠即将截止',
  'zh-TW': '您的限時優惠即將截止'
};

var tipsArr2 = {
  'zh-CN': '即刻领取',
  'zh-TW': '即刻領取'
};
exports.default = {
  name: 'PopNotice',
  props: {
    close: {
      type: Function,
      default: function _default() {}
    },
    count_down: {
      type: Number,
      default: 0
    },
    product_key: {
      type: String,
      default: ''
    },
    e_id: {
      type: String,
      default: ''
    },
    c_id: {
      type: String,
      default: ''
    },
    c_name: {
      type: String,
      default: ''
    }
  },
  components: {
    CountDown: _vant.CountDown
  },
  filters: {
    filter_name: function filter_name(val) {
      return _utils2.default.getShortStr(val, 4);
    },
    filterTime: function filterTime(val_) {
      var val = val_.toString();
      if (val.length === 1) {
        return '0' + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    }
  },

  data: function data() {
    return {
      time_: 0,
      is_show_shandong: false,
      is_show_daoqi: false,
      title: '',
      user_info: {
        name: '',
        birth: ''
      },
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      tips1: tipsArr1[_utils2.default.getLanguage()],
      tips2: tipsArr2[_utils2.default.getLanguage()],
      user_: {},
      new_time: null,
      male_info: {},
      female_info: {}
    };
  },
  created: function created() {
    this.time_ = this.count_down;
    var name_obj = _enum.reportName[this.product_key];
    this.title = this.lang ? name_obj.cn : name_obj.tw;
    this.getUserInfo();
  },

  computed: {
    lang: function lang() {
      return _utils2.default.getLanguage();
    }
  },
  methods: {
    toDetailPage: function toDetailPage() {
      _utils2.default.firebaseLogEvent(this.e_id, this.c_id, this.c_name, 'click', {
        args_name: this.c_name,
        channel: _utils2.default.getFBChannel()
      });
      if (this.product_key === 'h5_marriage') {
        var marry_info = JSON.parse(localStorage.getItem('mlxz_user_info_h5_marriage'));
        var male_str = marry_info.male_str;
        var female_str = marry_info.female_str;
        var _path = 'detail?querystring=' + marry_info.user_info + '&male_str=' + male_str + '&female_str=' + female_str + '&pay_modal=1&use_fixed_time=1&discount_pay=0';
        location.href = location.origin + '/' + _utils2.default.getFBChannel() + '/' + _enum.path_enums[this.product_key] + '.html#/' + _path;
        localStorage.setItem('mlxz_new_time_down_' + this.product_key, this.new_time);
        this.$emit('close');
        this.$router.push({ path: _path });
        return;
      }
      var path = 'detail?querystring=' + this.user_.user_info + '&pay_modal=1&use_fixed_time=1&discount_pay=0';
      localStorage.setItem('mlxz_new_time_down_' + this.product_key, this.new_time);

      this.$emit('close');
      this.$router.push({ path: path });
    },
    getIcon: function getIcon() {
      var obj = _enum.banner_enums[this.product_key].small;
      return this.lang ? obj.cn : obj.tw;
    },
    closeModal: function closeModal() {
      this.$emit('close');
    },
    getTime: function getTime(val) {
      var minutes = val.minutes,
          seconds = val.seconds,
          milliseconds = val.milliseconds;

      var time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      this.new_time = time_;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time_ = 0;
        if (this.$refs.countDown) {
          this.$refs.countDown.pause();
          this.$refs.countDown.reset();
        }
      }
    },
    getUserInfo: function getUserInfo() {
      this.user_ = JSON.parse(localStorage.getItem('mlxz_user_info_' + this.product_key));
      if (this.user_.product_key === this.product_key) {
        if (this.product_key !== 'h5_marriage') {
          this.formateSingleUserInfo(this.user_.user_info);
        } else {
          this.male_info = this.formateCPUserInfo(this.user_.male_str);
          this.female_info = this.formateCPUserInfo(this.user_.female_str);
        }
      }

      console.log(this.male_info);
    },

    /**
     * @description: 格式化用户信息
     * @param {*} string
     * @return {*}
     */
    formateSingleUserInfo: async function formateSingleUserInfo(string) {
      var arr = string.split('|');
      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];
      this.user_info.name = this.username;
      this.sex = +arr[1];
      this.gongli_nongli = +arr[2];
      this.picker_hour = _utils2.default.formateNongliHour(arr[6]);
      var android_date = this.year + '-' + this.month + '-' + this.date;
      var ios_date = this.year + '/' + this.month + '/' + this.date;
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? android_date : ios_date));
      var lunar = solar.getLunar();
      this.picker_date_nongli = +this.gongli_nongli ? lunar.getYear() + '\u5E74' + lunar.getMonthInChinese() + '\u6708' + lunar.getDayInChinese() + ' ' + this.picker_hour : this.year + '\u5E74' + _utils2.default.formateNongliMonth(this.month) + _utils2.default.formateNongliDate(this.date) + ' ' + this.picker_hour;
      this.picker_date_yangli = +this.gongli_nongli ? this.year + '-' + this.month + '-' + this.date + ' ' + this.picker_hour : _lunarJavascript.Lunar.fromYmd(+this.year, +this.month, +this.date).getSolar().toString() + ' ' + this.picker_hour;

      this.user_info.birth = this.gongli_nongli ? this.picker_date_yangli : this.picker_date_nongli;
      this.user_info.sex = this.sex;
    },
    formateCPUserInfo: function formateCPUserInfo(str) {
      var arr = str.split('|');
      var year = arr[3];
      var month = arr[4];
      var date = arr[5];
      var birth_hour = arr[6];
      var username = arr[0];
      var sex = +arr[1];
      var gongli_nongli = +arr[2];
      var picker_hour = _utils2.default.formateNongliHour(arr[6]);
      var android_date = year + '-' + month + '-' + date;
      var ios_date = year + '/' + month + '/' + date;
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? android_date : ios_date));
      var lunar = solar.getLunar();
      var picker_date_nongli = gongli_nongli ? lunar.getYear() + '\u5E74' + lunar.getMonthInChinese() + '\u6708' + lunar.getDayInChinese() + ' ' + picker_hour : year + '\u5E74' + _utils2.default.formateNongliMonth(month) + _utils2.default.formateNongliDate(date) + ' ' + picker_hour;
      var picker_date_yangli = gongli_nongli ? year + '-' + month + '-' + date + ' ' + picker_hour : _lunarJavascript.Lunar.fromYmd(+year, +month, +date).getSolar().toString() + ' ' + picker_hour;
      return {
        name: username,
        birth: !gongli_nongli ? picker_date_nongli : picker_date_yangli
      };
    }
  }
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mintUi = __webpack_require__(4);

var _dayjs = __webpack_require__(11);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _api = __webpack_require__(6);

var _fortune = __webpack_require__(10);

var _enum = __webpack_require__(2);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 名称映射
var payMethodsMap = {
  NET_BANKING: 'FPX',
  AXIATABOOST: 'Boost',
  TNG: "Touch'n Go",
  GRABPAY: 'Grabpay',
  MAYBANK: 'Maybank QR'
};
var newPayMap = {
  1: 'AXIATABOOST',
  2: 'TNG',
  3: 'GRABPAY',
  4: 'MAYBANK'
};

var tips_1 = {
  'zh-CN': '选择支付方式',
  'zh-TW': '選擇支付方式'
};

var tips_2 = {
  'zh-CN': '展开更多',
  'zh-TW': '展開更多'
};
var tips_3 = {
  'zh-CN': '立即支付',
  'zh-TW': '立即支付'
};

var tips_4 = {
  'zh-CN': '订单创建中',
  'zh-TW': '訂單創建中'
};

exports.default = {
  components: { Popup: _mintUi.Popup },
  data: function data() {
    return {
      tips_1: tips_1,
      tips_2: tips_2,
      tips_3: tips_3,
      tips_4: tips_4,
      popupVisible: false,
      loading: false,
      product: {},
      payment_details: [],
      index: 0,
      paying: false,
      currency: '',
      price: '',
      expand: false,
      product_id: 0,
      google_goods_id: 0,
      new_pay_methods: [],
      language: _utils2.default.getLanguage(),
      unit: ''
    };
  },

  props: {
    visible: {
      default: false,
      type: Boolean
    },
    // product_id: {
    //   type: Number,
    // },
    // 测算类需要 运势类不需要
    query_user_string: {
      default: '',
      type: String
    },
    checked_list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    all_list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    product_key: {
      type: String,
      default: ''
    },
    getOrderId: {
      type: Function,
      default: function _default() {}
    },
    product_price: {
      type: String | Number,
      default: ''
    }
  },
  watch: {
    visible: function visible(newValue) {
      if (newValue) {
        this.popupVisible = true;
        this.query();
      }
    },
    popupVisible: function popupVisible(newValue) {
      if (!newValue) {
        this.expand = false;
        this.index = 0;
        this.$emit('update-visible', false);
      }
    }
  },
  computed: {
    user_number: function user_number() {
      return this.$store.state.year_user;
    },

    // 支付列表
    list: function list() {
      var list = [];
      this.payment_details.forEach(function (item) {
        if (item.payment_target_orgs.length) {
          item.payment_target_orgs.forEach(function (item2) {
            list.push({
              payment_name: item2,
              name: payMethodsMap[item2],
              payment_target_org: item2,
              payment_type: item.payment_type
            });
          });
        } else {
          list.push({
            payment_name: item.payment_type,
            name: payMethodsMap[item.payment_type],
            payment_target_org: null,
            payment_type: item.payment_type
          });
        }
      });
      list[list.length] = {
        payment_name: 'GooglePay',
        name: 'GooglePay',
        payment_target_org: null,
        payment_type: 'google_pay'
      };

      return [{
        payment_name: 'TNG',
        name: "Touch'n Go",
        payment_target_org: 'TNG',
        payment_type: 'WALLET'
      }, {
        payment_name: 'AXIATABOOST',
        name: 'Boost',
        payment_target_org: 'AXIATABOOST',
        payment_type: 'WALLET'
      }, {
        payment_name: 'GRABPAY',
        name: 'Grabpay',
        payment_target_org: 'GRABPAY',
        payment_type: 'WALLET'
      }, {
        payment_name: 'MAYBANK',
        name: 'Maybank QR',
        payment_target_org: 'MAYBANK',
        payment_type: 'WALLET'
      }, {
        payment_name: 'GOOGLEPAY',
        name: 'GooglePay',
        payment_target_org: null,
        payment_type: 'google_pay'
      }];
    }
  },
  created: function created() {
    this.getPayMethods();
  },

  methods: {
    // 获取支付方式
    getPayMethods: function getPayMethods() {
      var _this = this;

      var data = {
        ad_channel: _utils2.default.getRequestParams('ad_channel')
      };
      (0, _api.getPayMethodsAPI)(data).then(function (res) {
        if (res.status === 1000) {
          _this.new_pay_methods = res.data;
          console.log(_this.new_pay_methods);
        }
      });
    },

    // 关闭弹窗
    close: function close() {
      this.popupVisible = false;
    },

    // 能否退款文本
    canRefund: function canRefund(type) {
      return type === 'NET_BANKING' ? '不支持退款' : '支持退款';
    },

    // 获取图标
    getPayIcon: function getPayIcon(type) {
      return _defineProperty({}, type, true);
    },

    // 请求支付类型
    query: function query() {
      var _this2 = this;

      var same_ = this.all_list.find(function (item) {
        return item.product_key === _this2.product_key;
      });
      var price = same_.price,
          unit = same_.unit,
          product_id = same_.product_id,
          google_goods_id = same_.google_goods_id,
          payment_details = same_.payment_details;

      this.payment_details = payment_details;
      this.product_id = product_id;
      this.price = price;
      this.google_goods_id = google_goods_id;
      this.unit = unit;
    },

    // 解析参数字符串
    getExtra: function getExtra(product_key, querystring) {
      var params = null;
      var query_user_string = querystring;
      var query_user_string_array = query_user_string.split('|');

      // 八字合婚 双人信息
      if (product_key === 'h5_marriage') {
        var _query_user_string_ar = _slicedToArray(query_user_string_array, 13),
            male_name = _query_user_string_ar[0],
            female_name = _query_user_string_ar[1],
            male_birth_year = _query_user_string_ar[2],
            male_birth_month = _query_user_string_ar[3],
            male_birth_date = _query_user_string_ar[4],
            female_birth_year = _query_user_string_ar[5],
            female_birth_month = _query_user_string_ar[6],
            female_birth_date = _query_user_string_ar[7],
            male_birth_hour = _query_user_string_ar[8],
            female_birth_hour = _query_user_string_ar[9],
            male_is_gongli = _query_user_string_ar[10],
            female_is_gongli = _query_user_string_ar[11],
            sex = _query_user_string_ar[12];

        params = {
          male_name: male_name,
          female_name: female_name,
          male_birth_year: male_birth_year,
          male_birth_month: male_birth_month,
          male_birth_date: male_birth_date,
          female_birth_year: female_birth_year,
          female_birth_month: female_birth_month,
          female_birth_date: female_birth_date,
          male_birth_hour: male_birth_hour,
          female_birth_hour: female_birth_hour,
          male_is_gongli: male_is_gongli,
          female_is_gongli: female_is_gongli,
          sex: sex
        };
      }
      // 其他 单人信息
      else {
          var _query_user_string_ar2 = _slicedToArray(query_user_string_array, 7),
              name = _query_user_string_ar2[0],
              _sex = _query_user_string_ar2[1],
              is_gongli = _query_user_string_ar2[2],
              birth_year = _query_user_string_ar2[3],
              birth_month = _query_user_string_ar2[4],
              birth_date = _query_user_string_ar2[5],
              birth_hour = _query_user_string_ar2[6];

          params = {
            name: name,
            sex: _sex,
            is_gongli: is_gongli,
            birth_year: birth_year,
            birth_month: birth_month,
            birth_date: birth_date,
            birth_hour: birth_hour,
            date: (0, _dayjs2.default)('' + birth_year + (+birth_month < 10 ? '0' + birth_month : birth_month) + (+birth_date < 10 ? '0' + birth_date : birth_date)).format('YYYYMMDD')
          };
        }
      return params;
    },

    // 支付
    pay: function pay() {
      var _this3 = this;

      _mintUi.Indicator.open(this.tips_4[this.language]);
      if (this.loading) return;
      this.loading = true;
      var click_ = this.new_pay_methods[this.index];
      _utils2.default.firebaseLogEvent('10060', '-10006', 'event_status_pay_type', 'event_status', {
        args_name: 'event_status_pay_type',
        pay_type: click_.title
      });

      var pay_method = click_.pay_method,
          trade_pay_type = click_.trade_pay_type,
          trade_target_org = click_.trade_target_org;
      // 支付公共参数

      var params = {
        pay_method: pay_method,
        platform: _utils2.default.isAndroid() ? 'ANDROID' : 'IPHONE',
        trade_pay_type: trade_pay_type,
        trade_target_org: trade_target_org || null,
        product_id: this.product_id,
        product_key: this.product_key,
        extra_ce_suan: this.getExtra(this.product_key, this.query_user_string),
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        }
      };
      params.callback_url = '' + location.origin + location.pathname + '#/result';
      (0, _api.payOrderAPI)(params).then(function (res) {
        _this3.loading = false;
        if (res.status === 1000) {
          _mintUi.Indicator.close();
          _this3.popupVisible = false;
          location.href = res.data.pay_url;
        }
      }).catch(function (err) {
        _this3.loading = false;
        _mintUi.Indicator.close();
      });
    }
  }
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'HeaderNotice',
  data: function data() {
    return {
      language: _utils2.default.getLanguage(),
      tips: ''
    };
  },
  created: function created() {
    this.tips = this.language === 'zh-CN' ? '当前报告已购买，填写信息后可直接查看' : '當前報告已購買，填寫信息後可直接查看';
  }
}; //
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 136 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 141 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 142 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 143 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 144 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 145 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 146 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 147 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAWlBMVEUAAABmZmZmZmZmZmZmZmZlZWVlZWVmZmZmZmZlZWVlZWVjY2NhYWFgYGBmZmb///+0tLT5+fmFhYX19fWOjo6pqant7e2mpqZtbW36+vra2trW1taxsbGCgoLezhSHAAAADnRSTlMAzNf468SkmGhYRCEVCBbLyBMAAADmSURBVDjLlZRbEoIwDEWTQgtauRUfgK/9b9MRCy0YKJ6vfpyZNHeSUIwtDedZlrMpLcnsNCL0TlD2CjPUfqZUBQSKKnYODBE+RI7CAmq0KsYiPFQssELh+8Iq3x4VVlF9hkjwSVVD4vW4n4bsiSwkTmfnGngslUuOq+EpySw57gqPIYan66bOMQRKuX+17tbKDnLK/KvuC0gOslFq/DeCE6Sx3KXureDE5RgTq/51wGQwsQQHZggzWMEJYVrEluTAEumJJTh6PiqXpzgq6aHbPr7pRUiv1OblTK95+mCkT8+/Ryx9Dt/4hThyBB2vcgAAAABJRU5ErkJggg=="

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAP1BMVEUAAADGxsbJycnGxsbGxsbHx8fHx8fFxcXHx8fFxcXHx8fFxcXGxsbGxsbGxsbGxsbGxsbHx8fFxcXHx8fGxsZiOZ2uAAAAFHRSTlMA9gTWzKZkNyEXCevm28SYdWhYRGKkXAUAAADWSURBVDjLjZSHCsMwDEQleTs7vf//1obSFpNh7sAYzANZ66RV3oIfVAcftiy3sn1Go3m3K/NygIaYillJMSjgXiekLsAUa/MQJ2CpLVM8dLVT+FXhS8M4jEkuSiPcn6oe7jab7OB/EReMLdNSI5ZvXtAkD0qKT47msMqjVjg7rh2TPUM2YT+uGVE6iphFMrT2oKrIsiFIVwHbcWIfigjikfpQgpcBpQ8VDKKwPmRQCqLCUR+nSkAVk2oL02BqVKihY8aXWQRqpZjlZNacMQzOengTo+zwDbP9D0E4r4ZZAAAAAElFTkSuQmCC"

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_logo.557612d.png";

/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAJ1BMVEX///9HcEz///////////////////83Q4rR1OSepMZFUZI+SY5pcqh0E2PnAAAAB3RSTlP/AFfTx54biMdLeQAAAOVJREFUKM9tkj0OwjAMhZ/6g7oWUWYQiLlCgrnlBFRcgJ9DRKgLK3TpBiMbK1vFHTgUiZsmKfIb3PrTk+M4Rkw67uCvFu0/KM5B2lg0g9ayQwmMihaNM4uCA6ETHK0JZS4KFErQUyHRpI88idI+8mMM8acpRjaJvhcZc+wtuomnjAPY6tFLvFV9bB2TqOUnROqYznQkZfePNWk1ZW1MWipzTKpWJcqHMfmEokaUxuS3TVRCmEph26q0mUqevlBljxvoa0eN6SnvhnN1hsOMkBs08xzMo3FPyywAsybcMnErR4uJbjF/Y7Y1OZ/qIf4AAAAASUVORK5CYII="

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMBAMAAACdPPCPAAAAD1BMVEWNlcSLlcGNlMVHcEyNlcMQ3UCzAAAABXRSTlP+GVgA1hVh+HEAAABMSURBVAjXLcjRCYBAEAPR4bABWQtYtIK9bUDB/msyOcxHGB4V7VWQY1UOkksxGRwYk4e6hZMtaKOoaeEpUgkRuYQil1C0qt74q3ffB23fD3p2GpbWAAAAAElFTkSuQmCC"

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAFVBMVEW7noNHcEy7noO7n4O4noC8noK7noPFiELJAAAAB3RSTlP8ANRmGTuhGhYvCgAAALdJREFUKM9tkksSwiAQRFuiWYshWWP5WQdL9yZewMQLBO9/CAkJZUa7q/g9BgpmGjrq8QbO12mO2F8QdfiiHvmtMa8Bp4SqeTsE+wkZm+lZtWoialWXUGmPEY1DUqtGVI3BScb6gJ4bvVBYQVu3RIXSCE3IOuwyieo97iuJtmvUXqIqw+AkKnLYTqJSAY1EJiRJ/4ij/4PkevII8lTyIfJtkhySQpZoUg5SNFZaYgBiE2YmZjlpzA/FjzWpQABVlAAAAABJRU5ErkJggg=="

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAJ1BMVEVHcEz/egD/ewD/egD/egD/eQD/egD/eQD/egD9+er+lzX+uHL94sA73hnTAAAACHRSTlMAzg7yYDKYpFfRdSQAAADlSURBVCjPY2AAg5BC42ZxVwYk4NgBBiIIkcAOKBCFiah1wEESRIRJAiHUqAAWUuxAAkLoiqDK2DpQQAJQKAJVqBUoJIEq1MjAwNKBBhwYGBGcrjMrgKQAslErZ54Akk0MHghFM2fOAFItDBVIimbuAFLtCAuBimZDrLQAkjtnIxR1NIOFQByYIqjQSSAPpqijAywE5O6CKQKqkoCYPBOuqBHiCKAymCKgIzygDoApAjo1AurM2YjQYYS6E6YI6G1o4KxGChwsQYgtoLFEB5ZIwxK12BIAlmSCLTFhS3KghGlhDEuYAEF3D9MyjUXbAAAAAElFTkSuQmCC"

/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY4AAAAkBAMAAABs2sBzAAAAIVBMVEVHcEw7Ozs5OTlBQUE/Pz9BQUFBQUFDQ0NDQ0NEREQmJiYNb86cAAAACXRSTlMAXK01FYfR5vWSEMIWAAAGpElEQVRYw8VZzVfTWBRPm1fUWYWPKtlVsIzdpZSqdRU+BmTXAoJ1BQhqXAEiTneK4tidTaHNXc6Zo4v+lXPvy3t5L7UcjecU36Jp0pfk/u7n794axq+tkvuDDbN554cPKY8bv3t5vgKSXx+wwYaupZ+vTPNDUUf3CHb6b/sz714pjjpsK0xwhx/Z5obasAqQ029YDTc1Oxq6TN8e/twzY/O2e4U4DrTvbfw0xzzoKAGuA1TjOAKHY26pa6ypn/FVAbAq8H7o8l87QSdivmNrmrQRx8IM0FJGGkGB+gTMRZiVBjp9z0f4FprJGTYOfMcdw4QLHUcFzklsWjkdh2PM6fEicJzHAsTve34awEUzVYcf4PjqFIAN1UjIGygb8z7VyhC4Oo7sXQ1XPbSPDV9iUpNfLa7rVwLaaw0dxwMANEqnAi+6TuQLKNvshnENLgwdBy51oRGq3oZ32sPYW8sobuoemCEcIxfDD/AMdFFgv4BCHkc43ucZxrjKYYvZMFyUo5sAH7/HYRTXXtKuto6juLbuDB8Ha7YoZnVlX8Pv1Uk4bAaOuiCWpeKqKnGQ8y0tlYrZmQYEfJeKkhSddq8i725a5OsAn/IT/Hx+rYln56YHURLNhBh2a+OlKM+J2LHh/d3XVEdoQyDRyqzFsi/70t5wY/008KSmGZeoWzUWtNcj0L/jKdUW1rNJeMcIVUHrJF8bLfGUwYprDXGxfQUg/rLMwHFtsMq3ZUKF1y43QieKhtpEOo7Do2hi2ajKLNPxswadzUgQ8Pb5xtBRmGPNzsIHkv6F8PjU7i0uDWlYIx2Ig03obm/NvpCOhNvNRpAfH9ELTggj+PXasewkyrroCiXhAW2ZYrfNHOaxmwhkQ+XdbiGw1Fkw8SAE0SotUqTMO5yDWcai2HKf9FBzCslxZPgd7NV/CWgJaCs4lELuPXHq8IFRMt4XWrkXy0NorAu0yVEtVgcr0Flca+4JS3sB8UM7eZA//crN0ev9vEHMpt+AfRKxeTanlP22tYA+8yYjqUk5LAtR+TCblKXLEyT6F51e8WQlsixzWPlurhIvMD9jjl6vSubo9RIYZHYOeesT9I564Gile73RLaLU96C7IUghX58UaxJJOYajAbEsm8XUfXE9cbJ62ut95ebo9Wqjg9ZAM6VQIHYPOpof34eLesfCip21RJtEpGR/zotEsmEKb6MHVjSeaEKsnqa5r6bhUlKSGijlGAGoGq96l67coIelyXFuQKsQUY5ZgJ3aUimrVfgV6MwZLNI0eiMxwgJ2iDqONFWPbHQXhVf3duo7Kh+tPy4X9V/jIR12pwatgYljhAqgDQceuEaN3n6Te8ZImFNlPHhorVTESlagSjiIpes4HiFHp12Sp2WayMHY5c1HeqCUMwRgzzB73L0S8ER09AJYHvLSKZnBtkNe9HxKirAMviupCHL6Z5yhZ3ivd66Fua+IF60C/Zg08VKAf8MXPeTh/vO3NXx0bB8LtMs+Sy61TfMRYtxqF+zVpcMsH4adBl7UcSCjafNQchWwd4ZZCIlxgvpH5kAfSGQO1FcH332MOKbHuOYKMBnGAQSsmFcFs9uUDlPk7ohmtLuuhiPNc/SqFg9I/Oe9re96xB8a5BvXxMNkdmxcGDamfJ77adaQmb4BB2yxNIo1RfEMUyftEkf6DsZHW1XBwFUEMkxrR9BKUYCwJMx9OaykLBGMMnw0aYRjK2KyCgeyYKhJhw2xxDMi6ocd4WDh6KSujUxQN9hkoksamSSNbSLQIoVjne5sTcu4yAnFHqQljpbmNR1Hn4P04xDDq0bkaCY2uKGGfGN1yA16KO/pOu+f5BwRcTDvBOO8tBTnHGf6+Kofh80JiRm5YsoT5qSJUWHIAxN03hNC8kZR8vlRD+OEoUTd+HwI1zONEra0mV1IuY4NhxRjqcEEtyD+4g+7I2SNQ8PcIhGPakL7I4IhxXCg8wPpdzqOwyw2JI4VErq+W4jSLlWgamTKYXeEZXrrmCTuzeNQ5ByXQ8MxiT0i98GdGI5UU0qId+0RGI3be9J8mdjAaKi9rRcC4SOsldA1dBzYfPgiNZ9OiMalJZqlL6Lgn4nsHGWG5WiEj0YKrmZUbRY4jr3QITraQTBH35Ex4guvaQvn4WFtNk5dIbGad7t6NnGuBIfBNlU+qr8OK5/wEIyfIPwX45bWHxbCyPXC2dTkvivcresMnOb7xlWt8nP5l4spYkLEZurxuJCNbR1Fo1tRbR+Ef5XIXjLzz8DRiPnYMX7bYr/x3cb/lF0rRVjtFCEAAAAASUVORK5CYII="

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAkCAMAAABvyu7iAAAANlBMVEVHcEz/BQj/T3f/V4f/DRb/DBT/Dxj/Nlf+S3f/XJH/LEP/2Yn+X5b/Gij/QF/+ZqH/q3n/e2tCWK5wAAAACnRSTlMA////qGz/G1uoaCu0HwAAArxJREFUWMO9V4uyqyAMpGrRYqHh/3/25kEg4GPmzNw2IIaw2Q3odKpzYuv2+nzZXtvqrK1fVyy6RnZ7f4Z2CPxp+RxA/bM1zR/aZjTnvo/z/7csqutM9tY+63gSaqMuvI9rb5s6cPAaPdfX/GN76UZ/aqvbJmtzd7PBNkyY18NOswxuWNrciyNCmfddnH2HGgSJTQC5JO37Xslgz5V11oX5EscrL2dLgALDO5gY+1hQ4S9kOQPhS52TFZ3ucROKJm64mGkR6o0kEqfmKp6EDISSDQ+A8xPXJV7FpQ6nSy6p6H4w4uEqAcotc3FURp4kkEt6ogFDSpfOcAp1qdipaMp9BFok82zi1DKwqNoJro6u+bj9zBsGcbOkyjbL2IoTss74SYjd4tpOD3vVeuUhl5Fg5QVpCtOBwODSEWdF87nocLxocm/RrAxD8iXOhRRK5wcP+OrgwHkYzPwa7PIyEQnGuHboyAK3VAiw3eKCC+pxZQCiSqIUG48Xq8u5PqvygiYtHGdMhZbucC5UG4/3JAYtQmQkA5ybWIdEeZJucNiNKK2U04EL0SzbISfzTMmUYO8mF7jQ7xTKe5ZVtK7kNsm641vRG9ywU2sUOv5gpFAYgP0b0WscikZt8raJEX08Ew2IZAYRIJeSD6LxHCfNiA7HS1RQa1AvRCZjcHGl3PFEznCUTB1F1cbjrQuUmdUPXEIEDjEZ346iJzhVdcsfRYkGZxiKVlR+QNoVznDFFvesfjDUYEU9PulkJwQLjMVj56AOel3gxJ5ubRPvrW/yjcsLEvBRmvTq1+b9gCvYiP9BF68W7T36Q7xMYo0OXjRXQ8aRa6E/2x3n9y3yR9T2U81H+Zh5+scD+4PH2h81eh0fAD3WmOfG/Vk/23zHMOD7uB8X+hr8mNnn+818FC+Pn9gyfIs/F/9dQb88VfIfuuCRPaiDitgAAAAASUVORK5CYII="

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAGCAYAAACclRsMAAAAAXNSR0IArs4c6QAAARdJREFUeF7t2dsKgzAQhOHs+z+uiIhgChWhSRMIoqUXX+96gJTfndnZTUzTlJMXAggggAACCCCAAAII/DWBmOdZcP/rR+TPIYAAAggggAACCCCQUizL8hXcI+LNJufjq/P9Cez8/CmAzsdf/dEf/+G/+o/+K38ceUD+OgjInznFuq7djfuoYOqgfVegd/6YYPEvBx31dw8B+qO/kcDAf/jPE4GK//Af/tMe2GLbtlwLZLTt1xuxehIa3Zw7vxQo/mME1F+5kaW/cgfBf8Zu7vgv/x1z3PJX/Jf/ft6I6T+/6z+x73t34967kuhNwlcbQM80nN9+NPi3NxHq71oAob82Af7Df1qVwX/5b2sTrP/oP1cG4Cv99wW40NWVd1AvSQAAAABJRU5ErkJggg=="

/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAlxJREFUSEvNl01rE1EUht8zSRuNJoIKSnFnUKimcfxYRSWK0zhBRHHlbxCX/gB/g4qLbsSVEKjfCWQMRrB0JVNLFeNCRPwqFYraJMQk80oSquTDNDdpTWd733Oec957ufeMYECfDIiLtuCAGfC4hnYMV4vKLTjlj9PThYBpenyoPAV4uLlYijhCTthJ63J1bTQS2Vzxl2q5s56RPOLxSnNMA/hQ9ORBx+W6BUjwr5CTdsK6EIydCrqhzf7LIQKLM4nU1uq6HjMWANle05IlCu66XKVLLx5mvi3HN4APxMafCxBuSE58Xiz82v0+kynqMeMmIC0dA3Qc8vbL5JProWh0n+biXEuB5B07aV1sB9Z0c7wIgbvFSsACnBuAlu90JsTBNmi8Csielhzk0kzS8rWA954N+7zlTT/W8rDlv+f82ampn1XGH6v/C9id82cfrHcwwbgQb1S2gCK6AGeaY/Jdd0yyWCj5X2cySypg3TBGMCSfegfXI58B/KACBiQEYKxfsBqzg7p7q1cNWU+kBibTgLxVqYFgUESO9mM1K2X4ZlOpnAp4NBbZ6cHwl37AIHBPIO9UwACPADjWF1gN2FmttserSFYBl0FMAOz68WD9/jdERO/dauKVnUztV206dNo4r2ky2Tu4OkAAjwT8qgIncFzavMkqVqvwVtSuM3A47PNuWeMJpN2zWJ1GdNPIQ2TDip71IiBLdtLaCKA26jZMmbppPIZIrJe8XcTctxOpc8u6BvCYGdmlYfiaACcAertI1lFCEQoxD2GmVHSuzKXT823B/YJU4gf27/Qb4EdILpANSkYAAAAASUVORK5CYII="

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAl9JREFUSEvt1c9rE1EQB/DvZKVBKp49BHoRxaVIUhSJ4EXM1sSDKAqCNz3YHryJB716EAqCh4Ii4h+g4iH0ad5WKEGMPwibJqZipQpSFC8RwVar3R1NmqSJ2R/JdnPrO+4y83k7b3YeweeKxONbF3O5nz7DQX4CY0ltHOCbFuHirNBv+8nRM1xFGTxJRARmBtEVQ8jrveI9wW1oi8TAREHIy73gXcNOaAOzgLuzQl4AYHazga5gL7QJMR6sbFs8O3d/7rcX7gl3jdYlZkjLxMmilEtuuCvcK9ry5bnV0PKx0tSzb064I+wbXddLv8zQ6NtM5osdbgtvHG1SC+YqEkUpP/6Pd8ABomsW47NpYrQo5ZtWvA0OHF1vuIpFSBWFfNnAm3C/0AbEzD8oZJ0wpp5OV5/V4GjqyHEwPaqNwT4uBlZgWUcLT6Zn6nAiSqCxf6NvkIAzALYE7TPzDIi+m8CNkpDZzuZKaa8B7AsW5k+G0Iccm2ut7NoLAg4EC+O9IeSuTbitql6lZsAiwABQm8MMbCdgxKMhgyg1nTJE5mHrbkeS2mGLoBMQcuiNjcEM/loQ+g675LFUogyQ2hcYwIIh5E5bOJl4BaL9m3C9At5nHEtpWQCHHErmr9SMsvFYDrsPkKR2jQhX7WAGzxeEvtv+jLXnIMTtN8y3DKGPu8J7NW1QUZAF1f7NtsXgewWhn7NLHk1qE0S41BmDd39MOljOZCqucPWlqqoD4aHIeSZrmEBKdU4w6IOihCfz6fSyHayeVgfCS5ExMO8BgRhkAjyvKJU7+XS+I6av96/bRfMXGNMoLpD5my8AAAAASUVORK5CYII="

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_close.3e73550.png";

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY4AAAAkBAMAAABs2sBzAAAAIVBMVEVHcEw8PDxCQkI6OjpCQkJCQkI+Pj5DQ0NDQ0NEREQmJiYQoMFbAAAACXRSTlMAWjarzX0U8N7pwkQDAAAF/ElEQVRYw+2ZS2/TWBSAr93a7cwq4SV550kptKxC01d2hYaCWbktLgqrFFBKd9DSQnaFDlK9I3GCc5Yzgk1+5Zxz7/UrvWGwRh6NNBwpTuM8fL7zPi5jP0VKu608bVZaf//d/f8Qx+JQeXoWqumX00viWWtsJSfnOqVL3/sFXPNB4UrfxAvfbKCUlukYcRy8iyRWbDrLYYF4R4MvyclDOFNwVBdgtWAMAwakEkrJp2PEcQiRTOJwQnaZYwq6ly4xA64BQ7tYDr0DLrMG5evI8aF8LeEIyk63DHevpjjCNIdOBrjEYUJfwVFFSx0V7JBXqI/VRW1K/hmaPOYYsPpnE1yNONpcXsGq+ENa/ouCg9XBVnHonW7BHLoPJSuoLSPHcW1NyaFDVnjZWkQ/pjjMipDmPfFsj9WHBbvoRL8Np5n8eF6xhpVbh33PGXjwYHcShx+20hxTY5+psqmGlIfwttF41NgomEMLbSvwPM/2T/BIhkbppfPcVHBoMNDLXK5Dt3xDwTEzduZz0Q7Zo/xgho35wV7YkuMlGtIHMqcdxcwCLIk/6EsHcGokOnYVHLP/mONl3lhcDCoVq+u8wfDusYWLDrw/UvTDTN114HWGg9eCRdhrt6NaYHhSngA52nNzNAP+WfPxnzk5DrgL6nQ8k/pT0DRDPFxRciDDay3DIXK/pGxRr3Pq8+wbd8dolNMhGqW4+wIPoS054jgJlBwYfJFyqbprTeD4krM3j0YuuWM0yusQ9tzDdPb22i32QxzYPdUcKgNqeTmejUbfuDtGo+2yShRXoSi26VrYq2AjmRNNjHFrKLuexuunQ/WzcW7z5qnkaEJLydGbFAdKLa8SgMsejyZKlSmGOIwovfIb3MfHx8qtdH7HeW6k606PG/6EOHQ3y1GH34V8oFe7NSE6TOrlv05W9Q92h542aypx1RylpEQGQv+rR+QAP6RjdYzjjHe9eeTQnd44R4o1fmVGk9glmVJquU4AW0wf8fD6QZnaXQc34RiIMIduojcGm+49BVlEHZ7KepeKkOkPsxydDEdTvmB+kCs9KMG/YoDe4en+wzINJQ2b8j18fKAqu79GPDhJUDa84/5Ipim9I2LN5sXUorMJhwmB7PD8zHWkHtKI4PRz9j9yB14rhzs4h5vJczLjJ0xm55QsfD/aK3ryw91UU+BnEw5NvqnFvbvOPVEPWU6HfOX14o6bj6NE20TMgVHFbV7vkkayhJmdYUvEfDXFoVM+JRzRKJ80PsGhLsffc4jYlE2Wj2MHg4hqKj022OEDa0hjhtVvt1/CjXbUGra4hsNWukk30QYJx6ykNuLlVnCo2/z3HNJi+QU5MtOcyettMz4T2brforNHmWHjADVOOCyZRFORFyXHDFT/hbsj03Clsbz5cLOxfIGPquwb4xwYUR9RwdDOcBjQTXFEu2DS+AXHtOLmQxEcNMw4n5jWWU363zwWmmbo8Y1Efiy84iRbtuAw36fiSo9285loVZQcBpWDuVbhHDhaPUVrGx3YY8p+zmOW2lpy10Pmsp3K89molh2OcfBbEotviveHvgYBmusFhK7Un+96fG7HXS/KEIAtxTAeczTj+SyuT8jxfPeMUb+0goI5XsHxHIS8otyM5pL0eieHPP0pjS32ZA5cR+zxcbE+XAd8m8pac1Dweo7DxMmaCCizuTSJY97hL4Y7Ezma8RhVl/G4v9sRP0BlrV7sjR8M+8CBYxk8plkRHHwlt4Z0pBF4f52cUaEUOd5pKTkMiKqULrxqPBTkKzZaJWB+r+Co6tu0Dr5v1GqNRx2qo+VmP5vn8zRxwbHNdD7ChveTeoX5c41PIbrPq5WJP1MX+c6H5P42UZs+nOdebvNyYO4afhxFpxRSQZbjNr1xlyv0RNwLif3hyImYNqtqPORuCLfA+U7cIaHgXqi/Jf30J5IkrFK+HmU50LLnUdWiCLMTDn4Hz+YmP4kWd177UFZupFZCCAvuH9HF2pgJfD03ayvykgvnMmtSGuEqvy3+68Hte/DuYlPUiDlRrPY9b1sxFc5dLLH/p/wFq4Q6M9ESh+kAAAAASUVORK5CYII="

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAkCAMAAABvyu7iAAAAM1BMVEX/Nlf/Dxj/Gij/2or+Ypr/VoX/BQj/OFj/XJH/DRb/KkH/THb/jHP/OlX+Q2b/voD/ZWFp1oqtAAAACnRSTlME////////YKiogdhEJQAAAshJREFUWMPFV1mCqyAQRAjj2IJw/9O+3pBNMl/JKxGxqa4CXBKNUey/rw/jdzc9Pu6ovo3l/voa9v/gebuip8ftC/DV9eW/ihffQ9QY4lNjJfBH+PUUprvJfx14Rf3Jm+eday5anSVeuyut7W7Tq97pm2bZdvN7VoTkPB29S8lL5BWoeB8QWHHQuaQJGE/hTvcppUZtyfs1LSs55/SYSh4jBG00YjiKxDFf0nMhdKYz70TTiwt1Bta/D5JHp7KnzlSH4WgKFyv4R9OWV0wvTODiJuTrIrLOlIeL4jqmzDohYyrnIyh0FTzyFOYmzabISwKcpUCUeUSodbVK19mZdrwBprIEdD21SdHQIb8Vo3HnwNtfpjFiQVw5JVlDR8d0UkceFpxomYd1yapROaOIVHJa8KIwjRj2OcUAOzgl6f0ksSiilRmioDN9w1PTkpPKOtLVUVOH15N6qL5NQ1qYav5bHpkCFVibDrPP4b5WZQWJCUJWWVjyqM8ARN2G5Y2AiMzGOQauM0B5TdCTy90kAFyRgJxgveLRwZQm57Qzlek7fVJ1pqBDy7QuKhaLHJFBJgFwPfOYaQCWpqrTLi+G6HFPPOOsMyhQU8WaN5hOywv8wAZeXoQQWUEW+43pmgfGggUqYKeZWugWlxtEZQUx4KZ9NLUjz0LxMtq2Vm8agcjb+dVIROTxCLVpx4vA6zTzio8l04I8pVl9qSV+c/NmgZ9aS6tWTO2T6QOPrcjWHLdpnOZUEDiznrhAtb1NIU2ITzzFYfZqir8mVseDadV0w7dRNc0p0EnMwgt2gTUP/4Te0s1OFZey2e1uN/HKG8qKKA38N3hsA6zufdsO+5jR1T3J9qyD/viOEh+Glc+K75qWj5ntR7Za6nFsc4sDM3lI3NqOEqufbVWyUW7Ey9lWtR/Jg9+surUfxsfPV3AM3+L7sX3WcDvuWf4DKUxnz0pfJmYAAAAASUVORK5CYII="

/***/ }),
/* 163 */,
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(143)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(127),
  /* template */
  __webpack_require__(177),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-89447d96",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(196)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(187),
  /* template */
  __webpack_require__(218),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-54458266",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(142)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(129),
  /* template */
  __webpack_require__(176),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(147)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(130),
  /* template */
  __webpack_require__(180),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e5fc7b16",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(145)
  __webpack_require__(146)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(131),
  /* template */
  __webpack_require__(179),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b472e8d0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(137)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(133),
  /* template */
  __webpack_require__(173),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4fd07d66",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(139)
  __webpack_require__(140)
  __webpack_require__(138)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(174),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-63305da5",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(136)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(172),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-47afd250",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header-notice"
  }, [_vm._v(_vm._s(_vm.tips))])
},staticRenderFns: []}

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pop-notice"
  }, [_c('div', {
    staticClass: "whole",
    on: {
      "click": _vm.closeModal
    }
  }, [_c('div', {
    class: {
      container: true,
      'normal-box': _vm.product_key !== 'h5_marriage',
      'big-box': _vm.product_key === 'h5_marriage',
      'cn-bg': _vm.lang && _vm.product_key !== 'h5_marriage',
      'tw-bg': !_vm.lang && _vm.product_key !== 'h5_marriage',
      'cn-big-bg': _vm.lang && _vm.product_key === 'h5_marriage',
      'tw-big-bg': !_vm.lang && _vm.product_key === 'h5_marriage',
      'pt-182': _vm.product_key !== 'h5_marriage',
      'pt-190': _vm.product_key === 'h5_marriage',
    },
    on: {
      "click": function (e) { return e.stopPropagation(); }
    }
  }, [_c('div', {
    staticClass: "one"
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": _vm.getIcon(),
      "lt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.product_key === 'h5_marriage') ? _c('div', {
    staticClass: "cp-box"
  }, [_c('div', {
    staticClass: "male"
  }, [_c('div', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm._f("filter_name")(_vm.male_info.name)))]), _vm._v(" "), _c('div', {
    staticClass: "birth"
  }, [_c('span', [_vm._v("\n                " + _vm._s(_vm.male_info.birth) + "\n              ")]), _vm._v(" "), _c('img', {
    staticClass: "sex",
    attrs: {
      "src": __webpack_require__(105),
      "alt": ""
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "male mt-30"
  }, [_c('div', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm._f("filter_name")(_vm.female_info.name)))]), _vm._v(" "), _c('div', {
    staticClass: "birth"
  }, [_c('span', [_vm._v("\n                " + _vm._s(_vm.female_info.birth) + "\n              ")]), _vm._v(" "), _c('img', {
    staticClass: "sex",
    attrs: {
      "src": __webpack_require__(104),
      "alt": ""
    }
  })])])]) : _c('div', {
    staticClass: "single-box"
  }, [_c('div', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm._f("filter_name")(_vm.user_info.name)))]), _vm._v(" "), _c('div', {
    staticClass: "birth"
  }, [_c('span', [_vm._v("\n              " + _vm._s(_vm.user_info.birth) + "\n            ")]), _vm._v(" "), (_vm.user_info.sex) ? _c('img', {
    staticClass: "sex",
    attrs: {
      "src": __webpack_require__(105),
      "alt": ""
    }
  }) : _c('img', {
    staticClass: "sex",
    attrs: {
      "src": __webpack_require__(104),
      "alt": ""
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "divider"
  }, _vm._l((50), function(it) {
    return _c('div', {
      key: it,
      staticClass: "line"
    })
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "two"
  }, [_c('div', {
    class: {
      left: true,
      'rgb-color': _vm.is_show_shandong
    }
  }, [_vm._v("\n          " + _vm._s(_vm.tips1) + "\n        ")]), _vm._v(" "), _c('count-down', {
    ref: "countDown",
    staticClass: "time-box",
    attrs: {
      "time": _vm.time_,
      "millisecond": ""
    },
    on: {
      "change": _vm.getTime
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(timeData) {
        return [_c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.minutes)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.seconds)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_c('span', [_vm._v("\n                " + _vm._s(_vm._f("filterTime")(timeData.milliseconds)) + "\n              ")])])]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "get-btn",
    on: {
      "click": function($event) {
        return _vm.toDetailPage()
      }
    }
  }, [_c('div', {
    staticClass: "text"
  }, [_vm._v(_vm._s(_vm.tips2))])]), _vm._v(" "), _c('img', {
    staticClass: "close",
    attrs: {
      "src": __webpack_require__(160),
      "alt": ""
    },
    on: {
      "click": _vm.closeModal
    }
  })])])])
},staticRenderFns: []}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('mt-popup', {
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.popupVisible),
      callback: function($$v) {
        _vm.popupVisible = $$v
      },
      expression: "popupVisible"
    }
  }, [_c('div', {
    class: ['pay-popup', _vm.expand ? 'whole-pop' : 'small-pop']
  }, [_c('div', {
    staticClass: "pay-header"
  }, [_c('div', {
    staticClass: "pay-title"
  }, [_vm._v(_vm._s(_vm.tips_1[_vm.language]))]), _vm._v(" "), _c('div', {
    staticClass: "pay-close",
    on: {
      "click": _vm.close
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(95)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "pay-wrapper"
  }, [_c('div', {
    staticClass: "price"
  }, [_c('span', {
    staticClass: "unit-text"
  }, [_vm._v(_vm._s(_vm.unit))]), _vm._v(" "), _c('span', {
    staticClass: "price-text"
  }, [_vm._v(_vm._s(_vm.product_price || '-'))])]), _vm._v(" "), _vm._l((_vm.new_pay_methods), function(item, i) {
    return [(i < 2 || _vm.expand) ? _c('div', {
      staticClass: "item",
      on: {
        "click": function($event) {
          _vm.index = i
        }
      }
    }, [_c('div', {
      staticClass: "left"
    }, [_c('img', {
      staticClass: "icon",
      attrs: {
        "src": item.icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "name"
    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), (_vm.index === i) ? _c('img', {
      staticClass: "check",
      attrs: {
        "src": __webpack_require__(103),
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "check",
      attrs: {
        "src": __webpack_require__(102),
        "alt": ""
      }
    })]) : _vm._e()]
  }), _vm._v(" "), (!_vm.expand && _vm.new_pay_methods.length > 2) ? _c('div', {
    staticClass: "expand",
    on: {
      "click": function($event) {
        _vm.expand = true
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.tips_2[_vm.language]) + "\n          "), _c('img', {
    attrs: {
      "src": __webpack_require__(71),
      "alt": ""
    }
  })]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "pay-btn",
    on: {
      "click": _vm.pay
    }
  }, [_vm._v(_vm._s(_vm.tips_3[_vm.language]))])])])], 1)
},staticRenderFns: []}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.product_key) ? _c('div', {
    staticClass: "marquee"
  }, [_c('div', {
    staticClass: "marquee-wrapper"
  }, [_c('div', {
    staticClass: "marquee-box",
    class: {
      scrollmarquee: _vm.scrollMarquee
    }
  }, [_c('div', {
    staticClass: "marquee-text"
  }, [_c('div', {
    staticClass: "marquee-icon"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.curMarqueeText))])]), _vm._v(" "), _c('div', {
    staticClass: "marquee-text next"
  }, [_c('div', {
    staticClass: "marquee-icon"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.nextMarqueeText))])])])])]) : _c('div', {
    staticClass: "marquee",
    style: ({
      margin: '0.28rem auto 0.44rem',
    })
  }, [_c('div', {
    staticClass: "marquee-wrapper"
  }, [_c('div', {
    staticClass: "marquee-box",
    class: {
      scrollmarquee: _vm.scrollMarquee
    }
  }, [_c('div', {
    staticClass: "marquee-text item"
  }, [_c('img', {
    staticClass: "laba",
    attrs: {
      "src": __webpack_require__(99),
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.cur_marry_obj.desc1))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.cur_marry_obj.desc2))]), _vm._v(" "), _c('span', {
    staticClass: "light-red",
    on: {
      "click": _vm.jumpHome
    }
  }, [_vm._v("八字合婚")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.cur_marry_obj.desc3))])]), _vm._v(" "), _c('div', {
    staticClass: "marquee-text next item"
  }, [_c('img', {
    staticClass: "laba",
    attrs: {
      "src": __webpack_require__(99),
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.next_marry_obj.desc1))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.next_marry_obj.desc2))]), _vm._v(" "), _c('span', {
    staticClass: "light-red",
    on: {
      "click": _vm.jumpHome
    }
  }, [_vm._v("八字合婚")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.next_marry_obj.desc3))])])])])])
},staticRenderFns: []}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bar-box"
  }, [_c('div', {
    staticClass: "psychicai-navbar-header",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('div', {
    staticClass: "left-home",
    staticStyle: {
      "vertical-align": "middle"
    },
    on: {
      "click": function($event) {
        return _vm.goRoute('/index', 'h5_home')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(159),
      "alt": ""
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "bold-text",
    staticStyle: {
      "display": "block"
    }
  }, [_vm._v(_vm._s(_vm.tips1))])]), _vm._v(" "), _c('div', {
    staticClass: "title logo-name"
  }, [_c('span', {
    staticClass: "bold-text",
    style: ({
      height: '0.36rem',
      'line-height': '0.36rem',
      'font-size': '0.36rem',
    })
  }, [_vm._v(_vm._s(_vm.tips2))])]), _vm._v(" "), _c('div', {
    staticClass: "right-order",
    staticStyle: {
      "vertical-align": "middle"
    },
    on: {
      "click": function($event) {
        return _vm.goRoute('/history_order', 'h5_order')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(158),
      "alt": ""
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "bold-text"
  }, [_vm._v(_vm._s(_vm.tips3))])])]), _vm._v(" "), _c('img', {
    staticClass: "divider-line",
    attrs: {
      "src": __webpack_require__(157),
      "alt": ""
    }
  }), _vm._v(" "), _c('nav', {
    staticClass: "psychicai-navbar-banner"
  }, [_c('van-tabs', {
    on: {
      "change": _vm.skipPage
    },
    model: {
      value: (_vm.activeKey),
      callback: function($$v) {
        _vm.activeKey = $$v
      },
      expression: "activeKey"
    }
  }, _vm._l((_vm.tabList), function(item) {
    return _c('van-tab', {
      key: item.key,
      attrs: {
        "title": item.value,
        "name": item.key
      }
    })
  }), 1)], 1)])
},staticRenderFns: []}

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['more-content', _vm.className]
  }, [(_vm.set_title) ? _c('img', {
    style: (_vm.title_icon_style),
    attrs: {
      "src": _vm.title_icon,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "logo",
    attrs: {
      "src": _vm.is_black_logo ? _vm.black_logo : _vm.white_logo,
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "tips1",
    style: (("color:" + _vm.tips1_color))
  }, [_vm._v(_vm._s(_vm.tips1))]), _vm._v(" "), _c('div', {
    class: ['code-common', _vm.codeClass]
  }, [_c('span', {
    style: (("color:" + _vm.code_color))
  }, [_vm._v("\n      " + _vm._s(_vm.tips2) + "：" + _vm._s(_vm.transfer_code || '-') + "\n    ")]), _vm._v(" "), _c('span', {
    staticClass: "tips3",
    style: (("color:" + _vm.tips3_color)),
    on: {
      "click": function($event) {
        return _vm.handleCopyCode(1)
      }
    }
  }, [_vm._v(_vm._s(_vm.tips3))])]), _vm._v(" "), _c('div', {
    staticClass: "tips4",
    style: (_vm.code_text_style)
  }, [_vm._v("\n    " + _vm._s(_vm.tips5) + "\n  ")]), _vm._v(" "), _c('img', {
    style: (_vm.tips5_style),
    attrs: {
      "src": _vm.code_btn,
      "alt": ""
    },
    on: {
      "click": function($event) {
        return _vm.handleCopyCode(0)
      }
    }
  })])
},staticRenderFns: []}

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "picker",
    class: {
      'picker-right': _vm.position == 'right',
      'picker-left': _vm.position == 'left',
    }
  }, [_c('select', {
    attrs: {
      "data-role": "none",
      "id": _vm.id
    }
  }, _vm._l((_vm.source), function(item) {
    return _c('option', {
      key: item.index,
      domProps: {
        "value": item.value
      }
    }, [_vm._v("\n      " + _vm._s(item.text) + "\n    ")])
  }), 0)])
},staticRenderFns: []}

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mt-popup', {
    staticClass: "pay-modal",
    style: ({
      height: _vm.is_android ? '13.2rem' : '12rem',
    }),
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.show),
      callback: function($$v) {
        _vm.show = $$v
      },
      expression: "show"
    }
  }, [_c('div', {
    staticClass: "pay-content"
  }, [_c('div', [_c('img', {
    staticClass: "close",
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/240484f905eb6e7b49f19988b0f94f83c430.png",
      "alt": ""
    },
    on: {
      "click": _vm.closeModal
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "username",
    style: (_vm.title_style)
  }, [_vm._v("\n        " + _vm._s(_vm.title) + "\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "discount"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('img', {
    staticClass: "xsyh",
    attrs: {
      "src": _vm.is_new_user ? _vm.new_user_icon : _vm.xsyh_icon,
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "price-box"
  }, [_c('div', {
    staticClass: "now-price"
  }, [_vm._v(_vm._s(_vm.now_price))]), _vm._v(" "), _c('div', {
    staticClass: "origin-price"
  }, [_vm._v(_vm._s(_vm.origin_price))])])]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.tips1))]), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_c('count-down', {
    ref: "countDown",
    staticClass: "time-box",
    attrs: {
      "time": _vm.time,
      "millisecond": ""
    },
    on: {
      "change": _vm.getTime
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(timeData) {
        return [_c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.minutes)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.seconds)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_c('span', {
          class: {
            mill: _vm.time === 1
          }
        }, [_vm._v("\n                    " + _vm._s(_vm._f("filterTime")(timeData.milliseconds)) + "\n                  ")])])]
      }
    }])
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "buy-people"
  }, [_vm._v("\n        今日已有"), _c('span', [_vm._v(_vm._s(_vm.buy_people))]), _vm._v(_vm._s(_vm.tips2) + "\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "pay-method"
  }, [(!_vm.pay_methods.length && _vm.loading) ? _c('div', {
    staticClass: "no-empty"
  }, [_c('mt-spinner', {
    attrs: {
      "type": "fading-circle",
      "size": 60
    }
  })], 1) : _c('div', {
    staticClass: "pay-list"
  }, [_c('div', {
    staticClass: "method-list"
  }, _vm._l((_vm.pay_methods), function(it, k) {
    return _c('div', {
      key: k,
      staticClass: "item",
      on: {
        "click": function($event) {
          _vm.check_index = k
        }
      }
    }, [_c('div', {
      staticClass: "left"
    }, [_c('img', {
      attrs: {
        "src": it.icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "name"
    }, [_vm._v(_vm._s(it.title))])]), _vm._v(" "), _c('img', {
      staticClass: "right",
      attrs: {
        "src": _vm.check_index === k ? _vm.checked_icon : _vm.no_check_icon,
        "alt": ""
      }
    })])
  }), 0)])]), _vm._v(" "), (_vm.pay_methods.length) ? _c('div', {
    staticClass: "pay-btn",
    style: ({
      bottom: _vm.is_android ? '1.4rem' : '0.2rem',
    }),
    on: {
      "click": function($event) {
        return _vm.payMoney()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.tips3)), _c('span', [_vm._v(_vm._s(_vm.now_price))]), _vm._v(_vm._s(_vm.tips4) + "\n    ")]) : _vm._e()])])
},staticRenderFns: []}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['pay-card', _vm.back_url === 'emotion_fortune' ? 'emotion-box' : '']
  }, [_c('div', {
    class: ['pay-card-wrapper', _vm.is_show ? 'pad-78' : '']
  }, [(_vm.back_url === 'weigh_bone') ? _c('div', {
    staticClass: "weigh-bone"
  }, [_c('span', {
    staticClass: "left"
  }, [_vm._v("RM")]), _vm._v(" "), _c('span', {
    staticClass: "right"
  }, [_vm._v(_vm._s(_vm.product.price || '-'))])]) : (_vm.back_url === 'guiguzi_fortune') ? _c('div', {
    staticClass: "guiguzi-price"
  }, [_c('span', {
    staticClass: "left"
  }, [_vm._v("RM")]), _vm._v(" "), _c('span', {
    staticClass: "right"
  }, [_vm._v(_vm._s(_vm.product.price || '-'))])]) : (_vm.back_url === 'year_of_lucky_2024') ? _c('div', {
    staticClass: "year-2024-price"
  }, [_c('div', {
    class: [
      'now-price',
      _vm.is_new_user ? (_vm.language === 'zh-CN' ? 'cn-tag' : 'tw-tag') : '' ]
  }, [_c('span', {
    staticClass: "left"
  }, [_vm._v("RM")]), _vm._v(" "), _c('span', {
    staticClass: "right"
  }, [_vm._v(_vm._s(_vm.product.price || '-'))])]), _vm._v(" "), (_vm.is_new_user) ? _c('div', {
    staticClass: "origin-price"
  }, [_c('span', [_vm._v(_vm._s(_vm.price_desc[_vm.language]) + " RM")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.product.origin_price_str || '-'))])]) : _vm._e()]) : (_vm.product) ? _c('div', {
    class: {
      price: true,
      'white-text': _vm.back_url === 'emotion_fortune'
    }
  }, [_vm._v("\n      RM " + _vm._s(_vm.product.price || '-') + "\n    ")]) : _vm._e(), _vm._v(" "), (['year_of_lucky_2024', 'career_fortune_2024'].includes(_vm.back_url)) ? _c('div', {
    staticClass: "pay-type"
  }, [_c('img', {
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_pay_type : _vm.tw_pay_type,
      "alt": ""
    }
  })]) : _c('div', {
    class: [
      'title',
      ['weigh_bone', 'emotion_fortune'].includes(_vm.back_url) ?
      'white-text' :
      '' ]
  }, [_vm._v("\n      " + _vm._s(_vm.order_style[_vm.language]) + "\n    ")]), _vm._v(" "), _vm._l((_vm.new_pay_methods), function(item, i) {
    return [(i < 10 || _vm.expand) ? _c('div', {
      staticClass: "item",
      on: {
        "click": function($event) {
          _vm.index = i
        }
      }
    }, [_c('div', {
      staticClass: "left"
    }, [_c('img', {
      staticClass: "icon",
      attrs: {
        "src": item.icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      class: [
        'name',
        ['weigh_bone', 'emotion_fortune'].includes(_vm.back_url) ?
        'white-text' :
        '' ]
    }, [_vm._v("\n            " + _vm._s(item.title) + "\n          ")])]), _vm._v(" "), (_vm.index === i) ? _c('img', {
      staticClass: "check",
      attrs: {
        "src": ['weigh_bone', 'emotion_fortune'].includes(_vm.back_url) ?
          _vm.BoneCheckImg :
          ['year_of_lucky_2024', 'career_fortune_2024'].includes(
            _vm.back_url
          ) ?
          _vm.yearCheck :
          _vm.commonCheck,
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "check",
      attrs: {
        "src": ['year_of_lucky_2024', 'career_fortune_2024'].includes(_vm.back_url) ?
          _vm.yearUncheck :
          _vm.commonUncheck,
        "alt": ""
      }
    })]) : _vm._e()]
  }), _vm._v(" "), (!_vm.expand && _vm.new_pay_methods.length > 2) ? _c('div', {
    staticClass: "expand hidden",
    on: {
      "click": function($event) {
        _vm.expand = true
      }
    }
  }, [_c('span', {
    class: {
      'expand-text': [
        'year_of_lucky_2024',
        'career_fortune_2024' ].indexOf(_vm.back_url),
      'white-text': ['weigh_bone', 'emotion_fortune'].includes(_vm.back_url),
    }
  }, [_vm._v(_vm._s(_vm.tips_style_1[_vm.language]))]), _vm._v(" "), (['year_of_lucky_2024', 'emotion_fortune'].includes(_vm.back_url)) ? _c('img', {
    attrs: {
      "src": __webpack_require__(152),
      "alt": ""
    }
  }) : _c('img', {
    attrs: {
      "src": __webpack_require__(71),
      "alt": ""
    }
  })]) : _vm._e()], 2), _vm._v(" "), (_vm.back_url === 'guiguzi_fortune') ? _c('div', {
    class: [
      'guiguzi-btn',
      _vm.language === 'zh-CN' ? 'cn-guiguzi-btn' : 'tw-guiguzi-btn' ],
    on: {
      "click": function($event) {
        return _vm.pay()
      }
    }
  }) : (_vm.back_url === 'weigh_bone') ? _c('div', {
    staticClass: "bone-btn",
    on: {
      "click": function($event) {
        return _vm.pay()
      }
    }
  }) : (_vm.back_url === 'year_of_lucky_2024') ? _c('div', {
    class: [
      'lucky-2024-btn',
      _vm.language === 'zh-CN' ? 'cn-lucky-2024-btn' : 'tw-lucky-2024-btn' ],
    on: {
      "click": function($event) {
        return _vm.pay()
      }
    }
  }) : (_vm.back_url === 'career_fortune_2024') ? _c('div', {
    staticClass: "career-2024-btn",
    on: {
      "click": function($event) {
        return _vm.pay()
      }
    }
  }) : _c('div', {
    staticClass: "pay-card-btn",
    style: ({
      width: _vm.btn_width
    }),
    on: {
      "click": function($event) {
        return _vm.pay()
      }
    }
  }, [_vm._v("\n    " + _vm._s(_vm.unlock_style[_vm.language]) + "\n  ")])])
},staticRenderFns: []}

/***/ }),
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(192)
  __webpack_require__(193)
  __webpack_require__(191)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(215),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-00902bd2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 186 */,
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bazihehun_img_btnmengban = __webpack_require__(204);

var _bazihehun_img_btnmengban2 = _interopRequireDefault(_bazihehun_img_btnmengban);

var _ganqing_img_btnmengban = __webpack_require__(206);

var _ganqing_img_btnmengban2 = _interopRequireDefault(_ganqing_img_btnmengban);

var _shiye_img_btnmengban = __webpack_require__(209);

var _shiye_img_btnmengban2 = _interopRequireDefault(_shiye_img_btnmengban);

var _caiyun_img_btnmengban = __webpack_require__(205);

var _caiyun_img_btnmengban2 = _interopRequireDefault(_caiyun_img_btnmengban);

var _nianyun_img_btnmengban = __webpack_require__(208);

var _nianyun_img_btnmengban2 = _interopRequireDefault(_nianyun_img_btnmengban);

var _guiguzi_img_btnmengban = __webpack_require__(207);

var _guiguzi_img_btnmengban2 = _interopRequireDefault(_guiguzi_img_btnmengban);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bg_obj = {
  h5_marriage: _bazihehun_img_btnmengban2.default,
  h5_emotion2024: _ganqing_img_btnmengban2.default,
  h5_career2024: _shiye_img_btnmengban2.default,
  h5_wealth2024: _caiyun_img_btnmengban2.default,
  h5_annual2024: _nianyun_img_btnmengban2.default,
  h5_bai_gua: _guiguzi_img_btnmengban2.default
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'HomeFooter',
  props: {
    product_key: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      bg_obj: bg_obj
    };
  },

  computed: {
    is_android: function is_android() {
      return _utils2.default.isAndroid();
    }
  },

  methods: {},
  mounted: function mounted() {}
};

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emotion = __webpack_require__(198);

var _emotion2 = _interopRequireDefault(_emotion);

var _h5_marriage = __webpack_require__(202);

var _h5_marriage2 = _interopRequireDefault(_h5_marriage);

var _h5_wealth = __webpack_require__(203);

var _h5_wealth2 = _interopRequireDefault(_h5_wealth);

var _h5_career = __webpack_require__(201);

var _h5_career2 = _interopRequireDefault(_h5_career);

var _h5_bai_gua = __webpack_require__(200);

var _h5_bai_gua2 = _interopRequireDefault(_h5_bai_gua);

var _h5_annual = __webpack_require__(199);

var _h5_annual2 = _interopRequireDefault(_h5_annual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  name: "NewFooter",
  props: {
    product_key: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      h5_emotion2024: _emotion2.default,
      h5_marriage: _h5_marriage2.default,
      h5_wealth2024: _h5_wealth2.default,
      h5_career2024: _h5_career2.default,
      h5_bai_gua: _h5_bai_gua2.default,
      h5_annual2024: _h5_annual2.default
    };
  },

  computed: {
    imgUrl: function imgUrl() {
      switch (this.product_key) {
        case 'h5_emotion2024':
          return this.h5_emotion2024;
        case 'h5_marriage':
          return this.h5_marriage;
        case 'h5_wealth2024':
          return this.h5_wealth2024;
        case 'h5_career2024':
          return this.h5_career2024;
        case 'h5_bai_gua':
          return this.h5_bai_gua;
        case 'h5_annual2024':
          return this.h5_annual2024;
        default:
          break;
      }
    }
  }
};

/***/ }),
/* 189 */,
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mintUi = __webpack_require__(4);

var _dayjs = __webpack_require__(11);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _api = __webpack_require__(6);

var _fortune = __webpack_require__(10);

var _enum = __webpack_require__(2);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 名称映射
var payMethodsMap = {
  NET_BANKING: 'FPX',
  AXIATABOOST: 'Boost',
  TNG: "Touch'n Go",
  GRABPAY: 'Grabpay',
  MAYBANK: 'Maybank QR'
};
var newPayMap = {
  1: 'AXIATABOOST',
  2: 'TNG',
  3: 'GRABPAY',
  4: 'MAYBANK'
};

exports.default = {
  components: { Popup: _mintUi.Popup },
  data: function data() {
    return {
      popupVisible: false,
      loading: false,
      product: {},
      payment_details: [],
      index: 0,
      paying: false,
      currency: '',
      price: '',
      expand: false
    };
  },

  props: {
    visible: {
      default: false,
      type: Boolean
    },
    // product_id: {
    //   type: Number,
    // },
    // 测算类需要 运势类不需要
    query_user_string: {
      default: '',
      type: String
    },
    // 组合支付时用
    is_combine: {
      default: false,
      type: Boolean
    },
    // 组合支付时用
    combine_ids: {
      default: '',
      type: String
    },
    checked_list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    all_list: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    visible: function visible(newValue) {
      if (newValue) {
        this.popupVisible = true;
        this.query();
      }
    },
    popupVisible: function popupVisible(newValue) {
      if (!newValue) {
        this.expand = false;
        this.index = 0;
        this.$emit('update-visible', false);
      }
    }
  },
  computed: {
    user_number: function user_number() {
      return this.$store.state.year_user;
    },

    // 支付列表
    list: function list() {
      var list = [];
      this.payment_details.forEach(function (item) {
        if (item.payment_target_orgs.length) {
          item.payment_target_orgs.forEach(function (item2) {
            list.push({
              payment_name: item2,
              name: payMethodsMap[item2],
              payment_target_org: item2,
              payment_type: item.payment_type
            });
          });
        } else {
          list.push({
            payment_name: item.payment_type,
            name: payMethodsMap[item.payment_type],
            payment_target_org: null,
            payment_type: item.payment_type
          });
        }
      });
      return list;
    },
    isFortune: function isFortune() {
      return this.product_id == 101 || this.product_id == 102 || this.product_id == 103;
    }
  },
  created: function created() {},

  methods: {
    close: function close() {
      this.popupVisible = false;
    },

    // 能否退款文本
    canRefund: function canRefund(type) {
      return type === 'NET_BANKING' ? '不支持退款' : '支持退款';
    },

    // 获取图标
    getPayIcon: function getPayIcon(type) {
      return _defineProperty({}, type, true);
    },

    // 请求支付类型
    query: function query() {
      var arr = [];
      this.checked_list.forEach(function (it) {
        if (it.id) {
          arr.push(it);
        }
      });
      if (arr.length === 2) {
        this.product = this.all_list.find(function (it) {
          return it.product_key === 'h5_combo2';
        });
      } else if (arr.length === 3) {
        this.product = this.all_list.find(function (it) {
          return it.product_key === 'h5_combo3';
        });
      }
      this.payment_details = this.product.payment_details || {};
      this.product_id = this.product.product_id;
    },

    // 解析参数字符串
    getExtra: function getExtra() {
      var params = null;
      var query_user_string = this.query_user_string;
      var query_user_string_array = query_user_string.split('|');

      // 八字合婚 双人信息
      if (this.product_id == 23) {
        var _query_user_string_ar = _slicedToArray(query_user_string_array, 13),
            male_name = _query_user_string_ar[0],
            female_name = _query_user_string_ar[1],
            male_birth_year = _query_user_string_ar[2],
            male_birth_month = _query_user_string_ar[3],
            male_birth_date = _query_user_string_ar[4],
            female_birth_year = _query_user_string_ar[5],
            female_birth_month = _query_user_string_ar[6],
            female_birth_date = _query_user_string_ar[7],
            male_birth_hour = _query_user_string_ar[8],
            female_birth_hour = _query_user_string_ar[9],
            male_is_gongli = _query_user_string_ar[10],
            female_is_gongli = _query_user_string_ar[11],
            sex = _query_user_string_ar[12];

        params = {
          male_name: male_name,
          female_name: female_name,
          male_birth_year: male_birth_year,
          male_birth_month: male_birth_month,
          male_birth_date: male_birth_date,
          female_birth_year: female_birth_year,
          female_birth_month: female_birth_month,
          female_birth_date: female_birth_date,
          male_birth_hour: male_birth_hour,
          female_birth_hour: female_birth_hour,
          male_is_gongli: male_is_gongli,
          female_is_gongli: female_is_gongli,
          sex: sex
        };
      }
      // 其他 单人信息
      else {
          var _query_user_string_ar2 = _slicedToArray(query_user_string_array, 7),
              name = _query_user_string_ar2[0],
              _sex = _query_user_string_ar2[1],
              is_gongli = _query_user_string_ar2[2],
              birth_year = _query_user_string_ar2[3],
              birth_month = _query_user_string_ar2[4],
              birth_date = _query_user_string_ar2[5],
              birth_hour = _query_user_string_ar2[6];

          params = {
            name: name,
            sex: _sex,
            is_gongli: is_gongli,
            birth_year: birth_year,
            birth_month: birth_month,
            birth_date: birth_date,
            birth_hour: birth_hour,
            date: (0, _dayjs2.default)(birth_year + '/' + birth_month + '/' + birth_date).format('YYYYMMDD')
          };
        }
      return params;
    },

    // 支付
    pay: function pay() {
      var _this = this;

      // 2秒的防抖
      if (this.loading) return false;
      this.loading = true;
      setTimeout(function () {
        _this.loading = false;
      }, 2000);
      _mintUi.Indicator.open('订单创建中...');
      var product_id = this.product.product_id;
      // 支付公共参数

      var params = {
        pay_method: 'payer_max_pay',
        platform: _utils2.default.isAndroid() ? 'ANDROID' : 'IPHONE',
        trade_pay_type: this.index ? 'WALLET' : 'NET_BANKING',
        trade_target_org: !this.index ? null : newPayMap[this.index],
        product_id: product_id,
        product_key: '',
        // main_order_id: product_id,
        combine_product_ids: this.checked_list.filter(function (it) {
          return it.product_id;
        }).map(function (it) {
          return it.product_id;
        }),
        extra_ce_suan: {},
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        }
      };
      params.callback_url = location.origin + '/index.html';
      this.paying = true;
      this.popupVisible = false;
      (0, _api.payOrderAPI)(params).then(function (res) {
        if (res.status === 1000) {
          location.href = res.data.pay_url;
          _mintUi.Indicator.close();
          _this.paying = false;
        }
      }).catch(function (err) {
        _this.paying = false;
      });
    }
  }
};

/***/ }),
/* 191 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 194 */,
/* 195 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 196 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 197 */,
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/emotion.5050fda.png";

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_annual2024.75824e1.png";

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_bai_gua.8dc1c84.png";

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_career2024.63b8577.png";

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_marriage.70769a7.png";

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_wealth2024.10a0655.png";

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bazihehun_img_btnmengban.7edae29.png";

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/caiyun_img_btnmengban.3eab610.png";

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_btnmengban.fb7963b.png";

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/guiguzi_img_btnmengban.55acdf0.png";

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/nianyun_img_btnmengban.abe1062.png";

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/shiye_img_btnmengban.d71d11e.png";

/***/ }),
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('mt-popup', {
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.popupVisible),
      callback: function($$v) {
        _vm.popupVisible = $$v
      },
      expression: "popupVisible"
    }
  }, [_c('div', {
    staticClass: "pay-popup"
  }, [_c('div', {
    staticClass: "pay-header"
  }, [_c('div', {
    staticClass: "pay-title"
  }, [_vm._v("选择支付方式")]), _vm._v(" "), _c('div', {
    staticClass: "pay-close",
    on: {
      "click": _vm.close
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(95)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "pay-wrapper"
  }, [_c('div', {
    staticClass: "price"
  }, [_vm._v("\n          RM "), _c('span', [_vm._v(_vm._s(_vm.product.price || '-'))])]), _vm._v(" "), _vm._l((_vm.list), function(item, i) {
    return [(i < 2 || _vm.expand) ? _c('div', {
      staticClass: "item",
      on: {
        "click": function($event) {
          _vm.index = i
        }
      }
    }, [_c('div', {
      staticClass: "left"
    }, [_c('div', {
      staticClass: "icon",
      class: _vm.getPayIcon(item.payment_name)
    }), _vm._v(" "), _c('div', {
      staticClass: "name"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('div', {
      staticClass: "refund"
    }, [_vm._v(_vm._s(_vm.canRefund(item.payment_name)))])]), _vm._v(" "), (_vm.index === i) ? _c('img', {
      staticClass: "check",
      attrs: {
        "src": __webpack_require__(103),
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "check",
      attrs: {
        "src": __webpack_require__(102),
        "alt": ""
      }
    })]) : _vm._e()]
  }), _vm._v(" "), (!_vm.expand) ? _c('div', {
    staticClass: "expand",
    on: {
      "click": function($event) {
        _vm.expand = true
      }
    }
  }, [_vm._v("\n          展开更多\n          "), _c('img', {
    attrs: {
      "src": __webpack_require__(71),
      "alt": ""
    }
  })]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "pay-btn",
    on: {
      "click": _vm.pay
    }
  }, [_vm._v("立即支付")])])])], 1)
},staticRenderFns: []}

/***/ }),
/* 216 */,
/* 217 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "new-footer"
  }, [_c('img', {
    attrs: {
      "src": _vm.imgUrl
    }
  })])
},staticRenderFns: []}

/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "footer-tab",
    style: ({
      bottom: _vm.is_android ? '1.2rem' : '0',
    })
  }, [_c('img', {
    attrs: {
      "src": _vm.bg_obj[_vm.product_key],
      "alt": ""
    }
  })])
},staticRenderFns: []}

/***/ }),
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createPopper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return offset_default; });
// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/math.js
var round = Math.round;

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/validateModifiers.js
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/createPopper.js
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference,
        popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference2 = _state$elements.reference, popper2 = _state$elements.popper;
        if (!areValidElements(reference2, popper2)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference2, getOffsetParent(popper2), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper2)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
        if (typeof effect3 === "function") {
          var cleanupFn = effect3({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// ../../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};



/***/ }),
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        index: {
            default: 0,
            type: Number
        }
    },
    data: function data() {
        return {
            list: [{
                item_id: 5,
                title: "事業精批",
                url: "career_divination_overseas"
            }, {
                item_id: 1,
                title: "八字合婚",
                url: "marriage_measure_overseas"
            }, {
                item_id: 3,
                title: "婚缘心卦",
                url: "marriage_divination_overseas"
            }, {
                item_id: 2,
                title: "全年運勢",
                url: "new_year_luck_overseas"
            }, {
                item_id: 4,
                title: "財運精批",
                url: "wealth_boutique_overseas"
            }]
        };
    },

    methods: {
        link: function link(item) {
            location.replace(item.url + ".html?from_nav=1");
        }
    }
};

/***/ }),
/* 234 */,
/* 235 */,
/* 236 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAsdJREFUWEfV10toE1EUBuD/TIO1TStWQWwhFUQFpRpEcOOii6qgifWFiI8i3YgLoYgPEBQUHwguRLALXwuxXbSCgjbotgs3hYKhiyJawQZGW4qSQNvEPI7cKQlJJp2ZTCaZmdnOnHs+DufOuZemgzsY9j6LAH4x87gEfp8BhTaEJv4uRyIHgAtsBMwz6FEiPf9w88fvsWK448B5QJlAR30j4bF8tJPBAHOcIJ3xhcJvs2hng4VSoEnqzFba+eCl0sqJ9MJW0dNuAQOgu+0j4ZuuAYu/R4bZ5xqw6AviTI+rwMz8xlVgAD/cBl50Gxj2gUlC85EeNOzZi/SsjOirx0jNyLrHMHvAJGFN3214u7pzwOT0FH5fPC4mmya69uAS2KxQ7t2P9NyMg8Aa2HT0D+Rz+4B0yiFgDSwnk5i714f4+Gdre7h+206s2NKBxOQX/Ps6obt47gM97IPLiI+NGlrPcA83BU6i5cJ1MSCVjREdeILY8Av9JBZilfFs9IrU+vITPOtaC4DRgX7Ehp4tj7YYWx746Qd42tpVOKXSQ8/VaAV7C96uw6p3Ss+W0QamrkiNnQex9sr9pZYoelToKlTW1BWp+dBprD5/TRtdpcqaAosgTfRgPzzrfQUTLJuokjYw1RL5QVroUjvQKmxZm64YYhRtJbYisF57iPdWYysGa6GrgbUEXApdLaxl4Hw0J1Omh4L+nC9jNBtZrCl4CqlZ2fBBxsiaxd+Is8QCgAYzwXbECPAUgI12JDeTk34Gtg8T0QkzwXbEUCTQcZZJem1HcjM5RYVbJKIIA14zC9Q6RjkrTgf9dwC+UevkZvIp4G8HNq2qr2ucBNBmZpFaxuRO45GgfzdzZhREK2sJKDdXwfUhEvAfY2QGnYxW3XeUSoPfObU91Be0XE97rxL4ktP+HiXB2b5SfnngAFDXzcS7AIh7vq1j/D9XHHtKwtfW+AAAAABJRU5ErkJggg=="

/***/ }),
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(236)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(233),
  /* template */
  __webpack_require__(247),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8a9d751e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 247 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "topbar"
  }, _vm._l((_vm.list), function(item, i) {
    return _c('div', {
      staticClass: "tab",
      class: {
        active: i === _vm.index
      },
      on: {
        "click": function($event) {
          return _vm.link(item)
        }
      }
    }, [_vm._v(_vm._s(item.title))])
  }), 0)
},staticRenderFns: []}

/***/ }),
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _h5_fang_jian_bazihehun = __webpack_require__(13);

var _h5_fang_jian_bazihehun2 = _interopRequireDefault(_h5_fang_jian_bazihehun);

var _h5_fang_fan_bazihhehun = __webpack_require__(14);

var _h5_fang_fan_bazihhehun2 = _interopRequireDefault(_h5_fang_fan_bazihhehun);

var _banner_ganqing_fang = __webpack_require__(15);

var _banner_ganqing_fang2 = _interopRequireDefault(_banner_ganqing_fang);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
    props: {
        product_key: {
            type: String,
            default: "h5_marriage" //八字合婚
            //h5_emotion2024//大揭秘
        },
        is_home: {
            type: Boolean,
            default: true
        },
        call_back: {
            type: Function
        }
    },
    data: function data() {
        return {
            imgMap: {
                "h5_marriage": {
                    "cn": _h5_fang_jian_bazihehun2.default,
                    "tw": _h5_fang_fan_bazihhehun2.default
                },
                "h5_emotion2024": {
                    "cn": _banner_ganqing_fang2.default,
                    "tw": _banner_ganqing_fang2.default
                }
            },
            titleMap: {
                "h5_marriage": {
                    "cn": '八字合婚',
                    "tw": '八字合婚'
                },
                "h5_emotion2024": {
                    "cn": '感情运',
                    "tw": '感情運'
                }
            },
            show_imgSrc: _h5_fang_jian_bazihehun2.default, //默认第一张
            show_title: ''
        };
    },

    computed: {
        is_cn: function is_cn() {
            return _utils2.default.getLanguage() === 'zh-CN';
        }
    },
    methods: {
        imgSrcVerify: function imgSrcVerify() {
            var src = this.imgMap[this.product_key][this.is_cn ? 'cn' : 'tw'];
            src && (this.show_imgSrc = src);
            var title = this.titleMap[this.product_key][this.is_cn ? 'cn' : 'tw'];
            title && (this.show_title = title);
        }
    },
    created: function created() {
        this.imgSrcVerify();
    }
};

/***/ }),
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 264 */,
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/btn.a6c210b.png";

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/btn.a6c210b.png";

/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABXhJREFUWEfFlmlsVGUUhs83yx0pmxsuhVhsNNHEGIwYgviHYCSogR/GiJooVFoYoIU20hXC2NXqFITalq2p0ALRioolYCAaEpQUEwiRhCgxAdM/BoTWUmln7v3eV+9MZzpbtwTiJJOZO3PvOc/Z3vMp+Z9f6n/2L7cVoH/Nmgyn1vNJPuqgBjW7CHR6WlouDhfobQEIeL1Pi8tRq8CFBJQAEnqT4U/ggmj4PK2tXyWCxAGwunqaJeKF1heNrq7D1oyH86Ex1VDOWuXz9aaKIpift0og2wgYUcfJACEQkoe6/rr+9uPHjgUituIAzJqaDiFeHTR0WMAlJMRB1LvKK/MSAYIFBXkCbTsXRYr9GQcxlIGhjIgcNQYCi1V7u7btxQN8WPOTAM+HjVCECBl1gJ+5KiqWxwKYBQXzKTwhgNNO9ajOIyVhyMrHnra2wiSAQFXVUoeSg5EoCIoiLCo9z/BV/RwBYG7uFNPjuSDQj4RSOwirQt8hCgiS+g1B8DeBa78Az0R6gqQdNUXU6562tkNJTWhWVm4V4frBB+igrHX6fI2x0VuFhbsAnR2bbttw5FqB54ydO5+1nxlYtqxACeuiTTloSIn00tJzUk6BWVFRJGQxyNWezZsPxqW+qMju9GPCmG4PN1hs/U2nqKXasi4J0CrErDgAuwy2Z8qFYceQubkeVV8f7VYb4u/8/HvTPMYvBKbHRR8uVUIfDAIxpjHtXrGTH/Z6i5SDY9YB+zmrpOQbEov/m+lQgw5XghQ6EJ0CUpqdwP4r3d2n7XEcM4BZWlpOclM4lQnjBjuyxN/ihCgMIBIw+gfuV+3tfSl1YDi5NDdu3CBEbVjlwuMZX4JEHWCHACVCfCfAjKF7edzT1rYw1s+IGWBh4WRzgucTAbPiVS4BIkEHlKjZ7qamc8EV710WICM6HZZ+xzhwoHVUgJAkazNLwHwCD47oPEEHhDhhNO54yczOehFUtlBFstVzvbtnenpHx604AGvLliXUeo4C7hMg6AwE1vWLpLsd6oyQ6fEKZ3e2jl0y0VKEBAa46RY1WzU0XApmZ58i8cJQQ6LSs7d1U9IyMuv8PQJMHaotq92lpWWBioonHVofp13DaM1TjNbQ4hlwgK+5GhqOBldlZxHSHBN9bwDMnLJv3/UUAHWVApRFnZAkdL5Rtmlbn8/3kIdsJvTLIy4Z8Fehudyob+o016ycS4s/ELwrMjFKY52xd+/2VE2u6PMZ1sS0HwV8Lg7C0lvcZLHy+SyztHQBlcoW6PkCTBPQUsBVITsBfG2cP/+5OnnSsrzexRDuJzAponwKOOO+2Tcvsv1SngdYW5tuCk8pMjM+UjkrNN93+ypPRhdRTo5bdu2ywgsl/BrwejOVy1GuwLdiDySKuGppzk5raekabsSjY0i/P8M0zSOKeCq84eytFhYYpXFegC9FpBNaX1WkB1pPc5KzSL1AQDszjriGJXs1rUVpu1tOD+c8aR3T55tkGu6dinxTNFTkPJB00kkUo0QdIK6JhUXGnj1nR3KeBBC52ayqWkDL8gs5K5XsJithWJgGzwPfGsqxUjU2/jma82EBoiDl5XMVrGxqvELggdCoptIBEgo4YoHbJzQ0fD8Wx+PaBfYmDGzc8JgTznepWSbkJcI6oCDdAr1WgEy3Uz+htjb+Ph7no2Yg0Zh9RrDSJlwRypSB/v6Zk+vrrwXX560gZLcim4z6+tV3FMA2bhYXllCzWil+4P7I7wtBOdRlAncH+v7JmNzScm08EGM+D0SM9hQX3zMR+g8CNwx/3cwQVF5eMYgaRe01Pm3acUcBQg6LihYqrae6/P4v7Gvm5KQFPe5cwzWwW21tvnHHAcbjYLR7x12C0QyO9/9/AWujr/+Pt/brAAAAAElFTkSuQmCC"

/***/ }),
/* 268 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA6NJREFUWEftl12IVGUYx3/PzH5khuAi0RfRjRcFmd1k9oX3UYRgFBWKLtbqru6u47Y7bnIicrRdZ2XaNXc3MSI0tqwLr4IgqEjLICOCgujSCxM3CJN1Z84Tc855z5x358zMmelCgs7NwLzv+zy/9//8n2fOCDf4kRucn/8mgM7O3sXi4gOoriCVugL8ID09l1pRM7ECWih0IultpKQb5UE/mfofIiVUPwMdkt7en5sBSQSghaNPgnsU5O7q4GUIAfU+r4G+ILt7P00KURdA5+bSXLw0DvRbAYOcUREi6wuoPiaDfd8ngagJoNPT7Vy9/iGwMQyk5e2B7HHRzZLwnezpW9cygDpOiuVdpxCexUvqqxzIXA1hFImyuayV4V0/NoKIVUAPFSaqZDeRwmRLlQhClb0gAq7bLdn+400DaO7IAEi+6mAd5b2yGKWMMSS1Q7K73mkKQA8ceRrkE1TTFYPVqXtNKA9os+zvfz8xgL45sRZXvkL1lqDg8Wfj6h3dWSnRanEGf1saRB2nA3DFcYrGWqgzdiu0nQca9XntLoiqIXwjrw8+anEN51bS0TEFsgkooszwZ9uQ6Pbpdm7/+3NUn6i0W+D6yLCLnwOm9lYtFhH3cXlj77cWwGj+NKp+S1fmyLjo6OFJYGeNoRI/+GKL40V1cfVFOZg5ZSV38l0s6GXPqbZv5kWz48dR2YqUb1PDMonrjiLskIOZYxbAQL6LdtcHsJ950b5CJzdf/xJ4yFch6GNvtsc8HoyZ/bHrJVQ2yOHM1xZEZuy0N1VNfP+24x6RDuTvJF0qz+7bamqeXIVyiHOSH1pvAfTkVrIsPQX4JkRnWFw2FEqimbH1uPoF0GmZcYlr/LVAnVDRGLWKpXtlMvvL0gvFtqHZpP25LWjqhD/3G/jBlMvbZg4EpfFGMd0y+WoLo7jv0Fuge6vS15t65n3A80Z4naxMjeRqXCP8uurHqGxBduZOAJt9tWPkiL4PRCpil05ekWPD000DePE2zaVZ9fvHqD5j16KO+8OLm4oU18jM/p9aAvAgyu258NdHIE+Fk6sirx23ukPOyrv7HmmU3Lin5j7d4LSxumMCV3steU3h/PdAa7aCLpCWh2V234V/DRCquuXARqT0NsgdDbrjKvC8vDd6JknyhgpEg+hLY8uRay8jbEPlPiuBUkT0DK6MyAev/Zo0eVMAFsxzzj20y/2UWIG4f6A3nZeTI/PNJDZ7E/0vaCVw0jP/A/wDiulpM3YjkzAAAAAASUVORK5CYII="

/***/ }),
/* 269 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABYdJREFUWEfFlmtsFGUUhs/7fjO7WwKVghB/WJXEICHBEEi0IWiIpkYUxFtVoAUbKNDigki1aSllEWhLIS20wkLLTRMvRP9IVIKR8MMQQsRIiD9INBUMFxVv3Aoz2+4nM3thdrel26hh/uzuzOx3nu897znng9zmC7c5vtwSwCotHQuyAAr5UShC4aceqEM5W7ac/q/AewWwSkqeF8WQkOOEFAHE/Yx916J4QLqjVf5w+MS/BUkB+GHqVP89w4e/L8QLyYBpACBFgwJFW7Qs9bW2busNQodCubbWVRS5aJw/32Ln58+gUmMNkTBqai4k/pME0EVFyg7494nIUyk7TlfgphLiwAjVUl9zc2s6RHddbWsUDIoDS3wq5IyYgvzMrK6engFgFRc3CeRN0SJCr+Rx6d1g8fvuosnfPRAUms3Nh7wQ3StX7o4Sr8YAEmvAAThsVldPTgGwiotfENEfC5wEO2lOAnwn7J4t9D0AqL2a9Dm7iKUBnoXVz6ZljUNb26XEwvaKFQ/BUIeFNLyKAnzFqK7emwSwZs4cA0MdjWrJdeK6VxxAC5YH9uxpdm7ZCxd+q4kJCW8Anl3F1OjwNW1c4FXBrqtbDMU2d0cONLHJV1O7zPsOrOLiEwIZl5LDhALAcaEqEcMYDdEfadKM59Ex4c3qiMHoKDk1sH79Ae9a1urVMwlsJdmgamub0r2C6yXFOyAyU0QGOQ+1dtLk8UCfJnTNdbM8Y6k522XZD97R0vKnN5AOBv1oa7N6qxZXdKf87s7LmwRyNiDzsqmCzBS4Dneg9hkNjc9CXDv3e6X0AV1UNDgS8P+uAX+/fcBbFbHykhvNy00LwDVmfX1dv9Edu6W/ZM0pPiCCJzwAZwR8UsgGIaZ7OqKnCpJd0k0JSC1glbl27Yb+IDIA7FmzSrSh3rsZiKd9O3eOipSXT9CijyVNmK5AQoUUX2CXec16HU1Nl/sCyQA4N336oDvz8s7eKJmhCQiChWZHx1d2xaIvNViY2QfiKXCDq5RGBvJXIVoMZe7ytuCMTphSOnNL1ghY66n5r30dHY/qxWWjI9o8phWHZJgwoy8k0kKh4lm7J1qQI3KuJ8e/WYQ+Tf4BpY72Og0vzZkzPEB0ajLXNRchUJjn29ax63p5+dNU/ESUCiSrJWHAjMlJIXlG+aQQNaGTkfr6dULUxNZ0DXuxz/OAPXfuEq242TOOr9PAY+aW7UfsYLBAiN0CjEmtFs+8cM2ovrCAeYNDoV961q1bqokW7VDHZwMV1vYJ4EzHyJDBhzX5cGKnIK9EBbMD4fA+PWWKYY8f/zLJ54Qo0ORIAQwhLwjVISjdYb5df1CHQkZEoRFUbyRaclyBb4yrVyff8kTUVVqabygc0+DIpB9IrYkPdHe0LhAOdya84zRQWbDAQHt7JHEvEgpNEchGASZ6ldJApyl4BFVV5/o9E0bKyiZFIfsFyPUuAjIqxCFAHewBjlOpCxqwqNRIEXEUeVEUxyc9FJddA9+bpm8aKivdY12/AO4knD9/ohjcr8ERA+sDifbsnqB0FPjQtCMLEQpduWUZ9tY0dEXFXbaObhfymQH2AdGC4zCk0lyx6mDGNOyvVaY/v7Z48eMklgCc5tSY95QUS1FsQoL8DYqfaxodZl3dkaw7YTZAuqLi/ohpnBSgU6je0SJ5MIxZQozWxDrNnnf9azf8mM1EzMoD6VB2MLhVA+WglPk2te64HAyOCOTknBLgktHVdV9fs7/P80A2u0684wTziz4N8m8jqkc5wSJvVYa0YBUENWZTU8NA1huwAvZr5Yu0qDDJarO1tdGtksrlp0AOu0p179DGxr/+VwC9bN4wuztQ5rMibWhv73KCWZWVL1Gpi2baeTAbkAErkM2iA3nntgP8Azl7mTlk+pQ8AAAAAElFTkSuQmCC"

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA4lJREFUWEfVlltoHHUUxn/f7DZLLYKV2gcfpaAgokLrDRUEwScfvBUrIpFKUntZ0jVpmgZxqG0Ss9skJqlVSMWiohgIovguXurlxRvogy9SvCESIVilzWaPzEx2MrM768z4EtynZf7/833fOec7Z0as80/rzM//V4CdOrUVuJFG43KkJer1r1Qu/5i3orkrYLOz14LGQfeAFQLCVRjxBQ2bw1ZOq1y+kEVMLgH2/Ox9oNeBjWvNszUBIaOdA2evynvfSxORWYBNzGxH+ggotYF2Rpniyq392rlzpZOQ7AJOzHyGcVO04u2gHpyFHVk9X2BT18Pq7V1OEpFJgI1NX4/Dlx0zj3VhVURoDYHZW5xf3CXXbbRiZBMwMrUbR3N+auZlGCHxzdB8FvztMNxTGiwf/I8Cpp/E7IVYcJr0pPOGVTTcNxnFSYPx79rRqccQZxKNlIYQrZa0Ana/jvS908QKw811i4Aj173YSmTuxDbQ96l7M5MY/sSxOzR80PeU7MB0icvq42A9SEUaNk/94j6NDf0RFWLPTHyMcVv4LJGs6Q1FfNA0RcQc4hxW3yF34DfZ8Ikq0B/vrxZ0rPJATMDT1Zsx50NgQ0yEeWQdnBfR0z5B+oBfLrlbdri6CNoczrePJaOkLXIrizERw7VdNHgNyfnXDZfaijD6pOyQJ4BAwNqWMZadLZpsEXC4tgfDm4aAIjtRsl7xsqx/vIrRH8y2Z3l/phdUG4i34Kna7Tj2PkYhkbgpJqjg6kKI8MbxvYPP+avrzsCEG/723m49gDcJ83SttJuwMv4JcEv2zKOKWsolfqVe2K7Jyk/ZxnD/yDUUC98l74Ekp8Uc3xp2AUd3qTbgJZTaxaAr+5/bjWNzcZ94JBHfpPmhySa6NTkYLrUsYdi+0SFgJKY3LTJ5T1Q1M3goWpI0mKACe8Z6kb3Y1oK0aP88NOQZTg497r3O8gvoOXodFL8OsToRe073p6iFQnqb3696UPPtHyZpOYRI9sTxs8CtsSqE0R1Wnr8heZfSpQ9pJvkbMbuA7uM3UOBTzEqRsq6VOJzzqLU1y9K2vqTMI/ZNXlJJT6372L3AG8CmjlF+SvYzVjigV44spKFnrkATyB599mocG8XkiSnG+i37FuM0tvElvTpwPo088x5IrMYjo5tRfQfWuIICSyzbN3rT/SELae4pyAua537uFuQBz3J33QX8A5m4G3ZvF1HcAAAAAElFTkSuQmCC"

/***/ }),
/* 271 */,
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(263)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(259),
  /* template */
  __webpack_require__(273),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7d3a8e00",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 273 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "calculate-bar",
    attrs: {
      "id": _vm.is_home || 'not_home'
    }
  }, [_c('div', {
    staticClass: "detail"
  }, [_c('img', {
    staticClass: "detail_img",
    attrs: {
      "src": _vm.show_imgSrc
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "detail_desc"
  }, [_c('div', {
    staticClass: "desc_header"
  }, [_c('span', {
    staticClass: "header_left"
  }, [_vm._v(_vm._s(_vm.show_title))]), _vm._v(" "), _c('span', {
    staticClass: "header_right"
  }, [_vm._v("已解锁")])]), _vm._v(" "), _c('div', {
    staticClass: "desc_content"
  }, [_vm._v("填写信息开始测算")])])]), _vm._v(" "), _c('div', {
    staticClass: "calculate",
    on: {
      "click": function($event) {
        return _vm.call_back()
      }
    }
  }, [_c('span', {
    staticClass: "calculate_text"
  }, [_vm._v("开始测算")])])])
},staticRenderFns: []}

/***/ }),
/* 274 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_btn.ff12f13.png";

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_btn.94aef38.png";

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pay.54b3e3f.png";

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pay_xs.8da2516.png";

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pay.a7fc07b.png";

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pay_xs.04a458c.png";

/***/ }),
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * props传入: 
 * dataList：需展示数据
 * product_key
 * user_desc：用户简略描述
 */
exports.default = {
    props: {
        dataList: {
            type: Array,
            default: []
        },
        product_key: {
            type: String,
            default: 'h5_emotion2024'
        },
        user_desc: {
            type: Array,
            default: ''
        }
    },
    data: function data() {
        return {
            renderData: []
        };
    },

    watch: {
        dataList: function dataList(newVal) {
            var _this = this;

            if (newVal.length) {
                var dataByFormat = newVal.map(function (item, index) {
                    var result = item.reduce(function (acc, cur) {
                        acc[cur.key] = cur.content;
                        return acc;
                    }, {});
                    result.user_desc = _this.user_desc[index];
                    return result;
                });
                this.renderData = dataByFormat;
            }
        }
    },
    computed: {
        is_cn: function is_cn() {
            return _utils2.default.getLanguage() === 'zh-CN';
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vant = __webpack_require__(65);

var _enum = __webpack_require__(2);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _img_buy_choose = __webpack_require__(242);

var _img_buy_choose2 = _interopRequireDefault(_img_buy_choose);

var _h5_fang_jian_bazihehun = __webpack_require__(13);

var _h5_fang_jian_bazihehun2 = _interopRequireDefault(_h5_fang_jian_bazihehun);

var _h5_fang_fan_bazihhehun = __webpack_require__(14);

var _h5_fang_fan_bazihhehun2 = _interopRequireDefault(_h5_fang_fan_bazihhehun);

var _banner_ganqing_fang = __webpack_require__(15);

var _banner_ganqing_fang2 = _interopRequireDefault(_banner_ganqing_fang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    product_key: {
      type: String,
      default: "h5_marriage"
      //h5_emotion2024
    },
    //组合两项优惠信息
    h5_combo2_attach: {
      type: Object,
      default: undefined
    },
    //当前报告信息
    product: {
      type: Object,
      default: {}
    },
    all_product: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }

  },
  data: function data() {
    return {
      selectIndex: 1,
      is_show_shandong: false,
      is_show_daoqi: false,
      time: 0,
      new_ganqing_small: _banner_ganqing_fang2.default
    };
  },

  filters: {
    filterTime: function filterTime(val_) {
      var val = val_.toString();
      if (val.length === 1) {
        return "0" + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    }
  },
  created: function created() {
    this.selectIndex = this.currentIndex;
    // 首次挽留的弹窗计时
    var use_fixed_time = this.$route.query.use_fixed_time;
    if (use_fixed_time) {
      this.time = +localStorage.getItem("mlxz_fixed_local_order_time");
      localStorage.removeItem("mlxz_fixed_local_order_time");
    } else {
      this.time = 15 * 60 * 1000;
      // localStorage.removeItem(`mlxz_new_time_down_${this.product_key}`);
    }
  },
  mounted: function mounted() {},

  watch: {
    selectIndex: function selectIndex(newval, oldval) {
      if (newval === 0) {
        console.warn('00');
        this.$emit('get_combine_product_ids', []);
      } else {
        console.warn('11');
        this.$emit('get_combine_product_ids', this.getCombineProductIds());
      }
    }
  },
  components: {
    CountDown: _vant.CountDown
  },

  computed: {
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === "zh-CN";
    },
    is_show_combination: function is_show_combination() {
      return !["enjoy03", "panda03", "enjoy02", "panda02"].includes(_utils2.default.getFBChannel());
    },
    getH5MarriageIcon: function getH5MarriageIcon() {
      if (this.is_cn) {
        return _h5_fang_jian_bazihehun2.default;
      } else {
        return _h5_fang_fan_bazihhehun2.default;
      }
    },
    now_price: function now_price() {
      return this.product ? this.product.unit + " " + this.product.price_str : "-";
    },
    origin_price: function origin_price() {
      return this.product ? this.product.unit + " " + this.product.origin_price_str : "-";
    },
    now_price_combo: function now_price_combo() {
      return this.h5_combo2_attach ? this.h5_combo2_attach.unit + " " + this.h5_combo2_attach.price_str : "-";
    },
    origin_price_combo: function origin_price_combo() {
      return this.h5_combo2_attach ? this.h5_combo2_attach.unit + " " + this.h5_combo2_attach.origin_price_str : "-";
    }
  },
  methods: {
    changeComboHandle: function changeComboHandle(type) {
      if (this.selectIndex !== type) {
        this.selectIndex = type;
      }
    },


    //获取组合套餐商品id集合
    getCombineProductIds: function getCombineProductIds() {
      var _this = this;

      var array = [this.product.product_id];
      var tags = this.h5_combo2_attach.tags;
      var otherProductKey = tags.filter(function (item) {
        return item !== _this.product.product_key;
      })[0];
      var otherProductId = this.all_product.filter(function (item) {
        return item.product_key === otherProductKey;
      })[0].product_id;
      array.push(otherProductId);
      return array;
    },
    getLeftBg: function getLeftBg() {
      if (this.selectIndex === 1) {
        if (this.product_key === "h5_marriage") {
          return "background: #FBF8ED;";
        } else {
          return "background: #FFFAFA;";
        }
      }
    },
    getRightBg: function getRightBg() {
      if (this.selectIndex === 0) {
        if (this.product_key === "h5_marriage") {
          return "background: #FBF8ED;";
        } else {
          return "background: #FFFAFA;";
        }
      }
    },
    getTime: function getTime(val) {
      var minutes = val.minutes,
          seconds = val.seconds,
          milliseconds = val.milliseconds;

      var time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      // 是否展示首次挽留弹窗 0 1展示 2不展示  并缓存当前时间用于弹窗倒计时
      var notice_num = localStorage.getItem("mlxz_show_notice_" + this.product_key);
      if (notice_num) {
        if (+notice_num === 1) {
          localStorage.setItem("mlxz_count_down_" + this.product_key, time_);
        }
      } else {
        localStorage.setItem("mlxz_count_down_" + this.product_key, time_);
      }
      localStorage.setItem("mlxz_fixed_local_order_time", time_);

      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time = 0;
        this.$refs.countDown.pause();
        this.$refs.countDown.reset();
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _btn = __webpack_require__(265);

var _btn2 = _interopRequireDefault(_btn);

var _btn3 = __webpack_require__(266);

var _btn4 = _interopRequireDefault(_btn3);

var _pay = __webpack_require__(282);

var _pay2 = _interopRequireDefault(_pay);

var _pay3 = __webpack_require__(284);

var _pay4 = _interopRequireDefault(_pay3);

var _pay_xs = __webpack_require__(283);

var _pay_xs2 = _interopRequireDefault(_pay_xs);

var _pay_xs3 = __webpack_require__(285);

var _pay_xs4 = _interopRequireDefault(_pay_xs3);

var _img_btn = __webpack_require__(281);

var _img_btn2 = _interopRequireDefault(_img_btn);

var _img_btn3 = __webpack_require__(280);

var _img_btn4 = _interopRequireDefault(_img_btn3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//h5_marriage

//h5_emotion2024
// import cn_h5_emotion2024 from '../assets/img/emotion_v2/new/cn/pay.png';
// import tw_h5_emotion2024 from '../assets/img/emotion_v2/new/tw/pay.png';
// import cn_h5_emotion2024_xs from '../assets/img/emotion_v2/new/cn/pay_xs.png';
// import tw_h5_emotion2024_xs from '../assets/img/emotion_v2/new/tw/pay_xs.png';

exports.default = {
  name: 'PayBtn',
  data: function data() {
    return {
      cn_home_btn1: _btn2.default,
      tw_home_btn1: _btn4.default,
      cn_home_btn: _pay2.default,
      tw_home_btn: _pay4.default,
      cn_home_xs_btn: _pay_xs2.default,
      tw_home_xs_btn: _pay_xs4.default

    };
  },

  props: {
    callback: {
      type: Function,
      default: function _default() {}
    },
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    }
  },
  computed: {
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    },
    channel1: function channel1() {
      return ["enjoy01", "panda01"].includes(_utils2.default.getFBChannel());
    },
    channel2: function channel2() {
      return ["enjoy02", "panda02"].includes(_utils2.default.getFBChannel());
    },
    channel3: function channel3() {
      return ["enjoy03", "panda03"].includes(_utils2.default.getFBChannel());
    },
    btn_url: function btn_url() {
      if (_utils2.default.getLanguage() === 'zh-CN') {
        if (this.channel1) {
          return _pay2.default;
        } else if (this.channel2) {
          return _pay_xs2.default;
        } else if (this.channel3) {
          return _btn2.default;
        }
      } else {
        if (this.channel1) {
          return _pay4.default;
        } else if (this.channel2) {
          return _pay_xs4.default;
        } else if (this.channel3) {
          return _btn4.default;
        }
      }
    },
    btn_url_marriage: function btn_url_marriage() {
      if (_utils2.default.getLanguage() === 'zh-CN') {
        return _img_btn4.default;
      } else {
        return _img_btn2.default;
      }
    }
  }
}; //
//
//
//
//
//

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(4);

var _api = __webpack_require__(6);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _enum = __webpack_require__(2);

var _vant = __webpack_require__(65);

__webpack_require__(108);

var _GroupPurchase = __webpack_require__(411);

var _GroupPurchase2 = _interopRequireDefault(_GroupPurchase);

var _PayBtn = __webpack_require__(412);

var _PayBtn2 = _interopRequireDefault(_PayBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var e_id_arr = {
  h5_wealth2024: '60001',
  h5_weigh_bone: '60002',
  h5_bai_gua: '60003',
  h5_marriage: '60005',
  h5_annual2024: '60009',
  h5_emotion2024: '60010',
  h5_career2024: '60011'
};

var tipsArr1 = {
  'zh-CN': '优惠倒计时',
  'zh-TW': '優惠倒計時'
};

var newTipsArr1 = {
  'zh-CN': '您的限时优惠即将到期',
  'zh-TW': '您的限時優惠即將到期'
};
var tipsArr2 = {
  'zh-CN': '人购买当前报告',
  'zh-TW': '人購買當前報告'
};

var tipsArr3 = {
  'zh-CN': '结缘价 ',
  'zh-TW': '結緣價 '
};
var tipsArr4 = {
  'zh-CN': ' 立即解锁内容',
  'zh-TW': ' 立即解鎖內容'
};

var originPriceArr = {
  'zh-CN': '原价 ',
  'zh-TW': '原價 '
};

var tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...'
};
var tipsArr6 = {
  'zh-CN': '请稍等...',
  'zh-TW': '請稍等...'
};
exports.default = {
  components: {
    CountDown: _vant.CountDown,
    GroupPurchase: _GroupPurchase2.default,
    PayBtn: _PayBtn2.default
  },
  data: function data() {
    return {
      tips1: tipsArr1[_utils2.default.getLanguage()],
      tips2: tipsArr2[_utils2.default.getLanguage()],
      tips3: tipsArr3[_utils2.default.getLanguage()],
      tips4: tipsArr4[_utils2.default.getLanguage()],
      new_tips1: newTipsArr1[_utils2.default.getLanguage()],
      pay_methods: [],
      loading: false,
      xsyh_icon: 'https://psychicai-static.psychicai.pro/imgs/24049b44461fceb64a04b15edd6b2a8bb79e.png',
      new_user_icon: 'https://psychicai-static.psychicai.pro/imgs/24040fcec5baef7f4fcea5a1eed3552d734e.png',
      time: 0,
      // time: 5 * 1000,
      time_str_1: '',
      time_str_2: '',
      time_str_3: '',
      product: null,
      is_new_user: false, // 是否是新用户
      check_index: 0, //选中支付方式
      checked_icon: 'https://psychicai-static.psychicai.pro/imgs/24048e756ae2d40f436184b0bc8018199fbb.png',
      no_check_icon: 'https://psychicai-static.psychicai.pro/imgs/2404f091a163349f45d3909f82e4660cc3c6.png',
      start_down: false,
      is_show_shandong: false,
      is_show_daoqi: false,
      payCanClick: false,
      pay_lock_time: 0,
      h5_combo2_attach: undefined, //组合下单信息
      combine_product_ids: [], //组合下单ID集合，由前端拼接

      all_product: [] //所有测算报告、组合优惠
    };
  },

  props: {
    product_key: {
      type: String,
      default: ''
    },
    pay_modal: {
      type: Boolean,
      default: false
    },
    query_user_string: {
      default: '',
      type: String
    },

    e_view_id: {
      type: String,
      default: ''
    },
    c_view_id: {
      type: String,
      default: ''
    },
    e_view_name: {
      type: String,
      default: ''
    },
    a_view_token: {
      type: String,
      default: ''
    },
    e_click_name: {
      type: String,
      default: ''
    },
    c_click_id: {
      type: String,
      default: ''
    },
    a_click_token: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }

  },

  computed: {
    buy_people: function buy_people() {
      var buyList = {
        h5_marriage: '87',
        h5_wealth2024: '142',
        h5_career2024: '103',
        h5_emotion2024: '98',
        h5_annual2024: '193',
        h5_bai_gua: '146',
        h5_weigh_bone: '138'
      };
      return buyList[this.product_key];
    },
    now_price: function now_price() {
      return this.product ? this.product.unit + ' ' + this.product.price_str : '-';
    },
    origin_price: function origin_price() {
      return this.product ? originPriceArr[_utils2.default.getLanguage()] + this.product.unit + ' ' + this.product.origin_price_str : '-';
    },
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    },
    is_show_combination: function is_show_combination() {
      return !["enjoy03", "panda03", "enjoy02", "panda02"].includes(_utils2.default.getFBChannel());
    }
  },
  filters: {
    filterTime: function filterTime(val_) {
      var val = val_.toString();
      if (val.length === 1) {
        return '0' + val;
      } else if (val.length === 2) {
        return val;
      } else {
        return (val / 10).toFixed(0);
      }
    }
  },
  created: function created() {
    // 首次挽留的弹窗计时
    var use_fixed_time = this.$route.query.use_fixed_time;
    if (use_fixed_time) {
      this.time = +localStorage.getItem('mlxz_fixed_local_order_time');
      localStorage.removeItem('mlxz_fixed_local_order_time');
    } else {
      this.time = 15 * 60 * 1000;
      // localStorage.removeItem(`mlxz_new_time_down_${this.product_key}`);
    }

    this.getProductionList();

    this.getPayMethod();

    _utils2.default.firebaseLogEvent(this.e_view_id, this.c_view_id, this.e_view_name, 'view', {
      args_name: this.e_view_name,
      channel: _utils2.default.getFBChannel()
    });
  },
  mounted: function mounted() {},


  methods: {
    getCombineProductIds: function getCombineProductIds(product_ids) {
      this.combine_product_ids = product_ids;
      console.warn('this.combine_product_ids', this.combine_product_ids);
    },
    getTime: function getTime(val) {
      var minutes = val.minutes,
          seconds = val.seconds,
          milliseconds = val.milliseconds;

      var time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      // 是否展示首次挽留弹窗 0 1展示 2不展示  并缓存当前时间用于弹窗倒计时
      var notice_num = localStorage.getItem('mlxz_show_notice_' + this.product_key);
      if (notice_num) {
        if (+notice_num === 1) {
          localStorage.setItem('mlxz_count_down_' + this.product_key, time_);
        }
      } else {
        localStorage.setItem('mlxz_count_down_' + this.product_key, time_);
      }
      localStorage.setItem('mlxz_fixed_local_order_time', time_);

      this.is_show_shandong = time_ < 60 * 1000;
      this.is_show_daoqi = time_ < 31 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time = 0;
        this.$refs.countDown.pause();
        this.$refs.countDown.reset();
      }
    },


    /**
     * @description: 获取当前商品信息
     * @return {*}
     */
    getProductionList: async function getProductionList() {
      var _this = this;

      this.product = null;

      var _ref = await (0, _api.getProductionsAPI)('ceh5'),
          status = _ref.status,
          data = _ref.data;

      if (status === 1000) {
        this.product = data.find(function (item) {
          return item.product_key === _this.product_key;
        });
        //获取所有报告以及套餐
        this.all_product = data;
        //组合两项优惠
        this.h5_combo2_attach = data.find(function (item) {
          return item.product_key === 'h5_combo2_attach';
        });

        this.is_new_user = this.product ? this.product.tags ? this.product.tags.includes('newcomer_discount') : false : false;
      }
    },

    /**
     * @description: 获取支付方式列表
     * @return {*}
     */
    getPayMethod: async function getPayMethod() {
      this.loading = true;
      try {
        var res = await (0, _api.getPayMethodsAPI)();
        this.loading = false;
        if (res.status === 1000) {
          this.start_down = true;
          this.pay_methods = res.data;
          // this.pay_methods = [...res.data,...res.data,...res.data];
        }
      } catch (e) {
        this.loading = false;
      }
    },
    isShowBannerSort: function isShowBannerSort() {
      var channel = _utils2.default.getFBChannel();
      return ['enjoy02', 'panda02'].includes(channel) ? false : true;
    },

    // 事件排序
    logEventForSort: async function logEventForSort(it) {
      if (!this.isShowBannerSort()) return;
      try {
        var res = await (0, _api.reportEventAPI)({
          event_name: it.e_name,
          product_id: it.product_id
        });
        if (res.status !== 1000) return;
      } catch (e) {
        console.error(e);
      }
    },

    /**
     * @description: 创建订单 支付
     * @return {*}
     */
    payMoney: async function payMoney() {
      var _this2 = this;

      if (this.all_product.length === 0) return;
      //防抖
      if (this.payCanClick) {
        return false;
      }
      this.payCanClick = true;
      clearTimeout(this.pay_lock_time);
      this.pay_lock_time = setTimeout(function () {
        _this2.payCanClick = false;
      }, 2000);
      if (_utils2.default.isProd()) {
        _mintUi.Indicator.open(tipsArr6[_utils2.default.getLanguage()]);
        await _utils2.default.checkFB();
        _mintUi.Indicator.close();
        try {
          fbq('track', 'AddToCart');
        } catch (err) {
          console.error('AddToCart error message:', err);
        }
      }
      this.logEventForSort({
        e_name: 'pay_click',
        product_id: this.product.product_id
      });
      //组合套餐购买埋点上报
      if (this.combine_product_ids.length) {
        _utils2.default.firebaseLogEvent(this.product_key === 'h5_emotion2024' ? 10006 : 10007, this.product_key === 'h5_emotion2024' ? -10028 : -10030, this.product_key === 'h5_emotion2024' ? 'click_2024lovelymarriage_pay' : 'click_marriage2024lovely_pay', 'click', {
          args_name: this.product_key === 'h5_emotion2024' ? 'click_2024lovelymarriage_pay' : 'click_marriage2024lovely_pay',
          pay_type: this.pay_methods[this.check_index].title,
          channel: _utils2.default.getFBChannel()
        });
      } else {
        _utils2.default.firebaseLogEvent(this.e_view_id, this.c_click_id, this.e_click_name, 'click', {
          args_name: this.e_click_name,
          pay_type: this.pay_methods[this.check_index].title,
          channel: _utils2.default.getFBChannel()
        });
      }
      var pick_method = this.pay_methods[this.check_index];
      var pay_method = pick_method.pay_method,
          trade_pay_type = pick_method.trade_pay_type,
          trade_target_org = pick_method.trade_target_org,
          fake = pick_method.fake;
      //假支付

      if (fake) {
        (0, _vant.Toast)(this.is_cn ? '请选择其他支付方式' : '請選擇其他支付方式');
        return;
      }
      localStorage.setItem('report_price', this.product.price);
      _mintUi.Indicator.open(tipsArr5[_utils2.default.getLanguage()]);
      var params = {
        pay_method: pay_method,
        product_key: this.combine_product_ids.length ? this.h5_combo2_attach.product_key : this.product_key,
        product_id: this.combine_product_ids.length ? this.h5_combo2_attach.product_id : this.product.product_id,
        combine_product_ids: this.combine_product_ids,
        platform: 'WEB',
        extra_ce_suan: _utils2.default.getExtraParams(this.product_key, this.query_user_string),
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        }
      };
      // let user_time = this.$route.query.use_fixed_time;

      var discount_pay = this.$route.query.discount_pay || 0;
      var user_time = true;
      if (pay_method === 'google_pay') {
        var res = await (0, _api.payOrderAPI)(params);
        localStorage.removeItem('mlxz_set_event_times');

        _mintUi.Indicator.close();
        if (res.status !== 1000) return;
        if (user_time) {
          localStorage.removeItem('mlxz_fixed_order_info');
          localStorage.removeItem('mlxz_fixed_order_key');
          localStorage.removeItem('mlxz_fixed_local_order_time');
          localStorage.removeItem('mlxz_fixed_api_order_time');
        }

        localStorage.setItem('report_order_id', res.data.id);
      } else {
        var pay_max_params = Object.assign({}, params, {
          trade_pay_type: trade_pay_type,
          trade_target_org: trade_target_org
        });
        pay_max_params.callback_url = '' + location.origin + location.pathname + '#/result?path=' + _enum.path_enums[this.product_key] + '&report_price=' + this.product.price + '&discount_pay=' + discount_pay + '&combine_product_ids=' + (this.combine_product_ids.length ? 1 : 0);
        var _res = await (0, _api.payOrderAPI)(pay_max_params);
        localStorage.removeItem('mlxz_set_event_times');
        _mintUi.Indicator.close();
        if (_res.status !== 1000) return;
        if (user_time) {
          localStorage.removeItem('mlxz_fixed_order_info');
          localStorage.removeItem('mlxz_fixed_order_key');
          localStorage.removeItem('mlxz_fixed_local_order_time');
          localStorage.removeItem('mlxz_fixed_api_order_time');
        }
        await _utils2.default.asleep(1000);
        location.href = _res.data.pay_url;
      }
    }
  }
};

/***/ }),
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 314 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 315 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 316 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 317 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABchJREFUaEPtmmtsFGUUht8z25ZeI4ZLKLC7FFSa0pkgBRWMpgFFy07VRFGDRggaVEgwGiKXRKySSNFEQwy3Gg0koPGaqDOAaJGgAS+U4ExpGgK03SIlWKOmBUq3M0cGC27b3bltW/nh/J3zvuc8892/XYKPp+GByUMDMXM3EU9jkODD4qqEwW1gLAurepUfH/Ijai4X5zHTDj/axBo+HlL0G/34+QJolKWnBOAdPwmTaE6HFG2MHz9fANGI9CgIH/hJmEhDjGNBVZvox88XQP3tE/Oyh2Z8BtA0Ju4zBgjIAGhIz4L4IgOdvYskUBuzuTys1m4fNACnRE2ytPISxGvxcZeKXxVWtLVOWq/vfbWAU5L/AZy+UNz7fm2Bs6VFuRdyMRlIe46Ah3p1oU+ArvVZ7Tgycl9du4cabUNTBjg1q3AYZ6bNY6IHmWkGEdLtMjIjRsQHiPlT6uh6f2x1/e+pwPgGOCEXhdKRthLMC0CU6asI5g4QbY2ha+0EpS7qx8MzwKGSkvThozpXCEQrAGT7SZpAc95krmw9k1E5taYm5sXTE0DDvYXjAmkZHwK4xUsSD7E/GV2djxTsrm90q3EN0FI2qSgWCHwNYLRbc59xp9MN4+78XUfr3OhdAUTnFE8lQdjFwHA3pqnGENDKplkW2ll7yMnLEaChXCwMMB0EMNTJrJ/f/2kQTy/4Uq+387UFOFpalJuXk1YDwk0+iqsFcLRbNwlAsWcPxrG2c10lk2zWDVuAqCxtAvCMj8T7g6pWSgBb2gpAWBiRvgXhTs9ewOaQoj2bTJcU4J9+Tz/6OXEx87qwqlvT7NWnKSJWEtFyrwAENtnkW5ONh6QAzbJUzcBMrwm749eGFG1VvDYqS9budKUfPwL2BhVtViJtQoBfZWmKAdT4STYQAJZnACgZo2iHe9eUECAaETeD6OlrCQDMW0Kq3mc89gHguQg0X5DOILU5v1+7UPeHbA1maaPoYxjxH7YPwOmIWNJF5LiAOLTOQAAgjXnqaFXv0bX7ADTNKV5KgrA+he5jSQcEgNhcGlRr37ZtgWhE2gDC4msRAIyNIVVbYgvQHBEVJor0O0CkeBlIeCMVX2JWg6ouO7XAfhDuSCVRoi5k+TWXi2XM9LqvbYVlwPgupGo9VvO+Y0CWDhAwPRUAAlcGFT3hovXRXASmn5cWMOFVr1tzBg6GFW2GfQvI4lcAzU4FAMD3wSyttPeUF+/5y2wp5/oMbATwhPtcvCek6PfYjwFZ3M6gx9ybJo4koNo0jKVhm4NJS9nNI2IB46zbXATeEVT0x50G8WomesWtqW3c5RsIbDKZK8Kq/kfvWK9bFmZ+OazqVte7+vQZA9GIdB8In/cLwL8mrWCsDmZrVfHdqrlcVJg9zHiM+0Oq9oUtwIm7xl+Xnplr3dUE+hnCmkY0NnlZaGdt9SlZXMygHouSQz4j1tE+bMI3J/+yBbg83aW2lXbkJsBgjx8o2ZY64W60KSLNJ8JWx0oGMYAZC8Kqtq13yoQADaXjMgM5eSdBlD+INSZPxdxinGsbX7CvscMVgBUUnSM+D4HevCYATH4htFN/K1EtSY+U1hXiyFGdR0BU9J9CMNedPZMxOdmVo+2tRGOkeIYAYR8cbpwHDJARM2GWjlNrDyTL4Xix1SSLLxJo3YAVaWPM4OVhRbc2f0kfRwBL2RQRtxDRosGEYOaqsKo7nstdAVg7yNsuiFUALRwcCH7vhyx90cO9zr+eBnGi4CZZqiDwS0jx7wU286XJoDVhRatw+6FctUC8WVQung0W3gVhrNskruIYp0DmkyGldo+r+O4gzwCWzvox72JuwGqJJQzkeEmYYCE6B/CGIe3GGj8//vkCuFJES9kNI7oC2YtNYD4BBV5AGGgQgG1pxvmN+buO/+ZFGx+bEsAVI740uqMRcQozzQwEeBqbKCSifAbyrBgC2pi5hQTUGwb9TMR7Q6p++Mrttd/iLd3fTy4pT25X190AAAAASUVORK5CYII="

/***/ }),
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_title_jian.696cb92.png";

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/tittle_img_gejujiedu_jian.f544ea4.png";

/***/ }),
/* 342 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABM5JREFUaEPdmn9QG0UUx99ecklDEkgh/IgYRKX2l0lBGAGt2v5R0XLMqKMitbWjdrRKcbCCVh3pFEetgm1GQKtTnalUEHXUkRTF/mH9WXCoIEx/CSomYigEDCQhJJfknA2mAhIuKQFd7t/b+7793L7dffveIgjD03OjNk4k8q4HDmUhBMs5gGUIkIIDkGN5BGDlgLMggG6Og7OAuBaXi/oi5fPOgbmaRxcqYMxZHc3RVAECtAVFyK4Wr0pDohVaoBOTQahSAyWLBEoS4ZP3OsbAaxsFt8kIbF8vuM50gvNUO8eN2b7ngKtFrLde3Xxy+EL6EjJAb85KFUULS5BQ/KAka51Uev1NINZkAKIEIdnnvB5wdrWB/avPwNFyzM65na97WXdlcvNpUyhCQQO0pafTShVbLBCJymQbbpPJmQIQRCtDsRWwrWfYDFZ9PdiOfmjzuFzlZhOtyzhxgg1GPCgAY87qFKAF74nTstOW3vsoCOMTg9EOuY37XB/8+dZ+cHQcb6dYz53q5pM9fCK8AL/maW4RCsWHFFsfiZRtuJVPLyzvbUc/AsuhV0bdbufWSxu7Pp5NdFaA33I1DwgVyleVuyoEosuWh6VzwYq4fjkL5r2lHrfF/PAlR7reCPRdQADceTo+8UDs0zokTJgfl+GDcff3weBzxRx7rm97IIgZAbDbiCKVH8SVvyb4rzrvh8MQA2UPeVyj5ttncqd/AfzMrFwmoqVtceUHIhfabQKNCHangbLtoy7WnnG5/nT35HZTAPBSGa9iWxXbStIWasLyuZH/PZ7Ywwcr2wdNdObkJXYKQC+jLY1IzX4p9snKYHUDr+0jw2D9pA4AIZDnFYAgKnrOmoMvlMBYx/HHk/WdFX6x8wB4hxVIpT8lVB6WhWOdH9hTCM5THT474lWpELe7Zs4AeJ/oL9ls89jtV/h37PMABkbzsjy3YKfinqI5G8ICxoLrALzeCS2KAnX912HRtbxdBdYj9fuS9F2PYUEfAA7MQCIxqKrel4YrPDDmXzulw+qGb8MCgMMOU9EddnA4knAA6AMwMJrCiLU51TFFu8NixPdT5gkAaw9V7YGxb5p3JOm7aiZGgNG2KJ/al7lkTSYRAOM/toL5+Z2tan1nFsKHkSUKWf9FbzahUEPi2WjncwRwKP7H/Ru5cYstARmYNfmSjLXvKkv3hu3vz7cLYX1zxS5wtH15FzLkavZHbdlRHJm3iSiA0cY6GKmt1iEjo2mKeaLyZslV1xAF4PjhOxh6seRTZGA03Qm6hhRapSYKgDUZob84vwcZGe2g6mCTUiCP4gXwjAzDkO4ZcJ7p/GeT4v0qyAYUBeIVWogpfjaosMNjHQHTto1mZGC04xe/c0yMhDSvJUttte/sOp+PPG8TKDYX8prg3Cz8fvc6Z2gAh2vA2ljHKz6XBiEDLAIXIn4Sk76Mkr6RGZgr8yUZN5AbShAfzBEfTi+OAw3pR8q/R4HcQz0GID6t4oMgObGFAXBqMVbFtkaTmlrEEP/n5C6MOdKnV20WX3rdH8sTXeCYDEFsickPQXSRzw/hm9hAN4hTs9OW3rcwZVY3sPnTqzEzHVV5y6z+j4gudE8mJ/aqwfThI/ayx0x+OHHdBq0HzhvkdRuqxeXiwnLd5i8swy0mCy7VdwAAAABJRU5ErkJggg=="

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card1.fd22e91.png";

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card2.701d6c3.png";

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card3.24a20b9.png";

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card4.f55b463.png";

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card5.42f8ac0.png";

/***/ }),
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card1.c6e8de1.png";

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card2.9d71ef9.png";

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card3.15d3571.png";

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card4.8cad0b4.png";

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card5.c4fc0ad.png";

/***/ }),
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(315)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(300),
  /* template */
  __webpack_require__(415),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3cc266aa",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(316)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(301),
  /* template */
  __webpack_require__(416),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5134a906",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(317)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(302),
  /* template */
  __webpack_require__(417),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-d6288ef2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(313)
  __webpack_require__(314)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(303),
  /* template */
  __webpack_require__(414),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2e06d7f6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 414 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.className
  }, [(!_vm.pay_methods.length && _vm.loading) ? _c('div', {
    staticClass: "no-empty"
  }, [_c('mt-spinner', {
    attrs: {
      "type": "fading-circle",
      "size": 60
    }
  })], 1) : _c('div', {
    staticClass: "pay-list"
  }, [(!_vm.is_show_combination) ? _c('div', {
    staticClass: "discount"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('img', {
    staticClass: "xsyh",
    attrs: {
      "src": _vm.is_new_user ? _vm.new_user_icon : _vm.xsyh_icon,
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "price-box"
  }, [_c('div', {
    staticClass: "now-price"
  }, [_vm._v(_vm._s(_vm.now_price))]), _vm._v(" "), _c('div', {
    staticClass: "origin-price"
  }, [_vm._v(_vm._s(_vm.origin_price))])])]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "desc"
  }, [_c('count-down', {
    ref: "countDown",
    staticClass: "time-box",
    attrs: {
      "time": _vm.time,
      "millisecond": ""
    },
    on: {
      "change": _vm.getTime
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(timeData) {
        return [_c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.minutes)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.seconds)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_c('span', {
          class: {
            mill: _vm.time === 1
          }
        }, [_vm._v("\n                  " + _vm._s(_vm._f("filterTime")(timeData.milliseconds)) + "\n                ")])])]
      }
    }], null, false, 1307870684)
  })], 1), _vm._v(" "), _c('div', {
    class: {
      title: true,
      'rgb-color': _vm.is_show_shandong,
    }
  }, [_vm._v("\n          " + _vm._s(_vm.is_show_daoqi ? _vm.new_tips1 : _vm.tips1) + "\n        ")])])]) : _c('div', {
    staticClass: "discount-comb"
  }, [_c('GroupPurchase', {
    attrs: {
      "product": _vm.product,
      "h5_combo2_attach": _vm.h5_combo2_attach,
      "all_product": _vm.all_product,
      "product_key": _vm.product_key,
      "currentIndex": 0
    },
    on: {
      "get_combine_product_ids": _vm.getCombineProductIds
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "divider-line"
  }), _vm._v(" "), _c('div', {
    staticClass: "pay-type"
  }, [_vm._v("支付方式")]), _vm._v(" "), _c('div', {
    staticClass: "buy-people"
  }, [_vm._v("\n      今日已有"), _c('span', [_vm._v(_vm._s(_vm.buy_people))]), _vm._v(_vm._s(_vm.tips2) + "\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "method-list"
  }, [_vm._l((_vm.pay_methods), function(it, k) {
    return _c('div', {
      key: k,
      staticClass: "item",
      on: {
        "click": function($event) {
          _vm.check_index = k
        }
      }
    }, [_c('div', {
      staticClass: "left"
    }, [_c('img', {
      attrs: {
        "src": it.icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "name"
    }, [_vm._v(_vm._s(it.title))])]), _vm._v(" "), _c('img', {
      staticClass: "right",
      attrs: {
        "src": _vm.check_index === k ? _vm.checked_icon : _vm.no_check_icon,
        "alt": ""
      }
    })])
  }), _vm._v(" "), _c('PayBtn', {
    attrs: {
      "product_key": _vm.product_key,
      "callback": _vm.payMoney
    }
  })], 2)])])
},staticRenderFns: []}

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main",
    attrs: {
      "id": _vm.product_key !== 'h5_emotion2024' ? 'mode_middle' : ''
    }
  }, [(_vm.product_key === 'h5_emotion2024') ? _c('div', {
    staticClass: "header_img"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(341),
      "alt": ""
    }
  })]) : _c('div', {
    staticClass: "header_img-bzhh"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(340),
      "alt": ""
    }
  })]), _vm._v(" "), _vm._l((_vm.renderData), function(item, idx) {
    return _c('div', {
      key: idx
    }, [_c('div', {
      staticClass: "nav_item"
    }, [_c('div', {
      staticClass: "nav_header"
    }, [_vm._v("\n                " + _vm._s(item.user_desc) + "\n            ")]), _vm._v(" "), _c('div', {
      staticClass: "nav_desc",
      domProps: {
        "innerHTML": _vm._s(item.all)
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "nav_item"
    }, [(_vm.product_key === 'h5_emotion2024') ? _c('div', {
      staticClass: "nav_header"
    }, [_c('img', {
      attrs: {
        "src": __webpack_require__(268),
        "alt": ""
      }
    }), _vm._v(" "), _c('span', [_vm._v("感情方面")]), _vm._v(" "), _c('img', {
      attrs: {
        "src": __webpack_require__(270),
        "alt": ""
      }
    })]) : _c('div', {
      staticClass: "nav_header"
    }, [_c('img', {
      attrs: {
        "src": __webpack_require__(267),
        "alt": ""
      }
    }), _vm._v(" "), _c('span', [_vm._v("感情方面")]), _vm._v(" "), _c('img', {
      attrs: {
        "src": __webpack_require__(269),
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "nav_desc",
      domProps: {
        "innerHTML": _vm._s(item.love)
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "nav_item"
    }, [(_vm.product_key === 'h5_emotion2024') ? _c('div', {
      staticClass: "nav_header"
    }, [_c('img', {
      attrs: {
        "src": __webpack_require__(268),
        "alt": ""
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.is_cn ? "事业方面 " : "事業方面"))]), _vm._v(" "), _c('img', {
      attrs: {
        "src": __webpack_require__(270),
        "alt": ""
      }
    })]) : _c('div', {
      staticClass: "nav_header"
    }, [_c('img', {
      attrs: {
        "src": __webpack_require__(267),
        "alt": ""
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.is_cn ? "事业方面 " : "事業方面"))]), _vm._v(" "), _c('img', {
      attrs: {
        "src": __webpack_require__(269),
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "nav_desc",
      domProps: {
        "innerHTML": _vm._s(item.cause)
      }
    })]), _vm._v(" "), ((_vm.product_key !== 'h5_emotion2024') && (idx !== _vm.renderData.length - 1)) ? _c('div', {
      staticClass: "nav_item"
    }, [_c('div', {
      staticClass: "nav_line"
    })]) : _vm._e()])
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.h5_combo2_attach) ? _c('div', {
    staticClass: "group-purchase"
  }, [_c('div', {
    staticClass: "product-container"
  }, [_c('div', {
    class: [
      _vm.selectIndex ? 'left-product' : 'left-product-select',
      'both-product-container' ],
    style: (_vm.getLeftBg()),
    on: {
      "click": function($event) {
        return _vm.changeComboHandle(0)
      }
    }
  }, [(_vm.selectIndex === 0) ? _c('img', {
    staticClass: "check_icon",
    attrs: {
      "src": __webpack_require__(242)
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: ['title', this.selectIndex ? 'title-unselect' : null]
  }, [_vm._v("\n        单项购买\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "image-contaier-left"
  }, [_c('img', {
    staticClass: "icon",
    attrs: {
      "src": _vm.product_key === 'h5_marriage' ?
        _vm.getH5MarriageIcon :
        _vm.new_ganqing_small
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_vm._v("\n          " + _vm._s(_vm.product_key === "h5_marriage" ? "八字合婚" : "2024年感情运势") + "\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "bottom-container",
    style: ({
      background: this.selectIndex ? '#DFDFDF' : '#E24C2E'
    })
  }, [_c('div', {
    class: ['left', this.selectIndex ? 'left-unselect' : null]
  }, [_vm._v(_vm._s(this.now_price))]), _vm._v(" "), _c('div', {
    class: ['right', this.selectIndex ? 'right-unselect' : null]
  }, [_vm._v(_vm._s(this.origin_price))])])]), _vm._v(" "), _c('div', {
    class: [
      _vm.selectIndex ? 'right-product-select' : 'right-product',
      'both-product-container' ],
    style: (_vm.getRightBg()),
    on: {
      "click": function($event) {
        return _vm.changeComboHandle(1)
      }
    }
  }, [(_vm.selectIndex === 1) ? _c('img', {
    staticClass: "check_icon",
    attrs: {
      "src": __webpack_require__(242)
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: ['title', this.selectIndex ? null : 'title-unselect']
  }, [_vm._v("\n        超值套餐\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "image-contaier-right"
  }, [_c('div', {
    staticClass: "image-item-contaier"
  }, [_c('img', {
    staticClass: "icon",
    attrs: {
      "src": _vm.product_key === 'h5_marriage' ?
        _vm.getH5MarriageIcon :
        _vm.new_ganqing_small
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_vm._v("\n            " + _vm._s(_vm.product_key === "h5_marriage" ? "八字合婚" : "2024年感情运势") + "\n          ")])]), _vm._v(" "), _c('img', {
    staticClass: "icon-plus",
    attrs: {
      "src": __webpack_require__(342)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "image-item-contaier"
  }, [_c('img', {
    staticClass: "icon",
    attrs: {
      "src": _vm.product_key === 'h5_marriage' ?
        _vm.new_ganqing_small :
        _vm.getH5MarriageIcon
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_vm._v("\n            " + _vm._s(_vm.product_key === "h5_marriage" ? "2024年感情运势" : "八字合婚") + "\n          ")])])]), _vm._v(" "), _c('div', {
    staticClass: "bottom-container",
    style: ({
      background: this.selectIndex ? '#E24C2E' : '#DFDFDF'
    })
  }, [_c('div', {
    class: ['left', !this.selectIndex ? 'left-unselect' : null]
  }, [_vm._v(_vm._s(this.now_price_combo))]), _vm._v(" "), _c('div', {
    class: ['right', !this.selectIndex ? 'right-unselect' : null]
  }, [_vm._v(_vm._s(this.origin_price_combo))])])])]), _vm._v(" "), _c('div', {
    staticClass: "time-container"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "right-container"
  }, [_c('count-down', {
    ref: "countDown",
    staticClass: "time-box",
    attrs: {
      "time": _vm.time,
      "millisecond": ""
    },
    on: {
      "change": _vm.getTime
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(timeData) {
        return [_c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.minutes)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_vm._v(_vm._s(_vm._f("filterTime")(timeData.seconds)))]), _vm._v(" "), _c('span', {
          class: {
            colon: true,
            'rgb-color': _vm.is_show_shandong
          }
        }, [_vm._v(":")]), _vm._v(" "), _c('span', {
          class: {
            block: true,
            'rgb-light': _vm.is_show_shandong,
          }
        }, [_c('span', {
          class: {
            mill: _vm.time === 1
          }
        }, [_vm._v("\n              " + _vm._s(_vm._f("filterTime")(timeData.milliseconds)) + "\n            ")])])]
      }
    }], null, false, 2382433884)
  })], 1)])]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "left-container"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(329)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_vm._v("限时优惠倒计时")])])
}]}

/***/ }),
/* 417 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('img', {
    style: ({
      marginBottom: _vm.product_key === 'h5_marriage' ? '0.2rem' : '0',
      width: '6.26rem',
      display: 'flex',
      alignSelf: 'center'
    }),
    attrs: {
      "src": _vm.product_key === 'h5_marriage' ? _vm.btn_url_marriage : _vm.btn_url
    },
    on: {
      "click": function($event) {
        return _vm.callback()
      }
    }
  })
},staticRenderFns: []}

/***/ }),
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_title.f6eda75.png";

/***/ }),
/* 614 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_title.f85fa69.png";

/***/ }),
/* 615 */,
/* 616 */,
/* 617 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/heart.7e05e9b.png";

/***/ }),
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(964)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(795),
  /* template */
  __webpack_require__(1683),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a534678c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 673 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(928)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(797),
  /* template */
  __webpack_require__(1647),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5c2212ec",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-31 11:28:50
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-22 18:59:39
 * @Description:
 */
exports.default = {
  'dom-title': '八字合婚',
  'name-placeholder': '请输入您的姓名',
  'birth-placeholder': '请输入出生日期(必填)',
  'check-label': '我已阅读同意',
  'user-agreement': '《用户协议》',
  and: '和',
  'privacy-policy': '《隐私协议》',
  'cesuan-label': '测算',
  'history-order': '查询历史订单',
  'year-label': '年',
  'month-label': '月',
  'day-label': '日',
  'gongli-label': '公历',
  'nongli-label': '农历',
  'shichen-label': '时辰',
  'taisui-label': '太岁名称',
  'liunian-label': '流年纳音',
  'taisuifangwei-label': '太岁方位',
  'ganzhijinian-label': '干支纪年',
  'suipofangwei-label': '岁破方位',
  'mingfantaisui-label': '命犯太岁',
  'zhaifantaisui-label': '宅犯太岁',
  'dayun-label': '大运',
  'age-label': '年龄',
  'order-number': '订单号',
  'click-order': '(点击复制订单号)',
  'hepan-label': '男女命宮合盘',
  'yiju-label': '婚后住宅宜居',
  'result-check': '结果查询中...',
  'fail-result': '订单查询失败',
  'male-name-check': '请输入男方姓名',
  'female-name-check': '请输入女方姓名',
  'chinese-name-check': '请输入中文姓名',
  'male-date-check': '请输入男方出生日期',
  'female-date-check': '请输入女方出生日期',
  'agree-check': '请阅读并同意《用户协议》和《隐私协议》',
  'pay-check': '支付中',
  'tips-1': '立即解锁'
};

/***/ }),
/* 691 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-12 17:15:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-22 18:59:50
 * @Description:
 */
exports.default = {
  'dom-title': '八字合婚',
  'name-placeholder': '請輸入您的姓名',
  'birth-placeholder': '請輸入出生日期(必填)',
  'check-label': '我已閱讀同意',
  'user-agreement': '《用戶協議》',
  and: '和',
  'privacy-policy': '《隱私協議》',
  'cesuan-label': '測算',
  'history-order': '查詢歷史訂單',
  'year-label': '年',
  'month-label': '月',
  'day-label': '日',
  'gongli-label': '公曆',
  'nongli-label': '農曆',
  'result-check': '結果查詢中...',
  'fail-result': '訂單查詢失敗',
  'shichen-label': '時辰',
  'taisui-label': '太歲名稱',
  'liunian-label': '流年納音',
  'taisuifangwei-label': '太歲方位',
  'ganzhijinian-label': '干支紀年',
  'suipofangwei-label': '歲破方位',
  'mingfantaisui-label': '命犯太歲',
  'zhaifantaisui-label': '宅犯太歲',
  'dayun-label': '大運',
  'age-label': '年齡',
  'order-number': '訂單號',
  'click-order': '(點擊復製訂單號)',
  'hepan-label': '男女命宮合盤',
  'yiju-label': '婚後住宅宜居',
  'male-name-check': '請輸入男方姓名',
  'female-name-check': '請輸入女方姓名',
  'chinese-name-check': '請輸入中文姓名',
  'male-date-check': '請輸入男方出生日期',
  'female-date-check': '請輸入女方出生日期',
  'agree-check': '請閱讀並同意《用戶協議》和《隱私協議》',
  'pay-check': '支付中',
  'tips-1': '立即解鎖'
};

/***/ }),
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(249);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _index = __webpack_require__(1590);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(1587);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(1594);

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default); /*
                                         * @Author: wujiang@weli.cn
                                         * @Date: 2023-10-18 11:45:29
                                         * @LastEditors: wujiang
                                         * @LastEditTime: 2023-10-23 17:37:53
                                         * @Description:
                                         */
exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'index',
    component: _index2.default
  }, {
    path: '/detail',
    name: 'detail',
    component: _index4.default
  }, {
    path: '/result',
    name: 'result',
    component: _index6.default
  }, {
    path: '*',
    redirect: '/'
  }]
});

/***/ }),
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(918)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(802),
  /* template */
  __webpack_require__(1637),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */,
/* 730 */,
/* 731 */,
/* 732 */,
/* 733 */,
/* 734 */,
/* 735 */,
/* 736 */,
/* 737 */,
/* 738 */,
/* 739 */,
/* 740 */,
/* 741 */,
/* 742 */,
/* 743 */,
/* 744 */,
/* 745 */,
/* 746 */,
/* 747 */,
/* 748 */,
/* 749 */,
/* 750 */,
/* 751 */,
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    methods: {
        toOrder: function toOrder() {
            _utils2.default.toOrder();
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */,
/* 764 */,
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */,
/* 769 */,
/* 770 */,
/* 771 */,
/* 772 */,
/* 773 */,
/* 774 */,
/* 775 */,
/* 776 */,
/* 777 */,
/* 778 */,
/* 779 */,
/* 780 */,
/* 781 */,
/* 782 */,
/* 783 */,
/* 784 */,
/* 785 */,
/* 786 */,
/* 787 */,
/* 788 */,
/* 789 */,
/* 790 */,
/* 791 */,
/* 792 */,
/* 793 */,
/* 794 */,
/* 795 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(6);

var _lunarJavascript = __webpack_require__(94);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Bazi',
  props: {
    user_info: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      gan: ['？', '？', '？', '？'],
      zhi: ['？', '？', '？', '？']
    };
  },
  created: async function created() {},
  mounted: async function mounted() {
    await this.formateQueryUserInfo(this.user_info);
    this.getUserBazi();
    // Code to run when the component is mounted
  },

  methods: {
    /**
     * @description: 获取八字颜色
     * @param {*} val
     * @return {*}
     */
    styleColor: function styleColor(val) {
      return _utils2.default.getBaziStyleColor(val);
    },

    /**
     * @description: 格式化用户信息
     * @param {*} string
     * @return {*}
     */
    formateQueryUserInfo: async function formateQueryUserInfo(string) {
      var arr = string.split('|');
      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];
      this.sex = +arr[1];
      this.gongli_nongli = +arr[2];
      this.picker_hour = _utils2.default.formateNongliHour(arr[6]);
      var android_date = this.year + '-' + this.month + '-' + this.date;
      var ios_date = this.year + '/' + this.month + '/' + this.date;
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? android_date : ios_date));
      var lunar = solar.getLunar();
      this.picker_date_nongli = +this.gongli_nongli ? lunar.getYear() + '\u5E74' + lunar.getMonthInChinese() + '\u6708' + lunar.getDayInChinese() + ' ' + this.picker_hour : this.year + '\u5E74' + _utils2.default.formateNongliMonth(this.month) + _utils2.default.formateNongliDate(this.date) + ' ' + this.picker_hour;
      this.picker_date_yangli = +this.gongli_nongli ? this.year + '-' + this.month + '-' + this.date + ' ' + this.picker_hour : _lunarJavascript.Lunar.fromYmd(+this.year, +this.month, +this.date).getSolar().toString() + ' ' + this.picker_hour;
    },

    /**
     * @description: 获取用户八字
     * @return {*}
     */
    getUserBazi: async function getUserBazi() {
      var hour_ = this.birth_hour === '-1' ? '12' : this.birth_hour;
      var str_date = this.year + '-' + this.month + '-' + this.date + ' ' + hour_ + ':00:00';
      var ios_date = this.year + '/' + this.month + '/' + this.date + ' ' + hour_ + ':00:00';
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? str_date : ios_date));
      var lunar = solar.getLunar();
      var lunarMonth = _lunarJavascript.LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      var is_leap = lunarMonth.isLeap();
      var data_ = {
        year: this.year,
        month: this.month,
        day: this.date,
        hour: this.birth_hour,
        minute: '0',
        is_gongli: this.gongli_nongli,
        leap_month: '0',
        gender: this.sex
      };

      var _ref = await (0, _api.getBaziAPI)(data_),
          status = _ref.status,
          data = _ref.data;

      if (status !== 1000) return;
      this.$emit('get_user_info', this.sex, data.gejujiedu);
      this.gan = data.gan;
      this.zhi = data.zhi;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 796 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PayCard = __webpack_require__(167);

var _PayCard2 = _interopRequireDefault(_PayCard);

var _Marquee = __webpack_require__(114);

var _Marquee2 = _interopRequireDefault(_Marquee);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _suishenHuangli = __webpack_require__(826);

var _suishenHuangli2 = _interopRequireDefault(_suishenHuangli);

var _suishenWnl = __webpack_require__(118);

var _suishenWnl2 = _interopRequireDefault(_suishenWnl);

var _img_title = __webpack_require__(613);

var _img_title2 = _interopRequireDefault(_img_title);

var _img_title3 = __webpack_require__(614);

var _img_title4 = _interopRequireDefault(_img_title3);

var _text = __webpack_require__(1378);

var _text2 = _interopRequireDefault(_text);

var _img_word = __webpack_require__(1143);

var _img_word2 = _interopRequireDefault(_img_word);

var _ = __webpack_require__(1134);

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(1135);

var _4 = _interopRequireDefault(_3);

var _5 = __webpack_require__(1136);

var _6 = _interopRequireDefault(_5);

var _7 = __webpack_require__(1137);

var _8 = _interopRequireDefault(_7);

var _9 = __webpack_require__(1138);

var _10 = _interopRequireDefault(_9);

var _11 = __webpack_require__(1139);

var _12 = _interopRequireDefault(_11);

var _13 = __webpack_require__(1140);

var _14 = _interopRequireDefault(_13);

var _15 = __webpack_require__(1141);

var _16 = _interopRequireDefault(_15);

var _17 = __webpack_require__(1369);

var _18 = _interopRequireDefault(_17);

var _19 = __webpack_require__(1370);

var _20 = _interopRequireDefault(_19);

var _21 = __webpack_require__(1371);

var _22 = _interopRequireDefault(_21);

var _23 = __webpack_require__(1372);

var _24 = _interopRequireDefault(_23);

var _25 = __webpack_require__(1373);

var _26 = _interopRequireDefault(_25);

var _27 = __webpack_require__(1374);

var _28 = _interopRequireDefault(_27);

var _29 = __webpack_require__(1375);

var _30 = _interopRequireDefault(_29);

var _31 = __webpack_require__(1376);

var _32 = _interopRequireDefault(_31);

var _modal_bg = __webpack_require__(1377);

var _modal_bg2 = _interopRequireDefault(_modal_bg);

var _PayModal = __webpack_require__(168);

var _PayModal2 = _interopRequireDefault(_PayModal);

var _shengxiao = __webpack_require__(673);

var _shengxiao2 = _interopRequireDefault(_shengxiao);

var _bazi = __webpack_require__(672);

var _bazi2 = _interopRequireDefault(_bazi);

var _img_btn = __webpack_require__(281);

var _img_btn2 = _interopRequireDefault(_img_btn);

var _img_btn3 = __webpack_require__(280);

var _img_btn4 = _interopRequireDefault(_img_btn3);

var _enum = __webpack_require__(2);

var _HomeFooter = __webpack_require__(165);

var _HomeFooter2 = _interopRequireDefault(_HomeFooter);

var _PayDetail = __webpack_require__(413);

var _PayDetail2 = _interopRequireDefault(_PayDetail);

var _NewFooter = __webpack_require__(112);

var _NewFooter2 = _interopRequireDefault(_NewFooter);

var _GejuInfo = __webpack_require__(410);

var _GejuInfo2 = _interopRequireDefault(_GejuInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var mockTipsArr = {
  'zh-CN': '成功解锁了八字合婚的详细解析',
  'zh-TW': '成功解鎖了八字合婚的詳細解析'
};
var tips1 = {
  'zh-CN': '成功解锁了',
  'zh-TW': '成功解鎖了'
};
var tips2 = {
  'zh-CN': '的详细解析',
  'zh-TW': '的詳細解析'
};
exports.default = {
  components: {
    PayCard: _PayCard2.default,
    Marquee: _Marquee2.default,
    baziInfo: _bazi2.default,
    payModal: _PayModal2.default,
    shengxiao: _shengxiao2.default,
    HomeFooter: _HomeFooter2.default,
    PayDetail: _PayDetail2.default,
    NewFooter: _NewFooter2.default,
    GejuInfo: _GejuInfo2.default
  },
  data: function data() {
    return {
      cn_btn: _img_btn4.default,
      tw_btn: _img_btn2.default,
      product_id: 23,
      product_key: 'h5_marriage',
      query_user_string: '',
      tips1: tips1,
      tips2: tips2,
      mname: '',
      mbirth: '',
      fname: '',
      fbirth: '',
      language: _utils2.default.getLanguage(),
      cn_img_title: _img_title2.default,
      tw_img_title: _img_title4.default,
      cn_img_word: _img_word2.default,
      tw_img_word: _text2.default,
      cn_mokuai1: _2.default,
      cn_mokuai2: _4.default,
      cn_mokuai3: _6.default,
      cn_mokuai4: _8.default,
      cn_mokuai5: _10.default,
      cn_mokuai6: _12.default,
      cn_mokuai7: _14.default,
      tw_mokuai1: _18.default,
      tw_mokuai2: _20.default,
      tw_mokuai3: _22.default,
      tw_mokuai4: _24.default,
      tw_mokuai5: _26.default,
      tw_mokuai6: _28.default,
      tw_mokuai7: _30.default,
      showFixedBtn: false,
      // baziInfo
      male_user_string: this.$route.query.male_str,
      female_user_string: this.$route.query.female_str,
      is_show_btn: true,
      pay_modal: false,
      tw_modal_bg: _modal_bg2.default,
      cn_modal_bg: 'https://psychicai-static.psychicai.pro/imgs/240439e6ef4d89894c5d88378c3cbd7790fb.png',
      mingge_desc: [], //命格生日信息展示  
      mingge_minfo: [], //命格男性信息
      mingge_finfo: [] //命格女性信息
    };
  },

  filters: {
    nameFilter: function nameFilter(val) {
      return _utils2.default.getShortStr(val, 4);
    }
  },

  created: function created() {
    _utils2.default.firebaseLogEvent('10007', '-10003', 'page_view_marriage_mid', 'page_view', {
      args_name: 'page_view_marriage_mid',
      channel: _utils2.default.getFBChannel()
    });
    this.query_user_string = this.$route.query.querystring;

    this.parseUserString();
  },

  computed: {
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    },

    //套餐支付显示逻辑
    is_show_combination: function is_show_combination() {
      return !["enjoy03", "panda03", "enjoy02", "panda02"].includes(_utils2.default.getFBChannel());
    },
    is_show_combinationSpecial02: function is_show_combinationSpecial02() {
      return !["enjoy03", "panda03"].includes(_utils2.default.getFBChannel());
    }
  },
  mounted: function mounted() {
    var _this = this;

    window.scrollTo(0, 0);
    setTimeout(function () {
      _this.$nextTick(function () {
        //排除渠道3
        if (!_this.is_show_combinationSpecial02) return;
        // 滚动到指定元素
        var element = document.getElementById('title-pay');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }, 500);

    var btn = document.getElementById('info-btn');
    var self = this;

    var initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      self.is_show_btn = initialWindowHeight > window.innerHeight ? false : true;
    });
    this.$nextTick(function () {
      var dom = document.querySelector('.btn-fixed');
      if (dom) {
        _utils2.default.firebaseLogEvent('10007', '-10019', 'view_ marriage_button', 'view', {
          args_name: 'view_ marriage_button',
          channel: _utils2.default.getFBChannel()
        });
      }
    });
  },

  methods: {
    getUserInfo: function getUserInfo(sex, info) {
      if (sex === 0) {
        this.mingge_finfo = info;
      } else {
        this.mingge_minfo = info;
      }
    },


    /**
     * @description: 获取随机用户列表
     * @return {*}
     */
    getRandomList: function getRandomList() {
      var arr = ['我的', 'vt1', '椒', '14', '96', '小', 'il', '2o', '22'];
      var new_arr = [];
      for (var i = 0; i < 200; i++) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        new_arr.push({
          desc1: arr[randomIndex] + '***',
          desc2: tips1[this.language],
          desc3: tips2[this.language]
        });
      }

      return new_arr;
    },


    /**
     * @description: 用户生辰解析
     * @return {*}
     */
    parseUserString: function parseUserString() {
      var query_user_string_array = this.query_user_string.split('|');
      var myear = query_user_string_array[2];
      var mmonth = query_user_string_array[3];
      var mdate = query_user_string_array[4];
      this.mname = query_user_string_array[0];
      var fyear = query_user_string_array[5];
      var fmonth = query_user_string_array[6];
      var fdate = query_user_string_array[7];
      this.fname = query_user_string_array[1];
      // 男性生日農曆
      if (query_user_string_array[10] === '0') {
        var mday = this.getGlDate(myear, mmonth, mdate);
        this.mbirth = this.$t('nongli-label') + ' ' + myear + '\u5E74' + mday.nmonthstr + mday.ndatestr;
        this.mingge_desc.push(_utils2.default.getShortStr(this.mname, 4) + '\uFF0C\u7537\uFF0C' + myear + '\u5E74' + mday.nmonthstr + mday.ndatestr + '\u751F\u4EBA\uFF0C');
      } else {
        this.mbirth = this.$t('gongli-label') + ' ' + myear + '\u5E74' + mmonth + '\u6708' + mdate + '\u65E5';
        this.mingge_desc.push(_utils2.default.getShortStr(this.mname, 4) + '\uFF0C\u7537\uFF0C' + myear + '\u5E74' + mmonth + '\u6708' + mdate + '\u65E5\u751F\u4EBA\uFF0C');
      }
      // 女性生日農曆
      if (query_user_string_array[11] === '0') {
        var fday = this.getGlDate(fyear, fmonth, fdate);
        this.fbirth = this.$t('nongli-label') + ' ' + fyear + '\u5E74' + fday.nmonthstr + fday.ndatestr;
        this.mingge_desc.push(_utils2.default.getShortStr(this.fname, 4) + '\uFF0C\u5973\uFF0C' + fyear + '\u5E74' + fday.nmonthstr + fday.ndatestr + '\u751F\u4EBA');
      } else {
        this.fbirth = this.$t('gongli-label') + ' ' + fyear + '\u5E74' + fmonth + '\u6708' + fdate + '\u65E5';
        this.mingge_desc.push(_utils2.default.getShortStr(this.fname, 4) + '\uFF0C\u5973\uFF0C' + fyear + '\u5E74' + fmonth + '\u6708' + fdate + '\u65E5\u751F\u4EBA');
      }
    },


    /**
     * @description: 获取公历日期
     * @param {*} year
     * @param {*} month
     * @param {*} date
     * @return {*}
     */
    getGlDate: function getGlDate(year, month, date) {
      var twoYearAllDate = [];
      for (var i = 0; i < 12; i++) {
        twoYearAllDate = twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year, i + 1));
      }
      for (var _i = 0; _i < 12; _i++) {
        twoYearAllDate = twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year / 1 + 1, _i + 1));
      }

      twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year + 1, 1));
      twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year + 1, 2));

      var gldate = twoYearAllDate.find(function (item) {
        return item.nyear == year && item.nmonth == month && item.ndate == date;
      });
      if (this.language === 'zh-TW' && gldate.nmonth === 12) {
        gldate.nmonthstr = '臘月';
      }
      return gldate;
    },


    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    showPayModal: function showPayModal() {
      this.$refs.payDetail.payMoney();
      return;
      _utils2.default.firebaseLogEvent('10007', '-10004', 'click_marriage_mid', 'click', {
        args_name: 'click_marriage_mid',
        channel: _utils2.default.getFBChannel()
      });
      this.pay_modal = true;
    },
    jumpHome: function jumpHome() {
      location.href = location.origin + location.pathname;
    }
  }
};

/***/ }),
/* 797 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(6);

var _lunarJavascript = __webpack_require__(94);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'Bazi',
  props: {
    male_str: {
      type: String,
      default: ''
    },
    female_str: {
      type: String,
      default: ''
    },
    is_result: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      year: '',
      month: '',
      date: '',
      birth_hour: '',
      username: '',
      sex: '',
      gongli_nongli: '',
      picker_hour: '',
      picker_date_yangli: '',
      picker_date_nongli: '',
      shengxiao: {
        male: '？',
        female: '？',
        rel: '？'
      },
      riyuan: { male: '？', female: '？', rel: '？' },
      fuqigong: { male: '？', female: '？', rel: '？' },
      zinvgong: { male: '？', female: '？', rel: '？' },
      taohua: {
        male: '？',
        female: '？'
      },
      hunyin: {
        male: '？',
        female: '？'
      }
    };
  },
  created: function created() {
    this.getHeHunInfo();
  },
  mounted: function mounted() {},

  methods: _defineProperty({
    /**
     * @description: 获取合婚信息
     * @return {*}
     */
    getHeHunInfo: async function getHeHunInfo() {
      var male_arr = this.male_str.split('|');
      var female_arr = this.female_str.split('|');
      var male_name = male_arr[0];
      var male_is_gongli = +male_arr[2];
      var male_birth_year = male_arr[3];
      var male_birth_month = male_arr[4];
      var male_birth_date = male_arr[5];
      var male_birth_hour = male_arr[6];

      var female_name = female_arr[0];
      var female_is_gongli = +female_arr[2];
      var female_birth_year = female_arr[3];
      var female_birth_month = female_arr[4];
      var female_birth_date = female_arr[5];
      var female_birth_hour = female_arr[6];
      var params = {
        male_name: male_name,
        male_is_gongli: male_is_gongli,
        male_birth_year: male_birth_year,
        male_birth_month: male_birth_month,
        male_birth_date: male_birth_date,
        male_birth_hour: male_birth_hour,
        female_name: female_name,
        female_is_gongli: female_is_gongli,
        female_birth_year: female_birth_year,
        female_birth_month: female_birth_month,
        female_birth_date: female_birth_date,
        female_birth_hour: female_birth_hour
      };

      var res = await (0, _api.getBazihehunAPI)(params);
      if (res.status !== 1000) return;
      var _res$data = res.data,
          shengxiao = _res$data.shengxiao,
          riyuan = _res$data.riyuan,
          fuqigong = _res$data.fuqigong,
          zinvgong = _res$data.zinvgong,
          maleinfo = _res$data.maleinfo,
          femaleinfo = _res$data.femaleinfo;

      this.shengxiao = shengxiao;
      this.riyuan = riyuan;
      this.fuqigong = fuqigong;
      this.zinvgong = zinvgong;
      this.taohua = {
        male: maleinfo.tao_hua_num,
        female: femaleinfo.tao_hua_num
      };
      this.hunyin = {
        male: maleinfo.hun_yin_num,
        female: femaleinfo.hun_yin_num
      };
    },

    /**
     * @description: 八字颜色
     * @param {*} val
     * @return {*}
     */
    styleColor: function styleColor(val) {
      return _utils2.default.getBaziStyleColor(val);
    },

    /**
     * @description: 格式化用户信息
     * @param {*} string
     * @return {*}
     */
    formateQueryUserInfo: async function formateQueryUserInfo(string) {
      var arr = string.split('|');
      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];
      this.sex = +arr[1];
      this.gongli_nongli = +arr[2];
      this.picker_hour = _utils2.default.formateNongliHour(arr[6]);
      var android_date = this.year + '-' + this.month + '-' + this.date;
      var ios_date = this.year + '/' + this.month + '/' + this.date;
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? android_date : ios_date));
      var lunar = solar.getLunar();
      this.picker_date_nongli = +this.gongli_nongli ? lunar.getYear() + '\u5E74' + lunar.getMonthInChinese() + '\u6708' + lunar.getDayInChinese() + ' ' + this.picker_hour : this.year + '\u5E74' + _utils2.default.formateNongliMonth(this.month) + _utils2.default.formateNongliDate(this.date) + ' ' + this.picker_hour;
      this.picker_date_yangli = +this.gongli_nongli ? this.year + '-' + this.month + '-' + this.date + ' ' + this.picker_hour : _lunarJavascript.Lunar.fromYmd(+this.year, +this.month, +this.date).getSolar().toString() + ' ' + this.picker_hour;
    },

    /**
     * @description: 获取用户八字
     * @return {*}
     */
    getUserBazi: async function getUserBazi() {
      var hour_ = this.birth_hour === '-1' ? '12' : this.birth_hour;
      var str_date = this.year + '-' + this.month + '-' + this.date + ' ' + hour_ + ':00:00';
      var ios_date = this.year + '/' + this.month + '/' + this.date + ' ' + hour_ + ':00:00';
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? str_date : ios_date));
      var lunar = solar.getLunar();
      var lunarMonth = _lunarJavascript.LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      var is_leap = lunarMonth.isLeap();
      var data_ = {
        year: this.year,
        month: this.month,
        day: this.date,
        hour: this.birth_hour,
        minute: '0',
        is_gongli: this.gongli_nongli,
        leap_month: '0',
        gender: this.sex
      };

      var _ref = await (0, _api.getBaziAPI)(data_),
          status = _ref.status,
          data = _ref.data;

      if (status !== 1000) return;
      this.gan = data.gan;
      this.zhi = data.zhi;
    },


    /**
     * @description: 合冲样式
     * @param {*} val
     * @return {*}
     */
    relStyle: function relStyle(val) {
      return val === '冲' ? 'chong' : 'he';
    },


    /**
     * @description: 获取动物
     * @param {*} val
     * @return {*}
     */
    getAnimal: function getAnimal(val) {
      return _utils2.default.getAnimalColor(val);
    }
  }, 'styleColor', function styleColor(val) {
    return _utils2.default.getBaziStyleColor(val);
  })
};

/***/ }),
/* 798 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Picker = __webpack_require__(107);

var _Picker2 = _interopRequireDefault(_Picker);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var pick_timer = void 0;

exports.default = {
  name: 'calendar-picker',
  components: {
    Picker: _Picker2.default
  },
  data: function data() {
    return {
      month_col: function () {
        var month = [];

        for (var i = 1; i < 13; i++) {
          month.push({
            value: i,
            text: i >= 10 ? i + '月' : '0' + i + '月'
          });
        }
        return month;
      }(),
      sele_month: new Date().getMonth() + 1,
      sele_year: new Date().getFullYear(),

      cn_hour_col: function () {
        return [{
          value: '-1',
          text: '时辰不清楚'
        }, {
          value: '0',
          text: '0时 子时'
        }, {
          value: '2',
          text: '2时 丑时'
        }, {
          value: '4',
          text: '4时 寅时'
        }, {
          value: '6',
          text: '6时 卯时'
        }, {
          value: '8',
          text: '8时 辰时'
        }, {
          value: '10',
          text: '10时 巳时'
        }, {
          value: '12',
          text: '12时 午时'
        }, {
          value: '14',
          text: '14时 未时'
        }, {
          value: '16',
          text: '16时 申时'
        }, {
          value: '18',
          text: '18时 酉时'
        }, {
          value: '20',
          text: '20时 戌时'
        }, {
          value: '22',
          text: '22时 亥时'
        }];
      }(),
      tw_hour_col: function () {
        return [{
          value: '-1',
          text: '時辰不清楚'
        }, {
          value: '0',
          text: '0時 子時'
        }, {
          value: '2',
          text: '2時 醜時'
        }, {
          value: '4',
          text: '4時 寅時'
        }, {
          value: '6',
          text: '6時 卯時'
        }, {
          value: '8',
          text: '8時 辰時'
        }, {
          value: '10',
          text: '10時 巳時'
        }, {
          value: '12',
          text: '12時 午時'
        }, {
          value: '14',
          text: '14時 未時'
        }, {
          value: '16',
          text: '16時 申時'
        }, {
          value: '18',
          text: '18時 酉時'
        }, {
          value: '20',
          text: '20時 戌時'
        }, {
          value: '22',
          text: '22時 亥時'
        }];
      }(),
      // birth_hour: 0,
      language: _utils2.default.getLanguage()
    };
  },

  props: {
    male: {
      type: String // male female
    },
    start: {
      default: '1900'
    },
    end: {
      default: '2100'
    },
    year: {
      default: '1995'
    },
    month: {
      default: new Date().getMonth()
    },
    date: {
      default: new Date().getDate()
    },
    birth_hour: {
      default: '-1'
    }
  },
  destroyed: function destroyed() {
    clearInterval(pick_timer);
  },
  mounted: function mounted() {
    var self = this;
    pick_timer = setInterval(function () {
      self.sele_year = self.getValue('year');
      self.sele_month = self.getValue('month');
    }, 100);
  },

  computed: {
    year_col: function year_col() {
      var year = [];
      var startSelectedYear = this.start || 1900;
      var endSelectedYear = this.end || 2100;

      for (var i = startSelectedYear; i <= endSelectedYear; i++) {
        year.push({
          value: i,
          text: i + '年'
        });
      }
      return year;
    },
    current_year: function current_year() {
      return this.$store.state.current_info.year - 25;
    },
    current_month: function current_month() {
      return this.$store.state.current_info.month;
    },
    current_date: function current_date() {
      return this.$store.state.current_info.date;
    },
    date_col: function date_col() {
      var date = [];
      var len = getDaysInOneMonth(this.sele_year, this.sele_month) + 1;

      for (var i = 1; i < len; i++) {
        date.push({
          value: i,
          text: i >= 10 ? i + '日' : '0' + i + '日'
        });
      }

      function getDaysInOneMonth(year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        return d.getDate();
      }

      return date;
    },
    sdate: function sdate() {
      return this.$store.state.sdate;
    },
    edate: function edate() {
      return this.$store.state.edate;
    }
  },
  watch: {
    // 起始时間不能大於結束时間
    sdate: function sdate(newV, oldV) {
      if (newV > this.edate) {
        this.$store.commit('setEdate', newV);
      }
    },
    edate: function edate(newV, oldV) {
      if (newV < this.sdate) {
        this.$store.commit('setSdate', newV);
      }
    }
  },
  methods: {
    showNongli: function showNongli() {
      this.$parent.show_nongli = true;
      this.$parent.gongli_nongli = '0';
    },
    cancel: function cancel() {
      this.$parent.closePicker();
    },
    submit: function submit() {
      var selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour')
      };

      var timestamp = selected.year + '年' + selected.month + '月' + selected.date + '日' + ' ' + _utils2.default.formateNongliHour(selected.birth_hour);
      if (this.male == '1') {
        this.$parent.male.picker_date = timestamp;
        this.$parent.male.picker_date_obj = selected;
        this.$parent.male.gongli_nongli = '1';
      }
      if (this.male == '0') {
        this.$parent.female.picker_date = timestamp;
        this.$parent.female.picker_date_obj = selected;
        this.$parent.female.gongli_nongli = '1';
      }
      // 关闭
      this.$parent.closePicker();
    },
    getValue: function getValue(type) {
      var col = this.$children;
      for (var i = 0; i < col.length; i++) {
        if (col[i].name == type) {
          return col[i].getValue();
        }
      }
    }
  }
};

/***/ }),
/* 799 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// @ts-ignore

// @ts-ignore


var _FixedOrder = __webpack_require__(123);

var _FixedOrder2 = _interopRequireDefault(_FixedOrder);

var _NavigationBar = __webpack_require__(166);

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _CalculateBar = __webpack_require__(272);

var _CalculateBar2 = _interopRequireDefault(_CalculateBar);

var _HomeFooter = __webpack_require__(165);

var _HomeFooter2 = _interopRequireDefault(_HomeFooter);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _top_banner = __webpack_require__(1593);

var _top_banner2 = _interopRequireDefault(_top_banner);

var _info = __webpack_require__(1591);

var _info2 = _interopRequireDefault(_info);

var _to_order = __webpack_require__(1557);

var _to_order2 = _interopRequireDefault(_to_order);

var _datetime_picker = __webpack_require__(1589);

var _datetime_picker2 = _interopRequireDefault(_datetime_picker);

var _nongli_picker = __webpack_require__(1592);

var _nongli_picker2 = _interopRequireDefault(_nongli_picker);

var _PayPopup = __webpack_require__(185);

var _PayPopup2 = _interopRequireDefault(_PayPopup);

var _TopBar = __webpack_require__(246);

var _TopBar2 = _interopRequireDefault(_TopBar);

var _mintUi = __webpack_require__(4);

var _api = __webpack_require__(6);

var _dayjs = __webpack_require__(11);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _headerNotice = __webpack_require__(171);

var _headerNotice2 = _interopRequireDefault(_headerNotice);

var _enum = __webpack_require__(2);

var _img_btn = __webpack_require__(1048);

var _img_btn2 = _interopRequireDefault(_img_btn);

var _img_btn3 = __webpack_require__(1044);

var _img_btn4 = _interopRequireDefault(_img_btn3);

var _btn_dingdan = __webpack_require__(1131);

var _btn_dingdan2 = _interopRequireDefault(_btn_dingdan);

var _order = __webpack_require__(1380);

var _order2 = _interopRequireDefault(_order);

var _card = __webpack_require__(343);

var _card2 = _interopRequireDefault(_card);

var _card3 = __webpack_require__(344);

var _card4 = _interopRequireDefault(_card3);

var _card5 = __webpack_require__(345);

var _card6 = _interopRequireDefault(_card5);

var _card7 = __webpack_require__(346);

var _card8 = _interopRequireDefault(_card7);

var _card9 = __webpack_require__(347);

var _card10 = _interopRequireDefault(_card9);

var _card11 = __webpack_require__(372);

var _card12 = _interopRequireDefault(_card11);

var _card13 = __webpack_require__(373);

var _card14 = _interopRequireDefault(_card13);

var _card15 = __webpack_require__(374);

var _card16 = _interopRequireDefault(_card15);

var _card17 = __webpack_require__(375);

var _card18 = _interopRequireDefault(_card17);

var _card19 = __webpack_require__(376);

var _card20 = _interopRequireDefault(_card19);

var _combinePayPop = __webpack_require__(170);

var _combinePayPop2 = _interopRequireDefault(_combinePayPop);

var _svga = __webpack_require__(98);

var _PopNotice = __webpack_require__(169);

var _PopNotice2 = _interopRequireDefault(_PopNotice);

var _NewFooter = __webpack_require__(112);

var _NewFooter2 = _interopRequireDefault(_NewFooter);

var _tstatistic = __webpack_require__(328);

var _tstatistic2 = _interopRequireDefault(_tstatistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tstatistic2.default.init({
  app_key: 20002003,
  channel: _utils2.default.getFBChannel()
});
var tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...'
};
var show_popup = _utils2.default.getQueryString('show_popup');

// 组合测算相关参数
var is_combine = _utils2.default.getQueryString('is_combine');
var main_order_id = _utils2.default.getQueryString('main_order_id');

exports.default = {
  components: {
    topBanner: _top_banner2.default,
    info: _info2.default,
    DatetimePicker: _datetime_picker2.default,
    NongliPicker: _nongli_picker2.default,
    toOrder: _to_order2.default,
    PayPopup: _PayPopup2.default,
    TopBar: _TopBar2.default,
    HeaderNotice: _headerNotice2.default,
    combinePayPop: _combinePayPop2.default,
    HomeFooter: _HomeFooter2.default,
    PopNotice: _PopNotice2.default,
    FixedOrder: _FixedOrder2.default,
    NewFooter: _NewFooter2.default,
    NavigationBar: _NavigationBar2.default,
    CalculateBar: _CalculateBar2.default
  },
  data: function data() {
    return {
      privacyChecked: true, // 同意隱私協議
      showFixedBtn: false,

      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',

      choose_time: false,
      choose_hour: false,
      show_nongli: false,
      male: {
        username: '',
        picker_date: '',
        picker_hour: '',
        picker_date_obj: null,
        gongli_nongli: '1'
      },
      female: {
        username: '',
        picker_date: '',
        picker_hour: '',
        picker_date_obj: null,
        gongli_nongli: '1'
      },
      sex: '1',
      gongli_nongli: '1',

      // 底部弹出popup版本所需数据
      visible: false,
      product_id: 1,
      product_key: 'h5_marriage',
      query_user_string: '',

      has_pay: '',
      is_combine: is_combine,
      is_show_btn: true,
      language: _utils2.default.getLanguage(),
      tw_btn: _img_btn2.default,
      cn_btn: _img_btn4.default,
      cn_order: _btn_dingdan2.default,
      tw_order: _order2.default,
      cn_card1: _card2.default,
      cn_card2: _card4.default,
      cn_card3: _card6.default,
      cn_card4: _card8.default,
      cn_card5: _card10.default,
      tw_card1: _card12.default,
      tw_card2: _card14.default,
      tw_card3: _card16.default,
      tw_card4: _card18.default,
      tw_card5: _card20.default,
      pay_modal: false,
      product_price: '',
      // 挽留弹窗
      is_show_notice: false, // 是否展示挽留弹窗
      count_down: 0, // 挽留弹窗倒计时
      fix_order_info: null, //最新一个订单信息
      new_order_key: '',
      reportName: _enum.reportName,
      show_api_order: false,
      last_order: null,
      api_time: 0,
      local_time: 0,
      last_title: '',
      timer: null,
      comboAttachData: null //套餐未使用报告信息
    };
  },
  created: function created() {
    var _this = this;

    this.showComboAttach();
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        _this.showComboAttach();
      }
    });
    _utils2.default.isProd() && _tstatistic2.default && _tstatistic2.default.send({
      event: 'page_view_marriage_main',
      md: 10007,
      c_id: -10001,
      args: {
        args_name: 'page_view_marriage_main',
        channel: _utils2.default.getFBChannel()
      }
    });
    this.$store.dispatch('common/getProduction');
    var has_pay = this.$route.query.has_pay;

    this.has_pay = has_pay ? has_pay : '';
    _utils2.default.firebaseLogEvent('10007', '-10001', 'page_view_marriage_main', 'page_view', {
      args_name: 'page_view_marriage_main',
      channel: _utils2.default.getFBChannel()
    });
    this.getLastOrder();

    // 埋点事件上传
    (0, _api.reportBuryingEventAPI)({
      event: 'page_view_marriage_main',
      channel: _utils2.default.getFBChannel()
    }).then().catch(function (err) {
      console.warn('\u57CB\u70B9\u4E8B\u4EF6\u4E0A\u4F20\u5931\u8D25' + err);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.showNoticePop();

    // 賦默認值
    var storaged_userInfo = window.localStorage.getItem('etouch_marriage_measure_new_userinfo');
    if (storaged_userInfo) {
      var arr = storaged_userInfo.split('|');
      this.male.gongli_nongli = arr[10];
      this.female.gongli_nongli = arr[11];
      this.male.username = arr[0];
      this.female.username = arr[1];
      var maleobj = {
        year: arr[2],
        month: arr[3],
        date: arr[4],
        birth_hour: arr[8]
      };
      var femaleobj = {
        year: arr[5],
        month: arr[6],
        date: arr[7],
        birth_hour: arr[9]
      };

      // 男方生日是否為公曆
      if (arr[10] === '1') {
        this.male.picker_date = arr[2] + '年' + arr[3] + '月' + arr[4] + '日' + ' ' + _utils2.default.formateNongliHour(arr[8]);
      } else {
        this.male.picker_date = arr[2] + '年' + _utils2.default.formateNongliMonth(arr[3]) + _utils2.default.formateNongliDate(arr[4]) + ' ' + _utils2.default.formateNongliHour(arr[8]);
      }
      // 女方生日是否為公曆
      if (arr[11] === '1') {
        this.female.picker_date = arr[5] + '年' + arr[6] + '月' + arr[7] + '日' + ' ' + _utils2.default.formateNongliHour(arr[9]);
      } else {
        this.female.picker_date = arr[5] + '年' + _utils2.default.formateNongliMonth(arr[6]) + _utils2.default.formateNongliDate(arr[7]) + ' ' + _utils2.default.formateNongliHour(arr[9]);
      }
      this.male.picker_date_obj = maleobj;
      this.female.picker_date_obj = femaleobj;
    }
    var self = this;

    var btn = document.getElementById('info-btn');
    document.addEventListener('scroll', function (e) {
      var flag = _utils2.default.isElementInViewport(btn);
      var scroll_distance = window.pageYOffset || document.documentElement.scrollTop;
      if (!self.is_show_btn || scroll_distance < 100) {
        _this2.showFixedBtn = false;
        return;
      }
      if (!flag) {
        self.showFixedBtn = true;
      } else {
        self.showFixedBtn = false;
      }
    });
    var initialWindowHeight = window.innerHeight;
    // 添加resize事件监听器
    window.addEventListener('resize', function () {
      self.is_show_btn = initialWindowHeight > window.innerHeight ? false : true;
    });
    // self.loadBg('#canvas', self.is_cn ? self.cn_header : self.tw_header);
  },

  computed: {
    //套餐支付显示逻辑
    is_show_combination: function is_show_combination() {
      return !['enjoy03', 'panda03', 'enjoy02', 'panda02'].includes(_utils2.default.getFBChannel());
    },

    //当前报告类型与引导类型不同，则显示
    is_show_current_combination: function is_show_current_combination() {
      return this.comboAttachData.product_key !== this.product_key;
    },
    user_number: function user_number() {
      return this.$store.state.year_user;
    },
    productList: function productList() {
      return this.$store.state.common.productList;
    },
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    },
    show_fixed_order: function show_fixed_order() {
      // return true;
      if (this.last_order) {
        if (this.last_order.product_key === this.new_order_key && this.last_order.status !== 'PAYED') {
          return false;
        }
      }

      var flag = this.fix_order_info && this.new_order_key !== this.product_key ? true : false;

      if (flag) {
        var _maidianEnum$new_orde = _enum.maidianEnum[this.new_order_key],
            main_id = _maidianEnum$new_orde.main_id,
            click_id = _maidianEnum$new_orde.click_id,
            view_id = _maidianEnum$new_orde.view_id,
            click_name = _maidianEnum$new_orde.click_name,
            view_name = _maidianEnum$new_orde.view_name;

        _utils2.default.firebaseLogEvent(main_id, view_id, view_name, 'view', {
          args_name: view_name,
          channel: _utils2.default.getFBChannel()
        });
      }
      return flag;
    },
    local_title: function local_title() {
      return _utils2.default.getTitle(this.new_order_key);
    },
    is_channel_01: function is_channel_01() {
      return _utils2.default.getFBChannel().indexOf('01') > -1;
    }
  },
  watch: {
    is_show_notice: function is_show_notice(val) {
      if (val) {
        _utils2.default.firebaseLogEvent('10007', '-10013', 'view_marriage_discount1', 'view', {
          args_name: 'view_marriage_discount1',
          channel: _utils2.default.getFBChannel()
        });
      }
    }
  },
  methods: {
    //顶部引导横幅，开始测算
    startCalculateClick: async function startCalculateClick() {
      //顶部套餐报告与当前报告不同
      // if(this.comboAttachData.product_key !== this.product_key) {
      //   location.href = `${path_enums[product_key]}.html#/?has_pay=SUCCESS&order_id=${this.comboAttachData.order_id}&product_key=${this.comboAttachData.product_key}`;
      // } else {

      // }
      location.href = _enum.path_enums[this.comboAttachData.product_key] + '.html#/?has_pay=SUCCESS&order_id=' + this.comboAttachData.order_id + '&product_key=' + this.comboAttachData.product_key;
    },

    //请求接口，是否展示引导标识
    showComboAttach: async function showComboAttach() {
      var res = await (0, _api.getComboAttachAPI)();
      if (res.status !== 1000) return;
      if (res.data && res.data.combine) {
        //组合套餐中未测算的报告
        var sub_orders = res.data.combine.sub_orders.find(function (item) {
          return !item.extra_ce_suan;
        });
        //获取到未测算的报告信息
        this.comboAttachData = {
          product_id: sub_orders.product_id,
          order_id: sub_orders.order_id,
          product_key: sub_orders.product_key
        };
      } else {
        this.comboAttachData = null;
      }
    },
    getOrderId: function getOrderId(val) {
      this.order_id = val;
    },
    toOrderUrl: function toOrderUrl() {
      _utils2.default.jumpToOrder();
    },
    openPicker: function openPicker(isSdate) {
      var person = null;
      if (isSdate == '1') {
        this.sex = '1';
        person = this.male;
      }
      if (isSdate == '0') {
        this.sex = '0';
        person = this.female;
      }

      if (person.picker_date_obj) {
        this.year = person.picker_date_obj.year;
        this.month = person.picker_date_obj.month;
        this.date = person.picker_date_obj.date;
        this.birth_hour = person.picker_date_obj.birth_hour;
      }

      if (person.gongli_nongli === '1') {
        this.show_nongli = false;
      } else {
        this.show_nongli = true;
      }

      this.choose_time = true;
    },
    closePicker: function closePicker() {
      this.choose_time = false;
    },
    closeHourPicker: function closeHourPicker() {
      this.choose_hour = false;
    },
    my_order: function my_order() {
      _utils2.default.toOrder();
    },
    toService: function toService(url) {
      if (this.male.username == '') {
        location.href = url;
        return;
      }
      if (this.female.username == '') {
        location.href = url;
        return;
      }
      // if (
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.male.username) ||
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.female.username)
      // ) {
      //   location.href = url;
      //   return;
      // }
      if (this.male.picker_date_obj == null) {
        location.href = url;
        return;
      }
      if (this.female.picker_date_obj == null) {
        location.href = url;
        return;
      }
      if (isNaN(parseInt(this.male.picker_hour))) {
        this.male.picker_hour = -1;
      }
      if (isNaN(parseInt(this.female.picker_hour))) {
        this.female.picker_hour = -1;
      }

      var maleusername = this.male.username;
      var femaleusername = this.female.username;
      var maleyear = this.male.picker_date_obj.year;
      var malemonth = this.male.picker_date_obj.month;
      var maledate = this.male.picker_date_obj.date;
      var femaleyear = this.female.picker_date_obj.year;
      var femalemonth = this.female.picker_date_obj.month;
      var femaledate = this.female.picker_date_obj.date;
      var malehour = parseInt(this.male.picker_date_obj.birth_hour);
      var femalehour = parseInt(this.female.picker_date_obj.birth_hour);
      var male_rili = this.male.gongli_nongli;
      var female_rili = this.female.gongli_nongli;
      var querystring = '';
      querystring += maleusername;
      querystring += '|';
      querystring += femaleusername;
      querystring += '|';
      querystring += maleyear;
      querystring += '|';
      querystring += malemonth;
      querystring += '|';
      querystring += maledate;
      querystring += '|';
      querystring += femaleyear;
      querystring += '|';
      querystring += femalemonth;
      querystring += '|';
      querystring += femaledate;
      querystring += '|';
      querystring += malehour;
      querystring += '|';
      querystring += femalehour;
      querystring += '|';
      querystring += male_rili;
      querystring += '|';
      querystring += female_rili;
      querystring += '|';
      querystring += '0';
      window.localStorage.setItem('etouch_marriage_measure_new_userinfo', querystring);
      location.href = url;
    },
    check: async function check() {
      var _this3 = this;

      var gongli_nongli = this.gongli_nongli;
      if (this.male.username == '') {
        _utils2.default.firebaseLogEvent('10007', '-10002', 'click_marriage_main', 'click', {
          args_name: 'click_marriage_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('male-name-check'));
        var dom = document.getElementById('maleusername');
        dom.focus();
        return;
      }
      if (this.female.username == '') {
        _utils2.default.firebaseLogEvent('10007', '-10002', 'click_marriage_main', 'click', {
          args_name: 'click_marriage_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('female-name-check'));
        var dom2 = document.getElementById('femaleusername');
        dom2.focus();
        return;
      }

      // if (
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.male.username) ||
      //   !/^[\u4e00-\u9fa5]+$/g.test(this.female.username)
      // ) {
      //   Toast(this.$t('chinese-name-check'));
      //   return;
      // }
      if (this.male.picker_date_obj == null) {
        _utils2.default.firebaseLogEvent('10007', '-10002', 'click_marriage_main', 'click', {
          args_name: 'click_marriage_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('male-date-check'));
        return;
      }
      if (this.female.picker_date_obj == null) {
        _utils2.default.firebaseLogEvent('10007', '-10002', 'click_marriage_main', 'click', {
          args_name: 'click_marriage_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('female-date-check'));
        return;
      }
      if (!this.privacyChecked) {
        _utils2.default.firebaseLogEvent('10007', '-10002', 'click_marriage_main', 'click', {
          args_name: 'click_marriage_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('agree-check'));
        return;
      }

      if (isNaN(parseInt(this.male.picker_hour))) {
        this.male.picker_hour = -1;
      }
      if (isNaN(parseInt(this.female.picker_hour))) {
        this.female.picker_hour = -1;
      }

      var maleusername = this.male.username;
      var femaleusername = this.female.username;
      var maleyear = this.male.picker_date_obj.year;
      var malemonth = this.male.picker_date_obj.month;
      var maledate = this.male.picker_date_obj.date;
      var femaleyear = this.female.picker_date_obj.year;
      var femalemonth = this.female.picker_date_obj.month;
      var femaledate = this.female.picker_date_obj.date;
      var malehour = parseInt(this.male.picker_date_obj.birth_hour);
      var femalehour = parseInt(this.female.picker_date_obj.birth_hour);
      var male_rili = this.male.gongli_nongli;
      var female_rili = this.female.gongli_nongli;
      var querystring = '';
      querystring += maleusername;
      querystring += '|';
      querystring += femaleusername;
      querystring += '|';
      querystring += maleyear;
      querystring += '|';
      querystring += malemonth;
      querystring += '|';
      querystring += maledate;
      querystring += '|';
      querystring += femaleyear;
      querystring += '|';
      querystring += femalemonth;
      querystring += '|';
      querystring += femaledate;
      querystring += '|';
      querystring += malehour;
      querystring += '|';
      querystring += femalehour;
      querystring += '|';
      querystring += male_rili;
      querystring += '|';
      querystring += female_rili;
      querystring += '|';
      querystring += '0';
      window.localStorage.setItem('etouch_marriage_measure_new_userinfo', querystring);
      var male_str = maleusername + '|1|' + male_rili + '|' + maleyear + '|' + malemonth + '|' + maledate + '|' + malehour;
      var female_str = femaleusername + '|0|' + female_rili + '|' + femaleyear + '|' + femalemonth + '|' + femaledate + '|' + femalehour;
      var path = 'detail?querystring=' + querystring + '&male_str=' + male_str + '&female_str=' + female_str;
      this.query_user_string = querystring;
      _utils2.default.firebaseLogEvent('10007', '-10002', 'click_marriage_main', 'click', {
        args_name: 'click_marriage_main',
        channel: _utils2.default.getFBChannel(),
        click_type: 'screen_tracking'
      });
      if (_utils2.default.isProd()) {
        await _utils2.default.checkFB();
        try {
          fbq('track', 'Lead');
        } catch (err) {
          console.error('Lead  error message:', err);
        }
      }
      if (show_popup) {
        this.visible = true;
      } else if (is_combine) {
        var paypopup = this.$refs.PayPopup;
        paypopup.combinePay(main_order_id, this.product_id, querystring);
      } else {
        var _$route$query = this.$route.query,
            has_pay = _$route$query.has_pay,
            order_id = _$route$query.order_id;

        if (has_pay) {
          if (has_pay === 'SUCCESS') {
            (0, _api.getPayOrderInfoAPI)(order_id, this.getExtra('h5_marriage', querystring)).then(function (res) {
              if (res.data) {
                _this3.$router.push({
                  path: 'result',
                  query: { order_id: order_id, status: 'SUCCESS' }
                });
              }
            });
          }
        } else {
          var same_ = this.productList.find(function (item) {
            return item.product_key === _this3.product_key;
          });
          var price = same_.price,
              unit = same_.unit,
              product_id = same_.product_id,
              google_goods_id = same_.google_goods_id,
              product_key = same_.product_key;
          // 缓存最新一个订单信息

          localStorage.setItem('mlxz_fixed_order_info', querystring);
          localStorage.setItem('mlxz_fixed_order_key', this.product_key);
          localStorage.removeItem('mlxz_new_time_down_' + this.product_key);

          localStorage.setItem('mlxz_user_info_' + this.product_key, JSON.stringify({
            user_info: querystring,
            product_key: this.product_key,
            male_str: male_str,
            female_str: female_str
          }));
          var num_ = localStorage.getItem('mlxz_show_notice_' + this.product_key);
          localStorage.setItem('mlxz_show_notice_' + this.product_key, num_ ? 2 : 1);
          this.$router.push({ path: path });
          return;
          this.product_price = price || '-';
          if (_utils2.default.isVersionMoreThan('1.1.1')) {
            this.pay_modal = true;
            return;
          }

          var params = {
            pay_method: 'google_pay',
            product_key: product_key,
            platform: 'ANDROID',
            product_id: product_id,
            extra_ce_suan: this.getExtra(product_key, querystring)
          };
          (0, _api.payOrderAPI)(params).then(function (res) {
            if (res.status === 1000) {
              _mintUi.Indicator.close();
              _this3.order_id = res.data.id;
              window.psychicai_client.onWebPayDialog(res.data.id, price + '', unit, google_goods_id, _enum.reportEnum[product_key]);
            }
          });
          return;
          this.$router.push({ path: path });
        }
      }
    },

    // 解析参数字符串
    getExtra: function getExtra(product_key, querystring) {
      var params = null;
      var query_user_string = querystring;
      var query_user_string_array = query_user_string.split('|');

      // 八字合婚 双人信息
      if (product_key === 'h5_marriage') {
        var _query_user_string_ar = _slicedToArray(query_user_string_array, 13),
            male_name = _query_user_string_ar[0],
            female_name = _query_user_string_ar[1],
            male_birth_year = _query_user_string_ar[2],
            male_birth_month = _query_user_string_ar[3],
            male_birth_date = _query_user_string_ar[4],
            female_birth_year = _query_user_string_ar[5],
            female_birth_month = _query_user_string_ar[6],
            female_birth_date = _query_user_string_ar[7],
            male_birth_hour = _query_user_string_ar[8],
            female_birth_hour = _query_user_string_ar[9],
            male_is_gongli = _query_user_string_ar[10],
            female_is_gongli = _query_user_string_ar[11],
            sex = _query_user_string_ar[12];

        params = {
          male_name: male_name,
          female_name: female_name,
          male_birth_year: male_birth_year,
          male_birth_month: male_birth_month,
          male_birth_date: male_birth_date,
          female_birth_year: female_birth_year,
          female_birth_month: female_birth_month,
          female_birth_date: female_birth_date,
          male_birth_hour: male_birth_hour,
          female_birth_hour: female_birth_hour,
          male_is_gongli: male_is_gongli,
          female_is_gongli: female_is_gongli,
          sex: sex
        };
      }
      // 其他 单人信息
      else {
          var _query_user_string_ar2 = _slicedToArray(query_user_string_array, 7),
              name = _query_user_string_ar2[0],
              _sex = _query_user_string_ar2[1],
              is_gongli = _query_user_string_ar2[2],
              birth_year = _query_user_string_ar2[3],
              birth_month = _query_user_string_ar2[4],
              birth_date = _query_user_string_ar2[5],
              birth_hour = _query_user_string_ar2[6];

          params = {
            name: name,
            sex: _sex,
            is_gongli: is_gongli,
            birth_year: birth_year,
            birth_month: birth_month,
            birth_date: birth_date,
            birth_hour: birth_hour,
            date: (0, _dayjs2.default)('' + birth_year + (+birth_month < 10 ? '0' + birth_month : birth_month) + (+birth_date < 10 ? '0' + birth_date : birth_date)).format('YYYYMMDD')
          };
        }
      return params;
    },

    // 端内加载背景SVGA动画
    loadBg: function loadBg(dom, url) {
      var is_loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var downloader = new _svga.Downloader();
      // 默认调用 WebWorker 线程解析
      // 可配置 new Parser({ disableWorker: true }) 禁止
      var parser = new _svga.Parser();
      // #canvas 是 HTMLCanvasElement
      var player = new _svga.Player(dom);

      (async function () {
        var fileData = await downloader.get(url);
        var svgaData = await parser.do(fileData);

        player.set({ loop: is_loop });

        await player.mount(svgaData);

        // 开始播放动画
        player.start();
      })();
    },

    // 展示挽留弹窗  通过定时器
    showNoticePop: function showNoticePop() {
      var _this4 = this;

      setInterval(function () {
        _this4.fix_order_info = localStorage.getItem('mlxz_fixed_order_info');
        _this4.new_order_key = localStorage.getItem('mlxz_fixed_order_key');
        var is_show_notice = localStorage.getItem('mlxz_show_notice_' + _this4.product_key);
        _this4.is_show_notice = is_show_notice ? +is_show_notice === 1 ? true : false : false;
        var time_ = localStorage.getItem('mlxz_count_down_' + _this4.product_key);
        var set_time_ = (5 * 60 + 48) * 1000 + 280;

        _this4.count_down = +time_ || 0;
        // this.count_down = time_ ? (set_time_ > +time_ ? set_time_ : +time_) : 0;
        _this4.local_time = +localStorage.getItem('mlxz_fixed_local_order_time') || 0;
      }, 1000);
    },

    // 关闭当前报告的挽留弹窗
    closeNotice: function closeNotice() {
      localStorage.setItem('mlxz_show_notice_' + this.product_key, 2);
      localStorage.removeItem('mlxz_count_down_' + this.product_key);
      this.is_show_notice = false;
    },

    // 获取最新一个订单信息
    getLastOrder: async function getLastOrder() {
      var res = await (0, _api.getLastOrderAPI)();
      if (res.status !== 1000) return;
      this.last_order = res.data;
      this.last_title = _utils2.default.getTitle(this.last_order ? this.last_order.product_key : '');

      if (this.last_order && this.last_order.status !== 'PAYED' && this.last_order.product_key !== this.product_key) {
        this.logDiscountEvent();

        //
        if (+localStorage.getItem('mlxz_fixed_api_order_id') === this.last_order.id) {
          this.api_time = +localStorage.getItem('mlxz_fixed_api_order_time');
          this.show_api_order = true;
          return;
        }
        this.api_time = +localStorage.getItem('mlxz_fixed_api_order_time') || 15 * 60 * 1000;
        localStorage.setItem('mlxz_fixed_api_order_id', this.last_order.id);
        this.show_api_order = true;
      } else {
        this.show_api_order = false;
      }
    },
    logDiscountEvent: function logDiscountEvent() {
      var _last_order = this.last_order,
          ext = _last_order.ext,
          pay_method = _last_order.pay_method,
          product_key = _last_order.product_key,
          product_id = _last_order.product_id,
          payment = _last_order.payment;
      var _maidianEnum$product_ = _enum.maidianEnum[product_key],
          main_id = _maidianEnum$product_.main_id,
          click_id = _maidianEnum$product_.click_id,
          view_id = _maidianEnum$product_.view_id,
          click_name = _maidianEnum$product_.click_name,
          view_name = _maidianEnum$product_.view_name;

      _utils2.default.firebaseLogEvent(main_id, view_id, view_name, 'view', {
        args_name: view_name,
        channel: _utils2.default.getFBChannel()
      });
    },

    // api订单下单
    checkOrder: async function checkOrder() {
      var _last_order2 = this.last_order,
          ext = _last_order2.ext,
          pay_method = _last_order2.pay_method,
          product_key = _last_order2.product_key,
          product_id = _last_order2.product_id,
          payment = _last_order2.payment,
          trade_pay_type = _last_order2.trade_pay_type,
          trade_target_org = _last_order2.trade_target_org;
      var _maidianEnum$product_2 = _enum.maidianEnum[product_key],
          main_id = _maidianEnum$product_2.main_id,
          click_id = _maidianEnum$product_2.click_id,
          view_id = _maidianEnum$product_2.view_id,
          click_name = _maidianEnum$product_2.click_name,
          view_name = _maidianEnum$product_2.view_name;

      _utils2.default.firebaseLogEvent(main_id, click_id, click_name, 'click', {
        args_name: click_name,
        channel: _utils2.default.getFBChannel()
      });
      _mintUi.Indicator.open(tipsArr5[_utils2.default.getLanguage()]);

      if (this.last_order.status === 'PAYED') return;
      var params = {
        pay_method: pay_method,
        product_key: product_key,
        product_id: product_id,
        platform: 'WEB',
        extra_ce_suan: ext,
        trade_pay_type: trade_pay_type,
        trade_target_org: trade_target_org,
        callback_url: location.origin + '/' + _utils2.default.getFBChannel() + '/' + _enum.path_enums[product_key] + '.html#/result?path=' + _enum.path_enums[product_key] + '&report_price=' + payment + '&discount_pay=1'
      };

      var res = await (0, _api.payOrderAPI)(params);
      localStorage.removeItem('mlxz_fixed_api_order_id');
      localStorage.removeItem('mlxz_fixed_api_order_time');
      _mintUi.Indicator.close();
      if (res.status !== 1000) return;
      this.show_api_order = false;

      await _utils2.default.asleep(1000);
      location.href = res.data.pay_url;
    },
    jumpOrder: function jumpOrder() {
      var _maidianEnum$new_orde2 = _enum.maidianEnum[this.new_order_key],
          main_id = _maidianEnum$new_orde2.main_id,
          click_id = _maidianEnum$new_orde2.click_id,
          view_id = _maidianEnum$new_orde2.view_id,
          click_name = _maidianEnum$new_orde2.click_name,
          view_name = _maidianEnum$new_orde2.view_name;

      _utils2.default.firebaseLogEvent(main_id, click_id, click_name, 'click', {
        args_name: click_name,
        channel: _utils2.default.getFBChannel()
      });
      var path = 'detail?querystring=' + this.fix_order_info + '&pay_modal=1' + '&use_fixed_time=1&discount_pay=1';

      location.href = location.origin + '/' + _utils2.default.getFBChannel() + '/' + _enum.path_enums[this.new_order_key] + '.html#/' + path;
    }
  }
};

/***/ }),
/* 800 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ['malename', 'femalename', 'maledate', 'femaledate', 'malehour', 'femalehour'],
  data: function data() {
    return {
      choose_male: true,
      maleusername: '',
      femaleusername: '',

      width: 0,
      height: 0,
      language: _utils2.default.getLanguage()
    };
  },

  watch: {
    malename: function malename(val) {
      console.log('val', val);
      this.maleusername = val;
      if (val) {
        var new_ = val.trim();
        var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.maleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.maleusername = new_.slice(0, 20);
        }
      }
    },
    femalename: function femalename(val) {
      this.femaleusername = val;
      if (val) {
        var new_ = val.trim();
        var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.femaleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.femaleusername = new_.slice(0, 20);
        }
      }
    },
    sex: function sex(newV, oldV) {
      if (newV == '1') {
        this.choose_male = true;
      } else {
        this.choose_male = false;
      }
    },
    maleusername: function maleusername(newV, oldV) {
      console.log('newv', newV);
      // this.$parent.male.username = newV;
      if (newV) {
        var new_ = newV.trim();
        var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.$parent.male.username = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
          this.maleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.$parent.male.username = new_.slice(0, 20);
          this.maleusername = new_.slice(0, 20);
        } else {
          this.$parent.male.username = newV;
          this.maleusername = newV;
        }
      } else {
        this.$parent.male.username = newV;
        this.maleusername = newV;
      }
    },
    femaleusername: function femaleusername(newV, oldV) {
      // this.$parent.female.username = newV;
      if (newV) {
        var new_ = newV.trim();
        var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.$parent.female.username = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
          this.femaleusername = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.$parent.female.username = new_.slice(0, 20);
          this.femaleusername = new_.slice(0, 20);
        } else {
          this.$parent.female.username = newV;
          this.femaleusername = newV;
        }
      } else {
        this.$parent.female.username = newV;
        this.femaleusername = newV;
      }
    }
  },
  created: function created() {
    this.width = window.screen.width > 750 ? 750 : window.screen.width;
  },
  mounted: function mounted() {},
  destroyed: function destroyed() {
    localStorage.removeItem('bazi_count');
  },

  methods: {
    maleopenPicker: function maleopenPicker() {
      this.$parent.openPicker('1');
    },
    femaleopenPicker: function femaleopenPicker() {
      this.$parent.openPicker('0');
    },
    maleopenHourPicker: function maleopenHourPicker() {
      this.$parent.openHourPicker('1');
    },
    femaleopenHourPicker: function femaleopenHourPicker() {
      this.$parent.openHourPicker('0');
    },
    toResult: function toResult() {
      this.$parent.toResult();
    },
    chooseMale: function chooseMale() {
      this.choose_male = true;
      this.$parent.sex = '1';
    },
    chooseFemale: function chooseFemale() {
      this.choose_male = false;
      this.$parent.sex = '0';
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 801 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _suishenWnl = __webpack_require__(118);

var _suishenWnl2 = _interopRequireDefault(_suishenWnl);

var _Picker = __webpack_require__(107);

var _Picker2 = _interopRequireDefault(_Picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pick_timer = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var month_name = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
var date_name = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

var today = new Date();
var today_year = today.getFullYear();
var today_month = today.getMonth() + 1;
var today_day = today.getDate();
var today_nongli_arr = _suishenWnl2.default.calGongliToNongli(today_year, today_month, today_day);

exports.default = {
  name: 'calendar-picker',
  components: {
    Picker: _Picker2.default
  },
  data: function data() {
    return {
      month_col: function () {
        var month = [];
        for (var i = 1; i < 13; i++) {
          month.push({
            value: i,
            text: month_name[i - 1]
          });
        }
        if (_utils2.default.getLanguage() === 'zh-TW') {
          month[month.length - 1].text = '臘月';
        }
        return month;
      }(),
      no_leap_month_col: function () {
        var month = [];

        for (var i = 1; i < 13; i++) {
          month.push({
            value: i,
            text: month_name[i - 1]
          });
        }
        if (_utils2.default.getLanguage() === 'zh-TW') {
          month[month.length - 1].text = '臘月';
        }
        return month;
      }(),
      sele_month: new Date().getMonth() + 1,
      sele_year: new Date().getFullYear(),

      cn_hour_col: function () {
        return [{
          value: '-1',
          text: '时辰不清楚'
        }, {
          value: '0',
          text: '0时 子时'
        }, {
          value: '2',
          text: '2时 丑时'
        }, {
          value: '4',
          text: '4时 寅时'
        }, {
          value: '6',
          text: '6时 卯时'
        }, {
          value: '8',
          text: '8时 辰时'
        }, {
          value: '10',
          text: '10时 巳时'
        }, {
          value: '12',
          text: '12时 午时'
        }, {
          value: '14',
          text: '14时 未时'
        }, {
          value: '16',
          text: '16时 申时'
        }, {
          value: '18',
          text: '18时 酉时'
        }, {
          value: '20',
          text: '20时 戌时'
        }, {
          value: '22',
          text: '22时 亥时'
        }];
      }(),
      tw_hour_col: function () {
        return [{
          value: '-1',
          text: '時辰不清楚'
        }, {
          value: '0',
          text: '0時 子時'
        }, {
          value: '2',
          text: '2時 醜時'
        }, {
          value: '4',
          text: '4時 寅時'
        }, {
          value: '6',
          text: '6時 卯時'
        }, {
          value: '8',
          text: '8時 辰時'
        }, {
          value: '10',
          text: '10時 巳時'
        }, {
          value: '12',
          text: '12時 午時'
        }, {
          value: '14',
          text: '14時 未時'
        }, {
          value: '16',
          text: '16時 申時'
        }, {
          value: '18',
          text: '18時 酉時'
        }, {
          value: '20',
          text: '20時 戌時'
        }, {
          value: '22',
          text: '22時 亥時'
        }];
      }(),
      // birth_hour: 0,
      language: _utils2.default.getLanguage()
    };
  },

  props: {
    male: {
      type: String // male female
    },
    start: {
      default: '1900'
    },
    end: {
      default: '2100'
    },
    year: {
      default: '1995'
    },
    month: {
      default: new Date().getMonth()
    },
    date: {
      default: new Date().getDate()
    },
    birth_hour: {
      default: '-1'
    }
  },
  destroyed: function destroyed() {
    clearInterval(pick_timer);
  },
  mounted: function mounted() {
    var self = this;

    pick_timer = setInterval(function () {
      self.sele_year = self.getValue('year');
      self.sele_month = self.getValue('month');
    }, 100);
  },

  computed: {
    year_col: function year_col() {
      var year = [];
      var startSelectedYear = this.start || 1900;
      var endSelectedYear = this.end || 2100;

      for (var i = startSelectedYear; i <= endSelectedYear; i++) {
        year.push({
          value: i,
          text: i + '年'
        });
      }
      return year;
    },
    current_year: function current_year() {
      return today_nongli_arr[0] - 25;
    },
    current_month: function current_month() {
      return today_nongli_arr[1];
    },
    current_date: function current_date() {
      return today_nongli_arr[2];
    },
    date_col: function date_col() {
      var date = [];
      var len = _suishenWnl2.default.monthDays(this.sele_year, this.sele_month) + 1;

      for (var i = 1; i < len; i++) {
        date.push({
          value: i,
          text: date_name[i - 1]
        });
      }

      return date;
    },
    sdate: function sdate() {
      return this.$store.state.sdate;
    },
    edate: function edate() {
      return this.$store.state.edate;
    }
  },
  watch: {
    // 起始时間不能大於結束时間
    sdate: function sdate(newV, oldV) {
      if (newV > this.edate) {
        this.$store.commit('setEdate', newV);
      }
    },
    edate: function edate(newV, oldV) {
      if (newV < this.sdate) {
        this.$store.commit('setSdate', newV);
      }
    }
  },
  methods: {
    showGongli: function showGongli() {
      this.$parent.show_nongli = false;
      this.$parent.gongli_nongli = '1';
    },
    cancel: function cancel() {
      this.$parent.closePicker();
    },
    submit: function submit() {
      var selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour')
      };

      var formateNongliMonth = _utils2.default.formateNongliMonth(selected.month);
      var formateNongliDate = _utils2.default.formateNongliDate(selected.date);

      // let timestamp = '農历 ' + selected.year + '年' + selected.month + '月' + selected.date + '日';
      var timestamp = selected.year + '年' + formateNongliMonth + formateNongliDate + ' ' + _utils2.default.formateNongliHour(selected.birth_hour);

      if (this.male == '1') {
        this.$parent.male.picker_date = timestamp;
        this.$parent.male.picker_date_obj = selected;
        this.$parent.male.gongli_nongli = '0';
      }
      if (this.male == '0') {
        this.$parent.female.picker_date = timestamp;
        this.$parent.female.picker_date_obj = selected;
        this.$parent.female.gongli_nongli = '0';
      }
      this.$parent.closePicker();
    },
    getValue: function getValue(type) {
      var col = this.$children;
      for (var i = 0; i < col.length; i++) {
        if (col[i].name == type) {
          return col[i].getValue();
        }
      }
    }
  }
};

/***/ }),
/* 802 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'app',
  created: function created() {
    document.title = '八字合婚';
    _utils2.default.getChannel();
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 803 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(6);

var _mintUi = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _topBanner = __webpack_require__(1588);

var _topBanner2 = _interopRequireDefault(_topBanner);

var _img_title = __webpack_require__(613);

var _img_title2 = _interopRequireDefault(_img_title);

var _img_title3 = __webpack_require__(614);

var _img_title4 = _interopRequireDefault(_img_title3);

var _star_light = __webpack_require__(1130);

var _star_light2 = _interopRequireDefault(_star_light);

var _star_gray = __webpack_require__(1129);

var _star_gray2 = _interopRequireDefault(_star_gray);

var _hemu_rate = __webpack_require__(1152);

var _hemu_rate2 = _interopRequireDefault(_hemu_rate);

var _hemu_rate3 = __webpack_require__(1389);

var _hemu_rate4 = _interopRequireDefault(_hemu_rate3);

var _energy = __webpack_require__(1150);

var _energy2 = _interopRequireDefault(_energy);

var _energy3 = __webpack_require__(1387);

var _energy4 = _interopRequireDefault(_energy3);

var _career = __webpack_require__(1148);

var _career2 = _interopRequireDefault(_career);

var _career3 = __webpack_require__(1386);

var _career4 = _interopRequireDefault(_career3);

var _family = __webpack_require__(1151);

var _family2 = _interopRequireDefault(_family);

var _family3 = __webpack_require__(1388);

var _family4 = _interopRequireDefault(_family3);

var _parents = __webpack_require__(1153);

var _parents2 = _interopRequireDefault(_parents);

var _parents3 = __webpack_require__(1390);

var _parents4 = _interopRequireDefault(_parents3);

var _blossom = __webpack_require__(1147);

var _blossom2 = _interopRequireDefault(_blossom);

var _blossom3 = __webpack_require__(1385);

var _blossom4 = _interopRequireDefault(_blossom3);

var _all = __webpack_require__(1146);

var _all2 = _interopRequireDefault(_all);

var _all3 = __webpack_require__(1384);

var _all4 = _interopRequireDefault(_all3);

var _CodePop = __webpack_require__(122);

var _CodePop2 = _interopRequireDefault(_CodePop);

var _CopyCode = __webpack_require__(164);

var _CopyCode2 = _interopRequireDefault(_CopyCode);

var _bzhh = __webpack_require__(1179);

var _bzhh2 = _interopRequireDefault(_bzhh);

var _shengxiao = __webpack_require__(673);

var _shengxiao2 = _interopRequireDefault(_shengxiao);

var _bazi = __webpack_require__(672);

var _bazi2 = _interopRequireDefault(_bazi);

var _suishenWnl = __webpack_require__(118);

var _suishenWnl2 = _interopRequireDefault(_suishenWnl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: {
    topBanner: _topBanner2.default,
    CodePop: _CodePop2.default,
    CopyCode: _CopyCode2.default,
    shengxiao: _shengxiao2.default,
    baziInfo: _bazi2.default
  },
  data: function data() {
    return {
      cn_all: _all2.default,
      tw_all: _all4.default,
      cn_blossom: _blossom2.default,
      tw_blossom: _blossom4.default,
      cn_parents: _parents2.default,
      tw_parents: _parents4.default,
      cn_career: _career2.default,
      tw_career: _career4.default,
      cn_family: _family2.default,
      tw_family: _family4.default,
      loading: false,
      hasData: false,
      maleinfo: {
        name: '',
        gldate: '',
        nldate: '',
        bazi: '',
        sex: ''
      },
      femaleinfo: {
        name: '',
        gldate: '',
        nldate: '',
        bazi: '',
        sex: ''
      },
      data_obj: {
        hemu_rate: '',
        energy: '',
        career: '',
        family: '',
        character: '',
        parents: '',
        blossom: '',
        all: '',
        dayun: ''
      },
      user_ext: {
        male_is_gongli: '公历',
        female_is_gongli: '公历'
      },
      order_id: 0,
      count: 0, //轮询次数
      status: '',
      is_finish: false,
      language: _utils2.default.getLanguage(),
      cn_hemu: _hemu_rate2.default,
      tw_hemu: _hemu_rate4.default,
      cn_nengliang: _energy2.default,
      tw_nengliang: _energy4.default,
      code_modal: false,
      transfer_code: '',
      cn_code_btn: 'https://psychicai-static.psychicai.pro/imgs/2404234bb0c587034841ab541abf8dd71bc1.png',
      tw_code_btn: _bzhh2.default,
      cn_img_title: _img_title2.default,
      tw_img_title: _img_title4.default,
      query_user_string: '',
      init_male_str: '',
      init_female_str: '',
      mbirth: '',
      fbirth: '',
      show_bazi: false
    };
  },

  filters: {
    nameFilter: function nameFilter(val) {
      return _utils2.default.getShortStr(val, 4);
    }
  },
  created: function created() {
    // localStorage.removeItem('mlxz_fixed_order_info');
    // localStorage.removeItem('mlxz_fixed_order_key');
    // localStorage.removeItem('mlxz_fixed_local_order_time');
    // localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  mounted: async function mounted() {
    this.order_id = this.$route.query.order_id;

    window.scrollTo(0, 0);
    _utils2.default.gcyLog('order_id:' + this.order_id, {
      mlxz_action_desc: '已进入结果页'
    });

    _utils2.default.firebaseLogEvent('10007', '-10009', 'page_view_marriage_result', 'page_view', {
      args_name: 'page_view_marriage_result',
      channel: _utils2.default.getFBChannel()
    });
    _utils2.default.gcyLog('order_id:' + this.order_id, {
      mlxz_action_desc: '上报了page_view，准备校验是否上报埋点'
    });
    // 上报支付结果埋点  start
    var check_result = await this.checkWithTimeout();
    if (check_result !== null) {
      _utils2.default.gcyLog('order_id:' + this.order_id, {
        mlxz_action_desc: '已经获取了是否上报埋点的状态',
        mlxz_attribution_status: check_result.data.status
      });
      if (check_result.data.status) {
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '准备执行上报埋点',
          mlxz_check_status: check_result.data.status
        });
        this.handleSendEvent();
      }
    }
    // end
    _utils2.default.gcyLog('order_id:' + this.order_id, {
      mlxz_action_desc: '开始验单'
    });

    await this.checkResult();
    this.query();
  },

  computed: {
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    }
  },
  watch: {},
  methods: {
    /**
     * @description: 校验是否上报埋点
     * @return {*}
     */
    checkWithTimeout: async function checkWithTimeout() {
      try {
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '开始调用校验上报埋点接口'
        });
        var result = await Promise.race([(0, _api.checkSendEventApi)({ order_id: this.order_id }), new Promise(function (resolve, reject) {
          setTimeout(function () {
            return resolve(null);
          }, 6000);
        })]);

        if (result !== null) {
          // 如果有返回数据，则直接返回
          _utils2.default.gcyLog('order_id:' + this.order_id, {
            mlxz_action_desc: '已校验是否上报埋点',
            mlxz_check_result_status: result.data.status
          });
          return result;
        } else {
          _utils2.default.gcyLog('order_id:' + this.order_id, {
            mlxz_action_desc: '接口超时，重新调用校验上报埋点接口'
          });
          // 等待 6 秒后再次调用 checkSendEventApi
          var retryResult = await (0, _api.checkSendEventApi)({
            order_id: this.order_id
          });
          _utils2.default.gcyLog('order_id:' + this.order_id, {
            mlxz_action_desc: '接口超时，完成重试调用上报埋点接口'
          });
          return retryResult;
        }
      } catch (error) {
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '接口报错，停止校验'
        });
        throw error;
      }
    },


    /**
     * @description: 完成上报埋点
     * @return {*}
     */
    handleSendEvent: async function handleSendEvent() {
      var report_price = +_utils2.default.getQueryStr('report_price');
      var report_status = _utils2.default.getQueryStr('status');
      var discount_pay = +_utils2.default.getQueryStr('discount_pay');
      var combine_product_ids = +_utils2.default.getQueryStr('combine_product_ids');
      var repay = +_utils2.default.getQueryStr('repay');
      _utils2.default.gcyLog('order_id:' + this.order_id, {
        mlxz_action_desc: '准备上报埋点，获取订单状态',
        mlxz_order_status: report_status
      });
      if (report_status === 'SUCCESS' || report_status === 'PAYED') {
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '开始上报firebase埋点',
          mlxz_order_status: report_status
        });
        if (discount_pay) {
          _utils2.default.firebaseLogEvent('10007', '-10017', 'event_status_marriagediscont_pay_success', 'event_status', {
            args_name: 'event_status_marriagediscont_pay_success',
            channel: _utils2.default.getFBChannel()
          });
        }
        if (repay) {
          var history_name = repay == 3 ? 'event_status_2024lovelymarriagehistory_pay_success' : 'event_status_marriagehistory_pay_success';
          _utils2.default.firebaseLogEvent('10002', repay == 3 ? '-10032' : '-10018', history_name, 'event_status', {
            args_name: history_name,
            channel: _utils2.default.getFBChannel()
          });
        }
        if (!discount_pay && !repay && !combine_product_ids) {
          _utils2.default.firebaseLogEvent('10007', '-10007', 'event_status_marriage_pay_success', 'event_status', {
            args_name: 'event_status_marriage_pay_success',
            channel: _utils2.default.getFBChannel()
          });
        }

        if (combine_product_ids) {
          //成功
          _utils2.default.firebaseLogEvent('10007', '-10028', 'event_status_marriagelovely_pay_success', 'event_status', {
            args_name: 'event_status_marriagelovely_pay_success',
            channel: _utils2.default.getFBChannel()
          });
        }

        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '完成firebase埋点上报',
          mlxz_order_status: report_status
        });
        if (_utils2.default.isProd()) {
          await _utils2.default.checkFB();
          try {
            _utils2.default.gcyLog('order_id:' + this.order_id, {
              mlxz_action_desc: '开始上报FB埋点，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: 'MYR',
              mlxz_order_status: report_status
            });
            fbq('track', 'Purchase', {
              value: report_price.toFixed(2),
              currency: 'MYR'
            });
            _utils2.default.gcyLog('order_id:' + this.order_id, {
              mlxz_action_desc: '完成FB埋点上报，Purchase',
              mlxz_value: report_price.toFixed(2),
              mlxz_currency: 'MYR',
              mlxz_order_status: report_status
            });
          } catch (err) {
            console.error('error message:', err);
          }
        }
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '完成埋点上报，开始与接口通信，通知完成上报'
        });
        this.sendEvent();
      } else {
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '开始上报埋点',
          mlxz_order_status: report_status
        });
        if (discount_pay) {
          _utils2.default.firebaseLogEvent('10007', '-10018', 'event_status_marriagediscount_pay_fail', 'event_status', {
            args_name: 'event_status_marriagediscount_pay_fail',
            channel: _utils2.default.getFBChannel()
          });
        }

        if (repay) {
          var _history_name = repay == 3 ? 'event_status_2024lovelymarriagehistory_pay_fail' : 'event_status_marriagehistory_pay_fail';
          _utils2.default.firebaseLogEvent('10002', repay === 3 ? '-10033' : '-10027', _history_name, 'event_status', {
            args_name: _history_name,
            channel: _utils2.default.getFBChannel()
          });
        }
        if (!discount_pay && !repay && !combine_product_ids) {
          _utils2.default.firebaseLogEvent('10007', '-10008', 'event_status_marriage_pay_fail', 'event_status', {
            args_name: 'event_status_marriage_pay_fail',
            channel: _utils2.default.getFBChannel()
          });
        }

        if (combine_product_ids) {
          //失败
          _utils2.default.firebaseLogEvent('10007', '-10029', 'event_status_marriagelovely_pay_fail', 'event_status', {
            args_name: 'event_status_marriagelovely_pay_fail',
            channel: _utils2.default.getFBChannel()
          });
        }

        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '完成上报埋点',
          mlxz_order_status: report_status
        });
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '完成埋点上报，开始与接口通信，通知完成上报'
        });
        this.sendEvent();
      }
    },
    sendEvent: async function sendEvent() {
      _utils2.default.gcyLog('order_id:' + this.order_id, {
        mlxz_action_desc: '开始调用接口，通知已上报'
      });
      var res = await (0, _api.sendEventApi)({ order_id: this.order_id });
      if (res.status === 1000) {
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '已通知已上报',
          mlxz_attribution_status: res.status,
          mlxz_attribution_desc: res.desc
        });
      }
    },
    checkResult: async function checkResult() {
      var data = {
        order_id: this.$route.query.order_id,
        pkg: "''",
        receipt: '',
        transaction_id: '',
        version_name: ''
      };
      var res = await (0, _api.resultCheckAPI)(data);
      if (res.status === 1000) {
        if (!localStorage.getItem('report_price')) return;

        var price = +localStorage.getItem('report_price');
        var status = res.data.status;

        var product_key = 'marriage_contract_report';
      }
      localStorage.removeItem('report_price');

      return res.status === 1000 ? 1 : 0;
    },
    query: function query() {
      var _this = this;

      this.count++;
      this.loading = true;
      _mintUi.Indicator.open(this.$t('result-check'));
      (0, _api.getResultAPI)({ order_id: this.$route.query.order_id }).then(function (res) {
        var can_store = res.data && ['PAYED', 'FAIL'].includes(res.data.status) || _this.count === 6 && ['PAYED', 'FAIL'].includes(res.data.status) ? true : false;

        if (res.data.status === 'PAYED') {
          //是否组合订单
          if (res.data.sub_orders) {
            (0, _api.getResultAPI)({ order_id: res.data.sub_orders[0].order_id }).then(function (response) {
              _this.renderResultAndComplete(response);
            });
          } else {
            _this.renderResultAndComplete(res);
          }
        } else if (_this.count < 6) {
          if (['PAYED', 'FAIL', 'REFUNDED'].includes(res.data.status)) {
            _this.backNotice();
            _this.status = res.data.status;
            return;
          }
          setTimeout(function () {
            _this.query();
          }, 1000);
        } else {
          _this.backNotice();
        }
        _this.status = res.data.status;
      });
    },
    backNotice: function backNotice() {
      _mintUi.Indicator.close();
      (0, _mintUi.Toast)(this.$t('fail-result'));
      setTimeout(function () {
        location.href = 'marriage_measure_overseas.html';
      }, 1000);
    },
    renderResult: function renderResult(res) {
      var responseData = res.data.result;
      console.log(res.data.extra_ce_suan);
      this.user_ext = res.data.extra_ce_suan;
      this.getFormateStr();
      this.transfer_code = res.data.transfer_code;
      // 用戶信息
      this.maleinfo = responseData.maleinfo;
      this.femaleinfo = responseData.femaleinfo;
      // 測算結果
      this.data_obj.hemu_rate = responseData.hemu;
      this.data_obj.energy = responseData.shuxiang;
      this.data_obj.career = responseData.syjk;
      this.data_obj.family = responseData.jtxc;
      this.data_obj.character = responseData.xgpp;
      this.data_obj.parents = responseData.shuangqin;
      this.data_obj.blossom = responseData.taohua;
      this.data_obj.all = responseData.zhpp;
      this.data_obj.dayun = responseData.dayun;
    },
    renderResultAndComplete: function renderResultAndComplete(res) {
      this.renderResult(res);
      this.loading = false;
      this.hasData = true;
      _mintUi.Indicator.close();
    },
    getFormateStr: function getFormateStr() {
      var maleusername = this.user_ext.male_name;
      var femaleusername = this.user_ext.female_name;
      var maleyear = this.user_ext.male_birth_year;
      var malemonth = this.user_ext.male_birth_month;
      var maledate = this.user_ext.male_birth_date;
      var femaleyear = this.user_ext.female_birth_year;
      var femalemonth = this.user_ext.female_birth_month;
      var femaledate = this.user_ext.female_birth_date;
      var malehour = parseInt(this.user_ext.male_birth_hour);
      var femalehour = parseInt(this.user_ext.female_birth_hour);
      var male_rili = this.user_ext.male_is_gongli;
      var female_rili = this.user_ext.female_is_gongli;
      var querystring = '';
      querystring += maleusername;
      querystring += '|';
      querystring += femaleusername;
      querystring += '|';
      querystring += maleyear;
      querystring += '|';
      querystring += malemonth;
      querystring += '|';
      querystring += maledate;
      querystring += '|';
      querystring += femaleyear;
      querystring += '|';
      querystring += femalemonth;
      querystring += '|';
      querystring += femaledate;
      querystring += '|';
      querystring += malehour;
      querystring += '|';
      querystring += femalehour;
      querystring += '|';
      querystring += male_rili;
      querystring += '|';
      querystring += female_rili;
      querystring += '|';
      querystring += '0';
      this.init_male_str = maleusername + '|1|' + male_rili + '|' + maleyear + '|' + malemonth + '|' + maledate + '|' + malehour;
      this.init_female_str = femaleusername + '|0|' + female_rili + '|' + femaleyear + '|' + femalemonth + '|' + femaledate + '|' + femalehour;

      this.show_bazi = true;
      this.query_user_string = querystring;
      this.parseUserString();
    },

    /**
     * @description: 用户生辰解析
     * @return {*}
     */
    parseUserString: function parseUserString() {
      var query_user_string_array = this.query_user_string.split('|');
      var myear = query_user_string_array[2];
      var mmonth = query_user_string_array[3];
      var mdate = query_user_string_array[4];
      this.mname = query_user_string_array[0];
      var fyear = query_user_string_array[5];
      var fmonth = query_user_string_array[6];
      var fdate = query_user_string_array[7];
      this.fname = query_user_string_array[1];
      // 男性生日農曆
      if (query_user_string_array[10] === '0') {
        var mday = this.getGlDate(myear, mmonth, mdate);
        this.mbirth = this.$t('nongli-label') + ' ' + myear + '\u5E74' + mday.nmonthstr + mday.ndatestr;
      } else {
        this.mbirth = this.$t('gongli-label') + ' ' + myear + '\u5E74' + mmonth + '\u6708' + mdate + '\u65E5';
      }
      // 女性生日農曆
      if (query_user_string_array[11] === '0') {
        var fday = this.getGlDate(fyear, fmonth, fdate);
        this.fbirth = this.$t('nongli-label') + ' ' + fyear + '\u5E74' + fday.nmonthstr + fday.ndatestr;
      } else {
        this.fbirth = this.$t('gongli-label') + ' ' + fyear + '\u5E74' + fmonth + '\u6708' + fdate + '\u65E5';
      }
    },


    /**
     * @description: 获取公历日期
     * @param {*} year
     * @param {*} month
     * @param {*} date
     * @return {*}
     */
    getGlDate: function getGlDate(year, month, date) {
      var twoYearAllDate = [];
      for (var i = 0; i < 12; i++) {
        twoYearAllDate = twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year, i + 1));
      }
      for (var _i = 0; _i < 12; _i++) {
        twoYearAllDate = twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year / 1 + 1, _i + 1));
      }

      twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year + 1, 1));
      twoYearAllDate.concat(_suishenWnl2.default.getOneMonthData(year + 1, 2));

      var gldate = twoYearAllDate.find(function (item) {
        return item.nyear == year && item.nmonth == month && item.ndate == date;
      });
      if (this.language === 'zh-TW' && gldate.nmonth === 12) {
        gldate.nmonthstr = '臘月';
      }
      return gldate;
    },
    getStarts: function getStarts(star) {
      var starts = [_star_gray2.default, _star_gray2.default, _star_gray2.default, _star_gray2.default, _star_gray2.default];
      for (var i = 0; i < star; i++) {
        starts.unshift(_star_light2.default);
      }
      starts.length = 5;
      return starts;
    },
    decodeUnicode: function decodeUnicode(str) {
      str = str.replace(/\\/g, '%');
      return unescape(str);
    },
    copyOrder: function copyOrder() {
      _utils2.default.copyText(this.order_id);
      (0, _mintUi.Toast)('订单号已复制');
    }
  }
};

/***/ }),
/* 804 */,
/* 805 */,
/* 806 */,
/* 807 */,
/* 808 */,
/* 809 */,
/* 810 */,
/* 811 */,
/* 812 */,
/* 813 */,
/* 814 */,
/* 815 */,
/* 816 */,
/* 817 */,
/* 818 */,
/* 819 */,
/* 820 */,
/* 821 */,
/* 822 */,
/* 823 */,
/* 824 */,
/* 825 */,
/* 826 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var huangliWords = ["嫁娶", "祭祀", "开光", "祈福", "求嗣", "出行", "开市", "交易", "立券", "动土", "纳财", "掘井", "会亲友", "入宅", "安葬", "伐木", "作梁", "纳畜", "造畜稠", "作灶", "塑绘", "酬神", "斋醮", "订盟", "纳采", "裁衣", "起基", "出火", "拆卸", "移徙", "安香", "修造", "竖柱", "上梁", "牧养", "解除", "定磉", "盖屋", "安门", "栽种", "置产", "开池", "安床", "破土", "移柩", "立碑", "进人口", "入殓", "赴任", "沐浴", "安机械", "安碓磑", "启钻", "造庙", "谢土", "除服", "成服", "入学", "习艺", "探病", "求医", "治病", "开生坟", "合寿木", "合帐", "经络", "理发", "冠笄", "普渡", "开仓", "出货财", "修坟", "馀事勿取", "挂匾", "架马", "开柱眼", "归岫", "合脊", "行丧", "造桥", "放水", "造仓", "词讼", "开渠", "斋醮　", "造车器", "结网", "畋猎", "取渔", "造船", "问名", "针灸", "坏垣", "诸事不宜", "捕捉", "扫舍", "补垣", "塞穴", "筑堤", "断蚁", "整手足甲", "开厕", "教牛马", "雕刻", "修门", "纳婿", "修饰垣墙", "分居", "雇庸", "破屋", "割蜜", "归宁", "平治道涂", "乘船"];
/**黄历数据，12行x60列，里面的字符串使用数字代替，
 * 数字对应的文本如huangliWords，坐标从0开始*/
var huangliData = [[{ "y": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "j": [13, 14, 15, 16, 17, 18, 19] }, { "y": [1, 2, 20, 21, 22, 23, 24, 0, 25, 9, 26, 27, 28, 29, 13, 30, 31, 32, 33, 17, 34, 3, 4, 35, 15, 36, 37, 38], "j": [39, 14] }, { "y": [30, 27, 24, 23, 0, 6, 8, 7, 73, 2, 5, 35, 42, 39, 40, 28, 31, 9], "j": [19, 14, 1, 47] }, { "y": [23, 24, 1, 9, 43, 7, 8], "j": [0, 14] }, { "y": [0, 24, 23, 67, 85, 1, 2, 3, 4, 5, 35, 15, 27, 13, 28, 31, 9, 33, 42, 39, 43], "j": [78, 40, 14] }, { "y": [0, 6, 8, 1, 3, 9, 29, 13], "j": [53, 14] }, { "y": [0, 24, 23, 2, 1, 5, 66, 9, 42, 80, 83, 39, 46], "j": [13, 33, 47, 37, 59, 19, 38, 14, 17, 15] }, { "y": [93], "j": [47, 14, 6, 7] }, { "y": [1, 3, 4, 22, 2, 5, 0, 60, 61, 9, 43, 57, 26, 95, 32, 33, 69, 70, 40, 39, 34, 62, 54, 45], "j": [38, 42, 25, 13, 14] }, { "y": [93], "j": [] }, { "y": [24, 23, 1, 3, 4, 20, 35, 28, 31, 9, 32, 33, 38, 40, 41, 11, 17, 42, 39, 18, 43, 44, 45], "j": [0, 6, 27, 46, 47, 48, 13, 29, 5, 14] }, { "y": [1, 5, 49, 25, 3, 22, 23, 24, 0, 50, 6, 8, 51, 17], "j": [39, 47, 14] }, { "y": [24, 0, 1, 3, 5, 6, 12, 9, 43, 52], "j": [29, 13, 27, 38, 14] }, { "y": [1, 23, 24, 31, 9, 3, 20, 22, 49, 28, 26, 13, 30, 53, 44, 54, 55, 56, 57, 58, 5, 32, 33, 11, 4, 35, 15], "j": [19, 14, 6, 37] }, { "y": [24, 0, 5, 6, 8, 17, 34, 27, 29, 13], "j": [3, 9, 43, 14, 47] }, { "y": [0, 1, 3, 4, 2, 6, 7, 8, 42, 5, 28], "j": [17, 13, 29, 14, 59, 15, 33, 38, 47, 9] }, { "y": [1, 3, 4, 22, 30, 35, 29, 13, 12, 60, 61, 9, 43, 62, 63], "j": [64, 33, 65, 14, 47] }, { "y": [1, 3, 4, 2, 6, 34, 66], "j": [0, 5, 14, 47, 13, 19, 67, 33] }, { "y": [0, 23, 24, 1, 22, 68, 35, 5, 12, 6, 10, 31, 9, 32, 33, 2, 69, 70, 17, 34, 41, 43, 52], "j": [27, 13, 37, 38, 14] }, { "y": [1, 45, 71, 52, 55, 56, 72], "j": [] }, { "y": [0, 23, 24, 1, 3, 5, 60, 61, 27, 29, 13], "j": [6, 69, 70, 42, 38, 14] }, { "y": [35, 72], "j": [] }, { "y": [3, 22, 24, 23, 35, 74, 75, 31, 9, 26, 33, 76, 37, 77, 11, 55, 56, 43, 39], "j": [29, 6, 13, 14] }, { "y": [6, 7, 8, 10, 17, 18, 13, 29, 42, 2, 3, 4, 9], "j": [0, 39, 14, 66, 53, 19, 47, 78, 79] }, { "y": [1, 49, 2, 20, 3, 4, 23, 24, 67, 25, 0, 9, 55, 56, 44, 43, 52, 5, 51, 80, 6, 8, 7], "j": [14, 33, 13, 19] }, { "y": [0, 1, 2, 3, 4, 27, 13, 29, 42, 28, 9, 43, 54], "j": [64, 6, 14, 47] }, { "y": [23, 24, 0, 46, 12, 7, 8, 9, 55, 54, 44, 43, 52, 48, 5, 6, 10, 39], "j": [47, 14, 13, 42] }, { "y": [1, 3, 4, 2, 5, 6, 7, 8, 39, 42, 17, 29, 26, 9, 36, 81, 40, 43, 52, 71], "j": [13, 31, 38, 15, 47, 14, 37] }, { "y": [0, 24, 1, 3, 60, 61, 5, 9, 29, 13], "j": [6, 38] }, { "y": [0, 24, 23, 1, 3, 4, 24, 25, 67, 2, 42, 16, 31, 9, 19, 26, 33, 37, 17, 34], "j": [29, 39, 5, 78, 43, 14, 82] }, { "y": [3, 5, 23, 24, 0, 25, 9, 42, 80, 6, 11, 7, 8, 39, 83, 55, 56, 44, 43], "j": [] }, { "y": [1, 71, 55, 56, 52, 44, 72], "j": [6, 13, 0, 9, 43, 14] }, { "y": [1, 3, 22, 49, 32, 23, 24, 0, 28, 13, 44, 52, 54, 48, 27, 17], "j": [19, 47, 14, 42] }, { "y": [0, 67, 1, 3, 4, 84, 2, 5, 35, 9, 6, 7, 8, 73, 28, 43], "j": [15, 33, 31, 47, 66, 12, 13, 38, 14, 19] }, { "y": [23, 24, 1, 3, 31, 9, 33, 43], "j": [0, 19] }, { "y": [24, 23, 1, 3, 4, 22, 49, 46, 12, 57, 61, 51, 11, 41, 17, 34, 18], "j": [0, 64, 13, 78, 14] }, { "y": [1, 49, 3, 4, 22, 23, 24, 25, 67, 6, 8, 7, 10, 49, 55, 54, 5, 44], "j": [47, 14, 19, 13] }, { "y": [0, 23, 24, 1, 3, 5, 31, 9, 29, 13, 43, 27, 38, 42, 33, 45, 44], "j": [6, 7, 64, 14] }, { "y": [0, 2, 5, 27, 28, 46, 6, 8, 7, 73, 13, 29, 42, 39], "j": [3, 47, 1, 19, 14, 59] }, { "y": [1, 3, 4, 2, 24, 23, 0, 5, 9, 43, 12, 6, 7, 8, 58, 28, 26, 51, 80, 41, 81, 83, 39, 54, 52, 71, 45], "j": [13, 38, 14] }, { "y": [0, 2, 1, 3, 4, 5, 35, 15, 13, 29, 42, 27, 28, 31, 33, 39, 44], "j": [14, 6, 7, 8] }, { "y": [24, 23, 0, 1, 49, 20, 2, 27, 61, 58, 15, 37, 32, 33, 42, 19, 51, 73, 11, 17], "j": [5, 14, 79] }, { "y": [0, 1, 3, 4, 5, 9, 42, 11, 43, 52], "j": [13, 16, 38, 15, 31, 33, 47, 37] }, { "y": [1, 35, 86, 87, 88, 12, 57, 44, 52, 55, 56], "j": [6, 3, 9, 43, 47, 14, 89] }, { "y": [1, 3, 4, 2, 6, 5, 35, 9, 26, 40, 39], "j": [0, 19, 71, 38, 13, 45, 14, 42] }, { "y": [6, 10, 5, 1, 3, 4, 22, 90, 57, 26, 36, 40, 83, 11, 28, 39, 17, 34, 9, 43, 52], "j": [29, 13, 27, 47, 14] }, { "y": [1, 2, 3, 35, 16, 9, 42, 11, 39, 17, 43, 44], "j": [0, 5, 48, 37, 47, 13, 29, 27, 46, 14] }, { "y": [23, 24, 12, 1, 22, 49, 20, 27, 2, 32, 33, 6, 7, 8, 16, 75, 15, 74, 38, 42, 28, 34, 18, 11], "j": [53, 0, 5, 9, 14, 78] }, { "y": [0, 2, 3, 4, 35, 9, 42, 39, 41, 11, 1, 43, 52], "j": [13, 19, 15, 14, 27, 5, 17] }, { "y": [2, 3, 4, 5, 35, 15, 37, 26, 31, 74, 38, 29, 13, 53, 55, 56, 44, 54, 17, 34], "j": [24, 9, 6, 7] }, { "y": [0, 3, 4, 2, 5, 35, 28, 27, 6, 8, 7, 13, 29, 42, 9, 43, 54], "j": [1, 47, 14, 59] }, { "y": [0, 1, 3, 4, 22, 23, 24, 35, 5, 9, 43, 58, 91, 66, 12, 26, 31, 9, 32, 36, 42, 28, 17, 34, 80, 43, 55, 56, 71, 45], "j": [6, 13, 59, 27, 37] }, { "y": [35, 92, 72], "j": [93] }, { "y": [1, 20, 2, 60, 61, 0, 12, 80, 11, 34, 17, 83, 51], "j": [37, 13, 19, 57, 14, 78] }, { "y": [0, 1, 3, 4, 2, 5, 35, 42, 39, 44, 46, 12, 55, 56], "j": [37, 47, 14, 15, 13, 29, 40, 17] }, { "y": [1, 68, 35, 12, 94, 87, 52, 55, 56, 44], "j": [0, 6, 9, 11, 41, 14] }, { "y": [0, 1, 3, 4, 2, 5, 35, 27, 46, 6, 7, 8, 73, 10, 13, 29, 39, 43, 54], "j": [42, 14] }, { "y": [1, 3, 4, 22, 49, 67, 5, 66, 28, 35, 26, 9, 36, 51, 41, 11, 95, 55, 56, 44, 52, 45, 54], "j": [29, 13, 38, 16, 14] }, { "y": [1, 3, 4, 2, 28, 31, 9, 33, 42, 40, 39, 43], "j": [0, 46, 14, 5, 48, 13, 29, 47, 83] }, { "y": [20, 2, 49, 67, 12, 19, 80, 18], "j": [0, 47, 14, 5] }], [{ "y": [1, 49, 3, 22, 23, 24, 25, 28, 26, 32, 33, 42, 47, 55, 56, 44, 52, 73, 4, 5, 64, 18], "j": [69, 0, 29, 13] }, { "y": [1, 3, 4, 17, 47, 52, 54, 55, 56], "j": [39, 2, 5, 91, 0, 13, 9, 43] }, { "y": [23, 24, 67, 28, 31, 9, 42, 47, 55, 56, 44, 14, 43, 52, 81], "j": [19, 2, 0, 6, 13] }, { "y": [1, 5, 31, 9, 64, 18, 42, 29, 47, 44, 43, 52, 14, 62, 63, 96, 97], "j": [13, 19, 66, 2, 38] }, { "y": [0, 25, 1, 5, 42, 19, 29, 13, 43, 14], "j": [48, 94] }, { "y": [0, 64, 25, 67, 15, 33, 27, 28, 29, 31, 9, 38, 10, 98, 39, 97], "j": [42, 3, 5, 14, 78, 2] }, { "y": [96, 97, 86, 47, 55, 56, 44, 14, 52, 72], "j": [93] }, { "y": [1, 5, 16, 27, 28, 31, 9, 26, 42, 96, 97, 47, 43, 14, 44, 18], "j": [0, 13, 22, 2, 91, 11] }, { "y": [1, 25, 67, 0, 50, 28, 9, 26, 29, 13, 47, 52, 14, 81, 65], "j": [42, 2, 6, 7] }, { "y": [0, 25, 67, 64, 1, 5, 42, 29, 97, 47, 43, 44, 14], "j": [6, 39, 40, 82, 38, 11, 2] }, { "y": [3, 22, 5, 23, 24, 47, 44, 43, 14, 45, 86], "j": [13, 19] }, { "y": [13, 29, 5, 46, 31, 9, 26, 33, 38, 81, 96, 97, 18], "j": [0, 6, 42, 39, 14, 3, 2, 11, 14] }, { "y": [1, 3, 22, 49, 42, 50, 85, 47, 44, 52, 14, 45, 64, 65, 7], "j": [19, 11, 0, 13] }, { "y": [1, 3, 4, 22, 47, 55, 56, 44, 14, 52], "j": [0, 9, 2, 37, 43] }, { "y": [23, 24, 25, 64, 67, 50, 28, 42, 47, 55, 56, 44, 43, 52, 14, 71, 45, 65, 7, 8, 10, 98, 81, 96, 97, 17, 15, 74], "j": [1, 2, 0, 13] }, { "y": [1, 3, 4, 22, 67, 19, 10, 7], "j": [2, 0, 11, 14, 38, 59] }, { "y": [0, 1, 3, 4, 5, 27, 28, 31, 9, 13, 29, 42, 19, 97, 39, 43, 14], "j": [2, 11, 69] }, { "y": [0, 67, 31, 9, 19, 29, 13, 96, 97, 17, 34, 74, 31, 9, 26, 36, 41, 89], "j": [3, 2, 11, 6, 14] }, { "y": [1, 47, 43, 55, 56, 44, 52, 14, 54, 72], "j": [] }, { "y": [0, 68, 1, 3, 96, 97, 99, 98, 47, 55, 56, 14], "j": [9, 43, 11, 2, 33, 82] }, { "y": [0, 5, 15, 28, 31, 9, 29, 14, 43, 71, 45], "j": [11, 3, 42, 6, 13, 73, 2] }, { "y": [67, 1, 49, 19, 66, 100, 95, 96, 97, 47, 43, 52], "j": [2, 0, 12, 39, 91, 14] }, { "y": [42, 1, 41, 96, 47, 44, 43, 52], "j": [13, 29, 0, 11, 19, 27, 46, 6, 2] }, { "y": [24, 23, 1, 49, 67, 64, 25, 31, 9, 28, 29, 13, 38, 69, 98, 101, 39, 17, 96, 97], "j": [0, 3, 2, 11, 14, 78] }, { "y": [42, 25, 7, 8, 47, 44, 14, 55, 56], "j": [40, 0, 5, 2, 39, 9, 43, 13, 61] }, { "y": [1, 3, 4, 21, 25, 42, 8, 7, 47, 55, 56, 44, 54, 52], "j": [5, 0, 13, 9] }, { "y": [42, 15, 28, 31, 9, 33, 8, 7, 39, 17, 34, 47, 14], "j": [0, 1, 2, 5, 27, 29, 13, 38] }, { "y": [1, 3, 25, 64, 42, 47, 55, 56, 44, 43, 52, 14, 54, 45, 18], "j": [11, 38, 0, 24] }, { "y": [0, 7, 8, 101, 96, 97, 87, 88, 62], "j": [42, 83, 33, 31, 6, 2, 13, 29, 42] }, { "y": [25, 19, 29, 13, 17], "j": [0, 14] }, { "y": [65, 1, 49, 96, 97, 55, 56, 44, 47, 52, 45], "j": [2, 61, 0, 11, 43, 14] }, { "y": [0, 1, 3, 22, 19, 29, 13], "j": [9, 43] }, { "y": [0, 67, 50, 35, 17, 34, 49, 15, 74, 16, 38, 95, 63, 14, 52, 45, 71], "j": [3, 2, 6, 13, 9] }, { "y": [0, 1, 50, 47, 43, 14], "j": [9, 33] }, { "y": [64, 25, 0, 42, 47, 44, 43, 18], "j": [40, 89, 2, 11, 19] }, { "y": [5, 49, 66, 96, 97], "j": [13, 14] }, { "y": [1, 3, 4, 49, 90, 7, 10, 47, 44, 14, 71, 45, 54, 18, 102], "j": [13, 40, 0, 9, 39, 6, 2, 9, 43] }, { "y": [1, 3, 4, 47, 52, 14, 44], "j": [2, 11, 91, 5, 0, 13, 29, 19, 9] }, { "y": [67, 8, 7, 31, 9, 50, 47, 14, 43], "j": [0, 3, 27, 13] }, { "y": [0, 5, 64, 67, 42, 55, 56, 19, 7, 8, 47, 44, 43, 14], "j": [82, 2, 6] }, { "y": [0, 67, 1, 5, 29, 13, 19, 85, 96, 97, 101, 43, 52, 55, 56, 47], "j": [37, 79, 38, 14, 33] }, { "y": [4, 0, 24, 64, 25, 67, 15, 16, 31, 9, 26, 32, 33, 38, 19, 98, 18], "j": [14, 5, 3, 39] }, { "y": [1, 47, 55, 56, 44, 43, 52, 14, 97, 99, 86], "j": [6, 13, 0, 2, 37] }, { "y": [0, 1, 3, 4, 5, 27, 28, 31, 29, 9, 42, 47, 43, 14, 52], "j": [37, 2, 66, 89, 11, 19] }, { "y": [67, 49, 5, 31, 9, 29, 13, 43, 14], "j": [0, 6, 1, 3, 22, 24, 71] }, { "y": [1, 35, 25, 66, 42, 19, 18, 80, 98, 96, 97, 100, 95], "j": [0, 2, 12, 11, 38, 39] }, { "y": [1, 66, 40, 97, 55, 56, 44, 47, 43, 14], "j": [0, 13, 42, 11, 2] }, { "y": [16, 31, 9, 38, 19, 97, 41, 101, 98, 96, 39], "j": [0, 3, 11, 78, 14, 42] }, { "y": [7, 8, 10, 42, 25, 18, 14, 54, 52, 55, 56, 71, 45, 44, 47], "j": [2, 0, 6, 9, 43] }, { "y": [1, 64, 25, 65, 15, 16, 42, 19, 47, 14, 52, 44], "j": [82, 27, 13] }, { "y": [25, 65, 15, 75, 28, 31, 9, 33, 77, 63, 47, 55, 56, 44, 43, 14, 52, 71, 45], "j": [1, 0, 5, 11] }, { "y": [1, 25, 67, 42, 7, 8, 41, 96, 97, 47, 43, 52, 14, 54, 55, 56], "j": [0, 11, 59, 6, 2, 39] }, { "y": [72], "j": [] }, { "y": [31, 9, 26, 38, 42, 39, 98, 96, 18], "j": [0, 11, 13, 29, 27, 5, 78, 14, 2, 66, 46] }, { "y": [1, 97, 86, 87, 72], "j": [29, 6, 13, 0, 2, 38] }, { "y": [1, 9, 98, 41, 12, 97, 47, 44, 43, 14], "j": [2, 5, 31, 33, 13, 38, 19, 25] }, { "y": [5, 35, 67, 0, 15, 74, 75, 31, 9, 29, 13, 62, 63, 47, 44, 43, 14, 71], "j": [1, 3, 2, 6, 42] }, { "y": [0, 1, 3, 4, 9, 42, 95, 47, 44, 43, 52, 14, 19, 100, 96, 55, 56], "j": [2, 39] }, { "y": [0, 67, 42, 24, 12, 97, 94, 40, 18], "j": [2, 11, 14, 54, 71] }, { "y": [49, 67, 96, 97, 25, 31, 16, 75, 51, 98, 101, 99], "j": [29, 13, 0, 3, 2, 11] }], [{ "y": [7, 46, 1, 49, 94, 47, 55, 56, 14, 54, 52, 71], "j": [22, 13, 31, 9, 43] }, { "y": [1, 35, 72], "j": [93] }, { "y": [2, 35, 15, 32, 33, 7, 8, 17, 47, 44, 14], "j": [13, 5, 29, 1, 0, 9, 43, 19] }, { "y": [3, 2, 20, 21, 23, 24, 25, 42, 6, 8, 47, 55, 56, 44, 52, 14, 45, 48, 12, 5, 7, 32], "j": [19, 11, 9, 39] }, { "y": [1, 106, 72], "j": [2, 31, 9, 43] }, { "y": [97, 86, 72], "j": [93] }, { "y": [5, 102, 110, 72], "j": [22, 37, 9, 43] }, { "y": [0, 24, 5, 1, 3, 35, 29, 13], "j": [9, 14] }, { "y": [0, 24, 23, 1, 3, 4, 5, 35, 32, 13, 29, 10, 33, 17, 47, 14, 52], "j": [39, 11, 9, 42, 43, 40] }, { "y": [1, 5, 56, 55, 49, 47], "j": [9, 67, 29, 13, 6, 32, 33] }, { "y": [1, 85, 5, 31, 33, 37, 38, 42, 18, 102], "j": [70, 69, 9, 43, 14, 78, 15, 83, 39] }, { "y": [1, 49, 5, 67, 46, 72], "j": [0, 9, 14, 19] }, { "y": [18, 102], "j": [13, 29, 107, 19, 27, 30, 9, 0, 11, 95, 79] }, { "y": [35, 95, 1, 102, 72], "j": [] }, { "y": [24, 12, 32, 33, 8, 47, 44, 14, 52], "j": [1, 29, 13, 9, 43] }, { "y": [1, 5, 0, 67, 42, 47, 44, 14], "j": [11, 9, 19, 39] }, { "y": [1, 35, 102, 5, 72], "j": [9, 43, 78, 2, 16, 14, 59] }, { "y": [35, 95, 72], "j": [93] }, { "y": [1, 7, 10], "j": [22, 83, 33, 9, 43] }, { "y": [1, 5, 7, 110, 18], "j": [0, 19, 14, 9, 82, 16, 15, 11, 43, 29] }, { "y": [0, 67, 1, 49, 68, 5, 10, 95, 17, 48], "j": [6, 9, 43, 42, 69, 33] }, { "y": [1, 5, 95, 72], "j": [93] }, { "y": [24, 23, 0, 1, 3, 4, 40, 60, 61, 6, 7, 8, 12, 29, 32, 33, 37, 77, 38, 80, 94, 17], "j": [53, 89, 9, 43, 14] }, { "y": [1, 49, 72], "j": [] }, { "y": [64, 25, 102, 72], "j": [13, 9, 43, 0, 19, 89] }, { "y": [1, 35, 18, 102, 91, 72], "j": [0, 9, 41, 14] }, { "y": [25, 64, 47, 55, 56, 12, 10], "j": [1, 3, 29, 0, 13] }, { "y": [1, 3, 4, 22, 0, 67, 5, 6, 7, 12, 102, 55, 56, 52, 14, 44], "j": [9, 29, 13] }, { "y": [1, 46, 0, 42, 35, 67, 5, 25, 95], "j": [11, 9, 43, 14, 2] }, { "y": [97, 99, 86, 87, 72], "j": [0, 14, 13, 5, 9, 82] }, { "y": [1, 47, 44, 52, 14], "j": [33, 9, 43] }, { "y": [0, 1, 5, 25, 67, 7, 103, 10, 18, 85, 103, 102], "j": [29, 13, 39, 9, 43, 19, 14, 78, 15, 33] }, { "y": [0, 5, 17, 1, 47, 52, 14], "j": [19, 9, 43] }, { "y": [1, 5, 49, 95, 14, 72], "j": [9, 43, 40, 11] }, { "y": [19, 18], "j": [78, 14] }, { "y": [35, 106, 67, 5, 72], "j": [6, 9, 43, 0, 14] }, { "y": [102, 72], "j": [13, 9, 43] }, { "y": [1, 102, 18, 1, 12, 35, 72], "j": [0, 13, 5, 9, 43, 14, 78] }, { "y": [42, 35, 25, 32, 33, 7, 8, 10, 17, 34, 47, 44, 14, 52], "j": [0, 5, 9, 83, 13, 1, 11] }, { "y": [1, 12, 5, 8, 7, 67, 10], "j": [0, 9, 11, 26, 36, 43] }, { "y": [5, 106, 18, 102, 72], "j": [93] }, { "y": [1, 35, 99, 12, 72], "j": [0, 14] }, { "y": [1, 35, 72], "j": [93] }, { "y": [1, 31, 5, 37, 32, 85, 102, 18, 110], "j": [9, 43, 11, 14] }, { "y": [1, 3, 4, 2, 5, 35, 33, 37, 29, 38, 10, 34, 17, 14, 52, 47], "j": [43, 40, 11, 9, 42] }, { "y": [1, 5], "j": [0, 13, 31, 9, 12, 43] }, { "y": [1, 5, 25, 67, 12, 18, 0, 32, 33, 29, 10, 17], "j": [9, 15, 16, 78, 14, 62] }, { "y": [1, 49, 5, 72], "j": [6, 9, 43, 78, 14] }, { "y": [14, 52, 44, 47, 55, 56], "j": [72] }, { "y": [1, 35, 102, 12, 72], "j": [43, 9, 14] }, { "y": [25, 15, 16, 10, 7, 8], "j": [93] }, { "y": [1, 12, 8, 7, 25, 64, 0, 67, 46], "j": [39, 9, 14, 11, 71, 59] }, { "y": [1, 5, 102, 95, 72], "j": [2, 15, 14, 43] }, { "y": [97, 99, 86, 72], "j": [43, 14] }, { "y": [1, 102, 99, 72], "j": [22, 29, 13, 9] }, { "y": [6, 10, 1, 20, 50, 67, 12, 25, 69, 65, 17, 18, 102, 34], "j": [9, 43, 14, 61] }, { "y": [1, 25, 38, 10, 95, 5, 46, 19, 17, 18], "j": [42, 9, 14, 62, 63] }, { "y": [1, 3, 4, 5, 49, 7, 95, 102], "j": [9, 19, 78, 14, 71] }, { "y": [1, 3, 4, 2, 5, 35, 33, 13, 29, 42, 38, 10, 17, 18], "j": [15, 78, 43, 0, 14, 83] }, { "y": [1, 49, 72], "j": [93] }], [{ "y": [1, 12, 0, 49, 31, 9, 3, 2, 20, 5, 23, 24, 25, 47, 55, 56, 44, 52, 48, 32, 33, 10, 95, 39, 17, 15], "j": [13, 19, 42, 69] }, { "y": [0, 24, 23, 85, 1, 3, 53, 30, 27, 5, 111, 57, 13, 7, 8, 60, 61, 31, 9, 32, 33, 37, 26, 38], "j": [22, 15, 16, 14, 78] }, { "y": [49, 35, 23, 24, 25, 67, 28, 31, 9, 29, 13, 55, 56, 44, 43, 52, 14, 95, 71, 15, 10, 7, 8], "j": [19, 1, 33, 5] }, { "y": [1, 3, 4, 2, 0, 5, 35, 15, 28, 46, 42, 9, 26, 33, 39, 17, 43, 54, 52, 14], "j": [29, 13, 27, 19, 11] }, { "y": [1, 95, 97], "j": [39, 19, 14, 0] }, { "y": [0, 1, 3, 4, 22, 2, 27, 29, 13, 32, 33, 12, 37, 26, 61, 61, 38, 85, 11, 41], "j": [24, 5, 71, 14, 6, 8, 19] }, { "y": [0, 23, 24, 5, 1, 3, 22, 9, 33, 43, 14], "j": [29, 13] }, { "y": [0, 1, 3, 4, 2, 5, 35, 27, 28, 31, 46, 13, 29, 9, 42, 17, 39, 10, 7, 8, 73, 18], "j": [14, 62, 78] }, { "y": [0, 1, 3, 22, 61, 43, 14], "j": [6, 13] }, { "y": [35, 1, 3, 4, 31, 9, 32, 33, 42, 17, 37, 77, 26, 47, 43, 14], "j": [27, 0, 2, 46, 5, 82, 6, 13, 29, 48] }, { "y": [1, 49, 48, 5, 72], "j": [93] }, { "y": [1, 2, 5, 35, 15, 16, 27, 28, 13, 29, 42, 31, 18, 95], "j": [53, 0, 11, 39, 79, 19, 9] }, { "y": [1, 3, 22, 20, 2, 23, 24, 25, 67, 0, 28, 13, 30, 47, 44, 66, 14, 71, 54, 48, 29, 49, 61, 43, 52, 100, 57, 16], "j": [6] }, { "y": [23, 24, 85, 1, 3, 5, 30, 31, 9, 33, 6, 7, 8, 29, 13, 12, 50, 39, 17, 37, 26, 42, 18], "j": [43, 14, 78, 62] }, { "y": [6, 7, 8, 73, 2, 35, 15, 16, 27, 13, 29, 42, 28, 9, 33, 39, 17, 14], "j": [0, 1, 5, 40] }, { "y": [1, 3, 22, 5, 6, 8, 9, 29, 13, 43, 14], "j": [2, 0, 19, 11, 17] }, { "y": [97, 93], "j": [38, 19, 14, 0] }, { "y": [49, 22, 35, 60, 61, 12, 18, 39, 66, 95], "j": [6, 0, 29, 13, 11, 14] }, { "y": [6, 7, 8, 73, 2, 5, 28, 46, 13, 44, 9, 38, 33, 39, 43, 71, 14], "j": [0, 42, 59, 19] }, { "y": [0, 23, 24, 67, 12, 50, 85, 1, 5, 10, 13, 30, 27, 57, 20, 2, 28, 26, 31, 9, 34, 39, 38, 101], "j": [78, 15, 16, 19] }, { "y": [0, 1, 3, 4, 2, 27, 28, 31, 9, 46, 6, 7, 8, 73, 13, 29, 39, 17, 47, 52, 55, 56], "j": [] }, { "y": [1, 49, 66, 100, 67, 35, 47, 44, 43, 52, 14], "j": [0, 5, 13, 6, 38] }, { "y": [0, 1, 20, 2, 5, 35, 66, 100, 9, 42, 41, 80, 95], "j": [15, 78, 19, 16, 14] }, { "y": [5, 85, 18, 35, 67, 25, 16, 103, 12, 29, 13, 50, 18, 6, 95], "j": [0, 9, 43, 71] }, { "y": [0, 2, 5, 35, 27, 28, 31, 46, 9, 13, 29, 39, 17, 11, 14, 55, 56], "j": [40, 42] }, { "y": [24, 23, 0, 1, 3, 30, 27, 5, 12, 65, 60, 61, 35, 28, 26, 31, 9, 36, 95, 39, 34, 18], "j": [22, 16, 11, 78, 14] }, { "y": [49, 20, 2, 24, 23, 6, 7, 8, 10, 26, 9, 36, 80, 14, 43, 52, 71, 45, 44], "j": [13, 38, 1, 54] }, { "y": [1, 22, 25, 64, 67, 23, 24, 0, 13, 30, 54, 47, 44, 43, 45, 30, 12, 5, 3, 4, 45, 33, 80], "j": [11] }, { "y": [97, 100, 35, 94, 87, 86, 72, 93], "j": [0, 19, 11, 14] }, { "y": [24, 2, 60, 61, 9, 33, 29, 13], "j": [0, 6, 14] }, { "y": [24, 23, 0, 1, 3, 4, 2, 35, 5, 27, 13, 29, 39, 17, 34, 9, 43, 47, 14], "j": [19, 42, 69, 37] }, { "y": [23, 24, 5, 3, 22, 42, 12], "j": [29, 13, 14] }, { "y": [31, 9, 50, 1, 49, 35, 28, 61, 19, 37, 26, 41, 95, 18, 62, 63, 14, 43, 52, 44, 47, 45], "j": [6, 13, 5, 42] }, { "y": [23, 24, 1, 3, 31, 9, 33, 43, 14], "j": [0, 6] }, { "y": [0, 24, 1, 35, 5, 31, 9, 6, 33, 42, 100, 95, 60, 61, 26, 36, 37, 77], "j": [53, 78, 14, 15, 19, 89] }, { "y": [49, 66, 57, 58, 46], "j": [0, 13] }, { "y": [24, 23, 0, 1, 3, 4, 2, 5, 35, 46, 6, 8, 73, 13, 29, 38, 39, 9, 60, 61, 12, 26, 31, 37, 14], "j": [19, 65, 42] }, { "y": [0, 5, 60, 61, 1, 3, 33, 17], "j": [6, 14] }, { "y": [0, 2, 35, 27, 28, 31, 46, 13, 29, 42, 39, 47, 71, 9, 55, 56], "j": [19, 14, 1, 6, 24, 23, 17, 54, 5, 59] }, { "y": [0, 42, 2, 5, 1, 9, 27, 35, 12, 6, 7, 8, 73, 13, 29, 28, 43, 52, 14], "j": [11, 82] }, { "y": [1, 49, 35, 95, 97, 34], "j": [0, 14, 78, 38] }, { "y": [1, 3, 2, 4, 35, 15, 27, 13, 29, 42, 28, 31, 9, 18], "j": [0, 10, 14, 5, 6, 8, 19, 39] }, { "y": [0, 24, 23, 1, 3, 61, 85, 31, 9, 29, 13], "j": [6, 5, 42, 19, 14] }, { "y": [0, 1, 3, 27, 2, 4, 5, 28, 6, 7, 8, 73, 13, 29, 42, 39, 9], "j": [14, 78, 15, 16] }, { "y": [1, 49, 20, 2, 57, 35, 95, 61, 41, 34], "j": [0, 5, 24, 13, 19] }, { "y": [1, 35, 49, 66, 100, 47, 44, 43, 14, 95], "j": [0, 12, 46, 5, 13, 29, 48, 19] }, { "y": [0, 23, 24, 1, 3, 5, 31, 9, 29, 13], "j": [91, 15, 16, 53, 78, 14] }, { "y": [1, 3, 4, 2, 5, 35, 29, 15, 42, 17, 27, 28], "j": [14, 71, 19, 43, 53, 9, 0, 24] }, { "y": [0, 85, 5, 12, 29, 13, 31, 9, 103, 2, 30, 27, 66, 12, 37, 77, 26, 76, 38, 28, 95, 39, 18], "j": [6, 24, 53, 42, 83, 14] }, { "y": [0, 1, 3, 4, 5, 27, 28, 6, 7, 8, 73, 13, 29, 42, 39], "j": [19, 20, 78, 82, 15, 14] }, { "y": [24, 23, 29, 10, 6, 7, 8, 13, 12, 35, 60, 61, 57, 42, 38, 30, 27, 28, 95, 13, 73, 62, 63, 43, 71, 52, 47], "j": [59, 1, 5, 33, 37, 54, 14] }, { "y": [0, 1, 3, 4, 2, 5, 27, 28, 9, 33, 46, 13, 29, 42, 6, 7, 8, 73, 47, 43, 14, 52, 55, 56], "j": [] }, { "y": [95, 97, 72], "j": [93] }, { "y": [1, 3, 4, 2, 24, 23, 35, 39, 17, 34, 95, 46], "j": [71, 79, 19, 5, 14, 37, 13] }, { "y": [2, 5, 24, 0, 15, 74, 27, 28, 29, 13, 53, 79, 89, 18, 6, 47, 55, 56, 44, 14], "j": [] }, { "y": [24, 23, 0, 1, 3, 6, 10, 8, 29, 5, 31, 9, 26, 36, 32, 28, 95, 80, 30, 42, 89, 41, 11, 18, 39], "j": [78, 14, 43, 19, 15, 22] }, { "y": [29, 13, 61, 12, 1, 3, 22, 30, 29, 0, 37, 26], "j": [6, 42, 5, 65] }, { "y": [1, 35, 28, 31, 9, 26, 33, 42, 38, 83, 41, 47, 43, 52], "j": [0, 5, 46, 19, 13, 29, 39, 48] }, { "y": [5, 35, 24, 67, 103, 31, 9, 26, 33, 77, 42, 29, 13, 6, 39, 101], "j": [53, 38, 78, 14] }, { "y": [1, 2, 5, 35, 66, 15, 27, 28, 33, 77, 42, 18], "j": [0, 14, 78, 82, 79, 19, 43, 9] }], [{ "y": [24, 23, 12, 49, 66, 25, 67, 42, 55, 56, 52, 44, 14, 12, 62], "j": [6, 13, 5, 0, 71, 3, 9, 13, 38, 54, 33] }, { "y": [66, 12, 96, 97, 86], "j": [0, 13, 38, 29] }, { "y": [24, 23, 6, 7, 8, 5, 12, 50, 32, 33, 112, 15, 28, 37, 26, 42, 38, 35, 14, 52, 55, 56, 71, 45, 44, 47], "j": [0, 9, 43, 3, 27, 13] }, { "y": [5, 0, 23, 24, 47, 42, 52, 14, 1, 25, 12, 46], "j": [] }, { "y": [12, 67, 42, 12, 50, 1, 3, 4, 65], "j": [0, 6, 9, 19, 14] }, { "y": [2, 20, 25, 67, 15, 28, 32, 33, 69, 12, 50, 81, 37, 7, 35, 6, 8, 10], "j": [5, 0, 13, 14] }, { "y": [1, 20, 2, 24, 0, 6, 5, 12, 42, 86, 55, 56, 52, 14, 44], "j": [3, 13, 37, 9, 43, 59] }, { "y": [23, 24, 12, 42, 19, 18], "j": [6, 14] }, { "y": [50, 1, 3, 4, 49, 35, 24, 6, 31, 32, 33, 75, 51, 76, 96, 97, 28, 80, 27, 95, 62, 63, 14, 54, 52, 55, 56], "j": [0, 42, 19, 9, 43, 89] }, { "y": [0, 5, 6, 42, 47, 52, 14], "j": [3, 9, 43] }, { "y": [49, 66, 12, 20, 2, 39, 34, 0, 65, 96, 97], "j": [6, 13, 9, 43, 14, 19, 33, 42, 69, 3] }, { "y": [93], "j": [] }, { "y": [24, 23, 6, 7, 8, 12, 17, 34, 90, 29, 35, 101, 57, 26, 42, 69, 70, 14, 52, 47, 55, 56], "j": [13, 33, 22, 27, 54] }, { "y": [93], "j": [] }, { "y": [23, 24, 12, 50, 2, 31, 9, 32, 33, 37, 26, 79, 39, 17, 18, 44, 47, 52, 71, 45, 14], "j": [3, 27, 0, 13, 6, 43] }, { "y": [6, 7, 8, 10, 41, 96, 0, 24, 17, 88, 42], "j": [31, 33, 13, 3, 59, 11, 9, 38, 14, 19] }, { "y": [12, 4, 66, 67, 86, 94, 2, 66], "j": [6, 9, 14, 43] }, { "y": [2, 20, 4, 24, 25, 64, 67, 50, 16, 75, 38, 42, 81, 1, 12, 3, 65, 10, 6, 8, 7, 57, 4, 66, 74], "j": [5, 22, 14, 0] }, { "y": [4, 5, 35, 23, 24, 0, 12, 46, 42, 6, 7, 17, 34, 47, 55, 56, 44, 14, 52], "j": [3, 31, 9, 43, 54] }, { "y": [46, 12], "j": [97, 33, 9, 15, 14, 82] }, { "y": [2, 4, 5, 67, 0, 15, 74, 75, 31, 29, 13, 6, 7, 8, 5, 30, 27, 73, 26, 31, 62, 63, 47, 55, 56, 44, 14], "j": [42, 70, 19, 9, 43] }, { "y": [0, 2, 35, 42, 34, 66, 6, 47, 52, 44, 14, 95], "j": [19, 9, 33, 39, 13, 29, 31, 3] }, { "y": [20, 67, 0, 12, 46, 65, 25, 39, 17, 34, 96, 97, 94], "j": [3, 6, 9, 78, 14] }, { "y": [6, 7, 8, 73, 2, 5, 13, 29, 42, 27, 33], "j": [19, 78, 66, 113, 0, 14] }, { "y": [49, 66, 67, 42, 6, 8, 12, 7, 10, 86, 102], "j": [29, 13, 5, 3, 0] }, { "y": [2, 25, 38, 12, 42, 86, 66], "j": [0, 67, 5, 3, 14, 15, 13, 29, 27, 39, 9, 33] }, { "y": [10, 6, 7, 8, 12, 46, 65, 1, 3, 30, 27, 60, 61, 31, 9, 28, 95, 42, 39, 34, 62, 63, 47, 14, 52], "j": [0, 29, 13] }, { "y": [0, 5, 66, 42, 52, 14, 71, 6, 7, 8, 10, 41, 34], "j": [11, 3, 54, 9, 13, 33, 31, 19] }, { "y": [42, 64, 13, 90, 24, 4, 1, 69], "j": [22, 19, 14] }, { "y": [10, 6, 8, 7, 2, 42, 33, 37, 31, 26], "j": [9, 43, 14, 78, 48, 5, 0, 13, 29, 54, 82] }, { "y": [1, 12, 6, 42, 52, 14], "j": [0, 9, 43] }, { "y": [2, 24, 25, 67, 42, 19, 46, 81, 97], "j": [0, 39, 31, 9, 5, 15, 16, 14, 54] }, { "y": [0, 24, 5, 60, 61, 6, 29, 13, 52, 14], "j": [9, 43] }, { "y": [0, 24, 23, 85, 2, 5, 28, 26, 42, 55, 56, 6, 7, 8, 39, 34, 47, 44, 52], "j": [33, 13, 31, 9, 43, 1, 3, 22] }, { "y": [23, 24, 5, 12, 31, 33, 29, 13], "j": [6, 14] }, { "y": [24, 23, 6, 7, 8, 73, 10, 39, 46, 13, 29, 42, 2, 27, 28, 38, 31], "j": [22, 0, 78, 9, 19, 14, 43] }, { "y": [2, 91, 12, 52, 14], "j": [6, 9, 43] }, { "y": [1, 20, 66, 12, 34, 41, 18, 87, 86], "j": [3, 54, 14, 33, 19, 6, 0, 5, 13, 9] }, { "y": [6, 8, 2, 35, 50, 33, 52, 14], "j": [0, 3] }, { "y": [5, 26, 42, 10, 7, 8, 0, 39, 47, 44, 14], "j": [73, 13, 33, 3, 82, 16, 19, 41, 38, 9, 43, 11] }, { "y": [0, 2, 4, 12, 42, 34, 20, 91], "j": [13, 29, 27, 107, 30, 19, 6, 7, 8, 14, 9, 15] }, { "y": [10, 6, 7, 8, 2, 91, 12, 66, 42, 81, 86], "j": [29, 13, 39] }, { "y": [24, 0, 2, 5, 66, 12, 6, 42, 39, 34, 47, 44, 52], "j": [54, 3, 33, 19, 22, 31, 13, 38] }, { "y": [0, 24, 23, 12, 50, 86, 67, 1, 4, 46, 65], "j": [6, 19, 9, 78, 14] }, { "y": [2, 4, 5, 35, 15, 27, 28, 31, 33, 26, 13, 29, 6, 7, 8, 39, 34, 47, 14, 55, 56], "j": [40, 42] }, { "y": [10, 6, 7, 8, 5, 1, 3, 4, 2, 35, 95, 26, 32, 42, 29, 69, 70, 96, 97, 39, 17, 34], "j": [22, 13, 38, 14, 43, 78] }, { "y": [20, 2, 46, 17, 96, 97, 39, 34], "j": [0, 10, 3, 14, 31, 6, 7, 8, 9, 33] }, { "y": [5, 6, 7, 8, 50, 27, 33, 29], "j": [0, 14, 9, 79] }, { "y": [6, 7, 8, 10, 12, 2, 66, 47, 44, 14, 52], "j": [0, 19, 27, 5, 13, 29, 42, 3, 33] }, { "y": [20, 12, 50, 97, 86, 25, 65], "j": [0, 6, 3, 22, 14] }, { "y": [66, 2, 35, 28, 31, 14, 6, 7, 8, 73, 42, 39], "j": [13, 29, 19, 3, 1, 0, 54, 11, 37, 59] }, { "y": [0, 23, 24, 1, 3, 4, 12, 35, 5, 57, 10, 6, 7, 8, 58, 65, 42, 69, 70, 17, 14, 52, 71, 47], "j": [13, 2, 9] }, { "y": [0, 67, 24, 5, 12, 33, 50, 42, 34, 87, 1, 3, 2, 31, 38, 37, 26], "j": [13, 19, 61, 14, 29] }, { "y": [20, 2, 23, 24, 25, 64, 67, 50, 12, 10, 6, 8, 7, 42, 32, 33, 86, 39, 35, 65], "j": [19, 5, 13, 14] }, { "y": [2, 5, 7, 97, 0, 66, 6, 42], "j": [3, 27, 40, 9, 43, 14, 31, 33, 40, 13] }, { "y": [46, 34, 40, 97, 86, 72], "j": [93] }, { "y": [0, 2, 1, 3, 5, 35, 29, 13, 6, 10, 26, 31, 32, 33, 37, 19, 27, 30, 96, 97, 28, 80, 95, 81, 89, 39, 14], "j": [24, 23, 42, 54, 43, 9] }, { "y": [20, 5, 67, 0, 46, 25, 105, 18, 7, 8, 34, 62, 47, 55, 56, 44, 14, 52], "j": [] }, { "y": [24, 23, 2, 5, 35, 30, 27, 28, 13, 29, 31, 33, 42, 39, 17, 12, 50, 65], "j": [15, 54, 78, 1, 19, 9, 43, 14, 3] }, { "y": [2, 20, 5, 35, 67, 25, 73, 19, 6, 41, 101, 96, 97], "j": [] }], [{ "y": [1, 3, 106, 112, 47, 44], "j": [0, 13, 33, 38] }, { "y": [35, 1, 106, 112, 18, 72], "j": [0, 6, 7, 13, 57, 14] }, { "y": [1, 3, 23, 24, 25, 28, 31, 9, 26, 42, 29, 13, 30, 55, 56, 47, 44, 14, 54, 48, 12, 46, 5, 32, 33, 65, 6, 7, 8, 10, 69], "j": [19, 61, 15, 16] }, { "y": [1, 112, 55, 56, 14, 72], "j": [0, 13, 24, 23, 11] }, { "y": [106, 112, 47, 44, 72], "j": [0, 29, 13, 2] }, { "y": [19, 35, 112, 72], "j": [1, 3, 14, 38] }, { "y": [67, 47, 55, 56, 44, 112, 106], "j": [37, 19, 61, 59] }, { "y": [1, 19, 112, 72], "j": [42, 13, 51, 39] }, { "y": [49, 112, 95, 47, 44, 43, 52, 14, 72], "j": [93] }, { "y": [1, 49, 66, 100, 106, 112, 72], "j": [6, 13, 5, 31, 82] }, { "y": [0, 1, 25, 86, 67, 49], "j": [69, 70, 40, 14, 9, 43, 11, 39] }, { "y": [1, 66, 19, 49, 106, 112], "j": [0, 39, 3, 79, 14, 38, 15, 16] }, { "y": [49, 47, 44, 55, 56, 43, 112], "j": [0, 29, 13, 6] }, { "y": [1, 112, 72], "j": [0, 6] }, { "y": [6, 7, 8, 73, 10, 2, 5, 13, 29, 42, 17, 47, 44, 14], "j": [39, 43, 40, 1, 0, 9, 19, 3] }, { "y": [1, 112, 71, 55, 56, 72], "j": [29, 13, 0, 11, 14] }, { "y": [1, 35, 106, 112, 72], "j": [] }, { "y": [1, 112, 72], "j": [0, 3, 11, 14] }, { "y": [1, 0, 105, 14], "j": [39, 37, 19, 13] }, { "y": [1, 19, 112, 72], "j": [0, 14, 9, 42, 61] }, { "y": [49, 112, 95, 47, 43, 14, 55, 56], "j": [0, 29, 15, 16, 42, 1, 3, 37] }, { "y": [1, 49, 66, 0, 19, 100, 95, 106, 112], "j": [22, 5, 61, 63] }, { "y": [1, 35, 72], "j": [93] }, { "y": [5, 49, 23, 24, 25, 32, 33, 29, 17, 34], "j": [0, 38, 9, 14] }, { "y": [1, 49, 106, 112, 72], "j": [93] }, { "y": [1, 18, 106, 112, 72], "j": [0, 6, 42, 11] }, { "y": [0, 2, 5, 27, 28, 31, 9, 13, 29, 42, 33, 6, 7, 8, 39], "j": [3, 1, 15, 11, 19, 54] }, { "y": [1, 47, 44, 72], "j": [13, 31, 9, 43, 38, 33] }, { "y": [35, 112, 72], "j": [29, 13, 11, 53, 39, 91, 61, 41] }, { "y": [19, 112], "j": [1, 3, 14, 38, 72] }, { "y": [1, 3, 0, 67, 106, 40, 112], "j": [69, 70, 37, 19, 6, 7, 8, 39] }, { "y": [1, 19, 11, 112], "j": [0, 14] }, { "y": [24, 0, 25, 66, 5, 31, 9, 46, 6, 7, 8, 73, 29, 33, 39, 17], "j": [15, 14, 42, 1, 3] }, { "y": [0, 1, 49, 95, 106], "j": [78, 14] }, { "y": [1, 0, 87, 86], "j": [9, 43, 61, 83] }, { "y": [49, 106, 112, 72], "j": [0, 3] }, { "y": [1, 49, 106, 112, 72], "j": [0, 13, 42, 5] }, { "y": [1, 86, 18, 72], "j": [] }, { "y": [5, 10, 6, 7, 8, 9, 29, 13, 25, 12, 28, 46, 30, 65, 70, 106, 112], "j": [53, 54, 19, 16, 15, 14, 78, 71, 59] }, { "y": [112, 72], "j": [93] }, { "y": [112, 72], "j": [2, 0, 69, 70, 89, 14, 59] }, { "y": [19, 35, 112], "j": [39, 5, 3, 78, 17, 14, 38, 15, 16, 34] }, { "y": [0, 67, 12, 50, 10, 7, 8, 40], "j": [6, 37, 61, 19] }, { "y": [1, 112, 35, 106, 72], "j": [93] }, { "y": [1, 49, 29, 43, 14, 95, 112], "j": [3, 0, 13, 42, 19] }, { "y": [1, 66, 106, 112, 49, 100, 95], "j": [5, 38, 31, 0, 33, 13] }, { "y": [1, 106, 112], "j": [6, 9, 43, 0, 31, 14] }, { "y": [19, 49, 106, 112, 72], "j": [93] }, { "y": [1, 49, 106, 112, 72], "j": [22, 0, 29, 5, 33, 13] }, { "y": [18, 112, 72], "j": [93] }, { "y": [24, 29, 10, 6, 7, 8, 10, 13, 31, 9, 32, 26, 36, 53, 30, 27, 106, 112, 12, 5, 41, 101], "j": [69, 37, 79, 1] }, { "y": [1, 106, 72], "j": [93] }, { "y": [1, 67, 0, 12, 46, 25, 86, 112], "j": [29, 13, 53, 19, 61, 14] }, { "y": [106, 112, 1, 72], "j": [93] }, { "y": [1, 0, 105, 55, 56, 47, 44], "j": [9, 19, 13, 2, 42] }, { "y": [1, 19, 87, 86, 106, 112, 72], "j": [0, 42, 61] }, { "y": [2, 5, 0], "j": [12, 46, 31, 9, 26, 29, 6, 17, 47, 55, 56, 44, 43, 14, 71, 45, 12] }, { "y": [0, 1, 66, 19, 106, 112, 100, 49, 67], "j": [43, 5, 39] }, { "y": [1, 67, 0, 94, 86, 87, 88, 72], "j": [] }, { "y": [106, 112, 1, 49, 19], "j": [0, 82, 61, 40, 16, 3, 14, 39, 15, 38] }], [{ "y": [0, 1, 3, 4, 27, 5, 2, 35, 28, 31, 46, 30, 7, 8, 13, 29, 42, 9, 43, 54, 14, 47, 55, 56], "j": [22, 6, 69, 19, 89] }, { "y": [1, 12, 24, 0, 2, 20, 22, 30, 6, 8, 55, 56, 47, 44, 14, 48, 46, 5, 25, 31, 9, 33, 65, 7], "j": [13, 15] }, { "y": [47, 43, 52, 14, 55, 56, 72], "j": [6, 13, 1, 40, 96, 97] }, { "y": [1, 3, 23, 24, 25, 28, 31, 9, 26, 42, 29, 13, 30, 47, 44, 14, 54, 48, 46, 12], "j": [19, 61] }, { "y": [24, 23, 1, 3, 2, 30, 27, 5, 12, 50, 31, 9, 32, 33, 37, 26, 36, 42, 38, 28, 29, 79, 89, 14, 43, 47], "j": [6, 53, 40, 11] }, { "y": [12, 24, 46, 31, 9, 32, 33, 1, 2, 20, 3, 22, 0, 42, 29, 13, 30, 17], "j": [5, 61, 14, 6] }, { "y": [0, 1, 67, 106, 40], "j": [65, 59, 37, 19, 9] }, { "y": [1, 0, 3, 24, 25, 64, 42, 13, 30, 47, 44, 14, 54, 31, 51, 4, 12, 73, 7, 8, 10, 81, 80], "j": [39, 15] }, { "y": [1, 3, 4, 22, 49, 17, 47, 43, 14], "j": [29, 13, 0, 5, 42] }, { "y": [0, 1, 3, 4, 2, 5, 27, 28, 9, 33, 46, 13, 29, 42, 38, 6, 7, 8, 73, 39, 43, 14], "j": [] }, { "y": [0, 24, 1, 3, 5, 8, 29, 13, 9, 43, 14], "j": [2, 19, 37, 74, 69] }, { "y": [13, 29, 42, 2, 3, 4, 46, 6, 7, 8, 27, 28, 31, 9], "j": [0, 43, 40, 39, 14, 71, 78] }, { "y": [0, 24, 23, 1, 3, 22, 68, 29, 13, 5, 50, 2, 31, 9, 32, 33, 37, 26, 36, 38, 14, 43], "j": [6, 8, 40, 19, 79] }, { "y": [0, 1, 3, 4, 49, 27, 5, 28, 31, 9, 46, 6, 7, 8, 13, 29, 42, 39, 17, 47, 14, 52, 55, 56], "j": [] }, { "y": [94, 87, 72], "j": [6, 7, 1, 13, 14] }, { "y": [0, 1, 3, 4, 2, 5, 35, 27, 5, 28, 46, 13, 29, 42, 39, 9, 31, 17, 47, 14, 45, 55, 56], "j": [] }, { "y": [0, 67, 1, 3, 4, 103, 2, 30, 5, 57, 31, 9, 32, 33, 37, 26, 38, 27, 29, 13, 11, 18, 14, 43, 55, 56], "j": [6, 24, 23, 19, 53, 89, 65] }, { "y": [0, 1, 3, 4, 9, 12, 26, 81, 17, 34, 101, 46], "j": [11, 14, 39, 5, 19, 6, 13, 38] }, { "y": [3, 4, 22, 24, 0, 15, 31, 9, 29, 13, 53, 50, 6, 47, 55, 56, 44, 14, 43, 54], "j": [40, 37, 77, 2, 59, 38, 19] }, { "y": [1, 12, 23, 25, 64, 50, 28, 33, 38, 47, 55, 56, 44, 52, 14, 45, 2, 20, 57, 5, 26, 36, 80, 29, 13, 32, 8, 65], "j": [15, 16] }, { "y": [85, 1, 3, 4, 22, 6, 7, 50, 103, 2, 37, 77, 26, 36, 38, 17, 14, 62, 45, 54, 22], "j": [13, 9, 69, 70] }, { "y": [0, 1, 3, 4, 2, 27, 5, 28, 9, 35, 46, 6, 7, 8, 73, 13, 29, 42, 38, 33, 14, 43, 54], "j": [] }, { "y": [50, 29, 13, 5, 1, 3, 22, 24, 23, 30, 27, 35, 12, 31, 9, 28, 26, 36, 29, 13, 37, 42, 31, 43, 14, 47, 45], "j": [6, 15, 16, 19] }, { "y": [1, 3, 4, 2, 15, 27, 28, 13, 42, 31, 9, 33, 73, 17], "j": [0, 39, 78, 66, 71, 78, 19] }, { "y": [24, 23, 0, 1, 3, 68, 2, 30, 27, 29, 13, 32, 31, 9, 32, 33, 26, 37, 38, 53, 79, 43, 52, 14], "j": [6, 8, 10, 19] }, { "y": [0, 1, 3, 4, 2, 5, 27, 28, 31, 9, 46, 13, 29, 42, 6, 7, 8, 73, 39, 17, 47, 14, 55, 56], "j": [] }, { "y": [94, 86, 47, 55, 56, 44, 43, 14, 52, 45], "j": [0, 1, 13, 37, 29] }, { "y": [0, 1, 3, 4, 2, 27, 5, 28, 6, 7, 8, 73, 15, 13, 29, 42, 14], "j": [39, 11, 40] }, { "y": [20, 2, 23, 24, 25, 67, 28, 31, 42, 13, 27, 14, 54, 48], "j": [11, 15, 22, 19] }, { "y": [0, 1, 2, 15, 27, 28, 13, 29, 31, 9, 33, 42, 17], "j": [6, 78, 39, 5, 70, 14, 40, 82, 61] }, { "y": [20, 2, 21, 22, 23, 24, 25, 64, 28, 9, 33, 42, 30, 53, 73, 12, 46, 5, 31, 10, 15, 80, 27, 17, 49, 38], "j": [37, 39, 14, 19] }, { "y": [0, 1, 2, 3, 4, 5, 27, 46, 13, 29, 42, 28, 31, 38, 73, 10, 95], "j": [9, 15, 14, 78] }, { "y": [1, 22, 6, 9, 47, 43, 14], "j": [0, 29, 13] }, { "y": [6, 7, 8, 73, 1, 3, 22, 5, 6, 7, 8, 37, 26, 31, 9, 36, 42, 50, 14, 43, 52, 55, 56, 45], "j": [19, 0, 29, 13, 66] }, { "y": [0, 23, 24, 5, 6, 1, 3, 9, 29, 13, 43, 14], "j": [19] }, { "y": [24, 23, 12, 57, 1, 3, 4, 2, 5, 35, 66, 9, 26, 6, 7, 8, 10, 81, 39, 17, 34], "j": [0, 19, 27, 40, 0, 13, 14] }, { "y": [0, 1, 3, 22, 9, 29, 13], "j": [6, 14] }, { "y": [2, 3, 4, 22, 31, 9, 10, 81, 101, 39, 34, 12], "j": [19, 27, 46, 83, 13, 29, 1] }, { "y": [47, 55, 56, 44, 43, 52, 14], "j": [29, 13] }, { "y": [0, 24, 23, 1, 22, 2, 30, 27, 5, 27, 28, 9, 3, 46, 10, 7, 8, 29, 42, 31, 14, 55, 56], "j": [40, 11, 82, 39] }, { "y": [4, 22, 20, 23, 24, 27, 28, 31, 9, 79, 50, 39, 17, 34, 47, 55, 56, 44, 43, 14], "j": [6, 0] }, { "y": [0, 23, 24, 12, 1, 50, 29, 13, 37, 42, 26, 36, 30, 27, 73, 28, 40], "j": [6, 5, 14, 78] }, { "y": [35, 49], "j": [93] }, { "y": [0, 85, 24, 23, 1, 3, 50, 29, 13, 6, 8, 43, 14], "j": [17, 66, 63] }, { "y": [1, 3, 2, 35, 9, 10, 7, 17, 95], "j": [46, 5, 0, 40, 42, 48, 14, 19] }, { "y": [1, 3, 22, 4, 50, 17, 29, 13, 50, 20, 2, 26, 32, 33, 19, 38, 30, 27, 37, 52, 14], "j": [9, 43, 0, 0] }, { "y": [0, 1, 2, 3, 4, 5, 27, 28, 9, 31, 46, 13, 29, 42, 73, 7, 8, 39, 17, 47, 43, 52, 14], "j": [] }, { "y": [23, 24, 1, 3, 2, 30, 27, 8, 50, 29, 13, 32, 33, 12, 42, 28, 73, 34, 102], "j": [0, 14, 78, 43, 71] }, { "y": [1, 4, 2, 5, 15, 16, 27, 35, 28, 46, 31, 9, 26, 42, 39, 17, 47, 43, 14, 55, 56], "j": [0, 29] }, { "y": [0, 85, 50, 1, 3, 2, 30, 27, 5, 6, 8, 31, 9, 29, 13, 43, 14], "j": [24, 23, 74, 82, 83] }, { "y": [47, 43, 14, 52, 55, 56, 72], "j": [] }, { "y": [23, 24, 10, 6, 8, 1, 3, 29, 13, 5, 37, 26, 31, 9, 32, 33, 38, 30, 27, 102, 12, 43], "j": [0, 14, 11, 40, 89] }, { "y": [13, 42, 2, 1, 27, 28, 9, 73, 47, 43, 14, 17], "j": [0, 6, 19, 40, 16, 15] }, { "y": [1, 51, 86, 72], "j": [0, 14] }, { "y": [85, 24, 23, 1, 3, 4, 29, 5, 6, 27, 13, 8, 7, 13, 38, 42, 14, 54], "j": [2, 37, 9, 19, 39] }, { "y": [3, 4, 2, 20, 22, 23, 24, 0, 28, 42, 13, 30, 44, 71, 14, 54, 39, 35, 67, 25, 29, 31, 9, 32, 80, 52, 45], "j": [48] }, { "y": [49, 1, 35, 14, 43, 54, 44, 72], "j": [22, 2, 0, 13, 33] }, { "y": [0, 24, 5, 1, 3, 6, 9, 29, 13, 43, 14], "j": [38] }, { "y": [0, 24, 23, 1, 3, 4, 2, 27, 5, 28, 31, 9, 46, 13, 29, 42, 7, 8, 73, 10, 47, 14, 52, 55, 56], "j": [11, 43] }, { "y": [49, 95, 72], "j": [93] }], [{ "y": [24, 1, 3, 35, 9, 43, 14], "j": [0, 29, 13] }, { "y": [43, 14, 44, 47, 1, 94, 55, 56, 72], "j": [0, 13, 6, 7] }, { "y": [1, 67, 12, 28, 26, 55, 56, 44, 52, 14, 49, 94, 2, 20], "j": [19, 13, 0] }, { "y": [0, 1, 3, 4, 2, 5, 28, 31, 9, 33, 42, 17, 47, 43], "j": [13, 29, 11, 66, 15, 7, 6, 19] }, { "y": [1, 20, 2, 23, 24, 0, 42, 46, 47, 55, 56, 44, 52, 14, 45], "j": [6, 7, 43, 19] }, { "y": [0, 67, 1, 3, 4, 22, 46, 12, 15, 16, 75, 42, 11, 94, 87], "j": [62, 43, 78, 14] }, { "y": [1, 12, 5, 23, 24, 49, 31, 9, 3, 22, 0, 28, 42, 47, 44, 14, 54, 48, 25, 32, 33, 15, 94, 39, 43, 38], "j": [37, 6, 19, 13] }, { "y": [24, 0, 1, 3, 5, 31, 9, 29, 13, 14, 43], "j": [6, 22] }, { "y": [1, 3, 22, 23, 24, 25, 64, 28, 31, 9, 33, 26, 44, 14, 54, 49, 95, 75, 15, 27], "j": [42, 6, 8, 19] }, { "y": [24, 1, 3, 4, 22, 5, 26, 37, 36, 38, 47, 14], "j": [0, 6, 10, 27] }, { "y": [1, 2, 5, 35, 20, 25, 47, 44, 43, 52, 14, 55, 56], "j": [0, 33, 31, 28, 74, 13, 15, 9, 27, 75] }, { "y": [24, 23, 67, 1, 3, 22, 5, 31, 9, 29, 13, 30, 27, 28, 37, 26, 32, 33, 36, 38, 41], "j": [0, 6, 63, 14] }, { "y": [1, 35, 49, 100, 47, 44, 43, 52, 14], "j": [0, 13, 29, 19, 6, 7, 38, 39] }, { "y": [1, 68, 94, 35, 86, 87, 47, 43, 14], "j": [6, 7, 13, 0] }, { "y": [2, 35, 26, 9, 28, 33, 45, 71, 14, 43, 52, 44], "j": [0, 5, 42, 19, 1, 13, 29, 27, 46, 40] }, { "y": [0, 24, 23, 1, 3, 4, 22, 2, 30, 27, 53, 29, 5, 13, 53, 26, 32, 33, 42, 17, 94, 105, 14], "j": [6, 43, 11, 63] }, { "y": [2, 35, 28, 31, 9, 42, 17, 14, 52, 47], "j": [0, 6, 27, 39, 43, 13, 29, 30, 107, 11, 19] }, { "y": [0, 23, 24, 1, 3, 4, 22, 30, 27, 31, 26, 37, 77, 38, 51, 9, 33, 29, 13], "j": [5, 11, 43, 78, 14] }, { "y": [0, 1, 3, 4, 2, 13, 29, 42, 31, 9, 46], "j": [11, 14, 39, 5, 19, 6, 38] }, { "y": [57, 58, 5, 24, 23, 0, 12, 46, 34, 94, 47, 44, 14, 52], "j": [2, 6, 13, 9, 37] }, { "y": [1, 2, 20, 3, 22, 25, 64, 67, 0, 28, 9, 29, 13, 47, 44, 14, 54, 4, 57, 66, 15, 74, 16, 27, 31, 26, 36, 80, 48], "j": [38] }, { "y": [1, 3, 2, 4, 22, 24, 23, 60, 61, 26, 36, 89, 88, 35, 14, 52, 54, 47], "j": [6, 9, 11, 41] }, { "y": [1, 3, 4, 2, 35, 64, 67, 15, 74, 16, 31, 46, 0, 25, 64, 42, 9, 26, 33, 32, 80, 12], "j": [] }, { "y": [1, 49, 94, 86, 87, 88, 72], "j": [6, 7, 0, 14, 78] }, { "y": [35, 1, 66, 47, 14, 43], "j": [0, 6, 27, 19, 40, 22, 13, 29, 38] }, { "y": [1, 94, 87, 17, 34, 47, 55, 56, 44, 43, 14, 52], "j": [0, 24, 23, 6, 13] }, { "y": [35, 92, 72], "j": [93] }, { "y": [1, 3, 4, 22, 53, 27, 50, 12, 6, 7, 8, 10, 58, 65, 60, 61, 41, 101, 87, 86, 39, 34, 14, 43, 52], "j": [2, 0, 11, 15, 16] }, { "y": [1, 66, 91, 35, 46, 100], "j": [0, 9, 89, 41, 11, 5, 31, 13, 33, 29, 14, 43, 19, 6] }, { "y": [1, 20, 2, 25, 67, 0, 24, 28, 31, 9, 32, 33, 42, 29, 13, 30, 86, 94, 87, 15, 46, 80], "j": [5, 14, 71, 6] }, { "y": [0, 24, 23, 13, 29, 42, 1, 3, 2, 5, 35, 27, 28, 9, 17, 54, 14, 43], "j": [15, 6, 7, 33, 19, 38, 37] }, { "y": [1, 3, 21, 23, 24, 67, 25, 64, 0, 42, 29, 13, 30, 47, 44, 52, 14, 35, 88, 94, 15, 38, 27], "j": [39, 9, 6, 19] }, { "y": [0, 2, 1, 3, 4, 5, 27, 13, 29, 35, 39, 15, 43, 54, 14], "j": [6, 7, 19, 10, 33, 42, 37, 89] }, { "y": [0, 24, 1, 3, 5, 29, 60], "j": [6, 9, 43] }, { "y": [0, 24, 23, 1, 3, 4, 2, 27, 5, 28, 9, 31, 46, 13, 29, 42, 35, 73, 39, 43, 54, 47, 44, 14], "j": [6, 8, 89, 63] }, { "y": [23, 24, 5, 1, 3, 31, 9, 29, 13], "j": [6, 14] }, { "y": [1, 3, 35, 100, 42, 49, 47, 44, 43, 52, 14, 54], "j": [0, 22, 6, 27, 13, 29, 5, 19, 38, 15] }, { "y": [94, 86, 47, 43, 14], "j": [0, 13] }, { "y": [2, 35, 28, 31, 9, 32, 38, 34, 14, 71, 43, 44], "j": [27, 13, 29, 3, 1, 42, 6, 0, 59] }, { "y": [0, 23, 24, 5, 1, 3, 9, 29, 13, 43, 14], "j": [6, 48] }, { "y": [0, 24, 23, 1, 2, 5, 35, 15, 27, 13, 29, 28, 31, 39, 14, 47], "j": [43, 9, 38, 19, 6, 7] }, { "y": [0, 23, 24, 1, 3, 31, 9, 29, 13], "j": [6, 14] }, { "y": [49, 94, 87, 66, 100, 47, 55, 56, 43, 14, 54, 45, 71, 52], "j": [24, 23, 0, 33, 6, 22, 37, 38] }, { "y": [0, 1, 3, 5, 35, 27, 28, 9, 13, 29, 42, 33, 39, 17, 43, 52, 14], "j": [6, 8, 66, 19] }, { "y": [3, 22, 5, 29, 13, 31, 9, 43, 14], "j": [24, 2, 42, 0, 6] }, { "y": [1, 3, 4, 2, 35, 27, 28, 13, 42, 31, 38, 17, 52, 14], "j": [9, 43, 10, 11, 73, 6, 15, 7] }, { "y": [0, 24, 23, 22, 2, 1, 3, 60, 61, 12, 9, 35, 94, 17, 34, 47, 43, 14], "j": [29, 13, 37, 74] }, { "y": [1, 3, 4, 2, 5, 15, 27, 28, 31, 9, 26, 42, 13, 29], "j": [0, 6, 7, 78, 14, 71] }, { "y": [49, 66, 94, 47, 44, 43, 52, 14], "j": [27, 0, 13, 19, 33, 9] }, { "y": [1, 97, 47, 43, 14, 44, 72], "j": [93] }, { "y": [49, 94, 47, 55, 56, 43, 52, 14], "j": [1, 0, 42, 6, 13, 59, 33] }, { "y": [1, 47, 44, 62, 43, 52, 14, 55, 56, 72], "j": [] }, { "y": [0, 23, 24, 1, 3, 20, 2, 29, 42, 15, 16, 94, 87, 86, 60, 61, 35, 14, 55, 56, 44, 47, 45, 54], "j": [6, 53, 9, 43] }, { "y": [1, 35, 72], "j": [93] }, { "y": [0, 1, 49, 25, 5, 66, 29, 94, 87, 80, 13, 55, 56, 52, 14, 44, 47], "j": [37, 6, 9, 43] }, { "y": [9, 47, 0, 44, 14, 43], "j": [6, 19, 42, 13, 33, 25] }, { "y": [1, 35, 47, 55, 56, 44, 52, 14, 71, 45, 54, 49, 95, 94, 88, 86, 87, 66], "j": [42, 0, 19, 13] }, { "y": [1, 35, 47, 44, 52, 14, 100, 94, 87, 88, 55, 56, 95, 54, 22], "j": [9, 43] }, { "y": [0, 24, 60, 61, 31, 9, 29, 13, 43, 14], "j": [6, 2] }, { "y": [87, 94, 86, 88, 1, 49, 72], "j": [0, 6, 14, 52, 78] }], [{ "y": [1, 109, 92, 72], "j": [29, 13, 69, 70] }, { "y": [1, 109, 92, 72], "j": [93] }, { "y": [109, 92, 61, 72], "j": [3, 24, 23, 0, 13, 14] }, { "y": [1, 49, 109, 92, 72], "j": [29, 13, 5, 39] }, { "y": [1, 49, 109, 92, 72], "j": [0, 13, 33, 5, 14] }, { "y": [1, 35, 109, 92, 72], "j": [93] }, { "y": [109, 92, 61, 72], "j": [29, 13] }, { "y": [35, 109, 92, 72], "j": [93] }, { "y": [1, 49, 35, 66, 95, 109, 92, 72], "j": [0, 14] }, { "y": [109, 92, 60, 61], "j": [93] }, { "y": [1, 49, 35, 60, 61, 109, 92, 72], "j": [3, 22, 6, 14] }, { "y": [1, 35, 109, 92, 72], "j": [93] }, { "y": [1, 49, 109, 92, 72], "j": [13, 0, 29] }, { "y": [109, 92, 72], "j": [93] }, { "y": [49, 109, 92, 72], "j": [22, 6] }, { "y": [109, 92, 72], "j": [93] }, { "y": [1, 49, 35, 109, 92, 72], "j": [6, 0] }, { "y": [109, 92, 72], "j": [93] }, { "y": [1, 49, 109, 92, 72], "j": [0, 29, 13, 59, 5, 37] }, { "y": [109, 92, 72], "j": [93] }, { "y": [1, 49, 60, 61, 95, 109, 92, 35, 72], "j": [13, 6, 14] }, { "y": [1, 61, 109, 92, 72], "j": [93] }, { "y": [1, 49, 109, 92, 60, 61, 35, 72], "j": [0, 6, 7, 13, 14] }, { "y": [109, 92, 49, 35, 72], "j": [93] }, { "y": [109, 92, 60, 61, 87, 72], "j": [0, 13] }, { "y": [109, 92, 72], "j": [93] }, { "y": [109, 92, 61, 72], "j": [78, 14] }, { "y": [1, 61, 109, 92, 72], "j": [93] }, { "y": [109, 92, 72], "j": [93] }, { "y": [109, 92, 60, 61, 72], "j": [0, 14] }, { "y": [1, 60, 109, 92, 72], "j": [93] }, { "y": [1, 109, 92, 35, 72], "j": [6, 9, 43] }, { "y": [60, 109], "j": [93] }, { "y": [109, 92, 60, 61, 72], "j": [2, 0] }, { "y": [1, 60, 61, 35, 72], "j": [93] }, { "y": [1, 49, 35, 109, 92, 72], "j": [2, 14] }, { "y": [93], "j": [] }, { "y": [109, 92, 35, 72], "j": [0, 14] }, { "y": [49, 61, 109, 92, 72], "j": [93] }, { "y": [109, 92, 60, 61, 72], "j": [29, 13] }, { "y": [1, 35, 109, 92, 72], "j": [] }, { "y": [1, 35, 109, 92, 60, 61, 72], "j": [0, 14] }, { "y": [61, 109, 92, 72], "j": [93] }, { "y": [1, 109, 92, 72], "j": [22, 0, 6] }, { "y": [1, 35, 61, 109, 92, 95], "j": [72] }, { "y": [109, 92, 72], "j": [0, 29, 6, 13] }, { "y": [1, 35, 109, 92, 72], "j": [93] }, { "y": [1, 49, 35, 109, 92, 72], "j": [78, 14] }, { "y": [109, 92, 72], "j": [93] }, { "y": [60, 61, 109, 92, 72], "j": [0, 5] }, { "y": [109, 92, 72], "j": [93] }, { "y": [72], "j": [59] }, { "y": [1, 35, 109, 92, 72], "j": [93] }, { "y": [109, 92, 1, 72], "j": [0, 14] }, { "y": [109, 92, 1, 49, 72], "j": [93] }, { "y": [109, 92, 72], "j": [0, 6, 14] }, { "y": [60, 61, 109, 92, 72], "j": [6, 0] }, { "y": [109, 92], "j": [93] }, { "y": [1, 49, 35, 109, 92, 60, 61, 72], "j": [0, 6] }, { "y": [1, 109, 92, 72], "j": [93] }], [{ "y": [0, 24, 1, 3, 5, 9, 33, 29, 13, 43, 14], "j": [22] }, { "y": [1, 22, 20, 2, 5, 31, 9, 18, 42, 80, 11, 41, 101, 86, 43], "j": [27, 13] }, { "y": [0, 24, 6, 5, 9, 33, 29, 13, 43, 14], "j": [1, 3] }, { "y": [0, 2, 1, 3, 4, 30, 27, 35, 15, 13, 29, 42, 6, 7, 8, 39, 27, 5, 14], "j": [11, 66, 19, 9, 43, 41] }, { "y": [1, 20, 2, 5, 35, 23, 0, 28, 26, 42, 13, 6, 47, 55, 56, 44, 43, 54, 73, 75, 7], "j": [79, 67, 37, 11] }, { "y": [1, 4, 67, 46, 12, 38, 42, 65, 10, 34, 87, 80, 110], "j": [3, 22, 24, 23, 0, 13, 14] }, { "y": [1, 35, 3, 2, 20, 22, 23, 24, 25, 67, 28, 31, 9, 47, 55, 56, 44, 52, 42, 48, 5, 29, 32, 33, 15, 39, 43, 14, 17], "j": [37, 61] }, { "y": [42, 74, 1, 20, 2, 5, 66, 15, 16, 75, 101, 87, 43, 47, 55, 56, 44, 52, 71, 45], "j": [19, 38, 79, 6, 14] }, { "y": [20, 2, 5, 23, 24, 55, 56, 0, 105, 47, 44, 52, 14, 45], "j": [13, 42] }, { "y": [24, 23, 1, 3, 30, 27, 31, 5, 6, 29, 13, 9, 14, 43], "j": [42, 19, 89, 12] }, { "y": [1, 9, 33, 23, 24, 0, 50, 28, 42, 13, 30, 47, 44, 43, 14, 45, 54, 48, 5, 29, 3, 4, 35, 81, 46], "j": [2, 70] }, { "y": [49, 94, 87, 86, 88], "j": [1, 0, 13, 19, 14] }, { "y": [0, 1, 3, 4, 2, 5, 28, 9, 33, 27, 46, 13, 29, 42, 39, 17, 34, 32, 38, 31, 35, 12], "j": [] }, { "y": [0, 50, 7, 5, 1, 3, 4, 22, 20, 2, 64, 25, 80, 41, 11], "j": [19, 66, 79, 78, 14] }, { "y": [0, 2, 5, 66, 16, 27, 28, 31, 6, 7, 8, 73, 9, 13, 29, 42, 39], "j": [15, 1, 17, 1] }, { "y": [23, 24, 1, 3, 30, 27, 6, 8, 13, 73, 79, 52, 14], "j": [9, 43, 0, 11, 42] }, { "y": [0, 3, 4, 5, 27, 28, 31, 9, 33, 2, 46, 6, 7, 8, 73, 42, 13, 29, 39, 15, 47, 43, 55, 56], "j": [] }, { "y": [23, 24, 12, 7, 8, 10, 39, 17, 34], "j": [0, 6, 13, 3, 14] }, { "y": [0, 1, 2, 27, 5, 28, 31, 9, 35, 6, 7, 8, 73, 10, 13, 29, 42, 39, 17], "j": [59, 14] }, { "y": [67, 10, 11, 41, 27, 42, 7, 8, 87, 86, 66, 80], "j": [38, 9, 43, 78, 14, 56] }, { "y": [0, 6, 7, 8, 2, 5, 27, 28, 31, 13, 29, 9, 43, 44, 14, 52, 55, 56], "j": [42, 15, 3, 17] }, { "y": [1, 67, 0, 28, 31, 9, 26, 33, 37, 13, 6, 41, 97, 47, 55, 56, 44, 14, 43], "j": [42, 39, 61, 19] }, { "y": [0, 1, 5, 67, 8, 7, 46, 6, 29, 31, 9, 42, 47, 44, 43], "j": [2, 19, 22, 14] }, { "y": [93], "j": [] }, { "y": [24, 23, 0, 85, 1, 3, 4, 2, 27, 28, 31, 9, 46, 73, 13, 29, 42, 39, 47, 43, 14, 55, 56], "j": [6, 8] }, { "y": [0, 5, 50, 1, 20, 2, 61, 65, 42, 86, 97, 43, 47], "j": [6, 38, 11, 19] }, { "y": [6, 7, 8, 10, 9, 2, 5, 0, 24, 23, 5, 10, 57, 69, 70, 17, 34, 39, 43, 52, 14, 45], "j": [13, 29, 19, 1, 54] }, { "y": [3, 22, 5, 67, 0, 103, 75, 13, 79, 6, 7, 8, 10, 47, 55, 56, 44, 43, 14, 52], "j": [9, 23, 42, 41] }, { "y": [0, 24, 23, 1, 2, 5, 66, 16, 27, 28, 31, 9, 46, 13, 29, 42, 29, 28, 73, 39, 17, 43, 14, 47, 55, 56], "j": [6, 11, 83, 79, 89] }, { "y": [12, 0, 23, 24, 105, 28, 31, 9, 26, 32, 33, 42, 12, 10], "j": [5, 3, 14, 19] }, { "y": [24, 23, 0, 1, 3, 103, 29, 6, 13, 5, 9, 12, 57, 31, 9, 26, 38, 42, 53, 35, 10, 41, 18, 34, 34], "j": [33, 69, 70, 37, 89] }, { "y": [1, 3, 22, 5, 67, 50, 29, 13, 30, 42, 55, 56, 44, 52], "j": [2, 39, 61, 38, 19] }, { "y": [0, 24, 23, 2, 30, 27, 10, 6, 7, 8, 25, 37, 26, 31, 9, 38, 29, 13, 39, 34, 87, 11, 41, 14, 43, 47, 55, 56, 45], "j": [3, 53, 1, 42, 54] }, { "y": [3, 4, 22, 20, 2, 23, 24, 0, 9, 13, 30, 44, 14, 54, 5, 49, 31, 32, 33, 10, 43, 35, 38, 80], "j": [19, 42] }, { "y": [24, 7, 8, 42, 50, 14, 44, 9, 43, 45], "j": [0, 2, 19] }, { "y": [49, 86, 88], "j": [0, 13, 14] }, { "y": [23, 24, 0, 35, 1, 3, 4, 2, 5, 35, 27, 28, 13, 29, 42, 39, 17, 9, 43, 54, 14, 71], "j": [19, 6, 65] }, { "y": [0, 23, 24, 1, 3, 47, 43, 14], "j": [2, 6] }, { "y": [0, 6, 8, 29, 13, 50, 12, 65, 38, 42, 73, 28, 69, 70, 41, 39, 17, 34, 43, 14, 52, 44, 47, 45], "j": [1, 3, 59, 54, 79] }, { "y": [0, 23, 24, 5, 6, 1, 3, 29, 13, 52, 14], "j": [9, 43] }, { "y": [0, 24, 23, 1, 3, 4, 2, 5, 27, 28, 31, 9, 46, 13, 29, 42, 33, 77, 80, 11, 43, 44, 54, 55, 56], "j": [6, 69, 38, 14] }, { "y": [23, 24, 12, 50, 10, 34], "j": [3, 14] }, { "y": [1, 95, 43, 14, 55, 56, 52, 44, 47, 45, 72], "j": [0, 13, 31, 9] }, { "y": [1, 3, 4, 22, 2, 57, 23, 67, 15, 31, 9, 26, 80, 7, 41], "j": [79, 38, 66, 53, 39, 19] }, { "y": [49, 69, 70, 6, 7, 8, 10, 39, 17, 34, 87, 47, 43, 14], "j": [3, 0, 42, 13, 89] }, { "y": [1, 3, 4, 2, 27, 5, 28, 31, 9, 13, 29, 33, 73, 41, 47, 14, 43, 52], "j": [0, 19, 42] }, { "y": [0, 67, 1, 5, 12, 31, 9, 47, 43], "j": [20, 2, 79, 55, 56] }, { "y": [97, 95, 72], "j": [93] }, { "y": [49, 95, 72], "j": [22, 6, 0, 19] }, { "y": [6, 7, 8, 10, 41, 101, 86, 1, 31, 9, 42, 80, 65, 43], "j": [0, 79, 82, 29, 38, 19, 39] }, { "y": [24, 23, 0, 29, 13, 5, 6, 7, 8, 10, 12, 30, 27, 28, 37, 26, 42, 19, 73, 14, 43, 52, 45, 47, 44], "j": [3, 33, 69, 11, 34] }, { "y": [1, 47, 44, 86, 52, 14, 44, 55, 56, 72], "j": [93] }, { "y": [23, 24, 1, 3, 30, 27, 31, 9, 33, 38, 26, 32, 33, 36, 41, 29, 13, 8, 43], "j": [0, 53, 79, 89, 19, 14] }, { "y": [0, 4, 24, 46, 10, 86, 17, 34, 12], "j": [33, 19, 15, 5, 14, 38, 66] }, { "y": [0, 24, 23, 1, 67, 25, 15, 16, 74, 36, 75, 19, 29, 42, 87, 86, 41, 101, 55, 56, 52, 47, 44, 14], "j": [37, 89, 9, 43] }, { "y": [42, 1, 3, 4, 67, 15, 74, 9, 41, 101, 86, 47, 55, 56], "j": [38, 39, 19, 61] }, { "y": [24, 23, 1, 4, 27, 20, 25, 12, 57, 28, 95, 81, 73, 11, 41, 86, 39, 17, 43, 71, 45, 14, 47], "j": [3, 0, 53, 42, 54] }, { "y": [1, 22, 49, 62, 55, 56, 44, 47, 43, 14, 63], "j": [6, 0, 42, 12, 13, 19, 33] }, { "y": [1, 5, 23, 24, 25, 64, 67, 46, 9, 42, 19, 47, 44, 14, 43, 86, 88, 87], "j": [16, 53] }, { "y": [49, 97, 87, 86, 88, 95, 72], "j": [3, 14] }], [{ "y": [6, 7, 8, 73, 1, 2, 3, 4, 42, 35, 31, 14], "j": [24, 90, 23, 0, 13, 69, 27, 9, 43, 17, 15] }, { "y": [24, 1, 3, 6, 60, 61, 9, 17], "j": [0, 14] }, { "y": [6, 7, 8, 73, 2, 35, 28, 9, 42, 31, 33, 40, 39, 43, 14], "j": [19, 27, 1, 0, 13] }, { "y": [0, 24, 6, 5, 9, 33, 29, 13, 43, 14], "j": [48] }, { "y": [50, 24, 23, 1, 3, 4, 2, 68, 5, 27, 28, 31, 9, 46, 6, 7, 8, 29, 42, 39, 33, 17, 43, 44, 14], "j": [13, 0, 11, 34] }, { "y": [1, 12, 46, 9, 33, 2, 20, 67, 28, 26, 42, 6, 8, 48, 65], "j": [36, 14] }, { "y": [0, 24, 23, 6, 7, 8, 73, 1, 3, 2, 85, 73, 5, 13, 29, 42, 38, 28, 31, 9, 39, 14, 43, 52, 55, 56, 47, 45], "j": [59, 17, 15, 26, 16, 37] }, { "y": [1, 3, 23, 24, 25, 64, 67, 50, 42, 18, 47, 44, 52, 14, 54, 55, 56, 12, 32, 33, 65, 6, 7, 8, 10, 17, 98], "j": [0, 13, 61, 48] }, { "y": [0, 1, 3, 4, 2, 5, 35, 13, 29, 17, 47, 43, 71, 45], "j": [15, 16, 9, 42, 39, 79] }, { "y": [47, 55, 56, 44, 52, 14, 45, 72], "j": [43, 15] }, { "y": [97, 86, 88, 87], "j": [0, 38, 29, 13, 14] }, { "y": [1, 2, 20, 24, 25, 28, 42, 26, 9, 32, 33, 29, 13, 30, 6, 8, 73, 49, 5, 4, 38], "j": [0, 39, 15, 14] }, { "y": [1, 3, 4, 22, 24, 23, 2, 32, 33, 69, 70, 37, 26, 36, 38, 93, 43, 47, 52, 54], "j": [27, 0, 6] }, { "y": [6, 7, 8, 1, 3, 2, 15, 46, 42, 28, 31, 9, 39, 43, 44, 14], "j": [13, 29, 66, 27, 0, 5] }, { "y": [24, 67, 60, 61, 6, 8, 31, 9, 50, 43, 14], "j": [22, 1, 29, 13, 33, 0] }, { "y": [0, 2, 5, 3, 4, 35, 28, 9, 31, 46, 6, 7, 8, 73, 13, 29, 42, 39, 17, 47, 44, 14], "j": [] }, { "y": [0, 1, 3, 22, 68, 29, 13, 9, 61, 6, 7, 8, 2, 31, 85, 30, 42, 94, 87, 86], "j": [24, 23, 65, 78, 14, 59] }, { "y": [6, 7, 8, 73, 1, 2, 46, 13, 42, 27, 28, 31, 9, 39], "j": [0, 45, 5, 15, 14, 78, 29, 17] }, { "y": [85, 0, 23, 24, 12, 1, 5, 6, 8, 29, 13, 43, 14], "j": [33, 2, 37, 74, 63] }, { "y": [1, 3, 4, 2, 35, 66, 12, 39, 17, 34, 14, 71, 45, 52], "j": [13, 19, 82, 29, 5, 48] }, { "y": [24, 23, 29, 13, 5, 50, 12, 1, 3, 22, 2, 30, 27, 35, 60, 91, 61, 37, 26, 31, 38, 89, 17, 34, 44, 47, 52, 54, 71, 45], "j": [0, 9, 42, 79, 11] }, { "y": [1, 47, 43, 55, 56, 52, 14, 71, 45, 72], "j": [] }, { "y": [1, 86, 47, 55, 56, 44, 14, 43], "j": [72] }, { "y": [6, 8, 7, 73, 1, 3, 2, 13, 29, 42, 28, 9, 33, 46], "j": [0, 78, 74, 16, 66, 34, 14, 17, 15] }, { "y": [1, 20, 2, 23, 24, 67, 25, 50, 28, 31, 9, 42, 65, 6], "j": [27, 13, 14, 15] }, { "y": [6, 7, 8, 1, 3, 2, 9, 42, 5, 39, 17, 34, 32, 33, 35, 43], "j": [0, 11, 13, 29, 14] }, { "y": [23, 24, 12, 46, 103, 28, 31, 9, 26, 6, 39, 17, 34, 47, 55, 56, 44, 43, 14], "j": [] }, { "y": [0, 24, 23, 1, 3, 4, 2, 27, 5, 28, 31, 9, 46, 6, 7, 8, 73, 13, 29, 42, 39, 47, 43, 54, 14], "j": [11, 15, 17, 63] }, { "y": [3, 4, 35, 23, 24, 9, 26, 80, 81, 6, 17, 34, 62, 47, 55, 56, 44, 43, 14], "j": [] }, { "y": [6, 7, 8, 10, 73, 39, 1, 3, 2, 28, 9, 42], "j": [0, 43, 46, 5, 13, 29, 27, 17, 82, 14] }, { "y": [1, 20, 2, 3, 22, 5, 23, 24, 25, 0, 28, 31, 42, 13, 30, 47, 52, 14, 54, 48, 12, 46, 5, 29, 33, 65, 6, 7, 8, 10], "j": [69, 67, 15, 16] }, { "y": [1, 3, 4, 2, 35, 15, 28, 31, 39, 17, 14, 71, 45], "j": [0, 46, 13, 29, 27, 5] }, { "y": [20, 22, 5, 28, 35, 31, 29, 89, 47, 55, 56, 44, 52, 71, 45, 54], "j": [] }, { "y": [1, 22, 47, 43, 52, 14, 71, 45, 55, 56], "j": [0, 13, 19, 24, 23] }, { "y": [88, 47, 55, 56, 44, 43, 14, 45], "j": [0, 33, 13, 19] }, { "y": [1, 3, 4, 22, 49, 2, 66, 65, 35, 61, 61, 45, 39, 34, 11, 41], "j": [0, 36, 63, 14, 78] }, { "y": [], "j": [93] }, { "y": [1, 3, 4, 2, 23, 24, 35, 9, 26, 46, 6, 7, 8, 10, 81, 41, 39, 17, 43, 14], "j": [42, 33, 25, 13, 0] }, { "y": [2, 60, 61, 9, 33, 47, 43, 14], "j": [0] }, { "y": [0, 23, 24, 1, 3, 22, 2, 12, 60, 61, 37, 26, 32, 33, 38, 51, 98, 41, 43, 14, 55, 56], "j": [13, 6, 11, 82, 63] }, { "y": [0, 23, 24, 1, 3, 60, 61, 9, 29, 13, 43, 14], "j": [2, 91] }, { "y": [0, 24, 23, 1, 3, 4, 2, 35, 46, 13, 29, 27, 42, 6, 7, 8, 73], "j": [14, 17, 5, 78, 15, 39, 53, 79] }, { "y": [0, 23, 24, 5, 6, 1, 3, 9, 29, 13, 43, 14], "j": [22, 38] }, { "y": [23, 24, 12, 1, 3, 31, 9, 50, 43, 14], "j": [0, 29, 27, 6, 13] }, { "y": [35, 92, 72], "j": [93] }, { "y": [1, 49, 96, 97, 99, 35, 72], "j": [53, 13, 31, 14, 78, 0] }, { "y": [86, 47, 55, 56, 44, 14, 43], "j": [93] }, { "y": [2, 4, 5, 24, 67, 27, 28, 26, 31, 9, 33, 29, 89, 6, 7, 8, 10], "j": [3, 0, 14, 43] }, { "y": [1, 3, 4, 2, 35, 24, 67, 27, 28, 46, 42, 9, 33, 53, 11, 41, 47, 44, 14, 43], "j": [] }, { "y": [6, 7, 8, 50, 12, 2, 60, 61, 37, 26, 31, 9, 36, 32, 33, 38, 19, 80, 101, 41, 39, 34, 18, 43, 14, 45], "j": [0, 27, 29, 13] }, { "y": [6, 7, 8, 10, 39, 42, 28, 31, 9, 33, 47, 14, 43, 55, 56], "j": [0, 27, 15, 1, 13, 29, 17, 59] }, { "y": [1, 3, 22, 5, 24, 23, 50, 27, 28, 31, 9, 26, 29, 13, 53, 47, 55, 56, 44, 43, 14, 54], "j": [0, 6, 39, 63] }, { "y": [0, 27, 28, 1, 3, 2, 15, 9, 6, 7, 8, 13, 29, 42, 17, 47, 14], "j": [39, 19, 91, 5] }, { "y": [2, 4, 103, 0, 23, 24, 27, 28, 31, 9, 26, 33, 80, 29, 13, 81, 89, 6, 41, 17, 34, 73], "j": [78, 14, 63] }, { "y": [0, 1, 6, 2, 5, 13, 29, 27, 28, 31, 42], "j": [17, 15, 40, 16, 78, 14, 71, 45] }, { "y": [24, 23, 1, 3, 4, 22, 2, 12, 35, 57, 10, 7, 8, 65, 26, 9, 36, 41, 39, 17, 34, 43, 47, 45, 14], "j": [0, 6, 13, 27, 29] }, { "y": [35, 95, 72], "j": [93] }, { "y": [47, 55, 56, 44, 52, 14, 71, 45], "j": [6, 15, 0, 16] }, { "y": [1, 97, 86, 43, 54, 14, 44, 55, 56, 72], "j": [0, 13] }, { "y": [1, 2, 20, 23, 24, 64, 67, 28, 9, 26, 33, 13, 30, 6, 8, 10, 49, 4, 27, 32, 38], "j": [53, 0, 15, 14] }], [{ "y": [1, 49, 94, 39], "j": [0, 13, 29, 19, 14] }, { "y": [1, 104, 88, 10, 17, 72], "j": [0, 13] }, { "y": [0, 24, 5, 29, 13], "j": [9, 43, 14] }, { "y": [1, 86, 72], "j": [13, 5, 11, 14] }, { "y": [1, 19, 10, 94], "j": [6, 43] }, { "y": [0, 1, 3, 4, 25, 67, 65, 31, 46, 42, 9, 32, 33, 29, 7, 8, 39, 12], "j": [78, 14, 5, 16, 17, 15, 79] }, { "y": [1, 25, 67, 0, 105, 12, 55, 56, 44, 94, 46, 47], "j": [29, 13, 19] }, { "y": [1, 67, 29, 12, 10, 66, 94], "j": [0, 6, 41, 101, 43] }, { "y": [49, 95, 72], "j": [93] }, { "y": [1, 49, 66, 10, 46, 39, 95, 94, 87, 86], "j": [12, 14, 13, 29, 42, 6, 78, 27, 19, 38] }, { "y": [1, 3, 22, 20, 2, 55, 56, 47, 19, 0, 94, 87, 10], "j": [69, 37, 14, 42] }, { "y": [24, 1, 3, 5, 12, 31, 9, 29, 13], "j": [0, 6, 14, 43] }, { "y": [25, 64, 67, 0, 105, 42, 47, 10], "j": [19, 6, 14, 16] }, { "y": [1, 94, 35, 72], "j": [0, 14] }, { "y": [86, 35, 72], "j": [93] }, { "y": [1, 19, 72], "j": [6, 14, 43, 71, 11] }, { "y": [1, 19, 10, 39, 17, 46], "j": [14, 65, 71, 43, 6, 42, 52, 45] }, { "y": [0, 23, 24, 19, 67, 25, 12, 17, 34, 50, 6, 8, 10, 42], "j": [11, 5, 43, 78, 14] }, { "y": [1, 66, 12, 46, 0, 91, 47, 44], "j": [59, 83, 14, 15, 19, 13] }, { "y": [1, 19, 10, 94, 87, 72], "j": [9, 43, 6, 14] }, { "y": [1, 49, 86, 44, 47, 55, 56], "j": [42, 6, 7, 70, 14, 71, 0, 19] }, { "y": [1, 49, 19, 10, 94, 87, 42, 95], "j": [6, 22, 43, 14] }, { "y": [1, 35, 72], "j": [93] }, { "y": [20, 2, 3, 4, 23, 24, 25, 67, 28, 31, 9, 26, 38, 42, 29, 81, 86, 17], "j": [15, 19, 14, 88, 13] }, { "y": [66, 67, 0, 46], "j": [40, 15, 17, 18, 14, 43, 16, 19, 62] }, { "y": [1, 72], "j": [53, 0, 42] }, { "y": [35, 5, 24, 67, 32, 33, 29, 19, 46, 13, 17, 34], "j": [1, 15, 74, 42, 31, 9, 14, 71, 43] }, { "y": [1, 94, 88, 106, 72], "j": [93] }, { "y": [1, 67, 19, 7, 10, 39, 86, 17, 34, 46], "j": [83, 89, 42, 14, 43, 5, 71, 11, 6, 62] }, { "y": [20, 2, 35, 23, 24, 0, 27, 31, 9, 29, 13, 28, 26, 38, 107, 6, 7, 8, 10, 17, 34], "j": [] }, { "y": [0, 1, 66, 46, 19, 44, 67, 12], "j": [69, 70, 15, 17, 6, 33, 37, 43, 52, 39] }, { "y": [1, 19, 47, 55, 56, 87], "j": [39, 9, 14, 6] }, { "y": [49, 95, 94, 87, 35, 97, 72], "j": [0, 13, 6, 42, 43, 71] }, { "y": [1, 49, 42, 10, 87, 94], "j": [6, 43] }, { "y": [1, 22, 10, 94, 87], "j": [0, 6, 13, 42, 43, 14] }, { "y": [1, 4, 49, 21, 23, 24, 25, 64, 67, 50, 42, 81, 41, 65, 10, 6, 8, 7, 86, 88, 17, 94], "j": [14, 19, 15, 16] }, { "y": [10, 7, 8, 39, 94, 86, 88, 46, 102, 66], "j": [13, 37, 32, 14] }, { "y": [35, 92, 72], "j": [93] }, { "y": [1, 86, 94, 72], "j": [59, 0, 6] }, { "y": [1, 39, 72], "j": [93] }, { "y": [24, 23, 0, 29, 13, 5, 1, 3, 22, 20, 2, 30, 27, 12, 35, 57, 32, 33, 28, 37, 26, 39, 34, 17], "j": [14, 43, 6, 69, 70, 52] }, { "y": [23, 24, 1, 3, 50, 19, 17], "j": [9, 14] }, { "y": [1, 67, 94, 72], "j": [0, 6, 37, 16, 63] }, { "y": [1, 97, 72], "j": [93] }, { "y": [1, 49, 94, 87, 86, 95], "j": [0, 24, 23, 42, 9, 43, 14] }, { "y": [49, 66, 95], "j": [15, 17, 33, 13, 19, 18, 0, 14, 16, 89, 38] }, { "y": [0, 24, 23, 90, 1, 67, 25, 12, 46, 10, 94, 19], "j": [6, 42, 14, 71] }, { "y": [29, 1, 2, 3, 5, 35, 46, 108, 42, 9, 26, 33, 38, 35], "j": [0, 14, 43, 16, 17, 34, 78, 19] }, { "y": [66, 67, 0, 46, 39, 94, 91], "j": [10, 6, 14, 43] }, { "y": [35, 109, 72], "j": [93] }, { "y": [39, 94, 87, 72], "j": [6, 9, 1, 22, 14, 59] }, { "y": [1, 19, 72], "j": [93] }, { "y": [1, 46, 10, 17, 34, 94, 72], "j": [6, 13, 42, 9, 14] }, { "y": [1, 2, 35, 46, 7, 8, 10, 17], "j": [9, 43, 0, 66, 5, 13, 29, 107, 30, 27] }, { "y": [1, 0, 94], "j": [2, 9, 43, 6, 31, 13, 38] }, { "y": [0, 1, 19, 10], "j": [14, 6, 71, 45] }, { "y": [94, 87, 12, 35, 47, 55, 56, 44, 72], "j": [42, 38, 43, 71, 14] }, { "y": [1, 2, 66, 100, 42, 19, 95, 102], "j": [15, 17, 43, 14, 62, 0, 6, 9, 7, 16] }, { "y": [1, 19, 47, 55, 72], "j": [6, 42] }, { "y": [1, 49, 66, 19, 86, 39], "j": [0, 82, 78, 14, 34, 15, 16, 6, 17, 18] }]];
/**
 * 黄历吉凶数据
 */
var huangliJXWords = ["天恩", "母仓", "時阳", "生气", "益后", "青龙", "灾煞", "天火", "四忌", "八龙", "复日", "续世", "明堂", "月煞", "月虚", "血支", "天贼", "五虚", "土符", "归忌", "血忌", "月德", "月恩", "四相", "王日", "天仓", "不将", "要安", "五合", "鸣吠对", "月建", "小時", "土府", "往亡", "天刑", "天德", "官日", "吉期", "玉宇", "大時", "大败", "咸池", "朱雀", "守日", "天巫", "福德", "六仪", "金堂", "金匮", "厌对", "招摇", "九空", "九坎", "九焦", "相日", "宝光", "天罡", "死神", "月刑", "月害", "游祸", "重日", "時德", "民日", "三合", "临日", "天马", "時阴", "鸣吠", "死气", "地囊", "白虎", "月德合", "敬安", "玉堂", "普护", "解神", "小耗", "天德合", "月空", "驿马", "天后", "除神", "月破", "大耗", "五离", "天牢", "阴德", "福生", "天吏", "致死", "元武", "阳德", "天喜", "天医", "司命", "月厌", "地火", "四击", "大煞", "大会", "天愿", "六合", "五富", "圣心", "河魁", "劫煞", "四穷", "勾陈", "触水龙", "八风", "天赦", "五墓", "八专", "阴错", "四耗", "阳错", "四废", "三阴", "小会", "阴道冲阳", "单阴", "[无神煞]", "孤辰", "阴位", "行狠", "了戾", "绝阴", "纯阳", "七鸟", "岁薄", "阴阳交破", "阴阳俱错", "阴阳击冲", "逐阵", "阳错阴冲", "七符", "天狗", "九虎", "成日", "天符", "孤阳", "绝阳", "纯阴", "六蛇", "阴神", "解除", "null", "阳破阴冲"];
/**黄历吉凶数据，12行x60列，里面的字符串使用数字代替，
 * 数字对应的文本如huangliJXWords，坐标从0开始 */
var huangliJXData = [[{ "j": [0, 1, 2, 3, 4, 5], "x": [6, 7, 8, 9, 10] }, { "j": [0, 11, 12], "x": [13, 14, 15, 16, 17, 18, 19, 20] }, { "j": [21, 0, 22, 23, 24, 25, 26, 27, 28, 29], "x": [30, 31, 32, 33, 34] }, { "j": [35, 0, 23, 36, 37, 26, 38, 28, 29], "x": [39, 40, 41, 42] }, { "j": [0, 43, 44, 45, 46, 47, 48], "x": [49, 50, 51, 52, 53] }, { "j": [54, 55], "x": [56, 57, 58, 59, 60, 17, 61] }, { "j": [62, 63, 64, 65, 66, 67, 68], "x": [69, 70, 71] }, { "j": [72, 73, 74, 75, 76], "x": [77] }, { "j": [78, 79, 80, 81, 75, 76, 82, 68], "x": [83, 84, 85, 86] }, { "j": [87, 88, 82, 68], "x": [89, 90, 17, 85, 91] }, { "j": [92, 64, 93, 94, 95], "x": [96, 97, 98, 99, 10, 100] }, { "j": [1, 101, 102, 103, 104], "x": [105, 106, 107, 9, 61, 108] }, { "j": [21, 1, 22, 23, 2, 3, 26, 4, 5, 29], "x": [6, 7, 109] }, { "j": [35, 23, 26, 11, 12], "x": [13, 14, 15, 16, 17, 110, 18, 19, 20] }, { "j": [111, 24, 25, 27, 28], "x": [30, 31, 32, 33, 34] }, { "j": [0, 36, 37, 26, 38, 28], "x": [39, 40, 41, 42] }, { "j": [0, 43, 44, 45, 46, 47, 48], "x": [49, 50, 51, 52, 53] }, { "j": [72, 0, 54, 55], "x": [56, 57, 58, 59, 60, 17, 61] }, { "j": [78, 79, 0, 62, 63, 64, 65, 66, 67, 68], "x": [69, 71] }, { "j": [0, 73, 74], "x": [77, 109] }, { "j": [80, 81, 75, 76, 82, 68], "x": [83, 84, 10, 85, 86] }, { "j": [0, 87, 88, 82, 68], "x": [89, 90, 17, 85, 91] }, { "j": [21, 0, 23, 92, 64, 93, 94, 95], "x": [96, 97, 98, 99] }, { "j": [35, 1, 23, 102, 103, 26, 104], "x": [105, 106, 61, 108] }, { "j": [1, 2, 3, 4, 5], "x": [6, 7] }, { "j": [26, 11, 12], "x": [13, 14, 15, 16, 17, 18, 19, 20] }, { "j": [24, 25, 26, 27, 28, 29], "x": [30, 31, 32, 33, 34] }, { "j": [72, 36, 37, 26, 38, 28, 29], "x": [39, 40, 41] }, { "j": [78, 79, 43, 44, 45, 46, 47, 48], "x": [49, 50, 51, 52, 53] }, { "j": [54, 55], "x": [56, 57, 58, 59, 60, 17, 61] }, { "j": [62, 63, 64, 65, 66, 67, 68], "x": [69, 10, 71] }, { "j": [73, 74], "x": [77, 112] }, { "j": [21, 22, 23, 80, 81, 75, 76, 82, 68], "x": [83, 84, 85] }, { "j": [35, 23, 87, 88, 82, 68], "x": [89, 90, 17, 85, 91] }, { "j": [92, 64, 93, 94, 95], "x": [96, 97, 98, 99] }, { "j": [1, 102, 103, 26, 104], "x": [105, 106, 61, 108] }, { "j": [1, 2, 3, 26, 4, 5, 29], "x": [6, 7, 70] }, { "j": [72, 26, 11, 12], "x": [13, 14, 15, 16, 17, 18, 19, 20] }, { "j": [78, 79, 24, 25, 27, 28, 29], "x": [30, 31, 32, 33, 34] }, { "j": [36, 37, 38, 28, 29], "x": [39, 40, 41, 42] }, { "j": [43, 44, 45, 46, 47, 48], "x": [49, 50, 51, 52, 53, 10] }, { "j": [54, 55], "x": [56, 57, 58, 59, 60, 17, 61] }, { "j": [21, 22, 23, 62, 63, 64, 65, 66, 67, 68], "x": [69, 71] }, { "j": [35, 23, 73, 74], "x": [77, 113] }, { "j": [80, 81, 75, 76, 82], "x": [83, 84, 85, 86] }, { "j": [0, 87, 88, 82, 68], "x": [89, 90, 17, 85, 91] }, { "j": [0, 92, 64, 93, 94, 95], "x": [96, 97, 98, 99, 114] }, { "j": [72, 0, 1, 102, 103, 26, 104], "x": [105, 106, 61, 108] }, { "j": [78, 79, 0, 1, 2, 3, 4, 5, 29], "x": [6, 7, 115] }, { "j": [0, 11, 12], "x": [13, 14, 15, 16, 17, 18, 19, 20, 113, 109] }, { "j": [24, 25, 27, 28, 29], "x": [30, 31, 32, 33, 10, 113, 34, 116] }, { "j": [36, 37, 38, 28, 29], "x": [39, 40, 41, 42] }, { "j": [21, 22, 23, 43, 44, 45, 46, 47, 48], "x": [49, 50, 51, 52, 53] }, { "j": [35, 23, 54, 55], "x": [56, 57, 58, 59, 60, 17, 110, 61] }, { "j": [62, 63, 64, 65, 66, 67], "x": [69, 71] }, { "j": [73, 74], "x": [77, 113] }, { "j": [80, 81, 75, 76, 82, 68], "x": [83, 84, 117, 85, 113, 86] }, { "j": [72, 87, 88, 82, 68], "x": [89, 90, 117, 17, 85, 91, 118] }, { "j": [78, 79, 92, 64, 93, 94, 95], "x": [96, 97, 98, 99] }, { "j": [1, 102, 103, 104], "x": [105, 106, 61, 108] }], [{ "j": [21, 0, 1, 92, 95], "x": [56, 58, 39, 40, 41, 16, 8, 9] }, { "j": [0, 2, 3, 25, 26, 73], "x": [17, 51, 52, 53, 10, 108] }, { "j": [0, 23, 24, 103, 26, 75, 28, 5, 29], "x": [60, 15, 19] }, { "j": [0, 22, 23, 36, 46, 88, 28, 12, 29], "x": [30, 31, 32, 49, 50] }, { "j": [0, 43, 37], "x": [59, 34] }, { "j": [72, 54, 80, 81, 44, 45, 104], "x": [17, 18, 99, 33, 61, 42] }, { "j": [79, 62, 63, 4, 48, 29], "x": [105, 57, 89, 90] }, { "j": [87, 64, 67, 11, 55], "x": [69, 20] }, { "j": [66, 27, 76, 68], "x": [106, 77, 85, 71] }, { "j": [38, 82, 74, 68], "x": [83, 84, 6, 7, 96, 97, 17, 85] }, { "j": [21, 101, 102, 47], "x": [13, 14, 98, 86] }, { "j": [1, 64, 65, 93, 94, 26], "x": [107, 9, 10, 61, 91] }, { "j": [1, 23, 92, 26, 95, 29], "x": [56, 58, 39, 40, 41, 16, 109] }, { "j": [22, 23, 2, 3, 26, 73], "x": [17, 110, 51, 52, 53, 108] }, { "j": [111, 24, 103, 75, 28, 5], "x": [60, 15, 19] }, { "j": [72, 0, 36, 46, 88, 28, 12], "x": [30, 31, 32, 49, 50, 119] }, { "j": [79, 0, 43, 37], "x": [59, 34] }, { "j": [0, 54, 80, 81, 44, 45, 104], "x": [17, 18, 99, 33, 61, 42] }, { "j": [0, 62, 63, 4, 48, 68], "x": [105, 57, 89, 90] }, { "j": [0, 87, 64, 67, 11, 55], "x": [69, 20, 109] }, { "j": [21, 66, 27, 76, 82, 68], "x": [106, 77, 85, 71] }, { "j": [38, 82, 74, 68], "x": [83, 84, 6, 7, 96, 97, 17, 10, 85, 71] }, { "j": [23, 102, 26, 47], "x": [13, 14, 98, 86] }, { "j": [1, 22, 23, 64, 65, 93, 94, 26], "x": [61, 91] }, { "j": [1, 92, 95], "x": [56, 58, 39, 40, 41, 16] }, { "j": [72, 2, 3, 25, 26, 73], "x": [17, 51, 52, 53, 108] }, { "j": [79, 24, 103, 26, 75, 28, 5, 29], "x": [60, 15, 19] }, { "j": [36, 46, 88, 28, 12, 68], "x": [30, 31, 32, 49, 50] }, { "j": [43, 37], "x": [59, 34] }, { "j": [54, 80, 81, 44, 45, 104], "x": [17, 18, 99, 33, 61, 42] }, { "j": [21, 62, 63, 4, 48, 68], "x": [105, 57, 89, 90] }, { "j": [87, 64, 67, 11, 55], "x": [69, 112, 70, 20, 10] }, { "j": [23, 66, 27, 76, 82, 68], "x": [106, 77, 85, 71] }, { "j": [22, 23, 38, 82, 74, 68], "x": [83, 84, 6, 7, 96, 97, 17, 85] }, { "j": [102, 47], "x": [13, 14, 98, 86] }, { "j": [72, 1, 64, 65, 93, 94, 26], "x": [61, 91] }, { "j": [79, 1, 92, 26, 95, 29], "x": [56, 58, 39, 40, 41, 16] }, { "j": [2, 3, 25, 73], "x": [17, 51, 52, 53, 108] }, { "j": [24, 103, 75, 28, 5, 29], "x": [60, 15, 19] }, { "j": [36, 46, 88, 28, 12, 29], "x": [30, 31, 32, 49, 50] }, { "j": [21, 43, 37], "x": [59, 34] }, { "j": [54, 80, 81, 44, 45, 104], "x": [17, 18, 99, 33, 10, 61, 42] }, { "j": [23, 62, 63, 4, 48, 68], "x": [105, 57, 89, 90] }, { "j": [22, 23, 87, 64, 67, 11, 55], "x": [69, 20, 113] }, { "j": [66, 27, 76, 82], "x": [106, 77, 85, 71] }, { "j": [72, 0, 38, 82, 74, 68], "x": [83, 84, 6, 7, 96, 97, 17, 85, 120] }, { "j": [79, 0, 102, 26, 47], "x": [13, 14, 98, 86] }, { "j": [0, 1, 64, 65, 93, 94], "x": [61, 91] }, { "j": [0, 1, 92, 95, 29], "x": [56, 58, 39, 40, 41, 16, 115] }, { "j": [0, 2, 3, 25, 73], "x": [17, 51, 52, 53, 70, 113, 109, 108] }, { "j": [21, 24, 103, 75, 28, 5, 29], "x": [60, 15, 19] }, { "j": [36, 46, 88, 28, 12, 29], "x": [30, 31, 32, 49, 50, 10, 116] }, { "j": [23, 43, 37], "x": [59, 34] }, { "j": [22, 23, 54, 80, 81, 44, 45, 104], "x": [17, 110, 18, 99, 33, 61, 42] }, { "j": [62, 63, 4, 48], "x": [105, 57, 89, 90] }, { "j": [72, 87, 64, 67, 11, 55], "x": [69, 20, 113] }, { "j": [79, 66, 27, 76, 82, 68], "x": [106, 77, 117, 85, 113, 71] }, { "j": [38, 82, 74, 68], "x": [83, 84, 6, 7, 96, 97, 117, 17, 85, 114] }, { "j": [102, 47], "x": [13, 14, 98, 86] }, { "j": [1, 64, 65, 93, 94], "x": [61, 91] }], [{ "j": [0, 1, 64, 93, 94, 25, 26, 104], "x": [8, 9, 70, 19, 86] }, { "j": [0, 26, 4], "x": [105, 17, 91] }, { "j": [79, 0, 23, 92, 24, 80, 81, 2, 3, 46, 11, 28, 95, 29], "x": [49, 50, 20] }, { "j": [78, 72, 0, 23, 36, 27, 28, 29], "x": [59, 89, 90, 15, 108] }, { "j": [0, 43, 38, 5], "x": [30, 31, 32, 58, 112, 10, 119, 121] }, { "j": [87, 54, 37, 103, 47, 12], "x": [106, 17, 61] }, { "j": [22, 62, 63, 44, 45, 68], "x": [6, 7, 99, 34] }, { "j": [122], "x": [56, 57, 13, 42] }, { "j": [35, 21, 64, 65, 67, 73, 82, 48, 68], "x": [96, 97, 69, 33, 85, 123] }, { "j": [102, 75, 82, 55, 68], "x": [39, 40, 41, 77, 17, 18, 85] }, { "j": [66, 26, 88, 76], "x": [83, 84, 98, 51, 52, 53, 71] }, { "j": [1, 26, 38], "x": [60, 16, 107, 9, 61] }, { "j": [79, 1, 23, 64, 93, 94, 25, 26, 104, 29], "x": [19, 109, 86] }, { "j": [78, 72, 23, 26, 4], "x": [105, 17, 110, 91] }, { "j": [111, 92, 24, 80, 81, 2, 3, 46, 11, 28, 95], "x": [49, 50, 20, 10] }, { "j": [0, 36, 27, 28], "x": [59, 89, 90, 15, 108] }, { "j": [0, 22, 43, 38, 5], "x": [30, 31, 32, 58, 124] }, { "j": [0, 87, 54, 37, 103, 47, 12], "x": [106, 17, 61] }, { "j": [35, 21, 0, 62, 63, 44, 45, 68], "x": [6, 7, 70, 99, 34] }, { "j": [0], "x": [56, 57, 13, 14, 109, 42] }, { "j": [64, 65, 67, 73, 82, 48, 68], "x": [96, 97, 69, 33, 85, 125] }, { "j": [101, 102, 26, 75, 82, 55, 68], "x": [39, 40, 41, 77, 17, 18, 85] }, { "j": [79, 23, 66, 26, 88, 76], "x": [83, 84, 98, 51, 52, 53, 71] }, { "j": [78, 72, 1, 23, 26, 74], "x": [60, 16, 61] }, { "j": [1, 64, 93, 94, 25, 104], "x": [19, 10, 86] }, { "j": [26, 4], "x": [105, 17, 91] }, { "j": [22, 92, 24, 80, 81, 2, 3, 46, 11, 28, 95, 29], "x": [49, 50, 20] }, { "j": [36, 27, 28, 29], "x": [59, 89, 90, 15, 108] }, { "j": [35, 21, 43, 38, 5], "x": [30, 31, 32, 58] }, { "j": [87, 54, 37, 103, 47, 12], "x": [106, 17, 61] }, { "j": [62, 63, 44, 45, 68], "x": [6, 7, 99, 34] }, { "j": [122], "x": [56, 57, 13, 14, 42] }, { "j": [79, 23, 64, 65, 67, 73, 82, 48, 68], "x": [96, 97, 69, 33, 85, 126] }, { "j": [78, 72, 23, 102, 26, 75, 82, 55, 68], "x": [39, 40, 41, 77, 17, 18, 85] }, { "j": [66, 88, 76], "x": [83, 84, 98, 51, 52, 53, 10, 71] }, { "j": [1, 26, 74], "x": [60, 16, 61] }, { "j": [1, 22, 64, 93, 94, 25, 104, 29], "x": [19, 86] }, { "j": [4], "x": [105, 17, 91] }, { "j": [87, 21, 92, 24, 80, 81, 2, 3, 46, 11, 28, 95, 29], "x": [49, 50, 20] }, { "j": [36, 27, 28, 29], "x": [59, 89, 90, 15, 108] }, { "j": [43, 38, 5], "x": [30, 31, 32, 58, 116] }, { "j": [87, 54, 37, 103, 47, 12], "x": [106, 17, 61] }, { "j": [79, 23, 62, 63, 44, 45, 68], "x": [6, 7, 99, 34] }, { "j": [78, 72, 23], "x": [56, 57, 13, 14, 113, 42] }, { "j": [64, 65, 67, 73, 82, 48], "x": [96, 97, 69, 33, 10, 85, 123] }, { "j": [0, 102, 26, 75, 82, 55, 68], "x": [39, 40, 41, 77, 17, 18, 85] }, { "j": [0, 22, 66, 88, 76], "x": [83, 84, 98, 51, 52, 53, 71] }, { "j": [0, 1, 74], "x": [60, 16, 61] }, { "j": [35, 21, 0, 1, 64, 93, 94, 25, 104, 29], "x": [115, 19, 86] }, { "j": [0, 4], "x": [105, 17, 113, 109, 91] }, { "j": [92, 24, 80, 81, 2, 3, 46, 11, 28, 95, 29], "x": [49, 50, 20, 113] }, { "j": [36, 27, 28, 29], "x": [59, 89, 90, 15, 108] }, { "j": [79, 23, 43, 38, 5], "x": [30, 31, 32, 58] }, { "j": [78, 72, 23, 87, 54, 37, 103, 47, 12], "x": [106, 17, 110, 61] }, { "j": [62, 63, 44, 45], "x": [6, 7, 99, 10, 34] }, { "j": [122], "x": [56, 57, 13, 14, 113, 42] }, { "j": [22, 64, 65, 67, 73, 82, 48, 68], "x": [96, 97, 69, 117, 33, 85, 113, 123, 114] }, { "j": [102, 75, 82, 55, 68], "x": [39, 40, 41, 77, 117, 17, 18, 85] }, { "j": [35, 21, 66, 88, 76], "x": [83, 84, 98, 51, 52, 53, 71] }, { "j": [1, 74], "x": [60, 16, 61] }], [{ "j": [79, 0, 66, 26], "x": [89, 90, 17, 71] }, { "j": [72, 0, 64, 65, 93, 94, 46, 74], "x": [49, 50, 98, 19] }, { "j": [78, 0, 1, 73, 28, 29], "x": [56, 106, 59, 18, 10, 86] }, { "j": [0, 1, 87, 2, 3, 75, 28, 29], "x": [6, 7, 91] }, { "j": [0, 23, 62, 92, 88, 95], "x": [13, 14, 15, 17, 127] }, { "j": [22, 23, 24], "x": [30, 31, 32, 61, 108, 119, 128, 116] }, { "j": [21, 36, 37, 104, 5, 68], "x": [39, 40, 41] }, { "j": [35, 43, 44, 45, 4, 12], "x": [96, 97, 51, 52, 53, 99, 123] }, { "j": [54, 102, 103, 11, 82, 68], "x": [105, 57, 58, 60, 17, 20, 85, 34] }, { "j": [63, 64, 67, 27, 82, 68], "x": [69, 85, 42] }, { "j": [79, 26, 38, 76, 48], "x": [77, 16] }, { "j": [72, 80, 81, 25, 26, 47, 55], "x": [83, 84, 33, 61] }, { "j": [78, 66, 26, 29], "x": [89, 90, 8, 129, 17, 10, 109, 71] }, { "j": [64, 65, 93, 94, 46, 74], "x": [49, 50, 98, 19] }, { "j": [1, 23, 73, 28], "x": [56, 106, 59, 18, 86] }, { "j": [0, 1, 22, 23, 87, 2, 3, 75, 28], "x": [6, 7, 70, 91] }, { "j": [21, 0, 62, 87, 88, 95], "x": [13, 14, 15, 17] }, { "j": [35, 0, 24], "x": [30, 31, 32, 61, 108] }, { "j": [0, 36, 37, 104, 5, 68], "x": [39, 40, 41] }, { "j": [0, 43, 44, 45, 4, 12], "x": [96, 97, 51, 52, 53, 99, 109, 123] }, { "j": [79, 54, 102, 103, 26, 11, 82, 68], "x": [105, 57, 58, 60, 17, 110, 20, 85, 34] }, { "j": [72, 63, 64, 67, 26, 27, 82, 68], "x": [69, 85, 42] }, { "j": [78, 26, 38, 76, 48], "x": [77, 16, 112, 10] }, { "j": [80, 81, 25, 26, 47, 55], "x": [83, 84, 107, 129, 33, 61] }, { "j": [23, 66, 26], "x": [89, 90, 17, 71] }, { "j": [22, 23, 64, 65, 93, 94, 46, 74], "x": [49, 50, 98, 19] }, { "j": [21, 1, 73, 28, 29], "x": [56, 106, 59, 18, 86] }, { "j": [35, 1, 87, 67, 3, 75, 28, 29], "x": [6, 7, 91] }, { "j": [62, 92, 88, 95], "x": [13, 14, 15, 17] }, { "j": [24], "x": [30, 31, 32, 61, 108] }, { "j": [79, 111, 36, 37, 104, 5, 68], "x": [39, 40, 41] }, { "j": [72, 43, 44, 45, 4, 12], "x": [96, 97, 51, 52, 53, 99, 125] }, { "j": [78, 101, 54, 102, 103, 26, 11, 82, 68], "x": [105, 57, 58, 60, 17, 20, 10, 85, 34] }, { "j": [63, 64, 67, 26, 27, 82, 68], "x": [69, 85, 42] }, { "j": [23, 26, 38, 76, 48], "x": [77, 16] }, { "j": [22, 23, 80, 81, 25, 47, 55], "x": [83, 84, 33, 61] }, { "j": [21, 66, 29], "x": [89, 90, 17, 71] }, { "j": [35, 64, 65, 93, 94, 46, 74], "x": [49, 50, 98, 19] }, { "j": [1, 73, 28, 29], "x": [56, 106, 59, 18, 86] }, { "j": [1, 87, 2, 3, 75, 28, 29], "x": [6, 7, 91] }, { "j": [79, 62, 92, 88, 95], "x": [13, 14, 15, 17, 110] }, { "j": [72, 24], "x": [30, 31, 32, 61, 108] }, { "j": [78, 36, 37, 104, 5, 68], "x": [39, 40, 41, 10, 130] }, { "j": [43, 44, 45, 4, 12], "x": [96, 97, 51, 52, 53, 99, 113, 126, 114] }, { "j": [23, 54, 102, 103, 26, 11, 82], "x": [105, 57, 58, 60, 17, 20, 85, 34] }, { "j": [0, 22, 23, 63, 64, 67, 27, 82, 68], "x": [69, 70, 85, 42] }, { "j": [21, 0, 38, 76, 48], "x": [77, 16] }, { "j": [35, 0, 80, 81, 25, 47, 55], "x": [83, 84, 33, 61] }, { "j": [0, 66, 29], "x": [89, 90, 117, 17, 71] }, { "j": [0, 64, 65, 93, 94, 46, 74], "x": [49, 50, 98, 19, 113, 109] }, { "j": [79, 1, 73, 28, 29], "x": [56, 106, 59, 18, 113, 86] }, { "j": [72, 1, 87, 67, 3, 75, 28, 29], "x": [6, 7, 115, 91] }, { "j": [78, 62, 92, 88, 95], "x": [13, 14, 15, 17, 10] }, { "j": [24], "x": [30, 31, 32, 61, 108, 116] }, { "j": [23, 36, 37, 104, 5], "x": [39, 40, 41, 130] }, { "j": [22, 23, 43, 44, 45, 4, 12], "x": [96, 97, 51, 52, 53, 99, 113, 123, 114] }, { "j": [21, 54, 102, 103, 11, 82, 68], "x": [105, 57, 58, 60, 17, 20, 85, 113, 34] }, { "j": [35, 63, 64, 67, 27, 82, 68], "x": [69, 85, 42] }, { "j": [38, 76, 48], "x": [77, 16] }, { "j": [80, 81, 25, 47, 55], "x": [83, 84, 117, 33, 61, 131] }], [{ "j": [0, 46, 76, 48], "x": [83, 84, 6, 7, 49, 50, 17] }, { "j": [0, 87, 104, 55], "x": [13, 14, 59, 98] }, { "j": [21, 0, 1, 64, 66, 93, 94, 4, 28, 29], "x": [99, 19, 71] }, { "j": [0, 1, 11, 28, 74, 29], "x": [105, 39, 40, 41, 52, 53, 20, 33, 10] }, { "j": [0, 22, 23, 62, 2, 3, 27], "x": [17, 51, 86] }, { "j": [23, 24, 38], "x": [60, 15, 61, 91] }, { "j": [92, 36, 47, 95, 68], "x": [30, 31, 32, 58, 96, 97, 18] }, { "j": [72, 43, 37, 102], "x": [108] }, { "j": [79, 54, 80, 81, 44, 45, 82, 5, 68], "x": [17, 85] }, { "j": [63, 26, 73, 82, 12, 68], "x": [56, 57, 89, 90, 16, 85] }, { "j": [64, 65, 67, 25, 26, 75], "x": [69, 34] }, { "j": [103, 26, 88], "x": [106, 77, 61, 42] }, { "j": [21, 46, 76, 48, 29], "x": [83, 84, 6, 7, 49, 50, 8, 129, 17, 109] }, { "j": [87, 104, 55], "x": [13, 14, 59, 10] }, { "j": [1, 22, 23, 64, 66, 93, 94, 4, 28], "x": [99, 19, 71] }, { "j": [0, 1, 23, 11, 28, 74], "x": [105, 39, 40, 41, 52, 53, 20, 33] }, { "j": [0, 62, 2, 3, 27], "x": [17, 51, 86] }, { "j": [72, 0, 24, 38], "x": [60, 15, 61, 91] }, { "j": [79, 0, 92, 36, 47, 95, 68], "x": [30, 31, 32, 58, 96, 97, 18] }, { "j": [0, 43, 37, 102, 26], "x": [109, 108] }, { "j": [54, 80, 81, 44, 45, 26, 82, 5, 68], "x": [17, 110, 85] }, { "j": [63, 26, 73, 82, 12, 68], "x": [56, 57, 89, 90, 16, 85] }, { "j": [21, 64, 65, 67, 25, 26, 75], "x": [69, 112, 34] }, { "j": [103, 88], "x": [106, 77, 107, 129, 10, 61, 42] }, { "j": [22, 23, 46, 76, 48], "x": [83, 84, 6, 7, 49, 50, 17] }, { "j": [23, 87, 104, 55], "x": [13, 14, 59, 98] }, { "j": [1, 64, 66, 93, 94, 4, 28, 29], "x": [99, 19, 71] }, { "j": [72, 1, 11, 28, 74, 29], "x": [105, 39, 40, 41, 52, 53, 20, 33] }, { "j": [79, 62, 2, 3, 27], "x": [17, 51, 86] }, { "j": [24, 38], "x": [60, 15, 61, 91] }, { "j": [111, 92, 36, 47, 95, 68], "x": [30, 31, 32, 58, 96, 97, 18] }, { "j": [43, 37, 102, 26], "x": [108] }, { "j": [21, 54, 80, 81, 44, 45, 26, 82, 5, 68], "x": [17, 85] }, { "j": [63, 73, 82, 12, 68], "x": [56, 57, 89, 90, 16, 10, 85] }, { "j": [22, 23, 64, 65, 67, 25, 26], "x": [69, 34] }, { "j": [23, 103, 88], "x": [106, 77, 61, 42] }, { "j": [46, 76, 48, 29], "x": [83, 84, 6, 7, 49, 50, 17] }, { "j": [72, 87, 104, 55], "x": [13, 14, 59, 98] }, { "j": [79, 1, 64, 66, 93, 94, 4, 28, 29], "x": [99, 19, 71] }, { "j": [1, 11, 28, 74, 29], "x": [105, 39, 40, 41, 52, 53, 20, 33] }, { "j": [62, 2, 3, 27], "x": [17, 110, 51, 70, 86] }, { "j": [24, 38], "x": [60, 15, 61, 91] }, { "j": [21, 92, 36, 47, 95, 68], "x": [30, 31, 32, 58, 96, 97, 18, 100, 132] }, { "j": [101, 43, 37, 102], "x": [10, 113, 108] }, { "j": [22, 23, 54, 80, 81, 44, 45, 26, 82, 5], "x": [17, 85] }, { "j": [0, 23, 63, 73, 82, 12, 68], "x": [56, 57, 89, 90, 16, 85] }, { "j": [0, 64, 65, 67, 25, 75], "x": [69, 34] }, { "j": [72, 0, 103, 88], "x": [106, 77, 61, 42] }, { "j": [79, 0, 46, 76, 48, 29], "x": [83, 84, 6, 7, 49, 50, 117, 17, 133] }, { "j": [0, 87, 104, 55], "x": [13, 14, 59, 98, 113, 109] }, { "j": [1, 64, 66, 93, 94, 4, 28, 29], "x": [99, 19, 113, 71] }, { "j": [1, 11, 28, 74, 29], "x": [105, 39, 40, 41, 115, 52, 53, 20, 33] }, { "j": [21, 62, 2, 3, 27], "x": [17, 51, 86] }, { "j": [24, 38], "x": [60, 15, 10, 61, 91] }, { "j": [21, 23, 92, 36, 47, 95], "x": [30, 31, 32, 58, 96, 97, 18, 119] }, { "j": [23, 43, 37, 102], "x": [113, 108] }, { "j": [54, 80, 81, 44, 45, 82, 5, 68], "x": [17, 85, 113] }, { "j": [72, 63, 73, 82, 12, 68], "x": [56, 57, 89, 90, 16, 85] }, { "j": [79, 64, 65, 67, 25, 75], "x": [69, 70, 34] }, { "j": [103, 26, 88], "x": [106, 77, 117, 61, 42] }], [{ "j": [35, 21, 0, 47, 76], "x": [59, 39, 40, 41, 77, 17, 52, 53, 19, 34] }, { "j": [0], "x": [83, 84, 58, 98, 51, 42] }, { "j": [0, 1, 103, 28, 48, 29], "x": [60] }, { "j": [0, 1, 64, 65, 93, 94, 73, 28, 55, 29], "x": [99] }, { "j": [0, 23, 62, 66, 75], "x": [56, 17, 112, 71] }, { "j": [78, 72, 23, 24, 80, 81, 2, 3, 88, 74], "x": [96, 97, 10, 61, 114] }, { "j": [79, 36, 102, 68], "x": [89, 90, 15, 33, 86] }, { "j": [22, 43, 104], "x": [30, 31, 32, 91] }, { "j": [92, 54, 37, 26, 4, 82, 95, 68], "x": [106, 16, 17, 85] }, { "j": [63, 44, 45, 25, 26, 11, 82, 68], "x": [106, 16, 17, 85] }, { "j": [35, 21, 26, 27, 5], "x": [105, 57, 13, 14, 18] }, { "j": [87, 64, 67, 46, 38, 12], "x": [49, 50, 69, 61] }, { "j": [47, 76, 29], "x": [59, 39, 40, 41, 77, 8, 129, 17, 52, 53, 19, 109, 34] }, { "j": [122], "x": [83, 84, 58, 98, 51, 42] }, { "j": [1, 23, 103, 28, 48], "x": [60] }, { "j": [78, 72, 0, 1, 23, 64, 65, 93, 94, 73, 28, 55], "x": [99, 10] }, { "j": [79, 0, 62, 66, 75], "x": [56, 17, 71] }, { "j": [0, 22, 24, 80, 81, 2, 3, 88, 74], "x": [96, 97, 61] }, { "j": [0, 36, 102, 26, 68], "x": [89, 90, 15, 33, 86] }, { "j": [0, 43, 26, 104], "x": [30, 31, 32, 109, 91] }, { "j": [35, 21, 92, 54, 37, 26, 4, 82, 95, 68], "x": [106, 16, 17, 110, 85] }, { "j": [63, 44, 45, 25, 26, 11, 82, 68], "x": [6, 7, 20, 85, 108] }, { "j": [27, 5], "x": [105, 57, 13, 14, 18, 70] }, { "j": [87, 64, 67, 46, 38, 12], "x": [49, 50, 69, 107, 129, 61] }, { "j": [23, 47, 76], "x": [59, 39, 40, 41, 77, 17, 52, 53, 19, 34] }, { "j": [78, 72, 23], "x": [83, 84, 58, 98, 51, 10, 42] }, { "j": [79, 1, 103, 28, 48, 29], "x": [60] }, { "j": [1, 22, 64, 65, 93, 94, 73, 28, 55, 29], "x": [99] }, { "j": [62, 66, 75], "x": [56, 17, 71] }, { "j": [24, 80, 81, 2, 3, 88, 74], "x": [96, 97, 61] }, { "j": [35, 21, 111, 36, 102, 26, 68], "x": [89, 90, 15, 33, 86] }, { "j": [43, 26, 104], "x": [30, 31, 32, 91] }, { "j": [92, 54, 37, 4, 82, 95, 68], "x": [106, 16, 17, 85] }, { "j": [63, 44, 45, 25, 11, 82, 68], "x": [6, 7, 20, 85, 108] }, { "j": [23, 26, 27, 5], "x": [105, 57, 13, 14, 18] }, { "j": [78, 72, 23, 87, 64, 67, 46, 38, 12], "x": [49, 50, 69, 10, 61] }, { "j": [79, 47, 76, 29], "x": [59, 39, 40, 41, 77, 17, 52, 53, 19, 34] }, { "j": [22], "x": [83, 84, 58, 98, 51, 42] }, { "j": [1, 103, 28, 48, 29], "x": [60] }, { "j": [1, 64, 65, 93, 94, 73, 28, 55, 29], "x": [99] }, { "j": [35, 21, 62, 66, 75], "x": [56, 17, 110, 71] }, { "j": [24, 80, 81, 2, 3, 88, 74], "x": [96, 97, 61] }, { "j": [36, 102, 68], "x": [89, 90, 15, 33, 86, 134] }, { "j": [43, 104], "x": [30, 31, 32, 113, 91, 116] }, { "j": [23, 92, 54, 37, 26, 4, 82, 95], "x": [106, 16, 17, 85] }, { "j": [78, 72, 0, 23, 63, 44, 45, 25, 11, 82, 68], "x": [6, 7, 20, 10, 85, 108] }, { "j": [79, 0, 27, 5], "x": [105, 57, 13, 14, 18] }, { "j": [0, 22, 87, 64, 67, 46, 38, 12], "x": [49, 50, 69, 61] }, { "j": [0, 47, 76, 29], "x": [59, 39, 40, 41, 77, 117, 17, 52, 53, 19, 34] }, { "j": [0], "x": [83, 84, 58, 98, 51, 113, 109, 42, 135] }, { "j": [35, 21, 1, 103, 28, 48, 29], "x": [60, 113] }, { "j": [1, 64, 65, 93, 94, 73, 28, 55, 29], "x": [115, 99] }, { "j": [62, 66, 75], "x": [56, 17, 70, 71] }, { "j": [24, 80, 81, 2, 3, 88, 74], "x": [96, 97, 61, 100, 114] }, { "j": [101, 23, 36, 102, 26], "x": [89, 90, 15, 33, 86, 134] }, { "j": [78, 72, 23, 43, 104], "x": [30, 31, 32, 10, 113, 91, 116] }, { "j": [79, 92, 54, 37, 4, 82, 95, 68], "x": [106, 16, 17, 85, 113] }, { "j": [22, 63, 44, 45, 25, 11, 82, 68], "x": [6, 7, 20, 85, 108] }, { "j": [26, 27, 5], "x": [105, 57, 13, 14, 18] }, { "j": [87, 64, 67, 46, 38, 12], "x": [49, 50, 69, 117, 61] }], [{ "j": [0, 2, 63, 64, 65, 67, 88, 5], "x": [69] }, { "j": [0, 1, 12], "x": [77, 19] }, { "j": [79, 0, 80, 81, 104, 76, 28, 29], "x": [83, 84, 58, 34] }, { "j": [72, 0, 4, 28, 29], "x": [89, 90, 42, 17, 136] }, { "j": [78, 0, 1, 64, 93, 94, 11, 48], "x": [96, 97, 98, 99, 20] }, { "j": [101, 102, 103, 27, 55], "x": [105, 106, 61] }, { "j": [66, 2, 3, 38, 68], "x": [6, 7, 10, 71] }, { "j": [1, 47, 74], "x": [13, 14, 15, 16, 17] }, { "j": [21, 22, 23, 24], "x": [30, 31, 18, 85, 86] }, { "j": [35, 23, 87, 36, 37, 26, 82, 68], "x": [39, 40, 41, 52, 53, 33, 85, 91] }, { "j": [1, 92, 43, 44, 45, 46, 73, 95], "x": [49, 50, 137, 51] }, { "j": [54, 75], "x": [56, 57, 59, 60, 61, 108] }, { "j": [79, 62, 63, 64, 65, 67, 88, 5, 29], "x": [69, 109] }, { "j": [72, 1, 12], "x": [77, 19] }, { "j": [78, 80, 81, 104, 76, 28], "x": [83, 84, 58] }, { "j": [0, 4, 28], "x": [89, 90, 17, 18, 42] }, { "j": [0, 1, 64, 93, 94, 11, 48], "x": [96, 97, 98, 99, 20, 10, 100] }, { "j": [0, 102, 103, 27, 55], "x": [105, 106, 61] }, { "j": [21, 35, 22, 23, 66, 2, 3, 26, 38, 68], "x": [6, 7, 71] }, { "j": [35, 0, 1, 23, 26, 47, 74], "x": [13, 14, 15, 16, 17, 109] }, { "j": [24, 25, 26, 82, 68], "x": [30, 31, 32, 85, 86] }, { "j": [87, 36, 37, 26, 82, 68], "x": [39, 40, 41, 52, 53, 33, 85, 91] }, { "j": [72, 54, 75], "x": [56, 57, 59, 60, 17, 110, 70, 61, 108] }, { "j": [78, 62, 63, 64, 65, 67, 88, 5], "x": [69] }, { "j": [1, 12], "x": [77, 19] }, { "j": [80, 81, 104], "x": [28, 29] }, { "j": [4, 28, 29], "x": [89, 90, 17, 18, 42] }, { "j": [21, 1, 22, 23, 64, 93, 94, 11, 48], "x": [96, 97, 98, 99, 20] }, { "j": [35, 23, 102, 103, 26, 27, 55], "x": [105, 106, 61] }, { "j": [66, 2, 3, 26, 38, 68], "x": [6, 7, 71] }, { "j": [1, 26, 47], "x": [13, 14, 15, 16, 17] }, { "j": [79, 24, 25, 82, 68], "x": [30, 31, 32, 85, 86] }, { "j": [72, 87, 36, 37, 82, 68], "x": [39, 40, 41, 52, 53, 33, 85, 91] }, { "j": [78, 1, 92, 43, 44, 45, 46, 73, 95], "x": [49, 50, 137, 51] }, { "j": [54, 75], "x": [56, 57, 59, 60, 17, 61, 108] }, { "j": [62, 63, 64, 65, 67, 88, 5, 29], "x": [69, 8, 138, 10] }, { "j": [1, 12], "x": [77, 112, 19] }, { "j": [21, 22, 23, 80, 81, 104, 76, 28, 29], "x": [83, 84, 58, 34] }, { "j": [35, 23, 4, 28, 29], "x": [89, 90, 17, 18, 42] }, { "j": [1, 64, 93, 94, 11, 48], "x": [96, 97, 98, 99, 20, 114] }, { "j": [102, 103, 26, 27, 55], "x": [105, 106, 61] }, { "j": [79, 66, 2, 3, 38, 68], "x": [6, 7, 71] }, { "j": [72, 1, 47, 74], "x": [13, 14, 15, 16, 17, 110, 113] }, { "j": [78, 111, 24, 25, 26], "x": [30, 31, 32, 85, 86] }, { "j": [0, 87, 36, 37, 82, 68], "x": [39, 40, 41, 52, 53, 33, 85, 91] }, { "j": [0, 1, 92, 43, 44, 45, 46, 73, 95], "x": [49, 50, 137, 51, 10] }, { "j": [0, 54, 75], "x": [56, 57, 59, 60, 107, 138, 17, 61, 108] }, { "j": [21, 0, 22, 23, 62, 63, 64, 65, 67, 88, 5, 29], "x": [69] }, { "j": [35, 0, 1, 23, 12], "x": [77, 19, 113, 109] }, { "j": [80, 81, 104, 76, 28, 29], "x": [83, 84, 58, 117, 113, 34] }, { "j": [4, 28, 29], "x": [89, 90, 117, 17, 18, 42, 118] }, { "j": [79, 1, 64, 93, 94, 11, 48], "x": [96, 97, 98, 99, 20] }, { "j": [72, 102, 103, 27, 55], "x": [105, 106, 70, 61] }, { "j": [78, 66, 2, 3, 26, 38], "x": [115, 71] }, { "j": [1, 47, 74], "x": [13, 14, 15, 16, 17, 113] }, { "j": [24, 25, 82, 68], "x": [30, 31, 32, 10, 85, 113, 86, 116] }, { "j": [87, 36, 37, 82, 68], "x": [39, 40, 41, 52, 53, 33, 85, 91] }, { "j": [21, 1, 22, 23, 92, 43, 44, 45, 46, 73, 95], "x": [49, 50, 137, 51] }, { "j": [35, 23, 54, 75], "x": [56, 57, 59, 60, 17, 61, 108] }, { "j": [79, 0, 62, 92, 63, 38, 95], "x": [105, 57, 89, 90, 33] }], [{ "j": [72, 0, 1, 64, 67, 47], "x": [69, 108] }, { "j": [0, 76, 28, 5, 29], "x": [106, 77, 70, 19] }, { "j": [0, 28, 12, 29], "x": [83, 84, 6, 7, 96, 97, 17] }, { "j": [0, 1, 102, 26, 73], "x": [13, 14, 98, 34] }, { "j": [64, 65, 93, 94, 75], "x": [139, 42] }, { "j": [21, 88, 48, 68], "x": [56, 39, 40, 41, 16, 52, 53] }, { "j": [1, 87, 2, 3, 25, 26, 55], "x": [17, 51, 18, 10] }, { "j": [23, 24, 66, 103, 26, 104, 82, 68], "x": [60, 15, 85, 71] }, { "j": [22, 23, 36, 46, 4, 82, 82, 74, 68], "x": [30, 31, 32, 58, 49, 50, 85] }, { "j": [79, 1, 43, 37, 11], "x": [59, 20, 86] }, { "j": [72, 54, 80, 81, 44, 45, 27], "x": [17, 99, 61, 91] }, { "j": [62, 92, 63, 38, 95, 29], "x": [105, 57, 89, 90, 33, 109] }, { "j": [1, 64, 67, 47], "x": [69, 108] }, { "j": [76, 28, 5], "x": [106, 77, 19] }, { "j": [0, 28, 12], "x": [83, 84, 6, 7, 96, 97, 17, 120] }, { "j": [21, 0, 1, 101, 102, 73], "x": [13, 14, 98, 34] }, { "j": [0, 64, 65, 93, 94, 26, 75], "x": [10, 61, 42] }, { "j": [0, 23, 26, 88, 48, 68], "x": [56, 39, 40, 41, 16, 52, 53] }, { "j": [0, 1, 22, 23, 87, 2, 3, 25, 26, 55], "x": [17, 51, 18, 109] }, { "j": [79, 24, 66, 103, 26, 104, 82, 68], "x": [60, 15, 85, 71] }, { "j": [72, 36, 46, 4, 82, 74, 68], "x": [30, 31, 32, 58, 49, 50, 85] }, { "j": [1, 43, 37, 11], "x": [59, 20, 86] }, { "j": [54, 80, 81, 44, 45, 27], "x": [17, 110, 99, 61, 91] }, { "j": [62, 92, 63, 38, 95], "x": [105, 57, 89, 90, 33] }, { "j": [1, 64, 67, 47], "x": [69, 108] }, { "j": [21, 76, 28, 5, 29], "x": [106, 77, 19] }, { "j": [28, 12, 29], "x": [83, 84, 6, 7, 96, 97, 17, 10, 100] }, { "j": [1, 23, 102, 26, 73], "x": [13, 14, 98, 34] }, { "j": [22, 23, 64, 65, 93, 94, 26, 75], "x": [61, 42] }, { "j": [79, 26, 88, 48, 68], "x": [56, 39, 40, 41, 16, 52, 53] }, { "j": [72, 1, 92, 2, 3, 25, 55], "x": [17, 51, 18] }, { "j": [24, 66, 103, 104, 82, 68], "x": [60, 15, 70, 85, 71] }, { "j": [36, 46, 4, 82, 74, 68], "x": [30, 31, 32, 58, 49, 50, 85] }, { "j": [79, 1, 92, 43, 44, 45, 46, 73, 95], "x": [49, 50, 137, 51] }, { "j": [1, 43, 37, 11], "x": [59, 20, 86] }, { "j": [54, 80, 81, 44, 45, 27], "x": [17, 99, 61, 91] }, { "j": [21, 62, 92, 63, 38, 95, 29], "x": [105, 57, 89, 90, 8, 138, 33] }, { "j": [1, 64, 67, 47], "x": [69, 112, 10, 108] }, { "j": [23, 76, 28, 5, 29], "x": [106, 77, 19] }, { "j": [22, 23, 28, 12, 29], "x": [83, 84, 6, 7, 96, 97, 17] }, { "j": [79, 1, 102, 26, 73], "x": [13, 14, 98, 34] }, { "j": [72, 64, 65, 93, 94, 75], "x": [61, 42] }, { "j": [88, 48, 68], "x": [56, 39, 40, 41, 16, 52, 53] }, { "j": [1, 87, 2, 3, 25, 55], "x": [17, 110, 51, 18, 113] }, { "j": [111, 24, 66, 103, 26, 104, 82], "x": [60, 15, 85, 71] }, { "j": [0, 36, 46, 4, 82, 74, 68], "x": [30, 31, 32, 96, 49, 50, 85, 119] }, { "j": [21, 0, 1, 43, 37, 11], "x": [59, 20, 86] }, { "j": [0, 54, 80, 81, 44, 45, 27], "x": [107, 138, 17, 99, 10, 61, 91] }, { "j": [0, 23, 62, 92, 63, 38, 95, 29], "x": [105, 57, 89, 90, 33] }, { "j": [0, 1, 22, 23, 64, 67, 47], "x": [69, 113, 109, 108] }, { "j": [79, 76, 28, 5, 29], "x": [106, 77, 117, 19, 113] }, { "j": [72, 28, 12, 29], "x": [83, 84, 6, 7, 96, 97, 117, 17, 114] }, { "j": [1, 102, 73], "x": [13, 14, 98, 34] }, { "j": [64, 65, 93, 94, 75], "x": [61, 42] }, { "j": [26, 88, 48], "x": [56, 39, 40, 41, 16, 115, 52, 53] }, { "j": [1, 87, 2, 3, 25, 55], "x": [17, 51, 18, 113] }, { "j": [21, 24, 66, 103, 104, 82, 68], "x": [60, 15, 85, 113, 71] }, { "j": [36, 46, 4, 82, 74, 68], "x": [30, 31, 32, 58, 49, 50, 10, 85, 116] }, { "j": [1, 23, 43, 37, 11], "x": [59, 20, 86] }, { "j": [22, 23, 54, 80, 81, 44, 45, 27], "x": [17, 99, 61, 91] }], [{ "j": [0, 62, 63, 140, 45, 75], "x": [6, 7, 99, 19, 86] }, { "j": [0, 1, 88], "x": [56, 57, 13, 14, 91] }, { "j": [35, 21, 0, 92, 64, 65, 67, 28, 95, 29], "x": [96, 97, 69, 52, 53, 123] }, { "j": [0, 102, 104, 28, 29], "x": [39, 40, 41, 77, 17, 108] }, { "j": [0, 1, 26, 4, 76, 5], "x": [83, 84, 98, 112, 51, 33, 10] }, { "j": [87, 11, 12], "x": [60, 16, 20, 61] }, { "j": [22, 64, 93, 94, 25, 26, 27, 68], "x": [34] }, { "j": [78, 72, 1, 26, 38], "x": [105, 58, 17, 70, 42] }, { "j": [79, 23, 24, 80, 81, 2, 3, 46, 47, 82, 48, 68], "x": [49, 50, 85] }, { "j": [23, 36, 82, 55, 68], "x": [59, 89, 90, 15, 85] }, { "j": [1, 43, 66], "x": [30, 31, 32, 71, 124] }, { "j": [54, 37, 103, 73, 74], "x": [106, 17, 18, 61] }, { "j": [35, 21, 62, 63, 44, 45, 75, 29], "x": [6, 7, 99, 19, 109, 86] }, { "j": [1, 88], "x": [56, 57, 13, 14, 91] }, { "j": [92, 64, 65, 67, 28, 95], "x": [96, 97, 69, 52, 53, 10, 123] }, { "j": [0, 102, 104, 28], "x": [39, 40, 41, 77, 17, 108] }, { "j": [0, 1, 22, 26, 4, 76, 5], "x": [83, 84, 98, 51, 33] }, { "j": [78, 72, 0, 87, 26, 11, 12], "x": [60, 16, 20, 61] }, { "j": [79, 0, 23, 64, 93, 94, 25, 26, 27, 68], "x": [34] }, { "j": [0, 1, 23, 26, 38], "x": [105, 58, 17, 109, 42] }, { "j": [24, 80, 81, 2, 3, 46, 47, 82, 48, 68], "x": [49, 50, 85] }, { "j": [36, 82, 55, 68], "x": [59, 89, 90, 15, 85] }, { "j": [35, 21, 1, 43, 66], "x": [30, 31, 32, 71] }, { "j": [54, 37, 103, 73, 74], "x": [106, 17, 110, 18, 61] }, { "j": [62, 63, 44, 45, 75], "x": [6, 7, 99, 19, 10, 86] }, { "j": [1, 88], "x": [56, 57, 13, 14, 91] }, { "j": [22, 92, 64, 65, 67, 28, 95, 29], "x": [96, 97, 69, 52, 53, 125] }, { "j": [78, 72, 101, 102, 26, 104, 28, 29], "x": [39, 40, 41, 77, 17, 108] }, { "j": [79, 1, 23, 26, 4, 76, 5], "x": [83, 84, 98, 51, 33] }, { "j": [23, 87, 26, 11, 12], "x": [60, 16, 20, 61] }, { "j": [64, 93, 94, 25, 27, 68], "x": [34] }, { "j": [1, 38], "x": [105, 58, 17, 42] }, { "j": [35, 21, 24, 80, 81, 2, 3, 46, 47, 82, 48], "x": [49, 50, 85] }, { "j": [36, 82, 55, 68], "x": [59, 89, 90, 15, 85] }, { "j": [1, 43, 66], "x": [30, 31, 32, 10, 71, 119, 141] }, { "j": [54, 37, 103, 73, 74], "x": [106, 17, 18, 61] }, { "j": [22, 62, 63, 44, 45, 75, 29], "x": [6, 7, 8, 138, 99, 19, 86] }, { "j": [78, 72, 1, 45], "x": [56, 57, 13, 14, 70, 91] }, { "j": [79, 23, 92, 64, 65, 67, 28, 95, 29], "x": [96, 97, 69, 52, 53, 126] }, { "j": [23, 102, 26, 104, 28, 29], "x": [39, 40, 41, 77, 17, 108] }, { "j": [1, 4, 76, 5], "x": [83, 84, 98, 51, 33] }, { "j": [87, 11, 12], "x": [60, 16, 20, 61] }, { "j": [35, 21, 64, 93, 94, 25, 27, 68], "x": [34] }, { "j": [1, 38], "x": [105, 58, 17, 110, 113, 42] }, { "j": [111, 24, 80, 81, 2, 3, 46, 47, 82, 48], "x": [49, 50, 10, 85] }, { "j": [0, 36, 82, 55, 68], "x": [59, 89, 90, 15, 85] }, { "j": [0, 1, 21, 43, 66], "x": [30, 31, 32, 71, 116] }, { "j": [78, 72, 0, 54, 37, 103, 73, 74], "x": [106, 107, 138, 17, 18, 61] }, { "j": [79, 0, 23, 62, 63, 44, 45, 75, 29], "x": [6, 7, 99, 19, 86] }, { "j": [0, 1, 23, 88], "x": [56, 57, 13, 14, 113, 109, 91] }, { "j": [92, 64, 65, 67, 28, 95, 29], "x": [96, 97, 69, 117, 52, 53, 113, 123, 114] }, { "j": [102, 104, 28, 29], "x": [39, 40, 41, 77, 117, 17, 108] }, { "j": [35, 21, 1, 4, 76, 5], "x": [83, 84, 98, 51, 33] }, { "j": [87, 11, 12], "x": [60, 16, 20, 61] }, { "j": [64, 93, 94, 25, 26, 27], "x": [115, 10, 34] }, { "j": [1, 38], "x": [105, 58, 17, 113, 42] }, { "j": [22, 24, 80, 81, 2, 3, 46, 47, 82, 48, 68], "x": [49, 50, 85, 113] }, { "j": [78, 72, 36, 82, 55, 68], "x": [59, 89, 90, 15, 85] }, { "j": [79, 1, 23, 43, 66], "x": [30, 31, 32, 71] }, { "j": [23, 54, 37, 103, 73, 74], "x": [106, 17, 18, 61] }], [{ "j": [21, 0, 111, 23, 36, 66, 37, 27], "x": [39, 40, 41, 71] }, { "j": [35, 0, 22, 23, 43, 44, 45, 38, 74], "x": [96, 97, 51, 99, 19, 123] }, { "j": [0, 62, 54, 102, 103, 47, 28, 29], "x": [105, 57, 60, 17, 86] }, { "j": [0, 87, 63, 64, 67, 28, 29], "x": [69, 91] }, { "j": [0, 92, 76, 95], "x": [77, 16, 18] }, { "j": [72, 80, 81, 25, 26, 73], "x": [83, 84, 61, 108] }, { "j": [78, 79, 26, 75, 5, 68], "x": [89, 90, 17] }, { "j": [64, 65, 93, 94, 46, 88, 12], "x": [49, 50, 98, 33] }, { "j": [1, 82, 68], "x": [56, 106, 59, 10, 85, 34] }, { "j": [1, 2, 3, 104, 82, 68], "x": [6, 7, 85, 42] }, { "j": [21, 23, 4, 48], "x": [13, 14, 15, 17, 110] }, { "j": [35, 21, 23, 24, 11, 55], "x": [30, 31, 32, 58, 52, 53, 15, 61] }, { "j": [36, 66, 37, 27, 29], "x": [39, 40, 41, 109, 71] }, { "j": [43, 44, 45, 38, 74], "x": [96, 97, 51, 99, 19, 123] }, { "j": [62, 54, 102, 103, 47, 28], "x": [105, 57, 60, 17, 70, 86] }, { "j": [72, 35, 87, 63, 64, 67, 26, 28], "x": [69, 91] }, { "j": [78, 79, 0, 92, 26, 76, 95], "x": [77, 16, 18] }, { "j": [0, 80, 81, 25, 26, 73], "x": [83, 84, 61, 108] }, { "j": [0, 26, 75, 5, 68], "x": [89, 90, 17, 10] }, { "j": [0, 64, 65, 93, 94, 46, 88, 12], "x": [49, 50, 98, 33, 109] }, { "j": [21, 1, 23, 82, 68], "x": [56, 106, 59, 85, 34] }, { "j": [35, 1, 22, 23, 2, 3, 104, 82, 68], "x": [6, 7, 85, 42] }, { "j": [4, 48], "x": [13, 14, 15, 17] }, { "j": [24, 11, 55], "x": [30, 31, 32, 58, 52, 53, 20, 61] }, { "j": [36, 66, 37, 27], "x": [39, 40, 41, 71, 130] }, { "j": [72, 79, 62, 54, 102, 103, 26, 47, 28, 29], "x": [105, 57, 60, 17, 86] }, { "j": [78, 79, 62, 54, 102, 103, 26, 47, 28, 29], "x": [105, 57, 60, 17, 86] }, { "j": [87, 63, 64, 67, 26, 28, 29], "x": [69, 91] }, { "j": [92, 26, 76, 95], "x": [77, 16, 112, 18, 10] }, { "j": [80, 81, 25, 26, 73], "x": [83, 84, 61, 108] }, { "j": [21, 23, 75, 5, 68], "x": [89, 90, 17] }, { "j": [35, 22, 23, 64, 65, 93, 94, 46, 88, 12], "x": [49, 50, 98, 33] }, { "j": [1, 82, 68], "x": [56, 106, 59, 85, 34] }, { "j": [1, 2, 3, 104, 82, 68], "x": [6, 7, 85, 42] }, { "j": [4, 48], "x": [13, 14, 15, 17, 142] }, { "j": [72, 24, 11, 55], "x": [30, 31, 32, 58, 52, 53, 20, 61, 119, 143] }, { "j": [78, 79, 36, 66, 37, 27, 29], "x": [39, 40, 41, 71] }, { "j": [43, 44, 45, 38, 74], "x": [96, 97, 51, 99, 19, 125] }, { "j": [101, 62, 54, 102, 103, 26, 47, 28, 29], "x": [105, 57, 60, 17, 10, 86] }, { "j": [87, 63, 64, 67, 26, 28, 29], "x": [69, 91] }, { "j": [21, 23, 92, 76, 95], "x": [77, 16, 18] }, { "j": [35, 22, 23, 80, 81, 25, 73], "x": [83, 84, 61, 108] }, { "j": [75, 5, 68], "x": [89, 90, 117, 17] }, { "j": [64, 65, 93, 94, 46, 88, 12], "x": [49, 50, 98, 33, 113] }, { "j": [1, 82], "x": [56, 106, 59, 70, 85, 34] }, { "j": [21, 0, 1, 2, 3, 104, 82, 68], "x": [6, 7, 85, 42] }, { "j": [78, 79, 0, 4, 48], "x": [13, 14, 15, 17] }, { "j": [0, 24, 11, 55], "x": [30, 31, 32, 58, 52, 53, 20, 61] }, { "j": [0, 36, 66, 37, 27, 29], "x": [39, 40, 41, 8, 144, 10, 71, 130] }, { "j": [0, 43, 44, 45, 38, 74], "x": [96, 97, 51, 99, 19, 113, 109, 126, 114] }, { "j": [21, 23, 62, 54, 102, 103, 47, 28, 29], "x": [105, 57, 60, 17, 110, 113, 86] }, { "j": [35, 22, 23, 92, 63, 64, 67, 28, 29], "x": [69, 91] }, { "j": [92, 76, 95], "x": [77, 16, 18] }, { "j": [80, 81, 25, 73], "x": [83, 84, 117, 61, 108, 131] }, { "j": [75, 5], "x": [89, 90, 17] }, { "j": [72, 64, 65, 93, 94, 46, 88, 12], "x": [49, 50, 98, 33, 113] }, { "j": [78, 79, 1, 145, 68], "x": [56, 106, 59, 85, 113, 34] }, { "j": [1, 2, 3, 104, 82, 68], "x": [6, 7, 115, 85, 42] }, { "j": [4, 48], "x": [13, 14, 15, 17, 10] }, { "j": [24, 11, 55], "x": [30, 31, 32, 58, 107, 144, 52, 53, 20, 61, 116] }], [{ "j": [0, 111, 22, 23, 36, 73, 48], "x": [30, 31, 32, 96, 97] }, { "j": [0, 23, 87, 43, 37], "x": [102, 75, 55] }, { "j": [79, 0, 62, 54, 80, 81, 66, 44, 45, 88, 28, 29], "x": [17, 19, 71] }, { "j": [72, 0, 63, 26, 28, 74, 29], "x": [56, 57, 90, 16] }, { "j": [0, 64, 65, 67, 25, 104], "x": [69, 86] }, { "j": [103, 26, 4], "x": [106, 77, 61, 91] }, { "j": [103, 46, 11, 76, 95, 68], "x": [83, 84, 6, 7, 49, 50, 17, 20] }, { "j": [27], "x": [13, 14, 59, 98, 108] }, { "j": [21, 1, 64, 93, 94, 38, 82, 5, 68], "x": [52, 53, 18, 99, 85] }, { "j": [1, 47, 82, 12, 68], "x": [105, 39, 40, 41, 10, 85] }, { "j": [22, 23, 2, 3], "x": [17, 110, 51, 33, 34] }, { "j": [23, 24], "x": [60, 15, 61, 42] }, { "j": [79, 36, 73, 48, 29], "x": [30, 31, 32, 96, 97, 109] }, { "j": [72, 87, 43, 37], "x": [102, 26, 75, 55] }, { "j": [62, 54, 80, 81, 66, 44, 45, 88, 28], "x": [17, 19, 71] }, { "j": [0, 63, 26, 28, 74], "x": [56, 57, 58, 89, 90, 16] }, { "j": [0, 64, 65, 67, 25, 26, 104], "x": [69, 86] }, { "j": [0, 103, 26, 4], "x": [106, 77, 61, 91] }, { "j": [21, 0, 92, 46, 11, 76, 95, 68], "x": [83, 84, 6, 7, 49, 50, 17, 20] }, { "j": [0, 27], "x": [13, 14, 59, 98, 10, 109, 108] }, { "j": [1, 22, 23, 64, 93, 94, 38, 82, 5, 68], "x": [52, 53, 18, 99, 85] }, { "j": [1, 23, 47, 82, 12, 68], "x": [105, 39, 40, 41, 85] }, { "j": [79, 2, 3], "x": [17, 51, 33, 34] }, { "j": [72, 24], "x": [60, 15, 61, 42] }, { "j": [36, 73, 48], "x": [30, 77, 32, 96, 97, 119] }, { "j": [87, 43, 37], "x": [102, 26, 75, 55] }, { "j": [62, 54, 80, 81, 66, 44, 45, 26, 88, 28, 29], "x": [17, 19, 71] }, { "j": [63, 26, 28, 74, 29], "x": [56, 57, 58, 89, 90, 16, 70] }, { "j": [21, 64, 65, 67, 25, 26, 104], "x": [69, 112, 86] }, { "j": [103, 4], "x": [106, 77, 10, 61, 91] }, { "j": [22, 23, 92, 46, 11, 146, 95, 68], "x": [83, 84, 6, 7, 49, 50, 17, 20] }, { "j": [23, 27], "x": [13, 14, 59, 98, 108] }, { "j": [79, 1, 64, 93, 94, 38, 82, 5, 68], "x": [52, 53, 18, 99, 85] }, { "j": [72, 1, 47, 82, 12, 68], "x": [105, 39, 40, 41, 85] }, { "j": [2, 3], "x": [17, 51, 33, 34] }, { "j": [24], "x": [60, 15, 61, 42] }, { "j": [36, 73, 48, 29], "x": [30, 31, 18, 96, 97] }, { "j": [87, 43, 37, 102, 26, 75, 55], "x": [147] }, { "j": [21, 62, 54, 80, 81, 66, 44, 45, 26, 88, 28, 29], "x": [17, 19, 71] }, { "j": [63, 28, 74, 29], "x": [56, 57, 58, 89, 90, 16, 10] }, { "j": [22, 23, 64, 65, 67, 25, 104], "x": [69, 86] }, { "j": [23, 103, 4], "x": [106, 77, 61, 91] }, { "j": [79, 92, 46, 11, 76, 95, 68], "x": [83, 84, 6, 7, 49, 50, 117, 17, 20, 133] }, { "j": [72, 27], "x": [13, 14, 59, 98, 113, 108] }, { "j": [1, 64, 93, 94, 38, 82, 5], "x": [52, 53, 18, 99, 85] }, { "j": [0, 1, 47, 82, 12, 68], "x": [105, 39, 40, 41, 85] }, { "j": [0, 2, 3], "x": [17, 51, 33, 34] }, { "j": [0, 24], "x": [60, 15, 61, 42] }, { "j": [21, 0, 36, 73, 48, 29], "x": [30, 31, 32, 96, 97, 8, 144, 100, 132] }, { "j": [0, 101, 87, 43, 37, 102, 75, 55], "x": [10, 113, 109] }, { "j": [22, 23, 62, 54, 80, 81, 66, 44, 45, 88, 28, 29], "x": [17, 110, 19, 113, 71] }, { "j": [23, 63, 28, 74, 29], "x": [56, 57, 58, 89, 90, 16] }, { "j": [79, 64, 65, 67, 25, 104], "x": [69, 86] }, { "j": [72, 103, 26, 4], "x": [106, 77, 117, 61, 91] }, { "j": [92, 46, 11, 76, 95], "x": [83, 84, 6, 7, 49, 50, 17, 20] }, { "j": [27], "x": [13, 14, 59, 98, 113, 108] }, { "j": [1, 64, 93, 94, 38, 82, 5, 68], "x": [52, 53, 18, 99, 85, 113] }, { "j": [1, 47, 82, 12, 68], "x": [105, 39, 40, 41, 115, 70, 85] }, { "j": [21, 2, 3], "x": [17, 51, 33, 34] }, { "j": [24], "x": [60, 15, 107, 144, 10, 61, 42] }], [{ "j": [79, 0, 111, 101, 23, 36, 102, 11], "x": [89, 90, 15, 18, 19, 20, 34] }, { "j": [78, 72, 0, 23, 43, 27], "x": [30, 31, 32, 33, 42] }, { "j": [0, 21, 54, 37, 26, 38, 28, 48, 29], "x": [106, 16, 17] }, { "j": [0, 63, 44, 45, 25, 26, 48, 28, 55, 29], "x": [6, 7] }, { "j": [0, 66], "x": [105, 57, 13, 14, 112, 71] }, { "j": [64, 67, 46, 74], "x": [49, 50, 69, 52, 53, 10, 61] }, { "j": [35, 21, 73, 76, 68], "x": [59, 39, 40, 41, 77, 17, 86] }, { "j": [22, 75], "x": [83, 84, 98, 51, 91] }, { "j": [1, 92, 103, 88, 82, 95, 68], "x": [60, 85] }, { "j": [1, 64, 65, 93, 94, 82, 68], "x": [70, 99, 85, 108] }, { "j": [79, 23, 104, 5], "x": [56, 58, 17, 110] }, { "j": [78, 72, 23, 87, 24, 80, 81, 2, 3, 4, 12], "x": [96, 97, 61] }, { "j": [36, 102, 26, 11, 29], "x": [89, 90, 15, 18, 19, 20, 109, 34] }, { "j": [43, 26, 27], "x": [30, 31, 32, 33, 42] }, { "j": [62, 54, 37, 74, 28, 48], "x": [106, 16, 17] }, { "j": [0, 63, 44, 45, 25, 26, 47, 28, 55], "x": [6, 7, 10] }, { "j": [35, 21, 0, 66, 26], "x": [105, 57, 13, 14, 71] }, { "j": [0, 22, 64, 67, 46, 74], "x": [49, 50, 69, 52, 53, 61] }, { "j": [0, 73, 76, 68], "x": [59, 39, 40, 41, 77, 17, 86] }, { "j": [0, 75], "x": [83, 84, 98, 51, 109, 91] }, { "j": [79, 1, 23, 92, 103, 3, 82, 95, 68], "x": [60, 85] }, { "j": [78, 72, 1, 23, 64, 65, 93, 94, 82, 68], "x": [99, 85, 108] }, { "j": [104, 5], "x": [56, 58, 17] }, { "j": [87, 24, 80, 81, 67, 3, 4, 12], "x": [96, 97, 61] }, { "j": [36, 102, 11], "x": [89, 90, 15, 18, 19, 20, 34, 134] }, { "j": [43, 26, 27], "x": [30, 31, 32, 33, 10, 42] }, { "j": [35, 21, 62, 54, 37, 26, 38, 28, 48], "x": [106, 16, 17] }, { "j": [22, 63, 44, 45, 25, 26, 47, 28, 55, 29], "x": [6, 7] }, { "j": [66], "x": [105, 57, 13, 14, 71] }, { "j": [64, 87, 46, 74], "x": [49, 50, 69, 52, 53, 61] }, { "j": [79, 23, 73, 76, 68], "x": [59, 39, 40, 41, 77, 17, 86] }, { "j": [78, 72, 23, 75], "x": [83, 84, 98, 51, 91] }, { "j": [1, 92, 103, 88, 82, 95, 68], "x": [60, 85] }, { "j": [1, 64, 65, 93, 94, 82, 68], "x": [99, 85, 108] }, { "j": [104, 5], "x": [56, 58, 17] }, { "j": [87, 24, 80, 81, 2, 3, 4, 12], "x": [96, 97, 10, 61] }, { "j": [35, 21, 36, 102, 26, 11, 29], "x": [89, 90, 15, 18, 19, 20, 34] }, { "j": [22, 43, 26, 27], "x": [30, 31, 32, 33, 42] }, { "j": [62, 54, 37, 38, 28, 48, 29], "x": [106, 16, 17] }, { "j": [63, 44, 45, 25, 47, 28, 55, 29], "x": [6, 7] }, { "j": [79, 23, 66], "x": [105, 90, 13, 14, 71] }, { "j": [78, 72, 23, 64, 67, 46, 74], "x": [49, 50, 69, 52, 53, 61] }, { "j": [73, 76, 68], "x": [59, 39, 40, 41, 77, 117, 17, 86] }, { "j": [75], "x": [83, 84, 98, 51, 113, 91, 148] }, { "j": [1, 92, 103, 88, 82, 95], "x": [60, 85] }, { "j": [0, 1, 64, 65, 93, 94, 82, 68], "x": [99, 10, 85, 108] }, { "j": [35, 21, 0, 104, 5], "x": [56, 58, 17] }, { "j": [0, 22, 87, 24, 80, 81, 2, 3, 4, 12], "x": [96, 97, 61] }, { "j": [0, 36, 102, 11], "x": [89, 90, 15, 8, 144, 18, 19, 20, 34, 134] }, { "j": [0, 43, 27], "x": [30, 31, 32, 33, 113, 109, 42, 116] }, { "j": [79, 23, 62, 54, 37, 38, 28, 48, 29], "x": [106, 16, 17, 110, 113] }, { "j": [78, 72, 23, 63, 44, 45, 25, 47, 28, 55, 29], "x": [6, 7, 70] }, { "j": [66, 26], "x": [105, 57, 13, 14, 71] }, { "j": [64, 67, 46, 74], "x": [49, 50, 69, 117, 52, 53, 61] }, { "j": [73, 76], "x": [59, 39, 40, 41, 77, 17, 86] }, { "j": [75], "x": [83, 84, 98, 51, 10, 113, 91] }, { "j": [35, 21, 1, 92, 103, 88, 82, 95, 68], "x": [60, 85, 113] }, { "j": [1, 22, 64, 65, 93, 94, 82, 68], "x": [115, 99, 85, 108] }, { "j": [104, 5], "x": [56, 58, 17] }, { "j": [87, 24, 80, 81, 2, 3, 4, 12], "x": [96, 97, 107, 144, 61, 100, 114] }]];
/**获取黄历宜忌数据
 * @param month_gz 農曆月干支
 * @param day_gz   農曆日干支
 * @return result.y 宜，result.j 忌
 * */
function getAlmanacYiJi(month_gz, day_gz) {
    var jx = (day_gz - (month_gz - 2) % 12) % 12;
    var gz = day_gz % 60;
    var resultNum = huangliData[jx][gz];
    var yi = "",
        ji = "";
    var yiArray = resultNum.y;
    for (var num = 0; num < yiArray.length; num++) {
        if (num > 0) {
            yi += " ";
        }
        yi += huangliWords[yiArray[num]];
    }
    var jiArray = resultNum.j;
    for (var num = 0; num < jiArray.length; num++) {
        if (num > 0) {
            ji += " ";
        }
        ji += huangliWords[jiArray[num]];
    }
    return { "y": yi, "j": ji };
}
/**获取吉神宜趋和凶神宜忌数据
 * @param month_gz 農曆月份(1-12)。
 * @param day_gz   農曆日干支
 * @return result.j 吉神宜趋，result.x 凶神宜忌
 * */
function getAlmanacJiXiong(month_gz, day_gz) {
    var jx = (month_gz + 10) % 12;
    var gz = day_gz % 60;
    var resultNum = huangliJXData[jx][gz];
    var ji = "",
        xiong = "";
    var jiArray = resultNum.j;
    for (var num = 0; num < jiArray.length; num++) {
        if (num > 0) {
            ji += " ";
        }
        ji += huangliJXWords[jiArray[num]];
    }
    var xiongArray = resultNum.x;
    for (var num = 0; num < xiongArray.length; num++) {
        if (num > 0) {
            xiong += " ";
        }
        xiong += huangliJXWords[xiongArray[num]];
    }
    return { "j": ji, "x": xiong };
}

/**
 * 获取五行数据
 * @param day_gz   農曆日干支
 * @return 五行字符串
 */
function getAlmanacWuXing(day_gz) {
    var wuxing = ["土", "木", "金", "水", "火"];
    var nayin = ["海中", "炉中", "大林", "路旁", "剑锋", "山头", "涧下", "城头", "白蜡", "杨柳", "井泉", "屋上", "霹雳", "松柏", "长流", "沙石", "山下", "平地", "壁上", "金箔", "覆灯", "天河", "大驿", "钗钏", "桑拓", "大溪", "沙中", "天上", "石榴", "大海"];
    var gan = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    var zhi = [1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3];
    var gzs = (gan[day_gz % 10] + zhi[day_gz % 12]) % 5;
    return nayin[parseInt(day_gz % 60 / 2)] + wuxing[gzs];
}
/**
 * 获取冲煞数据
 * @param day_gz   農曆日干支
 * @return 冲煞字符串
 */
function getAlmanacChongSha(day_gz) {
    var shu = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var fang = ["东", "北", "西", "南"];
    return "冲" + shu[(day_gz + 6) % 12] + " " + "煞" + fang[(day_gz + 3) % 4];
}

/**
 * 获取十二值神
 * 历家以建、除、满、平、定、执、破、危、成、收、开、闭凡十二日周而复始观其所值，以定吉凶。
 * 每月交节则叠两值日，其法以月建上起建，与斗杓所指相应，如正月建寅，则在寅日上起建，顺行十二辰是也。
 * @param month_gz 農曆月干支
 * @param day_gz   農曆日干支
 * @return 十二值神字符串
 * */
function getAlmanacShiErZhiShen(month_gz, day_gz) {
    var jianxing = ["青龙", "明堂", "天刑", "朱雀", "金匮", "天德", "白虎", "玉堂", "天牢", "玄武", "司命", "勾陈"];
    return jianxing[(4 + day_gz - month_gz % 60 * 2) % 12];
}
/**
 * 获取建除十二神
 * @param month_gz 農曆月干支
 * @param day_gz   農曆日干支
 * @return 建除十二神字符串
 * */
function getAlmanacJianChuShiErShen(month_gz, day_gz) {
    var jianxing = ["开", "闭", "建", "除", "满", "平", "定", "执", "破", "危", "成", "收"];
    return jianxing[(day_gz - (month_gz - 2) % 12) % 12] + "日";
}
/**
 * 获取二十八星宿
 * @param day_gz   農曆日干支
 * @return 对应的星宿
 * */
function getAlmanacXingXiu(day_gz) {
    var xingXiuArray = ["角木蛟", "亢金龙", "氐土貉", "房日兔", "心月狐", "尾火虎", "箕水豹", "斗木獬", "牛金牛", "女土蝠", "虚日鼠", "危月燕", "室火猪", "壁水蝓", "奎木狼", "娄金狗", "胃土雉", "昴日鸡", "毕月乌", "觜火猴", "参水猿", "井木犴", "鬼金羊", "柳土獐", "星日马", "张月鹿", "翼火蛇", "轸水蚓"];
    return xingXiuArray[(day_gz - 6) % 28];
}
/**
 * 获取彭祖百忌
 * @param day_gz   農曆日干支
 * @return 对应的彭祖百忌
 */
function getAlmanacPengZu(day_gz) {
    var gan = ["甲不开仓财物耗散", "乙不栽植千株不长", "丙不修灶必见灾殃", "丁不剃头头必生疮", "戊不受田田主不祥", "己不破券二比并亡", "庚不经络织机虚张", "辛不合酱主人不尝", "壬不汲水更难提防", "癸不词讼理弱敌强"];
    var zhi = ["子不问卜自惹祸殃", "醜不冠带主不还乡", "寅不祭祀神鬼不尝", "卯不穿井水泉不香", "辰不哭泣必主重丧", "巳不远行财物伏藏", "午不苫盖屋主更张", "未不服药毒气入肠", "申不安床鬼祟入房", "酉不宴客醉坐颠狂", "戌不吃犬作怪上床", "亥不嫁娶不利新郎"];
    return gan[day_gz % 10] + " " + zhi[day_gz % 12];
}
/**
 * 获取胎神
 * @param day_gz   農曆日干支
 * @return 对应的胎神信息
 */
function getAlmanacTaiShen(day_gz) {
    var gan = ["占门", "碓磨", "厨灶", "仓库", "房床"];
    var zhi = ["碓", "厕", "炉", "门", "栖", "床"];
    var banfang = day_gz % 60;
    var bfang;
    if (banfang < 2) {
        bfang = "外东南";
    } else if (banfang < 7) {
        bfang = "外正南";
    } else if (banfang < 14) {
        bfang = "外西南";
    } else if (banfang < 16) {
        bfang = "外正南";
    } else if (banfang < 18) {
        bfang = "外正西";
    } else if (banfang < 24) {
        bfang = "外西北";
    } else if (banfang < 29) {
        bfang = "外正北";
    } else if (banfang < 34) {
        bfang = "房内北";
    } else if (banfang < 40) {
        bfang = "房内南";
    } else if (banfang < 45) {
        bfang = "房内东";
    } else if (banfang < 51) {
        bfang = "外东北";
    } else if (banfang < 56) {
        bfang = "外正东";
    } else {
        bfang = "外东南";
    }
    var weizhi = gan[day_gz % 5] + zhi[day_gz % 6];
    if (weizhi == "占门门") {
        weizhi = "占大门";
    } else if (weizhi == "碓磨碓") {
        weizhi = "占碓磨";
    } else if (weizhi == "房床床") {
        weizhi = "占房床";
    } else if (weizhi == "占门栖") {
        weizhi = "门鸡栖";
    }
    return weizhi + bfang;
}
/**
 * 获取诸神方位信息
 * @param day_gz   農曆日干支
 * @return 对应的诸神方位信息
 */
function getAlmanacZhuShenFangWei(day_gz) {
    var shen = ["财神", "喜神", "福神", "阳贵", "阴贵"];
    var tnum = day_gz % 10;
    var fangwei1 = ["东北", "西南", "正西", "正西", "正北", "正北", "正东", "正东", "正南", "正南"]; // 财神
    var fangwei2 = ["东北", "西北", "西南", "正南", "东南", "东北", "西北", "西南", "正南", "东南"]; // 喜神
    var fangwei3 = ["正北", "西南", "西北", "东南", "东北", "正北", "西南", "西北", "东南", "东北"]; // 福神
    var fangwei4 = ["西南", "西南", "正西", "西北", "东北", "正北", "东北", "东北", "正东", "东南"]; // 阳贵
    return shen[0] + "—" + fangwei1[tnum] + " " + shen[1] + "—" + fangwei2[tnum] + " " + shen[2] + "—" + fangwei3[tnum] + " " + shen[3] + "—" + fangwei4[tnum];
}

/**
 * 获取一天的時辰干支和吉凶信息
 * @param day_gz   農曆日干支
 * @return result[0]--result[11],子時到亥時的干支及吉凶信息
 * */
function getAlmanacShiChen(date_gz) {
    var result = ["", "", "", "", "", "", "", "", "", "", "", ""];
    var Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    var Zhi = ["子", "醜", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    var jx = ["凶", "吉"];
    var num = date_gz % 10;
    /**時辰吉凶*/
    var jiXiong = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    switch (date_gz % 12) {
        case 0:
        case 6:
            jiXiong = [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0];
            break;
        case 1:
        case 7:
            jiXiong = [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1];
            break;
        case 2:
        case 8:
            jiXiong = [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0];
            break;
        case 3:
        case 9:
            jiXiong = [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0];
            break;
        case 4:
        case 10:
            jiXiong = [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];
            break;
        case 5:
        case 11:
            jiXiong = [0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1];
            break;
    }

    if (num == 0 || num == 5) {
        //甲日 己日
        for (var i = 0; i < 12; i++) {
            result[i] = Gan[i % 10] + Zhi[i % 12] + jx[jiXiong[i]];
        };
    } else if (num == 1 || num == 6) {
        //乙日 庚日
        for (var i = 0; i < 12; i++) {
            var d = 12 + i;
            result[i] = Gan[d % 10] + Zhi[d % 12] + jx[jiXiong[i]];
        };
    } else if (num == 2 || num == 7) {
        //丙日 辛日
        for (var i = 0; i < 12; i++) {
            var d = 24 + i;
            result[i] = Gan[d % 10] + Zhi[d % 12] + jx[jiXiong[i]];
        };
    } else if (num == 3 || num == 8) {
        //丁日 壬日
        for (var i = 0; i < 12; i++) {
            var d = 36 + i;
            result[i] = Gan[d % 10] + Zhi[d % 12] + jx[jiXiong[i]];
        };
    } else if (num == 4 || num == 9) {
        //乙日
        for (var i = 0; i < 12; i++) {
            var d = 48 + i;
            result[i] = Gan[d % 10] + Zhi[d % 12] + jx[jiXiong[i]];
        };
    };
    return result;
};

exports.default = {
    /**获取黄历宜忌数据
     * @param month_gz 農曆月干支
     * @param day_gz   農曆日干支
     * @return result.y 宜，result.j 忌
     * */
    getAlmanacYiJi: getAlmanacYiJi,
    /**获取吉神宜趋和凶神宜忌数据
     * @param month_nongli 農曆月份(1-12)。
     * @param day_gz   農曆日干支
     * @return result.y 吉神宜趋，result.x 凶神宜忌
     * */
    getAlmanacJiXiong: getAlmanacJiXiong,
    /**
     * 获取五行数据
     * @param day_gz   農曆日干支
     * @return 五行字符串
     */
    getAlmanacWuXing: getAlmanacWuXing,
    /**
     * 获取冲煞数据
     * @param day_gz   農曆日干支
     * @return 冲煞字符串
     */
    getAlmanacChongSha: getAlmanacChongSha,
    /**
     * 获取十二值神
     * @param month_gz 農曆月干支
     * @param day_gz   農曆日干支
     * @return 十二值神字符串
     * */
    getAlmanacShiErZhiShen: getAlmanacShiErZhiShen,
    /**
     * 获取建除十二神
     * @param month_gz 農曆月干支
     * @param day_gz   農曆日干支
     * @return 建除十二神字符串
     * */
    getAlmanacJianChuShiErShen: getAlmanacJianChuShiErShen,
    /**
     * 获取二十八星宿
     * @param day_gz   農曆日干支
     * @return 对应的星宿
     * */
    getAlmanacXingXiu: getAlmanacXingXiu,
    /**
     * 获取彭祖百忌
     * @param day_gz   農曆日干支
     * @return 对应的彭祖百忌
     */
    getAlmanacPengZu: getAlmanacPengZu,
    /**
     * 获取胎神
     * @param day_gz   農曆日干支
     * @return 对应的胎神信息
     */
    getAlmanacTaiShen: getAlmanacTaiShen,
    /**
     * 获取诸神方位信息
     * @param day_gz   農曆日干支
     * @return 对应的诸神方位信息
     */
    getAlmanacZhuShenFangWei: getAlmanacZhuShenFangWei,
    /**
     * 获取一天的時辰干支和吉凶信息
     * @param day_gz   農曆日干支
     * @return result[0]--result[11],子時到亥時的干支及吉凶信息
     * */
    getAlmanacShiChen: getAlmanacShiChen
};

/***/ }),
/* 827 */,
/* 828 */,
/* 829 */,
/* 830 */,
/* 831 */,
/* 832 */,
/* 833 */,
/* 834 */,
/* 835 */,
/* 836 */,
/* 837 */,
/* 838 */,
/* 839 */,
/* 840 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _marriage_measure_overseas = __webpack_require__(718);

var _marriage_measure_overseas2 = _interopRequireDefault(_marriage_measure_overseas);

var _marriage_measure_overseas3 = __webpack_require__(702);

var _marriage_measure_overseas4 = _interopRequireDefault(_marriage_measure_overseas3);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _fastclick = __webpack_require__(17);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _vueResource = __webpack_require__(223);

var _vueResource2 = _interopRequireDefault(_vueResource);

var _mintUi = __webpack_require__(4);

var _mintUi2 = _interopRequireDefault(_mintUi);

__webpack_require__(67);

var _vueI18n = __webpack_require__(109);

var _vueI18n2 = _interopRequireDefault(_vueI18n);

var _vant = __webpack_require__(65);

__webpack_require__(108);

var _cn = __webpack_require__(690);

var _cn2 = _interopRequireDefault(_cn);

var _tw = __webpack_require__(691);

var _tw2 = _interopRequireDefault(_tw);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vant.Swipe); /*
                                 * @Author: wujiang@weli.cn
                                 * @Date: 2023-10-18 11:45:29
                                 * @LastEditors: wujiang
                                 * @LastEditTime: 2024-05-22 18:10:16
                                 * @Description:八字合婚
                                 */

_vue2.default.use(_vant.SwipeItem);

_vue2.default.use(_vueI18n2.default);
_vue2.default.use(_mintUi2.default);
_vue2.default.use(_vueResource2.default);

_fastclick2.default.prototype.focus = function (targetElement) {
  var length;
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    // 修复不弹出键盘，令其强制弹出键盘
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    _fastclick2.default.attach(document.body);
  }, false);
}

var language = _utils2.default.getLanguage('language');
var _enum = {
  'zh-CN': 'cn',
  'zh-TW': 'tw'
};
var _locale = _enum[language];

var i18n = new _vueI18n2.default({
  locale: _locale, // 设置地区
  messages: {
    cn: _cn2.default,
    tw: _tw2.default
  } // 设置地区信息
});

_vue2.default.config.productionTip = false;

new _vue2.default({
  el: '#app',
  router: _marriage_measure_overseas4.default,
  store: _index2.default,
  i18n: i18n,
  template: '<App/>',
  components: { App: _marriage_measure_overseas2.default }
});

/***/ }),
/* 841 */,
/* 842 */,
/* 843 */,
/* 844 */,
/* 845 */,
/* 846 */,
/* 847 */,
/* 848 */,
/* 849 */,
/* 850 */,
/* 851 */,
/* 852 */,
/* 853 */,
/* 854 */,
/* 855 */,
/* 856 */,
/* 857 */,
/* 858 */,
/* 859 */,
/* 860 */,
/* 861 */,
/* 862 */,
/* 863 */,
/* 864 */,
/* 865 */,
/* 866 */,
/* 867 */,
/* 868 */,
/* 869 */,
/* 870 */,
/* 871 */,
/* 872 */,
/* 873 */,
/* 874 */,
/* 875 */,
/* 876 */,
/* 877 */,
/* 878 */,
/* 879 */,
/* 880 */,
/* 881 */,
/* 882 */,
/* 883 */,
/* 884 */,
/* 885 */,
/* 886 */,
/* 887 */,
/* 888 */,
/* 889 */,
/* 890 */,
/* 891 */,
/* 892 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 893 */,
/* 894 */,
/* 895 */,
/* 896 */,
/* 897 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 898 */,
/* 899 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 900 */,
/* 901 */,
/* 902 */,
/* 903 */,
/* 904 */,
/* 905 */,
/* 906 */,
/* 907 */,
/* 908 */,
/* 909 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 910 */,
/* 911 */,
/* 912 */,
/* 913 */,
/* 914 */,
/* 915 */,
/* 916 */,
/* 917 */,
/* 918 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 919 */,
/* 920 */,
/* 921 */,
/* 922 */,
/* 923 */,
/* 924 */,
/* 925 */,
/* 926 */,
/* 927 */,
/* 928 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 929 */,
/* 930 */,
/* 931 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 932 */,
/* 933 */,
/* 934 */,
/* 935 */,
/* 936 */,
/* 937 */,
/* 938 */,
/* 939 */,
/* 940 */,
/* 941 */,
/* 942 */,
/* 943 */,
/* 944 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 945 */,
/* 946 */,
/* 947 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 948 */,
/* 949 */,
/* 950 */,
/* 951 */,
/* 952 */,
/* 953 */,
/* 954 */,
/* 955 */,
/* 956 */,
/* 957 */,
/* 958 */,
/* 959 */,
/* 960 */,
/* 961 */,
/* 962 */,
/* 963 */,
/* 964 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 965 */,
/* 966 */,
/* 967 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 968 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 969 */,
/* 970 */,
/* 971 */,
/* 972 */,
/* 973 */,
/* 974 */,
/* 975 */,
/* 976 */,
/* 977 */,
/* 978 */,
/* 979 */,
/* 980 */,
/* 981 */,
/* 982 */,
/* 983 */,
/* 984 */,
/* 985 */,
/* 986 */,
/* 987 */,
/* 988 */,
/* 989 */,
/* 990 */,
/* 991 */,
/* 992 */,
/* 993 */,
/* 994 */,
/* 995 */,
/* 996 */,
/* 997 */,
/* 998 */,
/* 999 */,
/* 1000 */,
/* 1001 */,
/* 1002 */,
/* 1003 */,
/* 1004 */,
/* 1005 */,
/* 1006 */,
/* 1007 */,
/* 1008 */,
/* 1009 */,
/* 1010 */,
/* 1011 */,
/* 1012 */,
/* 1013 */,
/* 1014 */,
/* 1015 */,
/* 1016 */,
/* 1017 */,
/* 1018 */,
/* 1019 */,
/* 1020 */,
/* 1021 */,
/* 1022 */,
/* 1023 */,
/* 1024 */,
/* 1025 */,
/* 1026 */,
/* 1027 */,
/* 1028 */,
/* 1029 */,
/* 1030 */,
/* 1031 */,
/* 1032 */,
/* 1033 */,
/* 1034 */,
/* 1035 */,
/* 1036 */,
/* 1037 */,
/* 1038 */,
/* 1039 */,
/* 1040 */,
/* 1041 */,
/* 1042 */,
/* 1043 */,
/* 1044 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_btn1.2322d34.png";

/***/ }),
/* 1045 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/fman-icon.9517828.png";

/***/ }),
/* 1046 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_title.f1b20b2.png";

/***/ }),
/* 1047 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/man-icon.af2719b.png";

/***/ }),
/* 1048 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_btn1.eacad71.png";

/***/ }),
/* 1049 */,
/* 1050 */,
/* 1051 */,
/* 1052 */,
/* 1053 */,
/* 1054 */,
/* 1055 */,
/* 1056 */,
/* 1057 */,
/* 1058 */,
/* 1059 */,
/* 1060 */,
/* 1061 */,
/* 1062 */,
/* 1063 */,
/* 1064 */,
/* 1065 */,
/* 1066 */,
/* 1067 */,
/* 1068 */,
/* 1069 */,
/* 1070 */,
/* 1071 */,
/* 1072 */,
/* 1073 */,
/* 1074 */,
/* 1075 */,
/* 1076 */,
/* 1077 */,
/* 1078 */,
/* 1079 */,
/* 1080 */,
/* 1081 */,
/* 1082 */,
/* 1083 */,
/* 1084 */,
/* 1085 */,
/* 1086 */,
/* 1087 */,
/* 1088 */,
/* 1089 */,
/* 1090 */,
/* 1091 */,
/* 1092 */,
/* 1093 */,
/* 1094 */,
/* 1095 */,
/* 1096 */,
/* 1097 */,
/* 1098 */,
/* 1099 */,
/* 1100 */,
/* 1101 */,
/* 1102 */,
/* 1103 */,
/* 1104 */,
/* 1105 */,
/* 1106 */,
/* 1107 */,
/* 1108 */,
/* 1109 */,
/* 1110 */,
/* 1111 */,
/* 1112 */,
/* 1113 */,
/* 1114 */,
/* 1115 */,
/* 1116 */,
/* 1117 */,
/* 1118 */,
/* 1119 */,
/* 1120 */,
/* 1121 */,
/* 1122 */,
/* 1123 */,
/* 1124 */,
/* 1125 */,
/* 1126 */,
/* 1127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/detail_header.53af2d3.jpg";

/***/ }),
/* 1128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/top_banner.ed67e07.jpg";

/***/ }),
/* 1129 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAABEVBMVEUAAAAAAAAAAACqqqoAAAAAAAABAQEAAACFhYUAAAAAAAC1tbUAAABDQ0NJSUkAAAB5eXkAAAAAAACqqqoAAAABAQG9vb1kZGS2trYxMTFXV1eBgYEWFhYNDQ2jo6MAAAAAAAAAAAC2trYAAACSkpIAAAC3t7cAAAC5ublcXFxxcXEAAACysrKurq4mJiaQkJBsbGyJiYl8fHyIiIhDQ0M1NTW7u7uVlZUeHh4SEhKkpKSGhoZ+fn6np6ednZ0mJiY3NzeTk5NjY2PHx8cAAAB1dXWqqqp3d3fGxsafn58ZGRm2trZgYGBERES9vb1xcXF5eXmAgICUlJShoaGbm5uOjo6MjIyIiIiwsLClpaU/Pz+kx7H/AAAAT3RSTlMAHDD+aw/nC/6xmUAnH/24pI5iVVVBK/78+/f19PLf2s/GxKJ3dF1NTEo6OTUY+PHu7erh29vZ0M3HxsW+sJeUko+PiYN+dnJramdmXTIicLzHvgAAAStJREFUKM91j9WOwzAURGM7SRsoM9OWtl1mZobawXb//0P2uqqqWKrPm+/xjDRKlOKOIuPpXWZip12Z2i6XExJ1O59vSfqahFxK+shiQTY3PhDXJUJj0bJGo8Hg67Xpep579pHL5SxrOv3lqkvcJR7ghIEPON4NX48KaddzVsQZJ9x7LCBQtto7r4Hz1ybYvzCzNiht0k/pSccJAj9OKQVV0Q0VawoH5c12nfpBSLkqNdqZIVJWaLifmgWQ4VQhEossQJ/QNuPQWh4pAi8hGMot+1ZErhgc/5IMfFo0iRD+7+p6BXKHmqDe2KzU6GTMTh1iY0Fds6RuZDFWU3qVpYW+g5OWOUR8Yq91fBRtHN8Zz5PlQStkjPufiMJq1l7NjGFVtaOLMZI8ILCBf3pcOn445mg6AAAAAElFTkSuQmCC"

/***/ }),
/* 1130 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAABs1BMVEUAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAACAgEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAADxzZndnmhlQSjHjl/eiCtLNBohGRETDgjwx4kAAAD+zIj9y4v/v0sAAAD7zpf/wk97b1hNPjf/3JOTWzitbh5wVzz81IvyuXeHVjCzglM1JBfImWaTYCH3qiaxeye1emHVhDT1wXj836Pxy4bHiFZgQitFLyXus1L63J4yKB7Cj2kaFAmteF75vU61jmLevYDDgTr84ai0eUXZsXMvIh1JNiiYcSzRtHn2w3z74aipgF/RsXkAAACie2b/zYb1sD0nIBmTZzX/vUmTZj2tl25lTUOgimT/xVT/yWBYRDTKo1f/mQL4tmX/zHr8u2fieQz8kQPadxn/3p37wnr/xHD/qxj/pRP1iwb/1Iz/0oXsggnwhQf/2ZL+xnv1uHLwrGH0sGDmoFrUgz2xbDXYfyzAaCzIah7jgRn9mhXSbxXcdQ/ofgn/nwX4xIjnrW7ysmnpp2T/vF/RilbAd0//uU3wo0u3bUf2oDX/tjHKeTG4YzHOeTDSdSXllCR1SyTpiyNjbGSJAAAAXHRSTlMALg0aauexIEDYyLigl45iVTT+/fz7+/Ty1HRsWlNNS0QnHx7+/v37+vr5+PXz8e7t6unn5uHb29bTz8vHwbCtqaijop2Uko+LhoWFhIN5dmpqXVpPSUU/NzMyHYjxQ78AAAFgSURBVCjPhc9lUwJBGMDx2wtCQZAUAUGxu7u7u5WTO0Qa6cbu/sjuMTrezXDj/93ub/aZfRB2pRaEr8lFPkG7Bvhox26v5KFxu32eZ163368rTHtuj6eu8MRpN0m6lznLmEwGg16/ttBJkqSnf33LaDSb9w8sDOkuTmGBgMPhIO9zTucZ7Hn0CJJQNFZ/brWewBw3x0w5Z+ucCIMEcMlgMzRGUxQFydk2LJEJIaGgvJiovbwKhaxPLoqiUh8aQoADFGESyqVirSoYfPD5XC6qpqyopALLw8/DxutwMuv1+lwt+Sd/CTcUYXXGZrNlvWo5hnBaUkTSaZqG+LWJcBu6TSTelJ8xOpOc4EqVKh6PNhGE5oWmO1AOrd69VsOfSYu00ffYNodGHpWEQAYAXkw0RKY489r7xFJmGUwuEff2sCfuzghWRPkLVFQimD1kEcBlAP1dH8cBizCAsdaHh3/6Bs/eTDDxYLkkAAAAAElFTkSuQmCC"

/***/ }),
/* 1131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/btn_dingdan.5c313da.png";

/***/ }),
/* 1132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bzhh_bg.0ef0530.webp";

/***/ }),
/* 1133 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,UklGRtABAABXRUJQVlA4WAoAAAAQAAAAKQAAKQAAQUxQSGwAAAABT6CmkRQ4fcdXUZMzAJaIiMCq/jTZYBrZtpNL8r8LLJYGksPis8VRwtfE1zD/WFxE/wUCBAtMSMXw2pe+SiS5y0L2kbRZ2FzuAexRZ8TsQJQnor0R64vw9tuFEcJcYdhwATgL3IoNSFdlUwtWUDggPgEAABAHAJ0BKioAKgA+kT6aSSWjIiEjjfiwEglsAK+9lv7drV3XU8Z7xURCBmxbyXw+g8tfoh6dBQBL00y0CKcYOUcAAP72KZ7lG8uwUwDH+09f7T1/UwPG1QTJWltIGDLkWtBvqe27JuP9sD0oZP/0qBUX5w5vV/lH1HRWV8QqFPmOJ29WzYHf8/jf+CK3/BsSZezWyCtH3MBI5Up2aY5ALHkYp7xcN2eO9a1Wi9Vkfy146jw8i5E3Od9STOdLP6XU4V6711q4G2WQwvYknXfjfmhG9YE/hzs6l9TKsrvO0a8tD9ITCqySaruy6JbLe/Uu6ZrznIBXHmC6LebLy3AktMZ/yj9v53M/8AErJNn2jhtOjZ0NbO+1TnG4BpJj/ntzULuNs1+f80Rfmd/QFlyDHkP0wSZ1f/eQb9yraQAAAA=="

/***/ }),
/* 1134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/1.33291f8.png";

/***/ }),
/* 1135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2.1b5cf89.png";

/***/ }),
/* 1136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3.09d401b.png";

/***/ }),
/* 1137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4.57b8dd7.png";

/***/ }),
/* 1138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/5.993571e.png";

/***/ }),
/* 1139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/6.87e10c5.png";

/***/ }),
/* 1140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/7.c485458.png";

/***/ }),
/* 1141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/8.09e8413.png";

/***/ }),
/* 1142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_head.a03e4fd.png";

/***/ }),
/* 1143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_word.8ea0707.png";

/***/ }),
/* 1144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/left-icon.9d2580e.png";

/***/ }),
/* 1145 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,UklGRowBAABXRUJQVlA4WAoAAAAQAAAAKQAAKQAAQUxQSIwAAAABcFrbVly9OpBRSApAoaAHisvUCkWwaCKTm26SP1/7TUQoaNuGyS6ClIM8ytdlwde1lNrLS+mEnyvpJ9yAtY/WfF029isG9/gH5KB+rJAxaJGEXKmfq8pI4rEGRaiwwtfoFaV61AWRQ0RZYDlYLIDhYIB/MUwjMS3HNCfTxkTDM1ODlEQbBsdNN2JiClZQOCDaAAAAsAYAnQEqKgAqAD55MpJHpKMhoTx4CACQDwlpAAzgGqiGLHv8Yvtkux/Aj2sF3KbK2eFdouy+j+vs0zL2qIAA/vCy5tZqOzR/H96WM32f+XescWDBUHvQ+fo3EWCnwsHxUUHMd/XukQNw3nlQxvKWK5LC4SSwXs7Fa511BZT4c1f6rxcj1cAL7+UBNWNuZ2rQkj+s0x4MgDwuen4Dkh3PSMXu8YNFqr+1FVMOOK3Ck5/CTd5K99XaKRyPmNZyKU4WDmgxiI4bhq2999wJWS7RHFWO9/70iKoaAAA="

/***/ }),
/* 1146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/all.2907923.jpg";

/***/ }),
/* 1147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/blossom.7adebaf.jpg";

/***/ }),
/* 1148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/career.cc93a53.jpg";

/***/ }),
/* 1149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/character.cefb354.jpg";

/***/ }),
/* 1150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/energy.9b9fb5b.jpg";

/***/ }),
/* 1151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/family.cce7682.jpg";

/***/ }),
/* 1152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/hemu_rate.8ca39b9.jpg";

/***/ }),
/* 1153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/parents.fb73698.jpg";

/***/ }),
/* 1154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/right-icon.ae8b821.png";

/***/ }),
/* 1155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/user-info-title.f1a5884.png";

/***/ }),
/* 1156 */,
/* 1157 */,
/* 1158 */,
/* 1159 */,
/* 1160 */,
/* 1161 */,
/* 1162 */,
/* 1163 */,
/* 1164 */,
/* 1165 */,
/* 1166 */,
/* 1167 */,
/* 1168 */,
/* 1169 */,
/* 1170 */,
/* 1171 */,
/* 1172 */,
/* 1173 */,
/* 1174 */,
/* 1175 */,
/* 1176 */,
/* 1177 */,
/* 1178 */,
/* 1179 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bzhh.092af95.png";

/***/ }),
/* 1180 */,
/* 1181 */,
/* 1182 */,
/* 1183 */,
/* 1184 */,
/* 1185 */,
/* 1186 */,
/* 1187 */,
/* 1188 */,
/* 1189 */,
/* 1190 */,
/* 1191 */,
/* 1192 */,
/* 1193 */,
/* 1194 */,
/* 1195 */,
/* 1196 */,
/* 1197 */,
/* 1198 */,
/* 1199 */,
/* 1200 */,
/* 1201 */,
/* 1202 */,
/* 1203 */,
/* 1204 */,
/* 1205 */,
/* 1206 */,
/* 1207 */,
/* 1208 */,
/* 1209 */,
/* 1210 */,
/* 1211 */,
/* 1212 */,
/* 1213 */,
/* 1214 */,
/* 1215 */,
/* 1216 */,
/* 1217 */,
/* 1218 */,
/* 1219 */,
/* 1220 */,
/* 1221 */,
/* 1222 */,
/* 1223 */,
/* 1224 */,
/* 1225 */,
/* 1226 */,
/* 1227 */,
/* 1228 */,
/* 1229 */,
/* 1230 */,
/* 1231 */,
/* 1232 */,
/* 1233 */,
/* 1234 */,
/* 1235 */,
/* 1236 */,
/* 1237 */,
/* 1238 */,
/* 1239 */,
/* 1240 */,
/* 1241 */,
/* 1242 */,
/* 1243 */,
/* 1244 */,
/* 1245 */,
/* 1246 */,
/* 1247 */,
/* 1248 */,
/* 1249 */,
/* 1250 */,
/* 1251 */,
/* 1252 */,
/* 1253 */,
/* 1254 */,
/* 1255 */,
/* 1256 */,
/* 1257 */,
/* 1258 */,
/* 1259 */,
/* 1260 */,
/* 1261 */,
/* 1262 */,
/* 1263 */,
/* 1264 */,
/* 1265 */,
/* 1266 */,
/* 1267 */,
/* 1268 */,
/* 1269 */,
/* 1270 */,
/* 1271 */,
/* 1272 */,
/* 1273 */,
/* 1274 */,
/* 1275 */,
/* 1276 */,
/* 1277 */,
/* 1278 */,
/* 1279 */,
/* 1280 */,
/* 1281 */,
/* 1282 */,
/* 1283 */,
/* 1284 */,
/* 1285 */,
/* 1286 */,
/* 1287 */,
/* 1288 */,
/* 1289 */,
/* 1290 */,
/* 1291 */,
/* 1292 */,
/* 1293 */,
/* 1294 */,
/* 1295 */,
/* 1296 */,
/* 1297 */,
/* 1298 */,
/* 1299 */,
/* 1300 */,
/* 1301 */,
/* 1302 */,
/* 1303 */,
/* 1304 */,
/* 1305 */,
/* 1306 */,
/* 1307 */,
/* 1308 */,
/* 1309 */,
/* 1310 */,
/* 1311 */,
/* 1312 */,
/* 1313 */,
/* 1314 */,
/* 1315 */,
/* 1316 */,
/* 1317 */,
/* 1318 */,
/* 1319 */,
/* 1320 */,
/* 1321 */,
/* 1322 */,
/* 1323 */,
/* 1324 */,
/* 1325 */,
/* 1326 */,
/* 1327 */,
/* 1328 */,
/* 1329 */,
/* 1330 */,
/* 1331 */,
/* 1332 */,
/* 1333 */,
/* 1334 */,
/* 1335 */,
/* 1336 */,
/* 1337 */,
/* 1338 */,
/* 1339 */,
/* 1340 */,
/* 1341 */,
/* 1342 */,
/* 1343 */,
/* 1344 */,
/* 1345 */,
/* 1346 */,
/* 1347 */,
/* 1348 */,
/* 1349 */,
/* 1350 */,
/* 1351 */,
/* 1352 */,
/* 1353 */,
/* 1354 */,
/* 1355 */,
/* 1356 */,
/* 1357 */,
/* 1358 */,
/* 1359 */,
/* 1360 */,
/* 1361 */,
/* 1362 */,
/* 1363 */,
/* 1364 */,
/* 1365 */,
/* 1366 */,
/* 1367 */,
/* 1368 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/to-order.69c8d8b.png";

/***/ }),
/* 1369 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/1.374725c.png";

/***/ }),
/* 1370 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2.659c267.png";

/***/ }),
/* 1371 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3.58948e8.png";

/***/ }),
/* 1372 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4.337f170.png";

/***/ }),
/* 1373 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/5.b02d1d5.png";

/***/ }),
/* 1374 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/6.c61fa92.png";

/***/ }),
/* 1375 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/7.7c06995.png";

/***/ }),
/* 1376 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/8.dfb9fff.png";

/***/ }),
/* 1377 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/modal_bg.3b6bc2a.png";

/***/ }),
/* 1378 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/text.9f20522.png";

/***/ }),
/* 1379 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/left-icon.fd7f112.png";

/***/ }),
/* 1380 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/order.548be37.png";

/***/ }),
/* 1381 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/right-icon.f54fb5a.png";

/***/ }),
/* 1382 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/top-banner.25d3641.webp";

/***/ }),
/* 1383 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/user-info-title.5e0fecf.png";

/***/ }),
/* 1384 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/all.3d5822f.jpg";

/***/ }),
/* 1385 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/blossom.4af0915.jpg";

/***/ }),
/* 1386 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/career.d687470.jpg";

/***/ }),
/* 1387 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/energy.0ddb55c.jpg";

/***/ }),
/* 1388 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/family.cb1cbc3.jpg";

/***/ }),
/* 1389 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/hemu_rate.ec919c6.jpg";

/***/ }),
/* 1390 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/parents.59e05b6.jpg";

/***/ }),
/* 1391 */,
/* 1392 */,
/* 1393 */,
/* 1394 */,
/* 1395 */,
/* 1396 */,
/* 1397 */,
/* 1398 */,
/* 1399 */,
/* 1400 */,
/* 1401 */,
/* 1402 */,
/* 1403 */,
/* 1404 */,
/* 1405 */,
/* 1406 */,
/* 1407 */,
/* 1408 */,
/* 1409 */,
/* 1410 */,
/* 1411 */,
/* 1412 */,
/* 1413 */,
/* 1414 */,
/* 1415 */,
/* 1416 */,
/* 1417 */,
/* 1418 */,
/* 1419 */,
/* 1420 */,
/* 1421 */,
/* 1422 */,
/* 1423 */,
/* 1424 */,
/* 1425 */,
/* 1426 */,
/* 1427 */,
/* 1428 */,
/* 1429 */,
/* 1430 */,
/* 1431 */,
/* 1432 */,
/* 1433 */,
/* 1434 */,
/* 1435 */,
/* 1436 */,
/* 1437 */,
/* 1438 */,
/* 1439 */,
/* 1440 */,
/* 1441 */,
/* 1442 */,
/* 1443 */,
/* 1444 */,
/* 1445 */,
/* 1446 */,
/* 1447 */,
/* 1448 */,
/* 1449 */,
/* 1450 */,
/* 1451 */,
/* 1452 */,
/* 1453 */,
/* 1454 */,
/* 1455 */,
/* 1456 */,
/* 1457 */,
/* 1458 */,
/* 1459 */,
/* 1460 */,
/* 1461 */,
/* 1462 */,
/* 1463 */,
/* 1464 */,
/* 1465 */,
/* 1466 */,
/* 1467 */,
/* 1468 */,
/* 1469 */,
/* 1470 */,
/* 1471 */,
/* 1472 */,
/* 1473 */,
/* 1474 */,
/* 1475 */,
/* 1476 */,
/* 1477 */,
/* 1478 */,
/* 1479 */,
/* 1480 */,
/* 1481 */,
/* 1482 */,
/* 1483 */,
/* 1484 */,
/* 1485 */,
/* 1486 */,
/* 1487 */,
/* 1488 */,
/* 1489 */,
/* 1490 */,
/* 1491 */,
/* 1492 */,
/* 1493 */,
/* 1494 */,
/* 1495 */,
/* 1496 */,
/* 1497 */,
/* 1498 */,
/* 1499 */,
/* 1500 */,
/* 1501 */,
/* 1502 */,
/* 1503 */,
/* 1504 */,
/* 1505 */,
/* 1506 */,
/* 1507 */,
/* 1508 */,
/* 1509 */,
/* 1510 */,
/* 1511 */,
/* 1512 */,
/* 1513 */,
/* 1514 */,
/* 1515 */,
/* 1516 */,
/* 1517 */,
/* 1518 */,
/* 1519 */,
/* 1520 */,
/* 1521 */,
/* 1522 */,
/* 1523 */,
/* 1524 */,
/* 1525 */,
/* 1526 */,
/* 1527 */,
/* 1528 */,
/* 1529 */,
/* 1530 */,
/* 1531 */,
/* 1532 */,
/* 1533 */,
/* 1534 */,
/* 1535 */,
/* 1536 */,
/* 1537 */,
/* 1538 */,
/* 1539 */,
/* 1540 */,
/* 1541 */,
/* 1542 */,
/* 1543 */,
/* 1544 */,
/* 1545 */,
/* 1546 */,
/* 1547 */,
/* 1548 */,
/* 1549 */,
/* 1550 */,
/* 1551 */,
/* 1552 */,
/* 1553 */,
/* 1554 */,
/* 1555 */,
/* 1556 */,
/* 1557 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(892)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(757),
  /* template */
  __webpack_require__(1612),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-009f6ac6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1558 */,
/* 1559 */,
/* 1560 */,
/* 1561 */,
/* 1562 */,
/* 1563 */,
/* 1564 */,
/* 1565 */,
/* 1566 */,
/* 1567 */,
/* 1568 */,
/* 1569 */,
/* 1570 */,
/* 1571 */,
/* 1572 */,
/* 1573 */,
/* 1574 */,
/* 1575 */,
/* 1576 */,
/* 1577 */,
/* 1578 */,
/* 1579 */,
/* 1580 */,
/* 1581 */,
/* 1582 */,
/* 1583 */,
/* 1584 */,
/* 1585 */,
/* 1586 */,
/* 1587 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(947)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(796),
  /* template */
  __webpack_require__(1666),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7610b014",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1588 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(944)
}
var Component = __webpack_require__(1)(
  /* script */
  null,
  /* template */
  __webpack_require__(1663),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-70cb5285",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1589 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(899)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(798),
  /* template */
  __webpack_require__(1619),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0f54ce04",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1590 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(931)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(799),
  /* template */
  __webpack_require__(1650),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-63269584",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1591 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(897)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(800),
  /* template */
  __webpack_require__(1617),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0708d1ec",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1592 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(967)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(801),
  /* template */
  __webpack_require__(1686),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c3b67770",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1593 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(909)
}
var Component = __webpack_require__(1)(
  /* script */
  null,
  /* template */
  __webpack_require__(1629),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2a4b0614",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1594 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(968)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(803),
  /* template */
  __webpack_require__(1687),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-cce9ee7c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1595 */,
/* 1596 */,
/* 1597 */,
/* 1598 */,
/* 1599 */,
/* 1600 */,
/* 1601 */,
/* 1602 */,
/* 1603 */,
/* 1604 */,
/* 1605 */,
/* 1606 */,
/* 1607 */,
/* 1608 */,
/* 1609 */,
/* 1610 */,
/* 1611 */,
/* 1612 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "to-order",
    on: {
      "click": _vm.toOrder
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(1368),
      "alt": ""
    }
  })])
},staticRenderFns: []}

/***/ }),
/* 1613 */,
/* 1614 */,
/* 1615 */,
/* 1616 */,
/* 1617 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form"
  }, [(_vm.language === 'zh-CN') ? _c('img', {
    staticClass: "title",
    attrs: {
      "src": __webpack_require__(1155)
    }
  }) : _c('img', {
    staticClass: "title",
    attrs: {
      "src": __webpack_require__(1383)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "input-box"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "input-item"
  }, [_vm._v("\n        " + _vm._s(_vm.maleusername) + "\n        "), _c('div', {
    staticClass: "input-label"
  }, [_vm._v("姓名：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.maleusername),
      expression: "maleusername"
    }],
    staticClass: "input",
    attrs: {
      "id": "maleusername",
      "placeholder": _vm.$t('name-placeholder')
    },
    domProps: {
      "value": (_vm.maleusername)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.maleusername = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "input-item"
  }, [_c('div', {
    staticClass: "input-label"
  }, [_vm._v("生日：")]), _vm._v(" "), _c('div', {
    staticClass: "input",
    style: ({
      color: _vm.maledate ? '#333' : 'rgba(51, 51, 51, 0.5)'
    }),
    on: {
      "click": _vm.maleopenPicker
    }
  }, [_vm._v("\n          " + _vm._s(_vm.maledate || _vm.$t('birth-placeholder')) + "\n        ")])])])]), _vm._v(" "), _c('div', {
    staticClass: "input-box"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "input-item"
  }, [_c('div', {
    staticClass: "input-label"
  }, [_vm._v("姓名：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.femaleusername),
      expression: "femaleusername"
    }],
    staticClass: "input",
    attrs: {
      "id": "femaleusername",
      "placeholder": _vm.$t('name-placeholder')
    },
    domProps: {
      "value": (_vm.femaleusername)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.femaleusername = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "input-item"
  }, [_c('div', {
    staticClass: "input-label"
  }, [_vm._v("生日：")]), _vm._v(" "), _c('div', {
    staticClass: "input",
    style: ({
      color: _vm.femaledate ? '#333' : 'rgba(51, 51, 51, 0.5)'
    }),
    on: {
      "click": _vm.femaleopenPicker
    }
  }, [_vm._v("\n          " + _vm._s(_vm.femaledate || _vm.$t('birth-placeholder')) + "\n        ")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "left"
  }, [_c('img', {
    staticClass: "left",
    staticStyle: {
      "width": "1.22rem",
      "height": "1.22rem",
      "margin-right": "0.2rem"
    },
    attrs: {
      "src": __webpack_require__(1047)
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "left"
  }, [_c('img', {
    staticClass: "left",
    staticStyle: {
      "width": "1.22rem",
      "height": "1.22rem",
      "margin-right": "0.2rem"
    },
    attrs: {
      "src": __webpack_require__(1045)
    }
  })])
}]}

/***/ }),
/* 1618 */,
/* 1619 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "calendar-picker"
  }, [_c('div', {
    staticClass: "picker-shadow",
    on: {
      "click": function($event) {
        return _vm.cancel()
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "picker-container"
  }, [_c('div', {
    staticClass: "header"
  }, [_c('img', {
    staticClass: "close",
    attrs: {
      "src": __webpack_require__(100),
      "alt": ""
    },
    on: {
      "click": function($event) {
        return _vm.cancel()
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "check-box"
  }, [_c('div', {
    staticClass: "common-tab active-tab"
  }, [_vm._v(_vm._s(_vm.$t('gongli-label')))]), _vm._v(" "), _c('div', {
    staticClass: "common-tab",
    on: {
      "click": function($event) {
        return _vm.showNongli()
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('nongli-label')) + "\n        ")])]), _vm._v(" "), _c('img', {
    staticClass: "right",
    attrs: {
      "src": __webpack_require__(101)
    },
    on: {
      "click": function($event) {
        return _vm.submit()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "select"
  }, [_c('Picker', {
    attrs: {
      "data": _vm.year_col,
      "name": 'year',
      "value": _vm.year,
      "position": 'left'
    }
  }), _vm._v(" "), _c('Picker', {
    attrs: {
      "data": _vm.month_col,
      "name": 'month',
      "value": _vm.month,
      "position": 'left'
    }
  }), _vm._v(" "), _c('Picker', {
    attrs: {
      "data": _vm.date_col,
      "name": 'date',
      "value": _vm.date,
      "position": 'left'
    }
  }), _vm._v(" "), _c('Picker', {
    attrs: {
      "data": _vm.language === 'zh-CN' ? _vm.cn_hour_col : _vm.tw_hour_col,
      "name": 'hour',
      "value": _vm.birth_hour,
      "position": 'left'
    }
  })], 1)])])
},staticRenderFns: []}

/***/ }),
/* 1620 */,
/* 1621 */,
/* 1622 */,
/* 1623 */,
/* 1624 */,
/* 1625 */,
/* 1626 */,
/* 1627 */,
/* 1628 */,
/* 1629 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "top-banner"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(1128),
      "alt": ""
    }
  })])
}]}

/***/ }),
/* 1630 */,
/* 1631 */,
/* 1632 */,
/* 1633 */,
/* 1634 */,
/* 1635 */,
/* 1636 */,
/* 1637 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app",
      "data-own": "1"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 1638 */,
/* 1639 */,
/* 1640 */,
/* 1641 */,
/* 1642 */,
/* 1643 */,
/* 1644 */,
/* 1645 */,
/* 1646 */,
/* 1647 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bazi"
  }, [_c('div', {
    staticClass: "line"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("生肖")]), _vm._v(" "), _c('div', {
    class: ("left circle " + (_vm.getAnimal(_vm.shengxiao.male)))
  }, [_vm._v("\n      " + _vm._s(_vm.shengxiao.male) + "\n    ")]), _vm._v(" "), _c('div', {
    class: ("center " + (_vm.relStyle(_vm.shengxiao.rel)))
  }, [_vm._v("\n      >\n      "), _c('span', [_vm._v(_vm._s(_vm.shengxiao.rel))]), _vm._v("\n      <\n    ")]), _vm._v(" "), _c('div', {
    class: ("right circle " + (_vm.getAnimal(_vm.shengxiao.female)))
  }, [_vm._v("\n      " + _vm._s(_vm.shengxiao.female) + "\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "line"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("日元")]), _vm._v(" "), _c('div', {
    class: ("left circle " + (_vm.styleColor(_vm.riyuan.male)))
  }, [_vm._v("\n      " + _vm._s(_vm.riyuan.male) + "\n    ")]), _vm._v(" "), _c('div', {
    class: ("center " + (_vm.relStyle(_vm.riyuan.rel)))
  }, [_vm._v("\n      >\n      "), _c('span', [_vm._v("\n        " + _vm._s(_vm.riyuan.rel) + "\n      ")]), _vm._v("\n      <\n    ")]), _vm._v(" "), _c('div', {
    class: ("right circle " + (_vm.styleColor(_vm.riyuan.female)))
  }, [_vm._v("\n      " + _vm._s(_vm.riyuan.female) + "\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "line"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("夫妻宫")]), _vm._v(" "), _c('div', {
    class: ("left circle " + (_vm.styleColor(_vm.fuqigong.male)))
  }, [_vm._v("\n      " + _vm._s(_vm.fuqigong.male) + "\n    ")]), _vm._v(" "), _c('div', {
    class: ("center " + (_vm.relStyle(_vm.fuqigong.rel)))
  }, [_vm._v("\n      >\n      "), _c('span', [_vm._v("\n        " + _vm._s(_vm.fuqigong.rel) + "\n      ")]), _vm._v("\n      <\n    ")]), _vm._v(" "), _c('div', {
    class: ("right circle " + (_vm.styleColor(_vm.fuqigong.female)))
  }, [_vm._v("\n      " + _vm._s(_vm.fuqigong.female) + "\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "line"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("子女宫")]), _vm._v(" "), _c('div', {
    class: ("left circle " + (_vm.styleColor(_vm.zinvgong.male)))
  }, [_vm._v("\n      " + _vm._s(_vm.zinvgong.male) + "\n    ")]), _vm._v(" "), _c('div', {
    class: ("center " + (_vm.relStyle(_vm.zinvgong.rel)))
  }, [_vm._v("\n      >\n      "), _c('span', [_vm._v("\n        " + _vm._s(_vm.zinvgong.rel) + "\n      ")]), _vm._v("\n      <\n    ")]), _vm._v(" "), _c('div', {
    class: ("right circle " + (_vm.styleColor(_vm.zinvgong.female)))
  }, [_vm._v("\n      " + _vm._s(_vm.zinvgong.female) + "\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "line"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("桃花星")]), _vm._v(" "), _c('div', {
    staticClass: "left circle star-box"
  }, [_vm._v("\n      " + _vm._s(_vm.is_result ? _vm.taohua.male : '?') + "颗\n    ")]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "right circle star-box"
  }, [_vm._v("\n      " + _vm._s(_vm.is_result ? _vm.taohua.female : '?') + "颗\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "line"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("姻缘星")]), _vm._v(" "), _c('div', {
    staticClass: "left circle star-box"
  }, [_vm._v("\n      " + _vm._s(_vm.is_result ? _vm.hunyin.male : '?') + "颗\n    ")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "right circle star-box"
  }, [_vm._v("\n      " + _vm._s(_vm.is_result ? _vm.hunyin.female : '?') + "颗\n    ")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "center visibility-h"
  }, [_vm._v("\n      >\n      "), _c('span', [_vm._v(" - ")]), _vm._v("\n      <\n    ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "center visibility-h"
  }, [_vm._v("\n      >\n      "), _c('span', [_vm._v(" - ")]), _vm._v("\n      <\n    ")])
}]}

/***/ }),
/* 1648 */,
/* 1649 */,
/* 1650 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.is_channel_01) ? _c('NavigationBar') : _vm._e(), _vm._v(" "), (
    _vm.comboAttachData && _vm.is_show_combination && _vm.is_show_current_combination
  ) ? _c('CalculateBar', {
    attrs: {
      "is_home": false,
      "product_key": _vm.comboAttachData.product_key,
      "call_back": _vm.startCalculateClick
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: {
      home: true,
      'fix-box': _vm.choose_time ? true : false,
      'cn-bg': _vm.is_cn,
      'tw-bg': !_vm.is_cn,
    },
    attrs: {
      "id": "home"
    }
  }, [(_vm.has_pay) ? _c('header-notice') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "top-banner"
  }, [(_vm.language === 'zh-CN') ? _c('img', {
    staticClass: "top-banner-img",
    attrs: {
      "src": __webpack_require__(1132)
    }
  }) : _c('img', {
    staticClass: "top-banner-img",
    attrs: {
      "src": __webpack_require__(1382)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "top-content"
  }, [_c('div', {
    staticClass: "icon-container"
  }, [(_vm.language === 'zh-CN') ? _c('img', {
    staticClass: "icon-img",
    staticStyle: {
      "width": "2.16rem",
      "height": "2.16rem"
    },
    attrs: {
      "src": __webpack_require__(1144)
    }
  }) : _c('img', {
    staticClass: "icon-img",
    staticStyle: {
      "width": "2.16rem",
      "height": "2.16rem"
    },
    attrs: {
      "src": __webpack_require__(1379)
    }
  }), _vm._v(" "), (_vm.language === 'zh-CN') ? _c('img', {
    staticClass: "icon-img",
    staticStyle: {
      "width": "2.16rem",
      "height": "2.16rem"
    },
    attrs: {
      "src": __webpack_require__(1154)
    }
  }) : _c('img', {
    staticClass: "icon-img",
    staticStyle: {
      "width": "2.16rem",
      "height": "2.16rem"
    },
    attrs: {
      "src": __webpack_require__(1381)
    }
  })]), _vm._v(" "), _c('info', {
    staticClass: "info-card",
    attrs: {
      "malename": _vm.male.username,
      "femalename": _vm.female.username,
      "maledate": _vm.male.picker_date,
      "malehour": _vm.male.picker_hour,
      "femaledate": _vm.female.picker_date,
      "femalehour": _vm.female.picker_hour
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "privacy"
  }, [(_vm.privacyChecked) ? _c('img', {
    attrs: {
      "src": __webpack_require__(1133)
    },
    on: {
      "click": function($event) {
        _vm.privacyChecked = !_vm.privacyChecked
      }
    }
  }) : _c('img', {
    attrs: {
      "src": __webpack_require__(1145)
    },
    on: {
      "click": function($event) {
        _vm.privacyChecked = !_vm.privacyChecked
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('check-label')))]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#ffda27"
    },
    on: {
      "click": function($event) {
        return _vm.toService('user_agreement.html')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('user-agreement')))]), _vm._v(" "), _c('span', [_vm._v("和")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#ffda27"
    },
    on: {
      "click": function($event) {
        return _vm.toService('privacy.html')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('privacy-policy')))])]), _vm._v(" "), _c('img', {
    staticClass: "btn",
    attrs: {
      "id": "info-btn",
      "src": _vm.language === 'zh-CN' ? _vm.cn_btn : _vm.tw_btn
    },
    on: {
      "click": _vm.check
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "user"
  }, [_c('div', [_vm._v("已有")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.user_number) + "人")]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.$t('cesuan-label')))])])], 1)]), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_card1 : _vm.tw_card1
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_card2 : _vm.tw_card2
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_card3 : _vm.tw_card3
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_card4 : _vm.tw_card4
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_card5 : _vm.tw_card5
    }
  }), _vm._v(" "), (!_vm.is_channel_01) ? _c('img', {
    staticClass: "order",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_order : _vm.tw_order
    },
    on: {
      "click": function($event) {
        return _vm.toOrderUrl()
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showFixedBtn),
      expression: "showFixedBtn"
    }],
    staticClass: "btn-fixed",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_btn : _vm.tw_btn
    },
    on: {
      "click": _vm.check
    }
  }), _vm._v(" "), _c('DatetimePicker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.choose_time && !_vm.show_nongli),
      expression: "choose_time && !show_nongli"
    }],
    attrs: {
      "male": _vm.sex,
      "start": "1959",
      "end": "2008",
      "year": _vm.year,
      "month": _vm.month,
      "date": _vm.date,
      "birth_hour": _vm.birth_hour
    }
  }), _vm._v(" "), _c('NongliPicker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.choose_time && _vm.show_nongli),
      expression: "choose_time && show_nongli"
    }],
    attrs: {
      "male": _vm.sex,
      "start": "1959",
      "end": "2008",
      "year": _vm.year,
      "month": _vm.month,
      "date": _vm.date,
      "birth_hour": _vm.birth_hour
    }
  }), _vm._v(" "), (_vm.showFixedBtn) ? _c('HomeFooter', {
    attrs: {
      "product_key": "h5_marriage"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.is_show_notice) ? _c('PopNotice', {
    attrs: {
      "count_down": _vm.count_down,
      "product_key": _vm.product_key,
      "e_id": "10007",
      "c_id": "-10014",
      "c_name": "click_marriage_discount1"
    },
    on: {
      "close": _vm.closeNotice
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show_fixed_order && !_vm.is_show_notice) ? _c('FixedOrder', {
    attrs: {
      "title": _vm.local_title,
      "is_show_move": _vm.is_show_notice,
      "new_order_key": _vm.new_order_key,
      "name": "local",
      "top": "4.7rem",
      "time": _vm.local_time
    },
    on: {
      "payOrder": _vm.checkOrder,
      "jumpDetail": _vm.jumpOrder
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show_api_order && !_vm.is_show_notice) ? _c('FixedOrder', {
    attrs: {
      "title": _vm.last_title,
      "is_show_move": _vm.is_show_notice,
      "last_order": _vm.last_order,
      "name": "api",
      "top": "6.7rem",
      "time": _vm.api_time
    },
    on: {
      "payOrder": _vm.checkOrder,
      "jumpDetail": _vm.jumpOrder
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showFixedBtn) ? _c('NewFooter', {
    attrs: {
      "product_key": "h5_marriage"
    }
  }) : _vm._e()], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 1651 */,
/* 1652 */,
/* 1653 */,
/* 1654 */,
/* 1655 */,
/* 1656 */,
/* 1657 */,
/* 1658 */,
/* 1659 */,
/* 1660 */,
/* 1661 */,
/* 1662 */,
/* 1663 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "top-banner"
  }, [_c('img', {
    staticClass: "first",
    attrs: {
      "src": __webpack_require__(1127),
      "alt": ""
    }
  })])
}]}

/***/ }),
/* 1664 */,
/* 1665 */,
/* 1666 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: {
      detail: true,
      'hidden-scroll': _vm.pay_modal
    }
  }, [_c('img', {
    staticClass: "top-banner",
    attrs: {
      "src": __webpack_require__(1142)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "pay-box"
  }, [_c('img', {
    staticClass: "banner",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_img_title : _vm.tw_img_title
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "user-info"
  }, [_c('div', {
    staticClass: "male-info"
  }, [_c('div', {
    staticClass: "info-name"
  }, [_vm._v(_vm._s(_vm._f("nameFilter")(_vm.mname)))]), _vm._v(" "), _c('div', {
    staticClass: "info-birth"
  }, [_vm._v(_vm._s(_vm.mbirth))]), _vm._v(" "), _c('baziInfo', {
    key: 0,
    attrs: {
      "user_info": _vm.male_user_string
    },
    on: {
      "get_user_info": _vm.getUserInfo
    }
  })], 1), _vm._v(" "), _c('img', {
    staticClass: "heart",
    attrs: {
      "src": __webpack_require__(617)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "female-info"
  }, [_c('div', {
    staticClass: "info-name"
  }, [_vm._v(_vm._s(_vm._f("nameFilter")(_vm.fname)))]), _vm._v(" "), _c('div', {
    staticClass: "info-birth"
  }, [_vm._v(_vm._s(_vm.fbirth))]), _vm._v(" "), _c('baziInfo', {
    key: 1,
    attrs: {
      "user_info": _vm.female_user_string
    },
    on: {
      "get_user_info": _vm.getUserInfo
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "bazi-box"
  })]), _vm._v(" "), _c('img', {
    staticClass: "title-pay",
    attrs: {
      "id": "title-pay",
      "src": __webpack_require__(1046),
      "alt": ""
    }
  }), _vm._v(" "), _c('PayDetail', {
    ref: "payDetail",
    attrs: {
      "className": "method-box",
      "product_key": _vm.product_key,
      "query_user_string": _vm.query_user_string,
      "e_view_id": "10007",
      "c_view_id": "-10005",
      "e_view_name": "view_marriage_pay",
      "a_view_token": "g790s3",
      "c_click_id": "-10006",
      "e_click_name": "click_marriage_pay",
      "a_click_token": "2ijw47"
    }
  }), _vm._v(" "), _c('Marquee', {
    staticClass: "user",
    attrs: {
      "mock_users": _vm.getRandomList(),
      "product_key": "h5_marriage"
    }
  }), _vm._v(" "), (_vm.is_show_combinationSpecial02) ? _c('GejuInfo', {
    staticStyle: {
      "margin-bottom": "0.22rem"
    },
    attrs: {
      "product_key": _vm.product_key,
      "user_desc": _vm.mingge_desc,
      "dataList": [_vm.mingge_minfo, _vm.mingge_finfo]
    }
  }) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "text",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_img_word : _vm.tw_img_word
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "module",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_mokuai1 : _vm.tw_mokuai1
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "module",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_mokuai2 : _vm.tw_mokuai2
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "module",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_mokuai3 : _vm.tw_mokuai3
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "module",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_mokuai4 : _vm.tw_mokuai4
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "module",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_mokuai5 : _vm.tw_mokuai5
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "module",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_mokuai6 : _vm.tw_mokuai6
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "module",
    staticStyle: {
      "margin-bottom": "2.7rem"
    },
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_mokuai7 : _vm.tw_mokuai7
    }
  }), _vm._v(" "), _c('payModal', {
    attrs: {
      "product_key": _vm.product_key,
      "bg": _vm.is_cn ? _vm.cn_modal_bg : _vm.tw_modal_bg,
      "query_user_string": _vm.query_user_string,
      "title": "八字合婚",
      "title_style": "color:#fff",
      "e_view_id": "10007",
      "c_view_id": "-10005",
      "e_view_name": "view_marriage_pay",
      "a_view_token": "g790s3",
      "c_click_id": "-10006",
      "e_click_name": "click_marriage_pay",
      "a_click_token": "2ijw47"
    },
    on: {
      "close": function($event) {
        _vm.pay_modal = false
      }
    },
    model: {
      value: (_vm.pay_modal),
      callback: function($$v) {
        _vm.pay_modal = $$v
      },
      expression: "pay_modal"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "btn-fixed",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_btn : _vm.tw_btn
    },
    on: {
      "click": _vm.showPayModal
    }
  }), _vm._v(" "), _c('NewFooter', {
    attrs: {
      "product_key": "h5_marriage"
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 1667 */,
/* 1668 */,
/* 1669 */,
/* 1670 */,
/* 1671 */,
/* 1672 */,
/* 1673 */,
/* 1674 */,
/* 1675 */,
/* 1676 */,
/* 1677 */,
/* 1678 */,
/* 1679 */,
/* 1680 */,
/* 1681 */,
/* 1682 */,
/* 1683 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bazi"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "v-zhu"
  }, _vm._l((_vm.gan), function(it, k) {
    return _c('div', {
      key: 'gan' + k,
      class: _vm.styleColor(it)
    }, [_vm._v("\n      " + _vm._s(it) + "\n    ")])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "v-zhu"
  }, _vm._l((_vm.zhi), function(it, k) {
    return _c('div', {
      key: 'zhi' + k,
      class: _vm.styleColor(it)
    }, [_vm._v("\n      " + _vm._s(it) + "\n    ")])
  }), 0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "name c-zhu"
  }, [_c('div', [_vm._v("年")]), _vm._v(" "), _c('div', [_vm._v("月")]), _vm._v(" "), _c('div', [_vm._v("日")]), _vm._v(" "), _c('div', [_vm._v("时")])])
}]}

/***/ }),
/* 1684 */,
/* 1685 */,
/* 1686 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "calendar-picker"
  }, [_c('div', {
    staticClass: "picker-shadow",
    on: {
      "click": function($event) {
        return _vm.cancel()
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "picker-container"
  }, [_c('div', {
    staticClass: "header"
  }, [_c('img', {
    staticClass: "close",
    attrs: {
      "src": __webpack_require__(100),
      "alt": ""
    },
    on: {
      "click": function($event) {
        return _vm.cancel()
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "check-box"
  }, [_c('div', {
    staticClass: "common-tab",
    on: {
      "click": function($event) {
        return _vm.showGongli()
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('gongli-label')) + "\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "common-tab active-tab"
  }, [_vm._v(_vm._s(_vm.$t('nongli-label')))])]), _vm._v(" "), _c('img', {
    staticClass: "right",
    attrs: {
      "src": __webpack_require__(101)
    },
    on: {
      "click": function($event) {
        return _vm.submit()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "select"
  }, [_c('Picker', {
    attrs: {
      "data": _vm.year_col,
      "name": 'year',
      "value": _vm.year,
      "position": 'left'
    }
  }), _vm._v(" "), _c('Picker', {
    attrs: {
      "data": _vm.month_col,
      "name": 'month',
      "value": _vm.month,
      "position": 'left'
    }
  }), _vm._v(" "), _c('Picker', {
    attrs: {
      "data": _vm.date_col,
      "name": 'date',
      "value": _vm.date,
      "position": 'left'
    }
  }), _vm._v(" "), _c('Picker', {
    attrs: {
      "data": _vm.language === 'zh-CN' ? _vm.cn_hour_col : _vm.tw_hour_col,
      "name": 'hour',
      "value": _vm.birth_hour,
      "position": 'left'
    }
  })], 1)])])
},staticRenderFns: []}

/***/ }),
/* 1687 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detail result-detail"
  }, [_c('top-banner'), _vm._v(" "), (!_vm.loading && _vm.hasData) ? _c('div', {
    staticClass: "pay-box"
  }, [_c('img', {
    staticClass: "banner",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_img_title : _vm.tw_img_title
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "user-info"
  }, [_c('div', {
    staticClass: "male-info"
  }, [_c('div', {
    staticClass: "info-name"
  }, [_vm._v(_vm._s(_vm._f("nameFilter")(_vm.user_ext.male_name)))]), _vm._v(" "), _c('div', {
    staticClass: "info-birth"
  }, [_vm._v(_vm._s(_vm.mbirth))]), _vm._v(" "), (_vm.show_bazi) ? _c('baziInfo', {
    attrs: {
      "user_info": _vm.init_male_str
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('img', {
    staticClass: "heart",
    attrs: {
      "src": __webpack_require__(617)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "female-info"
  }, [_c('div', {
    staticClass: "info-name"
  }, [_vm._v(_vm._s(_vm._f("nameFilter")(_vm.user_ext.female_name)))]), _vm._v(" "), _c('div', {
    staticClass: "info-birth"
  }, [_vm._v(_vm._s(_vm.fbirth))]), _vm._v(" "), (_vm.show_bazi) ? _c('baziInfo', {
    attrs: {
      "user_info": _vm.init_female_str
    }
  }) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
    staticClass: "bazi-box"
  }, [(_vm.show_bazi) ? _c('shengxiao', {
    attrs: {
      "male_str": _vm.init_male_str,
      "female_str": _vm.init_female_str,
      "is_result": true
    }
  }) : _vm._e()], 1)]) : _vm._e(), _vm._v(" "), (!_vm.loading && _vm.hasData) ? _c('div', {
    staticClass: "info_container",
    staticStyle: {
      "display": "none"
    }
  }, [_c('div', {
    staticClass: "user_info"
  }, [_c('div', {
    class: {
      message: true,
      youdayun: _vm.data_obj.dayun,
      'border-line': true,
    }
  }, [_c('p', [_vm._v("男方")]), _vm._v(" "), _c('p', [_vm._v("\n          姓名：" + _vm._s(_vm.decodeUnicode(_vm.maleinfo.name)) + "\n          "), _c('span', [_vm._v("先生")])]), _vm._v(" "), _c('p', [_vm._v("\n          出生日期：\n          "), _c('span', [_vm._v(_vm._s(_vm.user_ext.male_is_gongli === '1' ?
    _vm.maleinfo.gldate :
    _vm.maleinfo.nldate))])]), _vm._v(" "), _c('p', [_vm._v("八字：" + _vm._s(_vm.maleinfo.bazi))])]), _vm._v(" "), (_vm.data_obj.dayun) ? _c('div', {
    staticClass: "big_yun"
  }, [_c('p', {
    staticClass: "zm"
  }, [_vm._v(_vm._s(_vm.$t('dayun-label')) + "：")]), _vm._v(" "), _c('p', [_vm._v("年份")]), _vm._v(" "), _c('p', [_vm._v("甲")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.$t('age-label')))])]) : _vm._e(), _vm._v(" "), _c('div', {
    class: {
      message: true
    }
  }, [_c('p', [_vm._v("女方")]), _vm._v(" "), _c('p', [_vm._v("\n          姓名：" + _vm._s(_vm.decodeUnicode(_vm.femaleinfo.name)) + "\n          "), _c('span', [_vm._v("女士")])]), _vm._v(" "), _c('p', [_vm._v("\n          出生日期：\n          "), _c('span', [_vm._v(_vm._s(_vm.user_ext.female_is_gongli === '1' ?
    _vm.femaleinfo.gldate :
    _vm.femaleinfo.nldate))])]), _vm._v(" "), _c('p', [_vm._v("八字：" + _vm._s(_vm.femaleinfo.bazi))])]), _vm._v(" "), (_vm.data_obj.dayun) ? _c('div', {
    staticClass: "big_yun"
  }, [_c('p', {
    staticClass: "zm"
  }, [_vm._v(_vm._s(_vm.$t('dayun-label')) + "：")]), _vm._v(" "), _c('p', [_vm._v("年份")]), _vm._v(" "), _c('p', [_vm._v("甲")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.$t('age-label')))])]) : _vm._e(), _vm._v(" "), _c('input', {
    staticClass: "copyInput",
    attrs: {
      "type": "text",
      "id": "foo"
    },
    domProps: {
      "value": this.order_id
    }
  })])]) : _vm._e(), _vm._v(" "), (!_vm.loading && _vm.hasData) ? _c('div', {
    staticClass: "main-outer"
  }, [(_vm.data_obj.hemu_rate) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_hemu : _vm.tw_hemu,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.hemu_rate) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('p', {
    staticClass: "zm"
  }, [_c('span', [_vm._v("女宅命官：" + _vm._s(_vm.data_obj.hemu_rate.fm) + "（" + _vm._s(_vm.data_obj.hemu_rate.fdx) + "）")])]), _vm._v(" "), _c('p', {
    staticClass: "zm",
    staticStyle: {
      "margin-top": "0.1rem"
    }
  }, [_c('span', [_vm._v("男宅命官：" + _vm._s(_vm.data_obj.hemu_rate.mm) + "（" + _vm._s(_vm.data_obj.hemu_rate.mdx) + "）")])]), _vm._v(" "), _c('p', {
    staticClass: "fenge",
    staticStyle: {
      "font-weight": "bold"
    }
  }, [_vm._v(_vm._s(_vm.$t('hepan-label')))]), _vm._v(" "), _c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.hemu_rate.hepan)
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "fenge",
    staticStyle: {
      "font-weight": "bold"
    }
  }, [_vm._v(_vm._s(_vm.$t('yiju-label')))]), _vm._v(" "), _c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.hemu_rate.juzhu)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.data_obj.energy) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_nengliang : _vm.tw_nengliang
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.energy) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('p', {
    staticClass: "zm"
  }, [_c('span', [_vm._v("女方生肖：" + _vm._s(_vm.data_obj.energy.fsx))]), _vm._v(" "), _c('span', {
    staticStyle: {
      "float": "right",
      "margin-right": "0.4rem"
    }
  }, [_vm._v("男方生肖：" + _vm._s(_vm.data_obj.energy.msx))])]), _vm._v(" "), _c('p', {
    staticClass: "zm fenge"
  }, [_vm._v("男女生肖合盘：" + _vm._s(_vm.data_obj.energy.title))]), _vm._v(" "), _c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.energy.total)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.data_obj.career) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_career : _vm.tw_career,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.career) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.career)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.data_obj.family) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_family : _vm.tw_family,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.family) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.family)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.data_obj.character) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": __webpack_require__(1149),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.character) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.character)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.data_obj.parents) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_parents : _vm.tw_parents,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.parents) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('p', {
    staticClass: "zm"
  }, [_vm._v("婆媳关系")]), _vm._v(" "), _c('p', {
    staticClass: "fenge",
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.parents.poxi)
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "zm"
  }, [_vm._v("丈夫关系")]), _vm._v(" "), _c('p', {
    staticClass: "fenge",
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.parents.fuzhang)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.data_obj.blossom) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_blossom : _vm.tw_blossom,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.blossom) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.blossom)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.data_obj.all) ? _c('img', {
    staticClass: "info_img",
    attrs: {
      "src": _vm.language === 'zh-CN' ? _vm.cn_all : _vm.tw_all,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.data_obj.all) ? _c('div', {
    staticClass: "common_cn"
  }, [_c('div', {
    staticClass: "star"
  }, _vm._l((_vm.getStarts(_vm.data_obj.all.score)), function(item) {
    return _c('img', {
      key: item.index,
      attrs: {
        "src": item,
        "alt": ""
      }
    })
  }), 0), _vm._v(" "), _c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.data_obj.all.desc)
    }
  })]) : _vm._e(), _vm._v(" "), _c('CopyCode', {
    attrs: {
      "set_title": true,
      "title_icon": "https://psychicai-static.psychicai.pro/imgs/2404e7ce06d17d704985b300bbb80fd6080c.png",
      "title_icon_style": "width: 5.26rem;height: .92rem;margin:.24rem auto .44rem;",
      "className": "marry-box",
      "tips1_color": "#222",
      "code_color": "#B1031F",
      "transfer_code": _vm.transfer_code,
      "codeClass": "marry-code",
      "code_btn": _vm.is_cn ? _vm.cn_code_btn : _vm.tw_code_btn,
      "code_text_style": "margin:.27rem auto .39rem;color:#6E6E6E",
      "tips5_style": "width: 6.34rem;height: .92rem;",
      "a_token": "bkl8h9",
      "e_id": "10007",
      "c_id": "-10010",
      "e_name": "click_marriage_result"
    },
    on: {
      "showModal": function($event) {
        _vm.code_modal = true
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.code_modal) ? _c('CodePop', {
    on: {
      "close": function($event) {
        _vm.code_modal = false
      }
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ })
],[840]);