const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",

    output: {
        path: path.resolve(__dirname, 'server'),
        filename: '[name].[hash].js',
        chunkFilename: "[id].css"
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'server'),
        watchContentBase: true,
        writeToDisk: true,
        hot: true
    },

    plugins: [
        new CleanWebpackPlugin('server', {}),

        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new StyleLintPlugin({
            configFile: './stylelint.config.js',
            files: './src/scss/*.scss',
            syntax: 'scss'
        })
    ]
});
