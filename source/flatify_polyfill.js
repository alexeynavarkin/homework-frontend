'use strict';

Array.prototype.flatify = function() {
    return flatify(this, arguments[0]);
};

const flatifyPoly = arr => {
    if(!Array.isArray(arr)) {
        throw new TypeError('Not array provided.');
    }

    return arr.flatify(Infinity);
};
