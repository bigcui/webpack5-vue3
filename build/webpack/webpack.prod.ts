import webpack from 'webpack';
import {merge} from 'webpack-merge';
import commonConfig from './webpack.common';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const appMode = process.env.NODE_ENV;
const PROJECT_NAME = 'micro-yoda-marketing';
const publicPath = './'
console.log('publicPath', publicPath);
export default merge(commonConfig, {
    mode: 'production',
    // output: {
    //     publicPath
    // },
    optimization: {
        moduleIds: 'deterministic',
    },
    devtool: 'nosources-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                    'css-unicode-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            ignoreOrder: true
        }),
    ]
});