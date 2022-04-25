import webpack from 'webpack';
import {merge} from 'webpack-merge';
import commonConfig from './webpack.common';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default merge(commonConfig, {
    mode: 'development',
    // optimization: {
    //     moduleIds: 'named',
    //     chunkIds: 'named',
    //     mangleExports: 'deterministic',
    // },
    cache: {
        type: 'filesystem',
    },
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
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
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
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
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
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'css-unicode-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_PROD_DEVTOOLS__: true,
            ENV: JSON.stringify('development')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            ignoreOrder: true
        }),
    ],
    devServer: {
        open: true,
        port: 9008,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        proxy: {
            '/crm': {
                target: 'http://aifanfan-test.baidu-int.com',
                changeOrigin: true
            }
        }
    }
});