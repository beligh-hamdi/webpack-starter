const helpers = require('./helpers');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const METADATA = {
    ENV: ENV
}

module.exports = function (options) {
    return merge(common({ env: ENV }), {

        devtool: 'source-map',

        output: {
            path: helpers.root('dist'),
            filename: 'js/[name].js'
        },

        plugins: [
            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                }
            }),

            new UglifyJsPlugin({
                sourceMap: false,
                mangle: false,
                compress: {
                    warnings: false
                }
            }),

            new LoaderOptionsPlugin({
                debug: false,
                options: {}
            }),
        ]
    });
}
