import { CreateManufacturerLocationInput } from '@vg/proto-schema'

export class CreateManufacturerLocationCommand {
  constructor(
    public readonly request: CreateManufacturerLocationInput
  ) {
  }
}
