var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var entries = utils.getEntry('./src/pages/**/*.js');

var env = config.build.env;

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
    }),
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist'),
        ignore: ['.*'],
      },
    ]),
  ],
});

// 原始index.html模板
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/' + filename + '.html'),
    template: 'template/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// // enjoy代理01
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy01/' + filename + '.html'),
    template: 'template/index_enjoy.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// panda代理01
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/panda01/' + filename + '.html'),
    template: 'template/index_panda.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// // panda代理02
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/panda02/' + filename + '.html'),
    template: 'template/index_panda02.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// // enjoy02代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy02/' + filename + '.html'),
    template: 'template/index_enjoy02.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ads03代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads03/' + filename + '.html'),
    template: 'template/index_ads03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ads103代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads103/' + filename + '.html'),
    template: 'template/index_ads103.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoy03代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy03/' + filename + '.html'),
    template: 'template/index_enjoy03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
// enjoy103代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy103/' + filename + '.html'),
    template: 'template/index_enjoy103.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoy203代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy203/' + filename + '.html'),
    template: 'template/index_enjoy203.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoy303代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy303/' + filename + '.html'),
    template: 'template/index_enjoy303.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoyA03代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoyA03/' + filename + '.html'),
    template: 'template/index_enjoyA03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// panda03代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/panda03/' + filename + '.html'),
    template: 'template/index_panda03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ocean03代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean03/' + filename + '.html'),
    template: 'template/index_ocean03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ocean103代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean103/' + filename + '.html'),
    template: 'template/index_ocean103.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
   
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// google_ocean03代理
for (let pagePath of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let pageName = pagePath.split('/')[0];
  let htmlPluginConfig = {
    filename: path.resolve(__dirname, '../dist/google_ocean03/' + pageName + '.html'),
    template: 'template/index_google_ocean03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pagePath in webpackConfig.entry) {
    htmlPluginConfig.chunks = ['manifest', 'vendor', pagePath];
    htmlPluginConfig.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlPluginConfig));
}

// google_enjoy03代理
for (let pagePath of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let pageName = pagePath.split('/')[0];
  let conf = {
    filename: path.resolve(__dirname, '../dist/google_enjoy03/' + pageName + '.html'),
    template: 'template/index_google_enjoy03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pagePath in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pagePath];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// google_ads03代理
for (let pagePath of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let pageName = pagePath.split('/')[0];
  let htmlPluginConfig = {
    filename: path.resolve(__dirname, '../dist/google_ads03/' + pageName + '.html'),
    template: 'template/index_google_ads03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pagePath in webpackConfig.entry) {
    htmlPluginConfig.chunks = ['manifest', 'vendor', pagePath];
    htmlPluginConfig.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlPluginConfig));
}

// gatherone03代理
for (let pagePath of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let pageName = pagePath.split('/')[0];
  let htmlPluginConfig = {
    filename: path.resolve(__dirname, '../dist/gatherone03/' + pageName + '.html'),
    template: 'template/index_gatherone03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pagePath in webpackConfig.entry) {
    htmlPluginConfig.chunks = ['manifest', 'vendor', pagePath];
    htmlPluginConfig.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlPluginConfig));
}

// gatherone16代理
for (var pathname of ['emotion_fortune_2025/emotion_fortune_2025', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let pageName = pagePath.split('/')[0];
  let htmlPluginConfig = {
    filename: path.resolve(__dirname, '../dist/gatherone16/' + pageName + '.html'),
    template: 'template/index_gatherone16.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pagePath in webpackConfig.entry) {
    htmlPluginConfig.chunks = ['manifest', 'vendor', pagePath];
    htmlPluginConfig.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlPluginConfig));
}

// blue03代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/blue03/' + filename + '.html'),
    template: 'template/index_blue03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
   
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// zyy03代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/zyy03/' + filename + '.html'),
    template: 'template/index_zyy03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
   
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// lunamobi03代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/lunamobi03/' + filename + '.html'),
    template: 'template/index_lunamobi03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
   
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// ads05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads05/' + filename + '.html'),
    template: 'template/index_ads05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ads105代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads105/' + filename + '.html'),
    template: 'template/index_ads105.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}




// enjoy05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy05/' + filename + '.html'),
    template: 'template/index_enjoy05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// enjoy105代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy105/' + filename + '.html'),
    template: 'template/index_enjoy105.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// enjoy205代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy205/' + filename + '.html'),
    template: 'template/index_enjoy205.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// enjoy305代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy305/' + filename + '.html'),
    template: 'template/index_enjoy305.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoyA05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoyA05/' + filename + '.html'),
    template: 'template/index_enjoyA05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// ocean05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean05/' + filename + '.html'),
    template: 'template/index_ocean05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// ocean105代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean105/' + filename + '.html'),
    template: 'template/index_ocean105.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// blue05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/blue05/' + filename + '.html'),
    template: 'template/index_blue05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// zyy05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/zyy05/' + filename + '.html'),
    template: 'template/index_zyy05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// lunamobi05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/lunamobi05/' + filename + '.html'),
    template: 'template/index_lunamobi05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}





