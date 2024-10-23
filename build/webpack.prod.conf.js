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
for (let pathname_index in entries) {
  let filename_index = pathname_index.split('/')[pathname_index.split('/').length - 1];
  let conf_index = {
    filename: path.resolve(__dirname, '../dist/' + filename_index + '.html'),
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
  if (pathname_index in webpackConfig.entry) {
    conf_index.chunks = ['manifest', 'vendor', pathname_index];
    conf_index.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_index));
}

// // enjoy代理01
// for (let pathname in entries) {
//   let filename = pathname.split('/')[pathname.split('/').length - 1];
//   let conf = {
//     filename: path.resolve(__dirname, '../dist/enjoy01/' + filename + '.html'),
//     template: 'template/index_enjoy.html',
//     inject: true,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true,
//       minifyJS: true,
//       minifyCSS: true,
//     },
//   };
//   if (pathname in webpackConfig.entry) {
//     conf.chunks = ['manifest', 'vendor', pathname];
//     conf.hash = false;
//   }

//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
// }

// // nova代理
// for (let pathname in entries) {
//   let filename = pathname.split('/')[pathname.split('/').length - 1];
//   let conf = {
//     filename: path.resolve(__dirname, '../dist/nova01/' + filename + '.html'),
//     template: 'template/index_nova.html',
//     inject: true,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true,
//       minifyJS: true,
//       minifyCSS: true,
//     },
//   };
//   if (pathname in webpackConfig.entry) {
//     conf.chunks = ['manifest', 'vendor', pathname];
//     conf.hash = false;
//   }

//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
// }

// // panda代理01
// for (let pathname in entries) {
//   let filename = pathname.split('/')[pathname.split('/').length - 1];
//   let conf = {
//     filename: path.resolve(__dirname, '../dist/panda01/' + filename + '.html'),
//     template: 'template/index_panda.html',
//     inject: true,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true,
//       minifyJS: true,
//       minifyCSS: true,
//     },
//   };
//   if (pathname in webpackConfig.entry) {
//     conf.chunks = ['manifest', 'vendor', pathname];
//     conf.hash = false;
//   }

//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
// }

// // panda代理02
// for (let pathname in entries) {
//   let filename = pathname.split('/')[pathname.split('/').length - 1];
//   let conf = {
//     filename: path.resolve(__dirname, '../dist/panda02/' + filename + '.html'),
//     template: 'template/index_panda02.html',
//     inject: true,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true,
//       minifyJS: true,
//       minifyCSS: true,
//     },
//   };
//   if (pathname in webpackConfig.entry) {
//     conf.chunks = ['manifest', 'vendor', pathname];
//     conf.hash = false;
//   }

//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
// }

// // enjoy02代理
// for (let pathname in entries) {
//   let filename = pathname.split('/')[pathname.split('/').length - 1];
//   let conf = {
//     filename: path.resolve(__dirname, '../dist/enjoy02/' + filename + '.html'),
//     template: 'template/index_enjoy02.html',
//     inject: true,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true,
//       minifyJS: true,
//       minifyCSS: true,
//     },
//   };
//   if (pathname in webpackConfig.entry) {
//     conf.chunks = ['manifest', 'vendor', pathname];
//     conf.hash = false;
//   }

//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
// }

// ads03代理
for (let pathname_ads03 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_ads03 = pathname_ads03.split('/')[0];
  let conf_ads03 = {
    filename: path.resolve(__dirname, '../dist/ads03/' + filename_ads03 + '.html'),
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
  if (pathname_ads03 in webpackConfig.entry) {
    conf_ads03.chunks = ['manifest', 'vendor', pathname_ads03];
    conf_ads03.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ads03));
}

// enjoy03代理
for (let pathname_enjoy03 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy03 = pathname_enjoy03.split('/')[0];
  let conf_enjoy03 = {
    filename: path.resolve(__dirname, '../dist/enjoy03/' + filename_enjoy03 + '.html'),
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
  if (pathname_enjoy03 in webpackConfig.entry) {
    conf_enjoy03.chunks = ['manifest', 'vendor', pathname_enjoy03];
    conf_enjoy03.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy03));
}
// enjoy103代理
for (let pathname_enjoy103 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy103 = pathname_enjoy103.split('/')[0];
  let conf_enjoy103 = {
    filename: path.resolve(__dirname, '../dist/enjoy103/' + filename_enjoy103 + '.html'),
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
  if (pathname_enjoy103 in webpackConfig.entry) {
    conf_enjoy103.chunks = ['manifest', 'vendor', pathname_enjoy103];
    conf_enjoy103.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy103));
}

