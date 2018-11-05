webpackHotUpdate("static/development/pages/viewer.js",{

/***/ "./src/components/Layout/FooterBar.js":
/*!********************************************!*\
  !*** ./src/components/Layout/FooterBar.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NetworkSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NetworkSelector */ "./src/components/Layout/NetworkSelector.js");
/* harmony import */ var _footer_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer.scss */ "./src/components/Layout/footer.scss");
/* harmony import */ var _footer_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_footer_scss__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/raymondyeh/Desktop/DLT/website/src/components/Layout/FooterBar.js";




var NavigationBar = function NavigationBar() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bg-brand-dark py-3 m-0",
    id: _footer_scss__WEBPACK_IMPORTED_MODULE_2___default.a["footer-print"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _footer_scss__WEBPACK_IMPORTED_MODULE_2___default.a.networkselector,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NetworkSelector__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _footer_scss__WEBPACK_IMPORTED_MODULE_2___default.a.footer,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/faq",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, "FAQ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/OpenCerts/open-certificate",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, "Github")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/registry",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, "Registry"))));
};

/* harmony default export */ __webpack_exports__["default"] = (NavigationBar);

/***/ }),

/***/ "./src/components/Layout/NetworkSelector.js":
/*!**************************************************!*\
  !*** ./src/components/Layout/NetworkSelector.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_web3_getWeb3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/web3/getWeb3 */ "./src/services/web3/getWeb3.js");
/* harmony import */ var _reducers_application__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../reducers/application */ "./src/reducers/application.js");
/* harmony import */ var _networkSelector_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./networkSelector.scss */ "./src/components/Layout/networkSelector.scss");
/* harmony import */ var _networkSelector_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_networkSelector_scss__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/raymondyeh/Desktop/DLT/website/src/components/Layout/NetworkSelector.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }








var NetworkSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(NetworkSelector, _Component);

  function NetworkSelector(props) {
    var _this;

    _classCallCheck(this, NetworkSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NetworkSelector).call(this, props));
    _this.handleNetworkChange = _this.handleNetworkChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(NetworkSelector, [{
    key: "handleNetworkChange",
    value: function handleNetworkChange(e) {
      this.props.updateWeb3({
        network: e.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var INFURA_MAINNET = _services_web3_getWeb3__WEBPACK_IMPORTED_MODULE_3__["types"].INFURA_MAINNET,
          INFURA_ROPSTEN = _services_web3_getWeb3__WEBPACK_IMPORTED_MODULE_3__["types"].INFURA_ROPSTEN;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        value: this.props.network,
        onChange: this.handleNetworkChange,
        className: _networkSelector_scss__WEBPACK_IMPORTED_MODULE_5___default.a.selector,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: INFURA_MAINNET,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, "Mainnet"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: INFURA_ROPSTEN,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        },
        __self: this
      }, "Testnet (Ropsten)"));
    }
  }]);

  return NetworkSelector;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var mapStateToProps = function mapStateToProps(store) {
  return {
    network: Object(_reducers_application__WEBPACK_IMPORTED_MODULE_4__["getNetwork"])(store),
    customRpc: Object(_reducers_application__WEBPACK_IMPORTED_MODULE_4__["getCustomRpc"])(store)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateWeb3: function updateWeb3(payload) {
      return dispatch(Object(_reducers_application__WEBPACK_IMPORTED_MODULE_4__["updateWeb3"])(payload));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(NetworkSelector));
NetworkSelector.propTypes = {
  network: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  customRpc: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  updateWeb3: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: DEFAULT_NETWORK, CAPTCHA_CLIENT_KEY, EMAIL_API_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NETWORK", function() { return DEFAULT_NETWORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPTCHA_CLIENT_KEY", function() { return CAPTCHA_CLIENT_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMAIL_API_URL", function() { return EMAIL_API_URL; });
/* harmony import */ var _services_web3_getWeb3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/web3/getWeb3 */ "./src/services/web3/getWeb3.js");

var DEFAULT_NETWORK = _services_web3_getWeb3__WEBPACK_IMPORTED_MODULE_0__["types"].INFURA_MAINNET;
var CAPTCHA_CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";
var EMAIL_API_URL = "https://ikeem3vgb5.execute-api.ap-southeast-1.amazonaws.com/dev";

/***/ })

})
//# sourceMappingURL=viewer.js.b4ac4c0983182625ded2.hot-update.js.map