var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

module.exports = function (options){
    return {
    	context: path.join(__dirname, ".."),
    	cache:true,
    	devtool: 'source-map',
        entry: {

            bundle: [
               'react-hot-loader/patch', 
               'webpack-dev-server/client?http://0.0.0.0:9999', 
               //'webpack/hot/only-dev-server', 
               './src/index.js'
            ],
            vendor: [
                'react',
                'react-dom',
                'redux',
                'react-redux'
            ]

            
        	//vendor: ["jquery"]
    	},
    	externals: {
            // require("jquery") is external and available
            //  on the global var jQuery
            'jquery': 'jQuery',
            'react':'window.React',
            'react-dom':'window.ReactDOM'
        },
        output: {
            path: path.join(__dirname, "../dev"),
            publicPath:"/",
            filename: "js/[name].[hash].js"
        },
        module: {
            rules: [
                {
                  test: /\.js$/,
                  exclude: /(node_modules)/,
                  //loader: 'babel-loader',
                  use: [
                      "babel-loader",
                      "eslint-loader",// eslint检查
                    ],
                  //options: { // 可以配置在.babelrc文件中
                  //  presets: ['es2015','react']
                  //}
                },
                { test: /\.css$/, use: ["style-loader", "css-loader"]},
                { test: /\.scss$/, 
                  use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"],
                    publicPath: "/"
                  })
                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    use: ['file-loader?name=image/[hash].[ext]?']
                }
            ]
        },
        plugins: [
        	// 根据模版生成html
            new HtmlWebpackPlugin({
                title: 'Music',
                template: './src/index.temp.html',
            }),
            new ExtractTextPlugin({
                filename: "css/style.[hash].css",
                disable: false,
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                        names: ['vendor','manifest'],
                        filename: '[name].js'
                    }),

// new webpack.optimize.CommonsChunkPlugin({
//       names: [
//         'vendor', 'manifest'
//       ],
//       filename: jsDir + '[name].js'
//     }),


            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            // 打开浏览器
      		new OpenBrowserPlugin({ url: 'http://localhost:9999' }),
        ],
        devServer: {
            contentBase: "./src",//本地服务器所加载的页面所在的目录
            historyApiFallback: true,//不跳转
            // inline: true,//实时刷新
            hot:true,
            host: '0.0.0.0',
            disableHostCheck: true, // 解决Invalid Host Header
            port:9999,
            // 设置代理
            proxy:{
                 "/api": {
                    target: "http://localhost:3000",
                    changeOrigin: true,
                    pathRewrite: {"^/api" : ""}
                },
                "/kugou": {
                    target: "http://m.kugou.com",
                    changeOrigin: true,
                    pathRewrite: {"^/kugou" : ""}
                },
                "/mobilecdn": {
                    target: "http://mobilecdn.kugou.com",
                    changeOrigin: true,
                    pathRewrite: {"^/mobilecdn" : ""}
                },
            }
        }
    }
};