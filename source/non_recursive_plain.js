'use strict';

const non_recursive_plain = (arr) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('Not array provided.');
    }
    let result = [];
    while (arr.length) {
        let element = arr.pop();
        if (Array.isArray(element)) {
            arr.push(...element);
        } else {
            result.unshift(element);
        }
    }
    return result;
};
