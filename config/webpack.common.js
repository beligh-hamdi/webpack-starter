const webpack = require('webpack');
const helpers = require('./helpers');

// Webpack Plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
    title: 'Webpack learning',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
}

module.exports = function (options) {
    return {
        entry: {
            main: './src/scripts/main.ts'
        },

        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [helpers.root('src'), helpers.root('node_modules')]
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: [/\.(spec|e2e)\.ts$/]
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
                    test: /\.json$/,
                    use: 'json-loader'
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
                }
            ]
        },

        plugins: [

            new CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module, count) {
                    // any required modules inside node_modules are extracted to vendor
                    return (
                        module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            helpers.root('node_modules')
                        ) === 0
                    )
                }
            }),

            new ExtractTextPlugin('css/style.css'),
            
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                title: METADATA.title,
                metadata: METADATA,
                chunksSortMode: 'dependency',
                inject: 'body'
            }),

        ],

        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    }
}