// 配置lodash依赖于webpack插件
const webpack = require('webpack')
module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    // 全局配置lodash
    configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
            _:"lodash"   
            })
        ]
      },
    devServer: {
        proxy: {
            // 以 /api 开头的url请求 都会被拦截 替换为: target/api
            '^/api':{
                // target:'http://59.110.138.169',
                target:'http://59.110.138.169',
                changeOrigin:true
            },
            '^/admin':{
                target:'http://59.110.138.169',
                changeOrigin:true
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    }
}