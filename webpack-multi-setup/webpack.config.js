
// webpack v4
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CompressionPlugin = require("compression-webpack-plugin")

var configFn = (env, argv) => {
    
    const mode = argv ? argv.mode : 'development';

    var config = {
        mode: mode,
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
                //test: /^((?!node_modules).)*global\.js$/,
                test: /global\.js$/,
                exclude: /node_modules/,
                use: [ 'script-loader' ]
            },
            {
                test: /\.(sc|c)ss$/,
                use: [ // loader: 'style-loader', // Adds CSS to the DOM by injecting a <style> tag
                    {
                        loader: MiniCssExtractPlugin.loader // Extract css
                    },
                    {
                        loader: 'css-loader', // Convert CSS to CommonJS
                        options: { importLoaders: 2 } 
                    },
                    {
                        loader: 'postcss-loader', // see postcss.config.js
                        options: {}
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
                // }
            ]
        },
        externals: {
            jquery: 'jQuery',
            $: '$'
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                //test: /postcss-loader$/, // only for this module
                options: {
                  mode: mode
                }
            }),
            new WebpackMd5Hash(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 100,
                minRatio: 0.9
            })
        ]
    };
    
    // Don't destroy dist folder with webpack-serve
    if(!process.env.WEBPACK_SERVE) {
        config.plugins.unshift(new CleanWebpackPlugin('dist', {}));
    }
    
    return config;
};


module.exports = (env, argv) => { 
    return configFn(env, argv); 
};