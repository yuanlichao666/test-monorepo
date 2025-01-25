/**
 * 组件的抽象
 * 组件自己负责自己的编译
 * 编译的过程就是解析入口文件，收集分析各种依赖进一步编译
 *
 *   源入口文件
 *
 *   import './button.scss'
 *   import '../../styles/index.scss'
 *   export * from './button'
 *
 * 1、收集js依赖，编译并生成组件入口文件
 *
 *   产物
 *   buttonEntry.js ： export * from './button'      // 导出button.js
 *   button.js      ： export function button(){}    // button组件源文件编译后的产物
 *
 * 2、收集scss、css依赖，编译并生成组件样式入口文件
 *
 *   产物
 *   buttonStyleEntry.js： import './button.css'             //样式入口关联样式导入
 *                      ： import '../../styles/index.scss'
 *
 *   3、整合生成的js和css入口，生成一个总的入口
 *
 *
 *   实际上组件的入口文件排除样式导入后，就是js入口，所以我们只需要在编译的过程中排除样式导入，遇到样式导入，收集样式依赖，生成样式入口文件
 *   然后在根据js和css入口文件，生成总的入口文件
 *
 */
import path from "node:path";
import {createDependency, Dependency} from "lib/models/common/dependency";
import {Compile, compiler} from "lib/models/compiler/compiler";
import {curry, flowRight} from "lodash-es";
import {isInSameDir} from "lib/models/common/path";
import {Format} from "lib/models/common/config";

/**
 * 实现步骤
 * 1、首先采用rollup编译入口文件
 * 2、遇到样式导入排除处理，收集到组件的依赖中
 * 2、
 */



export class Component {
    protected format:Format

    protected compiler:Compile

    /**
     * 输入和输出路径
     * inputEntry 输入整体入口文件
     * outputEntry  输出整体入口文件
     * outputCssEntry  输出css入口文件
     * outputScssEntry  输出scss入口文件
     * outputScriptEntry  输出script入口文件
     */
    protected inputEntry: string = '';
    protected outputEntry:string = '';
    protected outputCssEntry:string = '';
    protected outputScssEntry:string = '';
    protected outputScriptEntry:string = '';


    /**
     * 处理过程中用到的临时变量
     * componentDirName 组件的目录名
     * componentRelativePathForSrc 组件相对src的路径
     */
    protected componentDir: string = '';
    protected componentDirName: string = '';
    protected componentRelativePathForSrc: string = '';


    /**
     * dependencies 编译过程中遇到的依赖项
     */
    protected dependencies: Record<string, Dependency> = {};


    constructor(entry:string,format:Format,compiler:Compile) {
        this.format = format
        this.compiler = compiler
        this.inputEntry = entry
        this.componentDir = path.dirname(entry)
    }


    public build = async()=> {
        const {buildDependency,inputEntry,format} = this
        const composed = [buildDependency, createDependency]
        return flowRight(composed)(inputEntry,format)
    }

    public buildDependency = (dependency:Dependency)=> {
        const {buildSubDependencies,compiler} = this
        const compose =  reducePromiseRight(buildSubDependencies,compiler)
        return compose(dependency)
    }

    public buildSubDependencies = async(dependency:Dependency)=>{
        const {subDeps} = dependency
        const {buildDependency} = this
        return flowRight(reducePromiseRight,subDeps.map(buildDependency))
    }

    // //编译过程中遇到了依赖
    // protected  onDependencies= async(dependencies:Dependency[])=> {
    //     dependencies.forEach((item)=>{
    //        this.dependencies[item.path] = item
    //     })
    //     return this.compileDependencies(dependencies)
    // }
    //
    // //1、编译入口文件，递归编译
    // //2、遇到样式导入，收集到组件的依赖中
    // //3、根据组件的依赖，生成总的入口文件
    // protected compileDependencies =async (dependencies:Dependency[])=>{
    //     const {compileSubDeps} = this
    //     return dependencies.reduce(async (prev,curr)=>{
    //         return prev.
    //             then(_=>compiler(curr))
    //             .then(compileSubDeps)
    //     },Promise.resolve())
    // }
    //
    // protected compileSubDeps = async (dependency:Dependency)=>{
    //     const {subDeps} = dependency
    //     const {onDependencies,ignoreExternalDependencies} = this
    //     return flowRight(onDependencies,()=>'haha',ignoreExternalDependencies)(subDeps)
    // }

    protected  ignoreExternalDependencies = (dependencies:Dependency[])=>{
        const isInComponentDir = (dependency:Dependency)=>{
            return isInSameDir(this.componentDir,dependency.path)
        }
        return  dependencies.filter(isInComponentDir)
    }




    protected async generateEntries() {

    }
}
