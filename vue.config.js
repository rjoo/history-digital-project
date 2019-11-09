module.exports = {
  publicPath: '/rjoo8042/public/',
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html')
        .loader('html-loader')
        .end()
      .use('markdown-loader')
        .loader('markdown-loader')
  }
}