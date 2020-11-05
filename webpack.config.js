const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[chunkhash].js',  // entry中指定的包名
    chunkFilename: '[name]-[chunkhash].js', // 以hash值作为包名
  },
  mode: 'production',
  devServer: {
    contentBase: './dist', // server运行的资源目录
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/, // 处理ElementUI样式
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(woff|ttf)$/, // 处理ElementUI字体
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader伴生插件，必须有！！！
    new CleanWebpackPlugin(), // 每次构建自动清理/dist文件夹
    new HtmlWebpackPlugin({
      // 自动生成注入js的index主页
      title: 'Vuex-Router-Webpack demo',
      template: './public/index.html', // 自定义index模板
    }),
    /*
    使用文件路径的 hash 作为 moduleId。
    虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
    因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
    如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
    那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
    因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
    */
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    /*
    上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
    它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。

    runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
    这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    */
    runtimeChunk: true,

    splitChunks: {
      /*
      默认 entry 的 chunk 不会被拆分
      因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
      所以我们可以配置成 all, 把 entry chunk 也拆分了
      */
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: "chunk-elementUI", // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        },
        commons: {
          name: "chunk-commons",
          test: path.resolve("src/components"), // 可自定义拓展你的规则
          minChunks: 2, // 最小共用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
}