// enjoy203代理
for (let pathname_enjoy203 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy203 = pathname_enjoy203.split('/')[0];
  let conf_enjoy203 = {
    filename: path.resolve(__dirname, '../dist/enjoy203/' + filename_enjoy203 + '.html'),
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
  if (pathname_enjoy203 in webpackConfig.entry) {
    conf_enjoy203.chunks = ['manifest', 'vendor', pathname_enjoy203];
    conf_enjoy203.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy203));
}

// enjoy303代理
for (let pathname_enjoy303 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy303 = pathname_enjoy303.split('/')[0];
  let conf_enjoy303 = {
    filename: path.resolve(__dirname, '../dist/enjoy303/' + filename_enjoy303 + '.html'),
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
  if (pathname_enjoy303 in webpackConfig.entry) {
    conf_enjoy303.chunks = ['manifest', 'vendor', pathname_enjoy303];
    conf_enjoy303.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy303));
}

// enjoyA03代理
for (let pathname_enjoyA03 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoyA03 = pathname_enjoyA03.split('/')[0];
  let conf_enjoyA03 = {
    filename: path.resolve(__dirname, '../dist/enjoyA03/' + filename_enjoyA03 + '.html'),
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
  if (pathname_enjoyA03 in webpackConfig.entry) {
    conf_enjoyA03.chunks = ['manifest', 'vendor', pathname_enjoyA03];
    conf_enjoyA03.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoyA03));
}

// panda03代理
for (let pathname_panda03 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_panda03 = pathname_panda03.split('/')[0];
  let conf_panda03 = {
    filename: path.resolve(__dirname, '../dist/panda03/' + filename_panda03 + '.html'),
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
  if (pathname_panda03 in webpackConfig.entry) {
    conf_panda03.chunks = ['manifest', 'vendor', pathname_panda03];
    conf_panda03.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_panda03));
}

// ocean03代理
for (let pathname_ocean03 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_ocean03 = pathname_ocean03.split('/')[0];
  let conf_ocean03 = {
    filename: path.resolve(__dirname, '../dist/ocean03/' + filename_ocean03 + '.html'),
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
  if (pathname_ocean03 in webpackConfig.entry) {
    conf_ocean03.chunks = ['manifest', 'vendor', pathname_ocean03];
    conf_ocean03.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean03));
}

// ocean103代理
for (let pathname_ocean103 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_ocean103 = pathname_ocean103.split('/')[0];
  let conf_ocean103 = {
    filename: path.resolve(__dirname, '../dist/ocean103/' + filename_ocean103 + '.html'),
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
  if (pathname_ocean103 in webpackConfig.entry) {
    conf_ocean103.chunks = ['manifest', 'vendor', pathname_ocean103];
    conf_ocean103.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean103));
}

// google_ocean03代理
for (let pathname_google_ocean03 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_google_ocean03 = pathname_google_ocean03.split('/')[0];
  let conf_google_ocean03 = {
    filename: path.resolve(__dirname, '../dist/google_ocean03/' + filename_google_ocean03 + '.html'),
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
  if (pathname_google_ocean03 in webpackConfig.entry) {
    conf_google_ocean03.chunks = ['manifest', 'vendor', pathname_google_ocean03];
    conf_google_ocean03.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_google_ocean03));
}

// ads05代理
for (let pathname_ads05 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_ads05 = pathname_ads05.split('/')[0];
  let conf_ads05 = {
    filename: path.resolve(__dirname, '../dist/ads05/' + filename_ads05 + '.html'),
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
  if (pathname_ads05 in webpackConfig.entry) {
    conf_ads05.chunks = ['manifest', 'vendor', pathname_ads05];
    conf_ads05.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ads05));
}




// enjoy05代理
for (let pathname_enjoy05 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy05 = pathname_enjoy05.split('/')[0];
  let conf_enjoy05 = {
    filename: path.resolve(__dirname, '../dist/enjoy05/' + filename_enjoy05 + '.html'),
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
  if (pathname_enjoy05 in webpackConfig.entry) {
    conf_enjoy05.chunks = ['manifest', 'vendor', pathname_enjoy05];
    conf_enjoy05.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy05));
}



