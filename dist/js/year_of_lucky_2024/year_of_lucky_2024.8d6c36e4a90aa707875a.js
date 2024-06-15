webpackJsonp([3],{

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

/***/ 100:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATFJREFUOE+Nk79Kw1AUxr8vpiAhwUUfwE1EJ+dWo6PPoOBSF0s7+CBCcRERfZEMdnHwz6JWnF1E3NIqJt4jN5DSmpubZLuB3++cc79zCQBHrfnln9H3+9kdxvpc5+s0/dX+IH6mhl238Qpg+JvITn8Qf1QInG4YnJM8gKhDtjfgeQvBDcB1EXlUqWxbJBNYgJhIN6mrdZr+kuMyIrlmkczAKdTuaRRfZ4IaEiOsuYnAIvnMZ9Zt55XzwjMCk4TAA8g9E1zowDSO/lcGlwoAOL0wuNSVM4HIi0qlZUqnMIKGp2eGyBvJlbJ0/gsKt+0kGNoinhaURmXbk1xQClftSSbohsGF3m3bbZsi/hKE1K9qruE8VcHGTpQcZx30Qr8NqtuTaHxf5ym3t4JFj9hPHFz9Aa5vAPUbeQf+AAAAAElFTkSuQmCC"

/***/ }),

/***/ 101:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAANRJREFUOE+lk0EOgjAQRefLUvBMwMqFXgSIwEkQJOpBjEvgSAbZ2jFAQNAGBLroojP/zZ9pC1q4sFBPswGuru0YLzEL4BqqRYQYQD4Z0IjL1pnZmgTwDdUShLieGzthWpxx0NdbgrKK0vw+NFCZuMyHZ24eRKxBsB1kxVUG6YoBto9JcWny8BkIMYjtIOlDPF21GThV1b7E1Vm5ubrqEBABfciYuAXIICxIGarcttDtueuEuXYns93V/FzjP7YHAWXQN7W9EMRh9ryN/ZVJD0kGWwx4A5lDa+Y+vMkGAAAAAElFTkSuQmCC"

/***/ }),

/***/ 102:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAD1BMVEVHcEyXl5eXl5eYmJiXl5d57kt9AAAABXRSTlMA/TuLx0Mu1CkAAADzSURBVDjLtVRBEoMgDET0AUZ4AI4fEKcPKNP//6mAQi0ke+hMc8NNNksMq1SN7RHIvg7Vh/Z0hnEdFKiEdT1kD6f0FlowQaXR1oAr0V4PI9Gi7qddCUd/T8w05pNnG9WhFvovxjP7KtQfhluhu9ifHTZdCgIxIzwl6EZkkepy+c5gY260cpSRNLEFw2LepnYziw2x4ci2U/n7QI7FEp8gJYvxVsCiRm8ELAJhEbDVQky4XrrgX7BfdaK7o5mhWaN/hP4t2gm0S3AH0e6inUdvRXhjs/g2fZlI/6anmo68AHkI9B7kWamB6HXII6G3Qk/mvPwNbtghQj8VSvgAAAAASUVORK5CYII="

/***/ }),

/***/ 103:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAJ1BMVEXwYEVHcEzvX0XwYEXwYEX/KSHxYUX////96+fzeGH3qpv6wrbybVRZEEOsAAAAB3RSTlP/ADag0QFke9c/TAAAAWBJREFUOMt9lL1OhEAUhY+AFNIIytZQaM0mPgCJsRci1mjiM4zxBTYmW+wDWNgZn4DGwlJ9Kof5Y5iBeyoyX87eO3fvHKRa+eVVjej6sTEn0B9tBanwwmX3NbSipzlrJ8RhabOsgq2wtFiBuYKJbeDqwbDKY2Gj2Bl8bRXrF1gsWYYllYIViywQrFpk4chaYOVHkd6tsBvO+hUWp8hr9/D3W068gVfuhL2ogvCG8sHYQY4Gp56NsXfxdYzCtykWoPdtz7KZGJVve1WTgbrCm2U7qLVR7Id9uTbOpAZZxLYZ8bO9YzPaie4WbcKwd2y6l2R0/M1tmvFmGNvNq0X67qPRqRaamQ2C2U3GZtaJa+OzvoVlnN3taPpvE/duW0xbPTgjKdGZXUrmNr5L1g5+ujuYnhO7mxE73xFvJafeGPU2qTdNZkFOZAiZPVRm5VTWURmZd5v1bCUzOW1SneUmzP8BfFJtII+N4mUAAAAASUVORK5CYII="

/***/ }),

/***/ 104:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAA6JJREFUSEudlltsFGUUx//nW4pNq0JqhETRBC8E0kikD3gJRmKM2gegtjtTENid+kC4WLqzQICERxMhys7WChge7OwKYme2FeGhSAiRQFR4KEZDMF4gQSUBYyNKm0LZ79CZnY3bZTs72+9pd75z/r9zm7NLCHBikXCjENTCwCICHnFcGLhKwBkpuTeZzvSXkyE/g5imPCtA+wA8X0boOwlelzTt7yeymxC0SVObGDgAoPZ/Z/4JjJ/d74Q5AM0tEB4iYNVu0zpcClYSFIsoLwhBJwFU58rEfZwVO5Kf9lwsFImtbp1HIfkugZq95yNS8ivJtP1tMeweUHtj431VMx9wBGe7xowtiZT1gV/p4lF1MwjvezaXR6/9N6+rv/9Woc89oHhU3QhCp9fwjw3TWleu0c69rqn7CFjrBdeRSFkf+oM05SxACwH8y0M827DtwUAgRamjWroM4EGAzyVM+7kJQTGtaTpx1SAREQOfG6a1Iggkb6Nr6iEClrNzaLQuaR7+J383rnS6pjwz1tgf3EuJbYm0tasSUDyiboXATm+A5hum/WNJkDdt33h1fieRsvZUBIqqG0D4yI1T8ouF0zcuo/Zo65NVxL/mIpK7DDOzrRKQroV3EsRWx2eU6amuVM9vJTNSFCX0WC1dB1AH5vOJlN1QCSgeVQZAtADA4O9DPMO27WxJkPMwHlUPgLDSzYrl60YqczwITI+GXyMSX3llP5hIWat8x9vZb8QYcCePcUXeHlnYeejINT9Yx4qlM8XU6nNEeDw3cWgo3nslV5CuqXsIWO+IE/iXO1KGO9O9uWksOh2RlvlThMgw6Olcb7HXMK0NxXYlQZq2uLoOM44BeDlXQmRJwALLLyBCuaUqs3NA4k2WUIkQ8oRPDeL6G6b59UggkGO0ZsmSmvsfqvkE4NYgPQKo5+bfw2/vP3p0uJS97++R46C3tS4Dy+0EGrdS8mIMPgsS7xndPV/6BVQWlHfW32p+AlVT1hNhk9s7xm45emev8VnfpSAZlwWtUZRptTVylitG4lUCJXNN5xhYnnA+Dw2LP/bb9o1JZ6RHlEdJ0AUA08pEfYMl1xtp+8+J7HwzikdaFkCEBoKUBjLbkEj3np8UyHEaWytLAar3BOrzWwOMgwCcbJ1CXhhbV0cmXbpix5gWbhYQve5rBNmSNDN9gbJ1X/wKjt4WXkYs3H85TLLJ6M74jnShdEWg9jbl4alMpx2B28QvdXXbfwWN8y66hU4qvWMzIQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAA95JREFUSEutll9oHFUUxr/v7mariTTaWhdNwBSr0rxIwYIPWpNAH4piNHQm4p+dTVtLKJY4q1gEkfVJ1DK7qVahNG42qQnZTW0NKCoK6YugJcUHtYJJTRQFE7QmmpYmu/eYu9mUpO5uEuJ5mrlzzv3dOd85915iDXbwyaZqf5lvB0lVcJosAK0veCf6v+QaOIiE7WEAd5SaQ0QkC2xfI8gaBPjgcosl8NiaQNG6Ov+ft23cTKWUTymhyiih7x0I6hfD1wxaPFkUUFOO1QEybMYFmCCwyTz/byADmXTs4yRacnDBt1lKxAd+VhJ0wLJuCJRLo4/qYQ3cBZFbSEwJOAItX2R86HkrkZ7I/xEjYfs4gD3z7/LdpWymobwscCu0fFMU5Ibt1jnhogCCxUQWyCUARypR8eokpt8muHcBorKZhsPdp8Yje5rvKQhyLet6ViABsHkR4BdAzgG4KIIgwftA3LTwXSB/ENyYh3yfvXKlob134HfzXgxE17FSJHfnJ/laQx+Kd/YPLhG8rs4/WRPcTchrAGquAgXn9Yyvvr23Nwcx1vaUdbfPzx/mJZNdufJ2Q1YbFeO5QZGOyrGJ1ujgYKZY6lzL2sByngKxIy9+l5dMOdf6u4798lyKN0yvGznE58KP3kiUDZsUCOSTypr0Q9EodDHIwriJUxI4C2KL6X5R6t54os+kuaAxL/67EMzIbGZrrOeDC8tBFr5HHOsRkB/mNerwOtP7ioMc62OSu0AMeIlU40oheT+j7c8kqwH85nWmqoqCImH7p3lh6XqdfTmdVmNuuLmLkKdNjMrOBk1pF4o3zXYZwHXQ8rjXle5bDcT4Rhz7dRAvmmedZW28u+98YZBjT4C4WUT2xZLpjtWC3LB9lMCBXMVqqY51pX8tDGqxzkG4DYK4l0y5qwVFHPuMKXMBZitHx8uLtQUjjv0miBcAGVs/OrGlVP/8p09CVhXIMRI+EXweS6Z2Fi2GtnDTdh/8X+V2c8GzXjJ1dKV/FQnbJtW5zVRTPxNP9JvNtXAf5QQNW6cBNkJwWals/eHESQMuaa7T3EKKAZkFDv+zbqT22LGh2ZKg559oul0H/GdzB5VgGoJWryt1olBQ1LICUxV8ae4nXjEVbbRBVnbGutNnSq3s6lHeFrLuV+RHJNbPB8iQCN/XyAwp+i5CMwjKAyBDXNhQBRmB3h9L9ieWy8CSO8PBFqvWr9lPYutygRAZzyqG2hOpT5f1nT/Ol5q5cExtDu4Vkf0Q2UbyWp8RrXV3wD/jvfHewN8rgRifkrcgN2RViZI7FbCJ4F+zM3r0SM/JH1c6+WK/fwFbTn9Az25/EQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 107:
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

/***/ 108:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 112:
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

/***/ 114:
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

/***/ 115:
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

/***/ 118:
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

/***/ 1183:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/year24.067d643.png";

/***/ }),

/***/ 1184:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAACaBAMAAAAOfJbIAAAAMFBMVEVHcEz06df9++z9+uz9+u39+uyoWii4eU7r2MLky7KvZzjJl3PAiGDYs5XewKXPpIKeE+D6AAAABXRSTlMA/qF7OnavKf0AAAN6SURBVFjDzdhPTxNBFADwGvkCe1htm9jGA5/A+AE8+AHm8IC2tIQDb2H7LxzY8kdIeihZGkLCoWoNgXhwTYiJ8VA0AnoCim5iOBQUrZ4g6KE3MGiMzi4UGvfNGoigk3R7+GVmZ2fezrwdj4eX60AWj+eP2OyG8ihSxbYm2BbjBViuCJttbkNZhDfAnxR06NpVYFqfAAHYpiKLMKLhE9FzQguWQYxdcNZ4ZeFNToQdfECVHI1sWX35FXtojOAuQB5zJN62hpgZfSRqS9Z1tJtChgXrrzVN4eGsRuI0HjxPgm7WrtlO1gTDjiR/isS9+8dXB/qtiIhihcQQPs4GNCzRA3/PCmWN7hCwb4jlyFHV3yfby0d9rtslEjpK5xpg545tmXoZcGLoaKXoIVCVJG9RkqSJAoXBhUE19n0FlygMo/oiiDhE1mS+ODBJk4HCKVM1Z0zDLFO4znu6IeotyysS2zYSMokGDrBH2h7ZoS9pxRjv1vxks8bbeHCvpPlUJ8aU6bY4RECT950YVYDtgClPU7PC373oGmCWUYPQnoZwN/DHVAkMp2x8mMkQeKnTRnqRWu/V8ykdd3Q960TjXT0SEk7c9NVjaIhYMP5VxM/nXNDYOg1+ME0Tb5nmawrnDgdIJXG4WsXF6nsaS/Y9Y2eDUfXkvXVDKev14WTWK1EY6z++n3ONV3PtigiZkRxNCufzMuID8WTPYb8QowbiiExj0MCPGiqLWQLv8H0DQs/piPerz6y/mVeYJtaEQn1zmTy/iA+UXPBSCljRLlT6kYBY42w34tMMZkYymUG1vpw0osbrdIqSiDF+s4Iww9B1XZh+tPBmZRG28kVGiPUHIjE8Ozsrn+qejO9xwmYDtVpNWNNKybeEmDBdsAu0s8CDDrWKMTJrJEnslLQtHie9FAZ3gY9Qfd/4D7KaqIpo6NalQiFfxXWcnyeRv+0ceXRTqNRqHItFEq13SLcuBNqvn30h0g+Y+XlQ9sm0+XAxTpO4WpzGz8UpGsv6GN7Vx9Mnb3a4+gl/VDdoXOKfCDkrDTlpsxv87UX+GxbMJ2v82GzEKb7xrlg7r7lKJC5HWWrSiV6+1ExYSQ2V1bjes+E7SVCzKv+tuE2suSCqFSFCYDkhQp55hYyS6MigqRnyKeF5QpMcU8WHDTdBKwjxYsOEOA4bPOByTOF+wHEq/AWOZ93wrRhMDQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 1185:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAACaBAMAAAAOfJbIAAAAIVBMVEVHcEzy5tP+++39+u39+uyoWijTq4vky7LHlXCwaTq8f1bsrCN9AAAABHRSTlMA/o06ROgH9AAAAuBJREFUWMPNmN1q2zAUgLPlCQxKjXu30RcY7AUMqu31rrDjxr4bOGq7u4Cz0F3b6c9doRrz7gpxu/opJ8mJiddzBG3XMEEF4at0js6fjjUYqLHH0TEYvAyyEWDDsCGf0fANrzNyWxYCKfMD92ICvn/H/XpJQM79ScooGNVQUOfk+3DOafiZvzbcuVrkFAyUQTeO1Yd1sriCIxxGoOx/BgyFM21iXy5R2Jp4doRBH4ymBzEOW8ljDK5cHqT4SqPnAbqSSxNJHqoQn1zrubxGoadNF0CGwhB+MHcjLvq2PdOhLMeEy04B7qNu6d/OdpTU8tASCUGx1QDbOvQv1uMcc/Z6HGFhYl2pDBseEzI1PIifAUP7SleI01QIkWNwZ3WUAttWrSzHQsiMkDlTv+qMyJXJjQWWBQ6DRCuVrXOmD3ViBnq1RI6iz+/pcAcE7itP1Yddnvbh7JDvapFdUd+E5TI0SeSlCISsVAtHFcQInLDRvVILuuztGZ6HenbYtiP+IrdA+Sz4tWkaUH+/MViu4itB4Z0QsBAnOCyMzPAVoAqRIHm6tjboOI4LUzWjlfq6jVu8xid5lFLQl/EoJv25C3BDO7uEWxIGEuCOuJZ3JBxLSBdTBH4HtWmoLZE+hl7bh3x7WOdDL+3X4eNMtxfxoa3Gq/oj2sEQGHPZupuhvclV09Rp0yDQRJipOJi2IbdATkMhjmkIrcFxeHFpgTz6/6DPLNDLaZjKgoaQ0Nt6JlMI+ElpGzUSh6Hpz2BJ+tOfz7fb1fg6Tk5yIu21ESTRMerG2fwDVocc79bx4u6+6rewq8IYozCpKqgqicPCXMlRTFRqGtq3tSr0fJm/zEX38HSZ7tydw9ydTgl/+sBwf15WlTlnVf18DOuuEUWKsTtXA/Q0faLMl0G+YP8qqNMvFghJRkLu1mMK+ippZUF9vg/3Nr7THn3bD1nXUyCvAh95nZPwbRcgyGPDwPYS8QpPI38AbFuXuU53IRMAAAAASUVORK5CYII="

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAIVBMVEVHcEwiIiLr5NvPycGRkZFRT02Lh4LUzsW+ta/l5eX///92Ym5VAAAACnRSTlMAgHtsq4GAOSvj3hTt8AAAAbRJREFUSMell7FPg0AUxgkd6voqMLeQqmOFiK4d7UZNTRwrMa5EE3Vs6OA/oEtnF/krPYQj3j2O+xK/iSa/fo979+7dw3E0vSehUPLmDGsfpg8bos1tHl4OYEdxmlErP492Jm4cbumPgrAwcFFGivy4gDgTGTNOkBHnnrbUo+BU50Zz6tV6oYERGRSrnLs1gcFUyfQJGXW/gww1ywFDYYkZKpYJDSrpljIbBidyI8tsGPRl7JQsyrHIXWw3s4Ft7Geyqjk/czu4/q3sczt4XECv2L5kSYDOkCzKTM4QcKKv5e5DPl1/aqsZKSV2qJbNg1d9K6W20BZ9qL6ah5UKimW7yrusqsbSq+Q/Wk2dvfJbAvIPna6cF+qxZIb0qKexQZihSOQFcUtuSDesdmqIG4r6YUUmKG4oQLaDXg0u+R7yrV71GP4L7A8NL2aCpwdOOLyFcFHAZQYXLnwU4MMFH1e4AeAtBW5ScNuDGyncmvFmD18fY/RCgq84a+zu0rTF7q5h+GLHRwV4+MDHGXhAgkcufIjDx0KnBAdNMVqDoys+DMPjNT6w458A9fnBPipqvRo+U34A0LwbSo9tt9wAAAAASUVORK5CYII="

/***/ }),

/***/ 122:
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

/***/ 125:
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

/***/ 127:
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

/***/ 128:
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

/***/ 129:
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

/***/ 1291:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/btn_ling.7854d8f.png";

/***/ }),

/***/ 1292:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_1.ad8ade1.png";

/***/ }),

/***/ 1293:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_2.abb0e7b.png";

/***/ }),

/***/ 1294:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_3.e99e401.png";

/***/ }),

/***/ 1295:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_4.e2fe645.png";

/***/ }),

/***/ 1296:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_5.db29e16.png";

/***/ }),

/***/ 1297:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_6.d7f0e29.png";

/***/ }),

/***/ 1298:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_7.f13c5d0.png";

/***/ }),

/***/ 1299:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_8.fdcf133.png";

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_bazihehun.f916c01.png";

/***/ }),

/***/ 130:
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

/***/ 1300:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_9.8acd53d.png";

/***/ }),

/***/ 1301:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_4tag.950c82d.png";

/***/ }),

/***/ 1302:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_word3.45d6e0a.png";

/***/ }),

/***/ 1303:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/nianyun_btn_jiexiao.0e507ab.png";

/***/ }),

/***/ 1304:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1305:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_guiren.d381b68.png";

/***/ }),

/***/ 1306:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian.1ca8450.png";

/***/ }),

/***/ 1307:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_10@3x.b1aec85.png";

/***/ }),

/***/ 1308:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_11@3x.10c3049.png";

/***/ }),

/***/ 1309:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_12@3x.7c2f3ef.png";

/***/ }),

/***/ 131:
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

/***/ 1310:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_13@3x.5b8089a.png";

/***/ }),

/***/ 1311:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_14@3x.ea34394.png";

/***/ }),

/***/ 1312:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_1@3x.d430c7a.png";

/***/ }),

/***/ 1313:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_2@3x.1602bc5.png";

/***/ }),

/***/ 1314:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_3@3x.7775ea0.png";

/***/ }),

/***/ 1315:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_4@3x.6b19500.png";

/***/ }),

/***/ 1316:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_5@3x.a6f5208.png";

/***/ }),

/***/ 1317:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_6@3x.72daa96.png";

/***/ }),

/***/ 1318:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_7@3x.d11638e.png";

/***/ }),

/***/ 1319:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_8@3x.21c3413.png";

/***/ }),

/***/ 132:
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

/***/ 1320:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_9@3x.a1dc100.png";

/***/ }),

/***/ 1321:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/btn_ling.d1d9324.png";

/***/ }),

/***/ 1322:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_button3.a64f618.png";

/***/ }),

/***/ 133:
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

/***/ 134:
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

/***/ 135:
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

