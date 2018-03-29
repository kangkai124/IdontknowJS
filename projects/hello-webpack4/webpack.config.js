const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       'less-loader',
      //     ],
      //   }),
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],

    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },

  plugins: [
    new UglifyPlugin(),
    new HtmlWebpackPlugin({
      title: 'hello webpack4',
      filename: 'index.html',   // 配置输出文件名和路径
      template: 'assets/index.html'   // 配置文件模板
    }),
    new ExtractTextPlugin('index.css'),
  ],
}
