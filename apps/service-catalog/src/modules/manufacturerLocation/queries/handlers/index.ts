import { GetManufacturerLocationHandler } from '@vg/service-catalog/modules/manufacturerLocation/queries/handlers/get-manufacturer-location.handler'
import { GetManufacturerLocationsHandler } from '@vg/service-catalog/modules/manufacturerLocation/queries/handlers/get-manufacturer-locations.handler'
import { GetManufacturerLocationsTotalHandler } from '@vg/service-catalog/modules/manufacturerLocation/queries/handlers/get-manufacturer-locations-total.handler'

export const QueryHandlers = [
  GetManufacturerLocationHandler,
  GetManufacturerLocationsHandler,
  GetManufacturerLocationsTotalHandler
]
