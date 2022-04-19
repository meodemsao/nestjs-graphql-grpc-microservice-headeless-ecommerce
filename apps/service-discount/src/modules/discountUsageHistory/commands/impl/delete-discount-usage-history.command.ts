import { Id } from '@vg/proto-schema'

export class DeleteDiscountUsageHistoryCommand {
  constructor(public readonly data: Id) {}
}
