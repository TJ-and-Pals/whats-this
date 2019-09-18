/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: process.cwd(), // to automatically find tsconfig.json
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "/"
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: false
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /.ts$/,
                use: [
                    { loader: 'ts-loader', options: { transpileOnly: true } }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader', 
                    'css-loader',
                    path.resolve(__dirname, "build-utils/transform-css.js"),
                ],
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".css"],
        alias: {
            "@events": path.resolve(__dirname, "src/events"),
            "@state": path.resolve(__dirname, "src/state"),
            "@ui": path.resolve(__dirname, "src/ui"),
            "@config": path.resolve(__dirname, "src/config"),
            "@utils": path.resolve(__dirname, "src/utils"),
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './_static'),
        compress: true,
        clientLogLevel: 'warning',
        open: true,
        historyApiFallback: true,
        stats: 'errors-only',
        watchOptions: {
            ignored: ['node_modules', 'target', 'pkg', '**/*.rs', '**/*.js']
        },
        watchContentBase: true,
    }
};