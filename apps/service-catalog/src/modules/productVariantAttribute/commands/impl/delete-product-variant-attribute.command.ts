import { Id } from '@vg/proto-schema'

export class DeleteProductVariantAttributeCommand {
  constructor(public readonly data: Id) {}
}
