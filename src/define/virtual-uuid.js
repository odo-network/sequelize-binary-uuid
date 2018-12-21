import Sequelize from "sequelize";
import { fromBinaryUUID } from "binary-uuid";

function attachStringUUID(instance, binaryID, stringID) {
  const buf = instance.getDataValue(binaryID);
  if (!buf) return null;
  const uuid = fromBinaryUUID(buf);
  instance.setDataValue(stringID, uuid);
  return uuid;
}

export default function VIRTUALBINARYUUID(binaryID = "id", stringID = "uuid") {
  return {
    type: new Sequelize.DataTypes.VIRTUAL(Sequelize.DataTypes.STRING, [binaryID]),
    get() {
      return this.getDataValue(stringID) || attachStringUUID(this, binaryID, stringID);
    }
  };
}
