import BINARYUUID from "./define/binary-uuid";
import VIRTUALBINARYUUID from "./define/virtual-uuid";

/*
  A simple preset for default key with virtual field
*/

export default function withBinaryUUID(definition, ops = {}) {
  const primaryID = ops.primaryID || "id";
  const virtualID = ops.virtualID || "uuid";
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
  return Object.assign(
    {
      [primaryID]: BINARYUUID(ops.field),
      [virtualID]: VIRTUALBINARYUUID(primaryID, virtualID)
    },
    definition
  );
}
