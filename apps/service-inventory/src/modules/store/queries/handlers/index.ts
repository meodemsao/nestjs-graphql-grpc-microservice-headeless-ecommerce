import { GetStoreHandler } from '@vg/service-inventory/modules/store/queries/handlers/get-store.handler'
import { GetStoresHandler } from '@vg/service-inventory/modules/store/queries/handlers/get-stores.handler'
import { GetStoresTotalHandler } from '@vg/service-inventory/modules/store/queries/handlers/get-stores-total.handler'

export const QueryHandlers = [
  GetStoreHandler,
  GetStoresHandler,
  GetStoresTotalHandler
]
