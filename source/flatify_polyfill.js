"use strict";


Array.prototype.flatify = function() {
    return flatify(this, arguments[0]);
};


const flatify_ftw = arr => arr.flatify(Infinity);
