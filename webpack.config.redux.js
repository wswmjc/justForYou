var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports = {
  entry: path.resolve('src/app.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[chunkhash:8].index.js',
    chunkFilename: '[name].[chunkhash:8].index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: './src/index.html',
      filename: 'index.html'
    }),
    new openBrowserWebpackPlugin({url: 'http://localhost:8800'})
  ],
  devServer: {
    port: 8800,
    contentBase: './build',
    inline: true,
    stats: {
      colors: true,
      cached: false,
    },
    host: "0.0.0.0"
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/, //正则，匹配到的文件后缀名
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "react"]
        }
      },
      //加载css代码
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      //配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式(其实应该说超过8kb的才使用url-loader 来映射到文件，否则转为data url形式)
      // {
      //   test: /\.(woff|woff2|ttf|svg|eot)$/,
      //   use:[
      //     {
      //       "url-loader",
      //       options:{limit:10000}
      //     }
      //   ]
      // },
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/,
      //   use:[
      //     'url?limit=10000&name=img/[name].[hash].[ext]'
      //   ]
      // },
    ]
  }
}
