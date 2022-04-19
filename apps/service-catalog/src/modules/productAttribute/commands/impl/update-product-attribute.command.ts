import { UpdateProductAttributeInput } from '@vg/proto-schema'

export class UpdateProductAttributeCommand {
  constructor(public readonly data: UpdateProductAttributeInput) {
  }
}