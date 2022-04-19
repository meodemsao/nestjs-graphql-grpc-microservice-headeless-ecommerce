import { UpdateDiscountUsageHistoryInput } from '@vg/proto-schema'

export class UpdateDiscountUsageHistoryCommand {
  constructor(public readonly data: UpdateDiscountUsageHistoryInput) {}
}
