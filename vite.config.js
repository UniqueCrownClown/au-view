const path = require('path')
module.exports = {
    "base": "./",
    alias: {
        '/@/': path.resolve(__dirname, './src')
    },
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        '/api': {
            target: 'http://127.0.0.1:7001',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}