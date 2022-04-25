import {defineConfig, UserConfig} from 'vite';
import path from 'path';
import VuePlugin from '@vitejs/plugin-vue';
import VueJsxPlugin from '@vitejs/plugin-vue-jsx';
import ElementPlus from 'unplugin-element-plus/vite';
import CompressionPlugin from 'vite-plugin-compression';
import LegacyPlugin from '@vitejs/plugin-legacy'

function getBase(mode: string) {
    const PROJECT_NAME = 'vue-ts-tpl';
    return mode === 'test' ? `https://aiff.bj.bcebos.com/${PROJECT_NAME}/qa/`
        : mode === 'online' ? `https://fe-aff.bj.bcebos.com/${PROJECT_NAME}/online/`
            : mode === 'preonline' ? `https://fe-aff-preonline.bj.bcebos.com/${PROJECT_NAME}/preonline/`
                : './';
}

function resolve(dir) {
    return path.join(__dirname, '../..', dir);
}

export default defineConfig(({command, mode}) => {
    const config: UserConfig = {
        base: getBase(mode),
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        define: {
            'process.env': process.env
        },
        build: {
            target: 'es2015',
            rollupOptions: {
                manualChunks: {
                    vendor: [
                        'vue',
                        'element-plus'
                    ]
                },
                output: {
                    entryFileNames: 'static/js/[name].[hash].min.js',
                    chunkFileNames: 'static/js/[name].[hash].min.js',
                    assetFileNames: 'static/[ext]/[name].[hash].[ext]'
                }
            },
            assetsDir: 'static',
            chunkSizeWarningLimit: 1.5 * 1024
        },
        plugins: [
            VuePlugin(),
            VueJsxPlugin(),
            ElementPlus(),
            CompressionPlugin({
                threshold: 10240
            }),
            LegacyPlugin()
        ],
        server: {
            cors: true,
            open: true,
            proxy: {
                '/crm': {
                    target: 'http://aifanfan-test.baidu-int.com',
                    changeOrigin: true
                }
            }
        }
    };
    config.build!.sourcemap = command === 'serve';
    return config;
});