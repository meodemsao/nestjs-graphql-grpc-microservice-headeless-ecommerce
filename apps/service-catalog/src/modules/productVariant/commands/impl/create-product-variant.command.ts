import { CreateProductVariantInput } from '@vg/proto-schema'

export class CreateProductVariantCommand {
  constructor(public readonly request: CreateProductVariantInput) {}
}
