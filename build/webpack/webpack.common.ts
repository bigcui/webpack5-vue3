import path from 'path';
import webpack from 'webpack';
import {VueLoaderPlugin} from 'vue-loader';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ElementPlus from 'unplugin-element-plus/webpack';

function resolve(dir) {
    return path.join(__dirname, '../..', dir);
}


const config: webpack.Configuration | webpack.WebpackOptionsNormalized = {
    context: resolve('/'),
    target: 'web',
    entry: './src/main.ts',
    cache: {
        // 将缓存类型设置为文件系统,默认为memory
        type: 'filesystem',
        buildDependencies: {
          // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
          config: [__filename],
          // 如果你有其他的东西被构建依赖，你可以在这里添加它们
        },
    },
    output: {
        path: resolve('dist'),
        library: {
            name: `webpack5-vue3-[name]`,
            type: 'umd',
            auxiliaryComment: {
                root: 'Root Comment',
                commonjs: 'CommonJS Comment',
                commonjs2: 'CommonJS2 Comment',
                amd: 'AMD Comment',
            },
        },
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
            '.mjs',
            '.vue',
            '.json'
        ],
        alias: {
            '@': resolve('src'),
            process: 'process/browser'
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                terserOptions: {
                    compress: {
                        drop_console: false
                    }
                }
            })
        ],
        runtimeChunk: 'single'
    },
    stats: {
        errorDetails: true
    },
    performance: {
        maxEntrypointSize: Infinity,
        maxAssetSize: 1.5 * 1024 * 1024
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                video: ['src', 'poster'],
                                source: 'src',
                                img: 'src',
                                image: 'xlink:href'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jsx?|babel|es6)$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsxSuffixTo: ['\\.vue$']
                        }
                    }
                ]
            },
            {
                test: /\.mjs$/,
                resolve: {
                    fullySpecified: false
                },
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'static/img/[name].[hash:8][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'static/font/[name].[hash:8][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            'process.env': JSON.stringify(process.env)
        }),
        new VueLoaderPlugin(),
        // new CompressionPlugin({
        //     test: /\.(js|css)$/,
        //     threshold: 10240
        // }),
        new HtmlPlugin({
            template: './build/webpack/index.html',
            filename: 'index.html',
            chunks: ['main', 'vendor'],
            title: 'vue-ts-tpl'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve('public/static'),
                    to: './static'
                }
            ]
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        ElementPlus(),
    ]
};

export default config;