/***/ 1357:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAuRJREFUWEftmEtoE1EUhv9/0tiUuqhWVHwhIl2o+MgUWhVUtC7EhSIUXYitmrSdUhFB6kLwhW6KIKh02ibaVhAUoeBCXFhFwUcXTXzhQgU3VhEfpQtLU9LMkZk0JbXQBG6iWeTuZuae/3zz37nn3jtEihY8vHJ2VPPcB7BMI2rrO0L3UsVM97y9Tt9pCboAfHJbkR2+a+8Gp+vPVMla63QfBYF4P3liBMJbUsVM99z0ex8D3OyoEf7GjlAwLcAbx1cXjw555kYtmQztsmoInHJEiNcypu1RAWSB1QPBGgcQOIeY1p2s59YohSWR7wcuvhl2Up6pXjFjfklRiwCNANwqyTMYGyXQ+m1opJmmz3se5MkMimdOSuQCTb/+A8CczKlmVOmnDSgZlcywWB5Q1dC8g8oOBnwV81RFshmfcqnLZvJ0tHMf0PTroXTe5H/1yc9iVefzDuYdBDAgBawyzP4PCTfa69dVWjHtAYni8aPA1dKZhc3Vl15E7Os7x9Z7fv0ebQHY5OycBcOay9pe3/6yL6FhGuVlHJNeAIum3fKn3G4Juo1gqPZvEdPvfQZwQxxAyhuD4UnlqtXn1Un2j7/AcyMQ3jhFw6d3gahRAiQwqIH7heI4OBYTkqgkeT1xRCClR2Laac0lI3YfK8YiuqyzIkycX6IickgEfQUuOvtPCstisG4CnKUEqPqRq8bny0zeQVUHVOPT+gYJvALxcbym2Vu0tQCWJyW3618vCWcWi6AIQBUAT9YBCTxtCIQ2xf9UxFtn7VJPxF36HsCSeMmQfQ3B8O1kmDafd6+Qt7IOCMFdIxjaPaXI1ulvIVjl3BfZZgTDj5L7mD7vVpAP/wWggOgmMLHUCVABYNdEcsFnEp0AnKXOHloRHASxOPuAqhkU49OaJIo5lMLzgEr22RXC9OuW8+80N5vYgAMAFuYmH76wza8fEeByTgISR+2htSGbBDgBYEEODLe9Yn0F0WJ0hK78AYTYFNxReHiFAAAAAElFTkSuQmCC"

/***/ }),

/***/ 1358:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAX9JREFUSEtjZGBgYJiVaqb2j/FfOwPDfxeG/wx8IDGyASPDJwYGxj1M/5kq02afusUINpzhzwkGBkZBsg3FqvH/eyYGFgvGGWkmaxn+/w+iruFQ0xgZ1zHOSDP+SHGw4HIdI8Mnxhmpxv9p4nqYJ6hhATMLG8PfP7+wupNiH6hbujMYuEcwbJ1YzvDl/SsMSyiyAGS4bXQBAyMjE8OnN88ZtkwoZfj6/jWKJWRbgGw4yMQ3j24xbJ1cyfDr2xfKLSDWcJBNWH3AzMLKYBdbzHB571qGN49uo7iIFMOxWgAy3DWtnkFW25Th57fPDNsmV8ItIdVwrBbwi0kz+BX3M3Dw8INdDrNEWFoJHqHwMJ9UyfDrO2qYoycjrEEkJK3I4J3XCbfk149vDKzsHODUQorhOOMAJIFuCcxl4NRChMth6vEmU3RLSDUcrw9gLoBZ8uXdS5JcTpQPYIoEJeUZvn54SzBCsRVGZOdkYktgOlhA8wqH1lUmzSt9UGTRstkCAN512sE8T/ftAAAAAElFTkSuQmCC"

/***/ }),

/***/ 1359:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/switch-female.fab6994.png";

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1360:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/switch-male.4144fdc.png";

/***/ }),

/***/ 1361:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALhJREFUSEtjZGBgYOhtKFL7x/C/nZGBweU/AwMfSIxcwMjA8Ok/A8MeJgbGyuKGvluMUMNPMDAwCJJrKA5975kYGC0YuxsK1zIwMAQxMDBs+8fAml7e0PWEEos6G8pkmBh+z2RgYPBiYGBYx9jTUPgRFCz/GFhlKTUc5jCoJY9BwQXywX+QRGlDPyMlLkfXCzN31AKcoToaRAQT3GgQjQYRwRAgqGA0FREfRPSocGhbZdK80qd1swUAj3W2QXtmN/sAAAAASUVORK5CYII="

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_fan_bazihhehun.b3822e5.png";

/***/ }),

/***/ 140:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 142:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1420:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_1.3b82cfa.png";

/***/ }),

/***/ 1421:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_2.b71bc66.png";

/***/ }),

/***/ 1422:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_3.48c0c9c.png";

/***/ }),

/***/ 1423:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_4.516ae1a.png";

/***/ }),

/***/ 1424:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_5.ce495dc.png";

/***/ }),

/***/ 1425:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_6.2610ac2.png";

/***/ }),

/***/ 1426:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_7.e2be031.png";

/***/ }),

/***/ 1427:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_8.d17adbf.png";

/***/ }),

/***/ 1428:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_zhong_9.7a66644.png";

/***/ }),

/***/ 1429:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 143:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1430:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/img_4tag.bd4d48f.png";

/***/ }),

/***/ 1431:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/nianyun_btn_jiexiao_fanti.07ba678.png";

/***/ }),

/***/ 1432:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_1.a9ef696.png";

/***/ }),

/***/ 1433:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_10.95da400.png";

/***/ }),

/***/ 1434:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_11.be436d8.png";

/***/ }),

/***/ 1435:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_12.a85689b.png";

/***/ }),

/***/ 1436:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_13.5bf8128.png";

/***/ }),

/***/ 1437:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_14.ee7e557.png";

/***/ }),

/***/ 1438:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_2.f223ea0.png";

/***/ }),

/***/ 1439:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_3.028cac9.png";

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1440:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_4.9ad4cc5.png";

/***/ }),

/***/ 1441:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_5.e2a8e77.png";

/***/ }),

/***/ 1442:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_6.27289e5.png";

/***/ }),

/***/ 1443:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_7.a4e363b.png";

/***/ }),

/***/ 1444:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_8.3ece45b.png";

/***/ }),

/***/ 1445:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_nian_9.912f9d0.png";

/***/ }),

/***/ 1446:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_1.a68065a.png";

/***/ }),

/***/ 1447:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_2.47122aa.png";

/***/ }),

/***/ 1448:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_3.4f75c8e.png";

/***/ }),

/***/ 1449:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_4.f1d6957.png";

/***/ }),

/***/ 145:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1450:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_5.9c209e8.png";

/***/ }),

/***/ 1451:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_6.fdcd529.png";

/***/ }),

/***/ 1452:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_7.e73b4d4.png";

/***/ }),

/***/ 146:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAWlBMVEUAAABmZmZmZmZmZmZmZmZlZWVlZWVmZmZmZmZlZWVlZWVjY2NhYWFgYGBmZmb///+0tLT5+fmFhYX19fWOjo6pqant7e2mpqZtbW36+vra2trW1taxsbGCgoLezhSHAAAADnRSTlMAzNf468SkmGhYRCEVCBbLyBMAAADmSURBVDjLlZRbEoIwDEWTQgtauRUfgK/9b9MRCy0YKJ6vfpyZNHeSUIwtDedZlrMpLcnsNCL0TlD2CjPUfqZUBQSKKnYODBE+RI7CAmq0KsYiPFQssELh+8Iq3x4VVlF9hkjwSVVD4vW4n4bsiSwkTmfnGngslUuOq+EpySw57gqPIYan66bOMQRKuX+17tbKDnLK/KvuC0gOslFq/DeCE6Sx3KXureDE5RgTq/51wGQwsQQHZggzWMEJYVrEluTAEumJJTh6PiqXpzgq6aHbPr7pRUiv1OblTK95+mCkT8+/Ryx9Dt/4hThyBB2vcgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAP1BMVEUAAADGxsbJycnGxsbGxsbHx8fHx8fFxcXHx8fFxcXHx8fFxcXGxsbGxsbGxsbGxsbGxsbHx8fFxcXHx8fGxsZiOZ2uAAAAFHRSTlMA9gTWzKZkNyEXCevm28SYdWhYRGKkXAUAAADWSURBVDjLjZSHCsMwDEQleTs7vf//1obSFpNh7sAYzANZ66RV3oIfVAcftiy3sn1Go3m3K/NygIaYillJMSjgXiekLsAUa/MQJ2CpLVM8dLVT+FXhS8M4jEkuSiPcn6oe7jab7OB/EReMLdNSI5ZvXtAkD0qKT47msMqjVjg7rh2TPUM2YT+uGVE6iphFMrT2oKrIsiFIVwHbcWIfigjikfpQgpcBpQ8VDKKwPmRQCqLCUR+nSkAVk2oL02BqVKihY8aXWQRqpZjlZNacMQzOengTo+zwDbP9D0E4r4ZZAAAAAElFTkSuQmCC"

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/banner_ganqing_fang.f5b75a8.png";

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/home_img_logo.557612d.png";

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAJ1BMVEX///9HcEz///////////////////83Q4rR1OSepMZFUZI+SY5pcqh0E2PnAAAAB3RSTlP/AFfTx54biMdLeQAAAOVJREFUKM9tkj0OwjAMhZ/6g7oWUWYQiLlCgrnlBFRcgJ9DRKgLK3TpBiMbK1vFHTgUiZsmKfIb3PrTk+M4Rkw67uCvFu0/KM5B2lg0g9ayQwmMihaNM4uCA6ETHK0JZS4KFErQUyHRpI88idI+8mMM8acpRjaJvhcZc+wtuomnjAPY6tFLvFV9bB2TqOUnROqYznQkZfePNWk1ZW1MWipzTKpWJcqHMfmEokaUxuS3TVRCmEph26q0mUqevlBljxvoa0eN6SnvhnN1hsOMkBs08xzMo3FPyywAsybcMnErR4uJbjF/Y7Y1OZ/qIf4AAAAASUVORK5CYII="

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMBAMAAACdPPCPAAAAD1BMVEWNlcSLlcGNlMVHcEyNlcMQ3UCzAAAABXRSTlP+GVgA1hVh+HEAAABMSURBVAjXLcjRCYBAEAPR4bABWQtYtIK9bUDB/msyOcxHGB4V7VWQY1UOkksxGRwYk4e6hZMtaKOoaeEpUgkRuYQil1C0qt74q3ffB23fD3p2GpbWAAAAAElFTkSuQmCC"

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAFVBMVEW7noNHcEy7noO7n4O4noC8noK7noPFiELJAAAAB3RSTlP8ANRmGTuhGhYvCgAAALdJREFUKM9tkksSwiAQRFuiWYshWWP5WQdL9yZewMQLBO9/CAkJZUa7q/g9BgpmGjrq8QbO12mO2F8QdfiiHvmtMa8Bp4SqeTsE+wkZm+lZtWoialWXUGmPEY1DUqtGVI3BScb6gJ4bvVBYQVu3RIXSCE3IOuwyieo97iuJtmvUXqIqw+AkKnLYTqJSAY1EJiRJ/4ij/4PkevII8lTyIfJtkhySQpZoUg5SNFZaYgBiE2YmZjlpzA/FjzWpQABVlAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAJ1BMVEVHcEz/egD/ewD/egD/egD/eQD/egD/eQD/egD9+er+lzX+uHL94sA73hnTAAAACHRSTlMAzg7yYDKYpFfRdSQAAADlSURBVCjPY2AAg5BC42ZxVwYk4NgBBiIIkcAOKBCFiah1wEESRIRJAiHUqAAWUuxAAkLoiqDK2DpQQAJQKAJVqBUoJIEq1MjAwNKBBhwYGBGcrjMrgKQAslErZ54Akk0MHghFM2fOAFItDBVIimbuAFLtCAuBimZDrLQAkjtnIxR1NIOFQByYIqjQSSAPpqijAywE5O6CKQKqkoCYPBOuqBHiCKAymCKgIzygDoApAjo1AurM2YjQYYS6E6YI6G1o4KxGChwsQYgtoLFEB5ZIwxK12BIAlmSCLTFhS3KghGlhDEuYAEF3D9MyjUXbAAAAAElFTkSuQmCC"

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAkCAMAAABvyu7iAAAANlBMVEVHcEz/BQj/T3f/V4f/DRb/DBT/Dxj/Nlf+S3f/XJH/LEP/2Yn+X5b/Gij/QF/+ZqH/q3n/e2tCWK5wAAAACnRSTlMA////qGz/G1uoaCu0HwAAArxJREFUWMO9V4uyqyAMpGrRYqHh/3/25kEg4GPmzNw2IIaw2Q3odKpzYuv2+nzZXtvqrK1fVyy6RnZ7f4Z2CPxp+RxA/bM1zR/aZjTnvo/z/7csqutM9tY+63gSaqMuvI9rb5s6cPAaPdfX/GN76UZ/aqvbJmtzd7PBNkyY18NOswxuWNrciyNCmfddnH2HGgSJTQC5JO37Xslgz5V11oX5EscrL2dLgALDO5gY+1hQ4S9kOQPhS52TFZ3ucROKJm64mGkR6o0kEqfmKp6EDISSDQ+A8xPXJV7FpQ6nSy6p6H4w4uEqAcotc3FURp4kkEt6ogFDSpfOcAp1qdipaMp9BFok82zi1DKwqNoJro6u+bj9zBsGcbOkyjbL2IoTss74SYjd4tpOD3vVeuUhl5Fg5QVpCtOBwODSEWdF87nocLxocm/RrAxD8iXOhRRK5wcP+OrgwHkYzPwa7PIyEQnGuHboyAK3VAiw3eKCC+pxZQCiSqIUG48Xq8u5PqvygiYtHGdMhZbucC5UG4/3JAYtQmQkA5ybWIdEeZJucNiNKK2U04EL0SzbISfzTMmUYO8mF7jQ7xTKe5ZVtK7kNsm641vRG9ywU2sUOv5gpFAYgP0b0WscikZt8raJEX08Ew2IZAYRIJeSD6LxHCfNiA7HS1RQa1AvRCZjcHGl3PFEznCUTB1F1cbjrQuUmdUPXEIEDjEZ346iJzhVdcsfRYkGZxiKVlR+QNoVznDFFvesfjDUYEU9PulkJwQLjMVj56AOel3gxJ5ubRPvrW/yjcsLEvBRmvTq1+b9gCvYiP9BF68W7T36Q7xMYo0OXjRXQ8aRa6E/2x3n9y3yR9T2U81H+Zh5+scD+4PH2h81eh0fAD3WmOfG/Vk/23zHMOD7uB8X+hr8mNnn+818FC+Pn9gyfIs/F/9dQb88VfIfuuCRPaiDitgAAAAASUVORK5CYII="

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAGCAYAAACclRsMAAAAAXNSR0IArs4c6QAAARdJREFUeF7t2dsKgzAQhOHs+z+uiIhgChWhSRMIoqUXX+96gJTfndnZTUzTlJMXAggggAACCCCAAAII/DWBmOdZcP/rR+TPIYAAAggggAACCCCQUizL8hXcI+LNJufjq/P9Cez8/CmAzsdf/dEf/+G/+o/+K38ceUD+OgjInznFuq7djfuoYOqgfVegd/6YYPEvBx31dw8B+qO/kcDAf/jPE4GK//Af/tMe2GLbtlwLZLTt1xuxehIa3Zw7vxQo/mME1F+5kaW/cgfBf8Zu7vgv/x1z3PJX/Jf/ft6I6T+/6z+x73t34967kuhNwlcbQM80nN9+NPi3NxHq71oAob82Af7Df1qVwX/5b2sTrP/oP1cG4Cv99wW40NWVd1AvSQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAlxJREFUSEvNl01rE1EUht8zSRuNJoIKSnFnUKimcfxYRSWK0zhBRHHlbxCX/gB/g4qLbsSVEKjfCWQMRrB0JVNLFeNCRPwqFYraJMQk80oSquTDNDdpTWd733Oec957ufeMYECfDIiLtuCAGfC4hnYMV4vKLTjlj9PThYBpenyoPAV4uLlYijhCTthJ63J1bTQS2Vzxl2q5s56RPOLxSnNMA/hQ9ORBx+W6BUjwr5CTdsK6EIydCrqhzf7LIQKLM4nU1uq6HjMWANle05IlCu66XKVLLx5mvi3HN4APxMafCxBuSE58Xiz82v0+kynqMeMmIC0dA3Qc8vbL5JProWh0n+biXEuB5B07aV1sB9Z0c7wIgbvFSsACnBuAlu90JsTBNmi8Csielhzk0kzS8rWA954N+7zlTT/W8rDlv+f82ampn1XGH6v/C9id82cfrHcwwbgQb1S2gCK6AGeaY/Jdd0yyWCj5X2cySypg3TBGMCSfegfXI58B/KACBiQEYKxfsBqzg7p7q1cNWU+kBibTgLxVqYFgUESO9mM1K2X4ZlOpnAp4NBbZ6cHwl37AIHBPIO9UwACPADjWF1gN2FmttserSFYBl0FMAOz68WD9/jdERO/dauKVnUztV206dNo4r2ky2Tu4OkAAjwT8qgIncFzavMkqVqvwVtSuM3A47PNuWeMJpN2zWJ1GdNPIQ2TDip71IiBLdtLaCKA26jZMmbppPIZIrJe8XcTctxOpc8u6BvCYGdmlYfiaACcAertI1lFCEQoxD2GmVHSuzKXT823B/YJU4gf27/Qb4EdILpANSkYAAAAASUVORK5CYII="

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAl9JREFUSEvt1c9rE1EQB/DvZKVBKp49BHoRxaVIUhSJ4EXM1sSDKAqCNz3YHryJB716EAqCh4Ii4h+g4iH0ad5WKEGMPwibJqZipQpSFC8RwVar3R1NmqSJ2R/JdnPrO+4y83k7b3YeweeKxONbF3O5nz7DQX4CY0ltHOCbFuHirNBv+8nRM1xFGTxJRARmBtEVQ8jrveI9wW1oi8TAREHIy73gXcNOaAOzgLuzQl4AYHazga5gL7QJMR6sbFs8O3d/7rcX7gl3jdYlZkjLxMmilEtuuCvcK9ry5bnV0PKx0tSzb064I+wbXddLv8zQ6NtM5osdbgtvHG1SC+YqEkUpP/6Pd8ABomsW47NpYrQo5ZtWvA0OHF1vuIpFSBWFfNnAm3C/0AbEzD8oZJ0wpp5OV5/V4GjqyHEwPaqNwT4uBlZgWUcLT6Zn6nAiSqCxf6NvkIAzALYE7TPzDIi+m8CNkpDZzuZKaa8B7AsW5k+G0Iccm2ut7NoLAg4EC+O9IeSuTbitql6lZsAiwABQm8MMbCdgxKMhgyg1nTJE5mHrbkeS2mGLoBMQcuiNjcEM/loQ+g675LFUogyQ2hcYwIIh5E5bOJl4BaL9m3C9At5nHEtpWQCHHErmr9SMsvFYDrsPkKR2jQhX7WAGzxeEvtv+jLXnIMTtN8y3DKGPu8J7NW1QUZAF1f7NtsXgewWhn7NLHk1qE0S41BmDd39MOljOZCqucPWlqqoD4aHIeSZrmEBKdU4w6IOihCfz6fSyHayeVgfCS5ExMO8BgRhkAjyvKJU7+XS+I6av96/bRfMXGNMoLpD5my8AAAAASUVORK5CYII="

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_close.3e73550.png";

/***/ }),

/***/ 1603:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(952)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(816),
  /* template */
  __webpack_require__(1669),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7f2768af",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1604:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(911)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(817),
  /* template */
  __webpack_require__(1628),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-304d9016",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1605:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(904)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(819),
  /* template */
  __webpack_require__(1622),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-24da1943",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1606:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(940)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(820),
  /* template */
  __webpack_require__(1657),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6fdac178",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1607:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(954)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(821),
  /* template */
  __webpack_require__(1671),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8726ce7e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 161:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAkCAMAAABvyu7iAAAAM1BMVEX/Nlf/Dxj/Gij/2or+Ypr/VoX/BQj/OFj/XJH/DRb/KkH/THb/jHP/OlX+Q2b/voD/ZWFp1oqtAAAACnRSTlME////////YKiogdhEJQAAAshJREFUWMPFV1mCqyAQRAjj2IJw/9O+3pBNMl/JKxGxqa4CXBKNUey/rw/jdzc9Pu6ovo3l/voa9v/gebuip8ftC/DV9eW/ihffQ9QY4lNjJfBH+PUUprvJfx14Rf3Jm+eday5anSVeuyut7W7Tq97pm2bZdvN7VoTkPB29S8lL5BWoeB8QWHHQuaQJGE/hTvcppUZtyfs1LSs55/SYSh4jBG00YjiKxDFf0nMhdKYz70TTiwt1Bta/D5JHp7KnzlSH4WgKFyv4R9OWV0wvTODiJuTrIrLOlIeL4jqmzDohYyrnIyh0FTzyFOYmzabISwKcpUCUeUSodbVK19mZdrwBprIEdD21SdHQIb8Vo3HnwNtfpjFiQVw5JVlDR8d0UkceFpxomYd1yapROaOIVHJa8KIwjRj2OcUAOzgl6f0ksSiilRmioDN9w1PTkpPKOtLVUVOH15N6qL5NQ1qYav5bHpkCFVibDrPP4b5WZQWJCUJWWVjyqM8ARN2G5Y2AiMzGOQauM0B5TdCTy90kAFyRgJxgveLRwZQm57Qzlek7fVJ1pqBDy7QuKhaLHJFBJgFwPfOYaQCWpqrTLi+G6HFPPOOsMyhQU8WaN5hOywv8wAZeXoQQWUEW+43pmgfGggUqYKeZWugWlxtEZQUx4KZ9NLUjz0LxMtq2Vm8agcjb+dVIROTxCLVpx4vA6zTzio8l04I8pVl9qSV+c/NmgZ9aS6tWTO2T6QOPrcjWHLdpnOZUEDiznrhAtb1NIU2ITzzFYfZqir8mVseDadV0w7dRNc0p0EnMwgt2gTUP/4Te0s1OFZey2e1uN/HKG8qKKA38N3hsA6zufdsO+5jR1T3J9qyD/viOEh+Glc+K75qWj5ntR7Za6nFsc4sDM3lI3NqOEqufbVWyUW7Ey9lWtR/Jg9+surUfxsfPV3AM3+L7sX3WcDvuWf4DKUxnz0pfJmYAAAAASUVORK5CYII="

/***/ }),

