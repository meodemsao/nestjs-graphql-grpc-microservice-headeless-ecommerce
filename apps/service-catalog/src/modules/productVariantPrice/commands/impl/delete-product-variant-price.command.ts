import { Id } from '@vg/proto-schema'

export class DeleteProductVariantPriceCommand {
  constructor(public readonly data: Id) {}
}
