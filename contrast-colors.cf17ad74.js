// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"contrast-colors.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
function createScale() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$swatches = _ref.swatches,
      swatches = _ref$swatches === void 0 ? 8 : _ref$swatches,
      _ref$colorKeys = _ref.colorKeys,
      colorKeys = _ref$colorKeys === void 0 ? ['#CCFFA9', '#FEFEC5', '#5F0198'] : _ref$colorKeys,
      _ref$colorspace = _ref.colorspace,
      colorspace = _ref$colorspace === void 0 ? 'LAB' : _ref$colorspace,
      _ref$shift = _ref.shift,
      shift = _ref$shift === void 0 ? 1 : _ref$shift,
      _ref$fullScale = _ref.fullScale,
      fullScale = _ref$fullScale === void 0 ? true : _ref$fullScale;

  var Domains = [];

  for (i = 0; i < colorKeys.length; i++) {
    Domains.push(swatches - swatches * (d3.hsluv(colorKeys[i]).v / 100));
  }

  Domains.sort(function (a, b) {
    return a - b;
  });
  var domains = [];
  domains = domains.concat(0, Domains, swatches); // Test logarithmic domain (for non-contrast-based scales)

  var sqrtDomains = d3.scalePow().exponent(shift).domain([1, swatches]).range([1, swatches]);
  sqrtDomains = domains.map(function (d) {
    if (sqrtDomains(d) < 0) {
      return 0;
    } else {
      return sqrtDomains(d);
    }
  }); // Transform square root in order to smooth gradient

  domains = sqrtDomains;

  function cArray(c) {
    var L = d3.hsluv(c).l;
    var U = d3.hsluv(c).u;
    var V = d3.hsluv(c).v;
    return new Array(L, U, V);
  }

  var sortedColor = colorKeys.map(function (c, i) {
    // Convert to HSLuv and keep track of original indices
    return {
      colorKeys: cArray(c),
      index: i
    };
  }).sort(function (c1, c2) {
    // Sort by lightness
    return c2.colorKeys[2] - c1.colorKeys[2];
  }).map(function (data) {
    // Retrieve original RGB color
    return colorKeys[data.index];
  });
  var inverseSortedColor = colorKeys.map(function (c, i) {
    // Convert to HSLuv and keep track of original indices
    return {
      colorKeys: cArray(c),
      index: i
    };
  }).sort(function (c1, c2) {
    // Sort by lightness
    return c1.colorKeys[2] - c2.colorKeys[2];
  }).map(function (data) {
    // Retrieve original RGB color
    return colorKeys[data.index];
  });
  ColorsArray = [];

  if (colorspace == 'CAM02') {
    if (fullScale == true) {
      ColorsArray = ColorsArray.concat('#ffffff', sortedColor, '#000000');
    } else {
      ColorsArray = ColorsArray.concat(sortedColor);
    }

    ColorsArray = ColorsArray.map(function (d) {
      return d3.jab(d);
    });
    scale = d3.scaleLinear().range(ColorsArray).domain(domains).interpolate(d3.interpolateJab);
  }

  if (colorspace == 'LCH') {
    ColorsArray = ColorsArray.map(function (d) {
      return d3.hcl(d);
    });

    if (fullScale == true) {
      ColorsArray = ColorsArray.concat(d3.hcl(NaN, 0, 100), sortedColor, d3.hcl(NaN, 0, 0));
    } else {
      ColorsArray = ColorsArray.concat(sortedColor);
    }

    scale = d3.scaleLinear().range(ColorsArray).domain(domains).interpolate(d3.interpolateHcl);
  }

  if (colorspace == 'LAB') {
    if (fullScale == true) {
      ColorsArray = ColorsArray.concat('#ffffff', sortedColor, '#000000');
    } else {
      ColorsArray = ColorsArray.concat(sortedColor);
    }

    ColorsArray = ColorsArray.map(function (d) {
      return d3.lab(d);
    });
    scale = d3.scaleLinear().range(ColorsArray).domain(domains).interpolate(d3.interpolateLab);
  }

  if (colorspace == 'HSL') {
    if (fullScale == true) {
      ColorsArray = ColorsArray.concat('#ffffff', sortedColor, '#000000');
    } else {
      ColorsArray = ColorsArray.concat(sortedColor);
    }

    ColorsArray = ColorsArray.map(function (d) {
      return d3.hsl(d);
    });
    scale = d3.scaleLinear().range(ColorsArray).domain(domains).interpolate(d3.interpolateHsl);
  }

  if (colorspace == 'HSLuv') {
    ColorsArray = ColorsArray.map(function (d) {
      return d3.hsluv(d);
    });

    if (fullScale == true) {
      ColorsArray = ColorsArray.concat(d3.hsluv(NaN, NaN, 100), sortedColor, d3.hsluv(NaN, NaN, 0));
    } else {
      ColorsArray = ColorsArray.concat(sortedColor);
    }

    scale = d3.scaleLinear().range(ColorsArray).domain(domains).interpolate(d3.interpolateHsluv);
  }

  if (colorspace == 'RGB') {
    if (fullScale == true) {
      ColorsArray = ColorsArray.concat('#ffffff', sortedColor, '#000000');
    } else {
      ColorsArray = ColorsArray.concat(sortedColor);
    }

    ColorsArray = ColorsArray.map(function (d) {
      return d3.rgb(d);
    });
    scale = d3.scaleLinear().range(ColorsArray).domain(domains).interpolate(d3.interpolateRgb);
  }

  if (colorspace == 'HSV') {
    if (fullScale == true) {
      ColorsArray = ColorsArray.concat('#ffffff', sortedColor, '#000000');
    } else {
      ColorsArray = ColorsArray.concat(sortedColor);
    }

    ColorsArray = ColorsArray.map(function (d) {
      return d3.hsv(d);
    });
    scale = d3.scaleLinear().range(ColorsArray).domain(domains).interpolate(d3.interpolateHsv);
  }

  var Colors = d3.range(swatches).map(function (d) {
    return scale(d);
  });
  colors = Colors.filter(function (el) {
    return el != null;
  }); // Return colors as hex values for interpolators.

  colorsHex = [];

  for (i = 0; i < colors.length; i++) {
    colorsHex.push(d3.rgb(colors[i]).formatHex());
  }

  return {
    colorKeys: colorKeys,
    colorspace: colorspace,
    shift: shift,
    colors: colors
  };
} // Test script
// createScale({swatches: 8, colorKeys: ['#CCFFA9', '#FEFEC5', '#5F0198'], colorspace: 'LAB', shift: 1, fullScale: true});


