const helper = require('./helpers');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
}

module.exports = function (options) {
    return merge(common({ env: ENV }), {
        
        devtool: 'cheap-module-source-map',

        output: {
            path: helper.root('dist'),
            filename: 'js/[name].js'
        },

        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        }
    });
}
