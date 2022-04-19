import { Id } from '@vg/proto-schema'

export class DeleteProductVariantAvailabilityCommand {
  constructor(public readonly data: Id) {}
}
