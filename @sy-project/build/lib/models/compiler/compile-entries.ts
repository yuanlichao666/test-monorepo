// import {getStyleEntries} from "lib/utils/getComponentEntries";
// import {parseAst} from "rollup/dist/parseAst";
// import {readFileSync} from "node:fs";
// import { walk } from 'estree-walker';
// import path from "node:path";
// import * as fs from "node:fs";
//
//
//
//
// export function compileStyleEntries(){
//     const entries = getStyleEntries()
//     Object.keys(entries).forEach((distFile)=>{
//         const sourceFile = entries[distFile]
//         if(fs.existsSync(sourceFile)){
//             const ast = parseAst(readFileSync(sourceFile,'utf-8'))
//             walk(ast,{
//                 enter ( node ) {
//                         if(node.type==='ImportDeclaration'){
//                             const importPath = node.source.value
//                             if(importPath.startsWith('.')){
//                                 node.source.value = path.join(path.dirname(sourceFile),importPath)
//                             }
//                         }
//                 },
//                 leave ( node ) {
//                             if(node.type==='ImportDeclaration'){
//                                 const importPath = node.source.value
//                                 if(importPath.startsWith('.')){
//                                     node.source.value = path.join(path.dirname(sourceFile),importPath)
//                                 }
//                             }
//                 }
//             })
//         }
//     })
// }
//
// function createFile(){
// }
