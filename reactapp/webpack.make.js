// Modules
var webpack = require('webpack')
var autoprefixer = require('autoprefixer-core')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')

/**
 * Make webpack config
 * @param {object} options Builder options
 * @param {boolean} options.TEST Generate a test config
 * @param {boolean} options.BUILD Generate a build config
 * @returns {object} Webpack configuration object
 */
module.exports = function makeWebpackConfig (options) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  var BUILD = !!options.BUILD
  var TEST = !!options.TEST

  /**
   * Environment values
   */
  var NODE_ENV = process.env.NODE_ENV || 'development'

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {}

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if (TEST) {
    config.entry = {}
  } else {
    config.entry = {
      app: './app'
    }
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {}
  } else {
    config.output = {
      // Absolute output directory
      path: path.join(__dirname, '/../backend/flask-app/static/dist'),

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: BUILD ? 'http://192.168.1.151:5000/static/dist/' : '/',

      // Filename for entry points
      // Only adds hash in build mode
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    }
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (TEST) {
    config.devtool = 'inline-source-map'
  } else if (BUILD) {
    config.devtool = 'source-map'
  } else {
    config.devtool = 'eval'
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel?optional=runtime',
      exclude: /node_modules/
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|ttf|eot)$/,
      loader: 'file'
    },{
      // LESS loader
      test: /\.less$/,
      loader: BUILD || TEST ? 'null' : ExtractTextPlugin.extract(
        'style',
        'css?sourceMap!postcss!less?sourceMap'
      )
    }]
  }

  // ISPARTA LOADER
  // Reference: https://github.com/ColCh/isparta-instrumenter-loader
  // Instrument JS files with Isparta for subsequent code coverage reporting
  // Skips node_modules and files that end with .test.js and .test.jsx
  if (TEST) {
    config.module.preLoaders.push({
      test: /\.(js|jsx)$/,
      exclude: [
        /node_modules/,
        /\.test\.(js|jsx)$/
      ],
      loader: 'isparta-instrumenter'
    })
  }

  // JSX LOADER
  // Transpile .jsx files using babel-loader
  var jsxLoader = {
    test: /\.jsx$/,
    loader: 'babel?optional=runtime',
    exclude: /node_modules/
  }

  // Add react-hot-loader when not in build or test mode
  if (!BUILD && !TEST) {
    // Reference: https://github.com/gaearon/react-hot-loader
    // This will reload react components without refresh
    jsxLoader.loader = 'react-hot!' + jsxLoader.loader
  }

  // Add jsxLoader to the loader list
  config.module.loaders.push(jsxLoader)

  // CSS LOADER
  // Reference: https://github.com/webpack/css-loader
  // Allow loading css through js
  //
  // Reference: https://github.com/postcss/postcss-loader
  // Postprocess your css with PostCSS plugins
  var cssLoader = {
    test: /\.css$/,
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files in production builds
    //
    // Reference: https://github.com/webpack/style-loader
    // Use style-loader in development for hot-loading
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
  }

  // Skip loading css in test mode
  if (TEST) {
    // Reference: https://github.com/webpack/null-loader
    // Return an empty module
    cssLoader.loader = 'null'
  }

  // Add cssLoader to the loader list
  config.module.loaders.push(cssLoader)

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ]

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   * Use this to tweak how webpack should handle module resolution
   */
  config.resolve = {
    // Reference: http://webpack.github.io/docs/configuration.html#resolve-extensions
    // Allows you to require files that end with .jsx without typing it
    // For example, if you have file.jsx, you can type: require('./file')
    extensions: ['', '.js', '.jsx']
  }

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin('[name].[hash].css', {
      disable: !BUILD || TEST
    }),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // Replace process.env.NODE_ENV with NODE_ENV in code
    // Can be used to replace other values as well
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ]

  // Skip rendering index.html in test mode
  if (!TEST) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    
    config.plugins.push(
      new HtmlWebpackPlugin({
        title: 'Test',
        minify: BUILD,
        template: 'app/template.js',
        inject: 'body'
      })
    )
  }

  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    proxy: {'*': 'http://localhost:5000'},
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }

  return config
}
