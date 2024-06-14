webpackJsonp([10],{

/***/ 0:
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

/***/ 10:
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

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_bazihehun.f916c01.png";

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_bazihhehun.b3822e5.png";

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_fang.f5b75a8.png";

/***/ }),

/***/ 1601:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(895)
}
var Component = __webpack_require__(1)(
  /* script */
  null,
  /* template */
  __webpack_require__(1615),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1602:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(907)
}
var Component = __webpack_require__(1)(
  /* script */
  null,
  /* template */
  __webpack_require__(1627),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1615:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "title text-center"
  }, [_c('b', [_vm._v(" 用户协议 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("导言")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v(" 欢迎您使用“命理寻真”软件及服务！ ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      为使用命理寻真软件（以下统称“本软件”）及服务，您应当阅读并遵守《用户协议》（以下简称“本协议”），以及《隐私权政策》。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制平台责任的条款、对用户权利进行限制的条款、约定争议解决方式和司法管辖的条款等，以及开通或使用某项服务的单独协议。限制、免责条款或者其他涉及您重大权益的条款可能以加粗、加下划线等形式提示您重点注意。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      如果您因年龄、智力等因素而不具有完全民事行为能力，请在法定监护人（以下简称“监护人”）的陪同下阅读和判断是否同意本协议。如果您是马来西亚地区以外的用户，您订立或履行本协议以及使用本服务的行为还需要同时遵守您所属和/或所处国家或地区的法律。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v(" 相关定义： ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      平台：指【COPILOT7 PTE. LTD.】及其相关服务可能存在的运营关联单位。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      命理寻真用户：指注册、登录、使用命理寻真软件及服务的个人、企业或其他组织。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      前述“命理寻真用户”统称为“用户”或“所有用户”，在本协议中更多地称为“您”。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 一、【协议的范围】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    1.1\n    本协议是您与平台之间关于您下载、安装、使用、登录本软件，以及使用本服务所订立的协议。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    1.2\n    本协议的内容，包括但不限于以下与本软件和/或本服务相关的协议、规则、规范以及平台可能不断发布的关于本软件和/或本服务的相关协议、规则、规范等内容，前述内容一经正式发布，即为本协议不可分割的组成部分，与其构成统一整体，您同样应当遵守。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 二、【关于本软件和本服务】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.1\n    本软件是指平台开发并按照本协议及平台其他协议、规则之约定授权用户下载、安装、使用的"), _c('b', [_vm._v("命理寻真")]), _vm._v("软件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.2 您知晓并同意，平台可能会根据需要更新或调整本服务的内容。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.3\n    您可以通过电脑、手机等终端以客户端、网页等形式使用本服务，具体以平台提供的为准，同时，平台会不断丰富您使用本服务的终端、形式等。当您使用本服务时，您应选择与您的终端、系统等相匹配的本软件版本，否则，您可能无法正常使用本服务。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.4\n    平台给予您一项不可转让及非排他性的许可，以按照本协议及平台其他协议、规则限定的范围和方式使用本软件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left ml-32"
  }, [_vm._v("\n    2.4.1 您可以为非商业目的在单一台终端设备上下载、安装、使用、登录本软件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left ml-32"
  }, [_vm._v("\n    2.4.2\n    本条及本协议其他条款未明示授权的其他一切权利仍由平台保留，您在行使这些权利时须另外取得平台的书面许可。平台如果未行使前述任何权利，并不构成对该权利的放弃。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.5\n    平台可能根据实际需要对本服务中收费服务的收费标准、方式进行修改和变更，平台也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，平台将在相应服务页面进行提前通知或公告。如果您不同意上述修改、变更或付费内容，您可以选择停止使用该服务。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 三、【软件的获取】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    3.1\n    您可以直接从平台的官方网站、官方应用分发平台以及平台授权的第三方网站、应用分发平台等平台官方或平台授权的渠道获取本软件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    3.2\n    如果您从未经平台授权的第三方获取本软件或与本软件名称相同的安装程序，平台无法保证该软件能够正常使用，并对因此给您造成的损失不予负责。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 四、【软件的安装与卸载】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.1\n    平台可能为不同的终端、系统等开发不同的软件版本，您应当根据实际情况选择下载合适的版本进行安装。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.2下载安装程序后，您需要按照该程序提示的步骤正确安装。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.3\n    为提供更加优质、安全的服务，在本软件安装时平台可能推荐您安装其他软件，您可以选择安装或不安装。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.4\n    因经营策略安排或调整等原因，不同地区的用户可使用的具体平台服务的内容可能会存在差异，具体以平台实际提供的为准。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.5\n    如果您不再需要使用本软件或者需要安装新版软件，可以自行卸载。如果您愿意帮助平台改进产品服务，请告知卸载的原因。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 五、【软件的更新】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    5.1\n    为了增进用户体验、完善服务内容，平台可能不断努力开发新的服务，并为您不时提供软件更新。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    5.2\n    为了改善用户体验或提高服务安全性、保证功能的一致性等目的，平台有权对本软件进行更新，或者对软件的部分功能效果进行改变。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    5.3\n    本软件新版本发布后，旧版本的软件可能无法使用。平台不保证旧版本软件继续可用，也不保证继续对旧版本软件提供相应的客服和维护服务，请您随时核对并下载最新版本。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 六、【用户信息及个人信息保护】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.1\n    保护用户信息是平台的一项基本原则，平台将在法律允许的范围内按照本协议及"), _c('a', {
    attrs: {
      "href": "privacy.html",
      "target": "_self"
    }
  }, [_vm._v("《隐私权政策》")]), _vm._v("的规定收集、使用、储存和分享您的相关信息。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.2\n    您在注册账号或使用本服务的过程中，可能需要填写一些必要的信息。若国家法律法规（本协议中的“法律法规”指用户所属/所处地区、国家现行有效的法律、行政法规、司法解释、地方性法规、地方规章、部门规章及其他规范性文件以及对于该等法律法规的不时修改和补充，以及相关政策规定等，下同。）有特殊规定的，您需要填写真实的身份信息（包括但不限于手机号等信息）。若您填写的信息不完整或不真实，则可能无法使用本服务或在使用过程中受到限制。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      6.3\n      在您进行账号注册或使用本服务时，如发现您账号可能存在涉诈、虚假注册等异常情形或风险的，平台有权根据相关法律法规规定重新核验您的账号，并可根据风险情况，采取限期改正、限制功能、暂停使用、关闭账号、禁止重新注册以及本协议规定的其他处置措施。在向您提供服务过程中，如发现涉诈、冒名顶替等违法犯罪线索、风险信息的，平台有权依照国家有关规定移送公安、金融、电信、网信等主管部门。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      6.4\n      在您使用平台服务时，请务必妥善保管个人账号及密码，不得非法买卖、出租、出借个人账号。如发现您的账号可能存在异常情形或风险的，平台有权根据相关法律法规规定重新核验您的账号。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.5\n    一般情况下，您可根据相关产品规则浏览、修改自己提交的信息。但出于安全性和身份识别（如账号申诉服务等）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.6\n    平台将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.7\n    平台遵照法律法规的规定，对信息的分享进行严格的限制。如果确有必要，将严格参照《隐私权政策》或其他相关规则执行。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.8 平台非常重视对未成年人个人信息的保护。"), _c('b', [_vm._v("\n      如果您是未成年人，请在法定监护人陪同下阅读本协议及其他相关协议，并特别注意与未成年人使用相关的条款，在取得法定监护人的同意后，在法定监护人监护、指导下使用本服务。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 七、【用户行为规范】 ")])]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.1 【注册及账号使用】 ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 您充分理解并同意： ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.1.1 ")]), _vm._v("\n\n    用户应当按照法律法规和服务要求，按相应页面的提示准确提供并及时更新用户的资料，以使之真实、及时、完整和准确。用户不得冒充他人进行注册，不得未经许可为他人注册，不得以可能误导其他用户的方式注册账号，不得使用可能侵犯他人权益的用户名进行注册（包括但不限于涉嫌商标权、名誉权侵权等），不得以批量等方式恶意注册账号，否则平台有权在发现后不予注册或注销该账号，由此给用户产生的损失应由用户自行承担。\n  ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.1.2 ")]), _vm._v("\n    用户须确认，在用户完成注册程序或以其他平台允许的方式实际使用本服务时，个人用户应当是具备完全民事行为能力的自然人，如不具备完全民事行为能力，则应征得监护人的明确同意后方能注册成为本服务的个人用户。若用户不具备前述主体资格，请勿使用本服务，否则用户及用户的监护人应承担因此而导致的一切后果，且平台有权注销、暂时冻结或永久冻结用户的账户，给平台造成损失的，平台有权向用户及相关用户的监护人追偿。\n  ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2 【用户注意事项】 ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 您充分理解并同意： ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.1 ")]), _vm._v("\n    为了向您提供更好的服务或维护软件安全的目的，平台将按照法律法规规定的“合法、必要、正当”的原则获取您的相关信息。\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.2 ")]), _vm._v("\n    您在使用本服务某一特定功能时，可能还需同意单独的协议、规则等，您在使用该项功能前请仔细阅读前述相关协议、规则。\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.3 ")]), _vm._v("\n    您可以选择不向平台提供您的某些信息，或者根据产品设置取消平台收集某些信息的权利，但因此可能会导致相关服务功能无法实现。\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.4 ")]), _vm._v("\n    平台将会尽其商业上的合理努力保障您在本服务中的数据存储安全，但是，平台并不能就此提供完全保证，包括但不限于以下情形：\n    "), _c('br'), _vm._v("\n    （1）平台不对由于非平台原因造成的您在本软件和/或本服务中相关数据的删除或储存失败负责。\n    "), _c('br'), _vm._v("\n    （2）您应自行备份存储在本软件和/或本服务中的数据、信息或与本软件和/或本服务相关的数据、信息，双方另有约定的按相应约定执行。\n    "), _c('br'), _vm._v("\n    （3）如果您停止使用本软件和/或本服务（如注销您的账号时），或因您违反法律法规或本协议而被取消或终止本服务，平台有权从服务器上永久地删除您的数据。\n  ")]), _vm._v(" "), _c('p', [_c('b', {
    staticClass: "ml-32"
  }, [_vm._v("7.3【用户禁止行为】")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', {
    staticClass: "ml-32"
  }, [_vm._v("\n      您在使用本软件和/或本服务的过程中，应遵守相关法律法规、用户协议、规则规范等，不得从事包括但不限于以下任何行为，也不得为以下任何行为提供便利：\n    ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.3.1 法律法规禁止的行为 ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', {
    staticClass: "ml-32"
  }, [_vm._v("\n      您理解并同意，平台一直致 力于为用户提供文明健康、规范有序的网 络环境\n      ，您不 得利用本服务账号 或功能账号 或本软件及服务，制作、上传\n      、复制、发布、传送 、传播 或者转载可能干扰 本服务正常运营，或侵犯 其他\n      主体合法权益，或者违反 国家法律法规规定的内容，包括但不限于：\n    ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', [_vm._v("\n      （1）反对宪法所确定的基本原则的；"), _c('br'), _vm._v("\n      （2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；"), _c('br'), _vm._v("\n      （3）损害国家荣誉和利益的；"), _c('br'), _vm._v("\n      （4）歪曲 、丑化 、亵渎 、否定 英雄烈士 事迹和精神 ，以 侮辱 、诽谤\n      或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉的；"), _c('br'), _vm._v("\n      （5）宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动的；"), _c('br'), _vm._v("\n      （6）煽动民族仇恨、民族歧视，破坏民族团结的；"), _c('br'), _vm._v("\n      （7）破坏国家宗教政策，宣扬邪教和封建迷信的；"), _c('br'), _vm._v("\n      （8）散布谣言，扰乱社会秩序，破坏社会稳定的；"), _c('br'), _vm._v("\n      （9）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；"), _c('br'), _vm._v("\n      （10）侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；"), _c('br'), _vm._v("\n      （11）使用夸张标题，内容与标题严重不符的；"), _c('br'), _vm._v("\n      （12）炒作绯闻、丑闻、劣迹等的；"), _c('br'), _vm._v("\n      （13）不当评述自然灾害、重大事故等灾难的；"), _c('br'), _vm._v("\n      （14）带有性暗示、性挑逗等易使人产生性联想的；"), _c('br'), _vm._v("\n      （15）展现血腥、惊悚、残忍等致人身心不适的；"), _c('br'), _vm._v("\n      （16）煽动人群歧视、地域歧视等的；"), _c('br'), _vm._v("\n      （17）宣扬低俗、庸俗、媚俗内容的；"), _c('br'), _vm._v("\n      （18）可能引发未成年人模仿不安全行为和违反社会公德行为、诱导未成年人不良嗜好等的；"), _c('br'), _vm._v("\n      （19）侵害未成年人合法权益或者损害未成年人身心健康的内容；"), _c('br'), _vm._v("\n      （20）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；"), _c('br'), _vm._v("\n      （21）以非法民间组织名义活动的；"), _c('br'), _vm._v("\n      （22）违反法律法规底线、社会主义制度底线、国家利益底线、公民合法权益底线、社会公共秩序底线、道德风尚底线和信息真实性底线的“七条底线”要求的；"), _c('br'), _vm._v("\n      （23）其他法律、行政法规禁止的或对网络生态造成不良影响的内容。\n    ")])]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v("7.3.2软件使用")]), _vm._v(" "), _c('br'), _vm._v("\n    除非法律法规允许或平台书面许可，您不得从事下列行为："), _c('br'), _vm._v("\n    （1）删除本软件及其副本上关于著作权的信息。"), _c('br'), _vm._v("\n    （2）对本软件进行反向工程、反向汇编、反向编译\n    ，或者以其他方式尝试发现本软件的源代码。"), _c('br'), _vm._v("\n    （3）对平台拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等。"), _c('br'), _vm._v("\n    （4）对本软件或者本软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及本软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非平台经授权的第三方工具/服务接入本软件和相关系统。"), _c('br'), _vm._v("\n    （5）通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播\n    ，无论这些行为是否为商业目的。"), _c('br'), _vm._v("\n    （6）通过非平台开发、授权的第三方软件、插件、外挂、系统，登录或使用本软件和/或本服务，或制作、发布、传播上述工具。"), _c('br'), _vm._v("\n    （7）自行、授权他人或利用第三方软件对本软件和/或本服务及其组件、模块、数据等进行干扰。"), _c('br'), _vm._v("\n    （8）其他可能影响、干扰本软件和/或本服务正常运行的行为。\n  ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.3.3危害平台安全内容")]), _vm._v(" "), _c('br'), _vm._v("\n    您不得从事包括但不限于以下任何行为，也不得为以下任何行为提供便利："), _c('br'), _vm._v("\n    （1）传播虚假中奖信息 、钓鱼欺 诈信息 、非法或虚假 理财信息\n    等非法、诈骗或虚假信息。"), _c('br'), _vm._v("\n    （2）传播包含病毒、木马等的文件、程序或相应制作教程等的内容、信息。"), _c('br'), _vm._v("\n    （3）其他危害平台、本软件或其他主体安全的内容、信息或行为。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("7.4 【法律责任】")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.1\n    您理解并同意：若您违反法律法规、本协议和/或平台其他协议、规则的，平台有权随时单方根据相应情形采取以下一项或多项措施（具体措施的时间长短由平台根据您的违法违约情节相应情况确定）："), _c('br'), _vm._v("\n    （1）对您进行警告。"), _c('br'), _vm._v("\n    （2）限制您使用本软件和/或本服务部分或全部功能。"), _c('br'), _vm._v("\n    （3）删除、屏蔽相关内容或断开链接。"), _c('br'), _vm._v("\n    （4）中止、终止您对相应中"), _c('b', [_vm._v("命理寻真")]), _vm._v("账号的使用（简称“封号”）。"), _c('br'), _vm._v("\n    （5）采取其他合理、合法的措施。"), _c('br'), _vm._v("\n    （6）依法追究您的法律责任。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.2\n    如果您违反法律法规、本协议和/或平台其他协议、规则，平台对您或您使用的本软件和/或本服务采取任何行为或措施后，导致您暂时或永久无法使用"), _c('b', [_vm._v("命理寻真")]), _vm._v("、无法使\n    用"), _c('b', [_vm._v("命理寻真")]), _vm._v("登录或使用其他产品和/或服务，您应自行承担相应后果，由此造成您损失的，您应自行承担。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.3\n    您应自行对因使用本服务而产生或存储在本服务中的数据，在本服务之外，采取合理、安全的备份。若平台根据本协议对您采取永久封号等措施的，对于您的与本服务相关的全部数据或您存储在本服务中的全部数据、信息等，平台有权将该等数据全部予以删除，相应后果您应自行承担。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.4\n    您导致任何第三方损害的，您应当独立承担责任，平台因此遭受损失的，您也应当一并赔偿。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.5 【对自己行为负责】"), _c('br'), _vm._v("\n    您充分了解并同意，您必须为自己使用本软件和/或本服务的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对使用本软件和/或本服务时接触到的内容自行加以判断，包括因对内容的正确性、完整性或实用性的依赖而产生的风险，并承担由此引起的相应风险。平台在法律允许的范围内不对您因前述风险而导致的任何损失或损害承担责任。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      如您为不具有完全民事行为能力的自然人，您应理解，您的监护人将对您使用本服务的一切行为负责。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("7.6 【用户发送/传播违规内容与投诉处理】")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.6.1\n    未经授权和许可，用户不得利用"), _c('b', [_vm._v("命理寻真")]), _vm._v("上传、储存、共享、传播含有受到知识产权法律保护的图像、相片、视频、软件或其他数据资料、文件。用户违反相关知识产权保护法律、规范，侵害第三方合法权益的，均由用户自行承担责任，给平台造成损失的应当赔偿。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      7.6.2\n      如您被他人投诉或您投诉他人，平台有权依法保存有关信息，并将争议中相关方的主体、联系方式、投诉相关内容等必要信息提供给相关当事方或相关部门，配合调查处理等，用户应独自承担由此而产生的一切法律责任。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 八、【第三方提供的产品或服务】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    8.1\n    您在平台上使用第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议，我们建议您在使用该种第三方产品或服务前仔细阅读其用户协议及隐私权政策。平台和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    8.2\n    因用户使用本软件或要求平台提供特定服务时，本软件可能会调用第三方系统或者通过第三方支持用户的使用或访问，使用或访问的结果由该第三方提供（包括但不限于您通过本服务跳转到的第三方提供的服务及内容，第三方通过平台开放平台接入的服务及内容等），平台不对该种第三方提供的服务负责。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v("九、【广告】及【付费】")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    9.1\n    您同意平台可以自行或由第三方通过短信、电子邮件或电子信息等多种方式向您发送、展示广告或其他信息（包括商业与非商业信息），广告或其他信息的具体发送及展示形式、频次及内容等以平台实际提供为准。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    9.2\n    平台将依照相关法律法规要求开展广告业务。您同意，对本服务中出现的广告，您应审慎判断其真实性和可靠性，除法律明确规定外，您应对因该广告而实施的行为负责。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    9.3\n    为了提供更好的服务体验，我们将陆续完善服务细则，提供丰富的服务内容，具体内容及服务类别以您使用"), _c('b', [_vm._v("命理寻真")]), _vm._v("时显示的页面为准。关于“"), _c('b', [_vm._v("命理寻真")]), _vm._v("付费系列服务”，为您提供如下简介：\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 【单项服务订购】")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v("\n      我们将不定期推出单项服务，您可在相应的购买界面查阅订购资格、服务金额、服务内容、服务期限等细则，您阅读无误后可选择付费购买，享受相应的单项服务。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v("十、【知识产权】")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    10.1平台是本软件的知识产权权利人。本软件的著作权、商标权、专利权、商业秘密等知识产权，以及与本软件相关的所有信息内容（包括但不限于文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受法律法规和相应的国际条约保护，平台依法享有上述相关知识产权，但相关权利人依照法律规定应享有的权利除外。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    10.2未经平台或相关权利人书面同意，您不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权。\n  ")]), _vm._v(" "), _c('p', [_vm._v("十一、【终端安全责任】")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    11.1\n    您理解并同意，本软件和/或本服务同大多数互联网软件、服务一样，可能会受多种因素影响（包括但不限于用户原因、网络服务质量、社会环境等）；也可能会受各种安全问题的侵扰（包括但不限于他人非法利用用户资料，进行现实中的骚扰；用户下载安装的其他软件或访问的其他网站中可能含有病毒、木马程序或其他恶意程序，威胁您终端的信息和数据的安全，继而影响本软件、本服务的正常使用等），因此，您应加强信息安全及个人信息的保护意识，注意密码保护，以免遭受损失。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    11.2\n    您不得制作、发布、使用、传播用于窃取"), _c('b', [_vm._v("命理寻真")]), _vm._v("号码和/或他人个人信息、财产的恶意程序。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    11.3\n    维护软件安全与正常使用是平台和您的共同责任，平台将按照行业标准合理审慎地采取必要技术措施保护您的终端信息和数据安全，但是您承认和同意平台不能就此提供任何保证。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十二、【第三方软件或技术】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    12.1\n    本软件可能会使用第三方软件或技术（包括本软件可能使用的开源代码和公共领域代码等，下同），这种使用已经获得合法授权。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    12.2\n    本软件如果使用了第三方的软件或技术，平台将按照相关法规或约定，对相关的协议或其他文件，可能通过本协议附件、在本软件安装包特定文件夹中打包等形式进行展示，它们可能会以“软件使用许可协议”“授权协议”“开源代码许可证”或其他形式来表达。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    12.3\n    前述通过各种形式展现的相关协议或其他文件，均是本协议不可分割的组成部分，与本协议具有同等的法律效力，您应当遵守这些要求。如果您没有遵守这些要求，该第三方或者国家机关可能会对您提起诉讼、罚款或采取其他制裁措施，并要求平台给予协助，您应当自行承担法律责任。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十三、【不可抗力及其他免责事由】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.1\n    您理解并同意，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务受到影响。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，平台将努力在第一时间与相关单位配合，争取及时进行处理，但是由此给您造成的损失平台在法律允许的范围内免责。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.2 在法律允许的范围内，平台对以下情形导致的服务中断或受阻不承担责任："), _c('br'), _vm._v("\n    （1）受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏。"), _c('br'), _vm._v("\n    （2）用户或平台的电脑软件、系统、硬件和通信线路出现故障。"), _c('br'), _vm._v("\n    （3）用户操作不当或用户通过非平台授权的方式使用本服务。"), _c('br'), _vm._v("\n    （4）程序版本过时、设备的老化和/或其兼容性问题。"), _c('br'), _vm._v("\n    （5）其他平台无法控制或合理预见的情形。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.3\n    您理解并同意，在使用本服务的过程中，可能会遇到网络信息或其他用户行为带来的风险，平台不对任何信息的真实性、适用性、合法性承担责任，也不对因侵权行为给您造成的损害负责。这些风险包括但不限于："), _c('br'), _vm._v("\n    （1）来自他人匿名或冒名的含有威胁、诽谤、令人反感或非法内容的信息。"), _c('br'), _vm._v("\n    （2）遭受他人误导、欺骗或其他导致或可能导致的任何心理、生理上的伤害以及经济上的损失。"), _c('br'), _vm._v("\n    （3）其他因网络信息或用户行为引起的风险。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.4\n    平台依据本协议约定获得处理违法违规内容的权利，该权利不构成平台的义务或承诺，平台不能保证及时发现违法行为或进行相应处理。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.5\n    在任何情况下，您不应轻信借款、索要密码或其他涉及财产的信息。涉及财产操作的，请一定先核实对方身份，并请经常留意平台有关防范诈骗犯罪的提示。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十四、【其他】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.1\n    您使用本软件和/或本服务即视为您已阅读本协议并接受本协议的约束。平台有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。本协议条款变更后，如果您继续使用平台提供的软件或服务，即视为您已接受变更后的协议。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("14.2 本协议签订地为新加坡国。")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.3\n    本协议的成立、生效、履行、解释及纠纷解决，适用平台所在地法律（不包括冲突法）。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.4\n    若您和平台之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交平台所在地有管辖权的人民法院管辖。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.5\n    本协议所有条款的标题仅为阅读方便，本身并无实际含义，不能作为本协议涵义解释的依据。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.6\n    本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.7\n    若本协议有中文、英文等多个语言版本，相应内容不一致的，均以中文版的内容为准。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十五、【联系我们】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      15.1\n      当您对我们的产品有相关建议或者有其它相关事宜需要我们协助，或需对发现的违规内容进行投诉、举报，可通过命理寻真客户端，进入“我的”-“设置”-“联系我们”向我们反馈，我们将尽快审核所涉问题，并在法律法规规定的期限内回复您的请求。\n    ")])])])
}]}

