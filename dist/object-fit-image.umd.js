(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["object-fit-imageLink"] = factory();
	else
		root["object-fit-imageLink"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("//------------------------------------------------------------------------\n//\n//------------------------------------------------------------------------\n\n\n/**\n * Polyfill “object-fit” (IE 11-, aOS 4.4-) by applying <img>/<picture> src as “background-image” on target wrapper\n * @param {HTMLElement} el - Image wrapper element\n * @param {Object} opts - Options\n * @param {string|boolean} [opts.visuallyHiddenClass=false] - Class to add to the image to visually hide it (defaults to using inline styles)\n * @param {string} [opts.backgroundPosition=\"50% 50%\"] - Optional background-position coordinates\n */\n\n// Detect “object-fit” support\n// Note: Edge 16+ only supports “object-fit” on img tags, but that’s all we’re using it for.\n// https://caniuse.com/#feat=object-fit\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar supportsObjectFit = \"objectFit\" in document.documentElement.style;\n\n// Visually hidden CSS\n// https://github.com/h5bp/html5-boilerplate/blob/d6561f2c4792b10c181b62a17e78a064d0a27884/dist/css/main.css#L128-L147\nvar visuallyHiddenCSS = \"border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; white-space: nowrap; width: 1px;\";\n\nvar ObjectFitImage = function () {\n  function ObjectFitImage(el, opts) {\n    _classCallCheck(this, ObjectFitImage);\n\n    // Do nothing if `object-fit` is supported\n    if (supportsObjectFit) {\n      return false;\n    }\n\n    // Use Object.assign() to merge “opts” object with default values in this.options\n    this.options = Object.assign({}, {\n      visuallyHiddenClass: false,\n      backgroundPosition: \"50% 50%\"\n    }, opts);\n\n    var self = this;\n    this.el = el;\n    this.img = this.el.querySelector('.bg-image-source');\n\n    if (!this.img) {\n      console.warn(\"ObjectFitImage: No source image found. Add “bg-image-source” class to target image.\");\n      return false;\n    }\n\n    // If target is a <picture> element, get img tag\n    if (this.img.tagName.toLowerCase() !== \"img\") {\n      this.img = this.img.getElementsByTagName(\"img\")[0];\n\n      if (!this.img) {\n        console.warn(\"ObjectFitImage: No image tag found in “bg-image-source” element.\");\n        return false;\n      }\n    }\n\n    // Visually hide the img tag to keep alt text accessible (as opposed to “display: none”)\n    if (this.options.visuallyHiddenClass && this.options.visuallyHiddenClass.length) {\n      this.img.classList.add(this.options.visuallyHiddenClass);\n    } else {\n      this.img.setAttribute(\"style\", visuallyHiddenCSS);\n    }\n\n    // Check if “currentSrc” is supported\n    this.supportsCurrentSrc = typeof this.img.currentSrc !== \"undefined\";\n\n    // Bind to onload event, which will fire whenever the source changes\n    this.img.onload = function () {\n      self.update(\"img onload\");\n    };\n\n    // Update if “onload” event fired before this script was parsed\n    this.update(\"init\");\n  }\n\n  // Update parent wrapper\n\n\n  _createClass(ObjectFitImage, [{\n    key: \"update\",\n    value: function update(msg) {\n      // console.log(msg, {currentSrc: `${this.img.currentSrc}`, src: `${this.img.src}`});\n      var source = this.supportsCurrentSrc && this.img.currentSrc.length ? this.img.currentSrc : this.img.src;\n\n      if (!source.length) {\n        this.el.style.backgroundImage = \"\";\n      } else {\n        this.el.setAttribute(\"style\", \"background-image: url('\" + source + \"'); background-size: cover; background-position: \" + this.options.backgroundPosition + \"; display: block;\");\n      }\n    }\n  }]);\n\n  return ObjectFitImage;\n}();\n\nexports.default = ObjectFitImage;\n\n//# sourceURL=webpack://%5Bname%5DLink/./index.js?");

/***/ })

/******/ });
});
//# sourceMappingURL=object-fit-image.umd.js.map