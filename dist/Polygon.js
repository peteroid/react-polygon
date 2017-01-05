(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Polygon"] = factory(require("react"));
	else
		root["Polygon"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MATH_SQUARE_ROOT_OF_2 = Math.sqrt(2);\nvar MATH_FLOATING_POINT_PRECISION = 13;\n\nvar Polygon = function (_Component) {\n  _inherits(Polygon, _Component);\n\n  function Polygon(props) {\n    _classCallCheck(this, Polygon);\n\n    var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this, props));\n\n    _this.componentWillReceiveProps = function (nextProps) {\n      var newPoints = _this.caluatePoints(nextProps.n || _this.props.n, nextProps.size || _this.props.size, nextProps.ratios || _this.props.ratios);\n\n      var isChanged = false;\n      for (var i = 0; i < newPoints.length; i++) {\n        if (_this.state.oldPoints[i][0] !== newPoints[i][0] || _this.state.oldPoints[i][1] !== newPoints[i][1]) {\n          isChanged = true;\n          break;\n        }\n      }\n\n      if (isChanged) {\n        // init animation\n        var steps = _this.state.currentPoints.map(function (point, i) {\n          return point.map(function (value, j) {\n            return (newPoints[i][j] - value) / _this.props.duration;\n          });\n        });\n\n        if (_this.props.isAnimating) {\n          _this.setState({\n            currentTicks: 0,\n            preTimestamp: -1,\n            newPoints: newPoints,\n            oldPoints: _this.state.currentPoints,\n            steps: steps\n          }, function (_) {\n            requestAnimationFrame(_this.animatePolygon);\n          });\n        } else {\n          _this.setState({\n            oldPoints: newPoints,\n            currentPoints: newPoints\n          });\n        }\n      }\n    };\n\n    _this.animatePolygon = function (timestamp) {\n      if (_this.state.currentTicks < _this.props.duration) {\n        (function () {\n          var nextTicks = _this.state.preTimestamp === -1 ? 0 : _this.state.currentTicks - _this.state.preTimestamp + timestamp;\n          var r = Math.min(1, nextTicks / _this.props.duration);\n          var currentPoints = _this.state.newPoints.map(function (point, i) {\n            return point.map(function (value, j) {\n              return r * value + (1 - r) * _this.state.oldPoints[i][j];\n            });\n          });\n\n          _this.setState({\n            preTimestamp: timestamp,\n            currentTicks: nextTicks,\n            currentPoints: currentPoints\n          }, function (_) {\n            requestAnimationFrame(_this.animatePolygon);\n          });\n        })();\n      } else {\n        _this.setState({\n          oldPoints: _this.state.newPoints,\n          currentPoints: _this.state.newPoints\n        });\n      }\n    };\n\n    var points = _this.caluatePoints(_this.props.n, _this.props.size, _this.props.ratios);\n\n    _this.state = {\n      newPoints: points,\n      oldPoints: points,\n      currentPoints: points,\n      steps: [],\n      currentTicks: 0,\n      preTimestamp: -1\n    };\n    return _this;\n  }\n\n  _createClass(Polygon, [{\n    key: 'toRadian',\n    value: function toRadian(deg) {\n      return deg / 180 * Math.PI;\n    }\n  }, {\n    key: 'caluatePoints',\n    value: function caluatePoints(n, size, ratios) {\n      Array.apply(null, Array(Math.max(n - ratios.length, 0))).forEach(function (_) {\n        ratios.push(1);\n      });\n\n      var x = size / 2;\n      var y = 0;\n\n      var r = size / 2;\n      var centerAngle = 360 / n;\n      var points = [];\n      for (var i = 0; i < n; i++) {\n        var innerAngle = centerAngle * i;\n        var innerAngleRad = this.toRadian(innerAngle);\n        var cosInnerAngleRad = Math.cos(innerAngleRad);\n\n        var tangentAngleRad = innerAngleRad / 2;\n        var sinTangentAngleRad = Math.sin(tangentAngleRad);\n        var cosTangentAngleRad = Math.cos(tangentAngleRad);\n\n        var contourSegment = MATH_SQUARE_ROOT_OF_2 * r * Math.sqrt(1 - cosInnerAngleRad);\n        points.push([(x + contourSegment * cosTangentAngleRad) * ratios[i] + r * (1 - ratios[i]), (y + contourSegment * sinTangentAngleRad) * ratios[i] + r * (1 - ratios[i])]);\n      }\n\n      return points.map(function (point) {\n        return point.map(function (v) {\n          return Number(v.toFixed(MATH_FLOATING_POINT_PRECISION));\n        });\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement(\n        'svg',\n        { width: this.props.size, height: this.props.size, className: this.props.className },\n        _react2.default.createElement('polygon', {\n          className: this.props.classPrefix + 'polygon' || this.props.classPrefix + 'svg',\n          points: this.state.currentPoints,\n          fill: this.props.fill }),\n        this.props.renderPoint ? this.state.currentPoints.map(function (_, i) {\n          return _react2.default.createElement(\n            'g',\n            { className: _this2.props.classPrefix + 'point', key: i },\n            _this2.props.renderPoint(_, i)\n          );\n        }) : ''\n      );\n    }\n  }]);\n\n  return Polygon;\n}(_react.Component);\n\nexports.default = Polygon;\n\n\nPolygon.defaultProps = {\n  n: 3,\n  size: 50,\n  fill: '#ad893e',\n  ratios: [1, 1, 1],\n  isAnimating: true,\n  duration: 1000,\n  classPrefix: 'r--poly-',\n  renderPoint: null\n};\n\nPolygon.propTypes = {\n  n: _react2.default.PropTypes.number,\n  size: _react2.default.PropTypes.number,\n  fill: _react2.default.PropTypes.string,\n  ratios: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),\n  isAnimating: _react2.default.PropTypes.bool,\n  duration: _react2.default.PropTypes.number,\n  renderPoint: _react2.default.PropTypes.func\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/components/Polygon.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/components/Polygon.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"react\"\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }
/******/ ])
});
;