// enjoy105代理
for (let pathname_enjoy105 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy105 = pathname_enjoy105.split('/')[0];
  let conf_enjoy105 = {
    filename: path.resolve(__dirname, '../dist/enjoy105/' + filename_enjoy105 + '.html'),
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
  if (pathname_enjoy105 in webpackConfig.entry) {
    conf_enjoy105.chunks = ['manifest', 'vendor', pathname_enjoy105];
    conf_enjoy105.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy105));
}


// enjoy205代理
for (let pathname_enjoy205 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy205 = pathname_enjoy205.split('/')[0];
  let conf_enjoy205 = {
    filename: path.resolve(__dirname, '../dist/enjoy205/' + filename_enjoy205 + '.html'),
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
  if (pathname_enjoy205 in webpackConfig.entry) {
    conf_enjoy205.chunks = ['manifest', 'vendor', pathname_enjoy205];
    conf_enjoy205.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy205));
}


// enjoy305代理
for (let pathname_enjoy305 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoy305 = pathname_enjoy305.split('/')[0];
  let conf_enjoy305 = {
    filename: path.resolve(__dirname, '../dist/enjoy305/' + filename_enjoy305 + '.html'),
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
  if (pathname_enjoy305 in webpackConfig.entry) {
    conf_enjoy305.chunks = ['manifest', 'vendor', pathname_enjoy305];
    conf_enjoy305.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy305));
}

// enjoyA05代理
for (let pathname_enjoyA05 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_enjoyA05 = pathname_enjoyA05.split('/')[0];
  let conf_enjoyA05 = {
    filename: path.resolve(__dirname, '../dist/enjoyA05/' + filename_enjoyA05 + '.html'),
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
  if (pathname_enjoyA05 in webpackConfig.entry) {
    conf_enjoyA05.chunks = ['manifest', 'vendor', pathname_enjoyA05];
    conf_enjoyA05.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoyA05));
}



// ocean05代理
for (let pathname_ocean05 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_ocean05 = pathname_ocean05.split('/')[0];
  let conf_ocean05 = {
    filename: path.resolve(__dirname, '../dist/ocean05/' + filename_ocean05 + '.html'),
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
  if (pathname_ocean05 in webpackConfig.entry) {
    conf_ocean05.chunks = ['manifest', 'vendor', pathname_ocean05];
    conf_ocean05.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean05));
}



// ocean105代理
for (let pathname_ocean105 of ['emotion_fortune/emotion_fortune', 'user_agreement/user_agreement', 'privacy/privacy', 'history_order/history_order']) {
  let filename_ocean105 = pathname_ocean105.split('/')[0];
  let conf_ocean105 = {
    filename: path.resolve(__dirname, '../dist/ocean105/' + filename_ocean105 + '.html'),
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
  if (pathname_ocean105 in webpackConfig.entry) {
    conf_ocean105.chunks = ['manifest', 'vendor', pathname_ocean105];
    conf_ocean105.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean105));
}





// ads07代理
for (let pathname_ads07 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ads07 = pathname_ads07.split('/')[0];
  let conf_ads07 = {
    filename: path.resolve(__dirname, '../dist/ads07/' + filename_ads07 + '.html'),
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
  if (pathname_ads07 in webpackConfig.entry) {
    conf_ads07.chunks = ['manifest', 'vendor', pathname_ads07];
    conf_ads07.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ads07));
}



// enjoy07代理
for (let pathname_enjoy07 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy07 = pathname_enjoy07.split('/')[0];
  let conf_enjoy07 = {
    filename: path.resolve(__dirname, '../dist/enjoy07/' + filename_enjoy07 + '.html'),
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
  if (pathname_enjoy07 in webpackConfig.entry) {
    conf_enjoy07.chunks = ['manifest', 'vendor', pathname_enjoy07];
    conf_enjoy07.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy07));
}



// enjoy107代理
for (let pathname_enjoy107 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy107 = pathname_enjoy107.split('/')[0];
  let conf_enjoy107 = {
    filename: path.resolve(__dirname, '../dist/enjoy107/' + filename_enjoy107 + '.html'),
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
  if (pathname_enjoy107 in webpackConfig.entry) {
    conf_enjoy107.chunks = ['manifest', 'vendor', pathname_enjoy107];
    conf_enjoy107.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy107));
}



// enjoy307代理
for (let pathname_enjoy307 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy307 = pathname_enjoy307.split('/')[0];
  let conf_enjoy307 = {
    filename: path.resolve(__dirname, '../dist/enjoy307/' + filename_enjoy307 + '.html'),
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
  if (pathname_enjoy307 in webpackConfig.entry) {
    conf_enjoy307.chunks = ['manifest', 'vendor', pathname_enjoy307];
    conf_enjoy307.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy307));
}



