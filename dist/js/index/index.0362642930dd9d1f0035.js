webpackJsonp([6],{

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

/***/ 102:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAD1BMVEVHcEyXl5eXl5eYmJiXl5d57kt9AAAABXRSTlMA/TuLx0Mu1CkAAADzSURBVDjLtVRBEoMgDET0AUZ4AI4fEKcPKNP//6mAQi0ke+hMc8NNNksMq1SN7RHIvg7Vh/Z0hnEdFKiEdT1kD6f0FlowQaXR1oAr0V4PI9Gi7qddCUd/T8w05pNnG9WhFvovxjP7KtQfhluhu9ifHTZdCgIxIzwl6EZkkepy+c5gY260cpSRNLEFw2LepnYziw2x4ci2U/n7QI7FEp8gJYvxVsCiRm8ELAJhEbDVQky4XrrgX7BfdaK7o5mhWaN/hP4t2gm0S3AH0e6inUdvRXhjs/g2fZlI/6anmo68AHkI9B7kWamB6HXII6G3Qk/mvPwNbtghQj8VSvgAAAAASUVORK5CYII="

/***/ }),

/***/ 103:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAJ1BMVEXwYEVHcEzvX0XwYEXwYEX/KSHxYUX////96+fzeGH3qpv6wrbybVRZEEOsAAAAB3RSTlP/ADag0QFke9c/TAAAAWBJREFUOMt9lL1OhEAUhY+AFNIIytZQaM0mPgCJsRci1mjiM4zxBTYmW+wDWNgZn4DGwlJ9Kof5Y5iBeyoyX87eO3fvHKRa+eVVjej6sTEn0B9tBanwwmX3NbSipzlrJ8RhabOsgq2wtFiBuYKJbeDqwbDKY2Gj2Bl8bRXrF1gsWYYllYIViywQrFpk4chaYOVHkd6tsBvO+hUWp8hr9/D3W068gVfuhL2ogvCG8sHYQY4Gp56NsXfxdYzCtykWoPdtz7KZGJVve1WTgbrCm2U7qLVR7Id9uTbOpAZZxLYZ8bO9YzPaie4WbcKwd2y6l2R0/M1tmvFmGNvNq0X67qPRqRaamQ2C2U3GZtaJa+OzvoVlnN3taPpvE/duW0xbPTgjKdGZXUrmNr5L1g5+ujuYnhO7mxE73xFvJafeGPU2qTdNZkFOZAiZPVRm5VTWURmZd5v1bCUzOW1SneUmzP8BfFJtII+N4mUAAAAASUVORK5CYII="

/***/ }),

/***/ 1036:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/combine-price2.1d22969.png";

/***/ }),

/***/ 1037:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/combine-price3.a6c4e50.png";

/***/ }),

/***/ 1038:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1039:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1056:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_close.3e73550.png";

/***/ }),

/***/ 1057:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pay_success.a0d0a96.png";

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1122:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAcpJREFUWEdjjK3bVvzy3dfG///+czPQETAyMn4V4OWsZ3TLWf2F3pbD/cnI8JXRNWvVfzp6HMOq4ekARgYGBgE+DgZuDlaGv///M/z4+Yfhy7dfDL///KNtCAgLcDJEe2gy2BrKMPDzsKNY9v8/A0NI2UaGz99+oYhTLQpU5QQZ2rJtMSxGti0Y5ICvNHAAGyszw7x6DwYxQS686ZlmDvCxVWbIizAimJlo5oDGdGsGSz0pFAd8/PKTYcOB2wwv335j+AdKAAwMDIfOPWH48xc1IVIlDcyqdmNQkOJHcUDL3ONgCwkBqjhgSbM3g5gQavzH129jeP7mKyH7GajjgBZvjAQYVb2F4c2H78PQAUxMjAzKMgKo8Z1pwyDIx4EiVjPtMMP7zz/hYn/+/GO4/+wj5SUhDycrw7qeAIJBi67g7pMPDJntuwfOAUcvPmVonHVs4Bywdu8thpnrLg6cA6auOs+w8eAdyh3AzsbMUBBpjGKQtYE0AwcbC4rYkQtPGH78+gsXW7//NsPtR+8pdwC21LdkRJUDoyEwGgKjITD8QsAte/WX//8p6xmTXRKCOqdhFVuK33/+1sjwn4Hs7jlZDmBk+MrNwVoPAJsUKEY5ydORAAAAAElFTkSuQmCC"

/***/ }),

/***/ 116:
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

/***/ 117:
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

/***/ 1171:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAB2CAMAAABI+nkMAAAAPFBMVEVHcEzb7tuQyZDG1/qAwoH0h4fy6uz////////2rmWu2K72nHX4o3CIrPWHq/RwunH///+Hq/TB4cHZ7Nl8xkvhAAAAD3RSTlMAecBX7f4kZkT9nMJokcxwkbj+AAADvElEQVR42u2cyWKjMBBELdJWBAgwyf//azBgjLygrctIM9RpTpmXSnUDreV0OnTo0H8oKaVS6nvW8E8ps8C+M5safoG0ub83lSq9jTtZ+jW3qKqiIOpGERVFVYk1faLgoipmZlNUrPDB8Lo+n2vtBy5eY9/xxQfg5QB+VW2Pplz83uSe6RfvYZmfyQd2x+IUReeom/WggtXnRdolK+7gBjzUdIvtM7kX+Ajvya7d0c8rWVPukvHnzPskXpeaF32yXASAj/DC3fi6rFkDM5FXXahm45WL6aW77Q5lqsJS/px4O3t5FV9zVDFhMUOjrHG5quZ6JLGQO7Hr8ib3zGy9CDCR29l1Xa6k49u+iitQQ9UWuy5NaRZywUNu8d1wvY4ml1xpmSU2n02aMy7M5LPvbB3GFhdG8oHd0mb8+rqFvOhYVVjaDE9aJGNzeWgzcsN2rriIjl3CYjuX6cSPTtu2M5CfIHFZIoMeWghCoBN6yAHoLkaXAZvegSSgtgNNB9sONR1rO9R0qO0Sa/pku4TlpUKiV7DEgB6kD709y7zgEqMYivTHXqgqzbz8Xn72SAxDXn4vFws7JjHx/eVKbmHH9JjoqE/k2+yYsMdG/Ua+yY4Je2TU7+SbtgsAuoyLuiP5GHaZFLorOQQ9qkqdySF16oJOvxRJDkH/cmgwAxrFkY8t5uvjvZFGRIoih3TH64/c/k9nPIoh77owdFmX5dvtDDZ0WhAphjwMXU4DeBmGvkKkCPIw9Hnpow50/fKK3Zs8DP227hGZ9TW7P/k+6M/sAeSowFj6+iN7CDkBylQ5oJvsIeQjumJujk7vMGv2IPLd3mFM30PIIeiOL70UR77n+/qz717kMHSnDzyKIcdMM1w/q03fPckxn9Xun0kUTA4aZriPkO6++5KDRkg+gzsKJEeNej1mSJPv/uSoAbvXTIBCyGFDaq9RL1EAOW4xKd8FmZyXwTJefMx4yTfnhfaMtzfkvKkk4608gO2ZRk+HnhLLd9vaXpsFE65UEh84EbnLxljOSv3sduSEu8yL7iKbtu/bRgK6DHjrfdPPagBx52On5wMPbb+oBURGcL4AmHFp+pUaAHuFIpe9IYnwnSDkpunstkMPsrUmentKkf31car+QZj2Djm0CUePPirbvTsqiw7MCXdAGVym92cT/7FwbHN8MJ75MH4DN/3Ozn0FQotN+u2vC7l4ooF7vk4873UfoJfed6lJ5JKVUPgkrrYJhs/sQqF1wf6bl1ClfvVXnleWLfxZXhR36NAhdv0BTVwCYF9V0zcAAAAASUVORK5CYII="

/***/ }),

/***/ 1172:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner-2024caiyun@3x.523a8ed.png";

/***/ }),

/***/ 1173:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1174:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2024-caiyun.4ec2800.png";

/***/ }),

/***/ 1201:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2024-nianyun.bb1227e.png";

/***/ }),

/***/ 1202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/24-ganqqingyun.4ce192e.png";

/***/ }),

/***/ 1203:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/24-zongheyunshi.bfd1e7d.png";

/***/ }),

/***/ 1204:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bahh.41e64cc.png";

/***/ }),

/***/ 1205:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner-yuantiangang.f05fe04.png";

/***/ }),

/***/ 1206:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing.69efe38.png";

/***/ }),

/***/ 1207:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_shiyeyunshi.7fbf6b3.png";

/***/ }),

/***/ 1208:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0BAMAAAA3VgbYAAAAKlBMVEVHcEz/+/n////////////////////6mGv////DaD/9zrj7rYr53NDcflOxCRDjAAAAB3RSTlMA8sYqkENmJnJgMAAAAVNJREFUOMt9lL1KA1EQhcds7EWQXFIpImwZxMIyIEhKtfIBLGxTXZKNxV2jjKu9LmiRKlvYr5AHiPEFxLdx/2az2Z9z2o977sy9M4dIZN0cKLN73qOKThQnMmdlcsXmZ6H14lPx0SY5Zi/UiZwZHxZJm7s614z7a2LZni4ocNe1XJqwiBy1J2RbLfWGJuZCDnm6pCA7Zql5GY1NelvrRVf0vZ+gQaeKhtPEj8Mqcjh2bOVF/Pn+R15I7Hgtfnd+pF9xfIiQLfWN3plXr1KjG11lxGP0xvwkSKsetb16FPRp67kefe3QaaceDe/pdlmPJo80mEtPfox86W08JTvMe8pQ2pvjkgqlJ1Ham2NI5feIsvsMcRNihIAhKAMUD1oGDwWeF3wK+EqL61E8bc1jg4YNjCgYbLAOaInA6oGFRWsOwgFFCgiiOL66DfGFQg9FZU3A/gMMEgi4RmOrkwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 1209:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ce_img_bao.ea56153.png";

/***/ }),

/***/ 1210:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcEz0+/T///////////////////////////////8msCas4ax90H1KvUpYw1jK7MoAvRN9AAAACXRSTlMA85EXsFd4N9PGzuIeAAABUUlEQVQoz22Tv0oDQRDG18T0olicIsQyXXwDS9PpU4gvINjbWG4Imo/EgO3en2B5KezvwMLSPyCWRl8gguDszu7dnuwHt3A/dnZmv5kVgnV+FMnLU+GrvQ+jzb7Heth9VOr7HsOanuBBGX1h27EWfpXVO7oWDqaqUjFiti6XNUyjQwN7e8rT01CzDl58mOGY4MFUNVRs6egfj8RKzSm+7UenK/rQF62Jt/EDtORdsTarWQL987khLna8HChpvbsRZ4s6C8xR8bUYlBXMYQpJRuLKJE8WeqPkEsYi4tMmeuMtR0gBTosyBuxJYFgAsxyuYnB4bjrk7is50dxAa2s2tiVFxJxbVBIX/+xFU/F8zYygc4uuaQ0pqtzaEGtdjMoYss6ZvHIt1Sa7dry6jbod4cZ1sPRZalocHIbm2GR2bIIDFh7F4NC68X5rjHfwIfx/Mn+cWJbTl+MmegAAAABJRU5ErkJggg=="

/***/ }),

/***/ 1211:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/袁天罡-简体.f14a05b.gif";

/***/ }),

/***/ 1212:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/鬼谷子-简体.e7cb3f3.gif";

/***/ }),

/***/ 1213:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEX///9QUFBHcEz+/v7p6emDg4P9/f3Nzc3////DwjuNAAAACXRSTlM/QAB/Lj05Yxa8CwtoAAABH0lEQVQoz22TwWrDMAyGdXBDr2JNfR0ljF2HCb26geXc0HVnd2Swa8gLlB1GH3uWZcdukSAx/tBvyZIMO7Zb76rxFjfASw/BxhJaGM+I5x5Uhn/wjsE+4CfBJjGiXYR2hYsdFcOmGjKsXReg/cbCPhXBVxhKWMOvhy8rvLPjl4f2UBCNuFUe3qkN6XfQqIKdPETbQXmkNm04FK6XDGcz+f92DddD4binZbMGOzw4Yq3ABagncjScfgWOnfbk2LKiAuDTzEQfQ2A4G9POHCZAF6G3N0zyEOgpwJiHD8QpEUtqnxInfyrUPnm+Zp3VdM1YkBybChJLpxc1lS4VeVFTkVM7dHLcUDuepcaJLRaHQR4bccDkURSHVh5v+SE8PJl/ZWVjE5qL3AoAAAAASUVORK5CYII="

/***/ }),

/***/ 1214:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/top-caiyun.75d76d4.png";

/***/ }),

/***/ 1215:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/top-shiye.67baacb.png";

/***/ }),

/***/ 1216:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bzhh.16c8cd5.png";

/***/ }),

/***/ 1217:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bzhh_banner.ca8baa6.png";

/***/ }),

/***/ 1218:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/career24_banner.c34856c.png";

/***/ }),

/***/ 1219:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/emotion24_banner.75e0231.png";

/***/ }),

/***/ 1220:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ggz_banner.8510211.png";

/***/ }),

/***/ 1221:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAACeBAMAAACV7dTeAAAAHlBMVEVHcExce3dcfHZefHff8OkyS0fB082murSCmJNPZ2La0vilAAAAA3RSTlMAW7EfX8NbAAADFklEQVRYw8WYzU7jMBDHw/ICi/YFkPIE4IaWc92knNOh8ZkkLWdCUs5NSHsGb+nb7jghC6IzRkV8WGpU6Sd7xp7x32M7DrY/gm7Ou9D97fBNWOCBsHQ8PHEOWZvuMeNS4yvyTBLNOXLFMVqVJBTiBK32GXhk5lIy0FgdSA7+cpmOBh6Ke8nDnvxqOBODmINjAFAxAz0YrGFKwyHghK8hJuGt6eTrRxJ6zb/kkoTQRPUioqAPrcshBQMb9Fs/h+SwUjehG01JWDV+VhMSjszSjaEkYQBRPPMYKBNceNARE7I1QP9l3LfBTuPOLyYTxr1vTbBvh/62axsqE7o2pWCapgX+ZhkB1XypVbA6hx7VcwRQ4355onqCH2DmpZpOzRuhxEKAOKNsVujpmvPWT1QqbyGMSahhIx90RTp0Gyl9dakTclidh/Oq1IGiHCr8UI6llvUuxO3l51LEBTVPhON7CbSa4N4bXUoTFQJeTBu43T4QEJXCQHrY6jFNpinkGNFdqOsuE0KiZ9Dl0BORYD+V8cvYAiH7CFzimQkP+CHF+HmBFKl9T6sVDFZLEnplYzP4ZFj1bD1t3lqhjzv+VZa8Ueq/3fFBQDzjhiEHfR0lUzae1wATPtge/GWh0bANcyzPNdQaVE1N5Q7gTAYenfHX0NQhCw8iYtt36ZPm35fxQc8CcWH9omkERK151vldeL6F7Wa71dDJyWto1mbC1QnGWMYWEW320BDPBqNQNByiyLA9XyZECaNSKv6QTau3Ac6T7WkqE3YRklBY4ETqr4CtQ3RR2MCxAhpOYp1hnpCF6LyUuEL/FeHnqxpTi0MK7Wx3Iap4aj4lefJKhK207kBVFAiLQpd72my2X7MpiPJDLlZtq0kZfxbjiIR99Kgobmh41ij1VbT/sJtiAXVxFzHnirkFDPcfdo27F17KhJ14+sCc2Tfmtgrm0yfKD1uV6ueztIAcv/meNt+Hi0/L20FmgUJkLHQOXP4qbd4MuEs4Xu3567uwXPzR4qnjuDEN8dpveWwwzxQ8PDh1bE8jNmh9VHGtzzEM/Afxukm/8/xnvAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 1222:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/right_pay.0b469b0.png";

/***/ }),

/***/ 1223:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/wealth24.d2fa414.png";

/***/ }),

/***/ 1224:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/wealth24_banner.27a0458.png";

/***/ }),

/***/ 1225:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/web.3b6f00c.png";

/***/ }),

/***/ 1226:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/weigh_banner.85a8b84.png";

/***/ }),

/***/ 1227:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/year24.cfd27df.png";

/***/ }),

/***/ 1228:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/year24_banner.8c24dbb.png";

/***/ }),

/***/ 1229:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/xiabanner_bazi_jianti.b031953.png";

/***/ }),

/***/ 123:
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

/***/ 124:
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

/***/ 1263:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_img_topbanner_ganqing_fan.d82ddea.png";

/***/ }),

/***/ 1264:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_img_topbanner_ganqing_jian.c286b89.png";

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_bazihehun.f916c01.png";

/***/ }),

/***/ 1323:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABMxJREFUWEfdmF1MHFUUx/9ndhepLYViYoMps1IkNbAzfmxNSUwbjFjD7lA1xtBWH2ytvhrbaEgkpjE1ITHqexWbGFutjQ+W2SVtaCR+JJgWbWeAJyjdhQSrCS0fFcruzjGzAbrAsnMH1pA4j3f+539+e+69c89dgosn3qi8yIyvCFTkImxeygxcnZpK7qnp6p8SjSdRoa2La8ppgA66iVmqZaLd/vZrv4h6uAMMq2dAOCBqnlXH2CNHjJ9FPVwB3gipRyTikyByFbcAwzxKSStQfqFv7D8BtE1HXnr0AekubcpMkIJ3M0tkZI6RxaoHyYn5sRkAKU78WdUxcFcUztatrhJLMgzWB4t9hYnbmcOJGV9JZWfPuBuYbNr/L+C1verG0gJrL4OeBSgIoHZJBboB7iHwpbFZ6eJjF407q6mm6wrGGwKVkOhdJhwU/R4yeJIYZ2Dxx3JH76AbUGHAvleqC4qnPS0ppmYi+NwkyfhSJzzEreMbUidqzvXPingIAQ6GFMUn0TcAakRMBTR9CYsPVEZN00nrCDjUoNZ6PIgC2OJk5vL9rVQKoYoOoztXXE7AeFjdDUrDLfruuQTJJZ8CI5TrZFkR8Pq+wFZviv4AUZkgUAqMUduQCXaMRyiOeTTp4Se2n++9KfwdPA5IhzTlAoHqhZLYp4SF2oqo8ZutHwqpuzwSck5dpi+DO0/p5vPHAWtpvqwVjGvKIYC+FIVj8IRfN4sz9TFNGSfQZlEPgA/LunnKEZDr4B3ZpAwySBY3x21ZNxZtorim3gJQIupB4Pi2KbOSupDMjFlWwXhDoAke6VtR4zndmgHTPilrv9zRezY3oKb+AGDfugAC52XdeGFFwCvBoO/BsnRXcv86Af7z16ivZGdPT2I+/6IpjocCOyFJl13C2fL8TLHtZFlPydHeK1kBhzXlVQZ9vZ6ABH6tXDdPZ6+gphwF6JN8AMbCygcEeg+Eje78+Jism59mB2xU3wfjhDvDtHrZFNuD8ed2PISC+z4E4XXxkwUtcsT4aAVA5R0wLdALgzIzLK5aqdezuyGvROcI2OHoafFROWp+lu81CDBGmK1j/mjvd9kghjXlTQaddALMvQZXv4vv5WX8JHHy7W3R/quZMPGw0gaiw06AOXdxX3V1QVGFd8z9wl6WNkXEbTPJ6ZaqjoG/R0LVj7PkvcyANycg487kULK0pv9et73sqItpajsBmuMvFREw7GvnJQB1IJQ6hTCg+3Wj0eGoCzQBrs9ip9yC7639su5wFnMw6Bspmx1w2c0IAqwsS3czowWPUMYxZ6uz9oOiO27NVBkGBH6rXDc/X+qZFdDuqN/Q1F95+WU8n0wLXgR0t+nG08IdtR15M6xsnwH9ToRFnXK+CZkxXgh+cmvEvJ7NO+etLhZW6kEUIaAg32C2HwOzYA77I2bnSv6O9+KYpjYSYHe5G/IMOc1Ak1832nP5OgLawcMhdRcknGXAnw9IAmKw0FQ+dwtcM6BtEAsrWySglQlHAJJWB8oWMb6wgGZ/xLQvVY6PUAUzXeJhNcDEzcR4GUSFjhnSi41nmPA9MbXKEaNXKGZO5Bpw3nyo7uESb1FRyGJ6hgCVGBVMSN+DiTHBhCEGDIn4x+TkZLSi68aif2BFIf8FG73YOPcyNbMAAAAASUVORK5CYII="

/***/ }),

/***/ 1324:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAiNJREFUSEu91s9rE0EUB/B5L5u0hYYe1ErRg0hPVpvCnsRLDE2XCF70rHjQW8E/SL158FLxZLJpggU9CS2m/sBDwIvgQS9FEWR335OJzLKpszszGzG3hNn57Jt5882A+M8fyHjYaLVWIqKjD3t7P2Z9D9/3q9Fy/fRPsfB13O3+UvMpEDeutW+jgHOCKUooeTYKX7wvi/rXmyc5qt0SKJaY+TtG/HB/MDiS803ARqt1pjLv3VMAMxMR7ozC0BmVWBJ7dxBwUc2XEA1GvcGrFLzQbC7OL3j3BWB1Go13XCrVYXK+KBZP3vb7H1NwUmVwdQ3RuwkAmEWTBJ4e9vvvTMubhxHx6ze93efH93DyvSxqi01VqN6gEQRriGRdqQumBeWP61tbFysVvmFaXlcsF7RBy2CFYBHKQgyF4MvZ1pfjjzeIrtGySaNtRN3y6gbaYMYK1cQm1BazBuXAjU77CgK0/6qOeHzQ231sOqfac5j3UF6DyPF/YtA+kYx7WISVicFCMBcjHjOI86Zz6tSlpnNWNga1FZqwsjGo7VJbrOjIyEbK+5eZqtAVK4OmYFnMFZ2A8sLDp05syztItrNcEqQoe5HwwX4Yfkn3cL3TPOtB7e4sWGEMJsnwIBy+TMHVTmeuLuJtAKjbpn5RlGWzl4iYoProsNv9PNWl/ubmUuyJS0T4TV14bPNRN84PghUW8WqMtU8KcwrvWfDss8Ys/VeQmuc3kGnILPevMH8AAAAASUVORK5CYII="

/***/ }),

/***/ 1325:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA0xJREFUWEfNmEtoU0EUhv8zk+baoPjARwURqoI2Kaat9YEWQZG6KNpqMbS4Et+g4EZx5cKV6EZQ0FbFjVKJVNNKF4ooSBUffSSliRUKBRF84gMl9qa998jcGGljX9FQ5m5n5sw359zznzNDyPBr7onkD1rWZgEqI1ABgxcCNC1phr8T6DWDX9rgVpeUd7cu8/dlsgVNZHIwGJRG4dIdzPYhAGsBTGidIgTwhEicN7tf3QwEAtZ4+41rOBTr2AQb50C07Lex72BqIckPbJsiA6bdB8P45oyZ5vQcQ+QLwX62aCOIKwAkvcfcA4HDVd6S+2NBjQp0ta9vysz4t7MA70t6hHsFyVMUH2jYUloaH++kavxOW5uHPTm1NlvHAVqS9BjVf/FMP7IrP79/JBsjAgU7OuYYBrUwsBKgfiI+8S5und1fWjowEZD0OXVtbTl5HnmEmU4CPIWAF6bJFYGSko/pc/8CcmDceMTJEL21Bu3t1f4VT/8FJH1NY6R9jXSJWwDmE3OPmcD6dKhhQCpMs+JfHzmeYXRZlqio9vvfZAMmZaMxElkgpd0CwnLlqc+eGeuHhm8YUCgavgjw/qRnxKpswwyDctnPlacAqqvyFR1Ijf0BcrKJ6R5ApjVobchWmEbzbjJ88iHABojLU9nnACmdcXuXdKvUJsKxSm/xmWyGaTRbTbHOo8w4rSQhEestVDrlADXFIjXMdoNK7fc/be+/ZlOmh1DZNy9XxJQkEInaSq//hgMUina2AlgnSOzZ6vVfydTw/8xvjkV222xfBvC4yldcRo1dLxZJ6eoF8EP+tPImKnr/AzF0rRJPK1e+AzBVSLGYmqLhAwy+AKYbVYVFtdnaKBM7oe5wA4hrbPBBCkU7rwHYSQL7KguKL2ViKFtzm1527mUb9QCuKw+1M7iEQau3+YqUNkz6dzsaXkXgZwTqUB5S9WR2wuS5I9WWyaBT5cpt0AcAnygUDfcrcUrAbQR8vsRkAKTvEYxG3W4kTCXKOgJpFjIdf2rt0l4vYdSudGhXXLVsP7Rr0Jyw6dTCpqRcqyZfQWl3DXIafp0uiqnQaXWVTkFp9dgwtF/R5jlmKJRWD1bp3Z2qfS6ZU87gMZ/0CNRKkjJ+0vsFl1Vi+yvJrhkAAAAASUVORK5CYII="

/***/ }),

/***/ 1326:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAxZJREFUWEfNmF1IFFEUx/9nV1dNhKCioKg0xAQfQgiizAYKC3vqQTLC2PWhtA8qMCg1EJItsIcg+7AHlUwUFgqMDENoUCso6qlQUAqkl8ggCEE3dk7c2dlld52dvdOOMPM65+N3z7nnnHsvweZX3d5Q7GHvYQBVDConYCuAIsPMHwbmCTwNYEqjyNhE58A3Oy5ISriuzquUFtYBOM/AXiKS0mNmJuAtgG51djGEUCiSyV9Gw0p74yFo2l0Q7cxkzPI/8ww8ngtqZ++4lVxaIKXDn48w3QHhNICM4JKwDMYj+PiS2tG/ZKZj6mj/tcAGD+EFEXZLOrIlxowPGuPo5M2+n6mKK4B0GA9PELJMUQZEBs9oGlWnQiUBiTRxmCZWKzKpjCJS5OPqxPQlA7UGHoJwxlb8sxVm9KjBvqaYmTiQXk3MrxzcwLKoDKKaWPVFgaJ95nPWpS2LsDJ3M+rsYoXoUzqQ0uqvB9HQ/9pzRI/5hBrsH44BTYFonyOGE4yUbNqC5iPHkevNQc9YCNPfv6Z3wfxGDfZXUdXVxhKvR5uTHQey0GWbt6PL34KigjW6yo/fv1B/+0padTFm2BPZQUqbvwmgB7KOZORSYYTOUngZtTfOgpktTHCzAHoC0EkZRzIyZjBCT6RsePJlpnY5SAfaAh8JqLSSLMwrQIQ1fZVWXzqYAfU5esefZVwPA59IaQuIebI+nfSxPQdxrrYeEU3DvdEhjLxXTUWzhTGMLgggMXXzzLyIY8/o9fvI90V/i/x3jw7h6bvkE4RDMMLFsiWQkBhu6cLGtevivKlQDsLEgSxTtqu4DLdOXUZerm8F1Jf5uaTSjgnI7hmTrCxIberKknIEGy6ugFr6G0aBkU4HYGBsarmyN4NKXWEWkTFM8aCtxmgFlT2MXjbNtkeHGZQTMPHRIbiUVr+t4ZoI5QSM0VOiw9UAsn38EFAV20rx+PVIxg4sJZB4/HDdAU2PkquOsEZMFTcd8vUoue0aJKBcdVGMVYOrrtIxKFc9NiT2Ddc8xyQ1Mzc9WKV2WXFtyvFqNav1pPcPVBStLn4YKeQAAAAASUVORK5CYII="

