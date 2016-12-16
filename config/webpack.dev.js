const helpers = require('./helpers');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    ENV: ENV,
    HMR: HMR
}

module.exports = function (options) {
    return merge(common({ env: ENV }), {
        
        devtool: 'eval-source-map',

        output: {
            path: helpers.root('dist'),
            publicPath: '/',
            filename: 'js/[name].js'
        },

        plugins: [
            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR,
                }
            }),

            new LoaderOptionsPlugin({
                debug: true,
                options: {}
            }),
        ],

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
