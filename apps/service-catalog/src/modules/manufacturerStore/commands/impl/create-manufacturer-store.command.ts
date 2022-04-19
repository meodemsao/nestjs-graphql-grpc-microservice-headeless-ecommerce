import { CreateManufacturerStoreInput } from '@vg/proto-schema'

export class CreateManufacturerStoreCommand {
  constructor(
    public readonly request: CreateManufacturerStoreInput
  ) {
  }
}
