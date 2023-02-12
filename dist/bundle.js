/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = options => {\n\toptions = Object.assign({\n\t\tonlyFirst: false\n\t}, options);\n\n\tconst pattern = [\n\t\t'[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)',\n\t\t'(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'\n\t].join('|');\n\n\treturn new RegExp(pattern, options.onlyFirst ? undefined : 'g');\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "./node_modules/colors/lib/colors.js":
/*!*******************************************!*\
  !*** ./node_modules/colors/lib/colors.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n\nThe MIT License (MIT)\n\nOriginal Library\n  - Copyright (c) Marak Squires\n\nAdditional functionality\n - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n\n*/\n\nvar colors = {};\nmodule['exports'] = colors;\n\ncolors.themes = {};\n\nvar util = __webpack_require__(/*! util */ \"util\");\nvar ansiStyles = colors.styles = __webpack_require__(/*! ./styles */ \"./node_modules/colors/lib/styles.js\");\nvar defineProps = Object.defineProperties;\nvar newLineRegex = new RegExp(/[\\r\\n]+/g);\n\ncolors.supportsColor = (__webpack_require__(/*! ./system/supports-colors */ \"./node_modules/colors/lib/system/supports-colors.js\").supportsColor);\n\nif (typeof colors.enabled === 'undefined') {\n  colors.enabled = colors.supportsColor() !== false;\n}\n\ncolors.enable = function() {\n  colors.enabled = true;\n};\n\ncolors.disable = function() {\n  colors.enabled = false;\n};\n\ncolors.stripColors = colors.strip = function(str) {\n  return ('' + str).replace(/\\x1B\\[\\d+m/g, '');\n};\n\n// eslint-disable-next-line no-unused-vars\nvar stylize = colors.stylize = function stylize(str, style) {\n  if (!colors.enabled) {\n    return str+'';\n  }\n\n  var styleMap = ansiStyles[style];\n\n  // Stylize should work for non-ANSI styles, too\n  if(!styleMap && style in colors){\n    // Style maps like trap operate as functions on strings;\n    // they don't have properties like open or close.\n    return colors[style](str);\n  }\n\n  return styleMap.open + str + styleMap.close;\n};\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\nvar escapeStringRegexp = function(str) {\n  if (typeof str !== 'string') {\n    throw new TypeError('Expected a string');\n  }\n  return str.replace(matchOperatorsRe, '\\\\$&');\n};\n\nfunction build(_styles) {\n  var builder = function builder() {\n    return applyStyle.apply(builder, arguments);\n  };\n  builder._styles = _styles;\n  // __proto__ is used because we must return a function, but there is\n  // no way to create a function with a different prototype.\n  builder.__proto__ = proto;\n  return builder;\n}\n\nvar styles = (function() {\n  var ret = {};\n  ansiStyles.grey = ansiStyles.gray;\n  Object.keys(ansiStyles).forEach(function(key) {\n    ansiStyles[key].closeRe =\n      new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');\n    ret[key] = {\n      get: function() {\n        return build(this._styles.concat(key));\n      },\n    };\n  });\n  return ret;\n})();\n\nvar proto = defineProps(function colors() {}, styles);\n\nfunction applyStyle() {\n  var args = Array.prototype.slice.call(arguments);\n\n  var str = args.map(function(arg) {\n    // Use weak equality check so we can colorize null/undefined in safe mode\n    if (arg != null && arg.constructor === String) {\n      return arg;\n    } else {\n      return util.inspect(arg);\n    }\n  }).join(' ');\n\n  if (!colors.enabled || !str) {\n    return str;\n  }\n\n  var newLinesPresent = str.indexOf('\\n') != -1;\n\n  var nestedStyles = this._styles;\n\n  var i = nestedStyles.length;\n  while (i--) {\n    var code = ansiStyles[nestedStyles[i]];\n    str = code.open + str.replace(code.closeRe, code.open) + code.close;\n    if (newLinesPresent) {\n      str = str.replace(newLineRegex, function(match) {\n        return code.close + match + code.open;\n      });\n    }\n  }\n\n  return str;\n}\n\ncolors.setTheme = function(theme) {\n  if (typeof theme === 'string') {\n    console.log('colors.setTheme now only accepts an object, not a string.  ' +\n      'If you are trying to set a theme from a file, it is now your (the ' +\n      'caller\\'s) responsibility to require the file.  The old syntax ' +\n      'looked like colors.setTheme(__dirname + ' +\n      '\\'/../themes/generic-logging.js\\'); The new syntax looks like '+\n      'colors.setTheme(require(__dirname + ' +\n      '\\'/../themes/generic-logging.js\\'));');\n    return;\n  }\n  for (var style in theme) {\n    (function(style) {\n      colors[style] = function(str) {\n        if (typeof theme[style] === 'object') {\n          var out = str;\n          for (var i in theme[style]) {\n            out = colors[theme[style][i]](out);\n          }\n          return out;\n        }\n        return colors[theme[style]](str);\n      };\n    })(style);\n  }\n};\n\nfunction init() {\n  var ret = {};\n  Object.keys(styles).forEach(function(name) {\n    ret[name] = {\n      get: function() {\n        return build([name]);\n      },\n    };\n  });\n  return ret;\n}\n\nvar sequencer = function sequencer(map, str) {\n  var exploded = str.split('');\n  exploded = exploded.map(map);\n  return exploded.join('');\n};\n\n// custom formatter methods\ncolors.trap = __webpack_require__(/*! ./custom/trap */ \"./node_modules/colors/lib/custom/trap.js\");\ncolors.zalgo = __webpack_require__(/*! ./custom/zalgo */ \"./node_modules/colors/lib/custom/zalgo.js\");\n\n// maps\ncolors.maps = {};\ncolors.maps.america = __webpack_require__(/*! ./maps/america */ \"./node_modules/colors/lib/maps/america.js\")(colors);\ncolors.maps.zebra = __webpack_require__(/*! ./maps/zebra */ \"./node_modules/colors/lib/maps/zebra.js\")(colors);\ncolors.maps.rainbow = __webpack_require__(/*! ./maps/rainbow */ \"./node_modules/colors/lib/maps/rainbow.js\")(colors);\ncolors.maps.random = __webpack_require__(/*! ./maps/random */ \"./node_modules/colors/lib/maps/random.js\")(colors);\n\nfor (var map in colors.maps) {\n  (function(map) {\n    colors[map] = function(str) {\n      return sequencer(colors.maps[map], str);\n    };\n  })(map);\n}\n\ndefineProps(colors, init());\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/colors.js?");

/***/ }),

