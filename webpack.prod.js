const path = require('path');
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "production",

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: "[id].css"
    },

    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }),

        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),

        new WebpackMd5Hash(),

        new OptimizeCSSAssetsPlugin({})
    ]
});
