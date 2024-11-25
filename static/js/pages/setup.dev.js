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

/***/ "./assets/js/pages/setup.js":
/*!**********************************!*\
  !*** ./assets/js/pages/setup.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n__webpack_require__(/*! ./main */ \"./assets/js/pages/main.js\");\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\nvar _dayjs = _interopRequireDefault(__webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\"));\nvar _CTFd = _interopRequireDefault(__webpack_require__(/*! ../CTFd */ \"./assets/js/CTFd.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\nfunction switchTab(event) {\n  event.preventDefault();\n\n  // Handle tab validation\n  var valid_tab = true;\n  (0, _jquery[\"default\"])(event.target).closest(\"[role=tabpanel]\").find(\"input,textarea\").each(function (i, e) {\n    var $e = (0, _jquery[\"default\"])(e);\n    var status = e.checkValidity();\n    if (status === false) {\n      $e.removeClass(\"input-filled-valid\");\n      $e.addClass(\"input-filled-invalid\");\n      valid_tab = false;\n    }\n  });\n  if (valid_tab == false) {\n    return;\n  }\n  var href = (0, _jquery[\"default\"])(event.target).data(\"href\");\n  (0, _jquery[\"default\"])(\".nav a[href=\\\"\".concat(href, \"\\\"]\")).tab(\"show\");\n}\nfunction processDateTime(datetime) {\n  return function (_event) {\n    var date_picker = (0, _jquery[\"default\"])(\"#\".concat(datetime, \"-date\"));\n    var time_picker = (0, _jquery[\"default\"])(\"#\".concat(datetime, \"-time\"));\n    var unix_time = (0, _dayjs[\"default\"])(\"\".concat(date_picker.val(), \" \").concat(time_picker.val()), \"YYYY-MM-DD HH:mm\").unix();\n    if (isNaN(unix_time)) {\n      (0, _jquery[\"default\"])(\"#\".concat(datetime, \"-preview\")).val(\"\");\n    } else {\n      (0, _jquery[\"default\"])(\"#\".concat(datetime, \"-preview\")).val(unix_time);\n    }\n  };\n}\nfunction mlcSetup(_event) {\n  var params = {\n    name: (0, _jquery[\"default\"])(\"#ctf_name\").val(),\n    type: \"jeopardy\",\n    description: (0, _jquery[\"default\"])(\"#ctf_description\").val(),\n    user_mode: (0, _jquery[\"default\"])(\"#user_mode\").val(),\n    event_url: window.location.origin + _CTFd[\"default\"].config.urlRoot,\n    redirect_url: window.location.origin + _CTFd[\"default\"].config.urlRoot + \"/redirect\",\n    integration_setup_url: window.location.origin + _CTFd[\"default\"].config.urlRoot + \"/setup/integrations\",\n    start: (0, _jquery[\"default\"])(\"#start-preview\").val(),\n    end: (0, _jquery[\"default\"])(\"#end-preview\").val(),\n    platform: \"CTFd\",\n    state: window.STATE\n  };\n  var ret = [];\n  for (var p in params) {\n    ret.push(encodeURIComponent(p) + \"=\" + encodeURIComponent(params[p]));\n  }\n  window.open(\"https://www.majorleaguecyber.org/events/new?\" + ret.join(\"&\"), \"_blank\");\n}\n(0, _jquery[\"default\"])(function () {\n  (0, _jquery[\"default\"])(\".tab-next\").click(switchTab);\n  (0, _jquery[\"default\"])(\"input\").on(\"keypress\", function (e) {\n    // Hook Enter button\n    if (e.keyCode == 13) {\n      e.preventDefault();\n      (0, _jquery[\"default\"])(e.target).closest(\".tab-pane\").find(\"button[data-href]\").click();\n    }\n  });\n  (0, _jquery[\"default\"])(\"#integration-mlc\").click(mlcSetup);\n  (0, _jquery[\"default\"])(\"#start-date,#start-time\").change(processDateTime(\"start\"));\n  (0, _jquery[\"default\"])(\"#end-date,#end-time\").change(processDateTime(\"end\"));\n  (0, _jquery[\"default\"])(\"#config-color-picker\").on(\"input\", function (_e) {\n    (0, _jquery[\"default\"])(\"#config-color-input\").val((0, _jquery[\"default\"])(this).val());\n  });\n  (0, _jquery[\"default\"])(\"#config-color-reset\").click(function () {\n    (0, _jquery[\"default\"])(\"#config-color-input\").val(\"\");\n    (0, _jquery[\"default\"])(\"#config-color-picker\").val(\"\");\n  });\n  window.addEventListener(\"storage\", function (event) {\n    if (event.key == \"integrations\" && event.newValue) {\n      var integration = JSON.parse(event.newValue);\n      if (integration[\"name\"] == \"mlc\") {\n        (0, _jquery[\"default\"])(\"#integration-mlc\").text(\"Already Configured\").attr(\"disabled\", true);\n        window.focus();\n        localStorage.removeItem(\"integrations\");\n      }\n    }\n  });\n  (0, _jquery[\"default\"])(\"#setup-form\").submit(function (e) {\n    if ((0, _jquery[\"default\"])(\"#newsletter-checkbox\").prop(\"checked\")) {\n      var email = (0, _jquery[\"default\"])(e.target).find(\"input[name=email]\").val();\n      _jquery[\"default\"].ajax({\n        type: \"POST\",\n        url: \"https://ctfd.us15.list-manage.com/subscribe/post-json?u=6c7fa6feeced52775aec9d015&id=dd1484208e&c=?\",\n        data: {\n          EMAIL: email,\n          subscribe: \"Subscribe\",\n          b_6c7fa6feeced52775aec9d015_dd1484208e: \"\"\n        },\n        dataType: \"jsonp\",\n        contentType: \"application/json; charset=utf-8\"\n      });\n    }\n  });\n});\n\n//# sourceURL=webpack://ctfd/./assets/js/pages/setup.js?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"pages/setup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkctfd"] = self["webpackChunkctfd"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["helpers","vendor","default-assets_js_pages_main_js"], () => (__webpack_require__("./assets/js/pages/setup.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;