/* o - v2.3.2
 *
 * Released under MIT license
 * https://github.com/hammy2899/o
 */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * Check if the specified values are objects.
 * All values must be objects to assert true.
 *
 * @example
 * ```
 * const a = { a: 1 };
 * const b = { b: 2 };
 * const c = 'I am a string';
 *
 * is(a); // => true
 * is(a, b); // => true
 * is(a, b, c); // => false
 * ```
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function is() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // check if the value is an instance of Object
    return args.every(function (obj) {
        return obj instanceof Object &&
            // check if the value constructor is Object
            obj.constructor === Object;
    });
}

// o
/**
 * Parse the specified dot notation into an iterable string array.
 */
function fromDotNotation(path) {
    var pathParts = path.split('.');
    var parts = [];
    var index = 0;
    while (index < pathParts.length) {
        var parsedPart = pathParts[index];
        while (parsedPart[parsedPart.length - 1] === '\\' &&
            pathParts[index + 1] !== undefined &&
            pathParts[index + 1] !== null) {
            parsedPart = parsedPart.slice(0, -1) + ".";
            index += 1;
            parsedPart += pathParts[index];
        }
        index += 1;
        parts.push(parsedPart);
    }
    return parts;
}
/**
 * Build array of strings into dot notation path
 */
function toDotNotation(paths) {
    return paths
        .map(function (part) { return part
        .replace('.', '\\.'); })
        .join('.');
}
/**
 * Export dot notation functions under single export
 */
var dotNotation = {
    from: fromDotNotation,
    to: toDotNotation
};
/**
 * Check if all args specified are objects
 */
function valid() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return is.apply(null, args);
}

// o
/**
 * Check if the specified object is empty.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 * const b = {};
 *
 * empty(a); // => false
 * empty(b); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function empty(obj) {
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // check if the object has at least 1 key
    return !(Object.keys(obj).length > 0);
}

// o
/**
 * Clone the specified object.
 * Modifying the properties of a cloned object won't affect the original.
 *
 * @example
 * ```
 * const a = { a: 1 };
 *
 * const b = clone(a);
 * b.a = 2;
 *
 * console.log(a.a, b.a); // => 1  2
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function clone(obj) {
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // if the object is empty just return a new object
    // istanbul ignore next
    if (empty(obj))
        return {};
    // create a new empty object
    var result = {};
    // for each key in the object
    Object.keys(obj).forEach(function (key) {
        // get the value at the current key
        var val = obj[key];
        // if the value is an object
        if (is(val)) {
            // set the value on the result object as
            // the cloned value object
            result[key] = clone(val);
        }
        else {
            // add the value from the original object to the same
            // key in the new object
            result[key] = obj[key];
        }
    });
    // return the new object
    return result;
}

// o
/**
 * Merge two or more objects into one with the most right having
 * the highest priority
 *
 * @example
 * ```
 * const a = { a: 1 };
 * const b = { b: 2 };
 * const c = { b: 5 };
 *
 * shallowMerge(a, b); // => { a: 1, b: 2 }
 * shallowMerge(a, b, c); // => { a: 1, b: 5 }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.1.0
 * @version 2.1.1
 */
function shallowMerge(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    // check if the arg specified is an object
    if (!valid(target))
        throw new TypeError("Expected Object, got " + typeof target + " " + target);
    // check if all the compare values are objects
    if (!valid.apply(null, sources)) {
        throw new TypeError("Expected Object[], got " + typeof sources + " " + sources);
    }
    // clone the target object and make it the current result
    var result = clone(target);
    // foreach over the sources
    sources.forEach(function (sourceObject) {
        // get the result (target to start with) and source object keys
        var resultKeys = Object.keys(result);
        var sourceKeys = Object.keys(sourceObject);
        // foreach over the result (target to start with) keys
        resultKeys.forEach(function (key) {
            // if the source contains the target key
            if (sourceKeys.includes(key)) {
                // set the result key as the source value
                result[key] = sourceObject[key];
            }
        });
        // foreach over the source keys
        sourceKeys.forEach(function (key) {
            // if the result doesn't include the key
            if (!resultKeys.includes(key)) {
                // set the new key/value onto the result object
                result[key] = sourceObject[key];
            }
        });
    });
    // return the result
    return result;
}