/***/ }),

/***/ 1327:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_fan_bazihehun.72ec10f.png";

/***/ }),

/***/ 1328:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_fan_caiyun.c0ce752.png";

/***/ }),

/***/ 1329:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_fan_ganqing.c6416d0.png";

/***/ }),

/***/ 1330:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_fan_guiguzi.1a50f4e.png";

/***/ }),

/***/ 1331:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_fan_nianyun.ca6f8f3.png";

/***/ }),

/***/ 1332:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_fan_shiye.33bee0e.png";

/***/ }),

/***/ 1333:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_fan_yuantiangang.e9a05bc.png";

/***/ }),

/***/ 1334:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_jian_bazihehun.45bb1b0.png";

/***/ }),

/***/ 1335:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_jian_caiyun.3f15911.png";

/***/ }),

/***/ 1336:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_jian_ganqing.8cdb2d5.png";

/***/ }),

/***/ 1337:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_jian_guiguzi.53998a1.png";

/***/ }),

/***/ 1338:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_jian_nianyun.12cb796.png";

/***/ }),

/***/ 1339:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_jian_shiye.ccdf6d9.png";

/***/ }),

/***/ 1340:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_big_jian_yuantiangang.d1959bf.png";

/***/ }),

/***/ 1341:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_fan_bazihehun.8befab7.png";

/***/ }),

/***/ 1342:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_fan_caiyun.32a2cd9.png";

/***/ }),

/***/ 1343:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_fan_ganqing.2d17201.png";

/***/ }),

/***/ 1344:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_fan_guiguzi.cf30dbd.png";

/***/ }),

/***/ 1345:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_fan_nianyun.75d6354.png";

/***/ }),

/***/ 1346:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_fan_shiye.2eb49c1.png";

/***/ }),

/***/ 1347:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_fan_yuantiangang.b995da7.png";

/***/ }),

/***/ 1348:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_jian_bazihehun.c5d23db.png";

/***/ }),

/***/ 1349:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_jian_caiyun.918ef03.png";

/***/ }),

/***/ 1350:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_jian_ganqing.6ca60eb.png";

/***/ }),

/***/ 1351:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_jian_guiguzi.c66bc1a.png";

/***/ }),

/***/ 1352:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_jian_nianyun.a662c13.png";

/***/ }),

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_jian_shiye.0fb6810.png";

/***/ }),

/***/ 1354:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_zuhe_small_jian_yuantiangang.6100584.png";

/***/ }),

/***/ 1355:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAYAAABu3ppsAAAAAXNSR0IArs4c6QAABKpJREFUaEPdmn9Ia2UYxz3n3Dt3tiWZgjeEdruaUmsOZHNerjO0yJww/BESgyIjQ+m/kEs4WUucWEh/FVpGi4IRkj8YOK9RSs64zg3F6QpNby2QMmaGbXvnds858chdrHV152x37R73757zvM/nvO/7fZ73eQ+Wcw9+S0tL5Xl5eY9TFFVGEEQBjuNiDMMuxrtmGCZK03SQoqgDgiC2j46OfqipqdlKd3gsDQeY2+2+JhAIniUIoigVPxRF7Ucika+USuV3OTk5TCo+UgJYWVm5RJJkB47jl2HQcDgc3Nra2lldXf3V6XT+sb29Hd7f378dH1BRUdGFsrIyoVqtfqiysvLh8vLyUqFQKAYbmqZ/9vv9lrq6ut+4QnAGcLlcTwqFwldxHCch8NnZWefg4OBuKBTi9AZFIhHW29tb0tjYqAYQmqZROBz+WKVSbXKB4ASwvLz8hEQieR3DsAs+n+9WZ2fnt3t7e1EuAybaFhcXXxwbG3tKKpVeYRjmdiAQ+KC6uvp7tj5ZAywsLFwqLCzsxXE81+v1brS3t99kOwgbu/Hx8asymUxO0/Sx3+8fZLucWAGYTCa8tbX1OkEQj/p8vl2tVvsNm6C42tjt9qelUmkJRVE/TU5OvmsymehkPlgBuFyuayKR6CWEUKCtre1Ln88XSeY4lf+lUqlgYmLieZIkJaFQ6DOVSgXqdOYvKQDDMNjGxsbbIJXT09MLBoPhx2RO0/nfbDY/1tzcXBeNRn9XKBRGDMPOFIdTAWDZNDU1Xc3NzW2A4BFCf9XW1n7BVW24woA6LS4uvkCS5AOQJ46Pj+dmZmZunrac7goAG7agoOBlWPMQAARvs9mc/f39t7gGlIq90Wi8otPp1AABz8OeODg4+PRuG/s/ACCVYrG4C9QG1vzc3JzLbDbvZPrNJ4LCTBgMhtKGhgYV7AlQp2AwOJoosf8CgCRFkmT3HZ3f7e7udmRqw7KdGdjYIyMjGlAnyBMIoZH4ZPcPwJ3y4E3IsJnQebYBn2YXlycQQmioqqrqpOyIAYDSQPCXIcNqtdqv0x0wE8/b7fZnIGND7SSXy4egADwBcLvdNSRJvgi1jU6nG0+3PMhE8OATyg6bzdYOtRNC6HOlUrl0AuDxePpBKqempub7+vp2MhXAvfA7MDBQ2tLSUg8SW1FRYcTgMJKfn/8GvH2NRmP9v9WGKxSok8Ph0MMsHB4evod5PJ5mgiAa19fX1/V6vZOrw2zYW61WtUKhUFAUNYutra1dFwgEJRaL5cbw8PAv2QiI65g9PT2PdHR0PBeJRHZhBt4hCOLBrq4uq8PhCHB1lg17jUYjGR0d1VMU9Se2ubn5PhzA6+vrP0k8BmYjODZjwvF0fn7+FWgUYF6v90N4SCaTfcTm4fvFxuv1vnaSyHgPwPslxPtNfB5klN+JjPelBO+LuXNRTkM+4PWBBmaBT0dKv98/FOtQnJ9DfazG4XVbJQbB68ZWDOJ+aC1CfzQajd7g3FqML5mz1dyFQ7tcLn8r5eZuPASv2+sAwvsLDoDg9RVTvMTy9pIvBsHra9YYRCYuuhFClljHmUvjIOkd2RnO+PupQSJUNj/2+Bti2qbiaXVfFwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 1356:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAYAAABu3ppsAAAAAXNSR0IArs4c6QAABlBJREFUaEPVWntMU1cY/51bQEVguhFndFNYhhTQQREfgyK+hkDAgtExFHloxKnELTEuzsd8RJLNxMUpzmiCCqjbsglUmTIfBMNzi9qSDSi6RdHgNLK4IKJAuWc7F2goLfTethh7/uz5zu98v9PvfK9zCewwCuq0Sg40ioIqCYg3KDxB4GoETdEOghYKeoeAVPAgJUsCgips3Z5YDUApUeu0KZTHZwD8rcSpJxz2qeRBeSCEWoNhFYHz9RqfbkrzADKbbdrW3gZdUyOaHzWj5d8WPO94AX233kgfJ5kTRo0YCc8xnpj45kTIJ/vCzdWtV4bWyAhJifNX3JZKQjKBwt+1kYSj3wMYyxSv0FaisekWKJV2gIQQ+E6eAmVQWB+RJ5Tv/ihhWsglKSQkESiouzGfA3cBwIhb927jcs0VdOm7pOxnIuvs5IwPZi/ElEk+bK6DBx+zJGB6qVhQ0QQEswGug8JDo9Pg2s1ysXuIkosIDodCrgAIWmVAiFhzEkWAUsqp67TlIAhl5nKxskSUUlKFosOiBLMCRZUqICicEMJbwhBFoKj+ZgooyX367CnyL5xGZ1enJVyr5l2cXbAyZgXcR7sDhKbG+wfnWQKySGAXpVxgvfYPAviVVF2C7q7OEqZN83IvOaJCIxlGg9Y/aOouC//CoAQEs2nQJFNKtjDlW9taceJ8rmRvI5UN807pcanwcPNgezUQDl+q/BSnBjMnswR+qtf4OPE4yWyeKcCUL9dU4Pb9P6XqY5W8z9vvIlyhFEgIg6JKzyFtqZk4YUJAcJWEK2Tehtl8ZW01Gpsah/3kBzLtiRO+CAt8v/dOoJWnfMJAF2tEoDdInWN+nnmbq7+VDtuFFfvXsIu9YOb8Hu8EdFC+e3H/YGcg0JMe4FcWYYfDzw+m8AhnF3wSl4x9BceH5GSIE8ATGcGsvjjRQ4BSUlSvqWK5DYuwFyouij0gm+QmvjEOe5Iy8c74tzBv+yqLWDHK6N6ITWvi/RWhLAEUCKgbNKmUx0mW2+QW59ucHljUBECQtxy7k9bDw9UNLzo7EL1nncVlLO1IjV0p5E6EQ5rKT5ErECiq09SxlLik6hfo7jZaBLJVICpYiU2qFLAMled57DiTjSqdVhSs3MsXUaGLmGx9fIAigPQWI+Xs9HPUJ4bd2yRHxGLVwgQwL8NG9s/f4Wz1ZVHKMyG2brUqXfgXeJBwUlSn2Qtg2/WGG6jQVIoGkirI1M2MXY4lsxcalhbUXMWh4tNSoaBUhCHEbzpbl0UK626WEZAIddk53HlwVzKYmAUc4bA5IR1RwWEG8WpdLbafPgheYh3BALwneEE1dzEo6DX2DzQBmJRTdBxP29vE6GMiExsSgUBvX2T9eMxkTsZx2LYsA/OmzTTMNf/zCGuP7MGzF8+t2s/d1Q2r4wWvdY8ReAbANfuHb03KQDHo8bPmY2PsCsE288vO4/iVQsMyGSfDF4lrMScgxPBbR1cnNhzNwl8P74uBNyvDLn9m4no2184ICLXggTMHJQMuC43EuuhEw4VkZSULSCWaSrCT3/HhWkRMnWGE+9XZHGHe1vHp8o0ChNUEkubEICNyqYkerJjfkncA0cFKLAgUan7DKL5+DfuLcm3VXVjfn4BVJrRJlYrYGRFmlWG+neM4o7mmxw+QcXg3Om2soRmowYRojwlZdYmdZDLsT9+M97yEJGvIoe/uRuaxLDQ228fLGV1iW9zomNHuOPLxDowf6zkkgZOlauSWqi3xFD0/0I3aFMhYIpadsRWjXEaaVYCd+oaje9HNW6zPRRMwCmT2SCXC/YOxO2mDwRv1adKl12PN4Z1oevy3aOUsCZqkEmyBPZK5lHlxSF+QYLT/qbJi5FwpsKSTpHmTZI6ttlc6vTNxHeZO6/H7D5+0IO3gdrDAZa8xaDptr4KGVVeH1nwOnwmTsTX/G1Q31tpLdwFn0IKGTdqrpBz32utInhuHr9X2CVh9JzB0Sdkr5dBFfR9Th26r9JEQzOkVa2zJOKSZ61i/0q1F1h8FodJbi/1dx8tu7vp5ybEoNFLoi9YGKKxv7vYn4dDtdUbE4R84DHHiJT0x6YEQc51oc1HR4gNH/0UO/cjXR8Shn1mN4oSjPnQbTMqRPzUYeJlMPvYAWI1p/LEH0P5/d9HuH3v8ByXwcu/Tgs5yAAAAAElFTkSuQmCC"

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_bazihhehun.b3822e5.png";

/***/ }),

/***/ 1454:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/yulan_yuantiangang_top_fan.b9f8682.jpg";

/***/ }),

/***/ 1455:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/yulan_yuantiangang_top_jian.160ee44.jpg";

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_fang.f5b75a8.png";

/***/ }),

