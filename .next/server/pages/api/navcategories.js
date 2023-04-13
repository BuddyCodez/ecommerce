"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/navcategories";
exports.ids = ["pages/api/navcategories"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./pages/api/navcategories.js":
/*!************************************!*\
  !*** ./pages/api/navcategories.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _middleware_mongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../middleware/mongo */ \"(api)/./pages/middleware/mongo.js\");\n/* harmony import */ var _models_navcategories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/navcategories */ \"(api)/./pages/models/navcategories.js\");\n\n\nconst Handler = async (req, res)=>{\n    if (req.method === \"GET\") {\n        // fetch prodcuts from db\n        let fetch;\n        try {\n            fetch = await _models_navcategories__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find();\n        } catch (e) {\n            throw new Error(\"Failed to fetch In NavCategories!\");\n        }\n        fetch ? res.status(200).json({\n            data: fetch\n        }) : res.status(404).json({\n            message: \"No NavCategories Found!\"\n        });\n    } else if (req.method === \"POST\") {\n        const { title , subcategories , images  } = req.body;\n        if (!title || !subcategories) {\n            res.status(422).json({\n                message: \"Invalid Input\"\n            });\n        }\n        try {\n            const newNav = new _models_navcategories__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n                title: title,\n                subcategories: subcategories,\n                images: images\n            });\n            await newNav.save();\n            res.status(201).json({\n                message: \"New Nav Category Created\"\n            });\n        } catch (e) {\n            console.log(e);\n            res.status(500).json({\n                message: \"Failed to Create New Nav Category\"\n            });\n        }\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middleware_mongo__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Handler));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbmF2Y2F0ZWdvcmllcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFDTztBQUNwRCxNQUFNRSxVQUFVLE9BQU9DLEtBQUtDLE1BQVE7SUFDaEMsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLE9BQU87UUFDdEIseUJBQXlCO1FBQ3pCLElBQUlDO1FBQ0osSUFBSTtZQUNBQSxRQUFRLE1BQU1MLGtFQUFrQjtRQUNwQyxFQUFFLE9BQU9PLEdBQUc7WUFDUixNQUFNLElBQUlDLE1BQU0scUNBQXFDO1FBQ3pEO1FBQ0FILFFBQVFGLElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFDekJDLE1BQU1OO1FBQ1YsS0FBS0YsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFRSxTQUFTO1FBQTBCLEVBQUU7SUFDckUsT0FBTyxJQUFJVixJQUFJRSxNQUFNLEtBQUssUUFBUTtRQUM5QixNQUFNLEVBQUVTLE1BQUssRUFBRUMsY0FBYSxFQUFFQyxPQUFNLEVBQUUsR0FBR2IsSUFBSWMsSUFBSTtRQUNqRCxJQUFJLENBQUNILFNBQVMsQ0FBQ0MsZUFBZTtZQUMxQlgsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUUsU0FBUztZQUFnQjtRQUVwRCxDQUFDO1FBQ0QsSUFBSTtZQUVBLE1BQU1LLFNBQVMsSUFBSWpCLDZEQUFhQSxDQUFDO2dCQUM3QmEsT0FBT0E7Z0JBQ1BDLGVBQWVBO2dCQUNmQyxRQUFRQTtZQUNaO1lBQ0EsTUFBTUUsT0FBT0MsSUFBSTtZQUNqQmYsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUUsU0FBUztZQUEyQjtRQUMvRCxFQUFFLE9BQU9MLEdBQUc7WUFDUlksUUFBUUMsR0FBRyxDQUFDYjtZQUNaSixJQUFJTSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFRSxTQUFTO1lBQW9DO1FBQ3hFO0lBQ0osQ0FBQztBQUNMO0FBQ0EsaUVBQWViLDZEQUFVQSxDQUFDRSxRQUFRQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbW1lcmNlLy4vcGFnZXMvYXBpL25hdmNhdGVnb3JpZXMuanM/NjExZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29ubmVjdGlvbiBmcm9tIFwiLi4vbWlkZGxld2FyZS9tb25nb1wiO1xyXG5pbXBvcnQgbmF2Y2F0ZWdvcmllcyBmcm9tIFwiLi4vbW9kZWxzL25hdmNhdGVnb3JpZXNcIjtcclxuY29uc3QgSGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgaWYgKHJlcS5tZXRob2QgPT09ICdHRVQnKSB7XHJcbiAgICAgICAgLy8gZmV0Y2ggcHJvZGN1dHMgZnJvbSBkYlxyXG4gICAgICAgIGxldCBmZXRjaDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmZXRjaCA9IGF3YWl0IG5hdmNhdGVnb3JpZXMuZmluZCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggSW4gTmF2Q2F0ZWdvcmllcyEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmV0Y2ggPyByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIGRhdGE6IGZldGNoXHJcbiAgICAgICAgfSkgOiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdObyBOYXZDYXRlZ29yaWVzIEZvdW5kIScgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xyXG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIHN1YmNhdGVnb3JpZXMsIGltYWdlcyB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgaWYgKCF0aXRsZSB8fCAhc3ViY2F0ZWdvcmllcykge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDQyMikuanNvbih7IG1lc3NhZ2U6ICdJbnZhbGlkIElucHV0JyB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBuZXdOYXYgPSBuZXcgbmF2Y2F0ZWdvcmllcyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yaWVzOiBzdWJjYXRlZ29yaWVzLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBpbWFnZXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IG5ld05hdi5zYXZlKCk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgbWVzc2FnZTogJ05ldyBOYXYgQ2F0ZWdvcnkgQ3JlYXRlZCcgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiAnRmFpbGVkIHRvIENyZWF0ZSBOZXcgTmF2IENhdGVnb3J5JyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IENvbm5lY3Rpb24oSGFuZGxlcik7Il0sIm5hbWVzIjpbIkNvbm5lY3Rpb24iLCJuYXZjYXRlZ29yaWVzIiwiSGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImZldGNoIiwiZmluZCIsImUiLCJFcnJvciIsInN0YXR1cyIsImpzb24iLCJkYXRhIiwibWVzc2FnZSIsInRpdGxlIiwic3ViY2F0ZWdvcmllcyIsImltYWdlcyIsImJvZHkiLCJuZXdOYXYiLCJzYXZlIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/navcategories.js\n");