/**
 * Deflate the specified object into a one deep object
 * (keys will be dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * deflate(a); // => { a: 1, 'b.c': 2 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function deflate(obj) {
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // if the object is empty just return an empty object
    // istanbul ignore next
    if (empty(obj))
        return {};
    // create a new object for the result
    var result = {};
    // create a recursive function to build the result
    var deflateObj = function (object, currentPath) {
        Object.keys(object).forEach(function (key) {
            // build an array of the current path and the current key
            var newPath = __spreadArrays(currentPath, [key]);
            // get the value of the key path for the current object
            var value = object[key];
            // if the value is an object and isn't empty
            if (is(value) && !empty(value)) {
                // rerun this function but with the value as the object
                // and the current path as the new path
                deflateObj(value, newPath);
            }
            else {
                // if the value isn't an object or is an empty object
                // set the path on the result as the dot notation one deep
                // path
                result[dotNotation.to(newPath)] = value;
            }
        });
    };
    // run the first iteration of the recursive functions
    deflateObj(obj, []);
    // return the result
    return result;
}

// o
/**
 * Set the value to the path on the specified object
 *
 * @example
 * ```
 * const a = { a: 1 };
 *
 * set(a, 'b.c', 2); // => { a: 1, b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function set(obj, path, value) {
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof path !== 'string')
        throw new TypeError("Expected String, got " + typeof path + " " + path);
    var cloned = clone(obj);
    var result = cloned;
    var pathParts = dotNotation.from(path);
    pathParts.forEach(function (part, index) {
        if (!is(cloned[part])) {
            cloned[part] = {};
        }
        if (index === pathParts.length - 1) {
            cloned[part] = value;
        }
        cloned = cloned[part];
    });
    return result;
}

// o
/**
 * Inflate the specified object into a multi level object
 * (reverse of deflate)
 *
 * @example
 * ```
 * const a = { a: 1, 'b.c': 2 };
 *
 * inflate(a); // => { a: 1, b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function inflate(obj) {
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // if the object is empty just return an empty object
    // istanbul ignore next
    if (empty(obj))
        return {};
    // create a new object for the result
    var result = {};
    // for each "path" in the object
    Object.keys(obj).forEach(function (keyPath) {
        // set the value on the result object to the dot notation path
        result = set(result, keyPath, obj[keyPath]);
    });
    // return the result
    return result;
}

/**
 * Merge all sources into the target object with the most right
 * source having the highest priority
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { b: { d: 3 } };
 * const c = { b: { c: 3 } };
 *
 * merge(a, b); // => { a: 1, b: { c: 2, d: 3 } }
 * merge(a, b, c); // => { a: 1, b: { c: 3, d: 3 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.1.1
 */
function merge(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    // check if the arg specified is an object
    if (!valid(target))
        throw new TypeError("Expected Object, got " + typeof target + " " + target);
    // check if all the compare values are objects
    if (!valid.apply(null, sources)) {
        throw new TypeError("Expected Object[], got " + typeof sources + " " + sources);
    }
    // clone the target and set it as the result
    var result = deflate(clone(target));
    // deflate all the sources
    var deflatedSources = sources.map(function (s) { return deflate(s); });
    var shallowMergeArgs = __spreadArrays([result], deflatedSources);
    // return the result
    return inflate(shallowMerge.apply(null, shallowMergeArgs));
}

/**
 * Returns a function which will merge all objects with the default object
 * specified. This is useful for creating default options/settings.
 *
 * @example
 * ```
 * const getDefaults = defaults({ a: 1, b: { c: 2 } })
 *
 * getDefaults({ b: { c: 3, d: 4 } }) // => { a: 1, b: { c: 3, d: 4 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.3.0
 * @version 2.3.0
 */
function defaults(obj) {
    // check if the object specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // cloned
    var cloned = clone(obj);
    // create the defaults user function
    var result = function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        return merge.apply(void 0, __spreadArrays([cloned], objects));
    };
    // add property of the default object
    result.defaultObject = cloned;
    // return the result
    return result;
}

