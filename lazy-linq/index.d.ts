// Type definitions for lazy-linq 1.0.3
// Project: lazy-linq
// Definitions by: Airam Rguez <https://github.com/airamrguez>

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}
interface Iterator<T> {
    next(): IteratorResult<T>;
}
interface IteratorResult<T> {
    value: T;
    done: boolean;
}

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): Map<K, V>;
    size: number;
}

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    size: number;
}

type predFunc<T> = (val: T, index: number) => boolean;
type compFunc<T> = (x: T, y: T) => number;
type selectorFunc<T> = (x: T) => any;
type equalFunc<T> = (x: T, y: T) => boolean;
type binaryTransFunc<T> = (x: T, y: Enumerable<T>) => Iterable<any>;

interface Enumerable<T> {
    skip(n: number): Enumerable<T>;
    skipWhile<T>(pred: predFunc<T>): Enumerable<T>;
    take(n: number): Enumerable<T>;
    takeWhile<T>(pred: predFunc<T>): Enumerable<T>;
    reverse(): Enumerable<T>;
    select(trans: ((x: T, y: number) => any)): Enumerable<T>;
    where<T>(pred: predFunc<T>): Enumerable<T>;
    selectMany<T>(
        genSeq: ((x: T, y: number) => Enumerable<T>),
        resultTrans?: ((x: T, seq: Enumerable<T>) => T)
    ): Enumerable<T>;
    groupBy<T>(
        keySelector?: selectorFunc<T>,
        valueSelector?: selectorFunc<T>,
        resultTrans?: ((key: any, values: Iterable<T>) => Enumerable<T>),
        keyEqual?: ((key1: any, key2: any) => boolean)
    ): Enumerable<T>;
    orderBy<T>(keySelector: selectorFunc<T>, comp?: compFunc<T>): Enumerable<T>;
    orderByDescending<T>(keySelector: selectorFunc<T>, comp?: compFunc<T>): Enumerable<T>;
    thenBy<T>(keySelector: selectorFunc<T>, comp?: compFunc<T>): Enumerable<T>;
    thenByDescending<T>(keySelector: selectorFunc<T>, comp?: compFunc<T>): Enumerable<T>;
    join<T>(
        other: Iterable<any>,
        keySelector?: selectorFunc<T>,
        otherKeySelector?: selectorFunc<T>,
        binaryTrans?: (x: T, y: T) => Iterable<any>,
        equal?: (x: any, y: any) => boolean,
        isGroupJoin?: boolean,
    ): Enumerable<T>;
    groupJoin<T>(
        other: Iterable<any>,
        keySelector: selectorFunc<T>,
        otherKeySelector: selectorFunc<T>,
        binaryTrans: (x: T, y: Enumerable<T>) => Iterable<any>,
        equal: (x: any, y: any) => boolean,
        isGroupJoin: boolean,
    ): Enumerable<T>;
    zip<T>(other: Iterable<any>, resultTrans: (x: T, y: T) => Iterable<any>): Enumerable<T>;

    concat(other: Iterable<any>): Enumerable<T>;
    otherThan<T>(other: Iterable<any>, equal?: equalFunc<T>): Enumerable<T>;

    distinct<T>(equal?: equalFunc<T>): Enumerable<T>;
    union<T>(other: Iterable<T>, equal?: equalFunc<T>): Enumerable<T>;
    intersect<T>(other: Iterable<T>, equal: equalFunc<T>): Enumerable<T>;
    except<T>(other: Iterable<T>, equal: equalFunc<T>): Enumerable<T>;

    all<T>(pred: predFunc<T>): boolean;
    any<T>(pred: predFunc<T>): boolean;
    singleOrDefault<T>(pred: predFunc<T>, throwWhenNotFound: boolean): T;
    single<T>(pred: predFunc<T>): T;
    count<T>(pred?: predFunc<T>): number;
    contains<T>(val: any, comp: compFunc<T>): boolean;
    elementAtOrDefault(index: number, throwWhenNotFound: boolean): T;
    elementAt(index: number): T;
    firstOrDefault<T>(pred: predFunc<T>, throwWhenNotFound: boolean): T;
    first<T>(pred?: predFunc<T>): T;
    lastOrDefault<T>(pred: predFunc<T>, throwWhenNotFound: boolean): T;
    last<T>(pred?: predFunc<T>): T;
    defaultIfEmpty<T>(val: T): T;
    sequenceEqual<T>(other: Iterable<any>, comp?: compFunc<T>): boolean;
    min<T>(keySelector: selectorFunc<T>): T;
    max<T>(keySelector: selectorFunc<T>): T;
    sum<T>(trans: (x: T, index: number) => number): T;
    average<T>(trans: (x: T, index: number) => number): T;
    aggregate<T>(
        seed: T | ((x: any, y: T) => any),
        aggFunc?: (x: any, y: T) => any,
        resultTrans?: (x: T) => any,
    ): any;
    eval(): Enumerable<T>;
    toArray(): Array<T>;
    toSet(): Set<T>;
    toMap<T>(keySelector: selectorFunc<T>, valueSelector: selectorFunc<T>): Map<any, any>;
    forEach<T>(op: ((x: T) => void)): void;
}

interface ObjectConstructor {
    readonly prototype: Object;
}

declare namespace linq {
    function asEnumerable<T>(obj: Iterable<T>): Enumerable<T>;
    function installAsEnumerable(ctor: ObjectConstructor): void;
    function range(start: number, count: number): Enumerable<any>;
    function repeat(val: any, count: number): Enumerable<any>;
    function empty(): Enumerable<any>;
}

export = linq
