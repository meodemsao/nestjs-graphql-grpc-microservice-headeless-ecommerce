import { CreateImportPriceHistoryHandler } from '@vg/service-catalog/modules/importPriceHistory/commands/handlers/create-import-price-history.handler'
import { UpdateImportPriceHistoryHandler } from '@vg/service-catalog/modules/importPriceHistory/commands/handlers/update-import-price-history.handler'
import { DeleteImportPriceHistoryHandler } from '@vg/service-catalog/modules/importPriceHistory/commands/handlers/delete-import-price-history.handler'

export const CommandHandlers = [
  CreateImportPriceHistoryHandler,
  UpdateImportPriceHistoryHandler,
  DeleteImportPriceHistoryHandler
]