// o
/**
 * Delete the specified path from the object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * del(a, 'b.c'); // => { a: 1, b: {} }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function del(obj, path) {
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof path !== 'string')
        throw new TypeError("Expected String, got " + typeof path + " " + path);
    // clone the original object so we can manipulate it
    var cloned = clone(obj);
    // create the result object as a ref to the cloned object
    var result = cloned;
    // get the dot notation path parts
    var pathParts = dotNotation.from(path);
    // for each path part
    pathParts.forEach(function (part, index) {
        // if the part is the last one
        if (index === pathParts.length - 1) {
            // delete the value in the object
            delete cloned[part];
        }
        // set the cloned value as the next part
        cloned = cloned[part];
    });
    // return the result
    return result;
}

// o
// default options
var getDefaults = defaults({
    follow: false
});
/**
 * Remove `null` and `undefined` values from the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: null, c: undefined };
 *
 * clean(a); // => { a: 1 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function clean(obj, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults(options).follow;
    // check if the object specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // check if follow is a boolean
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // if the object is empty just return a new object
    // istanbul ignore next
    if (empty(obj))
        return {};
    // create the result object with a clone of the original
    // so we can manipulate it
    var result = clone(obj);
    // deflate the object keys if follow is true
    // then we only need to loop over 1 layer of keys
    var keysObject = follow
        ? deflate(obj)
        : obj;
    // for each key
    Object.keys(keysObject).forEach(function (key) {
        // get the key value
        var value = keysObject[key];
        // if the value is `undefined` or `null`
        if (value === undefined || value === null) {
            // delete the value from the result object
            result = del(result, key);
        }
    });
    // return the result object
    return result;
}

// o
/**
 * Check whether all the objects are equal
 * (only 1 layer deep, use equalDeep for a deep comparison)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1 };
 * const d = { a: 2 };
 * const e = { a: 1, b: { c: 2 } };
 * const f = { a: 1, b: { c: 3 } };
 *
 * equal(a, b); // => true
 * equal(c, d); // => false
 * equal(e, f); // => true
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function equal(obj) {
    var compareWith = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        compareWith[_i - 1] = arguments[_i];
    }
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // check if all the compare values are objects
    if (!valid.apply(null, compareWith)) {
        throw new TypeError("Expected Object[], got " + typeof compareWith + " " + compareWith);
    }
    // get the keys of the specified object
    var keys = Object.keys(obj);
    // loop over all the specified compare values and if every compared value
    // returns true then return true for equal
    return compareWith.every(function (currentObject) {
        // get the keys for the current object
        var currentKeys = Object.keys(currentObject);
        // if the current object and the original don't have the same amount of keys
        // then return false because on is missing or it has extras
        if (currentKeys.length !== keys.length)
            return false;
        // if the current object doesn't contain the keys the original object
        // has then return true because the keys don't match
        if (!keys.every(function (key) { return currentKeys.includes(key); }))
            return false;
        // create a function to check if the 2 values equal
        var valueIsEqual = function (value, compareValue) {
            // if one of values is an object
            if (is(value) || is(compareValue)) {
                // return true if both values are objects since this is
                // only 1 layer deep
                return is(value) && is(compareValue);
            }
            // if one of the values is an array
            if (Array.isArray(value) || Array.isArray(compareValue)) {
                // return true if both values are an array since this isn't
                // comparing array values
                return Array.isArray(value) && Array.isArray(compareValue);
            }
            // if one of the values is a function
            if (typeof value === 'function' || typeof compareValue === 'function') {
                // both values are a function
                if (typeof value === 'function' && typeof compareValue === 'function') {
                    // return true if both functions are the same
                    return value.toString() === compareValue.toString();
                }
                // return false if the functions do not match or if only
                // one of the values is a function
                // istanbul ignore next
                return false;
            }
            // anything else just compare as normal and return true if both
            // values match
            return value === compareValue;
        };
        // if all values are equal to the original object return true
        return keys.every(function (key) { return valueIsEqual(obj[key], currentObject[key]); });
    });
}

// o
/**
 * Check whether all objects deeply equal each other
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1 };
 * const d = { a: 2 };
 * const e = { a: 1, b: { c: 2 } };
 * const f = { a: 1, b: { c: 3 } };
 *
 * deepEqual(a, b); // => true
 * deepEqual(c, d); // => false
 * deepEqual(e, f); // => false
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function deepEqual(obj) {
    var compareWith = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        compareWith[_i - 1] = arguments[_i];
    }
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // check if all the compare values are objects
    if (!valid.apply(null, compareWith)) {
        throw new TypeError("Expected Object[], got " + typeof compareWith + " " + compareWith);
    }
    // check if every object is equal to each other when deflated
    // if all objects are deflated we can simply use the equal function
    // to check if they equal at 1 layer
    return compareWith.every(function (object) { return equal(deflate(obj), deflate(object)); });
}

// o
// default options
var getDefaults$1 = defaults({
    follow: false
});
/**
 * Foreach over an objects keys
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b  { c: 2 }
 * });
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b.c  2
 * }, {
 *   follow: true,
 * });
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function each(obj, cb, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$1(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof cb !== 'function')
        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // if the object is empty just return false because it doesn't have anything
    if (empty(obj))
        return;
    // if follow is true deflate the object so we can simply
    // iterate over 1 layer of keys
    var iterableObject = follow
        ? deflate(obj)
        : obj;
    // for each key run the callback function
    Object.keys(iterableObject)
        .forEach(function (key, index) { return cb(key, iterableObject[key], index); });
}

// o
// default options
var getDefaults$2 = defaults({
    follow: false
});
/**
 * Check if every item in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }); // => false
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }, {
 *   follow: true,
 * }); // => true
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function every(obj, cb, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$2(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof cb !== 'function')
        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // set result to true so we can change it to false if
    // the callback fails to evaluate to true
    var result = true;
    // for each over the object using the each function which makes it easier
    // for us to loop since we can just pass our own callback to evaluate the
    // the return value and we can pass follow directly to each and it will
    // handle the deep looping for us
    each(obj, function (key, value, index) {
        // if the callback evaluates to false
        if (!cb(key, value, index)) {
            // set the result as false
            result = false;
        }
    }, {
        follow: follow
    });
    // return the result
    return result;
}

// o
var getDefaults$3 = defaults({
    follow: false
});
/**
 * Filter the object keys/values depending on the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * filter(a, (key, value) => {
 *   return value === 1;
 * }); // => { a: 1 }
 *
 * filter(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => { b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function filter(obj, cb, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$3(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof cb !== 'function')
        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // create a clone of the original object for the result so we can
    // manipulate it
    var result = clone(obj);
    // for each over the object using the each function which makes it easier
    // for us to loop since we can just pass our own callback to evaluate the
    // the return value and we can pass follow directly to each and it will
    // handle the deep looping for us
    each(obj, function (key, value, index) {
        // if the callback evaluates to false
        if (!cb(key, value, index)) {
            // remove the value at that key from the result
            result = del(result, key);
        }
    }, {
        follow: follow
    });
    // return the result
    return result;
}

// o
// default options
var getDefaults$4 = defaults({
    follow: false
});
/**
 * Find the key matching the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }); // => undefined
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => 'b.c'
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function find(obj, cb, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$4(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof cb !== 'function')
        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // create a variable to track whether the key is found
    var found = false;
    // create the result variable which will default to undefined
    var result;
    // for each over the object using the each function which makes it easier
    // for us to loop since we can just pass our own callback to evaluate the
    // the return value and we can pass follow directly to each and it will
    // handle the deep looping for us
    each(obj, function (key, value, index) {
        // if the key is already found skip because find should
        // return the first found key
        if (!found) {
            // check if the callback evaluates to true
            if (cb(key, value, index)) {
                // if it does evaluate true set found as true
                found = true;
                // and set the result as the current key
                result = key;
            }
        }
    }, {
        follow: follow
    });
    // if the key was not found set the result as undefined
    if (!found)
        result = undefined;
    // return the result
    return result;
}

// o
// default options
var getDefaults$5 = defaults({
    follow: false,
    useToString: false
});
/**
 * Flip an objects keys fro values and values for keys
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1, b: { c: 2 } };
 *
 * flip(a); // => { '1': 'a', '2': 'b', '3': 'c' }
 * flip(b, {
 *   follow: true,
 * }); // => { '1': 'a', '2': 'b.c' }
 * flip(b, {
 *   useToString: true,
 * }); // => { '1': 'a', '{"c":2}': 'b' }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function flip(obj, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var _a = getDefaults$5(options), follow = _a.follow, useToString = _a.useToString;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    if (typeof useToString !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof useToString + " " + useToString);
    // create an empty object for the result
    var result = {};
    // for each over the object using the each function which makes it easier
    // for us to loop since we can just pass our own callback to evaluate the
    // the return value and we can pass follow directly to each and it will
    // handle the deep looping for us
    each(obj, function (key, value) {
        // if the value is a string or number and can be used
        // as the key
        if (typeof value === 'string' || typeof value === 'number') {
            // add the value/key to the result object
            result[value] = key;
        }
        else if (typeof value !== 'string' && useToString) {
            // if the value is not a string but useToString is true
            // if the value is an object or array
            if (is(value) || Array.isArray(value)) {
                // cover it to json and use the json as the key
                result[JSON.stringify(value)] = key;
            }
            else {
                // if it is anything else convert it to a string
                result[String(value).toString()] = key;
            }
        }
    }, {
        follow: follow
    });
    // return the result
    return result;
}

// o
/**
 * Check if an object has the specified path (using dot notation)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * has(a, 'b.c'); // => true
 * has(a, 'b.d'); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function has(obj) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (!paths.every(function (path) { return typeof path === 'string'; })) {
        throw new TypeError("Expected String[], got " + typeof paths + " " + paths);
    }
    // if the object is empty just return false because it doesn't have anything
    if (empty(obj))
        return false;
    // set the result boolean to true by default
    var hasPaths = true;
    // for each path specified
    paths.forEach(function (path) {
        // check if hasPaths is true, if it isn't just skip because at least one
        // has failed
        if (hasPaths) {
            // set the current value as the object by default
            var currentValue_1 = obj;
            // for each part in the dot notation path
            dotNotation.from(path).forEach(function (key) {
                // if the value at the current path part in the current value
                // is an object and isn't empty set the current value as that object
                if (is(currentValue_1) && !empty(currentValue_1)) {
                    currentValue_1 = currentValue_1[key];
                }
                else {
                    // if it isn't an object or is empty just set the current value as
                    // undefined
                    currentValue_1 = undefined;
                }
            });
            // if the resulting value is undefined
            if (currentValue_1 === undefined) {
                // set has paths to false because at least 1 path has failed
                hasPaths = false;
            }
        }
    });
    // return the resulting boolean
    return hasPaths;
}

// o
/**
 * Get the value from the path in the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * get(a, 'b.c'); // => 2
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function get(obj, path, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof path !== 'string')
        throw new TypeError("Expected String, got " + typeof path + " " + path);
    // if the object is empty or it doesn't have the path return the default value
    if (empty(obj) || !has(obj, path))
        return defaultValue;
    // set the current value to the object so its easier to iterate over the objects
    var currentValue = obj;
    // for each path part set the current value as the next value in the path
    dotNotation.from(path).forEach(function (key) {
        currentValue = currentValue[key];
    });
    // return the value at the path
    return currentValue;
}

// o
// default options
var getDefaults$6 = defaults({
    follow: false
});
/**
 * Get the keys of the specified object (different to Object.keys
 * because Object.keys can't follow deep objects)
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2, d: { e: 3 } } };
 *
 * keys(a); // => [ 'a', 'b' ]
 * keys(a, true); // => [ 'a', 'b.c', 'b.d.e' ]
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function keys(obj, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$6(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // clone the object so we can deflate it if we need to
    var cloned = clone(obj);
    // if follow is true
    if (follow) {
        // set the cloned object as the object but deflated
        cloned = deflate(cloned);
    }
    // use the native Object.keys function so its fast and return the result
    return Object.keys(cloned);
}

// o
// default options
var getDefaults$7 = defaults({
    follow: false
});
/**
 * Check if an object includes the specified value
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * includes(a, 1); // => true
 * includes(b, 2); // => false
 * includes(b, 2, {
 *   follow: true,
 * }); // => true
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function includes(obj, value, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$7(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // create the result variable which is defaulted to false
    var result = false;
    // for each over the object using the each function which makes it easier
    // for us to loop since we can just pass our own callback to evaluate the
    // the return value and we can pass follow directly to each and it will
    // handle the deep looping for us
    each(obj, function (key, objValue) {
        // if the result is still false
        if (!result) {
            // if the two values equal set the result as true
            if (objValue === value)
                result = true;
        }
    }, {
        follow: follow
    });
    // return the result
    return result;
}

// o
// default options
var getDefaults$8 = defaults({
    follow: false
});
/**
 * Get the key to the specified value in dot notation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * keyOf(a, 2); // => undefined
 * keyOf(a, 2, {
 *   follow: true,
 * }); // => 'b.c'
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function keyOf(obj, value, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$8(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // this is just an alias of find so we simply just pass the params
    // to the find function and return its result
    return find(obj, function (key, objValue) { return objValue === value; }, {
        follow: follow
    });
}

// o
// default options
var getDefaults$9 = defaults({
    follow: false
});
/**
 * Loop over the object and return a new object with the values
 * computed using the callback
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * map(a, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: 4, c: 6 }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: NaN }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }, {
 *   follow: true,
 * }); // => { a: 2, b: { c: 4 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function map(obj, cb, options) {
    if (options === void 0) { options = {}; }
    var follow = getDefaults$9(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof cb !== 'function')
        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // create a result object so we can add the new values to it
    var result = {};
    // for each over the object using the each function which makes it easier
    // for us to loop since we can just pass our own callback to evaluate the
    // the return value and we can pass follow directly to each and it will
    // handle the deep looping for us
    each(obj, function (key, value, index) {
        // set the result as the result object with the new key appended
        // with the value of the evaluated callback
        result = set(result, key, cb(key, value, index));
    }, {
        follow: follow
    });
    // return the result
    return result;
}

// o
/**
 * Get the size of the specified object.
 *
 * @example
 * ```
 * const a = { a: 1, b: 2 };
 *
 * size(a); // => 2
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function size(obj) {
    // check if the arg specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // get the object keys and return the length
    return Object.keys(obj).length;
}

// o
// default options
var getDefaults$a = defaults({
    follow: false
});
/**
 * Get a portion of the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4 };
 *
 * slice(a, 0, 1); // => { a: 1 }
 * slice(a, 1, 3); // => { b: 2, c: 3 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function slice(obj, start, end, options) {
    if (end === void 0) { end = Object.keys(obj).length; }
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$a(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof start !== 'number')
        throw new TypeError("Expected Number, got " + typeof start + " " + start);
    if (typeof end !== 'number')
        throw new TypeError("Expected Number, got " + typeof end + " " + end);
    // create an empty object for the result
    var result = {};
    // get the keys of the object and pass follow so the keys function
    // can handle the deep looping for us
    var objKeys = keys(obj, {
        follow: follow
    });
    // run the native slice function on the keys so its fast
    objKeys.slice(start, end)
        .forEach(function (key) {
        // for each of the keys after sliced
        // get the value from the original object
        var value = get(obj, key);
        // set the value on the result object to the current key
        result = set(result, key, value);
    });
    // return the result
    return result;
}

// o
// default options
var getDefaults$b = defaults({
    follow: false
});
/**
 * Check if some items in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }); // => true
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }, {
 *   follow: true,
 * }); // => true
 *
 * some(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => false
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function some(obj, cb, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$b(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof cb !== 'function')
        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // set result to false so we can change it to true if
    // any of the callbacks evaluate to true
    var result = false;
    // for each over the object using the each function which makes it easier
    // for us to loop since we can just pass our own callback to evaluate the
    // the return value and we can pass follow directly to each and it will
    // handle the deep looping for us
    each(obj, function (key, value, index) {
        // if the callback evaluates to true
        if (cb(key, value, index)) {
            // set the result as true
            result = true;
        }
    }, {
        follow: follow
    });
    // return the result
    return result;
}

// o
// default options
var getDefaults$c = defaults({
    follow: false
});
/**
 * Sort an object via the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 3, b: 7, c: 5, d: 9 };
 * const b = { a: 3, b: 7, c: 5, d: { e: 1 }, f: 9 };
 *
 * sort(a, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }); // => { a: 3, c: 5, b: 7, d: 9 }
 *
 * sort(b, (a, b) => {
 *  if (a.value < b.value) return -1;
 *  if (a.value > b.value) return 1;
 *  return 0;
 * }, {
 *   follow: true,
 * }); // => { d: { e: 1 }, a: 3, c: 5, b: 7, f: 9 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function sort(obj, cb, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$c(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    if (typeof cb !== 'function')
        throw new TypeError("Expected Function, got " + typeof cb + " " + cb);
    if (typeof follow !== 'boolean')
        throw new TypeError("Expected Boolean, got " + typeof follow + " " + follow);
    // create a new object so we can add the key/values on in the
    // correct order
    var result = {};
    // get the keys from the object and pass follow to the keys function
    // then we don't need to handle deep objects
    var sortedKeys = keys(obj, {
        follow: follow
    })
        .sort(function (firstKey, secondKey) {
        // get the value from the object for the corresponding key
        var firstValue = get(obj, firstKey);
        var secondValue = get(obj, secondKey);
        // create the element objects
        var firstEl = {
            key: firstKey,
            value: firstValue
        };
        var secondEl = {
            key: secondKey,
            value: secondValue
        };
        // return the result from the callback using the elements
        return cb(firstEl, secondEl);
    });
    // for each through the sorted keys
    sortedKeys.forEach(function (key) {
        // set the the value on the result object to the corresponding key
        result = set(result, key, get(obj, key));
    });
    // return the result
    return result;
}

// o
// default options
var getDefaults$d = defaults({
    follow: false
});
/**
 * Get an array of the object values
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4, e: 5 };
 * const b = { a: 1, b: { c: 2, d: 3 } };
 *
 * values(a); // => [ 1, 2, 3, 4, 5 ]
 * values(b, {
 *   follow: true,
 * }); // => [ 1, 2, 3 ]
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function values(obj, options) {
    if (options === void 0) { options = {}; }
    // extract options
    var follow = getDefaults$d(options).follow;
    // check if the args specified are the correct type
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // get the object keys and pass follow so it handles the deep object
    // for us and then map the keys array and return the corresponding value
    // for the current key
    return keys(obj, {
        follow: follow
    })
        .map(function (key) { return get(obj, key); });
}

var OChainable = /** @class */ (function () {
    /**
     * Create a new OChainable
     *
     * @param {OObject} obj
     *
     * @throws TypeError
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    function OChainable(obj) {
        // the number of times the object has been updated
        this.modificationCount = 0;
        // check if the args specified are the correct type
        if (!valid(obj))
            throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
        this.originalObject = clone(obj);
        this.currentObject = clone(obj);
    }
    /**
     * Set the current object value
     *
     * @param {OObject} obj The new object
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.updateCurrent = function (obj) {
        this.modificationCount = this.modificationCount + 1;
        this.currentObject = obj;
    };
    /**
     * Get the original object
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.original = function () {
        return this.originalObject;
    };
    /**
     * Get the current object as a JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.toJSON = function () {
        return JSON.stringify(this.currentObject);
    };
    /**
     * Get the current object as a pretty JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.toPrettyJSON = function () {
        return JSON.stringify(this.currentObject, null, 2);
    };
    /**
     * Get the original object as a JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.originalToJSON = function () {
        return JSON.stringify(this.originalObject);
    };
    /**
     * Get the original object as a pretty JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.originalToPrettyJSON = function () {
        return JSON.stringify(this.originalObject, null, 2);
    };
    /**
     * A clone of the current object
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.object = function () {
        return clone(this.currentObject);
    };
    /**
     * A reference of the current object
     * (will change if you continue to modify)
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.objectRef = function () {
        return this.currentObject;
    };
    /**
     * Check if the object has been modified
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.isModified = function () {
        return this.modificationCount > 0;
    };
    /**
     * Check if the object has been modified
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    OChainable.prototype.totalModifications = function () {
        return this.modificationCount;
    };
    // rest of the methods are just the standard
    // functions from the library
    /**
     * Clean the object
     *
     * @see https://o.hammy2899.dev/modules/_clean_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.clean = function (options) {
        if (options === void 0) { options = {}; }
        this.updateCurrent(clean(this.currentObject, options));
        return this;
    };
    /**
     * Clone the object
     *
     * @see https://o.hammy2899.dev/modules/_clone_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.clone = function () {
        return clone(this.currentObject);
    };
    /**
     * Check if the object is deeply equal to the specified objects
     *
     * @see https://o.hammy2899.dev/modules/_deepequal_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.deepEqual = function () {
        var compareWith = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            compareWith[_i] = arguments[_i];
        }
        return deepEqual
            .apply(null, __spreadArrays([this.currentObject], compareWith));
    };
    /**
     * Deflate the object
     *
     * @see https://o.hammy2899.dev/modules/_deflate_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.deflate = function () {
        this.updateCurrent(deflate(this.currentObject));
        return this;
    };
    /**
     * Delete a property from the object
     *
     * @see https://o.hammy2899.dev/modules/_del_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.del = function (path) {
        this.updateCurrent(del(this.currentObject, path));
        return this;
    };
    /**
     * Foreach over the objects keys and values
     *
     * @see https://o.hammy2899.dev/modules/_each_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.each = function (cb, options) {
        if (options === void 0) { options = {}; }
        each(this.currentObject, cb, options);
        return this;
    };
    /**
     * Check if the object is empty
     *
     * @see https://o.hammy2899.dev/modules/_empty_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.empty = function () {
        return empty(this.currentObject);
    };
    /**
     * Check if the object is equal to the specified objects
     *
     * @see https://o.hammy2899.dev/modules/_equal_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.equal = function () {
        var compareWith = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            compareWith[_i] = arguments[_i];
        }
        return equal
            .apply(null, __spreadArrays([this.currentObject], compareWith));
    };
    /**
     * Loop over all object keys and values and check if all
     * evaluations are truthy
     *
     * @see https://o.hammy2899.dev/modules/_every_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.every = function (cb, options) {
        if (options === void 0) { options = {}; }
        return every(this.currentObject, cb, options);
    };
    /**
     * Filter the objects keys and values depending on the
     * callback evaluation
     *
     * @see https://o.hammy2899.dev/modules/_filter_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.filter = function (cb, options) {
        if (options === void 0) { options = {}; }
        this.updateCurrent(filter(this.currentObject, cb, options));
        return this;
    };
    /**
     * Find the key matching the callback evaluation
     *
     * @see https://o.hammy2899.dev/modules/_find_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.find = function (cb, options) {
        if (options === void 0) { options = {}; }
        return find(this.currentObject, cb, options);
    };
    /**
     * Flip the objects keys for values and values for keys
     *
     * @see https://o.hammy2899.dev/modules/_flip_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.flip = function (options) {
        if (options === void 0) { options = {}; }
        this.updateCurrent(flip(this.currentObject, options));
        return this;
    };
    /**
     * Get the value from the path in the object
     *
     * @see https://o.hammy2899.dev/modules/_get_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.get = function (path, defaultValue) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        return get(this.currentObject, path, defaultValue);
    };
    /**
     * Check if the object has a value at the paths
     *
     * @see https://o.hammy2899.dev/modules/_has_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.has = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return has
            .apply(null, __spreadArrays([this.currentObject], paths));
    };
    /**
     * Check if the object includes a value
     *
     * @see https://o.hammy2899.dev/modules/_includes_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.includes = function (value, options) {
        if (options === void 0) { options = {}; }
        return includes(this.currentObject, value, options);
    };
    /**
     * Inflate the object
     *
     * @see https://o.hammy2899.dev/modules/_inflate_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.inflate = function () {
        this.updateCurrent(inflate(this.currentObject));
        return this;
    };
    /**
     * Get the key to the specified value
     *
     * @see https://o.hammy2899.dev/modules/_keyof_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.keyOf = function (value, options) {
        if (options === void 0) { options = {}; }
        return keyOf(this.currentObject, value, options);
    };
    /**
     * Check if the object has a value at the paths
     *
     * @see https://o.hammy2899.dev/modules/_keys_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.keys = function (options) {
        if (options === void 0) { options = {}; }
        return keys(this.currentObject, options);
    };
    /**
     * Loop over the object and compute new values using the callback
     *
     * @see https://o.hammy2899.dev/modules/_map_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.map = function (cb, options) {
        if (options === void 0) { options = {}; }
        this.updateCurrent(map(this.currentObject, cb, options));
        return this;
    };
    /**
     * Merge all sources into the object
     *
     * @see https://o.hammy2899.dev/modules/_merge_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.merge = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        this.updateCurrent(merge
            .apply(null, __spreadArrays([this.currentObject], sources)));
        return this;
    };
    /**
     * Set the value to the path on the object
     *
     * @see https://o.hammy2899.dev/modules/_set_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.set = function (path, value) {
        this.updateCurrent(set(this.currentObject, path, value));
        return this;
    };
    /**
     * Merge sources with the object
     *
     * @see https://o.hammy2899.dev/modules/_shallowmerge_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.shallowMerge = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        this.updateCurrent(shallowMerge
            .apply(null, __spreadArrays([this.currentObject], sources)));
        return this;
    };
    /**
     * Get the size of the object
     *
     * @see https://o.hammy2899.dev/modules/_size_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.size = function () {
        return size(this.currentObject);
    };
    /**
     * Get a portion of the object
     *
     * @see https://o.hammy2899.dev/modules/_slice_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.slice = function (start, end, options) {
        if (end === void 0) { end = size(this.currentObject); }
        if (options === void 0) { options = {}; }
        return slice(this.currentObject, start, end, options);
    };
    /**
     * Check if some items in the object evaluates to truthy
     *
     * @see https://o.hammy2899.dev/modules/_some_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.some = function (cb, options) {
        if (options === void 0) { options = {}; }
        return some(this.currentObject, cb, options);
    };
    /**
     * Sort the object with the callback evaluation
     *
     * @see https://o.hammy2899.dev/modules/_sort_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.sort = function (cb, options) {
        if (options === void 0) { options = {}; }
        this.updateCurrent(sort(this.currentObject, cb, options));
        return this;
    };
    /**
     * Get the values from the object
     *
     * @see https://o.hammy2899.dev/modules/_values_.html
     */
    /* istanbul ignore next */
    OChainable.prototype.values = function (options) {
        if (options === void 0) { options = {}; }
        return values(this.currentObject, options);
    };
    return OChainable;
}());

