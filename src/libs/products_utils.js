/*
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-21 15:18:19
 * @LastEditors: ZhaoZhiqi
 * @LastEditTime: 2022-12-15 16:58:13
 * @Description: Do not edit
 * @FilePath: \find-future-overseas\src\libs\products_utils.js
 */
import year_ad from './../assets/img/ad_year.png';
import heart_ad from './../assets/img/ad_heart.png';
import wealth_ad from './../assets/img/ad_wealth.png';
import career_ad from './../assets/img/ad_career.png';
import marriage_ad from './../assets/img/ad_marriage.png';
var curYear = new Date().getFullYear()
var prodcuts = [{
  title: `全年运势`,
  icon: year_ad,
  link: 'https://future.rili.cn/yearlyLuck.html',
  name: '全年运势'
},
// {
//     title: '每月运势',
//     icon: month_ad,
//     link: 'https://future.rili.cn/',
//     name: '流月运势'
// },
{
  title: '生财灵卦',
  icon: wealth_ad,
  link: 'https://future.rili.cn/wealth_divination.html',
  name: '生财灵卦'
},
{
  title: '求签启运',
  icon: heart_ad,
  link: 'https://future.rili.cn/heart_divination.html',
  name: '求签启运'
},
{
  title: '事業精批',
  icon: career_ad,
  link: 'https://future.rili.cn/career_divination.html',
  name: '事業精批'
},
{
  title: '姻緣心卦',
  icon: marriage_ad,
  link: 'https://future.rili.cn/marriage_divination.html',
  name: '姻緣心卦'
},
  // {
  //     title: '財運精批',
  //     icon: wealth_bq_ad,
  //     link: 'https://future.rili.cn/wealth_boutique.html',
  //     name: '財運精批'
  // }
]

export default {
  prodcuts
}