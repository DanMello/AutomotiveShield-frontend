const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'assets/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  resolve: {
    alias:{
      'styles': path.resolve(__dirname, 'src/styles'),
      'components': path.resolve(__dirname, 'src/components'),
      'src': path.resolve(__dirname, 'src'),
      'reducers': path.resolve(__dirname, 'src/reducers'),
      'helpers': path.resolve(__dirname, 'src/helpers')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'public/assets', to: 'assets' },
    ]),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
};