const path = require("path")
const uglify = require("uglifyjs-webpack-plugin")
const htmlPlugin = require("html-webpack-plugin")
const extractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')
module.exports={
    mode:'development',
    entry:{
        main:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"postcss-loader"
                    }]
                })
                // use: [{
                //     loader:"style-loader"
                // },{
                //     loader:"css-loader"
                // }]
            },
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        name:'[name]pc.[ext]',
                        limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath:'images/'
                    }
                }]
            },
            {
                test: /\.(mp4)(\?.*)?$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        outputPath:'images/'
                    }
                }]
            },
            {
                test:/\.(html|html)$/i,
                use:['html-withimg-loader']
            },
            {
                test:/\.less$/,
                use: extractTextPlugin.extract({
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"less-loader"
                    }],
                    fallback:"style-loader"
                })
            },{
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            "env","react"
                        ]
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("css/index.css"),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'../dist'),
        host:'localhost',
        compress:true,
        port:8888
    }
}