/***/ }),

/***/ 1627:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "title text-center"
  }, [_c('b', [_vm._v(" 用戶協議 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("導言")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v(" 歡迎您使用「命理尋真」軟件及服務！ ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      為使用命理尋真軟件（以下統稱「本軟件」）及服務，您應當閱讀並遵守《用戶協議》（以下簡稱「本協議」），以及《隱私權政策》。請您務必審慎閱讀、充分理解各條款內容，特別是免除或者限製平臺責任的條款、對用戶權利進行限製的條款、約定爭議解決方式和司法管轄的條款等，以及開通或使用某項服務的單獨協議。限製、免責條款或者其他涉及您重大權益的條款可能以加粗、加下劃線等形式提示您重點註意。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      如果您因年齡、智力等因素而不具有完全民事行為能力，請在法定監護人（以下簡稱「監護人」）的陪同下閱讀和判斷是否同意本協議。如果您是馬來西亞地區以外的用戶，您訂立或履行本協議以及使用本服務的行為還需要同時遵守您所屬和/或所處國家或地區的法律。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v(" 相關定義： ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v(" 平臺：指【COPILOT7 PTE. LTD.】及其相關服務可能存在的運營關聯單位。")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      命理尋真用戶：指註冊、登錄、使用命理尋真軟件及服務的個人、企業或其他組織。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      前述「命理尋真用戶」統稱為「用戶」或「所有用戶」，在本協議中更多地稱為「您」。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 一、【協議的範圍】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    1.1 本協議是您與平臺之間關於您下載、安裝、使用、登錄本軟件，以及使用本服務所訂立的協議。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    1.2 本協議的內容，包括但不限於以下與本軟件和/或本服務相關的協議、規則、規範以及平臺可能不斷發布的關於本軟件和/或本服務的相關協議、規則、規範等內容，前述內容一經正式發布，即為本協議不可分割的組成部分，與其構成統一整體，您同樣應當遵守。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 二、【關於本軟件和本服務】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.1 本軟件是指平臺開發並按照本協議及平臺其他協議、規則之約定授權用戶下載、安裝、使用的"), _c('b', [_vm._v("命理尋真")]), _vm._v("軟件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.2 您知曉並同意，平臺可能會根據需要更新或調整本服務的內容。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.3 您可以通過電腦、手機等終端以客戶端、網頁等形式使用本服務，具體以平臺提供的為準，同時，平臺會不斷豐富您使用本服務的終端、形式等。當您使用本服務時，您應選擇與您的終端、系統等相匹配的本軟件版本，否則，您可能無法正常使用本服務。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.4 平臺給予您一項不可轉讓及非排他性的許可，以按照本協議及平臺其他協議、規則限定的範圍和方式使用本軟件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left ml-32"
  }, [_vm._v("\n    2.4.1 您可以為非商業目的在單一臺終端設備上下載、安裝、使用、登錄本軟件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left ml-32"
  }, [_vm._v("\n    2.4.2 本條及本協議其他條款未明示授權的其他一切權利仍由平臺保留，您在行使這些權利時須另外取得平臺的書面許可。平臺如果未行使前述任何權利，並不構成對該權利的放棄。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    2.5 平臺可能根據實際需要對本服務中收費服務的收費標準、方式進行修改和變更，平臺也可能會對部分免費服務開始收費。前述修改、變更或開始收費前，平臺將在相應服務頁面進行提前通知或公告。如果您不同意上述修改、變更或付費內容，您可以選擇停止使用該服務。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 三、【軟件的獲取】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    3.1 您可以直接從平臺的官方網站、官方應用分發平臺以及平臺授權的第三方網站、應用分發平臺等平臺官方或平臺授權的渠道獲取本軟件。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    3.1 您可以直接從平臺的官方網站、官方應用分發平臺以及平臺授權的第三方網站、應用分發平臺等平臺官方或平臺授權的渠道獲取本軟件。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 四、【軟件的安裝與卸載】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.1 平臺可能為不同的終端、系統等開發不同的軟件版本，您應當根據實際情況選擇下載合適的版本進行安裝。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.2 下載安裝程序後，您需要按照該程序提示的步驟正確安裝。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.3 為提供更加優質、安全的服務，在本軟件安裝時平臺可能推薦您安裝其他軟件，您可以選擇安裝或不安裝。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.4 因經營策略安排或調整等原因，不同地區的用戶可使用的具體平臺服務的內容可能會存在差異，具體以平臺實際提供的為準。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    4.5 如果您不再需要使用本軟件或者需要安裝新版軟件，可以自行卸載。如果您願意幫助平臺改進產品服務，請告知卸載的原因。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 五、【軟件的更新】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    5.1 為了增進用戶體驗、完善服務內容，平臺可能不斷努力開發新的服務，並為您不時提供軟件更新。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    5.2 為了改善用戶體驗或提高服務安全性、保證功能的一致性等目的，平臺有權對本軟件進行更新，或者對軟件的部分功能效果進行改變。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    5.3 本軟件新版本發布後，舊版本的軟件可能無法使用。平臺不保證舊版本軟件繼續可用，也不保證繼續對舊版本軟件提供相應的客服和維護服務，請您隨時核對並下載最新版本。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 六、【用戶信息及個人信息保護】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.1 保護用戶信息是平臺的一項基本原則，平臺將在法律允許的範圍內按照本協議及"), _c('a', {
    attrs: {
      "href": "privacy.html",
      "target": "_self"
    }
  }, [_vm._v("《隱私權政策》")]), _vm._v("的規定收集、使用、儲存和分享您的相關信息。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.2 您在註冊賬號或使用本服務的過程中，可能需要填寫一些必要的信息。若國家法律法規（本協議中的「法律法規」指用戶所屬/所處地區、國家現行有效的法律、行政法規、司法解釋、地方性法規、地方規章、部門規章及其他規範性文件以及對於該等法律法規的不時修改和補充，以及相關政策規定等，下同。）有特殊規定的，您需要填寫真實的身份信息（包括但不限於手機號等信息）。若您填寫的信息不完整或不真實，則可能無法使用本服務或在使用過程中受到限製。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      6.3 在您進行賬號註冊或使用本服務時，如發現您賬號可能存在涉詐、虛假註冊等異常情形或風險的，平臺有權根據相關法律法規規定重新核驗您的賬號，並可根據風險情況，采取限期改正、限製功能、暫停使用、關閉賬號、禁止重新註冊以及本協議規定的其他處置措施。在向您提供服務過程中，如發現涉詐、冒名頂替等違法犯罪線索、風險信息的，平臺有權依照國家有關規定移送公安、金融、電信、網信等主管部門。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      6.4 在您使用平臺服務時，請務必妥善保管個人賬號及密碼，不得非法買賣、出租、出借個人賬號。如發現您的賬號可能存在異常情形或風險的，平臺有權根據相關法律法規規定重新核驗您的賬號。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.5 一般情況下，您可根據相關產品規則瀏覽、修改自己提交的信息。但出於安全性和身份識別（如賬號申訴服務等）的考慮，您可能無法修改註冊時提供的初始註冊信息及其他驗證信息。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.6 平臺將運用各種安全技術和程序建立完善的管理製度來保護您的個人信息，以免遭受未經授權的訪問、使用或披露。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.7 平臺遵照法律法規的規定，對信息的分享進行嚴格的限製。如果確有必要，將嚴格參照《隱私權政策》或其他相關規則執行。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    6.8 平臺非常重視對未成年人個人信息的保護。"), _c('b', [_vm._v("\n      如果您是未成年人，請在法定監護人陪同下閱讀本協議及其他相關協議，並特別註意與未成年人使用相關的條款，在取得法定監護人的同意後，在法定監護人監護、指導下使用本服務。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 七、【用戶行為規範】 ")])]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.1 【註冊及賬號使用】 ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 您充分理解並同意： ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.1.1 ")]), _vm._v("\n\n    用戶應當按照法律法規和服務要求，按相應頁面的提示準確提供並及時更新用戶的資料，以使之真實、及時、完整和準確。用戶不得冒充他人進行註冊，不得未經許可為他人註冊，不得以可能誤導其他用戶的方式註冊賬號，不得使用可能侵犯他人權益的用戶名進行註冊（包括但不限於涉嫌商標權、名譽權侵權等），不得以批量等方式惡意註冊賬號，否則平臺有權在發現後不予註冊或註銷該賬號，由此給用戶產生的損失應由用戶自行承擔。\n  ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.1.2 ")]), _vm._v("\n    用戶須確認，在用戶完成註冊程序或以其他平臺允許的方式實際使用本服務時，個人用戶應當是具備完全民事行為能力的自然人，如不具備完全民事行為能力，則應征得監護人的明確同意後方能註冊成為本服務的個人用戶。若用戶不具備前述主體資格，請勿使用本服務，否則用戶及用戶的監護人應承擔因此而導致的一切後果，且平臺有權註銷、暫時凍結或永久凍結用戶的賬戶，給平臺造成損失的，平臺有權向用戶及相關用戶的監護人追償。\n  ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2 【用戶註意事項】 ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 您充分理解並同意： ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.1 ")]), _vm._v("\n    為了向您提供更好的服務或維護軟件安全的目的，平臺將按照法律法規規定的「合法、必要、正當」的原則獲取您的相關信息。\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.2 ")]), _vm._v("\n    您在使用本服務某一特定功能時，可能還需同意單獨的協議、規則等，您在使用該項功能前請仔細閱讀前述相關協議、規則。\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.3 ")]), _vm._v("\n    您可以選擇不向平臺提供您的某些信息，或者根據產品設置取消平臺收集某些信息的權利，但因此可能會導致相關服務功能無法實現。\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.2.4 ")]), _vm._v("\n    平臺將會盡其商業上的合理努力保障您在本服務中的數據存儲安全，但是，平臺並不能就此提供完全保證，包括但不限於以下情形：\n    "), _c('br'), _vm._v("\n    （1）平臺不對由於非平臺原因造成的您在本軟件和/或本服務中相關數據的刪除或儲存失敗負責。\n    "), _c('br'), _vm._v("\n    （2）您應自行備份存儲在本軟件和/或本服務中的數據、信息或與本軟件和/或本服務相關的數據、信息，雙方另有約定的按相應約定執行。\n    "), _c('br'), _vm._v("\n    （3）如果您停止使用本軟件和/或本服務（如註銷您的賬號時），或因您違反法律法規或本協議而被取消或終止本服務，平臺有權從服務器上永久地刪除您的數據。\n  ")]), _vm._v(" "), _c('p', [_c('b', {
    staticClass: "ml-32"
  }, [_vm._v("7.3【用戶禁止行為】")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', {
    staticClass: "ml-32"
  }, [_vm._v("\n      您在使用本軟件和/或本服務的過程中，應遵守相關法律法規、用戶協議、規則規範等，不得從事包括但不限於以下任何行為，也不得為以下任何行為提供便利：\n    ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.3.1 法律法規禁止的行為 ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', {
    staticClass: "ml-32"
  }, [_vm._v("\n      您理解並同意，平臺一直致力於為用戶提供文明健康、規範有序的網絡環境，您不得利用本服務賬號或功能賬號或本軟件及服務，製作、上傳、復製、發布、傳送、傳播或者轉載可能幹擾本服務正常運營，或侵犯其他主體合法權益，或者違反國家法律法規規定的內容，包括但不限於：\n    ")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', [_vm._v("\n      （1）反對憲法所確定的基本原則的；"), _c('br'), _vm._v("\n      （2）危害國家安全，泄露國家秘密，顛覆國家政權，破壞國家統一的；"), _c('br'), _vm._v("\n      （3）損害國家榮譽和利益的；"), _c('br'), _vm._v("\n      （4）歪曲、醜化、褻瀆、否定英雄烈士事跡和精神，以侮辱、誹謗或者其他方式侵害英雄烈士的姓名、肖像、名譽、榮譽的；"), _c('br'), _vm._v("\n      （5）宣揚恐怖主義、極端主義或者煽動實施恐怖活動、極端主義活動的；"), _c('br'), _vm._v("\n      （6）煽動民族仇恨、民族歧視，破壞民族團結的；"), _c('br'), _vm._v("\n      （7）破壞國家宗教政策，宣揚邪教和封建迷信的；"), _c('br'), _vm._v("\n      （8）散布謠言，擾亂社會秩序，破壞社會穩定的；"), _c('br'), _vm._v("\n      （9）散布淫穢、色情、賭博、暴力、恐怖或者教唆犯罪的；"), _c('br'), _vm._v("\n      （10）侮辱或者誹謗他人，侵害他人名譽、隱私和其他合法權益的；"), _c('br'), _vm._v("\n      （11）使用誇張標題，內容與標題嚴重不符的；"), _c('br'), _vm._v("\n      （12）炒作緋聞、醜聞、劣跡等的；"), _c('br'), _vm._v("\n      （13）不當評述自然災害、重大事故等災難的；"), _c('br'), _vm._v("\n      （14）帶有性暗示、性挑逗等易使人產生性聯想的；"), _c('br'), _vm._v("\n      （15）展現血腥、驚悚、殘忍等致人身心不適的；"), _c('br'), _vm._v("\n      （16）煽動人群歧視、地域歧視等的；"), _c('br'), _vm._v("\n      （17）宣揚低俗、庸俗、媚俗內容的；"), _c('br'), _vm._v("\n      （18）可能引發未成年人模仿不安全行為和違反社會公德行為、誘導未成年人不良嗜好等的；"), _c('br'), _vm._v("\n      （19）侵害未成年人合法權益或者損害未成年人身心健康的內容；"), _c('br'), _vm._v("\n      （20）煽動非法集會、結社、遊行、示威、聚眾擾亂社會秩序；"), _c('br'), _vm._v("\n      （21）以非法民間組織名義活動的；"), _c('br'), _vm._v("\n      （22）違反法律法規底線、社會主義製度底線、國家利益底線、公民合法權益底線、社會公共秩序底線、道德風尚底線和信息真實性底線的「七條底線」要求的；"), _c('br'), _vm._v("\n      （23）其他法律、行政法規禁止的或對網絡生態造成不良影響的內容。 \n    ")])]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v("7.3.2 軟件使用")]), _vm._v(" "), _c('br'), _vm._v("\n    除非法律法規允許或平臺書面許可，您不得從事下列行為："), _c('br'), _vm._v("\n    （1）刪除本軟件及其副本上關於著作權的信息。 "), _c('br'), _vm._v("\n    （2）對本軟件進行反向工程、反向匯編、反向編譯，或者以其他方式嘗試發現本軟件的源代碼。 "), _c('br'), _vm._v("\n    （3）對平臺擁有知識產權的內容進行使用、出租、出借、復製、修改、鏈接、轉載、匯編、發表、出版、建立鏡像站點等。 "), _c('br'), _vm._v("\n    （4）對本軟件或者本軟件運行過程中釋放到任何終端內存中的數據、軟件運行過程中客戶端與服務器端的交互數據，以及本軟件運行所必需的系統數據，進行復製、修改、增加、刪除、掛接運行或創作任何衍生作品，形式包括但不限於使用插件、外掛或非平臺經授權的第三方工具/服務接入本軟件和相關系統。 "), _c('br'), _vm._v("\n    （5）通過修改或偽造軟件運行中的指令、數據，增加、刪減、變動軟件的功能或運行效果，或者將用於上述用途的軟件、方法進行運營或向公眾傳播，無論這些行為是否為商業目的。 "), _c('br'), _vm._v("\n    （6）通過非平臺開發、授權的第三方軟件、插件、外掛、系統，登錄或使用本軟件和/或本服務，或製作、發布、傳播上述工具。 "), _c('br'), _vm._v("\n    （7）自行、授權他人或利用第三方軟件對本軟件和/或本服務及其組件、模塊、數據等進行幹擾。 "), _c('br'), _vm._v("\n    （8）其他可能影響、幹擾本軟件和/或本服務正常運行的行為。 \n  ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 7.3.3 危害平臺安全內容")]), _vm._v(" "), _c('br'), _vm._v("\n    您不得從事包括但不限於以下任何行為，也不得為以下任何行為提供便利："), _c('br'), _vm._v("\n    （1）傳播虛假中獎信息、釣魚欺詐信息、非法或虛假理財信息等非法、詐騙或虛假信息。 "), _c('br'), _vm._v("\n    （2）傳播包含病毒、木馬等的文件、程序或相應製作教程等的內容、信息。 "), _c('br'), _vm._v("\n    （3）其他危害平臺、本軟件或其他主體安全的內容、信息或行為。 \n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("7.4 【法律責任】")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.1\n    您理解並同意：若您違反法律法規、本協議和/或平臺其他協議、規則的，平臺有權隨時單方根據相應情形采取以下一項或多項措施（具體措施的時間長短由平臺根據您的違法違約情節相應情況確定）：\n    "), _c('br'), _vm._v("\n    （1）對您進行警告。"), _c('br'), _vm._v("\n    （2）限製您使用本軟件和/或本服務部分或全部功能。"), _c('br'), _vm._v("\n    （3）刪除、屏蔽相關內容或斷開鏈接。"), _c('br'), _vm._v("\n    （4）中止、終止您對相應中命理尋真賬號的使用（簡稱「封號」）。"), _c('br'), _vm._v("\n    （5）采取其他合理、合法的措施。"), _c('br'), _vm._v("\n    （6）依法追究您的法律責任。 \n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.2\n    如果您違反法律法規、本協議和/或平臺其他協議、規則，平臺對您或您使用的本軟件和/或本服務采取任何行為或措施後，導致您暫時或永久無法使用"), _c('b', [_vm._v("命理尋真")]), _vm._v("、無法使用"), _c('b', [_vm._v("命理尋真")]), _vm._v("登錄或使用其他產品和/或服務，您應自行承擔相應後果，由此造成您損失的，您應自行承擔。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.3\n    您應自行對因使用本服務而產生或存儲在本服務中的數據，在本服務之外，采取合理、安全的備份。若平臺根據本協議對您采取永久封號等措施的，對於您的與本服務相關的全部數據或您存儲在本服務中的全部數據、信息等，平臺有權將該等數據全部予以刪除，相應後果您應自行承擔。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.4.4 您導致任何第三方損害的，您應當獨立承擔責任；平臺因此遭受損失的，您也應當一並賠償。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.5 【對自己行為負責】"), _c('br'), _vm._v("\n    您充分了解並同意，您必須為自己使用本軟件和/或本服務的一切行為負責，包括您所發表的任何內容以及由此產生的任何後果。您應對使用本軟件和/或本服務時接觸到的內容自行加以判斷，包括因對內容的正確性、完整性或實用性的依賴而產生的風險，並承擔由此引起的相應風險。平臺在法律允許的範圍內不對您因前述風險而導致的任何損失或損害承擔責任。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      如您為不具有完全民事行為能力的自然人，您應理解，您的監護人將對您使用本服務的一切行為負責。\n    ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("7.6 【用戶發送/傳播違規內容與投訴處理】")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    7.6.1\n    未經授權和許可，用戶不得利用"), _c('b', [_vm._v("命理尋真")]), _vm._v("上傳、儲存、共享、傳播含有受到知識產權法律保護的圖像、相片、視頻、軟件或其他數據資料、文件。用戶違反相關知識產權保護法律、規範，侵害第三方合法權益的，均由用戶自行承擔責任，給平臺造成損失的應當賠償。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      7.6.2\n      如您被他人投訴或您投訴他人，平臺有權依法保存有關信息，並將爭議中相關方的主體、聯系方式、投訴相關內容等必要信息提供給相關當事方或相關部門，配合調查處理等，用戶應獨自承擔由此而產生的一切法律責任。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 八、【第三方提供的產品或服務】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    8.1\n    您在平臺上使用第三方提供的產品或服務時，除遵守本協議約定外，還應遵守第三方的用戶協議，我們建議您在使用該種第三方產品或服務前仔細閱讀其用戶協議及隱私權政策。平臺和第三方對可能出現的糾紛在法律規定和約定的範圍內各自承擔責任。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    8.2\n    因用戶使用本軟件或要求平臺提供特定服務時，本軟件可能會調用第三方系統或者通過第三方支持用戶的使用或訪問，使用或訪問的結果由該第三方提供（包括但不限於您通過本服務跳轉到的第三方提供的服務及內容，第三方通過平臺開放平臺接入的服務及內容等），平臺不對該種第三方提供的服務負責。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v("九、【廣告】及【付費】")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    9.1\n    您同意平臺可以自行或由第三方通過短信、電子郵件或電子信息等多種方式向您發送、展示廣告或其他信息（包括商業與非商業信息），廣告或其他信息的具體發送及展示形式、頻次及內容等以平臺實際提供為準。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    9.2\n    平臺將依照相關法律法規要求開展廣告業務。您同意，對本服務中出現的廣告，您應審慎判斷其真實性和可靠性，除法律明確規定外，您應對因該廣告而實施的行為負責。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    9.3\n    為了提供更好的服務體驗，我們將陸續完善服務細則，提供豐富的服務內容，具體內容及服務類別以您使用"), _c('b', [_vm._v("命理尋真")]), _vm._v("時顯示的頁面為準。關於「"), _c('b', [_vm._v("命理尋真")]), _vm._v("付費系列服務」，為您提供如下簡介：\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v(" 【單項服務訂購】")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "ml-32"
  }, [_vm._v("\n      我們將不定期推出單項服務，您可在相應的購買界面查閱訂購資格、服務金額、服務內容、服務期限等細則，您閱讀無誤後可選擇付費購買，享受相應的單項服務。\n    ")])]), _vm._v(" "), _c('p', [_c('b', [_vm._v("十、【知識產權】")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    10.1\n    平臺是本軟件的知識產權權利人。本軟件的著作權、商標權、專利權、商業秘密等知識產權，以及與本軟件相關的所有信息內容（包括但不限於文字、圖片、音頻、視頻、圖表、界面設計、版面框架、有關數據或電子文檔等）均受法律法規和相應的國際條約保護，平臺依法享有上述相關知識產權，但相關權利人依照法律規定應享有的權利除外。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    10.2\n    未經平臺或相關權利人書面同意，您不得為任何商業或非商業目的自行或許可任何第三方實施、利用、轉讓上述知識產權。\n  ")]), _vm._v(" "), _c('p', [_vm._v("十一、【終端安全責任】")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    11.1\n    您理解並同意，本軟件和/或本服務同大多數互聯網軟件、服務一樣，可能會受多種因素影響（包括但不限於用戶原因、網絡服務質量、社會環境等）；也可能會受各種安全問題的侵擾（包括但不限於他人非法利用用戶資料，進行現實中的騷擾；用戶下載安裝的其他軟件或訪問的其他網站中可能含有病毒、木馬程序或其他惡意程序，威脅您終端的信息和數據的安全，繼而影響本軟件、本服務的正常使用等），因此，您應加強信息安全及個人信息的保護意識，註意密碼保護，以免遭受損失。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    11.2\n    您不得製作、發布、使用、傳播用於竊取"), _c('b', [_vm._v("命理尋真")]), _vm._v("號碼和/或他人個人信息、財產的惡意程序。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    11.3\n    維護軟件安全與正常使用是平臺和您的共同責任，平臺將按照行業標準合理審慎地采取必要技術措施保護您的終端信息和數據安全，但是您承認和同意平臺不能就此提供任何保證。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十二、【第三方軟件或技術】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    12.1 本軟件可能會使用第三方軟件或技術（包括本軟件可能使用的開源代碼和公共領域代碼等，下同），這種使用已經獲得合法授權。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    12.2 本軟件如果使用了第三方的軟件或技術，平臺將按照相關法規或約定，對相關的協議或其他文件，可能通過本協議附件、在本軟件安裝包特定文件夾中打包等形式進行展示，它們可能會以「軟件使用許可協議」「授權協議」「開源代碼許可證」或其他形式來表達。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    12.3 前述通過各種形式展現的相關協議或其他文件，均是本協議不可分割的組成部分，與本協議具有同等的法律效力，您應當遵守這些要求。如果您沒有遵守這些要求，該第三方或者國家機關可能會對您提起訴訟、罰款或采取其他製裁措施，並要求平臺給予協助，您應當自行承擔法律責任。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十三、【不可抗力及其他免責事由】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.1\n    您理解並同意，在使用本服務的過程中，可能會遇到不可抗力等風險因素，使本服務受到影響。不可抗力是指不能預見、不能克服並不能避免且對一方或雙方造成重大影響的客觀事件，包括但不限於自然災害如洪水、地震、瘟疫流行和風暴等以及社會事件如戰爭、動亂、政府行為等。出現上述情況時，平臺將努力在第一時間與相關單位配合，爭取及時進行處理，但是由此給您造成的損失平臺在法律允許的範圍內免責。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.2 在法律允許的範圍內，平臺對以下情形導致的服務中斷或受阻不承擔責任："), _c('br'), _vm._v("\n    （1）受到計算機病毒、木馬或其他惡意程序、黑客攻擊的破壞。 "), _c('br'), _vm._v("\n    （2）用戶或平臺的電腦軟件、系統、硬件和通信線路出現故障。 "), _c('br'), _vm._v("\n    （3）用戶操作不當或用戶通過非平臺授權的方式使用本服務。 "), _c('br'), _vm._v("\n    （4）程序版本過時、設備的老化和/或其兼容性問題。 "), _c('br'), _vm._v("\n    （5）其他平臺無法控製或合理預見的情形。 \n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.3\n    您理解並同意，在使用本服務的過程中，可能會遇到網絡信息或其他用戶行為帶來的風險，平臺不對任何信息的真實性、適用性、合法性承擔責任，也不對因侵權行為給您造成的損害負責。這些風險包括但不限於："), _c('br'), _vm._v("\n    （1）來自他人匿名或冒名的含有威脅、誹謗、令人反感或非法內容的信息。 "), _c('br'), _vm._v("\n    （2）遭受他人誤導、欺騙或其他導致或可能導致的任何心理、生理上的傷害以及經濟上的損失。 "), _c('br'), _vm._v("\n    （3）其他因網絡信息或用戶行為引起的風險。 \n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.4\n    平臺依據本協議約定獲得處理違法違規內容的權利，該權利不構成平臺的義務或承諾，平臺不能保證及時發現違法行為或進行相應處理。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    13.5\n    在任何情況下，您不應輕信借款、索要密碼或其他涉及財產的信息。涉及財產操作的，請一定先核實對方身份，並請經常留意平臺有關防範詐騙犯罪的提示。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十四、【其他】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.1\n    您使用本軟件和/或本服務即視為您已閱讀本協議並接受本協議的約束。平臺有權在必要時修改本協議條款。您可以在相關服務頁面查閱最新版本的協議條款。本協議條款變更後，如果您繼續使用平臺提供的軟件或服務，即視為您已接受變更後的協議。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("14.2 本協議簽訂地為新加坡國。")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.3\n    本協議的成立、生效、履行、解釋及糾紛解決，適用平臺所在地法律（不包括沖突法）。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.4\n    若您和平臺之間發生任何糾紛或爭議，首先應友好協商解決；協商不成的，您同意將糾紛或爭議提交平臺所在地有管轄權的人民法院管轄。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.5\n    本協議所有條款的標題僅為閱讀方便，本身並無實際含義，不能作為本協議涵義解釋的依據。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.6\n    本協議條款無論因何種原因部分無效或不可執行，其余條款仍有效，對雙方具有約束力。\n  ")]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_vm._v("\n    14.7\n    若本協議有中文、英文等多個語言版本，相應內容不一致的，均以中文版的內容為準。\n  ")]), _vm._v(" "), _c('p', [_c('b', [_vm._v(" 十五、【聯系我們】 ")])]), _vm._v(" "), _c('p', {
    staticClass: "text-left"
  }, [_c('b', [_vm._v("\n      15.1\n      當您對我們的產品有相關建議或者有其它相關事宜需要我們協助，或需對發現的違規內容進行投訴、舉報，可通過命理尋真客戶端，進入「我的」-「設置」-「聯系我們」向我們反饋，我們將盡快審核所涉問題，並在法律法規規定的期限內回復您的請求。\n    ")])])])
}]}

