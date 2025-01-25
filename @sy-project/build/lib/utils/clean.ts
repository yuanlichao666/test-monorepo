import {remove} from "fs-extra";
import path from "node:path";
import {getCwd} from "lib/models/common/path";

export function cleanDist(){
    const cwd = getCwd()
    return remove(path.resolve(cwd,'dist'))
}
