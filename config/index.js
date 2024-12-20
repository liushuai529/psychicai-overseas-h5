/*
 * @Author: ZhaoZhiqi
 * @Date: 2022-11-21 15:14:36
 * @LastEditors: wujiang
 * @LastEditTime: 2023-11-01 11:07:38
 * @Description: Do not edit
 * @FilePath: \find-future-overseas\config\index.js
 */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var utils = require('./utils');

const ip = utils.getIp();

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist/'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  // test: {
  //   env: require('./test.env'),
  //   assetsRoot: path.resolve(__dirname, '../dist/'),
  //   assetsSubDirectory: '',
  //   assetsPublicPath: './',
  //   productionSourceMap: false,
  //   productionGzip: false,
  //   productionGzipExtensions: ['js', 'css'],
  //   bundleAnalyzerReport: process.env.npm_config_report
  // },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'https://test-psychicai-api.psychicai.pro/psychicai',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
};