/***/ "./node_modules/colors/lib/custom/trap.js":
/*!************************************************!*\
  !*** ./node_modules/colors/lib/custom/trap.js ***!
  \************************************************/
/***/ ((module) => {

eval("module['exports'] = function runTheTrap(text, options) {\n  var result = '';\n  text = text || 'Run the trap, drop the bass';\n  text = text.split('');\n  var trap = {\n    a: ['\\u0040', '\\u0104', '\\u023a', '\\u0245', '\\u0394', '\\u039b', '\\u0414'],\n    b: ['\\u00df', '\\u0181', '\\u0243', '\\u026e', '\\u03b2', '\\u0e3f'],\n    c: ['\\u00a9', '\\u023b', '\\u03fe'],\n    d: ['\\u00d0', '\\u018a', '\\u0500', '\\u0501', '\\u0502', '\\u0503'],\n    e: ['\\u00cb', '\\u0115', '\\u018e', '\\u0258', '\\u03a3', '\\u03be', '\\u04bc',\n      '\\u0a6c'],\n    f: ['\\u04fa'],\n    g: ['\\u0262'],\n    h: ['\\u0126', '\\u0195', '\\u04a2', '\\u04ba', '\\u04c7', '\\u050a'],\n    i: ['\\u0f0f'],\n    j: ['\\u0134'],\n    k: ['\\u0138', '\\u04a0', '\\u04c3', '\\u051e'],\n    l: ['\\u0139'],\n    m: ['\\u028d', '\\u04cd', '\\u04ce', '\\u0520', '\\u0521', '\\u0d69'],\n    n: ['\\u00d1', '\\u014b', '\\u019d', '\\u0376', '\\u03a0', '\\u048a'],\n    o: ['\\u00d8', '\\u00f5', '\\u00f8', '\\u01fe', '\\u0298', '\\u047a', '\\u05dd',\n      '\\u06dd', '\\u0e4f'],\n    p: ['\\u01f7', '\\u048e'],\n    q: ['\\u09cd'],\n    r: ['\\u00ae', '\\u01a6', '\\u0210', '\\u024c', '\\u0280', '\\u042f'],\n    s: ['\\u00a7', '\\u03de', '\\u03df', '\\u03e8'],\n    t: ['\\u0141', '\\u0166', '\\u0373'],\n    u: ['\\u01b1', '\\u054d'],\n    v: ['\\u05d8'],\n    w: ['\\u0428', '\\u0460', '\\u047c', '\\u0d70'],\n    x: ['\\u04b2', '\\u04fe', '\\u04fc', '\\u04fd'],\n    y: ['\\u00a5', '\\u04b0', '\\u04cb'],\n    z: ['\\u01b5', '\\u0240'],\n  };\n  text.forEach(function(c) {\n    c = c.toLowerCase();\n    var chars = trap[c] || [' '];\n    var rand = Math.floor(Math.random() * chars.length);\n    if (typeof trap[c] !== 'undefined') {\n      result += trap[c][rand];\n    } else {\n      result += c;\n    }\n  });\n  return result;\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/custom/trap.js?");

/***/ }),

/***/ "./node_modules/colors/lib/custom/zalgo.js":
/*!*************************************************!*\
  !*** ./node_modules/colors/lib/custom/zalgo.js ***!
  \*************************************************/
