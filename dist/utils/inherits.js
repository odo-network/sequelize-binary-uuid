"use strict";var _util=_interopRequireDefault(require("util"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * like util.inherits, but also copies over static properties. Inherit child constructor
 * to have properties from super constructor
 *
 * @param {Function} constructor the child constructor
 * @param {Function} superConstructor the super constructor
 *
 * @private
 */function inherits(a,b){// Instance (prototype) methods
_util.default.inherits(a,b),Object.assign(a,b)}var _default=inherits;exports.default=_default;