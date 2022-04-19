import { CreateManufacturerInput } from '@vg/proto-schema'

export class CreateManufacturerCommand {
  constructor(
    public readonly request: CreateManufacturerInput
  ) {
  }
}