// ocean07代理
for (let pathname_ocean07 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ocean07 = pathname_ocean07.split('/')[0];
  let conf_ocean07 = {
    filename: path.resolve(__dirname, '../dist/ocean07/' + filename_ocean07 + '.html'),
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
  if (pathname_ocean07 in webpackConfig.entry) {
    conf_ocean07.chunks = ['manifest', 'vendor', pathname_ocean07];
    conf_ocean07.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean07));
}



// ocean107代理
for (let pathname_ocean107 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ocean107 = pathname_ocean107.split('/')[0];
  let conf_ocean107 = {
    filename: path.resolve(__dirname, '../dist/ocean107/' + filename_ocean107 + '.html'),
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
  if (pathname_ocean107 in webpackConfig.entry) {
    conf_ocean107.chunks = ['manifest', 'vendor', pathname_ocean107];
    conf_ocean107.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean107));
}



// ads08代理
for (let pathname_ads08 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ads08 = pathname_ads08.split('/')[0];
  let conf_ads08 = {
    filename: path.resolve(__dirname, '../dist/ads08/' + filename_ads08 + '.html'),
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
  if (pathname_ads08 in webpackConfig.entry) {
    conf_ads08.chunks = ['manifest', 'vendor', pathname_ads08];
    conf_ads08.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ads08));
}




// enjoy08代理
for (let pathname_enjoy08 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy08 = pathname_enjoy08.split('/')[0];
  let conf_enjoy08 = {
    filename: path.resolve(__dirname, '../dist/enjoy08/' + filename_enjoy08 + '.html'),
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
  if (pathname_enjoy08 in webpackConfig.entry) {
    conf_enjoy08.chunks = ['manifest', 'vendor', pathname_enjoy08];
    conf_enjoy08.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy08));
}


// enjoy108代理
for (let pathname_enjoy108 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy108 = pathname_enjoy108.split('/')[0];
  let conf_enjoy108 = {
    filename: path.resolve(__dirname, '../dist/enjoy108/' + filename_enjoy108 + '.html'),
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
  if (pathname_enjoy108 in webpackConfig.entry) {
    conf_enjoy108.chunks = ['manifest', 'vendor', pathname_enjoy108];
    conf_enjoy108.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy108));
}



// enjoy308代理
for (let pathname_enjoy308 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy308 = pathname_enjoy308.split('/')[0];
  let conf_enjoy308 = {
    filename: path.resolve(__dirname, '../dist/enjoy308/' + filename_enjoy308 + '.html'),
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
  if (pathname_enjoy308 in webpackConfig.entry) {
    conf_enjoy308.chunks = ['manifest', 'vendor', pathname_enjoy308];
    conf_enjoy308.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy308));
}

// enjoyA08代理
for (let pathname_enjoyA08 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoyA08 = pathname_enjoyA08.split('/')[0];
  let conf_enjoyA08 = {
    filename: path.resolve(__dirname, '../dist/enjoyA08/' + filename_enjoyA08 + '.html'),
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
  if (pathname_enjoyA08 in webpackConfig.entry) {
    conf_enjoyA08.chunks = ['manifest', 'vendor', pathname_enjoyA08];
    conf_enjoyA08.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoyA08));
}