/***/ 1622:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.is_channel_01) ? _c('NavigationBar') : _vm._e(), _vm._v(" "), _c('div', {
    class: {
      container: true,
      'fix-box': _vm.choose_time ? true : false,
      'cn-bg': _vm.is_cn,
      'tw-bg': !_vm.is_cn,
    }
  }, [(_vm.has_pay) ? _c('header-notice') : _vm._e(), _vm._v(" "), (!_vm.is_channel_01) ? _c('img', {
    staticClass: "order-icon",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_history_order : _vm.tw_history_order,
      "alt": ""
    },
    on: {
      "click": _vm.toOrder
    }
  }) : _vm._e(), _vm._v(" "), _c('canvas', {
    staticClass: "canvas-bg",
    attrs: {
      "id": "canvas1"
    }
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "info"
  }, [_c('div', {
    staticClass: "info-content"
  }, [_c('div', {
    staticClass: "info-name"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("姓名")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.username),
      expression: "username"
    }],
    staticClass: "info-input",
    attrs: {
      "id": "username",
      "type": "text",
      "placeholder": _vm.$t('name-placeholder')
    },
    domProps: {
      "value": (_vm.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.username = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.sex == '1') ? _c('img', {
    ref: "sex_male",
    staticClass: "sex",
    attrs: {
      "src": __webpack_require__(1360)
    },
    on: {
      "click": function($event) {
        return _vm.changeSex(0)
      }
    }
  }) : _c('img', {
    ref: "sex_female",
    staticClass: "sex",
    attrs: {
      "src": __webpack_require__(1359)
    },
    on: {
      "click": function($event) {
        return _vm.changeSex(1)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "info-time"
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("生辰")]), _vm._v(" "), _c('div', {
    staticClass: "info-input",
    style: ({
      color: _vm.picker_date ? '#3c2f22' : 'rgba(60, 47, 34, 0.5)',
    }),
    on: {
      "click": _vm.openPicker
    }
  }, [_vm._v("\n            " + _vm._s(_vm.picker_date || _vm.$t('birth-placeholder')) + "\n          ")]), _vm._v(" "), _c('img', {
    staticClass: "calendar",
    attrs: {
      "src": __webpack_require__(1357)
    },
    on: {
      "click": _vm.openPicker
    }
  })]), _vm._v(" "), _c('img', {
    staticClass: "info-btn huxi-btn",
    attrs: {
      "id": "info-btn",
      "src": _vm.pay_btn_img
    },
    on: {
      "click": _vm.check
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "info-bottom"
  }, [(_vm.privacyChecked) ? _c('img', {
    staticClass: "check",
    attrs: {
      "src": __webpack_require__(1358)
    },
    on: {
      "click": function($event) {
        _vm.privacyChecked = !_vm.privacyChecked
      }
    }
  }) : _c('img', {
    staticClass: "check",
    attrs: {
      "src": __webpack_require__(1361)
    },
    on: {
      "click": function($event) {
        _vm.privacyChecked = !_vm.privacyChecked
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('agree-label')))]), _vm._v(" "), _c('span', {
    staticClass: "link",
    on: {
      "click": function($event) {
        return _vm.toPrivacy('user_agreement.html')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('user-agreement')))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('and')))]), _vm._v(" "), _c('span', {
    staticClass: "link",
    on: {
      "click": function($event) {
        return _vm.toPrivacy('privacy.html')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('privacy-policy')))])])])]), _vm._v(" "), _c('div', {
    staticClass: "card-1",
    style: (("background-image:url(" + (_vm.is_cn ? _vm.cn_card_1 : _vm.tw_card_1) + ")"))
  }, [_c('canvas', {
    staticClass: "canvas-card",
    attrs: {
      "id": "canvas3"
    }
  })]), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_3 : _vm.tw_card_3
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_2 : _vm.tw_card_2
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_4 : _vm.tw_card_4
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card last-card",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_5 : _vm.tw_card_5
    }
  }), _vm._v(" "), (_vm.showFixedBtn) ? _c('img', {
    staticClass: "fix-btn fix-box huxi-btn",
    attrs: {
      "src": _vm.pay_btn_img
    },
    on: {
      "click": _vm.check
    }
  }) : _vm._e(), _vm._v(" "), _c('DatetimePicker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.choose_time && !_vm.show_nongli),
      expression: "choose_time && !show_nongli"
    }],
    attrs: {
      "start": "1960",
      "end": "2000",
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
      "start": "1960",
      "end": "2000",
      "year": _vm.year,
      "month": _vm.month,
      "date": _vm.date,
      "birth_hour": _vm.birth_hour
    }
  }), _vm._v(" "), (_vm.showFixedBtn) ? _c('HomeFooter', {
    attrs: {
      "product_key": "h5_annual2024"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.is_show_notice) ? _c('PopNotice', {
    attrs: {
      "count_down": _vm.count_down,
      "product_key": _vm.product_key,
      "e_id": "10003",
      "c_id": "-10014",
      "c_name": "click_2024report_discount1"
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
      "product_key": "h5_annual2024"
    }
  }) : _vm._e()], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bar"
  }, [_c('canvas', {
    staticClass: "canvas-tag",
    attrs: {
      "id": "canvas2"
    }
  })])
}]}

/***/ }),

/***/ 1628:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: {
      detail: true,
      'hidden-scroll': _vm.pay_modal
    }
  }, [_c('div', {
    staticClass: "pay-box"
  }, [_c('UserInfo', {
    attrs: {
      "username": _vm.username,
      "sex": _vm.sex,
      "gongli_nongli": _vm.gongli_nongli,
      "picker_date_yangli": _vm.picker_date_yangli,
      "picker_date_nongli": _vm.picker_date_nongli,
      "gan": _vm.gan,
      "zhi": _vm.zhi,
      "nayin": _vm.nayin,
      "is_result": false,
      "score": [10, 30, 40, 35, 30, 60, 70, 68, 60, 78, 85, 100]
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "get-report-btn",
    attrs: {
      "id": "info-btn"
    },
    on: {
      "click": _vm.showPayModal
    }
  }, [_c('img', {
    staticClass: "huxi-btn",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_pay_btn : _vm.tw_pay_btn,
      "alt": ""
    }
  })])], 1), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_1 : _vm.tw_card_1,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_2 : _vm.tw_card_2,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_3 : _vm.tw_card_3,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_4 : _vm.tw_card_4,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_5 : _vm.tw_card_5,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_6 : _vm.tw_card_6,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_7 : _vm.tw_card_7,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_8 : _vm.tw_card_8,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "card-bg",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_card_9 : _vm.tw_card_9,
      "alt": ""
    }
  }), _vm._v(" "), (_vm.showFixedBtn) ? _c('div', {
    staticClass: "get-report-btn fix-box",
    on: {
      "click": _vm.showPayModal
    }
  }, [_c('img', {
    staticClass: "huxi-btn",
    attrs: {
      "src": _vm.is_cn ? _vm.cn_pay_btn : _vm.tw_pay_btn,
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "footer"
  }), _vm._v(" "), _c('payModal', {
    attrs: {
      "product_key": _vm.product_key,
      "bg": _vm.modal_bg,
      "query_user_string": _vm.query_user_string,
      "title": _vm.username_title,
      "e_view_id": "10003",
      "c_view_id": "-10005",
      "e_view_name": "view_2024report_pay",
      "a_view_token": "t57k8s",
      "c_click_id": "-10006",
      "e_click_name": "click_2024report_pay",
      "a_click_token": "pil6oj"
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
  }), _vm._v(" "), (_vm.showFixedBtn) ? _c('NewFooter', {
    attrs: {
      "product_key": "h5_annual2024"
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 164:
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

/***/ 165:
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

/***/ 1654:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: {
      'user-info': true
    }
  }, [_c('div', {
    staticClass: "title"
  }, [_c('img', {
    attrs: {
      "src": _vm.language == 'zh-CN' ? _vm.cn_title_1 : _vm.tw_title_1,
      "alt": ""
    }
  })]), _vm._v(" "), _c('img', {
    staticClass: "title-2",
    attrs: {
      "src": _vm.language == 'zh-CN' ? _vm.cn_title_2 : _vm.tw_title_2,
      "alt": ""
    }
  }), _vm._v(" "), _c('BaziTable', {
    attrs: {
      "sex": _vm.sex,
      "is_result": _vm.is_result,
      "username": _vm.username,
      "gongli_nongli": _vm.gongli_nongli,
      "picker_date_yangli": _vm.picker_date_yangli,
      "picker_date_nongli": _vm.picker_date_nongli,
      "gan": _vm.gan,
      "zhi": _vm.zhi,
      "nayin": _vm.nayin,
      "cai_bo_num": _vm.cai_bo_num,
      "gui_ren_num": _vm.gui_ren_num,
      "hun_yin_num": _vm.hun_yin_num,
      "ming_ge": _vm.ming_ge,
      "riyuanqiangruo": _vm.riyuanqiangruo,
      "shi_ye_num": _vm.shi_ye_num,
      "wuxingqiang": _vm.wuxingqiang,
      "change_color": false
    }
  }), _vm._v(" "), (!_vm.is_result) ? _c('div', {
    staticClass: "graph-box"
  }, [_c('div', {
    staticClass: "mock-box"
  }), _vm._v(" "), _c('div', {
    staticClass: "tag-1 com-text shiye",
    attrs: {
      "id": "shiye"
    }
  }, [_vm._v(_vm._s(_vm.$t('tips-1')))]), _vm._v(" "), _c('div', {
    staticClass: "tag-1 com-text jiankang",
    attrs: {
      "id": "jiankang"
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('tips-2')) + "\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "tag-2 com-text haoyun",
    attrs: {
      "id": "haoyun"
    }
  }, [_vm._v(_vm._s(_vm.$t('tips-3')))]), _vm._v(" "), _c('div', {
    staticClass: "echarts",
    attrs: {
      "id": "echarts"
    }
  })]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1657:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ("content-item " + ([1, 4, 9].includes(_vm.item_index) ? 'item-1-bg' : 'item-normal-bg'))
  }, [_c('img', {
    staticClass: "title-box",
    attrs: {
      "src": _vm.item_index === 4 ? _vm.getGoldYear(_vm.result.gold2024) : _vm.titleImg,
      "alt": ""
    }
  }), _vm._v(" "), (_vm.item_index === 2) ? _c('div', {
    staticClass: "content-2"
  }, [_c('div', {
    staticClass: "item-box"
  }, [_c('div', {
    staticClass: "tip"
  }, [_vm._v(_vm._s(_vm.$t('kaiyun-label')))]), _vm._v(" "), _c('img', {
    staticClass: "baoshi",
    attrs: {
      "src": _vm.getDirection(_vm.result.guide2024direction),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_vm._v(_vm._s(_vm.result.guide2024direction))])]), _vm._v(" "), _c('div', {
    staticClass: "item-box"
  }, [_c('div', {
    staticClass: "tip"
  }, [_vm._v(_vm._s(_vm.$t('lucky-color')))]), _vm._v(" "), _c('div', {
    staticClass: "lucky-color",
    style: (_vm.getColor(_vm.result.guide2024color))
  }), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_vm._v("\n        " + _vm._s(_vm.result.guide2024color) + "\n      ")])]), _vm._v(" "), (_vm.baoshi_icon) ? _c('div', {
    staticClass: "item-box"
  }, [_c('div', {
    staticClass: "tip"
  }, [_vm._v(_vm._s(_vm.$t('lucky-treasure')))]), _vm._v(" "), _c('img', {
    staticClass: "baoshi",
    attrs: {
      "src": _vm.baoshi_icon,
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "desc"
  }, [_vm._v("\n        " + _vm._s(_vm.result.guide2024decoration) + "\n      ")])]) : _vm._e()]) : (_vm.item_index === 3) ? _c('div', {
    staticClass: "content",
    domProps: {
      "innerHTML": _vm._s(_vm.result)
    }
  }) : (_vm.item_index === 1) ? _c('div', {
    staticClass: "content",
    domProps: {
      "innerHTML": _vm._s(_vm.result)
    }
  }) : (_vm.item_index === 4) ? _c('div', {
    staticClass: "content-4 content"
  }, [_c('div', {
    staticClass: "year-title"
  }, [_vm._v("今年是你的" + _vm._s(_vm.result.gold2024) + "之年")]), _vm._v(" "), _c('div', [_vm._v("\n      " + _vm._s(_vm.result.gold2024content) + "\n    ")]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.result.whole2024))])]) : (_vm.item_index === 9) ? _c('div', {
    staticClass: "content-tu"
  }, [_c('div', {
    staticClass: "echarts",
    attrs: {
      "id": "echarts"
    }
  }), _vm._v(" "), (_vm.content_arr.length) ? _vm._l((_vm.content_arr), function(it, k) {
    return _c('div', {
      key: 'score' + k,
      staticClass: "content-score"
    }, [_vm._v("\n        " + _vm._s(it) + "\n      ")])
  }) : _vm._e()], 2) : _c('div', {
    staticClass: "content"
  }, [_vm._v("\n    " + _vm._s(_vm.result) + "\n  ")])])
},staticRenderFns: []}

/***/ }),

/***/ 166:
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

/***/ 1669:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "analyze"
  }, [_c('div', {
    staticClass: "title",
    style: (("height:" + _vm.height + "rem;"))
  }, [_c('img', {
    style: (("width:" + _vm.width + "rem;")),
    attrs: {
      "src": _vm.title,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_vm._v("\n    专业兴趣上，我比较喜欢贸易类的，尽管自我主修的是数学，但我就是对这个专业知识充满兴趣，我认为此专业能够让我接触到更多的人与事情。在《职业生涯规划》的课程中，我做过一次人格分析和职业分析，鉴于测评结果，我的优势职业类型为企业型，创业型。我认为这很贴合我的专业需要。\n    "), _c('div', {
    staticClass: "boli-box"
  }, [_c('img', {
    staticClass: "lock",
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/240478e834eef7774dbb9b8c7be56e7c7ef9.png",
      "alt": ""
    }
  }), _vm._v(" "), _vm._l((_vm.topic), function(item, key) {
    return _c('div', {
      key: key,
      staticClass: "topic"
    }, [_vm._v("\n        " + _vm._s(item) + "\n      ")])
  })], 2)])])
},staticRenderFns: []}

/***/ }),

/***/ 167:
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

/***/ 1671:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['result']
  }, [_c('div', {
    staticClass: "pay-box"
  }, [_c('UserInfo', {
    attrs: {
      "username": _vm.username,
      "sex": _vm.sex,
      "gongli_nongli": _vm.gongli_nongli,
      "picker_date_yangli": _vm.picker_date_yangli,
      "picker_date_nongli": _vm.picker_date_nongli,
      "gan": _vm.gan,
      "zhi": _vm.zhi,
      "nayin": _vm.nayin,
      "cai_bo_num": _vm.cai_bo_num,
      "gui_ren_num": _vm.gui_ren_num,
      "hun_yin_num": _vm.hun_yin_num,
      "ming_ge": _vm.ming_ge,
      "riyuanqiangruo": _vm.riyuanqiangruo,
      "shi_ye_num": _vm.shi_ye_num,
      "wuxingqiang": _vm.wuxingqiang,
      "is_result": true
    }
  })], 1), _vm._v(" "), (_vm.fortune.review2023) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.review2023,
      "item_index": 1
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.whole) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.whole,
      "item_index": 1
    }
  }) : _vm._e(), _vm._v(" "), (_vm.advice) ? _c('contentDetail', {
    attrs: {
      "result": _vm.advice,
      "baoshi_icon": _vm.baoshi_icon,
      "item_index": 2
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.taisui2024) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.taisui2024,
      "item_index": 3
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.gold2024) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune,
      "item_index": 4
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.career2024) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.career2024,
      "item_index": 5
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.wealth2024) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.wealth2024,
      "item_index": 6
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.emotion2024) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.emotion2024,
      "item_index": 7
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.health2024) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.health2024,
      "item_index": 8
    }
  }) : _vm._e(), _vm._v(" "), (_vm.fortune.scores2024) ? _c('contentDetail', {
    attrs: {
      "result": _vm.fortune.scores2024,
      "content_arr": _vm.fortune.scores2024content,
      "item_index": 9
    }
  }) : _vm._e(), _vm._v(" "), _c('CopyCode', {
    attrs: {
      "set_title": true,
      "title_icon": "https://psychicai-static.psychicai.pro/imgs/24044ccbe8a8dcea4ff3b56f8b525ba1f351.png",
      "title_icon_style": "width:4.2rem;height: .8rem;margin:.29rem auto .5rem;",
      "className": "year-box",
      "tips1_color": "#222",
      "code_color": "#EE5050",
      "transfer_code": _vm.fortune.transfer_code,
      "codeClass": "year-code",
      "code_btn": _vm.is_cn ? _vm.cn_code_btn : _vm.tw_code_btn,
      "code_text_style": "margin:.3rem auto .39rem;color:#6E6E6E",
      "tips5_style": "width: 5.19rem;height: 1.03rem;margin-bottom: .3rem;",
      "a_token": "qncisx",
      "e_id": "10003",
      "c_id": "-10010",
      "e_name": "click_2024report_result"
    },
    on: {
      "showModal": function($event) {
        _vm.code_modal = true
      }
    }
  }), _vm._v(" "), (_vm.code_modal) ? _c('CodePop', {
    on: {
      "close": function($event) {
        _vm.code_modal = false
      }
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 168:
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

/***/ 1684:
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

/***/ 169:
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

/***/ 170:
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

/***/ 171:
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

/***/ 172:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header-notice"
  }, [_vm._v(_vm._s(_vm.tips))])
},staticRenderFns: []}

/***/ }),

/***/ 173:
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

/***/ 174:
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

/***/ 175:
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

/***/ 176:
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

/***/ 177:
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

/***/ 178:
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

/***/ 179:
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

/***/ 180:
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

/***/ 186:
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
      language: _utils2.default.getLanguage('language')
    };
  },

  props: {
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
    // 起始时间不能大于结束时间
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
    // 展示农历
    showNongli: function showNongli() {
      this.$parent.show_nongli = true;
    },

    // 关闭
    cancel: function cancel() {
      this.$parent.closePicker();
    },

    // 提交
    submit: function submit() {
      var selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour')
      };

      var timestamp = selected.year + '年' + selected.month + '月' + selected.date + '日' + ' ' + _utils2.default.formateNongliHour(selected.birth_hour);
      this.$parent.picker_date = timestamp;
      this.$parent.picker_date_obj = selected;
      this.$parent.gongli_nongli = '1';
      // 关闭
      this.$parent.closePicker();
    },


    // 返回选择的时间对象
    getPickerDateObj: function getPickerDateObj() {
      return {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour')
      };
    },


    // 返回选择的时间
    getPickerDate: function getPickerDate() {
      var selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour')
      };
      console.log('this.getValue("hour")', this.getValue('hour'));
      return selected.year + '年' + selected.month + '月' + selected.date + '日' + ' ' + _utils2.default.formateNongliHour(selected.birth_hour);
    },


    // 获取值
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

/***/ 187:
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

/***/ 188:
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

/***/ 189:
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

