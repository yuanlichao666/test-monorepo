import {Compile} from "lib/models/compiler/compiler";
import {
    addSubDependency,
    Dependency, output, readSourceCode, replaceExtNameForOutput,
} from "lib/models/common/dependency";
import {transform} from "esbuild";
import {flowRight} from "lodash-es";

export const  compileSingleScript:Compile =  transformAndOutput

async function transformAndOutput(dependency:Dependency){
    return Promise.resolve(dependency)
        .then(readSourceCode)
        .then(transformModule)
        .then(transFormSyntax)
        .then(output)
}


const exportFromRe =/export\s+[\w{},*]+\s+from\s+['"](?<exportFromSource>[\w\/.]+)['"]/g
const importFromRe = /import\s+[\w{},*]+\s+from\s+['"](?<importFromSource>[\w\/.]+)['"]/g
const exportRe = /export\s+['"](?<exportSource>[\w\/.]+)['"]/g
const importRe = /import\s+['"](?<importSource>[\w\/.]+)['"]/g
const moduleRe = new RegExp(`(${exportRe.source}|${importRe.source}|${importFromRe.source}|${exportFromRe.source}})`,'g')

type Declaration = {
    declaration:string
    source:string,
}

async function transformModule(dependency:Dependency){

    function extractFromMatched(...args) {
        const declaration = args[0]
        const matchedGroup = args[args.length-1]
        const source = Object.values(matchedGroup).filter(Boolean).pop() as string
        return  {declaration, source};
    }

    function addAsSubDependency({source,declaration}:Declaration){
        addSubDependency(dependency,source)
        return {declaration,source}
    }

    function transformSource({source,declaration}:Declaration){
        const newSource = replaceExtNameForOutput(source,dependency.format)
        return declaration.replace(source,newSource)
    }

    const transform = flowRight(transformSource,addAsSubDependency,extractFromMatched)
    dependency.sourceCode =  dependency.sourceCode!.replace(moduleRe,transform)
    return dependency
}



async function transFormSyntax(dependency:Dependency){
    let { code } = await transform(dependency.sourceCode!, {
        loader: "tsx",
        format: dependency.format.type,
        sourcemap: "inline",
    });
    dependency.newCode = code
    return dependency
}




