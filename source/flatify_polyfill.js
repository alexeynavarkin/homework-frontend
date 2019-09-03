"use strict";


/* This is really strange thing, but why not */


Array.prototype.flatify = function() {
    return flatify(this, arguments[0]);
};


const flatifyPoly = arr => arr.flatify(Infinity);
