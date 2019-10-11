module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/': '/findata-frontend/',
    devServer: {
        host: '0.0.0.0'
    }
}