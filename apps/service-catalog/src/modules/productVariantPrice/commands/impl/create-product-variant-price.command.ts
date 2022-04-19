import { CreateProductVariantPriceInput } from '@vg/proto-schema'

export class CreateProductVariantPriceCommand {
  constructor(public readonly request: CreateProductVariantPriceInput) {}
}
