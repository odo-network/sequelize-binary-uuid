import util from 'util';

import Sequelize from 'sequelize';
import sequelizeErrors from 'sequelize/lib/errors';

import inherits from '../utils/inherits';

/**
 * BINARY A variable binary string
 *
 * @param {number} [length=255] length of string
 * @param {boolean} [binary=false] Is this binary?
 *
 * @namespace DataTypes.STRING
 *
 */
function BINARY(length) {
  const options = (typeof length === 'object' && length) || { length };

  if (!(this instanceof BINARY)) return new BINARY(options);

  this.options = options;
  this._length = options.length || 255;
}

inherits(BINARY, Sequelize.DataTypes.ABSTRACT);

BINARY.prototype.key = BINARY.key = 'BINARY';
BINARY.prototype.toSql = function toSql() {
  return `BINARY(${this._length})`;
};

BINARY.prototype.validate = function validate(value) {
  if (!Buffer.isBuffer(value) && typeof value !== 'number') {
    throw new sequelizeErrors.ValidationError(
      util.format('%j is not a valid binary buffer', value)
    );
  }
  return true;
};

BINARY.prototype.escape = false;

BINARY.prototype._stringify = function _stringify(value) {
  if (!Buffer.isBuffer(value)) {
    if (Array.isArray(value)) {
      value = Buffer.from(value);
    } else {
      value = Buffer.from(value.toString());
    }
  }
  const hex = value.toString('hex');

  return this._hexify(hex);
};

BINARY.prototype._hexify = function _hexify(hex) {
  return `X'${hex}'`;
};

BINARY.prototype._bindParam = function _bindParam(value, options) {
  if (!Buffer.isBuffer(value)) {
    if (Array.isArray(value)) {
      value = Buffer.from(value);
    }
    else {
      value = Buffer.from(value.toString());
    }
  }
  return options.bindParam(value);
}

export default BINARY;
