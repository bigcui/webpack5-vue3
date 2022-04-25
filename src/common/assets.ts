/**
 * 本地资源
 */
export enum Asset {
    baidu,
    success
}

/**
 * 获取本地资源路径。使用vite打包时，不支持SSR，如果要支持SSR，请使用import导入资源
 * @param asset 资源文件种类
 */
export function getAssetSrc(asset: Asset): string {
    const vitePack = process.env.TOOL === 'vite';
    let result = '';
    switch (asset) {
        case Asset.baidu: {
            result = vitePack ? new URL('../assets/success.jpeg', import.meta.url).href : require('@/assets/baidu.jpeg');
            break;
        }
        case Asset.success: {
            result = vitePack ? new URL('../assets/success.svg', import.meta.url).href : require('@/assets/success.svg');
            break;
        }
        default: break;
    }
    return result;
}