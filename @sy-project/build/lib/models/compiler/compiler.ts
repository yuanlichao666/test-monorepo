import {Dependency} from "lib/models/common/dependency";
import {compileSingleScript} from "lib/models/compiler/compile-script";
import {compileSingleStyle} from "lib/models/compiler/compile-styles";
import {Format} from "lib/models/common/config";

export type Compile =  (entry:Dependency) => Promise<Dependency>

const compilerStrategy:Record<Dependency['type'], Compile> = {
    '.ts':compileSingleScript,
    '.js':compileSingleScript,
    '.tsx':compileSingleScript,
    '.scss':compileSingleStyle,
    '.css':compileSingleStyle,
    // '.vue':compileSingleVue
}


export async function compiler(entry:Dependency){
    const {type} = entry
    return compilerStrategy[type](entry)
}
