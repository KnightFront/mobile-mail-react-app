const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: 'js/[name]-bundle-[contenthash:6].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      // 配置浏览器标签图标
      favicon: 'public/favicon.ico',
      inject: 'body',
      minify: {
        removeComments: true,
      },
    }),
    new ESLintPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@styles': path.resolve(__dirname, '../src/styles'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less', '.scss'],
  },
  module: {
    rules: [{
      test: /.(js|jsx|ts|tsx)/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /.(png|jpe?g|gif)$/i,
      exclude: /node_modules/,
      loader: 'url-loader',
      options: {
        name: '[name].[contenthash:8].[ext]',
        outputPath: 'assets/images',
        limit: 8192,
      },
    },
    {
      test: /\.(ttf|woff|woff2|eot|otf)$/,
      type: 'asset/resource',
      exclude: /node_modules/,
      generator: {
        filename: 'assets/font/[name].[contenthash:8][ext]', // 指定打包后文件存放的文件夹和文件名
      },
    },
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  // 缓存配置
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\/]node_modules[\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};