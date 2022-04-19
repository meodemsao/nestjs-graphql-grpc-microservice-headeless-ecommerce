import { UpdateProductVariantInput } from '@vg/proto-schema'

export class UpdateProductVariantCommand {
  constructor(public readonly data: UpdateProductVariantInput) {}
}
