import { GetProductLocationHandler } from '@vg/service-catalog/modules/productLocation/queries/handlers/get-product-location.handler'
import { GetProductLocationsHandler } from '@vg/service-catalog/modules/productLocation/queries/handlers/get-product-locations.handler'
import { GetProductLocationsTotalHandler } from '@vg/service-catalog/modules/productLocation/queries/handlers/get-product-locations-total.handler'

export const QueryHandlers = [
  GetProductLocationHandler,
  GetProductLocationsHandler,
  GetProductLocationsTotalHandler
]

