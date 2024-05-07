/*Edit by LJG
 * 该类只存日历上農曆计算相关的数据和方法
 */
//日期资料
var lunarInfo = new Array(
  0x04bd8,
  0x04ae0,
  0x0a570, // 1900-1902
  0x054d5,
  0x0d260,
  0x0d950,
  0x16554,
  0x056a0,
  0x09ad0,
  0x055d2, // 1903-1909
  0x04ae0,
  0x0a5b6,
  0x0a4d0,
  0x0d250,
  0x1d255,
  0x0b540,
  0x0d6a0, // 1910-1916
  0x0ada2,
  0x095b0,
  0x14977,
  0x04970,
  0x0a4b0,
  0x0b4b5,
  0x06a50, // 1917-1923
  0x06d40,
  0x1ab54,
  0x02b60,
  0x09570,
  0x052f2,
  0x04970,
  0x06566, // 1924-1930
  0x0d4a0,
  0x0ea50,
  0x06e95,
  0x05ad0,
  0x02b60,
  0x186e3,
  0x092e0, // 1931-1937
  0x1c8d7,
  0x0c950,
  0x0d4a0,
  0x1d8a6,
  0x0b550,
  0x056a0,
  0x1a5b4, // 1938-1944
  0x025d0,
  0x092d0,
  0x0d2b2,
  0x0a950,
  0x0b557,
  0x06ca0,
  0x0b550, // 1945-1951
  0x15355,
  0x04da0,
  0x0a5b0,
  0x14573,
  0x052b0,
  0x0a9a8,
  0x0e950, // 1952-1958
  0x06aa0,
  0x0aea6,
  0x0ab50,
  0x04b60,
  0x0aae4,
  0x0a570,
  0x05260, // 1959-1965
  0x0f263,
  0x0d950,
  0x05b57,
  0x056a0,
  0x096d0,
  0x04dd5,
  0x04ad0, // 1966-1972
  0x0a4d0,
  0x0d4d4,
  0x0d250,
  0x0d558,
  0x0b540,
  0x0b6a0,
  0x195a6, // 1973-1979
  0x095b0,
  0x049b0,
  0x0a974,
  0x0a4b0,
  0x0b27a,
  0x06a50,
  0x06d40, // 1980-1986
  0x0af46,
  0x0ab60,
  0x09570,
  0x04af5,
  0x04970,
  0x064b0,
  0x074a3, // 1987-1993
  0x0ea50,
  0x06b58,
  0x05ac0,
  0x0ab60,
  0x096d5,
  0x092e0,
  0x0c960, // 1994-2000
  0x0d954,
  0x0d4a0,
  0x0da50,
  0x07552,
  0x056a0,
  0x0abb7,
  0x025d0, // 2001-2007
  0x092d0,
  0x0cab5,
  0x0a950,
  0x0b4a0,
  0x0baa4,
  0x0ad50,
  0x055d9, // 2008-2014
  0x04ba0,
  0x0a5b0,
  0x15176,
  0x052b0,
  0x0a930,
  0x07954,
  0x06aa0, // 2015-2021
  0x0ad50,
  0x05b52,
  0x04b60,
  0x0a6e6,
  0x0a4e0,
  0x0d260,
  0x0ea65, // 2022-2028
  0x0d530,
  0x05aa0,
  0x076a3,
  0x096d0,
  0x04afb,
  0x04ad0,
  0x0a4d0, // 2029-2035
  0x1d0b6,
  0x0d250,
  0x0d520,
  0x0dd45,
  0x0b5a0,
  0x056d0,
  0x055b2, // 2036-2042
  0x049b0,
  0x0a577,
  0x0a4b0,
  0x0aa50,
  0x1b255,
  0x06d20,
  0x0ada0, // 2043-2049
  0x14b63,
  0x09370,
  0x049f8,
  0x04970,
  0x064b0,
  0x168a6,
  0x0ea50,
  0x06b20, // 2050-2057
  0x1a6c4,
  0x0aae0,
  0x092e0,
  0x0d2e3,
  0x0c960,
  0x0d557,
  0x0d4a0,
  0x0da50, // 2058-2065
  0x05d55,
  0x056a0,
  0x0a6d0,
  0x055d4,
  0x052d0,
  0x0a9b8,
  0x0a950,
  0x0b4a0, // 2066-2073
  0x0b6a0,
  0x0ad50,
  0x55a0,
  0x0aba4,
  0x0a5b0,
  0x052b0,
  0x0b273, // 2074-2080
  0x06930,
  0x07337,
  0x06aa0,
  0x0ad50,
  0x14b55,
  0x04b60,
  0x0a570,
  0x054e0,
  0x0d160,
  0x0e958, // 2081-2090
  0x0d520,
  0x0daa0,
  0x16aa6,
  0x056d0,
  0x04ae0,
  0x0a9d4,
  0x0a4d0,
  0x0d150,
  0x0f252,
  0x0d520,
  0x0db27
); // 2091-2101
var jieqi = new Array(
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160716,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x07160615,
  0x07160716,
  0x08180918,
  0x09180918,
  0x08170817,
  0x07150514,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x07160615,
  0x07160716,
  0x08180918,
  0x09180918,
  0x08170817,
  0x07150514,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x07160615,
  0x06160716,
  0x08180918,
  0x09180918,
  0x08170817,
  0x07150514,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08170918,
  0x08170816,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x06160615,
  0x06160716,
  0x08180818,
  0x09180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150515,
  0x06150616,
  0x08170818,
  0x08170918,
  0x08170816,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170816,
  0x06150514,
  0x06160615,
  0x06160716,
  0x08180818,
  0x09180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x08170818,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170816,
  0x06150514,
  0x06150615,
  0x06160716,
  0x08180818,
  0x09180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x08170818,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160716,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160716,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x06150615,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x06150514,
  0x05150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08170918,
  0x08170816,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x05150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x08170818,
  0x08170918,
  0x08170816,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08180818,
  0x08180918,
  0x08170817,
  0x06150514,
  0x05150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x08170818,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150514,
  0x05140514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x05140514,
  0x05150615,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x05140514,
  0x05150615,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08180918,
  0x08170816,
  0x06150513,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06160616,
  0x08170818,
  0x08170918,
  0x08170816,
  0x06150513,
  0x05140414,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08170716,
  0x06150413,
  0x06150515,
  0x06150616,
  0x08170818,
  0x08170918,
  0x08170816,
  0x06150513,
  0x05140414,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x08170818,
  0x08170918,
  0x08170816,
  0x06150413,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170818,
  0x08170918,
  0x08170716,
  0x06150413,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140413,
  0x05140514,
  0x05150615,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150615,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170918,
  0x08170716,
  0x06150413,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140414,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08170716,
  0x06150413,
  0x05140414,
  0x05140515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x06150514,
  0x06150616,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140413,
  0x05140514,
  0x05150615,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170818,
  0x08160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x06150615,
  0x07170817,
  0x08170817,
  0x07160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160717,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05140515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160717,
  0x07160615,
  0x05140312,
  0x05140413,
  0x05140515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x06150514,
  0x05150615,
  0x07170717,
  0x08170817,
  0x07160716,
  0x06140413,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160717,
  0x07150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160715,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05150514,
  0x05150615,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160717,
  0x07150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160715,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160717,
  0x07150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x04140514,
  0x06160616,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05140515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x04140514,
  0x06160616,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160717,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05140515,
  0x07160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x04140514,
  0x06160616,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160717,
  0x07160615,
  0x05140312,
  0x05140413,
  0x05140515,
  0x06160717,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x05140413,
  0x04140514,
  0x06160616,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160717,
  0x07150615,
  0x05140312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160715,
  0x05140412,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x04140413,
  0x04140514,
  0x06160616,
  0x06160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160717,
  0x07150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160715,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160716,
  0x05140413,
  0x04130413,
  0x04140414,
  0x06160616,
  0x06160716,
  0x06150615,
  0x04130312,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160717,
  0x07150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140413,
  0x04130413,
  0x04140414,
  0x06160616,
  0x06160716,
  0x06150615,
  0x04130312,
  0x05140413,
  0x05140514,
  0x06160716,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x04130413,
  0x04140414,
  0x06160616,
  0x06160716,
  0x06150615,
  0x04130312,
  0x05140413,
  0x04140514,
  0x06160616,
  0x07160716,
  0x06150615,
  0x05130312,
  0x05140413,
  0x05140515,
  0x06160716,
  0x07160817,
  0x07160615,
  0x05140312,
  0x05140414,
  0x05150515,
  0x07160717,
  0x07170817,
  0x07160715,
  0x05140412,
  0x05140514,
  0x05150515,
  0x07170717,
  0x07170817,
  0x07160716
);

