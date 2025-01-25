/**
 * base utils
 */

export type Head<R extends unknown[]> = R[0];
export type Tail<R extends unknown[]> = R extends [any, ...infer T] ? T : [];
export type Lead<R extends unknown[]> = R extends [...infer L, any] ? L : [];
export type Last<R extends unknown[]> = R extends [...Lead<R>, infer L] ? L : never;

export type Pop<T extends unknown[]> =
    T extends [...infer Rest,infer Last]?
        Rest:
        never


export type Shift<T extends unknown[]> =
    T extends []?[]:
    T extends [infer First, ...infer Rest]?
        Rest:
        never

export type Push<T extends unknown[],U> =
    T extends []? [U]: [...T,U]

export type Unshift<T extends unknown[],U> =
    T extends []? [U]: [U,...T]

export type Reverse<T extends unknown[],New extends unknown[] = []> =
    T extends []? New:
        T extends [...infer Rest,infer Last]?
            Reverse<Rest,Push<New,Last>>:
            never

export type Replace<Source extends unknown[],Index extends number,Element extends unknown> ={
    //元组的索引是是字符串常量'0','1','2','3'...，所以这里使用`${Index}`转一下
    [K in keyof Source]: K extends `${Index}`? Element: Source[K]
}

export type unPromise<T> = T extends Promise<infer U>? U:T

export type UnPackage<T> = string

export type getInstance<T> = T extends new (...args: any[]) => infer R? R:never

export type getReturn<T> = T extends (...args:any[])=>infer R? R:never



export type firstFunctionParams<T extends Array<(...args:any[])=>any>> = Parameters<Head<T>>
export type firstFunctionReturn<T extends Array<(...args:any[])=>any>> = ReturnType<Head<T>>
export type lastFunctionParams<T extends Array<(...args:any[])=>any>> = Parameters<Last<T>>
export type lastFunctionReturn<T extends Array<(...args:any[])=>any>> = ReturnType<Last<T>>

/**
 * fp utils
 */

export type Fn<A, B> = (a: A) => B;

export type AnyFn = (...args: any[]) => any;

export type Zip<A extends unknown[], B extends unknown[]> = {
    [K in keyof A]: Fn<A[K], B[K & keyof B]>;
};


