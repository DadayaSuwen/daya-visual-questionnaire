module.exports = {
    devServer: {
        proxy: {
            // 跨域访问
            '/api': 'http://localhost:3001'
        }
    }
}