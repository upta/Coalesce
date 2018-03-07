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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("vue-property-decorator");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__c_display__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__c_metadata_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_coalesce_vue_lib_api_client__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_coalesce_vue_lib_api_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_coalesce_vue_lib_api_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_es_debounce__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_es_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_es_debounce__);
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

//@ts-ignore
// import { VSelect } from 'vuetify/es5/components/VSelect';




var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loading = false;
        _this.search = null;
        _this.items = [];
        return _this;
    }
    Object.defineProperty(default_1.prototype, "listItems", {
        get: function () {
            var items = this.items.slice();
            var selected = this.item[this.propMeta.name];
            // Appending this to the bottom is intentional - chances are, if a person opens a dropdown that already has a value selected, they don't want to re-select the value that's already selected.
            if (selected)
                items.push(selected);
            return items;
        },
        enumerable: true,
        configurable: true
    });
    default_1.prototype.queryDropdownItems = function () {
        this.debouncedQuery();
    };
    default_1.prototype.mounted = function () {
        // This needs to be late initialized so we have the correct "this" reference.
        var _this = this;
        this.debouncedQuery = __WEBPACK_IMPORTED_MODULE_4_lodash_es_debounce___default()(function () {
            _this.loading = true;
            var propMeta = _this.propMeta;
            if (propMeta.type != "model")
                throw "Property " + propMeta.name + " must be a model property to use c-select.";
            new __WEBPACK_IMPORTED_MODULE_3_coalesce_vue_lib_api_client__["ApiClient"](propMeta.typeDef)
                .list({ pageSize: 500, search: _this.search || undefined })
                .then(function (resp) {
                _this.items = resp.data.list || [];
                _this.loading = false;
            });
        }, 500);
        this.loading = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Watch"])('search'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "queryDropdownItems", null);
    default_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Component"])({
            name: 'c-select',
            components: {
                CDisplay: __WEBPACK_IMPORTED_MODULE_1__c_display__["a" /* default */]
            }
        })
    ], default_1);
    return default_1;
}(__WEBPACK_IMPORTED_MODULE_2__c_metadata_component__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (default_1);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(0);
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
/* harmony default export */ __webpack_exports__["a"] = (default_1);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_c_select_ts__ = __webpack_require__(1);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ccb6d7a8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_c_select_vue__ = __webpack_require__(9);
var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_c_select_ts__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ccb6d7a8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_c_select_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\c-select.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ccb6d7a8", Component.options)
  } else {
    hotAPI.reload("data-v-ccb6d7a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__c_metadata_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_coalesce_vue_lib_model__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_coalesce_vue_lib_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_coalesce_vue_lib_model__);
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
    default_1.prototype.render = function (h) {
        if (!this.item)
            return null;
        var value = Object(__WEBPACK_IMPORTED_MODULE_2_coalesce_vue_lib_model__["propDisplay"])(this.item, this.propMeta);
        if (value == null)
            return null;
        return h(this.element, value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Prop"])({ default: 'span', type: String }),
        __metadata("design:type", String)
    ], default_1.prototype, "element", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Prop"])({ default: 'L LT', type: String }),
        __metadata("design:type", String)
    ], default_1.prototype, "dateFormat", void 0);
    default_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Component"])({
            name: 'c-display',
        })
    ], default_1);
    return default_1;
}(__WEBPACK_IMPORTED_MODULE_1__c_metadata_component__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (default_1);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("coalesce-vue/lib/model");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("coalesce-vue/lib/api-client");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("lodash-es/debounce");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-select",
    {
      attrs: {
        label: _vm.propMeta.displayName,
        loading: _vm.loading,
        items: _vm.listItems,
        "search-input": _vm.search,
        "item-text": _vm.propMeta.typeDef.displayProp.name,
        "item-value": _vm.propMeta.typeDef.keyProp.name,
        "return-object": true,
        filter: function() {
          return true
        },
        autocomplete: "",
        clearable: "",
        "open-on-clear": "",
        dense: ""
      },
      on: {
        "update:searchInput": function($event) {
          _vm.search = $event
        },
        onKeyDown: function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "delete", [8, 46], $event.key)
          ) {
            return null
          }
          $event.stopPropagation()
          _vm.item[_vm.propMeta.name] = null
        }
      },
      scopedSlots: _vm._u([
        {
          key: "item",
          fn: function(data) {
            return [
              _c(
                "v-list-tile-content",
                [
                  _c(
                    "v-list-tile-title",
                    [
                      _c("c-display", {
                        attrs: {
                          item: data.item,
                          prop: _vm.propMeta.typeDef.displayProp
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ]
          }
        },
        {
          key: "selection",
          fn: function(data) {
            return [
              _c("c-display", {
                staticClass: "input-group__selections__comma",
                attrs: { item: _vm.item, prop: _vm.propMeta }
              })
            ]
          }
        }
      ]),
      model: {
        value: _vm.item[_vm.propMeta.name],
        callback: function($$v) {
          _vm.$set(_vm.item, _vm.propMeta.name, $$v)
        },
        expression: "item[propMeta.name]"
      }
    },
    [
      _c("template", { slot: "no-data" }, [
        _c("span", [_vm._v("No data available")])
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ccb6d7a8", esExports)
  }
}

/***/ })
/******/ ])));
//# sourceMappingURL=c-select.js.map