import { GetManufacturerStoreHandler } from '@vg/service-catalog/modules/manufacturerStore/queries/handlers/get-manufacturer-store.handler'
import { GetManufacturerStoresHandler } from '@vg/service-catalog/modules/manufacturerStore/queries/handlers/get-manufacturer-stores.handler'
import { GetManufacturerStoresTotalHandler } from '@vg/service-catalog/modules/manufacturerStore/queries/handlers/get-manufacturer-stores-total.handler'

export const QueryHandlers = [
  GetManufacturerStoreHandler,
  GetManufacturerStoresHandler,
  GetManufacturerStoresTotalHandler
]

