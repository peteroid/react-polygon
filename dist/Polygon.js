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

	eval("var React = __webpack_require__(1);\n\nvar Polygon = React.createClass({\n  displayName: 'Polygon',\n\n  propTypes: {\n    n: React.PropTypes.number,\n    size: React.PropTypes.number,\n    fill: React.PropTypes.string,\n    ratios: React.PropTypes.arrayOf(React.PropTypes.number),\n    isAnimating: React.PropTypes.bool,\n    duration: React.PropTypes.number,\n    renderPoint: React.PropTypes.func\n  },\n  getConst: {\n    root2: Math.sqrt(2)\n  },\n  getDefaultProps: function getDefaultProps() {\n    return {\n      n: 3,\n      size: 50,\n      fill: \"#ad893e\",\n      ratios: [1, 1, 1],\n      isAnimating: true,\n      duration: 1000,\n      classPrefix: 'r--poly-',\n      renderPoint: null\n    };\n  },\n  getInitialState: function getInitialState() {\n    var points = this.caluatePoints(this.props.n, this.props.size, this.props.ratios);\n    return {\n      newPoints: points,\n      oldPoints: points,\n      polygonAnimate: null\n    };\n  },\n  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {\n    var newPoints = this.caluatePoints(nextProps.n || this.props.n, nextProps.size || this.props.size, nextProps.ratios || this.props.ratios);\n\n    var isChanged = false;\n    for (var i = 0; i < newPoints.length; i++) {\n      if (this.state.oldPoints[i][0] != newPoints[i][0] || this.state.oldPoints[i][1] != newPoints[i][1]) {\n        isChanged = true;\n        break;\n      }\n    }\n    if (isChanged) {\n      this.setState({\n        newPoints: newPoints\n      }, function () {\n        this._animate.beginElement();\n        setTimeout(function () {\n          this.setState({\n            oldPoints: newPoints\n          });\n        }.bind(this), this.props.isAnimating ? this.props.duration : 0);\n      });\n    }\n  },\n  toRadian: function toRadian(deg) {\n    return deg / 180 * Math.PI;\n  },\n  caluatePoints: function caluatePoints(n, size, ratios) {\n    // fix ratios\n    for (var i = ratios.length; i < this.props.n; i++) {\n      ratios.push(1);\n    }\n\n    var x = size / 2;\n    var y = 0;\n\n    var r = size / 2;\n    var centerAngle = 360 / n;\n    var points = [];\n    for (var i = 0; i < n; i++) {\n      var innerAngle = centerAngle * i;\n      var innerAngleRad = this.toRadian(innerAngle);\n      var cosInnerAngleRad = Math.cos(innerAngleRad);\n\n      var tangentAngleRad = innerAngleRad / 2;\n      var sinTangentAngleRad = Math.sin(tangentAngleRad);\n      var cosTangentAngleRad = Math.cos(tangentAngleRad);\n\n      var contourSegment = this.getConst.root2 * r * Math.sqrt(1 - cosInnerAngleRad);\n      points.push([(x + contourSegment * cosTangentAngleRad) * ratios[i] + r * (1 - ratios[i]), (y + contourSegment * sinTangentAngleRad) * ratios[i] + r * (1 - ratios[i])]);\n    }\n\n    return points;\n  },\n  render: function render() {\n    var _this = this;\n\n    return React.createElement(\n      'svg',\n      { width: this.props.size, height: this.props.size, className: this.props.className },\n      React.createElement(\n        'polygon',\n        { className: this.props.classPrefix + \"polygon\" || this.props.classPrefix + \"svg\", points: this.state.oldPoints, fill: this.props.fill },\n        React.createElement('animate', {\n          className: this.props.classPrefix + \"animate\",\n          ref: function ref(a) {\n            return _this._animate = a;\n          },\n          id: 'polygon-animate',\n          attributeName: 'points',\n          from: this.state.oldPoints,\n          to: this.state.newPoints,\n          dur: this.props.duration * 1.05 + \"ms\",\n          begin: 'indefinite' })\n      ),\n      this.props.renderPoint ? this.state.newPoints.map(function (_, i) {\n        return React.createElement(\n          'g',\n          { className: _this.props.classPrefix + \"point\", key: i },\n          _this.props.renderPoint(_, i)\n        );\n      }) : \"\"\n    );\n  }\n});\n\nmodule.exports = Polygon;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/Polygon.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/components/Polygon.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"react\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }
/******/ ])
});
;