// ads07代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads07/' + filename + '.html'),
    template: 'template/index_ads07.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ads107代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads107/' + filename + '.html'),
    template: 'template/index_ads107.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// enjoy07代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy07/' + filename + '.html'),
    template: 'template/index_enjoy07.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// enjoy107代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy107/' + filename + '.html'),
    template: 'template/index_enjoy107.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// enjoy307代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy307/' + filename + '.html'),
    template: 'template/index_enjoy307.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// ocean07代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean07/' + filename + '.html'),
    template: 'template/index_ocean07.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// ocean107代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean107/' + filename + '.html'),
    template: 'template/index_ocean107.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// ads08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads08/' + filename + '.html'),
    template: 'template/index_ads08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}




// enjoy08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy08/' + filename + '.html'),
    template: 'template/index_enjoy08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// enjoy108代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy108/' + filename + '.html'),
    template: 'template/index_enjoy108.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// enjoy308代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy308/' + filename + '.html'),
    template: 'template/index_enjoy308.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoyA08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoyA08/' + filename + '.html'),
    template: 'template/index_enjoyA08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// ocean08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean08/' + filename + '.html'),
    template: 'template/index_ocean08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// blue08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/blue08/' + filename + '.html'),
    template: 'template/index_blue08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// enjoy09代理
for (var pathname of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy09/' + filename + '.html'),
    template: 'template/index_enjoy09.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// tt_gatherone08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/tt_gatherone08/' + filename + '.html'),
    template: 'template/index_tt_gatherone08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// tt_enjoy08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/tt_enjoy08/' + filename + '.html'),
    template: 'template/index_tt_enjoy08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// zyy08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/zyy08/' + filename + '.html'),
    template: 'template/index_zyy08.html',  
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// // enjoyA09代理
for (var pathname of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoyA09/' + filename + '.html'),
    template: 'template/index_enjoyA09.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// // ocean09代理
for (var pathname of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ocean09/' + filename + '.html'),
    template: 'template/index_ocean09.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// // ads09代理
for (var pathname of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads09/' + filename + '.html'),
    template: 'template/index_ads09.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// // ads10代理
for (var pathname of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads10/' + filename + '.html'),
    template: 'template/index_ads10.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ads110代理
for (var pathname of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads110/' + filename + '.html'),
    template: 'template/index_ads110.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// enjoy10代理
for (var pathname of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy10/' + filename + '.html'),
    template: 'template/index_enjoy10.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoyA10代理
for (var pathname of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoyA10/' + filename + '.html'),
    template: 'template/index_enjoyA10.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



//ads11代理
for (var pathname of ['emotion_end/emotion_end', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads11/' + filename + '.html'),
    template: 'template/index_ads11.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// ads15代理
for (var pathname of ['emotion_voice/emotion_voice', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads15/' + filename + '.html'),
    template: 'template/index_ads15.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



// ads111代理
for (var pathname of ['emotion_end/emotion_end', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads111/' + filename + '.html'),
    template: 'template/index_ads111.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// enjoyA11代理
for (var pathname of ['emotion_end/emotion_end', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoyA11/' + filename + '.html'),
    template: 'template/index_enjoyA11.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ads12代理
for (var pathname of ['year_of_lucky_2025/year_of_lucky_2025', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads12/' + filename + '.html'),
    template: 'template/index_ads12.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// ads13代理
for (var pathname of ['emotion_fate13/emotion_fate13', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/ads13/' + filename + '.html'),
    template: 'template/index_ads13.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// blue13代理
for (var pathname of ['emotion_fate13/emotion_fate13', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/blue13/' + filename + '.html'),
    template: 'template/index_blue13.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}




// mlzyy03代理
for (let pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename = pathname.split('/')[0];
  let conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy03/' + filename + '.html'),
    template: 'template/index_mlzyy03.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// mlzyy05代理
for (var pathname of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy05/' + filename + '.html'),
    template: 'template/index_mlzyy05.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy07代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy07/' + filename + '.html'),
    template: 'template/index_mlzyy07.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// mlzyy08代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy08/' + filename + '.html'),
    template: 'template/index_mlzyy08.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy108代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy108/' + filename + '.html'),
    template: 'template/index_mlzyy108.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy208代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy208/' + filename + '.html'),
    template: 'template/index_mlzyy208.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy308代理
for (var pathname of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy308/' + filename + '.html'),
    template: 'template/index_mlzyy308.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy09代理
for (var pathname of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy09/' + filename + '.html'),
    template: 'template/index_mlzyy09.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy10代理
for (var pathname of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy10/' + filename + '.html'),
    template: 'template/index_mlzyy10.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy11代理
for (var pathname of ['emotion_end/emotion_end', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy11/' + filename + '.html'),
    template: 'template/index_mlzyy11.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy12代理
for (var pathname of ['year_of_lucky_2025/year_of_lucky_2025', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy12/' + filename + '.html'),
    template: 'template/index_mlzyy12.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// mlzyy15代理
for (var pathname of ['emotion_voice/emotion_voice', 'user_agreement/user_agreement', 'privacy/privacy']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy15/' + filename + '.html'),
    template: 'template/index_mlzyy15.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


// mlzyy17代理
for (var pathname of ['launch_page/launch_page']) {
  var filename = pathname.split('/')[0];
  var conf = {
    filename: path.resolve(__dirname, '../dist/mlzyy17/' + filename + '.html'),
    template: 'template/index_mlzyy17.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
    },
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}





if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
