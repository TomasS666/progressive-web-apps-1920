const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const css = require('./test.css').toString();

module.exports = {
//   context: path.resolve(__dirname, 'src/static/js/'),
  entry: {
      index:path.resolve(__dirname, 'src/static/js/index.js')
    },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js'
  },

  module:{
    rules:[{
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
        }]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },]
  },

  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/static/sw.js'),
      filename: 'sw.js',
      includes: ['*.css', '*.js']
    }),
    new ManifestPlugin({
      fileName:'manifest-map.json',
      basePath: '/',
      seed: {
        name: "My manifest mapping file"
      }
    }),
  ],

//   devServer: {
//       contentBase: path.resolve(__dirname, 'src/static'),
//       compress: true,
//       port: '8080',
//   }
};