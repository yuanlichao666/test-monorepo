import {getDist} from "lib/models/common/path";
export type Format = {
    dir:string
    ext:'.cjs'|'.mjs'
    type:'esm'|'cjs'
}
export const format:Format[] = [
    {
        type:'esm',
        dir:getDist()+'/es',
        ext:'.mjs'
    },
    {
        type:'cjs',
        dir:getDist()+'/lib',
        ext:'.cjs'
    }
]
