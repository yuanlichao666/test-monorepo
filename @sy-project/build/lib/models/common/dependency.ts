//依赖的抽象
import path from "node:path";
import {
    getExtName, getSrc,
    replaceExtName,
    resolvePath
} from "lib/models/common/path";
import * as fs from "node:fs";
import {Format} from "lib/models/common/config";
import {curry, flowRight} from "lodash-es";
import fsExtra from "fs-extra";


export interface Dependency{
    type:  '.js'|'.css'|'.scss'|'.ts'|string;
    path: string;
    outputPath?:string
    format:Format
    subDeps:Dependency[]
    newCode?:string
    sourceCode?:string;
}



export function createDependency(entry:string,format:Format){
    return {
        type:path.extname(entry),
        path:entry,
        format,
        subDeps:[]
    } as Dependency
}

export function addSubDependency(dependency:Dependency,subDependency:Dependency|string){
    const {subDeps,path,format} = dependency
    if(typeof subDependency === 'string'){
        subDependency = resolvePath(subDependency,path)
        subDependency  = createDependency(subDependency,format)
    }
    subDeps.push(subDependency)
    return dependency
}

export async function readSourceCode(dependency:Dependency){
    dependency.sourceCode = fs.readFileSync(dependency.path).toString();
    return dependency
}



export function replaceExtNameForOutput(pathOrFile:string,format:Format){

    function getExtForOutPut(file:string){
        const extName = getExtName(file)

        const map:Map<string, string> = new Map(Object.entries({
            '.scss':'.css',
            '.vue':format.ext,
            '.tsx':format.ext,
            '.ts':format.ext,
        }))

        if(extName){
            return map.get(extName)||''
        }

        return ''
    }

    const replace = curry(replaceExtName)(pathOrFile)

    return flowRight(replace,getExtForOutPut)(pathOrFile)
}


export function output(dependency:Dependency){
    const outputPath = generateOutputPath(dependency)
    fsExtra.outputFileSync(outputPath,dependency.newCode!)
    return dependency
}

export function generateOutputPath(dependency:Dependency){
    const relativePath = path.relative(getSrc(),dependency.path)
    const outputPath = path.join(dependency.format.dir,relativePath)
    return replaceExtNameForOutput(outputPath,dependency.format)
}