var month_name = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月'];
var _language = _utils2.default.getLanguage('language');
month_name.push(_language === 'zh-CN' ? '腊月' : '臘月');

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
        return month;
      }(),
      sele_month: new Date().getMonth() + 1,
      sele_year: new Date().getFullYear(),

      cn_hour_col: function () {
        var hour = [{
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
        return hour;
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
      language: _utils2.default.getLanguage('language')
    };
  },

  props: {
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
    // 起始时间不能大于结束时间
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

      var timestamp = selected.year + '年' + formateNongliMonth + formateNongliDate + ' ' + _utils2.default.formateNongliHour(selected.birth_hour);

      this.$parent.picker_date = timestamp;
      this.$parent.picker_date_obj = selected;
      this.$parent.gongli_nongli = '0';
      this.$parent.closePicker();
    },
    getPickerDateObj: function getPickerDateObj() {
      return {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour')
      };
    },
    getPickerDate: function getPickerDate() {
      var selected = {
        year: this.getValue('year'),
        month: this.getValue('month'),
        date: this.getValue('date'),
        birth_hour: this.getValue('hour')
      };
      var formateNongliMonth = _utils2.default.formateNongliMonth(selected.month);
      var formateNongliDate = _utils2.default.formateNongliDate(selected.date);
      return selected.year + '年' + formateNongliMonth + formateNongliDate + ' ' + _utils2.default.formateNongliHour(selected.birth_hour);
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

/***/ 194:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 195:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/emotion.5050fda.png";

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_annual2024.75824e1.png";

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

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_bai_gua.8dc1c84.png";

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_career2024.63b8577.png";

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_marriage.70769a7.png";

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_wealth2024.10a0655.png";

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bazihehun_img_btnmengban.7edae29.png";

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/caiyun_img_btnmengban.3eab610.png";

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ganqing_img_btnmengban.fb7963b.png";

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/guiguzi_img_btnmengban.55acdf0.png";

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/nianyun_img_btnmengban.abe1062.png";

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/shiye_img_btnmengban.d71d11e.png";

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

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(194)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(216),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4ae6a348",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(197)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(219),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-ab0e2e50",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


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

/***/ 216:
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

/***/ 217:
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

/***/ 218:
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

/***/ 219:
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

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_bazihehun.5e1c44b.png";

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(237)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(234),
  /* template */
  __webpack_require__(246),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-fbc07386",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


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

/***/ 233:
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

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var lang = _utils2.default.getLanguage();

var tipsArr1 = {
  'zh-CN': '命格特点',
  'zh-TW': '命格特點'
};
var tipsArr2 = {
  'zh-CN': '贵人星',
  'zh-TW': '貴人星'
};
var tipsArr3 = {
  'zh-CN': '财帛星',
  'zh-TW': '財帛星'
};
var tipsArr4 = {
  'zh-CN': '婚姻星',
  'zh-TW': '婚姻星'
};
var tipsArr5 = {
  'zh-CN': '事业星',
  'zh-TW': '事業星'
};

var tipArr6 = {
  'zh-CN': '桃花星',
  'zh-TW': '桃花星'
};
var tipArr7 = {
  'zh-CN': '夫妻宫',
  'zh-TW': '夫妻宮'
};
exports.default = {
  name: 'BaziTable',
  props: {
    sex: {
      type: String | Number,
      default: ''
    },
    is_result: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ''
    },
    gongli_nongli: {
      type: Number | String,
      default: 1
    },
    picker_date_yangli: {
      type: String,
      default: ''
    },
    picker_date_nongli: {
      type: String,
      default: ''
    },
    gan: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    zhi: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    nayin: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cai_bo_num: {
      type: Number,
      default: 0
    },
    gui_ren_num: {
      type: Number,
      default: 0
    },
    hun_yin_num: {
      type: Number,
      default: 0
    },
    ming_ge: {
      type: String,
      default: ''
    },
    riyuanqiangruo: {
      type: String,
      default: ''
    },
    shi_ye_num: {
      type: Number,
      default: 0
    },
    wuxingqiang: {
      type: String,
      default: ''
    },
    tao_hua_num: {
      type: Number,
      default: 0
    },
    fuqigong: {
      type: String,
      default: ''
    },
    text_color: {
      type: String,
      default: '#cb6735'
    },
    minge_color: {
      type: String,
      default: '#cb6735'
    },
    show_daji: {
      type: Boolean,
      default: true
    },
    bg: {
      type: String,
      default: '#fdfaec'
    },
    width: {
      type: String,
      default: '6.5rem'
    },
    is_career: {
      type: Boolean,
      default: false
    },
    is_show_taohua: {
      type: Number,
      default: 0
    },
    table_border: {
      type: String,
      default: '0.02rem solid #cb6735'
    },
    border_color: {
      type: String,
      default: '#cb6735'
    },
    change_color: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      year_ji_svga: 'https://psychicai-static.psychicai.pro/imgs/2406b49edbb8fccf436b86052299b7f9f7de.svga',
      career_ji: 'https://psychicai-static.psychicai.pro/imgs/240657a6f19704a34c04ab580f370e148424.svga',
      tips1: tipsArr1[lang],
      tips2: tipsArr2[lang],
      tips3: tipsArr3[lang],
      tips4: tipsArr4[lang],
      tips5: tipsArr5[lang],
      tips6: tipArr6[lang],
      tips7: tipArr7[lang]
    };
  },

  filters: {
    filter_name: function filter_name(val) {
      return _utils2.default.getShortStr(val, 8);
    },
    filter_sex: function filter_sex(val) {
      return +val ? '乾' : '坤';
    }
  },

  computed: {},
  mounted: function mounted() {
    this.loadBg('#canvasji', this.is_career ? this.career_ji : this.year_ji_svga);
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
     * @description: 展示几颗星
     * @param {*} val
     * @return {*}
     */
    getStarNum: function getStarNum(val) {
      return this.is_result ? val + '颗' : '？';
    },


    /**
     * @description: 加载svga动画
     * @param {*} dom 元素dom
     * @param {*} url svga地址
     * @param {*} is_loop 是否循环
     * @return {*}
     */
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
    }
  }
};

/***/ }),

/***/ 236:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 237:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_chang_jian_ganqing.0f3869d.png";

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(236)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(233),
  /* template */
  __webpack_require__(245),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8a9d751e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 245:
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

/***/ 246:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "table-box"
  }, [_c('table', {
    staticClass: "user-table",
    style: ({
      background: _vm.bg,
      width: _vm.width,
      border: _vm.table_border,
    })
  }, [_c('div', {
    staticClass: "gua"
  }, [_c('img', {
    attrs: {
      "src": "https://psychicai-static.psychicai.pro/imgs/2404347a9915ae984267b0aab1e48afe650c.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("filter_sex")(_vm.sex)))])]), _vm._v(" "), _c('canvas', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.is_result && _vm.show_daji),
      expression: "!is_result && show_daji"
    }],
    class: ['daji', _vm.is_career ? 'career-ji' : 'year-ji'],
    attrs: {
      "id": "canvasji"
    }
  }), _vm._v(" "), _c('tr', {
    staticClass: "name",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('span', [_vm._v("姓名：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("filter_name")(_vm.username)))])]), _vm._v(" "), _c('tr', {
    staticClass: "birth name",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_vm._v("\n      " + _vm._s(_vm.gongli_nongli ? _vm.picker_date_yangli : _vm.picker_date_nongli) + "\n    ")]), _vm._v(" "), _c('tr', {
    staticClass: "name c-zhu",
    style: ({
      color: _vm.change_color ? _vm.text_color : '',

      borderColor: _vm.border_color,
    })
  }, [_c('td', {
    style: ({
      borderColor: _vm.border_color,
    })
  }, [_vm._v("\n        年柱\n      ")]), _vm._v(" "), _c('td', {
    style: ({
      borderColor: _vm.border_color,
    })
  }, [_vm._v("\n        月柱\n      ")]), _vm._v(" "), _c('td', {
    style: ({
      borderColor: _vm.border_color,
    })
  }, [_vm._v("\n        日柱\n      ")]), _vm._v(" "), _c('td', {
    style: ({
      borderColor: _vm.border_color,
    })
  }, [_vm._v("\n        时柱\n      ")])]), _vm._v(" "), _c('tr', {
    staticClass: "v-zhu"
  }, _vm._l((_vm.gan), function(it, k) {
    return _c('td', {
      key: 'gan' + k,
      class: _vm.styleColor(it),
      style: ({
        borderColor: _vm.border_color,
      })
    }, [_vm._v("\n        " + _vm._s(it) + "\n      ")])
  }), 0), _vm._v(" "), _c('tr', {
    staticClass: "v-zhu bottom-1",
    style: ({
      borderColor: _vm.border_color,
    })
  }, _vm._l((_vm.zhi), function(it, k) {
    return _c('td', {
      key: 'zhi' + k,
      class: _vm.styleColor(it),
      style: ({
        borderColor: _vm.border_color,
      })
    }, [_vm._v("\n        " + _vm._s(it) + "\n      ")])
  }), 0), _vm._v(" "), _c('tr', {
    staticClass: "v-nayin bottom-1",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, _vm._l((_vm.nayin), function(it, k) {
    return _c('td', {
      key: 'zhi' + k,
      style: ({
        borderColor: _vm.border_color,
      })
    }, [_vm._v("\n        " + _vm._s(it) + "\n      ")])
  }), 0), _vm._v(" "), _c('tr', {
    staticClass: "v-minge"
  }, [_c('td', {
    staticClass: "label-minge",
    style: ({
      color: _vm.change_color ? _vm.text_color : '',

      borderColor: _vm.border_color,
    })
  }, [_vm._v("\n        " + _vm._s(_vm.tips1) + "\n      ")]), _vm._v(" "), _c('td', {
    staticClass: "minge-text"
  }, [_c('div', {
    staticClass: "bottom-1 minge-row",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v("五行")]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.wuxingqiang ? _vm.wuxingqiang + ' 强' : '？'))])]), _vm._v(" "), _c('div', {
    staticClass: "bottom-1 minge-row",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v(_vm._s(_vm.tips2))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.getStarNum(_vm.gui_ren_num)))])]), _vm._v(" "), (!_vm.is_show_taohua) ? _c('div', {
    staticClass: "minge-row"
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v(_vm._s(_vm.tips3))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.getStarNum(_vm.cai_bo_num)))])]) : _c('div', {
    staticClass: "minge-row",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v(_vm._s(_vm.tips6))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.getStarNum(_vm.tao_hua_num)))])])]), _vm._v(" "), _c('td', {
    staticClass: "geju",
    style: ({
      background: _vm.minge_color
    })
  }, [(!_vm.ming_ge) ? _c('div', [_c('div', [_vm._v("?")]), _vm._v(" "), _c('div', [_vm._v("?")]), _vm._v(" "), _c('div', [_vm._v("格")]), _vm._v(" "), _c('div', [_vm._v("局")])]) : _c('div', [_vm._v("\n          " + _vm._s(_vm.ming_ge) + "\n        ")])]), _vm._v(" "), _c('td', {
    staticClass: "minge-text"
  }, [_c('div', {
    staticClass: "bottom-1 minge-row",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v("日元")]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.riyuanqiangruo ? _vm.riyuanqiangruo : '？'))])]), _vm._v(" "), _c('div', {
    staticClass: "bottom-1 minge-row",
    style: ({
      borderColor: _vm.border_color,
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v(_vm._s(_vm.tips4))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.getStarNum(_vm.hun_yin_num)))])]), _vm._v(" "), (!_vm.is_show_taohua) ? _c('div', {
    staticClass: "minge-row",
    style: ({
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v(_vm._s(_vm.tips5))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.getStarNum(_vm.shi_ye_num)))])]) : _c('div', {
    staticClass: "minge-row",
    style: ({
      color: _vm.change_color ? _vm.text_color : '',
    })
  }, [_c('div', {
    staticClass: "label-100"
  }, [_vm._v(_vm._s(_vm.tips7))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.fuqigong ? _vm.fuqigong : '？'))])])])])])])
},staticRenderFns: []}

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

/***/ 362:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAG1BMVEVHcEzuqGjIfDbhlVHflVHglVD1q2fThDzhjkM3fEE4AAAABnRSTlMA/f5uL6+uh5LXAAACd0lEQVRYw+2YwU/bMBSHUzXhbiF8rtKhXDPEOIMqei7dxD0Xn1HGZB8n0WL/2XvvuW4yShLn9bQpv4ZEgn75+XNiH0iSKVOmTJny/yS9PwOebc6A797OgOWez86VK9nwhXJ86Tv1zpeWyjm+MsAlWxng32xl9e640gqbHVsZ4ZKrjDBP+tnDe64ywo6zLLMAc97QdYB3TGWCGdKpCjBDOmvgDU/Zwzuesof3PGWCzWjpLMCGIe2VlbXOGLMbvQP5ZovZj1+O1EzDtuOW5ewAO2MtjHszdgeiGIy2bxxlRcrOaI6y0tZorC4ZygpYa+EOLwxlaEbc6J8jdyAPU8wY6aOyn20DfLz0xcdmbV9GKcsWDImWTiWkwsCEAYg/OnZZZpVSFXXLY7OOfUMfFDXDWYVerV9jdyBJvXBuNf+KVAYIe/Fo4EjpjKbKz9kRres46TVhiqZcF8CNkX6ummCl1gXmOm7TlU0QPTQX97HKITW21j4x0ms/0ZJOHqRx16+xyhIfMzoXhS6QhuM65sUW8JGA45UqdZHXeB2WnlVI+UMKHHRe5Dqv4bMYhL8KUYkKD7iLQIhIzHIQBhZGDDeAVBUMuKYxU/XgDiQOqeiAIQNEgcvQXjQLMFqLyxuEqBjVF8PKTb4nyTdfW9CxHFSmWcZa8QN/8ZgXYeB5Hqkc2CRZ5U3KSGVx/OK8gRdxyletkvk2wMshZc/+9Sqm2xjp+adsi+6TfvDs5elfbjz8pQd+6mID3bMs0/Yj+phHoruXZdbDHuhNr/Jt98BWvdJPrVfj04fRI52ePKKTb2w7pbOrwV0q3XZJryK29fR2+gfQlClTpvyz+QN3qUuUqql1kgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 363:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAHlBMVEVHcEzil1HjmVTRgjvxqWfwqWfKfTfWhj34rGblj0fbYxKpAAAABXRSTlMAO3iyuzXj5scAAAJ/SURBVFjD7ZjBauMwEIbtGHouYck5hyTnnPoGgb6AQb41KUjXdgMSfgCDfNu2EJO33ZmR7HppcKTxHvUTcvvyz/wj2VKyLCkpKSkpQMs9G8237ZrL/hL2+si0fbbWXnnsxiL7yQoKbQH+YFRMtsBe/8TbCtvDsZPKD3ZgY8Pe9LYER6GLZztmv6KCKhvbjOCIsJfQ7T9Fh4edb4UthSi9dYvwPnghNwLVl43sNWxbLA5NWZaNgI/D22sXGvYGSCgZWAiMrIGt66+goEovsAZngcY1OH+GzKcnqWqiO2C77u6klqUYfF3TUHdbo+6FnQ8V4284urGiI7Ze3w9qJGSh67Y2HQQ2uS2+g/LWDX01tgMWvQOCGjujRGUABX4i7MMN1o27MwZwMxV2vv1JY9FNRSx4v00u55veZEz4/s6KvtE1Gpsa6O4xeMxD5c4YWq7DtsS4bDIm/BywK34YK2/9EfSoHcOVNp6eDvtm6Z3u2TrwGfRdeqWUMtrR6+C3hIcv2mjPmogXRW8soW7CzxEPfFpuF6kVFo76HfWmOZSVlIBqTZW/Rx5fLhKq1oryDg17kEQhjfOKPQftgEVvKjv2HLRCY0wM8tax54lCaocDe46FF9Q0zBpafo+FKTGNTRv1Fg0/DbSOP7Gu+rp1dNhZ9iD9qI2KP/q5xHDYr4wzp+9ZqRMDfvLG6oUBr/qyOdcDn5iUnOtB4VnNYLPcw5yw+8TkiQXvHHxkwT6xFxZc8MMeEmPexRzMvAPu+JPyC/TIhAt+2H5Ls2/NM8J2C5R9XV/xw6YFemLDC37YlBj/LwpIbJ3NSGzGHysPrzPg4jQDzo8z4GyfJSUlJSX9T/0Fwr21i8foydUAAAAASUVORK5CYII="

/***/ }),

/***/ 364:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAHlBMVEVHcEzil1Lekk3vp2XMfznxpmLMfjj3q2fvqGfbikB0hDalAAAABnRSTlMAPXShutZ6akrpAAACIklEQVRYw+2YvU/DMBDFm1Iqxk6IkQGhjq1YOsLCXiZmhCJlLarsrjDYXQGl+L/lzmc72eo7r37q+tO7e35pPiaTqqqqqqpCLUrghxL66quAvrBfcrixJfSmhL6x1n5K4UtbQE8Rti9C+rWE3njYbmU1IVhvZTWxcu8mwmYtXxomX8tqQtZ2LauJh41dyWpCg+uVrCaIGsuml2lnbbS+FdUErAFXTDrWRANttNrfimriWcOkNykxXFqp/YJfEx+YQnHoy2FsLxbdDGEHa/Wx4NYEaOWXZtHLuHRiGfTVUE9oSZycVxPcGc45KpcOrHc2hklv4twqxu21Y9SEjNVo8l12TTAwTJvrnWqixomhtpk1MTi21kpx6WW8no3i0/ctqO9ALunkDqDjediznu5dF1mv82wDbNf2qOh7dCdUxr13FpyB7Xo3Us59+7oddvZT/zl3gJ2/c0ry3NLcsPLYOIudEIto7wINxnnstCW6xZ1j2u4n76Kah6npqMLOmSxVhNJOY+eyfmWfdpsq8pv7F9a0w0l1ZJ3NUkUor57LhooEayZLFYFTppPisWFlCgwH59xiZ5HFrMGZdXuej52ZbKiI7zaUm/lAk4wxbSY7TSvDj8mmvND5kfsAGCsCemI/uD4nZz7bFPgOKwvYVBEJGysiYkNF3mSvgwUs5SVkfUWkLFZEzEJF3sUv7rMCdjJ/L/jUcVfykaXo805VVVVVVab+Acca90yT9osuAAAAAElFTkSuQmCC"

/***/ }),

/***/ 365:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAG1BMVEVHcEzGeTXhllLillHil1PyqmfXhz7NfznmkEcoYEs4AAAABXRSTlMA/TZ6tfhah5YAAAJWSURBVFjD7ZjNbtswEIQVKw8Q1gV4VZECuSqAi16dg5EnUKFj0AQUj2VacK9FnMh87Cx/VFdWYmtX6KXQINfBzH5cMoKzbNasWbNm/ROtJ3gXHyaY8+UE85mYYP40xXwjSj4vIfi4cyEuJvASywm8xMcJvAQfN3pFweclJBf3uU++4PMygns1rrG1+MnmZQQI7nIaYYwpuLyMlFAyl9NIA0zcyEuANI88XsYA/i2Zl1niyPCLt5w4sQGQBY8XlkaVrOUE6b2GczVupAzB8IO1XyBDNGO782SFhoH7DFJrALr5KvGy1tLP6hZSa2jouLuJMZmMO08bYqFpvpMvc2RlQVlLPqurUNuG2opq/hrPydqmUYqKW0I3sbKKdjUWX3YBtZdSlnRW+aaqI7BgVhTcnyvUrgtG9z2hsveGaBu96mG0d1NF7WwQjjwa92XVqY4To1WNxL2q9topG5yoNaVyjPa5TTDfUSpHtcmq9T2pcopOrU/i7ldO0RFXqxWtcoyOuVrp4uRSVfUw2geje31yqd6J1tj7CO4w7su36q2pfbDWR67GYlW9H43Bqt0e5ZVYD9KRNLrblnjKXbT2tXVBP+gwtffqctQjMIzG0q27G/sOHE6tdds+jbnOw+61b+22ox6SITiHrfXz6KfzIBq9zhWU17MX7ZwriQ/on2h0a8LD37+hGOx+U/7hrHrRbhzuN08Nzc8ZTateNPlDbvNXNP2b6HIfzfgE7U6tJuE+AFe7J445nVq9zXjy6167jCtcdwbuPbia/8MFgpvyO9GsWbNm/Ud6BRS5dtpys8tAAAAAAElFTkSuQmCC"

/***/ }),

/***/ 366:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAHlBMVEVHcEzvqGjflVHjl1LflE7lnFnPgjrMfzj2rGfci0Ewsh0rAAAAB3RSTlMA/iJUh7TYaUlK/wAAAqlJREFUWMPtl7FvGjEUxq27g6obhkRyN4ZWqBsdIsRGWKJsly5R5w5R96aWtzoQyYydjP/bvneGnGljn22WVrrv7rjB/Pz5s827g5BevXr16vW/6v20+zvF2tMwfOyki7va18J/zMNseUe9/d930CWll97GGed8HZgTSunY21rxEP0BWFr7pwNh/vX1xitkaWBKb/y0ZS8CMzJrYP79r/6La9bA4wBc8dfp4pparUJ74ADzx/kfy3tQcBfcHGl3wVv2Igi/4S/0ql1edYRHQbjirdbt1qARkUEPDv35ZWtERSZk4cC44FcuO+mAh/yE/sRceNQBlycwpyead/3cHwJwZ51Z+OFJJzz0w3UnXPrheXd9PAnNQFQ2YpcRBXjhc55EwE5owcEQnBt3VkfAxYHjWqCzpKy5GJvGPDjuNQhp15nRmMiHWqS1EIJrKSmeOGdPUfBAIIeH5pIqBieDex0FF0iBM4QWTFGppFRwj4oMtUijsx32cZ3Zc+SjdqYxMRpzJtEWJMeRcCWsrdYGxww0XKtIuBC4WAY7UDBudFYyMjIhtwJZ7IAppZprG/1+8VYIg85GoCsOW42j4QqHDLx1VhKcV9Ew0WDcONvJgo+E96Jb0aQWGl3x2ibAQ/A1xuBSYWApRwlwCaSAkUNme8wTYPINSXDH+cKNnfQyuMQxA20Tq00SPDRWDarYKAkuj7BVUmQI7cIyjcXQLbxJhAcuXCfCpQsnRibkSws/p7LkYws/JcODFq6T4aKFp8mwDZ0XGUL/Mu9MXmQbepcX+RA6MzLUIrNDeJvD4krvMiNDAd43w15lwcTsTW5kDG1yI8NTZ79X6mcmXKFzZmSoReCc/W98aZIrkFuAsyNjLUqvQE5omc+S5eYMeDA6Ay7PiNyrV69evf45/QbCzpulAVxMWgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 367:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAG1BMVEVHcEzfk07hllHvpWPLfzjyqmfKfTfWhj3lj0ZUDX6rAAAABXRSTlMAdzuuwcBa96QAAAIcSURBVFjD7ZWxbsIwEIZDiIARMQBjppYVlnbs1HZFUXaKkM0TxH6ByH7snuOkhGAS36WjfzakT7/9nQ+iKCQkJCTkP5OMgV/SEfB6OQL+PNHZmJ3p8IRdRshmjA7PGKMbWzP2QZfNRhhjjG4sBpiNkE03NjMw1diLgc902Yz90GWTjcUWTolrwejGEguf6LKpxtYWvtAnRTXGa3hJl00zlvC6mvJA582xKcbWRVNNkV0UdGMcmjnxgcaCN814Y0khmLDVF4JsoAuisVc4dhWKsU1haOJKAwpX5lX1GS1bCF4LQ6/0RNg7A16gjSVVc33t6zFFyhYCimFakDLPUMI3okr1Qq855ICAv6AYqg0OxSZHf1hVvdUrqYohWeovuz634GXe5OAru64WXOa37L3gRVNciLIF+x19o2RNt4tNVsPwm2wuXXZgj6MLJS3eLfY4eiytMEexSf9zmyplcZk70zuzuYZzC/lYXHocfSdss6O4xrPn8FZLEKak88bmy31Ps7J3fnLj/gWNoRhm5S4emvREGVpod+3AmBNtzu0uHtysnZaGdp14eDG2WsHnsTjz2IroW5tR5fiVMIFarVHzacnWphkrqlkLgDs39v7xixa6e+qV/8/utlO8x/zZvN8V4/5pojt2j0JhLW5wluJYIxs7nzvZFj2maBbWwv8hOyZFEPUnGz+flmyKqGYtyiylstF0FYWEhISEeOQXE+eQZM3/e0cAAAAASUVORK5CYII="