/***/ 1550:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(975)
  __webpack_require__(974)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(752),
  /* template */
  __webpack_require__(1691),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-f6dae940",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1551:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(892)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(753),
  /* template */
  __webpack_require__(1610),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-03907c51",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1571:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(933)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(781),
  /* template */
  __webpack_require__(1650),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-68a31f0c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1572:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(968)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(782),
  /* template */
  __webpack_require__(1685),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-cf21b5a0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1573:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(934)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(783),
  /* template */
  __webpack_require__(1651),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6be58b4c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1574:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(903)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(785),
  /* template */
  __webpack_require__(1621),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-243fa9dc",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1575:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(923)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(786),
  /* template */
  __webpack_require__(1640),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-58a035ae",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1610:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "result"
  }, [_c('div', {
    staticClass: "pop-box"
  }, [_c('img', {
    staticClass: "pay-logo",
    attrs: {
      "src": __webpack_require__(1057),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.tipsArr1[_vm.lang]))]), _vm._v(" "), _c('div', {
    staticClass: "tips"
  }, [_vm._v(_vm._s(_vm.tipsArr2[_vm.lang]))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    attrs: {
      "type": "text",
      "id": "email",
      "placeholder": _vm.tipsArr3[_vm.lang]
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "code-box"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.code),
      expression: "code"
    }],
    attrs: {
      "type": "number",
      "id": "code",
      "placeholder": _vm.tipsArr4[_vm.lang]
    },
    domProps: {
      "value": (_vm.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.code = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    class: {
      'send-com': true,
      'send-disabled': !_vm.is_email || _vm.count < 60,
      'send-active': _vm.is_email && _vm.count === 60,
    },
    on: {
      "click": function($event) {
        return _vm.getCode()
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.time_text) + "\n      ")])]), _vm._v(" "), _c('div', {
    class: {
      'btn-box': true,
      'btn-box-disabled': !_vm.can_send,
      'btn-box-active': _vm.can_send,
    },
    on: {
      "click": function($event) {
        return _vm.getReport()
      }
    }
  }, [_c('div', {
    staticClass: "text"
  }, [_vm._v("\n        " + _vm._s(_vm.tipsArr6[_vm.lang]) + "\n      ")])]), _vm._v(" "), _c('img', {
    staticClass: "close-icon",
    attrs: {
      "src": __webpack_require__(1056),
      "alt": ""
    },
    on: {
      "click": _vm.closePop
    }
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 1621:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('mt-popup', {
    attrs: {
      "closeOnClickModal": false,
      "position": "bottom"
    },
    model: {
      value: (_vm.pop_visible),
      callback: function($$v) {
        _vm.pop_visible = $$v
      },
      expression: "pop_visible"
    }
  }, [_c('div', {
    staticClass: "pop-box"
  }, [_c('img', {
    staticClass: "close",
    attrs: {
      "src": __webpack_require__(618),
      "alt": ""
    },
    on: {
      "click": function($event) {
        _vm.pop_visible = false
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "pay-result"
  }, [_c('img', {
    staticClass: "icon",
    attrs: {
      "src": __webpack_require__(1171),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "status"
  }, [_vm._v(_vm._s(_vm.$t('pay-success')))]), _vm._v(" "), _c('div', {
    staticClass: "report",
    on: {
      "click": function($event) {
        return _vm.jumpHistory()
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('check-report')) + "\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "report-list"
  }, _vm._l((_vm.result_list), function(item, index) {
    return _c('div', {
      key: index
    }, [(item.id) ? _c('div', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "title"
    }, [_c('div', {
      staticClass: "left"
    }, [_c('img', {
      attrs: {
        "src": item.icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "name"
    }, [_vm._v("\n                    " + _vm._s(item.name) + "\n                  ")])]), _vm._v(" "), _c('div', {
      staticClass: "right"
    }, [_vm._v(_vm._s(_vm.sub_orders[index].order_id))])]), _vm._v(" "), _c('div', {
      staticClass: "divider"
    }), _vm._v(" "), _c('div', {
      staticClass: "info"
    }, [(!item.status) ? _c('div', {
      staticClass: "empty-left"
    }, [_c('div', {
      staticClass: "name"
    }, [_vm._v(_vm._s(_vm.$t('no-add-info')))]), _vm._v(" "), _c('div', {
      staticClass: "tip"
    }, [_vm._v(_vm._s(_vm.$t('add-info-tips')))])]) : _c('div', {
      staticClass: "left"
    }, [_c('div', {
      staticClass: "user-name"
    }, [_vm._v(_vm._s(item.user_name))]), _vm._v(" "), _c('div', {
      staticClass: "time"
    }, [_vm._v(_vm._s(_vm.formateTime(item.create_time)))])]), _vm._v(" "), _c('div', {
      class: [
        'right',
        'result-btn-0',
        ("result-btn-" + (item.status)) ],
      on: {
        "click": function($event) {
          return _vm.changeReport(item, index)
        }
      }
    }, [_vm._v("\n                  " + _vm._s(_vm.$t('to-add')) + "\n                ")])])]) : _vm._e()])
  }), 0)])])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1626:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['container', _vm.fix_pop || _vm.sale_detail_modal ? 'fix-pop' : '' ]
  }, [_c('img', {
    staticClass: "history-order",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_order_btn : _vm.tw_order_btn,
      "alt": ""
    },
    on: {
      "click": function($event) {
        return _vm.jumpUrl('history_order', '-10010', 'click_main_history', 'dvtjq2')
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "header-box"
  }, [_c('mt-swipe', {
    staticClass: "swiper-contain",
    attrs: {
      "auto": 3000,
      "showIndicators": true
    }
  }, _vm._l((_vm.header_list), function(item, k) {
    return _c('mt-swipe-item', {
      key: 'swiper' + k,
      staticClass: "swiper-item"
    }, [_c('img', {
      attrs: {
        "src": _vm.is_cn ? item.cn_icon : item.tw_icon,
        "alt": ""
      },
      on: {
        "click": function($event) {
          return _vm.handleReport(item, 5)
        }
      }
    })])
  }), 1), _vm._v(" "), _c('div', {
    staticClass: "buy-list",
    on: {
      "click": function($event) {
        return _vm.jumpPage(_vm.mock_report_list[_vm.cur_index].id)
      }
    }
  }, [_c('img', {
    staticClass: "laba",
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/2404148caf3a4f6e4194ba7c5431e81fa82a.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('van-swipe', {
    staticClass: "swiper-buy",
    attrs: {
      "autoplay": 2000,
      "show-indicators": false,
      "vertical": ""
    },
    on: {
      "change": _vm.getReportItem
    }
  }, _vm._l((_vm.buy_list), function(it, j) {
    return _c('van-swipe-item', {
      key: j,
      ref: "swiper",
      refInFor: true,
      staticClass: "swiper-slide"
    }, [_c('div', {
      staticClass: "flex-row"
    }, [_c('span', [_vm._v(_vm._s(it))]), _vm._v(" "), _c('span', {
      staticClass: "link-url"
    }, [_vm._v(_vm._s(_vm.mock_report_list[j].name))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.score_list[j]))])])])
  }), 1), _vm._v(" "), _c('img', {
    staticClass: "arrow",
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/2404fe7affcbeb894bd99695760f5bd315d1.png",
      "alt": ""
    }
  })], 1)], 1), _vm._v(" "), (_vm.comboAttachData && _vm.is_show_combination) ? _c('CalculateBar', {
    staticStyle: {
      "margin-top": "0.1rem"
    },
    attrs: {
      "is_home": true,
      "product_key": _vm.comboAttachData.product_key,
      "call_back": _vm.startCalculateClick
    }
  }) : _vm._e(), _vm._v(" "), (_vm.is_show_combine) ? _c('van-swipe', {
    staticClass: "discount-box",
    attrs: {
      "loop": false,
      "show-indicators": false,
      "stop-propagation": false
    },
    on: {
      "change": _vm.getCombineIndex
    }
  }, [_c('div', {
    style: ({
      height: '100%',
      width: _vm.scrollStyle,
      transition: 'width 0.3s',
    })
  }), _vm._v(" "), (_vm.payed_order_three_list.length) ? _c('van-swipe-item', {
    class: {
      'sale-item': true,
      // 'ml-100': combine_index === 0,
      // 'ml-170': combine_index === 1,
    }
  }, [_c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "order-title"
  }, [_vm._v("已解锁报告，快来查看！")]), _vm._v(" "), _c('div', {
    staticClass: "three-list",
    style: ({
      'margin-top': _vm.payed_order_three_list.length ?
        '0.34rem' :
        '0.96rem',
    })
  }, [_vm._l((_vm.payed_order_three_list.length ?
    _vm.payed_order_three_list :
    ['', '', '']), function(it, k) {
    return _c('div', {
      key: 'three' + k,
      class: ['it', it.product_key ? '' : 'no-it', ("it" + (k + 1))]
    }, [_c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": !_vm.is_cn ? it.cn_check_icon : it.tw_check_icon,
        "alt": ""
      }
    }), _vm._v(" "), (_vm.payed_order_three_list.length) ? _c('div', {
      staticClass: "tag get-tag"
    }, [_vm._v("\n              已解锁\n            ")]) : _vm._e(), _vm._v(" "), _c('div', {
      class: ("status-" + (it.status) + " status-common")
    }, [_c('div', {
      staticClass: "text",
      on: {
        "click": function($event) {
          return _vm.toWriteInfo(it)
        }
      }
    }, [_vm._v("\n                " + _vm._s(it.status ? '查看结果' : '开始测算') + "\n              ")])]), _vm._v(" "), _c('div', {
      staticClass: "tips-ce"
    }, [_vm._v(_vm._s(it.status ? '已测算' : '还未测算'))])])
  }), _vm._v(" "), _c('div', {
    staticClass: "divider-line-left"
  }, [_c('div', {
    staticClass: "one"
  }), _vm._v(" "), _c('div', {
    staticClass: "two"
  })]), _vm._v(" "), _c('div', {
    staticClass: "divider-line-right"
  }, [_c('div', {
    staticClass: "one"
  }), _vm._v(" "), _c('div', {
    staticClass: "two"
  }), _vm._v(" "), _c('div', {
    staticClass: "three"
  })])], 2)])]) : _vm._e(), _vm._v(" "), _c('van-swipe-item', {
    class: {
      'sale-item': true,
      // 'ml-100': !payed_order_three_list.length && combine_index !== 0,
    }
  }, [_c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "item-price-box"
  }, [_c('div', {
    staticClass: "sale-title"
  }, [_vm._v("多买多折扣")]), _vm._v(" "), (_vm.combine_info.price && _vm.is_show_reechoes_3) ? _c('div', {
    staticClass: "new-price"
  }, [_c('span', {
    staticClass: "one"
  }, [_vm._v(_vm._s(_vm.combine_info.unit ?
    ("" + (_vm.combine_info.unit + _vm.combine_info.origin_price_str)) :
    'RM-'))]), _vm._v(" "), _c('span', {
    staticClass: "two"
  }, [_vm._v("-42%")]), _vm._v(" "), _c('span', {
    staticClass: "large"
  }, [_vm._v(_vm._s(_vm.combine_info.unit ?
    ("" + (_vm.combine_info.unit + _vm.combine_info.price)) :
    'RM-'))])]) : _c('img', {
    staticClass: "zhekou-icon discount-tag",
    attrs: {
      "src": __webpack_require__(631),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "three-list",
    style: ({
      'margin-top': !_vm.channel03 ?
        '.6rem' :
        _vm.is_show_reechoes_3 ?
        '.3rem' :
        '.6rem',
    })
  }, [_vm._l((_vm.three_list.length ? _vm.three_list : ['', '', '']), function(it, k) {
    return _c('div', {
      key: 'three' + k,
      class: ['it'],
      on: {
        "click": function($event) {
          return _vm.showModal()
        }
      }
    }, [(it.product_key) ? _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": !_vm.is_cn ? it.cn_check_icon : it.tw_check_icon,
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": __webpack_require__(630),
        "alt": ""
      }
    }), _vm._v(" "), (_vm.three_list.length && !_vm.channel03) ? _c('div', {
      staticClass: "tag"
    }, [_vm._v("\n              待解锁\n            ")]) : _vm._e()])
  }), _vm._v(" "), _c('div', {
    staticClass: "divider-line-left"
  }, [_c('div', {
    staticClass: "one"
  }), _vm._v(" "), _c('div', {
    staticClass: "two"
  })]), _vm._v(" "), _c('div', {
    staticClass: "divider-line-right"
  }, [_c('div', {
    staticClass: "one"
  }), _vm._v(" "), _c('div', {
    staticClass: "two"
  }), _vm._v(" "), _c('div', {
    staticClass: "three"
  })])], 2), _vm._v(" "), (!_vm.channel03 && _vm.is_show_reechoes_3) ? _c('div', {
    staticClass: "empty-card"
  }) : _vm._e(), _vm._v(" "), (_vm.is_show_reechoes_3 && _vm.channel03) ? _c('TimeDown', {
    ref: "timeDown3",
    attrs: {
      "time_key": 3,
      "count_time": _vm.time_3,
      "list": _vm.three_list
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "pick-btn",
    style: ({
      'margin-top': !_vm.is_show_reechoes_3 ? '0.8rem' : '0.1rem'
    }),
    on: {
      "click": function($event) {
        return _vm.changeSale(0)
      }
    }
  }, [_vm._v("\n          " + _vm._s('领取我的专属优惠') + "\n          "), (_vm.is_show_reechoes_3) ? _c('img', {
    staticClass: "absolute-zhe discount-tag",
    attrs: {
      "src": __webpack_require__(631),
      "alt": ""
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.is_show_reechoes_3),
      expression: "is_show_reechoes_3"
    }],
    staticClass: "reset-select",
    on: {
      "click": function($event) {
        return _vm.restartChoose()
      }
    }
  }, [_vm._v("\n          重新选择\n        ")])], 1)]), _vm._v(" "), _c('van-swipe-item', {
    class: {
      'sale-item': true,
    }
  }, [_c('div', {
    staticClass: "item",
    attrs: {
      "id": "card-item"
    }
  }, [_c('div', {
    staticClass: "item-price-box"
  }, [_c('div', {
    staticClass: "sale-title"
  }, [_vm._v("多买多折扣")]), _vm._v(" "), (_vm.combine_info2.price && _vm.is_show_reechoes_2) ? _c('div', {
    staticClass: "new-price"
  }, [_c('span', {
    staticClass: "one"
  }, [_vm._v(_vm._s(_vm.combine_info2.unit ?
    ("" + (_vm.combine_info2.unit + _vm.combine_info2.origin_price_str)) :
    'RM-'))]), _vm._v(" "), _c('span', {
    staticClass: "two"
  }, [_vm._v("-42%")]), _vm._v(" "), _c('span', {
    staticClass: "large"
  }, [_vm._v(_vm._s(_vm.combine_info2.unit ?
    ("" + (_vm.combine_info2.unit + _vm.combine_info2.price)) :
    'RM-'))])]) : _c('img', {
    staticClass: "zhekou-icon discount-tag",
    attrs: {
      "src": __webpack_require__(632),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "three-list",
    style: ({
      'margin-top': !_vm.channel03 ?
        '.6rem' :
        _vm.is_show_reechoes_2 ?
        '.3rem' :
        '.6rem',
    })
  }, [_vm._l((_vm.two_list.length ? _vm.two_list : ['', '']), function(it, k) {
    return _c('div', {
      key: 'three' + k,
      class: ['it'],
      on: {
        "click": function($event) {
          return _vm.showModal2()
        }
      }
    }, [(it.product_key) ? _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": !_vm.is_cn ? it.cn_check_icon : it.tw_check_icon,
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": __webpack_require__(630),
        "alt": ""
      }
    }), _vm._v(" "), (_vm.two_list.length && !_vm.channel03) ? _c('div', {
      staticClass: "tag"
    }, [_vm._v("待解锁")]) : _vm._e()])
  }), _vm._v(" "), _c('div', {
    staticClass: "divider-line-left"
  }, [_c('div', {
    staticClass: "one"
  }), _vm._v(" "), _c('div', {
    staticClass: "two"
  })]), _vm._v(" "), _c('div', {
    staticClass: "divider-line-right",
    staticStyle: {
      "display": "none"
    }
  }, [_c('div', {
    staticClass: "one"
  }), _vm._v(" "), _c('div', {
    staticClass: "two"
  }), _vm._v(" "), _c('div', {
    staticClass: "three"
  })])], 2), _vm._v(" "), (!_vm.channel03 && _vm.is_show_reechoes_2) ? _c('div', {
    staticClass: "empty-card"
  }) : _vm._e(), _vm._v(" "), (_vm.is_show_reechoes_2 && _vm.channel03) ? _c('TimeDown', {
    ref: "timeDown2",
    attrs: {
      "time_key": 2,
      "count_time": _vm.time_2,
      "list": _vm.two_list
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "pick-btn",
    style: ({
      'margin-top': _vm.is_show_reechoes_2 ? '0.1rem' : '0.8rem'
    }),
    on: {
      "click": function($event) {
        return _vm.changeSale(2)
      }
    }
  }, [_vm._v("\n          " + _vm._s('领取我的专属优惠') + "\n          "), (_vm.is_show_reechoes_2) ? _c('img', {
    staticClass: "absolute-zhe discount-tag",
    attrs: {
      "src": __webpack_require__(632),
      "alt": ""
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.is_show_reechoes_2),
      expression: "is_show_reechoes_2"
    }],
    staticClass: "reset-select",
    on: {
      "click": function($event) {
        return _vm.restartChoose(2)
      }
    }
  }, [_vm._v("\n          重新选择\n        ")])], 1)])], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "report-container"
  }, _vm._l((_vm.banner_list), function(item, index) {
    return _c('div', {
      key: index,
      class: [item.is_big ? 'big-item' : 'normal-item'],
      on: {
        "click": function($event) {
          return _vm.jumpUrl(
            item.url,
            item.e_id,
            item.e_name,
            item.ad_e,
            item.report_id,
            item.product_key
          )
        }
      }
    }, [_c('img', {
      class: [item.is_big ? 'big-icon' : 'normal-icon'],
      attrs: {
        "src": _vm.getBannerIcon(item),
        "alt": ""
      }
    }), _vm._v(" "), (item.is_big) ? _c('div', {
      staticClass: "big-box"
    }, [_c('div', {
      staticClass: "left"
    }, [_c('div', {
      staticClass: "text",
      staticStyle: {
        "-webkit-box-orient": "vertical"
      }
    }, [_vm._v("\n            " + _vm._s(_vm.is_cn ? item.cn_desc : item.tw_desc) + "\n          ")]), _vm._v(" "), _c('div', {
      staticClass: "tips flex-start"
    }, [_c('div', {
      staticClass: "buy-num"
    }, [_vm._v(_vm._s(item.buy_num) + _vm._s(_vm.$t('tips-5')))]), _vm._v(" "), _c('div', {
      staticClass: "review-num ml-40"
    }, [_vm._v("\n              " + _vm._s(item.review_num) + _vm._s(_vm.$t('tips-4')) + "\n            ")])])]), _vm._v(" "), _c('img', {
      staticClass: "right-btn",
      attrs: {
        "src": _vm.is_cn ? _vm.cn_right_pay : _vm.tw_right_pay,
        "alt": ""
      }
    })]) : _c('div', {
      staticClass: "normal-box"
    }, [_c('div', {
      staticClass: "text",
      staticStyle: {
        "-webkit-box-orient": "vertical"
      }
    }, [_vm._v("\n          " + _vm._s(_vm.is_cn ? item.cn_desc : item.tw_desc) + "\n        ")]), _vm._v(" "), _c('div', {
      staticClass: "tips"
    }, [_c('div', {
      staticClass: "buy-num"
    }, [_vm._v(_vm._s(item.buy_num) + _vm._s(_vm.$t('tips-5')))]), _vm._v(" "), _c('div', {
      staticClass: "review-num"
    }, [_vm._v("\n            " + _vm._s(item.review_num) + _vm._s(_vm.$t('tips-4')) + "\n          ")])])])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "sale-box",
    staticStyle: {
      "display": "none"
    }
  }, [_c('div', {
    staticClass: "title-box"
  }, [_c('div', {
    staticClass: "left"
  }, [_vm._v(_vm._s(_vm.$t('buy-zhekou')))]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [(_vm.zhekouList[_vm.zhekou].total) ? _c('div', {
    staticClass: "total"
  }, [_vm._v("\n          " + _vm._s(_vm.zhekouList[_vm.zhekou].total) + "RM\n        ")]) : _vm._e(), _vm._v(" "), (_vm.zhekouList[_vm.zhekou].percent) ? _c('div', {
    staticClass: "percent"
  }, [_vm._v("\n          " + _vm._s(_vm.zhekouList[_vm.zhekou].percent) + "\n        ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "price"
  }, [_vm._v(_vm._s(_vm.zhekouList[_vm.zhekou].price) + "RM")])])]), _vm._v(" "), _c('div', {
    staticClass: "sale-list"
  }, _vm._l((_vm.checked_list), function(it, k) {
    return _c('div', {
      key: 'sale' + k,
      staticClass: "item",
      on: {
        "click": function($event) {
          return _vm.showPop()
        }
      }
    }, [(it.check_icon) ? _c('img', {
      staticClass: "icon",
      attrs: {
        "src": it.check_icon,
        "alt": ""
      }
    }) : _vm._e(), _vm._v(" "), (!it.check_icon) ? _c('img', {
      staticClass: "add-icon",
      attrs: {
        "src": __webpack_require__(1208),
        "alt": ""
      }
    }) : _vm._e()])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "lock-btn",
    on: {
      "click": function($event) {
        return _vm.payModal()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('order-btn')) + "\n      "), _c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.zhekou === 2),
      expression: "zhekou === 2"
    }],
    staticClass: "btn-icon",
    attrs: {
      "src": __webpack_require__(1173),
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.zhekou === 1),
      expression: "zhekou === 1"
    }],
    staticClass: "btn-icon",
    attrs: {
      "src": __webpack_require__(1174),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "change-btn",
    on: {
      "click": function($event) {
        return _vm.showPop()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('change-btn')) + "\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "hot-product hidden"
  }, [_c('img', {
    staticClass: "title",
    attrs: {
      "src": __webpack_require__(1209),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "product-list"
  }, _vm._l((_vm.recommend_list), function(it, k) {
    return _c('img', {
      key: 'reco' + k,
      staticClass: "item",
      attrs: {
        "src": it.icon,
        "alt": ""
      },
      on: {
        "click": function($event) {
          return _vm.handleReport(it, 2)
        }
      }
    })
  }), 0)]), _vm._v(" "), _c('div', {
    staticClass: "ad-list hidden"
  }, _vm._l((_vm.ad_list), function(ad, k) {
    return _c('img', {
      key: 'ad' + k,
      staticClass: "item",
      attrs: {
        "src": ad.icon
      },
      on: {
        "click": function($event) {
          return _vm.handleReport(ad, 3)
        }
      }
    })
  }), 0), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "closeOnClickModal": false,
      "position": "bottom"
    },
    model: {
      value: (_vm.sale_visible),
      callback: function($$v) {
        _vm.sale_visible = $$v
      },
      expression: "sale_visible"
    }
  }, [_c('div', {
    staticClass: "pop-box"
  }, [_c('div', {
    staticClass: "pop-header"
  }, [_c('div', {
    staticClass: "left"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('get-three')) + "\n        ")]), _vm._v(" "), _c('img', {
    staticClass: "close",
    attrs: {
      "src": __webpack_require__(618),
      "alt": ""
    },
    on: {
      "click": function($event) {
        return _vm.closeSalePop()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "pop-content"
  }, _vm._l((_vm.pop_list), function(it, k) {
    return _c('div', {
      key: 'sale-' + k,
      class: {
        item: true,
        'normal-item': true,
        'forbidden-item': !_vm.can_choose && !it.checked,
      },
      on: {
        "click": function($event) {
          return _vm.chooseSale(it, k)
        }
      }
    }, [(it.checked) ? _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": __webpack_require__(1210),
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": __webpack_require__(1213),
        "alt": ""
      }
    }), _vm._v(" "), _c('img', {
      staticClass: "top-icon",
      attrs: {
        "src": it.icon,
        "alt": ""
      }
    }), _vm._v(" "), (_vm.measureProduct[k]) ? _c('div', {
      staticClass: "bottom-box",
      attrs: {
        "id": ("text-" + k)
      }
    }, [_vm._v("\n            " + _vm._s(_vm.measureProduct[k].tips) + "\n          ")]) : _vm._e()])
  }), 0), _vm._v(" "), _c('div', {
    class: {
      'confirm-box': true,
      'disabled-confirm': !_vm.can_submit ? true : false,
    },
    on: {
      "click": function($event) {
        return _vm.handleConfirm()
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('confirm-btn')) + "\n      ")])])]), _vm._v(" "), _c('PayPopup', {
    attrs: {
      "visible": _vm.pay_visible,
      "is_combine": true,
      "total_money": _vm.zhekouList[_vm.zhekou].price,
      "checked_list": _vm.checked_list,
      "all_list": _vm.all_list,
      "combine_ids": _vm.combine_ids
    },
    on: {
      "update-visible": function($event) {
        _vm.pay_visible = false
      }
    }
  }), _vm._v(" "), _c('PopResult', {
    attrs: {
      "visible": _vm.pay_result_visible,
      "result_list": _vm.result_list,
      "sub_orders": _vm.sub_orders,
      "pop_list": _vm.pop_list
    },
    on: {
      "handleReport": _vm.hasPayReport,
      "update-visible": function($event) {
        _vm.pay_result_visible = false
      }
    }
  }), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "closeOnClickModal": false,
      "position": "bottom"
    },
    model: {
      value: (_vm.new_sale_modal),
      callback: function($$v) {
        _vm.new_sale_modal = $$v
      },
      expression: "new_sale_modal"
    }
  }, [_c('div', {
    staticClass: "modal-box"
  }, [_c('div', {
    staticClass: "title-box"
  }, [_c('div', {
    staticClass: "left",
    on: {
      "click": function($event) {
        _vm.new_sale_modal = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "center"
  }, [_vm._v("任选三项享特惠")]), _vm._v(" "), (_vm.confirm_btn_3) ? _c('div', {
    staticClass: "right-common right-check",
    on: {
      "click": function($event) {
        return _vm.submitPopList()
      }
    }
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("确定")])]) : _c('div', {
    staticClass: "right-common disable-right",
    on: {
      "click": function($event) {
        return _vm.ToastSubmit('三')
      }
    }
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("确定")])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-list"
  }, _vm._l((_vm.new_pop_list), function(item, k) {
    return _c('div', {
      key: k,
      class: {
        item: true,
        'item-checked': item.checked,
        'opacity-20': _vm.pick_list.length >= 3 && !item.checked,
        'item-normal': !item.checked,
      },
      on: {
        "click": function($event) {
          return _vm.chooseNewSale(item, k)
        }
      }
    }, [_c('div', {
      staticClass: "show-detail-btn",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.showDetailModal(3, item, k)
        }
      }
    }, [_c('span', {
      staticClass: "btn-text"
    }, [_vm._v("详情")]), _vm._v(" "), _c('img', {
      staticClass: "btn-img",
      attrs: {
        "src": __webpack_require__(613)
      }
    })]), _vm._v(" "), _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": item.checked ? _vm.checkIcon : _vm.noCheckIcon,
        "alt": ""
      }
    }), _vm._v(" "), _c('img', {
      staticClass: "icon",
      attrs: {
        "src": _vm.is_cn ? item.cn_pop_icon : item.tw_pop_icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "desc",
      staticStyle: {
        "-webkit-box-orient": "vertical"
      }
    }, [_vm._v("\n            " + _vm._s(_vm.is_cn ? item.cn_desc : item.tw_desc) + "\n          ")])])
  }), 0)])]), _vm._v(" "), _c('mt-popup', {
    attrs: {
      "closeOnClickModal": false,
      "position": "bottom"
    },
    model: {
      value: (_vm.new_sale_modal2),
      callback: function($$v) {
        _vm.new_sale_modal2 = $$v
      },
      expression: "new_sale_modal2"
    }
  }, [_c('div', {
    staticClass: "modal-box"
  }, [_c('div', {
    staticClass: "title-box"
  }, [_c('div', {
    staticClass: "left",
    on: {
      "click": function($event) {
        _vm.new_sale_modal2 = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "center"
  }, [_vm._v("任选两项享特惠")]), _vm._v(" "), (_vm.confirm_btn_2) ? _c('div', {
    staticClass: "right-common right-check",
    on: {
      "click": function($event) {
        return _vm.submitPopList(2)
      }
    }
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("确定")])]) : _c('div', {
    staticClass: "right-common disable-right",
    on: {
      "click": function($event) {
        return _vm.ToastSubmit('两')
      }
    }
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("确定")])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-list"
  }, _vm._l((_vm.new_pop_list), function(item, k) {
    return _c('div', {
      key: k,
      class: {
        item: true,
        'item-checked': item.checked,
        'opacity-20': _vm.pick_list2.length >= 2 && !item.checked,
        'item-normal': !item.checked,
      },
      on: {
        "click": function($event) {
          return _vm.chooseNewSale(item, k, 2, 'pick_list2')
        }
      }
    }, [_c('div', {
      staticClass: "show-detail-btn",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.showDetailModal(2, item, k, 2, 'pick_list2')
        }
      }
    }, [_c('span', {
      staticClass: "btn-text"
    }, [_vm._v("详情")]), _vm._v(" "), _c('img', {
      staticClass: "btn-img",
      attrs: {
        "src": __webpack_require__(613)
      }
    })]), _vm._v(" "), _c('img', {
      staticClass: "check-icon",
      attrs: {
        "src": item.checked ? _vm.checkIcon : _vm.noCheckIcon,
        "alt": ""
      }
    }), _vm._v(" "), _c('img', {
      staticClass: "icon",
      attrs: {
        "src": _vm.is_cn ? item.cn_pop_icon : item.tw_pop_icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "desc",
      staticStyle: {
        "-webkit-box-orient": "vertical"
      }
    }, [_vm._v("\n            " + _vm._s(_vm.is_cn ? item.cn_desc : item.tw_desc) + "\n          ")])])
  }), 0)])]), _vm._v(" "), _c('PayModal', {
    attrs: {
      "visible": _vm.pay_modal,
      "combine_info": _vm.combine_info,
      "pay_index": 3,
      "key_store": "mlxz_web_select_list"
    },
    on: {
      "close": function($event) {
        _vm.pay_modal = false
      },
      "resetInfo": function($event) {
        _vm.combine_info = {}
      },
      "logEvent": _vm.logEventForSort
    }
  }), _vm._v(" "), _c('PayModal', {
    attrs: {
      "visible": _vm.pay_modal2,
      "combine_info": _vm.combine_info2,
      "pay_index": 2,
      "key_store": "mlxz_web_select_list_two"
    },
    on: {
      "close": function($event) {
        _vm.pay_modal2 = false
      },
      "resetInfo": function($event) {
        _vm.combine_info2 = {}
      },
      "logEvent": _vm.logEventForSort
    }
  }), _vm._v(" "), (_vm.show_result) ? _c('ResultPop', {
    on: {
      "close": function($event) {
        _vm.show_result = false
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show_fixed_order) ? _c('FixedOrder', {
    attrs: {
      "title": _vm.local_title,
      "new_order_key": _vm.new_order_key,
      "name": "local",
      "top": "4.7rem",
      "time": _vm.local_time
    },
    on: {
      "payOrder": _vm.checkOrder,
      "jumpDetail": _vm.jumpOrder
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show_api_order) ? _c('FixedOrder', {
    attrs: {
      "title": _vm.last_title,
      "last_order": _vm.last_order,
      "name": "api",
      "top": "6.7rem",
      "time": _vm.api_time
    },
    on: {
      "payOrder": _vm.checkOrder,
      "jumpDetail": _vm.jumpOrder
    }
  }) : _vm._e(), _vm._v(" "), _c('SaleDetailModal', {
    attrs: {
      "callback": _vm.sale_detail_callback,
      "product_key": _vm.sale_detail_product_key,
      "selected_list": _vm.new_sale_modal ? _vm.pick_list : _vm.pick_list2,
      "size": _vm.new_sale_modal ? 3 : 2
    },
    model: {
      value: (_vm.sale_detail_modal),
      callback: function($$v) {
        _vm.sale_detail_modal = $$v
      },
      expression: "sale_detail_modal"
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1640:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "recommend-container"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    ref: "combine",
    staticClass: "combine",
    style: ({
      marginLeft: _vm.scrollLeft + 'px',
      transitionDuration: _vm.hasTouch ? '0s' : '0.2s',
    })
  }, [_c('div', {
    staticClass: "combine-box",
    class: {
      animation: !_vm.hasScroll
    }
  }, [_c('div', {
    staticClass: "combine-card",
    staticStyle: {
      "margin-right": "0.2rem"
    }
  }, [_c('div', {
    staticClass: "combine-top"
  }, [_c('div', {
    staticClass: "combine-info"
  }, [(_vm.combineOrder3 && _vm.combineOrder3.sub_orders) ? _c('div', {
    staticClass: "combine-info-left"
  }, [_vm._v("\n              已成功解锁，快去体验吧\n            ")]) : [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "combine-info-right"
  }, [_vm._v("原价204RM，立减96RM")])]], 2)]), _vm._v(" "), (!_vm.combineLoading) ? [_c('div', {
    staticClass: "combine-products"
  }, [(_vm.showCombine3) ? _vm._l((_vm.combineArr3), function(item, index) {
    return _c('div', {
      staticClass: "combine-product",
      class: ['prod_' + item],
      on: {
        "click": function($event) {
          return _vm.showGroupPopup3(
            !_vm.combineOrder3 || !_vm.combineOrder3.sub_orders,
            'card'
          )
        }
      }
    }, [(!_vm.combineOrder3 || !_vm.combineOrder3.sub_orders) ? _c('img', {
      staticClass: "unlock",
      attrs: {
        "src": __webpack_require__(610)
      }
    }) : _vm._e()])
  }) : _vm._l((3), function(item) {
    return _c('img', {
      staticClass: "combine-placeholder",
      attrs: {
        "src": __webpack_require__(609)
      },
      on: {
        "click": function($event) {
          return _vm.showGroupPopup3(true, 'card')
        }
      }
    })
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "combine-bottom"
  }, [(_vm.combineOrder3 && _vm.combineOrder3.sub_orders) ? _c('div', {
    staticClass: "combine-order"
  }, _vm._l((_vm.combineOrder3.sub_orders), function(item) {
    return _c('div', {
      staticClass: "combine-order-item"
    }, [_c('div', {
      staticClass: "combine-order-btn",
      class: {
        done: item.order_id
      },
      on: {
        "click": function($event) {
          return _vm.toResult(item, _vm.combineOrder3.order_id)
        }
      }
    }, [_vm._v("\n                  " + _vm._s(item.order_id ? '查看结果' : '开始测算') + "\n                ")]), _vm._v(" "), _c('div', {
      staticClass: "combine-order-state"
    }, [_vm._v("\n                  " + _vm._s(item.order_id ? '已测算' : '还未测算') + "\n                ")])])
  }), 0) : (_vm.showCombine3) ? [_c('div', {
    staticClass: "combine-select",
    staticStyle: {
      "margin-bottom": "0.22rem"
    },
    on: {
      "click": function($event) {
        return _vm.pay(6)
      }
    }
  }, [_vm._v("\n                108RM 立即支付\n              ")]), _vm._v(" "), _c('div', {
    staticClass: "combine-change",
    on: {
      "click": function($event) {
        return _vm.showGroupPopup3(true, 'change')
      }
    }
  }, [_vm._v("\n                更改选项\n              ")])] : _c('div', {
    staticClass: "combine-select scale",
    on: {
      "click": function($event) {
        return _vm.showGroupPopup3(true, 'select')
      }
    }
  }, [_vm._v("\n              选择组合\n            ")])], 2)] : _c('div', {
    staticClass: "combine-loading"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(614),
      "alt": ""
    }
  })])], 2), _vm._v(" "), _c('div', {
    staticClass: "combine-card",
    staticStyle: {
      "margin-right": "0.2rem"
    }
  }, [_c('div', {
    staticClass: "combine-top"
  }, [_c('div', {
    staticClass: "combine-info"
  }, [(_vm.combineOrder2 && _vm.combineOrder2.sub_orders) ? _c('div', {
    staticClass: "combine-info-left"
  }, [_vm._v("\n              已成功解锁，快去体验吧\n            ")]) : [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "combine-info-right"
  }, [_vm._v("原价138RM，立减48RM")])]], 2)]), _vm._v(" "), (!_vm.combineLoading) ? [_c('div', {
    staticClass: "combine-products",
    staticStyle: {
      "justify-content": "center"
    }
  }, [(_vm.showCombine2) ? _vm._l((_vm.combineArr2), function(item) {
    return _c('div', {
      staticClass: "combine-product",
      class: ['prod_' + item],
      staticStyle: {
        "margin": "0 0.12rem"
      },
      on: {
        "click": function($event) {
          return _vm.showGroupPopup2(
            !_vm.combineOrder2 || !_vm.combineOrder2.sub_orders,
            'card'
          )
        }
      }
    }, [(!_vm.combineOrder2 || !_vm.combineOrder2.sub_orders) ? _c('img', {
      staticClass: "unlock",
      attrs: {
        "src": __webpack_require__(610)
      }
    }) : _vm._e()])
  }) : _vm._l((2), function(item) {
    return _c('img', {
      staticClass: "combine-placeholder",
      staticStyle: {
        "margin": "0 0.12rem"
      },
      attrs: {
        "src": __webpack_require__(609)
      },
      on: {
        "click": function($event) {
          return _vm.showGroupPopup2(true, 'card')
        }
      }
    })
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "combine-bottom"
  }, [(_vm.combineOrder2 && _vm.combineOrder2.sub_orders) ? _c('div', {
    staticClass: "combine-order",
    staticStyle: {
      "justify-content": "center"
    }
  }, _vm._l((_vm.combineOrder2.sub_orders), function(item) {
    return _c('div', {
      staticClass: "combine-order-item",
      staticStyle: {
        "margin": "0 0.12rem"
      }
    }, [_c('div', {
      staticClass: "combine-order-btn",
      class: {
        done: item.order_id
      },
      on: {
        "click": function($event) {
          return _vm.toResult(item, _vm.combineOrder2.order_id)
        }
      }
    }, [_vm._v("\n                  " + _vm._s(item.order_id ? '查看结果' : '开始测算') + "\n                ")]), _vm._v(" "), _c('div', {
      staticClass: "combine-order-state"
    }, [_vm._v("\n                  " + _vm._s(item.order_id ? '已测算' : '还未测算') + "\n                ")])])
  }), 0) : (_vm.showCombine2) ? [_c('div', {
    staticClass: "combine-select",
    staticStyle: {
      "margin-bottom": "0.22rem"
    },
    on: {
      "click": function($event) {
        return _vm.pay(7)
      }
    }
  }, [_vm._v("\n                88RM 立即支付\n              ")]), _vm._v(" "), _c('div', {
    staticClass: "combine-change",
    on: {
      "click": function($event) {
        return _vm.showGroupPopup2(true, 'change')
      }
    }
  }, [_vm._v("\n                更改选项\n              ")])] : _c('div', {
    staticClass: "combine-select scale",
    on: {
      "click": function($event) {
        return _vm.showGroupPopup2(true, 'select')
      }
    }
  }, [_vm._v("\n              选择组合\n            ")])], 2)] : _c('div', {
    staticClass: "combine-loading"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(614),
      "alt": ""
    }
  })])], 2)])]), _vm._v(" "), _vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, _vm._l((_vm.list), function(item) {
    return _c('div', {
      staticClass: "card-box",
      on: {
        "click": function($event) {
          return _vm.link(item.url, item.item_id)
        }
      }
    }, [_c('div', {
      staticClass: "card"
    }, [_c('div', {
      staticClass: "top",
      class: ['prod-banner_' + item.item_id]
    }), _vm._v(" "), _c('div', {
      staticClass: "bottom"
    }, [_c('div', {
      staticClass: "info"
    }, [_c('div', {
      staticClass: "card-title"
    }, [_vm._v("\n              " + _vm._s(item.title)), _c('span', {
      staticClass: "price"
    }, [_vm._v("RM"), _c('span', {
      staticClass: "price-num"
    }, [_vm._v(_vm._s(item.price))])])]), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_vm._v(_vm._s(item.desc))])]), _vm._v(" "), _c('div', {
      staticClass: "btn"
    }, [_vm._v("立即解锁")])])])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "fb-footer"
  }, [_c('div', {
    staticClass: "fb",
    staticStyle: {
      "margin-top": "0.36rem",
      "margin-bottom": "0.3rem"
    }
  }, [_vm._v("\n      更多詳細信息請訪問\n      "), _c('div', {
    on: {
      "click": function($event) {
        return _vm.toFb('https://www.facebook.com/profile.php?id=100086957902199')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(1122),
      "alt": ""
    }
  }), _c('span', {
    staticClass: "link"
  }, [_vm._v("FB關注[linghit]")])])]), _vm._v(" "), _c('div', [_vm._v("\n      如需幫助可發送郵件至 yangyaping@weli.cn\n      ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "0.3rem"
    }
  }, [_vm._v("客服會盡快恢復您的問題")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "0.3rem"
    }
  }, [_c('span', {
    on: {
      "click": function($event) {
        return _vm.toPage('service.html')
      }
    }
  }, [_vm._v("《通用服務條款及隱私政策》")])])]), _vm._v(" "), _c('GroupPopup', {
    attrs: {
      "list": _vm.list1,
      "visible": _vm.visible1,
      "maxNum": 3
    },
    on: {
      "update-visible": function($event) {
        _vm.visible1 = false
      },
      "update-check": _vm.updateCheck1,
      "confirm-combine": _vm.confirmCombine3
    }
  }), _vm._v(" "), _c('GroupPopup', {
    attrs: {
      "list": _vm.list2,
      "visible": _vm.visible2,
      "maxNum": 2
    },
    on: {
      "update-visible": function($event) {
        _vm.visible2 = false
      },
      "update-check": _vm.updateCheck2,
      "confirm-combine": _vm.confirmCombine2
    }
  }), _vm._v(" "), _c('PayPopup', {
    attrs: {
      "visible": _vm.visible,
      "product_id": _vm.product_id,
      "is_combine": true,
      "combine_ids": _vm.combine_ids
    },
    on: {
      "update-visible": function($event) {
        _vm.visible = false
      }
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "title"
  }, [_vm._v("\n    优惠组合\n    "), _c('img', {
    attrs: {
      "src": __webpack_require__(1039)
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "combine-info-left"
  }, [_vm._v("\n                任选三个享特价"), _c('img', {
    attrs: {
      "src": __webpack_require__(1037),
      "alt": ""
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "combine-info-left"
  }, [_vm._v("\n                任选两个享特价"), _c('img', {
    attrs: {
      "src": __webpack_require__(1036),
      "alt": ""
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "title"
  }, [_vm._v("\n    本月爆品\n    "), _c('img', {
    attrs: {
      "src": __webpack_require__(1038)
    }
  })])
}]}

/***/ }),

/***/ 1650:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mt-popup', {
    attrs: {
      "closeOnClickModal": false,
      "position": "bottom"
    },
    model: {
      value: (_vm.show),
      callback: function($$v) {
        _vm.show = $$v
      },
      expression: "show"
    }
  }, [(_vm.product_key) ? _c('div', {
    staticClass: "modal-box"
  }, [_c('div', {
    staticClass: "title-box"
  }, [_c('div', {
    staticClass: "left",
    on: {
      "click": _vm.close
    }
  }, [_vm._v("关闭")]), _vm._v(" "), _c('div', {
    staticClass: "center"
  }, [_vm._v("\n        " + _vm._s(_vm.reportName[_vm.product_key][_vm.is_cn ? 'cn' : 'tw']) + "\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "right right-check"
  }, [_c('div', {
    staticClass: "btn",
    on: {
      "click": _vm.selectReport
    }
  }, [_vm._v("选择报告")])])]), _vm._v(" "), _c('div', {
    staticClass: "content-box",
    attrs: {
      "id": _vm.product_key
    }
  }, [_c('div', {
    staticClass: "show-list"
  }, [_vm._l((_vm.imgMap[_vm.product_key][_vm.is_cn ? 'cn' : 'tw']), function(item, idx) {
    return _c('div', {
      key: idx,
      staticClass: "show-item"
    }, [_c('img', {
      staticClass: "show-img",
      attrs: {
        "src": item
      }
    })])
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "1rem"
    }
  })], 2)])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 1651:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "timer-box"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('img', {
    staticClass: "clock",
    attrs: {
      "src": __webpack_require__(1323),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "tips1"
  }, [_vm._v(_vm._s(_vm.tips1))])]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('count-down', {
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
        }, [_c('span', [_vm._v("\n            " + _vm._s(_vm._f("filterTime")(timeData.milliseconds)) + "\n          ")])])]
      }
    }])
  })], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 1685:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mt-popup', {
    attrs: {
      "position": "bottom"
    },
    model: {
      value: (_vm.pop_modal),
      callback: function($$v) {
        _vm.pop_modal = $$v
      },
      expression: "pop_modal"
    }
  }, [_c('div', {
    staticClass: "pay-modal"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("选择支付方式")]), _vm._v(" "), _c('img', {
    staticClass: "close",
    attrs: {
      "src": __webpack_require__(1324),
      "alt": ""
    },
    on: {
      "click": function($event) {
        _vm.pop_modal = false
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "price"
  }, [_c('div', {
    staticClass: "unit"
  }, [_vm._v("\n        " + _vm._s(_vm.combine_info.unit) + "\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_vm._v("\n        " + _vm._s(_vm.combine_info.price) + "\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "pay-list"
  }, [(!_vm.pay_methods.length && _vm.loading) ? _c('div', {
    staticClass: "no-empty"
  }, [_c('mt-spinner', {
    attrs: {
      "type": "fading-circle",
      "size": 60
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._l((_vm.pay_methods), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "pay-item",
      on: {
        "click": function($event) {
          _vm.check_index = index
        }
      }
    }, [_c('div', {
      staticClass: "left"
    }, [_c('img', {
      staticClass: "logo",
      attrs: {
        "src": item.icon,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "name"
    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), _c('img', {
      staticClass: "check",
      attrs: {
        "src": _vm.check_index === index ? _vm.checked : _vm.noChecked,
        "alt": ""
      }
    })])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "pay-btn",
    on: {
      "click": function($event) {
        return _vm.payMoney()
      }
    }
  }, [_c('div', {
    staticClass: "text"
  }, [_vm._v("立即支付")])])])])
},staticRenderFns: []}

/***/ }),

/***/ 1691:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('mt-popup', {
    attrs: {
      "closeOnClickModal": false,
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
    staticClass: "group-popup"
  }, [_c('div', {
    staticClass: "group-header"
  }, [_c('div', {
    staticClass: "group-title"
  }, [_vm._v("\n          请选择商品组合"), _c('span', [_vm._v("需选择" + _vm._s(_vm.maxNum) + "个商品")])]), _vm._v(" "), _c('div', {
    staticClass: "group-close",
    on: {
      "click": _vm.close
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(95)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "group-wrapper"
  }, _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      staticClass: "group-item",
      class: {
        active: item.check,
        disable: _vm.canConfirm && !item.check
      },
      on: {
        "click": function($event) {
          return _vm.check(item)
        }
      }
    }, [_c('div', {
      staticClass: "img",
      class: [_vm.getProdImg(item.item_id)]
    }), _vm._v(" "), _c('div', {
      staticClass: "desc"
    }, [_vm._v(_vm._s(item.desc))])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "group-btn",
    class: {
      disable: !_vm.canConfirm
    },
    on: {
      "click": _vm.confirm
    }
  }, [_vm._v("\n        确认\n      ")])])])], 1)
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

/***/ 185:
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

/***/ 190:
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

/***/ 191:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 192:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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

/***/ 215:
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

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_bazihehun.5e1c44b.png";

/***/ }),

/***/ 226:
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

/***/ 257:
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

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_nianyun.ac4c1ab.png";

/***/ }),

/***/ 261:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_shiye.9f79ca2.png";

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(261)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(257),
  /* template */
  __webpack_require__(271),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7d3a8e00",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 271:
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

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_yuantiangang.3c14888.png";

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mo2@2x.3b3580b.png";

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mo2.e1035a0.png";

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

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home1.94eb0a1.png";

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home2.e39acf8.png";

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_nianyun.78b38e7.png";

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home3.5f7bf45.png";

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home4.0a80f23.png";

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home5.a92e442.png";

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home1_fanti.d637014.png";

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home2_fanti.568cf4f.png";

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home3_fanti.4788bbe.png";

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home4_fanti.fd745d4.png";

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_home5_fanti.ec8b730.png";

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_shiye.0c8425e.png";

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card1.fd22e91.png";

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card2.701d6c3.png";

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card3.24a20b9.png";

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card4.f55b463.png";

/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card5.42f8ac0.png";

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai2.4ba4cae.png";

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai3.f454eef.png";

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pignjia.32e698c.png";

/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/24年运-简体.1bcc6cc.gif";

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_fan_yuantiangang.586ef3c.png";

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/感情运势-简体.a24991b.gif";

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/1.495a00c.png";

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2.f62dabf.png";

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3.2157c10.png";

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4.f867eca.png";

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card_2_cn.54ec6d1.png";

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card_2_tw.6bd113f.png";

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card_4_cn.1f0d165.png";

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card_4_tw.0563787.png";

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai1.38c8ffc.png";

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_caiyun.3153eca.png";

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai2.464bd94.png";

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai5.d9e27d5.png";

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_ganqing.b2bd698.png";

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card1.c6e8de1.png";

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card2.9d71ef9.png";

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card3.15d3571.png";

/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card4.8cad0b4.png";

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card5.c4fc0ad.png";

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card_1.bb1fdd4.png";

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card_2.1758a7b.png";

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/card_3.0b7030f.png";

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/1.3a49233.png";

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/2.cf539ec.png";

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_guiguzi.189b5d1.png";

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/3.7ef1267.png";

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/4.8fd4c0a.png";

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai1.deb713b.png";

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai2.4aef439.png";

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_mokuai5.ef7e9a8.png";

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

/***/ 609:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAB4CAMAAABy8Bh8AAAAPFBMVEUAAADB3NDC3NG73szA29DB3NDC3dHB3M/B3NDh+O59sprU7eLC3dHe9uza8ujQ6d7H4dXF4NSEt6Ct0MAP8o0aAAAACHRSTlMAkysH9NW88bYAQvAAAAGVSURBVHja7dzLkoIwEIVhwkVbciHA+7/rxIQaQazS3szkzJx/6+YrSntjcZpHrRl6qbp+MG1zrjMCkelO8ouAdHm2gzzze+Yob6U02+BvVeaDnaXUvnjozvopOqkyFydvi80cbss1fxpspe5Nb0P2XU37fFuslcr7FprucFuir/qZ33M+SunS7W+LnaT6Jitb5nFbovWzVN/sbZRSu7stAPJk392ZAeG2vLozQ9Nj3JbznekbSc3135Z9rvwqG5TbcrozhR6iQBWDyEbH+r6IOC+y0W8CVgKT/j7SSVdFOumqSCddFemkqyKddFWkk66K9J+ir8s4LqvkwOhJnuySA6OPOcmRTjrppJNOOumkk076X6Cvy/hBy1ohvcjf2yukjx9GOr8w6D9T4ONIOumkp0gnnXTSSSed9H/2Nxjwn4/7SCddFemkqyKddFWkk66KdNJVkU66KtJJ/7UKGP+1cOCX8YEnEECHJ4DnPoBHVoCnbYAHhYBnnJDHs4Any5CH4qDn+aBHEYGnKJEHQIFnVwHHbr8Arj268wVJv0EAAAAASUVORK5CYII="

/***/ }),

