const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'               // 打包输出的js包名
    },
    devServer: {
        contentBase: './dist'               // server运行的资源目录
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,             // 处理ElementUI样式
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(woff|ttf)$/,	    // 处理ElementUI字体
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),              // vue-loader伴生插件，必须有！！！
        new HtmlWebpackPlugin({             // 自动生成注入js的index主页
            title: 'Vue-wepack demo',
            template: './public/index.html' // 自定义index模板
        })
    ]
}