/***/ }),

/***/ 368:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAG1BMVEVHcEzIfDbkmVTflVHZjknwpmLyqmfSgzvejEJ2JEgOAAAABnRSTlMA/mIqnsqpJJkpAAAB5ElEQVRYw+3YsW7CMBAGYCvwADUgeU0HUEcqhT2VqqojQ4UYUWiqrJ7sJyB+7NqOCYES1Xenqotv/3Q+89tJYCxVqlSpUv19TSj2lWBf5gTLS4Llayy2dkGwfIa0j9byB4LlOcFyikXt13NnUSMXUkqPEREplAid1xgrhcCNXCilOguPSOGo4BKzX66vklJhIjL1VoXOKGt/KQEeOVN62Bk0cqa1ap0W3cwlxtpl+85riDVtZ4XwvzMgItneaO1H9hmxneMvzsletcYuu+2W7Q5G9H5N3rXpOwvhh86jrTHGdw7rdsuGWK3bttWXDZsBrO883LDIkTvreqvQ2sWzhNi27yz8eY6KyJMxg879shcQa/vaDQvRttmeR9nmdOEqHAzBRcTIS9NY1nSr7js7nUfYs7TWJ+zcWf5qN5Y2ZrjssGFS/h6R5ddoVYyga0bRMWdqNYa3jKCPjKA/4w7kiI68O9/u4shbe3JXH2KvoR0uJuO6ZhSdU/QW8LjZ4WIyomtG0aC3sAwXk/v6wAi6gmE2vdLgF0BcTK51A4zJz94VGLNNoCdYTG40MCa3GvUluUScjRt9wuzYoDfyU3KFi8lQbxlBV1jsHgY1o2j0Z797lJSMoI+MoD/+6++dVKlSpUrl6xtu7INo11OA8QAAAABJRU5ErkJggg=="

/***/ }),

/***/ 369:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAG1BMVEVHcEzglVDglE/pn1vNfznyqWfKfTfUhT3hjkPuNqdYAAAABXRSTlMAOnSw0/Ua8y4AAAIiSURBVFjD7Zi7UsMwEEVlxwMpqQIlNJAyUEBKKkhNRj0JjPQFlvwDHumz2bVswsN2vKsCCt3Ud45ytJaVCJGSkpKSEpsspjzbXvLLeS3vzthtL+X2ilte11LKFyZ8CWjILas8r+umveXAZz6gpbxj6Pa+btt0cZmvOzRD3OaAhlxRdfsDmiruwn9D03at8N/RAL+k6P6BltPHPfO/0ARxvgc9edfWveiJ4i760dPEzf0Aesq4w6PhXS96wrjn2HX96OPivK+cc/3oo7u2Bm5V2WqgPD7uy8o7zBB6VNy8qY6gx7a88KFrB9Cj+5235AH0uO+sqTpre9HHBmVTha619CkB3ZUNKb8Wy0mH0rlz1lU96ClHedGt2uqSfCLkn12ryedoBkvGuoGUkvr2CVwDH63JB/BD11ZGlcTTV5wH1VpraFPfWacNFxatDKJpb/pZWDVGGU28H+XNF9bGaKXUO/Ut3apW2N5Ry8/topH8Si3fdKoh5CvhqUHXYdnka1GBAxLAZF8iR65p1r2n35xxzYFM9gW6FQ4IZkUv37SqGb6EWOBgYp/uC3Tjd8bsGeVcq9DeMcqZavPIuXd3wli/V+5bMuvGvwjdN1b5RLF9wUkU4Uvkiu9LiAhfQjzxHuaQa76vVvcrs1xE+Aq6ub+Gswhfje49u3zN99U8Git2ueD7Qt18X6Cb7wsejV1E+f4xoryI+LNGnPzZn0wpKSkp/z8fC82SIDFIT6UAAAAASUVORK5CYII="

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_ganqing.b2bd698.png";

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/h5_fang_jian_guiguzi.189b5d1.png";

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

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABZVBMVEVHcEzYt5Hd0ab97tvf19XPvZa7uaXT0tHQzajb19Vsh3/us5b9+evZ2djnm0TKzsvY1tPV0c361Y/ai2zprZX0vnP3yX7XlFzVxcDbzMX4587zz5/JZTrnxq74xHbqrFrhe1rcp5Hf1MndnIHtt3TnsYvX1tXUgF/jnHrIa0nNelXlpor54bbpbGrjknPho23loYG4XDLsupr45MO0QhzUk4jPg0j0qFXbk3HoplLdilXewrLdlHb1x4r1sYz525v61q/j3df64aXgj0vThGrXuav2w5vljj1cvXr02MDtqn2usI7keT7AxMLmnFL2tWjWsJ6cS7nwnHPihj3mo17ktaT68uHdybtLtGzTc09/sbCkVr6IJhnTdT/ltHyxRznyz7Xwi2DAVieexbuLopOzdK/rr2OVaU+7pYzJsXeDjYPzu1hhgXpNiY7BvZZ0zI+ARy+uiGzewJK4k8C3k3jff3o5X2MDQ/0IAAAADXRSTlMAK9SRK5G8kf7Qk9TUjYpwqQAABdBJREFUOMtFlQlX4soWhatva6v3PiEhATIQQhJCJiRhHsI8yiCigDS2Iji32vZ43+9/J+Dr/lZRVavWrn0ORR0KIWBrZw/b/0MNq43wfZyCKU2L7iOM2tvZQm/swGpk3d4+tX3qoTX6vt4nHh1F3Dju3tlo935brqWRCA4D9fDr4VdExDBYwN2Y2+3+sPatiZijwzeZuN04jWORfez7t4uH749OLhiGg/gIvLfEGkavHdfezqp7DYY/Pny7uPj20Ick3EfAFiSMibO1oROdxpyIMLcnE9M/GFwOBvFvyyVHOeygPZqmZzNwwyPiDxtfGJIhz/ax2SI/7IwHHRd/z3t9PpuyaWwPHVEULc5m3Ez2z+cBLbDGdHVcQ1djMB66+Of69zD/A3ZyODoCtcjJyvwSCFxfpxyuxy6XqzMYdDqufJ7P52FnZrzAkN2yZ7J22WiMM7+1qVSg43I1xoMxiF0O+bDXxdGIs1W9kOeHjcalXgyk4tepOHGdug40OsMx+DdcrpCiKAV/eIm7UUIp8DxoCxkiRqi6EXMGJRazGippNayYBem78nyYpd1uVJjc85NhwW8uZLVoqLJuWIRskbGFrJBkgySsjpN+Z9zhcAwNeX5S6LHRaDRBKokcQQgkkZByCqkVi5af1HM5xxk2vLr3EWh73WQ0WmelQIBQAlMYilJRaEmS2iSbhFooDBv34TC/644gfsIy0XrFFFqE0mzqaaqZtluURFFTQUmPBMlfKBgFmRNZWtxH92wyWmGvLi6utLSWTuMYTcGlojCKwik8sk/ZIk23hJzf9BcEZOTYOnNWoyk8jRm0vb6mf8DsFjEvZBqNYR5+HQSWzBmI8anBiX9u36bZdlrLZEAJp3vP36OLVGp6ViMJiQyR2D5Gc3Dx3twjohS4zJhqrBf2en1erxddXF1NGcOYC6O5gGM4GUrY5GxTMrRA5NRYKKT2SnU4Lo8Ppa40JlEk9Kai5WibIw0jFjJwUNqc/zKmEESMtBJRxiGKrjRFU6yANlc0qSXFVCUhjFr01J6GYoUCSRhcUdMTYg1CiQxKN6+uipKiT3WtRSrFuVqcJquJUAya3ySKhKIQlias61NEZFoy1aYu6ZpGtQSSlHJyRTYUS54rqklKCqk0SWGErf8VUHcp99RiUyI0zV5yzZxhNGUrF1DmGhEOSwSpScJoXZ41sYu6XKJHwtfI6bq3JCVyRSseMIqaasXN57AOCC2oUjxSq9UYR2xCYrJMTp55JU5oUtwyFMXQHHFOicdTcYCg012mixguoeYIVZbbpeAzD8loubxpEUQubnqf+fyk2NTj8WZLFKbMEiU50iw+Pgndbrvs8ei6LHt9cjjsDcfDQV/Qyy5JVX18cnNLrsuBM2kJNy+tZbl8uvJ5fZ5KpVSqQAebgsclsDhdPZzfMEySGyFmmUjcnJ8nyr3T1SDr+Y3PB77Zdhs8Bo83N2JymQAxs6yc3778kq3VapXNQugg6Jxr4z3OZkvgoQ765zditEpO0Vm3W/nx8t+Xm/OFp173HGePg0FQHYNt1uupeIIQ9uV2N1ptkww6Sy5LQc/n/nnf50Q/9tWdLU4fDFYqoF58uX2Eeq6yyzN0xnTZ48kxxA4GIXLQyXbdByGEzxt08im1q9FqlQFxMun5/HQK9HqwHg5DJcPBCRt695+B193d3S+7Z0v0n2j1x8EbMX8GgM68Ozn5dALc9T9uOPzypfsPel+N3h4cjNLp9L+OeLHw+/0ZP4h/3v38efKp//Hw6+HXr474aRttMdWng4N0urkRmyYU/UZ8cne3Fjvqj4e3L0/vEHrfevr3LQ3SdFyBSfrThrvPhxu+9m//dp6rD7f9134/Wm6XfKVwKBRa+bJAG2ahstfHsmyS6fb7/Q+bh3D7dff1lW1XS2ypXe6VT0892axntTqFebXuKVWSLPv6uP3/J/bd9l+7LBsd3bIO7TJb8pR77Xa7WmWj3XOuWvlr+52j+x/Ru16XGk/w2gAAAABJRU5ErkJggg=="

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

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAABSlBMVEXGxtSbssd2f4AkLz7L2+vR3+w4R1ViboWbsMWlwNutxt7R4O3W4u6eu9dGZ5HZ5e/S4Ozs8vje5/HL2+rB1OYZHSewx99libHG2Ohwk7q6z+OKqcrW0Mnl7fRvbmp+YliehHhSW1vlh0GokYBfZWbrnl98n8bguZCBlKeywMzf2M6duNM6PDbZ5O/IzdHS19zGvragmY3a4unBqJHDlizo5eGpjl/brX1lW1SshjKwpp3yzZ/LpDSDnrvvuILOycMpNEIcJTWUsdDCpWdSUEynwdvwrXNCRkPiz736w4zX4++BfHSIcmRXeKHOxLzawaLieCyVeGRugJHx8O6Si4K3jXhbfqikq6/IqkW4kDOskEfp4dW7trG7nUXcvELjk1fMtFustb1VaoEsRGQtMTCYn6LnyLPOeSW2nme9tKWcdjypeCPLsaLThUnNcK0JAAAAEHRSTlMB8fuRkNTMDiuR1JG8yJGTlohSQQAABdJJREFUOMtNlWd32kgUhnWySU6yVUiyCioIBKqggoRAmGJTDGua6b3YDm5J/v/XvQLnnH2l+TLzzKs7VzN3EAT05Y9PKIrjNE3QOEHQBBElCALHURS7xWkCRdFPH78g7/oHy9yi4VgooAGOwgyYefurH6c/ntk/MdDtqROawdRoGkeBomkUXN67cfzPk2/GrINMu/7ySrz6q2Gv81KvZ+v17cHMHlwTs9263Uc57g+Il8bsN+/70lxsg9196Xsp6K26paV98LzdZuvtDptSaeFJVmrf/4J8JXjzzXv2zMNytdNKwe7Q9YKdY9aXu6VVLy0WtlNabDfrJ6X/EfnL4C0w/m4dlsuduvRKAeV/WL24gbfbbt5Ku63pbw8LE1u30U8Iy2bc4C3wzfp2tRVi3psv+8eRJwXBov7irw4vbtE/uC6GZVAUqbEkZmXNLGax1KxH9aiyQbE1qmaalmXxWQvDeNTiz/lCmoaR4S3ooxmGoRiKUg2WMcoywfM8ZlWzkUgEjfAnYxwho6RWL3lLY7VdDEfbbalU9ocrn2EJPrKx7f7GikTCeVgGR5FouTz3QEJ3EaxULwiWaqkULBy5xvMdIdmIvUZONI/dYghEyayev6/U1W7ZUYPAC0J45dRqND9Jxi+GIrDwhBOQHiWP3p6D5f2Lv1gcfc8LjqVSd3E0WHo8XlcnrYYZiZzNMaQ3Y9SkP/cdSZtLc1+aSMfJRPVrhjXO5XRuI1w9YPx7IABTNUrjMfQWFpwNNypBsLIRJfV2u93fFIuF+D0YD3IRnkRmsxljbNYgTiOwU4oMBnJhPoGUieN00nHIn8tFMjWEoWZU+/KseTnMLiozFEtaT+2nJ3fY6XRarbg1fhlEogYskGIG/55lMz34JFljZbZpuVJ3Oh0Kk25jchyZLseTZLjA8i9Yk+VyliebZM0w7kV3Op36sdgwLvCaapAEmoE8M+ygUrlUBpV/7ymZZbQMHESyqQ3aruIOu8NOsnFk5XK5rM4RiqLKALeVy0pFY2Yyw/A8Qd/iTXs6dX1flJLJeEFla0azVkYYGWKuVAZ5pVK5h6VRlJahGJLHOdH+MRW7AsCCUK6RzWYT9rNcHtzc5OGpzGGx1Gw2gmhY05369lSKdU+wQOM4KSMGCOCT5mDMMLCrWZYtu9WpVJRiIlgnhcY91pRlhCTJ6OAmdalc3tzYkDMZBD+lZuTWtg3sEOBGPC40IQQkLBqXqYqiDFIpPRvWIpqA+biVy3FcV+yKrVYyDtKiJIGEO+Qytb9UlFRqDUUFCwsLnsnq4zHHFYeimP7WCOE57H8Eak/2MpXK1yvgfKo+YS1D7dw6V7UlURIALoD3ByhqCIyH8H6/B5iAyoVn4ASZDsdx1aIoSYV0uhCLCYWCFg1hHOD9DRjvdTwscxiW5YpOn+M2jiRJjRNcSCaPBIHAaFZJpPIQc0IPSyeN5fRXp9ivVh0wHrbSjRio8CCgtwisn1YSP/NKPrHnoqGy7XZxwnF2FVhRaIXGsVijp82z7/BeUfKpRAjTuNnuO51cbgOwKBVa6Vg31i1cP5YxDYESD2Ekfv78mYAw8AzPz/XXySQ37vcBdhutRrfbLVxdP86OPIJDFQd4X0kkEhxsWsxUbafj6OM+JE4sQhTiMHYBcC9uIfBlIp9I5OvKPlElcSyrqu5EeOXG/aIo/phAFFLs4uL6+uoh/gH5Hf5t/i6h5PPPdxyBY3NVlTrJqj3mxOEPvZNOx4AN6ceHz8jX/8Nk9H6kqh2hoFfHelFs63GAL856fPwbrgmazt/dPT8/391VSTKpqmpSENbV3Nhy23Yrnb64/gXD9QbWAN+loFWbo7g6GglCZ81x45zTdoC9OsPXYAz6i4RsJFLQTLU1GsUfhKSjc8VcrtjupL99e4evPp8vwq+kpsGrNdlWcjS6ehAKRb0PcNURgAUY2vVvv67YL19/h+NIso346OEBctQo6lxV13UneYZbn387Xcf/AXPCZCXbugm5AAAAAElFTkSuQmCC"

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

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABwZJREFUWEfNmXlsFFUcx7+/2aO03S1XIEAEQgAT6R+gHKLQCrQFCxSh3JQjQDmFcIngP8QLjEaOcAhWQBGUUzQaMASJJEQiCMpVBCwgpzFauruztNvtzjzzZmZ3Z6cz2y3H4vtnd+b3js/7vd/v937vDcFQxCW9MomhmBjLI1AbBriNddRnBoDMRQ8hJ0BkwE1GOMwIm93v/1SqHyQyYunITs52bRuvZAyzANhiWIxsSXsmicA2Xr9RsShz78UgB1eAFdjWTQ4ysJxYrXGycDX9//CckyMn0JHrt+4N5NAK8P0FWevA2By96vVKNFv8ZMsFovVpq4/NJXFBr0xBprMMsHH6sM6Men3Sz8QgyTbWmfxzs1YDmG80bD240bOME0uifA3552RdAJAZx90TElGDdFCzp8DK/wKr9CXU5gEqlZJ/dhbv3V3b2cIBxMrZNDkBjtyxcAyaAnI4wSQJoWPfILh/AyBJOiPTh0CjB0T8X5uDpVwk/6zs2NU3Or4x1Br4nWMWwJE9tJayQr8eRfXWtwGZQ+tKffo38XbyzzAAJ7pORHCOXQhH9hClhXTpNIL7N8HeIw+O3FHKOwV6yzuAFAJIADVpDlYdAPyeREepVY/EaS9FNUwAMV2kUB50Kg7LiZBSxGELVNjLZxBYtwSsplpp7xg2Hc78cRHo0G/H4BwyFUKzVgBjkH4/hcDWFWDiPfP+w5hm44vFKnDCns9hJyyCI2uwClt2HoE1rwPVVTEh0VkYhTZTp3yrDFXLZ4Jx7ddjfBKn9FE1HJmNxZbA5RCQMonDDlJhr11EYNVisKrKmPaU0RjOwmI4eg8ESF0h6eIpBL/eCrgbIXXOu4AgoHrXBtQc3qfOJ5HxGYHEyRpwXbkM1+zkxXD0zlcB/ryMwIevgVX61QF5e7sdjrxCOAsmglLTldfy37cR3LURoTPHI4EoZcJ8OPq+AlYponLpBDC/N+FcisRJGnAcN7A90wWOnGGwd8vW4BiCP+wH/Lp4SwLsPftBaNE60hPzlKPm2PdAqEaX2TFQegYc/YerNn7+JKTLZyFfuQDpyrk4FNpCiBP7Mu4I4aWLyRq5Aw0oREpRTJpRZ6cPVIExBD5bhdCPB6JbQnjVdXwkju/LH2OcLuyA/Dftg20QWka19kAwCTaS79zA/aWTIyz6rSvC5CviGtZ6VBxEi2vaf9dH+0EZjRIc8uGqMZ8H/tmFmj3r4paOj3xj+8XLc+Da9FVygWeqtm1VyDe6DuCSJANPrwt4VI4hl9AsWjMgV8k+UENzk6g5eghS2SWkFE0DpabF1QyP1dVflMDWqQscL/YxrauYRDEH5luqeXfkG2EANtRzbbYG9k8fBVZxD86RE5AyalJc4Oq92xHcsw3UvAVcG3aYA3s58Ij4JuEdnqNkC+FQoY8QvKVrizVw4JO1CB76FpSSirQVa2Fr2850MPn2Tdxf+ipYoArOAQVoMG2eNfDUEcbIqkaN8ML7huUq/62K+9O9liYh3/sXlQtnQPb5QBkNkTp3Mexdn492xRhCp0+gasNKMK8H5HIhfeXHEJo1twQWJ4+MkdU6tnmH5qphzeJA595mDcx7Dp0/g6rly8Cqq5RwxLUstO8IMBnSlcuQ795S3pPTidSlb8L+XHdL5fBJiZM0YP1S6/jIOyRPU7D52dj9eXxgPrp0rQyBdauU39ii9im0aYvUeYth6/B0fMfkwBPVXFottRMx8g4OA5tr2b19j6VJxIwuywidO4PQLycg372jgrZqCfuz3WDv2j269cdBVjQ8XgdssurkHaQDjtkUVcW7d+wBNUrSTseBiziwVXZOIG9+/1o+p18I95e7kwfs8UAcNzrurR15XtaAtYTN6H8ZO5ML7Bs72ly/Gh95+g+Im0u4d++CkCSTkLmGR4+Jv3F4ci2ANTNy700y8EgN2MKMyZPzcjifNNys8YkS3Pt2JlfDI/Qarp0Rk6cvB7YurpL1sHVoH3eZHpVQKrsK//T4pxvy9IkC6x0uPDd7r55IW/aGslM9zsKCQVS+9R5Cx3+2jBIKX0V2fuReIry7MC23I/BdmyA0awpbx/Ygm10xG6NcNZ7o7lRvuRSC9MdVsH/K6+yfPFn5vpjvGJHjiIU+n6xcpIpe+Y/kuvVxmouu71KqeCF/NYjmRw+ipvlL9MLN7DZTH4Ieq5ytofLuAzIFm+2s8uXo/1wIkhySOiv6qOgxaB0AJZ6okcJoqNHs4gnK1zc+eWCuAlzaqZOzVXq7gwAiBzzjUSneZYs+c9VPtXY2G2tZ9ZAfuXv/+sDMi9pnrwh0WruVAM1ijFmaR8LXshbmVZ/2RJAA2ni38toiDhsbPrUByjsXZAo2uZgxyoOANmAWn27NDih6yAeXi2C4ScQOy5KwuenZ72I+3f4HN9M2YVLaKT0AAAAASUVORK5CYII="

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

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_1.cd50efe.png";

/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_2.46234fd.png";

/***/ }),

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_3.fbdca2c.png";

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_4.f8c410c.png";

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_5.6b70c73.png";

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_6.7724b11.png";

/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_7.00e51e4.png";

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/result_title_caifu.33967ab.png";

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

/***/ 67:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(937)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(818),
  /* template */
  __webpack_require__(1654),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6f2dc245",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-15 10:36:45
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-22 18:09:57
 * @Description:
 */
