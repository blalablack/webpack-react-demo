const webpack=require('webpack');
const path=require('path');
//引用插件
const HtmlWebpackPlugin=require('html-webpack-plugin');//模板插件
const CleanWebpackPlugin=require('clean-webpack-plugin');//模板插件
const PATHS = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
  modules:path.resolve(__dirname,"node_modules")
};
module.exports={
  entry:[
    'react-hot-loader/patch',//开发过程中热替换
    './src/index'
  ],
  output:{
    path:PATHS.build,
    filename:"js/[name].js",
  },
  devtool: 'eval-source-map',//'调试工具'
  //服务器配置
  devServer:{
    contentBase:PATHS.build,
    port:9000,//端口
    hot:true,//热替换选项
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude:PATHS.modules,
        include:PATHS.src,
        //使用postcss：放在less-loader前面，css-loader后面，不用importLoaders
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ] , 
      }, 
      {
        test: /\.css$/,
        exclude:PATHS.modules,
        include:PATHS.src,
        use:[
          'style-loader',//style标签插入html中
          'css-loader?importLoaders=1',//@import的也能用,css-loader使在js中也能解析css
          'postcss-loader'//配置见postcss.config.js
        ]
      }, 
      {
        test: /\.(js|jsx)$/,
        exclude:PATHS.modules,
        include:PATHS.src,
        use:[
          'babel-loader',//配置见.babelrc
        ]
      }, 
      {
        test:/\.(png|jpg|gif|svg)$/i,
        exclude:PATHS.modules,
        include:PATHS.src,
        use:[
          'url-loader?limit=2048&name=img/[name][hash].[ext]',         
          'img-loader'//压缩图片
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
              attrs:['img:src','link:href']//筛选img和a
            }
           }
        ]
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin('build'),//清理打包文件
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
    new webpack.HotModuleReplacementPlugin(), //热替换插件
    new webpack.NamedModulesPlugin(),//会在控制台显示你跟新文件的路径，利于调试
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
