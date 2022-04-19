import { v4 as uuidv4 } from 'uuid'

export const convertStringToBinary = (uuid: string) => {
  const guid = Buffer.alloc(16)
  guid.write(uuid)
  return guid
}