/***/ ((module) => {

eval("// please no\nmodule['exports'] = function zalgo(text, options) {\n  text = text || '   he is here   ';\n  var soul = {\n    'up': [\n      '̍', '̎', '̄', '̅',\n      '̿', '̑', '̆', '̐',\n      '͒', '͗', '͑', '̇',\n      '̈', '̊', '͂', '̓',\n      '̈', '͊', '͋', '͌',\n      '̃', '̂', '̌', '͐',\n      '̀', '́', '̋', '̏',\n      '̒', '̓', '̔', '̽',\n      '̉', 'ͣ', 'ͤ', 'ͥ',\n      'ͦ', 'ͧ', 'ͨ', 'ͩ',\n      'ͪ', 'ͫ', 'ͬ', 'ͭ',\n      'ͮ', 'ͯ', '̾', '͛',\n      '͆', '̚',\n    ],\n    'down': [\n      '̖', '̗', '̘', '̙',\n      '̜', '̝', '̞', '̟',\n      '̠', '̤', '̥', '̦',\n      '̩', '̪', '̫', '̬',\n      '̭', '̮', '̯', '̰',\n      '̱', '̲', '̳', '̹',\n      '̺', '̻', '̼', 'ͅ',\n      '͇', '͈', '͉', '͍',\n      '͎', '͓', '͔', '͕',\n      '͖', '͙', '͚', '̣',\n    ],\n    'mid': [\n      '̕', '̛', '̀', '́',\n      '͘', '̡', '̢', '̧',\n      '̨', '̴', '̵', '̶',\n      '͜', '͝', '͞',\n      '͟', '͠', '͢', '̸',\n      '̷', '͡', ' ҉',\n    ],\n  };\n  var all = [].concat(soul.up, soul.down, soul.mid);\n\n  function randomNumber(range) {\n    var r = Math.floor(Math.random() * range);\n    return r;\n  }\n\n  function isChar(character) {\n    var bool = false;\n    all.filter(function(i) {\n      bool = (i === character);\n    });\n    return bool;\n  }\n\n\n  function heComes(text, options) {\n    var result = '';\n    var counts;\n    var l;\n    options = options || {};\n    options['up'] =\n      typeof options['up'] !== 'undefined' ? options['up'] : true;\n    options['mid'] =\n      typeof options['mid'] !== 'undefined' ? options['mid'] : true;\n    options['down'] =\n      typeof options['down'] !== 'undefined' ? options['down'] : true;\n    options['size'] =\n      typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';\n    text = text.split('');\n    for (l in text) {\n      if (isChar(l)) {\n        continue;\n      }\n      result = result + text[l];\n      counts = {'up': 0, 'down': 0, 'mid': 0};\n      switch (options.size) {\n        case 'mini':\n          counts.up = randomNumber(8);\n          counts.mid = randomNumber(2);\n          counts.down = randomNumber(8);\n          break;\n        case 'maxi':\n          counts.up = randomNumber(16) + 3;\n          counts.mid = randomNumber(4) + 1;\n          counts.down = randomNumber(64) + 3;\n          break;\n        default:\n          counts.up = randomNumber(8) + 1;\n          counts.mid = randomNumber(6) / 2;\n          counts.down = randomNumber(8) + 1;\n          break;\n      }\n\n      var arr = ['up', 'mid', 'down'];\n      for (var d in arr) {\n        var index = arr[d];\n        for (var i = 0; i <= counts[index]; i++) {\n          if (options[index]) {\n            result = result + soul[index][randomNumber(soul[index].length)];\n          }\n        }\n      }\n    }\n    return result;\n  }\n  // don't summon him\n  return heComes(text, options);\n};\n\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/custom/zalgo.js?");

/***/ }),

