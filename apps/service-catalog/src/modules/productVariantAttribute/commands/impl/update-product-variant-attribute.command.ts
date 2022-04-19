import { UpdateProductVariantAttributeInput } from '@vg/proto-schema'

export class UpdateProductVariantAttributeCommand {
  constructor(public readonly data: UpdateProductVariantAttributeInput) {}
}
