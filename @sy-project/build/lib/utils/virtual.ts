export default function virtualModulePlugin() {
    return {
        name: 'virtual-module', // 插件名
        resolveId(source) {
            if (source === '\0virtual:my-module') {
                return source; // 返回虚拟模块 ID
            }
            return null; // 其他模块交由 Rollup 默认解析
        },
        load(id) {
            if (id === '\0virtual:my-module') {
                return 'export const value = "Hello from virtual module";'; // 模块内容
            }
            return null; // 非虚拟模块使用默认加载逻辑
        }
    };
}
