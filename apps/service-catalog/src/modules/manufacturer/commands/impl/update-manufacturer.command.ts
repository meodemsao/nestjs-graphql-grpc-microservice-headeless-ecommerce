import { UpdateManufacturerInput } from '@vg/proto-schema'

export class UpdateManufacturerCommand {
  constructor(public readonly data: UpdateManufacturerInput) {
  }
}