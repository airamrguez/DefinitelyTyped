/// <reference path="index.d.ts" />

import linq = require('lazy-linq');

function test_asEnumerable() {
    linq.asEnumerable([1, 2, 3]);
    linq.asEnumerable([{ a: 2, b: 3 }]);
    linq.asEnumerable([true, false]);
    linq.asEnumerable([1, true, undefined, 'a']);
    linq.asEnumerable('string');
    linq.asEnumerable(new Set(['a', 'b', 'c']));
    linq.asEnumerable(new Map([[1, 'a'], [2, 'b']]));
    // This should work without using Array.from.
    // Not supported on Typescript 2.
    linq.asEnumerable([...Array.from(new Set([1, 1, 2, 2, 3]))]);
}

function test_installAsEnumerable() {
    function Bar() { }
    linq.installAsEnumerable(Bar);
    linq.installAsEnumerable(Array);
    linq.installAsEnumerable(String);
    linq.installAsEnumerable(Number);
}

function test_range() {
    const seq = linq.range(1, 10000);
    seq.forEach(x => x);
    seq.last();
}

function test_repeat() {
    const seq = linq.repeat(1, 5);
    seq.sequenceEqual([1, 1, 1, 1, 1]);
}

function test_empty() {
    var data = linq.empty();
    data.sequenceEqual([]);
}

function test_where() {
    const data = linq.asEnumerable([1, 2, 3, 4]);
    data.where<number>(x => x % 2 === 0);
    data.where<number>(x => x % 2 === 0).where(x => x > 2);
    linq.asEnumerable(new Map([[1, 'a'], [2, 'b']]))
        .where(([k, v]) => k > 1);
    linq.asEnumerable(new Set([1, 1, 2, 3, 4, 3]))
        .where(v => v > 2);
}

function test_select() {
    linq.asEnumerable([1, 2, 3])
        .select((x, i) => x * i)
        .count();
}

function test_skip() {
    linq.asEnumerable([1, 2, 3])
        .skip(2)
        .count();
}

function test_skipWhile() {
    linq.asEnumerable([1, 2, 3])
        .skipWhile((x, i) => x < i)
        .count();
}

function test_take() {
    linq.asEnumerable([1, 2, 3])
        .take(2)
        .count();
}

function test_takeWhile() {
    linq.asEnumerable([1, 2, 3])
        .takeWhile((x, i) => x < i)
        .count();
}

function test_reverse() {
    linq.asEnumerable([1, 2, 3])
        .reverse()
        .count();
}

function test_selectMany() {
    linq.asEnumerable([1, 2, 3])
        .selectMany((x, i) => linq.repeat(x, i))
        .count();
    linq.asEnumerable([1, 2, 3])
        .selectMany((x, i) => linq.repeat(x, i), (x, seq) => seq.reverse())
        .count();
}

interface Data {
    id: number;
    f: string;
}
const data: Data[] = [{ id: 1, f: 'a' }, { id: 2, f: 'b' }, { id: 3, f: 'c' }];

function test_groupBy() {
    linq.asEnumerable([1, 2, 3])
        .groupBy();
    linq.asEnumerable(data)
        .groupBy<Data>(x => x.id);
    linq.asEnumerable(data)
        .groupBy<Data>(x => x.id, x => x.f);
    linq.asEnumerable(data)
        .groupBy<Data>(
        x => x.id,
        x => x.f,
        (key, values) => linq.asEnumerable(values).reverse()
        );
    linq.asEnumerable(data)
        .groupBy<Data>(
        x => x.id,
        x => x.f,
        (key, values) => linq.asEnumerable(values).reverse(),
        (k1, k2) => k1 === k2,
    );
}

function test_orderBy() {
    linq.asEnumerable(data)
        .orderBy(x => x)
        .count();
    linq.asEnumerable(data)
        .orderBy(x => x, (x, y) => x > y ? 1 : (x === y) ? 0 : -1)
        .count();
}

function test_orderByDescending() {
    linq.asEnumerable(data)
        .orderByDescending(x => x)
        .count();
    linq.asEnumerable(data)
        .orderByDescending(x => x, (x, y) => x > y ? 1 : (x === y) ? 0 : -1)
        .count();
}