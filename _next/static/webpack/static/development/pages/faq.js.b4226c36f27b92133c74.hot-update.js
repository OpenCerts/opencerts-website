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
      className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a["content-container"],
      key: i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, n.category ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, n.category) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a.question,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, n.question)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a.answer,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, n.answer))));
  });
};

var FaqContent = function FaqContent() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _faq_scss__WEBPACK_IMPORTED_MODULE_1___default.a.main,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FaqHeader, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }), renderContent());
};

/* harmony default export */ __webpack_exports__["default"] = (FaqContent);

/***/ }),

/***/ "./src/components/FAQ/FaqContent.json":
/*!********************************************!*\
  !*** ./src/components/FAQ/FaqContent.json ***!
  \********************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, default */
/***/ (function(module) {

module.exports = [{"category":"General"},{"question":"What is OpenCerts?","answer":"OpenCerts is the umbrella trademark under which we have released a few key components: \n 1. An open source schema for publishing educational credentials \n2. A set of tools for generating cryptographic protections for educational credentials \n3. the online website for verifying the authenticity of OpenCerts files."},{"question":"Why use the Ethereum blockchain? (Why blockchain at all)?","answer":"Ethereum is the blockchain network with the largest developer base, as well as having a large number of participants securing the network. OpenCerts is backed by blockchain technology so as to greatly reduce the barrier to entry of publishing cryptographically protected educational credentials, as compared to currently existing costly proprietary software. Using blockchain technology also allows the decentralisation of authority over legitimate issuing institutions. "},{"question":"Where do I get a OpenCerts certificate?","answer":"OpenCerts is currently in the early stages of progressive rollout. If you wish to know whether your educational instutite supports OpenCerts, please contact their administrative office."},{"question":"How do I send my OpenCerts certificate to someone?","answer":"You may use the share button that is visible when you view your certificate, or you can simply email the OpenCerts file to them"},{"question":"Why can't i print the certificate?","answer":"Printing the certificate discards all the advanced cryptographic protections we have built into OpenCerts, hence printing is not recommended. "},{"question":"What happens if i modify the OpenCerts certificate .json file?","answer":"The modified certificate will fail validation and show up as having been tampered with."},{"question":"What does it mean by Signature?","answer":"In every properly issued OpenCerts certificate file, there is a hash-based message authentication code which cryptographically certifies that the content of the certificate has not been altered. If you would like to know more about the technical nitty-gritty of how this works, check out our technical documentation at https://github.com/GovTechSG/opencerts-documentation"},{"category":"Verifications"},{"question":"What does it mean by Unascertained Issuer?","answer":"OpenCerts has to maintain a list of identified issuing institutes in order to detect fraudulent issuing institutes masquerading as legitimate ones. At this point in time, it is not unlikely that a legitimate issuing institute is not on our list of recognised institutions. If you are sure that your certificate is from a legitimate issuer, please get in touch with us at <addme@opencerts.io>."},{"question":"What does it mean by Ethereum Blockchain?","answer":"The Ethereum Blockchain is a publicly usable distributed ledger based on blockchain technology. You can think of it as a publicly readable database."},{"question":"What does it mean by Revoked?","answer":"The issuer has explicitly published a notice of revocation for this certificate and it is no longer a valid certificate."},{"question":"Is this safe to use? Can't anyone just copy my certificate file and pass off as me?","answer":"Yes, the certificate file can trivially be duplicated. However, the recipient's name in the certificate cannot be altered without failing our verification process. Thus it is extremely important that the person doing the verification ensures that the recipient indicated in the certificate is actually the entity presenting the certificate. For more advanced institutions, there is the possiblity of using Distributed IDs to associate the certificate recipient's public key for further autnentication using public/private key signing in the future."},{"category":"Institutes"},{"question":"How can I add my institute to the list of recognised issuers?","answer":"Please get in touch with us at <addme@opencerts.io>"},{"question":"How can I change the appearance of the certificates I issue?","answer":"Each certificate can have a \"template\" field. This field identifies the template to be used for that certificate. Once you are a recognised issuer, you may submit a pull request at our GitHub repository to add your certificate template to the verification site."}];

/***/ })

})
//# sourceMappingURL=faq.js.b4226c36f27b92133c74.hot-update.js.map