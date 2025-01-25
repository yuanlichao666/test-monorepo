// import {generateOutputPath} from "lib/models/common/path";
// import {Dependency} from "lib/models/common/dependency";
//
// export interface DependencyProducts{
//     type:ProductType
//     path:string
//     sourceCode:string
// }
//
// export type ProductType = 'esm'|'cjs'|'css'
//
// export type ProductOutputType = '.mjs'|'.cjs'|'.css'
//
// const productExtMap:Map<ProductType, ProductOutputType> = new Map(Object.entries({
//     'esm':'.mjs',
//     'cjs':'.cjs',
//     'css':'.css'
// }) as any)
//
// export function createProduct(sourcePath:string,type:DependencyProducts['type'],sourceCode:string){
//     return {
//         type,
//         sourceCode,
//         path:generateOutputPath(sourcePath)+extMap.get(type)
//     }
// }
//
// function generateOutputPath(sourcePath:string,type:ProductType){
//
// }
