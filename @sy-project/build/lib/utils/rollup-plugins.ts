import {Plugin} from "rollup";
import {Dependency} from "lib/models/common/dependency";
import path from "node:path";
import {renderSync} from "sass";
import {getCwd} from "lib/models/common/other";

export type OnExtractDependency = (id:string,importer:string)=>void
export function extractDependencyPlugin(input:string,onDependency:OnExtractDependency):Plugin {
    return {
        name: 'scss-to-css',

        // 处理 .scss 文件的路径解析
        resolveId(id, importer) {
            if (id.endsWith('.scss')) {

                const result = renderSync({ file: path.resolve(path.dirname(importer!), id) });  // 使用 Sass 编译 SCSS 文件
                const css = result.css.toString();

                // 生成一个新的资源并返回其 URL
                const referenceId = this.emitFile({
                    type: 'asset',
                    name: path.basename(id, '.scss') + '.css',
                    source: css,
                    needsCodeReference: false
                    // 如果不需要引用该文件，可以设置 needsCodeReference: true
                });
                return {
                    id: `import.meta.ROLLUP_FILE_URL_${referenceId}`,
                    external:false,

                }
            }
            return null;
        },

        // // 加载 SCSS 文件并编译为 CSS
        load(id) {
            if (id.endsWith('.scss')) {
                try {
                    const result = renderSync({ file: id });  // 使用 Sass 编译 SCSS 文件
                    const css = result.css.toString();

                    // 生成一个新的资源并返回其 URL
                    const referenceId = this.emitFile({
                        type: 'asset',
                        name: path.basename(id, '.scss') + '.css',
                        source: css,
                        // 如果不需要引用该文件，可以设置 needsCodeReference: true
                    });

                    // 返回 CSS 文件的 URL 引用
                    return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`
                } catch (error) {
                    this.error(`SCSS Compilation Error: ${error.message}`);
                }
            }
            return null;
        },
        resolveFileUrl({ fileName }) {
            return `'MODIFY:${fileName}'`;
        },
    };
}
