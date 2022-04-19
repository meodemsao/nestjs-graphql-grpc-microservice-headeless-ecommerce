import { CreateDiscountUsageHistoryHandler } from './create-discount-usage-history.handler'
import { UpdateDiscountUsageHistoryHandler } from './update-discount-usage-history.handler'
import { DeleteDiscountUsageHistoryHandler } from './delete-discount-usage-history.handler'

export const CommandHandlers = [
  CreateDiscountUsageHistoryHandler,
  UpdateDiscountUsageHistoryHandler,
  DeleteDiscountUsageHistoryHandler
]
