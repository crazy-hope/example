module.exports = {
  // 基本路径
  publicPath: './',
  // 生产环境是否生成 sourceMap 文件
  //productionSourceMap: false, //把这个改为false。
  /*不然在最终打包的文件中会出现一些map文件，
  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错 */
 
  // 服务器端口号
  // devServer: {
  // port: 1234,
  // },
}