/***/ }),

/***/ "(api)/./pages/middleware/mongo.js":
/*!***********************************!*\
  !*** ./pages/middleware/mongo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Connection = (handler)=>async (req, res)=>{\n        if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections[0].readyState)) {\n            // Use current db connection\n            return handler(req, res);\n        }\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI, {\n            useUnifiedTopology: true,\n            useNewUrlParser: true\n        });\n    };\n// ? connection to MongoDb instance\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Connection);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9taWRkbGV3YXJlL21vbmdvLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUNoQyxNQUFNQyxhQUFhQyxDQUFBQSxVQUFXLE9BQU9DLEtBQUtDLE1BQVE7UUFDOUMsSUFBSUosMkVBQWtDLEVBQUU7WUFDcEMsNEJBQTRCO1lBQzVCLE9BQU9FLFFBQVFDLEtBQUtDO1FBQ3hCLENBQUM7UUFDRCxNQUFNSix1REFBZ0IsQ0FBQ1EsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7WUFDNUNDLG9CQUFvQixJQUFJO1lBQ3hCQyxpQkFBaUIsSUFBSTtRQUN6QjtJQUVKO0FBQ0EsbUNBQW1DO0FBQ25DLGlFQUFlWCxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbW1lcmNlLy4vcGFnZXMvbWlkZGxld2FyZS9tb25nby5qcz9iZWMzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmNvbnN0IENvbm5lY3Rpb24gPSBoYW5kbGVyID0+IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgaWYgKG1vbmdvb3NlLmNvbm5lY3Rpb25zWzBdLnJlYWR5U3RhdGUpIHtcclxuICAgICAgICAvLyBVc2UgY3VycmVudCBkYiBjb25uZWN0aW9uXHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIocmVxLCByZXMpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSSSwge1xyXG4gICAgICAgIHVzZVVuaWZpZWRUb3BvbG9neTogdHJ1ZSxcclxuICAgICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWVcclxuICAgIH0pO1xyXG5cclxufVxyXG4vLyA/IGNvbm5lY3Rpb24gdG8gTW9uZ29EYiBpbnN0YW5jZVxyXG5leHBvcnQgZGVmYXVsdCBDb25uZWN0aW9uOyJdLCJuYW1lcyI6WyJtb25nb29zZSIsIkNvbm5lY3Rpb24iLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiY29ubmVjdGlvbnMiLCJyZWFkeVN0YXRlIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsInVzZVVuaWZpZWRUb3BvbG9neSIsInVzZU5ld1VybFBhcnNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/middleware/mongo.js\n");

/***/ }),

/***/ "(api)/./pages/models/navcategories.js":
/*!***************************************!*\
  !*** ./pages/models/navcategories.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Schema = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema);\nconst NavCategories = new Schema({\n    title: {\n        type: String\n    },\n    subcategories: {\n        type: [\n            Object\n        ],\n        required: true\n    },\n    images: {\n        type: [\n            Object\n        ]\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.NavCategories) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"NavCategories\", NavCategories));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9tb2RlbHMvbmF2Y2F0ZWdvcmllcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFDaEMsTUFBTUMsU0FBU0Qsd0RBQWU7QUFDOUIsTUFBTUUsZ0JBQWdCLElBQUlELE9BQU87SUFDN0JFLE9BQU87UUFDSEMsTUFBTUM7SUFDVjtJQUNBQyxlQUFlO1FBQ1hGLE1BQU07WUFBQ0c7U0FBTztRQUNkQyxVQUFVLElBQUk7SUFDbEI7SUFDQUMsUUFBUTtRQUNKTCxNQUFNO1lBQUNHO1NBQU87SUFDbEI7QUFDSjtBQUNBLGlFQUFlUCxzRUFBNkIsSUFBSUEscURBQWMsQ0FBQyxpQkFBaUJFLGNBQWNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lY29tbWVyY2UvLi9wYWdlcy9tb2RlbHMvbmF2Y2F0ZWdvcmllcy5qcz9mYmQ4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcclxuY29uc3QgTmF2Q2F0ZWdvcmllcyA9IG5ldyBTY2hlbWEoe1xyXG4gICAgdGl0bGU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgc3ViY2F0ZWdvcmllczoge1xyXG4gICAgICAgIHR5cGU6IFtPYmplY3RdLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGltYWdlczoge1xyXG4gICAgICAgIHR5cGU6IFtPYmplY3RdLFxyXG4gICAgfVxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLk5hdkNhdGVnb3JpZXMgfHwgbW9uZ29vc2UubW9kZWwoJ05hdkNhdGVnb3JpZXMnLCBOYXZDYXRlZ29yaWVzKTtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiTmF2Q2F0ZWdvcmllcyIsInRpdGxlIiwidHlwZSIsIlN0cmluZyIsInN1YmNhdGVnb3JpZXMiLCJPYmplY3QiLCJyZXF1aXJlZCIsImltYWdlcyIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/models/navcategories.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/navcategories.js"));
module.exports = __webpack_exports__;

})();