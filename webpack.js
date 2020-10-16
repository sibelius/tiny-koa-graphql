const path = require('path');

const webpack = require('webpack');

const WebpackNodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    server: [
      './src/index.ts',
    ],
  },
  output: {
    path: path.resolve('build'),
    filename: 'graphql.js',
    futureEmitAssets: true,
  },
  watch: true,
  target: 'node',
  node: {
    fs: true,
    __dirname: true,
  },
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
        exclude: [/node_modules/],
        include: [path.join(cwd, 'src'), path.join(cwd, '../')],
      },
      {
        test: /\.(pem)?$/,
        loaders: ['raw-loader'],
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'graphql.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
