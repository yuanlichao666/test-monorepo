import 'module-alias'
import path from 'node:path';
import {spawn} from 'child_process';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * 扩展环境变量
 * 由于脚手架是在其他package中执行的，我们无法保证其他package中有我们需要的模块，
 * 所以需要在执行的时候将脚手架自身的node_modules/.bin加入到环境变量中
 */
const cliEnvPath = path.join(__dirname, '../node_modules/.bin');
const env = Object.assign(process.env, {
    PATH: `${cliEnvPath}:${process.env.PATH}`,
});

/**
 * 使用tsx执行脚手架ts文件时，tsx会自动查找工作目录下的ts文件
 * 但脚手架执行的时候progress.cwd === other package dir
 * 所以这里注册tsconfig为脚手架自身的tsconfig
 */
const cliEntryFile = path.join(__dirname, './build-react.ts');
const cliTsconfig = path.join(__dirname, '../tsconfig.json');

/**
 * 开始执行脚手架
 */
const child = spawn('tsx', ['--tsconfig',cliTsconfig,cliEntryFile], {
    env,
    shell: true,
    stdio: "inherit",
});


//子进程异常退出时让主进程也异常退出
child.on('exit',(code)=>{
    if(code!==0){
        process.exit(code)
    }
})

