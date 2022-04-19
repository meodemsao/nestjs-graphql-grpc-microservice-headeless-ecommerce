import { GetProductVariantUsageHistoryHandler } from '@vg/service-catalog/modules/productVariantUsageHistory/queries/handlers/get-product-variant-usage-history.handler'
import { GetProductVariantUsageHistoriesHandler } from '@vg/service-catalog/modules/productVariantUsageHistory/queries/handlers/get-product-variant-usage-histories.handler'
import { GetProductVariantUsageHistoriesTotalHandler } from '@vg/service-catalog/modules/productVariantUsageHistory/queries/handlers/get-product-variant-usage-histories-total.handler'

export const QueryHandlers = [
  GetProductVariantUsageHistoryHandler,
  GetProductVariantUsageHistoriesHandler,
  GetProductVariantUsageHistoriesTotalHandler
]
