import { CreateProductVariantAttributeInput } from '@vg/proto-schema'

export class CreateProductVariantAttributeCommand {
  constructor(public readonly request: CreateProductVariantAttributeInput) {}
}
