const path = require('path');
const {EsbuildPlugin} = require("esbuild-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src/playground', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                loader: 'esbuild-loader',
                options: {
                    target: 'esNext'
                }
            }
        ]
    },
    devtool: IS_PRODUCTION ? false : 'source-map',
    devServer: {
        hot: true,
    },
    optimization: {
        minimizer: [
            new EsbuildPlugin({
                target: 'esNext'
            })
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        })
    ]
}