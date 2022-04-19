import { GetProductStoreHandler } from '@vg/service-catalog/modules/productStore/queries/handlers/get-product-store.handler'
import { GetProductStoresHandler } from '@vg/service-catalog/modules/productStore/queries/handlers/get-product-stores.handler'
import { GetProductStoresTotalHandler } from '@vg/service-catalog/modules/productStore/queries/handlers/get-product-stores-total.handler'

export const QueryHandlers = [
  GetProductStoreHandler,
  GetProductStoresHandler,
  GetProductStoresTotalHandler
]

