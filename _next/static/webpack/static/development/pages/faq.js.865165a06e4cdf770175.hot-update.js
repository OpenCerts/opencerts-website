webpackHotUpdate("static/development/pages/faq.js",{

/***/ "./src/components/FAQ/FaqContent.js":
/*!******************************************!*\
  !*** ./src/components/FAQ/FaqContent.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _faq_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./faq.scss */ "./src/components/FAQ/faq.scss");
/* harmony import */ var _faq_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_faq_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FaqContent_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FaqContent.json */ "./src/components/FAQ/FaqContent.json");
var _FaqContent_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./FaqContent.json */ "./src/components/FAQ/FaqContent.json", 1);
var _jsxFileName = "/Users/angel/Documents/GitHub/opencerts-website/src/components/FAQ/FaqContent.js";




var FaqHeader = function FaqHeader() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a["header-container"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, "Frequently Asked Questions"));
}; // const renderContent = () => {
//   const items = content.map((n, i) => (
//     <div className={styles["content-container"]} key={i}>
//       <a className={styles.question}>
//         <h5>{n.question}</h5>
//       </a>
//       <div>
//         <div className={styles.answer}>{n.answer}</div>
//       </div>
//     </div>
//   ));
//   return <div>{items}</div>;
// };


var renderContent = function renderContent() {
  return _FaqContent_json__WEBPACK_IMPORTED_MODULE_2__.map(function (n, i) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, n.category)), n.faq.map(function (x, h) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a["content-container"],
        key: h,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a.question,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      }, x.question)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a.answer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }, x.answer)));
    }));
  });
};

var FaqContent = function FaqContent() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a.main,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FaqHeader, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }), renderContent());
};

/* harmony default export */ __webpack_exports__["default"] = (FaqContent);

/***/ })

})
//# sourceMappingURL=faq.js.865165a06e4cdf770175.hot-update.js.map