/***/ "./node_modules/colors/lib/extendStringPrototype.js":
/*!**********************************************************!*\
  !*** ./node_modules/colors/lib/extendStringPrototype.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var colors = __webpack_require__(/*! ./colors */ \"./node_modules/colors/lib/colors.js\");\n\nmodule['exports'] = function() {\n  //\n  // Extends prototype of native string object to allow for \"foo\".red syntax\n  //\n  var addProperty = function(color, func) {\n    String.prototype.__defineGetter__(color, func);\n  };\n\n  addProperty('strip', function() {\n    return colors.strip(this);\n  });\n\n  addProperty('stripColors', function() {\n    return colors.strip(this);\n  });\n\n  addProperty('trap', function() {\n    return colors.trap(this);\n  });\n\n  addProperty('zalgo', function() {\n    return colors.zalgo(this);\n  });\n\n  addProperty('zebra', function() {\n    return colors.zebra(this);\n  });\n\n  addProperty('rainbow', function() {\n    return colors.rainbow(this);\n  });\n\n  addProperty('random', function() {\n    return colors.random(this);\n  });\n\n  addProperty('america', function() {\n    return colors.america(this);\n  });\n\n  //\n  // Iterate through all default styles and colors\n  //\n  var x = Object.keys(colors.styles);\n  x.forEach(function(style) {\n    addProperty(style, function() {\n      return colors.stylize(this, style);\n    });\n  });\n\n  function applyTheme(theme) {\n    //\n    // Remark: This is a list of methods that exist\n    // on String that you should not overwrite.\n    //\n    var stringPrototypeBlacklist = [\n      '__defineGetter__', '__defineSetter__', '__lookupGetter__',\n      '__lookupSetter__', 'charAt', 'constructor', 'hasOwnProperty',\n      'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString',\n      'valueOf', 'charCodeAt', 'indexOf', 'lastIndexOf', 'length',\n      'localeCompare', 'match', 'repeat', 'replace', 'search', 'slice',\n      'split', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',\n      'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight',\n    ];\n\n    Object.keys(theme).forEach(function(prop) {\n      if (stringPrototypeBlacklist.indexOf(prop) !== -1) {\n        console.log('warn: '.red + ('String.prototype' + prop).magenta +\n          ' is probably something you don\\'t want to override.  ' +\n          'Ignoring style name');\n      } else {\n        if (typeof(theme[prop]) === 'string') {\n          colors[prop] = colors[theme[prop]];\n          addProperty(prop, function() {\n            return colors[prop](this);\n          });\n        } else {\n          var themePropApplicator = function(str) {\n            var ret = str || this;\n            for (var t = 0; t < theme[prop].length; t++) {\n              ret = colors[theme[prop][t]](ret);\n            }\n            return ret;\n          };\n          addProperty(prop, themePropApplicator);\n          colors[prop] = function(str) {\n            return themePropApplicator(str);\n          };\n        }\n      }\n    });\n  }\n\n  colors.setTheme = function(theme) {\n    if (typeof theme === 'string') {\n      console.log('colors.setTheme now only accepts an object, not a string. ' +\n        'If you are trying to set a theme from a file, it is now your (the ' +\n        'caller\\'s) responsibility to require the file.  The old syntax ' +\n        'looked like colors.setTheme(__dirname + ' +\n        '\\'/../themes/generic-logging.js\\'); The new syntax looks like '+\n        'colors.setTheme(require(__dirname + ' +\n        '\\'/../themes/generic-logging.js\\'));');\n      return;\n    } else {\n      applyTheme(theme);\n    }\n  };\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/extendStringPrototype.js?");

/***/ }),

/***/ "./node_modules/colors/lib/index.js":
/*!******************************************!*\
  !*** ./node_modules/colors/lib/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var colors = __webpack_require__(/*! ./colors */ \"./node_modules/colors/lib/colors.js\");\nmodule['exports'] = colors;\n\n// Remark: By default, colors will add style properties to String.prototype.\n//\n// If you don't wish to extend String.prototype, you can do this instead and\n// native String will not be touched:\n//\n//   var colors = require('colors/safe);\n//   colors.red(\"foo\")\n//\n//\n__webpack_require__(/*! ./extendStringPrototype */ \"./node_modules/colors/lib/extendStringPrototype.js\")();\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/index.js?");

/***/ }),

/***/ "./node_modules/colors/lib/maps/america.js":
/*!*************************************************!*\
  !*** ./node_modules/colors/lib/maps/america.js ***!
  \*************************************************/
/***/ ((module) => {

eval("module['exports'] = function(colors) {\n  return function(letter, i, exploded) {\n    if (letter === ' ') return letter;\n    switch (i%3) {\n      case 0: return colors.red(letter);\n      case 1: return colors.white(letter);\n      case 2: return colors.blue(letter);\n    }\n  };\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/maps/america.js?");

/***/ }),

/***/ "./node_modules/colors/lib/maps/rainbow.js":
/*!*************************************************!*\
  !*** ./node_modules/colors/lib/maps/rainbow.js ***!
  \*************************************************/
/***/ ((module) => {

eval("module['exports'] = function(colors) {\n  // RoY G BiV\n  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];\n  return function(letter, i, exploded) {\n    if (letter === ' ') {\n      return letter;\n    } else {\n      return colors[rainbowColors[i++ % rainbowColors.length]](letter);\n    }\n  };\n};\n\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/maps/rainbow.js?");

/***/ }),

/***/ "./node_modules/colors/lib/maps/random.js":
/*!************************************************!*\
  !*** ./node_modules/colors/lib/maps/random.js ***!
  \************************************************/
/***/ ((module) => {

eval("module['exports'] = function(colors) {\n  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',\n    'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed',\n    'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];\n  return function(letter, i, exploded) {\n    return letter === ' ' ? letter :\n      colors[\n          available[Math.round(Math.random() * (available.length - 2))]\n      ](letter);\n  };\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/maps/random.js?");

/***/ }),

/***/ "./node_modules/colors/lib/maps/zebra.js":
/*!***********************************************!*\
  !*** ./node_modules/colors/lib/maps/zebra.js ***!
  \***********************************************/
/***/ ((module) => {

eval("module['exports'] = function(colors) {\n  return function(letter, i, exploded) {\n    return i % 2 === 0 ? letter : colors.inverse(letter);\n  };\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/maps/zebra.js?");

/***/ }),

/***/ "./node_modules/colors/lib/styles.js":
/*!*******************************************!*\
  !*** ./node_modules/colors/lib/styles.js ***!
  \*******************************************/
