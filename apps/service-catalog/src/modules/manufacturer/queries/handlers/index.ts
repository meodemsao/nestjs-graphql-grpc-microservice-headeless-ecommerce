import { GetManufacturerHandler } from '@vg/service-catalog/modules/manufacturer/queries/handlers/get-manufacturer.handler'
import { GetManufacturersHandler } from '@vg/service-catalog/modules/manufacturer/queries/handlers/get-manufacturers.handler'
import { GetManufacturersTotalHandler } from '@vg/service-catalog/modules/manufacturer/queries/handlers/get-manufacturers-total.handler'

export const QueryHandlers = [
  GetManufacturerHandler,
  GetManufacturersHandler,
  GetManufacturersTotalHandler
]
