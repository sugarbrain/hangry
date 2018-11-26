const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { 
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, 
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            debug: true,
                            sourceMap: true
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: { 
                        name: '[name]-[hash].[ext]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: 'fonts'
                    }
                }
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'main.js'
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
            publicPath: 'assets'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            title: 'Hangry',
            lang: 'pt-br'
        }),
        new CleanWebpackPlugin(['docs'])
    ],

    devServer: {
        contentBase: path.resolve(__dirname, './docs'),
        port: 3000
    },

    devtool: 'source-map'
};