exports.default = {
  'dom-title': '2024年流年运势',
  'name-label': '姓名',
  'birth-label': '生日',
  'sex-label': '性别',
  'name-placeholder': '请输入您的姓名',
  'birth-placeholder': '请输入出生日期(必填)',
  'check-label': '查看',
  'agree-label': '我已阅读并同意',
  'user-agreement': '《用户协议》',
  and: '和',
  'privacy-policy': '《隐私协议》',
  'history-order': '查询历史订单',
  'year-label': '年',
  'month-label': '月',
  'day-label': '日',
  'gongli-label': '公历',
  'nongli-label': '农历',
  'result-check': '结果查询中...',
  'fail-result': '订单查询失败',
  'shichen-label': '时辰',
  'shizhu-label': '时柱',
  zhongshengua: '终生卦',
  'name-tips': '请输入姓名',
  'name-tips-2': '请输入中文姓名',
  'birth-tips': '请选择出生日期',
  'xieyi-tips': '请阅读同意用户协议和隐私协议',
  'kaiyun-label': '开运方位',
  'lucky-color': '幸运色',
  'lucky-treasure': '幸运宝石',
  'score-line': '分数',
  'line-20': '低迷',
  'line-40': '较弱',
  'line-60': '和平',
  'line-80': '较好',
  'line-100': '极强',
  'tips-1': '事业受阻',
  'tips-2': '健康危机',
  'tips-3': '好运连连'
};

/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: wujiang@weli.cn
 * @Date: 2024-01-12 17:15:01
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-22 18:10:22
 * @Description:
 */
exports.default = {
  'dom-title': '2024年流年運勢',
  'name-label': '姓名',
  'birth-label': '生日',
  'sex-label': '性別',
  'name-placeholder': '請輸入您的姓名',
  'birth-placeholder': '請選擇出生日期(必填)',
  'check-label': '查看',
  'agree-label': '我已閱讀並同意',
  'user-agreement': '《用戶協議》',
  and: '和',
  'privacy-policy': '《隱私協議》',
  'history-order': '查詢歷史訂單',
  'year-label': '年',
  'month-label': '月',
  'day-label': '日',
  'gongli-label': '公曆',
  'nongli-label': '農曆',
  'result-check': '結果查詢中...',
  'fail-result': '訂單查詢失敗',
  'shichen-label': '時辰',
  'shizhu-label': '時柱',
  zhongshengua: '終生卦',
  'name-tips': '請輸入姓名',
  'name-tips-2': '請輸入中文姓名',
  'birth-tips': '請選擇出生日期',
  'xieyi-tips': '請閱讀同意用戶協議和隱私協議',
  'kaiyun-label': '開運方位',
  'lucky-color': '幸運色',
  'lucky-treasure': '幸運寶石',
  'score-line': '分數',
  'line-20': '低迷',
  'line-40': '較弱',
  'line-60': '和平',
  'line-80': '較好',
  'line-100': '極強',
  'tips-1': '事業受阻',
  'tips-2': '健康危機',
  'tips-3': '好運連連'
};

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(247);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _index = __webpack_require__(1605);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(1604);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(1607);

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default); /*
                                         * @Author: wujiang@weli.cn
                                         * @Date: 2023-11-15 11:36:10
                                         * @LastEditors: wujiang
                                         * @LastEditTime: 2023-11-15 11:36:34
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

/***/ 71:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEqADAAQAAAABAAAADAAAAABFeZu2AAAA6ElEQVQoFZWQuw3CQBBEjxMkRISUQAgdQEAFJETktotxZDmGyAkVENCGSyAjR8hmHv6Ij5fPSHN33p19Op9zUpIk4ziOR5z/ETPMMtNL03Su/SBf5E0QBHvtX6W5lUI7eVCW5dJrmeqjLw/lrA7oaKvOZEowM5BnXstWzmUE8CPsAUIWMbv1YRiei6JY1AUaJqwLwiyMHpOIR/PeH3Wc3AvOXbWvmzezIFEUnci3ID4sGD2JN2l/h5s0EJpPIAoGjJYJofkGotgBo4zy15tUZQNEswNmQsh33ogGeoA56yZV8ocVGP4WvQH5/XhiKgAgCQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(967)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(822),
  /* template */
  __webpack_require__(1684),
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

/***/ 816:
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
//
//
//
//
//
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
  name: 'Analyze',
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    topic: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      // Your data properties go here
    };
  },
  created: function created() {
    // Code to run when the component is created
  },
  mounted: function mounted() {
    // Code to run when the component is mounted
  },

  methods: {
    // Your methods go here
  }
};

/***/ }),

/***/ 817:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PayCard = __webpack_require__(167);

var _PayCard2 = _interopRequireDefault(_PayCard);

var _api = __webpack_require__(6);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _user_info = __webpack_require__(674);

var _user_info2 = _interopRequireDefault(_user_info);

var _lunarJavascript = __webpack_require__(94);

var _img_button = __webpack_require__(1322);

var _img_button2 = _interopRequireDefault(_img_button);

var _analyze = __webpack_require__(1603);

var _analyze2 = _interopRequireDefault(_analyze);

var _PayModal = __webpack_require__(168);

var _PayModal2 = _interopRequireDefault(_PayModal);

var _enum = __webpack_require__(2);

var _result_title_ = __webpack_require__(622);

var _result_title_2 = _interopRequireDefault(_result_title_);

var _result_title_3 = __webpack_require__(623);

var _result_title_4 = _interopRequireDefault(_result_title_3);

var _result_title_5 = __webpack_require__(624);

var _result_title_6 = _interopRequireDefault(_result_title_5);

var _result_title_nian = __webpack_require__(1306);

var _result_title_nian2 = _interopRequireDefault(_result_title_nian);

var _result_title_7 = __webpack_require__(625);

var _result_title_8 = _interopRequireDefault(_result_title_7);

var _result_title_caifu = __webpack_require__(629);

var _result_title_caifu2 = _interopRequireDefault(_result_title_caifu);

var _result_title_9 = __webpack_require__(626);

var _result_title_10 = _interopRequireDefault(_result_title_9);

var _result_title_11 = __webpack_require__(627);

var _result_title_12 = _interopRequireDefault(_result_title_11);

var _result_title_13 = __webpack_require__(628);

var _result_title_14 = _interopRequireDefault(_result_title_13);

var _img_zhong_ = __webpack_require__(1292);

var _img_zhong_2 = _interopRequireDefault(_img_zhong_);

var _img_zhong_3 = __webpack_require__(1293);

var _img_zhong_4 = _interopRequireDefault(_img_zhong_3);

var _img_zhong_5 = __webpack_require__(1294);

var _img_zhong_6 = _interopRequireDefault(_img_zhong_5);

var _img_zhong_7 = __webpack_require__(1295);

var _img_zhong_8 = _interopRequireDefault(_img_zhong_7);

var _img_zhong_9 = __webpack_require__(1296);

var _img_zhong_10 = _interopRequireDefault(_img_zhong_9);

var _img_zhong_11 = __webpack_require__(1297);

var _img_zhong_12 = _interopRequireDefault(_img_zhong_11);

var _img_zhong_13 = __webpack_require__(1298);

var _img_zhong_14 = _interopRequireDefault(_img_zhong_13);

var _img_zhong_15 = __webpack_require__(1299);

var _img_zhong_16 = _interopRequireDefault(_img_zhong_15);

var _img_zhong_17 = __webpack_require__(1300);

var _img_zhong_18 = _interopRequireDefault(_img_zhong_17);

var _img_zhong_19 = __webpack_require__(1420);

var _img_zhong_20 = _interopRequireDefault(_img_zhong_19);

var _img_zhong_21 = __webpack_require__(1421);

var _img_zhong_22 = _interopRequireDefault(_img_zhong_21);

var _img_zhong_23 = __webpack_require__(1422);

var _img_zhong_24 = _interopRequireDefault(_img_zhong_23);

var _img_zhong_25 = __webpack_require__(1423);

var _img_zhong_26 = _interopRequireDefault(_img_zhong_25);

var _img_zhong_27 = __webpack_require__(1424);

var _img_zhong_28 = _interopRequireDefault(_img_zhong_27);

var _img_zhong_29 = __webpack_require__(1425);

var _img_zhong_30 = _interopRequireDefault(_img_zhong_29);

var _img_zhong_31 = __webpack_require__(1426);

var _img_zhong_32 = _interopRequireDefault(_img_zhong_31);

var _img_zhong_33 = __webpack_require__(1427);

var _img_zhong_34 = _interopRequireDefault(_img_zhong_33);

var _img_zhong_35 = __webpack_require__(1428);

var _img_zhong_36 = _interopRequireDefault(_img_zhong_35);

var _NewFooter = __webpack_require__(112);

var _NewFooter2 = _interopRequireDefault(_NewFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topic1 = ['23年事业是否变动？', '财运是否受到影响？', '感情生活是否有新的变化？']; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var topic2 = ['24年你的开运方位在哪里？', '你又能如何提升自身运势呢？'];

var topic3 = ['专属你的太岁破解指南'];
var topic4 = ['2024年是你的？？之年'];

var topic5 = ['24年你的事业运势起伏如何？', '事业机会在哪里？会有更好的发展吗？', '是继续在公司等待升职？', '还是挖掘自己的第二职业？'];

var topic6 = ['24年你的财富机缘在哪里？', '正财收入是否稳定？', '偏财运势又如何？', '会不会破财？'];

var topic7 = ['24年感情运势如何？', '单身的你，有机会遇到另一半吗？', '恋爱中的你，关系会更进一步吗？', '已婚的你，婚姻中有没有注意事项？'];

var topic8 = ['健康的体魄是工作赚钱的根基', '24年要随时关注哪些健康问题'];

var topic9 = ['24年运势低谷在几月？', '24年运势高光在几月？', '又有哪些月份是需要格外注意的？'];
exports.default = {
  components: {
    PayCard: _PayCard2.default,
    UserInfo: _user_info2.default,
    analyzeModal: _analyze2.default,
    payModal: _PayModal2.default,
    NewFooter: _NewFooter2.default
  },
  data: function data() {
    return {
      cn_pay_btn: 'https://psychicai-static.psychicai.pro/imgs/2404fd60302100a5446496cdca97c22caf51.png',
      tw_pay_btn: _img_button2.default,
      product_id: 25,
      product_key: 'h5_annual2024',
      query_user_string: '',
      showBottomBtn: false,
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
      zhi: ['？', '？', '？', '？'],
      nayin: ['？', '？', '？', '？'],
      language: _utils2.default.getLanguage(),
      title1: _result_title_2.default,
      title2: _result_title_4.default,
      title3: _result_title_6.default,
      title4: _result_title_nian2.default,
      title5: _result_title_8.default,
      title6: _result_title_caifu2.default,
      title7: _result_title_10.default,
      title8: _result_title_12.default,
      title9: _result_title_14.default,
      topic1: topic1,
      topic2: topic2,
      topic3: topic3,
      topic4: topic4,
      topic5: topic5,
      topic6: topic6,
      topic7: topic7,
      topic8: topic8,
      topic9: topic9,
      cn_card_1: _img_zhong_2.default,
      cn_card_2: _img_zhong_4.default,
      cn_card_3: _img_zhong_6.default,
      cn_card_4: _img_zhong_8.default,
      cn_card_5: _img_zhong_10.default,
      cn_card_6: _img_zhong_12.default,
      cn_card_7: _img_zhong_14.default,
      cn_card_8: _img_zhong_16.default,
      cn_card_9: _img_zhong_18.default,
      tw_card_1: _img_zhong_20.default,
      tw_card_2: _img_zhong_22.default,
      tw_card_3: _img_zhong_24.default,
      tw_card_4: _img_zhong_26.default,
      tw_card_5: _img_zhong_28.default,
      tw_card_6: _img_zhong_30.default,
      tw_card_7: _img_zhong_32.default,
      tw_card_8: _img_zhong_34.default,
      tw_card_9: _img_zhong_36.default,
      showFixedBtn: false,
      is_show_btn: true,
      pay_modal: false, //支付弹窗
      modal_bg: 'https://psychicai-static.psychicai.pro/imgs/240444508285d55242dbac9b5ab02272d80a.png'
    };
  },

  computed: {
    username_title: function username_title() {
      return _utils2.default.getShortStr(this.username) + '\u7684' + this.$t('dom-title');
    },
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    }
  },
  watch: {
    showFixedBtn: function showFixedBtn(val) {
      if (val) {
        _utils2.default.firebaseLogEvent('10003', '-10019', 'view_2024report_button', 'view', {
          args_name: 'view_2024report_button',
          channel: _utils2.default.getFBChannel()
        });
      }
    }
  },
  created: async function created() {
    _utils2.default.firebaseLogEvent('10003', '-10003', 'page_view_2024report_mid', 'page_view', {
      args_name: 'page_view_2024report_mid',
      channel: _utils2.default.getFBChannel()
    });

    this.query_user_string = this.$route.query.querystring;
    var pay_modal = this.$route.query.pay_modal;
    if (pay_modal) {
      this.pay_modal = true;
    }
    await this.formateQueryUserInfo(this.query_user_string);
    this.getUserBazi();
  },
  mounted: function mounted() {
    window.scrollTo(0, 0);
    var btn = document.getElementById('info-btn');
    var self = this;
    document.addEventListener('scroll', function (e) {
      var flag = _utils2.default.isElementInViewport(btn);
      var scroll_distance = window.pageYOffset || document.documentElement.scrollTop;
      if (!self.is_show_btn || scroll_distance < 100) {
        self.showFixedBtn = false;
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
  },

  methods: {
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
      this.nayin = data.nayin;
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
     * @description: 打开支付弹窗
     * @return {*}
     */
    showPayModal: function showPayModal() {
      _utils2.default.firebaseLogEvent('10003', '-10004', 'click_2024report_mid', 'click', {
        args_name: 'click_2024report_mid',
        channel: _utils2.default.getFBChannel()
      });
      this.pay_modal = true;
    }
  }
};

/***/ }),

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _result_img_word = __webpack_require__(1304);

var _result_img_word2 = _interopRequireDefault(_result_img_word);

var _result_img_word3 = __webpack_require__(1429);

var _result_img_word4 = _interopRequireDefault(_result_img_word3);

var _img_word = __webpack_require__(1302);

var _img_word2 = _interopRequireDefault(_img_word);

var _baziTable = __webpack_require__(222);

var _baziTable2 = _interopRequireDefault(_baziTable);

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

var Getmonth = function Getmonth() {
  var arr = [];
  for (var i = 0; i < 12; i++) {
    arr.push(i + 1 + '\u6708');
  }
  return arr;
};
// import * as echarts from 'echarts';

exports.default = {
  props: ['username', 'sex', 'picker_date_yangli', 'picker_date_nongli', 'gan', 'zhi', 'nayin', 'gongli_nongli', 'score', 'scores2024content', 'is_result', 'cai_bo_num', 'gui_ren_num', 'hun_yin_num', 'ming_ge', 'riyuanqiangruo', 'shi_ye_num', 'wuxingqiang'],
  components: {
    BaziTable: _baziTable2.default
  },
  data: function data() {
    return {
      language: _utils2.default.getLanguage(),
      cn_title_1: _result_img_word2.default,
      tw_title_1: _result_img_word4.default,
      cn_title_2: _img_word2.default,
      tw_title_2: _img_word2.default
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(async function () {
      if (!_this.is_result) {
        _this.getEcharts();
        var shiye = document.getElementById('shiye');
        var jiankang = document.getElementById('jiankang');
        var haoyun = document.getElementById('haoyun');
        await _utils2.default.asleep(2000);
        shiye.classList.add('move1');
        await _utils2.default.asleep(500);
        jiankang.classList.add('move2');
        await _utils2.default.asleep(500);
        haoyun.classList.add('move3');
      }
    });
  },

  filters: {
    filter_name: function filter_name(val) {
      return _utils2.default.getShortStr(val, 8);
    },
    filter_sex: function filter_sex(val) {
      return +val ? '乾' : '坤';
    }
  },
  methods: {
    /**
     * @description: 折线图配置及初始化
     * @return {*}
     */
    getEcharts: function getEcharts() {
      var self = this;
      var myChart = echarts.init(document.getElementById('echarts'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          show: false
        },
        grid: {
          top: 20,
          left: 5,
          right: 20,
          bottom: 20,
          containLabel: true
        },
        animationDuration: 2000,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Getmonth(),
          axisLabel: {
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 5,
          min: 0,
          max: 100,
          // 展示Y轴
          axisLine: {
            show: true,
            onZero: false
          },

          offset: 1,
          //   刻度线设置
          axisTick: {
            show: false
          },
          //   网格线设置
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#666',
            fontSize: 10,
            formatter: function formatter(value) {
              if (value === 20) {
                return self.$t('line-20');
              } else if (value === 40) {
                return self.$t('line-40');
              } else if (value === 60) {
                return self.$t('line-60');
              } else if (value === 80) {
                return self.$t('line-80');
              } else if (value === 100) {
                return self.$t('line-100');
              } else if (value === 0) {
                return '';
              }
            }
          }
        },
        series: [{
          name: self.$t('score-line'),
          type: 'line', //类型 折线
          smooth: true, //是否平滑
          itemStyle: {
            color: '#FF7A00'
          },
          data: self.score,
          showSymbol: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FFF1E3'
            }, {
              offset: 1,
              color: '#FDFAEC'
            }])
          }
        }]
      };
      myChart.setOption(option);
    }
  }
};

/***/ }),

/***/ 819:
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

var _NavigationBar = __webpack_require__(166);

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _FixedOrder = __webpack_require__(123);

var _FixedOrder2 = _interopRequireDefault(_FixedOrder);

var _HomeFooter = __webpack_require__(165);

var _HomeFooter2 = _interopRequireDefault(_HomeFooter);

var _mintUi = __webpack_require__(4);

var _svga = __webpack_require__(98);

var _DatetimePicker = __webpack_require__(213);

var _DatetimePicker2 = _interopRequireDefault(_DatetimePicker);

var _NongliPicker = __webpack_require__(214);

var _NongliPicker2 = _interopRequireDefault(_NongliPicker);

var _PayPopup = __webpack_require__(185);

var _PayPopup2 = _interopRequireDefault(_PayPopup);

var _TopBar = __webpack_require__(244);

var _TopBar2 = _interopRequireDefault(_TopBar);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _api = __webpack_require__(6);

var _dayjs = __webpack_require__(11);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _headerNotice = __webpack_require__(171);

var _headerNotice2 = _interopRequireDefault(_headerNotice);

var _img_4tag = __webpack_require__(1301);

var _img_4tag2 = _interopRequireDefault(_img_4tag);

var _img_4tag3 = __webpack_require__(1430);

var _img_4tag4 = _interopRequireDefault(_img_4tag3);

var _btn_ling = __webpack_require__(1291);

var _btn_ling2 = _interopRequireDefault(_btn_ling);

var _btn_ling3 = __webpack_require__(1321);

var _btn_ling4 = _interopRequireDefault(_btn_ling3);

var _home_img_mokuai = __webpack_require__(359);

var _home_img_mokuai2 = _interopRequireDefault(_home_img_mokuai);

var _home_img_mokuai3 = __webpack_require__(382);

var _home_img_mokuai4 = _interopRequireDefault(_home_img_mokuai3);

var _home_img_mokuai5 = __webpack_require__(360);

var _home_img_mokuai6 = _interopRequireDefault(_home_img_mokuai5);

var _home_img_mokuai7 = __webpack_require__(383);

var _home_img_mokuai8 = _interopRequireDefault(_home_img_mokuai7);

var _card_2_cn = __webpack_require__(355);

var _card_2_cn2 = _interopRequireDefault(_card_2_cn);

var _card_2_tw = __webpack_require__(356);

var _card_2_tw2 = _interopRequireDefault(_card_2_tw);

var _card_4_cn = __webpack_require__(357);

var _card_4_cn2 = _interopRequireDefault(_card_4_cn);

var _card_4_tw = __webpack_require__(358);

var _card_4_tw2 = _interopRequireDefault(_card_4_tw);

var _home_img_mokuai9 = __webpack_require__(361);

var _home_img_mokuai10 = _interopRequireDefault(_home_img_mokuai9);

var _home_img_mokuai11 = __webpack_require__(384);

var _home_img_mokuai12 = _interopRequireDefault(_home_img_mokuai11);

var _enum = __webpack_require__(2);

var _combinePayPop = __webpack_require__(170);

var _combinePayPop2 = _interopRequireDefault(_combinePayPop);

var _nianyun_btn_jiexiao = __webpack_require__(1303);

var _nianyun_btn_jiexiao2 = _interopRequireDefault(_nianyun_btn_jiexiao);

var _nianyun_btn_jiexiao_fanti = __webpack_require__(1431);

var _nianyun_btn_jiexiao_fanti2 = _interopRequireDefault(_nianyun_btn_jiexiao_fanti);

var _year_order = __webpack_require__(1184);

var _year_order2 = _interopRequireDefault(_year_order);

var _year = __webpack_require__(1185);

var _year2 = _interopRequireDefault(_year);

var _PopNotice = __webpack_require__(169);

var _PopNotice2 = _interopRequireDefault(_PopNotice);

var _NewFooter = __webpack_require__(112);

