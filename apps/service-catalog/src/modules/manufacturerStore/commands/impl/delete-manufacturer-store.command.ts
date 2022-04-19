import { Id } from '@vg/proto-schema'

export class DeleteManufacturerStoreCommand {
  constructor(public readonly data: Id) {
  }
}