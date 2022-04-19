import { GetLocationHandler } from '@vg/service-inventory/modules/location/queries/handlers/get-location.handler'
import { GetLocationsHandler } from '@vg/service-inventory/modules/location/queries/handlers/get-locations.handler'
import { GetLocationsTotalHandler } from '@vg/service-inventory/modules/location/queries/handlers/get-locations-total.handler'

export const QueryHandlers = [
  GetLocationHandler,
  GetLocationsHandler,
  GetLocationsTotalHandler
]
