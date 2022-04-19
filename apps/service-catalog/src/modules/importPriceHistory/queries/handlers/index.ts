import { GetImportPriceHistoryHandler } from '@vg/service-catalog/modules/importPriceHistory/queries/handlers/get-import-price-history.handler'
import { GetImportPriceHistoriesHandler } from '@vg/service-catalog/modules/importPriceHistory/queries/handlers/get-import-price-histories.handler'
import { GetImportPriceHistoriesTotalHandler } from '@vg/service-catalog/modules/importPriceHistory/queries/handlers/get-import-price-histories-total.handler'

export const QueryHandlers = [
  GetImportPriceHistoryHandler,
  GetImportPriceHistoriesHandler,
  GetImportPriceHistoriesTotalHandler
]