function generateContrastColors() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      colorKeys = _ref2.colorKeys,
      base = _ref2.base,
      ratios = _ref2.ratios,
      _ref2$colorspace = _ref2.colorspace,
      colorspace = _ref2$colorspace === void 0 ? 'LAB' : _ref2$colorspace,
      _ref2$shift = _ref2.shift,
      shift = _ref2$shift === void 0 ? 1 : _ref2$shift;

  swatches = 3000;
  createScale({
    swatches: swatches,
    colorKeys: colorKeys,
    colorspace: colorspace,
    shift: shift
  });
  var Contrasts = d3.range(swatches).map(function (d) {
    var rgbArray = [d3.rgb(scale(d)).r, d3.rgb(scale(d)).g, d3.rgb(scale(d)).b];
    var baseRgbArray = [d3.rgb(base).r, d3.rgb(base).g, d3.rgb(base).b];
    var ca = contrast(rgbArray, baseRgbArray).toFixed(2);
    return Number(ca);
  });
  contrasts = Contrasts.filter(function (el) {
    return el != null;
  });
  var baseLum = luminance(d3.rgb(base).r, d3.rgb(base).g, d3.rgb(base).b);
  newColors = [];
  ratios = ratios.map(Number); // Return color matching target ratio, or closest number

  for (i = 0; i < ratios.length; i++) {
    var r = binarySearch(contrasts, ratios[i], baseLum);
    newColors.push(d3.rgb(colors[r]).hex());
  }

  return newColors;
} // Test scripts:
// generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'RGB'});
// generateContrastColors({colorKeys: ["#0000ff"], base: "#323232",ratios: [-1.25,4.5], colorspace: "LCH"});
// Error Tests:
// generateContrastColors({base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'RGB'}) // no colors
// generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', colorspace: 'RGB'}) // no ratios
// TODO: see if there's a luminance package?
// Separate files in a lib folder as well.


function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
} // function percievedLum(r, g, b) {
//   return (0.299*r + 0.587*g + 0.114*b);
// }
// Separate files in a lib folder as well.


function contrast(color, base) {
  var colorLum = luminance(color[0], color[1], color[2]);
  var baseLum = luminance(base[0], base[1], base[2]);
  var cr1 = (colorLum + 0.05) / (baseLum + 0.05);
  var cr2 = (baseLum + 0.05) / (colorLum + 0.05);

  if (baseLum < 0.5) {
    if (cr1 >= 1) {
      return cr1;
    } else {
      return cr2 * -1;
    } // Return as whole negative number

  } else {
    if (cr1 < 1) {
      return cr2;
    } else {
      return cr1 * -1;
    } // Return as whole negative number

  }
} // test scripts:
// contrast([255, 255, 255], [207, 207, 207]); // white is UI color, gray is base. Should return negative whole number
// TODO: Find binary search package to use instead of this. -> use its own file
// Binary search to find index of contrast ratio that is input
// Modified from https://medium.com/hackernoon/programming-with-js-binary-search-aaf86cef9cb3


function binarySearch(list, value, baseLum) {
  // initial values for start, middle and end
  var start = 0;
  var stop = list.length - 1;
  var middle = Math.floor((start + stop) / 2);
  var minContrast = Math.min.apply(Math, _toConsumableArray(list));
  var maxContrast = Math.max.apply(Math, _toConsumableArray(list)); // While the middle is not what we're looking for and the list does not have a single item

  while (list[middle] !== value && start < stop) {
    // Value greater than since array is ordered descending
    if (baseLum > 0.5) {
      // if base is light, ratios ordered ascending
      if (value < list[middle]) {
        stop = middle - 1;
      } else {
        start = middle + 1;
      }
    } else {
      // order descending
      if (value > list[middle]) {
        stop = middle - 1;
      } else {
        start = middle + 1;
      }
    } // recalculate middle on every iteration


    middle = Math.floor((start + stop) / 2);
  } // If no match, find closest item greater than value


  closest = list.reduce(function (prev, curr) {
    return curr > value ? curr : prev;
  }); // if the current middle item is what we're looking for return it's index, else closest

  return list[middle] == !value ? closest : middle; // how it was originally expressed
} // TEST
// args = createScale({swatches: 8, colorKeys: ['#CCFFA9', '#FEFEC5', '#5F0198'], colorspace: 'LAB', shift: 1, fullScale: true});
// generateContrastColors({args, base: '#ffffff', ratios: [3, 4.5, 7]});
},{}],"../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61274" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","contrast-colors.js"], null)
//# sourceMappingURL=/contrast-colors.cf17ad74.js.map