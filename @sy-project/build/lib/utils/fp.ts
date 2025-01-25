declare const INVALID_COMPOSABLE_CHAIN: unique symbol;

type Comp = (arg: any) => any;

type IsValidChain<T extends ((arg: never) => any)[]> =
    T extends [infer $First extends Comp, infer $Second extends Comp, ...infer $Rest extends Comp[]]
        ? [ReturnType<$First>] extends [Parameters<$Second>[0]]
            ? IsValidChain<[$Second, ...$Rest]>
            : (T extends [any, ...infer $Rest] ? $Rest["length"] : never)
        : true;

type ReplaceFromBack<T extends unknown[], Offset extends number, Item, $Draft extends unknown[] = []> =
    $Draft["length"] extends Offset
        ? $Draft extends [any, ...infer $After]
            ? [...T, Item, ...$After]
            : never
        : T extends [...infer $Before, infer $Item]
            ? ReplaceFromBack<$Before, Offset, Item, [$Item, ...$Draft]>
            : never;

type asdf = ReplaceFromBack<[1, 2, 3, 4, 5, 6, 7, 8, 9], 3, "hey">;

function compose<Composables extends [Comp, ...Comp[]]>(
    ...composables:
    IsValidChain<Composables> extends (infer $Offset extends number)
        ? ReplaceFromBack<Composables, $Offset, "INVALID_COMPOSABLE">
        : Composables
) {
    return (
        firstData: Parameters<Composables[0]>[0]
    ): Composables extends [...any[], infer $Last extends (arg: never) => any]
        ? ReturnType<$Last>
        : never => {
        let data: any = firstData;
        for (const composable of composables) {
            data = (composable as any)(data);
        }
        return data;
    };
}

const addOne = (a: number): number => a + 1;

const numToString = (a: number): string => a.toString();
const stringToNum = (a: string): number => parseFloat(a);

namespace CorrectlyPassing {
    const v0 = compose(addOne, numToString, stringToNum);
    //    ^?

    const v1 = compose(addOne, addOne, addOne, addOne, addOne, numToString);
    //    ^?

    const v2 = compose(numToString, stringToNum, addOne);
    //    ^?

    const v3 = compose(addOne, addOne, addOne);
    //    ^?
}

namespace CorrectlyFailing {
    // :o they actually show the error next to the incorrect one!
    compose(addOne, stringToNum);
    compose(numToString, addOne);
    compose(stringToNum, stringToNum);
    compose(addOne, addOne, addOne, addOne, stringToNum);
    compose(addOne, addOne, addOne, addOne, stringToNum, addOne);
}