var Gan = new Array('甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸');
var Zhi = Array(
  '子',
  '丑',
  '寅',
  '卯',
  '辰',
  '巳',
  '午',
  '未',
  '申',
  '酉',
  '戌',
  '亥'
);
var Animals = new Array(
  '鼠',
  '牛',
  '虎',
  '兔',
  '龙',
  '蛇',
  '马',
  '羊',
  '猴',
  '鸡',
  '狗',
  '猪'
);
var arrayJieqi = new Array(
  '小寒',
  '大寒',
  '立春',
  '雨水',
  '惊蛰',
  '春分',
  '清明',
  '谷雨',
  '立夏',
  '小满',
  '芒种',
  '夏至',
  '小暑',
  '大暑',
  '立秋',
  '处暑',
  '白露',
  '秋分',
  '寒露',
  '霜降',
  '立冬',
  '小雪',
  '大雪',
  '冬至'
);
var arrayNDate = new Array(
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
  '三十'
);
var arrayNMonth = new Array(
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
  '腊月'
);
var weekDays = new Array(
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
);

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
      case 1: //1月1日~1月3日
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        break;
      case 2: //2月7日(除夕）~2月13日	2月6日（周六）、2月14日（周日）上班
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
      case 4: //4月2日~4月4日,4月30
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 5: //	4月30日~5月2日
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        break;
      case 6: //6月9日~6月11日 6月12日（周日）上班
        monthData[8].jiaBan = 0;
        monthData[9].jiaBan = 0;
        monthData[10].jiaBan = 0;
        monthData[11].jiaBan = 1;
        break;
      case 9: //9月15日~9月17日	9月18（周日）上班
        monthData[14].jiaBan = 0;
        monthData[15].jiaBan = 0;
        monthData[16].jiaBan = 0;
        monthData[17].jiaBan = 1;
        break;
      case 10: //10月1日~10月7日	10月8日（周六）、10月9日（周日）上班
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
      case 1: //1月1日~1月3日//1月27日(除夕）~2月2日	2月3日、2月4日上班
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[21].jiaBan = 1;
        monthData[26].jiaBan = 0;
        monthData[27].jiaBan = 0;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        monthData[30].jiaBan = 0;
        break;
      case 2: //1月27日(除夕）~2月2日	2月3日、2月4日上班
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 1;
        monthData[3].jiaBan = 1;
        break;
      case 4: //4月3日~4月5日
        monthData[0].jiaBan = 1;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 5: //	5月1日~5月3日，5月28日~5月30日(端午节)
        monthData[0].jiaBan = 0;
        monthData[26].jiaBan = 1;
        monthData[27].jiaBan = 0;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 9:
        monthData[29].jiaBan = 1;
        break;
      case 10: //10月1日~10月7日	10月8日（周日）上班
        monthData[0].jiaBan = 0;
        monthData[1].jiaBan = 0;
        monthData[2].jiaBan = 0;
        monthData[3].jiaBan = 0;
        monthData[4].jiaBan = 0;
        monthData[5].jiaBan = 0;
        monthData[6].jiaBan = 0;
        monthData[7].jiaBan = 0;
        break;
      case 12: //12月30，31 放18年元旦假
        monthData[29].jiaBan = 0;
        monthData[30].jiaBan = 0;
        break;
    }
  } else if (year == 2018) {
    switch (month) {
      case 1: // 12月30日 - 1月1日 元旦
        monthData[0].jiaBan = 0;
        break;
      case 2: // 2月15日-2月21日 过年	2月11日、2月24日上班
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
      case 4: //4月5日~4月7日 清明 4月8日加班  4月29日-5月1日国庆 4月28日加班
        monthData[4].jiaBan = 0;
        monthData[5].jiaBan = 0;
        monthData[6].jiaBan = 0;
        monthData[7].jiaBan = 1;
        monthData[27].jiaBan = 1;
        monthData[28].jiaBan = 0;
        monthData[29].jiaBan = 0;
        break;
      case 5: //	4月29日-5月1日国庆 4月28日加班
        monthData[0].jiaBan = 0;
        break;
      case 6: //	6月16-6月18日 端午节
        monthData[15].jiaBan = 0;
        monthData[16].jiaBan = 0;
        monthData[17].jiaBan = 0;
        break;
      case 9: // 9月22日-9月24日  中秋  9月29日、 9月30日加国庆班
        monthData[21].jiaBan = 0;
        monthData[22].jiaBan = 0;
        monthData[23].jiaBan = 0;
        monthData[28].jiaBan = 1;
        monthData[29].jiaBan = 1;
        break;
      case 10: //10月1日~10月7日
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

function getGongliFestivalInfoByYear(year = new Date().getFullYear()) {
  if (year === 2018) {
    return [
      {
        title: '元旦',
        date: '2018-1-1',
        time: '假期：12月30日~1月1日',
        off: '调休：无',
      },
      {
        title: '春节',
        date: '2018-2-16',
        time: '假期：2月15日~2月21日',
        off: '调休：2月11日（星期日）上班、2月24日（星期六）上班',
      },
      {
        title: '清明节',
        date: '2018-4-5',
        time: '假期：4月5日~4月7日',
        off: '调休：4月8日（星期六）上班',
      },
      {
        title: '劳动节',
        date: '2018-5-1',
        time: '假期：4月29日~5月1日',
        off: '调休：4月28日（星期六）上班',
      },
      {
        title: '端午节',
        date: '2018-6-18',
        time: '假期：6月16日~6月18日',
        off: '调休：无',
      },
      {
        title: '中秋节',
        date: '2018-9-24',
        time: '假期：9月22日~9月24日',
        off: '调休：无',
      },
      {
        title: '国庆节',
        date: '2018-10-1',
        time: '假期：10月1日~10月7日',
        off: '调休：9月29日（星期六）上班、9月30日（星期日）上班',
      },
    ];
  }

  return [];
}

function getJieqiInfo(year) {
  let res = [];

  //一年中一共有24个节气
  let sum = 24;
  for (let i = 0; i < sum; i++) {
    let date = getJieqi(year, i);

    res.push({
      title: arrayJieqi[i],
      date: year + '-' + (parseInt(i / 2) + 1) + '-' + date,
      time: year + '年' + (parseInt(i / 2) + 1) + '月' + date + '日',
    });
  }

  return res;
}

function getHotFestival() {
  let sum = 0,
    today = new Date().getTime();

  let res = [];
  let item, day, title;
  let nowYear, nowMonth, nowDate;
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
        time: nowYear + '年' + nowMonth + '月' + nowDate + '日',
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
  for (i = 0x8000; i > 0x8; i >>= 1) sum += lunarInfo[y - 1900] & i ? 1 : 0;
  return sum + leapDays(y);
}

// ====================================== 返回農曆 y年闰月的天数
function leapDays(y) {
  if (leapMonth(y)) return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
  else return 0;
}

// ====================================== 返回農曆 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
  var lm = lunarInfo[y - 1900] & 0xf;
  return lm == 0xf ? 0 : lm;
}

// ====================================== 返回農曆 y年m月的总天数
function monthDays(y, m) {
  return lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
}
// ====================================== 返回公曆y年m月的总天数
function getGongliOneMonthDays(year, month) {
  if (month == 2) {
    if (isGongliYearIsLeapYear(year)) {
      return 29;
    } else {
      return 28;
    }
  } else if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
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
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
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
  if (m > 2 || (m == 2 && d > 12)) {
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
    oneDay.festival = getGongliOneDayFestival(
      oneDay.year,
      oneDay.month,
      oneDay.date
    ); // 当天节日
    if (!oneDay.festival) {
      oneDay.festival = getNongliOneDayFestival(
        oneDay.nyear,
        oneDay.nmonth,
        oneDay.ndate
      );
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

export default {
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
  getOneMonthShowData,

  //获取24节气的日期
  /**
     * 获取24节气的日期
     *
     * function getJieqi(year, n);
        从小寒开始1年24个节气，每个公曆月中2个节气，此方法传入y年的第n个节气，则返回该节气在所再在月的日期。
     */
  getJieqi,

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
  calGongliToNongli,

  /**
     * 获取農曆y年的总天数
     *
     * function lYearDays(y)；
        返回值说明：
            int值，一年总天数
     */
  lYearDays,

  /**
     * 返回農曆y年闰月的天数
     *
     *  function leapDays(y);
        返回值说明：
            int值，如果農曆y年有闰月则返回闰月的天数，否则返回0
     */
  leapDays,

  /**
     * 返回農曆y年的闰月份
     *
     *  function leapMonth(y);
        返回值说明：
            int 值，返回農曆y年闰哪个月 1-12 , 没闰返回 0
     */
  leapMonth,

  /**
     * 返回農曆y年m月的总天数
     *
     * function monthDays(y, m);
        返回值说明：
            int 值，返回農曆y年m月总天数
     */
  monthDays,

  /**
     * 返回公曆y年m月的总天数
     *
     * function getGongliOneMonthDays(year, month);
        返回值说明：
            int 值，返回公曆y年m月总天数
     */
  getGongliOneMonthDays,

  /**
     * 返回農曆y年的生肖
     *
     *  function AnimalsYear(y);
        返回值说明：
            字符串，返回農曆y年的生肖
     */
  AnimalsYear,

  /**
     * 根据干支数字返回干支字符串
     *
     * function cyclicalm(gzNum);
        返回值说明：
            字符串，返回干支数字对应的干支字符串，如丙申、乙未
     */
  cyclicalm,
  /**
   * 获取节日信息
   */
  getGongliFestivalInfoByYear,
  /**
   * 获取节气列表信息
   */
  getJieqiInfo,
  /**
   * 获取热门节日列表信息
   */
  getHotFestival,
  getOneMonthData,
  arrayNMonth,
  arrayNDate,
  Zhi,
};
