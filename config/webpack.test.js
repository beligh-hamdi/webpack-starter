const path = require('path');
const helpers = require('./helpers');

// Webpack Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function (options) {
    return {

        devtool: 'inline-source-map',
        
        performance: {
            hints: false
        },
        
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
                    test: /\.ts?$/,
                    use: 'tslint-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        query: {
                            compilerOptions: {
                                sourceMap: false,
                                inlineSourceMap: true
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
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.html$/,
                    use: ['ng-cache-loader'],
                    exclude: [helpers.root('src/index.html')]
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: {
                        loader: 'url-loader',
                        query: {
                            limit: 100000,
                            name: 'images/[hash].[ext]',
                            publicPath: '../'
                        }
                    }
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
                options: {
                    'ng-cache-loader': {
                        module: 'app.templates'
                    },
                    tslint: {
                        emitErrors: true,
                        // failOnHint: true
                    }
                }
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