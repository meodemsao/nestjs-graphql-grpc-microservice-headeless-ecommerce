import { Id } from '@vg/proto-schema'

export class DeleteProductVariantCommand {
  constructor(public readonly data: Id) {}
}
