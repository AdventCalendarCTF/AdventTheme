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

/***/ "./assets/js/graphs.js":
/*!*****************************!*\
  !*** ./assets/js/graphs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.createGraph = createGraph;\nexports.disposeGraph = disposeGraph;\nexports.updateGraph = updateGraph;\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\nvar _echarts = _interopRequireDefault(__webpack_require__(/*! echarts/dist/echarts.common */ \"./node_modules/echarts/dist/echarts.common.js\"));\nvar _dayjs = _interopRequireDefault(__webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\"));\nvar _utils = __webpack_require__(/*! ./utils */ \"./assets/js/utils.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\nvar graph_configs = {\n  score_graph: {\n    format: function format(type, id, name, _account_id, responses) {\n      var option = {\n        title: {\n          left: \"center\",\n          text: \"Score over Time\"\n        },\n        tooltip: {\n          trigger: \"axis\",\n          axisPointer: {\n            type: \"cross\"\n          }\n        },\n        legend: {\n          type: \"scroll\",\n          orient: \"horizontal\",\n          align: \"left\",\n          bottom: 0,\n          data: [name]\n        },\n        toolbox: {\n          feature: {\n            saveAsImage: {}\n          }\n        },\n        grid: {\n          containLabel: true\n        },\n        xAxis: [{\n          type: \"category\",\n          boundaryGap: false,\n          data: []\n        }],\n        yAxis: [{\n          type: \"value\"\n        }],\n        dataZoom: [{\n          id: \"dataZoomX\",\n          type: \"slider\",\n          xAxisIndex: [0],\n          filterMode: \"filter\",\n          height: 20,\n          top: 35,\n          fillerColor: \"rgba(233, 236, 241, 0.4)\"\n        }],\n        series: []\n      };\n      var times = [];\n      var scores = [];\n      var solves = responses[0].data;\n      var awards = responses[2].data;\n      var total = solves.concat(awards);\n      total.sort(function (a, b) {\n        return new Date(a.date) - new Date(b.date);\n      });\n      for (var i = 0; i < total.length; i++) {\n        var date = (0, _dayjs[\"default\"])(total[i].date);\n        times.push(date.toDate());\n        try {\n          scores.push(total[i].challenge.value);\n        } catch (e) {\n          scores.push(total[i].value);\n        }\n      }\n      times.forEach(function (time) {\n        option.xAxis[0].data.push(time);\n      });\n      option.series.push({\n        name: window.stats_data.name,\n        type: \"line\",\n        label: {\n          normal: {\n            show: true,\n            position: \"top\"\n          }\n        },\n        areaStyle: {\n          normal: {\n            color: (0, _utils.colorHash)(name + id)\n          }\n        },\n        itemStyle: {\n          normal: {\n            color: (0, _utils.colorHash)(name + id)\n          }\n        },\n        data: (0, _utils.cumulativeSum)(scores)\n      });\n      return option;\n    }\n  },\n  category_breakdown: {\n    format: function format(type, id, name, account_id, responses) {\n      var option = {\n        title: {\n          left: \"center\",\n          text: \"Category Breakdown\"\n        },\n        tooltip: {\n          trigger: \"item\"\n        },\n        toolbox: {\n          show: true,\n          feature: {\n            saveAsImage: {}\n          }\n        },\n        legend: {\n          type: \"scroll\",\n          orient: \"vertical\",\n          top: \"middle\",\n          right: 0,\n          data: []\n        },\n        series: [{\n          name: \"Category Breakdown\",\n          type: \"pie\",\n          radius: [\"30%\", \"50%\"],\n          avoidLabelOverlap: false,\n          label: {\n            show: false,\n            position: \"center\"\n          },\n          itemStyle: {\n            normal: {\n              label: {\n                show: true,\n                formatter: function formatter(data) {\n                  return \"\".concat(data.percent, \"% (\").concat(data.value, \")\");\n                }\n              },\n              labelLine: {\n                show: true\n              }\n            },\n            emphasis: {\n              label: {\n                show: true,\n                position: \"center\",\n                textStyle: {\n                  fontSize: \"14\",\n                  fontWeight: \"normal\"\n                }\n              }\n            }\n          },\n          emphasis: {\n            label: {\n              show: true,\n              fontSize: \"30\",\n              fontWeight: \"bold\"\n            }\n          },\n          labelLine: {\n            show: false\n          },\n          data: []\n        }]\n      };\n      var solves = responses[0].data;\n      var categories = [];\n      for (var i = 0; i < solves.length; i++) {\n        categories.push(solves[i].challenge.category);\n      }\n      var keys = categories.filter(function (elem, pos) {\n        return categories.indexOf(elem) == pos;\n      });\n      var counts = [];\n      for (var _i = 0; _i < keys.length; _i++) {\n        var count = 0;\n        for (var x = 0; x < categories.length; x++) {\n          if (categories[x] == keys[_i]) {\n            count++;\n          }\n        }\n        counts.push(count);\n      }\n      keys.forEach(function (category, index) {\n        option.legend.data.push(category);\n        option.series[0].data.push({\n          value: counts[index],\n          name: category,\n          itemStyle: {\n            color: (0, _utils.colorHash)(category)\n          }\n        });\n      });\n      return option;\n    }\n  },\n  solve_percentages: {\n    format: function format(type, id, name, account_id, responses) {\n      var solves_count = responses[0].data.length;\n      var fails_count = responses[1].meta.count;\n      var option = {\n        title: {\n          left: \"center\",\n          text: \"Solve Percentages\"\n        },\n        tooltip: {\n          trigger: \"item\"\n        },\n        toolbox: {\n          show: true,\n          feature: {\n            saveAsImage: {}\n          }\n        },\n        legend: {\n          orient: \"vertical\",\n          top: \"middle\",\n          right: 0,\n          data: [\"Fails\", \"Solves\"]\n        },\n        series: [{\n          name: \"Solve Percentages\",\n          type: \"pie\",\n          radius: [\"30%\", \"50%\"],\n          avoidLabelOverlap: false,\n          label: {\n            show: false,\n            position: \"center\"\n          },\n          itemStyle: {\n            normal: {\n              label: {\n                show: true,\n                formatter: function formatter(data) {\n                  return \"\".concat(data.name, \" - \").concat(data.value, \" (\").concat(data.percent, \"%)\");\n                }\n              },\n              labelLine: {\n                show: true\n              }\n            },\n            emphasis: {\n              label: {\n                show: true,\n                position: \"center\",\n                textStyle: {\n                  fontSize: \"14\",\n                  fontWeight: \"normal\"\n                }\n              }\n            }\n          },\n          emphasis: {\n            label: {\n              show: true,\n              fontSize: \"30\",\n              fontWeight: \"bold\"\n            }\n          },\n          labelLine: {\n            show: false\n          },\n          data: [{\n            value: fails_count,\n            name: \"Fails\",\n            itemStyle: {\n              color: \"rgb(207, 38, 0)\"\n            }\n          }, {\n            value: solves_count,\n            name: \"Solves\",\n            itemStyle: {\n              color: \"rgb(0, 209, 64)\"\n            }\n          }]\n        }]\n      };\n      return option;\n    }\n  }\n};\nfunction createGraph(graph_type, target, data, type, id, name, account_id) {\n  var cfg = graph_configs[graph_type];\n  var chart = _echarts[\"default\"].init(document.querySelector(target));\n  chart.setOption(cfg.format(type, id, name, account_id, data));\n  (0, _jquery[\"default\"])(window).on(\"resize\", function () {\n    if (chart != null && chart != undefined) {\n      chart.resize();\n    }\n  });\n}\nfunction updateGraph(graph_type, target, data, type, id, name, account_id) {\n  var cfg = graph_configs[graph_type];\n  var chart = _echarts[\"default\"].init(document.querySelector(target));\n  chart.setOption(cfg.format(type, id, name, account_id, data));\n}\nfunction disposeGraph(target) {\n  _echarts[\"default\"].dispose(document.querySelector(target));\n}\n\n//# sourceURL=webpack://ctfd/./assets/js/graphs.js?");

