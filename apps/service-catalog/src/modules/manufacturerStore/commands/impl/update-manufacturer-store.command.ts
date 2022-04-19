import { UpdateManufacturerStoreInput } from '@vg/proto-schema'

export class UpdateManufacturerStoreCommand {
  constructor(public readonly data: UpdateManufacturerStoreInput) {
  }
}