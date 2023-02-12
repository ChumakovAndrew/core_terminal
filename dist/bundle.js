/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = options => {\n\toptions = Object.assign({\n\t\tonlyFirst: false\n\t}, options);\n\n\tconst pattern = [\n\t\t'[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)',\n\t\t'(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'\n\t].join('|');\n\n\treturn new RegExp(pattern, options.onlyFirst ? undefined : 'g');\n};\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "./node_modules/prompt-sync/index.js":
/*!*******************************************!*\
  !*** ./node_modules/prompt-sync/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar stripAnsi = __webpack_require__(/*! strip-ansi */ \"./node_modules/strip-ansi/index.js\");\nvar term = 13; // carriage return\n\n/**\n * create -- sync function for reading user input from stdin\n * @param   {Object} config {\n *   sigint: {Boolean} exit on ^C\n *   autocomplete: {StringArray} function({String})\n *   history: {String} a history control object (see `prompt-sync-history`)\n * }\n * @returns {Function} prompt function\n */\n\n // for ANSI escape codes reference see https://en.wikipedia.org/wiki/ANSI_escape_code\n\nfunction create(config) {\n\n  config = config || {};\n  var sigint = config.sigint;\n  var eot = config.eot;\n  var autocomplete = config.autocomplete =\n    config.autocomplete || function(){return []};\n  var history = config.history;\n  prompt.history = history || {save: function(){}};\n  prompt.hide = function (ask) { return prompt(ask, {echo: ''}) };\n\n  return prompt;\n\n\n  /**\n   * prompt -- sync function for reading user input from stdin\n   *  @param {String} ask opening question/statement to prompt for\n   *  @param {String} value initial value for the prompt\n   *  @param   {Object} opts {\n   *   echo: set to a character to be echoed, default is '*'. Use '' for no echo\n   *   value: {String} initial value for the prompt\n   *   ask: {String} opening question/statement to prompt for, does not override ask param\n   *   autocomplete: {StringArray} function({String})\n   * }\n   *\n   * @returns {string} Returns the string input or (if sigint === false)\n   *                   null if user terminates with a ^C\n   */\n\n\n  function prompt(ask, value, opts) {\n    var insert = 0, savedinsert = 0, res, i, savedstr;\n    opts = opts || {};\n\n    if (Object(ask) === ask) {\n      opts = ask;\n      ask = opts.ask;\n    } else if (Object(value) === value) {\n      opts = value;\n      value = opts.value;\n    }\n    ask = ask || '';\n    var echo = opts.echo;\n    var masked = 'echo' in opts;\n    autocomplete = opts.autocomplete || autocomplete;\n\n    var fd = (process.platform === 'win32') ?\n      process.stdin.fd :\n      fs.openSync('/dev/tty', 'rs');\n\n    var wasRaw = process.stdin.isRaw;\n    if (!wasRaw) { process.stdin.setRawMode && process.stdin.setRawMode(true); }\n\n    var buf = Buffer.alloc(3);\n    var str = '', character, read;\n\n    savedstr = '';\n\n    if (ask) {\n      process.stdout.write(ask);\n    }\n\n    var cycle = 0;\n    var prevComplete;\n\n    while (true) {\n      read = fs.readSync(fd, buf, 0, 3);\n      if (read > 1) { // received a control sequence\n        switch(buf.toString()) {\n          case '\\u001b[A':  //up arrow\n            if (masked) break;\n            if (!history) break;\n            if (history.atStart()) break;\n\n            if (history.atEnd()) {\n              savedstr = str;\n              savedinsert = insert;\n            }\n            str = history.prev();\n            insert = str.length;\n            process.stdout.write('\\u001b[2K\\u001b[0G' + ask + str);\n            break;\n          case '\\u001b[B':  //down arrow\n            if (masked) break;\n            if (!history) break;\n            if (history.pastEnd()) break;\n\n            if (history.atPenultimate()) {\n              str = savedstr;\n              insert = savedinsert;\n              history.next();\n            } else {\n              str = history.next();\n              insert = str.length;\n            }\n            process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str + '\\u001b['+(insert+ask.length+1)+'G');\n            break;\n          case '\\u001b[D': //left arrow\n            if (masked) break;\n            var before = insert;\n            insert = (--insert < 0) ? 0 : insert;\n            if (before - insert)\n              process.stdout.write('\\u001b[1D');\n            break;\n          case '\\u001b[C': //right arrow\n            if (masked) break;\n            insert = (++insert > str.length) ? str.length : insert;\n            process.stdout.write('\\u001b[' + (insert+ask.length+1) + 'G');\n            break;\n          default:\n            if (buf.toString()) {\n              str = str + buf.toString();\n              str = str.replace(/\\0/g, '');\n              insert = str.length;\n              promptPrint(masked, ask, echo, str, insert);\n              process.stdout.write('\\u001b[' + (insert+ask.length+1) + 'G');\n              buf = Buffer.alloc(3);\n            }\n        }\n        continue; // any other 3 character sequence is ignored\n      }\n\n      // if it is not a control character seq, assume only one character is read\n      character = buf[read-1];\n\n      // catch a ^C and return null\n      if (character == 3){\n        process.stdout.write('^C\\n');\n        fs.closeSync(fd);\n\n        if (sigint) process.exit(130);\n\n        process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);\n\n        return null;\n      }\n\n      // catch a ^D and exit\n      if (character == 4) {\n        if (str.length == 0 && eot) {\n          process.stdout.write('exit\\n');\n          process.exit(0);\n        }\n      }\n\n      // catch the terminating character\n      if (character == term) {\n        fs.closeSync(fd);\n        if (!history) break;\n        if (!masked && str.length) history.push(str);\n        history.reset();\n        break;\n      }\n\n      // catch a TAB and implement autocomplete\n      if (character == 9) { // TAB\n        res = autocomplete(str);\n\n        if (str == res[0]) {\n          res = autocomplete('');\n        } else {\n          prevComplete = res.length;\n        }\n\n        if (res.length == 0) {\n          process.stdout.write('\\t');\n          continue;\n        }\n\n        var item = res[cycle++] || res[cycle = 0, cycle++];\n\n        if (item) {\n          process.stdout.write('\\r\\u001b[K' + ask + item);\n          str = item;\n          insert = item.length;\n        }\n      }\n\n      if (character == 127 || (process.platform == 'win32' && character == 8)) { //backspace\n        if (!insert) continue;\n        str = str.slice(0, insert-1) + str.slice(insert);\n        insert--;\n        process.stdout.write('\\u001b[2D');\n      } else {\n        if ((character < 32 ) || (character > 126))\n            continue;\n        str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);\n        insert++;\n      };\n\n      promptPrint(masked, ask, echo, str, insert);\n\n    }\n\n    process.stdout.write('\\n')\n\n    process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);\n\n    return str || value || '';\n  };\n\n\n  function promptPrint(masked, ask, echo, str, insert) {\n    if (masked) {\n        process.stdout.write('\\u001b[2K\\u001b[0G' + ask + Array(str.length+1).join(echo));\n    } else {\n      process.stdout.write('\\u001b[s');\n      if (insert == str.length) {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str);\n      } else {\n        if (ask) {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str);\n        } else {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ str + '\\u001b[' + (str.length - insert) + 'D');\n        }\n      }\n\n      // Reposition the cursor to the right of the insertion point\n      var askLength = stripAnsi(ask).length;\n      process.stdout.write(`\\u001b[${askLength+1+(echo==''? 0:insert)}G`);\n    }\n  }\n};\n\nmodule.exports = create;\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/prompt-sync/index.js?");

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst ansiRegex = __webpack_require__(/*! ansi-regex */ \"./node_modules/ansi-regex/index.js\");\n\nconst stripAnsi = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;\n\nmodule.exports = stripAnsi;\nmodule.exports[\"default\"] = stripAnsi;\n\n\n//# sourceURL=webpack://nano_bot/./node_modules/strip-ansi/index.js?");