/***/ ((module) => {

eval("/*\nThe MIT License (MIT)\n\nCopyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n\n*/\n\nvar styles = {};\nmodule['exports'] = styles;\n\nvar codes = {\n  reset: [0, 0],\n\n  bold: [1, 22],\n  dim: [2, 22],\n  italic: [3, 23],\n  underline: [4, 24],\n  inverse: [7, 27],\n  hidden: [8, 28],\n  strikethrough: [9, 29],\n\n  black: [30, 39],\n  red: [31, 39],\n  green: [32, 39],\n  yellow: [33, 39],\n  blue: [34, 39],\n  magenta: [35, 39],\n  cyan: [36, 39],\n  white: [37, 39],\n  gray: [90, 39],\n  grey: [90, 39],\n\n  brightRed: [91, 39],\n  brightGreen: [92, 39],\n  brightYellow: [93, 39],\n  brightBlue: [94, 39],\n  brightMagenta: [95, 39],\n  brightCyan: [96, 39],\n  brightWhite: [97, 39],\n\n  bgBlack: [40, 49],\n  bgRed: [41, 49],\n  bgGreen: [42, 49],\n  bgYellow: [43, 49],\n  bgBlue: [44, 49],\n  bgMagenta: [45, 49],\n  bgCyan: [46, 49],\n  bgWhite: [47, 49],\n  bgGray: [100, 49],\n  bgGrey: [100, 49],\n\n  bgBrightRed: [101, 49],\n  bgBrightGreen: [102, 49],\n  bgBrightYellow: [103, 49],\n  bgBrightBlue: [104, 49],\n  bgBrightMagenta: [105, 49],\n  bgBrightCyan: [106, 49],\n  bgBrightWhite: [107, 49],\n\n  // legacy styles for colors pre v1.0.0\n  blackBG: [40, 49],\n  redBG: [41, 49],\n  greenBG: [42, 49],\n  yellowBG: [43, 49],\n  blueBG: [44, 49],\n  magentaBG: [45, 49],\n  cyanBG: [46, 49],\n  whiteBG: [47, 49],\n\n};\n\nObject.keys(codes).forEach(function(key) {\n  var val = codes[key];\n  var style = styles[key] = [];\n  style.open = '\\u001b[' + val[0] + 'm';\n  style.close = '\\u001b[' + val[1] + 'm';\n});\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/styles.js?");

/***/ }),

/***/ "./node_modules/colors/lib/system/has-flag.js":
/*!****************************************************!*\
  !*** ./node_modules/colors/lib/system/has-flag.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
eval("/*\nMIT License\n\nCopyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies\nof the Software, and to permit persons to whom the Software is furnished to do\nso, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n*/\n\n\n\nmodule.exports = function(flag, argv) {\n  argv = argv || process.argv;\n\n  var terminatorPos = argv.indexOf('--');\n  var prefix = /^-{1,2}/.test(flag) ? '' : '--';\n  var pos = argv.indexOf(prefix + flag);\n\n  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/system/has-flag.js?");

/***/ }),

/***/ "./node_modules/colors/lib/system/supports-colors.js":
/*!***********************************************************!*\
  !*** ./node_modules/colors/lib/system/supports-colors.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*\nThe MIT License (MIT)\n\nCopyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n\n*/\n\n\n\nvar os = __webpack_require__(/*! os */ \"os\");\nvar hasFlag = __webpack_require__(/*! ./has-flag.js */ \"./node_modules/colors/lib/system/has-flag.js\");\n\nvar env = process.env;\n\nvar forceColor = void 0;\nif (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {\n  forceColor = false;\n} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true')\n           || hasFlag('color=always')) {\n  forceColor = true;\n}\nif ('FORCE_COLOR' in env) {\n  forceColor = env.FORCE_COLOR.length === 0\n    || parseInt(env.FORCE_COLOR, 10) !== 0;\n}\n\nfunction translateLevel(level) {\n  if (level === 0) {\n    return false;\n  }\n\n  return {\n    level: level,\n    hasBasic: true,\n    has256: level >= 2,\n    has16m: level >= 3,\n  };\n}\n\nfunction supportsColor(stream) {\n  if (forceColor === false) {\n    return 0;\n  }\n\n  if (hasFlag('color=16m') || hasFlag('color=full')\n      || hasFlag('color=truecolor')) {\n    return 3;\n  }\n\n  if (hasFlag('color=256')) {\n    return 2;\n  }\n\n  if (stream && !stream.isTTY && forceColor !== true) {\n    return 0;\n  }\n\n  var min = forceColor ? 1 : 0;\n\n  if (process.platform === 'win32') {\n    // Node.js 7.5.0 is the first version of Node.js to include a patch to\n    // libuv that enables 256 color output on Windows. Anything earlier and it\n    // won't work. However, here we target Node.js 8 at minimum as it is an LTS\n    // release, and Node.js 7 is not. Windows 10 build 10586 is the first\n    // Windows release that supports 256 colors. Windows 10 build 14931 is the\n    // first release that supports 16m/TrueColor.\n    var osRelease = os.release().split('.');\n    if (Number(process.versions.node.split('.')[0]) >= 8\n        && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {\n      return Number(osRelease[2]) >= 14931 ? 3 : 2;\n    }\n\n    return 1;\n  }\n\n  if ('CI' in env) {\n    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {\n      return sign in env;\n    }) || env.CI_NAME === 'codeship') {\n      return 1;\n    }\n\n    return min;\n  }\n\n  if ('TEAMCITY_VERSION' in env) {\n    return (/^(9\\.(0*[1-9]\\d*)\\.|\\d{2,}\\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0\n    );\n  }\n\n  if ('TERM_PROGRAM' in env) {\n    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);\n\n    switch (env.TERM_PROGRAM) {\n      case 'iTerm.app':\n        return version >= 3 ? 3 : 2;\n      case 'Hyper':\n        return 3;\n      case 'Apple_Terminal':\n        return 2;\n      // No default\n    }\n  }\n\n  if (/-256(color)?$/i.test(env.TERM)) {\n    return 2;\n  }\n\n  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {\n    return 1;\n  }\n\n  if ('COLORTERM' in env) {\n    return 1;\n  }\n\n  if (env.TERM === 'dumb') {\n    return min;\n  }\n\n  return min;\n}\n\nfunction getSupportLevel(stream) {\n  var level = supportsColor(stream);\n  return translateLevel(level);\n}\n\nmodule.exports = {\n  supportsColor: getSupportLevel,\n  stdout: getSupportLevel(process.stdout),\n  stderr: getSupportLevel(process.stderr),\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/colors/lib/system/supports-colors.js?");

