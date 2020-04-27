"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _util=_interopRequireDefault(require("util")),_sequelize=_interopRequireDefault(require("sequelize")),_errors=_interopRequireDefault(require("sequelize/lib/errors")),_inherits=_interopRequireDefault(require("../utils/inherits"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * BINARY A variable binary string
 *
 * @param {number} [length=255] length of string
 * @param {boolean} [binary=false] Is this binary?
 *
 * @namespace DataTypes.STRING
 *
 */function BINARY(a){const b="object"==typeof a&&a||{length:a};return this instanceof BINARY?void(this.options=b,this._length=b.length||255):new BINARY(b)}(0,_inherits.default)(BINARY,_sequelize.default.DataTypes.ABSTRACT),BINARY.prototype.key=BINARY.key="BINARY",BINARY.prototype.toSql=function(){return`BINARY(${this._length})`},BINARY.prototype.validate=function(a){if(!Buffer.isBuffer(a)&&"number"!=typeof a)throw new _errors.default.ValidationError(_util.default.format("%j is not a valid binary buffer",a));return!0},BINARY.prototype.escape=!1,BINARY.prototype._stringify=function(a){Buffer.isBuffer(a)||(Array.isArray(a)?a=Buffer.from(a):a=Buffer.from(a.toString()));const b=a.toString("hex");return this._hexify(b)},BINARY.prototype._hexify=function(a){return`X'${a}'`},BINARY.prototype._bindParam=function(a,b){return Buffer.isBuffer(a)||(Array.isArray(a)?a=Buffer.from(a):a=Buffer.from(a.toString())),b.bindParam(a)};var _default=BINARY;exports.default=_default;