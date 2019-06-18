/**
 * @author Jay
 * @date 2017-8-1
 * @description  webpack develop config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.join(__dirname, ".."),
  devtool: "eval-source-map",
  mode: "development",
  entry: {
    bundle: [
      "react-hot-loader/patch",
      "webpack-hot-middleware/client?__webpack_hmr&timeout=20000",
      "./client"
    ],
    vendor: ["react", "react-dom", "redux", "react-redux"]
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    //'jsencrypt': 'window.jsencrypt',
  },
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "chunk.[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: "babel-loader",
        // include: [srcDir],
        exclude: /(node_modules)/,
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              "@babel/env",
              {
                // "targets": {
                //   "chrome": 52
                // },
                modules: false
              }
            ],
            "@babel/react"
          ],
          plugins: ["react-hot-loader/babel", "@babel/plugin-transform-runtime"]
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader?name=[hash].[ext]"]
      },
      {
        test: /\.html$/,
        use: "html-loader?minimize=false"
      },
      //   {
      //     test: /\.scss$/,
      //     use: ExtractTextPlugin.extract({
      //       fallback: "style-loader",
      //       use: [
      //         "css-loader",
      //         {
      //           loader: "postcss-loader",
      //           options: {
      //             ident: "postcss",
      //             plugins: [
      //               // require('postcss-import')(),
      //               require("autoprefixer")()
      //             ]
      //           }
      //         },
      //         "sass-loader"
      //       ],
      //       publicPath: "/"
      //     })
      //   }
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                // require('postcss-import')(),
                require("autoprefixer")()
              ]
            }
          },
          "sass-loader"
        ]
        // publicPath: "/"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ['vendor', 'manifest'],
    //     filename: '[name].js'
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "../server/view/dev/index.html"),
      template: path.join(__dirname, "../server/view/tpl/index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new ProgressBarPlugin({ summary: false })
  ],
  resolve: { extensions: [".js", ".scss"] },
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  target: "web"
};
