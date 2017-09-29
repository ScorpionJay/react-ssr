const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
        context: path.join(__dirname, ".."),
        entry: {
            bundle: [
                './client/src'
            ],
            vendor: [
                'react',
                'react-dom',
                'redux',
                'react-redux'
            ]
        },
        output: {
            path: path.join(__dirname, "../dist/client"),
            publicPath:"/",
            filename: '[name].js',
            chunkFilename: 'chunk.[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js[x]?$/,
                    loader: 'babel-loader',
                    // include: [srcDir],
                    exclude: /(node_modules)/,
                    options: {
                      cacheDirectory: true,
                      babelrc: false,
                      presets: [
                        ['env', { modules: false }],
                        'react'
                      ],
                      plugins: ['react-hot-loader/babel','transform-runtime' ]
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: ['file-loader?name=image/[hash].[ext]?']
                },
                {
                    test: /\.html$/,
                    use: 'html-loader?minimize=false'
                },
                { test: /\.scss$/, 
                  use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"],
                    publicPath: "/"
                  })
                }
            ]
        },
        plugins: [
                    new ExtractTextPlugin({
                        filename: "css/style.[hash:5].css",
                        disable: false,
                        allChunks: true
                    }),
                    new webpack.optimize.CommonsChunkPlugin({
                        names: ['vendor','manifest'],
                        filename: '[name].[hash:5].js'
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                      compress: {
                        warnings: false
                      }
                    }),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NamedModulesPlugin(),
                    new HtmlWebpackPlugin({
                        filename: path.join(__dirname, "../server/view/prod/index.html"),
                        template: path.join(__dirname, "../server/view/tpl/index.html"),
                        minify:{ 
                            removeComments : true,
                            collapseWhitespace:true,
                            removeAttributeQuotes:true
                          }
                    }),
                    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
                    new ProgressBarPlugin({summary: false})
        ]
}