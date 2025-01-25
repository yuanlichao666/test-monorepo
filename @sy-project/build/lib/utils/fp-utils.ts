import {Replace} from "lib/utils/type-utils";
import * as test from "node:test";


declare const INVALID_COMPOSABLE_CHAIN: unique symbol;

type Test = [
    () => string,
    (arg: number) => void,
    (arg: boolean) => number,
    (arg: string) => boolean
];

type Test2 = [string, number];



type Fn = (...args:any[])=>any

type IsValidCompose<T extends Fn[]> =
    T extends [...infer Rest extends Fn[],infer Left extends Fn, infer Right extends Fn]
        ? Parameters<Left>[0] extends ReturnType<Right>
            ? IsValidChain<[...Rest,Left]>
            : T extends [any,...infer Todos]
                ? Todos['length']
                : never
        : true

export type Composable<T extends Fn[]> =
    IsValidCompose<T> extends (infer R extends number)
        ?Replace<T, R, '不可组合'>
        :T

function test<T extends Fn[]>(...fns:Composable<T>){}
type r = void extends number?true:false
test(
    (a:boolean)=>'a',
    (a:string)=>false,
    (a:string)=>'',
    (a:number)=>'',
    (a:number)=>1
)

type a = Composable<[
    () => string,
    (arg: number) => void,
    (arg: boolean) => number,
    (arg: string) => boolean
]>