// ocean08代理
for (let pathname_ocean08 of ['emotion_fate/emotion_fate', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ocean08 = pathname_ocean08.split('/')[0];
  let conf_ocean08 = {
    filename: path.resolve(__dirname, '../dist/ocean08/' + filename_ocean08 + '.html'),
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
  if (pathname_ocean08 in webpackConfig.entry) {
    conf_ocean08.chunks = ['manifest', 'vendor', pathname_ocean08];
    conf_ocean08.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean08));
}



// enjoy09代理
for (let pathname_enjoy09 of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy09 = pathname_enjoy09.split('/')[0];
  let conf_enjoy09 = {
    filename: path.resolve(__dirname, '../dist/enjoy09/' + filename_enjoy09 + '.html'),
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
  if (pathname_enjoy09 in webpackConfig.entry) {
    conf_enjoy09.chunks = ['manifest', 'vendor', pathname_enjoy09];
    conf_enjoy09.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy09));
}

// enjoyA09代理
for (let pathname_enjoyA09 of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoyA09 = pathname_enjoyA09.split('/')[0];
  let conf_enjoyA09 = {
    filename: path.resolve(__dirname, '../dist/enjoyA09/' + filename_enjoyA09 + '.html'),
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
  if (pathname_enjoyA09 in webpackConfig.entry) {
    conf_enjoyA09.chunks = ['manifest', 'vendor', pathname_enjoyA09];
    conf_enjoyA09.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoyA09));
}



// ocean09代理
for (let pathname_ocean09 of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ocean09 = pathname_ocean09.split('/')[0];
  let conf_ocean09 = {
    filename: path.resolve(__dirname, '../dist/ocean09/' + filename_ocean09 + '.html'),
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
  if (pathname_ocean09 in webpackConfig.entry) {
    conf_ocean09.chunks = ['manifest', 'vendor', pathname_ocean09];
    conf_ocean09.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ocean09));
}


// ads09代理
for (let pathname_ads09 of ['emotion_marriages/emotion_marriages', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ads09 = pathname_ads09.split('/')[0];
  let conf_ads09 = {
    filename: path.resolve(__dirname, '../dist/ads09/' + filename_ads09 + '.html'),
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
  if (pathname_ads09 in webpackConfig.entry) {
    conf_ads09.chunks = ['manifest', 'vendor', pathname_ads09];
    conf_ads09.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ads09));
}



// ads10代理
for (let pathname_ads10 of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ads10 = pathname_ads10.split('/')[0];
  let conf_ads10 = {
    filename: path.resolve(__dirname, '../dist/ads10/' + filename_ads10 + '.html'),
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
  if (pathname_ads10 in webpackConfig.entry) {
    conf_ads10.chunks = ['manifest', 'vendor', pathname_ads10];
    conf_ads10.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ads10));
}



// enjoy10代理
for (let pathname_enjoy10 of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoy10 = pathname_enjoy10.split('/')[0];
  let conf_enjoy10 = {
    filename: path.resolve(__dirname, '../dist/enjoy10/' + filename_enjoy10 + '.html'),
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
  if (pathname_enjoy10 in webpackConfig.entry) {
    conf_enjoy10.chunks = ['manifest', 'vendor', pathname_enjoy10];
    conf_enjoy10.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoy10));
}

// enjoyA10代理
for (let pathname_enjoyA10 of ['emotion_remarriage/emotion_remarriage', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoyA10 = pathname_enjoyA10.split('/')[0];
  let conf_enjoyA10 = {
    filename: path.resolve(__dirname, '../dist/enjoyA10/' + filename_enjoyA10 + '.html'),
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
  if (pathname_enjoyA10 in webpackConfig.entry) {
    conf_enjoyA10.chunks = ['manifest', 'vendor', pathname_enjoyA10];
    conf_enjoyA10.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoyA10));
}



// ads11代理
for (let pathname_ads11 of ['emotion_end/emotion_end', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_ads11 = pathname_ads11.split('/')[0];
  let conf_ads11 = {
    filename: path.resolve(__dirname, '../dist/ads11/' + filename_ads11 + '.html'),
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
  if (pathname_ads11 in webpackConfig.entry) {
    conf_ads11.chunks = ['manifest', 'vendor', pathname_ads11];
    conf_ads11.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_ads11));
}

// enjoyA11代理
for (let pathname_enjoyA11 of ['emotion_end/emotion_end', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoyA11 = pathname_enjoyA11.split('/')[0];
  let conf_enjoyA11 = {
    filename: path.resolve(__dirname, '../dist/enjoyA11/' + filename_enjoyA11 + '.html'),
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
  if (pathname_enjoyA11 in webpackConfig.entry) {
    conf_enjoyA11.chunks = ['manifest', 'vendor', pathname_enjoyA11];
    conf_enjoyA11.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoyA11));
}

// test代理
for (let pathname_enjoyA11 of ['year_of_lucky_2024/year_of_lucky_2024', 'user_agreement/user_agreement', 'privacy/privacy']) {
  let filename_enjoyA11 = pathname_enjoyA11.split('/')[0];
  let conf_enjoyA11 = {
    filename: path.resolve(__dirname, '../dist/test/' + filename_enjoyA11 + '.html'),
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
  if (pathname_enjoyA11 in webpackConfig.entry) {
    conf_enjoyA11.chunks = ['manifest', 'vendor', pathname_enjoyA11];
    conf_enjoyA11.hash = false;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf_enjoyA11));
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
