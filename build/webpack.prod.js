/**
 * @author Jay
 * @date 2019-6-19
 * @description  webpack production config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

/**
 * client config
 */
let clientConfig = {
  mode: "production",
  context: path.resolve(__dirname, ".."),
  entry: {
    bundle: ["./client"],
    vendor: ["react", "react-dom", "redux", "react-redux"]
  },
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    publicPath: "/", //"http://localhost:9003/", // 设置cdn或nginx url
    filename: "[name].js",
    chunkFilename: "chunk.[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: "babel-loader",
        exclude: /(node_modules)/
        // options: {
        //   cacheDirectory: true,
        //   babelrc: false,
        //   presets: [["@babel/env"], "@babel/react"]
        //   // plugins: ["@babel/plugin-transform-runtime"]
        // }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader?name=image/[hash].[ext]?"]
      },
      {
        test: /\.html$/,
        use: "html-loader?minimize=false"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
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
      filename: "css/style.[hash:5].css",
      chunkFilename: "css/[id].[hash:5]css"
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ["vendor", "manifest"],
    //   filename: "[name].[hash:5].js"
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: true,
    //     drop_console: true
    //   },
    //   output: {
    //     comments: false
    //   }
    // }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "../dist/server/index.html"),
      template: path.join(__dirname, "../server/view/tpl/index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new ProgressBarPlugin({ summary: false })
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  target: "web"
};

/**
 * server config
 */
let serverConfig = {
  mode: "production",
  target: "node",
  node: {
    __filename: true,
    __dirname: true
  },
  context: path.resolve(__dirname, ".."),
  entry: {
    server: "./server/index.prod"
  },
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  node: "current"
                }
              }
            ],
            "@babel/react"
          ]
          // plugins: ["add-module-exports", "@babel/plugin-transform-runtime"]
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader?name=image/[hash].[ext]?"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/"
              //   hmr: process.env.NODE_ENV === "development"
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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.[hash:5].css",
      chunkFilename: "css/[id].[hash:5]css"
    })
  ],

  // externals: getExternals()
  externals: [nodeExternals()]
};

module.exports = [clientConfig, serverConfig];
