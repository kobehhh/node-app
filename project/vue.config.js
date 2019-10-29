
// const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config)=>{
    // 初始化快捷路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~', resolve('node_modules'));

    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 图片压缩配置
    // config.module
    //     .rule('images')
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({
    //       bypassOnDebug: true
    //     })
    //     .end()

    // gizp配置
    // if (process.env.NODE_ENV === 'production') {
    //   // 启用GZip压缩
    //   config
    //     .plugin('compression')
    //     .use(CompressionPlugin, {
    //       asset: '[path].gz[query]',
    //       algorithm: 'gzip',
    //       test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
    //       threshold: 10240,
    //       minRatio: 0.8,
    //       cache: true
    //     })
    //     .tap(args => { }) 
    // }
  },
  devServer: {
    port: 8080,  
    proxy: {
      '/api': {
        target: 'http://192.168.5.234:5000', // 开发环境
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true
      },
      '/profile': {
        target: 'http://192.168.5.234:5000', // 开发环境
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true
      },
      // '/system': {
      //   target: 'http://192.168.5.237:8762', // 开发环境
      //   changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //   ws: true
      // },
      // '/route': {
      //   target: 'http://192.168.5.237:8762', // 开发环境
      //   changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //   ws: true
      // },
    }
  }
}