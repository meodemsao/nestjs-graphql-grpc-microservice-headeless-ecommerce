import { UpdateProductVariantUsageHistoryInput } from '@vg/proto-schema'

export class UpdateProductVariantUsageHistoryCommand {
  constructor(public readonly data: UpdateProductVariantUsageHistoryInput) {}
}
