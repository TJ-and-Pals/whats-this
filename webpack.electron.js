/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    optimization: {
		minimizer: [new TerserPlugin({
			parallel: true,
		})]
    },
    context: process.cwd(), // to automatically find tsconfig.json
    entry: {
        app: "./src/index.ts",
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            useTypescriptIncrementalApi: true,
            memoryLimit: 4096
        }),
        new HtmlWebpackPlugin({
            //hash: true,
            inject: true,
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'PLATFORM': JSON.stringify(process.env["PLATFORM"]),
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /.ts$/,
                use: [
                    { loader: 'ts-loader', options: { transpileOnly: true } }
                ],
            },
            {

                test: /\.css$/i,
                use: [
                    'style-loader', 
                    {loader: 'css-loader', options: {url: false}},
                    path.resolve(__dirname, "build-utils/transform-css.js"),
                ],
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".css"],
        mainFields: ["main", "module"],
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@config": path.resolve(__dirname, "src/config"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@utils": path.resolve(__dirname, "src/utils")
        }
    }
}