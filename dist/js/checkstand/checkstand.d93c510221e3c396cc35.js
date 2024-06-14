webpackJsonp([16],{

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

/***/ 1051:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg-bottom.57683fc.png";

/***/ }),

/***/ 1052:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1053:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAyZJREFUWEfNmN9LFFEUx7/H8ccqFgQl9BJZGCX5Y4p6KBPBGnVF6qHAiB4i8gcUFP0BIQi9+GAYZiqGmClkIIWbDgViWy+SWyG5QVD0EqTgQ5BrMXtiZh3bHWd2ZnWMua/33HM+55x7zv1BSHEU10n5gsJVzFRGwAEQ72LQFlUNgX+C6RsDc0QcVASa+PBM/pKKCXIoLIjV0jlOw1ViPgYiZ+uYmYneUBR3Q+PyYwCKnT1bxWJV5UkIQgeA/XbKbObDUJRroYmXL5LJWQLtrqjwbcvJbAfQoGXDncEAuhd//b7+dXIyYqbS1JBYc2IH4BsD0RF3OAxamKeBSG3o+at5o/41QBoMZU+5kCI7X8LgpXIjVAKQlqbsjKlNi4wRkXl6celPeXz6EoBEv9QFoNHONZfn74cCcpOucxVopZpkFzewU26Gokh69elAguiXZv/DvrGCDIcC8kG1T2lAYrVUjzQMOXVpU+SiOB8al4c1oFK/FCTguNuGCvLzceNyAzIzMtDe14vZT2FLEwy8fheQy6iotnJPejTts+PjwCF1YcE+dLbextbcXG3F9x8/UHvpovVqZlbSaS+J/qomgO85tONIzAijLlqKRFB29gyY1WZtNbiZSmukh0S44MiSAyEzGHXZnb5e9D9Rz9dkQcIgiTXSWxAOJRPMzcmBEo1qXiYbVjC9w4/QOdBv7w5jhkT/qXmAtltJ19edxs0rjVAUBW09XRgJjJmKbhhG08oLVOqXIgRkmVlRrz3BkVFk+3wxcWa0dXdh6Ologrg7MAADy0mBVKtjDwawMy9vFcAI5RaM5rAKZJeyw0XF6GhphS/rXxB1qPdzHxNKW6d2vGfWpIUXHG3qoyUi2m+1rIGKLC+vpnPjMFqIZhyXvRmU0cH1RyamiVkt+xQaYzKojcKsIDWnfHSYQbkCox8dKlmqh2s8lCswsQqLHa4q0HquHypUSWEheoYG7TuwE4n46wcAb13QtCjFHoSeucJqQfXUJV8F8twzSIuSlx6KejF46imtQ3nqsyG+bXjmO8bQy7zzYWVsstqzidMlZrb50qOgInDKX3p/AQ1pnu7Ovx3+AAAAAElFTkSuQmCC"

/***/ }),

