import path from "node:path";
import { createRequire } from 'module';

export function getCwd() {
    return process.cwd();
}
export function getSrc() {
    return path.join(getCwd(),'src')
}

export function getDist(){
    return path.join(getCwd(),'dist')
}

export function getExtName(file:string):string{
    return path.extname(file)
}

export function isInSameDir(leftPath:string,rightPath:string){
    return path.dirname(leftPath) === path.dirname(rightPath)
}

export function isInThisDir(dir:string,source:string){
    dir = path.dirname(dir)
    return path.relative(dir,source).startsWith('.')
}

export function replaceExtName(file:string,newExt:string){
    const oldExt = getExtName(file)
    if(oldExt){
        return file.replace(new RegExp(`${oldExt}$`),newExt)
    }
    return file
}


export function getAbsolutePath(importer:string,importPath:string){
    return path.resolve(path.dirname(importer),importPath)
}

export const resolve = createRequire(import.meta.url).resolve



export function resolvePath(source:string,importer?:string){
    if(importer){
        importer = path.dirname(importer)
        return resolve(source,{paths:[importer]})
    }
   return resolve(source)
}
