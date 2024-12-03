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

/***/ "./assets/js/pages/challenges.js":
/*!***************************************!*\
  !*** ./assets/js/pages/challenges.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n__webpack_require__(/*! ./main */ \"./assets/js/pages/main.js\");\n__webpack_require__(/*! bootstrap/js/dist/tab */ \"./node_modules/bootstrap/js/dist/tab.js\");\nvar _ezq = __webpack_require__(/*! ../ezq */ \"./assets/js/ezq.js\");\nvar _utils = __webpack_require__(/*! ../utils */ \"./assets/js/utils.js\");\nvar _dayjs = _interopRequireDefault(__webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\"));\nvar _relativeTime = _interopRequireDefault(__webpack_require__(/*! dayjs/plugin/relativeTime */ \"./node_modules/dayjs/plugin/relativeTime.js\"));\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\"));\nvar _CTFd = _interopRequireDefault(__webpack_require__(/*! ../CTFd */ \"./assets/js/CTFd.js\"));\nvar _config = _interopRequireDefault(__webpack_require__(/*! ../config */ \"./assets/js/config.js\"));\nvar _highlight = _interopRequireDefault(__webpack_require__(/*! highlight.js */ \"./node_modules/highlight.js/lib/index.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n_dayjs[\"default\"].extend(_relativeTime[\"default\"]);\n_CTFd[\"default\"]._internal.challenge = {};\nvar challenges = [];\nvar solves = [];\nvar loadChal = function loadChal(id) {\n  var chal = _jquery[\"default\"].grep(challenges, function (chal) {\n    return chal.id == id;\n  })[0];\n  if (chal.type === \"hidden\") {\n    (0, _ezq.ezAlert)({\n      title: \"Challenge Hidden!\",\n      body: \"You haven't unlocked this challenge yet!\",\n      button: \"Got it!\"\n    });\n    return;\n  }\n  displayChal(chal);\n};\nvar loadChalByName = function loadChalByName(name) {\n  var idx = name.lastIndexOf(\"-\");\n  var pieces = [name.slice(0, idx), name.slice(idx + 1)];\n  var id = pieces[1];\n  var chal = _jquery[\"default\"].grep(challenges, function (chal) {\n    return chal.id == id;\n  })[0];\n  displayChal(chal);\n};\nvar displayChal = function displayChal(chal) {\n  return Promise.all([_CTFd[\"default\"].api.get_challenge({\n    challengeId: chal.id\n  }), _jquery[\"default\"].getScript(_config[\"default\"].urlRoot + chal.script), _jquery[\"default\"].get(_config[\"default\"].urlRoot + chal.template)]).then(function (responses) {\n    var challenge = _CTFd[\"default\"]._internal.challenge;\n    (0, _jquery[\"default\"])(\"#challenge-window\").empty();\n\n    // Inject challenge data into the plugin\n    challenge.data = responses[0].data;\n\n    // Call preRender function in plugin\n    challenge.preRender();\n\n    // Build HTML from the Jinja response in API\n    (0, _jquery[\"default\"])(\"#challenge-window\").append(responses[0].data.view);\n    (0, _jquery[\"default\"])(\"#challenge-window #challenge-input\").addClass(\"form-control\");\n    (0, _jquery[\"default\"])(\"#challenge-window #challenge-submit\").addClass(\"btn btn-md btn-outline-secondary float-right\");\n    var modal = (0, _jquery[\"default\"])(\"#challenge-window\").find(\".modal-dialog\");\n    if (window.init.theme_settings && window.init.theme_settings.challenge_window_size) {\n      switch (window.init.theme_settings.challenge_window_size) {\n        case \"sm\":\n          modal.addClass(\"modal-sm\");\n          break;\n        case \"lg\":\n          modal.addClass(\"modal-lg\");\n          break;\n        case \"xl\":\n          modal.addClass(\"modal-xl\");\n          break;\n        default:\n          break;\n      }\n    }\n    (0, _jquery[\"default\"])(\".challenge-solves\").click(function (_event) {\n      getSolves((0, _jquery[\"default\"])(\"#challenge-id\").val());\n    });\n    (0, _jquery[\"default\"])(\".nav-tabs a\").click(function (event) {\n      event.preventDefault();\n      (0, _jquery[\"default\"])(this).tab(\"show\");\n    });\n\n    // Handle modal toggling\n    (0, _jquery[\"default\"])(\"#challenge-window\").on(\"hide.bs.modal\", function (_event) {\n      (0, _jquery[\"default\"])(\"#challenge-input\").removeClass(\"wrong\");\n      (0, _jquery[\"default\"])(\"#challenge-input\").removeClass(\"correct\");\n      (0, _jquery[\"default\"])(\"#incorrect-key\").slideUp();\n      (0, _jquery[\"default\"])(\"#correct-key\").slideUp();\n      (0, _jquery[\"default\"])(\"#already-solved\").slideUp();\n      (0, _jquery[\"default\"])(\"#too-fast\").slideUp();\n    });\n    (0, _jquery[\"default\"])(\".load-hint\").on(\"click\", function (_event) {\n      loadHint((0, _jquery[\"default\"])(this).data(\"hint-id\"));\n    });\n    (0, _jquery[\"default\"])(\"#challenge-submit\").click(function (event) {\n      event.preventDefault();\n      (0, _jquery[\"default\"])(\"#challenge-submit\").addClass(\"disabled-button\");\n      (0, _jquery[\"default\"])(\"#challenge-submit\").prop(\"disabled\", true);\n      _CTFd[\"default\"]._internal.challenge.submit().then(renderSubmissionResponse).then(loadChals).then(markSolves);\n    });\n    (0, _jquery[\"default\"])(\"#challenge-input\").keyup(function (event) {\n      if (event.keyCode == 13) {\n        (0, _jquery[\"default\"])(\"#challenge-submit\").click();\n      }\n    });\n    challenge.postRender();\n    (0, _jquery[\"default\"])(\"#challenge-window\").find(\"pre code\").each(function (_idx) {\n      _highlight[\"default\"].highlightBlock(this);\n    });\n    window.location.replace(window.location.href.split(\"#\")[0] + \"#\".concat(chal.name, \"-\").concat(chal.id));\n    (0, _jquery[\"default\"])(\"#challenge-window\").modal();\n  });\n};\nfunction renderSubmissionResponse(response) {\n  var result = response.data;\n  var result_message = (0, _jquery[\"default\"])(\"#result-message\");\n  var result_notification = (0, _jquery[\"default\"])(\"#result-notification\");\n  var answer_input = (0, _jquery[\"default\"])(\"#challenge-input\");\n  result_notification.removeClass();\n  result_message.text(result.message);\n  if (result.status === \"authentication_required\") {\n    window.location = _CTFd[\"default\"].config.urlRoot + \"/login?next=\" + _CTFd[\"default\"].config.urlRoot + window.location.pathname + window.location.hash;\n    return;\n  } else if (result.status === \"incorrect\") {\n    // Incorrect key\n    result_notification.addClass(\"alert alert-danger alert-dismissable text-center\");\n    result_notification.slideDown();\n    answer_input.removeClass(\"correct\");\n    answer_input.addClass(\"wrong\");\n    setTimeout(function () {\n      answer_input.removeClass(\"wrong\");\n    }, 3000);\n  } else if (result.status === \"correct\") {\n    // Challenge Solved\n    result_notification.addClass(\"alert alert-success alert-dismissable text-center\");\n    result_notification.slideDown();\n    if ((0, _jquery[\"default\"])(\".challenge-solves\").text().trim()) {\n      // Only try to increment solves if the text isn't hidden\n      (0, _jquery[\"default\"])(\".challenge-solves\").text(parseInt((0, _jquery[\"default\"])(\".challenge-solves\").text().split(\" \")[0]) + 1 + \" Solves\");\n    }\n    answer_input.val(\"\");\n    answer_input.removeClass(\"wrong\");\n    answer_input.addClass(\"correct\");\n  } else if (result.status === \"already_solved\") {\n    // Challenge already solved\n    result_notification.addClass(\"alert alert-info alert-dismissable text-center\");\n    result_notification.slideDown();\n    answer_input.addClass(\"correct\");\n  } else if (result.status === \"paused\") {\n    // CTF is paused\n    result_notification.addClass(\"alert alert-warning alert-dismissable text-center\");\n    result_notification.slideDown();\n  } else if (result.status === \"ratelimited\") {\n    // Keys per minute too high\n    result_notification.addClass(\"alert alert-warning alert-dismissable text-center\");\n    result_notification.slideDown();\n    answer_input.addClass(\"too-fast\");\n    setTimeout(function () {\n      answer_input.removeClass(\"too-fast\");\n    }, 3000);\n  }\n  setTimeout(function () {\n    (0, _jquery[\"default\"])(\".alert\").slideUp();\n    (0, _jquery[\"default\"])(\"#challenge-submit\").removeClass(\"disabled-button\");\n    (0, _jquery[\"default\"])(\"#challenge-submit\").prop(\"disabled\", false);\n  }, 3000);\n}\nfunction markSolves() {\n  challenges.map(function (challenge) {\n    if (challenge.solved_by_me) {\n      var btn = (0, _jquery[\"default\"])(\"button[value=\\\"\".concat(challenge.id, \"\\\"]\"));\n      btn.addClass(\"solved-challenge\");\n      btn.prepend(\"<i class='fas fa-check corner-button-check'></i>\");\n    }\n  });\n}\nfunction getSolves(id) {\n  return _CTFd[\"default\"].api.get_challenge_solves({\n    challengeId: id\n  }).then(function (response) {\n    var data = response.data;\n    (0, _jquery[\"default\"])(\".challenge-solves\").text(parseInt(data.length) + \" Solves\");\n    var box = (0, _jquery[\"default\"])(\"#challenge-solves-names\");\n    box.empty();\n    for (var i = 0; i < data.length; i++) {\n      var _id = data[i].account_id;\n      var name = data[i].name;\n      var date = (0, _dayjs[\"default\"])(data[i].date).fromNow();\n      var account_url = data[i].account_url;\n      box.append('<tr><td><a href=\"{0}\">{2}</td><td>{3}</td></tr>'.format(account_url, _id, (0, _utils.htmlEntities)(name), date));\n    }\n  });\n}\nfunction loadChals() {\n  return _CTFd[\"default\"].api.get_challenge_list().then(function (response) {\n    var $challenges_board = (0, _jquery[\"default\"])(\"#chal-calendar\");\n    challenges = response.data;\n    $challenges_board.empty();\n    drawCalendar(\"chal-calendar\");\n    for (var i = 0; i <= challenges.length - 1; i++) {\n      var chalinfo = challenges[i];\n      var advcal_chalbutton = void 0;\n      if (solves.indexOf(chalinfo.id) == -1) {\n        advcal_chalbutton = \"<button class='btn btn-dark challenge-button w-100 text-truncate pt-3 pb-3 chal-pending' value='{0}'>\".format(chalinfo.id);\n      } else {\n        advcal_chalbutton = \"<button class='btn btn-success challenge-button w-100 text-truncate pt-3 pb-3 chal-completed' value='{0}'>\".format(chalinfo.id);\n      }\n\n      /* Pour le calendrier de l'avent */\n      var _iterator = _createForOfIteratorHelper(chalinfo.tags),\n        _step;\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var tag = _step.value;\n          if (tag.value.startsWith(\"day-\")) {\n            var advcal_el = (0, _jquery[\"default\"])('#cal-chal-' + tag.value)[0];\n            var advcal_day = advcal_el.innerText;\n            advcal_el.innerHTML = advcal_chalbutton + advcal_day + \"</button>\";\n          }\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n    }\n    (0, _jquery[\"default\"])(\".challenge-button\").click(function (_event) {\n      loadChal(this.value);\n    });\n  });\n}\nfunction update() {\n  return loadChals().then(markSolves);\n}\n(0, _jquery[\"default\"])(function () {\n  update().then(function () {\n    if (window.location.hash.length > 0) {\n      loadChalByName(decodeURIComponent(window.location.hash.substring(1)));\n    }\n  });\n  (0, _jquery[\"default\"])(\"#challenge-input\").keyup(function (event) {\n    if (event.keyCode == 13) {\n      (0, _jquery[\"default\"])(\"#challenge-submit\").click();\n    }\n  });\n  (0, _jquery[\"default\"])(\".nav-tabs a\").click(function (event) {\n    event.preventDefault();\n    (0, _jquery[\"default\"])(this).tab(\"show\");\n  });\n  (0, _jquery[\"default\"])(\"#challenge-window\").on(\"hidden.bs.modal\", function (_event) {\n    (0, _jquery[\"default\"])(\".nav-tabs a:first\").tab(\"show\");\n    history.replaceState(\"\", window.document.title, window.location.pathname);\n  });\n  (0, _jquery[\"default\"])(\".challenge-solves\").click(function (_event) {\n    getSolves((0, _jquery[\"default\"])(\"#challenge-id\").val());\n  });\n  (0, _jquery[\"default\"])(\"#challenge-window\").on(\"hide.bs.modal\", function (_event) {\n    (0, _jquery[\"default\"])(\"#challenge-input\").removeClass(\"wrong\");\n    (0, _jquery[\"default\"])(\"#challenge-input\").removeClass(\"correct\");\n    (0, _jquery[\"default\"])(\"#incorrect-key\").slideUp();\n    (0, _jquery[\"default\"])(\"#correct-key\").slideUp();\n    (0, _jquery[\"default\"])(\"#already-solved\").slideUp();\n    (0, _jquery[\"default\"])(\"#too-fast\").slideUp();\n  });\n});\nsetInterval(update, 300000); // Update every 5 minutes.\n\nvar displayHint = function displayHint(data) {\n  (0, _ezq.ezAlert)({\n    title: \"Hint\",\n    body: data.html,\n    button: \"Got it!\"\n  });\n};\nvar displayUnlock = function displayUnlock(id) {\n  (0, _ezq.ezQuery)({\n    title: \"Unlock Hint?\",\n    body: \"Are you sure you want to open this hint?\",\n    success: function success() {\n      var params = {\n        target: id,\n        type: \"hints\"\n      };\n      _CTFd[\"default\"].api.post_unlock_list({}, params).then(function (response) {\n        if (response.success) {\n          _CTFd[\"default\"].api.get_hint({\n            hintId: id\n          }).then(function (response) {\n            displayHint(response.data);\n          });\n          return;\n        }\n        (0, _ezq.ezAlert)({\n          title: \"Error\",\n          body: response.errors.score,\n          button: \"Got it!\"\n        });\n      });\n    }\n  });\n};\nvar loadHint = function loadHint(id) {\n  _CTFd[\"default\"].api.get_hint({\n    hintId: id\n  }).then(function (response) {\n    if (response.data.content) {\n      displayHint(response.data);\n      return;\n    }\n    displayUnlock(id);\n  });\n};\nwindow.updateChallengeBoard = update;\n/* Partie pour le calendrier de l'avent*/\nif (window.init.theme_settings === undefined || window.init.theme_settings == null) window.init.theme_settings = {};\nif (window.init.theme_settings.yearOfCalendar === undefined) {\n  window.init.theme_settings.yearOfCalendar = \"2023\";\n}\nif (window.init.theme_settings.monthOfCalendar === undefined) {\n  window.init.theme_settings.monthOfCalendar = \"12\";\n}\nif (window.init.theme_settings.lastDayOfCalendar === undefined) {\n  window.init.theme_settings.lastDayOfCalendar = \"24\";\n}\nif (window.init.theme_settings.challOnWE === undefined) {\n  window.init.theme_settings.challOnWE = \"false\";\n}\nvar drawCalendar = function drawCalendar(id) {\n  var first_december = new Date(window.init.theme_settings.yearOfCalendar, window.init.theme_settings.monthOfCalendar - 1, 1); // Attention le mois est indexé à partir de 0\n  var last_day = new Date(window.init.theme_settings.yearOfCalendar, window.init.theme_settings.monthOfCalendar, 0).getDate();\n  var current_day = 1;\n  var week = 2;\n  var html_cal = '<table class=\"table table-chal text-center\"><thead><tr><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th>' + '<th>Friday</th><th>Saturday</th><th>Sunday</th></tr></thead><tbody><tr id=\"Week1\">';\n  var first_december_dof = first_december.getDay();\n  if (first_december_dof == 0) {\n    first_december_dof = 7;\n  }\n  for (var i = 1; i < 8; i++) {\n    if (i < first_december_dof) {\n      html_cal += '<td class=\"no-december no-chal\"><div class=\"pt-3 pb-3 bg-light\"></div></td>';\n    } else if (i > 5 && window.init.theme_settings.challOnWE == \"false\") {\n      html_cal += '<td class=\"week-end no-chal\"><div class=\"pt-3 pb-3 bg-light\">' + current_day + '</div></td>';\n      current_day++;\n    } else {\n      html_cal += '<td id=\"cal-chal-day-' + String(current_day).padStart(2, '0') + '\" class=\"has-chal\"><div class=\"pt-3 pb-3 bg-white\">' + current_day + '</div></td>';\n      current_day++;\n    }\n  }\n  html_cal += \"</tr>\";\n  while (current_day <= last_day) {\n    html_cal += '<tr id=\"Week' + week + '\">';\n    for (var _i = 1; _i < 8; _i++) {\n      if (current_day > last_day) {\n        html_cal += '<td class=\"no-december no-chal\"><div class=\"pt-3 pb-3 bg-light\"></div></td>';\n      } else if (_i > 5 && window.init.theme_settings.challOnWE == \"false\") {\n        html_cal += '<td class=\"week-end no-chal\"><div class=\"pt-3 pb-3 bg-light\">' + current_day + '</div></td>';\n      } else if (current_day <= window.init.theme_settings.lastDayOfCalendar) {\n        html_cal += '<td id=\"cal-chal-day-' + String(current_day).padStart(2, '0') + '\" class=\"has-chal\"><div class=\"pt-3 pb-3 bg-white\">' + current_day + '</div></td>';\n      } else {\n        html_cal += '<td class=\"after-christmas no-chal\"><div class=\"pt-3 pb-3 bg-light\">' + current_day + '</div></td>';\n      }\n      current_day++;\n    }\n    html_cal += \"</tr>\";\n    week++;\n  }\n  html_cal += \"</tbody></table>\";\n  document.getElementById(id).innerHTML = html_cal;\n};\ndrawCalendar(\"chal-calendar\");\n\n//# sourceURL=webpack://ctfd/./assets/js/pages/challenges.js?");

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
/******/ 			"pages/challenges": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["helpers","vendor","default-assets_js_pages_main_js"], () => (__webpack_require__("./assets/js/pages/challenges.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;