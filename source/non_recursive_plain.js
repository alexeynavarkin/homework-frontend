'use strict';


const non_recursive_plain = (arr) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('Not array provided.');
    }

    let result = [];

    while (arr.length) {
        const element = arr.pop();

        if (Array.isArray(element)) {
            arr.push(...element);
            continue;
        }

        result.unshift(element);
    }

    return result;
};
