'use strict';


const recursifeFlatify = (arr, depth = 1) => {
    return arr.reduce((acc, elem) => {
        return (Array.isArray(elem) && depth) ? acc.concat(plain(elem, depth - 1)) : acc.concat(elem);
    },[]);
}


const flatify = (arr, depth = 1) => {
    if (!Array.isArray(arr)) {
        throw new TypeError('Not array provided.');
    }

    return recursifeFlatify(arr, depth);
};


const plain = arr => flatify(arr, Infinity);
