
let nums = [1, 2, [3, [4, 5], 6], 7];

function flatten(arr) {
    if (arr.length === 0) {
        return [];
    }
    let [first, rest] = [arr[0], arr.slice(1)];
    if (Array.isArray(first)) {
        return flatten(first).concat(flatten(rest));
    }
    return [first].concat(flatten(rest));
}

function flatten(arr) {
    function doFlatten(arr, pos, retArr) {
        if (pos === arr.length) {
            return;
        }

        let first = arr[pos];
        if (Array.isArray(first)) {
            doFlatten(first, 0, retArr);
        }
        else {
            retArr.push(first);
        }
        doFlatten(arr, pos + 1, retArr);
    }

    let retArr = [];
    doFlatten(arr, 0, retArr);
    return retArr;
}

function flatten(arr) {
    function iter(obj) {
        return obj[Symbol.iterator]();
    }

    function doFlatten(it, retArr) {
        let item = it.next();
        if (item.done) {
            return;
        }

        let first = item.value;
        if (Array.isArray(first)) {
            doFlatten(iter(first), retArr);
        }
        else {
            retArr.push(first);
        }
        doFlatten(it, retArr);
    }

    let retArr = [];
    doFlatten(iter(arr), retArr);
    return retArr;
}