/***/ }),

/***/ "./assets/js/pages/stats.js":
/*!**********************************!*\
  !*** ./assets/js/pages/stats.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n__webpack_require__(/*! ./main */ \"./assets/js/pages/main.js\");\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\nvar _CTFd = _interopRequireDefault(__webpack_require__(/*! ../CTFd */ \"./assets/js/CTFd.js\"));\nvar _graphs = __webpack_require__(/*! ../graphs */ \"./assets/js/graphs.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\nvar api_funcs = {\n  team: [function (x) {\n    return _CTFd[\"default\"].api.get_team_solves({\n      teamId: x\n    });\n  }, function (x) {\n    return _CTFd[\"default\"].api.get_team_fails({\n      teamId: x\n    });\n  }, function (x) {\n    return _CTFd[\"default\"].api.get_team_awards({\n      teamId: x\n    });\n  }],\n  user: [function (x) {\n    return _CTFd[\"default\"].api.get_user_solves({\n      userId: x\n    });\n  }, function (x) {\n    return _CTFd[\"default\"].api.get_user_fails({\n      userId: x\n    });\n  }, function (x) {\n    return _CTFd[\"default\"].api.get_user_awards({\n      userId: x\n    });\n  }]\n};\nvar createGraphs = function createGraphs(type, id, name, account_id) {\n  var _api_funcs$type = _slicedToArray(api_funcs[type], 3),\n    solves_func = _api_funcs$type[0],\n    fails_func = _api_funcs$type[1],\n    awards_func = _api_funcs$type[2];\n  Promise.all([solves_func(account_id), fails_func(account_id), awards_func(account_id)]).then(function (responses) {\n    (0, _graphs.createGraph)(\"score_graph\", \"#score-graph\", responses, type, id, name, account_id);\n    (0, _graphs.createGraph)(\"category_breakdown\", \"#categories-pie-graph\", responses, type, id, name, account_id);\n    (0, _graphs.createGraph)(\"solve_percentages\", \"#keys-pie-graph\", responses, type, id, name, account_id);\n  });\n};\nvar updateGraphs = function updateGraphs(type, id, name, account_id) {\n  var _api_funcs$type2 = _slicedToArray(api_funcs[type], 3),\n    solves_func = _api_funcs$type2[0],\n    fails_func = _api_funcs$type2[1],\n    awards_func = _api_funcs$type2[2];\n  Promise.all([solves_func(account_id), fails_func(account_id), awards_func(account_id)]).then(function (responses) {\n    (0, _graphs.updateGraph)(\"score_graph\", \"#score-graph\", responses, type, id, name, account_id);\n    (0, _graphs.updateGraph)(\"category_breakdown\", \"#categories-pie-graph\", responses, type, id, name, account_id);\n    (0, _graphs.updateGraph)(\"solve_percentages\", \"#keys-pie-graph\", responses, type, id, name, account_id);\n  });\n};\n(0, _jquery[\"default\"])(function () {\n  var type, id, name, account_id;\n  var _window$stats_data = window.stats_data;\n  type = _window$stats_data.type;\n  id = _window$stats_data.id;\n  name = _window$stats_data.name;\n  account_id = _window$stats_data.account_id;\n  createGraphs(type, id, name, account_id);\n  setInterval(function () {\n    updateGraphs(type, id, name, account_id);\n  }, 300000);\n});\n\n//# sourceURL=webpack://ctfd/./assets/js/pages/stats.js?");

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
/******/ 			"pages/stats": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["helpers","echarts","vendor","default-assets_js_pages_main_js"], () => (__webpack_require__("./assets/js/pages/stats.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;