/***/ 1054:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA1VJREFUWEfNmE9sVFUUxr/vdTqvwSKGqtFgTBAWgAYTUsFMa8m0FRMbNiY0NK4ISiHpTNhgWBHiyuhCMtNEixo3mpKSuDE1UWc6ocwMgoVEAsiiCYmBYMQSoYX0TZn3mTtlyDC2tq+dxX3be+65v3vOO3/uIQJ+ybOn1mLmwVsiW0ltlI8XSaw0aiRM0sEfEn+nlEV96MfYtu3XghzBxQjvGhqq275m9S6JfSAiABa1zzBCyJPqP3Xj9smT3d3Fhc5bUHHidKqTDpMANpSsAEwSGhY4AuI3PPCu3W6aumPWVk80rkLIXQvhVULtAruIWesBuCpfsfgbnan/g5oX6OtMpuGeq2OS9j20yDjofBQOTw32Nu+8v9BNzfrA2PcrCoXGHsg/DGC9uQ/J4094PLgnGp2eS8ecQInRH55BnTtM4DUA0yKPuOEnj/U2N88sBqRaZmBsrN4r3D1I6UMADQJ+RdHrire9fata9j9ABoZ1DaOANgC6KemdeOubvywFpHpPIvvz6yS/A/g8wKsqTrdVQz0GZNw0GfZHjWUkXMSM0xWPRq/XAqasI5HJvIB6f5jEZmOplQWnrdJ9jwH150c+l9RbskyhbmutYSqhGC6eM5YiOdAXad9fXnsE9DCafgLgSX60Vm6az7qz7nMyAFz52lGOvhKQyTNta5oumdAW+UE80v5JLd00L1R+5BClj01KGL0x8YrJUyWg/lxqt8BBAONhd9WmpUZT0EuY6Ct4d66YlECop6+l80QJKJlNZ0G0gM57sUj0q6CKlyOfzGf2Qv6XEHKx1o5Wfno69VLI4biAKde9/9xik95yICr3muTpeSv+JNCIUGgdk2fS++HjM0AnYi2dPbU6KIieZC41CHA3hANM5Ea+IfSugH3xlo4vgiiqlWwil36fwHGB3zKZT5+HsEXEtnik41ytDgmiJ5FPb6VwFsQFJrLpWySeVtF7dq7aEkTxUmVny5X7l4S/mcylTdV1J56acI++3F1YqtLl7Dt6eSjc9E+TZ5KyfUD2ucy6n9q6sLctMVpXOqwrrla2H9Y1aMZKVrWw5bRvVZNvoKx7BpVcZ9ND8dG7yaandBnKqmFDZW9jzTimEsqqgVV1J1iqfSHukL/ASM9RFk7wkd6/alxfBRlO+NQAAAAASUVORK5CYII="

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

/***/ 1662:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [(!_vm.loading) ? [_c('div', {
    staticClass: "price"
  }, [_vm._v("\n            RM\n            "), _c('span', [_vm._v(_vm._s(_vm.product.price || "-"))])]), _vm._v(" "), _c('div', {
    staticClass: "good-name"
  }, [_vm._v("“" + _vm._s(_vm.name) + "”測算服務費用")]), _vm._v(" "), _c('div', {
    staticClass: "checkstand"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(1052),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("請選擇支付方式")]), _vm._v(" "), _vm._l((_vm.list), function(item, i) {
    return _c('div', {
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
        "src": __webpack_require__(1053),
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "check",
      attrs: {
        "src": __webpack_require__(1054),
        "alt": ""
      }
    })])
  })], 2), _vm._v(" "), _c('img', {
    staticStyle: {
      "margin-top": "-1px"
    },
    attrs: {
      "src": __webpack_require__(1051),
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "btn",
    on: {
      "click": _vm.pay
    }
  }, [_vm._v("去支付")])] : _vm._e()], 2)
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

/***/ 67:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(943)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(764),
  /* template */
  __webpack_require__(1662),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-70723544",
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

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

var _mintUi = __webpack_require__(4);

var _api = __webpack_require__(6);

var _enum = __webpack_require__(2);

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

// 名称映射
var payMethodsMap = {
    NET_BANKING: "FPX",
    AXIATABOOST: "Boost",
    TNG: "Touch'n Go",
    GRABPAY: "Grabpay",
    MAYBANK: "Maybank QR"
};

