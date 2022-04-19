import { CreateProductVariantUsageHistoryHandler } from '@vg/service-catalog/modules/productVariantUsageHistory/commands/handlers/create-product-variant-usage-history.handler'
import { UpdateProductVariantUsageHistoryHandler } from '@vg/service-catalog/modules/productVariantUsageHistory/commands/handlers/update-product-variant-usage-history.handler'
import { DeleteProductVariantUsageHistoryHandler } from '@vg/service-catalog/modules/productVariantUsageHistory/commands/handlers/delete-product-variant-usage-history.handler'

export const CommandHandlers = [
  CreateProductVariantUsageHistoryHandler,
  UpdateProductVariantUsageHistoryHandler,
  DeleteProductVariantUsageHistoryHandler
]