/***/ }),

/***/ "./node_modules/prompt-sync/index.js":
/*!*******************************************!*\
  !*** ./node_modules/prompt-sync/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar stripAnsi = __webpack_require__(/*! strip-ansi */ \"./node_modules/strip-ansi/index.js\");\nvar term = 13; // carriage return\n\n/**\n * create -- sync function for reading user input from stdin\n * @param   {Object} config {\n *   sigint: {Boolean} exit on ^C\n *   autocomplete: {StringArray} function({String})\n *   history: {String} a history control object (see `prompt-sync-history`)\n * }\n * @returns {Function} prompt function\n */\n\n // for ANSI escape codes reference see https://en.wikipedia.org/wiki/ANSI_escape_code\n\nfunction create(config) {\n\n  config = config || {};\n  var sigint = config.sigint;\n  var eot = config.eot;\n  var autocomplete = config.autocomplete =\n    config.autocomplete || function(){return []};\n  var history = config.history;\n  prompt.history = history || {save: function(){}};\n  prompt.hide = function (ask) { return prompt(ask, {echo: ''}) };\n\n  return prompt;\n\n\n  /**\n   * prompt -- sync function for reading user input from stdin\n   *  @param {String} ask opening question/statement to prompt for\n   *  @param {String} value initial value for the prompt\n   *  @param   {Object} opts {\n   *   echo: set to a character to be echoed, default is '*'. Use '' for no echo\n   *   value: {String} initial value for the prompt\n   *   ask: {String} opening question/statement to prompt for, does not override ask param\n   *   autocomplete: {StringArray} function({String})\n   * }\n   *\n   * @returns {string} Returns the string input or (if sigint === false)\n   *                   null if user terminates with a ^C\n   */\n\n\n  function prompt(ask, value, opts) {\n    var insert = 0, savedinsert = 0, res, i, savedstr;\n    opts = opts || {};\n\n    if (Object(ask) === ask) {\n      opts = ask;\n      ask = opts.ask;\n    } else if (Object(value) === value) {\n      opts = value;\n      value = opts.value;\n    }\n    ask = ask || '';\n    var echo = opts.echo;\n    var masked = 'echo' in opts;\n    autocomplete = opts.autocomplete || autocomplete;\n\n    var fd = (process.platform === 'win32') ?\n      process.stdin.fd :\n      fs.openSync('/dev/tty', 'rs');\n\n    var wasRaw = process.stdin.isRaw;\n    if (!wasRaw) { process.stdin.setRawMode && process.stdin.setRawMode(true); }\n\n    var buf = Buffer.alloc(3);\n    var str = '', character, read;\n\n    savedstr = '';\n\n    if (ask) {\n      process.stdout.write(ask);\n    }\n\n    var cycle = 0;\n    var prevComplete;\n\n    while (true) {\n      read = fs.readSync(fd, buf, 0, 3);\n      if (read > 1) { // received a control sequence\n        switch(buf.toString()) {\n          case '\\u001b[A':  //up arrow\n            if (masked) break;\n            if (!history) break;\n            if (history.atStart()) break;\n\n            if (history.atEnd()) {\n              savedstr = str;\n              savedinsert = insert;\n            }\n            str = history.prev();\n            insert = str.length;\n            process.stdout.write('\\u001b[2K\\u001b[0G' + ask + str);\n            break;\n          case '\\u001b[B':  //down arrow\n            if (masked) break;\n            if (!history) break;\n            if (history.pastEnd()) break;\n\n            if (history.atPenultimate()) {\n              str = savedstr;\n              insert = savedinsert;\n              history.next();\n            } else {\n              str = history.next();\n              insert = str.length;\n            }\n            process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str + '\\u001b['+(insert+ask.length+1)+'G');\n            break;\n          case '\\u001b[D': //left arrow\n            if (masked) break;\n            var before = insert;\n            insert = (--insert < 0) ? 0 : insert;\n            if (before - insert)\n              process.stdout.write('\\u001b[1D');\n            break;\n          case '\\u001b[C': //right arrow\n            if (masked) break;\n            insert = (++insert > str.length) ? str.length : insert;\n            process.stdout.write('\\u001b[' + (insert+ask.length+1) + 'G');\n            break;\n          default:\n            if (buf.toString()) {\n              str = str + buf.toString();\n              str = str.replace(/\\0/g, '');\n              insert = str.length;\n              promptPrint(masked, ask, echo, str, insert);\n              process.stdout.write('\\u001b[' + (insert+ask.length+1) + 'G');\n              buf = Buffer.alloc(3);\n            }\n        }\n        continue; // any other 3 character sequence is ignored\n      }\n\n      // if it is not a control character seq, assume only one character is read\n      character = buf[read-1];\n\n      // catch a ^C and return null\n      if (character == 3){\n        process.stdout.write('^C\\n');\n        fs.closeSync(fd);\n\n        if (sigint) process.exit(130);\n\n        process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);\n\n        return null;\n      }\n\n      // catch a ^D and exit\n      if (character == 4) {\n        if (str.length == 0 && eot) {\n          process.stdout.write('exit\\n');\n          process.exit(0);\n        }\n      }\n\n      // catch the terminating character\n      if (character == term) {\n        fs.closeSync(fd);\n        if (!history) break;\n        if (!masked && str.length) history.push(str);\n        history.reset();\n        break;\n      }\n\n      // catch a TAB and implement autocomplete\n      if (character == 9) { // TAB\n        res = autocomplete(str);\n\n        if (str == res[0]) {\n          res = autocomplete('');\n        } else {\n          prevComplete = res.length;\n        }\n\n        if (res.length == 0) {\n          process.stdout.write('\\t');\n          continue;\n        }\n\n        var item = res[cycle++] || res[cycle = 0, cycle++];\n\n        if (item) {\n          process.stdout.write('\\r\\u001b[K' + ask + item);\n          str = item;\n          insert = item.length;\n        }\n      }\n\n      if (character == 127 || (process.platform == 'win32' && character == 8)) { //backspace\n        if (!insert) continue;\n        str = str.slice(0, insert-1) + str.slice(insert);\n        insert--;\n        process.stdout.write('\\u001b[2D');\n      } else {\n        if ((character < 32 ) || (character > 126))\n            continue;\n        str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);\n        insert++;\n      };\n\n      promptPrint(masked, ask, echo, str, insert);\n\n    }\n\n    process.stdout.write('\\n')\n\n    process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);\n\n    return str || value || '';\n  };\n\n\n  function promptPrint(masked, ask, echo, str, insert) {\n    if (masked) {\n        process.stdout.write('\\u001b[2K\\u001b[0G' + ask + Array(str.length+1).join(echo));\n    } else {\n      process.stdout.write('\\u001b[s');\n      if (insert == str.length) {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str);\n      } else {\n        if (ask) {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str);\n        } else {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ str + '\\u001b[' + (str.length - insert) + 'D');\n        }\n      }\n\n      // Reposition the cursor to the right of the insertion point\n      var askLength = stripAnsi(ask).length;\n      process.stdout.write(`\\u001b[${askLength+1+(echo==''? 0:insert)}G`);\n    }\n  }\n};\n\nmodule.exports = create;\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/prompt-sync/index.js?");

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst ansiRegex = __webpack_require__(/*! ansi-regex */ \"./node_modules/ansi-regex/index.js\");\n\nconst stripAnsi = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;\n\nmodule.exports = stripAnsi;\nmodule.exports[\"default\"] = stripAnsi;\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/strip-ansi/index.js?");

