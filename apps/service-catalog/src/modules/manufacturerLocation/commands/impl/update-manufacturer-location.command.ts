import { UpdateManufacturerLocationInput } from '@vg/proto-schema'

export class UpdateManufacturerLocationCommand {
  constructor(public readonly data: UpdateManufacturerLocationInput) {
  }
}