<!--
 * @Author: ZhaoZhiqi
 * @Date: 2022-12-13 15:50:43
 * @LastEditors: wujiang 
 * @LastEditTime: 2024-05-13 10:04:46
 * @Description: 运势
 * @FilePath: \find-future-overseas\src\pages\index2\fortune.vue
-->
<template>
  <div class="fortune-container">
    <div class="user-title">
      个人信息 <img src="../../assets/img/3.0/pen.png" alt="" />
    </div>
    <!-- 用户卡片 -->
    <div class="user-card">
      <img class="bg-top" src="../../assets/img/index/bg-top.png" />
      <div class="user-content">
        <div class="user-left">
          <div v-if="!userInfo.real_name" class="user-avatar"></div>
          <div v-else class="user-avatar" :class="getAvatar()"></div>
          <div class="user-info">
            <div class="user-name">
              {{ userInfo.real_name || '未设置用户信息' }}
            </div>
            <div class="user-date">
              {{ birth_str || '填写信息即可解锁運勢信息' }}
            </div>
          </div>
        </div>
        <div class="user-btn" @click="showSetVisible">设置</div>
      </div>
      <img class="bg-bottom" src="../../assets/img/index/bg-bottom.png" />
    </div>

    <!-- 设置弹窗 -->
    <div v-show="setVisible" class="modal" @click="setVisible = false">
      <div class="modal-card" @click.stop="">
        <div class="set-content">
          <div class="set-item">
            <div class="set-label">姓名</div>
            <div class="set-input">
              <input v-model="username" placeholder="請輸入您的姓名(漢字)" />
            </div>
          </div>
          <div class="set-item">
            <div class="set-label">生日</div>
            <div
              class="set-input"
              :style="{
                color: picker_date ? '#314A46' : 'rgba(49, 74, 70, 0.5)',
              }"
              @click="openPicker"
            >
              {{ picker_date || '請選擇生辰' }}
            </div>
            <img
              style="width: 0.12rem; height: 0.22rem"
              src="../../assets/img/index/fortune-arrow.png"
            />
          </div>
          <div class="set-item" style="border: none">
            <div class="set-label">性別</div>
            <div class="set-sex" :class="{ active: sex == 1 }" @click="sex = 1">
              男
            </div>
            <div class="set-sex" :class="{ active: sex == 0 }" @click="sex = 0">
              女
            </div>
          </div>
          <div class="set-save" @click="save">保存</div>
        </div>
        <img
          class="set-close"
          src="../../assets/img/index2/close.png"
          alt=""
          @click="setVisible = false"
        />
      </div>
    </div>

    <!-- 运势卡片 -->
    <div class="fortune-card">
      <img class="bg-top" src="../../assets/img/index/bg-top.png" />
      <div class="fortune-content">
        <div class="fortune-tabs">
          <div class="fortune-tab" @click="changeFortuneIndex(0)">
            <img
              v-if="fortune_index == 0"
              src="../../assets/img/index/tab-active.png"
            />
            <img v-else src="../../assets/img/index/tab.png" />
            <div
              class="fortune-tab-text"
              :class="{ active: fortune_index == 0 }"
            >
              今日
            </div>
          </div>
          <div class="fortune-tab" @click="changeFortuneIndex(1)">
            <img
              v-if="fortune_index == 1"
              src="../../assets/img/index/tab-active.png"
            />
            <img v-else src="../../assets/img/index/tab.png" />
            <div
              class="fortune-tab-text"
              :class="{ active: fortune_index == 1 }"
            >
              本周
            </div>
          </div>
          <div class="fortune-tab" @click="changeFortuneIndex(2)">
            <img
              v-if="fortune_index == 2"
              src="../../assets/img/index/tab-active.png"
            />
            <img v-else src="../../assets/img/index/tab.png" />
            <div
              class="fortune-tab-text"
              :class="{ active: fortune_index == 2 }"
            >
              今年
            </div>
          </div>
        </div>
        <div class="fortune-box">
          <!-- 今日 -->
          <div v-show="fortune_index == 0">
            <!-- 已注册展示 -->
            <div v-if="fortuneInfo.today" class="today-fortune">
              <!-- 今日指数 设置用户信息默认解锁 -->
              <div class="today-fortune-columns">
                <div class="columns-title">今日指數</div>
                <div class="columns-box">
                  <div class="columns-left">
                    <div>優</div>
                    <div>良</div>
                    <div>差</div>
                  </div>
                  <div class="columns-list">
                    <div
                      class="column"
                      v-for="(item, index) in fortuneInfo.today.scores"
                    >
                      <div class="column-line">
                        <div
                          class="column-value"
                          :style="{
                            height: `${item.score}%`,
                            backgroundColor: colors[index],
                          }"
                        ></div>
                        <div
                          class="column-number"
                          :style="{ bottom: `${item.score}%` }"
                        >
                          {{ item.score }}
                        </div>
                      </div>
                      <div class="column-text">{{ item.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 今日运势 设置信息后付费解锁 -->
              <template v-if="fortuneInfo.today.tag">
                <div class="today-fortune-section">
                  <div class="fortune-section">
                    <div class="section-title">{{ fortuneInfo.today.tag }}</div>
                    <div class="section-content">
                      {{ fortuneInfo.today.generalComment }}
                    </div>
                  </div>
                  <div class="fortune-section">
                    <div class="section-title">需要註意</div>
                    <div class="section-content">
                      {{ fortuneInfo.today.negative_energy_title }}
                    </div>
                  </div>
                </div>
                <div class="today-fortune-other">
                  <div
                    class="other-item"
                    v-for="item in fortuneInfo.today.tips"
                  >
                    <div class="other-label">{{ item.desc_show }}</div>
                    <div class="other-value">{{ item.title }}</div>
                  </div>
                </div>
              </template>
              <div v-else class="unlock">
                <img
                  class="bg-mock"
                  src="../../assets/img/index2/bg-mock-today-small.png"
                />
                <div class="unlock-content">
                  <img
                    class="lock"
                    src="../../assets/img/index/lock.png"
                    @click="unlock(103)"
                  />
                  <div class="lock-text" @click="unlock(103)">
                    点击即可付费解锁今日運勢
                  </div>
                  <div
                    v-if="dayProduct.price"
                    class="lock-btn"
                    @click="unlock(103)"
                  >
                    RM <span>{{ dayProduct.price }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 未注册锁定 -->
            <div v-else class="unlock">
              <img
                class="bg-mock"
                src="../../assets/img/index2/bg-mock-today.png"
              />
              <div class="unlock-content">
                <img
                  class="lock"
                  src="../../assets/img/index/lock.png"
                  @click="unlock(103)"
                />
                <div class="lock-text" @click="unlock(103)">
                  点击即可付费解锁今日運勢
                </div>
                <div
                  v-if="dayProduct.price"
                  class="lock-btn"
                  @click="unlock(103)"
                >
                  RM <span>{{ dayProduct.price }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 本周 -->
          <div v-show="fortune_index == 1">
            <!-- 已注册展示 -->
            <div v-if="fortuneInfo.week" class="week-fortune">
              <div class="week-tabs">
                <div
                  class="week-tab"
                  :class="{ active: week_tab_index == 0 }"
                  @click="week_tab_index = 0"
                >
                  綜合
                </div>
                <div
                  class="week-tab"
                  :class="{ active: week_tab_index == 1 }"
                  @click="week_tab_index = 1"
                >
                  愛情
                </div>
                <div
                  class="week-tab"
                  :class="{ active: week_tab_index == 2 }"
                  @click="week_tab_index = 2"
                >
                  財運
                </div>
                <div
                  class="week-tab"
                  :class="{ active: week_tab_index == 3 }"
                  @click="week_tab_index = 3"
                >
                  出行
                </div>
                <div
                  class="week-tab"
                  :class="{ active: week_tab_index == 4 }"
                  @click="week_tab_index = 4"
                >
                  健康
                </div>
              </div>
              <div class="chart-box">
                <div class="chart-left">
                  <div>極佳</div>
                  <div>不錯</div>
                  <div>還行</div>
                  <div>平平</div>
                  <div>不佳</div>
                </div>
                <div ref="chart" class="chart"></div>
              </div>
              <template
                v-if="fortuneInfo.week.yunShi && fortuneInfo.week.week_days"
              >
                <div
                  class="week-section"
                  v-for="(item, index) in fortuneInfo.week.yunShi"
                >
                  <div
                    class="week-title"
                    :class="{ active: weekIndex === index }"
                  >
                    {{ item.title }}
                    {{
                      moment(fortuneInfo.week.week_days[index]).format('MM.DD')
                    }}
                  </div>
                  <div class="week-text">{{ item.content }}</div>
                </div>
              </template>
              <div v-else class="unlock">
                <img
                  class="bg-mock"
                  src="../../assets/img/index2/bg-mock-week-small.png"
                />
                <div class="unlock-content">
                  <img
                    class="lock"
                    src="../../assets/img/index/lock.png"
                    @click="unlock(101)"
                  />
                  <div class="lock-text" @click="unlock(101)">
                    点击即可付费解锁本周運勢
                  </div>
                  <div
                    v-if="weekProduct.price"
                    class="lock-btn"
                    @click="unlock(101)"
                  >
                    RM <span>{{ weekProduct.price }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 未注册锁定 -->
            <div v-else class="unlock">
              <img
                class="bg-mock"
                src="../../assets/img/index2/bg-mock-week.png"
              />
              <div class="unlock-content">
                <img
                  class="lock"
                  src="../../assets/img/index/lock.png"
                  @click="unlock(101)"
                />
                <div class="lock-text" @click="unlock(101)">
                  点击即可付费解锁本周運勢
                </div>
                <div
                  v-if="weekProduct.price"
                  class="lock-btn"
                  @click="unlock(101)"
                >
                  RM <span>{{ weekProduct.price }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 今年 -->
          <div v-show="fortune_index == 2">
            <div v-if="fortuneInfo.year" class="year-fortune">
              <img class="year-img" src="../../assets/img/index/rabbit.png" />
              <div class="year-title">生肖：{{ fortuneInfo.year.zodiac }}</div>
              <div
                class="year-text"
                v-for="item in fortuneInfo.year.advice_full.split('\n')"
              >
                {{ item }}
              </div>
            </div>
            <div v-else class="unlock">
              <img
                class="bg-mock"
                src="../../assets/img/index2/bg-mock-year.png"
              />
              <div class="unlock-content">
                <img
                  class="lock"
                  src="../../assets/img/index/lock.png"
                  @click="unlock(102)"
                />
                <div class="lock-text" @click="unlock(102)">
                  点击即可付费解锁今年運勢
                </div>
                <div
                  v-if="yearProduct.price"
                  class="lock-btn"
                  @click="unlock(102)"
                >
                  RM <span>{{ yearProduct.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img class="bg-bottom" src="../../assets/img/index/bg-bottom.png" />
    </div>

    <div class="fb-footer">
      <div class="fb" style="margin-top: 0.36rem; margin-bottom: 0.3rem">
        更多詳細信息請訪問
        <div
          @click="
            toFb('https://www.facebook.com/profile.php?id=100086957902199')
          "
        >
          <img src="../../assets/img/index/fb.png" alt="" /><span class="link"
            >FB關注[linghit]</span
          >
        </div>
      </div>
      <div>
        如需幫助可發送郵件至 yangyaping@weli.cn
        <!-- <span class="link">yangyaping@weli.cn</span> -->
      </div>
      <div style="margin-bottom: 0.3rem">客服會盡快恢復您的問題</div>
      <div style="margin-bottom: 0.3rem">
        <span @click="toPage('service.html')">《通用服務條款及隱私政策》</span>
      </div>
    </div>

    <!-- 加载遮罩 -->
    <div v-if="loading" class="loading">
      <img src="../../assets/img/index/loading.png" />
      <span>加載中...</span>
    </div>

    <!-- 時间选择控件 -->
    <DatetimePicker
      ref="DatetimePicker"
      start="1960"
      end="2000"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && !show_nongli"
    ></DatetimePicker>
    <NongliPicker
      ref="NongliPicker"
      start="1960"
      end="2000"
      :year="year"
      :month="month"
      :date="date"
      :birth_hour="birth_hour"
      v-show="choose_time && show_nongli"
    ></NongliPicker>

    <!-- Popup -->
    <PayPopup
      :visible="popupVisible"
      :product_id="cur_product_id"
      @update-visible="popupVisible = false"
    ></PayPopup>
  </div>
</template>
<script>
import DatetimePicker from '../../components/DatetimePicker';
import NongliPicker from '../../components/NongliPicker';
import PayPopup from '../../components/PayPopup';
import utils from '../../libs/utils';
import wnl from '../../libs/suishen.wnl';
import moment from 'moment';
import * as echarts from 'echarts';
import {
  registerByUUIDAPI,
  updateUserInfoAPI,
  getUserInfoAPI,
  getFortuneAPI,
  getFortuneGoodsListAPI,
} from '../../api/api';
import { Toast, Indicator, MessageBox } from 'mint-ui';

export default {
  components: {
    DatetimePicker,
    NongliPicker,
    PayPopup,
  },
  data() {
    return {
      moment,
      loading: false,

      setVisible: false,
      popupVisible: false,

      // 下单相关
      cur_product_id: 0,

      // 运势解锁
      userInfo: {},
      birth_str: '',

      weekIndex: (moment().day() + 6) % 7, // moment().day()周一到周日为1234560，为了方便使用转换为 0123456
      fortune_index: utils.getQueryString('fortune_index') || 0,
      fortuneInfo: {
        calendar: {},
        user: {},
        today: null,
        week: null, // 解锁周运后
        year: null, // 解锁年运后
      },
      week_tab_index: 0,
      dayProduct: {}, // 今日运势产品数据
      weekProduct: {}, // 周运产品数据
      yearProduct: {}, // 年运产品数据

      // 今日运势数据
      colors: [
        '#F17C7D',
        '#EC6F94',
        '#7791F2',
        '#F0AF65',
        '#84C88D',
        '#BA7DE0',
      ],

      // 人物信息组件
      sex: '1', // 1男 0女
      year: '1995',
      month: '',
      date: '',
      birth_hour: '-1',
      username: '',
      picker_date: '',
      picker_date_obj: null,
      picker_hour: '',
      gongli_nongli: '1', // 1公曆 0農曆
      choose_time: false,
      show_nongli: false,
      curUserInfo: {},
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  computed: {
    // 周运折线图数据
    weekFigures() {
      if (this.fortuneInfo.week && this.fortuneInfo.week.figures) {
        return [
          this.fortuneInfo.week.figures[0].scores,
          this.fortuneInfo.week.figures[1].scores,
          this.fortuneInfo.week.figures[3].scores,
          this.fortuneInfo.week.figures[4].scores,
          this.fortuneInfo.week.figures[5].scores,
        ];
      } else {
        return [[], [], [], [], []];
      }
    },
  },
  watch: {
    fortune_index(newValue) {
      if (
        this.fortuneInfo.week &&
        this.fortuneInfo.week.figures &&
        newValue === 1
      ) {
        this.initChart();
      }
    },
    week_tab_index() {
      this.initChart();
    },
  },
  methods: {
    // 运势类型切换
    changeFortuneIndex(fortune_index) {
      this.fortune_index = fortune_index;
    },
    // 请求运势商品数据
    getProducts() {
      getFortuneGoodsListAPI().then(res => {
        let products = res.data.products;
        products &&
          products.forEach(item => {
            if (item.fortune_type === 'week') {
              this.weekProduct = item;
            } else if (item.fortune_type === 'year') {
              this.yearProduct = item;
            } else if (item.fortune_type === 'today') {
              this.dayProduct = item;
            }
          });
      });
    },
    // 展示设置弹窗
    showSetVisible() {
      if (this.userInfo.real_name) {
        this.username = this.userInfo.real_name;
        this.sex = this.userInfo.sex;
        this.year = moment(this.userInfo.birth_date).year();
        this.month = moment(this.userInfo.birth_date).month() + 1;
        this.date = moment(this.userInfo.birth_date).date();
        this.gongli_nongli = this.userInfo.normal;
        this.birth_hour =
          this.userInfo.birth_hour == -1
            ? -1
            : this.userInfo.birth_time.substr(0, 2) / 1;
        // 这里需要等待birth_hour更新时间选择组件后，再获取picker_date和picker_date_obj
        setTimeout(() => {
          this.picker_date = this.userInfo.normal
            ? this.$refs.DatetimePicker.getPickerDate()
            : this.$refs.NongliPicker.getPickerDate();
          this.picker_date_obj = this.userInfo.normal
            ? this.$refs.DatetimePicker.getPickerDateObj()
            : this.$refs.NongliPicker.getPickerDateObj();
          this.show_nongli = this.userInfo.normal ? false : true;

          this.curUserInfo = {
            username: this.username,
            sex: this.sex,
            year: this.year,
            month: this.month,
            date: this.date,
            gongli_nongli: this.gongli_nongli,
            birth_hour: this.birth_hour,
          };
          this.setVisible = true;
        }, 50);
      } else {
        this.setVisible = true;
      }
    },
    getAvatar() {
      let avatarIndex = localStorage.getItem('suishen_overseas_avatar');
      if (!avatarIndex) {
        avatarIndex = Math.ceil(Math.random() * 3);
        localStorage.setItem('suishen_overseas_avatar', avatarIndex);
      }
      return 'avatar_' + avatarIndex;
    },
    // 判断用户信息的数据是否变化
    diffUserInfo() {
      let diff = true;
      for (let key in this.curUserInfo) {
        if (this.curUserInfo[key] !== this[key]) {
          diff = false;
        }
      }
      return !diff;
    },
    // 设置
    save() {
      if (!this.registerValidator()) {
        return false;
      }
      // 注册
      let { year, month, date, birth_hour } = this.picker_date_obj;
      let device_id = localStorage.getItem('suishen_overseas_device_id');
      // 更新用户信息不需要更新头像
      if (!device_id || !localStorage.getItem('suishen_overseas_avatar')) {
        localStorage.setItem(
          'suishen_overseas_avatar',
          Math.ceil(Math.random() * 3)
        );
      }
      device_id = device_id || utils.generateUUID();
      let api = this.userInfo.real_name ? updateUserInfoAPI : registerByUUIDAPI;
      api({
        birth_date: moment(`${year}/${month}/${date}`).format('YYYYMMDD'),
        birth_time:
          birth_hour == -1
            ? -1
            : birth_hour < 10
            ? `0${birth_hour}00`
            : `${birth_hour}00`,
        device_id,
        leap_month: 0,
        normal: this.gongli_nongli,
        real_name: this.username,
        sex: this.sex,
      }).then(res => {
        res.data.access_token &&
          localStorage.setItem('suishen_overseas_token', res.data.access_token);
        res.data.open_uid &&
          localStorage.setItem('suishen_overseas_open_uid', res.data.open_uid);
        localStorage.setItem('suishen_overseas_uid', device_id);
        localStorage.setItem('suishen_overseas_device_id', device_id);

        this.query();
      });

      this.setVisible = false;
    },
    // 初始化周运折线图
    initChart() {
      this.$nextTick(() => {
        let chartDom = this.$refs.chart;
        let chart = echarts.init(chartDom);

        let { w_idx, color, data } = this.getOptionsParams();
        chart.setOption(this.getOptions(w_idx, color, data));
      });
    },
    // 获取折线图配置参数
    getOptionsParams() {
      return {
        w_idx: this.weekIndex,
        color: ['#F17C7D', '#EC6F94', '#F0AF65', '#84C88D', '#BA7DE0'][
          this.week_tab_index
        ],
        data: this.weekFigures[this.week_tab_index],
      };
    },
    /**
     * @description: 获取折线图配置
     * @param {number} w_idx 星期
     * @param {number} color 颜色
     * @param {Object} data 折线数据
     * @return {*}
     */
    getOptions(w_idx, color, data) {
      let symbol_index = 0;
      return {
        animation: true,
        animationDuration: 500,
        xAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          nameTextStyle: {
            color: '#00a',
          },
          boundaryGap: true,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(
            (item, index) => (index === w_idx ? '今天' : item)
          ),
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        grid: {
          top: 10,
          left: 0,
          right: 0,
          height: 110,
        },
        series: [
          {
            name: '周运',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: value => {
              let size = symbol_index == w_idx ? 24 : 7;
              symbol_index++;
              return size;
            },
            sampling: 'average',
            itemStyle: {
              color,
              borderColor: '#fff',
              borderWidth: 1.5,
            },
            stack: 'a',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color,
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0)',
                },
              ]),
            },
            label: {
              normal: {
                show: true,
                color: '#fff',
                fontSize: 14,
                position: ['5', '6'],
                formatter: param => {
                  return param.dataIndex === w_idx ? param.value : '';
                },
              },
            },
            data,
          },
        ],
      };
    },
    // 打开日期控件
    openPicker() {
      this.choose_time = true;
    },
    // 关闭日期控件
    closePicker() {
      this.choose_time = false;
    },
    // 加载运势数据
    query() {
      this.loading = true;
      // Indicator.open('運勢加載中...')

      Promise.all([
        getUserInfoAPI(),
        getFortuneAPI({ need_today_lock: 1, show_part: 1 }),
      ])
        .then(res => {
          /**
           * getUserInfoAPI 处理
           */
          this.userInfo = res[0].data;
          this.birth_str = this.formatBirthStr();

          /**
           * getFortuneAPI 处理
           */
          this.fortuneInfo = res[1].data;
          if (
            this.fortuneInfo.week &&
            this.fortuneInfo.week.figures &&
            this.fortune_index == 1
          ) {
            this.initChart();
          }

          this.loading = false;
          Indicator.close();
        })
        .catch(err => {
          this.loading = false;
          Indicator.close();
        });
    },
    // 转换农历日期
    formatBirthStr() {
      let birth_str = '';
      let birth_time_str = '';
      if (this.userInfo.normal == 1) {
        birth_time_str = '未知時間';
        let str = moment(this.userInfo.birth_date)
          .format('YYYY/MM/DD')
          .replace(/\//g, '-');
        let birth_time = this.userInfo.birth_time;
        if (birth_time !== '-1') {
          let idx = birth_time.substr(0, 2) / 1;
          birth_time_str = `${idx}時`;
        }
        birth_str = `${str} ${birth_time_str}`;
      } else {
        birth_time_str = '未知時辰';
        let m = moment(this.userInfo.birth_date);
        let year = m.year();
        let month = m.month();
        let date = m.date();
        let nmonth = wnl.arrayNMonth[month];
        let ndate = wnl.arrayNDate[date - 1];
        let birth_time = this.userInfo.birth_time;
        if (birth_time !== '-1') {
          let idx = birth_time.substr(0, 2) / 1;
          birth_time_str = `${wnl.Zhi[(idx + 2) / 2 - 1]}時`;
        }
        birth_str = `${year}年${nmonth}${ndate} ${birth_time_str}`;
      }
      return birth_str;
    },
    // 获取产品信息
    // queryProducts() {
    //     getFortuneGoodsListAPI().then(res => {
    //         res.data.products && res.data.products.forEach(item => {
    //             if(item.fortune_type === 'week') {
    //                 this.weekProduct = item;
    //             } else if(item.fortune_type === 'year') {
    //                 this.yearProduct = item;
    //             }
    //         })
    //     })
    // },
    toFb(url) {
      location.href = url;
    },
    // 跳转页面
    toPage(url) {
      location.href = url;
    },
    // 解锁 周运101 年运102 今日运势103
    unlock(product_id) {
      if (!this.userInfo.real_name) {
        Toast('请先填写用户信息方可解锁运势');
        return false;
      }
    },
    // 注册表单检验
    registerValidator() {
      if (!this.username) {
        Toast('請輸入您的姓名');
        return false;
      }
      if (!/^[\u4e00-\u9fa5]+$/g.test(this.username)) {
        Toast('請輸入中文姓名');
        return false;
      }
      if (!this.picker_date) {
        Toast('請選擇生辰');
        return false;
      }
      return true;
    },
  },
};
</script>
<style scoped lang="less">
@import './../../less/reset.less';
@import './../../less/common.less';
@import './fortune.less';
</style>