exports.default = {
    data: function data() {
        return {
            loading: false,
            product_id: "",
            product: {},
            payment_details: [],
            index: 0,
            paying: false
        };
    },

    computed: {
        // 商品名称
        name: function name() {
            return _enum.product_enums[this.product_id] || "-";
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
            return this.product_id == 101 || this.product_id == 102;
        }
    },
    created: function created() {
        document.title = "收銀台";
        this.query();
    },

    methods: {
        // 能否退款文本
        canRefund: function canRefund(type) {
            return type === "NET_BANKING" ? "不支持退款" : "支持退款";
        },

        // 获取图标
        getPayIcon: function getPayIcon(type) {
            return _defineProperty({}, type, true);
        },

        // 请求支付类型
        query: function query() {
            var _this = this;

            var product_id = new URLSearchParams(location.search).get("product_id");
            this.product_id = product_id;

            this.loading = true;
            _mintUi.Indicator.open("收銀台加載中...");

            // 区分运势商品和测算商品
            var api = this.isFortune ? _api.getFortuneGoodsListAPI : _api.getGoodsListAPI;

            api({ product_id: product_id }).then(function (res) {
                var products = res.data.products || [];
                _this.product = products[0] || {};
                _this.payment_details = _this.product.payment_details || {};
                _this.loading = false;
                _mintUi.Indicator.close();
            }).catch(function (err) {
                _this.loading = false;
                _mintUi.Indicator.close();
            });
        },

        // 解析参数字符串
        getExtra: function getExtra() {
            var params = null;
            var query_user_string = new URLSearchParams(location.search).get("query_user_string");
            var query_user_string_array = query_user_string.split("|");

            // 八字合婚 双人信息
            if (this.product_id == 1) {
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
                        date: (0, _moment2.default)(birth_year + "/" + birth_month + "/" + birth_date).format("YYYYMMDD")
                    };
                }
            return params;
        },

        // 支付
        pay: function pay() {
            var _this2 = this;

            // 支付公共参数
            var params = {
                payment_currency: this.product.currency,
                payment_target_org: this.list[this.index].payment_target_org,
                payment_type: this.list[this.index].payment_type,
                product_id: this.product_id
            };

            // 区分处理运势和测算的 callback和extra
            // if (this.isFortune) {
            //     params.callback_url = `${location.origin}/index.html?index=1&fortune_index=${this.product_id == 101 ? 1 : 2}`
            // } else {
            //     params.callback_url = `${location.origin}/${
            //         path_enums[this.product_id]
            //     }.html#/result`;
            //     params.extra = this.getExtra();
            // }

            var fbPath = localStorage.getItem("suishen_overseas_fb_path");

            if (this.isFortune) {
                params.callback_url = location.origin + "/" + fbPath + "/result.html?path=index&index=1&fortune_index=" + (this.product_id == 101 ? 1 : 2);
            } else {
                params.callback_url = location.origin + "/" + fbPath + "/result.html?path=" + _enum.path_enums[this.product_id];
                params.extra = this.getExtra();
            }

            if (this.paying) return false;

            var _product = this.product,
                currency = _product.currency,
                price = _product.price;

            localStorage.setItem('fb_currency', currency);
            localStorage.setItem('fb_price', price);

            this.paying = true;
            _mintUi.Indicator.open("訂單創建中...");
            (0, _api.orderAPI)(params).then(function (res) {
                var redirect_url = res.data.redirect_url;
                location.href = redirect_url;
                _mintUi.Indicator.close();
                _this2.paying = false;
            });
        }
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

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _checkstand = __webpack_require__(706);

var _checkstand2 = _interopRequireDefault(_checkstand);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _fastclick = __webpack_require__(17);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _mintUi = __webpack_require__(4);

var _mintUi2 = _interopRequireDefault(_mintUi);

__webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-24 15:50:59
 * @LastEditors: wujiang
 * @LastEditTime: 2023-10-19 11:32:45
 * @Description: 收银台
 * @FilePath: \find-future-overseas\src\pages\checkstand\entry.js
 */
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

_vue2.default.config.productionTip = false;

/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  store: _index2.default,
  template: '<App/>',
  components: { App: _checkstand2.default }
});

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

/* (ignored) */

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

