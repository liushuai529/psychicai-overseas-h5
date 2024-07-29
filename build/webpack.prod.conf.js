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

// enjoy代理01
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

// nova代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/nova01/' + filename + '.html'),
    template: 'template/index_nova.html',
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

// panda代理02
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

// enjoy02代理
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

// enjoy05代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
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

// enjoy06代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/enjoy06/' + filename + '.html'),
    template: 'template/index_enjoy06.html',
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

// panda06代理
for (var pathname in entries) {
  var filename = pathname.split('/')[pathname.split('/').length - 1];
  var conf = {
    filename: path.resolve(__dirname, '../dist/panda06/' + filename + '.html'),
    template: 'template/index_panda06.html',
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
