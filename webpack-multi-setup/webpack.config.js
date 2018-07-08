
// webpack v4
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

var config = {
    entry: {
        // Multiple entry
        // js: './src/scripts/index.js',
        // css: './src/styles/theme.scss'
        app: './src/root.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'EntryPoint',
        libraryTarget: 'var',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /global\.js$/,
            use: [ 'script-loader' ]
        },
        {
            test: /\.(sc|c)ss$/,
            use: [ // loader: 'style-loader', // Adds CSS to the DOM by injecting a <style> tag
                {
                    loader: MiniCssExtractPlugin.loader // Extract css
                },
                {
                    loader: 'css-loader' // Convert CSS to CommonJS
                },
                {
                    loader: 'postcss-loader' // autoprefixer
                },
                {
                    loader: 'sass-loader' // Compile to sass
                }]
        }            // {
            //     test: /\.js$/0,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader"
            //     }
            // },
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            // }
        ]
    },
    externals: {
        jquery: 'jQuery',
        $: '$'
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new HtmlWebpackPlugin({
        //     inject: false,
        //     hash: true,
        //     template: './src/index.html',
        //     filename: 'index.html'
        // }),
        new WebpackMd5Hash()
    ]
};

module.exports = config;