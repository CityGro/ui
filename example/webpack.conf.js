var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const scssLoader = [
  'vue-style-loader',
  'css-loader?sourceMap',
  'resolve-url-loader',
  'sass-loader?sourceMap',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        resolve('node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss'),
        resolve('node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/*.scss'),
        resolve('style/_variables.scss')
      ]
    }
  }
]

module.exports = {
  devtool: 'source-map',
  entry: [
    './example/app.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap', 'resolve-url-loader'],
            scss: scssLoader
          }
        }
      },
      {
        test: /\.scss$/,
        use: scssLoader
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '@citygro/ui',
      template: 'example/index.html',
      inject: 'body',
      xhtml: true
    })
  ]
}
