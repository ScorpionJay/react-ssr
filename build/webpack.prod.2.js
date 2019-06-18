// const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

function getExternals() {
  return fs
    .readdirSync(path.resolve(__dirname, "../node_modules"))
    .filter(filename => !filename.includes(".bin"))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`;
      return externals;
    }, {});
}

// 服务端配置
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
                // node: "current",
                //useBuiltIns: "entry",
                //corejs: 3
                // "modules": false
              }
            ]
          ],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      }
    ]
  },
  externals: getExternals()
};

module.exports = [serverConfig];
