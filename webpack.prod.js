const merge=require('webpack-merge');
const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');//模板插件
const CleanWebpackPlugin=require('clean-webpack-plugin');//清理模板插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离css插件
const CompressionPlugin = require("compression-webpack-plugin");//gzip压缩代码
const BannerPlugin=require('html-webpack-banner-plugin');
const PATHS = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
  modules:path.resolve(__dirname,"node_modules")
};
module.exports={
  entry:{
    index1:'./src/index',
    index2:'./src/index2',
    //公共引入的部分打一个包
    vendor:[
      'react','react-dom'
    ]
  },
  output:{
    publicPath:"/",
    path:PATHS.build,//执行路经
    filename:"js/[name].[chunkhash:5].js",
  },
  //devtool:'cheap-module-eval-source-map',//生产环境的开发工具感觉可以去掉的啊，会减少无敌多的代码体积
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude:PATHS.modules,
        include:PATHS.src,
        use:[
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      }, 
      {
        test: /\.(js|jsx)$/,
        exclude:PATHS.modules,
        include:PATHS.src,
        use:[
          'babel-loader',
        ]
      }, 
      {
        test:/\.(png|jpg|gif|svg)$/i,
        exclude:PATHS.modules,
        include:PATHS.src,
        use:[
          'url-loader?limit=2048&name=img/[name].[hash:5].[ext]',         
          'img-loader'
        ]
      },
      {
        test:/\.html$/,
        exclude:PATHS.modules,
        include:PATHS.src,
        use:[
           {
            loader:'html-loader',
            options:{
              attrs:['img:src','link:href']
            }
           }
        ]
      },
      {
        test: /\.less$/,
        exclude:PATHS.modules,
        include:PATHS.src,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader?minimize=true', 'less-loader']
        })
      }
    ]
  },
  plugins:[
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
      title:'My webpack-test-react',
      inject:'body',
      filename:'admin.html',
      template:'./src/templete/index.html',
      minify:{
        removeComments:true,//去注释
        collapseWhitespace:true//去空格
      }
    }),
    //该插件会根据模块的相对路径生成一个四位数的hash作为模块id,解决verdor随自身module.id变化而变化,用于生产环境。
    new webpack.HashedModuleIdsPlugin(),
    //将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    //将 webpack 的样板(boilerplate)和 manifest 提取出来。通俗来说就是管理实现webpack的
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
    }),
    //分离css，这样可以和js并行加载，优化页面
    new ExtractTextPlugin('css/[name].[contenthash:5].css'),
    //压缩成gzip格式
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js|css|html$/,
      threshold: 10240,//大于1k的就压缩
      minRatio: 0,//压缩率大于0就压缩
    }),
    //内置插件:压缩js代码和去掉没有引用的
    new webpack.optimize.UglifyJsPlugin({
      //压缩之后启用sourceMap配合devtool使用
      sourceMap:true
    }),
    /*
    开发环境中，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)，
    使用这个production:一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码
    如果您正在使用像 react 这样的 library，那么在添加此 DefinePlugin 插件后，你应该看到 bundle 大小显著下降。
    */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  resolve: {
    modules: [
      PATHS.src,//指定优先查找路径，要放在node_modules上面
      "node_modules"
    ],
    //后缀名自动补全，默认js,json。设置之后所有都不用带后缀
    extensions: ['.js', '.jsx', '.less', '.css'], 
  }
}
