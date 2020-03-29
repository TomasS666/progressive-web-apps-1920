const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const css = require('./test.css').toString();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const WebpackPreBuildPlugin = require('pre-build-webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  //   context: path.resolve(__dirname, 'src/static/js/'),
  entry: {
    index: path.resolve(__dirname, 'src/static/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js'
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        }]
      },
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: (resourcePath, context) => {
              return path.relative(path.dirname(resourcePath), context) + '/';
            },
          },
        },
          'css-loader'
        ],
      },{
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 1, // Convert images < 8kb to base64 strings
                name: 'images/[name].[ext]'
            } 
        }]
    },{               
      type: 'javascript/auto',
                     test: /\.(json|html)/,
                     exclude: /(node_modules|bower_components)/,
                     use: [{
                         loader: 'file-loader',
                         options: {
                             name: '[name].[ext]'
                         },
                     }],
                 }
    ],
  },
  

  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/static/sw.js'),
      filename: 'sw.js',
      includes: ['*.css', '*.js']
    }),
    
    new MiniCssExtractPlugin({
      to: 'style',
      filename: 'style.[contenthash].css',
      chunkFilename: "[id].css",
    }),
    new CleanWebpackPlugin(),

    new ManifestPlugin({
      fileName: 'manifest-map.json',
      basePath: '/',
      seed: {
        name: "My manifest mapping file"
      },
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
  }),
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: "gzip"
})

  ],

  //   devServer: {
  //       contentBase: path.resolve(__dirname, 'src/static'),
  //       compress: true,
  //       port: '8080',
  //   }
};