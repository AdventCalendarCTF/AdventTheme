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

/***/ "./assets/js/pages/scoreboard.js":
/*!***************************************!*\
  !*** ./assets/js/pages/scoreboard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{\n\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n__webpack_require__(/*! ./main */ \"./assets/js/pages/main.js\");\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\nvar _CTFd = _interopRequireDefault(__webpack_require__(/*! ../CTFd */ \"./assets/js/CTFd.js\"));\nvar echarts = _interopRequireWildcard(__webpack_require__(/*! echarts/dist/echarts.common */ \"./node_modules/echarts/dist/echarts.common.js\"));\nvar _dayjs = _interopRequireDefault(__webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\"));\nvar _utils = __webpack_require__(/*! ../utils */ \"./assets/js/utils.js\");\nfunction _interopRequireWildcard(e, t) { if (\"function\" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, \"default\": e }; if (null === e || \"object\" != _typeof(e) && \"function\" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) \"default\" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\nvar graph = (0, _jquery[\"default\"])(\"#score-graph\");\nvar table = (0, _jquery[\"default\"])(\"#scoreboard tbody\");\nvar updateScores = function updateScores() {\n  _CTFd[\"default\"].api.get_scoreboard_list().then(function (response) {\n    var teams = response.data;\n    table.empty();\n    for (var i = 0; i < teams.length; i++) {\n      var row = [\"<tr>\", '<th scope=\"row\" class=\"text-center\">', i + 1, \"</th>\", '<td><a href=\"{0}/teams/{1}\">'.format(_CTFd[\"default\"].config.urlRoot, teams[i].account_id), (0, _utils.htmlEntities)(teams[i].name), \"</a></td>\", \"<td>\", teams[i].score, \"</td>\", \"</tr>\"].join(\"\");\n      table.append(row);\n    }\n  });\n};\nvar buildGraphData = function buildGraphData() {\n  return _CTFd[\"default\"].api.get_scoreboard_detail({\n    count: 10\n  }).then(function (response) {\n    var places = response.data;\n    var teams = Object.keys(places);\n    if (teams.length === 0) {\n      return false;\n    }\n    var option = {\n      title: {\n        left: \"center\",\n        text: \"Top 10 \" + (_CTFd[\"default\"].config.userMode === \"teams\" ? \"Teams\" : \"Users\")\n      },\n      tooltip: {\n        trigger: \"axis\",\n        axisPointer: {\n          type: \"cross\"\n        }\n      },\n      legend: {\n        type: \"scroll\",\n        orient: \"horizontal\",\n        align: \"left\",\n        bottom: 35,\n        data: []\n      },\n      toolbox: {\n        feature: {\n          dataZoom: {\n            yAxisIndex: \"none\"\n          },\n          saveAsImage: {}\n        }\n      },\n      grid: {\n        containLabel: true\n      },\n      xAxis: [{\n        type: \"time\",\n        boundaryGap: false,\n        data: []\n      }],\n      yAxis: [{\n        type: \"value\"\n      }],\n      dataZoom: [{\n        id: \"dataZoomX\",\n        type: \"slider\",\n        xAxisIndex: [0],\n        filterMode: \"filter\",\n        height: 20,\n        top: 35,\n        fillerColor: \"rgba(233, 236, 241, 0.4)\"\n      }],\n      series: []\n    };\n    var _loop = function _loop() {\n        var team_score = [];\n        var times = [];\n        for (var j = 0; j < places[teams[i]][\"solves\"].length; j++) {\n          team_score.push(places[teams[i]][\"solves\"][j].value);\n          var date = (0, _dayjs[\"default\"])(places[teams[i]][\"solves\"][j].date);\n          times.push(date.toDate());\n        }\n        var total_scores = (0, _utils.cumulativeSum)(team_score);\n        scores = times.map(function (e, i) {\n          return [e, total_scores[i]];\n        });\n        option.legend.data.push(places[teams[i]][\"name\"]);\n        var data = {\n          name: places[teams[i]][\"name\"],\n          type: \"line\",\n          label: {\n            position: \"top\"\n          },\n          itemStyle: {\n            color: (0, _utils.colorHash)(places[teams[i]][\"name\"] + places[teams[i]][\"id\"])\n          },\n          data: scores\n        };\n        option.series.push(data);\n      },\n      scores;\n    for (var i = 0; i < teams.length; i++) {\n      _loop();\n    }\n    return option;\n  });\n};\nvar createGraph = function createGraph() {\n  buildGraphData().then(function (option) {\n    if (option === false) {\n      // Replace spinner\n      graph.html('<h3 class=\"opacity-50 text-center w-100 justify-content-center align-self-center\">No solves yet</h3>');\n      return;\n    }\n    graph.empty(); // Remove spinners\n    var chart = echarts.init(document.querySelector(\"#score-graph\"));\n    chart.setOption(option);\n    (0, _jquery[\"default\"])(window).on(\"resize\", function () {\n      if (chart != null && chart != undefined) {\n        chart.resize();\n      }\n    });\n  });\n};\nvar updateGraph = function updateGraph() {\n  buildGraphData().then(function (option) {\n    var chart = echarts.init(document.querySelector(\"#score-graph\"));\n    chart.setOption(option);\n  });\n};\nfunction update() {\n  updateScores();\n  updateGraph();\n}\n(0, _jquery[\"default\"])(function () {\n  setInterval(update, 300000); // Update scores every 5 minutes\n  createGraph();\n});\nwindow.updateScoreboard = update;\n\n//# sourceURL=webpack://ctfd/./assets/js/pages/scoreboard.js?\n}");

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
/******/ 			"pages/scoreboard": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["helpers","echarts","vendor","default-assets_js_pages_main_js"], () => (__webpack_require__("./assets/js/pages/scoreboard.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;