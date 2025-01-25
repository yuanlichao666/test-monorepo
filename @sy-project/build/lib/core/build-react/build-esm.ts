import {cleanDist} from "lib/utils/clean";
import {logError} from "lib/utils/log";
import {getComponentEntries} from "lib/utils/getComponentEntries";
import {Component} from "lib/models/products/component";
import {format} from "lib/models/common/config";



export async function buildEsm(){
return Promise.resolve()
    .then(cleanDist)
    .then(copyFont)
    .then(buildStyles)
    .then(buildComponents)
    .then(buildStyleEntries)
    .then(buildSuccess)
    .catch(buildError)
}

async function copyFont(){
    return Promise.resolve()
}

async function buildStyles(){
    // const inputDir = path.resolve(getCwd(), 'src/**/*.scss')
    // const outputDir = path.resolve(getCwd(),'dist')
    // return compileStyles(inputDir,outputDir)
    return Promise.resolve()
}


 function buildComponents(){
    const inputs = getComponentEntries()
    return inputs.reduce(async (prev,input)=>{
       prev.then(async ()=>{
          return format.reduce(async (prev,_format)=>{
              return prev.then(async ()=>{
                  const component = new Component(input)
                  return component.build(_format)
              })
          },Promise.resolve())
       })
    },Promise.resolve())
}

function buildStyleEntries(){
   // return compileStyleEntries()
}


function buildSuccess(){
    console.log('编译成功')
}


function buildError(e:Error){
    logError(e)
    process.exit(1)
}
