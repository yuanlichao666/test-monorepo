import {buildEsm} from 'lib/core/build-react/build-esm';

//以index为入口打包整体，用于tree-shaking
//以组件为入口打包每个组件，用于按需导入

/**
 * 按需导入（css和js都支持按需导入）
 * -按需打包组件
 * -按需打包css
 * -保持目录结构，避免重复打包
 * 全量打包（js支持tree-shaking，css不支持）
 * -全量打包组件和样式，js输出esm、css输出一个文件
 */

export  function buildReact(){
    return buildEsm()
}