/***/ 610:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAkCAMAAAAtiZ11AAAAvVBMVEUAAAD/nmP/nmT/eiT/ein/ein/nmT/ein/nWP/ein/nWP/////ein/k1L/kU7/jkr/mV3/hj7/i0b/fS7/mFr/llf/gDT/hDn/m2D/ikP/hTv/fzH/iED/gjb/lFT/+/n/u5L/59j/n2b/38z/o2z/+vf/yan/r37/2cL/xaL/rHr/6dz/9O3/1r3/zK7/tIb/+PT/07j/pnH/9vD/8Of/vJX/t4z/qnb/7eP/3cj/z7L/wJr/5dX/4c7/sYLOGTz9AAAACnRSTlMA7CMj7OupqcvL2v4kyQAAA4dJREFUSMet1otymkAYhuGkp7R8YQEFA54WEEE5KCp41vu/rP4rItpi0k58x5mYceaZHxbdfaK+/HiWKNM0VUrXdYPq92WKUcqpBmVZVrfb1TSt3X6jer0W1el0mqLX19dvL1+JEyKBd0gmKsUPSeo7mST+lK5J/T+n7FSk6NfXYsaKrMx+NeYtqd2SpUlkOeePwvu3e1mabWH2ai6cenl6/jeyUTNlPfntqQQ/v+Jlt6R3JiXXrMj+B1MqSu8+uRvOCnKAyYU88j37e0rn4AmyYbRagNvsTlu1pJdidEsyykE8m808NiwbE2kAEpHB0CnIHJs6UtognavLIcXBxZ8VmSFOHRnKBGkDkeMcGcdKkO0YQR05AmxVtVFFpLHGKPSRGg1ZTrBlbIQdkRuI8paPSJBjZDUX7m6AiWSq0pzaI/EoQ2YJUrO/xo4pDWMI17IOWGqaCuyCIDBajXjcJjLMVjXLEwJb08/y2+WRI5yz9Qh71/UW8DRthvVpxZXgGATEh0Eo11z4eizWZ+KIUsSOyGQSkHLxyjMsdB9A3ND6HElAaR4u2TWkZ5oDrOe4zmUyFsoAZNlhZFrubOQbmqYkGQfFPPDZqbiGpMwxMJXy3C5bLo0rsrEc69PNuHgulQQ4jBpEttpB0G4O6kkb4NUX0oEvy4xILDgWQyLXYmUH5RcScHs9QSoAu0PuuCCl0bkFopEvC5KfXrYHxCl4HG81zfBcYOmqRHbeIVNkRLq4KhLkgp0uPI9wLtG07flzMWUfsO6Qm2RKpDkR+b4fY+/v5OpeTnjsmlvsVVXWtHGWAXG2EeQcw+Ydcm4KUlXDaHy5lzIzwAcLHDLY01XDEvdS++Ne2nDqSepM+kBekS7OTaIocmKk9LSyG3KP2UeknoCHFzKEM3cQJtjiUr8k22yXq/RmGwS5+R6pOllgGFFB2tgW93IXUgmc1WplFeR8vG+12BrRHDiw5nuk7nqm7qbFc7mBLcgJbPETXD2XIcDBreUC3O0sh0i9+6RO+RAtaUqdQyKSVmh5S+ZETow1MJzT3sPojXKXFGYAgI8MIvubAWNJvEdmCLJacSs5Wr3elCesQzW7zrZ2Sne1EiRF/xjF3iO7YuPp68Xe407nV/s4pZQ75NvbDfnQfZzI50fv49+efjx6yhc6Zj12yu9fy8Pg58+X1WGQzOfHnS/FjOXB+tPny+pg/Rssvu7AIJFd0gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 613:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAMhJREFUKFOd0q2KQlEUxfH/GvBhfAg/BovBYLNZDEbbpGkmm8kiiMmoD2E1iRaxiGEwOGFeYMmVrVwV8TqnbdaPfTj7bNnOA21gJGnJkyPbM6AO/AKfz3ACm8AYEHAAipI2942TENtfQC/CPVCQtEvjMwzcBb6j3Ebnn0t+hYH7QCfCNVCSdEzqe5jUQ6AVeAFUJP3dwOj6AUyARuA5UH2AgXPAFKgFHvwf2n59te1sj7GdHs8KKD+Mx/brgWf6wsxL8c6aZVrcE975ZUXOKINrAAAAAElFTkSuQmCC"

/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/loading.01814dc.png";

/***/ }),

/***/ 618:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAD1BMVEWZmZlHcEyYmJiWlpaZmZlSZqY8AAAABXRSTlP8AForlzaf6wUAAACMSURBVBjTVdHRDYMwEINhK80CRxYoG0DVAcr+S/V89qmFJ359UmQC4vYg1tnvi/kZXXgEFrArD4zKYWTG03wAV+YmTpw8ylzILBYyi4WVZGElWahMFirJ1y/zWE+DB3kaPMgMr/VyeK2Xo9eK0WvFMJoRPShZd6VByZM6fZMbNV573/P79Cf8/YXb8wV5KhfrhUh5cgAAAABJRU5ErkJggg=="

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

/***/ 630:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAB4CAMAAABy8Bh8AAAANlBMVEUAAADB3NDC3NG73szA29DB3NDC3dHB3M/B3NDh+O59sprb8ujP6d3X7+TJ49eEt6DE39Ot0MDxmvQiAAAACHRSTlMAkysH9NW88bYAQvAAAAFkSURBVHja7dzLbsIwFEXROA+4xHmQ///ZulgqSVwJ7qT1afeekOESgjOJdJtnbRh6q7p+CG1T1gWTKHSF/GIiXc52ke/8s3CUt/ZoireKi1NWtuWXfo/zYhW3zPFuqXDYlqul4mSVN0VLXUN72pZptuqbp/wZusO2xKp/LbklWu7S7bflZgJ9IcN+WzToz53R2Jbvd2bQ2JZyZ4amF9mWYmf6RmVbyp1pZLbltDPQXwcduivo0F1Bh+4KOnRX0KG7gg7dFXTorqD/FH1bx3Hd8rMYPcmTPT+L0cdH+Rk6dOjQoUOHDh069L9A39bxjdatQnqWv7ZXSB/fDDo/GPW/qfA4QocOPQUdOnTo0KFD/2evwYRfPu6DDt0VdOiuoEN3BR26K+jQXUGH7go6dFfQof9iGax8eEL43IfwkRXh0zbCB4WEzzgpH88SPlmmfChO+jyf9FFE4VOUygdAhc+uCh67/QCiZrjrsqEEzwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_tag_58_big.88bc225.png";

/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_tag_68_big.e6470db.png";

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

/***/ 67:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 684:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'dom-title': '命理寻真',
  'buy-zhekou': '多买多折扣',
  'order-btn': '解锁命运密码',
  'change-btn': '更改选项',
  'get-three': '任选3项享特惠',
  'confirm-btn': '确认',
  'pay-success': '支付成功',
  'check-report': '查看已购买报告',
  'no-add-info': '信息未添加',
  'add-info-tips': '添加信息后查看结果',
  'to-add': '去添加',
  'order-result-loading': '订单结果查询中',
  'less-get-two-tips': '请至少选择两个报告',
  'tips-1': '分钟',
  'tips-2': '测算',
  'tips-3': '给了',
  'tips-4': '好评',
  'tips-5': '已购买'
};

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-04-16 17:27:21
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-23 14:06:19
 * @Description:
 */
exports.default = {
  'dom-title': '命理尋真',
  'buy-zhekou': '多買多折扣',
  'order-btn': '解鎖命運密碼',
  'change-btn': '更改選項',
  'get-three': '任選3項享特惠',
  'confirm-btn': '確認',
  'pay-success': '支付成功',
  'check-report': '查看已購買報告',
  'no-add-info': '信息未添加',
  'add-info-tips': '添加信息後查看結果',
  'to-add': '去添加',
  'order-result-loading': '訂單結果查詢中',
  'less-get-two-tips': '請至少選擇兩個報告',
  'tips-1': '分鐘',
  'tips-2': '測算',
  'tips-3': '給了',
  'tips-4': '好評',
  'tips-5': '已購買'
};

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEqADAAQAAAABAAAADAAAAABFeZu2AAAA6ElEQVQoFZWQuw3CQBBEjxMkRISUQAgdQEAFJETktotxZDmGyAkVENCGSyAjR8hmHv6Ij5fPSHN33p19Op9zUpIk4ziOR5z/ETPMMtNL03Su/SBf5E0QBHvtX6W5lUI7eVCW5dJrmeqjLw/lrA7oaKvOZEowM5BnXstWzmUE8CPsAUIWMbv1YRiei6JY1AUaJqwLwiyMHpOIR/PeH3Wc3AvOXbWvmzezIFEUnci3ID4sGD2JN2l/h5s0EJpPIAoGjJYJofkGotgBo4zy15tUZQNEswNmQsh33ogGeoA56yZV8ocVGP4WvQH5/XhiKgAgCQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(908)
  __webpack_require__(909)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(784),
  /* template */
  __webpack_require__(1626),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2d998fc4",
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

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(4);

