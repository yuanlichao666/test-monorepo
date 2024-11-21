import * as path from "node:path";
import {getCwd} from "../utils";


import { nodeResolve } from '@rollup/plugin-node-resolve'; //解析第三方插件
import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import {rollup} from "rollup";





export async function buildEsm(){

    return rollup({
        input: path.resolve(getCwd(), 'src/index.ts'),
        plugins: [
            nodeResolve(),
            typescript({
                outDir: path.resolve(getCwd(),'dist'),
            }),
            commonjs()
        ],
        external:['react','react-dom','redux'],
    }).then(bundle => {
       return  bundle.write({
           dir: path.resolve(getCwd(),'dist'),
           format: 'es',
           exports: 'named', // 指定导出模式（自动、默认、命名、无）
           preserveModules: true, // 保留模块结构
           preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
        })
    }).then((res)=>{
        console.log(res)
    }).catch(e=>console.log(e))
}