/***/ 91:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 92:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 93:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 943:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 998:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 459,
	"./af.js": 459,
	"./ar": 467,
	"./ar-dz": 460,
	"./ar-dz.js": 460,
	"./ar-kw": 461,
	"./ar-kw.js": 461,
	"./ar-ly": 462,
	"./ar-ly.js": 462,
	"./ar-ma": 463,
	"./ar-ma.js": 463,
	"./ar-ps": 464,
	"./ar-ps.js": 464,
	"./ar-sa": 465,
	"./ar-sa.js": 465,
	"./ar-tn": 466,
	"./ar-tn.js": 466,
	"./ar.js": 467,
	"./az": 468,
	"./az.js": 468,
	"./be": 469,
	"./be.js": 469,
	"./bg": 470,
	"./bg.js": 470,
	"./bm": 471,
	"./bm.js": 471,
	"./bn": 473,
	"./bn-bd": 472,
	"./bn-bd.js": 472,
	"./bn.js": 473,
	"./bo": 474,
	"./bo.js": 474,
	"./br": 475,
	"./br.js": 475,
	"./bs": 476,
	"./bs.js": 476,
	"./ca": 477,
	"./ca.js": 477,
	"./cs": 478,
	"./cs.js": 478,
	"./cv": 479,
	"./cv.js": 479,
	"./cy": 480,
	"./cy.js": 480,
	"./da": 481,
	"./da.js": 481,
	"./de": 484,
	"./de-at": 482,
	"./de-at.js": 482,
	"./de-ch": 483,
	"./de-ch.js": 483,
	"./de.js": 484,
	"./dv": 485,
	"./dv.js": 485,
	"./el": 486,
	"./el.js": 486,
	"./en-au": 487,
	"./en-au.js": 487,
	"./en-ca": 488,
	"./en-ca.js": 488,
	"./en-gb": 489,
	"./en-gb.js": 489,
	"./en-ie": 490,
	"./en-ie.js": 490,
	"./en-il": 491,
	"./en-il.js": 491,
	"./en-in": 492,
	"./en-in.js": 492,
	"./en-nz": 493,
	"./en-nz.js": 493,
	"./en-sg": 494,
	"./en-sg.js": 494,
	"./eo": 495,
	"./eo.js": 495,
	"./es": 499,
	"./es-do": 496,
	"./es-do.js": 496,
	"./es-mx": 497,
	"./es-mx.js": 497,
	"./es-us": 498,
	"./es-us.js": 498,
	"./es.js": 499,
	"./et": 500,
	"./et.js": 500,
	"./eu": 501,
	"./eu.js": 501,
	"./fa": 502,
	"./fa.js": 502,
	"./fi": 503,
	"./fi.js": 503,
	"./fil": 504,
	"./fil.js": 504,
	"./fo": 505,
	"./fo.js": 505,
	"./fr": 508,
	"./fr-ca": 506,
	"./fr-ca.js": 506,
	"./fr-ch": 507,
	"./fr-ch.js": 507,
	"./fr.js": 508,
	"./fy": 509,
	"./fy.js": 509,
	"./ga": 510,
	"./ga.js": 510,
	"./gd": 511,
	"./gd.js": 511,
	"./gl": 512,
	"./gl.js": 512,
	"./gom-deva": 513,
	"./gom-deva.js": 513,
	"./gom-latn": 514,
	"./gom-latn.js": 514,
	"./gu": 515,
	"./gu.js": 515,
	"./he": 516,
	"./he.js": 516,
	"./hi": 517,
	"./hi.js": 517,
	"./hr": 518,
	"./hr.js": 518,
	"./hu": 519,
	"./hu.js": 519,
	"./hy-am": 520,
	"./hy-am.js": 520,
	"./id": 521,
	"./id.js": 521,
	"./is": 522,
	"./is.js": 522,
	"./it": 524,
	"./it-ch": 523,
	"./it-ch.js": 523,
	"./it.js": 524,
	"./ja": 525,
	"./ja.js": 525,
	"./jv": 526,
	"./jv.js": 526,
	"./ka": 527,
	"./ka.js": 527,
	"./kk": 528,
	"./kk.js": 528,
	"./km": 529,
	"./km.js": 529,
	"./kn": 530,
	"./kn.js": 530,
	"./ko": 531,
	"./ko.js": 531,
	"./ku": 533,
	"./ku-kmr": 532,
	"./ku-kmr.js": 532,
	"./ku.js": 533,
	"./ky": 534,
	"./ky.js": 534,
	"./lb": 535,
	"./lb.js": 535,
	"./lo": 536,
	"./lo.js": 536,
	"./lt": 537,
	"./lt.js": 537,
	"./lv": 538,
	"./lv.js": 538,
	"./me": 539,
	"./me.js": 539,
	"./mi": 540,
	"./mi.js": 540,
	"./mk": 541,
	"./mk.js": 541,
	"./ml": 542,
	"./ml.js": 542,
	"./mn": 543,
	"./mn.js": 543,
	"./mr": 544,
	"./mr.js": 544,
	"./ms": 546,
	"./ms-my": 545,
	"./ms-my.js": 545,
	"./ms.js": 546,
	"./mt": 547,
	"./mt.js": 547,
	"./my": 548,
	"./my.js": 548,
	"./nb": 549,
	"./nb.js": 549,
	"./ne": 550,
	"./ne.js": 550,
	"./nl": 552,
	"./nl-be": 551,
	"./nl-be.js": 551,
	"./nl.js": 552,
	"./nn": 553,
	"./nn.js": 553,
	"./oc-lnc": 554,
	"./oc-lnc.js": 554,
	"./pa-in": 555,
	"./pa-in.js": 555,
	"./pl": 556,
	"./pl.js": 556,
	"./pt": 558,
	"./pt-br": 557,
	"./pt-br.js": 557,
	"./pt.js": 558,
	"./ro": 559,
	"./ro.js": 559,
	"./ru": 560,
	"./ru.js": 560,
	"./sd": 561,
	"./sd.js": 561,
	"./se": 562,
	"./se.js": 562,
	"./si": 563,
	"./si.js": 563,
	"./sk": 564,
	"./sk.js": 564,
	"./sl": 565,
	"./sl.js": 565,
	"./sq": 566,
	"./sq.js": 566,
	"./sr": 568,
	"./sr-cyrl": 567,
	"./sr-cyrl.js": 567,
	"./sr.js": 568,
	"./ss": 569,
	"./ss.js": 569,
	"./sv": 570,
	"./sv.js": 570,
	"./sw": 571,
	"./sw.js": 571,
	"./ta": 572,
	"./ta.js": 572,
	"./te": 573,
	"./te.js": 573,
	"./tet": 574,
	"./tet.js": 574,
	"./tg": 575,
	"./tg.js": 575,
	"./th": 576,
	"./th.js": 576,
	"./tk": 577,
	"./tk.js": 577,
	"./tl-ph": 578,
	"./tl-ph.js": 578,
	"./tlh": 579,
	"./tlh.js": 579,
	"./tr": 580,
	"./tr.js": 580,
	"./tzl": 581,
	"./tzl.js": 581,
	"./tzm": 583,
	"./tzm-latn": 582,
	"./tzm-latn.js": 582,
	"./tzm.js": 583,
	"./ug-cn": 584,
	"./ug-cn.js": 584,
	"./uk": 585,
	"./uk.js": 585,
	"./ur": 586,
	"./ur.js": 586,
	"./uz": 588,
	"./uz-latn": 587,
	"./uz-latn.js": 587,
	"./uz.js": 588,
	"./vi": 589,
	"./vi.js": 589,
	"./x-pseudo": 590,
	"./x-pseudo.js": 590,
	"./yo": 591,
	"./yo.js": 591,
	"./zh-cn": 592,
	"./zh-cn.js": 592,
	"./zh-hk": 593,
	"./zh-hk.js": 593,
	"./zh-mo": 594,
	"./zh-mo.js": 594,
	"./zh-tw": 595,
	"./zh-tw.js": 595
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 998;

/***/ })

},[828]);