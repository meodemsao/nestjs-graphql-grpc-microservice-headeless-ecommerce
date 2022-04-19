import { GetProductCollectionHandler } from '@vg/service-catalog/modules/productCollection/queries/handlers/get-product-collection.handler'
import { GetProductCollectionsHandler } from '@vg/service-catalog/modules/productCollection/queries/handlers/get-product-collections.handler'
import { GetProductCollectionsTotalHandler } from '@vg/service-catalog/modules/productCollection/queries/handlers/get-product-collections-total.handler'

export const QueryHandlers = [
  GetProductCollectionHandler,
  GetProductCollectionsHandler,
  GetProductCollectionsTotalHandler
]

