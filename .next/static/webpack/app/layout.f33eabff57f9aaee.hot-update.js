"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"86f23427f606\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzkxN2YiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCI4NmYyMzQyN2Y2MDZcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/config.ts":
/*!***********************!*\
  !*** ./app/config.ts ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   defaultLocale: function() { return /* binding */ defaultLocale; },\n/* harmony export */   host: function() { return /* binding */ host; },\n/* harmony export */   localePrefix: function() { return /* binding */ localePrefix; },\n/* harmony export */   locales: function() { return /* binding */ locales; },\n/* harmony export */   pathnames: function() { return /* binding */ pathnames; },\n/* harmony export */   port: function() { return /* binding */ port; }\n/* harmony export */ });\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/process/browser.js\");\nconst defaultLocale = \"en\";\nconst locales = [\n    \"en\",\n    \"de\",\n    \"du\",\n    \"id\"\n];\nconst pathnames = {\n    \"/\": \"/\",\n    //   '/pathnames': {\n    //     en: '/pathnames',\n    //     de: '/pfadnamen',\n    //     du: '/',\n    //     id: '/'\n    //   },\n    \"/geography\": {\n        en: \"/geography\",\n        de: \"/pfadnamen\",\n        du: \"/geografie\",\n        id: \"/geografi\"\n    }\n};\nconst localePrefix = \"always\";\nconst port = process.env.PORT || 3000;\nconst host = process.env.VERCEL_URL ? \"https://\".concat(process.env.VERCEL_URL) : \"http://localhost:\".concat(port);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb25maWcudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVPLE1BQU1BLGdCQUFnQixLQUFjO0FBQ3BDLE1BQU1DLFVBQVU7SUFBQztJQUFNO0lBQU07SUFBTTtDQUFLLENBQVU7QUFFbEQsTUFBTUMsWUFBdUM7SUFDbEQsS0FBSztJQUNQLG9CQUFvQjtJQUNwQix3QkFBd0I7SUFDeEIsd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZixjQUFjO0lBQ2QsT0FBTztJQUNMLGNBQWM7UUFDWkMsSUFBSTtRQUNKQyxJQUFJO1FBQ0pDLElBQUk7UUFDSkMsSUFBSTtJQUNOO0FBQ0YsRUFBRTtBQUVLLE1BQU1DLGVBQTZDLFNBQVM7QUFFNUQsTUFBTUMsT0FBT0MsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLElBQUksS0FBSztBQUN0QyxNQUFNQyxPQUFPSCxPQUFPQSxDQUFDQyxHQUFHLENBQUNHLFVBQVUsR0FDdEMsV0FBa0MsT0FBdkJKLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ0csVUFBVSxJQUNqQyxvQkFBeUIsT0FBTEwsTUFBTyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29uZmlnLnRzP2QzYTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXRobmFtZXMsIExvY2FsZVByZWZpeH0gZnJvbSAnbmV4dC1pbnRsL3JvdXRpbmcnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdExvY2FsZSA9ICdlbicgYXMgY29uc3Q7XG5leHBvcnQgY29uc3QgbG9jYWxlcyA9IFsnZW4nLCAnZGUnLCAnZHUnLCAnaWQnXSBhcyBjb25zdDtcblxuZXhwb3J0IGNvbnN0IHBhdGhuYW1lczogUGF0aG5hbWVzPHR5cGVvZiBsb2NhbGVzPiA9IHtcbiAgJy8nOiAnLycsXG4vLyAgICcvcGF0aG5hbWVzJzoge1xuLy8gICAgIGVuOiAnL3BhdGhuYW1lcycsXG4vLyAgICAgZGU6ICcvcGZhZG5hbWVuJyxcbi8vICAgICBkdTogJy8nLFxuLy8gICAgIGlkOiAnLydcbi8vICAgfSxcbiAgJy9nZW9ncmFwaHknOiB7XG4gICAgZW46ICcvZ2VvZ3JhcGh5JyxcbiAgICBkZTogJy9wZmFkbmFtZW4nLFxuICAgIGR1OiAnL2dlb2dyYWZpZScsXG4gICAgaWQ6ICcvZ2VvZ3JhZmknXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgbG9jYWxlUHJlZml4OiBMb2NhbGVQcmVmaXg8dHlwZW9mIGxvY2FsZXM+ID0gJ2Fsd2F5cyc7XG5cbmV4cG9ydCBjb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuZXhwb3J0IGNvbnN0IGhvc3QgPSBwcm9jZXNzLmVudi5WRVJDRUxfVVJMXG4gID8gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5WRVJDRUxfVVJMfWBcbiAgOiBgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9YDsiXSwibmFtZXMiOlsiZGVmYXVsdExvY2FsZSIsImxvY2FsZXMiLCJwYXRobmFtZXMiLCJlbiIsImRlIiwiZHUiLCJpZCIsImxvY2FsZVByZWZpeCIsInBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImhvc3QiLCJWRVJDRUxfVVJMIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/config.ts\n"));

/***/ })

});