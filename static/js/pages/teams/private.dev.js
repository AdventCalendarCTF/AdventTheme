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

/***/ "./assets/js/pages/teams/private.js":
/*!******************************************!*\
  !*** ./assets/js/pages/teams/private.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n__webpack_require__(/*! ../main */ \"./assets/js/pages/main.js\");\nvar _utils = __webpack_require__(/*! ../../utils */ \"./assets/js/utils.js\");\nvar _CTFd = _interopRequireDefault(__webpack_require__(/*! ../../CTFd */ \"./assets/js/CTFd.js\"));\n__webpack_require__(/*! bootstrap/js/dist/modal */ \"./node_modules/bootstrap/js/dist/modal.js\");\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\nvar _ezq = __webpack_require__(/*! ../../ezq */ \"./assets/js/ezq.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\n(0, _jquery[\"default\"])(function () {\n  if (window.team_captain) {\n    (0, _jquery[\"default\"])(\".edit-team\").click(function () {\n      (0, _jquery[\"default\"])(\"#team-edit-modal\").modal();\n    });\n    (0, _jquery[\"default\"])(\".edit-captain\").click(function () {\n      (0, _jquery[\"default\"])(\"#team-captain-modal\").modal();\n    });\n    (0, _jquery[\"default\"])(\".invite-members\").click(function () {\n      _CTFd[\"default\"].fetch(\"/api/v1/teams/me/members\", {\n        method: \"POST\",\n        credentials: \"same-origin\",\n        headers: {\n          Accept: \"application/json\",\n          \"Content-Type\": \"application/json\"\n        }\n      }).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n        if (response.success) {\n          var code = response.data.code;\n          var url = \"\".concat(window.location.origin).concat(_CTFd[\"default\"].config.urlRoot, \"/teams/invite?code=\").concat(code);\n          (0, _jquery[\"default\"])(\"#team-invite-modal input[name=link]\").val(url);\n          (0, _jquery[\"default\"])(\"#team-invite-modal\").modal();\n        }\n      });\n    });\n    (0, _jquery[\"default\"])(\"#team-invite-link-copy\").click(function (event) {\n      (0, _utils.copyToClipboard)(event, \"#team-invite-link\");\n    });\n    (0, _jquery[\"default\"])(\".disband-team\").click(function () {\n      (0, _ezq.ezQuery)({\n        title: \"Disband Team\",\n        body: \"Are you sure you want to disband your team?\",\n        success: function success() {\n          _CTFd[\"default\"].fetch(\"/api/v1/teams/me\", {\n            method: \"DELETE\"\n          }).then(function (response) {\n            return response.json();\n          }).then(function (response) {\n            if (response.success) {\n              window.location.reload();\n            } else {\n              (0, _ezq.ezAlert)({\n                title: \"Error\",\n                body: response.errors[\"\"].join(\" \"),\n                button: \"Got it!\"\n              });\n            }\n          });\n        }\n      });\n    });\n  }\n  var form = (0, _jquery[\"default\"])(\"#team-info-form\");\n  form.submit(function (e) {\n    e.preventDefault();\n    (0, _jquery[\"default\"])(\"#results\").empty();\n    var params = (0, _jquery[\"default\"])(this).serializeJSON();\n    params.fields = [];\n    for (var property in params) {\n      if (property.match(/fields\\[\\d+\\]/)) {\n        var field = {};\n        var id = parseInt(property.slice(7, -1));\n        field[\"field_id\"] = id;\n        field[\"value\"] = params[property];\n        params.fields.push(field);\n        delete params[property];\n      }\n    }\n    var method = \"PATCH\";\n    var url = \"/api/v1/teams/me\";\n    _CTFd[\"default\"].fetch(url, {\n      method: method,\n      credentials: \"same-origin\",\n      headers: {\n        Accept: \"application/json\",\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify(params)\n    }).then(function (response) {\n      if (response.status === 400) {\n        response.json().then(function (object) {\n          if (!object.success) {\n            var error_template = '<div class=\"alert alert-danger alert-dismissable\" role=\"alert\">\\n' + '  <span class=\"sr-only\">Error:</span>\\n' + \"  {0}\\n\" + '  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\\n' + \"</div>\";\n            Object.keys(object.errors).map(function (error) {\n              var i = form.find(\"input[name={0}]\".format(error));\n              var input = (0, _jquery[\"default\"])(i);\n              input.addClass(\"input-filled-invalid\");\n              input.removeClass(\"input-filled-valid\");\n              var error_msg = object.errors[error];\n              var alert = error_template.format(error_msg);\n              (0, _jquery[\"default\"])(\"#results\").append(alert);\n            });\n          }\n        });\n      } else if (response.status === 200) {\n        response.json().then(function (object) {\n          if (object.success) {\n            window.location.reload();\n          }\n        });\n      }\n    });\n  });\n  (0, _jquery[\"default\"])(\"#team-captain-form\").submit(function (e) {\n    e.preventDefault();\n    var params = (0, _jquery[\"default\"])(\"#team-captain-form\").serializeJSON(true);\n    _CTFd[\"default\"].fetch(\"/api/v1/teams/me\", {\n      method: \"PATCH\",\n      credentials: \"same-origin\",\n      headers: {\n        Accept: \"application/json\",\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify(params)\n    }).then(function (response) {\n      return response.json();\n    }).then(function (response) {\n      if (response.success) {\n        window.location.reload();\n      } else {\n        (0, _jquery[\"default\"])(\"#team-captain-form > #results\").empty();\n        Object.keys(response.errors).forEach(function (key, _index) {\n          (0, _jquery[\"default\"])(\"#team-captain-form > #results\").append((0, _ezq.ezBadge)({\n            type: \"error\",\n            body: response.errors[key]\n          }));\n          var i = (0, _jquery[\"default\"])(\"#team-captain-form\").find(\"select[name={0}]\".format(key));\n          var input = (0, _jquery[\"default\"])(i);\n          input.addClass(\"input-filled-invalid\");\n          input.removeClass(\"input-filled-valid\");\n        });\n      }\n    });\n  });\n});\n\n//# sourceURL=webpack://ctfd/./assets/js/pages/teams/private.js?");

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
/******/ 			"pages/teams/private": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["helpers","vendor","default-assets_js_pages_main_js"], () => (__webpack_require__("./assets/js/pages/teams/private.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;