import { CreateProductVariantUsageHistoryInput } from '@vg/proto-schema'

export class CreateProductVariantUsageHistoryCommand {
  constructor(public readonly request: CreateProductVariantUsageHistoryInput) {}
}
