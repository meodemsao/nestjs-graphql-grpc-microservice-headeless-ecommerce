import { UpdateProductVariantPriceInput } from '@vg/proto-schema'

export class UpdateProductVariantPriceCommand {
  constructor(public readonly data: UpdateProductVariantPriceInput) {}
}