/***/ }),

/***/ 1634:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main"
  }, [(_vm.language === 'zh-CN') ? _c('cnAgreement') : _c('twAgreement')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var devBaseUrl = exports.devBaseUrl = '/api';
var testBaseURL = exports.testBaseURL = 'https://test-psychicai-api.psychicai.pro/psychicai';
var prodBaseURL = exports.prodBaseURL = 'https://psychicai-api.psychicai.pro/psychicai';

/***/ }),

/***/ 19:
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

/***/ 2:
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

/***/ 20:
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

/***/ 21:
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

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_bazihehun.5e1c44b.png";

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_caiyun.5ad8987.png";

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_ganqing.0f3869d.png";

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_guiguzi.2d29b63.png";

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_nianyun.ac4c1ab.png";

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_shiye.9f79ca2.png";

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_yuantiangang.3c14888.png";

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_bazihehun.41cfb6e.png";

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_caiyun.aa0ff37.png";

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_ganqing.e91bf0d.png";

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_guiguzi.736b23a.png";

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_nianyun.78b38e7.png";

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_shiye.0c8425e.png";

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_yuantiangang.586ef3c.png";

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_caiyun.3153eca.png";

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_ganqing.b2bd698.png";

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_guiguzi.189b5d1.png";

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_nianyun.fc5ded2.png";

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_shiye.20d1375.png";

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_yuantiangang.004b412.png";

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_caiyun.139eab5.png";

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_ganqing.db48c3d.png";

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_guiguzi.798e9e8.png";

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_nianyun.1a72f63.png";

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_shiye.254d4cd.png";

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_yuantiangang.a42662d.png";

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_chang.d8e289d.png";

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_chang_tag.5308e9f.png";

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_fang_tag.5810059.png";

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dingdan_img_er.d02e972.png";

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dingdan_img_san.caafeaa.png";

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAxlBMVEWwilCXlWbo1bvEm1y1jE28mVW5rHSqhk25lFSjez3Gn2K8lUa8kU6+lVTNqm3IpGe9ml7/j43CmVXPsHmngUKleja0iEH+0Vj8yVSLklqwgzy4jUelqXe5lFOwl17+iUP+2Vu0j1FPTUrdun6fpXDvqKTcvqf+eT7r1L7+oEnXu47grUf+s01iXlnrkHz51G39m5qWdDn+ZzrTq1vlwGvSk2f+UzWah4KWhUiwnJTouVV/f03ZnnG7qHSHdnMyMTDDkpDRpk82IjtfAAAACnRSTlMB1JP/yytd/ZH5A86sPAAABIhJREFUOMt1lQt3qjgUhbkTu3AFSGICCUIBwQqCj/q2ddre2///p2YHbNd0rZmtyMMvJ5s8znEc6GE8cnuF/y13NH5w7hr7fiCJlfR+aLilOEn518COfP9/6HpZMymXyqs7VY+GuFkAZWhgafIdlnpqCVElcU1lN4ZfGzcFLYQoAym/o1PqyZrRDrfK67ha8gdnTCiXPmOMEvCITilVzMLLWsFvl3aiLkO952zsjBjhJOCSKcWoL0gAuOs6uVyqWqml6vR7qD0v0mz5y4lSCpjphHLFfU64TzlncKu49tKlSj2dhmVeM/E6daJEM8BER5z5fK4GmtDBeSfV0vPCuq7fp9O/HVdHBDYod9FGMUtnlNP7kMDIstNaynzaw6QkgU8E5zzlc0o4aEntkEhPy3rZdZ6XW9TCYZqWWZaVPgkIC+Xp+fl5bqfHXjwfPXRRgnuJXiAnzNJMiAxHQtlxNjOz2ewUkNOs19F6CaMEM0xl6bjAhIBLwTNizKwp0OB4nLVxc2hnpp9LKVmOscoRWWvNbJ9zcTSmKNpLYW43E6/btjDm0zva/06cMcARdBz6PK3MumgORWHi2BRNcYmNWR1hDNZO6D539iJJTdzETbE2Kxu5OMRmZZsdGtArEx/Wh9aY3I7GXvOVaZumLVqzis2hXV9MvFrF6wserWO0urSXg5l99nCkVqZp1vjCaozeizhWPG7XzeGwXvVw0TRmFWjXyRlgvFZToE9xsnZPVFHeXx01ej1cDhdY5MR1XKqOcWsDFvEnp2zei1PK2NFPEi+O28P6EsefInOdUIsghuDvpqmgFIPEGKHYBGkC3dbruG3jW1aWsKF4pvo+bxFgEfR7MbCwrwHrW+9sWBs5TZniXae6KCoxj4MP7AAqtYWTJH9/xOK4w4pTBVwApoLM397e5vbn7Zz2sI72+30UhWUYOjnPoijJVBJF6XY7+ant9uxjNSS+TLGQXCfiPIiiTPj/BndWC2i32O225xQbX1DhYlKs9GR33Syum3rzsbt+TP5Uv6vXCqqrzeZ1sqV2ZQLu2QhhFx+v1fV1UdWbzR3eVJu6wgE7eZlP3akT+valLVwtAX9cr9XvRQ+DrerfNvLkfN9Ww+Ln293H5hU2qs1icZ3sFtVisalw/+fjupicX/bRi4tt5WalxTPy9uMNF+gKL2d/tyTDNFG7+MPUz6x85MT5+cfgbTFyZyIkwTwI1ancKTFXfkDtgvBFFGIKkaHOgGTgI78KxOTqXVnldpw5NiTDNCIxqTlH3qOU9Dkb6wShOFc2lOLvThQEPmCSppT5fUKyqVEO2Zr27Psj9PT4OHXcNEFy5mWgOUNiFDTA39RGpXfxx6dBU2dEA2LhsoQVnwobFy5QNnCy6DuCPtnv0y8kc0IBI6y0yVySb9huANpbsC6gsfOAYpL6Q5noEYxCOpQkkVvk8VsPQwESfQGypCR+auWhvMgstyrLtLTn8VdpC+6lLbDdePhYlVrbbajtktZ69KNowuLwWPe2IBdDFYYJ9mKYjr9K7Fc5DqNv9WV4vx+Or3L8D2xnsBqQdt0vAAAAAElFTkSuQmCC"

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 6:
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