/***/ }),

/***/ "./src/component/CoreTerminal.js":
/*!***************************************!*\
  !*** ./src/component/CoreTerminal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var prompt_sync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prompt-sync */ \"./node_modules/prompt-sync/index.js\");\n/* harmony import */ var prompt_sync__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prompt_sync__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! colors */ \"./node_modules/colors/lib/index.js\");\n/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(colors__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nconst prompt = prompt_sync__WEBPACK_IMPORTED_MODULE_0___default()()\r\n\r\nclass CoreTerminal {\r\n    constructor(user, arrayCommand, config){\r\n        this.user = user\r\n        this.arrayCommand = arrayCommand\r\n        this.config = config\r\n    }\r\n\r\n    \r\n\r\n    start = () => {\r\n            console.log('hello, you login to ' + this.user)\r\n            this.loop()\r\n    }\r\n\r\n\r\n    loop = (arrCommand = this.arrayCommand) => {\r\n\r\n        let message = this.getMessage(this.user) // получение message\r\n\r\n        arrCommand.forEach(element => {    // перебор массива с командами\r\n            const {command, nextStep} = element\r\n\r\n            if(command.indexOf(message) > -1) {     // проверка на совподение команды и меседжа\r\n                message = this.scene(this.user, nextStep)   // запуск сцены которая соответствует команде\r\n            }\r\n        });\r\n\r\n        if(message !== 'exit'){     // если сцена возвращает \"exit\" то поток выполнения заканчивается\r\n            this.loop()             //  если сцена возвращает чтото другое то запускается рекурсия\r\n        }\r\n        \r\n\r\n    }\r\n\r\n\r\n   \r\n\r\n    getMessage = (user = this.user) => {      \r\n        return prompt('nano-terminal@'.green + user.blue + ': ')\r\n    }\r\n\r\n    // exitScene = (message, functn) => {\r\n    //     if(message === 'exit'){\r\n    //         return 'exit'\r\n    //     }\r\n    //     return functn(message)\r\n    // }\r\n        \r\n\r\n    scene = (user, arrfunction) => {    //  сцена принимает в себя юзера и массив с функциями\r\n        let sceneExit = false\r\n        let count = false\r\n        let response\r\n        for(const func of arrfunction){\r\n\r\n            let message = ''\r\n\r\n            !count ? count = true  :  message = this.getMessage(user)  // это делается для того что бы при запуске сцены не запускаля лишний getMessage\r\n\r\n           \r\n            response = (message === \"exit\") ? 'exit' : func(message)    //если в ходе выполнения сцены пользователь вводит exit то возвращается exit \r\n                                                                        //если нет то запускается функция которая тоже может вернуть какой то флаг\r\n            if(response === 'break'){                                   \r\n                break;\r\n            }\r\n            if(response === 'exit'){\r\n                sceneExit = true\r\n                break\r\n            }\r\n            if(response === \"continue\"){\r\n                this.loop()\r\n            }\r\n        }\r\n\r\n        return response     \r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoreTerminal);\n\n//# sourceURL=webpack://nano_bot/./src/component/CoreTerminal.js?");

