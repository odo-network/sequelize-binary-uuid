import createBinaryUUID from 'binary-uuid';

export function getBinaryUUID() {
  return createBinaryUUID().buffer;
}