/***/ 60:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 62:
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

/***/ 63:
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

/***/ 64:
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

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(915)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(810),
  /* template */
  __webpack_require__(1634),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 73:
/***/ (function(module, exports) {

module.exports = {"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

module.exports = {"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

module.exports = {"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}

/***/ }),

/***/ 77:
/***/ (function(module, exports) {

module.exports = {"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}

/***/ }),

/***/ 78:
/***/ (function(module, exports) {

module.exports = {"_from":"elliptic@^6.5.4","_id":"elliptic@6.5.4","_inBundle":false,"_integrity":"sha1-2jfOvTHnmhNn6UG1ku0fvr1Yq7s=","_location":"/elliptic","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"elliptic@^6.5.4","name":"elliptic","escapedName":"elliptic","rawSpec":"^6.5.4","saveSpec":null,"fetchSpec":"^6.5.4"},"_requiredBy":["/browserify-sign","/create-ecdh"],"_resolved":"http://npm.etouch.cn/elliptic/-/elliptic-6.5.4.tgz","_shasum":"da37cebd31e79a1367e941b592ed1fbebd58abbb","_spec":"elliptic@^6.5.4","_where":"/Users/ls/demon/zhwnl/psychicai-overseas-h5/node_modules/browserify-sign","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"bundleDependencies":false,"dependencies":{"bn.js":"^4.11.9","brorand":"^1.1.0","hash.js":"^1.0.0","hmac-drbg":"^1.0.1","inherits":"^2.0.4","minimalistic-assert":"^1.0.1","minimalistic-crypto-utils":"^1.0.1"},"deprecated":false,"description":"EC cryptography","devDependencies":{"brfs":"^2.0.2","coveralls":"^3.1.0","eslint":"^7.6.0","grunt":"^1.2.1","grunt-browserify":"^5.3.0","grunt-cli":"^1.3.2","grunt-contrib-connect":"^3.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^5.0.0","grunt-mocha-istanbul":"^5.0.2","grunt-saucelabs":"^9.0.1","istanbul":"^0.4.5","mocha":"^8.0.1"},"files":["lib"],"homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","name":"elliptic","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"lint":"eslint lib test","lint:fix":"npm run lint -- --fix","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.5.4"}

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

module.exports = {"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}

/***/ }),

/***/ 8:
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

/***/ 80:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 81:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 810:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _cn_agreement = __webpack_require__(1601);

var _cn_agreement2 = _interopRequireDefault(_cn_agreement);

var _tw_agreement = __webpack_require__(1602);

var _tw_agreement2 = _interopRequireDefault(_tw_agreement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titleEnum = {
  'zh-CN': '用户协议',
  'zh-TW': '用戶協議'
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

exports.default = {
  components: {
    cnAgreement: _cn_agreement2.default,
    twAgreement: _tw_agreement2.default
  },
  data: function data() {
    return {
      language: ''
    };
  },
  created: function created() {
    this.language = _utils2.default.getLanguage();
    document.title = titleEnum[this.language];
  },
  mounted: async function mounted() {},

  watch: {},

  methods: {}
};

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 847:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _user_agreement = __webpack_require__(725);

var _user_agreement2 = _interopRequireDefault(_user_agreement);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _fastclick = __webpack_require__(17);

var _fastclick2 = _interopRequireDefault(_fastclick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-04 10:06:24
 * @LastEditors: wujiang
 * @LastEditTime: 2024-01-04 10:12:49
 * @Description:
 */
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

_vue2.default.config.productionTip = false;
document.body.style.backgroundColor = '#fff';

/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  store: _index2.default,
  template: '<App/>',
  components: { App: _user_agreement2.default }
});

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 88:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 895:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 9:
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

/***/ 90:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 907:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 915:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 92:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 93:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[847]);