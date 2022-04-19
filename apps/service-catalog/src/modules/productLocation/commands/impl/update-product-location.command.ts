import { UpdateProductLocationInput } from '@vg/proto-schema'

export class UpdateProductLocationCommand {
  constructor(public readonly data: UpdateProductLocationInput) {
  }
}