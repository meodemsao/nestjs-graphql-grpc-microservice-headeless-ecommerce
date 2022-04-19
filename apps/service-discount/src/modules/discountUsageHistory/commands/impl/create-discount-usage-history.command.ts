import { CreateDiscountUsageHistoryInput } from '@vg/proto-schema'

export class CreateDiscountUsageHistoryCommand {
  constructor(public readonly request: CreateDiscountUsageHistoryInput) {}
}