exports.default = {
  components: { Popup: _mintUi.Popup },
  data: function data() {
    return {
      popupVisible: false,
      loading: false,
      index: 0,
      canConfirm: false
    };
  },

  props: {
    visible: {
      default: false,
      type: Boolean
    },
    list: {
      default: [],
      type: Array
    },
    maxNum: {
      default: 3,
      type: Number
    }
  },
  watch: {
    visible: function visible(newValue) {
      if (newValue) {
        var n = 0;
        this.list.forEach(function (item) {
          if (item.check) n++;
        });
        console.log(n, this.maxNum);
        this.canConfirm = n === this.maxNum;
        this.popupVisible = true;
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
  created: function created() {},

  methods: {
    getProdImg: function getProdImg(item_id) {
      return 'prod_' + item_id;
    },
    check: function check(item) {
      if (this.canConfirm && !item.check) return false;
      this.$emit('update-check', item.item_id);
      var n = 0;
      this.list.forEach(function (it) {
        if (it.check) n++;
      });
      this.canConfirm = n === this.maxNum;
    },
    close: function close() {
      this.popupVisible = false;
    },
    confirm: function confirm() {
      if (!this.canConfirm) return false;

      var str = '';
      this.list.forEach(function (item) {
        if (item.check) str += item.item_id;
      });
      localStorage.setItem('suishen_overseas_combine' + this.maxNum, str);
      this.close();
      this.$emit('confirm-combine', str);
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

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(4);

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

var tipsArr1 = {
  'zh-CN': '支付成功',
  'zh-TW': '支付成功'
};
var tipsArr2 = {
  'zh-CN': '请输入邮箱，后续查看报告',
  'zh-TW': '请输入邮箱，后续查看报告'
};

var tipsArr3 = {
  'zh-CN': '请输入您的邮箱号码',
  'zh-TW': ''
};
var tipsArr4 = {
  'zh-CN': '请输入验证码',
  'zh-TW': ''
};
var tipsArr5 = {
  'zh-CN': '获取验证码',
  'zh-TW': ''
};
var tipsArr6 = {
  'zh-CN': '免费接受报告结果',
  'zh-TW': ''
};
var tipsArr7 = {
  'zh-CN': '验证码已发送至您的邮箱',
  'zh-TW': ''
};
var tipsArr8 = {
  'zh-CN': '报告已发送至您的邮箱，请注意查收',
  'zh-TW': ''
};

var lang = _utils2.default.getLanguage();
exports.default = {
  name: 'ResultPop',
  props: {
    close: {
      type: Function,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      // Your data properties go here
      tipsArr1: tipsArr1,
      tipsArr2: tipsArr2,
      tipsArr3: tipsArr3,
      tipsArr4: tipsArr4,
      tipsArr5: tipsArr5,
      tipsArr6: tipsArr6,
      tipsArr7: tipsArr7,
      tipsArr8: tipsArr8,
      email: '',
      code: '',
      can_send: false,
      is_email: false,
      minute_num: 60,
      time_text: tipsArr5[lang],
      lang: lang,
      count: 60
    };
  },

  computed: {
    // Your computed properties go here
    // lang() {
    //   return utils.getLanguage();
    // },
  },
  watch: {
    // Your watch properties go here
    code: function code(val) {
      if (val.length > 5) {
        this.code = val.slice(0, 6);
      }
      this.can_send = val.length > 5 ? true : false;
    },
    email: function email(val) {
      this.validateEmail(val);
      if (val.length > 50) {
        this.email = val.slice(0, 50);
      }
    }
  },
  methods: {
    validateEmail: function validateEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      this.is_email = emailRegex.test(email);
    },
    getCode: function getCode() {
      if (!this.is_email) return;
      (0, _mintUi.Toast)(this.tipsArr7[this.lang]);
      this.minuteCountDown();
    },
    minuteCountDown: function minuteCountDown() {
      var _this = this;

      var timer = setInterval(function () {
        _this.count--;
        if (_this.count <= 0) {
          clearInterval(timer);
          _this.time_text = '重新获取';
          _this.count = 60;
          return;
        }
        _this.time_text = _this.count + 's';
      }, 1000);
    },
    getReport: function getReport() {
      (0, _mintUi.Toast)(this.tipsArr8[lang]);
    },
    closePop: function closePop() {
      this.$emit('close');
    }
  },
  mounted: function mounted() {
    // Code to run when the component is mounted
  }
};

/***/ }),

/***/ 77:
/***/ (function(module, exports) {

module.exports = {"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}

/***/ }),

/***/ 78:
/***/ (function(module, exports) {

module.exports = {"_from":"elliptic@^6.5.4","_id":"elliptic@6.5.4","_inBundle":false,"_integrity":"sha1-2jfOvTHnmhNn6UG1ku0fvr1Yq7s=","_location":"/elliptic","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"elliptic@^6.5.4","name":"elliptic","escapedName":"elliptic","rawSpec":"^6.5.4","saveSpec":null,"fetchSpec":"^6.5.4"},"_requiredBy":["/browserify-sign","/create-ecdh"],"_resolved":"http://npm.etouch.cn/elliptic/-/elliptic-6.5.4.tgz","_shasum":"da37cebd31e79a1367e941b592ed1fbebd58abbb","_spec":"elliptic@^6.5.4","_where":"/Users/ls/demon/zhwnl/psychicai-overseas-h5/node_modules/browserify-sign","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"bundleDependencies":false,"dependencies":{"bn.js":"^4.11.9","brorand":"^1.1.0","hash.js":"^1.0.0","hmac-drbg":"^1.0.1","inherits":"^2.0.4","minimalistic-assert":"^1.0.1","minimalistic-crypto-utils":"^1.0.1"},"deprecated":false,"description":"EC cryptography","devDependencies":{"brfs":"^2.0.2","coveralls":"^3.1.0","eslint":"^7.6.0","grunt":"^1.2.1","grunt-browserify":"^5.3.0","grunt-cli":"^1.3.2","grunt-contrib-connect":"^3.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^5.0.0","grunt-mocha-istanbul":"^5.0.2","grunt-saucelabs":"^9.0.1","istanbul":"^0.4.5","mocha":"^8.0.1"},"files":["lib"],"homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","name":"elliptic","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"lint":"eslint lib test","lint:fix":"npm run lint -- --fix","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.5.4"}

/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ganqing_img_home = __webpack_require__(328);

var _ganqing_img_home2 = _interopRequireDefault(_ganqing_img_home);

var _ganqing_img_home3 = __webpack_require__(329);

var _ganqing_img_home4 = _interopRequireDefault(_ganqing_img_home3);

var _ganqing_img_home5 = __webpack_require__(330);

var _ganqing_img_home6 = _interopRequireDefault(_ganqing_img_home5);

var _ganqing_img_home7 = __webpack_require__(331);

var _ganqing_img_home8 = _interopRequireDefault(_ganqing_img_home7);

var _ganqing_img_home9 = __webpack_require__(332);

var _ganqing_img_home10 = _interopRequireDefault(_ganqing_img_home9);

var _ganqing_img_home1_fanti = __webpack_require__(333);

var _ganqing_img_home1_fanti2 = _interopRequireDefault(_ganqing_img_home1_fanti);

var _ganqing_img_home2_fanti = __webpack_require__(334);

var _ganqing_img_home2_fanti2 = _interopRequireDefault(_ganqing_img_home2_fanti);

var _ganqing_img_home3_fanti = __webpack_require__(335);

var _ganqing_img_home3_fanti2 = _interopRequireDefault(_ganqing_img_home3_fanti);

var _ganqing_img_home4_fanti = __webpack_require__(336);

var _ganqing_img_home4_fanti2 = _interopRequireDefault(_ganqing_img_home4_fanti);

var _ganqing_img_home5_fanti = __webpack_require__(337);

var _ganqing_img_home5_fanti2 = _interopRequireDefault(_ganqing_img_home5_fanti);

var _ = __webpack_require__(351);

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(378);

var _4 = _interopRequireDefault(_3);

var _5 = __webpack_require__(352);

var _6 = _interopRequireDefault(_5);

var _7 = __webpack_require__(379);

var _8 = _interopRequireDefault(_7);

var _9 = __webpack_require__(353);

var _10 = _interopRequireDefault(_9);

var _11 = __webpack_require__(380);

var _12 = _interopRequireDefault(_11);

var _13 = __webpack_require__(354);

var _14 = _interopRequireDefault(_13);

var _15 = __webpack_require__(381);

var _16 = _interopRequireDefault(_15);

var _home_img_mokuai = __webpack_require__(346);

var _home_img_mokuai2 = _interopRequireDefault(_home_img_mokuai);

var _home_img_mokuai3 = __webpack_require__(347);

var _home_img_mokuai4 = _interopRequireDefault(_home_img_mokuai3);

var _pignjia = __webpack_require__(348);

var _pignjia2 = _interopRequireDefault(_pignjia);

var _card_ = __webpack_require__(375);

var _card_2 = _interopRequireDefault(_card_);

var _card_3 = __webpack_require__(376);

var _card_4 = _interopRequireDefault(_card_3);

var _card_5 = __webpack_require__(377);

var _card_6 = _interopRequireDefault(_card_5);

var _card = __webpack_require__(341);

var _card2 = _interopRequireDefault(_card);

var _card3 = __webpack_require__(342);

var _card4 = _interopRequireDefault(_card3);

var _card5 = __webpack_require__(343);

var _card6 = _interopRequireDefault(_card5);

var _card7 = __webpack_require__(344);

var _card8 = _interopRequireDefault(_card7);

var _card9 = __webpack_require__(345);

var _card10 = _interopRequireDefault(_card9);

var _card11 = __webpack_require__(370);

var _card12 = _interopRequireDefault(_card11);

var _card13 = __webpack_require__(371);

var _card14 = _interopRequireDefault(_card13);

var _card15 = __webpack_require__(372);

var _card16 = _interopRequireDefault(_card15);

var _card17 = __webpack_require__(373);

var _card18 = _interopRequireDefault(_card17);

var _card19 = __webpack_require__(374);

var _card20 = _interopRequireDefault(_card19);

var _home_img_mokuai5 = __webpack_require__(359);

var _home_img_mokuai6 = _interopRequireDefault(_home_img_mokuai5);

var _home_img_mokuai7 = __webpack_require__(382);

var _home_img_mokuai8 = _interopRequireDefault(_home_img_mokuai7);

var _home_img_mokuai9 = __webpack_require__(360);

var _home_img_mokuai10 = _interopRequireDefault(_home_img_mokuai9);

var _home_img_mokuai11 = __webpack_require__(383);

var _home_img_mokuai12 = _interopRequireDefault(_home_img_mokuai11);

var _card_2_cn = __webpack_require__(355);

var _card_2_cn2 = _interopRequireDefault(_card_2_cn);

var _card_2_tw = __webpack_require__(356);

var _card_2_tw2 = _interopRequireDefault(_card_2_tw);

var _card_4_cn = __webpack_require__(357);

var _card_4_cn2 = _interopRequireDefault(_card_4_cn);

var _card_4_tw = __webpack_require__(358);

var _card_4_tw2 = _interopRequireDefault(_card_4_tw);

var _home_img_mokuai13 = __webpack_require__(361);

var _home_img_mokuai14 = _interopRequireDefault(_home_img_mokuai13);

var _home_img_mokuai15 = __webpack_require__(384);

var _home_img_mokuai16 = _interopRequireDefault(_home_img_mokuai15);

var _yulan_yuantiangang_top_fan = __webpack_require__(1454);

var _yulan_yuantiangang_top_fan2 = _interopRequireDefault(_yulan_yuantiangang_top_fan);

var _yulan_yuantiangang_top_jian = __webpack_require__(1455);

var _yulan_yuantiangang_top_jian2 = _interopRequireDefault(_yulan_yuantiangang_top_jian);

var _home_img_mo22x = __webpack_require__(285);

var _home_img_mo22x2 = _interopRequireDefault(_home_img_mo22x);

var _home_img_mo = __webpack_require__(287);

var _home_img_mo2 = _interopRequireDefault(_home_img_mo);

var _mintUi = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _enum = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'SaleDetailModal',
  data: function data() {
    return {
      reportName: _enum.reportName,
      imgMap: {
        h5_emotion2024: { // 2024年爱情运势
          cn: [_ganqing_img_home2.default, _ganqing_img_home4.default, _ganqing_img_home6.default, _ganqing_img_home8.default, _ganqing_img_home10.default],
          tw: [_ganqing_img_home1_fanti2.default, _ganqing_img_home2_fanti2.default, _ganqing_img_home3_fanti2.default, _ganqing_img_home4_fanti2.default, _ganqing_img_home5_fanti2.default]
        },
        h5_wealth2024: {
          cn: [_2.default, _6.default, _10.default, _14.default],
          tw: [_4.default, _8.default, _12.default, _16.default]
        }, // 2024年财运
        h5_annual2024: {
          cn: [_home_img_mokuai6.default, _home_img_mokuai10.default, _card_2_cn2.default, _card_4_cn2.default, _home_img_mokuai14.default],
          tw: [_home_img_mokuai8.default, _home_img_mokuai12.default, _card_2_tw2.default, _card_4_tw2.default, _home_img_mokuai16.default]
        }, // 2024年年运
        h5_weigh_bone: {
          cn: [_yulan_yuantiangang_top_jian2.default],
          tw: [_yulan_yuantiangang_top_fan2.default]
        }, // 袁天罡秤骨
        h5_bai_gua: {
          cn: [
          // 'https://psychicai-static.psychicai.pro/imgs/24048f0d358d051f4890abe8ad40ec6cbe48.png',
          'https://psychicai-static.psychicai.pro/imgs/24044c3c7ad56f9f4e08a25d585164be739f.png', _home_img_mo22x2.default],
          tw: [
          // 'https://psychicai-static.psychicai.pro/imgs/24048f0d358d051f4890abe8ad40ec6cbe48.png',
          'https://psychicai-static.psychicai.pro/imgs/24045923298c6eff48f1ac256edf9ed6d17d.png', _home_img_mo2.default]

        }, // 鬼谷子
        h5_marriage: {
          cn: [_card2.default, _card4.default, _card6.default, _card8.default, _card10.default],
          tw: [_card12.default, _card14.default, _card16.default, _card18.default, _card20.default]
        },
        h5_career2024: {
          cn: [_home_img_mokuai2.default, _home_img_mokuai4.default, _pignjia2.default],
          tw: [_card_2.default, _card_4.default, _card_6.default]
          // 2024年事业运势
        }
      }
    };
  },

  model: {
    prop: 'show',
    event: 'close'
  },

  props: {
    selected_list: {
      type: Array,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: function _default() {
        console.log('callback');
      }
    },
    product_key: {
      type: String,
      default: 'h5_emotion2024'
    },
    size: {
      type: Number,
      default: 3
    }
  },
  mounted: function mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    close: function close() {
      this.$emit('close', false);
    },
    selectReport: function selectReport() {
      var _this = this;

      console.log('选择报告', this.size, this.product_key);
      if (this.size === 2) {
        switch (this.product_key) {
          case 'h5_marriage':
            _utils2.default.firebaseLogEvent('10001', '-10057', 'click_detail_marriage2', 'click', {
              args_name: 'click_detail_marriage2',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_emotion2024':
            _utils2.default.firebaseLogEvent('10001', '-10054', 'click_detail_2024lovely2', 'click', {
              args_name: 'click_detail_2024lovely2',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_annual2024':
            _utils2.default.firebaseLogEvent('10001', '-10053', 'click_detail_2024report2', 'click', {
              args_name: 'click_detail_2024report2',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_wealth2024':
            _utils2.default.firebaseLogEvent('10001', '-10056', 'click_detail_2024wealty2', 'click', {
              args_name: 'click_detail_2024wealty2',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_career2024':
            _utils2.default.firebaseLogEvent('10001', '-10055', 'click_detail_2024career2', 'click', {
              args_name: 'click_detail_2024career2',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_bai_gua':
            _utils2.default.firebaseLogEvent('10001', '-10059', 'click_detail_64gua2', 'click', {
              args_name: 'click_detail_64gua2',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_weigh_bone':
            _utils2.default.firebaseLogEvent('10001', '-10058', 'click_detail_chenggu2', 'click', {
              args_name: 'click_detail_chenggu2',
              channel: _utils2.default.getFBChannel()
            });
            break;

        }
      } else {
        switch (this.product_key) {
          case 'h5_marriage':
            _utils2.default.firebaseLogEvent('10001', '-10050', 'click_detail_marriage3', 'click', {
              args_name: 'click_detail_marriage3',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_emotion2024':
            _utils2.default.firebaseLogEvent('10001', '-10047', 'click_detail_2024lovely3', 'click', {
              args_name: 'click_detail_2024lovely3',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_annual2024':
            _utils2.default.firebaseLogEvent('10001', '-10046', 'click_detail_2024report3', 'click', {
              args_name: 'click_detail_2024report3',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_wealth2024':
            _utils2.default.firebaseLogEvent('10001', '-10049', 'click_detail_2024wealty3', 'click', {
              args_name: 'click_detail_2024wealty3',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_career2024':
            _utils2.default.firebaseLogEvent('10001', '-10048', 'click_detail_2024career3', 'click', {
              args_name: 'click_detail_2024career3',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_bai_gua':
            _utils2.default.firebaseLogEvent('10001', '-10052', 'click_detail_64gua3', 'click', {
              args_name: 'click_detail_64gua3',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_weigh_bone':
            _utils2.default.firebaseLogEvent('10001', '-10051', 'click_detail_chenggu3', 'click', {
              args_name: 'click_detail_chenggu3',
              channel: _utils2.default.getFBChannel()
            });

            break;
        }
      }
      var obj = this.selected_list.find(function (item) {
        return item.product_key === _this.product_key;
      });
      var length = this.selected_list.length;
      if (this.size === length) {
        !obj && (0, _mintUi.Toast)('\u6700\u591A\u9009\u62E9' + (this.size === 2 ? '两' : '三') + '\u9879\u62A5\u544A');
      } else {
        if (!obj) {
          this.callback();
        }
      }
      this.close();
    }
  },
  computed: {
    is_cn: function is_cn() {
      console.log('xxx', this.selected_list);
      return _utils2.default.getLanguage() === 'zh-CN';
    }
  }
};

//鬼谷子

//袁天罡秤骨

// 2024年年运

//八字合婚

// 2024年事业运势


// 2024年财运
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//  2024年爱情运势

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(6);

var _img_choose = __webpack_require__(1326);

var _img_choose2 = _interopRequireDefault(_img_choose);

var _img_choose3 = __webpack_require__(1325);

var _img_choose4 = _interopRequireDefault(_img_choose3);

var _mintUi = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'PayModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },

    combine_info: {
      type: Object,
      default: function _default() {
        return {
          price: 0,
          unit: 'RM'
        };
      }
    },
    key_store: {
      type: String,
      default: ''
    },
    logEvent: {
      type: Function,
      default: function _default() {}
    },
    pay_index: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      pop_modal: false,
      pay_methods: [],
      loading: false,
      check_index: 0,
      checked: _img_choose2.default,
      noChecked: _img_choose4.default
    };
  },

  watch: {
    visible: function visible(val) {
      this.pop_modal = val;
    },
    pop_modal: function pop_modal(val) {
      if (!val) {
        this.$emit('close', false);
      } else {
        this.getPayMethod();
      }
    }
  },
  computed: {
    channel03: function channel03() {
      return _utils2.default.getFBChannel().indexOf('03') > -1;
    }
  },
  created: function created() {},

  methods: {
    getPayMethod: async function getPayMethod() {
      this.loading = true;
      try {
        var res = await (0, _api.getPayMethodsAPI)();
        this.loading = false;
        if (res.status === 1000) {
          this.pay_methods = res.data;
          // this.pay_methods = [...res.data,...res.data,...res.data];
        }
      } catch (e) {
        this.loading = false;
      }
    },
    eventSend: function eventSend(index, title) {
      if (!index) return;
      try {
        fbq('track', 'AddToCart');
      } catch (err) {
        console.error('error message:', err);
      }
      if (index === 2) {
        _utils2.default.firebaseLogEvent('10001', '-10022', 'click_choise2_pay', 'click', {
          args_name: 'click_choise2_pay',
          channel: _utils2.default.getFBChannel(),
          pay_type: title
        });
      } else {
        _utils2.default.firebaseLogEvent('10001', '-10021', 'click_choise3_pay', 'click', {
          args_name: 'click_choise3_pay',
          channel: _utils2.default.getFBChannel(),
          pay_type: title
        });
      }
    },
    payMoney: async function payMoney() {
      _mintUi.Indicator.open('支付中...');

      var _pay_methods$check_in = this.pay_methods[this.check_index],
          pay_method = _pay_methods$check_in.pay_method,
          trade_pay_type = _pay_methods$check_in.trade_pay_type,
          trade_target_org = _pay_methods$check_in.trade_target_org,
          title = _pay_methods$check_in.title,
          fake = _pay_methods$check_in.fake;
      var _combine_info = this.combine_info,
          price = _combine_info.price,
          unit = _combine_info.unit,
          product_key = _combine_info.product_key,
          product_id = _combine_info.product_id,
          combine_product_ids = _combine_info.combine_product_ids;


      this.eventSend(combine_product_ids.length, title);
      var item_ = {
        e_name: 'pay_click',
        product_id: product_id
      };
      this.$emit('logEvent', item_);
      //假支付
      if (fake) {
        Toast(this.is_cn ? '请选择其他支付方式' : '請選擇其他支付方式');
        return;
      }

      var params = {
        pay_method: pay_method,
        product_key: product_key,
        product_id: product_id,
        platform: 'WEB',
        extra_ce_suan: {},
        trade_pay_type: trade_pay_type,
        trade_target_org: trade_target_org,
        combine_product_ids: combine_product_ids,
        callback_url: location.origin + location.pathname + '?pay_index=' + this.pay_index + '&report_price=' + price,
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        }
      };
      var res = await (0, _api.payOrderAPI)(params);

      localStorage.setItem('mlxz_remove_flag', 2);
      _mintUi.Indicator.close();
      if (res.status !== 1000) return;
      await _utils2.default.asleep(1000);
      this.pop_modal = false;
      if (this.channel03) {
        localStorage.removeItem(combine_product_ids.length === 3 ? 'mlxz_combine_3' : 'mlxz_combine_2');
      }

      location.href = res.data.pay_url;
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

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _vant = __webpack_require__(65);

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

var tipsArr1 = {
  'zh-CN': '优惠倒计时',
  'zh-TW': '優惠倒計時'
};
exports.default = {
  name: 'TimeDown',
  props: {
    is_show: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    time_key: {
      type: Number,
      default: 3
    },
    count_time: {
      type: Number,
      default: 15 * 60 * 1000
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
      tips1: tipsArr1[_utils2.default.getLanguage()],
      time_: this.count_time,
      is_show_shandong: false
    };
  },

  computed: {
    is_show_time: function is_show_time() {
      return this.list.every(function (item) {
        return item.product_key;
      });
    }
  },
  watch: {},
  mounted: function mounted() {},

  methods: {
    getTime: function getTime(val) {
      var minutes = val.minutes,
          seconds = val.seconds,
          milliseconds = val.milliseconds;

      var time_ = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      if (seconds !== this.second_) {
        if (this.time_key === 3) {
          localStorage.setItem('mlxz_combine_3', time_);
        } else {
          localStorage.setItem('mlxz_combine_2', time_);
        }
      }
      this.second_ = seconds;

      this.is_show_shandong = time_ < 60 * 1000;
      if (!minutes && !seconds && milliseconds < 10) {
        this.time_ = 0;
        if (this.$refs.countDown) {
          this.$refs.countDown.pause();
          this.$refs.countDown.reset();
        }
      }
    },
    restartTime: function restartTime(val) {
      this.time_ = val;
      if (this.$refs.countDown) {
        console.log(this.$refs.countDown);
        this.$refs.countDown.reset();
        this.$refs.countDown.start();
      }
    }
  }
};

/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FixedOrder = __webpack_require__(123);

var _FixedOrder2 = _interopRequireDefault(_FixedOrder);

var _recommend = __webpack_require__(1575);

var _recommend2 = _interopRequireDefault(_recommend);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _PayPopup = __webpack_require__(185);

var _PayPopup2 = _interopRequireDefault(_PayPopup);

var _enum = __webpack_require__(2);

var _mintUi = __webpack_require__(4);

var _pay_result = __webpack_require__(1574);

var _pay_result2 = _interopRequireDefault(_pay_result);

var _common_api = __webpack_require__(117);

var _api = __webpack_require__(6);

var _banner2024caiyun3x = __webpack_require__(1172);

var _banner2024caiyun3x2 = _interopRequireDefault(_banner2024caiyun3x);

var _banner_shiyeyunshi = __webpack_require__(1207);

var _banner_shiyeyunshi2 = _interopRequireDefault(_banner_shiyeyunshi);

var _bahh = __webpack_require__(1204);

var _bahh2 = _interopRequireDefault(_bahh);

var _nianyun = __webpack_require__(1201);

var _nianyun2 = _interopRequireDefault(_nianyun);

var _ganqqingyun = __webpack_require__(1202);

var _ganqqingyun2 = _interopRequireDefault(_ganqqingyun);

var _caiyun = __webpack_require__(1200);

var _caiyun2 = _interopRequireDefault(_caiyun);

var _zongheyunshi = __webpack_require__(1203);

var _zongheyunshi2 = _interopRequireDefault(_zongheyunshi);

var _banner_ganqing = __webpack_require__(1206);

var _banner_ganqing2 = _interopRequireDefault(_banner_ganqing);

var _topCaiyun = __webpack_require__(1214);

var _topCaiyun2 = _interopRequireDefault(_topCaiyun);

var _topShiye = __webpack_require__(1215);

var _topShiye2 = _interopRequireDefault(_topShiye);

var _xiabanner_bazi_jianti = __webpack_require__(1229);

var _xiabanner_bazi_jianti2 = _interopRequireDefault(_xiabanner_bazi_jianti);

var _bannerYuantiangang = __webpack_require__(1205);

var _bannerYuantiangang2 = _interopRequireDefault(_bannerYuantiangang);

var _ = __webpack_require__(349);

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(350);

var _4 = _interopRequireDefault(_3);

var _5 = __webpack_require__(1212);

var _6 = _interopRequireDefault(_5);

var _7 = __webpack_require__(1211);

var _8 = _interopRequireDefault(_7);

var _bzhh = __webpack_require__(1216);

var _bzhh2 = _interopRequireDefault(_bzhh);

var _wealth = __webpack_require__(1223);

var _wealth2 = _interopRequireDefault(_wealth);

var _year = __webpack_require__(1227);

var _year2 = _interopRequireDefault(_year);

var _web = __webpack_require__(1225);

var _web2 = _interopRequireDefault(_web);

var _wealth24_banner = __webpack_require__(1224);

var _wealth24_banner2 = _interopRequireDefault(_wealth24_banner);

var _year24_banner = __webpack_require__(1228);

var _year24_banner2 = _interopRequireDefault(_year24_banner);

var _bzhh_banner = __webpack_require__(1217);

var _bzhh_banner2 = _interopRequireDefault(_bzhh_banner);

var _emotion24_banner = __webpack_require__(1219);

var _emotion24_banner2 = _interopRequireDefault(_emotion24_banner);

var _career24_banner = __webpack_require__(1218);

var _career24_banner2 = _interopRequireDefault(_career24_banner);

var _ggz_banner = __webpack_require__(1220);

var _ggz_banner2 = _interopRequireDefault(_ggz_banner);

var _weigh_banner = __webpack_require__(1226);

var _weigh_banner2 = _interopRequireDefault(_weigh_banner);

var _history_order = __webpack_require__(1221);

var _history_order2 = _interopRequireDefault(_history_order);

var _right_pay = __webpack_require__(1222);

var _right_pay2 = _interopRequireDefault(_right_pay);

var _h5_img_topbanner_ganqing_jian = __webpack_require__(1264);

var _h5_img_topbanner_ganqing_jian2 = _interopRequireDefault(_h5_img_topbanner_ganqing_jian);

var _h5_img_topbanner_ganqing_fan = __webpack_require__(1263);

var _h5_img_topbanner_ganqing_fan2 = _interopRequireDefault(_h5_img_topbanner_ganqing_fan);

var _h5_zuhe_big_jian_bazihehun = __webpack_require__(1334);

var _h5_zuhe_big_jian_bazihehun2 = _interopRequireDefault(_h5_zuhe_big_jian_bazihehun);

var _h5_zuhe_big_jian_guiguzi = __webpack_require__(1337);

var _h5_zuhe_big_jian_guiguzi2 = _interopRequireDefault(_h5_zuhe_big_jian_guiguzi);

var _h5_zuhe_big_jian_yuantiangang = __webpack_require__(1340);

var _h5_zuhe_big_jian_yuantiangang2 = _interopRequireDefault(_h5_zuhe_big_jian_yuantiangang);

var _h5_zuhe_big_jian_ganqing = __webpack_require__(1336);

var _h5_zuhe_big_jian_ganqing2 = _interopRequireDefault(_h5_zuhe_big_jian_ganqing);

var _h5_zuhe_big_jian_shiye = __webpack_require__(1339);

var _h5_zuhe_big_jian_shiye2 = _interopRequireDefault(_h5_zuhe_big_jian_shiye);

var _h5_zuhe_big_jian_caiyun = __webpack_require__(1335);

var _h5_zuhe_big_jian_caiyun2 = _interopRequireDefault(_h5_zuhe_big_jian_caiyun);

var _h5_zuhe_big_jian_nianyun = __webpack_require__(1338);

var _h5_zuhe_big_jian_nianyun2 = _interopRequireDefault(_h5_zuhe_big_jian_nianyun);

var _h5_zuhe_big_fan_bazihehun = __webpack_require__(1327);

var _h5_zuhe_big_fan_bazihehun2 = _interopRequireDefault(_h5_zuhe_big_fan_bazihehun);

var _h5_zuhe_big_fan_guiguzi = __webpack_require__(1330);

var _h5_zuhe_big_fan_guiguzi2 = _interopRequireDefault(_h5_zuhe_big_fan_guiguzi);

var _h5_zuhe_big_fan_yuantiangang = __webpack_require__(1333);

var _h5_zuhe_big_fan_yuantiangang2 = _interopRequireDefault(_h5_zuhe_big_fan_yuantiangang);

var _h5_zuhe_big_fan_ganqing = __webpack_require__(1329);

var _h5_zuhe_big_fan_ganqing2 = _interopRequireDefault(_h5_zuhe_big_fan_ganqing);

var _h5_zuhe_big_fan_shiye = __webpack_require__(1332);

var _h5_zuhe_big_fan_shiye2 = _interopRequireDefault(_h5_zuhe_big_fan_shiye);

var _h5_zuhe_big_fan_caiyun = __webpack_require__(1328);

var _h5_zuhe_big_fan_caiyun2 = _interopRequireDefault(_h5_zuhe_big_fan_caiyun);

var _h5_zuhe_big_fan_nianyun = __webpack_require__(1331);

var _h5_zuhe_big_fan_nianyun2 = _interopRequireDefault(_h5_zuhe_big_fan_nianyun);

var _zuhe_btn_choose_selected = __webpack_require__(1356);

var _zuhe_btn_choose_selected2 = _interopRequireDefault(_zuhe_btn_choose_selected);

var _zuhe_btn_choose_normal = __webpack_require__(1355);

var _zuhe_btn_choose_normal2 = _interopRequireDefault(_zuhe_btn_choose_normal);

var _h5_zuhe_small_fan_bazihehun = __webpack_require__(1341);

var _h5_zuhe_small_fan_bazihehun2 = _interopRequireDefault(_h5_zuhe_small_fan_bazihehun);

var _h5_zuhe_small_fan_guiguzi = __webpack_require__(1344);

var _h5_zuhe_small_fan_guiguzi2 = _interopRequireDefault(_h5_zuhe_small_fan_guiguzi);

var _h5_zuhe_small_fan_yuantiangang = __webpack_require__(1347);

var _h5_zuhe_small_fan_yuantiangang2 = _interopRequireDefault(_h5_zuhe_small_fan_yuantiangang);

var _h5_zuhe_small_fan_ganqing = __webpack_require__(1343);

var _h5_zuhe_small_fan_ganqing2 = _interopRequireDefault(_h5_zuhe_small_fan_ganqing);

var _h5_zuhe_small_fan_shiye = __webpack_require__(1346);

var _h5_zuhe_small_fan_shiye2 = _interopRequireDefault(_h5_zuhe_small_fan_shiye);

var _h5_zuhe_small_fan_caiyun = __webpack_require__(1342);

var _h5_zuhe_small_fan_caiyun2 = _interopRequireDefault(_h5_zuhe_small_fan_caiyun);

var _h5_zuhe_small_fan_nianyun = __webpack_require__(1345);

var _h5_zuhe_small_fan_nianyun2 = _interopRequireDefault(_h5_zuhe_small_fan_nianyun);

var _h5_zuhe_small_jian_bazihehun = __webpack_require__(1348);

var _h5_zuhe_small_jian_bazihehun2 = _interopRequireDefault(_h5_zuhe_small_jian_bazihehun);

var _h5_zuhe_small_jian_guiguzi = __webpack_require__(1351);

var _h5_zuhe_small_jian_guiguzi2 = _interopRequireDefault(_h5_zuhe_small_jian_guiguzi);

var _h5_zuhe_small_jian_yuantiangang = __webpack_require__(1354);

var _h5_zuhe_small_jian_yuantiangang2 = _interopRequireDefault(_h5_zuhe_small_jian_yuantiangang);

var _h5_zuhe_small_jian_ganqing = __webpack_require__(1350);

var _h5_zuhe_small_jian_ganqing2 = _interopRequireDefault(_h5_zuhe_small_jian_ganqing);

var _h5_zuhe_small_jian_shiye = __webpack_require__(1353);

var _h5_zuhe_small_jian_shiye2 = _interopRequireDefault(_h5_zuhe_small_jian_shiye);

var _h5_zuhe_small_jian_caiyun = __webpack_require__(1349);

var _h5_zuhe_small_jian_caiyun2 = _interopRequireDefault(_h5_zuhe_small_jian_caiyun);

var _h5_zuhe_small_jian_nianyun = __webpack_require__(1352);

var _h5_zuhe_small_jian_nianyun2 = _interopRequireDefault(_h5_zuhe_small_jian_nianyun);

var _payModal = __webpack_require__(1572);

var _payModal2 = _interopRequireDefault(_payModal);

var _SaleDetailModal = __webpack_require__(1571);

var _SaleDetailModal2 = _interopRequireDefault(_SaleDetailModal);

var _ResultPop = __webpack_require__(1551);

var _ResultPop2 = _interopRequireDefault(_ResultPop);

var _CalculateBar = __webpack_require__(270);

var _CalculateBar2 = _interopRequireDefault(_CalculateBar);

var _timeDown = __webpack_require__(1573);

var _timeDown2 = _interopRequireDefault(_timeDown);

var _tstatistic = __webpack_require__(326);

var _tstatistic2 = _interopRequireDefault(_tstatistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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


_tstatistic2.default.init({
  app_key: 20002003,
  channel: _utils2.default.getFBChannel()
});

var tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...'
};
var hotRecommendProduction = [
//  {
//   name:'良缘合婚',
// content:'',
//   url:'',
//  },
//  {
//   name:'姓名风水',
// content:'',
//   url:'',
//  },
{
  id: 1,
  name: '瞬时卦',
  url: 'mlxz://time/calculate',
  content: '这是瞬时卦'
}, {
  id: 2,
  name: '号码测测运',
  url: 'mlxz://numbermoney/calculate',
  content: '这是号码测测运'
}, {
  id: 3,
  name: '数字风水',
  url: 'mlxz://phonenumber/calculate',
  content: '这是数字风水'
}];

var index = _utils2.default.getQueryString('index') || 0;
var channel = _utils2.default.getQueryString('channel');

localStorage.setItem('suishen_overseas_channel', channel || '');

var initCheck = [{ value: '' }, { value: '' }, { value: '' }];

var eventProductKey = {
  h5_wealth2024: '2024_wealty_report',
  h5_career: 'profession_bazi_report',
  h5_marriage: 'marriage_contract_report',
  h5_love: 'emotion_report',
  h5_fortune2023: '2023_report',
  h5_wealth2023: '2023_wealty_report'
};

var eventProductValue = {
  '2024_wealty_report': '80001',
  profession_bazi_report: '80004',
  marriage_contract_report: '80005',
  emotion_report: '80006',
  '2023_report': '80007',
  '2023_wealty_report': '80008'
};

var user_name_arr = ['林**', '王*', '朱*', '刘**', '刘*', '张**', '韩*', '陈**', '孙*', '乔**', '陈*', '祝**'];

var time_arr = ['1', '2', '3'];

var report_arr = [{
  'zh-CN': '2024年流年运势',
  'zh-TW': '2024年流年運勢'
}, {
  'zh-CN': '2024年财运',
  'zh-TW': '2024年財運'
}, {
  'zh-CN': '2024年感情运势',
  'zh-TW': '2024年感情運勢'
}, {
  'zh-CN': '2024年事业运势',
  'zh-TW': '2024年事業運勢'
}, {
  'zh-CN': '八字合婚',
  'zh-TW': '八字合婚'
}, {
  'zh-CN': '袁天罡推背称骨',
  'zh-TW': '袁天罡推背稱骨'
}, {
  'zh-CN': '鬼谷子百卦论命',
  'zh-TW': '鬼谷子百卦論命'
}, {
  'zh-CN': '六爻财运神卦',
  'zh-TW': '六爻財運神卦'
}, {
  'zh-CN': '八字流年',
  'zh-TW': '八字流年'
}, {
  'zh-CN': '今生缘分揭秘',
  'zh-TW': '今生緣分揭秘'
}];

var e_id_arr = ['60009', '60001', '60010', '60011', '60005', '60002', '60003', '60001', '60009', '60005'];

var product_key_arr = ['h5_annual2024', 'h5_wealth2024', 'h5_emotion2024', 'h5_career2024', 'h5_marriage', 'h5_weigh_bone', 'h5_bai_gua', 'h5_wealth2024', 'h5_annual2024', 'h5_marriage'];

var report_url = ['year_of_lucky_2024', 'lucky_year_report', 'emotion_fortune', 'career_fortune_2024', 'marriage_measure_overseas', 'weigh_bone', 'guiguzi_fortune', 'lucky_year_report', 'year_of_lucky_2024', 'marriage_measure_overseas'];

var score_arr = ['96', '97', '98', '99', '100'];

var new_pop_list = [{
  id: 1,
  name: '鬼谷子',
  url: 'guiguzi_fortune',
  product_key: 'h5_bai_gua',
  cn_desc: '64卦预见人生，审慎应对风波，谨防危机潜伏',
  tw_desc: '64卦預見人生，審慎應對風波，謹防危機潛伏',
  cn_pop_icon: _h5_zuhe_big_jian_guiguzi2.default,
  tw_pop_icon: _h5_zuhe_big_fan_guiguzi2.default,
  cn_check_icon: _h5_zuhe_small_fan_guiguzi2.default,
  tw_check_icon: _h5_zuhe_small_jian_guiguzi2.default,
  checked: false
}, {
  id: 2,
  name: '袁天罡',
  url: 'weigh_bone',
  product_key: 'h5_weigh_bone',
  cn_desc: '称骨论命，揭露宿命重负，应对多舛命途',
  tw_desc: '稱骨論命，揭露宿命重負，應對多舛命途',
  cn_pop_icon: _h5_zuhe_big_jian_yuantiangang2.default,
  tw_pop_icon: _h5_zuhe_big_fan_yuantiangang2.default,
  cn_check_icon: _h5_zuhe_small_fan_yuantiangang2.default,
  tw_check_icon: _h5_zuhe_small_jian_yuantiangang2.default,
  checked: false
}, {
  id: 3,
  name: '八字合婚',
  url: 'marriage_measure_overseas',
  product_key: 'h5_marriage',
  cn_desc: '揭示姻缘宿命，戒备潜藏危机，慎选伴侣之道',
  tw_desc: '揭示姻緣宿命，戒備潛藏危機，慎選伴侶之道',
  cn_pop_icon: _h5_zuhe_big_jian_bazihehun2.default,
  tw_pop_icon: _h5_zuhe_big_fan_bazihehun2.default,
  cn_check_icon: _h5_zuhe_small_fan_bazihehun2.default,
  tw_check_icon: _h5_zuhe_small_jian_bazihehun2.default,
  checked: false
}, {
  id: 4,
  name: '感情运',
  url: 'emotion_fortune',
  product_key: 'h5_emotion2024',
  cn_desc: '感情运势早知道，和合美满还是遗憾分手',
  tw_desc: '感情運勢早知道，和合美滿還是遺憾分手',
  cn_pop_icon: _h5_zuhe_big_jian_ganqing2.default,
  tw_pop_icon: _h5_zuhe_big_fan_ganqing2.default,
  cn_check_icon: _h5_zuhe_small_fan_ganqing2.default,
  tw_check_icon: _h5_zuhe_small_jian_ganqing2.default,
  checked: false
}, {
  id: 5,
  name: '2024年运',
  url: 'year_of_lucky_2024',
  product_key: 'h5_annual2024',
  cn_desc: '你的2024年如何度过？大师为你解读年度运势',
  tw_desc: '你的2024年如何度過？大師為你解讀年度運勢',
  cn_pop_icon: _h5_zuhe_big_jian_nianyun2.default,
  tw_pop_icon: _h5_zuhe_big_fan_nianyun2.default,
  cn_check_icon: _h5_zuhe_small_fan_nianyun2.default,
  tw_check_icon: _h5_zuhe_small_jian_nianyun2.default,
  checked: false
}, {
  id: 6,
  name: '2024财运',
  url: 'lucky_year_report',
  product_key: 'h5_wealth2024',
  cn_desc: '预警财务危机，洞悉关键时刻，避免潜在财富风险。',
  tw_desc: '預警財務危機，洞悉關鍵時刻，避免潛在財富風險。',
  cn_pop_icon: _h5_zuhe_big_jian_caiyun2.default,
  tw_pop_icon: _h5_zuhe_big_fan_caiyun2.default,
  cn_check_icon: _h5_zuhe_small_fan_caiyun2.default,
  tw_check_icon: _h5_zuhe_small_jian_caiyun2.default,
  checked: false
}, {
  id: 7,
  name: '事业运势',
  url: 'career_fortune_2024',
  product_key: 'h5_career2024',
  cn_desc: '前途迷雾重重，挑战接踵而至，开创事业新章',
  tw_desc: '前途迷霧重重，挑戰接踵而至，開創事業新章',
  cn_pop_icon: _h5_zuhe_big_jian_shiye2.default,
  tw_pop_icon: _h5_zuhe_big_fan_shiye2.default,
  cn_check_icon: _h5_zuhe_small_fan_shiye2.default,
  tw_check_icon: _h5_zuhe_small_jian_shiye2.default,
  checked: false
}];
exports.default = {
  components: {
    ResultPop: _ResultPop2.default,
    Recommend: _recommend2.default,
    PayPopup: _PayPopup2.default,
    PopResult: _pay_result2.default,
    PayModal: _payModal2.default,
    FixedOrder: _FixedOrder2.default,
    CalculateBar: _CalculateBar2.default,
    TimeDown: _timeDown2.default,
    SaleDetailModal: _SaleDetailModal2.default
  },
  data: function data() {
    var _ref;

    return _ref = {
      cn_order_btn: 'https://psychicai-static.psychicai.pro/imgs/2404db41abf620c84fbba27927577655e386.png',
      cn_right_pay: 'https://psychicai-static.psychicai.pro/imgs/24042d415768c8314aad99eb44ebcaeda4d6.png',
      tw_order_btn: _history_order2.default,
      tw_right_pay: _right_pay2.default,
      index: index,
      emotion_report: '80001',
      w: 750,
      visible: false,
      //
      zhekou: 2,
      checked_list: initCheck, //已选择的产品
      mySwiper: null,
      sale_visible: false,
      can_choose: true, // 选择商品
      pop_list: [],
      pay_visible: false,
      product_id: 0,
      combine_ids: '',
      pay_result_visible: false, //支付结果弹窗页
      can_submit: true, // 是否可以提交
      hot_product_list: hotRecommendProduction, // 爆款推荐
      all_list: [],
      result_list: [],
      order_id: _utils2.default.getQueryString('order_id') || '',
      continue: true,
      sub_orders: [],
      fix_pop: false,
      bzhh: _bahh2.default,
      nianyun_24: _nianyun2.default,
      ganqqingyun_24: _ganqqingyun2.default,
      caiyun_24: _caiyun2.default,
      zongheyunshi: _zongheyunshi2.default,
      banner_ganqing: _banner_ganqing2.default
    }, _defineProperty(_ref, 'banner_ganqing', _banner_ganqing2.default), _defineProperty(_ref, 'xiabanner_bazi', _xiabanner_bazi_jianti2.default), _defineProperty(_ref, 'top_caiyun', _topCaiyun2.default), _defineProperty(_ref, 'top_shiye', _topShiye2.default), _defineProperty(_ref, 'banner_yuantiangang', _bannerYuantiangang2.default), _defineProperty(_ref, 'buy_list', []), _defineProperty(_ref, 'mock_report_list', []), _defineProperty(_ref, 'score_list', []), _defineProperty(_ref, 'cur_index', 0), _defineProperty(_ref, 'combine_index', 0), _defineProperty(_ref, 'three_list', []), _defineProperty(_ref, 'new_sale_modal', false), _defineProperty(_ref, 'sale_detail_modal', false), _defineProperty(_ref, 'sale_detail_callback', function sale_detail_callback() {}), _defineProperty(_ref, 'sale_detail_product_key', ''), _defineProperty(_ref, 'saleDetailSize', 3), _defineProperty(_ref, 'new_pop_list', new_pop_list), _defineProperty(_ref, 'checkIcon', _zuhe_btn_choose_selected2.default), _defineProperty(_ref, 'noCheckIcon', _zuhe_btn_choose_normal2.default), _defineProperty(_ref, 'pay_modal', false), _defineProperty(_ref, 'combine_info', {}), _defineProperty(_ref, 'payed_order_three_list', []), _defineProperty(_ref, 'pick_list', []), _defineProperty(_ref, 'combine_info2', {}), _defineProperty(_ref, 'two_list', []), _defineProperty(_ref, 'pick_list2', []), _defineProperty(_ref, 'item_index', 0), _defineProperty(_ref, 'new_sale_modal2', false), _defineProperty(_ref, 'pay_modal2', false), _defineProperty(_ref, 'width_dom', 0), _defineProperty(_ref, 'show_result', false), _defineProperty(_ref, 'order_id', ''), _defineProperty(_ref, 'is_show_combine', false), _defineProperty(_ref, 'today_sort_list', []), _defineProperty(_ref, 'banner_list', []), _defineProperty(_ref, 'payed_combine_price', null), _defineProperty(_ref, 'fix_order_info', null), _defineProperty(_ref, 'new_order_key', ''), _defineProperty(_ref, 'reportName', _enum.reportName), _defineProperty(_ref, 'show_api_order', false), _defineProperty(_ref, 'last_order', null), _defineProperty(_ref, 'api_time', 0), _defineProperty(_ref, 'local_time', 0), _defineProperty(_ref, 'last_title', ''), _defineProperty(_ref, 'timer', null), _defineProperty(_ref, 'comboAttachData', null), _defineProperty(_ref, 'time_start_3', false), _defineProperty(_ref, 'time_start_2', false), _defineProperty(_ref, 'time_3', 0), _defineProperty(_ref, 'time_2', 0), _ref;
  },

  computed: {
    //套餐支付显示逻辑
    is_show_combination: function is_show_combination() {
      return !["enjoy03", "panda03", "enjoy02", "panda02"].includes(_utils2.default.getFBChannel());
    },

    // 顶部广告
    header_list: function header_list() {
      return [
      // {
      //   id: 1,
      //   cn_icon:
      //     'https://psychicai-static.psychicai.pro/imgs/2404b88f1b070d4542f391d749cf8d5d6c48.png',
      //   tw_icon: tw_wealth24,
      //   name: '2024年财运',
      //   url: 'lucky_year_report',
      //   a_id: '60001',
      //   a_name: '2024_wealty_report',
      // },
      // {
      //   id: 2,
      //   cn_icon:
      //     'https://psychicai-static.psychicai.pro/imgs/2404bfd6c3dce6cc479cb50e999f270358ec.png',
      //   tw_icon: tw_year24,
      //   name: '24年年运',
      //   url: 'year_of_lucky_2024',
      //   a_id: '60009',
      //   a_name: '2024_report',
      // },
      {
        id: 3,
        cn_icon: 'https://psychicai-static.psychicai.pro/imgs/2404c53a0f34e86c4bbf90b5537bbd4c8fb0.png',
        tw_icon: _bzhh2.default,
        name: '八字合婚',
        url: 'marriage_measure_overseas',
        a_id: '60005',
        a_name: 'marriage_contract_report',
        product_key: 'h5_marriage'
      }, {
        id: 5,
        cn_icon: _h5_img_topbanner_ganqing_jian2.default,
        tw_icon: _h5_img_topbanner_ganqing_fan2.default,
        name: '2024感情运势',
        url: 'emotion_fortune',
        a_id: '60010',
        a_name: '2024_lovely_report',
        product_key: 'h5_emotion2024'
      }, {
        id: 4,
        cn_icon: 'https://psychicai-static.psychicai.pro/imgs/2404da455076874c45d689335fbb5fd98c5c.png',
        tw_icon: _web2.default,
        name: '命理寻真',
        url: 'https://www.psychicai.pro/',
        a_id: '60099',
        a_name: 'download'
      }];
    },

    // 推荐
    recommend_list: function recommend_list() {
      return [{
        id: 80010,
        icon: _ganqqingyun2.default,
        name: '感情运',
        url: 'emotion_fortune'
      }, {
        id: 80005,
        icon: _bahh2.default,
        name: '八字合婚',
        url: 'marriage_measure_overseas'
      }, {
        id: 80009,
        icon: _nianyun2.default,
        name: '24年年运',
        url: 'year_of_lucky_2024'
      }, {
        id: 80001,
        icon: _caiyun2.default,
        name: '24年财运',
        url: 'lucky_year_report'
      }];
    },

    // 底部广告
    ad_list: function ad_list() {
      return [{
        id: 80009,
        icon: _2.default,
        name: '2024年年运',
        url: 'year_of_lucky_2024'
      }, {
        id: 80010,
        icon: _4.default,
        name: '24年感情运',
        url: 'emotion_fortune'
      }, {
        id: 80002,
        icon: _8.default,
        name: '袁天罡推背称骨',
        url: 'weigh_bone'
      }, {
        id: 80003,
        icon: _6.default,
        name: '鬼谷子',
        url: 'guiguzi_fortune'
      }, {
        id: 80005,
        icon: _xiabanner_bazi_jianti2.default,
        name: '八字合婚',
        url: 'marriage_measure_overseas'
      }];
    },


    // 折扣列表
    zhekouList: function zhekouList() {
      return [{
        id: 1,
        num: 1,
        total: 0,
        percent: 0,
        price: 68
      }, {
        id: 2,
        num: 2,
        total: 138,
        percent: '-37%',
        price: 88
      }, {
        id: 3,
        num: 3,
        total: 204,
        percent: '-47%',
        price: 108
      }];
    },

    // 爆款推荐
    productionList: function productionList() {
      var arr = [];
      for (var i = 1; i < 11; i++) {
        arr.push({
          id: i,
          checked: false,
          name: '2024财运',
          desc: '預知運勢順遂，預測好運危月份，把握流年機遇！預知運勢順遂，預測好運危月份，把握流年機遇！',
          url: 'www.baidu.com',
          icon: 'https://psychic-h5.wezhaxi.com/img/prod-combine_5.759e0d4.png'
        });
      }
      return arr;
    },

    // 测算产品
    measureProduct: function measureProduct() {
      return [{
        id: 21,
        name: '2024年财运',
        banner_id: 80001,
        checked: false,
        icon: 'https://psychicai-static.psychicai.pro/imgs/23115681e58a5c544fee8ac8c2f259080607.png',
        url: 'lucky_year_report',
        product_key: 'h5_wealth2024',
        tips: '2024全景扫描，预知财运高低浮沉，提前为你揭示财富脉络，帮助你致富之道，拥有财富满盈的2024年！',
        check_icon: 'https://psychicai-static.psychicai.pro/imgs/2311c537595a580c452fb90354ab4244bd78.png'
      }, {
        id: 22,
        name: '八字事业详批',
        banner_id: 80004,
        checked: false,
        icon: 'https://psychicai-static.psychicai.pro/imgs/2311f9a18eab2fba41eb87c6b74a69c112f2.png',
        url: 'career_divination_overseas',
        product_key: 'h5_career',
        tips: '预知事业低谷，成功时机，把握你的先天优势，让你的事业一帆风顺！',
        check_icon: 'https://psychicai-static.psychicai.pro/imgs/2311ff0388985646470a8302f1547167ba46.png'
      }, {
        id: 23,
        name: '八字合婚',
        banner_id: 80005,
        checked: false,
        icon: 'https://psychicai-static.psychicai.pro/imgs/2311b43a350070e54399beb014774e98dccd.png',
        url: 'marriage_measure_overseas',
        product_key: 'h5_marriage',
        tips: '合八字测试姻缘，专业分析婚配指数，拥有更加幸福美满的婚姻！',
        check_icon: 'https://psychicai-static.psychicai.pro/imgs/2311012132873f174e7ebcd518f2253c909a.png'
      }, {
        id: 24,
        name: '姻缘分析',
        banner_id: 80006,
        checked: false,
        icon: 'https://psychicai-static.psychicai.pro/imgs/231106e4f92e19ab4095b50fcaa5075ad621.png',
        url: 'marriage_divination_overseas',
        product_key: 'h5_love',
        tips: '姻缘分析，知己知彼，为你扫除情感障碍，帮你打造天赐良缘！',
        check_icon: 'https://psychicai-static.psychicai.pro/imgs/231184d2494396114e79bdd2f5cdf7ab4f81.png'
      }, {
        id: 25,
        name: '2023年兔年运程详批',
        banner_id: 80007,
        checked: false,
        icon: 'https://psychicai-static.psychicai.pro/imgs/23111d65fa2098a5428fb4cdb8e793a1d3de.png',
        url: 'new_year_luck_overseas',
        product_key: 'h5_fortune2023',
        tips: '预知运势顺利，预测好运、危机出现月份，助你把握流年机遇！ ',
        check_icon: 'https://psychicai-static.psychicai.pro/imgs/2311e8b5bdf1352f40ed80ec4239f8246eef.png'
      }, {
        id: 26,
        name: '2023兔年一生财运',
        banner_id: 80008,
        checked: false,
        icon: 'https://psychicai-static.psychicai.pro/imgs/2311dab2e4808856460198f9fb5d00335a02.png',
        url: 'wealth_boutique_overseas',
        product_key: 'h5_wealth2023',
        tips: '把握财运先机，揭晓财富运程，助你财运亨通，财源滚滚！',
        check_icon: 'https://psychicai-static.psychicai.pro/imgs/2311451b81975b92422dba50e3ecb43a6c71.png'
      }, {
        id: 27,
        name: '袁天罡推背称骨',
        banner_id: 80002,
        checked: false,
        icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png',
        url: 'weigh_bone',
        product_key: 'h5_weigh_bone',
        tips: '通过袁天罡古老占算法，探究身体骨骼，揭示生命密码，为你清晰了解生涯命运走向，让你事业、爱情、健康三线并进，并在生活中找到最佳平衡！',
        check_icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/af8b0b8a9c3484c4f4a5428e984c5e8c.png'
      }, {
        id: 28,
        name: '鬼谷子百卦论命',
        banner_id: 80003,
        checked: false,
        icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png',
        url: 'guiguzi_fortune',
        product_key: 'h5_bai_gua',
        tips: '关乎命运的百卦，把握生活中的转机与挑战。通过古老的易经知识演绎生活，精准预判运势，解析个性、爱情、职业、健康等生活重要环节，让你能够明察秋毫，走好人生每一步！',
        check_icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/630c7179844d4b3b20f5cf3ff46ff4b6.png'
      }, {
        id: 29,
        name: '2024年年运',
        banner_id: 80009,
        checked: false,
        icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/21fdbe04b4913ca464cc71222552327d.png',
        url: 'year_of_lucky_2024',
        product_key: 'h5_annual2024',
        tips: '预知全年吉凶，揭示人生起伏，明晰先机，决策无忧，助力你掌握全年运势，开启更好的2024年！',
        check_icon: 'http://img1000.static.suishenyun.net/2e52e1dc5ac9d868e9983bd3fd8ced1c/21fdbe04b4913ca464cc71222552327d.png'
      }, {
        id: 30,
        name: '2024感情运势',
        banner_id: 12345,
        checked: false,
        icon: 'http://imgcom.static.suishenyun.net/img_head-5e6238.png',
        url: 'emotion_fortune',
        product_key: 'h5_emotion2024',
        tips: '2024感情运势，暂无简介',
        check_icon: 'http://imgcom.static.suishenyun.net/img_head-5e6238.png'
      }, {
        id: 31,
        name: '2024事业运',
        banner_id: 123456,
        checked: false,
        icon: _banner_shiyeyunshi2.default,
        url: 'career_fortune_2024',
        product_key: 'h5_career2024',
        tips: '2024年事业运，暂无简介，2024年事业运，暂无简介',
        check_icon: _banner_shiyeyunshi2.default
      }];
    },
    longnianBanner: function longnianBanner() {
      return _banner2024caiyun3x2.default;
    },


    // 改版的报告商品
    sale_list: function sale_list() {
      var arr = [];
      for (var i = 0; i < 7; i++) {
        var num = this.randomNum(6538, 9362);
        arr.push({
          buy_num: num,
          review_num: +(num * (this.randomNum(95, 97) / 100)).toFixed(0)
        });
      }

      var arr2 = [{
        id: 7,
        name: '八字合婚',
        cn_desc: '揭示姻缘宿命，戒备潜藏危机，慎选伴侣之道',
        tw_desc: '揭示姻緣宿命，戒備潛藏危機，慎選伴侶之道',
        url: 'marriage_measure_overseas',
        zh_icon: 'https://psychicai-static.psychicai.pro/imgs/24041ad15f947999492aabf1a307f653f794.png',
        tw_icon: _bzhh_banner2.default,
        buy_num: '6324',
        review_num: '6185',
        e_id: '-10007',
        e_name: 'click_report_marriage',
        ad_e: '8g4xt8',
        report_id: '60005',
        product_key: 'h5_marriage'
      }, {
        id: 4,
        name: '24年感情运',
        cn_desc: '感情运势早知道，和合美满还是遗憾分手',
        tw_desc: '感情運勢早知道，和合美滿還是遺憾分手',
        url: 'emotion_fortune',
        zh_icon: 'https://psychicai-static.psychicai.pro/imgs/240480dc4c244a8e4dafb2c9658a953b2b7d.png',
        tw_icon: _emotion24_banner2.default,
        buy_num: '3492',
        review_num: '3441',
        e_id: '-10006',
        e_name: 'click_report_2024lovely',
        ad_e: 'efy9t0',
        report_id: '60010',
        product_key: 'h5_emotion2024'
      }, {
        id: 3,
        name: '24年年运',
        cn_desc: '你的2024年如何度过？大师为你解读年度运势',
        tw_desc: '你的2024年如何度過？大師為你解讀年度運勢',
        url: 'year_of_lucky_2024',
        zh_icon: 'https://psychicai-static.psychicai.pro/imgs/2404e9c969b4e1464e91b6836b7e57b7d346.png',
        tw_icon: _year24_banner2.default,
        buy_num: '8321',
        review_num: '8238',
        is_big: false,
        e_id: '-10003',
        e_name: 'click_report_2024report',
        ad_e: 'oqfzzs',
        report_id: '60009',
        product_key: 'h5_annual2024'
      }, {
        id: 6,
        name: '24年财运',
        cn_desc: '预警财务危机，洞悉关键时刻，避免潜在财富风险。',
        tw_desc: '預警財務危機，洞悉關鍵時刻，避免潛在財富風險。',
        url: 'lucky_year_report',
        zh_icon: 'https://psychicai-static.psychicai.pro/imgs/24048d23afe94dc94781b614ed38300c52d2.png',
        tw_icon: _wealth24_banner2.default,
        buy_num: '7315',
        review_num: '7044',
        e_id: '-10005',
        e_name: 'click_report_2024wealty',
        ad_e: 'egm8a2',
        report_id: '60001',
        product_key: 'h5_wealth2024'
      }, {
        id: 5,
        name: '24年事业运',
        cn_desc: '前途迷雾重重，挑战接踵而至，开创事业新章',
        tw_desc: '前途迷霧重重，挑戰接踵而至，開創事業新章',
        url: 'career_fortune_2024',
        zh_icon: 'https://psychicai-static.psychicai.pro/imgs/24046a9e0acaca504f16b3069e0c06a611df.png',
        tw_icon: _career24_banner2.default,
        buy_num: '8314',
        review_num: '8090',
        e_id: '-10004',
        e_name: 'click_report_2024career',
        ad_e: 'tzsnzi',
        report_id: '60011',
        product_key: 'h5_career2024'
      }, {
        id: 1,
        name: '袁天罡',
        cn_desc: '称骨论命，揭露宿命重负，应对多舛命途',
        tw_desc: '稱骨論命，揭露宿命重負，應對多舛命途',
        url: 'weigh_bone',
        zh_icon: 'https://psychicai-static.psychicai.pro/imgs/2404a40011fb74fd44aa9e0bf8eb8ca1dfc3.png',
        tw_icon: _weigh_banner2.default,
        buy_num: '6752',
        review_num: '6518',
        e_id: '-10009',
        e_name: 'click_report_chenggu',
        ad_e: 'kajqs3',
        report_id: '60002',
        product_key: 'h5_weigh_bone'
      }, {
        id: 2,
        name: '鬼谷子',
        cn_desc: '64卦预见人生，审慎应对风波，谨防危机潜伏',
        tw_desc: '64卦預見人生，審慎應對風波，謹防危機潛伏',
        url: 'guiguzi_fortune',
        zh_icon: 'https://psychicai-static.psychicai.pro/imgs/2404090733726e3c4fabb8a756a685bfadbf.png',
        tw_icon: _ggz_banner2.default,
        buy_num: '9522',
        review_num: '9277',
        e_id: '-10008',
        e_name: 'click_report_64gua',
        ad_e: 'jd4oen',
        report_id: '60003',
        product_key: 'h5_bai_gua'
      }];

      return arr2;
    },
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    },
    scrollStyle: function scrollStyle() {
      if (this.payed_order_three_list.length) {
        if (this.combine_index === -1) {
          return '0px';
        } else if (this.combine_index === 0) {
          return '0.8rem';
        } else {
          return '2.05rem';
        }
      } else {
        if (this.combine_index) {
          return this.combine_index !== -1 ? '1.3rem' : '0px';
        } else {
          return '0px';
        }
      }
    },
    show_fixed_order: function show_fixed_order() {
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

    // 遍历是否每一项都有product_key

    confirm_btn_3: function confirm_btn_3() {
      if (this.pick_list.length < 3) {
        return false;
      }
      var flag = this.pick_list.every(function (it) {
        return it.product_key;
      });
      return flag;
    },
    confirm_btn_2: function confirm_btn_2() {
      if (this.pick_list2.length < 2) {
        return false;
      }
      var flag = this.pick_list2.every(function (it) {
        return it.product_key;
      });
      return flag;
    },
    is_show_reechoes_3: function is_show_reechoes_3() {
      return this.three_list.length && this.three_list.every(function (it) {
        return it.product_key;
      });
    },
    is_full_3: function is_full_3() {
      return this.three_list.every(function (it) {
        return it.product_key;
      });
    },
    is_show_reechoes_2: function is_show_reechoes_2() {
      return this.two_list.length && this.two_list.every(function (it) {
        return it.product_key;
      });
    },
    is_full_2: function is_full_2() {
      return this.two_list.every(function (it) {
        return it.product_key;
      });
    },
    channel03: function channel03() {
      return _utils2.default.getFBChannel().indexOf('03') > -1;
    }
  },
  watch: {
    sale_visible: function sale_visible(val) {
      var _this = this;

      this.fix_pop = val ? true : false;
      if (!val) {
        this.can_choose = true;
      } else {
        this.$nextTick(function () {
          _this.pop_list.forEach(function (it, k) {
            _this.handleText(k);
          });
        });
      }
    },
    pay_visible: function pay_visible(val) {
      this.fix_pop = val ? true : false;
    },
    pay_result_visible: function pay_result_visible(val) {
      this.fix_pop = val ? true : false;
    },
    new_sale_modal: function new_sale_modal(val) {
      if (val) {
        // 查看多买多折扣列表3项
        _utils2.default.firebaseLogEvent('10001', '-10020', 'view_reportlist_choise3', 'view', {
          args_name: 'view_reportlist_choise3',
          channel: _utils2.default.getFBChannel()
        });

        this.getLocalChecked('three_list', 'mlxz_web_select_list');
        this.pick_list = JSON.parse(JSON.stringify(this.three_list));
      } else {
        this.pick_list = [];
      }
    },
    new_sale_modal2: function new_sale_modal2(val) {
      if (val) {
        // 查看多买多折扣列表2项
        _utils2.default.firebaseLogEvent('10001', '-10019', 'view_reportlist_choise2', 'view', {
          args_name: 'view_reportlist_choise2',
          channel: _utils2.default.getFBChannel()
        });

        this.getLocalChecked('two_list', 'mlxz_web_select_list_two');
        this.pick_list2 = JSON.parse(JSON.stringify(this.two_list));
      } else {
        this.pick_list2 = [];
      }
    },


    combine_index: {
      handler: function handler(val) {
        console.log('combine_index', val);
      },

      immediate: true
    },
    three_list: function three_list(val) {
      if (val) {
        this.getSelectTagList();
      }
    },
    two_list: function two_list(val) {
      if (val) {
        this.getSelectTagList(2);
      }
    }
  },
  created: function created() {
    var _this2 = this;

    var store_time_3 = localStorage.getItem('mlxz_combine_3');
    var store_time_2 = localStorage.getItem('mlxz_combine_2');
    this.time_3 = store_time_3 ? +store_time_3 : 15 * 60 * 1000;
    this.time_2 = store_time_2 ? +store_time_2 : 15 * 60 * 1000;

    _utils2.default.isProd() && _tstatistic2.default && _tstatistic2.default.send({
      event: 'page_view_main',
      md: 10001,
      c_id: -10001,
      args: {
        args_name: 'page_view_main',
        channel: _utils2.default.getFBChannel()
      }
    });
    document.title = this.$t('dom-title');
    this.getLastOrder();

    this.is_show_combine = ['enjoy03', 'panda03'].includes(_utils2.default.getFBChannel());

    var url_query = _utils2.default.getUrlParams();
    var order_id = url_query.order_id;
    this.order_id = order_id || '';
    var pay_status = url_query.status;
    var pay_index = +url_query.pay_index;

    var remove_flag = +localStorage.getItem('mlxz_remove_flag'); // 1:已经删除 ,2:未删除

    this.randomBuyList();
    this.getProductSort();
    (0, _api.getProductionsAPI)('ceh5').then(function (res) {
      _this2.all_list = res.data;
      if (!_this2.is_show_combine) return;
      if (order_id && pay_status === 'SUCCESS' && remove_flag === 2) {
        localStorage.removeItem(pay_index === 3 ? 'mlxz_web_select_list' : 'mlxz_web_select_list_two');
        localStorage.setItem('mlxz_remove_flag', 1);
      }
      _this2.getSelectTagList();
      _this2.getPayedOrderList();
      _this2.showComboAttach();
      _this2.getLocalChecked('three_list', 'mlxz_web_select_list');
      _this2.getLocalChecked('two_list', 'mlxz_web_select_list_two');
      _this2.pop_list = _this2.mergeArray(_this2.measureProduct, _this2.all_list);
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        _this2.showComboAttach();
      }
    });
  },
  mounted: async function mounted() {
    if (_utils2.default.isProd()) {
      try {
        fbq('trackCustom', 'CustomChannel', {
          channel: 'pageview_main_' + _utils2.default.getFBChannel()
        });
        _utils2.default.gcyLog('\u4E3B\u9875', {
          mlxz_action_desc: '主页FB渠道上报',
          mlxz_action_type: 'view',
          mlxz_channel: 'pageview_main_' + _utils2.default.getFBChannel()
        });
      } catch (err) {
        console.log('no fbq:', err);
      }
    }

    this.showNoticePop();

    _utils2.default.firebaseLogEvent('10001', '-10001', 'page_view_h5main', 'page_view', {
      args_name: 'page_view_h5main',
      channel: _utils2.default.getFBChannel()
    });
    if (this.order_id) {
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
    }
    // 埋点事件上传
    (0, _api.reportBuryingEventAPI)({
      event: 'page_view_h5main',
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

  methods: {
    getProductions: _common_api.getProductions,
    //开始测算
    startCalculateClick: async function startCalculateClick() {
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
    showNoticePop: function showNoticePop() {
      var _this3 = this;

      this.timer = setInterval(function () {
        _this3.fix_order_info = localStorage.getItem('mlxz_fixed_order_info');
        _this3.new_order_key = localStorage.getItem('mlxz_fixed_order_key');
        _this3.local_time = +localStorage.getItem('mlxz_fixed_local_order_time') || 0;
        var is_reload = localStorage.getItem('mlxz_reload_page_home');
        if (is_reload) {
          _this3.payed_order_three_list = [];
          _this3.getPayedOrderList();
        }
      }, 1000);
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
          this.api_time = +localStorage.getItem('mlxz_fixed_api_order_time') || 0;
          this.show_api_order = true;
          return;
        }
        this.api_time = 15 * 60 * 1000;
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
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        },
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
      if (this.new_order_key === 'h5_marriage') {
        var marry_info = JSON.parse(localStorage.getItem('mlxz_user_info_h5_marriage'));
        var male_str = marry_info.male_str;
        var female_str = marry_info.female_str;
        var _path = 'detail?querystring=' + marry_info.user_info + '&male_str=' + male_str + '&female_str=' + female_str + '\n&pay_modal=1&use_fixed_time=1&discount_pay=1';
        location.href = location.origin + '/' + _utils2.default.getFBChannel() + '/' + _enum.path_enums[this.new_order_key] + '.html#/' + _path;

        return;
      }
      var path = 'detail?querystring=' + this.fix_order_info + '&pay_modal=1' + '&use_fixed_time=1&discount_pay=1';

      location.href = location.origin + '/' + _utils2.default.getFBChannel() + '/' + _enum.path_enums[this.new_order_key] + '.html#/' + path;
    },

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
      var report_price = +_utils2.default.getQueryString('report_price') || this.payed_combine_price;
      var report_status = _utils2.default.getQueryString('status') || this.order_id ? 'SUCCESS' : '';
      var repay = +_utils2.default.getQueryString('repay');

      // let pay_index = +utils.getQueryString('pay_index') ;
      var pay_index = void 0;
      if (_utils2.default.getQueryString('pay_index')) {
        pay_index = +_utils2.default.getQueryString('pay_index');
      } else {
        pay_index = this.payed_order_three_list.length;
      }
      _utils2.default.gcyLog('order_id:' + this.order_id, {
        mlxz_action_desc: '准备上报埋点，获取订单状态',
        mlxz_order_status: report_status
      });
      if (report_status === 'SUCCESS' || report_status === 'PAYED') {
        _utils2.default.gcyLog('order_id:' + this.order_id, {
          mlxz_action_desc: '开始上报firebase埋点',
          mlxz_order_status: report_status
        });
        if (repay) {
          _utils2.default.firebaseLogEvent('10002', pay_index === 2 ? '-10019' : '-10020', pay_index === 2 ? 'event_status_report2history_pay_success' : 'event_status_report3history_pay_success', 'event_status', {
            args_name: pay_index === 2 ? 'event_status_report2history_pay_success' : 'event_status_report3history_pay_success',
            channel: _utils2.default.getFBChannel()
          });
        } else {
          _utils2.default.firebaseLogEvent('10001', pay_index === 2 ? '-10027' : '-10028', pay_index === 2 ? 'event_status_report2_pay_success' : 'event_status_report3_pay_success', 'event_status', {
            args_name: pay_index === 2 ? 'event_status_report2_pay_success' : 'event_status_report3_pay_success',

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
        if (repay) {
          _utils2.default.firebaseLogEvent('10002', pay_index === 2 ? '-10028' : '-10029', pay_index === 2 ? 'event_status_report2history_pay_fail' : 'event_status_report3history_pay_fail', 'event_status', {
            args_name: pay_index === 2 ? 'event_status_report2history_pay_fail' : 'event_status_report3history_pay_fail',
            channel: _utils2.default.getFBChannel()
          });
        } else {
          _utils2.default.firebaseLogEvent('10001', pay_index === 2 ? '-10029' : '-10030', pay_index === 2 ? 'event_status_report2_pay_fail' : 'event_status_report3_pay_fail', 'event_status', {
            args_name: pay_index === 2 ? 'event_status_report2_pay_fail' : 'event_status_report3_pay_fail',

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
    showModal: function showModal() {
      _utils2.default.firebaseLogEvent('10001', '-10017', 'click_main_choise3', 'click', {
        args_name: 'click_main_choise3',
        channel: _utils2.default.getFBChannel()
      });
      this.new_sale_modal = true;
    },
    showModal2: function showModal2() {
      _utils2.default.firebaseLogEvent('10001', '-10015', 'click_main_choise2', 'click', {
        args_name: 'click_main_choise2',
        channel: _utils2.default.getFBChannel()
      });
      this.new_sale_modal2 = true;
    },

    // 查询订单支付结果
    getOrderResult: async function getOrderResult() {
      if (!this.continue || !this.order_id) return;
      _mintUi.Indicator.open(this.$t('order-result-loading'));

      var _ref2 = await (0, _api.getResultAPI)({ order_id: this.order_id }),
          status = _ref2.status,
          data = _ref2.data;

      _mintUi.Indicator.close();
      this.continue = false;
      if (status !== 1000) return;
      return data;
    },


    // 两个数组中的key相同的合并成一个数组
    mergeArray: function mergeArray(arr1, arr2) {
      var arr = [];
      arr1.forEach(function (it) {
        arr2.forEach(function (item) {
          if (it.product_key === item.product_key) {
            arr.push(Object.assign(it, item));
          }
        });
      });
      return arr;
    },


    /**
     * @description: 获取缓存的已选商品
     * @return {*}
     */
    getStoreChecked: function getStoreChecked() {
      var arr = localStorage.getItem('mlxz_checked_list');
      this.checked_list = arr ? JSON.parse(arr) : initCheck;
      var i = 0;
      this.checked_list.forEach(function (it) {
        if (it.product_key) {
          i++;
        }
      });
      this.zhekou = i > 0 ? i - 1 : 2;
    },


    /**
     * @description: 初始化勾选的商品
     * @param {*} arr1
     * @param {*} arr2
     * @return {*}
     */
    formatProductList: function formatProductList(arr1, arr2) {
      arr1.forEach(function (it) {
        arr2.forEach(function (item) {
          it.checked = it.product_key === item.product_key ? true : false;
        });
      });
      return arr1;
    },


    /**
     * @description: 开启商品弹窗
     * @return {*}
     */
    showPop: function showPop() {
      var _this4 = this;

      var arr = localStorage.getItem('mlxz_checked_list');
      if (arr) {
        this.checked_list = JSON.parse(arr);
      }
      this.pop_list = this.formatProductList(this.pop_list, this.checked_list);

      var id_arr = [];
      this.checked_list.forEach(function (it) {
        if (it.id) {
          id_arr.push(it.id);
        }
      });
      if (!id_arr.length) {
        this.sale_visible = true;
        return;
      }
      id_arr.forEach(function (it) {
        _this4.pop_list.forEach(function (item) {
          if (item.id === it) {
            item.checked = true;
          }
        });
      });
      var has_num = this.formatChecked();
      this.can_choose = has_num >= 3 ? false : true;
      this.sale_visible = true;
    },


    /**
     * @description: 选择商品
     * @param {*} it 当前选中
     * @param {*} k
     * @return {*}
     */
    chooseSale: function chooseSale(it, k) {
      if (!this.can_choose && !it.checked) {
        return;
      }
      this.pop_list[k].checked = !this.pop_list[k].checked;

      var has_num = this.formatChecked();
      this.can_choose = has_num >= 3 ? false : true;
    },


    /**
     * @description: 校验时候选择了3个商品
     * @return {*}
     */
    formatChecked: function formatChecked() {
      var i = 0;
      this.pop_list.forEach(function (it) {
        if (it.checked) {
          i++;
        }
      });
      return i;
    },
    closeSalePop: function closeSalePop() {
      this.getStoreChecked();
      this.sale_visible = false;
    },


    /**
     * @description: 按照ID大小排序
     * @param {*} arr
     * @return {*}
     */
    sortData: function sortData(arr) {
      return arr.sort(function (a, b) {
        return a.id - b.id;
      });
    },


    /**
     * @description: 确认选择的产品
     * @return {*}
     */
    handleConfirm: function handleConfirm() {
      var _this5 = this;

      var i = 0;
      this.pop_list.forEach(function (it) {
        if (it.checked) {
          i++;
        }
      });
      if (i < 2) {
        (0, _mintUi.Toast)(this.$t('less-get-two-tips'));
        return false;
      }
      this.checked_list = [];
      this.pop_list.forEach(function (it) {
        if (it.checked) {
          _this5.checked_list.push(it);
        }
      });
      if (this.checked_list.length < 3) {
        for (var _i = 0; _i < 4 - this.checked_list.length; _i++) {
          this.checked_list.push({ value: '' });
        }
      }
      var has_num = this.formatChecked();
      this.zhekou = has_num > 0 ? has_num - 1 : 2;
      this.sortData(this.checked_list);
      localStorage.setItem('mlxz_checked_list', JSON.stringify(this.checked_list));

      this.sale_visible = false;
    },


    /**
     * @description: 打开支付弹窗
     * @return {*}
     */
    payModal: function payModal() {
      var i = 0;
      this.checked_list.find(function (it) {
        if (it.id) {
          i++;
        }
      });
      if (i < 2) {
        (0, _mintUi.Toast)(this.$t('less-get-two-tips'));
        return;
      }

      this.pay_visible = true;
    },


    /**
     * @description: 查看报告/或者填写信息
     * @param {*} val
     * @return {*}
     */
    handleReport: async function handleReport(val, index) {
      if (index === 1) {
        console.log('d1cle9');
      }
      if (index === 2) {
        console.log('5ts44a');
      }
      if (index === 3) {
        console.log('vzsv9y');
      }
      if (index === 5) {
        this.logHome();

        _utils2.default.firebaseLogEvent('10001', '-10002', 'click_h5main_banner', 'click', {
          args_name: 'click_h5main_banner',
          report_id: val.a_id,
          channel: _utils2.default.getFBChannel()
        });
      }
      if (val.product_key) {
        var same_ = this.all_list.find(function (it) {
          return it.product_key === val.product_key;
        });

        await this.logEventForSort({
          e_name: 'content_click',
          product_id: same_.product_id
        });
      }
      await _utils2.default.asleep(500);

      location.href = val.id === 4 ? val.url : val.url + '.html';
    },
    backUrl: function backUrl() {
      location.href = 'mlxz://back';
    },
    hasPayReport: function hasPayReport(item) {
      var _this6 = this;

      setTimeout(function () {
        _this6.pay_result_visible = false;
      }, 1000);
      location.href = item.url + '.html#/?has_pay=SUCCESS&order_id=' + item.order_id + '&product_key=' + item.product_key;
    },
    handleText: function handleText(id) {
      // 使用JavaScript截断文本并添加省略号
      var element = document.getElementById('text-' + id);
      var lineHeight = parseInt(window.getComputedStyle(element).lineHeight, 10);
      var maxHeight = lineHeight * 2; // 两行文本的高度
      if (element.offsetHeight > maxHeight) {
        element.style.webkitLineClamp = '2';
        element.style.webkitBoxOrient = 'vertical';
        element.style.display = '-webkit-box';
        element.style.overflow = 'hidden';
      }
    },
    hiddenText: function hiddenText(text) {
      // return text;
      if (text.length > 23) {
        return text.substring(0, 23) + '......';
      } else {
        return text;
      }
    },


    // 随机走马灯数据
    randomBuyList: function randomBuyList() {
      for (var i = 0; i < 50; i++) {
        // 0-11随机数
        var num1 = Math.floor(Math.random() * 12);
        var num2 = Math.floor(Math.random() * 3);
        var num3 = Math.floor(Math.random() * 10);
        var num4 = Math.floor(Math.random() * 4);
        this.buy_list.push('' + user_name_arr[num1] + time_arr[num2] + this.$t('tips-1') + '\u4E4B\u524D' + this.$t('tips-2') + '\u4E86');
        this.mock_report_list.push({
          name: report_arr[num3][_utils2.default.getLanguage()],
          id: num3
        });
        this.score_list.push('\uFF0C' + this.$t('tips-3') + score_arr[num4] + '\u5206' + this.$t('tips-4'));
      }
    },
    jumpPage: async function jumpPage(index) {
      if (product_key_arr[index]) {
        var same_ = this.all_list.find(function (it) {
          return it.product_key === product_key_arr[index];
        });

        await this.logEventForSort({
          e_name: 'content_click',
          product_id: same_.product_id
        });
      }
      await this.logHome();

      _utils2.default.firebaseLogEvent('10001', '-10011', 'click_main_scrollbar', 'click', {
        args_name: 'click_main_scrollbar',
        report_id: e_id_arr[index],
        channel: _utils2.default.getFBChannel()
      });

      await _utils2.default.asleep(500);

      location.href = report_url[index] + '.html';
    },

    // 随机数
    randomNum: function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    jumpUrl: async function jumpUrl(url, e_id, e_name, ad_e, report_id, product_key) {
      await this.logHome();

      _utils2.default.firebaseLogEvent('10001', e_id, e_name, 'click', {
        args_name: e_name,
        channel: _utils2.default.getFBChannel()
      });
      if (product_key) {
        var same_ = this.all_list.find(function (it) {
          return it.product_key === product_key;
        });
        await this.logEventForSort({
          e_name: 'content_click',
          product_id: same_.product_id
        });
      }

      await _utils2.default.asleep(500);
      location.href = url + '.html';
    },
    getReportItem: function getReportItem(index) {
      this.cur_index = index;
    },


    /**
     * @description: 上报埋点
     * @param {*}
     * @return {*}
     */
    logHome: async function logHome() {
      if (_utils2.default.isProd()) {
        await _utils2.default.checkFB();
        try {
          fbq('track', 'CompleteRegistration');
        } catch (err) {
          console.error('CompleteRegistration  error message:', err);
        }
      }
    },

    // 切换轮播组
    getCombineIndex: function getCombineIndex(index) {
      this.new_sale_modal = false;
      this.new_sale_modal2 = false;
      if (this.payed_order_three_list.length) {
        this.combine_index = index - 1;
      } else {
        this.combine_index = index;
      }
      this.logPageView(this.combine_index);
    },

    // 打开选择弹窗
    changeSale: async function changeSale(val) {
      if (val) {
        if (this.two_list.length && this.is_full_2) {
          this.pay_modal2 = true;
          return;
        }

        _utils2.default.firebaseLogEvent('10001', '-10031', 'click_main_choise2group', 'click', {
          args_name: 'click_main_choise2group',
          channel: _utils2.default.getFBChannel()
        });
        this.new_sale_modal2 = true;

        return;
      }
      if (this.three_list.length && this.is_full_3) {
        this.pay_modal = true;
        return;
      }

      _utils2.default.firebaseLogEvent('10001', '-10032', 'click_main_choise3group', 'click', {
        args_name: 'click_main_choise3group',
        channel: _utils2.default.getFBChannel()
      });
      this.new_sale_modal = true;
    },


    // 删除选中的商品
    getDeleteIndex: function getDeleteIndex(list, key) {
      return list.findIndex(function (item) {
        return item.product_key === key;
      });
    },
    ToastSubmit: function ToastSubmit(val) {
      (0, _mintUi.Toast)('\u8BF7\u9009\u62E9' + val + '\u9879\u62A5\u544A');
    },


    // 选择商品
    chooseNewSale: function chooseNewSale(it, k, val) {
      var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'pick_list';

      if (this[key].length >= (val ? 2 : 3)) {
        if (!it.checked) {
          (0, _mintUi.Toast)('\u6700\u591A\u9009\u62E9' + (val ? '两' : '三') + '\u9879\u62A5\u544A');
          return;
        } else {
          this.new_pop_list[k].checked = !this.new_pop_list[k].checked;
          this[key].splice(this.getDeleteIndex(this[key], it.product_key), 1);
        }
      } else {
        this.new_pop_list[k].checked = !this.new_pop_list[k].checked;
        if (!it.checked) {
          this[key].splice(this.getDeleteIndex(this[key], it.product_key), 1);
        } else {
          this[key].push(it);
        }
      }
    },

    // 提交已选商品
    submitPopList: function submitPopList(val) {
      if (val) {
        if (this.channel03) {
          var old_arr = this.two_list.map(function (it) {
            return it.product_key;
          });
          var new_arr = this.pick_list2.map(function (it) {
            return it.product_key;
          });
          if (this.is_full_2 && old_arr.sort().join('') !== new_arr.sort().join('')) {
            this.time_2 = 15 * 60 * 1000;
            this.$refs.timeDown2.restartTime(this.time_2);
          }
        }

        this.two_list = JSON.parse(JSON.stringify(this.pick_list2));
        this.getSelectTagList(val);
        localStorage.setItem('mlxz_web_select_list_two', JSON.stringify(this.two_list));
        _utils2.default.firebaseLogEvent('10001', '-10025', 'click_reportlist_check2', 'click', {
          args_name: 'click_reportlist_check2',
          channel: _utils2.default.getFBChannel()
        });
        this.new_sale_modal2 = false;

        return;
      }

      if (this.channel03) {
        var _old_arr = this.three_list.map(function (it) {
          return it.product_key;
        });
        var _new_arr = this.pick_list.map(function (it) {
          return it.product_key;
        });
        if (this.is_full_3 && _old_arr.sort().join('') !== _new_arr.sort().join('')) {
          this.time_3 = 15 * 60 * 1000;
          this.$refs.timeDown3.restartTime(this.time_3);
        }
      }

      this.three_list = JSON.parse(JSON.stringify(this.pick_list));
      this.getSelectTagList();
      localStorage.setItem('mlxz_web_select_list', JSON.stringify(this.three_list));
      _utils2.default.firebaseLogEvent('10001', '-10026', 'click_reportlist_check3', 'click', {
        args_name: 'click_reportlist_check3',
        channel: _utils2.default.getFBChannel()
      });

      this.new_sale_modal = false;
    },

    // 获取本地缓存选择的商品
    getLocalChecked: function getLocalChecked(list, key) {
      var _this7 = this;

      // 本地缓存 三个缓存感情运 两个缓存袁天罡
      var init_1 = !this.channel03 ? '' : this.new_pop_list.find(function (it) {
        return it.product_key === 'h5_emotion2024';
      });
      var init_2 = !this.channel03 ? '' : this.new_pop_list.find(function (it) {
        return it.product_key === 'h5_bai_gua';
      });
      this.new_pop_list.forEach(function (it) {
        it.checked = false;
      });
      var set_list = list === 'three_list' ? [init_1, '', ''] : [init_2, ''];
      var arr = localStorage.getItem(key);
      this[list] = arr ? JSON.parse(arr) : set_list;
      this[list].forEach(function (item) {
        _this7.new_pop_list.forEach(function (it) {
          if (it.product_key === item.product_key) {
            it.checked = true;
          }
        });
      });
    },


    // 获取组合订单信息
    getSelectTagList: function getSelectTagList(val) {
      var _this8 = this;

      if (val > 0) {
        if (!this.two_list.length) {
          return;
        }
      } else {
        if (!this.three_list.length) {
          return;
        }
      }

      if (val > 0) {
        var product_key2 = 'h5_combo2';
        var pick_list = this.two_list.map(function (item) {
          return item.product_key;
        });
        var combine_ids2 = [];

        this.two_list.forEach(function (it) {
          _this8.all_list.forEach(function (item) {
            if (it.product_key === item.product_key) {
              combine_ids2.push(item.product_id);
            }
          });
        });
        this.combine_info2 = this.all_list.find(function (it) {
          return it.product_key === product_key2 && it.tags.length && it.tags.sort().join('').indexOf(pick_list.sort().join('')) > -1;
        });
        this.combine_info2.combine_product_ids = combine_ids2;
      } else {
        var product_key = 'h5_combo3';
        var _pick_list = this.three_list.map(function (item) {
          return item.product_key;
        });
        var combine_ids = [];

        this.three_list.forEach(function (it) {
          _this8.all_list.forEach(function (item) {
            if (it.product_key === item.product_key) {
              combine_ids.push(item.product_id);
            }
          });
        });
        this.combine_info = this.all_list.find(function (it) {
          return it.product_key === product_key && it.tags.length && it.tags.sort().join('').indexOf(_pick_list.sort().join('')) > -1;
        });
        this.combine_info.combine_product_ids = combine_ids;
      }
      this.pick_list = JSON.parse(JSON.stringify(this.three_list.filter(function (it) {
        return it;
      })));
      // this.time_start_3 =
      //   this.pick_list &&
      //   this.pick_list.length === 3 &&
      //   this.pick_list.every(it => it.product_key)
      //     ? true
      //     : false;

      this.pick_list2 = JSON.parse(JSON.stringify(this.two_list.filter(function (it) {
        return it;
      })));
    },


    // 获取已下单未填写订单信息
    getPayedOrderList: async function getPayedOrderList() {
      var _this9 = this;

      this.payed_order_three_list = [];

      var res = await (0, _api.getComboListAPI)();
      if (res.data) {
        localStorage.removeItem('mlxz_reload_page_home');
      }
      if (res.status !== 1000 || !res.data.combine) {
        this.payed_order_three_list = [];
        this.combine_index = 0;
        this.logPageView(this.combine_index);
        return;
      }

      var _res$data$combine = res.data.combine,
          sub_orders = _res$data$combine.sub_orders,
          order_id = _res$data$combine.order_id;

      if (sub_orders.length) {
        this.combine_index = this.combine_index === -1 ? -1 : this.combine_index - 1;
      }

      this.logPageView(this.combine_index);

      var arr_ = [];
      sub_orders.forEach(function (item) {
        _this9.all_list.forEach(function (it) {
          if (it.product_id === item.product_id) {
            arr_.push(it.product_key);
            arr_.push({
              product_key: it.product_key,
              status: item.extra_ce_suan ? 1 : 0, // 0 未填写 ，1 已填写
              product_id: item.product_id,
              order_id: item.order_id
            });
          }
        });
      });

      arr_.forEach(function (item) {
        new_pop_list.forEach(function (it) {
          if (it.product_key === item.product_key) {
            var it_ = Object.assign({}, it);
            it_.status = item.status;
            it_.product_id = item.product_id;
            it_.order_id = item.order_id;
            _this9.payed_order_three_list.push(it_);
          }
        });
      });
      return;
      if (order_id) {
        this.order_id = order_id;
        var payed_key_list = this.payed_order_three_list.map(function (item) {
          return item.product_key;
        });
        var product_key = this.payed_order_three_list.length === 3 ? 'h5_combo3' : 'h5_combo2';
        var pay_combine_info = this.all_list.find(function (it) {
          return it.product_key === product_key && it.tags.length && it.tags.sort().join('').indexOf(payed_key_list.sort().join('')) > -1;
        });
        this.payed_combine_price = pay_combine_info.price;
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
      }
    },
    logPageView: function logPageView(val) {
      var channel = _utils2.default.getFBChannel();
      if (!['enjoy03', 'panda03'].includes(channel)) {
        return;
      }
      if (val === 0) {
        _utils2.default.firebaseLogEvent('10001', '-10012', 'view_main_report3', 'view', {
          args_name: 'view_main_report3',
          channel: _utils2.default.getFBChannel()
        });
      } else if (val > 0) {
        _utils2.default.firebaseLogEvent('10001', '-10013', 'view_main_report2', 'view', {
          args_name: 'view_main_report2',
          channel: _utils2.default.getFBChannel()
        });
      } else {
        _utils2.default.firebaseLogEvent('10001', '-10014', 'view_main_results', 'view', {
          args_name: 'view_main_results',
          channel: _utils2.default.getFBChannel()
        });
      }
    },
    toWriteInfo: async function toWriteInfo(item) {
      var status = item.status,
          url = item.url,
          order_id = item.order_id;

      var channle = _utils2.default.getFBChannel() === 'own' ? '' : _utils2.default.getFBChannel();

      localStorage.setItem('mlxz_reload_page_home', 1);
      location.href = location.origin + '/' + channle + '/' + url + '.html#/' + (status ? 'result' : '') + '?has_pay=SUCCESS&order_id=' + order_id + '&status=SUCCESS';
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
    restartChoose: function restartChoose(val) {
      if (val) {
        _utils2.default.firebaseLogEvent('10001', '-10016', 'click_main_rechoise2', 'click', {
          args_name: 'click_main_rechoise2',
          channel: _utils2.default.getFBChannel()
        });
        this.new_sale_modal2 = true;
      } else {
        _utils2.default.firebaseLogEvent('10001', '-10018', 'click_main_rechoise3', 'click', {
          args_name: 'click_main_rechoise3',
          channel: _utils2.default.getFBChannel()
        });
        this.new_sale_modal = true;
      }
    },
    getSortInitList: function getSortInitList() {
      this.sale_list.forEach(function (it) {
        it.icon_item = _enum.banner_enums[it.product_key];

        if (it.product_key === 'h5_annual2024') {
          it.is_big = true;
        }
      });
      this.banner_list = JSON.parse(JSON.stringify(this.sale_list));
    },


    // 首页Banner排序
    getProductSort: async function getProductSort() {
      var _this10 = this;

      if (!this.isShowBannerSort()) {
        this.getSortInitList();
        return;
      }
      var res = await (0, _api.sortProductsAPI)();
      if (res.status !== 1000) return;
      // 在接口返回error或者没有排序值的情况下 添加一个默认值大图
      if (res.status !== 1000 || !res.data.length) {
        this.getSortInitList();
      }
      this.today_sort_list = res.data;
      this.sale_list.forEach(function (item) {
        item.icon_item = _enum.banner_enums[item.product_key];
        // 将第一个置为大图
        item.is_big = item.product_key === _this10.today_sort_list[0];
      });
      // 给banner_list按照排序值赋值
      this.today_sort_list.forEach(function (it) {
        _this10.banner_list.push(_this10.sale_list.find(function (item) {
          return item.product_key === it;
        }));
      });
      // 将banner_list的第一个放到第三个
      this.banner_list.splice(2, 0, this.banner_list.shift());
    },
    getBannerIcon: function getBannerIcon(item) {
      var product_key = item.product_key,
          is_big = item.is_big,
          icon_item = item.icon_item;

      var is_01 = ['enjoy01', 'panda01'].includes(_utils2.default.getFBChannel());
      if (product_key === 'h5_emotion2024') {
        if (is_01) {
          return is_big ? icon_item.new_01.big : icon_item.new_01.small;
        } else {
          return is_big ? icon_item.new_other.big : icon_item.new_other.small;
        }
      } else {
        if (is_big) {
          return this.is_cn ? icon_item.big.cn : icon_item.big.tw;
        } else {
          return this.is_cn ? icon_item.small.cn : icon_item.small.tw;
        }
      }
    },
    showDetailModal: function showDetailModal() {
      var _this11 = this;

      //第一个参数为size,确认2或3项
      //之后参数顺位延用 chooseNewSale 方法参数规则
      var size = arguments[0] || 3;
      var product_key = arguments[1].product_key;
      this.sale_detail_product_key = product_key;
      var callbackArg = Array.prototype.slice.call(arguments, 1);
      this.sale_detail_callback = function () {
        console.log('sale_detail_callback111');
        _this11.chooseNewSale.apply(_this11, _toConsumableArray(callbackArg));
        _this11.sale_detail_modal = false;
      };
      this.sale_detail_modal = true;
      if (size === 2) {
        switch (product_key) {
          case 'h5_marriage':
            _utils2.default.firebaseLogEvent('10001', '-10036', 'click_reportlist2_marriage_detail', 'click', {
              args_name: 'click_reportlist2_marriage_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_emotion2024':
            _utils2.default.firebaseLogEvent('10001', '-10033', 'click_reportlist2_2024lovely_detail', 'click', {
              args_name: 'click_reportlist2_2024lovely_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_annual2024':
            _utils2.default.firebaseLogEvent('10001', '-10032', 'click_reportlist2_2024report_detail', 'click', {
              args_name: 'click_reportlist2_2024report_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_wealth2024':
            _utils2.default.firebaseLogEvent('10001', '-10035', 'click_reportlist2_2024wealty_detail', 'click', {
              args_name: 'click_reportlist2_2024wealty_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_career2024':
            _utils2.default.firebaseLogEvent('10001', '-10034', 'click_reportlist2_2024career_detail', 'click', {
              args_name: 'click_reportlist2_2024career_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_bai_gua':
            _utils2.default.firebaseLogEvent('10001', '-10037', 'click_reportlist2_64gua_detail', 'click', {
              args_name: 'click_reportlist2_64gua_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_weigh_bone':
            _utils2.default.firebaseLogEvent('10001', '-10038', 'click_reportlist2_chenggu_detail', 'click', {
              args_name: 'click_reportlist2_chenggu_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

        }
      } else {
        switch (product_key) {
          case 'h5_marriage':
            _utils2.default.firebaseLogEvent('10001', '-10043', 'click_reportlist3_marriage_detail', 'click', {
              args_name: 'click_reportlist3_marriage_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_emotion2024':
            _utils2.default.firebaseLogEvent('10001', '-10040', 'click_reportlist3_2024lovely_detail', 'click', {
              args_name: 'click_reportlist3_2024lovely_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_annual2024':
            _utils2.default.firebaseLogEvent('10001', '-10039', 'click_reportlist3_2024report_detail', 'click', {
              args_name: 'click_reportlist3_2024report_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_wealth2024':
            _utils2.default.firebaseLogEvent('10001', '-10042', 'click_reportlist3_2024wealty_detail', 'click', {
              args_name: 'click_reportlist3_2024wealty_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_career2024':
            _utils2.default.firebaseLogEvent('10001', '-10041', 'click_reportlist3_2024career_detail', 'click', {
              args_name: 'click_reportlist3_2024career_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_bai_gua':
            _utils2.default.firebaseLogEvent('10001', '-10044', 'click_reportlist3_64gua_detail', 'click', {
              args_name: 'click_reportlist3_64gua_detail',
              channel: _utils2.default.getFBChannel()
            });
            break;

          case 'h5_weigh_bone':
            _utils2.default.firebaseLogEvent('10001', '-10045', 'click_reportlist3_chenggu_detail', 'click', {
              args_name: 'click_reportlist3_chenggu_detail',
              channel: _utils2.default.getFBChannel()
            });

            break;
        }
      }
    },
    select: function select(key) {
      if (new_sale_modal) {
        //3个
        console.log(this.pick_list);
        console.log(key);
        return;
        this.chooseNewSale(item, key);
        this.sale_detail_modal = false;
      } else {
        //2个
        this.chooseNewSale(item, key, 2, 'pick_list2');
        this.sale_detail_modal = false;
      }
    }
  }
};

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(4);

var _dayjs = __webpack_require__(11);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var order_id = _utils2.default.getQueryString('order_id'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: { Popup: _mintUi.Popup },
  data: function data() {
    return {
      pop_visible: false
    };
  },

  props: {
    visible: {
      default: false,
      type: Boolean
    },
    result_list: {
      default: function _default() {
        return [];
      },
      type: Array
    },
    handleReport: {
      default: function _default() {},
      type: Function
    },
    pop_list: {
      default: function _default() {
        return [];
      },
      type: Array
    },
    sub_orders: {
      default: function _default() {
        return [];
      },
      type: Array
    }
  },
  watch: {
    visible: function visible(val) {
      this.pop_visible = val;
    },
    pop_visible: function pop_visible(val) {
      if (!val) {
        this.$emit('update-visible', val);
      }
    }
  },
  computed: {},
  created: function created() {},
  mounted: function mounted() {},


  methods: {
    /**
     * @description: 格式化时间
     * @param {*} val
     * @return {*}
     */
    formateTime: function formateTime(val) {
      return (0, _dayjs2.default)(val).format('YYYY.MM.DD HH:mm');
    },

    /**
     * @description: 查看、添加信息
     * @param {*} item
     * @return {*}
     */
    changeReport: function changeReport(item, index) {
      var it = this.pop_list.find(function (it) {
        return it.product_key === item.product_key;
      });
      it.order_id = this.sub_orders[index].order_id;
      this.$emit('handleReport', it);
    },


    /**
     * @description: 查看历史订单
     * @return {*}
     */
    jumpHistory: function jumpHistory() {
      location.href = 'mlxz://h5order?type=1';
    }
  }
};

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(6);

var _GroupPopup = __webpack_require__(1550);

var _GroupPopup2 = _interopRequireDefault(_GroupPopup);

var _PayPopup = __webpack_require__(185);

var _PayPopup2 = _interopRequireDefault(_PayPopup);

var _enum = __webpack_require__(2);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var productsMap = {
  1: {
    item_id: 1,
    title: '八字合婚',
    desc: '合八字測姻緣，專業分析婚配指數，擁有更加幸福美滿的婚姻！',
    url: 'marriage_measure_overseas',
    check: false
  },
  2: {
    item_id: 2,
    title: '全年運勢',
    desc: '預知運勢順遂，預測好運、危機出現月份，助你把握流年機遇！',
    url: 'new_year_luck_overseas',
    check: false
  },
  3: {
    item_id: 3,
    title: '婚缘心卦',
    desc: '姻緣分析，知己知彼，為你掃除情感障礙，幫你打造天賜良緣！',
    url: 'marriage_divination_overseas',
    check: false
  },
  4: {
    item_id: 4,
    title: '財運精批',
    desc: '把握財運先機，揭曉財富運程，助你財運亨通，財源滾滾！',
    url: 'wealth_boutique_overseas',
    check: false
  },
  5: {
    item_id: 5,
    title: '事業精批',
    desc: '預知事業低谷，成功時機，把握你的先天優勢，讓你的事業一帆風順！',
    url: 'career_divination_overseas',
    check: false
  }
};

exports.default = {
  components: { GroupPopup: _GroupPopup2.default, PayPopup: _PayPopup2.default },
  data: function data() {
    return {
      loading: false,
      list: [],

      // 组合测算相关
      list1: [], // 组合3
      list2: [], // 组合2
      visible1: false, // 组合3
      visible2: false, // 组合3
      showCombine3: false, // 已选组合3
      showCombine2: false, // 已选组合2
      combineArr3: [], // 组合3已选商品id
      combineArr2: [], // 组合2已选商品id
      combineLoading: true,

      // 组合测算支付相关
      product_id: 0, // 当前选择的组合测算的商品id
      visible: false, // 支付抽屉展示
      // combinePrice3: 0,
      // combinePrice2: 0,
      combine_ids: '', // 当前点击支付时的组合测算id
      combineOrder3: null,
      combineOrder2: null,

      // scroll组件相关
      combineDOM: null,
      prevScrollLeft: 0,
      scrollLeft: 0,
      hasTouch: false, // 长按中

      hasScroll: true
    };
  },
  created: function created() {
    var _this = this;

    window.addEventListener('pageshow', function () {
      var token = localStorage.getItem('suishen_overseas_token');
      var open_uid = localStorage.getItem('suishen_overseas_open_uid');
      if (token && open_uid) {
        _this.getCombineOrder();
      } else {
        _this.combineLoading = false;
      }
    });

    window.scrollTo(0, 0);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.hasScroll = localStorage.getItem('suishen_overseas_has_scroll');
    if (!this.hasScroll) {
      setTimeout(function () {
        localStorage.setItem('suishen_overseas_has_scroll', 1);
        _this2.hasScroll = true;
        _this2.initScroll();
      }, 3000);
    } else {
      this.initScroll();
    }
  },

  methods: {
    // 初始化滚动效果
    initScroll: function initScroll() {
      var _this3 = this;

      var combine = this.$refs.combine;
      var startX = 0;
      var gap = 0;
      var screenW = window.screen.width;
      combine.addEventListener('touchstart', function (e) {
        gap = 0;
        _this3.hasTouch = true;
        startX = e.targetTouches[0].clientX;
      });
      combine.addEventListener('touchmove', function (e) {
        gap = e.targetTouches[0].clientX - startX;
        var positionX = _this3.prevScrollLeft + gap;
        if (positionX > 0) {
          // 左边界
          _this3.scrollLeft = 0;
        } else if (positionX < -(660 / 750) * screenW) {
          // 右边界
          _this3.scrollLeft = -(660 / 750) * screenW;
        } else {
          // 跟随移动
          _this3.scrollLeft = positionX;
        }
      });
      combine.addEventListener('touchend', function (e) {
        _this3.hasTouch = false;
        if (gap < -50) {
          // 右滑成功
          _this3.scrollLeft = -(660 / 750) * screenW;
        } else if (gap > 50) {
          // 左滑成功
          _this3.scrollLeft = 0;
        } else {
          // 滑动失败回到初始位置
          _this3.scrollLeft = _this3.prevScrollLeft;
        }
        _this3.prevScrollLeft = _this3.scrollLeft;
      });
    },

    // 查询组合测算订单
    getCombineOrder: function getCombineOrder() {
      var _this4 = this;

      this.combineLoading = true;
      (0, _api.getCombineOrderAPI)().then(function (res) {
        var data = res.data;
        _this4.combineOrder3 = data.combine_three;
        _this4.combineOrder2 = data.combine_two;
        _this4.combineLoading = false;
      });
    },

    // 组合测算查看结果
    toResult: function toResult(item, main_order_id) {
      if (item.order_id) {
        location.href = _enum.path_enums[item.product_id] + '.html#/result?order_id=' + item.order_id;
      } else {
        // 组合测算跳转详情页
        location.href = _enum.path_enums[item.product_id] + '.html?is_combine=1&main_order_id=' + main_order_id;
      }
    },

    // 组合测算立即支付
    pay: function pay(pid) {
      this.combine_ids = pid == 6 ? this.combineArr3.join('') : this.combineArr2.join('');
      this.product_id = pid;

      // 测测 支付抽屉的展示

      this.visible = true;
    },

    // 确认选择组合3
    confirmCombine3: function confirmCombine3(str) {
      this.combineArr3 = str.split('');
      this.showCombine3 = true;
    },

    // 确认选择组合2
    confirmCombine2: function confirmCombine2(str) {
      this.combineArr2 = str.split('');
      this.showCombine2 = true;
    },

    // 打开组合3抽屉
    showGroupPopup3: function showGroupPopup3(flag, from) {
      var _this5 = this;

      if (!flag) return false; // 已解锁不能再点击

      this.list1.forEach(function (item) {
        var i = _this5.combineArr3.find(function (id) {
          return id == item.item_id;
        });
        item.check = i ? true : false;
      });

      this.visible1 = true;
    },

    // 打开组合2抽屉
    showGroupPopup2: function showGroupPopup2(flag, from) {
      var _this6 = this;

      if (!flag) return false; // 已解锁不能再点击

      this.list2.forEach(function (item) {
        var i = _this6.combineArr2.find(function (id) {
          return id == item.item_id;
        });
        item.check = i ? true : false;
      });

      // 测测 商品选择抽屉的浏览

      this.visible2 = true;
    },

    // 更新组合1数据勾选状态
    updateCheck1: function updateCheck1(pid) {
      this.list1.forEach(function (item) {
        if (pid === item.item_id) {
          item.check = !item.check;
        }
      });
    },

    // 更新组合1数据勾选状态
    updateCheck2: function updateCheck2(pid) {
      this.list2.forEach(function (item) {
        if (pid === item.item_id) {
          item.check = !item.check;
        }
      });
    },

    // 请求数据
    query: function query() {
      this.getGoodsList();
      this.getCombine();
    },

    // 请求组合测算数据
    getCombine: function getCombine() {
      (0, _api.getCombineGoodsListAPI)().then(function (res) {});
    },

    // 请求精选单品数据
    getGoodsList: function getGoodsList() {
      var _this7 = this;

      this.loading = true;
      (0, _api.getGoodsListAPI)().then(function (res) {
        var data = res.data;
        var products = data.products;
        _this7.list = [];
        products.forEach(function (item) {
          var obj = productsMap[item.product_id];
          obj.price = item.price;
          _this7.list.push(obj);
        });
        _this7.handleCombine();
        _this7.loading = false;
      }).catch(function (err) {
        _this7.loading = false;
      });
    },

    // 组合卡片数据初始化
    handleCombine: function handleCombine() {
      var _this8 = this;

      this.list1 = [];
      this.list2 = [];
      this.list.forEach(function (item) {
        _this8.list1.push(Object.assign({}, item));
        _this8.list2.push(Object.assign({}, item));
      });
      var combine3 = localStorage.getItem('suishen_overseas_combine3');
      var combine2 = localStorage.getItem('suishen_overseas_combine2');
      var n1 = 0;
      var n2 = 0;
      if (combine3) {
        this.combineArr3 = combine3.split('');
        this.combineArr3.forEach(function (id) {
          _this8.list1.forEach(function (item) {
            if (item.item_id == id) {
              n1++;
              item.check = true;
            }
          });
        });
      }
      if (combine2) {
        this.combineArr2 = combine2.split('');
        this.combineArr2.forEach(function (id) {
          _this8.list2.forEach(function (item) {
            if (item.item_id == id) {
              n2++;
              item.check = true;
            }
          });
        });
      }
      if (n1 === 3) this.showCombine3 = true;
      if (n2 === 2) this.showCombine2 = true;
    },
    link: function link(url, item_id) {
      // 测测 测算卡片浏览/点击
      tStatistic.send({
        event: 'click',
        md: 10,
        c_id: 102,
        args: {
          name: item_id,
          origin: location.origin,
          channel: localStorage.getItem('suishen_overseas_channel')
        }
      });
      location.href = url + '.html';
    },
    toPage: function toPage(url) {
      location.href = url;
    },
    toFb: function toFb(url) {
      // 测测 FB账号链接点击
      tStatistic.send({
        event: 'click',
        md: 10,
        c_id: 103,
        args: {
          origin: location.origin,
          channel: localStorage.getItem('suishen_overseas_channel')
        }
      });
      location.href = url;
    }
  }
};

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

/***/ 82:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(712);

var _index2 = _interopRequireDefault(_index);

var _fastclick = __webpack_require__(17);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _index3 = __webpack_require__(9);

var _index4 = _interopRequireDefault(_index3);

var _mintUi = __webpack_require__(4);

var _mintUi2 = _interopRequireDefault(_mintUi);

__webpack_require__(67);

var _vueI18n = __webpack_require__(109);

var _vueI18n2 = _interopRequireDefault(_vueI18n);

var _vant = __webpack_require__(65);

__webpack_require__(108);

var _cn = __webpack_require__(684);

var _cn2 = _interopRequireDefault(_cn);

var _tw = __webpack_require__(685);

var _tw2 = _interopRequireDefault(_tw);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vant.Swipe); /*
                                 * @Author: wujiang@weli.cn
                                 * @Date: 2023-10-18 11:45:29
                                 * @LastEditors: wujiang
                                 * @LastEditTime: 2024-05-21 11:12:12
                                 * @Description:测算择吉
                                 */

_vue2.default.use(_vant.SwipeItem);

_vue2.default.use(_vueI18n2.default);
_vue2.default.use(_mintUi2.default);

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

/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  store: _index4.default,
  i18n: i18n,
  template: '<App/>',
  components: { App: _index2.default }
});

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

/* (ignored) */

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

/***/ 892:
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

/***/ 903:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 908:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 909:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 92:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 923:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 93:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 933:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 934:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 95:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEUAAACYmJiZmZmYmJiVlZWYmJiYmJifn5+ZmZmZmZmZmZmampqZmZmZmZmVlZWZmZkPlpMwAAAAD3RSTlMAV+eUKTZ3DLr14XlQHhjrSwrhAAAAmklEQVQY033QsQkCQRCF4REUM7EDK5CzBiswtwhNzO1ArMASrgWrMLYFEQ9B4d1j5r3kgptgd4cv+dkYzuzp1+nI43LVNm3XRGBZ6xZdxOKGV2GDP68VuRAbXhOQE98RZmOx0Vxo7oRmoTnRcwDO+XBQpbkWlWb8il3r8qpVuVHlxhAbzfM2MfnDv0os/lEbopgaj3to9rsYnx6722jxhhVjaAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 968:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 974:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 975:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[834]);