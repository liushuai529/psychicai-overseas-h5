<!--
 * @Author: wujiang@weli.cn
 * @Date: 2023-09-28 14:17:24
 * @LastEditors: wujiang
 * @LastEditTime: 2024-05-07 19:23:14
 * @Description:
-->

# 命里寻真 H5 FB 单独投放项目

### H5 页面地址：

- git 地址：https://gitlab.etouch.cn/weli-fed-project/psychicai-h5.git
- 测试环境：https://test-psychicai-h5.psychicai.pro
- 正式环境：https://psychicai-h5.psychicai.pro
- api 参数及签名规则见：https://gitlab.etouch.cn/psychic_fortune/psychicai-server.git

## H5 汇总页面

- page_overview：https://test-psychicai-h5.psychicai.pro/page_overview.html

## 商品名称 商品页面

- 测算主页：index
- 历史订单：history_order
- 即时测算：current_measure
- 2023 兔年一生财运：wealth_boutique_overseas
- 2023 兔年流年运程详批：new_year_luck_overseas
- 2024 龙年财富财运：lucky_year_report
- 事业精批：career_divination_overseas
- 姻缘分析：marriage_divination_overseas
- 八字合婚：marriage_measure_overseas
- 鬼谷子：guiguzi_fortune
- 袁天罡：weigh_bone
- 24 年感情运：emotion_fortune

## Adjust 埋点

- github 地址：https://github.com/adjust/web_sdk/blob/master/docs/chinese/README.md#installation
- SDK 地址：https://help.adjust.com/zh/article/set-log-level-web-sdk

## 投放链接
03、05渠道为感情运。05渠道仅为感情运（页面没有首页按钮）
03系列链接改为根据ip获取商品信息(10.15)
05系列链接改为根据ip获取商品信息(10.25)
测试
https://test-overseas.psychicai.pro/ocean03/emotion_fortune.html
https://test-overseas.psychicai.pro/ocean05/emotion_fortune.html
https://test-overseas.psychicai.pro/ocean06/tarot.html
正式
https://overseas.psychicai.pro/ocean03/emotion_fortune.html
https://overseas.psychicai.pro/ocean05/emotion_fortune.html
https://overseas.psychicai.pro/ocean06/tarot.html

07、08链接为正缘报告（07 马来，08台湾）
https://overseas.psychicai.pro/enjoy07/emotion_fate.html
07链接暂时停止投放（9.28）

09链接为几段婚姻（getTWChannel获取当前国家码需要特殊处理）前端针对09链接，不做 FB 像素上报 Purchase
https://overseas.psychicai.pro/enjoy09/emotion_marriages.html

10链接为感情复合（getTWChannel获取当前国家码需要特殊处理）前端针对09链接，不做 FB 像素上报 Purchase
https://overseas.psychicai.pro/enjoy10/emotion_remarriage.html


11链接为感情复合（getTWChannel获取当前国家码需要特殊处理）前端针对09链接，不做 FB 像素上报 Purchase
https://overseas.psychicai.pro/enjoy11/emotion_end.html

12链接为2025年运
https://overseas.psychicai.pro/ads12/year_of_lucky_2025.html

13链接为正缘报告复刻链接
https://overseas.psychicai.pro/ads13/emotion_fate13.html

16链接为2025感情运测算报告
https://overseas.psychicai.pro/gatherone16/emotion_fortune_2025.html#/


bjzxmlxz域名投放链接

https://test-overseas.bjzxmlxz.com/enjoyA03/emotion_fortune.html#/
https://test-overseas.bjzxmlxz.com/enjoyA05/emotion_fortune.html#/
https://test-overseas.bjzxmlxz.com/enjoyA08/emotion_fate.html#/
https://test-overseas.bjzxmlxz.com/enjoyA09/emotion_marriages.html#/
https://test-overseas.bjzxmlxz.com/enjoyA10/emotion_remarriage.html#/
https://test-overseas.bjzxmlxz.com/enjoyA11/emotion_end.html#/

mlxzfortune.xyz域名投放链接
https://test.mlxzfortune.xyz/gatherone03/emotion_fortune.html#/
https://www.mlxzfortune.xyz/gatherone03/emotion_fortune.html#/

hwcsserver.fyi 域名链接格式：
https://www.hwcsserver.fyi/zyy03/emotion_fortune.html#/
https://test.hwcsserver.fyi/zyy03/emotion_fortune.html#/