/***/ }),

/***/ "./src/YesOrNo.js":
/*!************************!*\
  !*** ./src/YesOrNo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nfunction YesOrNo() {\r\n\r\n    const firs = () => {\r\n        const num = Math.floor(Math.random() * (100 - 0) + 0)\r\n        if(num % 2 == 0){\r\n            console.log(\"yes\")\r\n        }else{\r\n            console.log(\"no\")\r\n        }\r\n        \r\n    }\r\n\r\n    const second = (message) => {\r\n        if(message == 'back'){\r\n        \r\n        return 'back'\r\n    }\r\n    else{\r\n        return 'replay'\r\n    }\r\n}\r\n   \r\n\r\n    const yorn = [firs, second]\r\n\r\n    return yorn\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (YesOrNo);\n\n//# sourceURL=webpack://nano_bot/./src/YesOrNo.js?");

/***/ }),

/***/ "./src/generateNum.js":
/*!****************************!*\
  !*** ./src/generateNum.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nfunction genereteNum() {\r\n\r\n    const firs = (message) => {\r\n        const num = Math.floor(Math.random() * (10 - 0) + 0)\r\n        console.log(num)\r\n\r\n        return 'break'\r\n       \r\n    }\r\n    \r\n\r\n   \r\n\r\n    const yorn = [firs]\r\n\r\n    return yorn\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genereteNum);\n\n//# sourceURL=webpack://nano_bot/./src/generateNum.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var prompt_sync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prompt-sync */ \"./node_modules/prompt-sync/index.js\");\n/* harmony import */ var prompt_sync__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prompt_sync__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _YesOrNo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YesOrNo */ \"./src/YesOrNo.js\");\n/* harmony import */ var _generateNum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generateNum */ \"./src/generateNum.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst prompt = prompt_sync__WEBPACK_IMPORTED_MODULE_0___default()();\r\n\r\n\r\nconst arrAL = [\r\n    {\r\n        command: [\"yorn\"],\r\n        nextStep:  (0,_YesOrNo__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\r\n    },\r\n    {\r\n        command: [\"num\"],\r\n        nextStep: (0,_generateNum__WEBPACK_IMPORTED_MODULE_2__[\"default\"])()\r\n    },\r\n\r\n]\r\n\r\n\r\n\r\n\r\nclass myBot {\r\n    constructor(user, arrayCommand){\r\n        this.user = user\r\n        this.arrayCommand = arrayCommand\r\n    }\r\n\r\n    \r\n\r\n    start = () => {\r\n            console.log('start term')\r\n            this.loop()\r\n        }\r\n\r\n    loop = (arrCommand = this.arrayCommand) => {\r\n        let message = this.getMessage(this.user)\r\n\r\n        arrCommand.forEach(element => {\r\n            const {command, nextStep} = element\r\n\r\n            if(command.indexOf(message) > -1) {\r\n                this.scene(this.user, nextStep)\r\n            }\r\n        });\r\n\r\n        if(message !== 'exit'){\r\n            this.loop()\r\n        }\r\n        \r\n\r\n    }\r\n\r\n\r\n   \r\n\r\n    getMessage = (user = this.user) => {\r\n        return prompt(user + ': ')\r\n    }\r\n\r\n    exitScene = (message, functn) => {\r\n        if(message === 'exit'){\r\n            return 'exit'\r\n        }\r\n        return functn(message)\r\n    }\r\n        \r\n\r\n    scene = (user, arrfunction) => {\r\n        let sceneExit = false\r\n\r\n        for(const func of arrfunction){\r\n            const message = this.getMessage(user)\r\n\r\n\r\n            const response = this.exitScene(message, func)\r\n\r\n            if(response === 'break'){\r\n                break;\r\n            }\r\n            if(response === 'exit'){\r\n                sceneExit = true\r\n                break\r\n            }\r\n            if(response === \"continue\"){\r\n                this.loop()\r\n            }\r\n        }\r\n\r\n        if(sceneExit){\r\n            console.log(\"bb\")\r\n        }\r\n\r\n    }\r\n\r\n}\r\n\r\nconst firstSession = new myBot('root', arrAL);\r\n\r\n\r\n\r\nfirstSession.start()\r\n\r\n\n\n//# sourceURL=webpack://nano_bot/./src/index.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

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