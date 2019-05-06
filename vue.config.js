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
            '^/api':{
                // target:'http://localhost',
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