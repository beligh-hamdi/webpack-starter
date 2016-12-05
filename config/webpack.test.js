const path = require('path');
const helpers = require('./helpers');

// Webpack Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function (options) {
    return {

        devtool: 'inline-source-map',

        resolve: {
            extensions: ['.ts', '.js'],
            /** 
             * Make sure root is "src".
             */
            modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    use: 'source-map-loader'
                },
                {
                    test: /\.ts$/,
                    use: {
                            loader: 'awesome-typescript-loader',
                            query: {
                            // use inline sourcemaps for "karma-remap-coverage" reporter
                            sourceMap: false,
                            inlineSourceMap: true,
                            compilerOptions: {
                              // Remove TypeScript helpers to be injected
                              // below by DefinePlugin
                              removeComments: true
                            }
                        }
                    },
                    exclude: [/\.e2e\.ts$/]
                },
                {
                    test: /\.json$/,
                    use: 'json-loader',
                    exclude: [helpers.root('src/index.html')]
                },
                { 
                    test: /\.scss$/,
                    use: [
                        ExtractTextPlugin.extract('style-loader'),
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: 'ng-cache-loader?module=app.templates',
                    exclude: [helpers.root('src/index.html')]
                },
                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    use: 'istanbul-instrumenter-loader',
                    include: helpers.root('src'),
                    exclude: [
                        /\.(e2e|spec)\.ts$/,
                        /node_modules/
                    ]
                }
            ]
        },

        plugins: [
            new LoaderOptionsPlugin({
                debug: true,
                options: {}
            })
        ],

        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    }
}