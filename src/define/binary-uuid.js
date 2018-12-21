import { getBinaryUUID } from "../utils/binaryUUID";
import BINARY from "../types/binary";

export default function BINARYUUID(props = {}) {
  const defaultValue =
    props.allowNull || props.defaultValue ? props.defaultValue : () => getBinaryUUID();
  return {
    ...props,
    type: BINARY(16),
    defaultValue
  };
}