// o
/**
 * Create a new OChainable instance
 *
 * @example
 * ```
 * const a = { a: 1 }
 * const obj = chainer(a)
 *
 * obj
 *  .set('a', 2)
 *  .merge({ b: 3 })
 *  .toJSON()
 * ```
 *
 * @throws TypeError
 *
 * @since 2.2.1
 * @version 2.2.1
 */
function chainer(obj) {
    // check if the object specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    return new OChainable(obj);
}

/**
 * Same as `defaults` however the function returned will do a
 * shallow merge instead of a deep merge.
 *
 * @example
 * ```
 * const getDefaults = shallowDefaults({ a: 1, b: { c: 2, d: 3 } })
 *
 * getDefaults({ a: 2, b: { c: 3 } }) // => { a: 2, b: { c: 3 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.3.0
 * @version 2.3.0
 */
function shallowDefaults(obj) {
    // check if the object specified is an object
    if (!valid(obj))
        throw new TypeError("Expected Object, got " + typeof obj + " " + obj);
    // cloned
    var cloned = clone(obj);
    // create the defaults user function
    var result = function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        return shallowMerge.apply(void 0, __spreadArrays([cloned], objects));
    };
    // add property of the default object
    result.defaultObject = cloned;
    // return the result
    return result;
}

// ------------------------------ //
var index = {
    chainer: chainer,
    clean: clean,
    clone: clone,
    deepEqual: deepEqual,
    defaults: defaults,
    deflate: deflate,
    del: del,
    each: each,
    empty: empty,
    equal: equal,
    every: every,
    filter: filter,
    find: find,
    flip: flip,
    get: get,
    has: has,
    includes: includes,
    inflate: inflate,
    is: is,
    keyOf: keyOf,
    keys: keys,
    map: map,
    merge: merge,
    OChainable: OChainable,
    set: set,
    shallowDefaults: shallowDefaults,
    shallowMerge: shallowMerge,
    size: size,
    slice: slice,
    some: some,
    sort: sort,
    values: values
};

export default index;
export { OChainable, chainer, clean, clone, deepEqual, defaults, deflate, del, each, empty, equal, every, filter, find, flip, get, has, includes, inflate, is, keyOf, keys, map, merge, set, shallowDefaults, shallowMerge, size, slice, some, sort, values };
//# sourceMappingURL=o.mjs.map
