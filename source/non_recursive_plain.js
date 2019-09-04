'use strict';

const nonRecursivePlain = (arr) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('Not array provided.');
    }

    const result = [];

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
