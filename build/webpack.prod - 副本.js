/**
* 生产环境webpack配置
*/

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const fs = require('fs')

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`
            return externals
        }, {})
}

// 客户端配置
let clientConfig = {
    context: path.resolve(__dirname, ".."),
    entry: {
        bundle: [
            './client'
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        publicPath: "/",
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        ['env', {
                            "targets": {
                                "chrome": 40
                            },
                            modules: false
                        }
                        ],
                        'react'
                    ],
                    plugins: ['transform-runtime']
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
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
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
            names: ['vendor', 'manifest'],
            filename: '[name].[hash:5].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: {
                comments: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, "../dist/server/index.html"),
            template: path.join(__dirname, "../server/view/tpl/index.html"),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
        new ProgressBarPlugin({ summary: false })
    ],
    resolve: { extensions: ['.js', '.scss'] },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    target: 'web'
}

// 服务端配置
let serverConfig = {
    context: path.resolve(__dirname, ".."),
    entry: {
        server: './server/index.prod'
    },
    output: {
        path: path.resolve(__dirname, "../dist/server"),
        filename: '[name].js',
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    presets: [
                        [
                            'env',
                            {
                                "targets": {
                                    // "chrome": 50,
                                    "node": "current",
                                    uglify :true
                                },
                                modules: false,
                                "useBuiltIns": true
                                
                            }
                        ],
                        'react'
                    ],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['file-loader?name=image/[hash].[ext]?']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
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
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     comments: false
        // }),
        new ProgressBarPlugin({ summary: false })
    ],
    resolve: { extensions: ['.js', '.scss'] },
    externals: getExternals()
}

// module.exports = [clientConfig, serverConfig]
module.exports = [serverConfig]