/***/ }),

/***/ "./src/component/plagins/generateNum.js":
/*!**********************************************!*\
  !*** ./src/component/plagins/generateNum.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nfunction genereteNum() {\r\n\r\n    const firs = () => {\r\n        console.log(\"press ener to get a random number\")\r\n        \r\n    }\r\n    const second = (message) => {\r\n        const num = Math.floor(Math.random() * (10 - 0) + 0)\r\n        console.log(num)\r\n    }\r\n    \r\n\r\n   \r\n\r\n    const yorn = [firs, second]\r\n\r\n    return yorn\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genereteNum);\n\n//# sourceURL=webpack://nano_bot/./src/component/plagins/generateNum.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_CoreTerminal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/CoreTerminal */ \"./src/component/CoreTerminal.js\");\n/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! colors */ \"./node_modules/colors/lib/index.js\");\n/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(colors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _users_rootUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users/rootUser */ \"./src/users/rootUser.js\");\n\r\n\r\n// users\r\n\r\n\r\nconst root = (0,_users_rootUser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])()\r\n\r\n\r\n\r\nfunction startUserTerminal (terminal) {\r\n\r\n    const first = () => {\r\n        console.log('введите пароль')\r\n    }\r\n    const second = (message) => {\r\n        message == terminal.config.password ? terminal.start() : console.log('неверный пароль'.red)\r\n    }\r\n\r\n    return [first, second]\r\n\r\n}\r\n\r\n\r\nconst arrNano = [\r\n    {\r\n        command: [\"root\"],\r\n        nextStep: startUserTerminal(root)\r\n    }\r\n]\r\n\r\n\r\nconst nanoTerminal = new _component_CoreTerminal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('nano', arrNano);\r\n\r\nnanoTerminal.start()\r\n\r\n\n\n//# sourceURL=webpack://nano_bot/./src/index.js?");

/***/ }),

/***/ "./src/users/rootUser.js":
/*!*******************************!*\
  !*** ./src/users/rootUser.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _component_CoreTerminal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/CoreTerminal */ \"./src/component/CoreTerminal.js\");\n/* harmony import */ var _component_plagins_generateNum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/plagins/generateNum */ \"./src/component/plagins/generateNum.js\");\n\r\n\r\n\r\n\r\nfunction rootUser () {\r\n    const rootComands = [\r\n        {\r\n            command: [\"num\"],\r\n            nextStep: (0,_component_plagins_generateNum__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\r\n        },\r\n    ]\r\n    \r\n    const rootTerminal = new _component_CoreTerminal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('root', rootComands, {password: 123});\r\n\r\n    return rootTerminal\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootUser);\r\n\n\n//# sourceURL=webpack://nano_bot/./src/users/rootUser.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;