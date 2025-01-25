import dartSass, {compileString, compileStringAsync} from 'sass';
import debug from "gulp-debug";
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import {dest, src} from "gulp";
import {Compile} from "lib/models/compiler/compiler";
import {Dependency, output, readCodeOfSource} from "lib/models/common/dependency";
import path from "node:path";

export const compileSingleStyle:Compile = async function (dependency:Dependency){
    return Promise.resolve(dependency)
        .then(readCodeOfSource)
        .then(transformScss)
        .then(output)
}

function transformScss(dependency:Dependency){
    const importer = path.dirname(dependency.path)
    const {css} = compileString(dependency.sourceCode!,{
        loadPaths:[importer]
    })
    dependency.newCode = css
    return dependency
}
export async function compileStyles(input:string, output:string){
    // const sass = gulpSass(dartSass);
    // return src(input)
    //     // .pipe(debug({ title: 'scss files:' }))
    //     .pipe(sass.sync())
    //     .pipe(autoprefixer())
    //     .pipe(cleanCss())
    //     .pipe(dest(output));
}


export function extractStyle(input:string, output:string){
    return src(input)
        .pipe(debug({ title: 'scss files:' }))
        .pipe(dest(output));
}

// @ts-ignore
export function createExtractStylePlugin(oneFileExtracted: (filePath:string)=>void):Plugin{
    // return extractStyle()
}
