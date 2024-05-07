import huangli from './suishen.huangli.js';
import wnl from './suishen.wnl.js';

const nYear = {
  子: '鼠',
  醜: '牛',
  寅: '虎',
  卯: '兔',
  辰: '龙',
  巳: '蛇',
  午: '马',
  未: '羊',
  申: '猴',
  酉: '鸡',
  戌: '狗',
  亥: '猪',
};

const custom_font = {
  闰: '&#xE699;',
  月: '&#xE685;',
  初: '&#xE6b0;',
  廿: '&#xE6ac;',
  正: '&#xE687;',
  時: '&#xE6c6;',
  一: '&#xE694;',
  二: '&#xE69f;',
  三: '&#xE69a;',
  四: '&#xE68d;',
  五: '&#xE690;',
  六: '&#xE695;',
  七: '&#xE698;',
  八: '&#xE6ad;',
  九: '&#xE6a4;',
  十: '&#xE68b;',
  冬: '&#xE6b2;',
  腊: '&#xE6a7;',
  年: '&#xE812;',
  甲: '&#xE6bf;',
  乙: '&#xE6c0;',
  丙: '&#xE6c1;',
  丁: '&#xE6c4;',
  戊: '&#xE6c3;',
  己: '&#xE6c2;',
  庚: '&#xE6bd;',
  辛: '&#xE6aa;',
  壬: '&#xE6be;',
  癸: '&#xE6c5;',
  子: '&#xE6b3;',
  醜: '&#xE6b4;',
  寅: '&#xE6b5;',
  卯: '&#xE6b6;',
  辰: '&#xE6b7;',
  巳: '&#xE6b8;',
  午: '&#xE6b9;',
  未: '&#xE6ba;',
  申: '&#xE6bb;',
  酉: '&#xE6bc;',
  戌: '&#xE6a9;',
  亥: '&#xE6ab;',
  鼠: '&#xE803;',
  牛: '&#xE801;',
  虎: '&#xE802;',
  兔: '&#xE800;',
  龙: '&#xE804;',
  蛇: '&#xE805;',
  马: '&#xE806;',
  羊: '&#xE807;',
  猴: '&#xE808;',
  鸡: '&#xE811;',
  狗: '&#xE809;',
  猪: '&#xE810;',
};

/**
 * 选择日历中的某一天
 * @param {any} monthData
 * @param {any} year
 * @param {any} month
 * @param {any} date
 * @returns
 */
function selectedDay(
  monthData,
  currentInfo = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  }
) {
  let res = monthData.filter(function (item) {
    return (
      item.year == currentInfo.year &&
      item.month == currentInfo.month &&
      item.date == currentInfo.date
    );
  });
  return res && res.length > 0 ? res[0] : null;
}

/**
 * 获取黄历農曆等信息
 *
 * @param {any} [currentInfo={ year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: new Date().getDate() }]
 * @returns
 */
function getHuangliInfo(
  currentInfo = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  }
) {
  let monthData = wnl.getOneMonthShowData(currentInfo.year, currentInfo.month);
  let dayData = selectedDay(monthData, currentInfo);
  let yiAndJi = huangli.getAlmanacYiJi(
    dayData.nmonthcyl_int,
    dayData.ndatecyl_int
  );
  let resData = {
    huangli: {
      yi: yiAndJi.y == '' ? '暂无' : yiAndJi.y,
      ji: yiAndJi.j == '' ? '暂无' : yiAndJi.j,
      huangli_info: getGanzhi(dayData),
      huangli_another_info: getAnotherGanzhi(dayData),
    },
    nongli: {
      date:
        (dayData.isleapMonth == 0 ? '' : '闰') +
        dayData.nmonthstr +
        dayData.ndatestr,
      nmonth: (dayData.isleapMonth == 0 ? '' : '闰') + dayData.nmonthstr,
      ndate: dayData.ndatestr,
      jieqi: dayData.jieqi,
      jieri: dayData.festival,
      // xingzuo: getXingzuo(month, date)
    },
  };

  return resData;

  function getGanzhi(dayData) {
    return (
      dayData.nyearcyl +
      '年 ' +
      dayData.nmonthcyl +
      '月 ' +
      dayData.ndatecyl +
      '日'
    );
  }

  // 和上面一样 只是多了"()"  丙申(猴)年
  function getAnotherGanzhi(dayData) {
    let t = dayData.nyearcyl[1];
    return (
      dayData.nyearcyl +
      '（' +
      nYear[t] +
      '）' +
      '年 ' +
      dayData.nmonthcyl +
      '月 ' +
      dayData.ndatecyl +
      '日'
    );
  }
}
/**
 * 获取黄历页面详细信息
 *
 * @param {any} [currentInfo={ year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: new Date().getDate() }]
 * @returns
 */
function getHuangliDetailInfo(
  currentInfo = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  }
) {
  let monthData = wnl.getOneMonthShowData(currentInfo.year, currentInfo.month);
  let dayData = selectedDay(monthData, currentInfo);
  let jiXiong = huangli.getAlmanacJiXiong(dayData.nmonth, dayData.ndatecyl_int);

  return {
    wu_xing: {
      wu_xing: huangli.getAlmanacWuXing(dayData.ndatecyl_int),
      chong_sha: huangli.getAlmanacChongSha(dayData.ndatecyl_int),
      zhi_shen: huangli.getAlmanacShiErZhiShen(
        dayData.nmonthcyl_int,
        dayData.ndatecyl_int
      ),
    },
    shi_chen: huangli.getAlmanacShiChen(dayData.ndatecyl_int),
    other: {
      chu_jian: huangli.getAlmanacJianChuShiErShen(
        dayData.nmonthcyl_int,
        dayData.ndatecyl_int
      ),
      xing_xiu: huangli.getAlmanacXingXiu(dayData.ndatecyl_int),
      ji_shen: jiXiong.j,
      jin_ri: huangli.getAlmanacTaiShen(dayData.ndatecyl_int),
      xiong_shen: jiXiong.x,
      bai_ji: huangli.getAlmanacPengZu(dayData.ndatecyl_int),
      fang_wei: huangli.getAlmanacZhuShenFangWei(dayData.ndatecyl_int),
    },
  };
}

/**
 * 转换为自定义字体
 *
 * @param {any} ori_font
 */
function convert2CustomFont(ori_font) {
  let res = ori_font.split('').map((item, index) => {
    return custom_font[item] ? custom_font[item] : '';
  });
  return res.join('');
}

export default {
  /**
   * 获取黄历農曆等信息
   */
  getHuangliInfo,
  /**
   * 获取黄历页面详细信息
   */
  getHuangliDetailInfo,
  /**
   * 转换为自定义字体
   */
  convert2CustomFont,
};