var _NewFooter2 = _interopRequireDefault(_NewFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 组合测算相关参数
var is_combine = _utils2.default.getQueryString('is_combine');
var tipsArr5 = {
  'zh-CN': '订单创建中...',
  'zh-TW': '訂單創建中...'
};
exports.default = {
  components: {
    DatetimePicker: _DatetimePicker2.default,
    NongliPicker: _NongliPicker2.default,
    PayPopup: _PayPopup2.default,
    HeaderNotice: _headerNotice2.default,
    TopBar: _TopBar2.default,
    combinePayPop: _combinePayPop2.default,
    HomeFooter: _HomeFooter2.default,
    PopNotice: _PopNotice2.default,
    FixedOrder: _FixedOrder2.default,
    NewFooter: _NewFooter2.default,
    NavigationBar: _NavigationBar2.default
  },
  data: function data() {
    return {
      cn_history_order: _year2.default,
      tw_history_order: _year_order2.default,
      svg: 'https://mixmedia.rili.cn/1425252e-6c76-4bec-9d74-1b09ec40d6bd.svga',
      privacyChecked: true, // 同意隐私协议
      sex: '1',
      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',
      username: '',
      picker_date: '',
      picker_date_obj: null,
      picker_hour: '',
      gongli_nongli: '1',
      choose_time: false,
      show_nongli: false,
      // 底部弹出popup版本所需数据
      visible: false,
      product_id: 2,
      product_key: 'h5_annual2024',
      query_user_string: '',
      is_combine: is_combine,
      has_pay: '',
      // 繁體
      language: _utils2.default.getLanguage(),
      cn_tag: _img_4tag2.default,
      tw_tag: _img_4tag4.default,
      cn_order: _btn_ling2.default,
      tw_order: _btn_ling4.default,
      cn_card_1: _home_img_mokuai2.default,
      tw_card_1: _home_img_mokuai4.default,
      cn_card_2: _home_img_mokuai6.default,
      tw_card_2: _home_img_mokuai8.default,
      cn_card_3: _card_2_cn2.default,
      tw_card_3: _card_2_tw2.default,
      cn_card_4: _card_4_cn2.default,
      tw_card_4: _card_4_tw2.default,
      cn_card_5: _home_img_mokuai10.default,
      tw_card_5: _home_img_mokuai12.default,
      showFixedBtn: false,
      is_show_btn: true,
      pay_modal: false,
      product_price: '',
      cn_new_user_btn: _nianyun_btn_jiexiao2.default,
      tw_new_user_btn: _nianyun_btn_jiexiao_fanti2.default,
      cn_header_svga: 'https://psychicai-static.psychicai.pro/imgs/2406ce0cb03241ea456db046b71c40ee417c.svga',
      tw_header_svga: 'https://psychicai-static.psychicai.pro/imgs/240699790b16f7ff4bdcb0d22c167fcb76d8.svga',
      cn_tag_svga: 'https://psychicai-static.psychicai.pro/imgs/2406d412215566e64563b9f288d8e6ce1781.svga',
      tw_tag_svga: 'https://psychicai-static.psychicai.pro/imgs/2406f7acfeff41b54aa491aed151218685a9.svga',
      cn_card_svga: 'https://psychicai-static.psychicai.pro/imgs/24064b0c177e97f34241a4efeb71f3aa3b4f.svga',
      tw_card_svga: 'https://psychicai-static.psychicai.pro/imgs/240658ab9754108a4953abd38fe13c41e3f8.svga',
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
      timer: null
    };
  },

  computed: {
    local_title: function local_title() {
      return _utils2.default.getTitle(this.new_order_key);
    },
    productList: function productList() {
      return this.$store.state.common.productList;
    },
    is_new_user: function is_new_user() {
      var obj = this.$store.state.common.productList.find(function (it) {
        return it.product_key === 'h5_annual2024';
      });
      if (obj) {
        return obj.tags ? obj.tags.includes('newcomer_discount') : false;
      } else {
        return false;
      }
    },
    pay_btn_img: function pay_btn_img() {
      if (this.is_new_user) {
        return this.language == 'zh-CN' ? this.cn_new_user_btn : this.tw_new_user_btn;
      } else {
        return this.language == 'zh-CN' ? this.cn_order : this.tw_order;
      }
    },
    is_cn: function is_cn() {
      return this.language === 'zh-CN';
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
    is_android: function is_android() {
      return _utils2.default.isAndroid();
    },
    is_channel_01: function is_channel_01() {
      return _utils2.default.getFBChannel().indexOf('01') > -1;
    }
  },
  created: function created() {
    this.$store.dispatch('common/getProduction');
    var has_pay = this.$route.query.has_pay;

    this.has_pay = has_pay ? has_pay : '';
    _utils2.default.firebaseLogEvent('10003', '-10001', 'page_view_2024report_main', 'page_view', {
      args_name: 'page_view_2024report_main',
      channel: _utils2.default.getFBChannel()
    });
    this.getLastOrder();
  },
  mounted: function mounted() {
    var _this = this;

    this.showNoticePop();

    // 赋默认值
    var storaged_userInfo = localStorage.getItem('year_of_lucky_info');
    if (storaged_userInfo) {
      var arr = storaged_userInfo.split('|');

      this.year = arr[3];
      this.month = arr[4];
      this.date = arr[5];
      this.birth_hour = arr[6];
      this.username = arr[0];
      this.sex = arr[1];
      this.gongli_nongli = arr[2];
      this.picker_hour = _utils2.default.formateNongliHour(arr[6]);
      // 生日默认值
      if (arr[2] == '1') {
        this.show_nongli = false;
        this.picker_date = arr[3] + '\u5E74' + arr[4] + '\u6708' + arr[5] + '\u65E5 ' + this.picker_hour;
      } else {
        this.show_nongli = true;
        this.picker_date = arr[3] + '\u5E74' + _utils2.default.formateNongliMonth(arr[4]) + _utils2.default.formateNongliDate(arr[5]) + ' ' + this.picker_hour;
      }
      // 生日实际传值
      var pick_date = {
        year: arr[3],
        month: arr[4],
        date: arr[5],
        birth_hour: arr[6]
      };
      this.picker_date_obj = pick_date;
      this.$nextTick(function () {
        if (_this.sex === '1') {
          _this.$refs.sex_male.click();
          setTimeout(function () {
            _this.$refs.sex_female.click();
          }, 500);
        } else {
          _this.$refs.sex_female.click();
          setTimeout(function () {
            _this.$refs.sex_male.click();
          }, 500);
        }
      });
    }
    var self = this;

    var screenH = window.screen.height;
    var btn = document.getElementById('info-btn');
    document.addEventListener('scroll', function (e) {
      var flag = _utils2.default.isElementInViewport(btn);
      var scroll_distance = window.pageYOffset || document.documentElement.scrollTop;
      if (!self.is_show_btn || scroll_distance < 100) {
        self.showFixedBtn = false;
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
    this.loadBg('#canvas1', this.is_cn ? this.cn_header_svga : this.tw_header_svga);
    this.loadBg('#canvas2', this.is_cn ? this.cn_tag_svga : this.tw_tag_svga, 1);
    this.loadBg('#canvas3', this.is_cn ? this.cn_card_svga : this.tw_card_svga);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  watch: {
    username: function username(val) {
      if (val) {
        var new_ = val.trim();
        var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!regex.test(new_)) {
          this.username = new_.replace(/[^\u4E00-\u9FA5A-Za-z0-9]/g, '');
        }

        if (new_.length > 20) {
          this.username = new_.slice(0, 20);
        }
      }
    },
    is_show_notice: function is_show_notice(val) {
      if (val) {
        _utils2.default.firebaseLogEvent('10003', '-10013', 'view_2024report_discount1', 'view', {
          args_name: 'view_2024report_discount1',
          channel: _utils2.default.getFBChannel()
        });
      }
    }
  },

  methods: {
    /**
     * @description: 获取订单ID
     * @param {*} val
     * @return {*}
     */
    getOrderId: function getOrderId(val) {
      this.order_id = val;
    },

    /**
     * @description: 跳转历史订单页
     * @return {*}
     */
    toOrder: function toOrder() {
      _utils2.default.jumpToOrder();
    },


    /**
     * @description: 选择性别 这里用于在跳转协议页面返回后清空姓名问题
     * @param {*} val
     * @return {*}
     */
    changeSex: function changeSex(val) {
      this.sex = val + '';
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


    /**
     * @description: 跳转协议页面
     * @param {*} url
     * @return {*}
     */
    toPrivacy: function toPrivacy(url) {
      this.storeUserInfo(url);
    },


    /**
     * @description: 打开时间选择器
     * @return {*}
     */
    openPicker: function openPicker() {
      this.choose_time = true;
    },


    /**
     * @description: 关闭时间选择器
     * @return {*}
     */
    closePicker: function closePicker() {
      this.choose_time = false;
    },


    /**
     * @description: 跳转协议页面时 如已填充信息 则缓存到本地
     * @param {*} url
     * @return {*}
     */
    storeUserInfo: function storeUserInfo(url) {
      var username = this.username;
      var sex = this.sex;
      var gongli_nongli = this.gongli_nongli;
      var time_obj = this.picker_date_obj;
      if (username == '') {
        location.href = url;
        return;
      }
      // if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
      //   location.href = url;
      //   return;
      // }
      if (time_obj == null) {
        location.href = url;
        return;
      }
      var querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';

      window.localStorage.setItem('year_of_lucky_info', querystring);
      location.href = url;
    },


    /**
     * @description: 跳转到支付页
     * @return {*}
     */
    check: async function check() {
      var _this2 = this;

      var username = this.username;
      var sex = this.sex;
      var gongli_nongli = this.gongli_nongli;
      var time_obj = this.picker_date_obj;
      if (username == '') {
        _utils2.default.firebaseLogEvent('10003', '-10002', 'click_2024report_main', 'click', {
          args_name: 'click_2024report_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('name-tips'));
        var dom = document.getElementById('username');
        dom.focus();
        return;
      }
      // if (!/^[\u4e00-\u9fa5]+$/g.test(username)) {
      //   Toast(this.$t('name-tips-2'));
      //   return;
      // }
      if (time_obj == null) {
        _utils2.default.firebaseLogEvent('10003', '-10002', 'click_2024report_main', 'click', {
          args_name: 'click_2024report_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('birth-tips'));
        return;
      }
      if (!this.privacyChecked) {
        _utils2.default.firebaseLogEvent('10003', '-10002', 'click_2024report_main', 'click', {
          args_name: 'click_2024report_main',
          channel: _utils2.default.getFBChannel(),
          click_type: 'error'
        });
        (0, _mintUi.Toast)(this.$t('xieyi-tips'));
        return;
      }

      var querystring = '';
      querystring += username;
      querystring += '|';
      querystring += sex;
      querystring += '|';
      querystring += gongli_nongli;
      querystring += '|';
      querystring += time_obj.year;
      querystring += '|';
      querystring += time_obj.month;
      querystring += '|';
      querystring += time_obj.date;
      querystring += '|';
      querystring += time_obj.birth_hour || '-1';

      window.localStorage.setItem('year_of_lucky_info', querystring);
      var path = 'detail?querystring=' + querystring;
      this.query_user_string = querystring;
      _utils2.default.firebaseLogEvent('10003', '-10002', 'click_2024report_main', 'click', {
        args_name: 'click_2024report_main',
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
      var _$route$query = this.$route.query,
          has_pay = _$route$query.has_pay,
          order_id = _$route$query.order_id,
          product_key = _$route$query.product_key;

      if (has_pay) {
        if (has_pay === 'SUCCESS') {
          (0, _api.getPayOrderInfoAPI)(order_id, this.getExtra(product_key, querystring)).then(function (res) {
            if (res.data) {
              _this2.$router.push({
                path: 'result',
                query: { order_id: order_id, status: 'SUCCESS' }
              });
            }
          });
        }
      } else {
        var same_ = this.productList.find(function (item) {
          return item.product_key === _this2.product_key;
        });
        var price = same_.price,
            unit = same_.unit,
            product_id = same_.product_id,
            google_goods_id = same_.google_goods_id,
            _product_key = same_.product_key;
        // 缓存最新一个订单信息

        localStorage.setItem('mlxz_fixed_order_info', querystring);
        localStorage.setItem('mlxz_fixed_order_key', this.product_key);
        localStorage.removeItem('mlxz_new_time_down_' + this.product_key);

        localStorage.setItem('mlxz_user_info_' + this.product_key, JSON.stringify({
          user_info: querystring,
          product_key: this.product_key
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
          product_key: _product_key,
          platform: 'ANDROID',
          product_id: product_id,
          extra_ce_suan: this.getExtra(_product_key, querystring)
        };
        (0, _api.payOrderAPI)(params).then(function (res) {
          if (res.status === 1000) {
            _mintUi.Indicator.close();
            _this2.order_id = res.data.id;
            window.psychicai_client.onWebPayDialog(res.data.id, price + '', unit, google_goods_id, _enum.reportEnum[_product_key]);
          }
        });
        return;
        this.$router.push({ path: path });
      }
    },


    /**
     * @description: 解析用户信息
     * @param {*} product_key 商品key
     * @param {*} querystring 用户信息拼接string
     * @return {*}
     */
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


    // 展示挽留弹窗  通过定时器
    showNoticePop: function showNoticePop() {
      var _this3 = this;

      this.timer = setInterval(function () {
        // 最新一个订单信息
        _this3.fix_order_info = localStorage.getItem('mlxz_fixed_order_info');
        _this3.new_order_key = localStorage.getItem('mlxz_fixed_order_key');
        var is_show_notice = localStorage.getItem('mlxz_show_notice_' + _this3.product_key);
        _this3.is_show_notice = is_show_notice ? +is_show_notice === 1 ? true : false : false;
        var time_ = localStorage.getItem('mlxz_count_down_' + _this3.product_key);
        var set_time_ = (5 * 60 + 48) * 1000 + 280;
        _this3.count_down = +time_ || 0;

        // this.count_down = time_ ? (set_time_ > +time_ ? set_time_ : +time_) : 0;

        _this3.local_time = +localStorage.getItem('mlxz_fixed_local_order_time') || 0;
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
        //
        this.logDiscountEvent();

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
        fb_param: {
          fbc: localStorage.getItem('_fbc'),
          fbp: localStorage.getItem('_fbp'),
          external_id: localStorage.getItem('mlxz_outer_visitor_id')
        },
        callback_url: location.origin + '/' + _utils2.default.getFBChannel() + '/' + _enum.path_enums[product_key] + '.html#/result?path=' + _enum.path_enums[product_key] + '&report_price=' + payment + '&discount_pay=1'
      };

      var res = await (0, _api.payOrderAPI)(params);
      localStorage.removeItem('mlxz_fixed_api_order_time');
      localStorage.removeItem('mlxz_fixed_api_order_id');
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
    }
  }
};

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _result_title_ = __webpack_require__(622);

var _result_title_2 = _interopRequireDefault(_result_title_);

var _result_title_3 = __webpack_require__(623);

var _result_title_4 = _interopRequireDefault(_result_title_3);

var _result_title_5 = __webpack_require__(624);

var _result_title_6 = _interopRequireDefault(_result_title_5);

var _result_title_guiren = __webpack_require__(1305);

var _result_title_guiren2 = _interopRequireDefault(_result_title_guiren);

var _result_title_7 = __webpack_require__(625);

var _result_title_8 = _interopRequireDefault(_result_title_7);

var _result_title_caifu = __webpack_require__(629);

var _result_title_caifu2 = _interopRequireDefault(_result_title_caifu);

var _result_title_9 = __webpack_require__(626);

var _result_title_10 = _interopRequireDefault(_result_title_9);

var _result_title_11 = __webpack_require__(627);

var _result_title_12 = _interopRequireDefault(_result_title_11);

var _result_title_13 = __webpack_require__(628);

var _result_title_14 = _interopRequireDefault(_result_title_13);

var _result_title_15 = __webpack_require__(1446);

var _result_title_16 = _interopRequireDefault(_result_title_15);

var _result_title_17 = __webpack_require__(1447);

var _result_title_18 = _interopRequireDefault(_result_title_17);

var _result_title_19 = __webpack_require__(1448);

var _result_title_20 = _interopRequireDefault(_result_title_19);

var _result_title_21 = __webpack_require__(1449);

var _result_title_22 = _interopRequireDefault(_result_title_21);

var _result_title_23 = __webpack_require__(1450);

var _result_title_24 = _interopRequireDefault(_result_title_23);

var _result_title_25 = __webpack_require__(1451);

var _result_title_26 = _interopRequireDefault(_result_title_25);

var _result_title_27 = __webpack_require__(1452);

var _result_title_28 = _interopRequireDefault(_result_title_27);

var _enum = __webpack_require__(2);

var _yun_location_yell_13x = __webpack_require__(362);

var _yun_location_yell_13x2 = _interopRequireDefault(_yun_location_yell_13x);

var _yun_location_yell_23x = __webpack_require__(363);

var _yun_location_yell_23x2 = _interopRequireDefault(_yun_location_yell_23x);

var _yun_location_yell_33x = __webpack_require__(364);

var _yun_location_yell_33x2 = _interopRequireDefault(_yun_location_yell_33x);

var _yun_location_yell_43x = __webpack_require__(365);

var _yun_location_yell_43x2 = _interopRequireDefault(_yun_location_yell_43x);

var _yun_location_yell_53x = __webpack_require__(366);

var _yun_location_yell_53x2 = _interopRequireDefault(_yun_location_yell_53x);

var _yun_location_yell_63x = __webpack_require__(367);

var _yun_location_yell_63x2 = _interopRequireDefault(_yun_location_yell_63x);

var _yun_location_yell_73x = __webpack_require__(368);

var _yun_location_yell_73x2 = _interopRequireDefault(_yun_location_yell_73x);

var _yun_location_yell_83x = __webpack_require__(369);

var _yun_location_yell_83x2 = _interopRequireDefault(_yun_location_yell_83x);

var _result_title_nian_13x = __webpack_require__(1312);

var _result_title_nian_13x2 = _interopRequireDefault(_result_title_nian_13x);

var _result_title_nian_ = __webpack_require__(1432);

var _result_title_nian_2 = _interopRequireDefault(_result_title_nian_);

var _result_title_nian_23x = __webpack_require__(1313);

var _result_title_nian_23x2 = _interopRequireDefault(_result_title_nian_23x);

var _result_title_nian_3 = __webpack_require__(1438);

var _result_title_nian_4 = _interopRequireDefault(_result_title_nian_3);

var _result_title_nian_33x = __webpack_require__(1314);

var _result_title_nian_33x2 = _interopRequireDefault(_result_title_nian_33x);

var _result_title_nian_5 = __webpack_require__(1439);

var _result_title_nian_6 = _interopRequireDefault(_result_title_nian_5);

var _result_title_nian_43x = __webpack_require__(1315);

var _result_title_nian_43x2 = _interopRequireDefault(_result_title_nian_43x);

var _result_title_nian_7 = __webpack_require__(1440);

var _result_title_nian_8 = _interopRequireDefault(_result_title_nian_7);

var _result_title_nian_53x = __webpack_require__(1316);

var _result_title_nian_53x2 = _interopRequireDefault(_result_title_nian_53x);

var _result_title_nian_9 = __webpack_require__(1441);

var _result_title_nian_10 = _interopRequireDefault(_result_title_nian_9);

var _result_title_nian_63x = __webpack_require__(1317);

var _result_title_nian_63x2 = _interopRequireDefault(_result_title_nian_63x);

var _result_title_nian_11 = __webpack_require__(1442);

var _result_title_nian_12 = _interopRequireDefault(_result_title_nian_11);

var _result_title_nian_73x = __webpack_require__(1318);

var _result_title_nian_73x2 = _interopRequireDefault(_result_title_nian_73x);

var _result_title_nian_13 = __webpack_require__(1443);

var _result_title_nian_14 = _interopRequireDefault(_result_title_nian_13);

var _result_title_nian_83x = __webpack_require__(1319);

var _result_title_nian_83x2 = _interopRequireDefault(_result_title_nian_83x);

var _result_title_nian_15 = __webpack_require__(1444);

var _result_title_nian_16 = _interopRequireDefault(_result_title_nian_15);

var _result_title_nian_93x = __webpack_require__(1320);

var _result_title_nian_93x2 = _interopRequireDefault(_result_title_nian_93x);

var _result_title_nian_17 = __webpack_require__(1445);

var _result_title_nian_18 = _interopRequireDefault(_result_title_nian_17);

var _result_title_nian_103x = __webpack_require__(1307);

var _result_title_nian_103x2 = _interopRequireDefault(_result_title_nian_103x);

var _result_title_nian_19 = __webpack_require__(1433);

var _result_title_nian_20 = _interopRequireDefault(_result_title_nian_19);

var _result_title_nian_113x = __webpack_require__(1308);

var _result_title_nian_113x2 = _interopRequireDefault(_result_title_nian_113x);

var _result_title_nian_21 = __webpack_require__(1434);

var _result_title_nian_22 = _interopRequireDefault(_result_title_nian_21);

var _result_title_nian_123x = __webpack_require__(1309);

var _result_title_nian_123x2 = _interopRequireDefault(_result_title_nian_123x);

var _result_title_nian_23 = __webpack_require__(1435);

var _result_title_nian_24 = _interopRequireDefault(_result_title_nian_23);

var _result_title_nian_133x = __webpack_require__(1310);

var _result_title_nian_133x2 = _interopRequireDefault(_result_title_nian_133x);

var _result_title_nian_25 = __webpack_require__(1436);

var _result_title_nian_26 = _interopRequireDefault(_result_title_nian_25);

var _result_title_nian_143x = __webpack_require__(1311);

var _result_title_nian_143x2 = _interopRequireDefault(_result_title_nian_143x);

var _result_title_nian_27 = __webpack_require__(1437);

var _result_title_nian_28 = _interopRequireDefault(_result_title_nian_27);

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

// import * as echarts from 'echarts';


var Getmonth = function Getmonth() {
  var arr = [];
  for (var i = 0; i < 12; i++) {
    arr.push(i + 1 + '\u6708');
  }
  return arr;
};
exports.default = {
  props: {
    item_index: {
      type: Number,
      default: 1
    },
    result: {
      type: String | Object | Array,
      default: ''
    },
    content_arr: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    baoshi_icon: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    var _ref;

    return _ref = {
      title1: _result_title_2.default,
      title2: _result_title_4.default,
      title3: _result_title_6.default,
      title4: _result_title_guiren2.default,
      title5: _result_title_8.default,
      title6: _result_title_caifu2.default,
      title7: _result_title_10.default,
      title8: _result_title_12.default,
      title9: _result_title_14.default,
      tw_title1: _result_title_16.default,
      tw_title2: _result_title_18.default,
      tw_title3: _result_title_20.default,
      tw_title5: _result_title_22.default
    }, _defineProperty(_ref, 'tw_title5', _result_title_22.default), _defineProperty(_ref, 'tw_title6', _result_title_26.default), _defineProperty(_ref, 'tw_title7', _result_title_24.default), _defineProperty(_ref, 'tw_title8', _result_title_12.default), _defineProperty(_ref, 'tw_title9', _result_title_28.default), _defineProperty(_ref, 'direction_arr', [{
      k: '北方',
      v: _yun_location_yell_13x2.default
    }, {
      k: '东北方',
      v: _yun_location_yell_23x2.default
    }, {
      k: '東北方',
      v: _yun_location_yell_23x2.default
    }, {
      k: '东方',
      v: _yun_location_yell_33x2.default
    }, {
      k: '東方',
      v: _yun_location_yell_33x2.default
    }, {
      k: '东南方',
      v: _yun_location_yell_43x2.default
    }, {
      k: '東南方',
      v: _yun_location_yell_43x2.default
    }, {
      k: '南方',
      v: _yun_location_yell_53x2.default
    }, {
      k: '西南方',
      v: _yun_location_yell_63x2.default
    }, {
      k: '西方',
      v: _yun_location_yell_73x2.default
    }, {
      k: '西北方',
      v: _yun_location_yell_83x2.default
    }]), _defineProperty(_ref, 'year_arr', [{
      cn_k: '贵人',
      tw_k: '貴人',
      cn_v: _result_title_nian_13x2.default,
      tw_v: _result_title_nian_2.default
    }, {
      cn_k: '桃花',
      tw_k: '桃花',
      cn_v: _result_title_nian_23x2.default,
      tw_v: _result_title_nian_4.default
    }, {
      cn_k: '奔波',
      tw_k: '奔波',
      cn_v: _result_title_nian_33x2.default,
      tw_v: _result_title_nian_6.default
    }, {
      cn_k: '养生',
      tw_k: '養生',
      cn_v: _result_title_nian_43x2.default,
      tw_v: _result_title_nian_8.default
    }, {
      cn_k: '修行',
      tw_k: '修行',
      cn_v: _result_title_nian_53x2.default,
      tw_v: _result_title_nian_10.default
    }, {
      cn_k: '提拔',
      tw_k: '提拔',
      cn_v: _result_title_nian_63x2.default,
      tw_v: _result_title_nian_12.default
    }, {
      cn_k: '提升',
      tw_k: '提升',
      cn_v: _result_title_nian_73x2.default,
      tw_v: _result_title_nian_14.default
    }, {
      cn_k: '勤勉',
      tw_k: '勤勉',
      cn_v: _result_title_nian_83x2.default,
      tw_v: _result_title_nian_16.default
    }, {
      cn_k: '交际',
      tw_k: '交際',
      cn_v: _result_title_nian_93x2.default,
      tw_v: _result_title_nian_18.default
    }, {
      cn_k: '深造',
      tw_k: '深造',
      cn_v: _result_title_nian_103x2.default,
      tw_v: _result_title_nian_20.default
    }, {
      cn_k: '担当',
      tw_k: '擔當',
      cn_v: _result_title_nian_113x2.default,
      tw_v: _result_title_nian_22.default
    }, {
      cn_k: '无忧',
      tw_k: '無憂',
      cn_v: _result_title_nian_123x2.default,
      tw_v: _result_title_nian_24.default
    }, {
      cn_k: '平顺',
      tw_k: '平順',
      cn_v: _result_title_nian_133x2.default,
      tw_v: _result_title_nian_26.default
    }, {
      cn_k: '休闲',
      tw_k: '休閒',
      cn_v: _result_title_nian_143x2.default,
      tw_v: _result_title_nian_28.default
    }]), _defineProperty(_ref, 'language', _utils2.default.getLanguage()), _ref;
  },

  computed: {
    titleImg: function titleImg() {
      return this[(_utils2.default.getLanguage() === 'zh-CN' ? '' : 'tw_') + 'title' + this.item_index];
    },
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.item_index === 9) {
        _this.getEcharts();
      }
    });
  },

  methods: {
    /**
     * @description: 折线图配置及初始化
     * @return {*}
     */
    getEcharts: function getEcharts() {
      var self = this;
      var myChart = echarts.init(document.getElementById('echarts'));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 20,
          left: 5,
          right: 20,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Getmonth(),
          axisLabel: {
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 5,
          min: 0,
          max: 100,

          // 展示Y轴
          axisLine: {
            show: true,
            onZero: false
          },

          offset: 1,
          //   刻度线设置
          axisTick: {
            show: false
          },
          //   网格线设置
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#666',
            fontSize: 10,
            formatter: function formatter(value) {
              if (value === 20) {
                return self.$t('line-20');
              } else if (value === 40) {
                return self.$t('line-40');
              } else if (value === 60) {
                return self.$t('line-60');
              } else if (value === 80) {
                return self.$t('line-80');
              } else if (value === 100) {
                return self.$t('line-100');
              } else if (value === 0) {
                return '';
              }
            }
          }
        },
        series: [{
          name: self.$t('score-line'),
          type: 'line', //类型 折线
          smooth: true, //是否平滑
          itemStyle: {
            color: '#FF7A00'
          },
          data: self.result,
          showSymbol: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FFF1E3'
            }, {
              offset: 1,
              color: '#FDFAEC'
            }])
          }
        }]
      };

      myChart.setOption(option);
    },

    /**
     * @description: 获取开运颜色
     * @param {*} val
     * @return {*}
     */
    getColor: function getColor(val) {
      if (!val) return;
      var _same = _enum.color_enums.find(function (it) {
        return val === it.cn_k || val === it.tw_k;
      });
      return 'backgroundColor:' + _same.v;
    },

    /**
     * @description: 获取宝石颜色
     * @param {*} val
     * @return {*}
     */
    getBaoshi: function getBaoshi(val) {
      if (!val) return;
      var _same = _enum.icon_enums.find(function (it) {
        return val === it.cn_k || val === it.tw_k;
      });
      return _same.icon;
    },

    /**
     * @description: 获取开运方位图标
     * @param {*} val
     * @return {*}
     */
    getDirection: function getDirection(val) {
      if (!val) return;
      return this.direction_arr.find(function (it) {
        return it.k === val;
      }).v;
    },

    /**
     * @description: 获取运势定语标题
     * @param {*} val
     * @return {*}
     */
    getGoldYear: function getGoldYear(val) {
      if (!val) return;
      var _same = this.year_arr.find(function (it) {
        return val === it.cn_k || val === it.tw_k;
      });
      var _lang = this.language === 'zh-CN' ? 'cn_v' : 'tw_v';
      return _same[_lang];
    }
  }
};

/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mintUi = __webpack_require__(4);

var _api = __webpack_require__(6);

var _content_detail = __webpack_require__(1606);

var _content_detail2 = _interopRequireDefault(_content_detail);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _user_info = __webpack_require__(674);

var _user_info2 = _interopRequireDefault(_user_info);

var _lunarJavascript = __webpack_require__(94);

var _enum = __webpack_require__(2);

var _CodePop = __webpack_require__(122);

var _CodePop2 = _interopRequireDefault(_CodePop);

var _CopyCode = __webpack_require__(164);

var _CopyCode2 = _interopRequireDefault(_CopyCode);

var _year = __webpack_require__(1183);

var _year2 = _interopRequireDefault(_year);

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

exports.default = {
  components: { contentDetail: _content_detail2.default, UserInfo: _user_info2.default, CodePop: _CodePop2.default, CopyCode: _CopyCode2.default },
  data: function data() {
    return {
      loading: false,
      hasData: false,

      fortune: {
        career2024: '',
        emotion2024: '',
        gold2024: '',
        gold2024content: [],
        guide2024color: '',
        guide2024decoration: '',
        guide2024direction: '',
        health2024: '',
        review2023: '',
        taisui2024: '',
        wealth2024: '',
        whole2024: '',
        transfer_code: ''
      },
      advice: {},
      count: 0,
      status: '',
      is_finish: false,
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
      gan: ['-', '-', '-', '-'],
      zhi: ['-', '-', '-', '-'],
      extra_ce_suan: {},
      baoshi_icon: '',
      nayin: ['-', '-', '-', '-'],
      cai_bo_num: 0,
      gui_ren_num: 0,
      hun_yin_num: 0,
      ming_ge: '',
      riyuanqiangruo: '',
      shi_ye_num: 0,
      wuxingqiang: '',
      code_modal: false,
      cn_code_btn: 'https://psychicai-static.psychicai.pro/imgs/2404068a187ac69c42f1af1e1d0384bde2e6.png',
      tw_code_btn: _year2.default
    };
  },

  computed: {
    is_cn: function is_cn() {
      return _utils2.default.getLanguage() === 'zh-CN';
    }
  },
  created: function created() {
    // localStorage.removeItem('mlxz_fixed_order_info');
    // localStorage.removeItem('mlxz_fixed_order_key');
    // localStorage.removeItem('mlxz_fixed_local_order_time');
    // localStorage.removeItem('mlxz_fixed_api_order_time');
  },
  mounted: async function mounted() {
    window.scrollTo(0, 0);

    this.order_id = this.$route.query.order_id;

    _utils2.default.gcyLog('order_id:' + this.order_id, {
      mlxz_action_desc: '已进入结果页'
    });

    _utils2.default.firebaseLogEvent('10003', '-10009', 'page_view_2024report_result', 'page_view', {
      args_name: 'page_view_2024report_result',
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
          _utils2.default.firebaseLogEvent('10003', '-10017', 'event_status_2024reportdiscont_pay_success', 'event_status', {
            args_name: 'event_status_2024reportdiscont_pay_success',
            channel: _utils2.default.getFBChannel()
          });
        }
        if (repay) {
          _utils2.default.firebaseLogEvent('10002', '-10012', 'event_status_2024reporthistory_pay_success', 'event_status', {
            args_name: 'event_status_2024reporthistory_pay_success',
            channel: _utils2.default.getFBChannel()
          });
        }

        if (!discount_pay && !repay) {
          _utils2.default.firebaseLogEvent('10003', '-10007', 'event_status_2024report_pay_success', 'event_status', {
            args_name: 'event_status_2024report_pay_success',
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
          _utils2.default.firebaseLogEvent('10003', '-10018', 'event_status_2024reportdiscount_pay_fail', 'event_status', {
            args_name: 'event_status_2024reportdiscount_pay_fail',
            channel: _utils2.default.getFBChannel()
          });
        }
        if (repay) {
          _utils2.default.firebaseLogEvent('10002', '-10021', 'event_status_2024reporthistory_pay_fail', 'event_status', {
            args_name: 'event_status_2024reporthistory_pay_fail',
            channel: _utils2.default.getFBChannel()
          });
        }
        if (!discount_pay && !repay) {
          _utils2.default.firebaseLogEvent('10003', '-10008', 'event_status_2024report_pay_fail', 'event_status', {
            args_name: 'event_status_2024report_pay_fail',
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

    /**
     * @description: 订单结果更新
     * @return {*}
     */
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

        var product_key = '2024_report';
      }
      localStorage.removeItem('report_price');
      return res.status === 1000 ? 1 : 0;
    },


    /**
     * @description: 订单结果查询
     * @return {*}
     */
    query: function query() {
      var _this = this;

      this.count++;
      this.loading = true;
      _mintUi.Indicator.open(this.$t('result-check'));
      (0, _api.getResultAPI)({ order_id: this.$route.query.order_id }).then(function (res) {
        var can_store = res.data && ['PAYED', 'FAIL'].includes(res.data.status) || _this.count === 6 && ['PAYED', 'FAIL'].includes(res.data.status) ? true : false;

        if (res.data.status === 'PAYED') {
          _this.renderResult(res);
          _this.loading = false;
          _this.hasData = true;
          _mintUi.Indicator.close();
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


    /**
     * @description: 结果查询失败时 跳转首页
     * @return {*}
     */
    backNotice: function backNotice() {
      _mintUi.Indicator.close();
      (0, _mintUi.Toast)(this.$t('fail-result'));
      setTimeout(function () {
        location.href = 'year_of_lucky_2024.html';
      }, 1000);
    },


    /**
     * @description: 格式化res
     * @param {*} res
     * @return {*}
     */
    renderResult: function renderResult(res) {
      var _this2 = this;

      if (res.data.result) {
        this.fortune = res.data.result;
        this.fortune.transfer_code = res.data.transfer_code;
        this.advice.guide2024color = res.data.result.guide2024color;
        this.advice.guide2024decoration = res.data.result.guide2024decoration;
        this.advice.guide2024direction = res.data.result.guide2024direction;
        this.fortune.taisui2024 = this.fortune.taisui2024.replace(/\n/g, '<br/>');
        this.fortune.review2023 = this.fortune.review2023.replace(/\n/g, '<br/>');
        this.baoshi_icon = _enum.icon_enums.find(function (it) {
          return _this2.advice.guide2024decoration === it.cn_k || _this2.advice.guide2024decoration === it.tw_k;
        }).icon;
      }
      if (res.data.extra_ce_suan) {
        this.extra_ce_suan = res.data.extra_ce_suan;
        this.formateQueryUserInfo();
        this.getUserBazi();
      }
    },


    /**
     * @description: 获取八字数据
     * @return {*}
     */
    getUserBazi: async function getUserBazi() {
      var _extra_ce_suan = this.extra_ce_suan,
          birth_hour = _extra_ce_suan.birth_hour,
          birth_year = _extra_ce_suan.birth_year,
          birth_month = _extra_ce_suan.birth_month,
          birth_date = _extra_ce_suan.birth_date,
          is_gongli = _extra_ce_suan.is_gongli,
          date = _extra_ce_suan.date;

      var hour_ = birth_hour === '-1' ? '12' : birth_hour;
      var android_date = birth_year + '-' + birth_month + '-' + birth_date + ' ' + hour_ + ':00:00';
      var ios_date = birth_year + '/' + birth_month + '/' + birth_date + ' ' + hour_ + ':00:00';
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? android_date : ios_date));
      var lunar = solar.getLunar();
      var lunarMonth = _lunarJavascript.LunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      var is_leap = lunarMonth.isLeap();
      var data_ = {
        year: birth_year,
        month: birth_month,
        day: birth_date,
        hour: birth_hour,
        minute: '0',
        is_gongli: is_gongli,
        leap_month: '0',
        gender: this.sex
      };

      var _ref = await (0, _api.getBaziAPI)(data_),
          status = _ref.status,
          data = _ref.data;

      if (status !== 1000) return;
      var gan = data.gan,
          zhi = data.zhi,
          nayin = data.nayin,
          cai_bo_num = data.cai_bo_num,
          gui_ren_num = data.gui_ren_num,
          hun_yin_num = data.hun_yin_num,
          ming_ge = data.ming_ge,
          riyuanqiangruo = data.riyuanqiangruo,
          shi_ye_num = data.shi_ye_num,
          wuxingqiang = data.wuxingqiang;

      this.cai_bo_num = cai_bo_num;
      this.gui_ren_num = gui_ren_num;
      this.hun_yin_num = hun_yin_num;
      this.ming_ge = ming_ge;
      this.riyuanqiangruo = riyuanqiangruo;
      this.shi_ye_num = shi_ye_num;
      this.wuxingqiang = wuxingqiang;
      this.gan = gan;
      this.zhi = zhi;
      this.nayin = nayin;
    },


    /**
     * @description: 格式化用户信息
     * @return {*}
     */
    formateQueryUserInfo: function formateQueryUserInfo() {
      var _extra_ce_suan2 = this.extra_ce_suan,
          name = _extra_ce_suan2.name,
          birth_hour = _extra_ce_suan2.birth_hour,
          birth_year = _extra_ce_suan2.birth_year,
          birth_month = _extra_ce_suan2.birth_month,
          birth_date = _extra_ce_suan2.birth_date,
          is_gongli = _extra_ce_suan2.is_gongli,
          date = _extra_ce_suan2.date,
          sex = _extra_ce_suan2.sex;

      this.username = name;
      this.sex = sex;
      this.gongli_nongli = +is_gongli;
      this.picker_hour = _utils2.default.formateNongliHour(birth_hour);
      var android_date = birth_year + '-' + birth_month + '-' + birth_date;
      var ios_date = birth_year + '/' + birth_month + '/' + birth_date;
      var solar = _lunarJavascript.Solar.fromDate(new Date(_utils2.default.isAndroid() ? android_date : ios_date));
      var lunar = solar.getLunar();
      this.picker_date_nongli = +is_gongli ? lunar.getYear() + '\u5E74' + lunar.getMonthInChinese() + '\u6708' + lunar.getDayInChinese() + ' ' + this.picker_hour : birth_year + '\u5E74' + _utils2.default.formateNongliMonth(birth_month) + _utils2.default.formateNongliDate(birth_date) + ' ' + this.picker_hour;
      this.picker_date_yangli = +is_gongli ? birth_year + '-' + birth_month + '-' + birth_date + ' ' + this.picker_hour : _lunarJavascript.Lunar.fromYmd(+birth_year, +birth_month, +birth_date).getSolar().toString() + ' ' + this.picker_hour;
    }
  }
};

/***/ }),

/***/ 822:
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

exports.default = {
  name: 'app',
  created: function created() {
    document.title = this.$t('dom-title');
  }
};

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

var _year_of_lucky_ = __webpack_require__(725);

var _year_of_lucky_2 = _interopRequireDefault(_year_of_lucky_);

var _year_of_lucky_3 = __webpack_require__(702);

var _year_of_lucky_4 = _interopRequireDefault(_year_of_lucky_3);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _fastclick = __webpack_require__(17);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _mintUi = __webpack_require__(4);

var _mintUi2 = _interopRequireDefault(_mintUi);

__webpack_require__(67);

var _vueI18n = __webpack_require__(109);

var _vueI18n2 = _interopRequireDefault(_vueI18n);

var _cn = __webpack_require__(694);

var _cn2 = _interopRequireDefault(_cn);

var _tw = __webpack_require__(695);

var _tw2 = _interopRequireDefault(_tw);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: wujiang@weli.cn
 * @Date: 2023-11-15 11:33:50
 * @LastEditors: wujiang
 * @LastEditTime: 2024-04-16 11:01:43
 * @Description: 24年年运
 */
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
    setTimeout(scrollTo, 0, 0, 0);
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
document.body.style.backgroundColor = '#FFAA41';
new _vue2.default({
  el: '#app',
  router: _year_of_lucky_4.default,
  store: _index2.default,
  i18n: i18n,
  template: '<App/>',
  components: { App: _year_of_lucky_2.default }
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

/***/ 904:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 911:
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

/***/ }),

/***/ 937:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 940:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 95:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEUAAACYmJiZmZmYmJiVlZWYmJiYmJifn5+ZmZmZmZmZmZmampqZmZmZmZmVlZWZmZkPlpMwAAAAD3RSTlMAV+eUKTZ3DLr14XlQHhjrSwrhAAAAmklEQVQY033QsQkCQRCF4REUM7EDK5CzBiswtwhNzO1ArMASrgWrMLYFEQ9B4d1j5r3kgptgd4cv+dkYzuzp1+nI43LVNm3XRGBZ6xZdxOKGV2GDP68VuRAbXhOQE98RZmOx0Vxo7oRmoTnRcwDO+XBQpbkWlWb8il3r8qpVuVHlxhAbzfM2MfnDv0os/lEbopgaj3to9rsYnx6722jxhhVjaAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 952:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 954:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 967:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 99:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,UklGRgwCAABXRUJQVlA4WAoAAAAQAAAAKQAAIwAAQUxQSEwBAAABkGtr27FHb2wnpTvb6uyktZOSnd2pM2aOwLZt27Y9cwXft77vfY8gIhi4baTIS8d8fYQwVXzWvd/vLJSUyrdAqQoBuwCol2fV9hVDA/tiTYk4DYYc/vI22Jj9yG9MEHNww8FIxi0wxfowTGrYtqw/e2m1XPmPScL/I//jV4VdRl+MWZeFaWo57BTC6R4SavidqqlnIUmMIiMPbtmsKYQ5cUKK2ADNayyf8cH2h5zAvxzXzI5BFnLEbghakwXdsqqhc40nbJLlC1NirTzmmizrv2zVOM9zWeIplzT28UMllTPKNnkiv0k1dOgOtFHhG+9S+BVlnpT+Mpt0X+Z7W5Vfu/N9GbX80f5B5yBRiPArCv7KCtih+9PPXFwtlyX/dEXpcQQmFCaSvZmUO6Uo5TRvrNVEcg7uizWdxjt1mygpFW+AUjWE9+K7Ay7GBFZQOCCaAAAAEAQAnQEqKgAkAD6JNpNHpSMhoTHKAKARCUAW9wawIfSsiBCvgw0mW8AA/vPOI5kPeT8adJzplSXVSILX7lEmMwbjp9iP+g+n/IIcDxvsjzVgCxbSR3v8hQBcApdeMluwAt6BKc1+Vvbfwue5FIw2cXEWTHBJpHyKq2aa/9/bUsgLWgNmsN//5i/WDaQF84uGT/krf/+7yw0AAA=="

/***/ })

},[847]);