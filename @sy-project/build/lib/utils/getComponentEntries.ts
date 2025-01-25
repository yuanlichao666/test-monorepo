import path from "node:path";
import * as fs from "node:fs";
import {getCwd} from "lib/models/common/path";

export function getComponentDirs() {
    const cwd = getCwd();
    const root = path.join(cwd, 'src/components');

    return  fs
        .readdirSync(root,{withFileTypes:true})
        .filter(dir=>dir.isDirectory())
        .map(dir=> path.resolve(root,dir.name))
}

export function getComponentEntries() {
    // return Object.fromEntries(
    //
    // )
   return  getComponentDirs().map(dir=>{
        //拿到组件目录名
        const compDirName = path.basename(dir)

        //拿到组件文件名
        const compFileName = `index.ts`

        //生成rollup入口配置
        const componentSourceFile = path.join(dir,compFileName)
        const componentDistFile = path.join('components',compDirName,`index`)
        return componentSourceFile
    })
}

export function getStyleEntries() {
    return Object.fromEntries(
        getComponentDirs().map(dir=>{

            //拿到组件目录名
            const compDirName = path.basename(dir)

            //拿到组件文件名
            const compFileName = `${compDirName}.tsx`

            //生成rollup入口配置
            const componentSourceFile = path.join(dir,`style/index.ts`)
            const componentDistFile = path.join('components',compDirName,'style/index')
            return [componentDistFile,componentSourceFile]
        })
    )
}

export function getFullComponentEntry(){}
export function getFullStyleEntry(){}
