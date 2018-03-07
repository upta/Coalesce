(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(default_1.prototype, "propMeta", {
        get: function () {
            if (this.item == null) {
                throw "Item is required";
            }
            if (this.item.$metadata == null) {
                throw "Item " + this.item + " has no $metadata";
            }
            var itemProps = this.item.$metadata.props;
            if (this.prop == null) {
                // No prop specified - just an item. Display the display prop of the item.
                var propMetadata = this.item.$metadata.displayProp;
                if (propMetadata == null) {
                    // TODO: this isn't very good. We should maybe have "virtual computed" properties, or something like that, for doing things like jsonifying objects that have no display property.
                    throw "Prop " + this.prop + " has no display property";
                }
                return propMetadata;
            }
            else if (typeof this.prop == "string") {
                // Prop string name. Display that prop's value.
                var propMetadata = itemProps[this.prop];
                if (propMetadata == null) {
                    throw "Prop " + this.prop + " doesn't exist on item " + this.item.$metadata.name;
                }
                return propMetadata;
            }
            else {
                // Prop metadata. Display that prop's value.
                // Get the metadata fresh from the item's metadata to ensure we haven't been fed metadata that doesn't actually belong to this.item.
                var propMetadata = itemProps[this.prop.name];
                if (propMetadata == null || propMetadata !== this.prop) {
                    throw "Prop " + this.prop.name + " doesn't exist on item " + this.item.$metadata.name;
                }
                return propMetadata;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Prop"])({ required: true, type: Object }),
        __metadata("design:type", Object)
    ], default_1.prototype, "item", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Prop"])({ required: false, type: [String, Object] }),
        __metadata("design:type", Object)
    ], default_1.prototype, "prop", void 0);
    return default_1;
}(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Vue"]));
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("vue-property-decorator");

/***/ })
/******/ ])));
//# sourceMappingURL=c-metadata-component.js.map