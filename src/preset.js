import BINARYUUID from './define/binary-uuid';
import VIRTUALBINARYUUID from './define/virtual-uuid';

/*
  A simple preset for default key with virtual field
*/

const DEFAULT_FIELD_OPS = Object.freeze({
  primaryKey: true,
  allowNull: false
});

export default function withBinaryUUID(definition, ops = {}) {
  const primaryID = ops.primaryID || 'id';
  const virtualID = ops.virtualID || 'uuid';
  const field = !definition && !ops.field ? DEFAULT_FIELD_OPS : ops.field;
  if (definition) {
    if (definition[primaryID]) {
      throw new Error(
        `[ERROR] | sequelize-binary-uuid | Provided definition collides with binary uuid primaryID defined: ${primaryID}`
      );
    }
    if (definition[virtualID]) {
      throw new Error(
        `[ERROR] | sequelize-binary-uuid | Provided definition collides with binary uuid virtualID defined: ${virtualID}`
      );
    }
  }
  return Object.assign(
    {
      [primaryID]: BINARYUUID(field),
      [virtualID]: VIRTUALBINARYUUID(primaryID, virtualID)
    },
    definition
  );
}
