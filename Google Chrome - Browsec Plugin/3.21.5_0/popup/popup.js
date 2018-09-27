(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// Production steps of ECMA-262, Edition 6, 22.1.2.1

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}

},{}],2:[function(require,module,exports){
'use strict';

// https://tc39.github.io/ecma262/#sec-array.prototype.find

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', { // eslint-disable-line no-extend-native
    'value': function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

},{}],3:[function(require,module,exports){
'use strict';

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', { // eslint-disable-line
    'value': function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}

},{}],4:[function(require,module,exports){
'use strict';

// https://tc39.github.io/ecma262/#sec-array.prototype.includes

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', { // eslint-disable-line no-extend-native
    'value': function value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) return false;

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

},{}],5:[function(require,module,exports){
'use strict';

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) return;

    Object.defineProperty(item, 'append', {
      'configurable': true,
      'enumerable': true,
      'writable': true,
      'value': function append() {
        var docFrag = document.createDocumentFragment();

        for (var _len = arguments.length, argArr = Array(_len), _key = 0; _key < _len; _key++) {
          argArr[_key] = arguments[_key];
        }

        argArr.forEach(function (argItem) {
          docFrag.appendChild(argItem instanceof Node ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

},{}],6:[function(require,module,exports){
"use strict";

Element.prototype.matches = Element.prototype.matches || Element.prototype.webkitMatchesSelector;

},{}],7:[function(require,module,exports){
'use strict';

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) return;

    Object.defineProperty(item, 'prepend', {
      'configurable': true,
      'enumerable': true,
      'writable': true,
      'value': function prepend() {
        var docFrag = document.createDocumentFragment();

        for (var _len = arguments.length, argArr = Array(_len), _key = 0; _key < _len; _key++) {
          argArr[_key] = arguments[_key];
        }

        argArr.forEach(function (argItem) {
          docFrag.appendChild(argItem instanceof Node ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

},{}],8:[function(require,module,exports){
'use strict';

// From https://github.com/cvan/keyboardevent-key-polyfill

(function () {
  var isEdgeOrIE = navigator.userAgent.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || navigator.userAgent.indexOf('Edge/') > 0;
  var condition = !('KeyboardEvent' in window) || 'key' in KeyboardEvent.prototype && !isEdgeOrIE;
  if (condition) return;

  var keys = {
    '3': 'Cancel',
    '6': 'Help',
    '8': 'Backspace',
    '9': 'Tab',
    '12': 'Clear',
    '13': 'Enter',
    '16': 'Shift',
    '17': 'Control',
    '18': 'Alt',
    '19': 'Pause',
    '20': 'CapsLock',
    '27': 'Escape',
    '28': 'Convert',
    '29': 'NonConvert',
    '30': 'Accept',
    '31': 'ModeChange',
    '32': ' ',
    '33': 'PageUp',
    '34': 'PageDown',
    '35': 'End',
    '36': 'Home',
    '37': 'ArrowLeft',
    '38': 'ArrowUp',
    '39': 'ArrowRight',
    '40': 'ArrowDown',
    '41': 'Select',
    '42': 'Print',
    '43': 'Execute',
    '44': 'PrintScreen',
    '45': 'Insert',
    '46': 'Delete',
    '48': ['0', ')'],
    '49': ['1', '!'],
    '50': ['2', '@'],
    '51': ['3', '#'],
    '52': ['4', '$'],
    '53': ['5', '%'],
    '54': ['6', '^'],
    '55': ['7', '&'],
    '56': ['8', '*'],
    '57': ['9', '('],
    '91': 'OS',
    '93': 'ContextMenu',
    '106': '*',
    '107': '+',
    '109': '-',
    '110': '.',
    '111': '/',
    '144': 'NumLock',
    '145': 'ScrollLock',
    '181': 'VolumeMute',
    '182': 'VolumeDown',
    '183': 'VolumeUp',
    '186': [';', ':'],
    '187': ['=', '+'],
    '188': [',', '<'],
    '189': ['-', '_'],
    '190': ['.', '>'],
    '191': ['/', '?'],
    '192': ['`', '~'],
    '219': ['[', '{'],
    '220': ['\\', '|'],
    '221': [']', '}'],
    '222': ["'", '"'],
    '224': 'Meta',
    '225': 'AltGraph',
    '246': 'Attn',
    '247': 'CrSel',
    '248': 'ExSel',
    '249': 'EraseEof',
    '250': 'Play',
    '251': 'ZoomOut'
  };

  // Function keys (F1-24).
  var i;
  for (i = 1; i < 25; i++) {
    keys[111 + i] = 'F' + i;
  }

  // Printable ASCII characters.
  for (i = 65; i < 91; i++) {
    var letter = String.fromCharCode(i);
    keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
  }

  // Numbers on numeric keyboard.
  for (i = 96; i < 106; i++) {
    var _letter = String.fromCharCode(i - 48);
    keys[i] = _letter;
  }

  // Polyfill `key` on `KeyboardEvent`.
  var proto = {
    'get': function get(x) {
      var key = keys[this.which || this.keyCode];

      if (Array.isArray(key)) {
        key = key[+this.shiftKey];
      }

      return key;
    },
    'enumerable': true,
    'configurable': true
  };
  Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
})();

},{}],9:[function(require,module,exports){
'use strict';

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    'value': function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    'writable': true,
    'configurable': true
  });
}

},{}],10:[function(require,module,exports){
"use strict";

(function () {
  if (window.Promise.prototype.finally) return;

  /**
  @method
  @param {Function}
  @return {Promise} initial */
  window.Promise.prototype.finally = function (onFinally) {
    // eslint-disable-line no-extend-native
    this.then(onFinally, onFinally);

    return this;
  };
})();

},{}],11:[function(require,module,exports){
"use strict";

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, this_len) {
    // eslint-disable-line no-extend-native
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}

},{}],12:[function(require,module,exports){
'use strict';

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    // eslint-disable-line
    'use strict';

    if (typeof start !== 'number') start = 0;

    if (start + search.length > this.length) return false;

    return this.indexOf(search, start) !== -1;
  };
}

},{}],13:[function(require,module,exports){
'use strict';

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd

if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    // eslint-disable-line
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return String(this) + padString.slice(0, targetLength);
    }
  };
}

},{}],14:[function(require,module,exports){
'use strict';

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    // eslint-disable-line
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

},{}],15:[function(require,module,exports){
"use strict";

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (search, pos) {
    // eslint-disable-line
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}

},{}],16:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}(
// In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this ? this : typeof self !== 'undefined' ? self : undefined;
}() || Function("return this")());

},{}],17:[function(require,module,exports){
'use strict';

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

require('polyfills/Array.from');

require('polyfills/Array.prototype.find');

require('polyfills/Array.prototype.findIndex');

require('polyfills/Array.prototype.includes');

require('polyfills/Element.append');

require('polyfills/Element.matches');

require('polyfills/Element.prepend');

require('polyfills/KeyboardEvent.key');

require('polyfills/Object.assign');

require('polyfills/Promise.prototype.finally');

require('polyfills/regeneratorRuntime');

require('polyfills/String.prototype.endsWith');

require('polyfills/String.prototype.includes');

require('polyfills/String.prototype.padEnd');

require('polyfills/String.prototype.padStart');

require('polyfills/String.prototype.startsWith');

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}
// Polyfills


var _browser = typeof window.browser !== 'undefined' ? window.browser : window.chrome;

var backgroundPage = _browser.extension.getBackgroundPage();

(function () {
  if (!backgroundPage) {
    // Firefox private mode
    // Polymer ready
    window.addEventListener('WebComponentsReady', function () {
      var parent = document.querySelector('div.MainContainer');
      if (!parent) return;

      parent.appendChild(document.createElement('main-head'));
      parent.appendChild(document.createElement('popup-private-mode'));
    });
    return;
  }

  // Normal case
  var _ = backgroundPage._,
      account = backgroundPage.account,
      Browser = backgroundPage.Browser,
      Counters = backgroundPage.Counters,
      DelayRecord = backgroundPage.DelayRecord,
      ga = backgroundPage.ga,
      proxy = backgroundPage.proxy,
      ShowedOffers = backgroundPage['showedOffers'],
      storage = backgroundPage.storage,
      store = backgroundPage.store,
      windowErrorHandler = backgroundPage.windowErrorHandler;

  var pageLoadTimer = new DelayRecord('Popup: page load');

  window._ = _;
  window.onerror = windowErrorHandler;

  /** Show speed banner
  @type {Boolean} */
  window.showSpeedPromo = function () {
    var _store$getState$pac = store.getState().pac,
        filters = _store$getState$pac.filters,
        mode = _store$getState$pac.mode;

    return mode === 'proxy' || filters.some(function (_ref) {
      var disabled = _ref.disabled,
          proxyMode = _ref.proxyMode;
      return !disabled && proxyMode;
    });
  }();

  if (store.getState().page !== 'index:home') {
    store.dispatch({ 'type': 'Page change', 'page': 'index:home' }); // NOTE critical
  }

  Counters.increase('icon clicks');

  account.load(); // On each popup open every 5 minutes load account to check


  // First popup open
  if (storage.getItem('firstPopupOpen') === 'installed') {
    ga({ 'category': 'extension', 'action': 'first_popup_open' });
    storage.setItem('firstPopupOpen', 'fulfilled');
  }

  var congratsTabId = storage.getItem('congrats_tab_id');

  // Is congratulation tab open?
  var tabOpenPromise = Promise.resolve(false);
  if (congratsTabId) {
    tabOpenPromise = Browser.tabs.query().then(function (tabs) {
      return tabs.some(function (_ref2) {
        var id = _ref2.id;
        return id === congratsTabId;
      });
    });
  }

  /** If user has no trial premium token -> show new apps page */
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var condition, tabOpen;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            condition = !ShowedOffers.includes('apps page') && storage.getItem('installBrowsecOnMobile') === 'ready';

            if (condition) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:
            _context.next = 5;
            return tabOpenPromise;

          case 5:
            tabOpen = _context.sent;

            if (tabOpen) {
              Browser.tabs.update(congratsTabId, { 'url': '/offers/install_browsec_on_mobile.html' });
            } else {
              Browser.tabs.create('/offers/install_browsec_on_mobile.html'); // Active!
            }

            ShowedOffers.push('apps page');
            storage.removeItem('congrats_tab_id', 'installBrowsecOnMobile');

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))();

  var controlStateTimer = new DelayRecord('Popup: get control state');

  // Do we have control over proxy? If true -> we do
  var controlStatePromise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var controlState;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!proxy.getControlState || !store.getState().pac.broken)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', true);

          case 2:
            _context2.next = 4;
            return proxy.getControlState();

          case 4:
            controlState = _context2.sent;

            if (controlState) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', false);

          case 7:
            _context2.next = 9;
            return proxy.setState({ 'broken': false });

          case 9:
            return _context2.abrupt('return', true);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }))();
  controlStatePromise.then(function () {
    controlStateTimer.end();
  });

  var webComponentsTimer = new DelayRecord('Popup: web components');

  // when Polymer is ready
  var polymerReadyPromise = new Promise(function (resolve) {
    window.addEventListener('WebComponentsReady', resolve);
  });
  polymerReadyPromise.then(function () {
    webComponentsTimer.end();
  });

  Promise.all([controlStatePromise, polymerReadyPromise]).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
        controlState = _ref6[0];

    var parent = document.querySelector('div.MainContainer');
    if (!parent) return;

    var appendElementsTimer = new DelayRecord('Popup: append elements');
    var elements = ['main-head', 'page-switch'];
    if (!controlState) elements.push('popup-proxy-blocked');

    elements.forEach(function (element) {
      parent.appendChild(document.createElement(element));
    });
    appendElementsTimer.end();
    pageLoadTimer.end();
  });

  // PolymerRedux problems resolve
  window.addEventListener('unload', function () {
    if (!document.body) return; // Flow crap

    Array.from(document.body.children).forEach(function (element) {
      if (element.tagName.toLowerCase() === 'script') return;
      if (document.body) document.body.removeChild(element); // Flow crap
    });
  });
})();

},{"polyfills/Array.from":1,"polyfills/Array.prototype.find":2,"polyfills/Array.prototype.findIndex":3,"polyfills/Array.prototype.includes":4,"polyfills/Element.append":5,"polyfills/Element.matches":6,"polyfills/Element.prepend":7,"polyfills/KeyboardEvent.key":8,"polyfills/Object.assign":9,"polyfills/Promise.prototype.finally":10,"polyfills/String.prototype.endsWith":11,"polyfills/String.prototype.includes":12,"polyfills/String.prototype.padEnd":13,"polyfills/String.prototype.padStart":14,"polyfills/String.prototype.startsWith":15,"polyfills/regeneratorRuntime":16}]},{},[17]);
