import { Id } from '@vg/proto-schema'

export class DeleteProductVariantUsageHistoryCommand {
  constructor(public readonly data: Id) {}
}
