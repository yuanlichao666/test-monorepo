import {getCwd} from "lib/models/common/other";
import path from "node:path";

export function getDependencies(){
    const cwd = getCwd()
    const packageJSON = require(path.resolve(cwd,'package.json'))
    return {
        dependencies: packageJSON.dependencies,
        peerDependencies: packageJSON.peerDependencies,
    }
}
