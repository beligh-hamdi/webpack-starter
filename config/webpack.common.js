const webpack = require('webpack');
const helpers = require('./helpers');

// Webpack Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
    title: 'Webpack learning',
    baseUrl: '/'
}

module.exports = function (options) {
    return {
        entry: [
            './src/scripts/main.ts'
        ],

        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [helpers.root('src'), helpers.root('node_modules')]
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: ['awesome-typescript-loader']
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
                            limit: 25000,
                            name: 'images/[hash].[ext]',
                            publicPath: '../'
                        }
                    }
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin('css/style.css'),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                title: METADATA.title,
                metadata: METADATA,
                chunksSortMode: 'dependency',
                inject: 'body'
            })
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